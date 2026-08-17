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

function headers() {
  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) throw new Error("Supabase service role is not configured");
  return {
    apikey: SERVICE_ROLE_KEY,
    Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
    "Content-Type": "application/json",
  };
}

function docIdFromPath(path: string) {
  return path.split("/").at(-1) || "";
}

function parentPath(path: string) {
  return path.split("/").slice(0, -1).join("/");
}

function collectionNameFromPath(path: string) {
  const parts = path.split("/");
  return parts.length === 1 ? parts[0] : parts.at(-1) || "";
}

function schoolIdFromPath(path: string) {
  const parts = path.split("/");
  return parts[0] === "schools" ? parts[1] || "" : "";
}

function getByPath(source: Record<string, unknown>, field: string) {
  return field.split(".").reduce((value: any, key) => value?.[key], source);
}

function deepEqual(left: unknown, right: unknown) {
  return JSON.stringify(left) === JSON.stringify(right);
}

function matchesWhere(row: Record<string, any>, constraint: Record<string, any>) {
  const actual = getByPath(row.data || {}, String(constraint.field || ""));
  const expected = constraint.value;
  switch (constraint.operator) {
    case "==": return actual === expected;
    case "!=": return actual !== expected;
    case ">": return actual > expected;
    case ">=": return actual >= expected;
    case "<": return actual < expected;
    case "<=": return actual <= expected;
    case "array-contains": return Array.isArray(actual) && actual.some((item) => deepEqual(item, expected));
    case "in": return Array.isArray(expected) && expected.includes(actual);
    case "array-contains-any": return Array.isArray(actual) && Array.isArray(expected) && actual.some((item) => expected.includes(item));
    default: return true;
  }
}

function applyQuery(rows: Record<string, any>[], constraints: Record<string, any>[] = []) {
  let next = rows.slice();
  constraints.filter((item) => item.type === "where").forEach((constraint) => {
    next = next.filter((row) => matchesWhere(row, constraint));
  });
  constraints.filter((item) => item.type === "orderBy").reverse().forEach((constraint) => {
    const direction = constraint.direction === "desc" ? -1 : 1;
    next.sort((left, right) => {
      const a = getByPath(left.data || {}, constraint.field);
      const b = getByPath(right.data || {}, constraint.field);
      if (a === b) return 0;
      if (a == null) return 1;
      if (b == null) return -1;
      return a > b ? direction : -direction;
    });
  });
  const limit = constraints.find((item) => item.type === "limit");
  return limit ? next.slice(0, Number(limit.count || 0)) : next;
}

async function rest(path: string, options: RequestInit = {}) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...options,
    headers: {
      ...headers(),
      Prefer: "return=representation,resolution=merge-duplicates",
      ...(options.headers || {}),
    },
  });
  const text = await response.text();
  const data = text ? JSON.parse(text) : null;
  if (!response.ok) throw new Error(data?.message || data?.msg || data?.error || `Supabase REST ${response.status}`);
  return data;
}

async function authUser(req: Request) {
  const token = cleanText(req.headers.get("authorization")).replace(/^Bearer\s+/i, "");
  if (!token) return null;
  const response = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
    headers: {
      apikey: SERVICE_ROLE_KEY,
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.id) return null;
  const appMetadata = typeof data.app_metadata === "object" && data.app_metadata ? data.app_metadata : {};
  return {
    uid: String(data.id),
    email: String(data.email || "").toLowerCase(),
    // app_metadata is server-managed. Never authorize a school using the
    // account-editable user_metadata legacy UID.
    firebaseUid: cleanText(appMetadata.firebaseUid || appMetadata.legacyUid || ""),
  };
}

async function getProfile(uid: string) {
  const rows = await rest(`firestore_documents?path=eq.${encodeURIComponent(`users/${uid}`)}&select=*`);
  return rows?.[0]?.data || null;
}

function canonicalSchoolId(profile: Record<string, any> = {}) {
  return cleanText(
    profile.schoolId || profile.schoolID || profile.schoolUid || profile.schoolUID ||
    profile.schoolDocId || profile.schoolDocID ||
    profile.adminId || profile.adminID || profile.adminUid || profile.adminUID ||
    profile.adminDocId || profile.adminDocID || ""
  );
}

