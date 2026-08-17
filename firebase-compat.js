import { SUPABASE_ANON_KEY, SUPABASE_URL } from "./supabase-config.js";

const FIRESTORE_FUNCTION_URL = `${SUPABASE_URL}/functions/v1/schoolix-firestore`;
const LEGACY_LOGIN_FUNCTION_URL = `${SUPABASE_URL}/functions/v1/legacy-firebase-login`;
const AUTH_STORAGE_KEY = `sb-${new URL(SUPABASE_URL).hostname.split(".")[0]}-auth-token`;
const apps = [];
const authListeners = new Set();
const firebaseUserMappingPromises = new Map();
const rpcReadCache = new Map();
const rpcReadInFlight = new Map();
let rpcReadGeneration = 0;
const RPC_READ_CACHE_MS = 15000;
const client = { auth: createLocalSupabaseAuth() };

const DELETE_FIELD = Symbol("deleteField");

function decodeJwtPayload(token = "") {
  try {
    const payload = token.split(".")[1] || "";
    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized.padEnd(normalized.length + (4 - normalized.length % 4) % 4, "=");
    return JSON.parse(atob(padded));
  } catch {
    return {};
  }
}

function authHeaders(token = SUPABASE_ANON_KEY) {
  return {
    "Content-Type": "application/json",
    "apikey": SUPABASE_ANON_KEY,
    "Authorization": `Bearer ${token || SUPABASE_ANON_KEY}`,
  };
}

function readStoredSession() {
  try {
    return JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY) || "null");
  } catch {
    return null;
  }
}

function writeStoredSession(session) {
  try {
    if (session) localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
    else localStorage.removeItem(AUTH_STORAGE_KEY);
  } catch {}
}

function normalizeAuthSession(data = {}) {
  if (!data?.access_token) return null;
  const expiresAt = data.expires_at || (data.expires_in ? Math.floor(Date.now() / 1000) + Number(data.expires_in) : undefined);
  return {
    access_token: data.access_token,
    refresh_token: data.refresh_token || readStoredSession()?.refresh_token || "",
    expires_at: expiresAt,
    expires_in: data.expires_in,
    token_type: data.token_type || "bearer",
    user: data.user || null,
  };
}

function withTimeout(promise, ms, fallback, label = "Async operation") {
  let timeoutId;
  const timeout = new Promise((resolve) => {
    timeoutId = setTimeout(() => {
      console.warn(`${label} timed out.`);
      resolve(fallback);
    }, ms);
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timeoutId));
}

async function authFetch(path, body, token = SUPABASE_ANON_KEY) {
  const response = await fetch(`${SUPABASE_URL}/auth/v1/${path}`, {
    method: "POST",
    headers: authHeaders(token),
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data.error_description || data.msg || data.message || data.error || "Authentication failed");
    error.code = data.error_code || data.error || "auth/error";
    throw error;
  }
  return data;
}

function notifyAuthListeners(event, session) {
  authListeners.forEach((callback) => {
    try { callback(event, session); } catch (error) { console.warn("Auth listener failed:", error); }
  });
}

async function refreshStoredSession(session = readStoredSession()) {
  if (!session?.refresh_token) return null;
  const data = await authFetch("token?grant_type=refresh_token", { refresh_token: session.refresh_token });
  const next = normalizeAuthSession(data);
  writeStoredSession(next);
  return next;
}

async function getUsableSession() {
  let session = readStoredSession();
  if (!session?.access_token) return null;
  const exp = Number(session.expires_at || decodeJwtPayload(session.access_token).exp || 0);
  if (exp && exp - Math.floor(Date.now() / 1000) < 60) {
    try {
      session = await refreshStoredSession(session);
    } catch (error) {
      console.warn("Supabase session refresh failed:", error);
      writeStoredSession(null);
      return null;
    }
  }
  return session;
}

