const PROJECT_ID = Deno.env.get("FIREBASE_PROJECT_ID") || "schoolix-48107";
const FIREBASE_WEB_API_KEY = Deno.env.get("FIREBASE_WEB_API_KEY") || "AIzaSyAomGwef93HFT9Xyx7SVW95FPw_IcIAICE";
const BUCKET = "notice-attachments";
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["application/pdf", "image/png", "image/jpeg", "image/webp", "image/gif"]);

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
    scope: "https://www.googleapis.com/auth/datastore",
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
  if (!response.ok || !data.access_token) throw new Error("Unable to authorize the notice uploader");
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

function readFirestoreValue(value: any): any {
  if (!value || typeof value !== "object") return null;
  if ("stringValue" in value) return value.stringValue;
  if ("booleanValue" in value) return Boolean(value.booleanValue);
  if ("integerValue" in value) return Number(value.integerValue);
  return null;
}

async function getUserProfile(accessToken: string, uid: string) {
  const response = await fetch(
    `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/users/${encodeURIComponent(uid)}`,
    { headers: { Authorization: `Bearer ${accessToken}` } },
  );
  const data = await response.json();
  if (!response.ok) return null;
  return Object.fromEntries(Object.entries(data.fields || {}).map(([key, value]) => [key, readFirestoreValue(value)]));
}

function storageConfig() {
  const url = cleanText(Deno.env.get("SUPABASE_URL"));
  const serviceKey = cleanText(Deno.env.get("SUPABASE_SERVICE_ROLE_KEY"));
  if (!url || !serviceKey) throw new Error("Attachment storage is not configured");
  return { url: url.replace(/\/$/, ""), serviceKey };
}

function storageHeaders(serviceKey: string, contentType = "application/json") {
  return {
    Authorization: `Bearer ${serviceKey}`,
    apikey: serviceKey,
    "Content-Type": contentType,
  };
}

async function ensureBucket(url: string, serviceKey: string) {
  const existing = await fetch(`${url}/storage/v1/bucket/${BUCKET}`, {
    headers: storageHeaders(serviceKey),
  });
  if (existing.ok) return;
  if (existing.status !== 404 && existing.status !== 400) {
    const problem = await existing.json().catch(() => ({}));
    throw new Error(problem.message || problem.error || "Unable to access attachment storage");
  }

  const created = await fetch(`${url}/storage/v1/bucket`, {
    method: "POST",
    headers: storageHeaders(serviceKey),
    body: JSON.stringify({
      id: BUCKET,
      name: BUCKET,
      public: true,
      file_size_limit: MAX_FILE_SIZE,
      allowed_mime_types: [...ALLOWED_TYPES],
    }),
  });
  if (!created.ok) {
    const problem = await created.json().catch(() => ({}));
    const message = cleanText(problem.message || problem.error);
    if (!/already exists|duplicate/i.test(message)) throw new Error(message || "Unable to create attachment storage");
  }
}

function matchesFileSignature(bytes: Uint8Array, mimeType: string) {
  if (mimeType === "application/pdf") return new TextDecoder().decode(bytes.slice(0, 5)) === "%PDF-";
  if (mimeType === "image/png") return bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47;
  if (mimeType === "image/jpeg") return bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  if (mimeType === "image/gif") return new TextDecoder().decode(bytes.slice(0, 3)) === "GIF";
  if (mimeType === "image/webp") return new TextDecoder().decode(bytes.slice(0, 4)) === "RIFF" && new TextDecoder().decode(bytes.slice(8, 12)) === "WEBP";
  return false;
}

function safeOriginalName(value: string) {
  return cleanText(value).replace(/[^a-zA-Z0-9._ -]+/g, "_").slice(-120) || "attachment";
}

function encodedObjectPath(path: string) {
  return path.split("/").map(encodeURIComponent).join("/");
}

