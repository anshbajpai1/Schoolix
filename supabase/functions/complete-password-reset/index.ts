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

function base64UrlDecode(value: string) {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(value.length / 4) * 4, "=");
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function base64UrlEncode(input: ArrayBuffer) {
  const bytes = new Uint8Array(input);
  let binary = "";
  bytes.forEach((byte) => binary += String.fromCharCode(byte));
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

async function verifyResetToken(token: string) {
  const secret = Deno.env.get("PASSWORD_RESET_TOKEN_SECRET");
  if (!secret) throw new Error("PASSWORD_RESET_TOKEN_SECRET is not configured");
  const parts = token.split(".");
  if (parts.length !== 3) throw new Error("Invalid reset token");

  const [encodedHeader, encodedPayload, signature] = parts;
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const expectedSignature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(`${encodedHeader}.${encodedPayload}`));
  if (base64UrlEncode(expectedSignature) !== signature) throw new Error("Invalid reset token");

  const payload = JSON.parse(new TextDecoder().decode(base64UrlDecode(encodedPayload)));
  if (payload.purpose !== "password-reset") throw new Error("Invalid reset token");
  if (!payload.exp || Math.floor(Date.now() / 1000) > Number(payload.exp)) throw new Error("Reset link has expired");
  if (!payload.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) throw new Error("Invalid reset token");
  return String(payload.email).toLowerCase();
}

function decodeServiceAccount() {
  const encoded = Deno.env.get("FIREBASE_SERVICE_ACCOUNT_JSON_BASE64");
  if (!encoded) throw new Error("Firebase service account secret is not configured");
  return JSON.parse(new TextDecoder().decode(Uint8Array.from(atob(encoded), (char) => char.charCodeAt(0))));
}

async function importPrivateKey(pem: string) {
  const body = pem
    .replace(/\\n/g, "\n")
    .replace(/-----BEGIN PRIVATE KEY-----/g, "")
    .replace(/-----END PRIVATE KEY-----/g, "")
    .replace(/\s+/g, "");
  const binary = atob(body);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return crypto.subtle.importKey(
    "pkcs8",
    bytes,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"],
  );
}

async function getGoogleAccessToken() {
  const serviceAccount = decodeServiceAccount();
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const claimSet = {
    iss: serviceAccount.client_email,
    scope: "https://www.googleapis.com/auth/firebase https://www.googleapis.com/auth/identitytoolkit",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  };
  const unsignedJwt = `${btoa(JSON.stringify(header)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "")}.${btoa(JSON.stringify(claimSet)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "")}`;
  const key = await importPrivateKey(serviceAccount.private_key);
  const signature = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", key, new TextEncoder().encode(unsignedJwt));
  const assertion = `${unsignedJwt}.${base64UrlEncode(signature)}`;
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });
  const data = await response.json();
  if (!response.ok || !data.access_token) throw new Error(`Google token failed: ${JSON.stringify(data)}`);
  return data.access_token as string;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { status: 200, headers: corsHeaders });

  try {
    if (req.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405);
    const { token, password } = await req.json();
    const newPassword = String(password || "");
    if (newPassword.length < 6) return jsonResponse({ error: "Password must be at least 6 characters" }, 400);

    const email = await verifyResetToken(String(token || ""));
    const projectId = Deno.env.get("FIREBASE_PROJECT_ID") || decodeServiceAccount().project_id || "schoolix-48107";
    const accessToken = await getGoogleAccessToken();
    const headers = {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };

    const lookupResponse = await fetch(`https://identitytoolkit.googleapis.com/v1/projects/${projectId}/accounts:lookup`, {
      method: "POST",
      headers,
      body: JSON.stringify({ email: [email] }),
    });
    const lookupData = await lookupResponse.json();
    const user = lookupData.users?.[0];
    if (!lookupResponse.ok || !user?.localId) {
      return jsonResponse({ error: "No Firebase login account found for this email" }, 404);
    }

    const updateResponse = await fetch(`https://identitytoolkit.googleapis.com/v1/projects/${projectId}/accounts:update`, {
      method: "POST",
      headers,
      body: JSON.stringify({ localId: user.localId, password: newPassword }),
    });
    const updateData = await updateResponse.json();
    if (!updateResponse.ok) {
      return jsonResponse({ error: "Failed to update password", details: updateData }, 500);
    }

    return jsonResponse({ success: true, message: "Password updated successfully" });
  } catch (error) {
    return jsonResponse({ error: error instanceof Error ? error.message : "Internal server error" }, 500);
  }
});
