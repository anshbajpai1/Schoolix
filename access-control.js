import { initializeApp, getApps } from "./firebase-compat.js?v=accountant-guard-20260806-2";
import { getAuth, onAuthStateChanged, signOut } from "./firebase-compat.js?v=accountant-guard-20260806-2";
import { getFirestore, doc, getDoc, setDoc, collection, getDocs, query, where, limit } from "./firebase-compat.js?v=accountant-guard-20260806-3";

const firebaseConfig = {
  apiKey: "AIzaSyAomGwef93HFT9Xyx7SVW95FPw_IcIAICE",
  authDomain: "schoolix-48107.firebaseapp.com",
  projectId: "schoolix-48107"
};
const NOTIFICATION_SEND_URL = "https://ezkmeedcqetztkeppxil.supabase.co/functions/v1/send-app-notification";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6a21lZWRjcWV0enRrZXBweGlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxMjk5NjAsImV4cCI6MjA5MzcwNTk2MH0.1davJ_NYkFhHToUtcFBR0kA6dk0-cOkaIbK2SCObkQg";

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const SELF_MANAGED_SESSION_PAGES = new Set([
  "student-dashboard.html",
  "student-notices.html",
  "teacher-dashboard.html",
  "teacher-notices.html",
  "driver-dashboard.html"
]);

const FEATURE_BY_PAGE = {
  "admin-dashboard.html": "dashboard",
  "students.html": "students",
  "passed-out-students.html": "students",
  "add-student.html": "students",
  "teachers.html": "teachers",
  "staff-management.html": "teachers",
  "fees-report.html": "payroll",
  "accountant-dashboard.html": "payroll",
  "accountant-qr-checkin.html": "payroll",
  "accountant-attendance.html": "payroll",
  "accountant-salary.html": "payroll",
  "accountant-management.html": "payroll",
  "school-accounts.html": "payroll",
  "library-dashboard.html": "library",
  "library-management.html": "library",
  "notifications.html": "announcements",
  "notices.html": "announcements",
  "student-notices.html": "announcements",
  "teacher-notices.html": "announcements",
  "librarian-notices.html": "announcements",
  "accountant-notices.html": "announcements",
  "reports.html": "reports",
  "reportcards.html": "reports",
  "generate-tc.html": "reports",
  "admin-timetable.html": "timetable",
  "vehicle-management.html": "transport",
  "additional-settings.html": "settings"
};

const FEATURE_LABELS = {
  dashboard: "Dashboard",
  teachers: "Teachers",
  students: "Students",
  attendance: "Attendance",
  payroll: "Payroll",
  library: "Library",
  timetable: "Timetable",
  transport: "Transport",
  reports: "Reports",
  announcements: "Announcements",
  settings: "Settings"
};

const CARD_FEATURES = {
  "admin-dashboard.html": {
    "add-student.html": "students",
    "students.html": "students",
    "passed-out-students.html": "students",
    "teachers.html": "teachers",
    "staff-management.html": "teachers",
    "generate-tc.html": "reports",
    "reportcards.html": "reports",
    "admin-timetable.html": "timetable",
    "fees-report.html": "payroll",
    "school-accounts.html": "payroll",
    "library-management.html": "library",
    "vehicle-management.html": "transport",
    "notifications.html": "announcements",
    "notices.html": "announcements",
    "accountant-management.html": "payroll",
    "additional-settings.html": "settings"
  }
};

function currentPage() {
  return location.pathname.split("/").pop() || "index.html";
}

function isNativeApp() {
  return Boolean(window.Capacitor?.isNativePlatform?.());
}

function redirectToLogin(message) {
  const target = `index.html?access_error=${encodeURIComponent(message)}`;
  if (!location.pathname.endsWith("/index.html")) {
    window.location.replace(target);
  }
}

function featureEnabled(adminData, featureKey) {
  if (!featureKey) return true;
  return (adminData.features || {})[featureKey] !== false;
}

function blockReason(adminData, featureKey) {
  if (!adminData || adminData.access === false) {
    return "Your school's platform access has been disabled by the Super Admin. Please contact support.";
  }
  if (!featureEnabled(adminData, featureKey)) {
    const label = FEATURE_LABELS[featureKey] || "This";
    return `${label} access has been disabled for your school by the Super Admin.`;
  }
  return "";
}

function linkedSchoolId(data = {}) {
  return data.schoolId || data.schoolID || data.schoolUid || data.schoolUID || data.schoolDocId || data.schoolDocID ||
    data.adminId || data.adminID || data.adminUid || data.adminUID || data.adminDocId || data.adminDocID || "";
}

