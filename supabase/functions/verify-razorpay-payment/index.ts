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

function readFirestoreValue(value: any): any {
  if (!value || typeof value !== "object") return null;
  if ("stringValue" in value) return value.stringValue;
  if ("integerValue" in value) return Number(value.integerValue);
  if ("doubleValue" in value) return Number(value.doubleValue);
  if ("booleanValue" in value) return Boolean(value.booleanValue);
  if ("timestampValue" in value) return value.timestampValue;
  if ("nullValue" in value) return null;
  if ("arrayValue" in value) return (value.arrayValue.values || []).map(readFirestoreValue);
  if ("mapValue" in value) return readFirestoreFields(value.mapValue.fields || {});
  return null;
}

function readFirestoreFields(fields: Record<string, any>) {
  return Object.fromEntries(Object.entries(fields || {}).map(([key, value]) => [key, readFirestoreValue(value)]));
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

async function hmacSha256Hex(message: string, secret: string) {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(message));
  return Array.from(new Uint8Array(signature)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function timingSafeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return mismatch === 0;
}

async function getFeeDocument(accessToken: string, schoolId: string, feeId: string) {
  const projectId = Deno.env.get("FIREBASE_PROJECT_ID") || "schoolix-48107";
  const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/schools/${encodeURIComponent(schoolId)}/fees/${encodeURIComponent(feeId)}`;
  const response = await fetch(url, { headers: { Authorization: `Bearer ${accessToken}` } });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error?.message || "Fee record not found");
  return { id: feeId, ...readFirestoreFields(data.fields || {}) };
}

async function updateFeeDocument(accessToken: string, schoolId: string, feeId: string, updateData: Record<string, any>) {
  const projectId = Deno.env.get("FIREBASE_PROJECT_ID") || "schoolix-48107";
  const mask = Object.keys(updateData).map((field) => `updateMask.fieldPaths=${encodeURIComponent(field)}`).join("&");
  const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/schools/${encodeURIComponent(schoolId)}/fees/${encodeURIComponent(feeId)}?${mask}`;
  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fields: toFirestoreFields(updateData) }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error?.message || "Unable to update fee record");
  return data;
}

async function updateTransactionDocument(accessToken: string, schoolId: string, transactionId: string, updateData: Record<string, any>) {
  const projectId = Deno.env.get("FIREBASE_PROJECT_ID") || "schoolix-48107";
  const mask = Object.keys(updateData).map((field) => `updateMask.fieldPaths=${encodeURIComponent(field)}`).join("&");
  const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/schools/${encodeURIComponent(schoolId)}/onlineFeeTransactions/${encodeURIComponent(transactionId)}?${mask}`;
  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fields: toFirestoreFields(updateData) }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error?.message || "Unable to update payment transaction");
  return data;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { status: 200, headers: corsHeaders });

  try {
    if (req.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405);

    const keyId = Deno.env.get("RAZORPAY_KEY_ID");
    const keySecret = Deno.env.get("RAZORPAY_KEY_SECRET");
    if (!keyId || !keySecret) return jsonResponse({ error: "Razorpay keys are not configured" }, 500);

    const payload = await req.json();
    const schoolId = String(payload.schoolId || "").trim();
    const studentId = String(payload.studentId || "").trim();
    const feeId = String(payload.feeId || "").trim();
    const orderId = String(payload.razorpay_order_id || "").trim();
    const paymentId = String(payload.razorpay_payment_id || "").trim();
    const signature = String(payload.razorpay_signature || "").trim();
    if (!schoolId || !studentId || !feeId || !orderId || !paymentId || !signature) {
      return jsonResponse({ error: "Missing payment verification details" }, 400);
    }

    const expectedSignature = await hmacSha256Hex(`${orderId}|${paymentId}`, keySecret);
    if (!timingSafeEqual(expectedSignature, signature)) {
      return jsonResponse({ error: "Invalid Razorpay payment signature" }, 400);
    }

    const paymentResponse = await fetch(`https://api.razorpay.com/v1/payments/${encodeURIComponent(paymentId)}`, {
      headers: { Authorization: `Basic ${btoa(`${keyId}:${keySecret}`)}` },
    });
    const payment = await paymentResponse.json();
    if (!paymentResponse.ok) return jsonResponse({ error: "Unable to fetch Razorpay payment", details: payment }, 502);
    if (payment.order_id !== orderId) return jsonResponse({ error: "Payment order mismatch" }, 400);
    if (payment.status !== "captured") return jsonResponse({ error: `Payment is ${payment.status}, not captured` }, 400);

    const accessToken = await getGoogleAccessToken();
    const fee = await getFeeDocument(accessToken, schoolId, feeId);
    if (String(fee.studentId || "") !== studentId) return jsonResponse({ error: "Fee record does not belong to this student" }, 403);

    const existingPayments = Array.isArray(fee.payments) ? fee.payments : [];
    if (existingPayments.some((item: any) => item.razorpayPaymentId === paymentId || item.paymentId === paymentId)) {
      return jsonResponse({ success: true, duplicate: true, paymentId });
    }

    const assigned = Number(fee.originalAmount || fee.amount || 0);
    const paidSoFar = Number(fee.totalPaidAmount || fee.paidAmount || 0);
    const dueBefore = Math.max(0, assigned - paidSoFar);
    const receivedAmount = Math.round(Number(payment.amount || 0)) / 100;
    const appliedAmount = Math.min(receivedAmount, dueBefore);
    const extraAmount = Math.max(0, receivedAmount - dueBefore);
    const newPaid = paidSoFar + appliedAmount;
    const existingExtra = Number(fee.totalExtraPaidAmount || 0);
    const newExtra = existingExtra + extraAmount;
    const remaining = Math.max(0, assigned - newPaid);
    const now = new Date().toISOString();
    const status = remaining === 0 ? "Paid" : newPaid > 0 ? "Partial" : "Imposed";

    const paymentEntry = {
      amount: appliedAmount,
      receivedAmount,
      appliedAmount,
      extraAmount,
      date: now,
      status: extraAmount > 0 ? "Paid with extra" : status,
      note: "Paid online via Razorpay",
      source: "razorpay",
      razorpayPaymentId: paymentId,
      razorpayOrderId: orderId,
      razorpaySignature: signature,
      method: payment.method || "",
      paymentId,
      orderId,
    };

    await updateFeeDocument(accessToken, schoolId, feeId, {
      status,
      paidAmount: newPaid,
      totalPaidAmount: newPaid,
      totalExtraPaidAmount: newExtra,
      totalCollectedAmount: newPaid + newExtra,
      remainingAmount: remaining,
      lastPaymentAmount: receivedAmount,
      lastPaymentDate: now,
      lastPaymentSource: "razorpay",
      lastRazorpayPaymentId: paymentId,
      lastRazorpayOrderId: orderId,
      payments: [...existingPayments, paymentEntry],
    });

    await updateTransactionDocument(accessToken, schoolId, orderId, {
      status: "paid",
      paymentId,
      razorpayPaymentId: paymentId,
      method: payment.method || "",
      amount: receivedAmount,
      appliedAmount,
      remainingAmount: remaining,
      updatedAt: now,
      error: "",
    });

    return jsonResponse({
      success: true,
      paymentId,
      orderId,
      amount: receivedAmount,
      appliedAmount,
      remaining,
      status,
    });
  } catch (error) {
    console.error("verify-razorpay-payment error:", error);
    return jsonResponse({ error: error instanceof Error ? error.message : "Internal server error" }, 500);
  }
});