function createLocalSupabaseAuth() {
  return {
    async signInWithPassword({ email, password }) {
      try {
        const data = await authFetch("token?grant_type=password", { email, password });
        const session = normalizeAuthSession(data);
        writeStoredSession(session);
        notifyAuthListeners("SIGNED_IN", session);
        return { data: { session, user: session.user }, error: null };
      } catch (error) {
        return { data: { session: null, user: null }, error };
      }
    },
    async signUp({ email, password }) {
      try {
        const data = await authFetch("signup", { email, password });
        const session = normalizeAuthSession(data);
        if (session) writeStoredSession(session);
        if (session) notifyAuthListeners("SIGNED_IN", session);
        return { data: { session, user: data.user || session?.user || null }, error: null };
      } catch (error) {
        return { data: { session: null, user: null }, error };
      }
    },
    async signInWithIdToken({ provider, token }) {
      try {
        const data = await authFetch("token?grant_type=id_token", { provider, id_token: token });
        const session = normalizeAuthSession(data);
        writeStoredSession(session);
        notifyAuthListeners("SIGNED_IN", session);
        return { data: { session, user: session.user }, error: null };
      } catch (error) {
        return { data: { session: null, user: null }, error };
      }
    },
    async signInWithOAuth() {
      return { data: {}, error: new Error("Google popup login is unavailable in this build. Use email login or native Google login.") };
    },
    async resetPasswordForEmail(email) {
      try {
        await authFetch("recover", { email });
        return { data: {}, error: null };
      } catch (error) {
        return { data: null, error };
      }
    },
    async getSession() {
      const session = await getUsableSession();
      return { data: { session }, error: null };
    },
    async getUser() {
      try {
        const session = await getUsableSession();
        if (!session?.access_token) return { data: { user: null }, error: null };
        const response = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
          headers: authHeaders(session.access_token),
        });
        const user = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(user.message || user.msg || "Unable to restore session");
        const next = { ...session, user };
        writeStoredSession(next);
        return { data: { user }, error: null };
      } catch (error) {
        return { data: { user: null }, error };
      }
    },
    async signOut() {
      const session = readStoredSession();
      writeStoredSession(null);
      if (session?.access_token) {
        fetch(`${SUPABASE_URL}/auth/v1/logout`, {
          method: "POST",
          headers: authHeaders(session.access_token),
        }).catch(() => {});
      }
      notifyAuthListeners("SIGNED_OUT", null);
      return { error: null };
    },
    onAuthStateChange(callback) {
      authListeners.add(callback);
      getUsableSession().then((session) => callback(session ? "INITIAL_SESSION" : "SIGNED_OUT", session));
      return {
        data: {
          subscription: {
            unsubscribe() { authListeners.delete(callback); },
          },
        },
      };
    },
  };
}

function uuid() {
  return globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function clone(value) {
  if (value == null || typeof value !== "object") return value;
  if (value instanceof Date) return value.toISOString();
  if (Array.isArray(value)) return value.map(clone);
  if (value.__op === "serverTimestamp") return new Date().toISOString();
  if (value.__op) return value;
  return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, clone(item)]));
}

function getPath(parts) {
  return parts.filter((part) => part !== undefined && part !== null && part !== "").map(String).join("/");
}

function getByPath(source, field) {
  return String(field).split(".").reduce((value, key) => value?.[key], source);
}

function deepEqual(left, right) {
  return JSON.stringify(left) === JSON.stringify(right);
}

function setByPath(target, field, value) {
  const keys = String(field).split(".");
  let cursor = target;
  keys.slice(0, -1).forEach((key) => {
    if (!cursor[key] || typeof cursor[key] !== "object") cursor[key] = {};
    cursor = cursor[key];
  });
  const last = keys.at(-1);
  if (value === DELETE_FIELD) delete cursor[last];
  else cursor[last] = value;
}

function applySpecialValue(existing, value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return clone(value);
  if (value.__op === "serverTimestamp") return new Date().toISOString();
  if (value.__op === "arrayUnion") {
    const current = Array.isArray(existing) ? existing.slice() : [];
    value.values.forEach((item) => {
      if (!current.some((stored) => deepEqual(stored, item))) current.push(clone(item));
    });
    return current;
  }
  if (value.__op === "arrayRemove") {
    const removeValues = value.values.map(clone);
    return (Array.isArray(existing) ? existing : []).filter((item) => !removeValues.some((candidate) => deepEqual(candidate, item)));
  }
  if (value.__op === "increment") return Number(existing || 0) + Number(value.amount || 0);
  if (value.__op === "deleteField") return DELETE_FIELD;
  return clone(value);
}