async function authorizeAdmin(req: Request) {
  const idToken = cleanText(req.headers.get("x-firebase-token"));
  if (!idToken) throw new Error("Admin login required");
  const firebaseUser = await verifyFirebaseUser(idToken);
  const accessToken = await getGoogleAccessToken();
  const profile = await getUserProfile(accessToken, firebaseUser.uid);
  const role = cleanText(profile?.role).toLowerCase();
  if (!profile || (!["admin", "superadmin"].includes(role) && profile?.superAdmin !== true)) {
    throw new Error("Only an administrator can upload notice attachments");
  }
  const schoolId = cleanText(profile.schoolId || profile.adminId || firebaseUser.uid);
  if (!schoolId || schoolId.includes("/")) throw new Error("Invalid school profile");
  return { firebaseUser, schoolId };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { status: 200, headers: corsHeaders });
  if (req.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405);

  try {
    const { firebaseUser, schoolId } = await authorizeAdmin(req);
    const { url, serviceKey } = storageConfig();
    const contentType = cleanText(req.headers.get("content-type")).toLowerCase();

    if (contentType.includes("application/json")) {
      const payload = await req.json();
      const path = cleanText(payload.path);
      if (cleanText(payload.action).toLowerCase() !== "delete" || !path.startsWith(`${schoolId}/`)) {
        return jsonResponse({ error: "Invalid attachment cleanup request" }, 400);
      }
      const deleted = await fetch(`${url}/storage/v1/object/${BUCKET}/${encodedObjectPath(path)}`, {
        method: "DELETE",
        headers: storageHeaders(serviceKey),
        body: "{}",
      });
      if (!deleted.ok && deleted.status !== 404) {
        const problem = await deleted.json().catch(() => ({}));
        throw new Error(problem.message || problem.error || "Unable to clean up attachment");
      }
      return jsonResponse({ success: true, deleted: true });
    }

    const form = await req.formData();
    const file = form.get("file");
    if (!(file instanceof File)) return jsonResponse({ error: "Choose a PDF or image to upload" }, 400);
    const requestedSchoolId = cleanText(form.get("schoolId"));
    if (requestedSchoolId !== schoolId) return jsonResponse({ error: "School profile does not match this upload" }, 403);
    const extensionType = file.name.toLowerCase().endsWith(".pdf") ? "application/pdf"
      : /\.png$/i.test(file.name) ? "image/png"
      : /\.jpe?g$/i.test(file.name) ? "image/jpeg"
      : /\.webp$/i.test(file.name) ? "image/webp"
      : /\.gif$/i.test(file.name) ? "image/gif"
      : "";
    const mimeType = ALLOWED_TYPES.has(file.type) ? file.type : extensionType;
    if (!ALLOWED_TYPES.has(mimeType)) return jsonResponse({ error: "Only PDF, PNG, JPG, WEBP or GIF files are allowed" }, 400);
    if (file.size < 1 || file.size > MAX_FILE_SIZE) return jsonResponse({ error: "Attachment must be smaller than 10 MB" }, 400);

    const bytes = new Uint8Array(await file.arrayBuffer());
    if (!matchesFileSignature(bytes, mimeType)) return jsonResponse({ error: "The selected file content does not match its file type" }, 400);
    await ensureBucket(url, serviceKey);

    const extension = mimeType === "application/pdf"
      ? "pdf"
      : mimeType === "image/jpeg" ? "jpg" : mimeType.split("/")[1];
    const path = `${schoolId}/${Date.now()}_${crypto.randomUUID()}.${extension}`;
    const uploaded = await fetch(`${url}/storage/v1/object/${BUCKET}/${encodedObjectPath(path)}`, {
      method: "POST",
      headers: {
        ...storageHeaders(serviceKey, mimeType),
        "cache-control": "3600",
        "x-upsert": "false",
      },
      body: bytes,
    });
    if (!uploaded.ok) {
      const problem = await uploaded.json().catch(() => ({}));
      throw new Error(problem.message || problem.error || "Attachment upload failed");
    }

    return jsonResponse({
      success: true,
      attachmentUrl: `${url}/storage/v1/object/public/${BUCKET}/${encodedObjectPath(path)}`,
      attachmentName: safeOriginalName(file.name),
      attachmentType: mimeType === "application/pdf" ? "pdf" : "image",
      storagePath: path,
      uploadedBy: firebaseUser.uid,
    });
  } catch (error) {
    console.error("upload-notice-attachment error", error);
    const message = error instanceof Error ? error.message : "Attachment upload failed";
    const status = /login|session/i.test(message) ? 401 : /administrator|match/i.test(message) ? 403 : 500;
    return jsonResponse({ error: message }, status);
  }
});
