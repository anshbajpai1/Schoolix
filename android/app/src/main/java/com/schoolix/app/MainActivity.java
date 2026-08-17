package com.schoolix.app;

import android.Manifest;
import android.app.Activity;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.provider.Settings;
import android.print.PrintAttributes;
import android.print.PrintDocumentAdapter;
import android.print.PrintManager;
import android.util.Log;
import android.webkit.JavascriptInterface;
import android.webkit.WebBackForwardList;
import android.webkit.WebHistoryItem;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import androidx.activity.OnBackPressedCallback;
import androidx.activity.result.ActivityResult;
import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.appcompat.app.AlertDialog;
import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;
import androidx.core.content.ContextCompat;

import com.getcapacitor.BridgeActivity;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.android.gms.auth.api.signin.GoogleSignIn;
import com.google.android.gms.auth.api.signin.GoogleSignInAccount;
import com.google.android.gms.auth.api.signin.GoogleSignInClient;
import com.google.android.gms.auth.api.signin.GoogleSignInOptions;
import com.google.android.gms.common.api.ApiException;
import com.schoolix.app.updates.AppUpdateManager;
import com.schoolix.app.tracking.LocationTrackingService;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.LinkedHashSet;
import java.util.Set;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class MainActivity extends BridgeActivity {
    private static final String NOTIFICATION_TAG = "SchoolixNotifications";
    public static final String APP_UPDATE_TOPIC = "schoolix_app_updates";
    private AppUpdateManager appUpdateManager;
    private WebView activePrintWebView;
    private AlertDialog exitDialog;
    private GoogleSignInClient googleSignInClient;
    private ActivityResultLauncher<Intent> googleSignInLauncher;
    private final Handler notificationRetryHandler = new Handler(Looper.getMainLooper());
    private final ExecutorService notificationExecutor = Executors.newSingleThreadExecutor();
    private final ActivityResultLauncher<String> notificationPermissionLauncher =
        registerForActivityResult(new ActivityResultContracts.RequestPermission(), granted -> {
            emitNotificationStatus(granted ? "permission-granted" : "permission-denied", granted ? "" : "Android notification permission is blocked");
        });
    private final ActivityResultLauncher<String> locationPermissionLauncher =
        registerForActivityResult(new ActivityResultContracts.RequestPermission(), granted -> {
            emitLocationStatus(granted ? "permission-granted" : "permission-denied", granted ? "" : "Android location permission is blocked");
        });

    private static MainActivity activeInstance;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        activeInstance = this;
        configureGoogleSignIn();
        createNotificationChannel();
        subscribeToAppUpdateTopic();
        askNotificationPermission();
        bridge.getWebView().addJavascriptInterface(new NativePrintBridge(), "SchoolixNativePrint");
        bridge.getWebView().addJavascriptInterface(new NativeNotificationBridge(), "SchoolixNativeNotifications");
        bridge.getWebView().addJavascriptInterface(new NativeAuthBridge(), "SchoolixNativeAuth");
        bridge.getWebView().addJavascriptInterface(new NativeUpdateBridge(), "SchoolixNativeUpdate");
        bridge.getWebView().addJavascriptInterface(new NativeLocationBridge(), "SchoolixNativeLocation");
        getOnBackPressedDispatcher().addCallback(this, new OnBackPressedCallback(true) {
            @Override
            public void handleOnBackPressed() {
                handleHardwareBack();
            }
        });
        appUpdateManager = new AppUpdateManager(this);
        appUpdateManager.checkForUpdates();
    }

    public static void emitTrackingStatus(Context context, String status, String error) {
        MainActivity instance = activeInstance;
        if (instance != null) instance.emitLocationStatus(status, error);
    }

    private void configureGoogleSignIn() {
        GoogleSignInOptions options = new GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
            .requestIdToken(getString(R.string.default_web_client_id))
            .requestEmail()
            .build();
        googleSignInClient = GoogleSignIn.getClient(this, options);
        googleSignInLauncher = registerForActivityResult(
            new ActivityResultContracts.StartActivityForResult(),
            this::handleGoogleSignInResult
        );
    }

    private void createNotificationChannel() {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) return;
        NotificationManager manager = getSystemService(NotificationManager.class);
        if (manager == null) return;
        NotificationChannel channel = new NotificationChannel(
            getString(R.string.notification_channel_id),
            getString(R.string.notification_channel_name),
            NotificationManager.IMPORTANCE_HIGH
        );
        channel.setDescription(getString(R.string.notification_channel_description));
        channel.enableVibration(true);
        manager.createNotificationChannel(channel);
    }

    private void subscribeToAppUpdateTopic() {
        FirebaseMessaging.getInstance().subscribeToTopic(APP_UPDATE_TOPIC)
            .addOnSuccessListener(unused -> Log.i(NOTIFICATION_TAG, "Subscribed to app update notifications"))
            .addOnFailureListener(error -> Log.e(NOTIFICATION_TAG, "App update topic subscription failed", error));
    }

    private void askNotificationPermission() {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.TIRAMISU) return;
        if (ContextCompat.checkSelfPermission(this, Manifest.permission.POST_NOTIFICATIONS)
            == PackageManager.PERMISSION_GRANTED) return;

        boolean permissionWasRequested = getPreferences(Context.MODE_PRIVATE)
            .getBoolean("notificationPermissionPrompted", false);
        if (permissionWasRequested && !shouldShowRequestPermissionRationale(Manifest.permission.POST_NOTIFICATIONS)) {
            new AlertDialog.Builder(this)
                .setTitle("Turn on Schoolix notifications")
                .setMessage("Phone notifications are currently blocked. Open app settings and allow Notifications for Schoolix.")
                .setNegativeButton("Not now", null)
                .setPositiveButton("Open settings", (dialog, which) -> openNotificationSettings())
                .show();
            return;
        }

        new AlertDialog.Builder(this)
            .setTitle("Enable school notifications")
            .setMessage("Allow Schoolix to show important school announcements in your phone's notification bar.")
            .setNegativeButton("Not now", null)
            .setPositiveButton("Allow", (dialog, which) -> {
                markNotificationPermissionPrompted();
                notificationPermissionLauncher.launch(Manifest.permission.POST_NOTIFICATIONS);
            })
            .show();
    }

    private void openNotificationSettings() {
        Intent intent = new Intent(Settings.ACTION_APP_NOTIFICATION_SETTINGS)
            .putExtra(Settings.EXTRA_APP_PACKAGE, getPackageName());
        try {
            startActivity(intent);
        } catch (Exception error) {
            startActivity(new Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS)
                .setData(Uri.parse("package:" + getPackageName())));
        }
    }

    private void markNotificationPermissionPrompted() {
        getPreferences(Context.MODE_PRIVATE)
            .edit()
            .putBoolean("notificationPermissionPrompted", true)
            .apply();
    }

    @Override
    public void onResume() {
        super.onResume();
        if (appUpdateManager != null) {
            appUpdateManager.resumePendingInstallIfAllowed();
        }
        if (bridge != null && bridge.getWebView() != null) {
            WebView webView = bridge.getWebView();
            webView.post(() -> webView.evaluateJavascript(
                "window.dispatchEvent(new CustomEvent('schoolix:app-resume'));",
                null
            ));
        }
    }

    private class NativePrintBridge {
        @JavascriptInterface
        public void printHtml(String title, String html) {
            runOnUiThread(() -> printHtmlDocument(title, html));
        }
    }

    private class NativeAuthBridge {
        @JavascriptInterface
        public void signInWithGoogle() {
            runOnUiThread(() -> {
                if (googleSignInClient == null || googleSignInLauncher == null) {
                    emitGoogleAuthError("Google login is not ready yet");
                    return;
                }
                googleSignInClient.signOut().addOnCompleteListener(task ->
                    googleSignInLauncher.launch(googleSignInClient.getSignInIntent())
                );
            });
        }
    }

    private class NativeUpdateBridge {
        @JavascriptInterface
        public String getInstalledVersionCode() {
            return String.valueOf(appUpdateManager == null ? 0 : appUpdateManager.installedVersionCode());
        }

        @JavascriptInterface
        public void checkForUpdates() {
            runOnUiThread(() -> {
                if (appUpdateManager != null) appUpdateManager.checkForUpdatesFromWeb();
            });
        }

        @JavascriptInterface
        public void showUpdatePrompt() {
            runOnUiThread(() -> {
                if (appUpdateManager != null) appUpdateManager.showLatestUpdateFromWeb();
            });
        }
    }

    private class NativeLocationBridge {
        @JavascriptInterface
        public String hasLocationPermission() {
            return String.valueOf(hasFineLocationPermission());
        }

        @JavascriptInterface
        public void requestLocationPermission() {
            runOnUiThread(() -> {
                if (hasFineLocationPermission()) {
                    emitLocationStatus("permission-granted", "");
                    return;
                }
                locationPermissionLauncher.launch(Manifest.permission.ACCESS_FINE_LOCATION);
            });
        }

        @JavascriptInterface
        public void startTracking(String configJson) {
            runOnUiThread(() -> {
                if (!hasFineLocationPermission()) {
                    emitLocationStatus("permission-denied", "Location permission is required.");
                    return;
                }
                Intent intent = new Intent(MainActivity.this, LocationTrackingService.class)
                    .setAction(LocationTrackingService.ACTION_START)
                    .putExtra(LocationTrackingService.EXTRA_CONFIG_JSON, configJson == null ? "" : configJson);
                try {
                    ContextCompat.startForegroundService(MainActivity.this, intent);
                    emitLocationStatus("tracking-started", "");
                } catch (Exception error) {
                    Log.e(NOTIFICATION_TAG, "Unable to start vehicle tracking", error);
                    emitLocationStatus("tracking-start-failed", "Unable to start location service");
                }
            });
        }

        @JavascriptInterface
        public void stopTracking() {
            runOnUiThread(() -> {
                Intent intent = new Intent(MainActivity.this, LocationTrackingService.class)
                    .setAction(LocationTrackingService.ACTION_STOP);
                startService(intent);
                emitLocationStatus("tracking-stopped", "");
            });
        }
    }

    private boolean hasFineLocationPermission() {
        return ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION)
            == PackageManager.PERMISSION_GRANTED;
    }

    private void emitLocationStatus(String status, String error) {
        runOnUiThread(() -> {
            try {
                WebView webView = bridge.getWebView();
                if (webView == null) return;
                String script = "window.SchoolixNativeLocationStatus&&window.SchoolixNativeLocationStatus.receiveStatus(" +
                    new JSONObject()
                        .put("status", status == null ? "" : status)
                        .put("error", error == null ? "" : error)
                        .put("permissionGranted", hasFineLocationPermission())
                        .put("updatedAt", System.currentTimeMillis())
                        .toString()
                    + ");";
                webView.evaluateJavascript(script, null);
            } catch (Exception ignored) {}
        });
    }

    public void emitUpdateState(JSONObject updateInfo) {
        runOnUiThread(() -> {
            try {
                WebView webView = bridge.getWebView();
                if (webView == null) return;
                JSONObject payload = new JSONObject()
                    .put("available", updateInfo != null)
                    .put("update", updateInfo == null ? JSONObject.NULL : updateInfo);
                webView.evaluateJavascript(
                    "window.SchoolixAppUpdate&&window.SchoolixAppUpdate.receiveNativeUpdate(" + payload.toString() + ");",
                    null
                );
            } catch (Exception ignored) {}
        });
    }

    private class NativeNotificationBridge {
        @JavascriptInterface
        public void subscribeToSchool(String schoolId) {
            updateSchoolNotificationTopics(schoolId, "");
        }

        @JavascriptInterface
        public void subscribeToSchoolAudience(String schoolId, String role) {
            updateSchoolNotificationTopics(schoolId, role, "");
        }

        @JavascriptInterface
        public void subscribeToSchoolAudienceForStudent(String schoolId, String role, String studentId) {
            updateSchoolNotificationTopics(schoolId, role, studentId);
        }

        @JavascriptInterface
        public void subscribeToSchoolAudienceForStudentAliases(String schoolId, String role, String studentAliasesJson) {
            updateSchoolNotificationTopics(schoolId, role, parseStudentAliases("", studentAliasesJson, ""));
        }

        @JavascriptInterface
        public void requestDeviceToken() {
            requestFcmToken("device-token", 0, token -> runOnUiThread(() -> {
                WebView webView = bridge.getWebView();
                if (webView == null) return;
                String script = "if(window.SchoolixNotificationRegistration){" +
                    "(window.SchoolixNotificationRegistration.registerToken||window.SchoolixNotificationRegistration.receiveToken).call(window.SchoolixNotificationRegistration," + JSONObject.quote(token) + ");}";
                webView.evaluateJavascript(script, null);
            }));
        }

        @JavascriptInterface
        public void requestNotificationPermission() {
            runOnUiThread(() -> askNotificationPermission());
        }

        @JavascriptInterface
        public void registerDevice(
            String schoolId,
            String role,
            String studentId,
            String authUid,
            String loginAs,
            String firebaseIdToken
        ) {
            requestFcmToken("native-registration", 0, token -> notificationExecutor.execute(() -> registerDeviceInFirestore(
                    schoolId,
                    role,
                    studentId,
                    "",
                    authUid,
                    loginAs,
                    firebaseIdToken,
                    token
                )));
        }

        @JavascriptInterface
        public void registerDeviceWithAliases(
            String schoolId,
            String role,
            String studentId,
            String studentAliasesJson,
            String authUid,
            String loginAs,
            String firebaseIdToken
        ) {
            requestFcmToken("native-registration", 0, token -> notificationExecutor.execute(() -> registerDeviceInFirestore(
                    schoolId,
                    role,
                    studentId,
                    studentAliasesJson,
                    authUid,
                    loginAs,
                    firebaseIdToken,
                    token
                )));
        }

        @JavascriptInterface
        public void getNotificationStatus() {
            emitNotificationStatusFromPrefs();
        }

        @JavascriptInterface
        public void showLocalNotification(String notificationId, String title, String body) {
            runOnUiThread(() -> showNativeNotification(notificationId, title, body));
        }

        @JavascriptInterface
        public void clearSchool() {
            updateSchoolNotificationTopics("", "");
        }
    }

    private void showNativeNotification(String notificationId, String title, String body) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU &&
            ContextCompat.checkSelfPermission(this, Manifest.permission.POST_NOTIFICATIONS) != PackageManager.PERMISSION_GRANTED) {
            rememberNotificationStatus("permission-denied", "Android notification permission is blocked");
            return;
        }
        String cleanId = cleanNotificationId(notificationId);
        if (cleanId.isEmpty()) cleanId = String.valueOf(System.currentTimeMillis());
        if (alreadyHandledNotification(cleanId)) return;
        String cleanTitle = title == null || title.trim().isEmpty() ? "Schoolix" : title.trim();
        String cleanBody = body == null ? "" : body.trim();
        Intent intent = new Intent(this, MainActivity.class)
            .addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);
        PendingIntent pendingIntent = PendingIntent.getActivity(
            this,
            cleanId.hashCode(),
            intent,
            PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE
        );
        NotificationCompat.Builder notification = new NotificationCompat.Builder(
            this,
            getString(R.string.notification_channel_id)
        )
            .setSmallIcon(R.drawable.ic_stat_schoolix_notification)
            .setColor(ContextCompat.getColor(this, R.color.colorPrimary))
            .setContentTitle(cleanTitle)
            .setContentText(cleanBody)
            .setStyle(new NotificationCompat.BigTextStyle().bigText(cleanBody))
            .setPriority(NotificationCompat.PRIORITY_HIGH)
            .setAutoCancel(true)
            .setContentIntent(pendingIntent);
        NotificationManagerCompat.from(this).notify(cleanId.hashCode(), notification.build());
    }

    private boolean alreadyHandledNotification(String notificationId) {
        notificationId = cleanNotificationId(notificationId);
        if (notificationId.isEmpty()) return false;
        String recent = getSharedPreferences("schoolix_notifications", Context.MODE_PRIVATE)
            .getString("recentNotificationIds", "");
        Set<String> recentIds = new LinkedHashSet<>();
        for (String id : recent.split(",")) {
            if (!id.trim().isEmpty()) recentIds.add(id.trim());
        }
        if (recentIds.contains(notificationId)) return true;
        recentIds.add(notificationId);
        while (recentIds.size() > 25) {
            String first = recentIds.iterator().next();
            recentIds.remove(first);
        }
        getSharedPreferences("schoolix_notifications", Context.MODE_PRIVATE)
            .edit()
            .putString("lastNotificationId", notificationId)
            .putString("recentNotificationIds", String.join(",", recentIds))
            .apply();
        return false;
    }

    private String cleanNotificationId(String notificationId) {
        return notificationId == null ? "" : notificationId.trim().toLowerCase();
    }

    private interface FcmTokenCallback {
        void onToken(String token);
    }

    private void requestFcmToken(String purpose, int attempt, FcmTokenCallback callback) {
        FirebaseMessaging.getInstance().getToken()
            .addOnSuccessListener(token -> {
                if (token == null || token.trim().length() < 40) {
                    handleFcmTokenFailure(purpose, attempt, new IllegalStateException("Firebase returned an empty notification token"), callback);
                    return;
                }
                getSharedPreferences("schoolix_notifications", Context.MODE_PRIVATE)
                    .edit()
                    .putString("lastDeviceToken", token)
                    .apply();
                rememberNotificationStatus("token-ready", "");
                callback.onToken(token);
            })
            .addOnFailureListener(error -> handleFcmTokenFailure(purpose, attempt, error, callback));
    }

    private void handleFcmTokenFailure(String purpose, int attempt, Exception error, FcmTokenCallback callback) {
        String cachedToken = getSharedPreferences("schoolix_notifications", Context.MODE_PRIVATE)
            .getString("lastDeviceToken", "");
        if (cachedToken != null && cachedToken.trim().length() >= 40) {
            rememberNotificationStatus("token-ready-cached", "Using saved phone notification token while Google service reconnects.");
            callback.onToken(cachedToken);
            return;
        }

        String message = tokenErrorMessage(error);
        if (isTemporaryTokenError(error) && attempt < 6) {
            long delayMs = Math.min(60000L, 1500L * (1L << attempt));
            rememberNotificationStatus("token-retrying", message + " Retrying automatically.");
            Log.w(NOTIFICATION_TAG, "FCM token unavailable for " + purpose + ", retry " + (attempt + 1), error);
            notificationRetryHandler.postDelayed(() -> requestFcmToken(purpose, attempt + 1, callback), delayMs);
            return;
        }

        rememberNotificationStatus("token-waiting", message);
        Log.e(NOTIFICATION_TAG, "Unable to get FCM token for " + purpose, error);
    }

    private boolean isTemporaryTokenError(Exception error) {
        String message = String.valueOf(error == null ? "" : error.getMessage()).toLowerCase();
        String name = error == null ? "" : error.getClass().getName().toLowerCase();
        return message.contains("service_not_available")
            || message.contains("service not available")
            || message.contains("ioexception")
            || name.contains("ioexception")
            || name.contains("executionexception");
    }

    private String tokenErrorMessage(Exception error) {
        String raw = String.valueOf(error == null ? "" : error.getMessage()).trim();
        String lower = raw.toLowerCase();
        if (lower.contains("service_not_available") || lower.contains("service not available")) {
            return "Google notification service abhi available nahi hai.";
        }
        if (raw.isEmpty()) return "Phone notification token abhi ready nahi hua.";
        return raw;
    }

    private void registerDeviceInFirestore(
        String schoolId,
        String role,
        String studentId,
        String studentAliasesJson,
        String authUid,
        String loginAs,
        String firebaseIdToken,
        String deviceToken
    ) {
        String cleanSchoolId = schoolId == null ? "" : schoolId.trim();
        String cleanRole = role == null ? "" : role.trim().toLowerCase();
        String cleanAuthUid = authUid == null ? "" : authUid.trim();
        String cleanIdToken = firebaseIdToken == null ? "" : firebaseIdToken.trim();
        if (cleanSchoolId.isEmpty() || cleanSchoolId.contains("/") || cleanAuthUid.isEmpty()
            || cleanIdToken.isEmpty() || deviceToken == null || deviceToken.length() < 40) {
            rememberNotificationStatus("registration-skipped", "Missing school, login, or phone token");
            return;
        }
        if (!cleanRole.equals("teachers") && !cleanRole.equals("students") && !cleanRole.equals("librarians") && !cleanRole.equals("accountants") && !cleanRole.equals("drivers")) {
            rememberNotificationStatus("registration-skipped", "This role is not enabled for phone alerts");
            return;
        }

        HttpURLConnection connection = null;
        try {
            String deviceId = sha256Hex(deviceToken);
            String encodedSchool = URLEncoder.encode(cleanSchoolId, StandardCharsets.UTF_8.name());
            URL url = new URL(
                "https://firestore.googleapis.com/v1/projects/schoolix-48107/databases/(default)/documents/schools/"
                    + encodedSchool + "/notificationDevices/" + deviceId
            );
            connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("PATCH");
            connection.setConnectTimeout(12000);
            connection.setReadTimeout(15000);
            connection.setDoOutput(true);
            connection.setRequestProperty("Authorization", "Bearer " + cleanIdToken);
            connection.setRequestProperty("Content-Type", "application/json; charset=UTF-8");

            JSONObject fields = new JSONObject();
            fields.put("schoolId", firestoreString(cleanSchoolId));
            fields.put("uid", firestoreString(cleanAuthUid));
            fields.put("role", firestoreString(cleanRole));
            fields.put("token", firestoreString(deviceToken));
            fields.put("studentId", firestoreString(studentId));
            fields.put("studentAliases", firestoreStringArray(parseStudentAliases(studentId, studentAliasesJson, cleanAuthUid)));
            fields.put("authUid", firestoreString(cleanAuthUid));
            fields.put("loginAs", firestoreString(loginAs));
            fields.put("platform", firestoreString("android"));
            fields.put("updatedAt", firestoreString(String.valueOf(System.currentTimeMillis())));
            byte[] requestBody = new JSONObject().put("fields", fields)
                .toString().getBytes(StandardCharsets.UTF_8);
            try (OutputStream output = connection.getOutputStream()) {
                output.write(requestBody);
            }

            int status = connection.getResponseCode();
            String responseBody = readResponseBody(status >= 200 && status < 300
                ? connection.getInputStream()
                : connection.getErrorStream());
            if (status < 200 || status >= 300) {
                rememberNotificationStatus("registration-failed", "HTTP " + status + ": " + responseBody);
                Log.e(NOTIFICATION_TAG, "Native device registration failed HTTP " + status + ": " + responseBody);
                return;
            }
            getSharedPreferences("schoolix_notifications", Context.MODE_PRIVATE)
                .edit()
                .putString("registeredDeviceId", deviceId)
                .putString("registeredSchoolId", cleanSchoolId)
                .putString("registeredRole", cleanRole)
                .putString("lastStatus", "ready")
                .putString("lastError", "")
                .apply();
            updateSchoolNotificationTopics(cleanSchoolId, cleanRole, parseStudentAliases(studentId, studentAliasesJson, cleanAuthUid));
            Log.i(NOTIFICATION_TAG, "Phone registered for " + cleanRole + " notifications");
            emitNotificationStatus("ready", "");
        } catch (Exception error) {
            rememberNotificationStatus("registration-failed", error.getMessage());
            Log.e(NOTIFICATION_TAG, "Native phone registration failed", error);
        } finally {
            if (connection != null) connection.disconnect();
        }
    }

    private void rememberNotificationStatus(String status, String error) {
        getSharedPreferences("schoolix_notifications", Context.MODE_PRIVATE)
            .edit()
            .putString("lastStatus", status == null ? "" : status)
            .putString("lastError", error == null ? "" : error)
            .apply();
        emitNotificationStatus(status, error);
    }

    private void emitNotificationStatusFromPrefs() {
        String status = getSharedPreferences("schoolix_notifications", Context.MODE_PRIVATE)
            .getString("lastStatus", "");
        String error = getSharedPreferences("schoolix_notifications", Context.MODE_PRIVATE)
            .getString("lastError", "");
        emitNotificationStatus(status, error);
    }

    private void emitNotificationStatus(String status, String error) {
        runOnUiThread(() -> {
            try {
                boolean permissionGranted = Build.VERSION.SDK_INT < Build.VERSION_CODES.TIRAMISU ||
                    ContextCompat.checkSelfPermission(this, Manifest.permission.POST_NOTIFICATIONS) == PackageManager.PERMISSION_GRANTED;
                String schoolId = getSharedPreferences("schoolix_notifications", Context.MODE_PRIVATE)
                    .getString("registeredSchoolId", "");
                String role = getSharedPreferences("schoolix_notifications", Context.MODE_PRIVATE)
                    .getString("registeredRole", "");
                String script = "window.SchoolixNativeNotificationStatus&&window.SchoolixNativeNotificationStatus.receiveStatus(" +
                    new JSONObject()
                        .put("status", status == null ? "" : status)
                        .put("error", error == null ? "" : error)
                        .put("permissionGranted", permissionGranted)
                        .put("schoolId", schoolId)
                        .put("role", role)
                        .toString()
                    + ");";
                WebView webView = bridge.getWebView();
                if (webView != null) webView.evaluateJavascript(script, null);
            } catch (Exception ignored) {}
        });
    }

    private void handleGoogleSignInResult(ActivityResult activityResult) {
        if (activityResult.getResultCode() != Activity.RESULT_OK) {
            emitGoogleAuthError("Google login was cancelled");
            return;
        }
        try {
            GoogleSignInAccount account = GoogleSignIn.getSignedInAccountFromIntent(activityResult.getData())
                .getResult(ApiException.class);
            String idToken = account == null ? "" : account.getIdToken();
            if (idToken == null || idToken.trim().isEmpty()) {
                emitGoogleAuthError("Google login token was not received");
                return;
            }
            emitGoogleAuthToken(idToken);
        } catch (Exception error) {
            emitGoogleAuthError(error.getMessage());
            Log.e("SchoolixGoogleAuth", "Google sign-in failed", error);
        }
    }

    private void emitGoogleAuthToken(String idToken) {
        runOnUiThread(() -> {
            WebView webView = bridge.getWebView();
            if (webView == null) return;
            String script = "window.SchoolixNativeGoogleAuth&&window.SchoolixNativeGoogleAuth.receiveIdToken(" +
                JSONObject.quote(idToken == null ? "" : idToken) + ");";
            webView.evaluateJavascript(script, null);
        });
    }

    private void emitGoogleAuthError(String error) {
        runOnUiThread(() -> {
            WebView webView = bridge.getWebView();
            if (webView == null) return;
            String script = "window.SchoolixNativeGoogleAuth&&window.SchoolixNativeGoogleAuth.receiveError(" +
                JSONObject.quote(error == null || error.trim().isEmpty() ? "Google login failed" : error) + ");";
            webView.evaluateJavascript(script, null);
        });
    }

    private JSONObject firestoreString(String value) throws Exception {
        return new JSONObject().put("stringValue", value == null ? "" : value);
    }

    private JSONObject firestoreStringArray(Set<String> values) throws Exception {
        JSONArray arrayValues = new JSONArray();
        for (String value : values) {
            if (value != null && !value.trim().isEmpty()) {
                arrayValues.put(firestoreString(value.trim()));
            }
        }
        return new JSONObject().put("arrayValue", new JSONObject().put("values", arrayValues));
    }

    private String readResponseBody(InputStream input) {
        if (input == null) return "";
        StringBuilder body = new StringBuilder();
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(input, StandardCharsets.UTF_8))) {
            String line;
            while ((line = reader.readLine()) != null) body.append(line);
        } catch (Exception ignored) {}
        return body.toString();
    }

    private void updateSchoolNotificationTopics(String schoolId, String role) {
        updateSchoolNotificationTopics(schoolId, role, "");
    }

    private void updateSchoolNotificationTopics(String schoolId, String role, String studentId) {
        updateSchoolNotificationTopics(schoolId, role, parseStudentAliases(studentId, "", ""));
    }

    private void updateSchoolNotificationTopics(String schoolId, String role, Set<String> studentIds) {
        Set<String> nextTopics = new LinkedHashSet<>();
        if (schoolId != null && !schoolId.trim().isEmpty()) {
            String baseTopic = schoolTopic(schoolId.trim());
            nextTopics.add(baseTopic);
            String audience = notificationAudienceForRole(role);
            if (!audience.isEmpty()) nextTopics.add(baseTopic + "_" + audience);
            if (audience.equals("students")) {
                for (String studentId : studentIds) {
                    if (studentId != null && !studentId.trim().isEmpty()) {
                        nextTopics.add(baseTopic + "_student_" + sha256Hex(studentId.trim().toLowerCase()));
                    }
                }
            }
        }

        Set<String> currentTopics = storedSchoolTopics();
        for (String topic : currentTopics) {
            if (!nextTopics.contains(topic)) FirebaseMessaging.getInstance().unsubscribeFromTopic(topic);
        }
        storeSchoolTopics(nextTopics);
        for (String topic : nextTopics) {
            FirebaseMessaging.getInstance().subscribeToTopic(topic)
                .addOnSuccessListener(unused -> Log.i(NOTIFICATION_TAG, "Subscribed to " + topic))
                .addOnFailureListener(error -> Log.e(NOTIFICATION_TAG, "Topic subscription failed: " + topic, error));
        }
    }

    private Set<String> parseStudentAliases(String studentId, String aliasesJson, String authUid) {
        Set<String> aliases = new LinkedHashSet<>();
        addStudentAlias(aliases, studentId);
        String cleanAliases = aliasesJson == null ? "" : aliasesJson.trim();
        if (!cleanAliases.isEmpty()) {
            try {
                JSONArray array = new JSONArray(cleanAliases);
                for (int index = 0; index < array.length(); index += 1) {
                    addStudentAlias(aliases, array.optString(index, ""));
                }
            } catch (Exception ignored) {
                for (String alias : cleanAliases.split(",")) {
                    addStudentAlias(aliases, alias);
                }
            }
        }
        addStudentAlias(aliases, authUid);
        return aliases;
    }

    private void addStudentAlias(Set<String> aliases, String value) {
        if (value == null) return;
        String clean = value.trim();
        if (clean.isEmpty()) return;
        String normalized = clean.toLowerCase();
        for (String existing : aliases) {
            if (existing.toLowerCase().equals(normalized)) return;
        }
        aliases.add(clean);
    }

    private Set<String> storedSchoolTopics() {
        String stored = getSharedPreferences("schoolix_notifications", Context.MODE_PRIVATE)
            .getString("schoolTopics", "");
        if (stored.isEmpty()) {
            stored = getSharedPreferences("schoolix_notifications", Context.MODE_PRIVATE)
                .getString("schoolTopic", "");
        }
        Set<String> topics = new LinkedHashSet<>();
        for (String topic : stored.split(",")) {
            if (!topic.trim().isEmpty()) topics.add(topic.trim());
        }
        return topics;
    }

    private void storeSchoolTopics(Set<String> topics) {
        getSharedPreferences("schoolix_notifications", Context.MODE_PRIVATE)
            .edit()
            .putString("schoolTopics", String.join(",", topics))
            .putString("schoolTopic", topics.isEmpty() ? "" : topics.iterator().next())
            .apply();
    }

    private String notificationAudienceForRole(String role) {
        String normalized = role == null ? "" : role.trim().toLowerCase();
        if (normalized.equals("teacher") || normalized.equals("teachers")) return "teachers";
        if (normalized.equals("student") || normalized.equals("students") || normalized.equals("parent") || normalized.equals("parents")) return "students";
        if (normalized.equals("librarian") || normalized.equals("librarians")) return "librarians";
        if (normalized.equals("accountant") || normalized.equals("accountants") || normalized.equals("accounts")) return "accountants";
        if (normalized.equals("driver") || normalized.equals("drivers")) return "drivers";
        return "";
    }

    private String schoolTopic(String schoolId) {
        return "school_" + sha256Hex(schoolId);
    }

    private String sha256Hex(String value) {
        try {
            byte[] digest = MessageDigest.getInstance("SHA-256")
                .digest(value.getBytes(StandardCharsets.UTF_8));
            StringBuilder hex = new StringBuilder();
            for (byte digestByte : digest) hex.append(String.format("%02x", digestByte));
            return hex.toString();
        } catch (Exception error) {
            throw new IllegalStateException("Unable to prepare notification topic", error);
        }
    }

    private void printHtmlDocument(String title, String html) {
        String jobName = (title == null || title.trim().isEmpty()) ? "Schoolix Document" : title.trim();
        WebView printWebView = new WebView(this);
        activePrintWebView = printWebView;
        printWebView.getSettings().setJavaScriptEnabled(false);
        printWebView.setWebViewClient(new WebViewClient() {
            @Override
            public void onPageFinished(WebView view, String url) {
                PrintManager printManager = (PrintManager) getSystemService(Context.PRINT_SERVICE);
                if (printManager == null) return;
                PrintDocumentAdapter adapter = view.createPrintDocumentAdapter(jobName);
                PrintAttributes attributes = new PrintAttributes.Builder()
                    .setMediaSize(PrintAttributes.MediaSize.ISO_A4)
                    .setColorMode(PrintAttributes.COLOR_MODE_COLOR)
                    .setMinMargins(PrintAttributes.Margins.NO_MARGINS)
                    .build();
                printManager.print(jobName, adapter, attributes);
            }
        });
        printWebView.loadDataWithBaseURL("https://schoolix-48107.web.app/", html == null ? "" : html, "text/html", "UTF-8", null);
    }

    private void handleHardwareBack() {
        WebView webView = bridge.getWebView();
        if (webView == null) {
            showExitConfirmation();
            return;
        }
        webView.evaluateJavascript(
            "(function(){try{return !!(window.SchoolixBack&&window.SchoolixBack.handleBack&&window.SchoolixBack.handleBack());}catch(e){return false;}})();",
            value -> {
                if ("true".equals(value)) return;
                handleNativeBackFallback(webView);
            }
        );
    }

    private void handleNativeBackFallback(WebView webView) {
        String currentUrl = webView.getUrl();
        if (isHomeUrl(currentUrl)) {
            showExitConfirmation();
            return;
        }
        if (shouldNavigateBack(webView)) {
            webView.goBack();
            return;
        }
        webView.loadUrl(homeUrlFor(currentUrl));
    }

    private boolean shouldNavigateBack(WebView webView) {
        if (!webView.canGoBack()) return false;
        WebBackForwardList list = webView.copyBackForwardList();
        int previousIndex = list.getCurrentIndex() - 1;
        if (previousIndex < 0) return false;
        WebHistoryItem previousItem = list.getItemAtIndex(previousIndex);
        String previousUrl = previousItem == null ? "" : String.valueOf(previousItem.getUrl()).toLowerCase();
        return !previousUrl.equals("about:blank") && !isLoginUrl(previousUrl);
    }

    private boolean isHomeUrl(String url) {
        String lower = url == null ? "" : url.toLowerCase();
        return lower.endsWith("/")
            || lower.endsWith("/index.html")
            || lower.contains("/index.html?")
            || lower.endsWith("/admin-dashboard.html")
            || lower.contains("/admin-dashboard.html?")
            || lower.endsWith("/teacher-dashboard.html")
            || lower.contains("/teacher-dashboard.html?")
            || lower.endsWith("/student-dashboard.html")
            || lower.contains("/student-dashboard.html?")
            || lower.endsWith("/library-dashboard.html")
            || lower.contains("/library-dashboard.html?")
            || lower.endsWith("/accountant-dashboard.html")
            || lower.contains("/accountant-dashboard.html?");
    }

    private boolean isLoginUrl(String url) {
        String lower = url == null ? "" : url.toLowerCase();
        return lower.equals("about:blank") || lower.endsWith("/index.html") || lower.contains("/index.html?");
    }

    private String homeUrlFor(String currentUrl) {
        String lower = currentUrl == null ? "" : currentUrl.toLowerCase();
        String target = "index.html";
        if (lower.contains("teacher")) {
            target = "teacher-dashboard.html";
        } else if (lower.contains("student")) {
            target = "student-dashboard.html";
        } else if (lower.contains("library")) {
            target = "library-dashboard.html";
        } else if (lower.contains("accountant") || lower.contains("accounts")) {
            target = "accountant-dashboard.html";
        } else if (
            lower.contains("admin")
                || lower.contains("fees")
                || lower.contains("report")
                || lower.contains("teacher")
                || lower.contains("add-student")
                || lower.contains("students")
                || lower.contains("timetable")
        ) {
            target = "admin-dashboard.html";
        }
        return resolveSiblingUrl(currentUrl, target);
    }

    private String resolveSiblingUrl(String currentUrl, String targetFile) {
        if (currentUrl == null || currentUrl.trim().isEmpty() || currentUrl.equals("about:blank")) {
            return "https://schoolix-48107.web.app/" + targetFile;
        }
        int queryIndex = currentUrl.indexOf("?");
        String cleanUrl = queryIndex >= 0 ? currentUrl.substring(0, queryIndex) : currentUrl;
        int slashIndex = cleanUrl.lastIndexOf("/");
        if (slashIndex < 0) return "https://schoolix-48107.web.app/" + targetFile;
        return cleanUrl.substring(0, slashIndex + 1) + targetFile;
    }

    private void showExitConfirmation() {
        if (isFinishing()) return;
        if (exitDialog != null && exitDialog.isShowing()) return;
        exitDialog = new AlertDialog.Builder(this)
            .setTitle("Exit Schoolix?")
            .setMessage("Do you want to exit the app?")
            .setNegativeButton("Cancel", (dialog, which) -> dialog.dismiss())
            .setPositiveButton("Exit", (dialog, which) -> finishAndRemoveTask())
            .create();
        exitDialog.setOnDismissListener(dialog -> exitDialog = null);
        exitDialog.show();
    }
}
