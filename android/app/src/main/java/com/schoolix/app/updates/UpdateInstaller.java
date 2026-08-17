package com.schoolix.app.updates;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.provider.Settings;

import androidx.core.content.FileProvider;

import java.io.File;

public class UpdateInstaller {
    public static final int REQUEST_UNKNOWN_APP_SOURCES = 7341;

    private final Activity activity;
    private File pendingApkFile;

    public UpdateInstaller(Activity activity) {
        this.activity = activity;
    }

    public boolean canInstallPackages() {
        return Build.VERSION.SDK_INT < Build.VERSION_CODES.O || activity.getPackageManager().canRequestPackageInstalls();
    }

    public void requestUnknownAppsPermission(File apkFile) {
        pendingApkFile = apkFile;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            Intent intent = new Intent(Settings.ACTION_MANAGE_UNKNOWN_APP_SOURCES);
            intent.setData(Uri.parse("package:" + activity.getPackageName()));
            activity.startActivityForResult(intent, REQUEST_UNKNOWN_APP_SOURCES);
        }
    }

    public File getPendingApkFile() {
        return pendingApkFile;
    }

    public void clearPendingApkFile() {
        pendingApkFile = null;
    }

    public void install(File apkFile) {
        Uri apkUri = FileProvider.getUriForFile(activity, activity.getPackageName() + ".fileprovider", apkFile);
        Intent intent = new Intent(Intent.ACTION_VIEW);
        intent.setDataAndType(apkUri, "application/vnd.android.package-archive");
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
        activity.startActivity(intent);
    }
}
