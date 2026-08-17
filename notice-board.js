import { initializeApp, getApps } from "./firebase-compat.js";
import { getAuth, onAuthStateChanged, signOut } from "./firebase-compat.js";
import { getFirestore, doc, getDoc, collection, getDocs, query, orderBy, limit } from "./firebase-compat.js";

const firebaseConfig = {
  apiKey: "AIzaSyAomGwef93HFT9Xyx7SVW95FPw_IcIAICE",
  authDomain: "schoolix-48107.firebaseapp.com",
  projectId: "schoolix-48107"
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const $ = (id) => document.getElementById(id);

const pageRole = String(document.body.dataset.noticeRole || "student").toLowerCase();
const usesSharedLibrarySidebar = document.body.classList.contains("library-dashboard-app");
const roleAudience = {
  student: "students",
  teacher: "teachers",
  librarian: "librarians",
  accountant: "accountants"
};
let activeSchoolId = "";

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
  const clean = String(value || "").trim().toLowerCase();
  if (["students", "parent"].includes(clean)) return "student";
  if (clean === "teachers") return "teacher";
  if (clean === "librarians") return "librarian";
  if (["accounts", "accountants"].includes(clean)) return "accountant";
  if (["super admin", "super-admin"].includes(clean)) return "superadmin";
  return clean || pageRole;
}

function roleName(value = pageRole) {
  return value ? value[0].toUpperCase() + value.slice(1) : "User";
}

function resolveSchoolId(profile, user) {
  const normalized = normalizeRole(profile?.role || profile?.loginAs);
  return String(
    profile?.schoolId ||
    profile?.adminId ||
    profile?.adminUID ||
    profile?.adminUid ||
    profile?.schoolUID ||
    profile?.schoolUid ||
    (normalized === "admin" ? user?.uid : "") ||
    ""
  ).trim();
}

function getStudentSession() {
  try { return JSON.parse(localStorage.getItem("schoolixStudentSession") || "null"); }
  catch { return null; }
}

async function getUserProfile(uid) {
  if (!uid) return null;
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

async function getSchoolProfile(schoolId) {
  if (!schoolId) return null;
  try {
    const snap = await getDoc(doc(db, "schools", schoolId));
    return snap.exists() ? snap.data() : null;
  } catch {
    return null;
  }
}

function firstText(...values) {
  return values.map((value) => String(value || "").trim()).find(Boolean) || "";
}

function audienceLabel(value) {
  const normalized = String(value || "all").toLowerCase();
  if (normalized === "teachers") return "Teachers";
  if (normalized === "students") return "Students";
  if (normalized === "librarians") return "Librarians";
  if (["accountants", "accounts"].includes(normalized)) return "Accountants";
  return "Everyone";
}

function canSeeNotice(notice) {
  const audience = String(notice.audience || "all").toLowerCase();
  return ["all", "everyone"].includes(audience) || audience === roleAudience[pageRole];
}

function toDate(value) {
  const date = value?.toDate ? value.toDate() : value ? new Date(value) : null;
  return date && !Number.isNaN(date.getTime()) ? date : null;
}

function formatDate(value) {
  const date = toDate(value);
  if (!date) return "Recently";
  return date.toLocaleString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit" });
}

function noticeIcon(type) {
  if (type === "image") return '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>';
  if (type === "pdf") return '<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/></svg>';
  return '<svg viewBox="0 0 24 24"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/></svg>';
}

function render(items) {
  const list = $("noticeList");
  if (!list) return;
  if ($("noticeCount")) $("noticeCount").textContent = String(items.length);
  if ($("noticeSummary")) {
    const latest = items[0]?.createdAt ? `Last updated ${formatDate(items[0].createdAt)}` : "No announcements have been published yet.";
    $("noticeSummary").textContent = items.length ? `${items.length} ${items.length === 1 ? "notice" : "notices"} available • ${latest}` : latest;
  }

  if (!items.length) {
    list.innerHTML = `<div class="notice-empty"><span class="notice-empty-icon">${noticeIcon("notice")}</span><strong>No notices yet</strong><small>New school announcements will appear here.</small></div>`;
    return;
  }

  list.innerHTML = items.map((notice) => {
    const attachmentUrl = safeUrl(notice.attachmentUrl || notice.pdfUrl || "");
    const attachmentName = firstText(notice.attachmentName, notice.pdfName, "Open attachment");
    const attachmentType = firstText(notice.attachmentType, /\.(png|jpe?g|webp|gif|bmp|svg)$/i.test(attachmentName) ? "image" : attachmentUrl ? "pdf" : "notice").toLowerCase();
    const attachment = attachmentUrl
      ? `<a class="notice-pdf" href="${escapeHtml(attachmentUrl)}" target="_blank" rel="noopener noreferrer" aria-label="Open ${escapeHtml(attachmentName)}">${noticeIcon(attachmentType)}<span>${escapeHtml(attachmentName)}</span></a>`
      : "";
    const imagePreview = attachmentUrl && attachmentType === "image"
      ? `<a href="${escapeHtml(attachmentUrl)}" target="_blank" rel="noopener noreferrer"><img class="notice-image" src="${escapeHtml(attachmentUrl)}" alt="${escapeHtml(attachmentName)}" loading="lazy" decoding="async"></a>`
      : "";
    return `
      <article class="notice-card">
        <div class="notice-card-head">
          <div class="notice-card-heading">
            <span class="notice-card-icon">${noticeIcon(attachmentType)}</span>
            <div>
              <h3 class="notice-title">${escapeHtml(notice.title || "Notice")}</h3>
              <span class="notice-date"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>${escapeHtml(formatDate(notice.createdAt))}</span>
            </div>
          </div>
          <span class="notice-badge">${escapeHtml(audienceLabel(notice.audience))}</span>
        </div>
        ${notice.message ? `<p class="notice-message">${escapeHtml(notice.message)}</p>` : ""}
        ${imagePreview}
        ${attachment ? `<div class="notice-meta">${attachment}</div>` : ""}
      </article>`;
  }).join("");
}

function renderError(message = "Unable to load notices.") {
  if ($("noticeCount")) $("noticeCount").textContent = "--";
  if ($("noticeSummary")) $("noticeSummary").textContent = "The notice board could not be refreshed.";
  if ($("noticeList")) $("noticeList").innerHTML = `<div class="notice-empty"><span class="notice-empty-icon">${noticeIcon("notice")}</span><strong>${escapeHtml(message)}</strong><small>Check your connection and try Refresh again.</small></div>`;
}

function setLoading(loading) {
  const button = $("refreshNotices");
  if (!button) return;
  button.disabled = loading;
  button.classList.toggle("is-loading", loading);
}

async function loadNotices(schoolId) {
  if (!schoolId) throw new Error("School profile not found.");
  setLoading(true);
  if ($("noticeList")) $("noticeList").innerHTML = '<div class="notice-empty notice-loading"><span class="notice-spinner"></span><strong>Loading notices</strong><small>Please wait a moment...</small></div>';
  try {
    const snap = await getDocs(query(collection(db, "schools", schoolId, "notices"), orderBy("createdAt", "desc"), limit(80)));
    const notices = snap.docs
      .map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }))
      .filter((notice) => notice.status !== "deleted")
      .filter(canSeeNotice);
    render(notices);
  } finally {
    setLoading(false);
  }
}