function mergeData(existing, patch, merge = false) {
  const next = merge ? { ...(existing || {}) } : {};
  Object.entries(patch || {}).forEach(([key, value]) => {
    setByPath(next, key, applySpecialValue(getByPath(next, key), value));
  });
  return next;
}

function schoolIdFromPath(path) {
  const parts = path.split("/");
  return parts[0] === "schools" ? parts[1] || null : null;
}

function collectionNameFromPath(path) {
  const parts = path.split("/");
  return parts.length === 1 ? parts[0] : parts.at(-1);
}

function docIdFromPath(path) {
  return path.split("/").at(-1);
}

async function currentSupabaseUser() {
  try {
    const { data: sessionData } = await withTimeout(client.auth.getSession(), 5000, { data: { session: null } }, "Supabase session restore");
    if (sessionData?.session?.user) return sessionData.session.user;
  } catch (error) {
    console.warn("Supabase session restore failed:", error);
  }
  try {
    const { data } = await withTimeout(client.auth.getUser(), 5000, { data: { user: null } }, "Supabase user restore");
    return data.user || null;
  } catch (error) {
    console.warn("Supabase user restore failed:", error);
    return null;
  }
}

async function authToken() {
  const { data } = await withTimeout(client.auth.getSession(), 5000, { data: { session: null } }, "Supabase token restore");
  return data.session?.access_token || SUPABASE_ANON_KEY;
}

async function executeFirestoreRpc(payload) {
  const token = await authToken();
  const response = await fetch(FIRESTORE_FUNCTION_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": SUPABASE_ANON_KEY,
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data.error || "Database request failed");
    error.code = response.status === 403 ? "permission-denied" : response.status === 404 ? "not-found" : "unknown";
    throw error;
  }
  return data;
}

async function firestoreRpc(payload) {
  const isRead = payload?.action === "getDoc" || payload?.action === "getDocs";
  if (!isRead) {
    rpcReadGeneration += 1;
    rpcReadCache.clear();
    rpcReadInFlight.clear();
    return executeFirestoreRpc(payload);
  }

  const key = JSON.stringify(payload);
  const cached = rpcReadCache.get(key);
  if (cached && Date.now() - cached.savedAt < RPC_READ_CACHE_MS) return clone(cached.data);
  if (rpcReadInFlight.has(key)) return clone(await rpcReadInFlight.get(key));

  const generation = rpcReadGeneration;
  let request;
  request = executeFirestoreRpc(payload)
    .then((data) => {
      if (generation === rpcReadGeneration) {
        rpcReadCache.set(key, { savedAt: Date.now(), data: clone(data) });
      }
      return data;
    })
    .finally(() => {
      if (rpcReadInFlight.get(key) === request) rpcReadInFlight.delete(key);
    });
  rpcReadInFlight.set(key, request);
  return clone(await request);
}

function makeFirebaseUser(user, mappedUid = "") {
  if (!user) return null;
  return {
    uid: mappedUid || user.id,
    supabaseUid: user.id,
    email: user.email,
    displayName: user.user_metadata?.full_name || user.user_metadata?.name || user.email || "",
    photoURL: user.user_metadata?.avatar_url || null,
    getIdToken: async (forceRefresh = false) => {
      let session = null;
      if (forceRefresh) {
        try {
          session = await refreshStoredSession(readStoredSession());
        } catch (error) {
          console.warn("Supabase token refresh failed, reusing current session if valid:", error);
        }
      }
      if (!session) session = await getUsableSession();
      return session?.access_token || "";
    },
  };
}

