const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
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
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return crypto.subtle.importKey("pkcs8", bytes, { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["sign"]);
}

async function getGoogleAccessToken() {
  const serviceAccountJsonBase64 = Deno.env.get("FIREBASE_SERVICE_ACCOUNT_JSON_BASE64");
  const serviceAccount = serviceAccountJsonBase64
    ? JSON.parse(new TextDecoder().decode(Uint8Array.from(atob(serviceAccountJsonBase64), (char) => char.charCodeAt(0))))
    : {};
  const clientEmail = Deno.env.get("FIREBASE_CLIENT_EMAIL") || serviceAccount.client_email;
  const privateKey = Deno.env.get("FIREBASE_PRIVATE_KEY") || serviceAccount.private_key;
  if (!clientEmail || !privateKey) throw new Error("Firebase service account secrets are not configured");

  const now = Math.floor(Date.now() / 1000);
  const unsignedJwt = `${base64UrlEncode(JSON.stringify({ alg: "RS256", typ: "JWT" }))}.${base64UrlEncode(JSON.stringify({
    iss: clientEmail,
    scope: "https://www.googleapis.com/auth/datastore",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  }))}`;
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
  if (!response.ok || !data.access_token) throw new Error(`Google token failed: ${JSON.stringify(data)}`);
  return data.access_token as string;
}

function toFirestoreValue(value: any): any {
  if (value === null || value === undefined) return { nullValue: null };
  if (typeof value === "string") return { stringValue: value };
  if (typeof value === "number") return Number.isInteger(value) ? { integerValue: String(value) } : { doubleValue: value };
  if (typeof value === "boolean") return { booleanValue: value };
  if (Array.isArray(value)) return { arrayValue: { values: value.map(toFirestoreValue) } };
  if (value instanceof Date) return { timestampValue: value.toISOString() };
  if (typeof value === "object") {
    return { mapValue: { fields: Object.fromEntries(Object.entries(value).map(([key, val]) => [key, toFirestoreValue(val)])) } };
  }
  return { stringValue: String(value) };
}

function toFirestoreFields(data: Record<string, any>) {
  return Object.fromEntries(Object.entries(data).map(([key, value]) => [key, toFirestoreValue(value)]));
}

async function updateTransaction(accessToken: string, schoolId: string, orderId: string, updateData: Record<string, any>) {
  const projectId = Deno.env.get("FIREBASE_PROJECT_ID") || "schoolix-48107";
  const mask = Object.keys(updateData).map((field) => `updateMask.fieldPaths=${encodeURIComponent(field)}`).join("&");
  const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/schools/${encodeURIComponent(schoolId)}/onlineFeeTransactions/${encodeURIComponent(orderId)}?${mask}`;
  const response = await fetch(url, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
    body: JSON.stringify({ fields: toFirestoreFields(updateData) }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error?.message || "Unable to update transaction");
  return data;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { status: 200, headers: corsHeaders });
  try {
    if (req.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405);
    const payload = await req.json();
    const schoolId = String(payload.schoolId || "").trim();
    const orderId = String(payload.orderId || payload.razorpay_order_id || "").trim();
    const status = String(payload.status || "").trim().toLowerCase();
    if (!schoolId || !orderId || !["failed", "cancelled", "pending"].includes(status)) {
      return jsonResponse({ error: "schoolId, orderId and valid status are required" }, 400);
    }

    const accessToken = await getGoogleAccessToken();
    await updateTransaction(accessToken, schoolId, orderId, {
      status,
      paymentId: String(payload.paymentId || ""),
      razorpayPaymentId: String(payload.paymentId || ""),
      error: String(payload.error || ""),
      updatedAt: new Date().toISOString(),
    });
    return jsonResponse({ success: true, orderId, status });
  } catch (error) {
    console.error("update-razorpay-transaction error:", error);
    return jsonResponse({ error: error instanceof Error ? error.message : "Internal server error" }, 500);
  }
});
