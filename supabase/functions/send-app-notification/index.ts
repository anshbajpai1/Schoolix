const PROJECT_ID = Deno.env.get("FIREBASE_PROJECT_ID") || "schoolix-48107";
const FIREBASE_WEB_API_KEY = Deno.env.get("FIREBASE_WEB_API_KEY") || "AIzaSyAomGwef93HFT9Xyx7SVW95FPw_IcIAICE";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "https://ezkmeedcqetztkeppxil.supabase.co";
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") || Deno.env.get("ANON_KEY") || "";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-firebase-token",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function cleanText(value: unknown) {
  return String(value || "").replace(/\s+/g, " ").trim();
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
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
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
  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    key,
    new TextEncoder().encode(unsignedJwt),
  );
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

async function verifyFirebaseUser(idToken: string) {
  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${encodeURIComponent(FIREBASE_WEB_API_KEY)}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
    },
  );
  const data = await response.json();
  const user = data.users?.[0];
  if (!response.ok || !user?.localId) throw new Error("Your admin session is invalid or expired");
  return { uid: String(user.localId), email: String(user.email || "") };
}

async function verifySupabaseUser(accessToken: string) {
  if (!SUPABASE_ANON_KEY) throw new Error("Supabase auth secrets are not configured");
  const response = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
    headers: {
      "apikey": SUPABASE_ANON_KEY,
      "Authorization": `Bearer ${accessToken}`,
    },
  });
  const user = await response.json().catch(() => ({}));
  if (!response.ok || !user?.id) throw new Error("Your admin session is invalid or expired");
  const metadata = { ...(user.user_metadata || {}), ...(user.app_metadata || {}) };
  const legacyUid = cleanText(metadata.firebaseUid || metadata.legacyUid || metadata.uid || user.id);
  return { uid: legacyUid, email: String(user.email || "") };
}

async function verifySignedInUser(token: string) {
  try {
    return await verifyFirebaseUser(token);
  } catch (firebaseError) {
    try {
      return await verifySupabaseUser(token);
    } catch {
      throw firebaseError instanceof Error
        ? firebaseError
        : new Error("Your admin session is invalid or expired");
    }
  }
}

function readFirestoreValue(value: any): any {
  if (!value || typeof value !== "object") return null;
  if ("stringValue" in value) return value.stringValue;
  if ("booleanValue" in value) return Boolean(value.booleanValue);
  if ("integerValue" in value) return Number(value.integerValue);
  if ("doubleValue" in value) return Number(value.doubleValue);
  if ("arrayValue" in value) return (value.arrayValue.values || []).map(readFirestoreValue);
  if ("mapValue" in value) return readFirestoreFields(value.mapValue.fields || {});
  if ("timestampValue" in value) return value.timestampValue;
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

async function getUserProfile(accessToken: string, uid: string) {
  const response = await fetch(
    `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/users/${encodeURIComponent(uid)}`,
    { headers: { Authorization: `Bearer ${accessToken}` } },
  );
  const data = await response.json();
  if (!response.ok) return null;
  return readFirestoreFields(data.fields || {});
}

function registrationRole(profileRole: string, payloadRole: string, loginAs: string) {
  const role = cleanText(profileRole || payloadRole || loginAs).toLowerCase();
  if (role === "teacher" || role === "teachers") return "teachers";
  if (role === "student" || role === "students" || role === "parent" || role === "parents") return "students";
  if (role === "librarian" || role === "librarians") return "librarians";
  if (role === "accountant" || role === "accountants" || role === "accounts") return "accountants";
  if (role === "driver" || role === "drivers") return "drivers";
  return "";
}

async function schoolTopic(schoolId: string, audience: string) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(schoolId));
  const hex = Array.from(new Uint8Array(digest)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
  const base = `school_${hex}`;
  return audience === "all" ? base : `${base}_${audience}`;
}

async function schoolStudentTopic(schoolId: string, studentKey: string) {
  const base = await schoolTopic(schoolId, "all");
  const studentHash = await sha256Hex(normalizeKey(studentKey));
  return `${base}_student_${studentHash}`;
}