async function resolveFirebaseUser(user) {
  if (!user) return null;
  // Supabase user_metadata is editable by the account holder. Only app_metadata
  // is a trusted legacy-UID bridge; older accounts without it are recovered by
  // their auth UUID or an unambiguous profile lookup below.
  const metadataUid = user.app_metadata?.firebaseUid || user.app_metadata?.legacyUid || "";
  const normalizedEmail = String(user.email || "").toLowerCase();

  let mappedUid = "";
  if (metadataUid) {
    try {
      const metadataMappedUid = String(metadataUid).trim();
      const directLegacy = await firestoreRpc({ action: "getDoc", path: `users/${metadataMappedUid}` });
      if (directLegacy.row?.data) mappedUid = metadataMappedUid;
    } catch {}
  }
  if (!mappedUid) {
    try {
      const direct = await firestoreRpc({ action: "getDoc", path: `users/${user.id}` });
      if (direct.row?.data) mappedUid = user.id;
    } catch {}
  }

  if (!mappedUid && user.email) {
    try {
      const rows = [];
      for (const field of ["email", "authEmail"]) {
        const byEmail = await firestoreRpc({
          action: "getDocs",
          path: "users",
          constraints: [{ type: "where", field, operator: "==", value: normalizedEmail }],
        });
        rows.push(...(byEmail.rows || []));
      }
      const scoredRows = rows
        .filter((item) => [item?.data?.email, item?.data?.authEmail]
          .some((value) => String(value || "").toLowerCase() === normalizedEmail))
        .filter((item, index, list) => list.findIndex((candidate) => candidate.path === item.path) === index)
        .map((item) => {
          const data = item.data || {};
          const authIds = [item.document_id, data.authUid, data.uid, data.legacyUid, data.firebaseUid]
            .map((value) => String(value || "").trim());
          const score = (authIds.includes(user.id) ? 120 : 0)
            + (metadataUid && authIds.includes(String(metadataUid)) ? 100 : 0)
            + (data.studentId && item.document_id === String(data.studentId) ? 30 : 0)
            + (data.schoolId || data.adminId ? 20 : 0)
            + (data.role ? 10 : 0);
          return { item, score };
        })
        .sort((a, b) => b.score - a.score);
      const identityKeys = new Set(scoredRows.map(({ item }) => {
        const data = item.data || {};
        return [data.schoolId || data.adminId || "", data.studentId || data.teacherId || "", data.role || ""]
          .map((value) => String(value || "").trim().toLowerCase())
          .join("|");
      }).filter((value) => value !== "||"));
      const row = scoredRows[0]?.score >= 100 || scoredRows.length === 1 || identityKeys.size === 1
        ? scoredRows[0]?.item
        : null;
      if (row?.document_id) {
        mappedUid = row.document_id;
      }
    } catch {}
  }

  return makeFirebaseUser(user, mappedUid);
}

function toFirebaseUser(user) {
  if (!user) return Promise.resolve(null);
  const key = String(user.id || user.email || "anonymous");
  if (!firebaseUserMappingPromises.has(key)) {
    firebaseUserMappingPromises.set(key, resolveFirebaseUser(user));
  }
  return firebaseUserMappingPromises.get(key);
}

function makeSnapshot(row, ref) {
  const data = row?.data || null;
  return {
    id: ref?.id || row?.document_id || docIdFromPath(row?.path || ""),
    ref,
    exists: () => !!row,
    data: () => (data ? clone(data) : undefined),
  };
}

function makeQuerySnapshot(rows, ref) {
  const docs = rows.map((row) => makeSnapshot(row, doc({ __type: "db" }, ...row.path.split("/"))));
  return {
    docs,
    size: docs.length,
    empty: docs.length === 0,
    forEach(callback) {
      docs.forEach(callback);
    },
  };
}

async function fetchRowsForCollection(path) {
  const data = await firestoreRpc({ action: "getDocs", path, constraints: [] });
  return data.rows || [];
}

function matchesWhere(row, constraint) {
  const actual = getByPath(row.data || {}, constraint.field);
  switch (constraint.operator) {
    case "==": return actual === constraint.value;
    case "!=": return actual !== constraint.value;
    case ">": return actual > constraint.value;
    case ">=": return actual >= constraint.value;
    case "<": return actual < constraint.value;
    case "<=": return actual <= constraint.value;
    case "array-contains": return Array.isArray(actual) && actual.some((item) => deepEqual(item, constraint.value));
    case "in": return Array.isArray(constraint.value) && constraint.value.includes(actual);
    case "array-contains-any": return Array.isArray(actual) && Array.isArray(constraint.value) && actual.some((item) => constraint.value.includes(item));
    default: return true;
  }
}

