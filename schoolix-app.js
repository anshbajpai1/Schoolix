const IS_SERVICE_WORKER = typeof self !== "undefined" && self.ServiceWorkerGlobalScope && self instanceof self.ServiceWorkerGlobalScope;
const IS_WINDOW = typeof window !== "undefined" && typeof document !== "undefined";
const APP_CACHE = "schoolix-shell-v27-pull-refresh-20260813";
const APP_CACHE_PREFIX = "schoolix-shell-";
const NETWORK_FIRST_ASSETS = new Set([
  "/index.html",
  "/student-dashboard.html",
  "/vehicle-management.html",
  "/driver-dashboard.html",
  "/schoolix-maplibre.js",
  "/schoolix-transport.js",
  "/teacher-dashboard.html",
  "/firebase-compat.js",
  "/access-control.js",
  "/schoolix-app.js"
]);
const CORE_ASSETS = [
  "/",
  "/index.html",
  "/offline.html",
  "/schoolix-app.css",
  "/schoolix-erp.css",
  "/schoolix-app.js",
  "/schoolix-maplibre.js",
  "/schoolix-transport.js",
  "/firebase-compat.js",
  "/supabase-config.js",
  "/schoolix-polish.css",
  "/schoolix-polish.js",
  "/schoolix-theme.css",
  "/schoolix-app-icon.svg",
  "/school-branding.js",
  "/access-control.js"
];
const PANEL_ASSETS = [
  "/add-student.html",
  "/additional-settings.html",
  "/admin-dashboard.html",
  "/admin-report-cards.html",
  "/admin-signup.html",
  "/admin-timetable.html",
  "/fees-report.html",
  "/students.html",
  "/teachers.html",
  "/teacher-profile.html",
  "/staff-management.html",
  "/reports.html",
  "/reportcards.html",
  "/generate-tc.html",
  "/passed-out-students.html",
  "/school-accounts.html",
  "/vehicle-management.html",
  "/notifications.html",
  "/notices.html",
  "/student-dashboard.html",
  "/driver-dashboard.html",
  "/student-notices.html",
  "/teacher-dashboard.html",
  "/teacher-notices.html",
  "/library-dashboard.html",
  "/library-management.html",
  "/library-qr-checkin.html",
  "/librarian-attendance.html",
  "/librarian-notices.html",
  "/accountant-dashboard.html",
  "/accountant-management.html",
  "/accountant-salary.html",
  "/accountant-qr-checkin.html",
  "/accountant-attendance.html",
  "/accountant-notices.html",
  "/reset-password.html",
  "/admin-shell.css",
  "/admin-shell.js",
  "/accountant-portal.css",
  "/accountant-portal.js",
  "/accounts-ledger.js",
  "/library-portal.css",
  "/library-portal.js",
  "/staff-qr-checkin.js",
  "/notice-board.css",
  "/notice-board.js",
  "/notice-panel.css",
  "/notice-panel.js",
  "/teacher-profile.css",
  "/teacher-profile.js",
  "/teachers-ops.css",
  "/teachers-ops.js",
  "/icons.svg"
];

function iconWifiOff() {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m2 2 20 20"/><path d="M8.5 16.5a5 5 0 0 1 7 0"/><path d="M5 13a10 10 0 0 1 5.24-2.76"/><path d="M14.12 10.36A10 10 0 0 1 19 13"/><path d="M1.42 9a15 15 0 0 1 4.7-2.88"/><path d="M10.66 5.13A15 15 0 0 1 22.58 9"/><path d="M12 20h.01"/></svg>`;
}

function getTopbarTarget() {
  return document.querySelector(".topbar-right") || document.querySelector(".sx-admin-header-actions") || document.querySelector(".header-actions") || document.body;
}

function isNativeApp() {
  return IS_WINDOW && Boolean(window.Capacitor?.isNativePlatform?.());
}

function hasNativeNotificationBridge() {
  return isNativeApp() && Boolean(window.SchoolixNativeNotifications);
}

function isLoginPage() {
  if (!IS_WINDOW) return false;
  const file = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
  return file === "index.html" || file === "";
}

function isAdminWorkspace() {
  if (!IS_WINDOW) return false;
  return Boolean(document.querySelector(".sx-admin-header, .sx-admin-sidebar")
    || document.body?.classList.contains("sx-admin-app"));
}

function removeNotificationBell() {
  document.querySelector(".schoolix-notification-wrap")?.remove();
}

