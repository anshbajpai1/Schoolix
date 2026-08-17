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

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function base64UrlEncode(input: string | ArrayBuffer) {
  const bytes = typeof input === "string"
    ? new TextEncoder().encode(input)
    : new Uint8Array(input);
  let binary = "";
  bytes.forEach((byte) => binary += String.fromCharCode(byte));
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
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
  const serviceAccountJsonBase64 = Deno.env.get("FIREBASE_SERVICE_ACCOUNT_JSON_BASE64");
  const serviceAccount = serviceAccountJsonBase64
    ? JSON.parse(new TextDecoder().decode(Uint8Array.from(atob(serviceAccountJsonBase64), (char) => char.charCodeAt(0))))
    : {};
  const clientEmail = Deno.env.get("FIREBASE_CLIENT_EMAIL") || serviceAccount.client_email;
  const privateKey = Deno.env.get("FIREBASE_PRIVATE_KEY") || serviceAccount.private_key;
  if (!clientEmail || !privateKey) {
    throw new Error("Firebase service account secrets are not configured");
  }

  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const claimSet = {
    iss: clientEmail,
    scope: "https://www.googleapis.com/auth/firebase https://www.googleapis.com/auth/identitytoolkit",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  };
  const unsignedJwt = `${base64UrlEncode(JSON.stringify(header))}.${base64UrlEncode(JSON.stringify(claimSet))}`;
  const key = await importPrivateKey(privateKey);
  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    key,
    new TextEncoder().encode(unsignedJwt),
  );
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
  if (!response.ok || !data.access_token) {
    throw new Error(`Google token failed: ${JSON.stringify(data)}`);
  }
  return data.access_token as string;
}

async function generateFirebaseResetLink(email: string) {
  const baseUrl = Deno.env.get("PASSWORD_RESET_BASE_URL") || "http://127.0.0.1:3000";
  const secret = Deno.env.get("PASSWORD_RESET_TOKEN_SECRET");
  if (!secret) throw new Error("PASSWORD_RESET_TOKEN_SECRET is not configured");

  const header = { alg: "HS256", typ: "JWT" };
  const payload = {
    email,
    purpose: "password-reset",
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
  };
  const unsignedToken = `${base64UrlEncode(JSON.stringify(header))}.${base64UrlEncode(JSON.stringify(payload))}`;
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(unsignedToken));
  const token = `${unsignedToken}.${base64UrlEncode(signature)}`;
  return `${baseUrl.replace(/\/+$/, "")}/reset-password.html?token=${encodeURIComponent(token)}`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { status: 200, headers: corsHeaders });
  }

  try {
    if (req.method !== "POST") {
      return jsonResponse({ error: "Method not allowed" }, 405);
    }

    const brevoApiKey = Deno.env.get("BREVO_API_KEY");
    if (!brevoApiKey) {
      return jsonResponse({ error: "BREVO_API_KEY is not configured" }, 500);
    }

    let payload;
    try {
      payload = await req.json();
    } catch {
      return jsonResponse({ error: "Invalid JSON request body" }, 400);
    }

    const email = String(payload.email || "").trim().toLowerCase();
    if (!isEmail(email)) {
      return jsonResponse({ error: "Valid email required" }, 400);
    }

    const schoolName = String(payload.schoolName || "Schoolix").trim();
    const resetLink = await generateFirebaseResetLink(email);
    const safeSchoolName = escapeHtml(schoolName);
    const safeEmail = escapeHtml(email);
    const safeResetLink = escapeHtml(resetLink);

    const subject = `Reset your ${safeSchoolName} password`;
    const textContent = `We received a request to reset the password for ${safeEmail}.\n\nReset password: ${resetLink}\n\nIf you did not request this, you can safely ignore this email.`;
    const htmlContent = `
      <div style="margin:0;padding:0;background:#f6f7fb;font-family:Arial,sans-serif;color:#111827;">
        <div style="max-width:560px;margin:0 auto;padding:28px 16px;">
          <div style="background:#ffffff;border:1px solid #e5e7eb;border-radius:14px;overflow:hidden;">
            <div style="padding:24px 28px;background:#101827;color:#ffffff;">
              <div style="font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:#a5b4fc;">${safeSchoolName}</div>
              <h1 style="margin:10px 0 0;font-size:24px;line-height:1.25;">Reset your password</h1>
            </div>
            <div style="padding:28px;">
              <p style="margin:0 0 14px;font-size:15px;line-height:1.7;">Hi,</p>
              <p style="margin:0 0 18px;font-size:15px;line-height:1.7;">
                We received a request to reset the password for <strong>${safeEmail}</strong>.
              </p>
              <p style="margin:0 0 24px;font-size:15px;line-height:1.7;">
                Use the button below to choose a new password. For your security, this link is generated by Firebase and will expire automatically.
              </p>
              <a href="${safeResetLink}" style="display:inline-block;background:#4f46e5;color:#ffffff;text-decoration:none;font-weight:700;font-size:15px;padding:13px 20px;border-radius:10px;">
                Reset password
              </a>
              <p style="margin:24px 0 0;font-size:13px;line-height:1.7;color:#6b7280;">
                If the button does not work, copy and paste this link into your browser:<br>
                <a href="${safeResetLink}" style="color:#4f46e5;word-break:break-all;">${safeResetLink}</a>
              </p>
              <p style="margin:22px 0 0;font-size:13px;line-height:1.7;color:#6b7280;">
                If you did not request this password reset, you can safely ignore this email.
              </p>
            </div>
          </div>
        </div>
      </div>
    `;

    const brevoResponse = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": brevoApiKey,
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        sender: {
          name: `${schoolName} Support`,
          email: "schoolixteam@gmail.com",
        },
        to: [{ email }],
        subject,
        textContent,
        htmlContent,
      }),
    });

    const brevoData = await brevoResponse.text();
    if (!brevoResponse.ok) {
      console.error("Brevo Error:", brevoData);
      return jsonResponse({
        error: "Failed to send password reset email",
        details: brevoData,
      }, 500);
    }

    return jsonResponse({
      success: true,
      message: "Password reset email sent successfully",
    });
  } catch (error) {
    console.error("Password Reset Function Error:", error);
    return jsonResponse({
      error: error instanceof Error ? error.message : "Internal server error",
    }, 500);
  }
});
