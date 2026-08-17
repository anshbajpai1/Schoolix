package com.schoolix.app.updates;

import android.app.Activity;
import android.app.AlertDialog;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import com.schoolix.app.R;

public class UpdateDialogController {
    public interface ActionListener {
        void onUpdateNow(UpdateInfo updateInfo);
        void onOpenDownload(UpdateInfo updateInfo);
        void onLater();
    }

    private final Activity activity;
    private AlertDialog updateDialog;
    private AlertDialog progressDialog;
    private ProgressBar progressBar;
    private TextView progressText;

    public UpdateDialogController(Activity activity) {
        this.activity = activity;
    }

    public void showUpdateDialog(UpdateInfo updateInfo, ActionListener listener) {
        dismissUpdateDialog();
        View view = LayoutInflater.from(activity).inflate(R.layout.dialog_update_available, null);
        TextView title = view.findViewById(R.id.updateTitle);
        TextView badge = view.findViewById(R.id.updatePriorityBadge);
        TextView version = view.findViewById(R.id.updateVersion);
        TextView message = view.findViewById(R.id.updateMessage);
        TextView changelog = view.findViewById(R.id.updateChangelog);
        TextView footer = view.findViewById(R.id.updateFooterNote);
        title.setText(updateInfo.isForceUpdate() ? "Important Update Required" : "Update Available");
        badge.setText(updateInfo.isForceUpdate() ? "Mandatory" : "Optional");
        version.setText("Version " + updateInfo.getVersionName() + " - build " + updateInfo.getVersionCode());
        message.setText(updateInfo.getMessage());
        changelog.setText(formatChangelog(updateInfo));
        footer.setText(updateInfo.isForceUpdate()
            ? "This update is required before continuing in Schoolix."
            : "You can update now or later from the bottom of the app sidebar.");

        AlertDialog.Builder builder = new AlertDialog.Builder(activity)
            .setView(view)
            .setPositiveButton("Update Now", null)
            .setNeutralButton("Open Link", null);

        if (!updateInfo.isForceUpdate()) {
            builder.setNegativeButton("Later", null);
        }

        updateDialog = builder.create();
        updateDialog.setCanceledOnTouchOutside(false);
        updateDialog.setCancelable(!updateInfo.isForceUpdate());
        updateDialog.setOnShowListener(dialog -> {
            updateDialog.getButton(AlertDialog.BUTTON_POSITIVE).setOnClickListener(button -> listener.onUpdateNow(updateInfo));
            updateDialog.getButton(AlertDialog.BUTTON_NEUTRAL).setOnClickListener(button -> listener.onOpenDownload(updateInfo));
            if (!updateInfo.isForceUpdate()) {
                updateDialog.getButton(AlertDialog.BUTTON_NEGATIVE).setOnClickListener(button -> {
                    dismissUpdateDialog();
                    listener.onLater();
                });
            }
        });
        updateDialog.show();
    }

    private String formatChangelog(UpdateInfo updateInfo) {
        if (updateInfo.getChangelog().isEmpty()) return "No detailed changelog was provided for this release.";
        StringBuilder builder = new StringBuilder();
        for (String item : updateInfo.getChangelog()) {
            if (builder.length() > 0) builder.append("\n");
            builder.append("- ").append(item);
        }
        return builder.toString();
    }

    public void showProgressDialog() {
        View view = LayoutInflater.from(activity).inflate(R.layout.dialog_update_progress, null);
        progressBar = view.findViewById(R.id.updateProgressBar);
        progressText = view.findViewById(R.id.updateProgressText);
        progressDialog = new AlertDialog.Builder(activity)
            .setView(view)
            .create();
        progressDialog.setCancelable(false);
        progressDialog.setCanceledOnTouchOutside(false);
        progressDialog.show();
    }

    public void updateProgress(int percent, long downloadedBytes, long totalBytes) {
        if (progressBar == null || progressText == null) return;
        if (percent >= 0) {
            progressBar.setIndeterminate(false);
            progressBar.setProgress(percent);
            progressText.setText("Downloaded " + percent + "%");
        } else {
            progressBar.setIndeterminate(true);
            progressText.setText("Downloading update...");
        }
    }

    public void dismissUpdateDialog() {
        if (updateDialog != null && updateDialog.isShowing()) {
            updateDialog.dismiss();
        }
    }

    public void dismissProgressDialog() {
        if (progressDialog != null && progressDialog.isShowing()) {
            progressDialog.dismiss();
        }
    }

    public void showMessage(String message) {
        Toast.makeText(activity, message, Toast.LENGTH_LONG).show();
    }
}