async function sendNotification(
  accessToken: string,
  target: { topic?: string; token?: string },
  title: string,
  body: string,
  notificationId: string,
  schoolTopicName: string,
) {
  const response = await fetch(`https://fcm.googleapis.com/v1/projects/${PROJECT_ID}/messages:send`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: {
        ...target,
        notification: {
          title,
          body,
        },
        data: {
          title,
          body,
          source: "admin",
          notificationId,
          schoolTopic: schoolTopicName,
        },
        android: {
          collapse_key: notificationId,
          priority: "high",
          notification: {
            channel_id: "schoolix_alerts_v2",
            tag: notificationId,
            sound: "default",
            default_vibrate_timings: true,
          },
        },
      },
    }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error?.message || "FCM rejected the notification");
  return String(data.name || "");
}

async function sha256Hex(value: string) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function notificationRole(role: string) {
  if (role === "teacher") return "teachers";
  if (role === "student" || role === "parent") return "students";
  if (role === "librarian") return "librarians";
  if (role === "accountant") return "accountants";
  if (role === "driver") return "drivers";
  return "";
}

async function saveDeviceRegistration(
  accessToken: string,
  schoolId: string,
  uid: string,
  role: string,
  token: string,
  profile: Record<string, unknown> = {},
) {
  const deviceId = await sha256Hex(token);
  const response = await fetch(
    `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/schools/${encodeURIComponent(schoolId)}/notificationDevices/${deviceId}`,
    {
      method: "PATCH",
      headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
      body: JSON.stringify({ fields: toFirestoreFields({
        schoolId,
        uid,
        role,
        token,
        studentId: cleanText(profile.studentId || ""),
        studentDocId: cleanText(profile.studentDocId || ""),
        studentAliases: Array.isArray(profile.studentAliases) ? profile.studentAliases.map(cleanText).filter(Boolean) : [],
        authUid: cleanText(profile.authUid || uid),
        loginAs: cleanText(profile.loginAs || ""),
        platform: "android",
        updatedAt: new Date().toISOString(),
      }) }),
    },
  );
  const result = await response.json();
  if (!response.ok) throw new Error(result.error?.message || "Unable to register this phone for notifications");
  return deviceId;
}

function normalizeKey(value: unknown) {
  return cleanText(value).toLowerCase();
}

function addStudentKeys(keys: Set<string>, value: unknown) {
  const key = normalizeKey(value);
  if (key) keys.add(key);
}

function feeDueAmount(fee: Record<string, unknown>) {
  const remaining = Number(fee.remainingAmount);
  if (Number.isFinite(remaining)) return Math.max(0, remaining);
  const total = Number(fee.originalAmount ?? fee.amount ?? fee.totalAmount ?? 0);
  const paid = Number(fee.totalPaidAmount ?? fee.paidAmount ?? 0);
  if (!Number.isFinite(total)) return 0;
  return Math.max(0, total - (Number.isFinite(paid) ? paid : 0));
}

async function getPendingDuesStudentKeys(accessToken: string, schoolId: string) {
  const structuredQuery: Record<string, unknown> = {
    from: [{ collectionId: "fees" }],
    select: {
      fields: [
        { fieldPath: "studentId" },
        { fieldPath: "studentDocId" },
        { fieldPath: "authUid" },
        { fieldPath: "admissionNo" },
        { fieldPath: "remainingAmount" },
        { fieldPath: "originalAmount" },
        { fieldPath: "amount" },
        { fieldPath: "totalAmount" },
        { fieldPath: "totalPaidAmount" },
        { fieldPath: "paidAmount" },
        { fieldPath: "status" },
      ],
    },
    limit: 5000,
  };
  const response = await fetch(
    `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/schools/${encodeURIComponent(schoolId)}:runQuery`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
      body: JSON.stringify({ structuredQuery }),
    },
  );
  const result = await response.json();
  if (!response.ok) throw new Error(result.error?.message || "Unable to load pending fee dues");

  const keys = new Set<string>();
  (Array.isArray(result) ? result : [])
    .map((item: any) => readFirestoreFields(item.document?.fields || {}))
    .filter((fee: Record<string, unknown>) => {
      const status = normalizeKey(fee.status);
      return feeDueAmount(fee) > 0 && !["paid", "fully paid", "full paid", "clear", "cleared"].includes(status);
    })
    .forEach((fee: Record<string, unknown>) => {
      addStudentKeys(keys, fee.studentId);
      addStudentKeys(keys, fee.studentDocId);
      addStudentKeys(keys, fee.authUid);
      addStudentKeys(keys, fee.admissionNo);
    });
  return keys;
}

