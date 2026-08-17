package com.schoolix.app.notifications;

import android.Manifest;
import android.app.PendingIntent;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Build;

import androidx.annotation.NonNull;
import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;
import androidx.core.content.ContextCompat;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;
import com.schoolix.app.MainActivity;
import com.schoolix.app.R;

import java.util.HashSet;
import java.util.Set;

public class SchoolixMessagingService extends FirebaseMessagingService {
    @Override
    public void onMessageReceived(@NonNull RemoteMessage remoteMessage) {
        super.onMessageReceived(remoteMessage);
        String targetTopic = remoteMessage.getData().get("schoolTopic");
        boolean appUpdateNotification = MainActivity.APP_UPDATE_TOPIC.equals(targetTopic)
            || "app-update".equals(remoteMessage.getData().get("source"));
        Set<String> topics = storedTopics();
        if (!appUpdateNotification && targetTopic != null && !targetTopic.isEmpty() && !topics.isEmpty() && !topics.contains(targetTopic)) return;
        String notificationId = cleanNotificationId(remoteMessage.getData().get("notificationId"));
        if (!notificationId.isEmpty() && alreadyHandled(notificationId)) return;
        String title = remoteMessage.getData().get("title");
        String body = remoteMessage.getData().get("body");
        showNotification(
            notificationId.isEmpty() ? String.valueOf(System.currentTimeMillis()) : notificationId,
            title == null || title.trim().isEmpty() ? "Schoolix" : title.trim(),
            body == null ? "" : body.trim()
        );
    }

    private Set<String> storedTopics() {
        String topics = getSharedPreferences("schoolix_notifications", MODE_PRIVATE)
            .getString("schoolTopics", "");
        if (topics.isEmpty()) {
            topics = getSharedPreferences("schoolix_notifications", MODE_PRIVATE)
                .getString("schoolTopic", "");
        }
        Set<String> result = new HashSet<>();
        for (String topic : topics.split(",")) {
            if (!topic.trim().isEmpty()) result.add(topic.trim());
        }
        return result;
    }

    private boolean alreadyHandled(String notificationId) {
        notificationId = cleanNotificationId(notificationId);
        if (notificationId.isEmpty()) return false;
        String recent = getSharedPreferences("schoolix_notifications", MODE_PRIVATE)
            .getString("recentNotificationIds", "");
        Set<String> recentIds = new HashSet<>();
        for (String id : recent.split(",")) {
            if (!id.trim().isEmpty()) recentIds.add(id.trim());
        }
        if (recentIds.contains(notificationId)) return true;
        recentIds.add(notificationId);
        while (recentIds.size() > 25) {
            String first = recentIds.iterator().next();
            recentIds.remove(first);
        }
        getSharedPreferences("schoolix_notifications", MODE_PRIVATE)
            .edit()
            .putString("lastNotificationId", notificationId)
            .putString("recentNotificationIds", String.join(",", recentIds))
            .apply();
        return false;
    }

    private String cleanNotificationId(String notificationId) {
        return notificationId == null ? "" : notificationId.trim().toLowerCase();
    }

    @Override
    public void onNewToken(@NonNull String token) {
        super.onNewToken(token);
        String topics = getSharedPreferences("schoolix_notifications", MODE_PRIVATE)
            .getString("schoolTopics", "");
        if (topics.isEmpty()) {
            topics = getSharedPreferences("schoolix_notifications", MODE_PRIVATE)
                .getString("schoolTopic", "");
        }
        for (String topic : topics.split(",")) {
            if (!topic.trim().isEmpty()) FirebaseMessaging.getInstance().subscribeToTopic(topic.trim());
        }
        FirebaseMessaging.getInstance().subscribeToTopic(MainActivity.APP_UPDATE_TOPIC);
    }

    private void showNotification(String notificationId, String title, String body) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU &&
            ContextCompat.checkSelfPermission(this, Manifest.permission.POST_NOTIFICATIONS) != PackageManager.PERMISSION_GRANTED) {
            return;
        }
        Intent intent = new Intent(this, MainActivity.class)
            .addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);
        PendingIntent pendingIntent = PendingIntent.getActivity(
            this,
            notificationId.hashCode(),
            intent,
            PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE
        );
        NotificationCompat.Builder notification = new NotificationCompat.Builder(
            this,
            getString(R.string.notification_channel_id)
        )
            .setSmallIcon(R.drawable.ic_stat_schoolix_notification)
            .setColor(getColor(R.color.colorPrimary))
            .setContentTitle(title)
            .setContentText(body)
            .setStyle(new NotificationCompat.BigTextStyle().bigText(body))
            .setPriority(NotificationCompat.PRIORITY_HIGH)
            .setAutoCancel(true)
            .setContentIntent(pendingIntent);
        NotificationManagerCompat.from(this)
            .notify(notificationId.hashCode(), notification.build());
    }
}
