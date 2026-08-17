package com.schoolix.app.updates;

import android.Manifest;
import android.app.Activity;
import android.app.PendingIntent;
import android.content.Intent;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;
import android.util.Log;

import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;
import androidx.core.content.ContextCompat;

import com.schoolix.app.MainActivity;
import com.schoolix.app.R;

import java.io.File;

public class AppUpdateManager {
    private static final String TAG = "SchoolixUpdate";
    private static final int UPDATE_NOTIFICATION_ID = 4428;

    private final Activity activity;
    private final UpdateCheckClient updateCheckClient;
    private final ApkDownloader apkDownloader;
    private final UpdateInstaller updateInstaller;
    private final UpdateDialogController dialogController;

    private boolean checkInProgress;
    private boolean downloadInProgress;
    private UpdateInfo latestUpdate;

    public AppUpdateManager(Activity activity) {
        this.activity = activity;
        this.updateCheckClient = new UpdateCheckClient();
        this.apkDownloader = new ApkDownloader(activity);
        this.updateInstaller = new UpdateInstaller(activity);
        this.dialogController = new UpdateDialogController(activity);
    }

    public void checkForUpdates() {
        if (checkInProgress) return;
        checkInProgress = true;
        String updateUrl = activity.getString(R.string.update_json_url);
        updateCheckClient.fetch(updateUrl, new UpdateCheckClient.Callback() {
            @Override
            public void onUpdateInfo(UpdateInfo updateInfo) {
                checkInProgress = false;
                if (updateInfo.getVersionCode() > getInstalledVersionCode()) {
                    latestUpdate = updateInfo;
                    emitUpdateState(updateInfo);
                    showUpdate(updateInfo);
                } else {
                    latestUpdate = null;
                    emitUpdateState(null);
                }
            }

            @Override
            public void onError(Exception exception) {
                checkInProgress = false;
                Log.w(TAG, "Unable to check for updates", exception);
            }
        });
    }

    public void checkForUpdatesFromWeb() {
        checkForUpdates();
    }

    public void showLatestUpdateFromWeb() {
        if (latestUpdate != null && latestUpdate.getVersionCode() > getInstalledVersionCode()) {
            showUpdate(latestUpdate);
            return;
        }
        checkForUpdates();
    }

    public long installedVersionCode() {
        return getInstalledVersionCode();
    }

    public void resumePendingInstallIfAllowed() {
        File pendingApk = updateInstaller.getPendingApkFile();
        if (pendingApk == null || !pendingApk.exists()) return;
        if (updateInstaller.canInstallPackages()) {
            updateInstaller.clearPendingApkFile();
            updateInstaller.install(pendingApk);
        } else {
            dialogController.showMessage("Enable Install unknown apps for Schoolix to finish updating.");
        }
    }

    private void showUpdate(UpdateInfo updateInfo) {
        dialogController.showUpdateDialog(updateInfo, new UpdateDialogController.ActionListener() {
            @Override
            public void onUpdateNow(UpdateInfo selectedUpdate) {
                startDownload(selectedUpdate);
            }

            @Override
            public void onOpenDownload(UpdateInfo selectedUpdate) {
                openDownloadInBrowser(selectedUpdate);
            }

            @Override
            public void onLater() {
                // Optional updates can be skipped for the current launch.
                emitUpdateState(updateInfo);
            }
        });
    }

