const e={file:"admin-signup.html",title:"Schoolix - Super Admin Panel",htmlClass:"",bodyClass:"",body:`\r
<div id="sxPageLoader" class="sx-page-loader" role="status" aria-live="polite">\r
  <section class="dots-container" aria-label="Loading page">\r
    <div class="dot"></div>\r
    <div class="dot"></div>\r
    <div class="dot"></div>\r
    <div class="dot"></div>\r
    <div class="dot"></div>\r
  </section>\r
</div>\r
\r
<header class="workspace-header">\r
  <div class="workspace-brand"><span class="brand-mark">S</span><span>Schoolix</span><span class="workspace-label">Super Admin Workspace</span></div>\r
  <div class="super-admin-top-actions"><button type="button" class="super-admin-logout" onclick="logoutSuperAdmin()">Sign out</button></div>\r
</header>\r
\r
<div class="shell">\r
\r
  <!-- LEFT: Hero + School List -->\r
  <section class="panel hero">\r
    <div class="panel-body">\r
      <div class="eyebrow">Operations overview</div>\r
      <h1>School portfolio</h1>\r
      <p>Manage access, subscriptions, billing records and modules for every school from one workspace.</p>\r
      <div class="admin-summary" aria-label="Portfolio summary">\r
        <div class="summary-cell"><span>Total schools</span><strong id="summaryTotal">0</strong></div>\r
        <div class="summary-cell"><span>Active</span><strong id="summaryActive">0</strong></div>\r
        <div class="summary-cell"><span>Need attention</span><strong id="summaryAttention">0</strong></div>\r
        <div class="summary-cell"><span>Modules controlled</span><strong>11</strong></div>\r
      </div>\r
\r
      <div class="list-head">\r
        <h3>Schools With Access</h3>\r
        <span class="count-badge" id="schoolCount">0 schools</span>\r
      </div>\r
      <div class="school-toolbar">\r
        <input id="schoolSearch" class="school-search" type="search" placeholder="Search by school or admin email">\r
        <select id="schoolStatusFilter" class="school-filter"><option value="all">All status</option><option value="active">Active</option><option value="attention">Needs attention</option><option value="blocked">Blocked</option></select>\r
      </div>\r
\r
      <div class="school-list" id="schoolList">\r
        <div class="empty-state">Loading schools...</div>\r
      </div>\r
    </div>\r
  </section>\r
\r
  <!-- RIGHT: Signup Form -->\r
  <section class="panel form-panel">\r
    <div class="panel-body">\r
      <div class="eyebrow">New school</div>\r
      <h2>Create school workspace</h2>\r
      <p class="sub">Set up the school administrator, branding and first subscription in one step.</p>\r
\r
      <div class="form-grid">\r
        <div class="field">\r
          <label for="schoolName">School Name</label>\r
          <input type="text" id="schoolName" placeholder="e.g. Delhi Public School" required>\r
        </div>\r
        <div class="field">\r
          <label for="adminName">Admin Name</label>\r
          <input type="text" id="adminName" placeholder="Full name" required>\r
        </div>\r
        <div class="field">\r
          <label for="email">Email Address</label>\r
          <input type="email" id="email" placeholder="admin@school.com" required>\r
        </div>\r
        <div class="field">\r
          <label for="password">Password</label>\r
          <input type="password" id="password" placeholder="Minimum 6 characters" required>\r
        </div>\r
        <div class="logo-upload-row">\r
          <div class="school-logo-preview" id="schoolLogoPreview">LOGO</div>\r
          <div class="logo-upload-copy">\r
            <label for="schoolLogo">School Photo / Logo</label>\r
            <input type="file" id="schoolLogo" accept="image/*" onchange="previewSchoolLogo(event)">\r
            <small>This logo will appear for that school's admin, teachers, students and parents.</small>\r
          </div>\r
        </div>\r
        <div class="hint">\r
          New admin gets access to all features by default. You can restrict individual features anytime from the school list.\r
        </div>\r
        <div class="field">\r
          <label for="signupPlan">Subscription Plan</label>\r
          <select id="signupPlan"><option value="Starter">Starter</option><option value="Growth" selected>Growth</option><option value="Enterprise">Enterprise</option></select>\r
        </div>\r
        <div class="field">\r
          <label for="signupExpiry">Licence Expiry</label>\r
          <input type="date" id="signupExpiry" required>\r
        </div>\r
        <button class="submit-btn" onclick="signup()">Create Admin Account</button>\r
      </div>\r
    </div>\r
  </section>\r
\r
</div>\r
\r
<!-- FEATURE CONTROL MODAL -->\r
<div class="modal-overlay" id="featureModal">\r
  <div class="modal">\r
    <div class="modal-header">\r
      <div>\r
        <div class="modal-title" id="modalSchoolName">School Name</div>\r
        <div class="modal-sub" id="modalSchoolEmail">admin@school.com</div>\r
      </div>\r
      <button class="modal-close" onclick="closeModal()" aria-label="Close">x</button>\r
    </div>\r
\r
    <div class="modal-body">\r
      <div class="modal-brand-row">\r
        <div class="modal-logo" id="modalSchoolLogo">S</div>\r
        <div>\r
          <div class="features-head" style="margin:0 0 4px;">School Intelligence</div>\r
          <div class="modal-sub" id="modalSchoolHealth">Loading live school metrics...</div>\r
        </div>\r
      </div>\r
      <div class="insight-grid" id="schoolInsightGrid"></div>\r
      <div class="control-note">\r
        Firebase billable read/write counts are not exposed per school directly in this client panel. The counters below show app data activity available inside Schoolix, and the Operations Audit module can be wired for future per-action counters.\r
      </div>\r
\r
      <!-- Master Access Toggle -->\r
      <div class="access-row">\r
        <div class="access-row-info">\r
          <strong>Platform Access</strong>\r
          <span>Block or allow this school from logging in</span>\r
        </div>\r
        <div class="toggle-wrap">\r
          <span class="toggle-label-text" id="accessLabel">Disabled</span>\r
          <label class="toggle">\r
            <input type="checkbox" id="masterAccessToggle" onchange="updateAccessLabel()">\r
            <span class="slider-track"></span>\r
          </label>\r
        </div>\r
      </div>\r
\r
      <section class="school-profile-panel" aria-label="School profile controls">\r
        <h3>School profile</h3>\r
        <p>Update the school information shown throughout Schoolix. The login email is visible here but is changed through a separate secure credential process.</p>\r
        <div class="school-profile-grid">\r
          <label>School name<input id="profileSchoolName" type="text" maxlength="120"></label>\r
          <label>Administrator name<input id="profileAdminName" type="text" maxlength="100"></label>\r
          <label>Login email<input id="profileAdminEmail" class="profile-readonly" type="email" readonly></label>\r
          <label>Contact number<input id="profilePhone" type="tel" maxlength="30" placeholder="School contact number"></label>\r
          <label>School code<input id="profileSchoolCode" type="text" maxlength="40" placeholder="Optional internal code"></label>\r
          <label>Replace logo<input id="profileSchoolLogo" type="file" accept="image/*"></label>\r
          <label class="profile-wide">Address<textarea id="profileAddress" maxlength="300" placeholder="School address, city and state"></textarea></label>\r
        </div>\r
      </section>\r
\r
      <section class="subscription-panel" aria-label="Subscription and billing controls">\r
        <h3>Subscription & Billing Control</h3>\r
        <p>Expiry automatically blocks every school user at their next protected page check. Set a manual suspension anytime.</p>\r
        <div class="subscription-grid">\r
          <label>Plan<select id="subscriptionPlan"><option value="Starter">Starter</option><option value="Growth">Growth</option><option value="Enterprise">Enterprise</option></select></label>\r
          <label>Status<select id="subscriptionStatus"><option value="active">Active</option><option value="past_due">Payment due</option><option value="suspended">Suspended</option><option value="cancelled">Cancelled</option></select></label>\r
          <label>Expiry date<input id="subscriptionExpiresAt" type="date"></label>\r
          <label>Billing amount (₹)<input id="paymentAmount" type="number" min="0" step="0.01" placeholder="Optional renewal payment"></label>\r
          <label>Payment date<input id="paymentDate" type="date"></label>\r
          <label>Reference / note<input id="paymentReference" maxlength="100" placeholder="Invoice or transaction ID"></label>\r
        </div>\r
        <div class="subscription-summary" id="subscriptionSummary">Loading subscription...</div>\r
        <div class="billing-history"><h4>Recent payment records</h4><div id="billingHistory"><div class="billing-empty">Loading records...</div></div></div>\r
      </section>\r
\r
      <!-- Feature Toggles -->\r
      <div class="features-head">Module-Level Control</div>\r
      <div class="features-grid" id="featuresGrid"></div>\r
    </div>\r
\r
    <div class="modal-footer">\r
      <button class="btn-cancel" onclick="closeModal()">Cancel</button>\r
      <button class="btn-save" onclick="saveFeatures()">Save Changes</button>\r
    </div>\r
  </div>\r
</div>\r
\r
<!-- Toast -->\r
<div class="toast" id="toast"></div>\r
\r
<script type="module">\r
import { initializeApp }\r
  from "./firebase-compat.js";\r
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut }\r
  from "./firebase-compat.js";\r
import {\r
  getFirestore, doc, setDoc, collection,\r
  getDocs, updateDoc, deleteDoc, getDoc, query, where, limit\r
} from "./firebase-compat.js";\r
\r
const firebaseConfig = {\r
  apiKey: "AIzaSyAomGwef93HFT9Xyx7SVW95FPw_IcIAICE",\r
  authDomain: "schoolix-48107.firebaseapp.com",\r
  projectId: "schoolix-48107"\r
};\r
\r
const app = initializeApp(firebaseConfig);\r
const auth = getAuth(app);
const db = getFirestore(app);
const adminCreatorApp = initializeApp(firebaseConfig, "superAdminCreatorApp");
const adminCreatorAuth = getAuth(adminCreatorApp);
const SUPER_ADMIN_EMAIL = "anshbajpai4@gmail.com";
const SUPABASE_URL = "https://ezkmeedcqetztkeppxil.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6a21lZWRjcWV0enRrZXBweGlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxMjk5NjAsImV4cCI6MjA5MzcwNTk2MH0.1davJ_NYkFhHToUtcFBR0kA6dk0-cOkaIbK2SCObkQg";
const CREATE_SCHOOL_ADMIN_URL = \`\${SUPABASE_URL}/functions/v1/create-school-admin\`;
\r
// ---- FEATURE DEFINITIONS ----\r
const ICONS = {\r
  dashboard: \`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 13h4v7H4v-7Zm6-9h4v16h-4V4Zm6 5h4v11h-4V9Z"/></svg>\`,\r
  teachers: \`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-8 8a8 8 0 0 1 16 0H4Z"/></svg>\`,\r
  students: \`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 2 8l10 5 10-5-10-5Zm-7 9v4l7 4 7-4v-4l-7 3.5L5 12Z"/></svg>\`,\r
  attendance: \`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h10v2h3v16H4V5h3V3Zm2 4H6v12h12V7h-3v2H9V7Zm1 6h6v2h-6v-2Z"/></svg>\`,\r
  payroll: \`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16v12H4V6Zm2 2v8h12V8H6Zm6 7a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/></svg>\`,\r
  library: \`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h12a2 2 0 0 1 2 2v14H7a2 2 0 0 1-2-2V4Zm2 0v14h10V6H7Zm2 4h6v2H9V8Z"/></svg>\`,\r
  timetable: \`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 2h2v3h6V2h2v3h3v17H4V5h3V2Zm-1 8v10h12V10H6Zm2 2h3v3H8v-3Z"/></svg>\`,\r
  transport: \`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4h12l2 5v8h-2a2 2 0 0 1-4 0h-4a2 2 0 0 1-4 0H4V9l2-5Zm1.2 2L6.4 8h11.2l-.8-2H7.2Z"/></svg>\`,\r
  reports: \`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h7l2 2h7v12H4V5Zm3 8h10v-2H7v2Zm0 4h7v-2H7v2Z"/></svg>\`,\r
  announcements: \`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10v4h4l7 4V6l-7 4H4Zm13-1.5v7a4 4 0 0 0 0-7Z"/></svg>\`,\r
  settings: \`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m19.4 13.5.1-1.5-.1-1.5 2-1.5-2-3.5-2.4 1a8 8 0 0 0-2.6-1.5L14 2h-4l-.4 2.5A8 8 0 0 0 7 6L4.6 5l-2 3.5 2 1.5-.1 1.5.1 1.5-2 1.5 2 3.5 2.4-1a8 8 0 0 0 2.6 1.5L10 22h4l.4-2.5A8 8 0 0 0 17 18l2.4 1 2-3.5-2-1.5ZM12 15.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Z"/></svg>\`\r
};\r
\r
const FEATURES = [\r
  { key: "dashboard",      label: "Dashboard",      desc: "Main overview & stats",       icon: ICONS.dashboard, color: "rgba(59,110,248,0.12)"  },\r
  { key: "teachers",       label: "Teachers",        desc: "Teacher management module",   icon: ICONS.teachers, color: "rgba(168,85,247,0.12)" },\r
  { key: "students",       label: "Students",        desc: "Student records & profiles",  icon: ICONS.students, color: "rgba(20,184,166,0.12)"  },\r
  { key: "attendance",     label: "Attendance",      desc: "Daily attendance tracking",   icon: ICONS.attendance, color: "rgba(245,158,11,0.12)"  },\r
  { key: "payroll",        label: "Payroll",         desc: "Salary & payment processing", icon: ICONS.payroll, color: "rgba(34,197,94,0.12)"   },\r
  { key: "library",        label: "Library",         desc: "Books, issues and returns",    icon: ICONS.library, color: "rgba(14,165,233,0.12)"   },\r
  { key: "timetable",      label: "Timetable",       desc: "Class and teacher schedules",  icon: ICONS.timetable, color: "rgba(236,72,153,0.12)" },\r
  { key: "transport",      label: "Transport",       desc: "Vehicles, routes and tracking", icon: ICONS.transport, color: "rgba(132,204,22,0.12)" },\r
  { key: "reports",        label: "Reports",         desc: "Analytics & report exports",  icon: ICONS.reports, color: "rgba(239,68,68,0.12)"   },\r
  { key: "announcements",  label: "Announcements",   desc: "School-wide notices",         icon: ICONS.announcements, color: "rgba(99,102,241,0.12)"  },\r
  { key: "settings",       label: "Settings",        desc: "School config & branding",    icon: ICONS.settings, color: "rgba(100,116,139,0.12)" },\r
];\r
// ---- CURRENT MODAL STATE ----\r
let currentUID = null;\r
let currentData = null;\r
let signupInProgress = false;\r
const CLOUDINARY_CLOUD_NAME = "fthnumnk";\r
const CLOUDINARY_UPLOAD_PRESET = "schoolix_student_photos";\r
\r
function isoDate(value) {\r
  const date = toJsDate(value);\r
  return date ? date.toISOString().slice(0, 10) : "";\r
}\r
\r
function defaultExpiryDate() {\r
  const date = new Date();\r
  date.setFullYear(date.getFullYear() + 1);\r
  return date.toISOString().slice(0, 10);\r
}\r
\r
function subscriptionState(data = {}) {\r
  const subscription = data.subscription || {};\r
  const expiresAt = isoDate(subscription.expiresAt || data.subscriptionExpiresAt);\r
  const status = String(subscription.status || "active").toLowerCase();\r
  const expired = Boolean(expiresAt && new Date(\`\${expiresAt}T23:59:59\`).getTime() < Date.now());\r
  const blocked = ["suspended", "cancelled"].includes(status) || expired;\r
  return { plan: subscription.plan || "Growth", status: expired ? "expired" : status, expiresAt, expired, blocked };\r
}\r
\r
function subscriptionLabel(data = {}) {\r
  const sub = subscriptionState(data);\r
  if (sub.status === "expired") return \`Expired \${sub.expiresAt || ""}\`.trim();\r
  if (sub.status === "suspended") return "Suspended";\r
  if (sub.status === "past_due") return "Payment due";\r
  if (sub.status === "cancelled") return "Cancelled";\r
  return \`Active · expires \${sub.expiresAt || "not set"}\`;\r
}\r
\r
function normalizeEmail(value = "") {\r
  return String(value || "").trim().toLowerCase();\r
}\r
\r
function isAuthorizedSuperAdmin(user) {\r
  return normalizeEmail(user?.email) === SUPER_ADMIN_EMAIL;\r
}\r
\r
function redirectUnauthorized() {\r
  resetSchoolList("Super admin login required.");\r
  window.setTimeout(() => {\r
    window.location.replace("#/index.html?access_error=" + encodeURIComponent("Only the authorized Super Admin can access this page."));\r
  }, 250);\r
}\r
\r
function escapeHtml(value = "") {\r
  return String(value ?? "")\r
    .replace(/&/g, "&amp;")\r
    .replace(/</g, "&lt;")\r
    .replace(/>/g, "&gt;")\r
    .replace(/"/g, "&quot;")\r
    .replace(/'/g, "&#39;");\r
}\r
\r
function jsString(value = "") {\r
  return String(value ?? "").replace(/\\\\/g, "\\\\\\\\").replace(/'/g, "\\\\'").replace(/\\n/g, " ");\r
}\r
\r
function renderLogo(url = "", fallback = "S") {\r
  const safeUrl = String(url || "").trim();\r
  return safeUrl ? \`<img src="\${escapeHtml(safeUrl)}" alt="School logo">\` : escapeHtml(fallback || "S");\r
}\r
\r
window.previewSchoolLogo = (event) => {\r
  const file = event.target.files?.[0];\r
  const preview = document.getElementById("schoolLogoPreview");\r
  if (!preview) return;\r
  if (!file) {\r
    preview.textContent = "LOGO";\r
    return;\r
  }\r
  preview.innerHTML = \`<img src="\${URL.createObjectURL(file)}" alt="School logo preview">\`;\r
};\r
\r
async function uploadSchoolLogo(file, schoolName) {\r
  if (!file) return { logoUrl: "", logoPublicId: "" };\r
  if (!file.type.startsWith("image/")) throw new Error("Please select an image file for school logo.");\r
  if (file.size > 5 * 1024 * 1024) throw new Error("School logo must be under 5 MB.");\r
  const form = new FormData();\r
  form.append("file", file);\r
  form.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);\r
  form.append("folder", "schoolix/school_logos");\r
  form.append("public_id", \`\${schoolName.replace(/[^a-zA-Z0-9_-]/g, "_")}_\${Date.now()}\`);\r
  const response = await fetch(\`https://api.cloudinary.com/v1_1/\${encodeURIComponent(CLOUDINARY_CLOUD_NAME)}/image/upload\`, {\r
    method: "POST",\r
    body: form\r
  });\r
  const data = await response.json().catch(() => ({}));\r
  if (!response.ok) throw new Error(data.error?.message || "School logo upload failed.");\r
  return { logoUrl: data.secure_url || data.url || "", logoPublicId: data.public_id || "" };\r
}\r
\r
// ---- TOAST ----\r
function showToast(msg, type = "success") {\r
  const t = document.getElementById("toast");\r
  t.textContent = msg;\r
  t.className = "toast " + type + " show";\r
  setTimeout(() => t.className = "toast", 2800);\r
}\r
\r
window.logoutSuperAdmin = async () => {\r
  try {\r
    await signOut(auth);\r
    window.location.replace("#/index.html");\r
  } catch (error) {\r
    showToast(error.message || "Unable to logout.", "error");\r
  }\r
};\r
\r
// ---- INITIALS ----\r
function initials(name = "") {\r
  return name.trim().split(" ").slice(0,2).map(w => w[0]?.toUpperCase() || "").join("");\r
}\r
\r
// ---- SIGNUP ----\r
window.signup = async () => {\r
  if (!isAuthorizedSuperAdmin(auth.currentUser)) {\r
    showToast("Only authorized Super Admin can create schools.", "error");\r
    return;\r
  }\r
  if (signupInProgress) return;\r
  const schoolName = document.getElementById("schoolName").value.trim();\r
  const adminName  = document.getElementById("adminName").value.trim();\r
  const email      = normalizeEmail(document.getElementById("email").value);\r
  const password   = document.getElementById("password").value;\r
  const logoFile   = document.getElementById("schoolLogo")?.files?.[0] || null;\r
  const plan = document.getElementById("signupPlan").value;\r
  const expiresAt = document.getElementById("signupExpiry").value;\r
\r
  if (!schoolName || !adminName || !email || !password) {\r
    showToast("Please fill all fields", "error"); return;\r
  }\r
  if (password.length < 6) {\r
    showToast("Password must be at least 6 characters", "error"); return;\r
  }\r
  if (!expiresAt) {\r
    showToast("Please set the school licence expiry date", "error"); return;\r
  }\r
\r
  const btn = document.querySelector(".submit-btn");\r
  btn.textContent = "Creating...";\r
  btn.disabled = true;\r
  signupInProgress = true;\r
\r
  try {\r
    const existing = await getDocs(query(collection(db, "users"), where("email", "==", email), limit(1)));\r
    if (!existing.empty) {\r
      showToast("This admin email already has a school account.", "error");\r
      return;\r
    }\r
\r
    // Default: all features ON
    const defaultFeatures = {};
    FEATURES.forEach(f => defaultFeatures[f.key] = true);

    const logoUpload = await uploadSchoolLogo(logoFile, schoolName);
    const token = await auth.currentUser?.getIdToken(true);
    if (!token) throw new Error("Super admin session expired. Please login again.");
    const response = await fetch(CREATE_SCHOOL_ADMIN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": \`Bearer \${token}\`
      },
      body: JSON.stringify({
        schoolName,
        adminName,
        email,
        password,
        logoUrl: logoUpload.logoUrl,
        schoolLogoUrl: logoUpload.logoUrl,
        logoPublicId: logoUpload.logoPublicId,
        features: defaultFeatures,\r
        subscription: { plan, status: "active", expiresAt }\r
      })
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok || !result.success) throw new Error(result.error || "Unable to create admin account.");

    await setDoc(doc(db, "schools", result.uid), {
      schoolName,
      name: schoolName,
      adminName,
      adminEmail: email,
      logoUrl: logoUpload.logoUrl,\r
      schoolLogoUrl: logoUpload.logoUrl,\r
      logoPublicId: logoUpload.logoPublicId,\r
      access: true,\r
      features: defaultFeatures,\r
      subscription: { plan, status: "active", expiresAt },\r
      onboardingRequired: true,\r
      onboardingCompleted: false,\r
      onboardingVersion: 1,\r
      createdAt: new Date(),\r
      createdBy: auth.currentUser?.uid || "",\r
      createdByEmail: SUPER_ADMIN_EMAIL
    }, { merge: true });
    await setDoc(doc(db, "users", result.uid), {\r
      access: true,\r
      features: defaultFeatures,\r
      subscription: { plan, status: "active", expiresAt },\r
      updatedAt: new Date()\r
    }, { merge: true });\r

    showToast(\`Admin created for \${schoolName}\`);
    ["schoolName","adminName","email","password"].forEach(id => document.getElementById(id).value = "");\r
    document.getElementById("signupExpiry").value = defaultExpiryDate();\r
    const logoInput = document.getElementById("schoolLogo");\r
    if (logoInput) logoInput.value = "";\r
    const logoPreview = document.getElementById("schoolLogoPreview");\r
    if (logoPreview) logoPreview.textContent = "LOGO";\r
    loadSchools();\r
  } catch(e) {\r
    showToast(e.message, "error");\r
  } finally {\r
    await signOut(adminCreatorAuth).catch(() => {});\r
    signupInProgress = false;\r
    btn.textContent = "Create Admin Account";\r
    btn.disabled = false;\r
  }\r
};\r
\r
function resetSchoolList(message = "Loading...") {\r
  const list = document.getElementById("schoolList");\r
  const countBadge = document.getElementById("schoolCount");\r
  countBadge.textContent = "0 schools";\r
  list.innerHTML = \`<div class="empty-state">\${message}</div>\`;\r
}\r
\r
function toJsDate(value) {\r
  if (!value) return null;\r
  if (typeof value.toDate === "function") return value.toDate();\r
  if (typeof value.seconds === "number") return new Date(value.seconds * 1000);\r
  const parsed = new Date(value);\r
  return Number.isNaN(parsed.getTime()) ? null : parsed;\r
}\r
\r
function isToday(value) {\r
  const date = toJsDate(value);\r
  if (!date) return false;\r
  const today = new Date();\r
  return date.getFullYear() === today.getFullYear() &&\r
    date.getMonth() === today.getMonth() &&\r
    date.getDate() === today.getDate();\r
}\r
\r
async function countCollection(pathParts) {\r
  try {\r
    const snap = await getDocs(collection(db, ...pathParts));\r
    return snap.size;\r
  } catch (_) {\r
    return 0;\r
  }\r
}\r
\r
function teacherCountKey(data = {}, fallbackId = "") {\r
  return String(\r
    data.authUid ||\r
    data.uid ||\r
    data.teacherId ||\r
    data.email ||\r
    fallbackId ||\r
    ""\r
  ).trim().toLowerCase();\r
}\r
\r
async function countTeachersForSchool(uid, teachersSnap) {\r
  const teacherKeys = new Set();\r
  (teachersSnap.docs || []).forEach((item) => {\r
    const key = teacherCountKey(item.data?.() || {}, item.id);\r
    if (key) teacherKeys.add(key);\r
  });\r
\r
  const userQueries = ["teacher", "teachers"].flatMap((teacherRole) => [\r
    query(collection(db, "users"), where("role", "==", teacherRole), where("adminId", "==", uid)),\r
    query(collection(db, "users"), where("role", "==", teacherRole), where("schoolId", "==", uid)),\r
    query(collection(db, "users"), where("role", "==", teacherRole), where("adminUID", "==", uid)),\r
    query(collection(db, "users"), where("role", "==", teacherRole), where("adminUid", "==", uid))\r
  ]);\r
\r
  const userSnaps = await Promise.all(userQueries.map((teacherQuery) => getDocs(teacherQuery).catch(() => ({ docs: [] }))));\r
  userSnaps.forEach((snap) => {\r
    (snap.docs || []).forEach((item) => {\r
      const data = item.data?.() || {};\r
      const key = teacherCountKey(data, item.id);\r
      if (key) teacherKeys.add(key);\r
    });\r
  });\r
\r
  return teacherKeys.size;\r
}\r
\r
async function loadSchoolMetrics(uid) {\r
  const [\r
    studentsSnap,\r
    teachersSnap,\r
    attendanceSnap,\r
    feesSnap,\r
    reportsSnap,\r
    notificationsSnap,\r
    devicesSnap,\r
    accountsSnap\r
  ] = await Promise.all([\r
    getDocs(collection(db, "schools", uid, "students")).catch(() => ({ docs: [], size: 0 })),\r
    getDocs(collection(db, "schools", uid, "teachers")).catch(() => ({ docs: [], size: 0 })),\r
    getDocs(collection(db, "schools", uid, "attendance")).catch(() => ({ docs: [], size: 0 })),\r
    getDocs(collection(db, "schools", uid, "fees")).catch(() => ({ docs: [], size: 0 })),\r
    getDocs(collection(db, "schools", uid, "reportCards")).catch(() => ({ docs: [], size: 0 })),\r
    getDocs(collection(db, "schools", uid, "notifications")).catch(() => ({ docs: [], size: 0 })),\r
    getDocs(collection(db, "schools", uid, "notificationDevices")).catch(() => ({ docs: [], size: 0 })),\r
    getDocs(collection(db, "schools", uid, "accounts")).catch(() => ({ docs: [], size: 0 }))\r
  ]);\r
  const attendanceRows = attendanceSnap.docs.map((item) => item.data());\r
  const notificationRows = notificationsSnap.docs.map((item) => item.data());\r
  const todayAttendance = attendanceRows.filter((item) => isToday(item.date || item.timestamp || item.createdAt));\r
  const todayAbsent = todayAttendance.filter((item) => String(item.status || "").toLowerCase() === "absent");\r
  const todayEmails = attendanceRows.filter((item) => item.absenceEmailSent === true && isToday(item.absenceEmailSentAt || item.timestamp || item.date));\r
  const todayNotifications = notificationRows.filter((item) => isToday(item.createdAt));\r
  const writeEstimate = todayAttendance.length + todayNotifications.length + todayEmails.length;\r
  const teacherCount = await countTeachersForSchool(uid, teachersSnap);\r
  return {\r
    students: studentsSnap.size,\r
    teachers: teacherCount,\r
    attendance: attendanceSnap.size,\r
    todayAttendance: todayAttendance.length,\r
    todayAbsent: todayAbsent.length,\r
    todayEmails: todayEmails.length,\r
    fees: feesSnap.size,\r
    reports: reportsSnap.size,\r
    notifications: notificationsSnap.size,\r
    todayNotifications: todayNotifications.length,\r
    devices: devicesSnap.size,\r
    accounts: accountsSnap.size,\r
    writeEstimate\r
  };\r
}\r
\r
function renderInsightGrid(metrics = {}) {\r
  const rows = [\r
    ["Students", metrics.students || 0],\r
    ["Teachers", metrics.teachers || 0],\r
    ["Today attendance", metrics.todayAttendance || 0],\r
    ["Today absent", metrics.todayAbsent || 0],\r
    ["Emails today", metrics.todayEmails || 0],\r
    ["Push today", metrics.todayNotifications || 0],\r
    ["Reports", metrics.reports || 0],\r
    ["Fee records", metrics.fees || 0],\r
    ["Devices", metrics.devices || 0],\r
    ["Accounts", metrics.accounts || 0],\r
    ["Audit writes est.", metrics.writeEstimate || 0],\r
    ["Total attendance", metrics.attendance || 0]\r
  ];\r
  return rows.map(([label, value]) => \`<div class="insight-card"><span>\${label}</span><strong>\${Number(value || 0).toLocaleString("en-IN")}</strong></div>\`).join("");\r
}\r
\r
function updatePortfolioSummary(schools = []) {\r
  const active = schools.filter((school) => school.access !== false && !subscriptionState(school).blocked).length;\r
  const attention = schools.filter((school) => {\r
    const state = subscriptionState(school);\r
    return state.status === "past_due" || state.expired || state.blocked || school.access === false;\r
  }).length;\r
  document.getElementById("summaryTotal").textContent = schools.length.toLocaleString("en-IN");\r
  document.getElementById("summaryActive").textContent = active.toLocaleString("en-IN");\r
  document.getElementById("summaryAttention").textContent = attention.toLocaleString("en-IN");\r
}\r
\r
function applySchoolFilters() {\r
  const search = String(document.getElementById("schoolSearch")?.value || "").trim().toLowerCase();\r
  const filter = String(document.getElementById("schoolStatusFilter")?.value || "all");\r
  document.querySelectorAll(".school-card").forEach((card) => {\r
    const matchesSearch = !search || String(card.dataset.search || "").includes(search);\r
    const matchesStatus = filter === "all" || card.dataset.status === filter;\r
    card.hidden = !(matchesSearch && matchesStatus);\r
  });\r
}\r
\r
// ---- LOAD SCHOOLS ----\r
async function loadSchools() {\r
  const list = document.getElementById("schoolList");\r
  const countBadge = document.getElementById("schoolCount");\r
  list.innerHTML = \`<div class="empty-state">Loading...</div>\`;\r
\r
  try {\r
    const snap = await getDocs(collection(db, "users"));\r
    const schools = [];\r
    snap.forEach(d => {\r
      const data = d.data();\r
      if (data.schoolName && String(data.role || "").toLowerCase() === "admin") schools.push({ uid: d.id, ...data });\r
    });\r
\r
    countBadge.textContent = schools.length + " school" + (schools.length !== 1 ? "s" : "");\r
    updatePortfolioSummary(schools);\r
\r
    if (!schools.length) {\r
      list.innerHTML = \`<div class="empty-state">No schools registered yet.</div>\`;\r
      return;\r
    }\r
\r
    const metricEntries = await Promise.all(schools.map(async (school) => [school.uid, await loadSchoolMetrics(school.uid)]));\r
    const metricsBySchool = Object.fromEntries(metricEntries);\r
\r
    list.innerHTML = schools.map(s => {\r
      const subscription = subscriptionState(s);\r
      const on = s.access !== false && !subscription.blocked;\r
      const portfolioStatus = !on ? "blocked" : (subscription.status === "past_due" ? "attention" : "active");\r
      const ini = initials(s.schoolName);\r
      const featOn = s.features ? Object.values(s.features).filter(Boolean).length : FEATURES.length;\r
      const metrics = metricsBySchool[s.uid] || {};\r
      return \`\r
      <div class="school-card" id="card-\${s.uid}" data-status="\${portfolioStatus}" data-search="\${escapeHtml(\`\${s.schoolName || ""} \${s.email || ""} \${s.adminEmail || ""}\`).toLowerCase()}">\r
        <div class="card-main">\r
          <div class="school-avatar">\${renderLogo(s.logoUrl || s.schoolLogoUrl || "", ini)}</div>\r
          <div class="card-info">\r
            <div class="card-name">\${escapeHtml(s.schoolName)}</div>\r
            <div class="card-meta">\r
              <span class="status-dot \${on ? 'on' : 'off'}"></span>\r
              \${on ? "Access Enabled" : "Access blocked"} &nbsp;|&nbsp;\r
              \${featOn}/\${FEATURES.length} modules\r
            </div>\r
            <div class="card-meta" style="margin-top:4px;color:\${subscription.blocked ? '#f87171' : '#94a3b8'}">\${escapeHtml(subscriptionLabel(s))}</div>\r
          </div>\r
        </div>\r
        <div class="school-card-stats">\r
          <div class="school-card-stat"><strong>\${metrics.students || 0}</strong><span>Students</span></div>\r
          <div class="school-card-stat"><strong>\${metrics.teachers || 0}</strong><span>Teachers</span></div>\r
          <div class="school-card-stat"><strong>\${metrics.todayEmails || 0}</strong><span>Mails today</span></div>\r
          <div class="school-card-stat"><strong>\${metrics.writeEstimate || 0}</strong><span>Ops today</span></div>\r
        </div>\r
        <div class="card-actions">\r
          <button class="btn \${on ? 'btn-toggle-on' : 'btn-toggle-off'}"\r
            onclick="quickToggle('\${s.uid}', \${on})">\r
            \${on ? "Disable" : "Enable"}\r
          </button>\r
          <button class="btn btn-features"\r
            onclick="openModal('\${s.uid}')">\r
            Manage school\r
          </button>\r
          <button class="btn btn-delete"\r
            onclick="deleteSchool('\${s.uid}', '\${jsString(s.schoolName)}')">\r
            Delete\r
          </button>\r
        </div>\r
      </div>\`;\r
    }).join("");\r
    applySchoolFilters();\r
  } catch(e) {\r
    list.innerHTML = \`<div class="empty-state">Failed to load schools.</div>\`;\r
    console.error(e);\r
  }\r
}\r
\r
// ---- QUICK TOGGLE ACCESS ----\r
window.quickToggle = async (uid, currentAccess) => {\r
  if (!isAuthorizedSuperAdmin(auth.currentUser)) return showToast("Unauthorized access.", "error");\r
  try {\r
    await updateDoc(doc(db, "users", uid), { access: !currentAccess });\r
    await setDoc(doc(db, "schools", uid), { access: !currentAccess, updatedAt: new Date() }, { merge: true });\r
    showToast(currentAccess ? "Access disabled" : "Access enabled");\r
    loadSchools();\r
  } catch(e) { showToast(e.message, "error"); }\r
};\r
\r
// ---- OPEN MODAL ----\r
window.openModal = async (uid) => {\r
  if (!isAuthorizedSuperAdmin(auth.currentUser)) return showToast("Unauthorized access.", "error");\r
  currentUID = uid;\r
  try {\r
    const snap = await getDoc(doc(db, "users", uid));\r
    if (!snap.exists()) { showToast("School not found", "error"); return; }\r
    const schoolSnap = await getDoc(doc(db, "schools", uid)).catch(() => null);\r
    currentData = { ...(schoolSnap?.exists?.() ? schoolSnap.data() : {}), ...snap.data() };\r
\r
    document.getElementById("modalSchoolName").textContent = currentData.schoolName;\r
    document.getElementById("modalSchoolEmail").textContent = currentData.email;\r
    document.getElementById("modalSchoolLogo").innerHTML = renderLogo(currentData.logoUrl || currentData.schoolLogoUrl || "", initials(currentData.schoolName));\r
    document.getElementById("schoolInsightGrid").innerHTML = \`<div class="empty-state" style="grid-column:1/-1;">Loading live metrics...</div>\`;\r
    document.getElementById("modalSchoolHealth").textContent = "Loading live school metrics...";\r
    loadSchoolMetrics(uid).then((metrics) => {\r
      if (currentUID !== uid) return;\r
      document.getElementById("schoolInsightGrid").innerHTML = renderInsightGrid(metrics);\r
      document.getElementById("modalSchoolHealth").textContent =\r
        \`\${metrics.students} students, \${metrics.teachers} teachers, \${metrics.todayEmails} mails today, \${metrics.writeEstimate} estimated app writes today\`;\r
    }).catch(() => {\r
      document.getElementById("schoolInsightGrid").innerHTML = \`<div class="empty-state" style="grid-column:1/-1;">Unable to load metrics.</div>\`;\r
    });\r
\r
    // Master access toggle\r
    const toggle = document.getElementById("masterAccessToggle");\r
    toggle.checked = currentData.access !== false;\r
    updateAccessLabel();\r
    document.getElementById("profileSchoolName").value = currentData.schoolName || currentData.name || "";\r
    document.getElementById("profileAdminName").value = currentData.adminName || currentData.name || "";\r
    document.getElementById("profileAdminEmail").value = currentData.adminEmail || currentData.email || "";\r
    document.getElementById("profilePhone").value = currentData.phone || currentData.contactNumber || "";\r
    document.getElementById("profileSchoolCode").value = currentData.schoolCode || "";\r
    document.getElementById("profileAddress").value = currentData.address || "";\r
    document.getElementById("profileSchoolLogo").value = "";\r
    const subscription = subscriptionState(currentData);\r
    document.getElementById("subscriptionPlan").value = subscription.plan;\r
    document.getElementById("subscriptionStatus").value = subscription.status === "expired" ? "past_due" : subscription.status;\r
    document.getElementById("subscriptionExpiresAt").value = subscription.expiresAt;\r
    document.getElementById("paymentAmount").value = "";\r
    document.getElementById("paymentDate").value = new Date().toISOString().slice(0, 10);\r
    document.getElementById("paymentReference").value = "";\r
    document.getElementById("subscriptionSummary").textContent = \`\${subscription.plan} · \${subscriptionLabel(currentData)}\${subscription.blocked ? " — school access is blocked" : ""}\`;\r
    loadBillingHistory(uid);\r
\r
    // Build feature rows\r
    const grid = document.getElementById("featuresGrid");\r
    const features = currentData.features || {};\r
    grid.innerHTML = FEATURES.map(f => {\r
      const enabled = features[f.key] !== false;\r
      return \`\r
      <div class="feature-row">\r
        <div class="feature-row-left">\r
          <div class="feature-icon" style="background:\${f.color}">\${f.icon}</div>\r
          <div class="feature-row-info">\r
            <strong>\${f.label}</strong>\r
            <span>\${f.desc}</span>\r
          </div>\r
        </div>\r
        <label class="mini-toggle">\r
          <input type="checkbox" id="feat-\${f.key}" \${enabled ? "checked" : ""}>\r
          <span class="mini-track"></span>\r
        </label>\r
      </div>\`;\r
    }).join("");\r
\r
    document.getElementById("featureModal").classList.add("open");\r
  } catch(e) { showToast(e.message, "error"); }\r
};\r
\r
async function loadBillingHistory(uid) {\r
  const target = document.getElementById("billingHistory");\r
  if (!target) return;\r
  target.innerHTML = \`<div class="billing-empty">Loading records...</div>\`;\r
  try {\r
    const snap = await getDocs(collection(db, "schools", uid, "billingPayments"));\r
    const rows = snap.docs.map((item) => ({ id: item.id, ...item.data() }))\r
      .sort((a, b) => String(b.paymentDate || b.createdAt || "").localeCompare(String(a.paymentDate || a.createdAt || ""))).slice(0, 8);\r
    target.innerHTML = rows.length ? rows.map((payment) => \`<div class="billing-item"><div><strong>₹\${Number(payment.amount || 0).toLocaleString("en-IN")}</strong><span>\${escapeHtml(payment.reference || "Payment recorded")}</span></div><span>\${escapeHtml(payment.paymentDate || "")}</span></div>\`).join("") : \`<div class="billing-empty">No payments recorded for this school yet.</div>\`;\r
  } catch (_) {\r
    target.innerHTML = \`<div class="billing-empty">Payment history could not be loaded.</div>\`;\r
  }\r
}\r
\r
// ---- CLOSE MODAL ----\r
window.closeModal = () => {\r
  document.getElementById("featureModal").classList.remove("open");\r
  currentUID = null;\r
  currentData = null;\r
};\r
\r
// Close on overlay click\r
document.getElementById("featureModal").addEventListener("click", function(e) {\r
  if (e.target === this) closeModal();\r
});\r
\r
document.getElementById("schoolSearch").addEventListener("input", applySchoolFilters);\r
document.getElementById("schoolStatusFilter").addEventListener("change", applySchoolFilters);\r
\r
// ---- UPDATE ACCESS LABEL ----\r
window.updateAccessLabel = () => {\r
  const checked = document.getElementById("masterAccessToggle").checked;\r
  document.getElementById("accessLabel").textContent = checked ? "Enabled" : "Disabled";\r
  document.getElementById("accessLabel").style.color = checked ? "#4ade80" : "#f87171";\r
};\r
\r
// ---- SAVE FEATURES ----\r
window.saveFeatures = async () => {\r
  if (!isAuthorizedSuperAdmin(auth.currentUser)) return showToast("Unauthorized access.", "error");\r
  if (!currentUID) return;\r
  const saveBtn = document.querySelector(".btn-save");\r
  saveBtn.textContent = "Saving...";\r
  saveBtn.disabled = true;\r
\r
  try {\r
    const newAccess = document.getElementById("masterAccessToggle").checked;\r
    const newFeatures = {};\r
    FEATURES.forEach(f => {\r
      newFeatures[f.key] = document.getElementById("feat-" + f.key).checked;\r
    });\r
    const subscription = {\r
      plan: document.getElementById("subscriptionPlan").value,\r
      status: document.getElementById("subscriptionStatus").value,\r
      expiresAt: document.getElementById("subscriptionExpiresAt").value\r
    };\r
    if (!subscription.expiresAt) throw new Error("Set a licence expiry date before saving.");\r
    const paymentAmount = Number(document.getElementById("paymentAmount").value || 0);\r
    const paymentDate = document.getElementById("paymentDate").value;\r
    const paymentReference = document.getElementById("paymentReference").value.trim();\r
    if (paymentAmount > 0 && !paymentDate) throw new Error("Set a payment date for the recorded payment.");\r
    const schoolDetails = {\r
      schoolName: document.getElementById("profileSchoolName").value.trim(),\r
      name: document.getElementById("profileSchoolName").value.trim(),\r
      adminName: document.getElementById("profileAdminName").value.trim(),\r
      phone: document.getElementById("profilePhone").value.trim(),\r
      contactNumber: document.getElementById("profilePhone").value.trim(),\r
      schoolCode: document.getElementById("profileSchoolCode").value.trim(),\r
      address: document.getElementById("profileAddress").value.trim()\r
    };\r
    if (!schoolDetails.schoolName || !schoolDetails.adminName) throw new Error("School name and administrator name are required.");\r
    const replacementLogo = document.getElementById("profileSchoolLogo").files?.[0] || null;\r
    if (replacementLogo) {\r
      const logoUpload = await uploadSchoolLogo(replacementLogo, schoolDetails.schoolName);\r
      Object.assign(schoolDetails, logoUpload, { schoolLogoUrl: logoUpload.logoUrl });\r
    }\r
\r
    await updateDoc(doc(db, "users", currentUID), {\r
      access: newAccess,\r
      features: newFeatures,\r
      subscription,\r
      ...schoolDetails,\r
      name: schoolDetails.adminName\r
    });\r
    await setDoc(doc(db, "schools", currentUID), {\r
      access: newAccess,\r
      features: newFeatures,\r
      subscription,\r
      ...schoolDetails,\r
      updatedAt: new Date(),\r
      updatedBy: auth.currentUser?.email || SUPER_ADMIN_EMAIL\r
    }, { merge: true });\r
    if (replacementLogo) {\r
      await setDoc(doc(db, "schools", currentUID, "config", "branding"), {\r
        schoolName: schoolDetails.schoolName,\r
        logoUrl: schoolDetails.logoUrl,\r
        schoolLogoUrl: schoolDetails.schoolLogoUrl,\r
        logoPublicId: schoolDetails.logoPublicId,\r
        updatedAt: new Date(),\r
        updatedBy: auth.currentUser?.email || SUPER_ADMIN_EMAIL\r
      }, { merge: true });\r
    }\r
    if (paymentAmount > 0) {\r
      const paymentRef = doc(collection(db, "schools", currentUID, "billingPayments"));\r
      await setDoc(paymentRef, { amount: paymentAmount, paymentDate, reference: paymentReference, plan: subscription.plan, recordedAt: new Date(), recordedBy: auth.currentUser?.email || SUPER_ADMIN_EMAIL });\r
    }\r
\r
    showToast("Settings saved successfully");\r
    closeModal();\r
    loadSchools();\r
  } catch(e) {\r
    showToast(e.message, "error");\r
  } finally {\r
    saveBtn.textContent = "Save Changes";\r
    saveBtn.disabled = false;\r
  }\r
};\r
\r
// ---- DELETE SCHOOL ----\r
window.deleteSchool = async (uid, name) => {\r
  if (!isAuthorizedSuperAdmin(auth.currentUser)) return showToast("Unauthorized access.", "error");\r
  if (!confirm(\`Delete "\${name}"?\\n\\nThis will remove their admin access permanently.\`)) return;\r
  try {\r
    await deleteDoc(doc(db, "users", uid));\r
    showToast(\`"\${name}" deleted\`);\r
    loadSchools();\r
  } catch(e) { showToast(e.message, "error"); }\r
};\r
\r
// ---- INIT ----\r
onAuthStateChanged(auth, async (user) => {\r
  if (!user) {\r
    redirectUnauthorized();\r
    return;\r
  }\r
  if (!isAuthorizedSuperAdmin(user)) {\r
    await signOut(auth).catch(() => {});\r
    redirectUnauthorized();\r
    return;\r
  }\r
  try {
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      name: "Ansh Bajpai",
      email: SUPER_ADMIN_EMAIL,
      role: "superAdmin",
      superAdmin: true,
      access: true,
      updatedAt: new Date()
    }, { merge: true });
  } catch (profileError) {
    console.warn("Super admin profile bootstrap failed:", profileError);
  }
  document.getElementById("signupExpiry").value = defaultExpiryDate();\r
  loadSchools();\r
});
<\/script>\r
  <script src="schoolix-polish.js" defer><\/script>\r
`,styles:[{tag:"style",attributes:{id:"sxCriticalLoaderStyle"},text:`
html.sx-page-loading,
html.sx-page-loading body {
  min-height: 100%;
  background: #f8fafc !important;
}
html.sx-page-loading body::before,
html.sx-page-loading body::after {
  visibility: hidden !important;
}
html.sx-page-loading body > :not(#sxPageLoader):not(script):not(style) {
  visibility: hidden !important;
}
.sx-page-loader {
  position: fixed;
  inset: 0;
  z-index: 2147482500;
  display: flex;
  align-items: stretch;
  justify-content: stretch;
  background: #f8fafc;
  transition: opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1), visibility 0.25s ease;
  overflow: hidden;
}
.sx-page-loader.is-hidden {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}
.sx-page-loader .dots-container {
  position: fixed;
  inset: 0;
  display: block;
  width: 100vw;
  height: 100vh;
  padding: 0;
  margin: 0;
  overflow: hidden;
  background: #f8fafc;
}
.sx-page-loader .dots-container::before,
.sx-page-loader .dots-container::after,
.sx-page-loader .dot {
  display: none !important;
}
`},{tag:"link",attributes:{rel:"stylesheet",href:"schoolix-polish.css"},text:`\r
<style>\r
/* Super admin workspace: restrained, light and operational */\r
:root { --bg:#f6f8fb; --surface:#ffffff; --surface2:#ffffff; --line:#e4e9f0; --line2:#edf1f5; --text:#172033; --muted:#667085; --brand:#1d4ed8; --brand2:#1e40af; --danger:#b42318; --success:#067647; --warn:#b54708; }\r
body { display:block; padding:0; color:var(--text); background:var(--bg); background-image:none; }\r
.workspace-header { height:72px; background:#fff; border-bottom:1px solid var(--line); display:flex; align-items:center; justify-content:space-between; padding:0 max(24px, calc((100vw - 1280px) / 2)); }\r
.workspace-brand { display:flex; align-items:center; gap:12px; font-family:var(--font-head); font-weight:700; letter-spacing:-.03em; }\r
.brand-mark { width:32px; height:32px; display:grid; place-items:center; background:#1d4ed8; color:#fff; font-size:13px; border-radius:7px; }\r
.workspace-label { font-size:12px; color:var(--muted); font-family:var(--font-body); font-weight:600; letter-spacing:0; }\r
.workspace-header .super-admin-top-actions { margin:0; }\r
.super-admin-top-actions .eyebrow { display:none; }\r
.super-admin-logout { border-color:#e5e7eb; border-radius:7px; background:#fff; color:#344054; padding:9px 14px; font-weight:600; }\r
.super-admin-logout:hover { background:#f9fafb; border-color:#d0d5dd; }\r
.shell { width:min(1280px,100%); padding:32px 24px 48px; grid-template-columns:minmax(0,1.55fr) minmax(340px,.9fr); gap:24px; }\r
.panel { background:#fff; border:1px solid var(--line); border-radius:10px; backdrop-filter:none; box-shadow:0 1px 2px rgba(16,24,40,.03); overflow:visible; }\r
.panel-body,.form-panel .panel-body { padding:26px; }\r
.hero .super-admin-top-actions { display:none; }\r
.eyebrow { color:#475467; font-family:var(--font-body); font-size:11px; letter-spacing:.08em; margin-bottom:9px; }\r
.hero h1 { font-size:28px; color:#101828; margin-bottom:8px; letter-spacing:-.035em; }\r
.hero p { color:var(--muted); font-size:14px; line-height:1.55; margin-bottom:22px; }\r
.chips { display:none; }\r
.admin-summary { display:grid; grid-template-columns:repeat(4,1fr); border:1px solid var(--line); margin:0 0 26px; }\r
.summary-cell { padding:15px; border-right:1px solid var(--line); }\r
.summary-cell:last-child { border:0; }\r
.summary-cell span { display:block; color:var(--muted); font-size:11px; margin-bottom:5px; }\r
.summary-cell strong { color:#101828; font:700 20px var(--font-head); letter-spacing:-.04em; }\r
.school-toolbar { display:flex; gap:10px; align-items:center; margin-bottom:16px; }\r
.school-search,.school-filter { height:36px; border:1px solid #d0d5dd; border-radius:6px; background:#fff; color:#344054; padding:0 10px; font:13px var(--font-body); outline:none; }\r
.school-search { flex:1; }.school-search:focus,.school-filter:focus { border-color:#84adff; box-shadow:0 0 0 3px #eff4ff; }\r
.list-head { margin-bottom:12px; }.list-head h3 { color:#101828; font-family:var(--font-head); font-size:15px; }.count-badge { background:#f2f4f7; color:#475467; border-radius:5px; padding:4px 8px; }\r
.school-list { gap:10px; }.school-card { background:#fff; border:1px solid var(--line); border-radius:8px; }.school-card:hover { border-color:#b2ccff; box-shadow:0 2px 8px rgba(16,24,40,.05); }\r
.card-main { padding:15px 16px 12px; }.school-avatar { width:38px; height:38px; border-radius:7px; background:#eff4ff; border-color:#d1e0ff; color:#1d4ed8; }.card-name { color:#101828; }.card-meta { color:#667085; font-size:12px; }.status-dot { border-radius:2px; box-shadow:none!important; }.school-card-stats { padding:0 15px 12px; gap:8px; }.school-card-stat { border-radius:5px; background:#f9fafb; border-color:#eaecf0; padding:8px; }.school-card-stat strong { color:#101828; font-family:var(--font-body); font-size:14px; }.school-card-stat span { color:#667085; }\r
.card-actions { border-top-color:#eaecf0; padding:10px 15px; }.btn { border-radius:6px; padding:7px 10px; font-size:12px; background:#fff; }.btn-toggle-on,.btn-toggle-off,.btn-features,.btn-insights,.btn-delete { background:#fff; }.btn-toggle-on{color:#067647;border:1px solid #a6f4c5}.btn-toggle-off,.btn-delete{color:#b42318;border:1px solid #fecdca}.btn-features{color:#175cd3;border:1px solid #b2ccff}.btn-insights{color:#344054;border:1px solid #d0d5dd}\r
.form-panel { position:sticky; top:20px; }.form-panel h2 { color:#101828; font-size:21px; }.form-panel .sub { color:var(--muted); font-size:13px; margin-bottom:22px; }.form-grid { gap:13px; }.field { gap:6px; }.field label,.logo-upload-copy label { color:#344054; font-size:12px; }.field input,.field select { background:#fff; border:1px solid #d0d5dd; color:#344054; border-radius:6px; padding:10px 11px; font-size:13px; }.field input::placeholder { color:#98a2b3; }.field input:focus { border-color:#84adff; box-shadow:0 0 0 3px #eff4ff; }.logo-upload-row { border-radius:7px; border-color:#d0d5dd; background:#f9fafb; padding:12px; }.school-logo-preview { border-radius:7px; background:#fff; border-color:#d0d5dd; color:#475467; }.logo-upload-copy small { color:#667085; font-size:11px; }.hint { color:#475467; background:#f9fafb; border-color:#eaecf0; border-radius:6px; font-size:12px; }.submit-btn { border-radius:6px; padding:11px; background:#1d4ed8; font-family:var(--font-body); font-size:13px; }\r
.modal-overlay { background:rgba(16,24,40,.42); backdrop-filter:blur(3px); }.modal { background:#fff; border-color:#eaecf0; border-radius:10px; width:min(760px,100%); }.modal-header,.modal-footer { background:#fff; border-color:#eaecf0; }.modal-header { padding:20px 24px 16px; }.modal-title { color:#101828; }.modal-sub { color:#667085; }.modal-close { border-radius:5px; background:#f2f4f7; color:#475467; }.modal-body { padding:20px 24px; }.modal-logo { border-radius:7px; background:#eff4ff; border-color:#d1e0ff; color:#1d4ed8; }.insight-grid { grid-template-columns:repeat(4,1fr); }.insight-card { border-radius:6px; background:#f9fafb; border-color:#eaecf0; }.insight-card span{color:#667085}.insight-card strong{color:#101828}.control-note { border-radius:6px; color:#6941c6; background:#f9f5ff; border-color:#e9d7fe; }.access-row,.feature-row { background:#fff; border-color:#eaecf0; border-radius:6px; }.access-row-info strong,.feature-row-info strong { color:#344054; }.access-row-info span,.feature-row-info span { color:#667085; }.subscription-panel,.school-profile-panel { border-radius:6px; background:#f9fafb; border-color:#eaecf0; }.subscription-panel h3,.school-profile-panel h3,.billing-history h4 { color:#344054; }.school-profile-panel p { color:#667085; }.subscription-grid input,.subscription-grid select,.school-profile-grid input,.school-profile-grid textarea { border-radius:5px; border-color:#d0d5dd; }.school-profile-grid .profile-readonly { background:#f2f4f7; color:#667085; }.subscription-summary { border-radius:5px; background:#eff4ff; color:#175cd3; }.btn-cancel,.btn-save { border-radius:6px; }.btn-cancel { color:#344054; background:#fff; border-color:#d0d5dd; }.btn-save { background:#1d4ed8; }.features-head { color:#475467; font-family:var(--font-body); }.empty-state { border-radius:6px; color:#667085; }.toast { background:#fff; color:#344054; border-color:#d0d5dd; border-radius:7px; box-shadow:0 8px 24px rgba(16,24,40,.14); }\r
.toggle,.mini-toggle { border-radius:4px; }.slider-track,.mini-track { border-radius:4px; background:#eaecf0; border-color:#d0d5dd; }.slider-track::before,.mini-track::before { border-radius:2px; }.toggle input:checked~.slider-track,.mini-toggle input:checked~.mini-track { background:#1d4ed8; border-color:#1d4ed8; }.toggle input:checked~.slider-track::before,.mini-toggle input:checked~.mini-track::before { background:#fff; }\r
@media(max-width:900px){.shell{grid-template-columns:1fr}.form-panel{position:static}.workspace-header{padding:0 18px}.admin-summary{grid-template-columns:repeat(2,1fr)}.summary-cell:nth-child(2){border-right:0}.summary-cell:nth-child(-n+2){border-bottom:1px solid var(--line)}}\r
@media(max-width:520px){.shell{padding:20px 14px}.panel-body,.form-panel .panel-body{padding:20px}.workspace-label{display:none}.admin-summary{grid-template-columns:repeat(2,1fr)}.school-toolbar{flex-wrap:wrap}.school-search{min-width:100%}.subscription-grid,.school-profile-grid{grid-template-columns:1fr}.insight-grid{grid-template-columns:repeat(2,1fr)}}\r
`}],scripts:[{attributes:{id:"sxCriticalLoaderScript"},text:`\r
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
`},{attributes:{type:"module"},text:`\r
import { initializeApp }\r
  from "./firebase-compat.js";\r
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut }\r
  from "./firebase-compat.js";\r
import {\r
  getFirestore, doc, setDoc, collection,\r
  getDocs, updateDoc, deleteDoc, getDoc, query, where, limit\r
} from "./firebase-compat.js";\r
\r
const firebaseConfig = {\r
  apiKey: "AIzaSyAomGwef93HFT9Xyx7SVW95FPw_IcIAICE",\r
  authDomain: "schoolix-48107.firebaseapp.com",\r
  projectId: "schoolix-48107"\r
};\r
\r
const app = initializeApp(firebaseConfig);\r
const auth = getAuth(app);
const db = getFirestore(app);
const adminCreatorApp = initializeApp(firebaseConfig, "superAdminCreatorApp");
const adminCreatorAuth = getAuth(adminCreatorApp);
const SUPER_ADMIN_EMAIL = "anshbajpai4@gmail.com";
const SUPABASE_URL = "https://ezkmeedcqetztkeppxil.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6a21lZWRjcWV0enRrZXBweGlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxMjk5NjAsImV4cCI6MjA5MzcwNTk2MH0.1davJ_NYkFhHToUtcFBR0kA6dk0-cOkaIbK2SCObkQg";
const CREATE_SCHOOL_ADMIN_URL = \`\${SUPABASE_URL}/functions/v1/create-school-admin\`;
\r
// ---- FEATURE DEFINITIONS ----\r
const ICONS = {\r
  dashboard: \`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 13h4v7H4v-7Zm6-9h4v16h-4V4Zm6 5h4v11h-4V9Z"/></svg>\`,\r
  teachers: \`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-8 8a8 8 0 0 1 16 0H4Z"/></svg>\`,\r
  students: \`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 2 8l10 5 10-5-10-5Zm-7 9v4l7 4 7-4v-4l-7 3.5L5 12Z"/></svg>\`,\r
  attendance: \`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h10v2h3v16H4V5h3V3Zm2 4H6v12h12V7h-3v2H9V7Zm1 6h6v2h-6v-2Z"/></svg>\`,\r
  payroll: \`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16v12H4V6Zm2 2v8h12V8H6Zm6 7a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/></svg>\`,\r
  library: \`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h12a2 2 0 0 1 2 2v14H7a2 2 0 0 1-2-2V4Zm2 0v14h10V6H7Zm2 4h6v2H9V8Z"/></svg>\`,\r
  timetable: \`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 2h2v3h6V2h2v3h3v17H4V5h3V2Zm-1 8v10h12V10H6Zm2 2h3v3H8v-3Z"/></svg>\`,\r
  transport: \`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4h12l2 5v8h-2a2 2 0 0 1-4 0h-4a2 2 0 0 1-4 0H4V9l2-5Zm1.2 2L6.4 8h11.2l-.8-2H7.2Z"/></svg>\`,\r
  reports: \`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h7l2 2h7v12H4V5Zm3 8h10v-2H7v2Zm0 4h7v-2H7v2Z"/></svg>\`,\r
  announcements: \`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10v4h4l7 4V6l-7 4H4Zm13-1.5v7a4 4 0 0 0 0-7Z"/></svg>\`,\r
  settings: \`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m19.4 13.5.1-1.5-.1-1.5 2-1.5-2-3.5-2.4 1a8 8 0 0 0-2.6-1.5L14 2h-4l-.4 2.5A8 8 0 0 0 7 6L4.6 5l-2 3.5 2 1.5-.1 1.5.1 1.5-2 1.5 2 3.5 2.4-1a8 8 0 0 0 2.6 1.5L10 22h4l.4-2.5A8 8 0 0 0 17 18l2.4 1 2-3.5-2-1.5ZM12 15.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Z"/></svg>\`\r
};\r
\r
const FEATURES = [\r
  { key: "dashboard",      label: "Dashboard",      desc: "Main overview & stats",       icon: ICONS.dashboard, color: "rgba(59,110,248,0.12)"  },\r
  { key: "teachers",       label: "Teachers",        desc: "Teacher management module",   icon: ICONS.teachers, color: "rgba(168,85,247,0.12)" },\r
  { key: "students",       label: "Students",        desc: "Student records & profiles",  icon: ICONS.students, color: "rgba(20,184,166,0.12)"  },\r
  { key: "attendance",     label: "Attendance",      desc: "Daily attendance tracking",   icon: ICONS.attendance, color: "rgba(245,158,11,0.12)"  },\r
  { key: "payroll",        label: "Payroll",         desc: "Salary & payment processing", icon: ICONS.payroll, color: "rgba(34,197,94,0.12)"   },\r
  { key: "library",        label: "Library",         desc: "Books, issues and returns",    icon: ICONS.library, color: "rgba(14,165,233,0.12)"   },\r
  { key: "timetable",      label: "Timetable",       desc: "Class and teacher schedules",  icon: ICONS.timetable, color: "rgba(236,72,153,0.12)" },\r
  { key: "transport",      label: "Transport",       desc: "Vehicles, routes and tracking", icon: ICONS.transport, color: "rgba(132,204,22,0.12)" },\r
  { key: "reports",        label: "Reports",         desc: "Analytics & report exports",  icon: ICONS.reports, color: "rgba(239,68,68,0.12)"   },\r
  { key: "announcements",  label: "Announcements",   desc: "School-wide notices",         icon: ICONS.announcements, color: "rgba(99,102,241,0.12)"  },\r
  { key: "settings",       label: "Settings",        desc: "School config & branding",    icon: ICONS.settings, color: "rgba(100,116,139,0.12)" },\r
];\r
// ---- CURRENT MODAL STATE ----\r
let currentUID = null;\r
let currentData = null;\r
let signupInProgress = false;\r
const CLOUDINARY_CLOUD_NAME = "fthnumnk";\r
const CLOUDINARY_UPLOAD_PRESET = "schoolix_student_photos";\r
\r
function isoDate(value) {\r
  const date = toJsDate(value);\r
  return date ? date.toISOString().slice(0, 10) : "";\r
}\r
\r
function defaultExpiryDate() {\r
  const date = new Date();\r
  date.setFullYear(date.getFullYear() + 1);\r
  return date.toISOString().slice(0, 10);\r
}\r
\r
function subscriptionState(data = {}) {\r
  const subscription = data.subscription || {};\r
  const expiresAt = isoDate(subscription.expiresAt || data.subscriptionExpiresAt);\r
  const status = String(subscription.status || "active").toLowerCase();\r
  const expired = Boolean(expiresAt && new Date(\`\${expiresAt}T23:59:59\`).getTime() < Date.now());\r
  const blocked = ["suspended", "cancelled"].includes(status) || expired;\r
  return { plan: subscription.plan || "Growth", status: expired ? "expired" : status, expiresAt, expired, blocked };\r
}\r
\r
function subscriptionLabel(data = {}) {\r
  const sub = subscriptionState(data);\r
  if (sub.status === "expired") return \`Expired \${sub.expiresAt || ""}\`.trim();\r
  if (sub.status === "suspended") return "Suspended";\r
  if (sub.status === "past_due") return "Payment due";\r
  if (sub.status === "cancelled") return "Cancelled";\r
  return \`Active · expires \${sub.expiresAt || "not set"}\`;\r
}\r
\r
function normalizeEmail(value = "") {\r
  return String(value || "").trim().toLowerCase();\r
}\r
\r
function isAuthorizedSuperAdmin(user) {\r
  return normalizeEmail(user?.email) === SUPER_ADMIN_EMAIL;\r
}\r
\r
function redirectUnauthorized() {\r
  resetSchoolList("Super admin login required.");\r
  window.setTimeout(() => {\r
    window.location.replace("#/index.html?access_error=" + encodeURIComponent("Only the authorized Super Admin can access this page."));\r
  }, 250);\r
}\r
\r
function escapeHtml(value = "") {\r
  return String(value ?? "")\r
    .replace(/&/g, "&amp;")\r
    .replace(/</g, "&lt;")\r
    .replace(/>/g, "&gt;")\r
    .replace(/"/g, "&quot;")\r
    .replace(/'/g, "&#39;");\r
}\r
\r
function jsString(value = "") {\r
  return String(value ?? "").replace(/\\\\/g, "\\\\\\\\").replace(/'/g, "\\\\'").replace(/\\n/g, " ");\r
}\r
\r
function renderLogo(url = "", fallback = "S") {\r
  const safeUrl = String(url || "").trim();\r
  return safeUrl ? \`<img src="\${escapeHtml(safeUrl)}" alt="School logo">\` : escapeHtml(fallback || "S");\r
}\r
\r
window.previewSchoolLogo = (event) => {\r
  const file = event.target.files?.[0];\r
  const preview = document.getElementById("schoolLogoPreview");\r
  if (!preview) return;\r
  if (!file) {\r
    preview.textContent = "LOGO";\r
    return;\r
  }\r
  preview.innerHTML = \`<img src="\${URL.createObjectURL(file)}" alt="School logo preview">\`;\r
};\r
\r
async function uploadSchoolLogo(file, schoolName) {\r
  if (!file) return { logoUrl: "", logoPublicId: "" };\r
  if (!file.type.startsWith("image/")) throw new Error("Please select an image file for school logo.");\r
  if (file.size > 5 * 1024 * 1024) throw new Error("School logo must be under 5 MB.");\r
  const form = new FormData();\r
  form.append("file", file);\r
  form.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);\r
  form.append("folder", "schoolix/school_logos");\r
  form.append("public_id", \`\${schoolName.replace(/[^a-zA-Z0-9_-]/g, "_")}_\${Date.now()}\`);\r
  const response = await fetch(\`https://api.cloudinary.com/v1_1/\${encodeURIComponent(CLOUDINARY_CLOUD_NAME)}/image/upload\`, {\r
    method: "POST",\r
    body: form\r
  });\r
  const data = await response.json().catch(() => ({}));\r
  if (!response.ok) throw new Error(data.error?.message || "School logo upload failed.");\r
  return { logoUrl: data.secure_url || data.url || "", logoPublicId: data.public_id || "" };\r
}\r
\r
// ---- TOAST ----\r
function showToast(msg, type = "success") {\r
  const t = document.getElementById("toast");\r
  t.textContent = msg;\r
  t.className = "toast " + type + " show";\r
  setTimeout(() => t.className = "toast", 2800);\r
}\r
\r
window.logoutSuperAdmin = async () => {\r
  try {\r
    await signOut(auth);\r
    window.location.replace("#/index.html");\r
  } catch (error) {\r
    showToast(error.message || "Unable to logout.", "error");\r
  }\r
};\r
\r
// ---- INITIALS ----\r
function initials(name = "") {\r
  return name.trim().split(" ").slice(0,2).map(w => w[0]?.toUpperCase() || "").join("");\r
}\r
\r
// ---- SIGNUP ----\r
window.signup = async () => {\r
  if (!isAuthorizedSuperAdmin(auth.currentUser)) {\r
    showToast("Only authorized Super Admin can create schools.", "error");\r
    return;\r
  }\r
  if (signupInProgress) return;\r
  const schoolName = document.getElementById("schoolName").value.trim();\r
  const adminName  = document.getElementById("adminName").value.trim();\r
  const email      = normalizeEmail(document.getElementById("email").value);\r
  const password   = document.getElementById("password").value;\r
  const logoFile   = document.getElementById("schoolLogo")?.files?.[0] || null;\r
  const plan = document.getElementById("signupPlan").value;\r
  const expiresAt = document.getElementById("signupExpiry").value;\r
\r
  if (!schoolName || !adminName || !email || !password) {\r
    showToast("Please fill all fields", "error"); return;\r
  }\r
  if (password.length < 6) {\r
    showToast("Password must be at least 6 characters", "error"); return;\r
  }\r
  if (!expiresAt) {\r
    showToast("Please set the school licence expiry date", "error"); return;\r
  }\r
\r
  const btn = document.querySelector(".submit-btn");\r
  btn.textContent = "Creating...";\r
  btn.disabled = true;\r
  signupInProgress = true;\r
\r
  try {\r
    const existing = await getDocs(query(collection(db, "users"), where("email", "==", email), limit(1)));\r
    if (!existing.empty) {\r
      showToast("This admin email already has a school account.", "error");\r
      return;\r
    }\r
\r
    // Default: all features ON
    const defaultFeatures = {};
    FEATURES.forEach(f => defaultFeatures[f.key] = true);

    const logoUpload = await uploadSchoolLogo(logoFile, schoolName);
    const token = await auth.currentUser?.getIdToken(true);
    if (!token) throw new Error("Super admin session expired. Please login again.");
    const response = await fetch(CREATE_SCHOOL_ADMIN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": \`Bearer \${token}\`
      },
      body: JSON.stringify({
        schoolName,
        adminName,
        email,
        password,
        logoUrl: logoUpload.logoUrl,
        schoolLogoUrl: logoUpload.logoUrl,
        logoPublicId: logoUpload.logoPublicId,
        features: defaultFeatures,\r
        subscription: { plan, status: "active", expiresAt }\r
      })
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok || !result.success) throw new Error(result.error || "Unable to create admin account.");

    await setDoc(doc(db, "schools", result.uid), {
      schoolName,
      name: schoolName,
      adminName,
      adminEmail: email,
      logoUrl: logoUpload.logoUrl,\r
      schoolLogoUrl: logoUpload.logoUrl,\r
      logoPublicId: logoUpload.logoPublicId,\r
      access: true,\r
      features: defaultFeatures,\r
      subscription: { plan, status: "active", expiresAt },\r
      onboardingRequired: true,\r
      onboardingCompleted: false,\r
      onboardingVersion: 1,\r
      createdAt: new Date(),\r
      createdBy: auth.currentUser?.uid || "",\r
      createdByEmail: SUPER_ADMIN_EMAIL
    }, { merge: true });
    await setDoc(doc(db, "users", result.uid), {\r
      access: true,\r
      features: defaultFeatures,\r
      subscription: { plan, status: "active", expiresAt },\r
      updatedAt: new Date()\r
    }, { merge: true });\r

    showToast(\`Admin created for \${schoolName}\`);
    ["schoolName","adminName","email","password"].forEach(id => document.getElementById(id).value = "");\r
    document.getElementById("signupExpiry").value = defaultExpiryDate();\r
    const logoInput = document.getElementById("schoolLogo");\r
    if (logoInput) logoInput.value = "";\r
    const logoPreview = document.getElementById("schoolLogoPreview");\r
    if (logoPreview) logoPreview.textContent = "LOGO";\r
    loadSchools();\r
  } catch(e) {\r
    showToast(e.message, "error");\r
  } finally {\r
    await signOut(adminCreatorAuth).catch(() => {});\r
    signupInProgress = false;\r
    btn.textContent = "Create Admin Account";\r
    btn.disabled = false;\r
  }\r
};\r
\r
function resetSchoolList(message = "Loading...") {\r
  const list = document.getElementById("schoolList");\r
  const countBadge = document.getElementById("schoolCount");\r
  countBadge.textContent = "0 schools";\r
  list.innerHTML = \`<div class="empty-state">\${message}</div>\`;\r
}\r
\r
function toJsDate(value) {\r
  if (!value) return null;\r
  if (typeof value.toDate === "function") return value.toDate();\r
  if (typeof value.seconds === "number") return new Date(value.seconds * 1000);\r
  const parsed = new Date(value);\r
  return Number.isNaN(parsed.getTime()) ? null : parsed;\r
}\r
\r
function isToday(value) {\r
  const date = toJsDate(value);\r
  if (!date) return false;\r
  const today = new Date();\r
  return date.getFullYear() === today.getFullYear() &&\r
    date.getMonth() === today.getMonth() &&\r
    date.getDate() === today.getDate();\r
}\r
\r
async function countCollection(pathParts) {\r
  try {\r
    const snap = await getDocs(collection(db, ...pathParts));\r
    return snap.size;\r
  } catch (_) {\r
    return 0;\r
  }\r
}\r
\r
function teacherCountKey(data = {}, fallbackId = "") {\r
  return String(\r
    data.authUid ||\r
    data.uid ||\r
    data.teacherId ||\r
    data.email ||\r
    fallbackId ||\r
    ""\r
  ).trim().toLowerCase();\r
}\r
\r
async function countTeachersForSchool(uid, teachersSnap) {\r
  const teacherKeys = new Set();\r
  (teachersSnap.docs || []).forEach((item) => {\r
    const key = teacherCountKey(item.data?.() || {}, item.id);\r
    if (key) teacherKeys.add(key);\r
  });\r
\r
  const userQueries = ["teacher", "teachers"].flatMap((teacherRole) => [\r
    query(collection(db, "users"), where("role", "==", teacherRole), where("adminId", "==", uid)),\r
    query(collection(db, "users"), where("role", "==", teacherRole), where("schoolId", "==", uid)),\r
    query(collection(db, "users"), where("role", "==", teacherRole), where("adminUID", "==", uid)),\r
    query(collection(db, "users"), where("role", "==", teacherRole), where("adminUid", "==", uid))\r
  ]);\r
\r
  const userSnaps = await Promise.all(userQueries.map((teacherQuery) => getDocs(teacherQuery).catch(() => ({ docs: [] }))));\r
  userSnaps.forEach((snap) => {\r
    (snap.docs || []).forEach((item) => {\r
      const data = item.data?.() || {};\r
      const key = teacherCountKey(data, item.id);\r
      if (key) teacherKeys.add(key);\r
    });\r
  });\r
\r
  return teacherKeys.size;\r
}\r
\r
async function loadSchoolMetrics(uid) {\r
  const [\r
    studentsSnap,\r
    teachersSnap,\r
    attendanceSnap,\r
    feesSnap,\r
    reportsSnap,\r
    notificationsSnap,\r
    devicesSnap,\r
    accountsSnap\r
  ] = await Promise.all([\r
    getDocs(collection(db, "schools", uid, "students")).catch(() => ({ docs: [], size: 0 })),\r
    getDocs(collection(db, "schools", uid, "teachers")).catch(() => ({ docs: [], size: 0 })),\r
    getDocs(collection(db, "schools", uid, "attendance")).catch(() => ({ docs: [], size: 0 })),\r
    getDocs(collection(db, "schools", uid, "fees")).catch(() => ({ docs: [], size: 0 })),\r
    getDocs(collection(db, "schools", uid, "reportCards")).catch(() => ({ docs: [], size: 0 })),\r
    getDocs(collection(db, "schools", uid, "notifications")).catch(() => ({ docs: [], size: 0 })),\r
    getDocs(collection(db, "schools", uid, "notificationDevices")).catch(() => ({ docs: [], size: 0 })),\r
    getDocs(collection(db, "schools", uid, "accounts")).catch(() => ({ docs: [], size: 0 }))\r
  ]);\r
  const attendanceRows = attendanceSnap.docs.map((item) => item.data());\r
  const notificationRows = notificationsSnap.docs.map((item) => item.data());\r
  const todayAttendance = attendanceRows.filter((item) => isToday(item.date || item.timestamp || item.createdAt));\r
  const todayAbsent = todayAttendance.filter((item) => String(item.status || "").toLowerCase() === "absent");\r
  const todayEmails = attendanceRows.filter((item) => item.absenceEmailSent === true && isToday(item.absenceEmailSentAt || item.timestamp || item.date));\r
  const todayNotifications = notificationRows.filter((item) => isToday(item.createdAt));\r
  const writeEstimate = todayAttendance.length + todayNotifications.length + todayEmails.length;\r
  const teacherCount = await countTeachersForSchool(uid, teachersSnap);\r
  return {\r
    students: studentsSnap.size,\r
    teachers: teacherCount,\r
    attendance: attendanceSnap.size,\r
    todayAttendance: todayAttendance.length,\r
    todayAbsent: todayAbsent.length,\r
    todayEmails: todayEmails.length,\r
    fees: feesSnap.size,\r
    reports: reportsSnap.size,\r
    notifications: notificationsSnap.size,\r
    todayNotifications: todayNotifications.length,\r
    devices: devicesSnap.size,\r
    accounts: accountsSnap.size,\r
    writeEstimate\r
  };\r
}\r
\r
function renderInsightGrid(metrics = {}) {\r
  const rows = [\r
    ["Students", metrics.students || 0],\r
    ["Teachers", metrics.teachers || 0],\r
    ["Today attendance", metrics.todayAttendance || 0],\r
    ["Today absent", metrics.todayAbsent || 0],\r
    ["Emails today", metrics.todayEmails || 0],\r
    ["Push today", metrics.todayNotifications || 0],\r
    ["Reports", metrics.reports || 0],\r
    ["Fee records", metrics.fees || 0],\r
    ["Devices", metrics.devices || 0],\r
    ["Accounts", metrics.accounts || 0],\r
    ["Audit writes est.", metrics.writeEstimate || 0],\r
    ["Total attendance", metrics.attendance || 0]\r
  ];\r
  return rows.map(([label, value]) => \`<div class="insight-card"><span>\${label}</span><strong>\${Number(value || 0).toLocaleString("en-IN")}</strong></div>\`).join("");\r
}\r
\r
function updatePortfolioSummary(schools = []) {\r
  const active = schools.filter((school) => school.access !== false && !subscriptionState(school).blocked).length;\r
  const attention = schools.filter((school) => {\r
    const state = subscriptionState(school);\r
    return state.status === "past_due" || state.expired || state.blocked || school.access === false;\r
  }).length;\r
  document.getElementById("summaryTotal").textContent = schools.length.toLocaleString("en-IN");\r
  document.getElementById("summaryActive").textContent = active.toLocaleString("en-IN");\r
  document.getElementById("summaryAttention").textContent = attention.toLocaleString("en-IN");\r
}\r
\r
function applySchoolFilters() {\r
  const search = String(document.getElementById("schoolSearch")?.value || "").trim().toLowerCase();\r
  const filter = String(document.getElementById("schoolStatusFilter")?.value || "all");\r
  document.querySelectorAll(".school-card").forEach((card) => {\r
    const matchesSearch = !search || String(card.dataset.search || "").includes(search);\r
    const matchesStatus = filter === "all" || card.dataset.status === filter;\r
    card.hidden = !(matchesSearch && matchesStatus);\r
  });\r
}\r
\r
// ---- LOAD SCHOOLS ----\r
async function loadSchools() {\r
  const list = document.getElementById("schoolList");\r
  const countBadge = document.getElementById("schoolCount");\r
  list.innerHTML = \`<div class="empty-state">Loading...</div>\`;\r
\r
  try {\r
    const snap = await getDocs(collection(db, "users"));\r
    const schools = [];\r
    snap.forEach(d => {\r
      const data = d.data();\r
      if (data.schoolName && String(data.role || "").toLowerCase() === "admin") schools.push({ uid: d.id, ...data });\r
    });\r
\r
    countBadge.textContent = schools.length + " school" + (schools.length !== 1 ? "s" : "");\r
    updatePortfolioSummary(schools);\r
\r
    if (!schools.length) {\r
      list.innerHTML = \`<div class="empty-state">No schools registered yet.</div>\`;\r
      return;\r
    }\r
\r
    const metricEntries = await Promise.all(schools.map(async (school) => [school.uid, await loadSchoolMetrics(school.uid)]));\r
    const metricsBySchool = Object.fromEntries(metricEntries);\r
\r
    list.innerHTML = schools.map(s => {\r
      const subscription = subscriptionState(s);\r
      const on = s.access !== false && !subscription.blocked;\r
      const portfolioStatus = !on ? "blocked" : (subscription.status === "past_due" ? "attention" : "active");\r
      const ini = initials(s.schoolName);\r
      const featOn = s.features ? Object.values(s.features).filter(Boolean).length : FEATURES.length;\r
      const metrics = metricsBySchool[s.uid] || {};\r
      return \`\r
      <div class="school-card" id="card-\${s.uid}" data-status="\${portfolioStatus}" data-search="\${escapeHtml(\`\${s.schoolName || ""} \${s.email || ""} \${s.adminEmail || ""}\`).toLowerCase()}">\r
        <div class="card-main">\r
          <div class="school-avatar">\${renderLogo(s.logoUrl || s.schoolLogoUrl || "", ini)}</div>\r
          <div class="card-info">\r
            <div class="card-name">\${escapeHtml(s.schoolName)}</div>\r
            <div class="card-meta">\r
              <span class="status-dot \${on ? 'on' : 'off'}"></span>\r
              \${on ? "Access Enabled" : "Access blocked"} &nbsp;|&nbsp;\r
              \${featOn}/\${FEATURES.length} modules\r
            </div>\r
            <div class="card-meta" style="margin-top:4px;color:\${subscription.blocked ? '#f87171' : '#94a3b8'}">\${escapeHtml(subscriptionLabel(s))}</div>\r
          </div>\r
        </div>\r
        <div class="school-card-stats">\r
          <div class="school-card-stat"><strong>\${metrics.students || 0}</strong><span>Students</span></div>\r
          <div class="school-card-stat"><strong>\${metrics.teachers || 0}</strong><span>Teachers</span></div>\r
          <div class="school-card-stat"><strong>\${metrics.todayEmails || 0}</strong><span>Mails today</span></div>\r
          <div class="school-card-stat"><strong>\${metrics.writeEstimate || 0}</strong><span>Ops today</span></div>\r
        </div>\r
        <div class="card-actions">\r
          <button class="btn \${on ? 'btn-toggle-on' : 'btn-toggle-off'}"\r
            onclick="quickToggle('\${s.uid}', \${on})">\r
            \${on ? "Disable" : "Enable"}\r
          </button>\r
          <button class="btn btn-features"\r
            onclick="openModal('\${s.uid}')">\r
            Manage school\r
          </button>\r
          <button class="btn btn-delete"\r
            onclick="deleteSchool('\${s.uid}', '\${jsString(s.schoolName)}')">\r
            Delete\r
          </button>\r
        </div>\r
      </div>\`;\r
    }).join("");\r
    applySchoolFilters();\r
  } catch(e) {\r
    list.innerHTML = \`<div class="empty-state">Failed to load schools.</div>\`;\r
    console.error(e);\r
  }\r
}\r
\r
// ---- QUICK TOGGLE ACCESS ----\r
window.quickToggle = async (uid, currentAccess) => {\r
  if (!isAuthorizedSuperAdmin(auth.currentUser)) return showToast("Unauthorized access.", "error");\r
  try {\r
    await updateDoc(doc(db, "users", uid), { access: !currentAccess });\r
    await setDoc(doc(db, "schools", uid), { access: !currentAccess, updatedAt: new Date() }, { merge: true });\r
    showToast(currentAccess ? "Access disabled" : "Access enabled");\r
    loadSchools();\r
  } catch(e) { showToast(e.message, "error"); }\r
};\r
\r
// ---- OPEN MODAL ----\r
window.openModal = async (uid) => {\r
  if (!isAuthorizedSuperAdmin(auth.currentUser)) return showToast("Unauthorized access.", "error");\r
  currentUID = uid;\r
  try {\r
    const snap = await getDoc(doc(db, "users", uid));\r
    if (!snap.exists()) { showToast("School not found", "error"); return; }\r
    const schoolSnap = await getDoc(doc(db, "schools", uid)).catch(() => null);\r
    currentData = { ...(schoolSnap?.exists?.() ? schoolSnap.data() : {}), ...snap.data() };\r
\r
    document.getElementById("modalSchoolName").textContent = currentData.schoolName;\r
    document.getElementById("modalSchoolEmail").textContent = currentData.email;\r
    document.getElementById("modalSchoolLogo").innerHTML = renderLogo(currentData.logoUrl || currentData.schoolLogoUrl || "", initials(currentData.schoolName));\r
    document.getElementById("schoolInsightGrid").innerHTML = \`<div class="empty-state" style="grid-column:1/-1;">Loading live metrics...</div>\`;\r
    document.getElementById("modalSchoolHealth").textContent = "Loading live school metrics...";\r
    loadSchoolMetrics(uid).then((metrics) => {\r
      if (currentUID !== uid) return;\r
      document.getElementById("schoolInsightGrid").innerHTML = renderInsightGrid(metrics);\r
      document.getElementById("modalSchoolHealth").textContent =\r
        \`\${metrics.students} students, \${metrics.teachers} teachers, \${metrics.todayEmails} mails today, \${metrics.writeEstimate} estimated app writes today\`;\r
    }).catch(() => {\r
      document.getElementById("schoolInsightGrid").innerHTML = \`<div class="empty-state" style="grid-column:1/-1;">Unable to load metrics.</div>\`;\r
    });\r
\r
    // Master access toggle\r
    const toggle = document.getElementById("masterAccessToggle");\r
    toggle.checked = currentData.access !== false;\r
    updateAccessLabel();\r
    document.getElementById("profileSchoolName").value = currentData.schoolName || currentData.name || "";\r
    document.getElementById("profileAdminName").value = currentData.adminName || currentData.name || "";\r
    document.getElementById("profileAdminEmail").value = currentData.adminEmail || currentData.email || "";\r
    document.getElementById("profilePhone").value = currentData.phone || currentData.contactNumber || "";\r
    document.getElementById("profileSchoolCode").value = currentData.schoolCode || "";\r
    document.getElementById("profileAddress").value = currentData.address || "";\r
    document.getElementById("profileSchoolLogo").value = "";\r
    const subscription = subscriptionState(currentData);\r
    document.getElementById("subscriptionPlan").value = subscription.plan;\r
    document.getElementById("subscriptionStatus").value = subscription.status === "expired" ? "past_due" : subscription.status;\r
    document.getElementById("subscriptionExpiresAt").value = subscription.expiresAt;\r
    document.getElementById("paymentAmount").value = "";\r
    document.getElementById("paymentDate").value = new Date().toISOString().slice(0, 10);\r
    document.getElementById("paymentReference").value = "";\r
    document.getElementById("subscriptionSummary").textContent = \`\${subscription.plan} · \${subscriptionLabel(currentData)}\${subscription.blocked ? " — school access is blocked" : ""}\`;\r
    loadBillingHistory(uid);\r
\r
    // Build feature rows\r
    const grid = document.getElementById("featuresGrid");\r
    const features = currentData.features || {};\r
    grid.innerHTML = FEATURES.map(f => {\r
      const enabled = features[f.key] !== false;\r
      return \`\r
      <div class="feature-row">\r
        <div class="feature-row-left">\r
          <div class="feature-icon" style="background:\${f.color}">\${f.icon}</div>\r
          <div class="feature-row-info">\r
            <strong>\${f.label}</strong>\r
            <span>\${f.desc}</span>\r
          </div>\r
        </div>\r
        <label class="mini-toggle">\r
          <input type="checkbox" id="feat-\${f.key}" \${enabled ? "checked" : ""}>\r
          <span class="mini-track"></span>\r
        </label>\r
      </div>\`;\r
    }).join("");\r
\r
    document.getElementById("featureModal").classList.add("open");\r
  } catch(e) { showToast(e.message, "error"); }\r
};\r
\r
async function loadBillingHistory(uid) {\r
  const target = document.getElementById("billingHistory");\r
  if (!target) return;\r
  target.innerHTML = \`<div class="billing-empty">Loading records...</div>\`;\r
  try {\r
    const snap = await getDocs(collection(db, "schools", uid, "billingPayments"));\r
    const rows = snap.docs.map((item) => ({ id: item.id, ...item.data() }))\r
      .sort((a, b) => String(b.paymentDate || b.createdAt || "").localeCompare(String(a.paymentDate || a.createdAt || ""))).slice(0, 8);\r
    target.innerHTML = rows.length ? rows.map((payment) => \`<div class="billing-item"><div><strong>₹\${Number(payment.amount || 0).toLocaleString("en-IN")}</strong><span>\${escapeHtml(payment.reference || "Payment recorded")}</span></div><span>\${escapeHtml(payment.paymentDate || "")}</span></div>\`).join("") : \`<div class="billing-empty">No payments recorded for this school yet.</div>\`;\r
  } catch (_) {\r
    target.innerHTML = \`<div class="billing-empty">Payment history could not be loaded.</div>\`;\r
  }\r
}\r
\r
// ---- CLOSE MODAL ----\r
window.closeModal = () => {\r
  document.getElementById("featureModal").classList.remove("open");\r
  currentUID = null;\r
  currentData = null;\r
};\r
\r
// Close on overlay click\r
document.getElementById("featureModal").addEventListener("click", function(e) {\r
  if (e.target === this) closeModal();\r
});\r
\r
document.getElementById("schoolSearch").addEventListener("input", applySchoolFilters);\r
document.getElementById("schoolStatusFilter").addEventListener("change", applySchoolFilters);\r
\r
// ---- UPDATE ACCESS LABEL ----\r
window.updateAccessLabel = () => {\r
  const checked = document.getElementById("masterAccessToggle").checked;\r
  document.getElementById("accessLabel").textContent = checked ? "Enabled" : "Disabled";\r
  document.getElementById("accessLabel").style.color = checked ? "#4ade80" : "#f87171";\r
};\r
\r
// ---- SAVE FEATURES ----\r
window.saveFeatures = async () => {\r
  if (!isAuthorizedSuperAdmin(auth.currentUser)) return showToast("Unauthorized access.", "error");\r
  if (!currentUID) return;\r
  const saveBtn = document.querySelector(".btn-save");\r
  saveBtn.textContent = "Saving...";\r
  saveBtn.disabled = true;\r
\r
  try {\r
    const newAccess = document.getElementById("masterAccessToggle").checked;\r
    const newFeatures = {};\r
    FEATURES.forEach(f => {\r
      newFeatures[f.key] = document.getElementById("feat-" + f.key).checked;\r
    });\r
    const subscription = {\r
      plan: document.getElementById("subscriptionPlan").value,\r
      status: document.getElementById("subscriptionStatus").value,\r
      expiresAt: document.getElementById("subscriptionExpiresAt").value\r
    };\r
    if (!subscription.expiresAt) throw new Error("Set a licence expiry date before saving.");\r
    const paymentAmount = Number(document.getElementById("paymentAmount").value || 0);\r
    const paymentDate = document.getElementById("paymentDate").value;\r
    const paymentReference = document.getElementById("paymentReference").value.trim();\r
    if (paymentAmount > 0 && !paymentDate) throw new Error("Set a payment date for the recorded payment.");\r
    const schoolDetails = {\r
      schoolName: document.getElementById("profileSchoolName").value.trim(),\r
      name: document.getElementById("profileSchoolName").value.trim(),\r
      adminName: document.getElementById("profileAdminName").value.trim(),\r
      phone: document.getElementById("profilePhone").value.trim(),\r
      contactNumber: document.getElementById("profilePhone").value.trim(),\r
      schoolCode: document.getElementById("profileSchoolCode").value.trim(),\r
      address: document.getElementById("profileAddress").value.trim()\r
    };\r
    if (!schoolDetails.schoolName || !schoolDetails.adminName) throw new Error("School name and administrator name are required.");\r
    const replacementLogo = document.getElementById("profileSchoolLogo").files?.[0] || null;\r
    if (replacementLogo) {\r
      const logoUpload = await uploadSchoolLogo(replacementLogo, schoolDetails.schoolName);\r
      Object.assign(schoolDetails, logoUpload, { schoolLogoUrl: logoUpload.logoUrl });\r
    }\r
\r
    await updateDoc(doc(db, "users", currentUID), {\r
      access: newAccess,\r
      features: newFeatures,\r
      subscription,\r
      ...schoolDetails,\r
      name: schoolDetails.adminName\r
    });\r
    await setDoc(doc(db, "schools", currentUID), {\r
      access: newAccess,\r
      features: newFeatures,\r
      subscription,\r
      ...schoolDetails,\r
      updatedAt: new Date(),\r
      updatedBy: auth.currentUser?.email || SUPER_ADMIN_EMAIL\r
    }, { merge: true });\r
    if (replacementLogo) {\r
      await setDoc(doc(db, "schools", currentUID, "config", "branding"), {\r
        schoolName: schoolDetails.schoolName,\r
        logoUrl: schoolDetails.logoUrl,\r
        schoolLogoUrl: schoolDetails.schoolLogoUrl,\r
        logoPublicId: schoolDetails.logoPublicId,\r
        updatedAt: new Date(),\r
        updatedBy: auth.currentUser?.email || SUPER_ADMIN_EMAIL\r
      }, { merge: true });\r
    }\r
    if (paymentAmount > 0) {\r
      const paymentRef = doc(collection(db, "schools", currentUID, "billingPayments"));\r
      await setDoc(paymentRef, { amount: paymentAmount, paymentDate, reference: paymentReference, plan: subscription.plan, recordedAt: new Date(), recordedBy: auth.currentUser?.email || SUPER_ADMIN_EMAIL });\r
    }\r
\r
    showToast("Settings saved successfully");\r
    closeModal();\r
    loadSchools();\r
  } catch(e) {\r
    showToast(e.message, "error");\r
  } finally {\r
    saveBtn.textContent = "Save Changes";\r
    saveBtn.disabled = false;\r
  }\r
};\r
\r
// ---- DELETE SCHOOL ----\r
window.deleteSchool = async (uid, name) => {\r
  if (!isAuthorizedSuperAdmin(auth.currentUser)) return showToast("Unauthorized access.", "error");\r
  if (!confirm(\`Delete "\${name}"?\\n\\nThis will remove their admin access permanently.\`)) return;\r
  try {\r
    await deleteDoc(doc(db, "users", uid));\r
    showToast(\`"\${name}" deleted\`);\r
    loadSchools();\r
  } catch(e) { showToast(e.message, "error"); }\r
};\r
\r
// ---- INIT ----\r
onAuthStateChanged(auth, async (user) => {\r
  if (!user) {\r
    redirectUnauthorized();\r
    return;\r
  }\r
  if (!isAuthorizedSuperAdmin(user)) {\r
    await signOut(auth).catch(() => {});\r
    redirectUnauthorized();\r
    return;\r
  }\r
  try {
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      name: "Ansh Bajpai",
      email: SUPER_ADMIN_EMAIL,
      role: "superAdmin",
      superAdmin: true,
      access: true,
      updatedAt: new Date()
    }, { merge: true });
  } catch (profileError) {
    console.warn("Super admin profile bootstrap failed:", profileError);
  }
  document.getElementById("signupExpiry").value = defaultExpiryDate();\r
  loadSchools();\r
});
`},{attributes:{src:"schoolix-polish.js"},text:""}]};export{e as default};
