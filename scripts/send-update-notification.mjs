import admin from "firebase-admin";

const topic = "schoolix_app_updates";
const versionName = process.argv[2] || "latest";
const title = `Schoolix v${versionName} update available`;
const body = "Open Schoolix to install the latest app update.";

function serviceAccountFromEnv() {
  if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON_BASE64) {
    return JSON.parse(Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_JSON_BASE64, "base64").toString("utf8"));
  }
  if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
    return JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
  }
  return null;
}

const serviceAccount = serviceAccountFromEnv();
if (serviceAccount) {
  admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
} else {
  admin.initializeApp({ projectId: process.env.FIREBASE_PROJECT_ID || "schoolix-48107" });
}

const notificationId = `app_update_${Date.now()}`;
const result = await admin.messaging().send({
  topic,
  notification: { title, body },
  data: {
    title,
    body,
    source: "app-update",
    notificationId,
    schoolTopic: topic,
    versionName
  },
  android: {
    priority: "high",
    collapseKey: `schoolix_update_${versionName}`,
    notification: {
      channelId: "schoolix_alerts_v2",
      tag: notificationId,
      sound: "default",
      defaultVibrateTimings: true
    }
  }
});

console.log(`Sent update notification to ${topic}: ${result}`);
