const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });
}

const PROJECT_ID = Deno.env.get("FIREBASE_PROJECT_ID") || "schoolix-48107";
const ANDROID_NOTIFICATION_CHANNEL_ID = "schoolix_alerts_v2";

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function base64UrlEncode(input: string | ArrayBuffer) {
  const bytes = typeof input === "string" ? new TextEncoder().encode(input) : new Uint8Array(input);
  let binary = "";
  bytes.forEach((byte) => binary += String.fromCharCode(byte));
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

async function importPrivateKey(pem: string) {
  const body = pem.replace(/\\n/g, "\n")
    .replace(/-----BEGIN PRIVATE KEY-----/g, "")
    .replace(/-----END PRIVATE KEY-----/g, "")
    .replace(/\s+/g, "");
  const binary = atob(body);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
  return crypto.subtle.importKey(
    "pkcs8",
    bytes,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"],
  );
}

async function getGoogleAccessToken() {
  const encodedAccount = Deno.env.get("FIREBASE_SERVICE_ACCOUNT_JSON_BASE64");
  const serviceAccount = encodedAccount
    ? JSON.parse(new TextDecoder().decode(Uint8Array.from(atob(encodedAccount), (char) => char.charCodeAt(0))))
    : {};
  const clientEmail = Deno.env.get("FIREBASE_CLIENT_EMAIL") || serviceAccount.client_email;
  const privateKey = Deno.env.get("FIREBASE_PRIVATE_KEY") || serviceAccount.private_key;
  if (!clientEmail || !privateKey) throw new Error("Firebase service account secrets are not configured");

  const now = Math.floor(Date.now() / 1000);
  const claim = {
    iss: clientEmail,
    scope: "https://www.googleapis.com/auth/firebase.messaging https://www.googleapis.com/auth/datastore",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  };
  const unsignedJwt = `${base64UrlEncode(JSON.stringify({ alg: "RS256", typ: "JWT" }))}.${base64UrlEncode(JSON.stringify(claim))}`;
  const key = await importPrivateKey(privateKey);
  const signature = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", key, new TextEncoder().encode(unsignedJwt));
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: `${unsignedJwt}.${base64UrlEncode(signature)}`,
    }),
  });
  const data = await response.json();
  if (!response.ok || !data.access_token) throw new Error("Unable to authorize notification sender");
  return String(data.access_token);
}

async function sha256Hex(value: string) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function schoolTopic(schoolId: string) {
  return `school_${await sha256Hex(schoolId)}`;
}

async function studentAbsenceTopic(schoolId: string, studentId: string) {
  return `${await schoolTopic(schoolId)}_student_${await sha256Hex(studentId.trim().toLowerCase())}`;
}

function normalizeIdentifier(value: unknown) {
  return String(value || "").replace(/\s+/g, " ").trim().toLowerCase();
}

function uniqueIdentifiers(...values: unknown[]) {
  return [...new Set(values.flatMap((value) => Array.isArray(value) ? value : [value])
    .map(normalizeIdentifier)
    .filter(Boolean))];
}

function readFirestoreValue(value: any): any {
  if (!value || typeof value !== "object") return null;
  if ("stringValue" in value) return value.stringValue;
  if ("booleanValue" in value) return Boolean(value.booleanValue);
  if ("integerValue" in value) return Number(value.integerValue);
  if ("arrayValue" in value) return (value.arrayValue.values || []).map(readFirestoreValue);
  return null;
}

function readFirestoreFields(fields: Record<string, any>) {
  return Object.fromEntries(Object.entries(fields || {}).map(([key, value]) => [key, readFirestoreValue(value)]));
}

function toFirestoreValue(value: unknown): any {
  if (value === null || value === undefined) return { nullValue: null };
  if (typeof value === "string") return { stringValue: value };
  if (typeof value === "boolean") return { booleanValue: value };
  if (Array.isArray(value)) return { arrayValue: { values: value.map(toFirestoreValue) } };
  return { stringValue: String(value) };
}

function toFirestoreFields(data: Record<string, unknown>) {
  return Object.fromEntries(Object.entries(data).map(([key, value]) => [key, toFirestoreValue(value)]));
}