    private void openDownloadInBrowser(UpdateInfo updateInfo) {
        try {
            Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(updateInfo.getApkUrl()));
            activity.startActivity(intent);
        } catch (Exception exception) {
            Log.w(TAG, "Unable to open APK download link", exception);
            dialogController.showMessage("Unable to open download link. Please try Update Now again.");
        }
    }

    private void startDownload(UpdateInfo updateInfo) {
        if (downloadInProgress) return;
        downloadInProgress = true;
        dialogController.dismissUpdateDialog();
        dialogController.showProgressDialog();
        showUpdateNotification("Downloading Schoolix update", "Preparing download...", 0, true, true);
        apkDownloader.download(updateInfo.getApkUrl(), new ApkDownloader.Callback() {
            @Override
            public void onProgress(int percent, long downloadedBytes, long totalBytes) {
                dialogController.updateProgress(percent, downloadedBytes, totalBytes);
                if (percent >= 0) {
                    showUpdateNotification(
                        "Downloading Schoolix update",
                        percent + "% downloaded",
                        percent,
                        false,
                        true
                    );
                } else {
                    showUpdateNotification(
                        "Downloading Schoolix update",
                        "Downloading update...",
                        0,
                        true,
                        true
                    );
                }
            }

            @Override
            public void onComplete(File apkFile) {
                downloadInProgress = false;
                dialogController.dismissProgressDialog();
                showUpdateNotification(
                    "Schoolix update ready",
                    "Tap to install the downloaded update.",
                    100,
                    false,
                    false
                );
                installOrRequestPermission(apkFile);
            }

            @Override
            public void onError(Exception exception) {
                downloadInProgress = false;
                dialogController.dismissProgressDialog();
                Log.e(TAG, "Update download failed", exception);
                showUpdateNotification(
                    "Schoolix update failed",
                    "Download failed. Please check your internet and try again.",
                    0,
                    false,
                    false
                );
                dialogController.showMessage("Update download failed. Please check your internet and try again.");
                if (updateInfo.isForceUpdate()) {
                    showUpdate(updateInfo);
                }
            }
        });
    }

    private void installOrRequestPermission(File apkFile) {
        if (updateInstaller.canInstallPackages()) {
            updateInstaller.install(apkFile);
            return;
        }
        dialogController.showMessage("Allow Schoolix to install unknown apps, then return here to continue.");
        updateInstaller.requestUnknownAppsPermission(apkFile);
    }

    private long getInstalledVersionCode() {
        try {
            PackageInfo packageInfo = activity.getPackageManager().getPackageInfo(activity.getPackageName(), 0);
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
                return packageInfo.getLongVersionCode();
            }
            return packageInfo.versionCode;
        } catch (PackageManager.NameNotFoundException exception) {
            Log.w(TAG, "Unable to read installed versionCode", exception);
            return 0;
        }
    }

    private void emitUpdateState(UpdateInfo updateInfo) {
        if (!(activity instanceof MainActivity)) return;
        try {
            ((MainActivity) activity).emitUpdateState(updateInfo == null ? null : updateInfo.toJson());
        } catch (Exception exception) {
            Log.w(TAG, "Unable to share update state with web shell", exception);
        }
    }

    private boolean canPostNotifications() {
        return Build.VERSION.SDK_INT < Build.VERSION_CODES.TIRAMISU ||
            ContextCompat.checkSelfPermission(activity, Manifest.permission.POST_NOTIFICATIONS) == PackageManager.PERMISSION_GRANTED;
    }

    private PendingIntent updatePendingIntent() {
        Intent intent = new Intent(activity, MainActivity.class)
            .addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);
        return PendingIntent.getActivity(
            activity,
            UPDATE_NOTIFICATION_ID,
            intent,
            PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE
        );
    }

    private void showUpdateNotification(String title, String text, int percent, boolean indeterminate, boolean ongoing) {
        if (!canPostNotifications()) return;
        NotificationCompat.Builder notification = new NotificationCompat.Builder(
            activity,
            activity.getString(R.string.notification_channel_id)
        )
            .setSmallIcon(R.drawable.ic_stat_schoolix_notification)
            .setColor(ContextCompat.getColor(activity, R.color.colorPrimary))
            .setContentTitle(title)
            .setContentText(text)
            .setStyle(new NotificationCompat.BigTextStyle().bigText(text))
            .setPriority(NotificationCompat.PRIORITY_LOW)
            .setOnlyAlertOnce(true)
            .setOngoing(ongoing)
            .setAutoCancel(!ongoing)
            .setContentIntent(updatePendingIntent())
            .setProgress(100, Math.max(0, Math.min(100, percent)), indeterminate);
        NotificationManagerCompat.from(activity).notify(UPDATE_NOTIFICATION_ID, notification.build());
    }
}