async function getRegisteredDeviceTokens(
  accessToken: string,
  schoolId: string,
  audience: string,
  pendingDuesKeys?: Set<string>,
) {
  const pendingDuesStudentKeys = audience === "students_pending_dues"
    ? (pendingDuesKeys || await getPendingDuesStudentKeys(accessToken, schoolId))
    : new Set<string>();
  const structuredQuery: Record<string, unknown> = {
    from: [{ collectionId: "notificationDevices" }],
    select: {
      fields: [
        { fieldPath: "token" },
        { fieldPath: "role" },
        { fieldPath: "uid" },
        { fieldPath: "studentId" },
        { fieldPath: "studentDocId" },
        { fieldPath: "studentAliases" },
        { fieldPath: "authUid" },
      ],
    },
    limit: 1000,
  };
  const response = await fetch(
    `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/schools/${encodeURIComponent(schoolId)}:runQuery`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
      body: JSON.stringify({ structuredQuery }),
    },
  );
  const result = await response.json();
  if (!response.ok) throw new Error(result.error?.message || "Unable to load registered notification devices");
  const allowedRoles = notificationAudienceRoles(audience);
  return [...new Set((Array.isArray(result) ? result : [])
    .map((item: any) => readFirestoreFields(item.document?.fields || {}))
    .filter((device: Record<string, unknown>) => {
      if (audience === "all") return true;
      const roleAllowed = allowedRoles.has(cleanText(device.role).toLowerCase());
      if (!roleAllowed) return false;
      if (audience !== "students_pending_dues") return true;
      const deviceKeys = new Set<string>();
      addStudentKeys(deviceKeys, device.uid);
      addStudentKeys(deviceKeys, device.studentId);
      addStudentKeys(deviceKeys, device.studentDocId);
      addStudentKeys(deviceKeys, device.authUid);
      if (Array.isArray(device.studentAliases)) {
        device.studentAliases.forEach((alias) => addStudentKeys(deviceKeys, alias));
      }
      return [...deviceKeys].some((key) => pendingDuesStudentKeys.has(key));
    })
    .map((device: Record<string, unknown>) => device.token)
    .filter((token: unknown) => typeof token === "string" && token.length > 40))] as string[];
}

function notificationAudienceRoles(audience: string) {
  if (audience === "teachers") return new Set(["teachers", "teacher"]);
  if (audience === "students" || audience === "students_pending_dues") return new Set(["students", "student", "parents", "parent"]);
  if (audience === "librarians") return new Set(["librarians", "librarian"]);
  if (audience === "drivers") return new Set(["drivers", "driver"]);
  return new Set(["teachers", "teacher", "students", "student", "parents", "parent", "librarians", "librarian", "accountants", "accountant", "drivers", "driver"]);
}

