const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const SUPER_ADMIN_EMAIL = "anshbajpai4@gmail.com";

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

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function serviceHeaders(contentType = "application/json") {
  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) throw new Error("Supabase service role is not configured");
  return {
    apikey: SERVICE_ROLE_KEY,
    Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
    "Content-Type": contentType,
  };
}

async function getCaller(req: Request) {
  const token = cleanText(req.headers.get("authorization")).replace(/^Bearer\s+/i, "");
  if (!token) throw new Error("Super admin login required");
  const response = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
    headers: {
      apikey: SERVICE_ROLE_KEY,
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.id) throw new Error("Super admin session is invalid or expired");
  const email = normalizeEmail(data.email);
  if (email !== SUPER_ADMIN_EMAIL) throw new Error("Only the authorized Super Admin can create schools");
  return { uid: String(data.id), email };
}

async function findUserByEmail(email: string) {
  const response = await fetch(`${SUPABASE_URL}/auth/v1/admin/users?per_page=1000`, {
    headers: serviceHeaders(),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.msg || data.message || "Unable to check existing auth users");
  const users = Array.isArray(data.users) ? data.users : Array.isArray(data) ? data : [];
  return users.find((user: Record<string, unknown>) => normalizeEmail(user.email) === email) || null;
}

async function createAuthUser(email: string, password: string, adminName: string, schoolName: string) {
  const existing = await findUserByEmail(email);
  if (existing?.id) return { id: String(existing.id), alreadyExists: true };

  const response = await fetch(`${SUPABASE_URL}/auth/v1/admin/users`, {
    method: "POST",
    headers: serviceHeaders(),
    body: JSON.stringify({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        name: adminName,
        full_name: adminName,
        role: "admin",
        schoolName,
      },
      app_metadata: {
        role: "admin",
      },
    }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.id) throw new Error(data.msg || data.message || "Unable to create admin login");
  return { id: String(data.id), alreadyExists: false };
}

async function upsert(table: string, payload: Record<string, unknown>, onConflict: string) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${table}?on_conflict=${encodeURIComponent(onConflict)}`, {
    method: "POST",
    headers: {
      ...serviceHeaders(),
      Prefer: "resolution=merge-duplicates,return=representation",
    },
    body: JSON.stringify(payload),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || data.msg || `Unable to save ${table}`);
  return data;
}

function firestoreRow(path: string, data: Record<string, unknown>, schoolId = "") {
  const parts = path.split("/");
  return {
    path,
    path_depth: parts.length,
    collection_name: parts.length === 2 ? parts[0] : parts.at(-2),
    document_id: parts.at(-1),
    school_id: schoolId || data.schoolId || data.adminId || null,
    data,
    updated_at: new Date().toISOString(),
  };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { status: 200, headers: corsHeaders });
  if (req.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405);

  try {
    const caller = await getCaller(req);
    const payload = await req.json().catch(() => ({}));
    const schoolName = cleanText(payload.schoolName);
    const adminName = cleanText(payload.adminName);
    const email = normalizeEmail(payload.email);
    const password = String(payload.password || "");
    const logoUrl = cleanText(payload.logoUrl);
    const schoolLogoUrl = cleanText(payload.schoolLogoUrl || logoUrl);
    const logoPublicId = cleanText(payload.logoPublicId);
    const features = payload.features && typeof payload.features === "object" ? payload.features : {};

    if (!schoolName || !adminName || !email || !password) {
      return jsonResponse({ error: "Please fill all fields" }, 400);
    }
    if (!isEmail(email)) return jsonResponse({ error: "Enter a valid admin email" }, 400);
    if (password.length < 6) return jsonResponse({ error: "Password must be at least 6 characters" }, 400);

    const authUser = await createAuthUser(email, password, adminName, schoolName);
    const uid = authUser.id;
    const now = new Date().toISOString();

    const userData = {
      uid,
      name: adminName,
      email,
      role: "admin",
      schoolName,
      logoUrl,
      schoolLogoUrl,
      logoPublicId,
      schoolId: uid,
      access: true,
      features,
      onboardingRequired: true,
      onboardingCompleted: false,
      onboardingVersion: 1,
      createdBy: caller.uid,
      createdByEmail: caller.email,
      createdAt: now,
      updatedAt: now,
    };

    const schoolData = {
      schoolName,
      name: schoolName,
      adminName,
      adminEmail: email,
      logoUrl,
      schoolLogoUrl,
      logoPublicId,
      access: true,
      features,
      onboardingRequired: true,
      onboardingCompleted: false,
      onboardingVersion: 1,
      createdAt: now,
      createdBy: caller.uid,
      createdByEmail: caller.email,
      updatedAt: now,
    };

    await upsert("firestore_documents", firestoreRow(`users/${uid}`, userData, uid), "path");
    await upsert("firestore_documents", firestoreRow(`schools/${uid}`, schoolData, uid), "path");
    await upsert("firestore_documents", firestoreRow(`schools/${uid}/config/branding`, {
      schoolName,
      logoUrl,
      schoolLogoUrl,
      logoPublicId,
      updatedAt: now,
      updatedBy: email,
    }, uid), "path");

    await upsert("schoolix_schools", {
      id: uid,
      name: schoolName,
      email,
      access: true,
      data: schoolData,
      updated_at: now,
    }, "id");

    await upsert("schoolix_users", {
      id: uid,
      auth_uid: uid,
      school_id: uid,
      admin_id: uid,
      email,
      role: "admin",
      name: adminName,
      access: true,
      data: userData,
      updated_at: now,
    }, "id");

    return jsonResponse({
      success: true,
      uid,
      email,
      schoolName,
      alreadyExists: authUser.alreadyExists,
    });
  } catch (error) {
    console.error("create-school-admin error", error);
    const message = error instanceof Error ? error.message : "Unable to create school admin";
    const status = /login|session/i.test(message) ? 401 : /authorized|Super Admin/i.test(message) ? 403 : 500;
    return jsonResponse({ error: message }, status);
  }
});
