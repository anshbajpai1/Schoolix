package com.schoolix.app.updates;

import android.content.Context;
import android.os.Handler;
import android.os.Looper;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class ApkDownloader {
    public interface Callback {
        void onProgress(int percent, long downloadedBytes, long totalBytes);
        void onComplete(File apkFile);
        void onError(Exception exception);
    }

    private final Context context;
    private final ExecutorService executor = Executors.newSingleThreadExecutor();
    private final Handler mainHandler = new Handler(Looper.getMainLooper());

    public ApkDownloader(Context context) {
        this.context = context.getApplicationContext();
    }

    public void download(String apkUrl, Callback callback) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                HttpURLConnection connection = null;
                File apkFile = getTargetFile();
                try {
                    URL url = new URL(apkUrl);
                    connection = (HttpURLConnection) url.openConnection();
                    connection.setConnectTimeout(15000);
                    connection.setReadTimeout(30000);
                    connection.setUseCaches(false);

                    int responseCode = connection.getResponseCode();
                    if (responseCode < 200 || responseCode >= 300) {
                        throw new IllegalStateException("APK download failed with HTTP " + responseCode);
                    }

                    long totalBytes = connection.getContentLength();
                    File parent = apkFile.getParentFile();
                    if (parent != null && !parent.exists() && !parent.mkdirs()) {
                        throw new IllegalStateException("Unable to prepare update folder.");
                    }
                    if (apkFile.exists() && !apkFile.delete()) {
                        throw new IllegalStateException("Unable to replace old update file.");
                    }

                    BufferedInputStream input = new BufferedInputStream(connection.getInputStream());
                    FileOutputStream output = new FileOutputStream(apkFile);
                    byte[] buffer = new byte[8192];
                    long downloadedBytes = 0;
                    int read;
                    while ((read = input.read(buffer)) != -1) {
                        output.write(buffer, 0, read);
                        downloadedBytes += read;
                        int percent = totalBytes > 0 ? (int) Math.min(100, (downloadedBytes * 100) / totalBytes) : -1;
                        long finalDownloadedBytes = downloadedBytes;
                        mainHandler.post(new Runnable() {
                            @Override
                            public void run() {
                                callback.onProgress(percent, finalDownloadedBytes, totalBytes);
                            }
                        });
                    }
                    output.flush();
                    output.close();
                    input.close();

                    mainHandler.post(new Runnable() {
                        @Override
                        public void run() {
                            callback.onComplete(apkFile);
                        }
                    });
                } catch (Exception exception) {
                    if (apkFile.exists()) {
                        apkFile.delete();
                    }
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

    private File getTargetFile() {
        return new File(new File(context.getCacheDir(), "updates"), "Schoolix-update.apk");
    }
}