async function saveHistory(
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
  if (!response.ok) throw new Error(result.error?.message || "Unable to save notification history");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { status: 200, headers: corsHeaders });
  if (req.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405);

  try {
    const idToken = cleanText(req.headers.get("x-firebase-token"));
    if (!idToken) return jsonResponse({ error: "Admin login required" }, 401);

    const payload = await req.json();
    const action = cleanText(payload.action || "send").toLowerCase();
    const title = cleanText(payload.title);
    const message = cleanText(payload.message);
    const audience = cleanText(payload.audience || "all").toLowerCase();

    const firebaseUser = await verifySignedInUser(idToken);
    const accessToken = await getGoogleAccessToken();
    const profile = await getUserProfile(accessToken, firebaseUser.uid);

    if (action === "register-device") {
      const token = cleanText(payload.token);
      const deviceRole = registrationRole(profile?.role, payload.role, payload.loginAs);
      const schoolId = cleanText(profile?.schoolId || profile?.adminId || payload.schoolId || payload.adminId || "");
      if (!deviceRole) return jsonResponse({ error: "Only teacher, student, librarian, accountant, driver, and parent app accounts can register notifications" }, 403);
      if (!schoolId || schoolId.includes("/")) return jsonResponse({ error: "School link not found for notification registration" }, 400);
      if (token.length < 40 || token.length > 4096) return jsonResponse({ error: "Invalid phone notification token" }, 400);
      const deviceId = await saveDeviceRegistration(accessToken, schoolId, firebaseUser.uid, deviceRole, token, {
        studentId: payload.studentId || profile?.studentId || "",
        studentDocId: payload.studentDocId || profile?.studentDocId || "",
        studentAliases: Array.isArray(payload.studentAliases) ? payload.studentAliases : [],
        authUid: payload.authUid || profile?.authUid || firebaseUser.uid,
        loginAs: payload.loginAs || "",
      });
      return jsonResponse({ success: true, registered: true, deviceId, role: deviceRole, schoolId });
    }

    if (!profile) return jsonResponse({ error: "Admin profile was not found" }, 403);
    const role = cleanText(profile.role).toLowerCase();
    const schoolId = cleanText(profile.schoolId || profile.adminId || firebaseUser.uid);
    if (!schoolId || schoolId.includes("/")) return jsonResponse({ error: "Invalid school profile" }, 400);

    if (role !== "admin" && role !== "superadmin" && profile.superAdmin !== true) {
      return jsonResponse({ error: "Only an administrator can send app notifications" }, 403);
    }

    if (title.length < 3 || title.length > 80) {
      return jsonResponse({ error: "Title must be between 3 and 80 characters" }, 400);
    }
    if (message.length < 3 || message.length > 240) {
      return jsonResponse({ error: "Message must be between 3 and 240 characters" }, 400);
    }
    if (!["all", "teachers", "students", "drivers", "students_pending_dues"].includes(audience)) {
      return jsonResponse({ error: "Select a valid notification audience" }, 400);
    }

    const pendingDuesStudentKeys = audience === "students_pending_dues"
      ? await getPendingDuesStudentKeys(accessToken, schoolId)
      : new Set<string>();
    const topic = await schoolTopic(schoolId, audience);
    const baseTopic = await schoolTopic(schoolId, "all");
    const notificationId = `${Date.now()}_${crypto.randomUUID().slice(0, 8)}`;
    const registeredTokens = await getRegisteredDeviceTokens(accessToken, schoolId, audience, pendingDuesStudentKeys);
    let topicMessageId = "";
    if (registeredTokens.length === 0 && audience !== "students_pending_dues") {
      topicMessageId = await sendNotification(
        accessToken,
        { topic },
        title,
        message,
        notificationId,
        topic,
      );
    }
    const pendingTopicResults = audience === "students_pending_dues"
      ? await Promise.allSettled([...pendingDuesStudentKeys].map(async (studentKey) =>
        sendNotification(
          accessToken,
          { topic: await schoolStudentTopic(schoolId, studentKey) },
          title,
          message,
          notificationId,
          baseTopic,
        )
      ))
      : [];
    const directResults = await Promise.allSettled(registeredTokens.map((token) =>
      sendNotification(accessToken, { token }, title, message, notificationId, baseTopic)
    ));
    const directAccepted = directResults.filter((result) => result.status === "fulfilled").length;
    const pendingTopicAccepted = pendingTopicResults.filter((result) => result.status === "fulfilled").length;
    await saveHistory(accessToken, schoolId, notificationId, {
      schoolId,
      title,
      message,
      recipientRoles: audience === "all" ? ["teachers", "students", "drivers"] : audience === "students_pending_dues" ? ["students"] : [audience],
      audience,
      createdAt: new Date().toISOString(),
      createdBy: firebaseUser.uid,
      createdByEmail: firebaseUser.email,
      status: "sent",
      fcmMessageId: topicMessageId,
      registeredDevices: registeredTokens.length,
      directAccepted,
      pendingDuesStudents: pendingDuesStudentKeys.size,
      pendingTopicAccepted,
      deliveryMode: registeredTokens.length > 0
        ? "direct"
        : pendingTopicAccepted > 0
          ? "targeted-topic"
          : audience === "students_pending_dues" ? "targeted-no-devices" : "topic-fallback",
    });

    return jsonResponse({
      success: true,
      notificationId,
      fcmMessageId: topicMessageId,
      audience,
      registeredDevices: registeredTokens.length,
      directAccepted,
      pendingDuesStudents: pendingDuesStudentKeys.size,
      pendingTopicAccepted,
      deliveryMode: registeredTokens.length > 0
        ? "direct"
        : pendingTopicAccepted > 0
          ? "targeted-topic"
          : audience === "students_pending_dues" ? "targeted-no-devices" : "topic-fallback",
    });
  } catch (error) {
    console.error("send-app-notification error", error);
    const message = error instanceof Error ? error.message : "Unable to send app notification";
    const status = /session|login/i.test(message) ? 401 : 500;
    return jsonResponse({ error: message }, status);
  }
});