function applyQuery(rows, constraints) {
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
  const limitConstraint = constraints.find((item) => item.type === "limit");
  if (limitConstraint) next = next.slice(0, limitConstraint.count);
  return next;
}

export function initializeApp(config = {}, name = "[DEFAULT]") {
  const app = { name, options: config };
  apps.push(app);
  return app;
}

export function getApps() {
  return apps;
}

export function getApp() {
  return apps[0] || initializeApp();
}

export function getAuth() {
  return {
    supabase: client,
    get currentUser() {
      return authState.user;
    },
  };
}

export function getFirestore() {
  return { __type: "db", supabase: client };
}

export const authState = { user: null };

export function onAuthStateChanged(_auth, callback) {
  let active = true;
  let lastSignature = "";
  const emit = async (rawUser) => {
    const mappedUser = await toFirebaseUser(rawUser);
    const signature = mappedUser ? `${mappedUser.uid}|${mappedUser.email || ""}` : "signed-out";
    if (!active || signature === lastSignature) return;
    lastSignature = signature;
    authState.user = mappedUser;
    callback(mappedUser);
  };
  currentSupabaseUser()
    .then(emit)
    .catch((error) => {
      console.warn("Auth state restore failed:", error);
      emit(null);
    });
  const { data } = client.auth.onAuthStateChange(async (_event, session) => {
    await emit(session?.user || null);
  });
  return () => {
    active = false;
    data.subscription.unsubscribe();
  };
}

export async function signOut() {
  const { error } = await client.auth.signOut();
  if (error) throw error;
  firebaseUserMappingPromises.clear();
  rpcReadCache.clear();
}

export async function signInWithEmailAndPassword(_auth, email, password) {
  firebaseUserMappingPromises.clear();
  rpcReadCache.clear();
  let { data, error } = await client.auth.signInWithPassword({ email, password });
  if (error) {
    const legacyResponse = await fetch(LEGACY_LOGIN_FUNCTION_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({ email, password }),
    });
    const legacyData = await legacyResponse.json().catch(() => ({}));
    if (!legacyResponse.ok || !legacyData.success) {
      const loginError = new Error(legacyData.error || error.message || "Invalid login credentials");
      loginError.code = error.code || "auth/invalid-credential";
      throw loginError;
    }
    ({ data, error } = await client.auth.signInWithPassword({ email, password }));
    if (error) throw error;
  }
  authState.user = await toFirebaseUser(data.user);
  return { user: authState.user };
}

export class GoogleAuthProvider {
  setCustomParameters(parameters = {}) {
    this.customParameters = parameters;
  }

  static credential(idToken) {
    return { provider: "google", idToken };
  }
}

export async function signInWithCredential(_auth, credential) {
  firebaseUserMappingPromises.clear();
  rpcReadCache.clear();
  const { data, error } = await client.auth.signInWithIdToken({
    provider: credential?.provider || "google",
    token: credential?.idToken,
  });
  if (error) throw error;
  authState.user = await toFirebaseUser(data.user);
  return { user: authState.user };
}

export async function signInWithPopup() {
  const { data, error } = await client.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: globalThis.location.href },
  });
  if (error) throw error;
  return { user: authState.user, data };
}

export async function signInWithRedirect(auth, provider) {
  return signInWithPopup(auth, provider);
}

export async function getRedirectResult() {
  const user = await currentSupabaseUser();
  authState.user = await toFirebaseUser(user);
  return user ? { user: authState.user } : null;
}

export async function createUserWithEmailAndPassword(_auth, email, password) {
  const current = await client.auth.getSession();
  if (current.data?.session) {
    const data = await firestoreRpc({
      action: "createAuthUser",
      email,
      password,
      metadata: { createdFrom: "schoolix-admin" },
    });
    return {
      user: {
        uid: data.user.uid,
        email: data.user.email,
        displayName: "",
        photoURL: null,
        getIdToken: async () => "",
      },
    };
  }
  const { data, error } = await client.auth.signUp({ email, password });
  if (error) throw error;
  const user = await toFirebaseUser(data.user);
  return { user };
}

