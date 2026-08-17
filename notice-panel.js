import { initializeApp, getApps } from "./firebase-compat.js";
import { getAuth, onAuthStateChanged } from "./firebase-compat.js";
import { getFirestore, collection, doc, getDoc, getDocs, limit, orderBy, query } from "./firebase-compat.js";

const panels = [...document.querySelectorAll("[data-dashboard-notices]")];
if (!panels.length) throw new Error("Notice panel container is missing");

const firebaseConfig = {
  apiKey: "AIzaSyAomGwef93HFT9Xyx7SVW95FPw_IcIAICE",
  authDomain: "schoolix-48107.firebaseapp.com",
  projectId: "schoolix-48107"
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const panelState = new WeakMap();

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function safeUrl(value) {
  const raw = String(value || "").trim();
  if (!raw) return "";
  try {
    const url = new URL(raw, window.location.href);
    return ["http:", "https:"].includes(url.protocol) ? url.href : "";
  } catch {
    return "";
  }
}

function normalizeRole(value) {
  const role = String(value || "").trim().toLowerCase();
  if (["student", "students", "parent", "parents"].includes(role)) return "student";
  if (["teacher", "teachers"].includes(role)) return "teacher";
  if (["super admin", "super-admin"].includes(role)) return "superadmin";
  return role;
}

function getStudentSession() {
  try { return JSON.parse(localStorage.getItem("schoolixStudentSession") || "null"); }
  catch { return null; }
}

async function getProfile(uid) {
  if (!uid) return null;
  const snapshot = await getDoc(doc(db, "users", uid));
  return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
}

function resolveSchoolId(profile, user) {
  const role = normalizeRole(profile?.role || profile?.loginAs);
  return String(
    profile?.schoolId || profile?.adminId || profile?.adminUID || profile?.adminUid ||
    profile?.schoolUID || profile?.schoolUid || (role === "admin" ? user?.uid : "") || ""
  ).trim();
}

function canView(notice, role) {
  const audience = String(notice.audience || "all").toLowerCase();
  const target = role === "teacher" ? "teachers" : "students";
  return ["all", "everyone", target].includes(audience);
}

function audienceLabel(value) {
  const audience = String(value || "all").toLowerCase();
  if (audience === "teachers") return "Teachers";
  if (audience === "students") return "Students";
  if (audience === "librarians") return "Librarians";
  if (["accounts", "accountants"].includes(audience)) return "Accountants";
  return "Everyone";
}

function formatDate(value) {
  const date = value?.toDate ? value.toDate() : value ? new Date(value) : null;
  if (!date || Number.isNaN(date.getTime())) return "Recently";
  return date.toLocaleString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit" });
}

function attachmentType(notice, name, url) {
  const explicit = String(notice.attachmentType || "").toLowerCase();
  if (["image", "pdf"].includes(explicit)) return explicit;
  if (/\.(png|jpe?g|webp|gif)$/i.test(name)) return "image";
  return url ? "pdf" : "notice";
}

function icon(type) {
  if (type === "image") return '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>';
  if (type === "pdf") return '<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/></svg>';
  return '<svg viewBox="0 0 24 24"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/></svg>';
}

function setLoading(panel, loading) {
  const button = panel.querySelector("[data-notice-refresh]");
  if (!button) return;
  button.disabled = loading;
  button.classList.toggle("is-loading", loading);
}

function render(panel, notices) {
  const list = panel.querySelector("[data-notice-list]");
  const count = panel.querySelector("[data-notice-count]");
  const summary = panel.querySelector("[data-notice-summary]");
  if (count) count.textContent = String(notices.length);
  if (summary) summary.textContent = notices.length
    ? `${notices.length} ${notices.length === 1 ? "notice" : "notices"} • Updated ${formatDate(notices[0].createdAt)}`
    : "No announcements have been published yet.";
  if (!list) return;
  if (!notices.length) {
    list.innerHTML = `<div class="dashboard-notice-empty"><span class="dashboard-notice-empty-icon">${icon("notice")}</span><strong>No notices yet</strong><small>New school announcements will appear here.</small></div>`;
    return;
  }

  list.innerHTML = notices.map((notice) => {
    const url = safeUrl(notice.attachmentUrl || notice.pdfUrl || "");
    const name = String(notice.attachmentName || notice.pdfName || (url ? "Open attachment" : ""));
    const type = attachmentType(notice, name, url);
    const preview = url && type === "image"
      ? `<a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer"><img class="dashboard-notice-image" src="${escapeHtml(url)}" alt="${escapeHtml(name)}" loading="lazy" decoding="async"></a>`
      : "";
    const file = url
      ? `<div class="dashboard-notice-card-footer"><a class="dashboard-notice-file" href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${icon(type)}<span>${escapeHtml(name)}</span></a></div>`
      : "";
    return `<article class="dashboard-notice-card">
      <div class="dashboard-notice-card-head">
        <div class="dashboard-notice-card-heading"><span class="dashboard-notice-card-icon">${icon(type)}</span><div><h3 class="dashboard-notice-title">${escapeHtml(notice.title || "Notice")}</h3><span class="dashboard-notice-date"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>${escapeHtml(formatDate(notice.createdAt))}</span></div></div>
        <span class="dashboard-notice-audience">${escapeHtml(audienceLabel(notice.audience))}</span>
      </div>
      ${notice.message ? `<p class="dashboard-notice-message">${escapeHtml(notice.message)}</p>` : ""}
      ${preview}${file}
    </article>`;
  }).join("");
}

function renderError(panel, message = "Notices could not be loaded") {
  const list = panel.querySelector("[data-notice-list]");
  const count = panel.querySelector("[data-notice-count]");
  const summary = panel.querySelector("[data-notice-summary]");
  if (count) count.textContent = "--";
  if (summary) summary.textContent = "Check your connection and refresh again.";
  if (list) list.innerHTML = `<div class="dashboard-notice-empty"><span class="dashboard-notice-empty-icon">${icon("notice")}</span><strong>${escapeHtml(message)}</strong><small>Please use Refresh to try again.</small></div>`;
}

async function loadPanel(panel, schoolId) {
  const role = String(panel.dataset.noticeRole || "student").toLowerCase();
  const list = panel.querySelector("[data-notice-list]");
  setLoading(panel, true);
  if (list) list.innerHTML = '<div class="dashboard-notice-empty"><span class="dashboard-notice-spinner"></span><strong>Loading notices</strong><small>Please wait a moment...</small></div>';
  try {
    const snapshot = await getDocs(query(collection(db, "schools", schoolId, "notices"), orderBy("createdAt", "desc"), limit(80)));
    const notices = snapshot.docs.map((item) => ({ id: item.id, ...item.data() }))
      .filter((notice) => notice.status !== "deleted")
      .filter((notice) => canView(notice, role));
    render(panel, notices);
  } catch (error) {
    console.error("Dashboard notices failed", error);
    renderError(panel);
  } finally {
    setLoading(panel, false);
  }
}

async function boot(user) {
  const studentSession = getStudentSession();
  let profile = user ? await getProfile(user.uid).catch(() => null) : null;
  for (const panel of panels) {
    const role = String(panel.dataset.noticeRole || "student").toLowerCase();
    const panelProfile = profile || (role === "student" ? { ...studentSession, role: "student" } : null);
    const schoolId = resolveSchoolId(panelProfile, user);
    if (!schoolId) {
      renderError(panel, "School profile not found");
      continue;
    }
    panelState.set(panel, { schoolId });
    panel.querySelector("[data-notice-refresh]")?.addEventListener("click", () => loadPanel(panel, schoolId));
    await loadPanel(panel, schoolId);
  }
}

onAuthStateChanged(auth, (user) => {
  const studentSession = getStudentSession();
  if (!user && !studentSession) {
    panels.forEach((panel) => renderError(panel, "Please login again to view notices"));
    return;
  }
  boot(user).catch((error) => {
    console.error("Notice panel initialization failed", error);
    panels.forEach((panel) => renderError(panel));
  });
});