function initials(name, fallback) {
  const words = String(name || "").trim().split(/\s+/).filter(Boolean);
  return (words.slice(0, 2).map((word) => word[0]).join("") || fallback || "U").toUpperCase();
}

function renderIdentity(profile, school, user) {
  const displayName = firstText(profile?.name, profile?.studentName, profile?.teacherName, profile?.displayName, user?.displayName, roleName());
  const schoolName = firstText(profile?.schoolName, profile?.school, school?.schoolName, school?.name, school?.displayName, "Schoolix");
  const photoUrl = safeUrl(firstText(profile?.photoUrl, profile?.imageUrl, profile?.profilePhotoUrl, profile?.avatarUrl, user?.photoURL));
  const avatar = $("topbarAvatar");
  if ($("topbarUserName")) $("topbarUserName").textContent = displayName;
  if ($("sidebarSchoolName")) $("sidebarSchoolName").textContent = schoolName;
  if ($("roleLabel")) $("roleLabel").textContent = roleName(pageRole);
  if (avatar) avatar.innerHTML = photoUrl ? `<img src="${escapeHtml(photoUrl)}" alt="${escapeHtml(displayName)}">` : escapeHtml(initials(displayName, pageRole[0]));
}

function closeSidebar() {
  $("noticeSidebar")?.classList.remove("open");
  $("sidebarOverlay")?.classList.remove("open");
  $("sidebarOverlay")?.setAttribute("aria-hidden", "true");
  $("noticeMenuButton")?.setAttribute("aria-expanded", "false");
}

function openSidebar() {
  $("noticeSidebar")?.classList.add("open");
  $("sidebarOverlay")?.classList.add("open");
  $("sidebarOverlay")?.setAttribute("aria-hidden", "false");
  $("noticeMenuButton")?.setAttribute("aria-expanded", "true");
}

async function logout() {
  const button = $("noticeLogout");
  if (button) button.disabled = true;
  try { await signOut(auth); } catch (error) { console.warn("Notice sign out failed", error); }
  if (pageRole === "student") localStorage.removeItem("schoolixStudentSession");
  window.location.replace("index.html");
}

async function boot(user, fallbackProfile = null) {
  const profile = fallbackProfile || await getUserProfile(user?.uid);
  const actualRole = normalizeRole(profile?.role || profile?.loginAs);
  const allowed = actualRole === pageRole || ["admin", "superadmin"].includes(actualRole);
  if (!allowed) return window.location.replace("index.html");

  activeSchoolId = resolveSchoolId(profile, user);
  if (!activeSchoolId) return renderError("School profile not found. Please login again.");
  const school = await getSchoolProfile(activeSchoolId);
  renderIdentity(profile || {}, school || {}, user || {});
  await loadNotices(activeSchoolId);
}

if (!usesSharedLibrarySidebar) {
  $("noticeMenuButton")?.addEventListener("click", () => $("noticeSidebar")?.classList.contains("open") ? closeSidebar() : openSidebar());
  $("sidebarOverlay")?.addEventListener("click", closeSidebar);
}
$("noticeLogout")?.addEventListener("click", logout);
$("refreshNotices")?.addEventListener("click", () => loadNotices(activeSchoolId).catch((error) => {
  console.error("Notice refresh failed", error);
  renderError();
  setLoading(false);
}));
if (!usesSharedLibrarySidebar) {
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeSidebar(); });
}

onAuthStateChanged(auth, async (user) => {
  try {
    if (user) return await boot(user);
    const session = pageRole === "student" ? getStudentSession() : null;
    if (session?.schoolId || session?.adminId) {
      return await boot({ uid: session.uid || session.studentId || "" }, { ...session, role: "student" });
    }
    window.location.replace("index.html");
  } catch (error) {
    console.error("Notice board failed", error);
    renderError();
    setLoading(false);
  }
});