export async function sendPasswordResetEmail(_auth, email) {
  const { error } = await client.auth.resetPasswordForEmail(email);
  if (error) throw error;
}

export function collection(_dbOrRef, ...segments) {
  const base = _dbOrRef?.path ? [_dbOrRef.path] : [];
  const path = getPath([...base, ...segments]);
  return { type: "collection", path, id: path.split("/").at(-1), constraints: [] };
}

export function doc(_dbOrRef, ...segments) {
  if (_dbOrRef?.type === "collection" && segments.length === 0) segments = [uuid()];
  const base = _dbOrRef?.path ? [_dbOrRef.path] : [];
  const path = getPath([...base, ...segments]);
  return { type: "doc", path, id: docIdFromPath(path), parent: collection(null, ...path.split("/").slice(0, -1)) };
}

export function query(ref, ...constraints) {
  return { ...ref, constraints: [...(ref.constraints || []), ...constraints] };
}

export function where(field, operator, value) {
  return { type: "where", field, operator, value };
}

export function orderBy(field, direction = "asc") {
  return { type: "orderBy", field, direction };
}

export function limit(count) {
  return { type: "limit", count };
}

export function serverTimestamp() {
  return { __op: "serverTimestamp" };
}

export function arrayUnion(...values) {
  return { __op: "arrayUnion", values };
}

export function arrayRemove(...values) {
  return { __op: "arrayRemove", values };
}

export function increment(amount) {
  return { __op: "increment", amount };
}

export function deleteField() {
  return { __op: "deleteField" };
}

export async function getDoc(ref) {
  const data = await firestoreRpc({ action: "getDoc", path: ref.path });
  return makeSnapshot(data.row, ref);
}

export async function getDocs(ref) {
  const data = await firestoreRpc({ action: "getDocs", path: ref.path, constraints: ref.constraints || [] });
  const rows = data.rows || [];
  return makeQuerySnapshot(rows, ref);
}

export function clearFirestoreReadCache() {
  rpcReadGeneration += 1;
  rpcReadCache.clear();
  rpcReadInFlight.clear();
}

export async function setDoc(ref, payload, options = {}) {
  const existing = options.merge ? (await getDoc(ref)).data() || {} : {};
  const data = mergeData(existing, payload, !!options.merge);
  const now = new Date().toISOString();
  const row = {
    path: ref.path,
    path_depth: ref.path.split("/").length,
    document_id: ref.id,
    collection_name: collectionNameFromPath(ref.parent.path),
    school_id: schoolIdFromPath(ref.path) || data.schoolId || data.adminId || data.adminUID || data.adminUid || null,
    data,
    updated_at: now,
  };
  await firestoreRpc({ action: "setDoc", path: ref.path, data: row.data });
  return ref;
}

export async function addDoc(ref, payload) {
  const docRef = doc(ref);
  await setDoc(docRef, payload);
  return docRef;
}

export async function updateDoc(ref, payload) {
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    const error = new Error(`Document does not exist: ${ref.path}`);
    error.code = "not-found";
    throw error;
  }
  return setDoc(ref, payload, { merge: true });
}

export async function deleteDoc(ref) {
  await firestoreRpc({ action: "deleteDoc", path: ref.path });
}

export function onSnapshot(ref, callback, errorCallback = console.error) {
  let active = true;
  let last = "";
  const load = async () => {
    try {
      const snap = ref.type === "doc" ? await getDoc(ref) : await getDocs(ref);
      const key = JSON.stringify(ref.type === "doc" ? snap.data() : snap.docs.map((item) => [item.id, item.data()]));
      if (key !== last && active) {
        last = key;
        callback(snap);
      }
    } catch (error) {
      if (active) errorCallback(error);
    }
  };
  load();
  const timer = setInterval(load, 2500);
  return () => {
    active = false;
    clearInterval(timer);
  };
}

export const Timestamp = {
  now: () => new Date(),
  fromDate: (date) => date,
};