function isAllowedNotificationRole(role = "") {
  const normalized = String(role || "").trim().toLowerCase();
  return normalized === "student" || normalized === "parent" || normalized === "teacher" || normalized === "librarian" || normalized === "accountant";
}

function nativePrintHtml(title, html) {
  if (!isNativeApp() || !window.SchoolixNativePrint?.printHtml) return false;
  window.SchoolixNativePrint.printHtml(String(title || document.title || "Schoolix"), String(html || ""));
  return true;
}

function applyRuntimeMode() {
  const native = isNativeApp();
  document.documentElement.classList.toggle("is-native-app", native);
  document.body?.classList.toggle("is-native-app", native);
  const apkDownload = document.getElementById("downloadAndroidApp");
  if (apkDownload) apkDownload.hidden = native;
}

function ensureNativePullToRefresh() {
  if (!isNativeApp() || document.getElementById("schoolixPullRefresh")) return;
  const indicator = document.createElement("div");
  indicator.id = "schoolixPullRefresh";
  indicator.className = "schoolix-pull-refresh";
  indicator.setAttribute("role", "status");
  indicator.setAttribute("aria-live", "polite");
  indicator.innerHTML = `<span class="schoolix-pull-refresh-icon" aria-hidden="true"></span><span class="schoolix-pull-refresh-label">Pull to refresh</span>`;
  document.body.appendChild(indicator);

  let startY = 0;
  let distance = 0;
  let pulling = false;
  let refreshing = false;
  const threshold = 72;
  const scrollTop = () => document.scrollingElement?.scrollTop || document.documentElement.scrollTop || document.body.scrollTop || 0;
  const reset = () => {
    indicator.classList.remove("is-pulling", "is-ready", "is-refreshing");
    indicator.style.setProperty("--pull-distance", "0px");
    indicator.querySelector(".schoolix-pull-refresh-label").textContent = "Pull to refresh";
    pulling = false;
    distance = 0;
  };

  document.addEventListener("touchstart", (event) => {
    if (refreshing || event.touches.length !== 1 || scrollTop() > 0) return;
    const target = event.target instanceof Element ? event.target : null;
    if (target?.closest("input, textarea, select, button, a, [contenteditable='true'], [data-no-pull-refresh], .map, .maplibregl-map, canvas")) return;
    startY = event.touches[0].clientY;
    pulling = true;
    distance = 0;
  }, { passive: true });

  document.addEventListener("touchmove", (event) => {
    if (!pulling || refreshing || event.touches.length !== 1 || scrollTop() > 0) return;
    const delta = event.touches[0].clientY - startY;
    if (delta <= 0) return reset();
    distance = Math.min(112, delta * 0.55);
    indicator.classList.add("is-pulling");
    indicator.classList.toggle("is-ready", distance >= threshold * 0.55);
    indicator.style.setProperty("--pull-distance", `${distance}px`);
    indicator.querySelector(".schoolix-pull-refresh-label").textContent = distance >= threshold * 0.55 ? "Release to refresh" : "Pull to refresh";
    event.preventDefault();
  }, { passive: false });

  document.addEventListener("touchend", () => {
    if (!pulling || refreshing) return;
    if (distance >= threshold * 0.55) {
      refreshing = true;
      indicator.classList.remove("is-ready");
      indicator.classList.add("is-refreshing");
      indicator.style.setProperty("--pull-distance", `${threshold}px`);
      indicator.querySelector(".schoolix-pull-refresh-label").textContent = "Refreshing...";
      window.setTimeout(() => window.location.reload(), 180);
      return;
    }
    reset();
  }, { passive: true });
  document.addEventListener("touchcancel", reset, { passive: true });
}

function ensureNetworkChip() {
  const target = getTopbarTarget();
  if (!target || document.getElementById("appNetworkChip")) return;
  const chip = document.createElement("div");
  chip.id = "appNetworkChip";
  chip.className = "app-network-chip";
  chip.innerHTML = `${iconWifiOff()}<span>Offline</span>`;
  target.prepend(chip);
}

function updateNetworkChip() {
  ensureNetworkChip();
  document.getElementById("appNetworkChip")?.classList.toggle("offline", !navigator.onLine);
}

function iconBell() {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/></svg>`;
}

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[char]));
}

const UPDATE_STATE_STORAGE_KEY = "schoolix.availableAppUpdate";
let latestAppUpdateInfo = null;

function iconDownload() {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12"></path><path d="m7 10 5 5 5-5"></path><path d="M5 21h14"></path></svg>`;
}