async function getAdminDataFor(userId, userData) {
  if (!userData) return null;
  if ((userData.role || "").toLowerCase() === "admin") {
    return { id: userId, ...userData };
  }
  const adminId = linkedSchoolId(userData);
  if (!adminId) return null;
  try {
    const adminSnap = await getDoc(doc(db, "users", adminId));
    return adminSnap.exists() ? { id: adminSnap.id, ...adminSnap.data() } : null;
  } catch (error) {
    console.warn("Unable to load admin access profile", error);
    return null;
  }
}

async function getUserData(userId, user = auth.currentUser) {
  try {
    const snap = await getDoc(doc(db, "users", userId));
    return snap.exists() ? { id: snap.id, ...snap.data() } : null;
  } catch (error) {
    console.warn("Unable to load user access profile", error);
  }
  const uid = String(user?.uid || userId || "").trim();
  const rawEmail = String(user?.email || "").trim();
  const email = rawEmail.toLowerCase();
  const lookups = [];
  if (uid) lookups.push(["authUid", uid], ["uid", uid], ["legacyUid", uid], ["firebaseUid", uid]);
  if (email) lookups.push(["email", email], ["authEmail", email]);
  if (rawEmail && rawEmail !== email) lookups.push(["email", rawEmail], ["authEmail", rawEmail]);
  for (const [field, value] of lookups) {
    try {
      const snap = await getDocs(query(collection(db, "users"), where(field, "==", value), limit(1)));
      if (!snap.empty) return { id: snap.docs[0].id, ...snap.docs[0].data() };
    } catch (error) {
      if (error?.code !== "permission-denied") console.warn(`Access profile ${field} recovery failed:`, error);
    }
  }
  return null;
}

async function guardUser(userId) {
  const page = currentPage();
  const requiredFeature = FEATURE_BY_PAGE[page] || "";
  const userData = await getUserData(userId);
  if (!userData) {
    if (page === "accountant-dashboard.html") return { userData: null, adminData: null };
    redirectToLogin("User profile not found. Please login again.");
    return null;
  }
  const adminData = await getAdminDataFor(userId, userData);
  const role = (userData?.role || "").toLowerCase();
  const accountantWebPages = ["accountant-dashboard.html", "accountant-qr-checkin.html", "accountant-attendance.html", "accountant-salary.html", "fees-report.html", "school-accounts.html", "accountant-management.html", "accountant-notices.html"];
  const accountantNativePages = ["accountant-dashboard.html", "accountant-qr-checkin.html", "accountant-attendance.html", "accountant-notices.html"];

  if (role === "accountant" && isNativeApp() && !accountantNativePages.includes(page)) {
    window.location.replace("accountant-dashboard.html");
    return null;
  }

  if (role === "accountant" && !accountantWebPages.includes(page)) {
    window.location.replace("accountant-dashboard.html");
    return null;
  }

  if (role === "librarian" && !["library-dashboard.html", "library-qr-checkin.html", "librarian-attendance.html", "librarian-notices.html"].includes(page)) {
    window.location.replace("library-dashboard.html");
    return null;
  }

  if (role === "driver" && page !== "driver-dashboard.html") {
    window.location.replace("driver-dashboard.html");
    return null;
  }

  if (page === "accountant-dashboard.html" && !["accountant", "admin"].includes(role)) {
    redirectToLogin("Access denied. Only accountants can open this dashboard.");
    return null;
  }

  if (["accountant-qr-checkin.html", "accountant-attendance.html"].includes(page) && !["accountant", "admin", "superadmin"].includes(role)) {
    redirectToLogin("Access denied. Accountant account required.");
    return null;
  }

  if (["school-accounts.html", "accountant-salary.html", "accountant-management.html", "fees-report.html"].includes(page) && !["accountant", "admin", "superadmin"].includes(role)) {
    redirectToLogin("Access denied. Only administrators and accountants can manage school accounts.");
    return null;
  }

  if (["library-dashboard.html", "library-qr-checkin.html", "librarian-attendance.html"].includes(page) && !["librarian", "admin", "superadmin"].includes(role)) {
    redirectToLogin("Access denied. Librarian account required.");
    return null;
  }

  if (page === "accountant-dashboard.html" && role === "accountant" && !adminData) {
    syncNativeNotificationSchool(linkedSchoolId(userData), role, {
      email: userData?.email || userData?.authEmail || "",
      authUid: userData?.authUid || userId || ""
    });
    return { userData, adminData: null };
  }

  const reason = blockReason(adminData || userData, requiredFeature);

  if (reason) {
    try { if (auth.currentUser) await signOut(auth); } catch {}
    redirectToLogin(reason);
    return null;
  }

  if (page === "admin-dashboard.html") applyDashboardAccess(adminData || userData);
  syncNativeNotificationSchool(
    linkedSchoolId(adminData || {}) || adminData?.id || linkedSchoolId(userData) || userId,
    role,
    {
          studentId: userData?.studentId || userData?.id || "",
          studentDocId: userData?.studentDocId || userData?.id || "",
          email: userData?.email || userData?.authEmail || "",
          authUid: userData?.authUid || userId || ""
    }
  );
  return { userData, adminData };
}