function selectUnambiguousProfile(rows: Record<string, any>[] = []) {
  const available = rows.filter((row) => row?.data && typeof row.data === "object");
  if (available.length <= 1) return available[0]?.data || null;

  // Migration can legitimately leave student-id, Firebase-UID and
  // Supabase-UID copies of one profile. Accept duplicates only when they all
  // describe the same role/person/school; never guess between real accounts
  // which happen to share an email address.
  const identityKeys = new Set(available.map((row) => {
    const profile = row.data || {};
    return [
      canonicalSchoolId(profile),
      profile.studentId || profile.teacherId || profile.staffId || "",
      profile.role || "",
    ].map((value) => cleanText(value).toLowerCase()).join("|");
  }).filter((key) => key !== "||"));
  if (identityKeys.size !== 1) return null;

  const ranked = [...available].sort((left, right) => {
    const score = (row: Record<string, any>) => {
      const profile = row.data || {};
      const personId = cleanText(profile.studentId || profile.teacherId || profile.staffId || "");
      const documentId = cleanText(row.document_id || docIdFromPath(row.path || ""));
      return (personId && documentId === personId ? 100 : 0)
        + (canonicalSchoolId(profile) ? 20 : 0)
        + (cleanText(profile.role) ? 10 : 0);
    };
    return score(right) - score(left);
  });
  return ranked[0]?.data || null;
}

async function resolveProfileForAuthUser(user: { uid: string; email: string; firebaseUid?: string }) {
  // Metadata-linked legacy profiles are canonical for migrated Firebase users;
  // direct Supabase-UUID bridge rows can lag behind later school corrections.
  for (const uid of [user.firebaseUid, user.uid].map(cleanText).filter(Boolean)) {
    const profile = await getProfile(uid);
    if (profile) return profile;
  }

  const authLinked = await getDocs("users", [
    { type: "where", field: "authUid", operator: "==", value: user.uid },
  ]);
  const authProfile = selectUnambiguousProfile(authLinked);
  if (authProfile) return authProfile;

  if (user.email) {
    const emailLinked: Record<string, any>[] = [];
    for (const field of ["email", "authEmail"]) {
      const rows = await getDocs("users", [
        { type: "where", field, operator: "==", value: user.email },
      ]);
      emailLinked.push(...rows);
    }
    const exact = [...new Map(emailLinked
      .filter((row) => [row.data?.email, row.data?.authEmail]
        .some((value) => cleanText(value).toLowerCase() === user.email))
      .map((row) => [row.path || row.document_id, row])).values()];
    const emailProfile = selectUnambiguousProfile(exact);
    if (emailProfile) return emailProfile;
  }
  return null;
}

function canPublicRead(action: string, path = "", constraints: Record<string, any>[] = []) {
  if (action === "getDoc" && path === "appUpdates/latest") return true;
  if (action === "getDocs" && path === "users") {
    const studentRole = constraints.some((item) => (
      item.type === "where" && item.field === "role" && item.operator === "==" && item.value === "student"
    ));
    const allowedIdentityFields = new Set([
      "studentId", "email", "authEmail", "parentEmail", "fatherEmail", "motherEmail", "guardianEmail"
    ]);
    const identityLookup = constraints.some((item) => (
      item.type === "where" && item.operator === "==" && allowedIdentityFields.has(cleanText(item.field)) && cleanText(item.value)
    ));
    const bounded = constraints.some((item) => item.type === "limit" && Number(item.count) > 0 && Number(item.count) <= 5);
    return studentRole && identityLookup && bounded;
  }
  return false;
}

function hasOwnProfileLookup(user: { uid: string; email: string }, path: string, constraints: Record<string, any>[] = []) {
  if (path !== "users") return false;
  return constraints.some((item) => {
    if (item.type !== "where" || item.operator !== "==") return false;
    const field = cleanText(item.field);
    const value = cleanText(item.value).toLowerCase();
    return (
      (["email", "authEmail"].includes(field) && value === user.email)
      || (["uid", "authUid"].includes(field) && value === user.uid)
    );
  });
}

async function ensureAllowed(user: { uid: string; email: string; firebaseUid?: string } | null, action: string, path: string, constraints: Record<string, any>[] = []) {
  if (canPublicRead(action, path, constraints)) return;
  if (!user) throw new Error("Login required");
  if (user.email === SUPER_ADMIN_EMAIL) return;
  const profile = await resolveProfileForAuthUser(user);
  if (!profile) {
    if (user.firebaseUid && action === "getDoc" && path === `users/${user.firebaseUid}`) return;
    if (action === "getDocs" && hasOwnProfileLookup(user, path, constraints)) return;
    if (path === `users/${user.uid}`) return;
    if (action === "setDoc" && (path === `schools/${user.uid}` || path.startsWith(`schools/${user.uid}/`))) return;
    throw new Error("User profile missing");
  }
  if (profile.superAdmin === true || String(profile.role || "").toLowerCase() === "superadmin") return;
  const schoolId = schoolIdFromPath(path);
  if (!schoolId) {
    if (path === `users/${user.uid}` || path === "users") return;
    return;
  }
  const profileSchoolId = canonicalSchoolId(profile);
  const allowedIds = new Set([
    user.uid,
    user.firebaseUid,
    profileSchoolId,
  ].map(cleanText).filter(Boolean));
  if (!allowedIds.has(schoolId)) throw new Error("You do not have permission for this school");
}

