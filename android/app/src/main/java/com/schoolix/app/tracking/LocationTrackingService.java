package com.schoolix.app.tracking;

import android.Manifest;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.location.Location;
import android.os.Build;
import android.os.IBinder;
import android.os.Looper;
import android.util.Log;

import androidx.annotation.Nullable;
import androidx.core.app.NotificationCompat;
import androidx.core.content.ContextCompat;

import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationCallback;
import com.google.android.gms.location.LocationRequest;
import com.google.android.gms.location.LocationResult;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.location.Priority;
import com.schoolix.app.MainActivity;
import com.schoolix.app.R;

import org.json.JSONObject;

import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.ArrayDeque;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class LocationTrackingService extends Service {
    public static final String ACTION_START = "com.schoolix.app.tracking.START";
    public static final String ACTION_STOP = "com.schoolix.app.tracking.STOP";
    public static final String EXTRA_CONFIG_JSON = "configJson";
    private static final String TAG = "SchoolixTracking";
    private static final String CHANNEL_ID = "schoolix_vehicle_tracking";
    private static final int NOTIFICATION_ID = 48107;
    private static final int MAX_QUEUE = 40;

    private FusedLocationProviderClient fusedLocationClient;
    private LocationCallback locationCallback;
    private final ArrayDeque<String> pendingPayloads = new ArrayDeque<>();
    private final ExecutorService uploadExecutor = Executors.newSingleThreadExecutor();
    private boolean flushing = false;
    private String supabaseUrl = "";
    private String anonKey = "";
    private String accessToken = "";
    private String schoolId = "";
    private String vehicleId = "";
    private String tripId = "";

    @Override
    public void onCreate() {
        super.onCreate();
        fusedLocationClient = LocationServices.getFusedLocationProviderClient(this);
        createChannel();
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        String action = intent == null ? "" : intent.getAction();
        if (ACTION_STOP.equals(action)) {
            stopTracking();
            return START_NOT_STICKY;
        }
        if (ACTION_START.equals(action)) {
            parseConfig(intent.getStringExtra(EXTRA_CONFIG_JSON));
            startForeground(NOTIFICATION_ID, notification("Vehicle tracking is active"));
            startTracking();
            return START_STICKY;
        }
        return START_STICKY;
    }

    private void parseConfig(String configJson) {
        try {
            JSONObject config = new JSONObject(configJson == null ? "{}" : configJson);
            supabaseUrl = config.optString("supabaseUrl", "");
            anonKey = config.optString("anonKey", "");
            accessToken = config.optString("accessToken", anonKey);
            schoolId = config.optString("schoolId", "");
            vehicleId = config.optString("vehicleId", "");
            tripId = config.optString("tripId", "");
        } catch (Exception error) {
            Log.e(TAG, "Invalid tracking config", error);
        }
    }

    private void startTracking() {
        if (ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION)
            != PackageManager.PERMISSION_GRANTED) {
            stopSelf();
            return;
        }
        if (fusedLocationClient != null && locationCallback != null) {
            fusedLocationClient.removeLocationUpdates(locationCallback);
        }
        LocationRequest request = new LocationRequest.Builder(Priority.PRIORITY_HIGH_ACCURACY, 10000L)
            .setMinUpdateIntervalMillis(5000L)
            .setMaxUpdateDelayMillis(12000L)
            .build();
        locationCallback = new LocationCallback() {
            @Override
            public void onLocationResult(LocationResult result) {
                if (result == null) return;
                for (Location location : result.getLocations()) {
                    queueOrUpload(locationPayload(location));
                }
            }
        };
        try {
            fusedLocationClient.getLastLocation()
                .addOnSuccessListener(location -> {
                    if (location != null) queueOrUpload(locationPayload(location));
                })
                .addOnFailureListener(error -> Log.w(TAG, "Last known location unavailable", error));
            fusedLocationClient.requestLocationUpdates(request, locationCallback, Looper.getMainLooper())
                .addOnFailureListener(error -> Log.e(TAG, "Location updates failed", error));
        } catch (SecurityException error) {
            Log.w(TAG, "Location permission was removed", error);
            stopTracking();
        }
    }

    private String locationPayload(Location location) {
        try {
            return new JSONObject()
                .put("target_vehicle_id", vehicleId)
                .put("target_trip_id", tripId)
                .put("target_latitude", location.getLatitude())
                .put("target_longitude", location.getLongitude())
                .put("target_accuracy", location.hasAccuracy() ? location.getAccuracy() : JSONObject.NULL)
                .put("target_speed", location.hasSpeed() ? Math.min(180d, Math.max(0d, location.getSpeed() * 3.6d)) : JSONObject.NULL)
                .put("target_heading", location.hasBearing() ? location.getBearing() : JSONObject.NULL)
                .toString();
        } catch (Exception error) {
            throw new IllegalStateException("Unable to build location payload", error);
        }
    }

    private synchronized void queueOrUpload(String payload) {
        if (payload == null || payload.trim().isEmpty()) return;
        pendingPayloads.addLast(payload);
        while (pendingPayloads.size() > MAX_QUEUE) pendingPayloads.removeFirst();
        if (!flushing) {
            flushing = true;
            flushQueue();
        }
    }

    private void flushQueue() {
        uploadExecutor.execute(() -> {
            while (true) {
                String payload;
                synchronized (this) {
                    payload = pendingPayloads.peekFirst();
                    if (payload == null) {
                        flushing = false;
                        return;
                    }
                }
                if (!upload(payload)) {
                    synchronized (this) { flushing = false; }
                    return;
                }
                synchronized (this) { pendingPayloads.pollFirst(); }
            }
        });
    }

    private boolean upload(String payload) {
        if (supabaseUrl.isEmpty() || anonKey.isEmpty() || accessToken.isEmpty()) return false;
        HttpURLConnection connection = null;
        try {
            URL url = new URL(supabaseUrl + "/rest/v1/rpc/schoolix_upsert_vehicle_live_location");
            connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("POST");
            connection.setConnectTimeout(10000);
            connection.setReadTimeout(12000);
            connection.setDoOutput(true);
            connection.setRequestProperty("Content-Type", "application/json");
            connection.setRequestProperty("apikey", anonKey);
            connection.setRequestProperty("Authorization", "Bearer " + accessToken);
            connection.setRequestProperty("Prefer", "resolution=merge-duplicates,return=minimal");
            try (OutputStream output = connection.getOutputStream()) {
                output.write(payload.getBytes(StandardCharsets.UTF_8));
            }
            int status = connection.getResponseCode();
            if (status >= 200 && status < 300) {
                emitStatus("live-location-shared", "");
                return true;
            }
            String error = readResponse(connection.getErrorStream());
            Log.w(TAG, "Location upload failed HTTP " + status + " " + error);
            emitStatus("location-upload-retrying", "HTTP " + status);
            return false;
        } catch (Exception error) {
            Log.w(TAG, "Location upload waiting for network", error);
            emitStatus("location-upload-retrying", "Network unavailable");
            return false;
        } finally {
            if (connection != null) connection.disconnect();
        }
    }

    private String readResponse(java.io.InputStream stream) {
        if (stream == null) return "";
        try (java.io.BufferedReader reader = new java.io.BufferedReader(new java.io.InputStreamReader(stream))) {
            StringBuilder text = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) text.append(line);
            return text.toString();
        } catch (Exception ignored) {
            return "";
        }
    }

    private void emitStatus(String status, String error) {
        try {
            MainActivity.emitTrackingStatus(this, status, error);
        } catch (Exception ignored) {}
    }

    private void stopTracking() {
        if (fusedLocationClient != null && locationCallback != null) {
            fusedLocationClient.removeLocationUpdates(locationCallback);
        }
        stopForeground(true);
        stopSelf();
    }

    @Override
    public void onDestroy() {
        if (fusedLocationClient != null && locationCallback != null) {
            fusedLocationClient.removeLocationUpdates(locationCallback);
        }
        uploadExecutor.shutdownNow();
        super.onDestroy();
    }

    private android.app.Notification notification(String text) {
        Intent intent = new Intent(this, MainActivity.class)
            .addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);
        PendingIntent pendingIntent = PendingIntent.getActivity(
            this,
            0,
            intent,
            PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE
        );
        return new NotificationCompat.Builder(this, CHANNEL_ID)
            .setSmallIcon(R.drawable.ic_stat_schoolix_notification)
            .setContentTitle("Schoolix vehicle tracking")
            .setContentText(text)
            .setOngoing(true)
            .setPriority(NotificationCompat.PRIORITY_LOW)
            .setContentIntent(pendingIntent)
            .build();
    }

    private void createChannel() {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) return;
        NotificationManager manager = getSystemService(NotificationManager.class);
        if (manager == null) return;
        NotificationChannel channel = new NotificationChannel(
            CHANNEL_ID,
            "Vehicle tracking",
            NotificationManager.IMPORTANCE_LOW
        );
        channel.setDescription("Shows when Schoolix is sharing the assigned vehicle location.");
        manager.createNotificationChannel(channel);
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }
}