async function getStudentDeviceTokens(accessToken: string, schoolId: string, studentIdentifiers: string[]) {
  const response = await fetch(
    `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/schools/${encodeURIComponent(schoolId)}:runQuery`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        structuredQuery: {
          from: [{ collectionId: "notificationDevices" }],
          select: {
            fields: [
              { fieldPath: "token" },
              { fieldPath: "studentId" },
              { fieldPath: "studentDocId" },
              { fieldPath: "studentAliases" },
              { fieldPath: "authUid" },
              { fieldPath: "uid" },
              { fieldPath: "role" },
            ],
          },
          limit: 1000,
        },
      }),
    },
  );
  const result = await response.json();
  if (!response.ok) throw new Error(result.error?.message || "Unable to load student notification devices");
  const targets = new Set(studentIdentifiers.map(normalizeIdentifier).filter(Boolean));
  return [...new Set((Array.isArray(result) ? result : [])
    .map((item: any) => readFirestoreFields(item.document?.fields || {}))
    .filter((device: Record<string, unknown>) => {
      if (String(device.role || "").toLowerCase().replace(/s$/, "") !== "student") return false;
      const deviceIdentifiers = uniqueIdentifiers(
        device.studentId,
        device.studentDocId,
        device.authUid,
        device.uid,
        device.studentAliases,
      );
      return deviceIdentifiers.some((id) => targets.has(id));
    })
    .map((device: Record<string, unknown>) => device.token)
    .filter((token: unknown) => typeof token === "string" && token.length > 40))] as string[];
}

async function saveAbsenceNotificationHistory(
  accessToken: string,
  schoolId: string,
  notificationId: string,
  data: Record<string, unknown>,
) {
  const response = await fetch(
    `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/schools/${encodeURIComponent(schoolId)}/notifications/${encodeURIComponent(notificationId)}`,
    {
      method: "PATCH",
      headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
      body: JSON.stringify({ fields: toFirestoreFields(data) }),
    },
  );
  const result = await response.json();
  if (!response.ok) throw new Error(result.error?.message || "Unable to save absence notification history");
}

async function sendFcmMessage(
  accessToken: string,
  projectId: string,
  target: { topic?: string; token?: string },
  data: Record<string, string>,
) {
  const response = await fetch(`https://fcm.googleapis.com/v1/projects/${projectId}/messages:send`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: {
        ...target,
        notification: {
          title: data.title || "Schoolix",
          body: data.body || "",
        },
        data,
        android: {
          collapse_key: data.notificationId || undefined,
          priority: "high",
          notification: {
            channel_id: ANDROID_NOTIFICATION_CHANNEL_ID,
            tag: data.notificationId || undefined,
            sound: "default",
            default_vibrate_timings: true,
          },
        },
      },
    }),
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error?.message || "FCM rejected the absence notification");
  return String(result.name || "");
}

