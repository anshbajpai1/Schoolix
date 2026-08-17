package com.schoolix.app.updates;

import android.os.Handler;
import android.os.Looper;

import java.io.BufferedInputStream;
import java.io.ByteArrayOutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class UpdateCheckClient {
    public interface Callback {
        void onUpdateInfo(UpdateInfo updateInfo);
        void onError(Exception exception);
    }

    private final ExecutorService executor = Executors.newSingleThreadExecutor();
    private final Handler mainHandler = new Handler(Looper.getMainLooper());

    public void fetch(String jsonUrl, Callback callback) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                HttpURLConnection connection = null;
                try {
                    URL url = new URL(jsonUrl);
                    connection = (HttpURLConnection) url.openConnection();
                    connection.setConnectTimeout(10000);
                    connection.setReadTimeout(15000);
                    connection.setRequestMethod("GET");
                    connection.setUseCaches(false);

                    int responseCode = connection.getResponseCode();
                    if (responseCode < 200 || responseCode >= 300) {
                        throw new IllegalStateException("Update check failed with HTTP " + responseCode);
                    }

                    BufferedInputStream input = new BufferedInputStream(connection.getInputStream());
                    ByteArrayOutputStream output = new ByteArrayOutputStream();
                    byte[] buffer = new byte[4096];
                    int read;
                    while ((read = input.read(buffer)) != -1) {
                        output.write(buffer, 0, read);
                    }
                    input.close();

                    UpdateInfo updateInfo = UpdateInfo.fromJson(new String(output.toByteArray(), StandardCharsets.UTF_8));
                    mainHandler.post(new Runnable() {
                        @Override
                        public void run() {
                            callback.onUpdateInfo(updateInfo);
                        }
                    });
                } catch (Exception exception) {
                    mainHandler.post(new Runnable() {
                        @Override
                        public void run() {
                            callback.onError(exception);
                        }
                    });
                } finally {
                    if (connection != null) {
                        connection.disconnect();
                    }
                }
            }
        });
    }
}