function notificationStudentAliases(context = {}, user = auth.currentUser) {
  const seen = new Set();
  return [
    context?.studentId,
    context?.studentDocId,
    context?.authUid,
    context?.uid,
    user?.uid,
    context?.email,
    context?.authEmail
  ].map((value) => String(value || "").trim()).filter(Boolean).filter((value) => {
    const key = value.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function syncNativeNotificationSchool(schoolId, role = "", context = {}) {
  try {
    if (schoolId) {
      window.SchoolixNotificationContext = {
        ...(window.SchoolixNotificationContext || {}),
        ...context,
        schoolId: String(schoolId),
        role: String(role || context?.role || "").trim()
      };
      window.dispatchEvent(new CustomEvent("schoolix:notification-context-ready", {
        detail: window.SchoolixNotificationContext
      }));
    } else {
      window.SchoolixNotificationContext = {};
      window.dispatchEvent(new CustomEvent("schoolix:notification-context-ready", { detail: {} }));
    }
    const bridge = window.SchoolixNativeNotifications;
    if (!bridge) return;
    const studentAliases = notificationStudentAliases(context);
    const studentId = String(context?.studentId || studentAliases[0] || "").trim();
    const studentAliasPayload = JSON.stringify(studentAliases);
    if (schoolId && ["student", "parent", "teacher", "librarian", "accountant", "driver"].includes(String(role || "").trim().toLowerCase()) && bridge.requestNotificationPermission) {
      bridge.requestNotificationPermission();
    }
    if (schoolId && studentAliases.length && bridge.subscribeToSchoolAudienceForStudentAliases) {
      bridge.subscribeToSchoolAudienceForStudentAliases(String(schoolId), String(role || ""), studentAliasPayload);
    } else if (schoolId && studentId && bridge.subscribeToSchoolAudienceForStudent) {
      bridge.subscribeToSchoolAudienceForStudent(String(schoolId), String(role || ""), studentId);
    } else if (schoolId && bridge.subscribeToSchoolAudience) {
      bridge.subscribeToSchoolAudience(String(schoolId), String(role || ""));
    } else if (schoolId) {
      bridge.subscribeToSchool(String(schoolId));
    }
    else bridge.clearSchool();
    if (schoolId && bridge.requestDeviceToken) bridge.requestDeviceToken();
    if (schoolId && bridge.registerDevice && auth.currentUser) {
      const deviceRole = notificationDeviceRole(role || context?.loginAs);
      if (deviceRole) {
        auth.currentUser.getIdToken().then((idToken) => {
          if (bridge.registerDeviceWithAliases) {
            bridge.registerDeviceWithAliases(
              String(schoolId),
              deviceRole,
              studentId,
              studentAliasPayload,
              String(auth.currentUser?.uid || context?.authUid || ""),
              String(context?.loginAs || ""),
              idToken
            );
          } else {
            bridge.registerDevice(
              String(schoolId),
              deviceRole,
              studentId,
              String(auth.currentUser?.uid || context?.authUid || ""),
              String(context?.loginAs || ""),
              idToken
            );
          }
        }).catch((error) => console.warn("Unable to prepare native phone registration", error));
      }
    }
  } catch (error) {
    console.warn("Unable to sync app notification school", error);
  }
}

window.SchoolixSyncNativeNotifications = function SchoolixSyncNativeNotifications(context = {}) {
  const sessionContext = getStudentNotificationContext();
  const merged = { ...sessionContext, ...context };
  const schoolId = String(merged.schoolId || "").trim();
  const role = String(merged.role || merged.loginAs || "student").trim() || "student";
  syncNativeNotificationSchool(schoolId, role, merged);
};

window.SchoolixNotificationRegistration = {
  pendingToken: "",
  registerToken(token) {
    const normalizedToken = String(token || this.pendingToken || "").trim();
    if (!normalizedToken) return;
    this.pendingToken = normalizedToken;
    return this.receiveToken(normalizedToken);
  },
  async receiveToken(token) {
    const user = auth.currentUser;
    const normalizedToken = String(token || "").trim();
    if (normalizedToken.length < 40) return;
    if (!user) {
      this.pendingToken = normalizedToken;
      return;
    }
    const sessionContext = getStudentNotificationContext();
    const profileContext = await getNotificationProfileContext(user.uid);
    const mergedContext = { ...sessionContext, ...profileContext };
    const schoolId = String(mergedContext.schoolId || "").trim();
    const role = String(mergedContext.role || sessionContext.role || "student").trim();
    const studentId = String(mergedContext.studentId || sessionContext.studentId || "").trim();
    const studentAliases = notificationStudentAliases({ ...sessionContext, ...mergedContext }, user);
    const deviceRole = notificationDeviceRole(role || mergedContext.loginAs);
    if (!schoolId || !deviceRole) {
      this.pendingToken = normalizedToken;
      scheduleNotificationRegistration(1800);
      return;
    }
    const registrationKey = `${user.uid}:${schoolId}:${role}:${studentId}:${normalizedToken.slice(-24)}`;
    const lastRegistered = sessionStorage.getItem("schoolixNotificationRegistration");
    let directRegistration = null;
    let edgeRegistration = null;
    let directError = null;
    let edgeError = null;
    try {
      directRegistration = await saveNotificationDeviceDirectly({
        token: normalizedToken,
        schoolId,
        role: deviceRole,
        studentId,
        studentDocId: mergedContext.studentDocId || sessionContext.studentDocId || "",
        studentAliases,
        uid: user.uid,
        authUid: mergedContext.authUid || user.uid,
        loginAs: mergedContext.loginAs || sessionContext.loginAs || ""
      });
    } catch (error) {
      directError = error;
      console.warn("Direct phone notification registration failed", error);
    }
    try {
      const idToken = await user.getIdToken();
      const response = await fetch(NOTIFICATION_SEND_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": SUPABASE_ANON_KEY,
          "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
          "x-firebase-token": idToken,
        },
        body: JSON.stringify({
          action: "register-device",
          token: normalizedToken,
          schoolId,
          role,
          studentId,
          studentDocId: mergedContext.studentDocId || sessionContext.studentDocId || "",
          studentAliases,
          authUid: mergedContext.authUid || user.uid,
          loginAs: mergedContext.loginAs || sessionContext.loginAs || ""
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.registered) {
        throw new Error(result.error || "Phone notification registration failed");
      }
      edgeRegistration = result;
    } catch (error) {
      edgeError = error;
      console.warn("Notification registration service failed", error);
    }
    try {
      const result = edgeRegistration || directRegistration;
      if (!result) throw edgeError || directError || new Error("Phone notification registration failed");
      if (lastRegistered === registrationKey) {
        window.dispatchEvent(new CustomEvent("schoolix:notifications-ready", { detail: result }));
        return;
      }
      sessionStorage.setItem("schoolixNotificationRegistration", registrationKey);
      this.pendingToken = "";
      window.dispatchEvent(new CustomEvent("schoolix:notifications-ready", { detail: result }));
    } catch (error) {
      this.pendingToken = normalizedToken;
      scheduleNotificationRegistration(5000);
      console.warn("Unable to register this phone for direct notifications", error);
    }
  },
};

function notificationDeviceRole(role) {
  const normalized = String(role || "").trim().toLowerCase();
  if (["teacher", "teachers"].includes(normalized)) return "teachers";
  if (["student", "students", "parent", "parents"].includes(normalized)) return "students";
  if (["librarian", "librarians"].includes(normalized)) return "librarians";
  if (["accountant", "accountants", "accounts"].includes(normalized)) return "accountants";
  if (["driver", "drivers"].includes(normalized)) return "drivers";
  return "";
}

async function notificationDeviceId(token) {
  const bytes = new TextEncoder().encode(token);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function saveNotificationDeviceDirectly(context) {
  const deviceId = await notificationDeviceId(context.token);
  await setDoc(doc(db, "schools", context.schoolId, "notificationDevices", deviceId), {
    schoolId: context.schoolId,
    uid: context.uid,
    role: context.role,
    token: context.token,
    studentId: String(context.studentId || ""),
    studentDocId: String(context.studentDocId || ""),
    studentAliases: Array.isArray(context.studentAliases) ? context.studentAliases.map((value) => String(value || "")) : [],
    authUid: String(context.authUid || context.uid),
    loginAs: String(context.loginAs || ""),
    platform: "android",
    updatedAt: new Date().toISOString()
  }, { merge: true });
  return { success: true, registered: true, deviceId, role: context.role, schoolId: context.schoolId };
}

let notificationRegistrationTimer = 0;
function scheduleNotificationRegistration(delay = 1000) {
  window.clearTimeout(notificationRegistrationTimer);
  notificationRegistrationTimer = window.setTimeout(() => {
    try { window.SchoolixNativeNotifications?.requestDeviceToken?.(); } catch {}
    try { window.SchoolixNotificationRegistration?.registerToken?.(); } catch {}
  }, delay);
}

window.addEventListener("schoolix:notification-context-ready", () => scheduleNotificationRegistration(250));
window.addEventListener("focus", () => scheduleNotificationRegistration(500));

async function getNotificationProfileContext(uid) {
  try {
    const snap = await getDoc(doc(db, "users", uid));
    if (!snap.exists()) return {};
    const data = snap.data() || {};
    return {
      schoolId: String(linkedSchoolId(data)).trim(),
      role: String(data.role || "").trim(),
      studentId: String(data.studentId || "").trim(),
      studentDocId: String(data.studentDocId || "").trim(),
      email: String(data.email || data.authEmail || "").trim(),
      authUid: String(data.authUid || uid || "").trim(),
      loginAs: String(data.loginAs || "").trim()
    };
  } catch (error) {
    console.warn("Unable to resolve notification profile for phone registration", error);
    return {};
  }
}

function getStudentNotificationContext() {
  try {
    const session = JSON.parse(localStorage.getItem("schoolixStudentSession") || "null");
    if (session) {
      return {
        studentId: String(session.studentId || "").trim(),
        studentDocId: String(session.studentDocId || "").trim(),
        email: String(session.email || session.authEmail || "").trim(),
        authUid: String(session.uid || session.authUid || "").trim(),
        schoolId: String(linkedSchoolId(session)).trim(),
        role: String(session.role || "student").trim(),
        loginAs: String(session.loginAs || "").trim()
      };
    }
  } catch {}
  return {};
}

function applyDashboardAccess(adminData) {
  const cardMap = CARD_FEATURES[currentPage()] || {};
  document.querySelectorAll(".dashboard-grid a[href]").forEach((card) => {
    const href = card.getAttribute("href") || "";
    const feature = cardMap[href];
    if (!feature || featureEnabled(adminData, feature)) return;
    card.classList.add("access-disabled");
    card.setAttribute("aria-disabled", "true");
    card.setAttribute("title", `${FEATURE_LABELS[feature]} access is disabled`);
    card.addEventListener("click", (event) => {
      event.preventDefault();
      alert(`${FEATURE_LABELS[feature]} access has been disabled for your school by the Super Admin.`);
    });
  });
}

async function guardStudentSession() {
  let session = null;
  try { session = JSON.parse(localStorage.getItem("schoolixStudentSession") || "null"); } catch {}
  if (!session?.uid && !session?.studentId) {
    syncNativeNotificationSchool("");
    return;
  }
  const userData = await getUserData(session.uid || session.studentId);
  const adminData = await getAdminDataFor(session.uid || session.studentId, userData || session);
  const reason = blockReason(adminData, "");
  if (reason) {
    localStorage.removeItem("schoolixStudentSession");
    redirectToLogin(reason);
    return;
  }
  syncNativeNotificationSchool(
    linkedSchoolId(adminData || {}) || adminData?.id || linkedSchoolId(userData || {}) || linkedSchoolId(session || {}),
    "student",
    {
      studentId: userData?.studentId || session.studentId || "",
      studentDocId: userData?.studentDocId || session.studentDocId || "",
      email: userData?.email || userData?.authEmail || session.email || "",
      authUid: userData?.authUid || session.uid || ""
    }
  );
}

window.addEventListener("schoolix:student-session-ready", (event) => {
  window.SchoolixSyncNativeNotifications?.(event.detail || {});
});

onAuthStateChanged(auth, async (user) => {
  if (SELF_MANAGED_SESSION_PAGES.has(currentPage())) {
    if (user) {
      try { await window.SchoolixNotificationRegistration?.registerToken?.(); } catch (e) { console.warn("Pending phone notification registration failed:", e); }
    } else {
      try { await guardStudentSession(); } catch (e) { console.warn("Student notification session sync failed:", e); }
    }
    return;
  }
  if (user) {
    try { await guardUser(user.uid); } catch (e) { console.error("Access guard failed:", e); }
    try { await window.SchoolixNotificationRegistration?.registerToken?.(); } catch (e) { console.warn("Pending phone notification registration failed:", e); }
    return;
  }
  try { await guardStudentSession(); } catch (e) { console.error("Student access guard failed:", e); }
});
