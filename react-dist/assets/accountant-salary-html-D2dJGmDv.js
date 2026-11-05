const e={file:"accountant-salary.html",title:"Salary Management - Schoolix",htmlClass:"",bodyClass:"library-dashboard-app sx-accountant-shell-enabled",body:`
<div id="sxPageLoader" class="sx-page-loader" role="status" aria-live="polite">
  <section class="dots-container" aria-label="Loading page">
    <div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div>
  </section>
</div>
<div class="library-app-layout">
  <div class="library-sidebar-overlay" id="librarySidebarOverlay" aria-hidden="true"></div>
  <aside class="library-sidebar" id="librarySidebar"></aside>
  <main class="library-main">
    <header class="library-page-topbar">
      <div>
        <h1 class="library-page-title">Salary Management</h1>
        <div class="library-page-meta" id="schoolName">Loading salary desk...</div>
      </div>
      <button class="library-menu-button" id="libraryMenuButton" type="button" aria-label="Open accounts navigation" aria-expanded="false">
        <span class="library-toggle-arrow" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="m15 18-6-6 6-6"></path></svg></span>
      </button>
    </header>

    <section class="salary-page">
      <section class="salary-hero">
        <div>
          <h2>Teacher & Staff Salary</h2>
          <p>Generate monthly salary records, record paid amount, and post salary payments as debit entries in School Accounts ledger.</p>
        </div>
        <div class="salary-actions">
          <a class="btn" href="#/school-accounts.html"><i class="fas fa-book"></i> Open Ledger</a>
          <button class="btn primary" type="button" id="refreshBtn"><i class="fas fa-rotate"></i> Refresh</button>
        </div>
      </section>

      <section class="summary-row" aria-label="Salary summary">
        <div class="summary-box"><span>Records</span><strong id="statRecords">0</strong></div>
        <div class="summary-box balance"><span>Net Salary</span><strong id="statNet">Rs 0</strong></div>
        <div class="summary-box green"><span>Paid</span><strong id="statPaid">Rs 0</strong></div>
        <div class="summary-box red"><span>Due</span><strong id="statDue">Rs 0</strong></div>
      </section>

      <section class="salary-grid">
        <aside class="salary-panel">
          <div class="salary-panel-head">
            <div>
              <h3>Record Salary Payment</h3>
              <p>Select teacher/staff and month, then generate or select salary record.</p>
            </div>
          </div>
          <form class="salary-form" id="salaryForm">
            <div class="field">
              <label for="salaryStaffSelect">Teacher / Staff</label>
              <select id="salaryStaffSelect" required><option value="">Loading staff...</option></select>
            </div>
            <div class="field">
              <label for="salaryMonth">Salary Month</label>
              <input id="salaryMonth" type="month" required>
            </div>
            <button class="btn primary" type="button" id="generateSalaryBtn"><i class="fas fa-file-invoice"></i> Generate / Select Salary</button>
            <div class="active-hint" id="activeSalaryHint">Select staff and month to generate salary.</div>
            <div class="field">
              <label for="paymentAmount">Payment Amount</label>
              <input id="paymentAmount" type="number" min="0.01" step="0.01" placeholder="0.00">
            </div>
            <div class="field">
              <label for="paymentDate">Payment Date</label>
              <input id="paymentDate" type="date">
            </div>
            <div class="field">
              <label for="paymentMode">Payment Mode</label>
              <select id="paymentMode">
                <option value="Cash">Cash</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="UPI">UPI</option>
                <option value="Cheque">Cheque</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div class="field">
              <label for="paymentNote">Note</label>
              <textarea id="paymentNote" maxlength="180" placeholder="Optional salary payment note"></textarea>
            </div>
            <button class="btn success" type="submit" id="recordSalaryBtn" disabled><i class="fas fa-indian-rupee-sign"></i> Record Payment & Debit Ledger</button>
          </form>
        </aside>

        <section class="salary-panel">
          <div class="salary-panel-head">
            <div>
              <h3>Salary Records</h3>
              <p>Inspect paid, due, status, and payment history for teachers and staff.</p>
            </div>
          </div>
          <div class="record-toolbar">
            <input id="recordSearch" type="search" placeholder="Search name, role, status">
            <select id="roleFilter">
              <option value="all">All roles</option>
              <option value="teacher">Teachers</option>
              <option value="staff">Staff only</option>
            </select>
            <select id="statusFilter">
              <option value="all">All status</option>
              <option value="Unpaid">Unpaid</option>
              <option value="Partially Paid">Partially Paid</option>
              <option value="Paid">Paid</option>
            </select>
            <select id="monthFilter" aria-label="Filter records by month">
              <option value="">All months</option>
            </select>
          </div>
          <div class="record-list" id="salaryRecordsList"><div class="empty">Loading salary records...</div></div>
          <div class="pagination-bar" id="salaryPagination">
            <span id="salaryPaginationInfo">0 records</span>
            <div class="pagination-actions">
              <select id="salaryPageSize" class="page-size-select" aria-label="Salary records per page">
                <option value="10">10 records</option>
                <option value="25">25 records</option>
                <option value="50">50 records</option>
                <option value="all">All</option>
              </select>
              <button class="btn" id="salaryPrevPage" type="button">Previous</button>
              <span id="salaryPageInfo">Page 1 of 1</span>
              <button class="btn" id="salaryNextPage" type="button">Next</button>
            </div>
          </div>
        </section>
      </section>
    </section>
  </main>
</div>

<script src="school-branding.js"><\/script>
<script src="accountant-portal.js?v=accountant-portal-20260806-4"><\/script>
<script type="module">
import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from "./firebase-compat.js";
import { collection, doc, getDoc, getDocs, limit, query, serverTimestamp, setDoc, where } from "./firebase-compat.js";
import { newLedgerTransactionId, syncStaffSalaryDebit } from "./accounts-ledger.js";

const $ = (id) => document.getElementById(id);
let schoolId = "";
let currentUserProfile = {};
let staffRecords = [];
let salaryRecords = [];
let activeSalaryRecordId = "";
let activeSalaryRecord = null;
let activeSessionId = "";
let activeSessionLabel = "";
let salaryPage = 1;

const clean = (value) => String(value || "").replace(/\\s+/g, " ").trim();
const lower = (value) => clean(value).toLowerCase();
const amount = (value) => Number.isFinite(Number(value)) ? Number(value) : 0;
const todayISO = () => new Date().toISOString().slice(0, 10);
const currentMonth = () => todayISO().slice(0, 7);
const money = (value) => \`Rs \${amount(value).toLocaleString("en-IN", { maximumFractionDigits: 2 })}\`;
const monthLabel = (value) => value ? new Date(\`\${value}-01T12:00:00\`).toLocaleDateString("en-IN", { month: "long", year: "numeric" }) : "Salary";
const salaryStatus = (net, paid) => paid <= 0 ? "Unpaid" : paid >= net ? "Paid" : "Partially Paid";
const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
const roleLabel = (role) => ({ teacher: "Teacher", librarian: "Librarian", accountant: "Accountant", staff: "Other Staff" }[role] || clean(role) || "Staff");

function toast(message, type = "success") {
  document.querySelector(".toast")?.remove();
  const el = document.createElement("div");
  el.className = \`toast \${type === "error" ? "error" : ""}\`;
  el.textContent = message;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 4200);
}

function isRemoved(staff = {}) {
  return staff.removedFromPanel === true || staff.panelStatus === "removed" || staff.active === false;
}

function staffKey(staff = {}) {
  return clean(staff.teacherId || staff.staffId || staff.employeeId || staff.uid);
}

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
  return record.salaryCollection || (lower(record.staffRole || record.role) === "teacher" || record.sourceType === "teacher_salary" ? "teacher_salary_records" : "staff_salary_records");
}

function recordStaffName(record = {}) {
  return record.staffName || record.teacherName || "Staff";
}

function normalizeSalaryRecord(id, data = {}, forcedCollection = "") {
  const role = lower(data.staffRole || data.role || (forcedCollection === "teacher_salary_records" ? "teacher" : ""));
  const collectionName = forcedCollection || salaryCollectionForRole(role);
  const isTeacher = collectionName === "teacher_salary_records" || role === "teacher" || data.sourceType === "teacher_salary";
  return {
    id,
    ...data,
    staffUid: data.staffUid || data.teacherUid || "",
    staffId: data.staffId || data.teacherId || "",
    staffName: data.staffName || data.teacherName || "Staff",
    staffEmail: data.staffEmail || data.teacherEmail || "",
    staffRole: isTeacher ? "teacher" : (role || "staff"),
    sourceType: isTeacher ? "teacher_salary" : "staff_salary",
    salaryCollection: isTeacher ? "teacher_salary_records" : "staff_salary_records"
  };
}

function setActiveSalaryRecord(record) {
  activeSalaryRecord = record || null;
  activeSalaryRecordId = record?.id || "";
  $("recordSalaryBtn").disabled = !record;
  if (!record) {
    $("activeSalaryHint").innerHTML = "Select staff and month to generate salary.";
    $("paymentAmount").value = "";
    return;
  }
  const net = amount(record.netSalary);
  const paid = amount(record.paidAmount);
  const due = amount(record.remainingAmount ?? Math.max(net - paid, 0));
  $("activeSalaryHint").innerHTML = \`<strong>\${escapeHtml(recordStaffName(record))} - \${escapeHtml(record.monthLabel || monthLabel(record.monthKey))}</strong><br><span>Net \${money(net)}, paid \${money(paid)}, due \${money(due)}.</span>\`;
  $("paymentAmount").value = due > 0 ? due : "";
  $("salaryStaffSelect").value = record.staffUid || record.teacherUid || "";
  $("salaryMonth").value = record.monthKey || currentMonth();
  renderSalaryRecords();
}

function renderStaffOptions() {
  const activeStaff = staffRecords.filter((staff) => !isRemoved(staff));
  $("salaryStaffSelect").innerHTML = activeStaff.length
    ? \`<option value="">Select teacher/staff</option>\${activeStaff.map((staff) => \`<option value="\${escapeHtml(staff.uid)}">\${escapeHtml(staff.name || staff.email || "Unnamed")} - \${escapeHtml(roleLabel(lower(staff.role)))}\${staff.monthlySalary ? \` (\${money(staff.monthlySalary)})\` : ""}</option>\`).join("")}\`
    : \`<option value="">No teacher/staff found</option>\`;
}

function updateMonthFilter() {
  const months = [...new Set(salaryRecords.map((record) => record.monthKey).filter(Boolean))].sort().reverse();
  const selected = $("monthFilter").value;
  $("monthFilter").innerHTML = \`<option value="">All months</option>\${months.map((month) => \`<option value="\${escapeHtml(month)}">\${escapeHtml(monthLabel(month))}</option>\`).join("")}\`;
  if (months.includes(selected)) $("monthFilter").value = selected;
}

function filteredSalaryRecords() {
  const term = lower($("recordSearch").value);
  const roleFilter = $("roleFilter").value;
  const statusFilter = $("statusFilter").value;
  const monthFilter = $("monthFilter").value;
  return salaryRecords
    .filter((record) => roleFilter === "all" || (roleFilter === "teacher" ? lower(record.staffRole) === "teacher" : lower(record.staffRole) !== "teacher"))
    .filter((record) => statusFilter === "all" || (record.status || salaryStatus(record.netSalary, record.paidAmount)) === statusFilter)
    .filter((record) => !monthFilter || record.monthKey === monthFilter)
    .filter((record) => !term || [recordStaffName(record), record.staffId, record.staffRole, record.status, record.monthLabel, record.reference].some((value) => lower(value).includes(term)))
    .sort((a, b) => \`\${b.monthKey || ""}-\${lower(recordStaffName(b))}\`.localeCompare(\`\${a.monthKey || ""}-\${lower(recordStaffName(a))}\`));
}

function renderStats(records) {
  const net = records.reduce((sum, record) => sum + amount(record.netSalary), 0);
  const paid = records.reduce((sum, record) => sum + amount(record.paidAmount), 0);
  const due = records.reduce((sum, record) => sum + amount(record.remainingAmount ?? Math.max(amount(record.netSalary) - amount(record.paidAmount), 0)), 0);
  $("statRecords").textContent = records.length.toLocaleString("en-IN");
  $("statNet").textContent = money(net);
  $("statPaid").textContent = money(paid);
  $("statDue").textContent = money(due);
}

function salaryPageSizeValue() {
  const value = $("salaryPageSize")?.value || "10";
  return value === "all" ? "all" : Math.max(1, Number(value) || 10);
}

function resetSalaryPage() {
  salaryPage = 1;
}

function updateSalaryPagination(total) {
  const pageSize = salaryPageSizeValue();
  const all = pageSize === "all";
  const pages = all ? 1 : Math.max(1, Math.ceil(total / pageSize));
  if (salaryPage > pages) salaryPage = pages;
  const start = total ? (all ? 1 : (salaryPage - 1) * pageSize + 1) : 0;
  const end = all ? total : Math.min(total, salaryPage * pageSize);
  $("salaryPaginationInfo").textContent = total ? \`Showing \${start}-\${end} of \${total} records\` : "0 records";
  $("salaryPageInfo").textContent = \`Page \${salaryPage} of \${pages}\`;
  $("salaryPrevPage").disabled = all || salaryPage <= 1;
  $("salaryNextPage").disabled = all || salaryPage >= pages;
}

function renderSalaryRecords() {
  updateMonthFilter();
  const records = filteredSalaryRecords();
  renderStats(records);
  updateSalaryPagination(records.length);
  if (!records.length) {
    $("salaryRecordsList").innerHTML = \`<div class="empty">No salary records match this view. Generate salary record to start payout.</div>\`;
    return;
  }
  const pageSize = salaryPageSizeValue();
  const visibleRecords = pageSize === "all" ? records : records.slice((salaryPage - 1) * pageSize, salaryPage * pageSize);
  $("salaryRecordsList").innerHTML = visibleRecords.map((record) => {
    const net = amount(record.netSalary);
    const paid = amount(record.paidAmount);
    const due = amount(record.remainingAmount ?? Math.max(net - paid, 0));
    const status = record.status || salaryStatus(net, paid);
    const payments = Array.isArray(record.payments) ? record.payments : [];
    const paymentText = payments.length ? \`\${payments.length} payment(s)\` : "No payment yet";
    return \`
      <article class="record-card \${record.id === activeSalaryRecordId ? "is-active" : ""}">
        <div>
          <strong>\${escapeHtml(recordStaffName(record))} - \${escapeHtml(record.monthLabel || monthLabel(record.monthKey))}</strong>
          <small>\${escapeHtml(roleLabel(record.staffRole))} | Net \${money(net)} | Paid \${money(paid)} | Due \${money(due)} | \${escapeHtml(paymentText)}</small>
          <span class="pill \${status === "Paid" ? "paid" : due > 0 ? "due" : ""}">\${escapeHtml(status)}</span>
        </div>
        <button class="btn" type="button" data-select-salary="\${escapeHtml(record.id)}"><i class="fas fa-arrow-pointer"></i> Select</button>
      </article>
    \`;
  }).join("");
}

async function loadStaff() {
  if (!schoolId) return;
  const [byAdmin, bySchool] = await Promise.all([
    getDocs(query(collection(db, "users"), where("adminId", "==", schoolId))).catch(() => ({ docs: [] })),
    getDocs(query(collection(db, "users"), where("schoolId", "==", schoolId))).catch(() => ({ docs: [] }))
  ]);
  const byUid = new Map();
  [...byAdmin.docs, ...bySchool.docs].forEach((item) => {
    const data = item.data();
    const role = lower(data.role);
    if (!["teacher", "librarian", "accountant", "staff"].includes(role)) return;
    byUid.set(item.id, { uid: item.id, ...data, role });
  });
  staffRecords = [...byUid.values()].sort((a, b) => \`\${lower(a.role)}-\${lower(a.name || a.email)}\`.localeCompare(\`\${lower(b.role)}-\${lower(b.name || b.email)}\`));
  renderStaffOptions();
}

async function loadSalaryRecords() {
  if (!schoolId) return;
  $("salaryRecordsList").innerHTML = \`<div class="empty">Loading salary records...</div>\`;
  const [teacherSnapshot, staffSnapshot] = await Promise.all([
    getDocs(collection(db, "schools", schoolId, "teacher_salary_records")).catch(() => ({ docs: [] })),
    getDocs(collection(db, "schools", schoolId, "staff_salary_records")).catch(() => ({ docs: [] }))
  ]);
  const recordsByKey = new Map();
  teacherSnapshot.docs.forEach((item) => recordsByKey.set(\`teacher:\${item.id}\`, normalizeSalaryRecord(item.id, item.data(), "teacher_salary_records")));
  staffSnapshot.docs.forEach((item) => {
    const record = normalizeSalaryRecord(item.id, item.data(), "staff_salary_records");
    const key = record.staffRole === "teacher" ? \`teacher:\${item.id}\` : \`staff:\${item.id}\`;
    if (!recordsByKey.has(key)) recordsByKey.set(key, record);
  });
  salaryRecords = [...recordsByKey.values()];
  renderSalaryRecords();
}

async function loadActiveSession() {
  if (!schoolId) return;
  try {
    let viewSessionId = "";
    try { viewSessionId = localStorage.getItem("schoolix.viewSessionId") || ""; } catch (_) {}
    const activeSnap = await getDoc(doc(db, "schools", schoolId, "settings", "activeSession"));
    activeSessionId = viewSessionId || (activeSnap.exists() ? activeSnap.data().sessionId || "" : "");
    if (activeSessionId) {
      const sessionSnap = await getDoc(doc(db, "schools", schoolId, "sessions", activeSessionId));
      const data = sessionSnap.exists() ? sessionSnap.data() : {};
      activeSessionLabel = data.session || data.name || activeSessionId;
    }
  } catch (error) {
    console.warn("Unable to load active salary session", error);
  }
}

async function ensureSalaryRecord() {
  const staffUid = $("salaryStaffSelect").value;
  const monthKey = $("salaryMonth").value;
  const staff = staffRecords.find((item) => item.uid === staffUid);
  if (!staff) return toast("Select teacher/staff first.", "error");
  if (!monthKey) return toast("Select salary month first.", "error");
  const role = lower(staff.role);
  const salaryCollection = salaryCollectionForRole(role);
  const baseSalary = amount(staff.monthlySalary);
  const recordId = \`\${staffUid}_\${monthKey}\`;
  const recordRef = doc(db, "schools", schoolId, salaryCollection, recordId);
  const existingSnap = await getDoc(recordRef);
  const existing = existingSnap.exists() ? existingSnap.data() : {};
  const payments = Array.isArray(existing.payments) ? existing.payments : [];
  const paidAmount = amount(payments.reduce((sum, payment) => sum + Number(payment.amount || 0), 0));
  const netSalary = amount(existing.netSalary ?? baseSalary);
  const remainingAmount = amount(Math.max(netSalary - paidAmount, 0));
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
    sessionId: existing.sessionId || activeSessionId,
    session: existing.session || activeSessionLabel,
    baseSalary,
    netSalary,
    paidAmount,
    remainingAmount,
    status: salaryStatus(netSalary, paidAmount),
    payments,
    sourceType: role === "teacher" ? "teacher_salary" : "staff_salary",
    updatedAt: serverTimestamp(),
    updatedBy: auth.currentUser?.email || "accountant"
  };
  if (role === "teacher") {
    payload.teacherUid = staffUid;
    payload.teacherId = staff.teacherId || staffKey(staff);
    payload.teacherName = staff.name || staff.email || "Teacher";
    payload.teacherEmail = staff.email || "";
  }
  if (!existingSnap.exists()) payload.generatedAt = serverTimestamp();
  await setDoc(recordRef, payload, { merge: true });
  const record = normalizeSalaryRecord(recordId, payload, salaryCollection);
  await loadSalaryRecords();
  setActiveSalaryRecord(salaryRecords.find((item) => item.id === recordId) || record);
  toast("Salary record ready.");
}

async function recordSalaryPayment(event) {
  event.preventDefault();
  if (!activeSalaryRecordId || !activeSalaryRecord) return toast("Generate or select salary record first.", "error");
  const paymentAmount = amount($("paymentAmount").value);
  if (paymentAmount <= 0 || !$("paymentDate").value) return toast("Enter payment amount and payment date.", "error");
  const salaryCollection = salaryCollectionForRecord(activeSalaryRecord);
  const recordRef = doc(db, "schools", schoolId, salaryCollection, activeSalaryRecordId);
  const snap = await getDoc(recordRef);
  if (!snap.exists()) return toast("Salary record no longer exists.", "error");
  const record = normalizeSalaryRecord(snap.id, snap.data(), salaryCollection);
  const payments = Array.isArray(record.payments) ? [...record.payments] : [];
  const payment = {
    amount: paymentAmount,
    paymentDate: $("paymentDate").value,
    paymentMode: $("paymentMode").value,
    note: clean($("paymentNote").value),
    recordedBy: auth.currentUser?.email || "accountant",
    recordedAt: new Date().toISOString(),
    ledgerTransactionId: newLedgerTransactionId("SAL")
  };
  payments.push(payment);
  const paidAmount = amount(payments.reduce((sum, item) => sum + Number(item.amount || 0), 0));
  const remainingAmount = amount(Math.max(amount(record.netSalary) - paidAmount, 0));
  await setDoc(recordRef, {
    payments,
    paidAmount,
    remainingAmount,
    status: salaryStatus(amount(record.netSalary), paidAmount),
    updatedAt: serverTimestamp(),
    updatedBy: auth.currentUser?.email || "accountant"
  }, { merge: true });
  await syncStaffSalaryDebit({
    db,
    schoolId,
    actor: { uid: auth.currentUser.uid, email: auth.currentUser.email, role: "accountant" },
    recordId: activeSalaryRecordId,
    record,
    payment,
    paymentIndex: payments.length - 1
  });
  $("paymentAmount").value = "";
  $("paymentNote").value = "";
  await loadSalaryRecords();
  setActiveSalaryRecord(salaryRecords.find((item) => item.id === activeSalaryRecordId) || null);
  toast("Salary payment recorded and ledger me debit ho gaya.");
}

async function refreshAll() {
  await Promise.all([loadStaff(), loadActiveSession()]);
  await loadSalaryRecords();
}

$("salaryMonth").value = currentMonth();
$("paymentDate").value = todayISO();
$("generateSalaryBtn").addEventListener("click", () => ensureSalaryRecord().catch((error) => toast(error.message || "Unable to generate salary record.", "error")));
$("salaryForm").addEventListener("submit", (event) => recordSalaryPayment(event).catch((error) => toast(error.message || "Unable to record salary payment.", "error")));
$("refreshBtn").addEventListener("click", () => refreshAll().catch((error) => toast(error.message || "Unable to refresh salary desk.", "error")));
["recordSearch", "roleFilter", "statusFilter", "monthFilter"].forEach((id) => $(id).addEventListener(id === "recordSearch" ? "input" : "change", () => {
  resetSalaryPage();
  renderSalaryRecords();
}));
$("salaryPageSize").addEventListener("change", () => {
  resetSalaryPage();
  renderSalaryRecords();
});
$("salaryPrevPage").addEventListener("click", () => {
  if (salaryPage > 1) {
    salaryPage -= 1;
    renderSalaryRecords();
  }
});
$("salaryNextPage").addEventListener("click", () => {
  salaryPage += 1;
  renderSalaryRecords();
});
$("salaryRecordsList").addEventListener("click", (event) => {
  const button = event.target.closest("[data-select-salary]");
  if (!button) return;
  const record = salaryRecords.find((item) => item.id === button.dataset.selectSalary);
  if (!record) return toast("Salary record not found.", "error");
  setActiveSalaryRecord(record);
});
window.addEventListener("schoolix:accountant-session-ready", (event) => {
  activeSessionId = event.detail?.sessionId || activeSessionId;
  activeSessionLabel = event.detail?.session || activeSessionLabel;
});

async function resolveAccountantPageProfile(user) {
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
      if (error?.code !== "permission-denied") console.warn(\`Accountant page profile \${field} lookup failed:\`, error);
    }
  }
  return null;
}

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    location.href = "#/index.html";
    return;
  }
  try {
    currentUserProfile = await resolveAccountantPageProfile(user);
    if (!currentUserProfile) throw new Error("Profile missing");
    const role = lower(currentUserProfile.role);
    if (!["admin", "accountant", "superadmin"].includes(role) && currentUserProfile.superAdmin !== true) {
      location.href = "#/index.html";
      return;
    }
    schoolId = role === "admin" || currentUserProfile.superAdmin === true ? (currentUserProfile.id || user.uid) : clean(currentUserProfile.adminId || currentUserProfile.schoolId || "");
    if (!schoolId) throw new Error("School not linked with this accountant.");
    $("schoolName").textContent = currentUserProfile.schoolName || window.SchoolBranding?.getSchoolName?.() || "Schoolix";
    const sidebarSchool = document.getElementById("sidebarSchoolName");
    if (sidebarSchool) sidebarSchool.textContent = $("schoolName").textContent;
    await refreshAll();
  } catch (error) {
    console.error(error);
    $("salaryRecordsList").innerHTML = \`<div class="empty">Unable to open salary desk.</div>\`;
    toast(error.message || "Unable to open salary desk.", "error");
  }
});
<\/script>
<script type="module" src="access-control.js?v=accountant-guard-20260806-3"><\/script>
<script src="schoolix-polish.js" defer><\/script>
`,styles:[],scripts:[{attributes:{id:"sxCriticalLoaderScript"},text:`
(function () {
  var root = document.documentElement;
  root.classList.add("sx-page-loading");
  window.SchoolixPageLoaderEarly = window.SchoolixPageLoaderEarly || { startedAt: Date.now() };
  function markEarlyReady(reason) {
    window.SchoolixPageLoaderEarly.ready = true;
    window.SchoolixPageLoaderEarly.reason = reason || "dom-ready";
    try { window.dispatchEvent(new CustomEvent("schoolix:critical-load-ready", { detail: window.SchoolixPageLoaderEarly })); } catch (_) {}
  }
  function afterFirstPaint(reason) { requestAnimationFrame(function () { requestAnimationFrame(function () { markEarlyReady(reason); }); }); }
  function emergencyHide() {
    if (window.SchoolixPageLoader || !root.classList.contains("sx-page-loading")) return;
    root.classList.remove("sx-page-loading");
    root.classList.add("sx-page-loaded");
    var loader = document.getElementById("sxPageLoader");
    if (!loader) return;
    loader.classList.add("is-hidden");
    setTimeout(function () { loader.remove(); }, 260);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", function () { afterFirstPaint("dom-ready"); }, { once: true });
  else afterFirstPaint(document.readyState === "complete" ? "document-complete" : "dom-ready");
  window.addEventListener("load", function () { markEarlyReady("window-load"); }, { once: true });
  setTimeout(emergencyHide, 3200);
}());
`},{attributes:{src:"school-branding.js"},text:""},{attributes:{src:"accountant-portal.js?v=accountant-portal-20260806-4"},text:""},{attributes:{type:"module"},text:`
import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from "./firebase-compat.js";
import { collection, doc, getDoc, getDocs, limit, query, serverTimestamp, setDoc, where } from "./firebase-compat.js";
import { newLedgerTransactionId, syncStaffSalaryDebit } from "./accounts-ledger.js";

const $ = (id) => document.getElementById(id);
let schoolId = "";
let currentUserProfile = {};
let staffRecords = [];
let salaryRecords = [];
let activeSalaryRecordId = "";
let activeSalaryRecord = null;
let activeSessionId = "";
let activeSessionLabel = "";
let salaryPage = 1;

const clean = (value) => String(value || "").replace(/\\s+/g, " ").trim();
const lower = (value) => clean(value).toLowerCase();
const amount = (value) => Number.isFinite(Number(value)) ? Number(value) : 0;
const todayISO = () => new Date().toISOString().slice(0, 10);
const currentMonth = () => todayISO().slice(0, 7);
const money = (value) => \`Rs \${amount(value).toLocaleString("en-IN", { maximumFractionDigits: 2 })}\`;
const monthLabel = (value) => value ? new Date(\`\${value}-01T12:00:00\`).toLocaleDateString("en-IN", { month: "long", year: "numeric" }) : "Salary";
const salaryStatus = (net, paid) => paid <= 0 ? "Unpaid" : paid >= net ? "Paid" : "Partially Paid";
const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
const roleLabel = (role) => ({ teacher: "Teacher", librarian: "Librarian", accountant: "Accountant", staff: "Other Staff" }[role] || clean(role) || "Staff");

function toast(message, type = "success") {
  document.querySelector(".toast")?.remove();
  const el = document.createElement("div");
  el.className = \`toast \${type === "error" ? "error" : ""}\`;
  el.textContent = message;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 4200);
}

function isRemoved(staff = {}) {
  return staff.removedFromPanel === true || staff.panelStatus === "removed" || staff.active === false;
}

function staffKey(staff = {}) {
  return clean(staff.teacherId || staff.staffId || staff.employeeId || staff.uid);
}

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
  return record.salaryCollection || (lower(record.staffRole || record.role) === "teacher" || record.sourceType === "teacher_salary" ? "teacher_salary_records" : "staff_salary_records");
}

function recordStaffName(record = {}) {
  return record.staffName || record.teacherName || "Staff";
}

function normalizeSalaryRecord(id, data = {}, forcedCollection = "") {
  const role = lower(data.staffRole || data.role || (forcedCollection === "teacher_salary_records" ? "teacher" : ""));
  const collectionName = forcedCollection || salaryCollectionForRole(role);
  const isTeacher = collectionName === "teacher_salary_records" || role === "teacher" || data.sourceType === "teacher_salary";
  return {
    id,
    ...data,
    staffUid: data.staffUid || data.teacherUid || "",
    staffId: data.staffId || data.teacherId || "",
    staffName: data.staffName || data.teacherName || "Staff",
    staffEmail: data.staffEmail || data.teacherEmail || "",
    staffRole: isTeacher ? "teacher" : (role || "staff"),
    sourceType: isTeacher ? "teacher_salary" : "staff_salary",
    salaryCollection: isTeacher ? "teacher_salary_records" : "staff_salary_records"
  };
}

function setActiveSalaryRecord(record) {
  activeSalaryRecord = record || null;
  activeSalaryRecordId = record?.id || "";
  $("recordSalaryBtn").disabled = !record;
  if (!record) {
    $("activeSalaryHint").innerHTML = "Select staff and month to generate salary.";
    $("paymentAmount").value = "";
    return;
  }
  const net = amount(record.netSalary);
  const paid = amount(record.paidAmount);
  const due = amount(record.remainingAmount ?? Math.max(net - paid, 0));
  $("activeSalaryHint").innerHTML = \`<strong>\${escapeHtml(recordStaffName(record))} - \${escapeHtml(record.monthLabel || monthLabel(record.monthKey))}</strong><br><span>Net \${money(net)}, paid \${money(paid)}, due \${money(due)}.</span>\`;
  $("paymentAmount").value = due > 0 ? due : "";
  $("salaryStaffSelect").value = record.staffUid || record.teacherUid || "";
  $("salaryMonth").value = record.monthKey || currentMonth();
  renderSalaryRecords();
}

function renderStaffOptions() {
  const activeStaff = staffRecords.filter((staff) => !isRemoved(staff));
  $("salaryStaffSelect").innerHTML = activeStaff.length
    ? \`<option value="">Select teacher/staff</option>\${activeStaff.map((staff) => \`<option value="\${escapeHtml(staff.uid)}">\${escapeHtml(staff.name || staff.email || "Unnamed")} - \${escapeHtml(roleLabel(lower(staff.role)))}\${staff.monthlySalary ? \` (\${money(staff.monthlySalary)})\` : ""}</option>\`).join("")}\`
    : \`<option value="">No teacher/staff found</option>\`;
}

function updateMonthFilter() {
  const months = [...new Set(salaryRecords.map((record) => record.monthKey).filter(Boolean))].sort().reverse();
  const selected = $("monthFilter").value;
  $("monthFilter").innerHTML = \`<option value="">All months</option>\${months.map((month) => \`<option value="\${escapeHtml(month)}">\${escapeHtml(monthLabel(month))}</option>\`).join("")}\`;
  if (months.includes(selected)) $("monthFilter").value = selected;
}

function filteredSalaryRecords() {
  const term = lower($("recordSearch").value);
  const roleFilter = $("roleFilter").value;
  const statusFilter = $("statusFilter").value;
  const monthFilter = $("monthFilter").value;
  return salaryRecords
    .filter((record) => roleFilter === "all" || (roleFilter === "teacher" ? lower(record.staffRole) === "teacher" : lower(record.staffRole) !== "teacher"))
    .filter((record) => statusFilter === "all" || (record.status || salaryStatus(record.netSalary, record.paidAmount)) === statusFilter)
    .filter((record) => !monthFilter || record.monthKey === monthFilter)
    .filter((record) => !term || [recordStaffName(record), record.staffId, record.staffRole, record.status, record.monthLabel, record.reference].some((value) => lower(value).includes(term)))
    .sort((a, b) => \`\${b.monthKey || ""}-\${lower(recordStaffName(b))}\`.localeCompare(\`\${a.monthKey || ""}-\${lower(recordStaffName(a))}\`));
}

function renderStats(records) {
  const net = records.reduce((sum, record) => sum + amount(record.netSalary), 0);
  const paid = records.reduce((sum, record) => sum + amount(record.paidAmount), 0);
  const due = records.reduce((sum, record) => sum + amount(record.remainingAmount ?? Math.max(amount(record.netSalary) - amount(record.paidAmount), 0)), 0);
  $("statRecords").textContent = records.length.toLocaleString("en-IN");
  $("statNet").textContent = money(net);
  $("statPaid").textContent = money(paid);
  $("statDue").textContent = money(due);
}

function salaryPageSizeValue() {
  const value = $("salaryPageSize")?.value || "10";
  return value === "all" ? "all" : Math.max(1, Number(value) || 10);
}

function resetSalaryPage() {
  salaryPage = 1;
}

function updateSalaryPagination(total) {
  const pageSize = salaryPageSizeValue();
  const all = pageSize === "all";
  const pages = all ? 1 : Math.max(1, Math.ceil(total / pageSize));
  if (salaryPage > pages) salaryPage = pages;
  const start = total ? (all ? 1 : (salaryPage - 1) * pageSize + 1) : 0;
  const end = all ? total : Math.min(total, salaryPage * pageSize);
  $("salaryPaginationInfo").textContent = total ? \`Showing \${start}-\${end} of \${total} records\` : "0 records";
  $("salaryPageInfo").textContent = \`Page \${salaryPage} of \${pages}\`;
  $("salaryPrevPage").disabled = all || salaryPage <= 1;
  $("salaryNextPage").disabled = all || salaryPage >= pages;
}

function renderSalaryRecords() {
  updateMonthFilter();
  const records = filteredSalaryRecords();
  renderStats(records);
  updateSalaryPagination(records.length);
  if (!records.length) {
    $("salaryRecordsList").innerHTML = \`<div class="empty">No salary records match this view. Generate salary record to start payout.</div>\`;
    return;
  }
  const pageSize = salaryPageSizeValue();
  const visibleRecords = pageSize === "all" ? records : records.slice((salaryPage - 1) * pageSize, salaryPage * pageSize);
  $("salaryRecordsList").innerHTML = visibleRecords.map((record) => {
    const net = amount(record.netSalary);
    const paid = amount(record.paidAmount);
    const due = amount(record.remainingAmount ?? Math.max(net - paid, 0));
    const status = record.status || salaryStatus(net, paid);
    const payments = Array.isArray(record.payments) ? record.payments : [];
    const paymentText = payments.length ? \`\${payments.length} payment(s)\` : "No payment yet";
    return \`
      <article class="record-card \${record.id === activeSalaryRecordId ? "is-active" : ""}">
        <div>
          <strong>\${escapeHtml(recordStaffName(record))} - \${escapeHtml(record.monthLabel || monthLabel(record.monthKey))}</strong>
          <small>\${escapeHtml(roleLabel(record.staffRole))} | Net \${money(net)} | Paid \${money(paid)} | Due \${money(due)} | \${escapeHtml(paymentText)}</small>
          <span class="pill \${status === "Paid" ? "paid" : due > 0 ? "due" : ""}">\${escapeHtml(status)}</span>
        </div>
        <button class="btn" type="button" data-select-salary="\${escapeHtml(record.id)}"><i class="fas fa-arrow-pointer"></i> Select</button>
      </article>
    \`;
  }).join("");
}

async function loadStaff() {
  if (!schoolId) return;
  const [byAdmin, bySchool] = await Promise.all([
    getDocs(query(collection(db, "users"), where("adminId", "==", schoolId))).catch(() => ({ docs: [] })),
    getDocs(query(collection(db, "users"), where("schoolId", "==", schoolId))).catch(() => ({ docs: [] }))
  ]);
  const byUid = new Map();
  [...byAdmin.docs, ...bySchool.docs].forEach((item) => {
    const data = item.data();
    const role = lower(data.role);
    if (!["teacher", "librarian", "accountant", "staff"].includes(role)) return;
    byUid.set(item.id, { uid: item.id, ...data, role });
  });
  staffRecords = [...byUid.values()].sort((a, b) => \`\${lower(a.role)}-\${lower(a.name || a.email)}\`.localeCompare(\`\${lower(b.role)}-\${lower(b.name || b.email)}\`));
  renderStaffOptions();
}

async function loadSalaryRecords() {
  if (!schoolId) return;
  $("salaryRecordsList").innerHTML = \`<div class="empty">Loading salary records...</div>\`;
  const [teacherSnapshot, staffSnapshot] = await Promise.all([
    getDocs(collection(db, "schools", schoolId, "teacher_salary_records")).catch(() => ({ docs: [] })),
    getDocs(collection(db, "schools", schoolId, "staff_salary_records")).catch(() => ({ docs: [] }))
  ]);
  const recordsByKey = new Map();
  teacherSnapshot.docs.forEach((item) => recordsByKey.set(\`teacher:\${item.id}\`, normalizeSalaryRecord(item.id, item.data(), "teacher_salary_records")));
  staffSnapshot.docs.forEach((item) => {
    const record = normalizeSalaryRecord(item.id, item.data(), "staff_salary_records");
    const key = record.staffRole === "teacher" ? \`teacher:\${item.id}\` : \`staff:\${item.id}\`;
    if (!recordsByKey.has(key)) recordsByKey.set(key, record);
  });
  salaryRecords = [...recordsByKey.values()];
  renderSalaryRecords();
}

async function loadActiveSession() {
  if (!schoolId) return;
  try {
    let viewSessionId = "";
    try { viewSessionId = localStorage.getItem("schoolix.viewSessionId") || ""; } catch (_) {}
    const activeSnap = await getDoc(doc(db, "schools", schoolId, "settings", "activeSession"));
    activeSessionId = viewSessionId || (activeSnap.exists() ? activeSnap.data().sessionId || "" : "");
    if (activeSessionId) {
      const sessionSnap = await getDoc(doc(db, "schools", schoolId, "sessions", activeSessionId));
      const data = sessionSnap.exists() ? sessionSnap.data() : {};
      activeSessionLabel = data.session || data.name || activeSessionId;
    }
  } catch (error) {
    console.warn("Unable to load active salary session", error);
  }
}

async function ensureSalaryRecord() {
  const staffUid = $("salaryStaffSelect").value;
  const monthKey = $("salaryMonth").value;
  const staff = staffRecords.find((item) => item.uid === staffUid);
  if (!staff) return toast("Select teacher/staff first.", "error");
  if (!monthKey) return toast("Select salary month first.", "error");
  const role = lower(staff.role);
  const salaryCollection = salaryCollectionForRole(role);
  const baseSalary = amount(staff.monthlySalary);
  const recordId = \`\${staffUid}_\${monthKey}\`;
  const recordRef = doc(db, "schools", schoolId, salaryCollection, recordId);
  const existingSnap = await getDoc(recordRef);
  const existing = existingSnap.exists() ? existingSnap.data() : {};
  const payments = Array.isArray(existing.payments) ? existing.payments : [];
  const paidAmount = amount(payments.reduce((sum, payment) => sum + Number(payment.amount || 0), 0));
  const netSalary = amount(existing.netSalary ?? baseSalary);
  const remainingAmount = amount(Math.max(netSalary - paidAmount, 0));
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
    sessionId: existing.sessionId || activeSessionId,
    session: existing.session || activeSessionLabel,
    baseSalary,
    netSalary,
    paidAmount,
    remainingAmount,
    status: salaryStatus(netSalary, paidAmount),
    payments,
    sourceType: role === "teacher" ? "teacher_salary" : "staff_salary",
    updatedAt: serverTimestamp(),
    updatedBy: auth.currentUser?.email || "accountant"
  };
  if (role === "teacher") {
    payload.teacherUid = staffUid;
    payload.teacherId = staff.teacherId || staffKey(staff);
    payload.teacherName = staff.name || staff.email || "Teacher";
    payload.teacherEmail = staff.email || "";
  }
  if (!existingSnap.exists()) payload.generatedAt = serverTimestamp();
  await setDoc(recordRef, payload, { merge: true });
  const record = normalizeSalaryRecord(recordId, payload, salaryCollection);
  await loadSalaryRecords();
  setActiveSalaryRecord(salaryRecords.find((item) => item.id === recordId) || record);
  toast("Salary record ready.");
}

async function recordSalaryPayment(event) {
  event.preventDefault();
  if (!activeSalaryRecordId || !activeSalaryRecord) return toast("Generate or select salary record first.", "error");
  const paymentAmount = amount($("paymentAmount").value);
  if (paymentAmount <= 0 || !$("paymentDate").value) return toast("Enter payment amount and payment date.", "error");
  const salaryCollection = salaryCollectionForRecord(activeSalaryRecord);
  const recordRef = doc(db, "schools", schoolId, salaryCollection, activeSalaryRecordId);
  const snap = await getDoc(recordRef);
  if (!snap.exists()) return toast("Salary record no longer exists.", "error");
  const record = normalizeSalaryRecord(snap.id, snap.data(), salaryCollection);
  const payments = Array.isArray(record.payments) ? [...record.payments] : [];
  const payment = {
    amount: paymentAmount,
    paymentDate: $("paymentDate").value,
    paymentMode: $("paymentMode").value,
    note: clean($("paymentNote").value),
    recordedBy: auth.currentUser?.email || "accountant",
    recordedAt: new Date().toISOString(),
    ledgerTransactionId: newLedgerTransactionId("SAL")
  };
  payments.push(payment);
  const paidAmount = amount(payments.reduce((sum, item) => sum + Number(item.amount || 0), 0));
  const remainingAmount = amount(Math.max(amount(record.netSalary) - paidAmount, 0));
  await setDoc(recordRef, {
    payments,
    paidAmount,
    remainingAmount,
    status: salaryStatus(amount(record.netSalary), paidAmount),
    updatedAt: serverTimestamp(),
    updatedBy: auth.currentUser?.email || "accountant"
  }, { merge: true });
  await syncStaffSalaryDebit({
    db,
    schoolId,
    actor: { uid: auth.currentUser.uid, email: auth.currentUser.email, role: "accountant" },
    recordId: activeSalaryRecordId,
    record,
    payment,
    paymentIndex: payments.length - 1
  });
  $("paymentAmount").value = "";
  $("paymentNote").value = "";
  await loadSalaryRecords();
  setActiveSalaryRecord(salaryRecords.find((item) => item.id === activeSalaryRecordId) || null);
  toast("Salary payment recorded and ledger me debit ho gaya.");
}

async function refreshAll() {
  await Promise.all([loadStaff(), loadActiveSession()]);
  await loadSalaryRecords();
}

$("salaryMonth").value = currentMonth();
$("paymentDate").value = todayISO();
$("generateSalaryBtn").addEventListener("click", () => ensureSalaryRecord().catch((error) => toast(error.message || "Unable to generate salary record.", "error")));
$("salaryForm").addEventListener("submit", (event) => recordSalaryPayment(event).catch((error) => toast(error.message || "Unable to record salary payment.", "error")));
$("refreshBtn").addEventListener("click", () => refreshAll().catch((error) => toast(error.message || "Unable to refresh salary desk.", "error")));
["recordSearch", "roleFilter", "statusFilter", "monthFilter"].forEach((id) => $(id).addEventListener(id === "recordSearch" ? "input" : "change", () => {
  resetSalaryPage();
  renderSalaryRecords();
}));
$("salaryPageSize").addEventListener("change", () => {
  resetSalaryPage();
  renderSalaryRecords();
});
$("salaryPrevPage").addEventListener("click", () => {
  if (salaryPage > 1) {
    salaryPage -= 1;
    renderSalaryRecords();
  }
});
$("salaryNextPage").addEventListener("click", () => {
  salaryPage += 1;
  renderSalaryRecords();
});
$("salaryRecordsList").addEventListener("click", (event) => {
  const button = event.target.closest("[data-select-salary]");
  if (!button) return;
  const record = salaryRecords.find((item) => item.id === button.dataset.selectSalary);
  if (!record) return toast("Salary record not found.", "error");
  setActiveSalaryRecord(record);
});
window.addEventListener("schoolix:accountant-session-ready", (event) => {
  activeSessionId = event.detail?.sessionId || activeSessionId;
  activeSessionLabel = event.detail?.session || activeSessionLabel;
});

async function resolveAccountantPageProfile(user) {
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
      if (error?.code !== "permission-denied") console.warn(\`Accountant page profile \${field} lookup failed:\`, error);
    }
  }
  return null;
}

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    location.href = "#/index.html";
    return;
  }
  try {
    currentUserProfile = await resolveAccountantPageProfile(user);
    if (!currentUserProfile) throw new Error("Profile missing");
    const role = lower(currentUserProfile.role);
    if (!["admin", "accountant", "superadmin"].includes(role) && currentUserProfile.superAdmin !== true) {
      location.href = "#/index.html";
      return;
    }
    schoolId = role === "admin" || currentUserProfile.superAdmin === true ? (currentUserProfile.id || user.uid) : clean(currentUserProfile.adminId || currentUserProfile.schoolId || "");
    if (!schoolId) throw new Error("School not linked with this accountant.");
    $("schoolName").textContent = currentUserProfile.schoolName || window.SchoolBranding?.getSchoolName?.() || "Schoolix";
    const sidebarSchool = document.getElementById("sidebarSchoolName");
    if (sidebarSchool) sidebarSchool.textContent = $("schoolName").textContent;
    await refreshAll();
  } catch (error) {
    console.error(error);
    $("salaryRecordsList").innerHTML = \`<div class="empty">Unable to open salary desk.</div>\`;
    toast(error.message || "Unable to open salary desk.", "error");
  }
});
`},{attributes:{type:"module",src:"access-control.js?v=accountant-guard-20260806-3"},text:""},{attributes:{src:"schoolix-polish.js"},text:""}]};export{e as default};
