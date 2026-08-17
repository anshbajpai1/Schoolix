const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const FIREBASE_WEB_API_KEY = Deno.env.get("FIREBASE_WEB_API_KEY") || "AIzaSyAomGwef93HFT9Xyx7SVW95FPw_IcIAICE";

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

function cleanText(value: unknown) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function normalizeEmail(value: unknown) {
  return cleanText(value).toLowerCase();
}

function serviceHeaders() {
  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) throw new Error("Supabase service role is not configured");
  return {
    apikey: SERVICE_ROLE_KEY,
    Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
    "Content-Type": "application/json",
  };
}

async function verifyFirebasePassword(email: string, password: string) {
  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${encodeURIComponent(FIREBASE_WEB_API_KEY)}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, returnSecureToken: true }),
    },
  );
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.localId) throw new Error("Invalid email or password");
  return {
    firebaseUid: String(data.localId),
    email: normalizeEmail(data.email || email),
    displayName: cleanText(data.displayName || ""),
  };
}

async function listSupabaseUsers() {
  const response = await fetch(`${SUPABASE_URL}/auth/v1/admin/users?per_page=1000`, {
    headers: serviceHeaders(),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || data.msg || "Unable to list Supabase users");
  return Array.isArray(data.users) ? data.users : [];
}

async function upsertSupabasePassword(firebaseUser: { firebaseUid: string; email: string; displayName: string }, password: string) {
  const users = await listSupabaseUsers();
  const existing = users.find((user: Record<string, unknown>) => normalizeEmail(user.email) === firebaseUser.email);
  if (existing?.id) {
    const response = await fetch(`${SUPABASE_URL}/auth/v1/admin/users/${existing.id}`, {
      method: "PUT",
      headers: serviceHeaders(),
      body: JSON.stringify({
        password,
        email_confirm: true,
        user_metadata: {
          ...(typeof existing.user_metadata === "object" && existing.user_metadata ? existing.user_metadata : {}),
          firebaseUid: firebaseUser.firebaseUid,
          displayName: firebaseUser.displayName,
          legacyPasswordMigrated: true,
        },
        app_metadata: {
          ...(typeof existing.app_metadata === "object" && existing.app_metadata ? existing.app_metadata : {}),
          firebaseUid: firebaseUser.firebaseUid,
        },
      }),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.message || data.msg || "Unable to sync legacy password");
    return { id: String(existing.id), created: false };
  }

  const response = await fetch(`${SUPABASE_URL}/auth/v1/admin/users`, {
    method: "POST",
    headers: serviceHeaders(),
    body: JSON.stringify({
      email: firebaseUser.email,
      password,
      email_confirm: true,
      user_metadata: {
        firebaseUid: firebaseUser.firebaseUid,
        displayName: firebaseUser.displayName,
        migratedFrom: "firebase-legacy-login",
      },
      app_metadata: {
        firebaseUid: firebaseUser.firebaseUid,
      },
    }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.id) throw new Error(data.message || data.msg || "Unable to create Supabase login");
  return { id: String(data.id), created: true };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { status: 200, headers: corsHeaders });
  if (req.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405);
  try {
    const payload = await req.json().catch(() => ({}));
    const email = normalizeEmail(payload.email);
    const password = String(payload.password || "");
    if (!email || !password) return jsonResponse({ error: "Email and password required" }, 400);
    const firebaseUser = await verifyFirebasePassword(email, password);
    const supabaseUser = await upsertSupabasePassword(firebaseUser, password);
    return jsonResponse({ success: true, email: firebaseUser.email, uid: supabaseUser.id });
  } catch (error) {
    console.error("legacy-firebase-login error", error);
    const message = error instanceof Error ? error.message : "Legacy login failed";
    return jsonResponse({ error: message }, /Invalid email or password/i.test(message) ? 401 : 500);
  }
});
