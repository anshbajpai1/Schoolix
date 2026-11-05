const e={file:"staff-management.html",title:"Schoolix - Staff Management",htmlClass:"",bodyClass:"sx-admin-app",body:`\r
<div id="sxPageLoader" class="sx-page-loader" role="status" aria-live="polite">\r
  <section class="dots-container" aria-label="Loading page">\r
    <div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div>\r
  </section>\r
</div>\r
<main class="staff-page">\r
  <section class="hero">\r
    <div>\r
      <h1>Staff Management</h1>\r
      <p>Teachers, librarians, accountants, and other staff accounts in one place.</p>\r
    </div>\r
    <div class="hero-actions">\r
      <a class="btn btn-light" href="#/teachers.html"><i class="fas fa-chalkboard-teacher"></i> Teacher Desk</a>\r
      <a class="btn btn-light" href="#/library-management.html"><i class="fas fa-book-open"></i> Library Staff</a>\r
      <a class="btn btn-light" href="#/accountant-management.html"><i class="fas fa-user-tie"></i> Accountants</a>\r
    </div>\r
  </section>\r
\r
  <section class="stats">\r
    <div class="stat"><span>Total Staff</span><strong id="statTotal">0</strong></div>\r
    <div class="stat"><span>Teachers</span><strong id="statTeachers">0</strong></div>\r
    <div class="stat"><span>Librarians</span><strong id="statLibrarians">0</strong></div>\r
    <div class="stat"><span>Accountants</span><strong id="statAccountants">0</strong></div>\r
  </section>\r
\r
  <section class="panel">\r
    <div class="panel-head">\r
      <div>\r
        <h2>Add Staff</h2>\r
        <div class="muted">Teachers, librarians, and accountants get portal login. Other Staff is saved for records and salary only.</div>\r
      </div>\r
    </div>\r
    <form id="staffForm">\r
      <div class="grid form-grid">\r
        <div>\r
          <label for="staffRole">Role</label>\r
          <select id="staffRole" required>\r
            <option value="teacher">Teacher</option>\r
            <option value="librarian">Librarian</option>\r
            <option value="accountant">Accountant</option>\r
            <option value="staff">Other Staff</option>\r
          </select>\r
        </div>\r
        <div>\r
          <label for="staffName">Name</label>\r
          <input id="staffName" type="text" placeholder="Full name" required>\r
        </div>\r
        <div id="staffEmailField" class="login-field">\r
          <label for="staffEmail">Email</label>\r
          <input id="staffEmail" type="email" placeholder="staff@school.com" required>\r
        </div>\r
        <div id="staffPasswordField" class="login-field">\r
          <label for="staffPassword">Password</label>\r
          <input id="staffPassword" type="password" placeholder="Minimum 6 characters" minlength="6" required>\r
        </div>\r
        <div>\r
          <label for="staffSalary">Monthly Salary</label>\r
          <input id="staffSalary" type="number" min="0" placeholder="0">\r
        </div>\r
      </div>\r
      <div id="otherFields" class="grid other-fields">\r
        <div>\r
          <label for="staffDesignation">Who is this staff?</label>\r
          <input id="staffDesignation" type="text" placeholder="Receptionist, Guard, Driver, Clerk">\r
        </div>\r
        <div>\r
          <label for="staffDepartment">Department / Work</label>\r
          <input id="staffDepartment" type="text" placeholder="Office, Transport, Security">\r
        </div>\r
      </div>\r
      <div id="teacherFields" class="grid teacher-fields show">\r
        <div>\r
          <label for="teacherClass">Class</label>\r
          <input id="teacherClass" type="text" placeholder="10">\r
        </div>\r
        <div>\r
          <label for="teacherSection">Section</label>\r
          <input id="teacherSection" type="text" placeholder="A">\r
        </div>\r
        <div>\r
          <label for="teacherSubject">Subject</label>\r
          <input id="teacherSubject" type="text" placeholder="Mathematics">\r
        </div>\r
      </div>\r
      <div style="margin-top: 14px;">\r
        <button id="createStaffBtn" class="btn btn-primary" type="submit"><i class="fas fa-user-plus"></i> Create Staff Account</button>\r
      </div>\r
    </form>\r
  </section>\r
\r
  <section class="panel">
    <div class="panel-head">
      <div>
        <h2>Staff Salary</h2>
        <div class="muted">Generate monthly salary records and record payments. Paid salary is posted as debit in School Accounts ledger.</div>\r
      </div>\r
      <a class="btn btn-light" href="#/school-accounts.html"><i class="fas fa-book"></i> Open Ledger</a>\r
    </div>\r
    <div class="salary-layout">\r
      <form id="salaryForm" class="salary-form">\r
        <div>\r
          <label for="salaryStaffSelect">Staff</label>\r
          <select id="salaryStaffSelect" required><option value="">Loading staff...</option></select>\r
        </div>\r
        <div>\r
          <label for="salaryMonth">Salary Month</label>\r
          <input id="salaryMonth" type="month" required>\r
        </div>\r
        <button class="btn btn-primary" type="button" id="generateSalaryBtn"><i class="fas fa-file-invoice"></i> Generate / Select Salary</button>\r
        <div>\r
          <label for="paymentAmount">Payment Amount</label>\r
          <input id="paymentAmount" type="number" min="0.01" step="0.01" placeholder="0.00">\r
        </div>\r
        <div>\r
          <label for="paymentDate">Payment Date</label>\r
          <input id="paymentDate" type="date">\r
        </div>\r
        <div>\r
          <label for="paymentMode">Payment Mode</label>\r
          <select id="paymentMode">\r
            <option>Cash</option>\r
            <option>Bank Transfer</option>\r
            <option>UPI</option>\r
            <option>Cheque</option>\r
            <option>Card</option>\r
            <option>Other</option>\r
          </select>\r
        </div>\r
        <div>\r
          <label for="paymentNote">Note</label>\r
          <input id="paymentNote" type="text" maxlength="160" placeholder="Optional note">\r
        </div>\r
        <button class="btn btn-success" type="submit" id="recordSalaryBtn" disabled><i class="fas fa-indian-rupee-sign"></i> Record Payment</button>\r
      </form>\r
      <div>
        <div id="activeSalaryHint" class="empty">Select staff and month to generate salary.</div>
        <div id="salaryRecordsList" class="salary-records" style="display: none;" hidden></div>
      </div>
    </div>
  </section>

  <section class="panel">
    <div class="panel-head">
      <div>
        <h2>All Staff</h2>
        <div class="muted">Search, edit, activate, or remove staff accounts without touching old role-specific pages.</div>
      </div>
    </div>
    <div class="filters">
      <input id="staffSearch" type="search" placeholder="Search name, email, ID, class, subject">
      <select id="roleFilter">
        <option value="all">All roles</option>
        <option value="teacher">Teachers</option>
        <option value="librarian">Librarians</option>
        <option value="accountant">Accountants</option>
        <option value="staff">Other Staff</option>
      </select>
      <select id="statusFilter">
        <option value="active">Active</option>
        <option value="all">All status</option>
        <option value="removed">Removed</option>
      </select>
      <select id="staffPageSize" class="staff-page-size" aria-label="Rows per page">
        <option value="10">10 / page</option>
        <option value="25">25 / page</option>
        <option value="50">50 / page</option>
      </select>
    </div>
    <div id="staffList" class="staff-list" style="margin-top: 14px;"></div>
    <div id="staffPagination" class="staff-pagination" hidden>
      <div id="staffPaginationInfo" class="staff-pagination-info"></div>
      <div class="staff-pagination-actions">
        <button class="btn btn-light" type="button" id="staffPrevPage"><i class="fas fa-chevron-left"></i> Prev</button>
        <button class="btn btn-light" type="button" id="staffNextPage">Next <i class="fas fa-chevron-right"></i></button>
      </div>
    </div>
  </section>
</main>
\r
<div id="editDialog" class="dialog-backdrop" aria-hidden="true">\r
  <div class="dialog" role="dialog" aria-modal="true" aria-labelledby="editDialogTitle">\r
    <div class="dialog-title">\r
      <h2 id="editDialogTitle">Edit Staff</h2>\r
      <button class="btn btn-light" type="button" id="closeEditBtn" aria-label="Close"><i class="fas fa-times"></i></button>\r
    </div>\r
    <form id="editForm">\r
      <input id="editUid" type="hidden">\r
      <div class="edit-grid">\r
        <div>\r
          <label for="editName">Name</label>\r
          <input id="editName" type="text" required>\r
        </div>\r
        <div>\r
          <label for="editEmail">Email</label>\r
          <input id="editEmail" type="email" required>\r
        </div>\r
        <div>\r
          <label for="editRole">Role</label>\r
          <select id="editRole" required>\r
            <option value="teacher">Teacher</option>\r
            <option value="librarian">Librarian</option>\r
            <option value="accountant">Accountant</option>\r
            <option value="staff">Other Staff</option>\r
          </select>\r
        </div>\r
        <div>\r
          <label for="editStaffId">Staff/Teacher ID</label>\r
          <input id="editStaffId" type="text">\r
        </div>\r
        <div>\r
          <label for="editClass">Class</label>\r
          <input id="editClass" type="text">\r
        </div>\r
        <div>\r
          <label for="editSection">Section</label>\r
          <input id="editSection" type="text">\r
        </div>\r
        <div>\r
          <label for="editSubject">Subject</label>\r
          <input id="editSubject" type="text">\r
        </div>\r
        <div>\r
          <label for="editSalary">Monthly Salary</label>\r
          <input id="editSalary" type="number" min="0">\r
        </div>\r
        <div>\r
          <label for="editDesignation">Designation</label>\r
          <input id="editDesignation" type="text">\r
        </div>\r
        <div>\r
          <label for="editDepartment">Department / Work</label>\r
          <input id="editDepartment" type="text">\r
        </div>\r
      </div>\r
      <div class="dialog-actions">\r
        <button class="btn btn-light" type="button" id="cancelEditBtn">Cancel</button>\r
        <button class="btn btn-primary" type="submit"><i class="fas fa-save"></i> Save Changes</button>\r
      </div>\r
    </form>\r
  </div>\r
</div>\r
\r
<script src="school-branding.js"><\/script>
<script>
(function () {
  function escapeLoaderText(value) {
    return String(value || "").replace(/[&<>"']/g, function (char) {
      return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char];
    });
  }
  function skeletonRows(count) {
    var rows = "";
    for (var i = 0; i < count; i += 1) {
      rows += '<div class="staff-skeleton"><div class="staff-skeleton-line title"></div><div class="staff-skeleton-line meta"></div><div class="staff-skeleton-line short"></div></div>';
    }
    return '<div class="staff-loader" aria-hidden="true">' + rows + "</div>";
  }
  function setLoader(id, message, count) {
    var list = document.getElementById(id);
    if (!list) return;
    if (list.hidden || list.style.display === "none") return;
    list.setAttribute("aria-busy", "true");
    list.innerHTML = '<div class="staff-inline-loader"><i class="fas fa-spinner fa-spin"></i>' + escapeLoaderText(message) + "</div>" + skeletonRows(count);
  }
  function setFallback(id, message) {
    var list = document.getElementById(id);
    if (!list || list.getAttribute("aria-busy") !== "true") return;
    if (list.hidden || list.style.display === "none") return;
    list.removeAttribute("aria-busy");
    list.innerHTML = '<div class="empty">' + escapeLoaderText(message) + "</div>";
  }
  window.SchoolixStaffManagementLoading = {
    staff: function (message) { setLoader("staffList", message || "Loading staff management...", 5); },
    salary: function (message) { setLoader("salaryRecordsList", message || "Loading salary desk...", 3); },
    fallback: function () {
      setFallback("staffList", "Staff data could not be loaded. Please refresh or sign in again.");
      setFallback("salaryRecordsList", "Salary desk could not be loaded.");
    }
  };
  window.SchoolixStaffManagementLoading.staff();
  window.SchoolixStaffManagementLoading.salary();
  window.setTimeout(function () {
    if (!window.SchoolixStaffManagementModuleLoaded) window.SchoolixStaffManagementLoading.fallback();
  }, 18000);
}());
<\/script>
<script type="module">
import { initializeApp } from "./firebase-compat.js?v=staff-loaders-20260806";
import {\r
  getAuth,\r
  createUserWithEmailAndPassword,\r
  onAuthStateChanged,\r
  signOut\r
} from "./firebase-compat.js?v=staff-loaders-20260806";
import {\r
  getFirestore,\r
  doc,\r
  setDoc,\r
  getDoc,\r
  getDocs,\r
  collection,\r
  serverTimestamp,\r
  query,\r
  where\r
} from "./firebase-compat.js?v=staff-loaders-20260806";
import { newLedgerTransactionId, syncStaffSalaryDebit } from "./accounts-ledger.js?v=staff-loaders-20260806";

window.SchoolixStaffManagementModuleLoaded = true;

const firebaseConfig = {
  apiKey: "AIzaSyAomGwef93HFT9Xyx7SVW95FPw_IcIAICE",\r
  authDomain: "schoolix-48107.firebaseapp.com",\r
  projectId: "schoolix-48107",\r
  storageBucket: "schoolix-48107.firebasestorage.app",\r
  messagingSenderId: "133937954491",\r
  appId: "1:133937954491:web:69d8064422617eb8c4339e"\r
};\r
\r
const app = initializeApp(firebaseConfig);\r
const auth = getAuth(app);\r
const db = getFirestore(app);\r
const staffCreatorApp = initializeApp(firebaseConfig, "staffManagementCreatorApp");\r
const staffCreatorAuth = getAuth(staffCreatorApp);\r
const staffRoles = ["teacher", "librarian", "accountant", "staff"];\r
let adminUID = "";\r
let staffRecords = [];
let salaryRecords = [];
let activeSalaryRecordId = "";
let activeSalaryRecord = null;
let staffPage = 1;
\r
const $ = (id) => document.getElementById(id);\r
const clean = (value) => String(value || "").replace(/\\s+/g, " ").trim();\r
const lower = (value) => clean(value).toLowerCase();\r
const money = (value) => Number.isFinite(Number(value)) ? Number(value) : 0;\r
const roleLabel = (role) => ({ teacher: "Teacher", librarian: "Librarian", accountant: "Accountant", staff: "Other Staff" }[role] || clean(role) || "Staff");\r
const isRemoved = (staff) => staff.removedFromPanel === true || staff.panelStatus === "removed" || staff.active === false;\r
const todayISO = () => new Date().toISOString().slice(0, 10);\r
const currentMonth = () => todayISO().slice(0, 7);
const monthLabel = (value) => value ? new Date(\`\${value}-01T12:00:00\`).toLocaleDateString("en-IN", { month: "long", year: "numeric" }) : "Salary";
const salaryStatus = (net, paid) => paid <= 0 ? "Unpaid" : paid >= net ? "Paid" : "Partially Paid";
const moneyLabel = (value) => \`Rs \${money(value).toLocaleString("en-IN")}\`;

function staffSkeletonRows(count = 4) {
  return \`<div class="staff-loader" aria-hidden="true">\${Array.from({ length: count }).map(() => \`
    <div class="staff-skeleton">
      <div class="staff-skeleton-line title"></div>
      <div class="staff-skeleton-line meta"></div>
      <div class="staff-skeleton-line short"></div>
    </div>
  \`).join("")}</div>\`;
}

function setStaffBusy(element, busy, busyHtml = "") {
  if (!element) return;
  if (busy) {
    element.dataset.originalHtml = element.dataset.originalHtml || element.innerHTML;
    element.disabled = true;
    element.setAttribute("aria-busy", "true");
    if (busyHtml) element.innerHTML = busyHtml;
    return;
  }
  element.disabled = false;
  element.removeAttribute("aria-busy");
  if (element.dataset.originalHtml) {
    element.innerHTML = element.dataset.originalHtml;
    delete element.dataset.originalHtml;
  }
}

function showStaffListLoader(message = "Loading staff records...") {
  const list = $("staffList");
  if (!list) return;
  list.setAttribute("aria-busy", "true");
  list.innerHTML = \`<div class="staff-inline-loader"><i class="fas fa-spinner fa-spin"></i>\${escapeHtml(message)}</div>\${staffSkeletonRows(5)}\`;
  $("staffPagination").hidden = true;
}

function showSalaryLoader(message = "Loading salary records...") {
  const list = $("salaryRecordsList");
  if (!list) return;
  if (list.hidden || list.style.display === "none") return;
  list.setAttribute("aria-busy", "true");
  list.innerHTML = \`<div class="staff-inline-loader"><i class="fas fa-spinner fa-spin"></i>\${escapeHtml(message)}</div>\${staffSkeletonRows(3)}\`;
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")\r
    .replace(/</g, "&lt;")\r
    .replace(/>/g, "&gt;")\r
    .replace(/"/g, "&quot;")\r
    .replace(/'/g, "&#39;");\r
}\r
\r
function initials(name, fallback = "S") {\r
  const words = clean(name).split(" ").filter(Boolean);\r
  return (words.length ? words.slice(0, 2).map((word) => word[0]).join("") : fallback).toUpperCase();\r
}\r
\r
function staffKey(staff = {}) {\r
  return clean(staff.teacherId || staff.staffId || staff.employeeId || staff.uid || "");\r
}\r
\r
function staffDesignation(staff = {}) {
  const role = lower(staff.role);
  if (role === "teacher") return staff.subject || "Teacher";
  if (role === "librarian") return "Librarian";
  if (role === "accountant") return "Accountant";
  return staff.designation || staff.department || "Other Staff";
}

function salaryCollectionForRole(role = "") {
  return lower(role) === "teacher" ? "teacher_salary_records" : "staff_salary_records";
}

function salaryCollectionForRecord(record = {}) {
  return record.salaryCollection || (lower(record.staffRole || record.role) === "teacher" || record.sourceType === "teacher_salary"
    ? "teacher_salary_records"
    : "staff_salary_records");
}
\r
async function generateStaffId(role) {
  const prefix = role === "teacher" ? "TCH" : role === "librarian" ? "LIB" : role === "accountant" ? "ACC" : "STF";
  const existing = new Set(staffRecords.map((staff) => staffKey(staff)).filter(Boolean).map((id) => id.toUpperCase()));
  const nextNumber = staffRecords.reduce((max, staff) => {
    const id = staffKey(staff).toUpperCase();
    const match = id.match(new RegExp(\`^\${prefix}-?(\\\\d+)$\`));
    return match ? Math.max(max, Number(match[1]) || 0) : max;
  }, 0) + 1;
  let number = nextNumber;
  let id = "";
  do {
    id = \`\${prefix}-\${String(number).padStart(3, "0")}\`;
    number += 1;
  } while (existing.has(id));
  return id;
}
\r
function setStats() {\r
  const activeStaff = staffRecords.filter((staff) => !isRemoved(staff));\r
  $("statTotal").textContent = activeStaff.length.toLocaleString("en-IN");\r
  $("statTeachers").textContent = activeStaff.filter((staff) => lower(staff.role) === "teacher").length.toLocaleString("en-IN");\r
  $("statLibrarians").textContent = activeStaff.filter((staff) => lower(staff.role) === "librarian").length.toLocaleString("en-IN");\r
  $("statAccountants").textContent = activeStaff.filter((staff) => lower(staff.role) === "accountant").length.toLocaleString("en-IN");\r
}\r
\r
function matchesSearch(staff, search) {
  if (!search) return true;\r
  return [\r
    staff.name,\r
    staff.email,\r
    staff.role,\r
    staff.teacherId,\r
    staff.staffId,\r
      staff.employeeId,\r
      staff.class,\r
      staff.section,\r
      staff.subject,\r
      staff.designation,\r
      staff.department\r
  ].some((value) => lower(value).includes(search));\r
}

function resetStaffPage() {
  staffPage = 1;
}

function renderStaff() {
  $("staffList").removeAttribute("aria-busy");
  setStats();
  const search = lower($("staffSearch").value);
  const roleFilter = $("roleFilter").value;
  const statusFilter = $("statusFilter").value;
  const pageSize = Math.max(1, Number($("staffPageSize")?.value || 10));
  const rows = staffRecords
    .filter((staff) => staffRoles.includes(lower(staff.role)))\r
    .filter((staff) => roleFilter === "all" || lower(staff.role) === roleFilter)\r
    .filter((staff) => statusFilter === "all" || (statusFilter === "removed" ? isRemoved(staff) : !isRemoved(staff)))\r
    .filter((staff) => matchesSearch(staff, search))\r
    .sort((a, b) => \`\${lower(a.role)}-\${lower(a.name)}\`.localeCompare(\`\${lower(b.role)}-\${lower(b.name)}\`));\r

  if (!rows.length) {
    $("staffList").innerHTML = \`<div class="empty">No staff matched the current filters.</div>\`;
    $("staffPagination").hidden = true;
    return;
  }

  const totalPages = Math.max(1, Math.ceil(rows.length / pageSize));
  staffPage = Math.min(Math.max(1, staffPage), totalPages);
  const start = (staffPage - 1) * pageSize;
  const visibleRows = rows.slice(start, start + pageSize);

  $("staffList").innerHTML = visibleRows.map((staff) => {
    const role = lower(staff.role);\r
    const removed = isRemoved(staff);\r
    const meta = [\r
      staff.email || "No email",\r
      staffKey(staff) ? \`ID: \${staffKey(staff)}\` : "",\r
      staff.class ? \`Class \${staff.class}\${staff.section ? "-" + staff.section : ""}\` : "",\r
      staff.subject ? \`Subject: \${staff.subject}\` : "",\r
      lower(staff.role) === "staff" ? \`Designation: \${staffDesignation(staff)}\` : "",\r
      staff.monthlySalary ? \`Salary: Rs \${money(staff.monthlySalary).toLocaleString("en-IN")}\` : ""\r
    ].filter(Boolean).join(" | ");\r
    return \`\r
      <article class="staff-row">\r
        <div class="identity">\r
          <div class="avatar">\${escapeHtml(initials(staff.name || staff.email, role[0] || "S"))}</div>\r
          <div class="staff-main">\r
            <strong>\${escapeHtml(staff.name || "Unnamed Staff")}</strong>\r
            <small>\${escapeHtml(meta)}</small>\r
            <div class="chips">\r
              <span class="chip \${escapeHtml(role)}">\${escapeHtml(roleLabel(role))}</span>\r
              \${removed ? \`<span class="chip removed">Removed</span>\` : \`<span class="chip">Active</span>\`}\r
            </div>\r
          </div>\r
        </div>\r
        <div class="row-actions">\r
          <button class="btn btn-light" type="button" onclick="window.location.href='#/teacher-profile.html?id=\${escapeHtml(staff.uid)}'"><i class="fas fa-id-card"></i> View Profile</button>\r
          <button class="btn btn-light" type="button" onclick="openEditStaff('\${escapeHtml(staff.uid)}')"><i class="fas fa-pen"></i> Edit</button>\r
          \${removed\r
            ? \`<button class="btn btn-success" type="button" onclick="setStaffRemoved('\${escapeHtml(staff.uid)}', false)"><i class="fas fa-user-check"></i> Activate</button>\`\r
            : \`<button class="btn btn-danger" type="button" onclick="setStaffRemoved('\${escapeHtml(staff.uid)}', true)"><i class="fas fa-user-slash"></i> Remove</button>\`}\r
        </div>\r
      </article>\r
    \`;
  }).join("");

  $("staffPagination").hidden = rows.length <= pageSize;
  $("staffPaginationInfo").textContent = \`Showing \${start + 1}-\${Math.min(start + pageSize, rows.length)} of \${rows.length} staff\`;
  $("staffPrevPage").disabled = staffPage <= 1;
  $("staffNextPage").disabled = staffPage >= totalPages;
}
\r
function renderSalaryStaffOptions() {
  const activeStaff = staffRecords.filter((staff) => !isRemoved(staff));\r
  $("salaryStaffSelect").innerHTML = activeStaff.length\r
    ? \`<option value="">Select staff</option>\${activeStaff.map((staff) => \`<option value="\${escapeHtml(staff.uid)}">\${escapeHtml(staff.name || staff.email)} - \${escapeHtml(roleLabel(lower(staff.role)))}\${staff.monthlySalary ? \` (Rs \${money(staff.monthlySalary).toLocaleString("en-IN")})\` : ""}</option>\`).join("")}\`\r
    : \`<option value="">No active staff found</option>\`;\r
}

function salaryStatusClass(status, net, paid) {
  const value = lower(status || salaryStatus(net, paid));
  if (value.includes("paid") && !value.includes("partial")) return "paid";
  if (value.includes("partial")) return "partial";
  return "unpaid";
}

function renderSalaryPlaceholder() {
  $("activeSalaryHint").className = "salary-breakdown-card";
  $("activeSalaryHint").innerHTML = \`
    <div class="salary-breakdown-head">
      <div>
        <strong>Salary Breakdown</strong>
        <span>Select a teacher or staff member to preview monthly salary details.</span>
      </div>
      <span class="salary-status-pill">Ready</span>
    </div>
    <div class="salary-breakdown-grid">
      <div class="salary-breakdown-box base"><span>Base Salary</span><strong>Rs 0</strong></div>
      <div class="salary-breakdown-box"><span>Net Salary</span><strong>Rs 0</strong></div>
      <div class="salary-breakdown-box paid"><span>Paid</span><strong>Rs 0</strong></div>
      <div class="salary-breakdown-box due"><span>Pending</span><strong>Rs 0</strong></div>
    </div>
    <div class="salary-breakdown-note">Select a staff member to view salary, status, and payment history here.</div>
  \`;
}

function renderSalaryBreakdown(record = null, staff = null) {
  const selectedStaff = staff || staffRecords.find((item) => item.uid === (record?.staffUid || record?.teacherUid || $("salaryStaffSelect")?.value));
  if (!record && !selectedStaff) {
    renderSalaryPlaceholder();
    return;
  }
  const base = money(record?.baseSalary ?? selectedStaff?.monthlySalary);
  const net = money(record?.netSalary ?? base);
  const paid = money(record?.paidAmount);
  const due = money(record?.remainingAmount ?? Math.max(net - paid, 0));
  const status = record?.status || salaryStatus(net, paid);
  const staffName = record?.staffName || record?.teacherName || selectedStaff?.name || selectedStaff?.email || "Selected Staff";
  const staffRole = record?.staffRole || selectedStaff?.role || "staff";
  const staffId = record?.staffId || record?.teacherId || staffKey(selectedStaff) || "-";
  const month = record?.monthLabel || monthLabel(record?.monthKey || $("salaryMonth")?.value || currentMonth());
  const session = record?.session || "Current session";
  const payments = Array.isArray(record?.payments) ? record.payments.slice().reverse() : [];
  $("activeSalaryHint").className = "salary-breakdown-card";
  $("activeSalaryHint").innerHTML = \`
    <div class="salary-breakdown-head">
      <div>
        <strong>\${escapeHtml(staffName)}</strong>
        <span>\${escapeHtml(roleLabel(staffRole))} | ID: \${escapeHtml(staffId)} | \${escapeHtml(month)} | \${escapeHtml(session)}</span>
      </div>
      <span class="salary-status-pill \${salaryStatusClass(status, net, paid)}">\${escapeHtml(status)}</span>
    </div>
    <div class="salary-breakdown-grid">
      <div class="salary-breakdown-box base"><span>Base Salary</span><strong>\${moneyLabel(base)}</strong></div>
      <div class="salary-breakdown-box"><span>Net Salary</span><strong>\${moneyLabel(net)}</strong></div>
      <div class="salary-breakdown-box paid"><span>Paid</span><strong>\${moneyLabel(paid)}</strong></div>
      <div class="salary-breakdown-box due"><span>Pending</span><strong>\${moneyLabel(due)}</strong></div>
    </div>
    <div class="salary-payment-history">
      <h4>Payment History</h4>
      \${payments.length ? payments.map((payment) => \`
        <div class="salary-payment-item">
          <div><strong>\${moneyLabel(payment.amount)}</strong><small>\${escapeHtml(payment.note || payment.paymentMode || "Salary payment")}</small></div>
          <span>\${escapeHtml(payment.paymentDate ? new Date(\`\${payment.paymentDate}T00:00:00\`).toLocaleDateString("en-IN") : "Date not set")}</span>
        </div>
      \`).join("") : \`<div class="salary-breakdown-note">No payment history has been recorded for this salary yet.</div>\`}
    </div>
    \${record ? "" : \`<div class="salary-breakdown-note">After the salary record is generated, paid and pending amounts will update here.</div>\`}
  \`;
}

function renderSalaryRecords() {
  $("salaryRecordsList").removeAttribute("aria-busy");
  if ($("salaryRecordsList").hidden || $("salaryRecordsList").style.display === "none") return;
  if (!salaryRecords.length) {
    $("salaryRecordsList").innerHTML = \`<div class="empty">No staff salary records yet.</div>\`;\r
    return;\r
  }\r
  $("salaryRecordsList").innerHTML = salaryRecords
    .slice()
    .sort((a, b) => \`\${b.monthKey || ""}-\${lower(b.staffName || b.teacherName)}\`.localeCompare(\`\${a.monthKey || ""}-\${lower(a.staffName || a.teacherName)}\`))
    .map((record) => {\r
      const paid = money(record.paidAmount);\r
      const net = money(record.netSalary);\r
      const due = money(record.remainingAmount);\r
      return \`\r
        <article class="salary-row">\r
          <div>\r
            <strong>\${escapeHtml(record.staffName || record.teacherName || "Staff")} - \${escapeHtml(record.monthLabel || monthLabel(record.monthKey))}</strong>\r
            <small class="muted">\${escapeHtml(roleLabel(record.staffRole || record.role))} | Net Rs \${net.toLocaleString("en-IN")} | Paid Rs \${paid.toLocaleString("en-IN")} | Due Rs \${due.toLocaleString("en-IN")} | \${escapeHtml(record.status || "Unpaid")}</small>\r
          </div>\r
          <button class="btn btn-light" type="button" onclick="selectSalaryRecord('\${escapeHtml(record.id)}')"><i class="fas fa-arrow-pointer"></i> Select</button>\r
        </article>\r
      \`;\r
    }).join("");\r
}\r
\r
async function loadSalaryRecords() {
  if (!adminUID) return;
  showSalaryLoader();
  try {
    const [teacherSnapshot, staffSnapshot] = await Promise.all([
      getDocs(collection(db, "schools", adminUID, "teacher_salary_records")).catch(() => ({ docs: [] })),
      getDocs(collection(db, "schools", adminUID, "staff_salary_records")).catch(() => ({ docs: [] }))
    ]);
    const recordsById = new Map();
    teacherSnapshot.docs.forEach((item) => {
      const data = item.data();
      recordsById.set(\`teacher:\${item.id}\`, {
        id: item.id,
        ...data,
        staffUid: data.staffUid || data.teacherUid || "",
        staffId: data.staffId || data.teacherId || "",
        staffName: data.staffName || data.teacherName || "Teacher",
        staffEmail: data.staffEmail || data.teacherEmail || "",
        staffRole: "teacher",
        sourceType: "teacher_salary",
        salaryCollection: "teacher_salary_records"
      });
    });
    staffSnapshot.docs.forEach((item) => {
      const data = item.data();
      const role = lower(data.staffRole || data.role);
      const key = role === "teacher" ? \`teacher:\${item.id}\` : \`staff:\${item.id}\`;
      if (recordsById.has(key)) return;
      recordsById.set(key, {
        id: item.id,
        ...data,
        staffRole: role || "staff",
        sourceType: role === "teacher" ? "teacher_salary" : "staff_salary",
        salaryCollection: role === "teacher" ? "teacher_salary_records" : "staff_salary_records"
      });
    });
    salaryRecords = Array.from(recordsById.values());
    renderSalaryRecords();
    if ($("salaryStaffSelect")?.value) previewSelectedStaffSalary();
  } catch (error) {
    console.warn("Unable to load staff salary records", error);
    $("salaryRecordsList").removeAttribute("aria-busy");
    $("salaryRecordsList").innerHTML = \`<div class="empty">Unable to load staff salary records.</div>\`;
  }
}
\r
function setActiveSalaryRecord(record) {
  activeSalaryRecord = record || null;
  activeSalaryRecordId = record?.id || "";
  $("recordSalaryBtn").disabled = !record;
  renderSalaryBreakdown(record);
  $("paymentAmount").value = record && record.remainingAmount > 0 ? record.remainingAmount : "";
}

function previewSelectedStaffSalary() {
  const staff = staffRecords.find((item) => item.uid === $("salaryStaffSelect").value);
  const monthKey = $("salaryMonth").value || currentMonth();
  const existing = salaryRecords.find((record) => {
    const uid = record.staffUid || record.teacherUid;
    return uid === staff?.uid && (!record.monthKey || record.monthKey === monthKey);
  });
  if (existing) {
    setActiveSalaryRecord(existing);
    return;
  }
  activeSalaryRecord = null;
  activeSalaryRecordId = "";
  $("recordSalaryBtn").disabled = true;
  renderSalaryBreakdown(null, staff || null);
}
\r
async function ensureStaffSalaryRecord() {
  const button = $("generateSalaryBtn");
  const staffUid = $("salaryStaffSelect").value;
  const monthKey = $("salaryMonth").value;
  const staff = staffRecords.find((item) => item.uid === staffUid);
  if (!staff) return alert("Select staff first.");
  if (!monthKey) return alert("Select salary month first.");
  const role = lower(staff.role);
  const salaryCollection = salaryCollectionForRole(role);
  const baseSalary = money(staff.monthlySalary);
  if (baseSalary <= 0 && !confirm("Monthly salary is 0. Generate salary record anyway?")) return null;
  setStaffBusy(button, true, \`<i class="fas fa-spinner fa-spin"></i> Generating...\`);
  $("activeSalaryHint").innerHTML = \`<div class="staff-inline-loader"><i class="fas fa-spinner fa-spin"></i> Preparing salary record...</div>\`;
  try {
    const recordId = \`\${staffUid}_\${monthKey}\`;
    const recordRef = doc(db, "schools", adminUID, salaryCollection, recordId);
    const existingSnap = await getDoc(recordRef);
    const existing = existingSnap.exists() ? existingSnap.data() : {};
    let salarySessionId = existing.sessionId || "";
    let salarySessionLabel = existing.session || "";
    if (!salarySessionId) {
      try {
        let viewSessionId = "";
        try { viewSessionId = localStorage.getItem("schoolix.viewSessionId") || ""; } catch (_) {}
        const activeSnap = await getDoc(doc(db, "schools", adminUID, "settings", "activeSession"));
        salarySessionId = viewSessionId || (activeSnap.exists() ? activeSnap.data().sessionId || "" : "");
        if (salarySessionId) {
          const sessionSnap = await getDoc(doc(db, "schools", adminUID, "sessions", salarySessionId));
          if (sessionSnap.exists()) {
            const sessionData = sessionSnap.data();
            salarySessionLabel = sessionData.session || sessionData.name || salarySessionId;
          }
        }
      } catch (error) {
        console.warn("Unable to attach session to salary record", error);
      }
    }
    const payments = Array.isArray(existing.payments) ? existing.payments : [];
    const paidAmount = money(payments.reduce((sum, payment) => sum + Number(payment.amount || 0), 0));
    const netSalary = money(existing.netSalary ?? baseSalary);
    const remainingAmount = money(Math.max(netSalary - paidAmount, 0));
    const payload = {
      staffUid,
      staffId: staffKey(staff),
      staffName: staff.name || staff.email || "Staff",
      staffEmail: staff.email || "",
      staffRole: role,
      designation: staffDesignation(staff),
      department: staff.department || "",
      monthKey,
      monthLabel: monthLabel(monthKey),
      sessionId: salarySessionId,
      session: salarySessionLabel,
      baseSalary,
      netSalary,
      paidAmount,
      remainingAmount,
      status: salaryStatus(netSalary, paidAmount),
      payments,
      sourceType: role === "teacher" ? "teacher_salary" : "staff_salary",
      updatedAt: serverTimestamp(),
      updatedBy: auth.currentUser?.email || "admin"
    };
    if (role === "teacher") {
      payload.teacherUid = staffUid;
      payload.teacherId = staff.teacherId || staffKey(staff);
      payload.teacherName = staff.name || staff.email || "Teacher";
      payload.teacherEmail = staff.email || "";
    }
    if (!existingSnap.exists()) payload.generatedAt = serverTimestamp();
    await setDoc(recordRef, payload, { merge: true });
    const record = { id: recordId, ...payload, salaryCollection };
    activeSalaryRecordId = recordId;
    activeSalaryRecord = record;
    await loadSalaryRecords();
    setActiveSalaryRecord(salaryRecords.find((item) => item.id === recordId) || record);
    return activeSalaryRecord;
  } finally {
    setStaffBusy(button, false);
  }
}
\r
async function recordStaffSalaryPayment(event) {
  event.preventDefault();
  const button = $("recordSalaryBtn");
  if (!activeSalaryRecordId || !activeSalaryRecord) return alert("Generate or select salary record first.");
  const amount = money($("paymentAmount").value);
  if (amount <= 0 || !$("paymentDate").value) return alert("Enter payment amount and payment date.");
  setStaffBusy(button, true, \`<i class="fas fa-spinner fa-spin"></i> Recording...\`);
  try {
    const salaryCollection = salaryCollectionForRecord(activeSalaryRecord);
    const recordRef = doc(db, "schools", adminUID, salaryCollection, activeSalaryRecordId);
    const snap = await getDoc(recordRef);
    if (!snap.exists()) return alert("Salary record no longer exists.");
    const record = {
      id: snap.id,
      ...snap.data(),
      sourceType: salaryCollection === "teacher_salary_records" ? "teacher_salary" : "staff_salary",
      salaryCollection
    };
    const payments = Array.isArray(record.payments) ? [...record.payments] : [];
    const payment = {
      amount,
      paymentDate: $("paymentDate").value,
      paymentMode: $("paymentMode").value,
      note: clean($("paymentNote").value),
      recordedBy: auth.currentUser?.email || "admin",
      recordedAt: new Date().toISOString(),
      ledgerTransactionId: newLedgerTransactionId("SAL")
    };
    payments.push(payment);
    const paidAmount = money(payments.reduce((sum, item) => sum + Number(item.amount || 0), 0));
    const remainingAmount = money(Math.max(Number(record.netSalary || 0) - paidAmount, 0));
    await setDoc(recordRef, {
      payments,
      paidAmount,
      remainingAmount,
      status: salaryStatus(Number(record.netSalary || 0), paidAmount),
      updatedAt: serverTimestamp(),
      updatedBy: auth.currentUser?.email || "admin"
    }, { merge: true });
    await syncStaffSalaryDebit({
      db,
      schoolId: adminUID,
      actor: { uid: auth.currentUser.uid, email: auth.currentUser.email, role: "admin" },
      recordId: activeSalaryRecordId,
      record,
      payment,
      paymentIndex: payments.length - 1
    });
    $("paymentAmount").value = "";
    $("paymentNote").value = "";
    await loadSalaryRecords();
    setActiveSalaryRecord(salaryRecords.find((item) => item.id === activeSalaryRecordId) || null);
    alert("Salary payment recorded and debited in School Accounts.");
  } finally {
    setStaffBusy(button, false);
  }
}
\r
async function loadStaff() {
  if (!adminUID) return;
  showStaffListLoader();
  showSalaryLoader("Waiting for staff records...");
  $("salaryStaffSelect").innerHTML = \`<option value="">Loading staff...</option>\`;
  try {
    const [adminSnap, schoolSnap] = await Promise.all([\r
      getDocs(query(collection(db, "users"), where("adminId", "==", adminUID))),\r
      getDocs(query(collection(db, "users"), where("schoolId", "==", adminUID)))\r
    ]);\r
    const seen = new Set();\r
    staffRecords = [];\r
    [...adminSnap.docs, ...schoolSnap.docs].forEach((docSnap) => {\r
      if (seen.has(docSnap.id)) return;\r
      seen.add(docSnap.id);\r
      const data = docSnap.data();\r
      if (!staffRoles.includes(lower(data.role))) return;\r
      staffRecords.push({ uid: docSnap.id, ...data });\r
    });\r
    renderSalaryStaffOptions();\r
    renderStaff();\r
    await loadSalaryRecords();\r
  } catch (error) {
    console.error("Staff load failed:", error);
    $("staffList").removeAttribute("aria-busy");
    $("salaryRecordsList").removeAttribute("aria-busy");
    $("staffList").innerHTML = \`<div class="empty">Unable to load staff: \${escapeHtml(error.message)}</div>\`;
    $("salaryStaffSelect").innerHTML = \`<option value="">Unable to load staff</option>\`;
  }
}
\r
async function createStaff(event) {\r
  event.preventDefault();\r
  const role = $("staffRole").value;\r
  const name = clean($("staffName").value);\r
  const email = lower($("staffEmail").value);\r
  const password = $("staffPassword").value;\r
  const needsLogin = role !== "staff";\r
  const button = $("createStaffBtn");\r
  const original = button.innerHTML;\r
  if (!role || !name) {\r
    alert("Please fill role and name.");\r
    return;\r
  }\r
  if (needsLogin && (!email || password.length < 6)) {\r
    alert("Please fill email and minimum 6 character password for portal login.");\r
    return;\r
  }\r
  if (role === "teacher" && (!clean($("teacherClass").value) || !clean($("teacherSection").value))) {\r
    alert("Please enter class and section for teacher accounts.");\r
    return;\r
  }\r
  if (role === "staff" && !clean($("staffDesignation").value)) {\r
    alert("Please tell who this Other Staff is, for example Receptionist, Guard, Driver, Clerk.");\r
    return;\r
  }\r
\r
  try {\r
    button.disabled = true;\r
    button.innerHTML = \`<i class="fas fa-spinner fa-spin"></i> Creating...\`;\r
    const userRef = needsLogin ? null : doc(collection(db, "users"));\r
    const userCred = needsLogin ? await createUserWithEmailAndPassword(staffCreatorAuth, email, password) : null;\r
    const uid = needsLogin ? userCred.user.uid : userRef.id;\r
    const generatedId = await generateStaffId(role);\r
    const base = {\r
      name,\r
      email,\r
      role,\r
      adminId: adminUID,\r
      schoolId: adminUID,\r
      loginEnabled: needsLogin,\r
      portalAccess: needsLogin,\r
      staffLocalOnly: !needsLogin,\r
      active: true,\r
      panelStatus: "active",\r
      createdAt: serverTimestamp(),\r
      updatedAt: serverTimestamp()\r
    };\r
    const roleFields = role === "teacher"\r
      ? {\r
          teacherId: generatedId,\r
          class: clean($("teacherClass").value),\r
          section: clean($("teacherSection").value),\r
          subject: clean($("teacherSubject").value),\r
          monthlySalary: money($("staffSalary").value)\r
        }\r
      : {\r
          staffId: generatedId,\r
          designation: role === "staff" ? clean($("staffDesignation").value) : roleLabel(role),\r
          department: clean($("staffDepartment").value),\r
          monthlySalary: money($("staffSalary").value)\r
        };\r
\r
    await setDoc(needsLogin ? doc(db, "users", uid) : userRef, { ...base, ...roleFields });\r
    if (role === "teacher") {\r
      await setDoc(doc(db, "schools", adminUID, "teacher_salaries", uid), {\r
        teacherUid: uid,\r
        teacherId: generatedId,\r
        teacherName: name,\r
        teacherEmail: email,\r
        monthlySalary: money($("staffSalary").value),\r
        adminId: adminUID,\r
        schoolId: adminUID,\r
        createdAt: serverTimestamp(),\r
        updatedAt: serverTimestamp()\r
      }, { merge: true });\r
    }\r
    $("staffForm").reset();
    $("staffRole").value = "teacher";\r
    toggleTeacherFields();\r
    alert(needsLogin ? \`\${roleLabel(role)} account created successfully.\` : \`\${roleLabel(role)} details saved without login access.\`);\r
    await loadStaff();\r
  } catch (error) {\r
    alert(error.message || "Unable to create staff account.");\r
  } finally {\r
    button.disabled = false;\r
    button.innerHTML = original;\r
  }\r
}\r
\r
function toggleTeacherFields() {\r
  const role = $("staffRole").value;\r
  const isOtherStaff = role === "staff";\r
  $("teacherFields").classList.toggle("show", role === "teacher");\r
  $("otherFields").classList.toggle("show", isOtherStaff);\r
  $("staffEmailField").classList.toggle("is-hidden", isOtherStaff);\r
  $("staffPasswordField").classList.toggle("is-hidden", isOtherStaff);\r
  $("staffEmail").required = !isOtherStaff;\r
  $("staffPassword").required = !isOtherStaff;\r
  $("staffDesignation").required = isOtherStaff;\r
  if (isOtherStaff) {\r
    $("staffEmail").value = "";\r
    $("staffPassword").value = "";\r
    $("createStaffBtn").innerHTML = \`<i class="fas fa-user-plus"></i> Save Staff Details\`;\r
  } else {\r
    $("createStaffBtn").innerHTML = \`<i class="fas fa-user-plus"></i> Create Staff Account\`;\r
  }\r
}\r
\r
function openEditStaff(uid) {\r
  const staff = staffRecords.find((item) => item.uid === uid);\r
  if (!staff) return alert("Staff record not found.");\r
  $("editUid").value = uid;\r
  $("editName").value = staff.name || "";\r
  $("editEmail").value = staff.email || "";\r
  $("editRole").value = lower(staff.role) || "staff";\r
  $("editStaffId").value = staffKey(staff);\r
  $("editClass").value = staff.class || "";\r
  $("editSection").value = staff.section || "";\r
  $("editSubject").value = staff.subject || "";\r
  $("editSalary").value = staff.monthlySalary || "";\r
  $("editDesignation").value = staff.designation || "";\r
  $("editDepartment").value = staff.department || "";\r
  $("editDialog").classList.add("show");\r
  $("editDialog").setAttribute("aria-hidden", "false");\r
}\r
\r
function closeEditDialog() {\r
  $("editDialog").classList.remove("show");\r
  $("editDialog").setAttribute("aria-hidden", "true");\r
}\r
\r
async function saveStaff(event) {
  event.preventDefault();
  const button = event.submitter || $("editForm").querySelector('button[type="submit"]');
  const uid = $("editUid").value;
  const role = $("editRole").value;\r
  const staffId = clean($("editStaffId").value);\r
  if (!uid) return;\r
  const payload = {\r
    name: clean($("editName").value),\r
    email: lower($("editEmail").value),\r
    role,\r
    class: clean($("editClass").value),\r
    section: clean($("editSection").value),\r
    subject: clean($("editSubject").value),\r
    designation: clean($("editDesignation").value),\r
    department: clean($("editDepartment").value),\r
    monthlySalary: money($("editSalary").value),\r
    updatedAt: serverTimestamp()\r
  };\r
  if (role === "teacher") payload.teacherId = staffId;
  else payload.staffId = staffId;
  setStaffBusy(button, true, \`<i class="fas fa-spinner fa-spin"></i> Saving...\`);
  try {
    await setDoc(doc(db, "users", uid), payload, { merge: true });
    if (role === "teacher") {
      await setDoc(doc(db, "schools", adminUID, "teacher_salaries", uid), {
        teacherUid: uid,
        teacherId: staffId,
        teacherName: payload.name,
        teacherEmail: payload.email,
        monthlySalary: payload.monthlySalary,
        adminId: adminUID,
        schoolId: adminUID,
        updatedAt: serverTimestamp()
      }, { merge: true });
    }
    closeEditDialog();
    await loadStaff();
    alert("Staff details updated.");
  } finally {
    setStaffBusy(button, false);
  }
}
\r
function selectSalaryRecord(recordId) {
  const record = salaryRecords.find((item) => item.id === recordId);
  if (!record) return alert("Salary record not found.");
  $("salaryStaffSelect").value = record.staffUid || record.teacherUid || "";
  $("salaryMonth").value = record.monthKey || currentMonth();
  setActiveSalaryRecord(record);
}
\r
async function setStaffRemoved(uid, removed) {
  const staff = staffRecords.find((item) => item.uid === uid);
  if (!staff) return alert("Staff record not found.");
  const action = removed ? "remove from active staff" : "activate";
  if (!confirm(\`\${action.charAt(0).toUpperCase() + action.slice(1)} \${staff.name || staff.email}?\`)) return;
  const button = document.activeElement?.tagName === "BUTTON" ? document.activeElement : null;
  setStaffBusy(button, true, \`<i class="fas fa-spinner fa-spin"></i> \${removed ? "Removing..." : "Activating..."}\`);
  try {
    await setDoc(doc(db, "users", uid), {
      active: !removed,
      removedFromPanel: removed,
      panelStatus: removed ? "removed" : "active",
      removedAt: removed ? serverTimestamp() : null,
      removedBy: removed ? (auth.currentUser?.email || "admin") : "",
      updatedAt: serverTimestamp()
    }, { merge: true });
    if (lower(staff.role) === "teacher") {
      await setDoc(doc(db, "schools", adminUID, "teacher_salaries", uid), {
        removedFromPanel: removed,
        panelStatus: removed ? "removed" : "active",
        updatedAt: serverTimestamp()
      }, { merge: true });
    }
    await loadStaff();
  } finally {
    setStaffBusy(button, false);
  }
}
\r
onAuthStateChanged(auth, async (user) => {
  showStaffListLoader("Checking admin access...");
  showSalaryLoader("Preparing salary desk...");
  if (!user) {
    window.location.href = "#/index.html";
    return;
  }
  try {
    const userDoc = await getDoc(doc(db, "users", user.uid));
    const role = lower(userDoc.exists() ? userDoc.data().role : "");
    if (!userDoc.exists() || role !== "admin") {
      alert("Access denied. Only admin can manage staff.");
      window.location.href = "#/index.html";
      return;
    }
    adminUID = user.uid;
    await loadStaff();
  } catch (error) {
    console.error("Staff management auth failed:", error);
    $("staffList").removeAttribute("aria-busy");
    $("salaryRecordsList").removeAttribute("aria-busy");
    $("staffList").innerHTML = \`<div class="empty">Unable to open staff management.</div>\`;
    $("salaryRecordsList").innerHTML = \`<div class="empty">Salary desk unavailable.</div>\`;
  }
});
\r
$("staffForm").addEventListener("submit", createStaff);\r
$("staffRole").addEventListener("change", toggleTeacherFields);\r
$("staffSearch").addEventListener("input", () => { resetStaffPage(); renderStaff(); });
$("roleFilter").addEventListener("change", () => { resetStaffPage(); renderStaff(); });
$("statusFilter").addEventListener("change", () => { resetStaffPage(); renderStaff(); });
$("staffPageSize").addEventListener("change", () => { resetStaffPage(); renderStaff(); });
$("staffPrevPage").addEventListener("click", () => { staffPage = Math.max(1, staffPage - 1); renderStaff(); });
$("staffNextPage").addEventListener("click", () => { staffPage += 1; renderStaff(); });
$("salaryStaffSelect").addEventListener("change", previewSelectedStaffSalary);
$("salaryMonth").addEventListener("change", previewSelectedStaffSalary);
$("editForm").addEventListener("submit", saveStaff);
$("generateSalaryBtn").addEventListener("click", () => ensureStaffSalaryRecord().catch((error) => alert(error.message || "Unable to generate salary record.")));\r
$("salaryForm").addEventListener("submit", (event) => recordStaffSalaryPayment(event).catch((error) => alert(error.message || "Unable to record salary payment.")));\r
$("closeEditBtn").addEventListener("click", closeEditDialog);\r
$("cancelEditBtn").addEventListener("click", closeEditDialog);\r
$("editDialog").addEventListener("click", (event) => {\r
  if (event.target === $("editDialog")) closeEditDialog();\r
});\r
window.openEditStaff = openEditStaff;\r
window.setStaffRemoved = setStaffRemoved;\r
window.selectSalaryRecord = selectSalaryRecord;\r
$("salaryMonth").value = currentMonth();
$("paymentDate").value = todayISO();
toggleTeacherFields();
renderSalaryPlaceholder();
showStaffListLoader("Loading staff management...");
showSalaryLoader("Loading salary desk...");
<\/script>
<script type="module" src="access-control.js?v=accountant-guard-20260806-3"><\/script>
<script src="schoolix-polish.js" defer><\/script>
<script src="admin-shell.js?v=staff-loaders-20260806" defer><\/script>
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
`},{tag:"link",attributes:{rel:"stylesheet",href:"schoolix-polish.css"},text:`
<link rel="stylesheet" href="admin-shell.css?v=navbar-20260721">
<style id="staffProfessionalOverrides">
body.sx-admin-app {
  background: #f3f6fb;
  color: #0f172a;
  font-family: "DM Sans", "Inter", "Segoe UI", Arial, sans-serif;
}
body.sx-admin-app .staff-page,
body.sx-admin-app .staff-page input,
body.sx-admin-app .staff-page select,
body.sx-admin-app .staff-page button {
  font-family: "DM Sans", "Inter", "Segoe UI", Arial, sans-serif;
}
body.sx-admin-app .staff-page h1,
body.sx-admin-app .staff-page h2,
body.sx-admin-app .staff-page .stat strong,
body.sx-admin-app .staff-page .staff-main strong {
  font-family: "Sora", "DM Sans", "Inter", sans-serif;
}
body.sx-admin-app .staff-page {
  width: min(1220px, calc(100% - 40px));
  margin: 0 auto;
  padding: 26px 0 46px;
}
body.sx-admin-app .hero,
body.sx-admin-app .panel,
body.sx-admin-app .stat,
body.sx-admin-app .staff-row,
body.sx-admin-app .salary-row {
  border-radius: 8px;
  letter-spacing: 0;
}
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
`},{attributes:{src:"school-branding.js"},text:""},{attributes:{},text:`
(function () {
  function escapeLoaderText(value) {
    return String(value || "").replace(/[&<>"']/g, function (char) {
      return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char];
    });
  }
  function skeletonRows(count) {
    var rows = "";
    for (var i = 0; i < count; i += 1) {
      rows += '<div class="staff-skeleton"><div class="staff-skeleton-line title"></div><div class="staff-skeleton-line meta"></div><div class="staff-skeleton-line short"></div></div>';
    }
    return '<div class="staff-loader" aria-hidden="true">' + rows + "</div>";
  }
  function setLoader(id, message, count) {
    var list = document.getElementById(id);
    if (!list) return;
    if (list.hidden || list.style.display === "none") return;
    list.setAttribute("aria-busy", "true");
    list.innerHTML = '<div class="staff-inline-loader"><i class="fas fa-spinner fa-spin"></i>' + escapeLoaderText(message) + "</div>" + skeletonRows(count);
  }
  function setFallback(id, message) {
    var list = document.getElementById(id);
    if (!list || list.getAttribute("aria-busy") !== "true") return;
    if (list.hidden || list.style.display === "none") return;
    list.removeAttribute("aria-busy");
    list.innerHTML = '<div class="empty">' + escapeLoaderText(message) + "</div>";
  }
  window.SchoolixStaffManagementLoading = {
    staff: function (message) { setLoader("staffList", message || "Loading staff management...", 5); },
    salary: function (message) { setLoader("salaryRecordsList", message || "Loading salary desk...", 3); },
    fallback: function () {
      setFallback("staffList", "Staff data could not be loaded. Please refresh or sign in again.");
      setFallback("salaryRecordsList", "Salary desk could not be loaded.");
    }
  };
  window.SchoolixStaffManagementLoading.staff();
  window.SchoolixStaffManagementLoading.salary();
  window.setTimeout(function () {
    if (!window.SchoolixStaffManagementModuleLoaded) window.SchoolixStaffManagementLoading.fallback();
  }, 18000);
}());
`},{attributes:{type:"module"},text:`
import { initializeApp } from "./firebase-compat.js?v=staff-loaders-20260806";
import {\r
  getAuth,\r
  createUserWithEmailAndPassword,\r
  onAuthStateChanged,\r
  signOut\r
} from "./firebase-compat.js?v=staff-loaders-20260806";
import {\r
  getFirestore,\r
  doc,\r
  setDoc,\r
  getDoc,\r
  getDocs,\r
  collection,\r
  serverTimestamp,\r
  query,\r
  where\r
} from "./firebase-compat.js?v=staff-loaders-20260806";
import { newLedgerTransactionId, syncStaffSalaryDebit } from "./accounts-ledger.js?v=staff-loaders-20260806";

window.SchoolixStaffManagementModuleLoaded = true;

const firebaseConfig = {
  apiKey: "AIzaSyAomGwef93HFT9Xyx7SVW95FPw_IcIAICE",\r
  authDomain: "schoolix-48107.firebaseapp.com",\r
  projectId: "schoolix-48107",\r
  storageBucket: "schoolix-48107.firebasestorage.app",\r
  messagingSenderId: "133937954491",\r
  appId: "1:133937954491:web:69d8064422617eb8c4339e"\r
};\r
\r
const app = initializeApp(firebaseConfig);\r
const auth = getAuth(app);\r
const db = getFirestore(app);\r
const staffCreatorApp = initializeApp(firebaseConfig, "staffManagementCreatorApp");\r
const staffCreatorAuth = getAuth(staffCreatorApp);\r
const staffRoles = ["teacher", "librarian", "accountant", "staff"];\r
let adminUID = "";\r
let staffRecords = [];
let salaryRecords = [];
let activeSalaryRecordId = "";
let activeSalaryRecord = null;
let staffPage = 1;
\r
const $ = (id) => document.getElementById(id);\r
const clean = (value) => String(value || "").replace(/\\s+/g, " ").trim();\r
const lower = (value) => clean(value).toLowerCase();\r
const money = (value) => Number.isFinite(Number(value)) ? Number(value) : 0;\r
const roleLabel = (role) => ({ teacher: "Teacher", librarian: "Librarian", accountant: "Accountant", staff: "Other Staff" }[role] || clean(role) || "Staff");\r
const isRemoved = (staff) => staff.removedFromPanel === true || staff.panelStatus === "removed" || staff.active === false;\r
const todayISO = () => new Date().toISOString().slice(0, 10);\r
const currentMonth = () => todayISO().slice(0, 7);
const monthLabel = (value) => value ? new Date(\`\${value}-01T12:00:00\`).toLocaleDateString("en-IN", { month: "long", year: "numeric" }) : "Salary";
const salaryStatus = (net, paid) => paid <= 0 ? "Unpaid" : paid >= net ? "Paid" : "Partially Paid";
const moneyLabel = (value) => \`Rs \${money(value).toLocaleString("en-IN")}\`;

function staffSkeletonRows(count = 4) {
  return \`<div class="staff-loader" aria-hidden="true">\${Array.from({ length: count }).map(() => \`
    <div class="staff-skeleton">
      <div class="staff-skeleton-line title"></div>
      <div class="staff-skeleton-line meta"></div>
      <div class="staff-skeleton-line short"></div>
    </div>
  \`).join("")}</div>\`;
}

function setStaffBusy(element, busy, busyHtml = "") {
  if (!element) return;
  if (busy) {
    element.dataset.originalHtml = element.dataset.originalHtml || element.innerHTML;
    element.disabled = true;
    element.setAttribute("aria-busy", "true");
    if (busyHtml) element.innerHTML = busyHtml;
    return;
  }
  element.disabled = false;
  element.removeAttribute("aria-busy");
  if (element.dataset.originalHtml) {
    element.innerHTML = element.dataset.originalHtml;
    delete element.dataset.originalHtml;
  }
}

function showStaffListLoader(message = "Loading staff records...") {
  const list = $("staffList");
  if (!list) return;
  list.setAttribute("aria-busy", "true");
  list.innerHTML = \`<div class="staff-inline-loader"><i class="fas fa-spinner fa-spin"></i>\${escapeHtml(message)}</div>\${staffSkeletonRows(5)}\`;
  $("staffPagination").hidden = true;
}

function showSalaryLoader(message = "Loading salary records...") {
  const list = $("salaryRecordsList");
  if (!list) return;
  if (list.hidden || list.style.display === "none") return;
  list.setAttribute("aria-busy", "true");
  list.innerHTML = \`<div class="staff-inline-loader"><i class="fas fa-spinner fa-spin"></i>\${escapeHtml(message)}</div>\${staffSkeletonRows(3)}\`;
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")\r
    .replace(/</g, "&lt;")\r
    .replace(/>/g, "&gt;")\r
    .replace(/"/g, "&quot;")\r
    .replace(/'/g, "&#39;");\r
}\r
\r
function initials(name, fallback = "S") {\r
  const words = clean(name).split(" ").filter(Boolean);\r
  return (words.length ? words.slice(0, 2).map((word) => word[0]).join("") : fallback).toUpperCase();\r
}\r
\r
function staffKey(staff = {}) {\r
  return clean(staff.teacherId || staff.staffId || staff.employeeId || staff.uid || "");\r
}\r
\r
function staffDesignation(staff = {}) {
  const role = lower(staff.role);
  if (role === "teacher") return staff.subject || "Teacher";
  if (role === "librarian") return "Librarian";
  if (role === "accountant") return "Accountant";
  return staff.designation || staff.department || "Other Staff";
}

function salaryCollectionForRole(role = "") {
  return lower(role) === "teacher" ? "teacher_salary_records" : "staff_salary_records";
}

function salaryCollectionForRecord(record = {}) {
  return record.salaryCollection || (lower(record.staffRole || record.role) === "teacher" || record.sourceType === "teacher_salary"
    ? "teacher_salary_records"
    : "staff_salary_records");
}
\r
async function generateStaffId(role) {
  const prefix = role === "teacher" ? "TCH" : role === "librarian" ? "LIB" : role === "accountant" ? "ACC" : "STF";
  const existing = new Set(staffRecords.map((staff) => staffKey(staff)).filter(Boolean).map((id) => id.toUpperCase()));
  const nextNumber = staffRecords.reduce((max, staff) => {
    const id = staffKey(staff).toUpperCase();
    const match = id.match(new RegExp(\`^\${prefix}-?(\\\\d+)$\`));
    return match ? Math.max(max, Number(match[1]) || 0) : max;
  }, 0) + 1;
  let number = nextNumber;
  let id = "";
  do {
    id = \`\${prefix}-\${String(number).padStart(3, "0")}\`;
    number += 1;
  } while (existing.has(id));
  return id;
}
\r
function setStats() {\r
  const activeStaff = staffRecords.filter((staff) => !isRemoved(staff));\r
  $("statTotal").textContent = activeStaff.length.toLocaleString("en-IN");\r
  $("statTeachers").textContent = activeStaff.filter((staff) => lower(staff.role) === "teacher").length.toLocaleString("en-IN");\r
  $("statLibrarians").textContent = activeStaff.filter((staff) => lower(staff.role) === "librarian").length.toLocaleString("en-IN");\r
  $("statAccountants").textContent = activeStaff.filter((staff) => lower(staff.role) === "accountant").length.toLocaleString("en-IN");\r
}\r
\r
function matchesSearch(staff, search) {
  if (!search) return true;\r
  return [\r
    staff.name,\r
    staff.email,\r
    staff.role,\r
    staff.teacherId,\r
    staff.staffId,\r
      staff.employeeId,\r
      staff.class,\r
      staff.section,\r
      staff.subject,\r
      staff.designation,\r
      staff.department\r
  ].some((value) => lower(value).includes(search));\r
}

function resetStaffPage() {
  staffPage = 1;
}

function renderStaff() {
  $("staffList").removeAttribute("aria-busy");
  setStats();
  const search = lower($("staffSearch").value);
  const roleFilter = $("roleFilter").value;
  const statusFilter = $("statusFilter").value;
  const pageSize = Math.max(1, Number($("staffPageSize")?.value || 10));
  const rows = staffRecords
    .filter((staff) => staffRoles.includes(lower(staff.role)))\r
    .filter((staff) => roleFilter === "all" || lower(staff.role) === roleFilter)\r
    .filter((staff) => statusFilter === "all" || (statusFilter === "removed" ? isRemoved(staff) : !isRemoved(staff)))\r
    .filter((staff) => matchesSearch(staff, search))\r
    .sort((a, b) => \`\${lower(a.role)}-\${lower(a.name)}\`.localeCompare(\`\${lower(b.role)}-\${lower(b.name)}\`));\r

  if (!rows.length) {
    $("staffList").innerHTML = \`<div class="empty">No staff matched the current filters.</div>\`;
    $("staffPagination").hidden = true;
    return;
  }

  const totalPages = Math.max(1, Math.ceil(rows.length / pageSize));
  staffPage = Math.min(Math.max(1, staffPage), totalPages);
  const start = (staffPage - 1) * pageSize;
  const visibleRows = rows.slice(start, start + pageSize);

  $("staffList").innerHTML = visibleRows.map((staff) => {
    const role = lower(staff.role);\r
    const removed = isRemoved(staff);\r
    const meta = [\r
      staff.email || "No email",\r
      staffKey(staff) ? \`ID: \${staffKey(staff)}\` : "",\r
      staff.class ? \`Class \${staff.class}\${staff.section ? "-" + staff.section : ""}\` : "",\r
      staff.subject ? \`Subject: \${staff.subject}\` : "",\r
      lower(staff.role) === "staff" ? \`Designation: \${staffDesignation(staff)}\` : "",\r
      staff.monthlySalary ? \`Salary: Rs \${money(staff.monthlySalary).toLocaleString("en-IN")}\` : ""\r
    ].filter(Boolean).join(" | ");\r
    return \`\r
      <article class="staff-row">\r
        <div class="identity">\r
          <div class="avatar">\${escapeHtml(initials(staff.name || staff.email, role[0] || "S"))}</div>\r
          <div class="staff-main">\r
            <strong>\${escapeHtml(staff.name || "Unnamed Staff")}</strong>\r
            <small>\${escapeHtml(meta)}</small>\r
            <div class="chips">\r
              <span class="chip \${escapeHtml(role)}">\${escapeHtml(roleLabel(role))}</span>\r
              \${removed ? \`<span class="chip removed">Removed</span>\` : \`<span class="chip">Active</span>\`}\r
            </div>\r
          </div>\r
        </div>\r
        <div class="row-actions">\r
          <button class="btn btn-light" type="button" onclick="window.location.href='#/teacher-profile.html?id=\${escapeHtml(staff.uid)}'"><i class="fas fa-id-card"></i> View Profile</button>\r
          <button class="btn btn-light" type="button" onclick="openEditStaff('\${escapeHtml(staff.uid)}')"><i class="fas fa-pen"></i> Edit</button>\r
          \${removed\r
            ? \`<button class="btn btn-success" type="button" onclick="setStaffRemoved('\${escapeHtml(staff.uid)}', false)"><i class="fas fa-user-check"></i> Activate</button>\`\r
            : \`<button class="btn btn-danger" type="button" onclick="setStaffRemoved('\${escapeHtml(staff.uid)}', true)"><i class="fas fa-user-slash"></i> Remove</button>\`}\r
        </div>\r
      </article>\r
    \`;
  }).join("");

  $("staffPagination").hidden = rows.length <= pageSize;
  $("staffPaginationInfo").textContent = \`Showing \${start + 1}-\${Math.min(start + pageSize, rows.length)} of \${rows.length} staff\`;
  $("staffPrevPage").disabled = staffPage <= 1;
  $("staffNextPage").disabled = staffPage >= totalPages;
}
\r
function renderSalaryStaffOptions() {
  const activeStaff = staffRecords.filter((staff) => !isRemoved(staff));\r
  $("salaryStaffSelect").innerHTML = activeStaff.length\r
    ? \`<option value="">Select staff</option>\${activeStaff.map((staff) => \`<option value="\${escapeHtml(staff.uid)}">\${escapeHtml(staff.name || staff.email)} - \${escapeHtml(roleLabel(lower(staff.role)))}\${staff.monthlySalary ? \` (Rs \${money(staff.monthlySalary).toLocaleString("en-IN")})\` : ""}</option>\`).join("")}\`\r
    : \`<option value="">No active staff found</option>\`;\r
}

function salaryStatusClass(status, net, paid) {
  const value = lower(status || salaryStatus(net, paid));
  if (value.includes("paid") && !value.includes("partial")) return "paid";
  if (value.includes("partial")) return "partial";
  return "unpaid";
}

function renderSalaryPlaceholder() {
  $("activeSalaryHint").className = "salary-breakdown-card";
  $("activeSalaryHint").innerHTML = \`
    <div class="salary-breakdown-head">
      <div>
        <strong>Salary Breakdown</strong>
        <span>Select a teacher or staff member to preview monthly salary details.</span>
      </div>
      <span class="salary-status-pill">Ready</span>
    </div>
    <div class="salary-breakdown-grid">
      <div class="salary-breakdown-box base"><span>Base Salary</span><strong>Rs 0</strong></div>
      <div class="salary-breakdown-box"><span>Net Salary</span><strong>Rs 0</strong></div>
      <div class="salary-breakdown-box paid"><span>Paid</span><strong>Rs 0</strong></div>
      <div class="salary-breakdown-box due"><span>Pending</span><strong>Rs 0</strong></div>
    </div>
    <div class="salary-breakdown-note">Select a staff member to view salary, status, and payment history here.</div>
  \`;
}

function renderSalaryBreakdown(record = null, staff = null) {
  const selectedStaff = staff || staffRecords.find((item) => item.uid === (record?.staffUid || record?.teacherUid || $("salaryStaffSelect")?.value));
  if (!record && !selectedStaff) {
    renderSalaryPlaceholder();
    return;
  }
  const base = money(record?.baseSalary ?? selectedStaff?.monthlySalary);
  const net = money(record?.netSalary ?? base);
  const paid = money(record?.paidAmount);
  const due = money(record?.remainingAmount ?? Math.max(net - paid, 0));
  const status = record?.status || salaryStatus(net, paid);
  const staffName = record?.staffName || record?.teacherName || selectedStaff?.name || selectedStaff?.email || "Selected Staff";
  const staffRole = record?.staffRole || selectedStaff?.role || "staff";
  const staffId = record?.staffId || record?.teacherId || staffKey(selectedStaff) || "-";
  const month = record?.monthLabel || monthLabel(record?.monthKey || $("salaryMonth")?.value || currentMonth());
  const session = record?.session || "Current session";
  const payments = Array.isArray(record?.payments) ? record.payments.slice().reverse() : [];
  $("activeSalaryHint").className = "salary-breakdown-card";
  $("activeSalaryHint").innerHTML = \`
    <div class="salary-breakdown-head">
      <div>
        <strong>\${escapeHtml(staffName)}</strong>
        <span>\${escapeHtml(roleLabel(staffRole))} | ID: \${escapeHtml(staffId)} | \${escapeHtml(month)} | \${escapeHtml(session)}</span>
      </div>
      <span class="salary-status-pill \${salaryStatusClass(status, net, paid)}">\${escapeHtml(status)}</span>
    </div>
    <div class="salary-breakdown-grid">
      <div class="salary-breakdown-box base"><span>Base Salary</span><strong>\${moneyLabel(base)}</strong></div>
      <div class="salary-breakdown-box"><span>Net Salary</span><strong>\${moneyLabel(net)}</strong></div>
      <div class="salary-breakdown-box paid"><span>Paid</span><strong>\${moneyLabel(paid)}</strong></div>
      <div class="salary-breakdown-box due"><span>Pending</span><strong>\${moneyLabel(due)}</strong></div>
    </div>
    <div class="salary-payment-history">
      <h4>Payment History</h4>
      \${payments.length ? payments.map((payment) => \`
        <div class="salary-payment-item">
          <div><strong>\${moneyLabel(payment.amount)}</strong><small>\${escapeHtml(payment.note || payment.paymentMode || "Salary payment")}</small></div>
          <span>\${escapeHtml(payment.paymentDate ? new Date(\`\${payment.paymentDate}T00:00:00\`).toLocaleDateString("en-IN") : "Date not set")}</span>
        </div>
      \`).join("") : \`<div class="salary-breakdown-note">No payment history has been recorded for this salary yet.</div>\`}
    </div>
    \${record ? "" : \`<div class="salary-breakdown-note">After the salary record is generated, paid and pending amounts will update here.</div>\`}
  \`;
}

function renderSalaryRecords() {
  $("salaryRecordsList").removeAttribute("aria-busy");
  if ($("salaryRecordsList").hidden || $("salaryRecordsList").style.display === "none") return;
  if (!salaryRecords.length) {
    $("salaryRecordsList").innerHTML = \`<div class="empty">No staff salary records yet.</div>\`;\r
    return;\r
  }\r
  $("salaryRecordsList").innerHTML = salaryRecords
    .slice()
    .sort((a, b) => \`\${b.monthKey || ""}-\${lower(b.staffName || b.teacherName)}\`.localeCompare(\`\${a.monthKey || ""}-\${lower(a.staffName || a.teacherName)}\`))
    .map((record) => {\r
      const paid = money(record.paidAmount);\r
      const net = money(record.netSalary);\r
      const due = money(record.remainingAmount);\r
      return \`\r
        <article class="salary-row">\r
          <div>\r
            <strong>\${escapeHtml(record.staffName || record.teacherName || "Staff")} - \${escapeHtml(record.monthLabel || monthLabel(record.monthKey))}</strong>\r
            <small class="muted">\${escapeHtml(roleLabel(record.staffRole || record.role))} | Net Rs \${net.toLocaleString("en-IN")} | Paid Rs \${paid.toLocaleString("en-IN")} | Due Rs \${due.toLocaleString("en-IN")} | \${escapeHtml(record.status || "Unpaid")}</small>\r
          </div>\r
          <button class="btn btn-light" type="button" onclick="selectSalaryRecord('\${escapeHtml(record.id)}')"><i class="fas fa-arrow-pointer"></i> Select</button>\r
        </article>\r
      \`;\r
    }).join("");\r
}\r
\r
async function loadSalaryRecords() {
  if (!adminUID) return;
  showSalaryLoader();
  try {
    const [teacherSnapshot, staffSnapshot] = await Promise.all([
      getDocs(collection(db, "schools", adminUID, "teacher_salary_records")).catch(() => ({ docs: [] })),
      getDocs(collection(db, "schools", adminUID, "staff_salary_records")).catch(() => ({ docs: [] }))
    ]);
    const recordsById = new Map();
    teacherSnapshot.docs.forEach((item) => {
      const data = item.data();
      recordsById.set(\`teacher:\${item.id}\`, {
        id: item.id,
        ...data,
        staffUid: data.staffUid || data.teacherUid || "",
        staffId: data.staffId || data.teacherId || "",
        staffName: data.staffName || data.teacherName || "Teacher",
        staffEmail: data.staffEmail || data.teacherEmail || "",
        staffRole: "teacher",
        sourceType: "teacher_salary",
        salaryCollection: "teacher_salary_records"
      });
    });
    staffSnapshot.docs.forEach((item) => {
      const data = item.data();
      const role = lower(data.staffRole || data.role);
      const key = role === "teacher" ? \`teacher:\${item.id}\` : \`staff:\${item.id}\`;
      if (recordsById.has(key)) return;
      recordsById.set(key, {
        id: item.id,
        ...data,
        staffRole: role || "staff",
        sourceType: role === "teacher" ? "teacher_salary" : "staff_salary",
        salaryCollection: role === "teacher" ? "teacher_salary_records" : "staff_salary_records"
      });
    });
    salaryRecords = Array.from(recordsById.values());
    renderSalaryRecords();
    if ($("salaryStaffSelect")?.value) previewSelectedStaffSalary();
  } catch (error) {
    console.warn("Unable to load staff salary records", error);
    $("salaryRecordsList").removeAttribute("aria-busy");
    $("salaryRecordsList").innerHTML = \`<div class="empty">Unable to load staff salary records.</div>\`;
  }
}
\r
function setActiveSalaryRecord(record) {
  activeSalaryRecord = record || null;
  activeSalaryRecordId = record?.id || "";
  $("recordSalaryBtn").disabled = !record;
  renderSalaryBreakdown(record);
  $("paymentAmount").value = record && record.remainingAmount > 0 ? record.remainingAmount : "";
}

function previewSelectedStaffSalary() {
  const staff = staffRecords.find((item) => item.uid === $("salaryStaffSelect").value);
  const monthKey = $("salaryMonth").value || currentMonth();
  const existing = salaryRecords.find((record) => {
    const uid = record.staffUid || record.teacherUid;
    return uid === staff?.uid && (!record.monthKey || record.monthKey === monthKey);
  });
  if (existing) {
    setActiveSalaryRecord(existing);
    return;
  }
  activeSalaryRecord = null;
  activeSalaryRecordId = "";
  $("recordSalaryBtn").disabled = true;
  renderSalaryBreakdown(null, staff || null);
}
\r
async function ensureStaffSalaryRecord() {
  const button = $("generateSalaryBtn");
  const staffUid = $("salaryStaffSelect").value;
  const monthKey = $("salaryMonth").value;
  const staff = staffRecords.find((item) => item.uid === staffUid);
  if (!staff) return alert("Select staff first.");
  if (!monthKey) return alert("Select salary month first.");
  const role = lower(staff.role);
  const salaryCollection = salaryCollectionForRole(role);
  const baseSalary = money(staff.monthlySalary);
  if (baseSalary <= 0 && !confirm("Monthly salary is 0. Generate salary record anyway?")) return null;
  setStaffBusy(button, true, \`<i class="fas fa-spinner fa-spin"></i> Generating...\`);
  $("activeSalaryHint").innerHTML = \`<div class="staff-inline-loader"><i class="fas fa-spinner fa-spin"></i> Preparing salary record...</div>\`;
  try {
    const recordId = \`\${staffUid}_\${monthKey}\`;
    const recordRef = doc(db, "schools", adminUID, salaryCollection, recordId);
    const existingSnap = await getDoc(recordRef);
    const existing = existingSnap.exists() ? existingSnap.data() : {};
    let salarySessionId = existing.sessionId || "";
    let salarySessionLabel = existing.session || "";
    if (!salarySessionId) {
      try {
        let viewSessionId = "";
        try { viewSessionId = localStorage.getItem("schoolix.viewSessionId") || ""; } catch (_) {}
        const activeSnap = await getDoc(doc(db, "schools", adminUID, "settings", "activeSession"));
        salarySessionId = viewSessionId || (activeSnap.exists() ? activeSnap.data().sessionId || "" : "");
        if (salarySessionId) {
          const sessionSnap = await getDoc(doc(db, "schools", adminUID, "sessions", salarySessionId));
          if (sessionSnap.exists()) {
            const sessionData = sessionSnap.data();
            salarySessionLabel = sessionData.session || sessionData.name || salarySessionId;
          }
        }
      } catch (error) {
        console.warn("Unable to attach session to salary record", error);
      }
    }
    const payments = Array.isArray(existing.payments) ? existing.payments : [];
    const paidAmount = money(payments.reduce((sum, payment) => sum + Number(payment.amount || 0), 0));
    const netSalary = money(existing.netSalary ?? baseSalary);
    const remainingAmount = money(Math.max(netSalary - paidAmount, 0));
    const payload = {
      staffUid,
      staffId: staffKey(staff),
      staffName: staff.name || staff.email || "Staff",
      staffEmail: staff.email || "",
      staffRole: role,
      designation: staffDesignation(staff),
      department: staff.department || "",
      monthKey,
      monthLabel: monthLabel(monthKey),
      sessionId: salarySessionId,
      session: salarySessionLabel,
      baseSalary,
      netSalary,
      paidAmount,
      remainingAmount,
      status: salaryStatus(netSalary, paidAmount),
      payments,
      sourceType: role === "teacher" ? "teacher_salary" : "staff_salary",
      updatedAt: serverTimestamp(),
      updatedBy: auth.currentUser?.email || "admin"
    };
    if (role === "teacher") {
      payload.teacherUid = staffUid;
      payload.teacherId = staff.teacherId || staffKey(staff);
      payload.teacherName = staff.name || staff.email || "Teacher";
      payload.teacherEmail = staff.email || "";
    }
    if (!existingSnap.exists()) payload.generatedAt = serverTimestamp();
    await setDoc(recordRef, payload, { merge: true });
    const record = { id: recordId, ...payload, salaryCollection };
    activeSalaryRecordId = recordId;
    activeSalaryRecord = record;
    await loadSalaryRecords();
    setActiveSalaryRecord(salaryRecords.find((item) => item.id === recordId) || record);
    return activeSalaryRecord;
  } finally {
    setStaffBusy(button, false);
  }
}
\r
async function recordStaffSalaryPayment(event) {
  event.preventDefault();
  const button = $("recordSalaryBtn");
  if (!activeSalaryRecordId || !activeSalaryRecord) return alert("Generate or select salary record first.");
  const amount = money($("paymentAmount").value);
  if (amount <= 0 || !$("paymentDate").value) return alert("Enter payment amount and payment date.");
  setStaffBusy(button, true, \`<i class="fas fa-spinner fa-spin"></i> Recording...\`);
  try {
    const salaryCollection = salaryCollectionForRecord(activeSalaryRecord);
    const recordRef = doc(db, "schools", adminUID, salaryCollection, activeSalaryRecordId);
    const snap = await getDoc(recordRef);
    if (!snap.exists()) return alert("Salary record no longer exists.");
    const record = {
      id: snap.id,
      ...snap.data(),
      sourceType: salaryCollection === "teacher_salary_records" ? "teacher_salary" : "staff_salary",
      salaryCollection
    };
    const payments = Array.isArray(record.payments) ? [...record.payments] : [];
    const payment = {
      amount,
      paymentDate: $("paymentDate").value,
      paymentMode: $("paymentMode").value,
      note: clean($("paymentNote").value),
      recordedBy: auth.currentUser?.email || "admin",
      recordedAt: new Date().toISOString(),
      ledgerTransactionId: newLedgerTransactionId("SAL")
    };
    payments.push(payment);
    const paidAmount = money(payments.reduce((sum, item) => sum + Number(item.amount || 0), 0));
    const remainingAmount = money(Math.max(Number(record.netSalary || 0) - paidAmount, 0));
    await setDoc(recordRef, {
      payments,
      paidAmount,
      remainingAmount,
      status: salaryStatus(Number(record.netSalary || 0), paidAmount),
      updatedAt: serverTimestamp(),
      updatedBy: auth.currentUser?.email || "admin"
    }, { merge: true });
    await syncStaffSalaryDebit({
      db,
      schoolId: adminUID,
      actor: { uid: auth.currentUser.uid, email: auth.currentUser.email, role: "admin" },
      recordId: activeSalaryRecordId,
      record,
      payment,
      paymentIndex: payments.length - 1
    });
    $("paymentAmount").value = "";
    $("paymentNote").value = "";
    await loadSalaryRecords();
    setActiveSalaryRecord(salaryRecords.find((item) => item.id === activeSalaryRecordId) || null);
    alert("Salary payment recorded and debited in School Accounts.");
  } finally {
    setStaffBusy(button, false);
  }
}
\r
async function loadStaff() {
  if (!adminUID) return;
  showStaffListLoader();
  showSalaryLoader("Waiting for staff records...");
  $("salaryStaffSelect").innerHTML = \`<option value="">Loading staff...</option>\`;
  try {
    const [adminSnap, schoolSnap] = await Promise.all([\r
      getDocs(query(collection(db, "users"), where("adminId", "==", adminUID))),\r
      getDocs(query(collection(db, "users"), where("schoolId", "==", adminUID)))\r
    ]);\r
    const seen = new Set();\r
    staffRecords = [];\r
    [...adminSnap.docs, ...schoolSnap.docs].forEach((docSnap) => {\r
      if (seen.has(docSnap.id)) return;\r
      seen.add(docSnap.id);\r
      const data = docSnap.data();\r
      if (!staffRoles.includes(lower(data.role))) return;\r
      staffRecords.push({ uid: docSnap.id, ...data });\r
    });\r
    renderSalaryStaffOptions();\r
    renderStaff();\r
    await loadSalaryRecords();\r
  } catch (error) {
    console.error("Staff load failed:", error);
    $("staffList").removeAttribute("aria-busy");
    $("salaryRecordsList").removeAttribute("aria-busy");
    $("staffList").innerHTML = \`<div class="empty">Unable to load staff: \${escapeHtml(error.message)}</div>\`;
    $("salaryStaffSelect").innerHTML = \`<option value="">Unable to load staff</option>\`;
  }
}
\r
async function createStaff(event) {\r
  event.preventDefault();\r
  const role = $("staffRole").value;\r
  const name = clean($("staffName").value);\r
  const email = lower($("staffEmail").value);\r
  const password = $("staffPassword").value;\r
  const needsLogin = role !== "staff";\r
  const button = $("createStaffBtn");\r
  const original = button.innerHTML;\r
  if (!role || !name) {\r
    alert("Please fill role and name.");\r
    return;\r
  }\r
  if (needsLogin && (!email || password.length < 6)) {\r
    alert("Please fill email and minimum 6 character password for portal login.");\r
    return;\r
  }\r
  if (role === "teacher" && (!clean($("teacherClass").value) || !clean($("teacherSection").value))) {\r
    alert("Please enter class and section for teacher accounts.");\r
    return;\r
  }\r
  if (role === "staff" && !clean($("staffDesignation").value)) {\r
    alert("Please tell who this Other Staff is, for example Receptionist, Guard, Driver, Clerk.");\r
    return;\r
  }\r
\r
  try {\r
    button.disabled = true;\r
    button.innerHTML = \`<i class="fas fa-spinner fa-spin"></i> Creating...\`;\r
    const userRef = needsLogin ? null : doc(collection(db, "users"));\r
    const userCred = needsLogin ? await createUserWithEmailAndPassword(staffCreatorAuth, email, password) : null;\r
    const uid = needsLogin ? userCred.user.uid : userRef.id;\r
    const generatedId = await generateStaffId(role);\r
    const base = {\r
      name,\r
      email,\r
      role,\r
      adminId: adminUID,\r
      schoolId: adminUID,\r
      loginEnabled: needsLogin,\r
      portalAccess: needsLogin,\r
      staffLocalOnly: !needsLogin,\r
      active: true,\r
      panelStatus: "active",\r
      createdAt: serverTimestamp(),\r
      updatedAt: serverTimestamp()\r
    };\r
    const roleFields = role === "teacher"\r
      ? {\r
          teacherId: generatedId,\r
          class: clean($("teacherClass").value),\r
          section: clean($("teacherSection").value),\r
          subject: clean($("teacherSubject").value),\r
          monthlySalary: money($("staffSalary").value)\r
        }\r
      : {\r
          staffId: generatedId,\r
          designation: role === "staff" ? clean($("staffDesignation").value) : roleLabel(role),\r
          department: clean($("staffDepartment").value),\r
          monthlySalary: money($("staffSalary").value)\r
        };\r
\r
    await setDoc(needsLogin ? doc(db, "users", uid) : userRef, { ...base, ...roleFields });\r
    if (role === "teacher") {\r
      await setDoc(doc(db, "schools", adminUID, "teacher_salaries", uid), {\r
        teacherUid: uid,\r
        teacherId: generatedId,\r
        teacherName: name,\r
        teacherEmail: email,\r
        monthlySalary: money($("staffSalary").value),\r
        adminId: adminUID,\r
        schoolId: adminUID,\r
        createdAt: serverTimestamp(),\r
        updatedAt: serverTimestamp()\r
      }, { merge: true });\r
    }\r
    $("staffForm").reset();
    $("staffRole").value = "teacher";\r
    toggleTeacherFields();\r
    alert(needsLogin ? \`\${roleLabel(role)} account created successfully.\` : \`\${roleLabel(role)} details saved without login access.\`);\r
    await loadStaff();\r
  } catch (error) {\r
    alert(error.message || "Unable to create staff account.");\r
  } finally {\r
    button.disabled = false;\r
    button.innerHTML = original;\r
  }\r
}\r
\r
function toggleTeacherFields() {\r
  const role = $("staffRole").value;\r
  const isOtherStaff = role === "staff";\r
  $("teacherFields").classList.toggle("show", role === "teacher");\r
  $("otherFields").classList.toggle("show", isOtherStaff);\r
  $("staffEmailField").classList.toggle("is-hidden", isOtherStaff);\r
  $("staffPasswordField").classList.toggle("is-hidden", isOtherStaff);\r
  $("staffEmail").required = !isOtherStaff;\r
  $("staffPassword").required = !isOtherStaff;\r
  $("staffDesignation").required = isOtherStaff;\r
  if (isOtherStaff) {\r
    $("staffEmail").value = "";\r
    $("staffPassword").value = "";\r
    $("createStaffBtn").innerHTML = \`<i class="fas fa-user-plus"></i> Save Staff Details\`;\r
  } else {\r
    $("createStaffBtn").innerHTML = \`<i class="fas fa-user-plus"></i> Create Staff Account\`;\r
  }\r
}\r
\r
function openEditStaff(uid) {\r
  const staff = staffRecords.find((item) => item.uid === uid);\r
  if (!staff) return alert("Staff record not found.");\r
  $("editUid").value = uid;\r
  $("editName").value = staff.name || "";\r
  $("editEmail").value = staff.email || "";\r
  $("editRole").value = lower(staff.role) || "staff";\r
  $("editStaffId").value = staffKey(staff);\r
  $("editClass").value = staff.class || "";\r
  $("editSection").value = staff.section || "";\r
  $("editSubject").value = staff.subject || "";\r
  $("editSalary").value = staff.monthlySalary || "";\r
  $("editDesignation").value = staff.designation || "";\r
  $("editDepartment").value = staff.department || "";\r
  $("editDialog").classList.add("show");\r
  $("editDialog").setAttribute("aria-hidden", "false");\r
}\r
\r
function closeEditDialog() {\r
  $("editDialog").classList.remove("show");\r
  $("editDialog").setAttribute("aria-hidden", "true");\r
}\r
\r
async function saveStaff(event) {
  event.preventDefault();
  const button = event.submitter || $("editForm").querySelector('button[type="submit"]');
  const uid = $("editUid").value;
  const role = $("editRole").value;\r
  const staffId = clean($("editStaffId").value);\r
  if (!uid) return;\r
  const payload = {\r
    name: clean($("editName").value),\r
    email: lower($("editEmail").value),\r
    role,\r
    class: clean($("editClass").value),\r
    section: clean($("editSection").value),\r
    subject: clean($("editSubject").value),\r
    designation: clean($("editDesignation").value),\r
    department: clean($("editDepartment").value),\r
    monthlySalary: money($("editSalary").value),\r
    updatedAt: serverTimestamp()\r
  };\r
  if (role === "teacher") payload.teacherId = staffId;
  else payload.staffId = staffId;
  setStaffBusy(button, true, \`<i class="fas fa-spinner fa-spin"></i> Saving...\`);
  try {
    await setDoc(doc(db, "users", uid), payload, { merge: true });
    if (role === "teacher") {
      await setDoc(doc(db, "schools", adminUID, "teacher_salaries", uid), {
        teacherUid: uid,
        teacherId: staffId,
        teacherName: payload.name,
        teacherEmail: payload.email,
        monthlySalary: payload.monthlySalary,
        adminId: adminUID,
        schoolId: adminUID,
        updatedAt: serverTimestamp()
      }, { merge: true });
    }
    closeEditDialog();
    await loadStaff();
    alert("Staff details updated.");
  } finally {
    setStaffBusy(button, false);
  }
}
\r
function selectSalaryRecord(recordId) {
  const record = salaryRecords.find((item) => item.id === recordId);
  if (!record) return alert("Salary record not found.");
  $("salaryStaffSelect").value = record.staffUid || record.teacherUid || "";
  $("salaryMonth").value = record.monthKey || currentMonth();
  setActiveSalaryRecord(record);
}
\r
async function setStaffRemoved(uid, removed) {
  const staff = staffRecords.find((item) => item.uid === uid);
  if (!staff) return alert("Staff record not found.");
  const action = removed ? "remove from active staff" : "activate";
  if (!confirm(\`\${action.charAt(0).toUpperCase() + action.slice(1)} \${staff.name || staff.email}?\`)) return;
  const button = document.activeElement?.tagName === "BUTTON" ? document.activeElement : null;
  setStaffBusy(button, true, \`<i class="fas fa-spinner fa-spin"></i> \${removed ? "Removing..." : "Activating..."}\`);
  try {
    await setDoc(doc(db, "users", uid), {
      active: !removed,
      removedFromPanel: removed,
      panelStatus: removed ? "removed" : "active",
      removedAt: removed ? serverTimestamp() : null,
      removedBy: removed ? (auth.currentUser?.email || "admin") : "",
      updatedAt: serverTimestamp()
    }, { merge: true });
    if (lower(staff.role) === "teacher") {
      await setDoc(doc(db, "schools", adminUID, "teacher_salaries", uid), {
        removedFromPanel: removed,
        panelStatus: removed ? "removed" : "active",
        updatedAt: serverTimestamp()
      }, { merge: true });
    }
    await loadStaff();
  } finally {
    setStaffBusy(button, false);
  }
}
\r
onAuthStateChanged(auth, async (user) => {
  showStaffListLoader("Checking admin access...");
  showSalaryLoader("Preparing salary desk...");
  if (!user) {
    window.location.href = "#/index.html";
    return;
  }
  try {
    const userDoc = await getDoc(doc(db, "users", user.uid));
    const role = lower(userDoc.exists() ? userDoc.data().role : "");
    if (!userDoc.exists() || role !== "admin") {
      alert("Access denied. Only admin can manage staff.");
      window.location.href = "#/index.html";
      return;
    }
    adminUID = user.uid;
    await loadStaff();
  } catch (error) {
    console.error("Staff management auth failed:", error);
    $("staffList").removeAttribute("aria-busy");
    $("salaryRecordsList").removeAttribute("aria-busy");
    $("staffList").innerHTML = \`<div class="empty">Unable to open staff management.</div>\`;
    $("salaryRecordsList").innerHTML = \`<div class="empty">Salary desk unavailable.</div>\`;
  }
});
\r
$("staffForm").addEventListener("submit", createStaff);\r
$("staffRole").addEventListener("change", toggleTeacherFields);\r
$("staffSearch").addEventListener("input", () => { resetStaffPage(); renderStaff(); });
$("roleFilter").addEventListener("change", () => { resetStaffPage(); renderStaff(); });
$("statusFilter").addEventListener("change", () => { resetStaffPage(); renderStaff(); });
$("staffPageSize").addEventListener("change", () => { resetStaffPage(); renderStaff(); });
$("staffPrevPage").addEventListener("click", () => { staffPage = Math.max(1, staffPage - 1); renderStaff(); });
$("staffNextPage").addEventListener("click", () => { staffPage += 1; renderStaff(); });
$("salaryStaffSelect").addEventListener("change", previewSelectedStaffSalary);
$("salaryMonth").addEventListener("change", previewSelectedStaffSalary);
$("editForm").addEventListener("submit", saveStaff);
$("generateSalaryBtn").addEventListener("click", () => ensureStaffSalaryRecord().catch((error) => alert(error.message || "Unable to generate salary record.")));\r
$("salaryForm").addEventListener("submit", (event) => recordStaffSalaryPayment(event).catch((error) => alert(error.message || "Unable to record salary payment.")));\r
$("closeEditBtn").addEventListener("click", closeEditDialog);\r
$("cancelEditBtn").addEventListener("click", closeEditDialog);\r
$("editDialog").addEventListener("click", (event) => {\r
  if (event.target === $("editDialog")) closeEditDialog();\r
});\r
window.openEditStaff = openEditStaff;\r
window.setStaffRemoved = setStaffRemoved;\r
window.selectSalaryRecord = selectSalaryRecord;\r
$("salaryMonth").value = currentMonth();
$("paymentDate").value = todayISO();
toggleTeacherFields();
renderSalaryPlaceholder();
showStaffListLoader("Loading staff management...");
showSalaryLoader("Loading salary desk...");
`},{attributes:{type:"module",src:"access-control.js?v=accountant-guard-20260806-3"},text:""},{attributes:{src:"schoolix-polish.js"},text:""},{attributes:{src:"admin-shell.js?v=staff-loaders-20260806"},text:""}]};export{e as default};