function rowFor(path: string, data: Record<string, unknown>) {
  const parent = parentPath(path);
  return {
    path,
    path_depth: path.split("/").length,
    collection_name: collectionNameFromPath(parent),
    document_id: docIdFromPath(path),
    school_id: schoolIdFromPath(path) || cleanText(data.schoolId || data.adminId || data.adminUID || data.adminUid) || null,
    data,
    updated_at: new Date().toISOString(),
  };
}

async function getDoc(path: string) {
  const rows = await rest(`firestore_documents?path=eq.${encodeURIComponent(path)}&select=*`);
  return rows?.[0] || null;
}

async function getDocs(path: string, constraints: Record<string, any>[] = []) {
  const depth = path.split("/").length + 1;
  const rows = await rest(
    `firestore_documents?path=like.${encodeURIComponent(`${path}/%`)}&path_depth=eq.${depth}&select=*`,
  );
  return applyQuery(rows || [], constraints);
}

async function upsertDoc(path: string, data: Record<string, unknown>) {
  const rows = await rest("firestore_documents?on_conflict=path", {
    method: "POST",
    body: JSON.stringify(rowFor(path, data)),
  });
  return rows?.[0] || null;
}

async function deleteDoc(path: string) {
  await rest(`firestore_documents?path=eq.${encodeURIComponent(path)}`, { method: "DELETE" });
  return true;
}

async function createAuthUser(email: string, password: string, metadata: Record<string, unknown>) {
  const normalizedEmail = cleanText(email).toLowerCase();
  const existing = await fetch(`${SUPABASE_URL}/auth/v1/admin/users?per_page=1000`, {
    headers: headers(),
  }).then((response) => response.json());
  const users = Array.isArray(existing?.users) ? existing.users : [];
  const found = users.find((item: Record<string, unknown>) => cleanText(item.email).toLowerCase() === normalizedEmail);
  if (found?.id) return { uid: String(found.id), email: normalizedEmail, alreadyExists: true };
  const response = await fetch(`${SUPABASE_URL}/auth/v1/admin/users`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({
      email: normalizedEmail,
      password,
      email_confirm: true,
      user_metadata: metadata || {},
    }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.id) throw new Error(data.message || data.msg || "Unable to create login account");
  return { uid: String(data.id), email: normalizedEmail, alreadyExists: false };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { status: 200, headers: corsHeaders });
  if (req.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405);
  try {
    const user = await authUser(req);
    const payload = await req.json();
    const action = cleanText(payload.action);
    const path = cleanText(payload.path);
    const constraints = Array.isArray(payload.constraints) ? payload.constraints : [];

    await ensureAllowed(user, action, path, constraints);

    if (action === "getDoc") return jsonResponse({ row: await getDoc(path) });
    if (action === "getDocs") return jsonResponse({ rows: await getDocs(path, constraints) });
    if (action === "setDoc") return jsonResponse({ row: await upsertDoc(path, payload.data || {}) });
    if (action === "deleteDoc") return jsonResponse({ success: await deleteDoc(path) });
    if (action === "createAuthUser") {
      if (!user) throw new Error("Login required");
      const profile = await resolveProfileForAuthUser(user);
      const role = cleanText(profile?.role).toLowerCase();
      if (user.email !== SUPER_ADMIN_EMAIL && role !== "admin" && profile?.superAdmin !== true) {
        throw new Error("Only admins can create login accounts");
      }
      return jsonResponse({ user: await createAuthUser(payload.email, payload.password, payload.metadata || {}) });
    }
    return jsonResponse({ error: "Unknown action" }, 400);
  } catch (error) {
    console.error("schoolix-firestore error", error);
    const message = error instanceof Error ? error.message : "Request failed";
    const status = /login|session/i.test(message) ? 401 : /permission|Only admins/i.test(message) ? 403 : 500;
    return jsonResponse({ error: message }, status);
  }
});