async function sendStudentAbsenceNotification(payload: {
  schoolId: string;
  studentId: string;
  studentDocId?: string;
  studentAliases?: string[];
  authUid?: string;
  studentName: string;
  date: string;
  schoolName: string;
}) {
  const accessToken = await getGoogleAccessToken();
  const baseTopic = await schoolTopic(payload.schoolId);
  const studentIdentifiers = uniqueIdentifiers(payload.studentId, payload.studentDocId, payload.authUid, payload.studentAliases);
  const topics = await Promise.all((studentIdentifiers.length ? studentIdentifiers : [payload.studentId])
    .map((id) => studentAbsenceTopic(payload.schoolId, id)));
  const topic = topics[0] || await studentAbsenceTopic(payload.schoolId, payload.studentId);
  const notificationId = `absence_${Date.now()}_${crypto.randomUUID().slice(0, 8)}`;
  const title = "Attendance Alert";
  const body = `${payload.studentName || "Student"} was marked absent${payload.date ? ` on ${payload.date}` : ""}.`;
  const data = {
    title,
    body,
    source: "attendance",
    notificationId,
    schoolTopic: topic,
    studentId: payload.studentId,
    studentName: payload.studentName,
    schoolName: payload.schoolName,
  };
  const tokens = await getStudentDeviceTokens(accessToken, payload.schoolId, studentIdentifiers);
  const directResults = await Promise.allSettled(tokens.map((token) =>
    sendFcmMessage(accessToken, PROJECT_ID, { token }, { ...data, schoolTopic: baseTopic })
  ));
  const directAccepted = directResults.filter((result) => result.status === "fulfilled").length;
  const topicResults = await Promise.allSettled(topics.map((topicName) =>
    sendFcmMessage(accessToken, PROJECT_ID, { topic: topicName }, { ...data, schoolTopic: topicName })
  ));
  const topicAccepted = topicResults.filter((result) => result.status === "fulfilled").length;
  const acceptedMessageId = String(
    (directResults.find((result) => result.status === "fulfilled") as PromiseFulfilledResult<string> | undefined)?.value ||
    (topicResults.find((result) => result.status === "fulfilled") as PromiseFulfilledResult<string> | undefined)?.value ||
    ""
  );
  await saveAbsenceNotificationHistory(accessToken, payload.schoolId, notificationId, {
    schoolId: payload.schoolId,
    title,
    message: body,
    recipientRoles: ["students"],
    audience: "students",
    source: "attendance",
    targetStudentId: payload.studentId,
    targetStudentIds: studentIdentifiers,
    studentDocId: payload.studentDocId || "",
    authUid: payload.authUid || "",
    studentId: payload.studentId,
    studentName: payload.studentName,
    createdAt: new Date().toISOString(),
    status: "sent",
    fcmMessageId: acceptedMessageId,
    registeredDevices: tokens.length,
    directAccepted,
    topicAccepted,
    targetedTopics: topics.length,
  });
  return {
    notificationId,
    fcmMessageId: acceptedMessageId,
    topic,
    topicAccepted,
    targetedTopics: topics.length,
    registeredDevices: tokens.length,
    directAccepted,
  };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    if (req.method !== "POST") {
      return jsonResponse({ error: "Method not allowed" }, 405);
    }

    let payload;
    try {
      payload = await req.json();
    } catch {
      return jsonResponse({ error: "Invalid JSON request body" }, 400);
    }
    const parentEmail = String(payload.parentEmail || "").trim();
    const shouldSendEmail = isEmail(parentEmail);
    const studentName = String(payload.studentName || "Student").trim();
    const studentId = String(payload.studentId || "").trim();
    const studentDocId = String(payload.studentDocId || "").trim();
    const authUid = String(payload.authUid || "").trim();
    const studentAliases = Array.isArray(payload.studentAliases)
      ? payload.studentAliases.map((item: unknown) => String(item || "").trim())
      : [];
    const schoolId = String(payload.schoolId || payload.adminId || "").trim();
    const className = String(payload.className || "").trim();
    const section = String(payload.section || "").trim();
    const teacherName = String(payload.teacherName || "Teacher").trim();
    const schoolName = String(payload.schoolName || "Schoolix").trim();
    const date = String(payload.date || "").trim();
    const classLabel = [className, section].filter(Boolean).join("-");
    const subject = `Attendance Alert: ${studentName} marked absent`;

    const textContent = `
Dear Parent,

This is to inform you that ${studentName}
${studentId ? `(${studentId})` : ""}
was marked absent.

Date: ${date}

Class: ${classLabel}

Marked By: ${teacherName}

Regards,
${schoolName}
`;

    const htmlContent = `
  <div style="font-family:Arial,sans-serif;padding:20px;color:#111827;line-height:1.7;">
    <h2 style="color:#dc2626;">Attendance Alert</h2>
    <p>Dear Parent,</p>
    <p>
      This is to inform you that
      <strong>${studentName}</strong>
      ${studentId ? `(${studentId})` : ""}
      was marked <strong>Absent</strong>.
    </p>
    <p><strong>Date:</strong> ${date}</p>
    <p><strong>Class:</strong> ${classLabel}</p>
    <p><strong>Marked By:</strong> ${teacherName}</p>
    <br>
    <p>Regards,<br>${schoolName}</p>
  </div>
`;

    let emailSent = false;
    let notificationSent = false;
    let notificationResult = null;
    const errors: string[] = [];

    if (shouldSendEmail) {
      const brevoApiKey = Deno.env.get("BREVO_API_KEY");
      if (!brevoApiKey) {
        errors.push("BREVO_API_KEY is not configured");
      } else {
        const brevoResponse = await fetch("https://api.brevo.com/v3/smtp/email", {
          method: "POST",
          headers: {
            "api-key": brevoApiKey,
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify({
            sender: {
              name: "Schoolix Attendance",
              email: "schoolixteam@gmail.com",
            },
            to: [{ email: parentEmail }],
            subject,
            textContent,
            htmlContent,
          }),
        });

        const brevoData = await brevoResponse.text();
        if (!brevoResponse.ok) {
          console.error("Brevo Error:", brevoData);
          errors.push(`Failed to send email: ${brevoData}`);
        } else {
          emailSent = true;
        }
      }
    }

    if (schoolId && studentId) {
      try {
        notificationResult = await sendStudentAbsenceNotification({
          schoolId,
          studentId,
          studentDocId,
          authUid,
          studentAliases,
          studentName,
          date,
          schoolName,
        });
        notificationSent = Boolean(
          Number(notificationResult?.directAccepted || 0) > 0 ||
          Number(notificationResult?.topicAccepted || 0) > 0
        );
      } catch (error) {
        console.error("Absence notification error:", error);
        errors.push(error instanceof Error ? error.message : "Failed to send phone notification");
      }
    }

    if (!emailSent && !notificationSent) {
      return jsonResponse({
        error: errors[0] || "No valid absence alert destination was found",
        details: errors,
      }, shouldSendEmail || schoolId ? 500 : 400);
    }

    return jsonResponse({
      success: true,
      message: "Absence alert sent successfully",
      emailSent,
      notificationSent,
      notification: notificationResult,
      warnings: errors,
    });
  } catch (error) {
    console.error("Function Error:", error);
    return jsonResponse({
      error: error instanceof Error ? error.message : "Internal server error",
    }, 500);
  }
});
