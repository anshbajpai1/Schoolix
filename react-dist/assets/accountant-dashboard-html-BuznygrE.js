const n={file:"accountant-dashboard.html",title:"Accountant Dashboard - Schoolix",htmlClass:"",bodyClass:"library-dashboard-app sx-accountant-shell-enabled sx-accountant-simple-shell",body:`
<div id="sxPageLoader" class="sx-page-loader" role="status" aria-live="polite">\r
  <section class="dots-container" aria-label="Loading page">\r
    <div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div>\r
  </section>\r
</div>\r
<div class="library-app-layout">\r
  <div class="library-sidebar-overlay" id="librarySidebarOverlay" aria-hidden="true"></div>\r
  <aside class="library-sidebar" id="librarySidebar"></aside>\r
  <main class="library-main">\r
    <header class="library-page-topbar">\r
      <div>\r
        <h1 class="library-page-title">Accounts Workspace</h1>\r
        <div class="library-page-meta" id="schoolName">Loading school account...</div>\r
      </div>\r
      <button class="library-menu-button" id="libraryMenuButton" type="button" aria-label="Open accounts navigation" aria-expanded="false">
        <span class="library-toggle-arrow" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="m15 18-6-6 6-6"></path></svg></span>
      </button>
    </header>\r
\r
    <section class="library-card accounts-hero">\r
      <div class="top">\r
        <div>\r
          <div class="accounts-eyebrow">Accounts Portal</div>\r
          <h1 id="welcomeTitle">Accountant Dashboard</h1>\r
          <p class="library-page-meta">Fees, ledger, notices, and staff attendance in one professional workspace.</p>\r
        </div>\r
        <div class="accounts-actions">\r
          <a class="accounts-btn primary" href="#/fees-report.html"><svg viewBox="0 0 24 24"><path d="M6 3h12"></path><path d="M6 8h12"></path><path d="M8 3c4 0 6 2 6 5s-2 5-6 5l7 8"></path></svg>Fees</a>
          <a class="accounts-btn" href="#/school-accounts.html"><svg viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15Z"></path></svg>Ledger</a>
          <a class="accounts-btn" href="#/accountant-salary.html"><svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="M7 9h10"></path><path d="M7 13h4"></path><path d="M15 13h2"></path></svg>Salary</a>
          <a class="accounts-btn accounts-admin" id="adminBackBtn" href="#/admin-dashboard.html"><svg viewBox="0 0 24 24"><path d="M3 12h18"></path><path d="M3 6h18"></path><path d="M3 18h18"></path></svg>Admin</a>
          <button class="accounts-btn danger" type="button" onclick="logout()"><svg viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><path d="M16 17l5-5-5-5"></path><path d="M21 12H9"></path></svg>Logout</button>\r
        </div>\r
      </div>\r
      <div class="account-stats">\r
        <div class="account-stat"><strong>Fees</strong><span>Collection, dues, exports, and payment history</span></div>
        <div class="account-stat"><strong>Ledger</strong><span>Income, expenses, references, and account balances</span></div>
        <div class="account-stat"><strong>Salary</strong><span>Teacher and staff salary payments debit to ledger</span></div>
      </div>\r
    </section>

    <section class="library-card accountant-salary-card" aria-label="Accountant salary details">
      <div class="salary-head">
        <div>
          <div class="accounts-eyebrow">Salary</div>
          <h2>My Salary Record</h2>
          <p class="library-page-meta" id="salarySubtext">Month and session wise salary status.</p>
        </div>
        <div class="salary-filters">
          <input type="month" id="salaryMonthPicker" aria-label="Salary month">
          <button class="accounts-btn primary" type="button" onclick="loadAccountantSalary()">Load</button>
        </div>
      </div>
      <div class="salary-breakdown">
        <div class="salary-box blue"><strong id="salaryBase">₹0</strong><span>Monthly Salary</span></div>
        <div class="salary-box"><strong id="salaryNet">₹0</strong><span>Net Salary</span></div>
        <div class="salary-box green"><strong id="salaryPaid">₹0</strong><span>Salary Paid</span></div>
        <div class="salary-box orange"><strong id="salaryDue">₹0</strong><span>Pending</span></div>
      </div>
      <div class="salary-progress-wrap">
        <div class="salary-progress-label"><span id="salaryProgressLabel">0% paid</span><span id="salaryStatus">Not generated</span></div>
        <div class="salary-progress" aria-hidden="true"><span id="salaryProgressBar"></span></div>
      </div>
      <div class="salary-history" id="salaryPaymentHistory">
        <div class="salary-empty">Loading salary details...</div>
      </div>
    </section>

    <section class="accounts-grid" aria-label="Accountant tools">
      <a href="#/fees-report.html" class="account-tile">\r
        <span class="account-tile-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"></path><path d="M14 2v6h6"></path><path d="M8 13h8"></path><path d="M8 17h5"></path></svg></span>\r
        <strong>Fees Management</strong>\r
        <span>Collect payments, impose fees, view dues, and export reports.</span>\r
      </a>\r
      <a href="#/school-accounts.html" class="account-tile">
        <span class="account-tile-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15Z"></path><path d="M8 7h8"></path><path d="M8 11h6"></path></svg></span>
        <strong>School Accounts</strong>
        <span>Record income, expenses, reasons, references, and balances.</span>
      </a>
      <a href="#/accountant-salary.html" class="account-tile">
        <span class="account-tile-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="M7 9h10"></path><path d="M7 13h4"></path><path d="M15 13h2"></path></svg></span>
        <strong>Salary Management</strong>
        <span>Generate teacher and staff salary records and debit paid salary to ledger.</span>
      </a>
      <a href="#/accountant-qr-checkin.html" class="account-tile">\r
        <span class="account-tile-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M3 7V5a2 2 0 0 1 2-2h2"></path><path d="M17 3h2a2 2 0 0 1 2 2v2"></path><path d="M21 17v2a2 2 0 0 1-2 2h-2"></path><path d="M7 21H5a2 2 0 0 1-2-2v-2"></path><path d="M7 12h10"></path></svg></span>\r
        <strong>QR Check-In</strong>\r
        <span>Open a dedicated page for daily staff attendance QR scan.</span>\r
      </a>\r
      <a href="#/accountant-attendance.html" class="account-tile">\r
        <span class="account-tile-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M9 11l3 3L22 4"></path><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg></span>\r
        <strong>Attendance Records</strong>\r
        <span>Review your monthly check-in and attendance history.</span>\r
      </a>\r
      <a href="accountant-#/notices.html" class="account-tile">\r
        <span class="account-tile-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M3 11v2a2 2 0 0 0 2 2h2l4 4v-4h4l6 3V6l-6 3H5a2 2 0 0 0-2 2Z"></path><path d="M21 9v6"></path></svg></span>\r
        <strong>Latest Notices</strong>\r
        <span>Read current school notices shared with accounts staff.</span>\r
      </a>\r
    </section>\r
  </main>\r
</div>\r
\r
<script>window.SchoolixDisablePageLoader = true; document.documentElement.classList.remove("sx-page-loading"); document.documentElement.classList.add("sx-page-loaded"); document.getElementById("sxPageLoader")?.classList.add("is-hidden");<\/script>
<script src="school-branding.js?v=branding-safe-20260806-2"><\/script>
<script src="accountant-portal.js?v=accountant-portal-20260806-4"><\/script>
<script>
window.setTimeout(function () {
  var schoolName = document.getElementById("schoolName");
  if (schoolName && /Loading school account/i.test(schoolName.textContent || "")) {
    schoolName.textContent = "Unable to load the accountant session. Please refresh or sign in again.";
  }
  var salaryHistory = document.getElementById("salaryPaymentHistory");
  if (salaryHistory && /Loading salary details/i.test(salaryHistory.textContent || "")) {
    salaryHistory.innerHTML = '<div class="salary-empty">Unable to load the accountant session. Please refresh or sign in again.</div>';
  }
}, 10000);
<\/script>
<script type="module">
import { initializeApp, getApps } from "./firebase-compat.js?v=accountant-guard-20260806-3";
import { getAuth, onAuthStateChanged, signOut } from "./firebase-compat.js?v=accountant-guard-20260806-3";
import { getFirestore, doc, getDoc, collection, getDocs, query, where, limit } from "./firebase-compat.js?v=accountant-guard-20260806-3";
\r
const firebaseConfig = {\r
  apiKey: "AIzaSyAomGwef93HFT9Xyx7SVW95FPw_IcIAICE",\r
  authDomain: "schoolix-48107.firebaseapp.com",\r
  projectId: "schoolix-48107",\r
  storageBucket: "schoolix-48107.firebasestorage.app",\r
  messagingSenderId: "133937954491",\r
  appId: "1:133937954491:web:69d8064422617eb8c4339e"\r
};\r
\r
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
let accountantProfile = {};
let accountantSchoolId = "";
let salarySessions = [];
let activeSalarySessionId = "";

function accountantLinkedSchoolId(data = {}) {
  return data.adminId || data.schoolId || data.schoolID || data.adminUID || data.adminUid || data.schoolUID || data.schoolUid || data.schoolDocId || data.schoolDocID || "";
}

async function resolveAccountantProfile(user) {
  const directSnap = await getDoc(doc(db, "users", user.uid));
  if (directSnap.exists()) return { id: directSnap.id, ...directSnap.data() };

  const uid = String(user.uid || "").trim();
  const rawEmail = String(user.email || "").trim();
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
      if (error?.code !== "permission-denied") console.warn(\`Accountant profile \${field} lookup failed:\`, error);
    }
  }
  return null;
}

const $ = (id) => document.getElementById(id);
const money = (value) => Number(value || 0);
const fmt = (value) => \`₹\${money(value).toLocaleString("en-IN")}\`;
const currentMonth = () => new Date().toISOString().slice(0, 7);
const monthLabel = (value) => value ? new Date(\`\${value}-01T12:00:00\`).toLocaleDateString("en-IN", { month: "long", year: "numeric" }) : "Selected month";
const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));

function getSessionLabel(session = {}) {
  return session.label || session.name || session.session || session.academicSession || session.year || session.id || "";
}

function renderSalarySessions() {
  const sorted = salarySessions.slice().sort((a, b) => {
    const aTime = a.createdAt?.seconds || a.startDate || a.id || "";
    const bTime = b.createdAt?.seconds || b.startDate || b.id || "";
    return String(bTime).localeCompare(String(aTime));
  });
  const active = sorted.find((session) => session.id === activeSalarySessionId) || sorted.find((session) => session.active || session.isActive || session.current) || sorted[0];
  activeSalarySessionId = active?.id || activeSalarySessionId || "";
}

async function loadSalarySessions() {
  if (!accountantSchoolId) return;
  try {
    const [activeSnap, snap] = await Promise.all([
      getDoc(doc(db, "schools", accountantSchoolId, "settings", "activeSession")),
      getDocs(collection(db, "schools", accountantSchoolId, "sessions"))
    ]);
    let viewSessionId = "";
    try { viewSessionId = localStorage.getItem("schoolix.viewSessionId") || ""; } catch (_) {}
    activeSalarySessionId = viewSessionId || (activeSnap.exists() ? activeSnap.data().sessionId || "" : "");
    salarySessions = snap.docs.map((item) => ({ id: item.id, ...item.data() }));
    renderSalarySessions();
  } catch (error) {
    console.warn("Unable to load salary sessions", error);
  }
}

function resetSalaryCard(message) {
  $("salaryBase").textContent = fmt(accountantProfile.monthlySalary || 0);
  $("salaryNet").textContent = "₹0";
  $("salaryPaid").textContent = "₹0";
  $("salaryDue").textContent = "₹0";
  $("salaryProgressBar").style.width = "0%";
  $("salaryProgressLabel").textContent = "0% paid";
  $("salaryStatus").textContent = "Not generated";
  $("salaryPaymentHistory").innerHTML = \`<div class="salary-empty">\${escapeHtml(message)}</div>\`;
}

window.loadAccountantSalary = async function() {
  const month = $("salaryMonthPicker")?.value || currentMonth();
  if (!accountantSchoolId || !accountantProfile.uid || !month) return;
  const selectedSessionId = window.SchoolixAccountantSession?.sessionId || activeSalarySessionId || "";
  const selectedSession = salarySessions.find((session) => session.id === selectedSessionId) || {};
  const sessionLabel = getSessionLabel(selectedSession) || "Current Session";
  $("salarySubtext").textContent = \`\${monthLabel(month)} | \${sessionLabel}\`;
  try {
    const salaryIds = Array.from(new Set([
      accountantProfile.uid,
      accountantProfile.authUid,
      accountantProfile.uid,
      accountantProfile.legacyUid,
      accountantProfile.firebaseUid,
      accountantProfile.staffUid,
      accountantProfile.staffId,
      accountantProfile.employeeId
    ].map((value) => String(value || "").trim()).filter(Boolean)));
    let snap = null;
    for (const staffUid of salaryIds) {
      snap = await getDoc(doc(db, "schools", accountantSchoolId, "staff_salary_records", \`\${staffUid}_\${month}\`));
      if (snap.exists()) break;
    }
    if (!snap.exists()) {
      resetSalaryCard(\`Salary record for \${monthLabel(month)} has not been generated yet.\`);
      return;
    }
    const record = snap.data();
    const recordSessionId = String(record.sessionId || "");
    if (selectedSessionId && recordSessionId && recordSessionId !== selectedSessionId) {
      resetSalaryCard(\`No salary record was found for \${monthLabel(month)} in the selected session.\`);
      return;
    }
    const base = money(record.baseSalary || accountantProfile.monthlySalary);
    const net = money(record.netSalary || base);
    const paid = money(record.paidAmount);
    const due = money(record.remainingAmount ?? Math.max(net - paid, 0));
    const pct = net > 0 ? Math.min(100, Math.round((paid / net) * 100)) : 0;
    $("salaryBase").textContent = fmt(base);
    $("salaryNet").textContent = fmt(net);
    $("salaryPaid").textContent = fmt(paid);
    $("salaryDue").textContent = fmt(due);
    $("salaryProgressBar").style.width = \`\${pct}%\`;
    $("salaryProgressLabel").textContent = \`\${pct}% paid\`;
    $("salaryStatus").textContent = record.status || (paid >= net && net > 0 ? "Paid" : paid > 0 ? "Partially Paid" : "Unpaid");
    const payments = Array.isArray(record.payments) ? record.payments.slice().reverse() : [];
    $("salaryPaymentHistory").innerHTML = payments.length
      ? payments.map((payment) => \`<div class="salary-payment-row">
          <div><strong>\${fmt(payment.amount)}</strong><span>\${escapeHtml(payment.note || payment.paymentMode || "Salary payment")}</span></div>
          <span>\${payment.paymentDate ? new Date(\`\${payment.paymentDate}T00:00:00\`).toLocaleDateString("en-IN") : "Date not set"}</span>
        </div>\`).join("")
      : \`<div class="salary-empty">No payment history has been recorded for this month.</div>\`;
  } catch (error) {
    console.error("Unable to load accountant salary", error);
    resetSalaryCard("Unable to load salary details.");
  }
};

window.addEventListener("schoolix:accountant-session-ready", (event) => {
  activeSalarySessionId = event.detail?.sessionId || activeSalarySessionId;
  window.loadAccountantSalary?.();
});

let accountantDashboardAuthSettled = false;
const accountantDashboardAuthTimer = window.setTimeout(() => {
  if (accountantDashboardAuthSettled) return;
  document.getElementById("schoolName").textContent = "Unable to load the accountant session. Please refresh or sign in again.";
  resetSalaryCard("Unable to load the accountant session. Please refresh or sign in again.");
}, 9000);

function markAccountantDashboardAuthSettled() {
  accountantDashboardAuthSettled = true;
  window.clearTimeout(accountantDashboardAuthTimer);
}

function showAccountantDashboardNotice(message) {
  document.getElementById("schoolName").textContent = message;
  document.getElementById("welcomeTitle").textContent = "Accountant Dashboard";
  resetSalaryCard(message);
}

onAuthStateChanged(auth, async (user) => {
  try {
    if (!user) {
      markAccountantDashboardAuthSettled();
      showAccountantDashboardNotice("Accountant session is missing. Please sign in again from the login page.");
      return;
    }
    const data = await resolveAccountantProfile(user);
    if (!data) {
      markAccountantDashboardAuthSettled();
      showAccountantDashboardNotice("Accountant profile was not found. Please ask the admin to relink this account.");
      return;
    }
    const role = String(data.role || "").toLowerCase();
    if (role !== "accountant" && role !== "admin") {
      markAccountantDashboardAuthSettled();
      showAccountantDashboardNotice("Access denied. Accountant account required.");
      return;
    }

    document.getElementById("welcomeTitle").textContent = \`Welcome, \${data.name || user.email || "Accountant"}\`;
    document.getElementById("adminBackBtn").style.display = role === "admin" ? "inline-flex" : "none";
    const profileUid = data.id || user.uid;
    const schoolId = role === "admin" ? profileUid : accountantLinkedSchoolId(data);
    accountantProfile = { uid: profileUid, authUid: user.uid, ...data };
    accountantSchoolId = schoolId;
    $("salaryMonthPicker").value = currentMonth();
    let school = data.schoolName || "";
    if (schoolId) {
      try {
        const adminSnap = await getDoc(doc(db, "users", schoolId));
        school = adminSnap.exists() ? (adminSnap.data().schoolName || school) : school;
      } catch (error) {
        console.warn("Unable to load accountant school profile", error);
      }
      document.getElementById("schoolName").textContent = school || window.SchoolBranding?.getSchoolName() || "Schoolix";
      const sidebarSchool = document.getElementById("sidebarSchoolName");
      if (sidebarSchool) sidebarSchool.textContent = school || "Schoolix";
      await loadSalarySessions();
      await window.loadAccountantSalary();
    } else {
      document.getElementById("schoolName").textContent = "School link missing. Contact admin.";
      resetSalaryCard("School link missing. Contact admin.");
    }
    markAccountantDashboardAuthSettled();
  } catch (error) {
    markAccountantDashboardAuthSettled();
    console.error("Unable to open accountant dashboard", error);
    document.getElementById("schoolName").textContent = "Unable to open accountant panel.";
    resetSalaryCard(error.message || "Unable to open accountant panel.");
  }
});
\r
window.logout = async () => {\r
  await signOut(auth);\r
  window.location.href = "#/index.html";\r
};\r
<\/script>\r
<script type="module" src="access-control.js?v=accountant-guard-20260806-3"><\/script>
<script src="schoolix-polish.js" defer><\/script>\r
`,styles:[],scripts:[{attributes:{id:"sxCriticalLoaderScript"},text:`\r
(function () {\r
  var root = document.documentElement;\r
  root.classList.add("sx-page-loading");\r
  window.SchoolixPageLoaderEarly = window.SchoolixPageLoaderEarly || { startedAt: Date.now() };\r
\r
  function markEarlyReady(reason) {\r
    window.SchoolixPageLoaderEarly.ready = true;\r
    window.SchoolixPageLoaderEarly.reason = reason || "dom-ready";\r
    try {\r
      window.dispatchEvent(new CustomEvent("schoolix:critical-load-ready", { detail: window.SchoolixPageLoaderEarly }));\r
    } catch (_) {}\r
  }\r
\r
  function afterFirstPaint(reason) {\r
    requestAnimationFrame(function () {\r
      requestAnimationFrame(function () { markEarlyReady(reason); });\r
    });\r
  }\r
\r
  function emergencyHide() {\r
    if (window.SchoolixPageLoader || !root.classList.contains("sx-page-loading")) return;\r
    root.classList.remove("sx-page-loading");\r
    root.classList.add("sx-page-loaded");\r
    var loader = document.getElementById("sxPageLoader");\r
    if (!loader) return;\r
    loader.classList.add("is-hidden");\r
    setTimeout(function () { loader.remove(); }, 260);\r
  }\r
\r
  if (document.readyState === "loading") {\r
    document.addEventListener("DOMContentLoaded", function () { afterFirstPaint("dom-ready"); }, { once: true });\r
  } else {\r
    afterFirstPaint(document.readyState === "complete" ? "document-complete" : "dom-ready");\r
  }\r
  window.addEventListener("load", function () { markEarlyReady("window-load"); }, { once: true });\r
  setTimeout(emergencyHide, 3200);\r
}());\r
`},{attributes:{},text:'window.SchoolixDisablePageLoader = true; document.documentElement.classList.remove("sx-page-loading"); document.documentElement.classList.add("sx-page-loaded"); document.getElementById("sxPageLoader")?.classList.add("is-hidden");'},{attributes:{src:"school-branding.js?v=branding-safe-20260806-2"},text:""},{attributes:{src:"accountant-portal.js?v=accountant-portal-20260806-4"},text:""},{attributes:{},text:`
window.setTimeout(function () {
  var schoolName = document.getElementById("schoolName");
  if (schoolName && /Loading school account/i.test(schoolName.textContent || "")) {
    schoolName.textContent = "Unable to load the accountant session. Please refresh or sign in again.";
  }
  var salaryHistory = document.getElementById("salaryPaymentHistory");
  if (salaryHistory && /Loading salary details/i.test(salaryHistory.textContent || "")) {
    salaryHistory.innerHTML = '<div class="salary-empty">Unable to load the accountant session. Please refresh or sign in again.</div>';
  }
}, 10000);
`},{attributes:{type:"module"},text:`
import { initializeApp, getApps } from "./firebase-compat.js?v=accountant-guard-20260806-3";
import { getAuth, onAuthStateChanged, signOut } from "./firebase-compat.js?v=accountant-guard-20260806-3";
import { getFirestore, doc, getDoc, collection, getDocs, query, where, limit } from "./firebase-compat.js?v=accountant-guard-20260806-3";
\r
const firebaseConfig = {\r
  apiKey: "AIzaSyAomGwef93HFT9Xyx7SVW95FPw_IcIAICE",\r
  authDomain: "schoolix-48107.firebaseapp.com",\r
  projectId: "schoolix-48107",\r
  storageBucket: "schoolix-48107.firebasestorage.app",\r
  messagingSenderId: "133937954491",\r
  appId: "1:133937954491:web:69d8064422617eb8c4339e"\r
};\r
\r
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
let accountantProfile = {};
let accountantSchoolId = "";
let salarySessions = [];
let activeSalarySessionId = "";

function accountantLinkedSchoolId(data = {}) {
  return data.adminId || data.schoolId || data.schoolID || data.adminUID || data.adminUid || data.schoolUID || data.schoolUid || data.schoolDocId || data.schoolDocID || "";
}

async function resolveAccountantProfile(user) {
  const directSnap = await getDoc(doc(db, "users", user.uid));
  if (directSnap.exists()) return { id: directSnap.id, ...directSnap.data() };

  const uid = String(user.uid || "").trim();
  const rawEmail = String(user.email || "").trim();
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
      if (error?.code !== "permission-denied") console.warn(\`Accountant profile \${field} lookup failed:\`, error);
    }
  }
  return null;
}

const $ = (id) => document.getElementById(id);
const money = (value) => Number(value || 0);
const fmt = (value) => \`₹\${money(value).toLocaleString("en-IN")}\`;
const currentMonth = () => new Date().toISOString().slice(0, 7);
const monthLabel = (value) => value ? new Date(\`\${value}-01T12:00:00\`).toLocaleDateString("en-IN", { month: "long", year: "numeric" }) : "Selected month";
const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));

function getSessionLabel(session = {}) {
  return session.label || session.name || session.session || session.academicSession || session.year || session.id || "";
}

function renderSalarySessions() {
  const sorted = salarySessions.slice().sort((a, b) => {
    const aTime = a.createdAt?.seconds || a.startDate || a.id || "";
    const bTime = b.createdAt?.seconds || b.startDate || b.id || "";
    return String(bTime).localeCompare(String(aTime));
  });
  const active = sorted.find((session) => session.id === activeSalarySessionId) || sorted.find((session) => session.active || session.isActive || session.current) || sorted[0];
  activeSalarySessionId = active?.id || activeSalarySessionId || "";
}

async function loadSalarySessions() {
  if (!accountantSchoolId) return;
  try {
    const [activeSnap, snap] = await Promise.all([
      getDoc(doc(db, "schools", accountantSchoolId, "settings", "activeSession")),
      getDocs(collection(db, "schools", accountantSchoolId, "sessions"))
    ]);
    let viewSessionId = "";
    try { viewSessionId = localStorage.getItem("schoolix.viewSessionId") || ""; } catch (_) {}
    activeSalarySessionId = viewSessionId || (activeSnap.exists() ? activeSnap.data().sessionId || "" : "");
    salarySessions = snap.docs.map((item) => ({ id: item.id, ...item.data() }));
    renderSalarySessions();
  } catch (error) {
    console.warn("Unable to load salary sessions", error);
  }
}

function resetSalaryCard(message) {
  $("salaryBase").textContent = fmt(accountantProfile.monthlySalary || 0);
  $("salaryNet").textContent = "₹0";
  $("salaryPaid").textContent = "₹0";
  $("salaryDue").textContent = "₹0";
  $("salaryProgressBar").style.width = "0%";
  $("salaryProgressLabel").textContent = "0% paid";
  $("salaryStatus").textContent = "Not generated";
  $("salaryPaymentHistory").innerHTML = \`<div class="salary-empty">\${escapeHtml(message)}</div>\`;
}

window.loadAccountantSalary = async function() {
  const month = $("salaryMonthPicker")?.value || currentMonth();
  if (!accountantSchoolId || !accountantProfile.uid || !month) return;
  const selectedSessionId = window.SchoolixAccountantSession?.sessionId || activeSalarySessionId || "";
  const selectedSession = salarySessions.find((session) => session.id === selectedSessionId) || {};
  const sessionLabel = getSessionLabel(selectedSession) || "Current Session";
  $("salarySubtext").textContent = \`\${monthLabel(month)} | \${sessionLabel}\`;
  try {
    const salaryIds = Array.from(new Set([
      accountantProfile.uid,
      accountantProfile.authUid,
      accountantProfile.uid,
      accountantProfile.legacyUid,
      accountantProfile.firebaseUid,
      accountantProfile.staffUid,
      accountantProfile.staffId,
      accountantProfile.employeeId
    ].map((value) => String(value || "").trim()).filter(Boolean)));
    let snap = null;
    for (const staffUid of salaryIds) {
      snap = await getDoc(doc(db, "schools", accountantSchoolId, "staff_salary_records", \`\${staffUid}_\${month}\`));
      if (snap.exists()) break;
    }
    if (!snap.exists()) {
      resetSalaryCard(\`Salary record for \${monthLabel(month)} has not been generated yet.\`);
      return;
    }
    const record = snap.data();
    const recordSessionId = String(record.sessionId || "");
    if (selectedSessionId && recordSessionId && recordSessionId !== selectedSessionId) {
      resetSalaryCard(\`No salary record was found for \${monthLabel(month)} in the selected session.\`);
      return;
    }
    const base = money(record.baseSalary || accountantProfile.monthlySalary);
    const net = money(record.netSalary || base);
    const paid = money(record.paidAmount);
    const due = money(record.remainingAmount ?? Math.max(net - paid, 0));
    const pct = net > 0 ? Math.min(100, Math.round((paid / net) * 100)) : 0;
    $("salaryBase").textContent = fmt(base);
    $("salaryNet").textContent = fmt(net);
    $("salaryPaid").textContent = fmt(paid);
    $("salaryDue").textContent = fmt(due);
    $("salaryProgressBar").style.width = \`\${pct}%\`;
    $("salaryProgressLabel").textContent = \`\${pct}% paid\`;
    $("salaryStatus").textContent = record.status || (paid >= net && net > 0 ? "Paid" : paid > 0 ? "Partially Paid" : "Unpaid");
    const payments = Array.isArray(record.payments) ? record.payments.slice().reverse() : [];
    $("salaryPaymentHistory").innerHTML = payments.length
      ? payments.map((payment) => \`<div class="salary-payment-row">
          <div><strong>\${fmt(payment.amount)}</strong><span>\${escapeHtml(payment.note || payment.paymentMode || "Salary payment")}</span></div>
          <span>\${payment.paymentDate ? new Date(\`\${payment.paymentDate}T00:00:00\`).toLocaleDateString("en-IN") : "Date not set"}</span>
        </div>\`).join("")
      : \`<div class="salary-empty">No payment history has been recorded for this month.</div>\`;
  } catch (error) {
    console.error("Unable to load accountant salary", error);
    resetSalaryCard("Unable to load salary details.");
  }
};

window.addEventListener("schoolix:accountant-session-ready", (event) => {
  activeSalarySessionId = event.detail?.sessionId || activeSalarySessionId;
  window.loadAccountantSalary?.();
});

let accountantDashboardAuthSettled = false;
const accountantDashboardAuthTimer = window.setTimeout(() => {
  if (accountantDashboardAuthSettled) return;
  document.getElementById("schoolName").textContent = "Unable to load the accountant session. Please refresh or sign in again.";
  resetSalaryCard("Unable to load the accountant session. Please refresh or sign in again.");
}, 9000);

function markAccountantDashboardAuthSettled() {
  accountantDashboardAuthSettled = true;
  window.clearTimeout(accountantDashboardAuthTimer);
}

function showAccountantDashboardNotice(message) {
  document.getElementById("schoolName").textContent = message;
  document.getElementById("welcomeTitle").textContent = "Accountant Dashboard";
  resetSalaryCard(message);
}

onAuthStateChanged(auth, async (user) => {
  try {
    if (!user) {
      markAccountantDashboardAuthSettled();
      showAccountantDashboardNotice("Accountant session is missing. Please sign in again from the login page.");
      return;
    }
    const data = await resolveAccountantProfile(user);
    if (!data) {
      markAccountantDashboardAuthSettled();
      showAccountantDashboardNotice("Accountant profile was not found. Please ask the admin to relink this account.");
      return;
    }
    const role = String(data.role || "").toLowerCase();
    if (role !== "accountant" && role !== "admin") {
      markAccountantDashboardAuthSettled();
      showAccountantDashboardNotice("Access denied. Accountant account required.");
      return;
    }

    document.getElementById("welcomeTitle").textContent = \`Welcome, \${data.name || user.email || "Accountant"}\`;
    document.getElementById("adminBackBtn").style.display = role === "admin" ? "inline-flex" : "none";
    const profileUid = data.id || user.uid;
    const schoolId = role === "admin" ? profileUid : accountantLinkedSchoolId(data);
    accountantProfile = { uid: profileUid, authUid: user.uid, ...data };
    accountantSchoolId = schoolId;
    $("salaryMonthPicker").value = currentMonth();
    let school = data.schoolName || "";
    if (schoolId) {
      try {
        const adminSnap = await getDoc(doc(db, "users", schoolId));
        school = adminSnap.exists() ? (adminSnap.data().schoolName || school) : school;
      } catch (error) {
        console.warn("Unable to load accountant school profile", error);
      }
      document.getElementById("schoolName").textContent = school || window.SchoolBranding?.getSchoolName() || "Schoolix";
      const sidebarSchool = document.getElementById("sidebarSchoolName");
      if (sidebarSchool) sidebarSchool.textContent = school || "Schoolix";
      await loadSalarySessions();
      await window.loadAccountantSalary();
    } else {
      document.getElementById("schoolName").textContent = "School link missing. Contact admin.";
      resetSalaryCard("School link missing. Contact admin.");
    }
    markAccountantDashboardAuthSettled();
  } catch (error) {
    markAccountantDashboardAuthSettled();
    console.error("Unable to open accountant dashboard", error);
    document.getElementById("schoolName").textContent = "Unable to open accountant panel.";
    resetSalaryCard(error.message || "Unable to open accountant panel.");
  }
});
\r
window.logout = async () => {\r
  await signOut(auth);\r
  window.location.href = "#/index.html";\r
};\r
`},{attributes:{type:"module",src:"access-control.js?v=accountant-guard-20260806-3"},text:""},{attributes:{src:"schoolix-polish.js"},text:""}]};export{n as default};
