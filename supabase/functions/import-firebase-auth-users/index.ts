const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const MIGRATION_SECRET = Deno.env.get("SCHOOLIX_MIGRATION_SECRET") || "";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-migration-secret",
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

function headers() {
  return {
    apikey: SERVICE_ROLE_KEY,
    Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
    "Content-Type": "application/json",
  };
}

async function existingUsers() {
  const response = await fetch(`${SUPABASE_URL}/auth/v1/admin/users?per_page=1000`, { headers: headers() });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || data.msg || "Unable to list Supabase Auth users");
  return Array.isArray(data.users) ? data.users : [];
}

async function createUser(user: Record<string, unknown>) {
  const response = await fetch(`${SUPABASE_URL}/auth/v1/admin/users`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({
      email: user.email,
      password: user.temporaryPassword,
      email_confirm: true,
      user_metadata: {
        firebaseUid: user.firebaseUid,
        displayName: user.displayName || "",
        phoneNumber: user.phoneNumber || "",
        migratedFrom: "firebase",
      },
      app_metadata: {
        firebaseUid: user.firebaseUid,
      },
    }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || data.msg || `Unable to create ${user.email}`);
  return data;
}

async function updateUser(existingUser: Record<string, unknown>, user: Record<string, unknown>) {
  const currentMetadata = typeof existingUser.user_metadata === "object" && existingUser.user_metadata
    ? existingUser.user_metadata
    : {};
  const currentAppMetadata = typeof existingUser.app_metadata === "object" && existingUser.app_metadata
    ? existingUser.app_metadata
    : {};
  const response = await fetch(`${SUPABASE_URL}/auth/v1/admin/users/${existingUser.id}`, {
    method: "PUT",
    headers: headers(),
    body: JSON.stringify({
      password: user.temporaryPassword,
      email_confirm: true,
      user_metadata: {
        ...currentMetadata,
        firebaseUid: user.firebaseUid,
        displayName: user.displayName || currentMetadata.displayName || "",
        phoneNumber: user.phoneNumber || currentMetadata.phoneNumber || "",
        migratedFrom: currentMetadata.migratedFrom || "firebase",
        migrationPasswordReset: true,
      },
      app_metadata: {
        ...currentAppMetadata,
        firebaseUid: user.firebaseUid,
      },
    }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || data.msg || `Unable to update ${user.email}`);
  return data;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { status: 200, headers: corsHeaders });
  if (req.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405);
  try {
    if (!MIGRATION_SECRET || cleanText(req.headers.get("x-migration-secret")) !== MIGRATION_SECRET) {
      return jsonResponse({ error: "Migration secret required" }, 403);
    }
    const payload = await req.json();
    const users = Array.isArray(payload.users) ? payload.users : [];
    const existing = new Map((await existingUsers()).map((user: Record<string, unknown>) => [normalizeEmail(user.email), user]));
    const created = [];
    const updated = [];
    for (const user of users) {
      const email = normalizeEmail(user.email);
      if (!email || !user.temporaryPassword) continue;
      const existingUser = existing.get(email);
      if (existingUser) {
        const updatedUser = await updateUser(existingUser, { ...user, email });
        updated.push({ email, id: updatedUser.id || existingUser.id });
        continue;
      }
      const createdUser = await createUser({ ...user, email });
      existing.set(email, createdUser);
      created.push({ email, id: createdUser.id });
    }
    return jsonResponse({ success: true, created, updated });
  } catch (error) {
    console.error("import-firebase-auth-users error", error);
    return jsonResponse({ error: error instanceof Error ? error.message : "Import failed" }, 500);
  }
});