function nativeInstalledVersionCode() {
  try {
    return Number(window.SchoolixNativeUpdate?.getInstalledVersionCode?.() || 0);
  } catch (_) {
    return 0;
  }
}

function readStoredUpdateInfo() {
  try {
    const stored = JSON.parse(localStorage.getItem(UPDATE_STATE_STORAGE_KEY) || "null");
    return stored && Number(stored.versionCode || 0) > nativeInstalledVersionCode() ? stored : null;
  } catch (_) {
    return null;
  }
}

function storeUpdateInfo(updateInfo) {
  latestAppUpdateInfo = updateInfo || null;
  try {
    if (latestAppUpdateInfo) localStorage.setItem(UPDATE_STATE_STORAGE_KEY, JSON.stringify(latestAppUpdateInfo));
    else localStorage.removeItem(UPDATE_STATE_STORAGE_KEY);
  } catch (_) {}
}

async function fetchAvailableAppUpdate() {
  if (!isNativeApp()) return null;
  try {
    const response = await fetch(`/update.json?t=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) return readStoredUpdateInfo();
    const updateInfo = await response.json();
    return Number(updateInfo.versionCode || 0) > nativeInstalledVersionCode() ? updateInfo : null;
  } catch (_) {
    return readStoredUpdateInfo();
  }
}

function updateButtonLabel(updateInfo = latestAppUpdateInfo) {
  const version = String(updateInfo?.versionName || "").trim();
  return version ? `Update to v${version}` : "Update App";
}

function ensureSidebarUpdateAction() {
  if (!IS_WINDOW) return;
  const updateInfo = latestAppUpdateInfo || readStoredUpdateInfo();
  const show = Boolean(isNativeApp() && updateInfo);
  const footers = document.querySelectorAll(".sx-admin-sidebar-footer, .library-sidebar-footer");
  footers.forEach((footer) => {
    let button = footer.querySelector(".schoolix-sidebar-update-action");
    if (!show) {
      button?.remove();
      return;
    }
    if (!button) {
      button = document.createElement("button");
      button.type = "button";
      button.className = "schoolix-sidebar-update-action";
      button.addEventListener("click", () => {
        try {
          window.SchoolixNativeUpdate?.showUpdatePrompt?.();
        } catch (_) {}
      });
      footer.appendChild(button);
    }
    button.innerHTML = `${iconDownload()}<span>${escapeHtml(updateButtonLabel(updateInfo))}</span>`;
    button.title = updateInfo.forceUpdate ? "Mandatory app update" : "Available app update";
    button.dataset.priority = updateInfo.forceUpdate ? "mandatory" : "optional";
  });
}

async function refreshAppUpdateSidebarAction() {
  if (!isNativeApp()) {
    storeUpdateInfo(null);
    ensureSidebarUpdateAction();
    return;
  }
  const updateInfo = await fetchAvailableAppUpdate();
  storeUpdateInfo(updateInfo);
  ensureSidebarUpdateAction();
}

function scheduleUpdateSidebarRefresh() {
  ensureSidebarUpdateAction();
  window.setTimeout(ensureSidebarUpdateAction, 250);
  window.setTimeout(ensureSidebarUpdateAction, 1000);
  window.setTimeout(ensureSidebarUpdateAction, 2500);
}

if (IS_WINDOW) {
  window.SchoolixAppUpdate = {
    receiveNativeUpdate(payload = {}) {
      const updateInfo = payload?.available ? payload.update : null;
      if (updateInfo && Number(updateInfo.versionCode || 0) > nativeInstalledVersionCode()) {
        storeUpdateInfo(updateInfo);
      } else {
        storeUpdateInfo(null);
      }
      scheduleUpdateSidebarRefresh();
    },
    refresh: refreshAppUpdateSidebarAction
  };
}

function notificationContextFromStudentSession() {
  try {
    const session = JSON.parse(localStorage.getItem("schoolixStudentSession") || "null");
    if (!session) return {};
    return {
      schoolId: String(session.schoolId || session.adminId || session.adminUID || session.adminUid || session.schoolUID || session.schoolUid || "").trim(),
      role: String(session.role || session.loginAs || "student").toLowerCase() || "student",
      studentId: String(session.studentId || "").trim(),
      authUid: String(session.uid || session.authUid || "").trim()
    };
  } catch (_) {
    return {};
  }
}

function audienceMatchesRole(audience = "all", role = "") {
  const normalizedAudience = String(audience || "all").toLowerCase();
  const normalizedRole = String(role || "").toLowerCase();
  if (normalizedAudience === "all" || normalizedAudience === "everyone") return true;
  if (normalizedAudience === "students") return normalizedRole === "student" || normalizedRole === "parent";
  if (normalizedAudience === "teachers") return normalizedRole === "teacher";
  if (normalizedAudience === "librarians") return normalizedRole === "librarian";
  if (normalizedAudience === "accountants") return normalizedRole === "accountant";
  if (normalizedAudience === "admins") return normalizedRole === "admin" || normalizedRole === "superadmin";
  return normalizedAudience === normalizedRole;
}

function recipientRolesMatchUser(recipientRoles = [], role = "") {
  const roles = Array.isArray(recipientRoles) ? recipientRoles : [];
  if (!roles.length) return true;
  const normalizedRole = String(role || "").trim().toLowerCase();
  const userAudience = normalizedRole === "parent" ? "students" : `${normalizedRole}s`;
  return roles.some((item) => {
    const target = String(item || "").trim().toLowerCase();
    return target === "all" || target === normalizedRole || target === userAudience;
  });
}

function notificationMatchesUser(item = {}, context = {}) {
  const targetStudentIds = [
    item.targetStudentId,
    item.studentId,
    item.studentDocId,
    ...(Array.isArray(item.targetStudentIds) ? item.targetStudentIds : [])
  ].map((value) => String(value || "").trim().toLowerCase()).filter(Boolean);
  const contextStudentIds = [
    context.studentId,
    context.studentDocId,
    context.id,
    context.uid
  ].map((value) => String(value || "").trim().toLowerCase()).filter(Boolean);
  const targetAuthUid = String(item.targetAuthUid || item.authUid || "").trim();
  if (targetStudentIds.length && !targetStudentIds.some((id) => contextStudentIds.includes(id))) return false;
  if (targetAuthUid && targetAuthUid !== String(context.authUid || "").trim()) return false;
  return audienceMatchesRole(item.audience, context.role) && recipientRolesMatchUser(item.recipientRoles, context.role);
}

function notificationTimeLabel(value) {
  const date = value?.toDate?.() || new Date(value || 0);
  if (Number.isNaN(date.getTime())) return "Recently";
  return date.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
}

function getReadNotificationIds(schoolId = "") {
  try {
    return new Set(JSON.parse(localStorage.getItem(`schoolix.notificationReads.${schoolId}`) || "[]"));
  } catch (_) {
    return new Set();
  }
}

function storeReadNotificationIds(schoolId = "", ids = []) {
  try {
    localStorage.setItem(`schoolix.notificationReads.${schoolId}`, JSON.stringify(Array.from(new Set(ids)).slice(0, 200)));
  } catch (_) {}
}

function getPostedPhoneNotificationIds(schoolId = "") {
  try {
    return new Set(JSON.parse(localStorage.getItem(`schoolix.phonePosted.${schoolId}`) || "[]"));
  } catch (_) {
    return new Set();
  }
}

function storePostedPhoneNotificationIds(schoolId = "", ids = []) {
  try {
    localStorage.setItem(`schoolix.phonePosted.${schoolId}`, JSON.stringify(Array.from(new Set(ids)).slice(0, 250)));
  } catch (_) {}
}

async function resolveNotificationContext() {
  const sessionContext = window.SchoolixNotificationContext || notificationContextFromStudentSession();
  if (sessionContext.schoolId) return sessionContext;
  try {
    const [{ initializeApp, getApps }, { getAuth }, { getFirestore, doc, getDoc }] = await Promise.all([
      import("./firebase-compat.js"),
      import("./firebase-compat.js"),
      import("./firebase-compat.js")
    ]);
    const firebaseConfig = {
      apiKey: "AIzaSyAomGwef93HFT9Xyx7SVW95FPw_IcIAICE",
      authDomain: "schoolix-48107.firebaseapp.com",
      projectId: "schoolix-48107"
    };
    const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const user = auth.currentUser;
    if (!user) return {};
    const snap = await getDoc(doc(getFirestore(app), "users", user.uid));
    const data = snap.exists() ? snap.data() : {};
    const role = String(data.role || "admin").toLowerCase();
    return {
      schoolId: String(data.schoolId || data.adminId || data.adminUID || data.adminUid || data.schoolUID || data.schoolUid || user.uid || "").trim(),
      role,
      studentId: String(data.studentId || "").trim(),
      authUid: user.uid
    };
  } catch (error) {
    console.warn("Unable to resolve notification context", error);
    return {};
  }
}

async function shouldShowNotificationBell() {
  if (!hasNativeNotificationBridge() || isLoginPage() || isAdminWorkspace()) return false;
  const context = await resolveNotificationContext();
  return Boolean(context.schoolId && isAllowedNotificationRole(context.role));
}

async function ensureNotificationBell() {
  if (!(await shouldShowNotificationBell())) {
    removeNotificationBell();
    return;
  }
  const target = getTopbarTarget();
  if (!target || document.getElementById("schoolixNotificationBell")) return;
  const wrap = document.createElement("div");
  wrap.className = "schoolix-notification-wrap";
  wrap.dataset.nativeNotifications = "true";
  wrap.innerHTML = `
    <button type="button" class="schoolix-notification-bell" id="schoolixNotificationBell" aria-label="Notifications" aria-expanded="false">
      ${iconBell()}<span class="schoolix-notification-count" id="schoolixNotificationCount" hidden>0</span>
    </button>
    <div class="schoolix-notification-panel" id="schoolixNotificationPanel" hidden>
      <div class="schoolix-notification-head">
        <strong>Notifications</strong>
        <button type="button" id="schoolixNotificationRefresh">Refresh</button>
      </div>
      <div class="schoolix-notification-status" id="schoolixNotificationStatus">Checking phone alerts...</div>
      <div class="schoolix-notification-list" id="schoolixNotificationList">
        <div class="schoolix-notification-empty">Loading notifications...</div>
      </div>
    </div>`;
  const networkChip = document.getElementById("appNetworkChip");
  if (networkChip?.parentElement === target) {
    target.insertBefore(wrap, networkChip.nextSibling);
  } else {
    target.prepend(wrap);
  }
  document.getElementById("schoolixNotificationBell")?.addEventListener("click", async (event) => {
    event.stopPropagation();
    const panel = document.getElementById("schoolixNotificationPanel");
    const button = document.getElementById("schoolixNotificationBell");
    const willOpen = panel?.hidden !== false;
    if (panel) panel.hidden = !willOpen;
    button?.setAttribute("aria-expanded", String(willOpen));
    if (willOpen) await loadNotificationInbox(true);
  });
  document.getElementById("schoolixNotificationRefresh")?.addEventListener("click", (event) => {
    event.stopPropagation();
    loadNotificationInbox(true);
  });
  document.addEventListener("click", (event) => {
    if (event.target.closest?.(".schoolix-notification-wrap")) return;
    const panel = document.getElementById("schoolixNotificationPanel");
    const button = document.getElementById("schoolixNotificationBell");
    if (panel) panel.hidden = true;
    button?.setAttribute("aria-expanded", "false");
  });
}

async function loadNotificationInbox(markRead = false) {
  if (!(await shouldShowNotificationBell())) return;
  requestNativeNotificationStatus();
  const list = document.getElementById("schoolixNotificationList");
  if (!list) return;
  const context = await resolveNotificationContext();
  if (!context.schoolId) {
    list.innerHTML = '<div class="schoolix-notification-empty">No notification account found.</div>';
    return;
  }
  try {
    const [{ initializeApp, getApps }, { getFirestore, collection, getDocs, limit, orderBy, query }] = await Promise.all([
      import("./firebase-compat.js"),
      import("./firebase-compat.js")
    ]);
    const firebaseConfig = {
      apiKey: "AIzaSyAomGwef93HFT9Xyx7SVW95FPw_IcIAICE",
      authDomain: "schoolix-48107.firebaseapp.com",
      projectId: "schoolix-48107"
    };
    const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
    const snap = await getDocs(query(
      collection(getFirestore(app), "schools", context.schoolId, "notifications"),
      orderBy("createdAt", "desc"),
      limit(50)
    ));
    const items = snap.docs
      .map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }))
      .filter((item) => notificationMatchesUser(item, context));
    const readIds = getReadNotificationIds(context.schoolId);
    const unread = items.filter((item) => !readIds.has(item.id));
    postUnreadNativeNotifications(context.schoolId, unread);
    const count = document.getElementById("schoolixNotificationCount");
    if (count) {
      count.textContent = String(unread.length);
      count.hidden = unread.length === 0;
    }
    if (markRead) {
      storeReadNotificationIds(context.schoolId, [...readIds, ...items.map((item) => item.id)]);
      if (count) count.hidden = true;
    }
    const displayReadIds = markRead ? new Set(items.map((item) => item.id)) : readIds;
    list.innerHTML = items.length ? items.map((item) => `
      <article class="schoolix-notification-item${displayReadIds.has(item.id) ? "" : " is-unread"}">
        <div class="schoolix-notification-title">${escapeHtml(item.title || "Schoolix")}</div>
        <div class="schoolix-notification-message">${escapeHtml(item.message || "")}</div>
        <div class="schoolix-notification-meta">${notificationTimeLabel(item.createdAt)}</div>
      </article>
    `).join("") : '<div class="schoolix-notification-empty">No notifications yet.</div>';
  } catch (error) {
    console.warn("Unable to load notifications", error);
    list.innerHTML = '<div class="schoolix-notification-empty">Unable to load notifications.</div>';
  }
}

function postUnreadNativeNotifications(schoolId = "", unread = []) {
  if (!isNativeApp() || !schoolId || !window.SchoolixNativeNotifications?.showLocalNotification) return;
  const postedIds = getPostedPhoneNotificationIds(schoolId);
  const nextPosted = new Set(postedIds);
  unread
    .filter((item) => !postedIds.has(item.id))
    .slice(0, 5)
    .forEach((item) => {
      const title = String(item.title || "Schoolix").trim();
      const body = String(item.message || item.body || "").trim();
      if (!title && !body) return;
      try {
        window.SchoolixNativeNotifications.showLocalNotification(String(item.id), title || "Schoolix", body);
        nextPosted.add(item.id);
      } catch (error) {
        console.warn("Unable to post phone notification fallback", error);
      }
    });
  if (nextPosted.size !== postedIds.size) storePostedPhoneNotificationIds(schoolId, Array.from(nextPosted));
}

function requestNativeNotificationStatus() {
  try {
    window.SchoolixNativeNotifications?.getNotificationStatus?.();
  } catch (_) {}
}

function renderNativeNotificationStatus(detail = {}) {
  const node = document.getElementById("schoolixNotificationStatus");
  if (!node) return;
  const status = String(detail.status || "").toLowerCase();
  const permissionGranted = detail.permissionGranted !== false;
  const error = String(detail.error || "").trim();
  if (status === "token-ready") {
    node.hidden = true;
    return;
  }
  node.hidden = false;
  let text = "Phone alerts checking...";
  let tone = "checking";
  if (!permissionGranted) {
    text = "Phone alerts blocked in Android settings.";
    tone = "error";
  } else if (status === "ready") {
    text = "Phone alerts ready.";
    tone = "ready";
  } else if (status.includes("retrying")) {
    text = error ? `Phone alerts reconnecting: ${error.slice(0, 120)}` : "Phone alerts reconnecting...";
    tone = "checking";
  } else if (status.includes("waiting")) {
    text = error ? `Phone alerts waiting: ${error.slice(0, 120)}` : "Phone alerts waiting for Google notification service.";
    tone = "warning";
  } else if (status === "token-ready-cached") {
    text = "Phone alerts ready. Google service will refresh in background.";
    tone = "ready";
  } else if (status.includes("failed") || status.includes("denied")) {
    text = error ? `Phone alerts failed: ${error.slice(0, 120)}` : "Phone alerts failed.";
    tone = "error";
  } else if (status.includes("skipped")) {
    text = error ? `Phone alerts waiting: ${error.slice(0, 120)}` : "Phone alerts waiting for login.";
    tone = "warning";
  }
  node.textContent = text;
  node.dataset.tone = tone;
}

if (IS_WINDOW) {
  window.SchoolixNativeNotificationStatus = {
    receiveStatus(detail = {}) {
      renderNativeNotificationStatus(detail);
      if (detail?.status === "ready") {
        window.dispatchEvent(new CustomEvent("schoolix:notifications-ready", { detail: { registered: true, native: true } }));
      }
    }
  };
}

function repositionNotificationBell() {
  if (!isNativeApp() || isLoginPage()) {
    removeNotificationBell();
    return;
  }
  const wrap = document.querySelector(".schoolix-notification-wrap");
  const target = getTopbarTarget();
  if (!wrap || !target || wrap.parentElement === target) return;
  const networkChip = document.getElementById("appNetworkChip");
  if (networkChip?.parentElement === target) {
    target.insertBefore(wrap, networkChip.nextSibling);
  } else {
    target.prepend(wrap);
  }
}

let notificationInboxPollTimer = 0;
function startNotificationInboxPolling() {
  if (notificationInboxPollTimer || !isNativeApp() || isLoginPage()) return;
  notificationInboxPollTimer = window.setInterval(() => {
    loadNotificationInbox(false);
  }, 30000);
}

function ensurePageProgress() {
  if (document.getElementById("appPageProgress")) return document.getElementById("appPageProgress");
  const bar = document.createElement("div");
  bar.id = "appPageProgress";
  bar.className = "app-page-progress";
  document.body.prepend(bar);
  return bar;
}

function showPageProgress() {
  ensurePageProgress().classList.add("visible");
}

function hidePageProgress() {
  const bar = document.getElementById("appPageProgress");
  if (!bar) return;
  bar.style.transform = "scaleX(1)";
  setTimeout(() => {
    bar.classList.remove("visible");
    bar.style.transform = "";
  }, 180);
}

async function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  try {
    if (isNativeApp()) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      await Promise.all(registrations.map((registration) => registration.unregister()));
      if ("caches" in window) {
        const keys = await caches.keys();
        await Promise.all(keys.filter((key) => key.startsWith(APP_CACHE_PREFIX)).map((key) => caches.delete(key)));
      }
      return;
    }
    const registration = await navigator.serviceWorker.register("/sw.js", { updateViaCache: "none" });
    registration.update().catch(() => {});
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const constrained = connection?.saveData === true || /(^|-)2g$/i.test(String(connection?.effectiveType || ""));
    if (!constrained || isNativeApp()) {
      const readyRegistration = await navigator.serviceWorker.ready;
      readyRegistration.active?.postMessage({ type: "SCHOOLIX_WARM_PANELS" });
    }
  } catch (error) {
    console.warn("Schoolix service worker registration failed", error);
  }
}

function scheduleServiceWorkerRegistration() {
  if (!("serviceWorker" in navigator)) return;
  const registerWhenIdle = () => {
    const run = () => registerServiceWorker();
    if ("requestIdleCallback" in window) window.requestIdleCallback(run, { timeout: 2500 });
    else window.setTimeout(run, 1200);
  };
  if (document.readyState === "complete") registerWhenIdle();
  else window.addEventListener("load", registerWhenIdle, { once: true });
}

if (IS_WINDOW) {
  applyRuntimeMode();

  window.SchoolixPrint = {
    isNative: isNativeApp,
    printHtml: nativePrintHtml,
    printCurrentPage(title = document.title || "Schoolix") {
      return nativePrintHtml(title, `<!DOCTYPE html>${document.documentElement.outerHTML}`);
    }
  };

  window.SchoolixBack = {
    handleBack() {
      const file = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();

      if (file === "teacher-dashboard.html") {
        const activeTab = document.body?.dataset?.activeTab || "home";
        if (activeTab !== "home" && typeof window.switchTab === "function") {
          window.switchTab("home");
          return true;
        }
      }

      if (file === "student-dashboard.html") {
        const activePage = document.querySelector(".page.active")?.id?.replace(/^page-/, "");
        if (activePage && activePage !== "overview" && typeof window.navigate === "function") {
          window.navigate("overview");
          return true;
        }
      }

      return false;
    }
  };

  const browserPrint = window.print?.bind(window);
  window.print = function schoolixPrint() {
    if (window.SchoolixPrint?.printCurrentPage?.()) return;
    browserPrint?.();
  };

  window.addEventListener("online", updateNetworkChip);
  window.addEventListener("offline", updateNetworkChip);
  window.addEventListener("beforeunload", showPageProgress);
  window.addEventListener("pageshow", hidePageProgress);
  window.addEventListener("schoolix:student-session-ready", (event) => {
    window.SchoolixNotificationContext = event.detail || window.SchoolixNotificationContext || {};
    ensureNotificationBell();
    loadNotificationInbox(false);
  });
  window.addEventListener("schoolix:notification-context-ready", (event) => {
    window.SchoolixNotificationContext = event.detail || window.SchoolixNotificationContext || {};
    ensureNotificationBell();
    loadNotificationInbox(false);
  });

  function initSchoolixAppShell() {
    applyRuntimeMode();
    ensureNativePullToRefresh();
    ensurePageProgress();
    updateNetworkChip();
    ensureNotificationBell();
    repositionNotificationBell();
    loadNotificationInbox(false);
    scheduleServiceWorkerRegistration();
    requestNativeNotificationStatus();
    startNotificationInboxPolling();
    refreshAppUpdateSidebarAction();
    try { window.SchoolixNativeUpdate?.checkForUpdates?.(); } catch (_) {}
    window.setTimeout(() => {
      ensureNotificationBell();
      repositionNotificationBell();
      ensureSidebarUpdateAction();
    }, 250);
    window.setTimeout(() => {
      ensureNotificationBell();
      repositionNotificationBell();
      ensureSidebarUpdateAction();
    }, 1000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSchoolixAppShell, { once: true });
  } else {
    initSchoolixAppShell();
  }
}

if (IS_SERVICE_WORKER) {
  async function cacheAssets(cacheName, assets) {
    const cache = await caches.open(cacheName);
    await Promise.allSettled(assets.map(async (asset) => {
      const response = await fetch(asset, { cache: "reload" });
      if (response.ok) await cache.put(asset, response);
    }));
  }

  async function deletePreviousCaches() {
    const oldKeys = (await caches.keys()).filter((key) => key.startsWith(APP_CACHE_PREFIX) && key !== APP_CACHE);
    await Promise.all(oldKeys.map((key) => caches.delete(key)));
  }

  async function activateWorker() {
    await deletePreviousCaches();
    await self.clients.claim();
    // Capacitor serves bundled assets from localhost. A previously installed
    // worker may have returned an old dashboard once before this new worker
    // activated, so reload local app clients under the network-first worker.
    if (["localhost", "127.0.0.1"].includes(self.location.hostname)) {
      const clients = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
      clients.forEach((client) => {
        const target = new URL(client.url);
        if (target.searchParams.get("schoolixSw") === "15") return;
        target.searchParams.set("schoolixSw", "15");
        // Do not hold the activate event open while the controlled WebView is
        // navigating; doing so can deadlock activation in Chromium.
        client.navigate(target.toString()).catch(() => undefined);
      });
    }
  }

  async function networkFirst(request, fallbackPath = "") {
    const cache = await caches.open(APP_CACHE);
    try {
      const response = await fetch(request, { cache: "no-store" });
      if (response.ok) await cache.put(request, response.clone());
      return response;
    } catch (error) {
      const cached = await cache.match(request, { ignoreSearch: true });
      if (cached) return cached;
      if (fallbackPath) return (await cache.match(fallbackPath)) || Response.error();
      throw error;
    }
  }

  async function staleWhileRevalidate(request, event, fallbackPath = "") {
    const cachePromise = caches.open(APP_CACHE);
    const cachedPromise = cachePromise.then((cache) => cache.match(request, { ignoreSearch: true }));
    const network = cachePromise.then(() => fetch(request)).then(async (response) => {
      const cache = await cachePromise;
      if (response.ok) await cache.put(request, response.clone());
      return response;
    });
    event.waitUntil(network.catch(() => undefined));
    const cached = await cachedPromise;

    if (cached) {
      return cached;
    }
    try {
      return await network;
    } catch (error) {
      if (fallbackPath) return (await (await cachePromise).match(fallbackPath)) || Response.error();
      throw error;
    }
  }

  self.addEventListener("install", (event) => {
    event.waitUntil(cacheAssets(APP_CACHE, CORE_ASSETS).then(() => self.skipWaiting()));
  });

  self.addEventListener("activate", (event) => {
    event.waitUntil(activateWorker());
  });

  self.addEventListener("message", (event) => {
    if (event.data?.type !== "SCHOOLIX_WARM_PANELS") return;
    event.waitUntil(cacheAssets(APP_CACHE, PANEL_ASSETS));
  });

  self.addEventListener("fetch", (event) => {
    if (event.request.method !== "GET") return;
    const requestUrl = new URL(event.request.url);
    if (requestUrl.origin !== self.location.origin) return;
    if (/^\/(?:update|version)\.json$/i.test(requestUrl.pathname) || requestUrl.pathname.startsWith("/dist/")) return;

    if (event.request.mode === "navigate") {
      event.respondWith(networkFirst(event.request, "/offline.html"));
      return;
    }

    if (NETWORK_FIRST_ASSETS.has(requestUrl.pathname)) {
      event.respondWith(networkFirst(event.request));
      return;
    }

    event.respondWith(staleWhileRevalidate(event.request, event));
  });
}
