import { initializeApp } from "./firebase-compat.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "./firebase-compat.js";
import {
    getFirestore,
    doc,
    setDoc,
    getDoc,
    getDocs,
    collection,
    deleteDoc,
    serverTimestamp,
    query,
    where,
    onSnapshot
} from "./firebase-compat.js";
import { newLedgerTransactionId, syncSalaryDebit } from "./accounts-ledger.js";

const firebaseConfig = {
    apiKey: "AIzaSyAomGwef93HFT9Xyx7SVW95FPw_IcIAICE",
    authDomain: "schoolix-48107.firebaseapp.com",
    projectId: "schoolix-48107",
    storageBucket: "schoolix-48107.firebasestorage.app",
    messagingSenderId: "133937954491",
    appId: "1:133937954491:web:69d8064422617eb8c4339e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const teacherCreatorApp = initializeApp(firebaseConfig, "teacherCreatorApp");
const teacherCreatorAuth = getAuth(teacherCreatorApp);

const CLASS_LIST = ["PG", "LKG", "UKG", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
const ALL_SECTIONS = Array.from({ length: 26 }, (_, index) => String.fromCharCode(65 + index));
const ATTENDANCE_STATUSES = ["Present", "Half Day", "Absent"];
const CLOUDINARY_CLOUD_NAME = "fthnumnk";
const CLOUDINARY_UPLOAD_PRESET = "schoolix_student_photos";

let adminUID = "";
let schoolName = "";
let teachers = [];
let removedTeachers = [];
let salaryRecords = [];
let selectedAttendanceRecords = [];
let activeSalaryRecordId = "";
let activeSalaryRecord = null;
let activeQrUnsubscribe = null;
let activeQrRefreshTimer = null;
let activeQrTokenRef = null;
let pendingQrTeacherUid = "";
const TEACHER_QR_REFRESH_MS = 30000;
let attendanceAccessEnabled = true;
let teacherDirectoryView = "active";
let draftTeacherAssignments = [];
let draftEditTeacherAssignments = [];
let draftClassOnlyAssignments = [];

// ─── NEW: No-deduction leave policy (days per month) ───
let noDeductionLeaveDays = 0;

const addTeacherForm = document.getElementById("addTeacherForm");
const createTeacherBtn = document.getElementById("createTeacherBtn");
const teachersListEl = document.getElementById("teachersList");
const teacherSearchEl = document.getElementById("teacherSearch");
const classSelectEl = document.getElementById("classSelect");
const sectionSelectEl = document.getElementById("sectionSelect");
const attendanceDateEl = document.getElementById("attendanceDate");
const teacherAttendanceListEl = document.getElementById("teacherAttendanceList");
const salaryTeacherSelectEl = document.getElementById("salaryTeacherSelect");
const salaryMonthEl = document.getElementById("salaryMonth");
const salaryStatusFilterEl = document.getElementById("salaryStatusFilter");
const salaryPreviewBoxEl = document.getElementById("salaryPreviewBox");
const salaryRecordsListEl = document.getElementById("salaryRecordsList");
const paymentAmountEl = document.getElementById("paymentAmount");
const paymentDateEl = document.getElementById("paymentDate");
const paymentNoteEl = document.getElementById("paymentNote");
const activeSalaryHintEl = document.getElementById("activeSalaryHint");
const recordPaymentBtnEl = document.getElementById("recordPaymentBtn");

function $(id) {
    return document.getElementById(id);
}

function openModalElement(id, display = "flex") {
    const modal = $(id);
    if (!modal) return null;
    modal.hidden = false;
    modal.style.display = display;
    modal.setAttribute("aria-hidden", "false");
    return modal;
}

function closeModalElement(id) {
    const modal = $(id);
    if (!modal) return null;
    modal.style.display = "none";
    modal.hidden = true;
    modal.setAttribute("aria-hidden", "true");
    return modal;
}

function shouldCloseModalFromEvent(event, id) {
    const modal = $(id);
    if (!modal || !event) return true;
    return event.target === modal || !event.target.closest?.(".modal-box");
}

function escapeHtml(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function getInitials(value, fallback = "T") {
    const words = String(value || "").trim().split(/\s+/).filter(Boolean);
    if (!words.length) return fallback;
    return words.slice(0, 2).map((word) => word[0]).join("").toUpperCase();
}

function getTeacherPhotoUrl(teacher = {}) {
    return String(teacher.photoUrl || teacher.imageUrl || teacher.profilePhotoUrl || teacher.avatarUrl || "").trim();
}

function renderTeacherPhoto(teacher = {}, className = "teacher-photo-thumb") {
    const photoUrl = getTeacherPhotoUrl(teacher);
    const initials = getInitials(teacher.name || teacher.teacherId, "T");
    const title = escapeHtml(teacher.name || "Teacher");
    return `<button type="button" class="${className}" onclick="openPhotoPreview('${escapeHtml(photoUrl)}','${title}')" title="View ${title} photo">${photoUrl ? `<img src="${escapeHtml(photoUrl)}" alt="${title} photo">` : escapeHtml(initials)}</button>`;
}

function normalizeClassSection(cls, section) {
    return {
        class: String(cls || "").replace(/\s+/g, " ").trim(),
        section: String(section || "").replace(/\s+/g, " ").trim().toUpperCase()
    };
}

function classSectionKey(item = {}) {
    const normalized = normalizeClassSection(item.class || item.className, item.section);
    return normalized.class && normalized.section ? `${normalized.class}__${normalized.section}` : "";
}

function dedupeAssignments(assignments = []) {
    const seen = new Set();
    const unique = [];
    assignments.forEach((item) => {
        const normalized = normalizeClassSection(item?.class || item?.className, item?.section);
        const key = classSectionKey(normalized);
        if (!key || seen.has(key)) return;
        seen.add(key);
        unique.push(normalized);
    });
    return unique;
}

function getTeacherAssignments(teacher = {}) {
    const rawAssignments = Array.isArray(teacher.assignedClasses) ? teacher.assignedClasses : [];
    const assignments = rawAssignments
        .map((item) => normalizeClassSection(item.class || item.className, item.section))
        .filter((item) => item.class && item.section);
    const fallback = normalizeClassSection(teacher.class, teacher.section);
    return dedupeAssignments([fallback, ...assignments]);
}

function formatAssignments(assignments = []) {
    return assignments.length
        ? assignments.map((item) => `${item.class}-${item.section}`).join(", ")
        : "N/A";
}

function renderAssignmentList(targetId, assignments, removeHandlerName) {
    const target = $(targetId);
    if (!target) return;
    assignments = dedupeAssignments(assignments);
    if (!assignments.length) {
        target.innerHTML = `<span class="helper-text">No class selected yet.</span>`;
        return;
    }
    target.innerHTML = assignments.map((item, index) => `
        <span class="assignment-chip">
            Class ${escapeHtml(item.class)}-${escapeHtml(item.section)}
            <button type="button" onclick="${removeHandlerName}(${index})" aria-label="Remove class ${escapeHtml(item.class)}-${escapeHtml(item.section)}">x</button>
        </span>
    `).join("");
}

function addAssignmentFromSelect(assignments, classSelect, sectionSelect, targetId, removeHandlerName) {
    const next = normalizeClassSection(classSelect?.value, sectionSelect?.value);
    if (!next.class || !next.section) return showToast("Select class and section first.", "error");
    if (dedupeAssignments(assignments).some((item) => item.class === next.class && item.section === next.section)) {
        return showToast("This class-section is already added.", "info");
    }
    assignments.push(next);
    renderAssignmentList(targetId, assignments, removeHandlerName);
    return true;
}

function primaryAssignment(assignments) {
    return assignments[0] || { class: "", section: "" };
}

window.addTeacherAssignment = () => addAssignmentFromSelect(draftTeacherAssignments, classSelectEl, sectionSelectEl, "teacherAssignmentsList", "removeTeacherAssignment");

window.removeTeacherAssignment = (index) => {
    draftTeacherAssignments.splice(index, 1);
    renderAssignmentList("teacherAssignmentsList", draftTeacherAssignments, "removeTeacherAssignment");
};

window.addEditTeacherAssignment = () => addAssignmentFromSelect(draftEditTeacherAssignments, $("editClassSelect"), $("editSectionSelect"), "editTeacherAssignmentsList", "removeEditTeacherAssignment");

window.removeEditTeacherAssignment = (index) => {
    draftEditTeacherAssignments.splice(index, 1);
    renderAssignmentList("editTeacherAssignmentsList", draftEditTeacherAssignments, "removeEditTeacherAssignment");
};

window.openPhotoPreview = (photoUrl, title = "Photo") => {
    if (!photoUrl) return showToast("Photo is not available yet.", "info");
    $("photoPreviewTitle").textContent = title || "Photo";
    $("photoPreviewImage").src = photoUrl;
    $("photoPreviewImage").alt = `${title || "Photo"} preview`;
    openModalElement("photoPreviewModal");
};

window.closePhotoPreviewModal = (event) => {
    if (shouldCloseModalFromEvent(event, "photoPreviewModal")) {
        closeModalElement("photoPreviewModal");
        $("photoPreviewImage").removeAttribute("src");
    }
};

async function uploadCloudinaryPhoto(file, folderKey, publicKey) {
    if (!file) return null;
    if (!file.type.startsWith("image/")) throw new Error("Please select an image file.");
    if (file.size > 5 * 1024 * 1024) throw new Error("Photo must be under 5 MB.");
    const form = new FormData();
    form.append("file", file);
    form.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    form.append("folder", `schoolix/${folderKey}`);
    form.append("public_id", `${String(publicKey || "photo").replace(/[^a-zA-Z0-9_-]/g, "_")}_${Date.now()}`);
    const response = await fetch(`https://api.cloudinary.com/v1_1/${encodeURIComponent(CLOUDINARY_CLOUD_NAME)}/image/upload`, {
        method: "POST",
        body: form
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error?.message || "Cloudinary upload failed.");
    return { photoUrl: data.secure_url || data.url || "", photoPublicId: data.public_id || "" };
}

function requireAttendanceAccess() {
    if (attendanceAccessEnabled) return true;
    showToast("Attendance access has been disabled for this school by the Super Admin.", "error");
    return false;
}

function applyAttendanceAccessState(adminData) {
    attendanceAccessEnabled = (adminData.features || {}).attendance !== false;
    const tabButton = document.querySelector('.tab-btn[data-tab="attendance"]');
    const attendanceTab = $("attendanceTab");

    if (tabButton) {
        tabButton.hidden = !attendanceAccessEnabled;
        tabButton.disabled = !attendanceAccessEnabled;
    }

    document.querySelectorAll('[onclick*="Attendance"], [onclick*="attendance"], [onclick*="Qr"]').forEach((button) => {
        const action = button.getAttribute("onclick") || "";
        if (!/Attendance|attendance|Qr/.test(action)) return;
        button.hidden = !attendanceAccessEnabled;
        button.disabled = !attendanceAccessEnabled;
    });

    if (!attendanceAccessEnabled && attendanceTab) {
        attendanceTab.innerHTML = `<div class="section-card"><div class="empty-state">Attendance access has been disabled for this school by the Super Admin.</div></div>`;
        if (attendanceTab.classList.contains("active")) window.switchTab("directory");
    }
}

function todayISO() {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

function localDateValue() {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

function currentTimeValue() {
    const now = new Date();
    return `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
}

function currentMonthValue() {
    return todayISO().slice(0, 7);
}

function formatCurrency(value) {
    return `₹${Number(value || 0).toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
}

function roundCurrency(value) {
    return Math.round((Number(value || 0) + Number.EPSILON) * 100) / 100;
}

function formatMonthLabel(monthValue) {
    if (!monthValue) return "Selected month";
    const [year, month] = monthValue.split("-").map(Number);
    return new Date(year, month - 1, 1).toLocaleDateString("en-IN", { month: "long", year: "numeric" });
}

function formatDateLabel(value) {
    if (!value) return "Not set";
    if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
        return new Date(`${value}T00:00:00`).toLocaleDateString("en-IN");
    }
    if (typeof value === "string") return value;
    if (value?.toDate) return value.toDate().toLocaleDateString("en-IN");
    return new Date(value).toLocaleDateString("en-IN");
}

function normalizeDateValue(value) {
    if (!value) return "";
    if (typeof value === "string") {
        const trimmed = value.trim();
        if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return trimmed;
        if (/^\d{4}-\d{2}-\d{2}T/.test(trimmed)) return trimmed.slice(0, 10);
        const parsed = new Date(trimmed);
        if (!Number.isNaN(parsed.getTime())) {
            return `${parsed.getFullYear()}-${String(parsed.getMonth() + 1).padStart(2, "0")}-${String(parsed.getDate()).padStart(2, "0")}`;
        }
        return "";
    }
    const date = value?.toDate ? value.toDate() : value instanceof Date ? value : null;
    if (!date || Number.isNaN(date.getTime())) return "";
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function getMonthDateRange(monthValue) {
    const [year, month] = String(monthValue || "").split("-").map(Number);
    if (!year || !month) return { start: "", end: "" };
    const endDay = new Date(year, month, 0).getDate();
    return {
        start: `${year}-${String(month).padStart(2, "0")}-01`,
        end: `${year}-${String(month).padStart(2, "0")}-${String(endDay).padStart(2, "0")}`
    };
}

function isDateInMonth(value, monthValue) {
    const date = normalizeDateValue(value);
    if (!date) return false;
    const { start, end } = getMonthDateRange(monthValue);
    return Boolean(start && end && date >= start && date <= end);
}

function normalizeAttendanceStatus(status) {
    if (status === "Present" || status === "Half Day") return status;
    return "Absent";
}

function getDisplayAbsentDays(record) {
    return Number(record?.absentDays || 0) + Number(record?.leaveDays || 0);
}

function getNoDeductionAppliedDays(record) {
    if (record?.noDeductionDaysApplied !== undefined) return Number(record.noDeductionDaysApplied || 0);
    return Math.min(getDisplayAbsentDays(record), Number(record?.noDeductionPolicyDays ?? noDeductionLeaveDays ?? 0));
}

function getChargeableAbsentDays(record) {
    if (record?.chargeableAbsentDays !== undefined) return Number(record.chargeableAbsentDays || 0);
    return Math.max(getDisplayAbsentDays(record) - getNoDeductionAppliedDays(record), 0);
}

function getAttendanceWeight(status) {
    if (status === "Present") return 1;
    if (status === "Half Day") return 0.5;
    return 0;
}

function getSalaryStatus(netSalary, paidAmount) {
    if (paidAmount <= 0) return "Unpaid";
    if (paidAmount >= netSalary) return "Paid";
    return "Partial Paid";
}

function getTeacherByUid(uid) {
    return teachers.find((teacher) => teacher.uid === uid) || removedTeachers.find((teacher) => teacher.uid === uid) || null;
}

function buildTeacherQrPayload(tokenId) {
    return `SCHLX-TEACHER-ATT:${tokenId}`;
}

function showToast(message, type = "success") {
    const toast = document.createElement("div");
    toast.className = `toast toast-${type === "error" ? "error" : type === "info" ? "info" : "success"}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3200);
}

function setButtonLoading(button, label, loading) {
    if (!button) return;
    if (!button.dataset.defaultLabel) button.dataset.defaultLabel = button.textContent;
    button.textContent = loading ? label : button.dataset.defaultLabel;
    button.disabled = loading;
}

function countWorkingDays(monthValue) {
    const [year, month] = monthValue.split("-").map(Number);
    const totalDays = new Date(year, month, 0).getDate();
    let workingDays = 0;
    for (let day = 1; day <= totalDays; day += 1) {
        if (new Date(year, month - 1, day).getDay() !== 0) workingDays += 1;
    }
    return workingDays;
}

function countAttendanceWorkingDays(records = []) {
    const markedDates = new Set();
    records.forEach((record) => {
        const date = normalizeDateValue(record?.date);
        if (date) markedDates.add(date);
    });
    return markedDates.size;
}

// ─── NEW: Load / Save leave policy from Firestore ───────────────────────
async function loadLeavePolicy() {
    try {
        const snap = await getDoc(doc(db, "schools", adminUID, "settings", "leavePolicy"));
        if (snap.exists()) {
            noDeductionLeaveDays = Number(snap.data().noDeductionDays || 0);
        } else {
            noDeductionLeaveDays = 0;
        }
    } catch {
        noDeductionLeaveDays = 0;
    }
    $("noDeductionDays").value = noDeductionLeaveDays;
    $("currentLeavePolicy").textContent = `${noDeductionLeaveDays} days`;
}

window.saveLeavePolicy = async () => {
    const days = Math.max(0, Number($("noDeductionDays").value || 0));
    try {
        await setDoc(doc(db, "schools", adminUID, "settings", "leavePolicy"), {
            noDeductionDays: days,
            updatedAt: serverTimestamp(),
            updatedBy: auth.currentUser?.email || "admin"
        }, { merge: true });
        noDeductionLeaveDays = days;
        $("currentLeavePolicy").textContent = `${days} days`;
        showToast(`No-deduction policy saved: ${days} absent days per month.`);
    } catch (error) {
        console.error(error);
        showToast(error.message || "Unable to save no-deduction policy.", "error");
    }
};
// ─────────────────────────────────────────────────────────────────────────

function buildTeacherCard(teacher) {
    const assignments = getTeacherAssignments(teacher);
    const attendanceActions = attendanceAccessEnabled ? `
                        <button type="button" class="btn btn-warning" onclick="generateTeacherAttendanceQr('${teacher.uid}')">Generate QR</button>` : "";
    return `
        <article class="teacher-card">
            <div class="teacher-head">
                <div class="teacher-identity">
                    ${renderTeacherPhoto(teacher)}
                    <div>
                        <div class="teacher-name">${escapeHtml(teacher.name || "Unnamed Teacher")}</div>
                        <div class="teacher-meta">
                            ${escapeHtml(teacher.email || "No email")}<br>
                            Teacher ID: ${escapeHtml(teacher.teacherId || "N/A")}<br>
                            Class Responsibility: ${escapeHtml(formatAssignments(assignments))}
                        </div>
                    </div>
                </div>
                <div class="pill-row">
                    <span class="pill">Salary ${formatCurrency(teacher.monthlySalary || 0)}</span>
                </div>
            </div>
            <div class="form-grid">
                <div class="field">
                    <label>Quick Actions</label>
                    <div class="teacher-actions">
                        ${attendanceActions}
                        <button type="button" class="btn btn-light" onclick="window.location.href='teacher-profile.html?id=${encodeURIComponent(teacher.uid)}'">View Profile</button>
                        <button type="button" class="btn btn-secondary" onclick="openEditTeacherClassesModal('${teacher.uid}')">Edit Class</button>
                        <button type="button" class="btn btn-danger" onclick="deleteTeacher('${teacher.uid}')">Remove Teacher</button>
                    </div>
                </div>
            </div>
        </article>
    `;
}

function getTeacherSalarySummary(teacherUid) {
    const records = salaryRecords.filter((record) => record.teacherUid === teacherUid);
    return {
        count: records.length,
        paid: records.reduce((sum, record) => sum + Number(record.paidAmount || 0), 0),
        pending: records.reduce((sum, record) => sum + Number(record.remainingAmount || 0), 0)
    };
}

function buildRemovedTeacherCard(teacher) {
    const removedAt = teacher.removedAt || teacher.deletedAt || teacher.updatedAt || "";
    const summary = getTeacherSalarySummary(teacher.uid);
    const assignments = getTeacherAssignments(teacher);
    return `
        <article class="teacher-card removed-teacher-card">
            <div class="teacher-head">
                <div class="teacher-identity">
                    ${renderTeacherPhoto(teacher)}
                    <div>
                        <div class="teacher-name">${escapeHtml(teacher.name || "Unnamed Teacher")}</div>
                        <div class="teacher-meta">
                            ${escapeHtml(teacher.email || "No email")}<br>
                            Teacher ID: ${escapeHtml(teacher.teacherId || "N/A")}<br>
                            Class Responsibility: ${escapeHtml(formatAssignments(assignments))}<br>
                            Removed: ${escapeHtml(formatDateLabel(removedAt))}
                        </div>
                    </div>
                </div>
                <div class="pill-row">
                    <span class="status-chip status-unpaid">Removed</span>
                    <span class="pill">Salary ${formatCurrency(teacher.monthlySalary || 0)}</span>
                </div>
            </div>
            <div class="mini-grid">
                <div class="mini-stat"><span>Salary Records</span><strong>${summary.count}</strong></div>
                <div class="mini-stat"><span>Total Paid</span><strong>${formatCurrency(summary.paid)}</strong></div>
                <div class="mini-stat"><span>Total Pending</span><strong>${formatCurrency(summary.pending)}</strong></div>
                <div class="mini-stat"><span>Removed By</span><strong>${escapeHtml(teacher.removedBy || "Admin")}</strong></div>
            </div>
            <div class="teacher-actions top-gap">
                <button type="button" class="btn btn-light" onclick="window.location.href='teacher-profile.html?id=${encodeURIComponent(teacher.uid)}'">View Profile</button>
            </div>
        </article>
    `;
}

function teacherMatchesSearch(teacher, search) {
    if (!search) return true;
    const summary = getTeacherSalarySummary(teacher.uid);
    return [
        teacher.name,
        teacher.email,
        teacher.teacherId,
        teacher.class,
        teacher.section,
        teacher.status,
        teacher.panelStatus,
        teacher.removedBy,
        teacher.removalReason,
        formatDateLabel(teacher.removedAt || teacher.deletedAt || teacher.updatedAt || ""),
        summary.count,
        summary.paid,
        summary.pending
    ].some((value) => String(value || "").toLowerCase().includes(search));
}

function renderTeacherList() {
    const search = teacherSearchEl.value.trim().toLowerCase();
    const source = teacherDirectoryView === "removed" ? removedTeachers : teachers;
    const filtered = source.filter((teacher) => teacherMatchesSearch(teacher, search));

    teachersListEl.innerHTML = filtered.length
        ? filtered.map((teacher) => teacherDirectoryView === "removed" ? buildRemovedTeacherCard(teacher) : buildTeacherCard(teacher)).join("")
        : `<div class="empty-state">No ${teacherDirectoryView === "removed" ? "removed" : "active"} teacher matched the current search.</div>`;
}

window.setTeacherDirectoryView = (view) => {
    teacherDirectoryView = view === "removed" ? "removed" : "active";
    $("activeTeacherViewBtn")?.classList.toggle("btn-primary", teacherDirectoryView === "active");
    $("activeTeacherViewBtn")?.classList.toggle("btn-light", teacherDirectoryView !== "active");
    $("removedTeacherViewBtn")?.classList.toggle("btn-primary", teacherDirectoryView === "removed");
    $("removedTeacherViewBtn")?.classList.toggle("btn-light", teacherDirectoryView !== "removed");
    renderTeacherList();
};

function renderSalaryTeacherOptions() {
    const options = teachers
        .map((teacher) => `<option value="${teacher.uid}">${escapeHtml(teacher.name)} (${escapeHtml(teacher.teacherId || "N/A")})</option>`)
        .join("");
    salaryTeacherSelectEl.innerHTML = `<option value="">Select teacher</option>${options}`;

    // Also populate report filter & edit class selects
    const reportFilter = $("reportTeacherFilter");
    if (reportFilter) {
        reportFilter.innerHTML = `<option value="">All Teachers</option>${options}`;
    }
}

function updateDirectorySummary() {
    $("schoolNamePill").textContent = schoolName || "School panel";
    $("salaryMonthPill").textContent = formatMonthLabel(salaryMonthEl.value);
    $("summaryTeacherCount").textContent = teachers.length.toLocaleString();
    $("summaryAttendanceMarked").textContent = selectedAttendanceRecords.length.toLocaleString();
    const monthRecords = salaryRecords.filter((record) => record.monthKey === salaryMonthEl.value);
    const paid = monthRecords.reduce((sum, record) => sum + Number(record.paidAmount || 0), 0);
    const pending = monthRecords.reduce((sum, record) => sum + Number(record.remainingAmount || 0), 0);
    $("summaryPaidOut").textContent = formatCurrency(paid);
    $("summaryPendingOut").textContent = formatCurrency(pending);
}

function updateTopStats() {
    const todayPresent = selectedAttendanceRecords.filter((record) => record.date === attendanceDateEl.value && record.status === "Present").length;
    const monthRecords = salaryRecords.filter((record) => record.monthKey === salaryMonthEl.value);
    const paidTotal = monthRecords.reduce((sum, record) => sum + Number(record.paidAmount || 0), 0);
    const pendingTotal = monthRecords.reduce((sum, record) => sum + Number(record.remainingAmount || 0), 0);
    $("teacherCountStat").textContent = teachers.length.toLocaleString();
    $("todayPresentStat").textContent = todayPresent.toLocaleString();
    $("todayAttendanceNote").textContent = `Selected date: ${formatDateLabel(attendanceDateEl.value)}`;
    $("monthlyPaidStat").textContent = formatCurrency(paidTotal);
    $("monthlyPendingStat").textContent = formatCurrency(pendingTotal);
    updateDirectorySummary();
}

function renderAttendanceSummaryFromRows() {
    const rows = Array.from(document.querySelectorAll(".attendance-row"));
    let present = 0;
    let half = 0;
    let absent = 0;

    rows.forEach((row) => {
        const status = normalizeAttendanceStatus(row.querySelector(".attendance-status")?.value || "Present");
        if (status === "Present") present += 1;
        else if (status === "Half Day") half += 1;
        else absent += 1;
    });

    $("attendancePresentCount").textContent = present.toLocaleString();
    $("attendanceHalfCount").textContent = half.toLocaleString();
    $("attendanceAbsentCount").textContent = absent.toLocaleString();
}

function buildAttendanceRow(teacher, record) {
    const status = normalizeAttendanceStatus(record?.status || "Present");
    const tone = status === "Present" ? "status-present" : status === "Half Day" ? "status-half" : "status-absent";
    const qrLocked = Boolean(record?.qrTokenId || record?.scannedByUid || record?.lastQrMode);
    const statusLocked = qrLocked && status !== "Present";
    const fieldLockedAttrs = qrLocked ? "disabled" : "";
    const lockedNote = qrLocked
        ? `<div class="helper-text top-gap" style="color: var(--success);">Marked by QR scan. Admin can only change Present to Half Day; other QR attendance details stay locked.</div>`
        : "";

    return `
        <article class="attendance-row" data-teacher-uid="${teacher.uid}" data-qr-locked="${qrLocked ? "true" : "false"}">
            <div class="attendance-head">
                <div>
                    <div class="attendance-name">${escapeHtml(teacher.name || "Teacher")}</div>
                    <div class="teacher-meta">
                        ${escapeHtml(teacher.teacherId || "N/A")} | ${escapeHtml(teacher.class || "N/A")} - ${escapeHtml(teacher.section || "N/A")}<br>
                        ${escapeHtml(teacher.email || "")}
                    </div>
                </div>
                <span class="status-chip ${tone}">${escapeHtml(status)}</span>
            </div>
            <div class="attendance-grid">
                <div class="field">
                    <label>Status</label>
                    <select class="attendance-status" onchange="handleAttendanceRowChange(this)" ${statusLocked ? "disabled" : ""}>
                        ${(qrLocked && status === "Present" ? ["Present", "Half Day"] : ATTENDANCE_STATUSES).map((value) => `<option value="${value}" ${value === status ? "selected" : ""}>${value}</option>`).join("")}
                    </select>
                </div>
                <div class="field">
                    <label>Check-In</label>
                    <input type="time" class="attendance-checkin" value="${escapeHtml(record?.checkInTime || "")}" ${fieldLockedAttrs}>
                </div>
                <div class="field">
                    <label>Check-Out</label>
                    <input type="time" class="attendance-checkout" value="${escapeHtml(record?.checkOutTime || "")}" ${fieldLockedAttrs}>
                </div>
                <div class="field">
                    <label>Remarks</label>
                    <input type="text" class="attendance-note" placeholder="Optional note" value="${escapeHtml(record?.notes || "")}" ${fieldLockedAttrs}>
                </div>
                <div class="field">
                    <label>Attendance Weight</label>
                    <div class="pill-row">
                        <span class="pill attendance-weight">${getAttendanceWeight(status)} day</span>
                    </div>
                </div>
            </div>
            ${lockedNote}
        </article>
    `;
}

function renderAttendanceRows() {
    if (!teachers.length) {
        teacherAttendanceListEl.innerHTML = `<div class="empty-state">Add teachers first. Then daily teacher attendance can be marked here.</div>`;
        renderAttendanceSummaryFromRows();
        return;
    }

    const date = attendanceDateEl.value;
    const recordsMap = new Map(selectedAttendanceRecords.filter((record) => record.date === date).map((record) => [record.teacherUid, record]));
    teacherAttendanceListEl.innerHTML = teachers.map((teacher) => buildAttendanceRow(teacher, recordsMap.get(teacher.uid))).join("");
    renderAttendanceSummaryFromRows();
}

function buildSalaryRecordCard(record) {
    const activeStyle = record.id === activeSalaryRecordId ? ` style="border-color: rgba(37, 99, 235, 0.42); box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.10);"` : "";
    const statusClass = record.status === "Paid" ? "status-paid" : record.status === "Partial Paid" ? "status-partial" : "status-unpaid";
    const payments = Array.isArray(record.payments) ? record.payments : [];
    const absentDays = getDisplayAbsentDays(record);
    const noDeductionApplied = getNoDeductionAppliedDays(record);
    const chargeableAbsentDays = getChargeableAbsentDays(record);
    const paymentHistory = payments.length
        ? `<div class="payment-history">${payments.slice().reverse().map((payment) => `
            <div class="payment-item">
                <div><strong>${formatCurrency(payment.amount || 0)}</strong><br><span class="helper-text">${formatDateLabel(payment.paymentDate)}</span></div>
                <div style="text-align:right;"><div>${escapeHtml(payment.note || "Salary payment")}</div><div class="helper-text">By ${escapeHtml(payment.recordedBy || "Admin")}</div></div>
            </div>`).join("")}</div>`
        : `<div class="helper-text top-gap">No salary payment has been recorded for this month yet.</div>`;

    const noDeductionNote = noDeductionLeaveDays > 0
        ? `<div class="helper-text" style="margin-top:8px; color: var(--primary-dark);">Policy: ${noDeductionLeaveDays} absent day(s) are no-deduction. Chargeable absent days: ${chargeableAbsentDays}.</div>`
        : "";

    return `
        <article class="salary-card"${activeStyle}>
            <div class="salary-head">
                <div>
                    <div class="salary-title">${escapeHtml(record.teacherName || "Teacher")} - ${escapeHtml(record.monthLabel || formatMonthLabel(record.monthKey))}</div>
                    <div class="salary-meta">
                        Teacher ID: ${escapeHtml(record.teacherId || "N/A")}<br>
                        Attendance Marked: ${Number(record.markedDays || 0)} of ${Number(record.workingDays || 0)} working days
                    </div>
                </div>
                <div class="pill-row"><span class="status-chip ${statusClass}">${escapeHtml(record.status || "Unpaid")}</span></div>
            </div>
            <div class="mini-grid top-gap">
                <div class="mini-stat"><span>Base Salary</span><strong>${formatCurrency(record.baseSalary || 0)}</strong></div>
                <div class="mini-stat"><span>Present</span><strong>${Number(record.presentDays || 0)}</strong></div>
                <div class="mini-stat"><span>Half Day</span><strong>${Number(record.halfDays || 0)}</strong></div>
                <div class="mini-stat"><span>Absent</span><strong>${absentDays}</strong></div>
                <div class="mini-stat"><span>No Deduction</span><strong>${noDeductionApplied}</strong></div>
                <div class="mini-stat"><span>Chargeable Absent</span><strong>${chargeableAbsentDays}</strong></div>
                <div class="mini-stat"><span>Net Salary</span><strong>${formatCurrency(record.netSalary || 0)}</strong></div>
                <div class="mini-stat"><span>Paid</span><strong>${formatCurrency(record.paidAmount || 0)}</strong></div>
                <div class="mini-stat"><span>Remaining</span><strong>${formatCurrency(record.remainingAmount || 0)}</strong></div>
            </div>
            ${noDeductionNote}
            <div class="salary-actions top-gap">
                <button type="button" class="btn btn-primary" onclick="activateSalaryRecord('${record.id}')">Manage Payments</button>
                <button type="button" class="btn btn-secondary" onclick="recalculateSalaryRecord('${record.teacherUid}', '${record.monthKey}')">Recalculate</button>
                <button type="button" class="btn btn-danger" onclick="deleteSalaryRecord('${record.id}')">Delete Record</button>
            </div>
            ${paymentHistory}
        </article>
    `;
}

function getNormalizedSalaryStatus(record = {}) {
    const status = String(record.status || "").trim().toLowerCase();
    if (status) return status;
    return getSalaryStatus(Number(record.netSalary || 0), Number(record.paidAmount || 0)).toLowerCase();
}

function salaryRecordMatchesStatus(record, filter) {
    const selected = String(filter || "").trim().toLowerCase();
    if (!selected) return true;
    const status = getNormalizedSalaryStatus(record);
    const remaining = Number(record.remainingAmount || 0);
    if (selected === "due") return remaining > 0 || status === "unpaid" || status === "partial paid";
    if (selected === "partial") return status === "partial paid" || (remaining > 0 && Number(record.paidAmount || 0) > 0);
    if (selected === "unpaid") return status === "unpaid" || Number(record.paidAmount || 0) <= 0;
    if (selected === "paid") return remaining <= 0 && status === "paid";
    return true;
}

function getSalaryStatusFilterLabel(value) {
    return ({
        due: "due/unpaid",
        unpaid: "unpaid",
        partial: "partial due",
        paid: "paid"
    })[value] || "all";
}

function renderSalaryRecordList() {
    const selectedTeacher = salaryTeacherSelectEl.value;
    const selectedMonth = salaryMonthEl.value;
    const selectedStatus = salaryStatusFilterEl?.value || "";
    const filtered = salaryRecords.filter((record) => {
        if (selectedTeacher && record.teacherUid !== selectedTeacher) return false;
        if (selectedMonth && record.monthKey !== selectedMonth) return false;
        if (!salaryRecordMatchesStatus(record, selectedStatus)) return false;
        return true;
    });
    const dueTotal = filtered.reduce((sum, record) => sum + Number(record.remainingAmount || 0), 0);
    const filterSummary = filtered.length
        ? `<div class="salary-filter-summary">${filtered.length} ${getSalaryStatusFilterLabel(selectedStatus)} salary record(s)${selectedMonth ? ` for ${escapeHtml(formatMonthLabel(selectedMonth))}` : ""}. Pending total: <strong>${formatCurrency(dueTotal)}</strong></div>`
        : "";

    salaryRecordsListEl.innerHTML = filtered.length
        ? `${filterSummary}${filtered.map((record) => buildSalaryRecordCard(record)).join("")}`
        : `<div class="empty-state">No salary record found for the current filters. Generate one to start tracking teacher payout.</div>`;
}

function renderSalaryPreview(data, savedRecord = null) {
    if (!data) {
        salaryPreviewBoxEl.innerHTML = `<strong>Select a teacher and month to preview salary.</strong><div class="helper-text top-gap">Generated salary records stay editable through payment history below.</div>`;
        return;
    }

    const status = savedRecord?.status || getSalaryStatus(data.netSalary, savedRecord?.paidAmount || 0);
    const statusClass = status === "Paid" ? "status-paid" : status === "Partial Paid" ? "status-partial" : "status-unpaid";
    const absentDays = getDisplayAbsentDays(data);
    const noDeductionApplied = getNoDeductionAppliedDays(data);
    const chargeableAbsentDays = getChargeableAbsentDays(data);
    const noDeductionNote = noDeductionLeaveDays > 0
        ? `<div class="helper-text" style="color: var(--primary-dark); margin-top:8px;">No-deduction policy: first ${noDeductionLeaveDays} absent day(s) in this month won't reduce salary.</div>`
        : "";

    salaryPreviewBoxEl.innerHTML = `
        <div class="salary-head">
            <div>
                <strong style="font-size:1.1rem;">${escapeHtml(data.teacherName)} - ${escapeHtml(data.monthLabel)}</strong>
                <div class="helper-text top-gap">Unmarked working days are not deducted automatically. Deduction is based on marked absent and half-day entries. The no-deduction limit is applied to absent days.</div>
            </div>
            <span class="status-chip ${statusClass}">${escapeHtml(status)}</span>
        </div>
        <div class="summary-grid">
            <div class="mini-stat"><span>Base Salary</span><strong>${formatCurrency(data.baseSalary)}</strong></div>
            <div class="mini-stat"><span>Working Days</span><strong>${data.workingDays}</strong></div>
            <div class="mini-stat"><span>Present</span><strong>${data.presentDays}</strong></div>
            <div class="mini-stat"><span>Half Day</span><strong>${data.halfDays}</strong></div>
            <div class="mini-stat"><span>Absent</span><strong>${absentDays}</strong></div>
            <div class="mini-stat"><span>No Deduction Applied</span><strong>${noDeductionApplied}</strong></div>
            <div class="mini-stat"><span>Chargeable Absent</span><strong>${chargeableAbsentDays}</strong></div>
            <div class="mini-stat"><span>Per Day Rate</span><strong>${formatCurrency(data.perDayRate)}</strong></div>
            <div class="mini-stat"><span>Deduction</span><strong>${formatCurrency(data.deductionAmount)}</strong></div>
            <div class="mini-stat"><span>Net Salary</span><strong>${formatCurrency(data.netSalary)}</strong></div>
        </div>
        ${noDeductionNote}`;
}

function normalizeIdentity(value) {
    return String(value || "").trim().toLowerCase();
}

function teacherIdentityKey(teacher = {}) {
    const legacyUid = normalizeIdentity(teacher.legacyUid || teacher.firebaseUid);
    if (legacyUid) return `uid:${legacyUid}`;
    const teacherId = normalizeIdentity(teacher.teacherId);
    if (teacherId) return `teacherId:${teacherId}`;
    const email = normalizeIdentity(teacher.email || teacher.authEmail);
    if (email) return `email:${email}`;
    return `doc:${normalizeIdentity(teacher.docId || teacher.uid)}`;
}

function teacherDocScore(teacher = {}) {
    const docId = String(teacher.docId || "").trim();
    const legacyUid = String(teacher.legacyUid || teacher.firebaseUid || "").trim();
    const isMirrorDoc = Boolean(legacyUid && docId && legacyUid !== docId);
    return (isMirrorDoc ? 0 : 100)
        + (teacher.removedFromPanel === true || teacher.panelStatus === "removed" ? 0 : 10)
        + (teacher.teacherId ? 4 : 0)
        + (teacher.name ? 2 : 0);
}

function dedupeTeacherDocs(docs = []) {
    const byIdentity = new Map();
    docs.forEach((teacher) => {
        const key = teacherIdentityKey(teacher);
        const current = byIdentity.get(key);
        if (!current || teacherDocScore(teacher) > teacherDocScore(current)) {
            byIdentity.set(key, teacher);
        }
    });
    return [...byIdentity.values()];
}

async function loadAdminContext(user) {
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (!userDoc.exists() || userDoc.data().role !== "admin") {
        window.location.href = "teacher-dashboard.html";
        return false;
    }

    const adminData = userDoc.data();
    applyAttendanceAccessState(adminData);
    adminUID = user.uid;
    schoolName = adminData.schoolName || window.SchoolBranding?.getSchoolName() || "School";
    window.SchoolBranding?.persistSchoolName(schoolName);
    $("heroSchoolName").textContent = `${schoolName} Teacher Operations`;
    $("heroSubtitle").textContent = `Manage faculty accounts, daily attendance with check-in time, and salary payouts for ${schoolName}.`;
    return true;
}

async function loadTeachers() {
    const snapshot = await getDocs(query(collection(db, "users"), where("role", "==", "teacher"), where("adminId", "==", adminUID)));
    const allTeacherDocs = dedupeTeacherDocs(snapshot.docs.map((docSnap) => ({ ...docSnap.data(), docId: docSnap.id, uid: docSnap.id })))
        .sort((a, b) => String(a.name || "").localeCompare(String(b.name || "")));
    teachers = allTeacherDocs.filter((teacher) => teacher.removedFromPanel !== true && teacher.panelStatus !== "removed");
    removedTeachers = allTeacherDocs.filter((teacher) => teacher.removedFromPanel === true || teacher.panelStatus === "removed");
    renderTeacherList();
    renderSalaryTeacherOptions();
}

async function loadSalaryRecords() {
    const snapshot = await getDocs(collection(db, "schools", adminUID, "teacher_salary_records"));
    salaryRecords = snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }))
        .sort((a, b) => `${b.monthKey || ""}${b.teacherName || ""}`.localeCompare(`${a.monthKey || ""}${a.teacherName || ""}`));
    renderSalaryRecordList();
    if (teacherDirectoryView === "removed") renderTeacherList();
}

async function loadTeacherAttendanceForDate() {
    if (!attendanceAccessEnabled) {
        selectedAttendanceRecords = [];
        if (teacherAttendanceListEl) {
            teacherAttendanceListEl.innerHTML = `<div class="empty-state">Attendance access has been disabled for this school by the Super Admin.</div>`;
        }
        return;
    }
    const date = attendanceDateEl.value;
    const snapshot = await getDocs(query(collection(db, "schools", adminUID, "teacher_attendance"), where("date", "==", date)));
    selectedAttendanceRecords = snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));
    renderAttendanceRows();
    updateTopStats();
}

window.loadTeacherAttendanceForDate = loadTeacherAttendanceForDate;

async function refreshEverything() {
    await Promise.all([loadTeachers(), loadSalaryRecords(), loadTeacherAttendanceForDate(), loadLeavePolicy()]);
    updateTopStats();
}

async function generateTeacherId() {
    const snapshot = await getDocs(query(collection(db, "users"), where("role", "==", "teacher")));
    const existingIds = new Set(snapshot.docs.map((docSnap) => String(docSnap.data().teacherId || "")));
    let teacherId = "";
    do {
        teacherId = `TCH${Math.floor(100000 + Math.random() * 900000)}`;
    } while (existingIds.has(teacherId));
    return teacherId;
}

// ─── UPDATED: buildTeacherSalaryProfile now applies free leave policy ────
function buildTeacherSalaryProfile(teacher, monthValue, attendanceSummary) {
    const baseSalary = roundCurrency(teacher.monthlySalary || 0);
    const workingDays = Number(attendanceSummary.workingDays || attendanceSummary.markedDays || 0);
    const perDayRate = workingDays ? roundCurrency(baseSalary / workingDays) : roundCurrency(baseSalary);

    const absentDays = attendanceSummary.absentDays || 0;
    const noDeductionDaysApplied = Math.min(absentDays, noDeductionLeaveDays);
    const chargeableAbsentDays = Math.max(absentDays - noDeductionDaysApplied, 0);

    const deductionDays = roundCurrency(
        chargeableAbsentDays +
        (attendanceSummary.halfDays || 0) * 0.5
    );
    const deductionAmount = roundCurrency(perDayRate * deductionDays);
    const netSalary = roundCurrency(Math.max(baseSalary - deductionAmount, 0));

    return {
        teacherUid: teacher.uid,
        teacherId: teacher.teacherId || "",
        teacherName: teacher.name || "",
        monthKey: monthValue,
        monthLabel: formatMonthLabel(monthValue),
        baseSalary,
        workingDays,
        markedDays: attendanceSummary.markedDays,
        presentDays: attendanceSummary.presentDays,
        halfDays: attendanceSummary.halfDays,
        absentDays,
        leaveDays: 0,
        freeLeaveApplied: noDeductionDaysApplied,
        noDeductionDaysApplied,
        chargeableAbsentDays,
        chargeableLeaveDays: 0,
        perDayRate,
        deductionDays,
        deductionAmount,
        netSalary,
        noDeductionPolicyDays: noDeductionLeaveDays
    };
}
// ─────────────────────────────────────────────────────────────────────────

async function getTeacherAttendanceSummaryForMonth(teacherUid, monthValue) {
    const snapshot = await getDocs(query(collection(db, "schools", adminUID, "teacher_attendance"), where("teacherUid", "==", teacherUid)));
    const records = snapshot.docs
        .map((docSnap) => docSnap.data())
        .filter((record) => record.teacherUid === teacherUid && isDateInMonth(record.date, monthValue));
    const summary = { markedDays: records.length, workingDays: countAttendanceWorkingDays(records), presentDays: 0, halfDays: 0, absentDays: 0, leaveDays: 0 };

    records.forEach((record) => {
        const status = normalizeAttendanceStatus(record.status);
        if (status === "Present") summary.presentDays += 1;
        else if (status === "Half Day") summary.halfDays += 1;
        else summary.absentDays += 1;
    });

    return summary;
}

async function buildSalaryPreview(teacherUid, monthValue) {
    const teacher = getTeacherByUid(teacherUid);
    if (!teacher) return null;
    const attendanceSummary = await getTeacherAttendanceSummaryForMonth(teacherUid, monthValue);
    return buildTeacherSalaryProfile(teacher, monthValue, attendanceSummary);
}

async function ensureSalaryRecord(teacherUid, monthValue) {
    const teacher = getTeacherByUid(teacherUid);
    if (!teacher) throw new Error("Teacher not found.");

    const preview = await buildSalaryPreview(teacherUid, monthValue);
    const recordId = `${teacherUid}_${monthValue}`;
    const recordRef = doc(db, "schools", adminUID, "teacher_salary_records", recordId);
    const existingSnap = await getDoc(recordRef);
    const existingData = existingSnap.exists() ? existingSnap.data() : {};
    const payments = Array.isArray(existingData.payments) ? existingData.payments : [];
    const paidAmount = roundCurrency(payments.reduce((sum, payment) => sum + Number(payment.amount || 0), 0));
    const remainingAmount = roundCurrency(Math.max(preview.netSalary - paidAmount, 0));

    const payload = {
        ...preview,
        paidAmount,
        remainingAmount,
        status: getSalaryStatus(preview.netSalary, paidAmount),
        payments,
        updatedAt: serverTimestamp(),
        updatedBy: auth.currentUser?.email || "admin"
    };

    if (!existingSnap.exists()) payload.generatedAt = serverTimestamp();
    await setDoc(recordRef, payload, { merge: true });
    activeSalaryRecordId = recordId;
    activeSalaryRecord = { id: recordId, ...payload };
    return activeSalaryRecord;
}

function setActiveSalaryRecord(record) {
    activeSalaryRecord = record;
    activeSalaryRecordId = record?.id || "";
    activeSalaryHintEl.textContent = record
        ? `Active record: ${record.teacherName} - ${record.monthLabel}`
        : "Pick a generated salary record from the list below before recording payment.";
    recordPaymentBtnEl.disabled = !record;
    renderSalaryRecordList();
}

// ═══════════════════════════════════════════════════════════════════
// NEW: Monthly Attendance Report Modal
// ═══════════════════════════════════════════════════════════════════
window.openMonthlyReportModal = () => {
    $("reportMonth").value = currentMonthValue();
    openModalElement("monthlyReportModal");
};

window.closeMonthlyReportModal = (event) => {
    if (shouldCloseModalFromEvent(event, "monthlyReportModal")) closeModalElement("monthlyReportModal");
};

window.loadMonthlyReport = async () => {
    const monthValue = $("reportMonth").value;
    const filterTeacher = $("reportTeacherFilter").value;
    if (!monthValue) return showToast("Select a month first.", "error");

    const contentEl = $("monthlyReportContent");
    contentEl.innerHTML = `<div class="empty-state">Loading report…</div>`;

    try {
        const snapshot = await getDocs(collection(db, "schools", adminUID, "teacher_attendance"));
        const allRecords = snapshot.docs
            .map((docSnap) => docSnap.data())
            .filter((record) => isDateInMonth(record.date, monthValue));

        // Filter by teacher if selected
        const targetTeachers = filterTeacher
            ? teachers.filter((t) => t.uid === filterTeacher)
            : teachers;

        if (!targetTeachers.length) {
            contentEl.innerHTML = `<div class="empty-state">No teachers found.</div>`;
            return;
        }

        const workingDays = countAttendanceWorkingDays(allRecords);
        let totalPresent = 0, totalAbsent = 0, totalHalf = 0, totalNoDeduction = 0, totalChargeableAbsent = 0;

        const rows = targetTeachers.map((teacher) => {
            const tRecords = allRecords.filter((r) => r.teacherUid === teacher.uid);
            const teacherWorkingDays = countAttendanceWorkingDays(tRecords);
            const present = tRecords.filter((r) => normalizeAttendanceStatus(r.status) === "Present").length;
            const absent  = tRecords.filter((r) => normalizeAttendanceStatus(r.status) === "Absent").length;
            const half    = tRecords.filter((r) => normalizeAttendanceStatus(r.status) === "Half Day").length;
            const marked  = tRecords.length;
            const noDeductionApplied = Math.min(absent, noDeductionLeaveDays);
            const chargeableAbsent = Math.max(absent - noDeductionApplied, 0);

            totalPresent += present;
            totalAbsent  += absent;
            totalHalf    += half;
            totalNoDeduction += noDeductionApplied;
            totalChargeableAbsent += chargeableAbsent;

            // Build daily detail (sorted by date)
            const sortedRecords = [...tRecords].sort((a, b) => normalizeDateValue(a.date).localeCompare(normalizeDateValue(b.date)));
            const dailyDetail = sortedRecords.map((r) => {
                const status = normalizeAttendanceStatus(r.status);
                const tone = status === "Present" ? "badge-present" : status === "Half Day" ? "badge-half" : "badge-absent";
                const timeInfo = r.checkInTime ? ` (In: ${r.checkInTime}${r.checkOutTime ? `, Out: ${r.checkOutTime}` : ""})` : "";
                return `<span class="report-badge ${tone}" style="margin:2px;" title="${escapeHtml(normalizeDateValue(r.date) || r.date)}${timeInfo}">${formatDateLabel(r.date).split("/").slice(0,2).join("/")}</span>`;
            }).join("");

            return `
                <tr>
                    <td>
                        <div class="report-teacher-name">${escapeHtml(teacher.name || "N/A")}</div>
                        <div class="report-teacher-meta">${escapeHtml(teacher.teacherId || "N/A")} | Class ${escapeHtml(teacher.class || "N/A")}-${escapeHtml(teacher.section || "N/A")}</div>
                    </td>
                    <td style="text-align:center;">${marked} / ${teacherWorkingDays}</td>
                    <td style="text-align:center;"><span class="report-badge badge-present">${present}</span></td>
                    <td style="text-align:center;"><span class="report-badge badge-absent">${absent}</span></td>
                    <td style="text-align:center;"><span class="report-badge badge-half">${half}</span></td>
                    <td style="text-align:center;"><span class="report-badge badge-present">${noDeductionApplied}</span></td>
                    <td style="text-align:center;"><span class="report-badge badge-absent">${chargeableAbsent}</span></td>
                    <td>
                        <div style="display:flex;flex-wrap:wrap;gap:3px;min-width:160px;">${dailyDetail || '<span style="color:var(--text-soft);font-size:12px;">No records</span>'}</div>
                    </td>
                </tr>`;
        }).join("");

        contentEl.innerHTML = `
            <div class="report-summary-row">
                <div><strong>${formatMonthLabel(monthValue)}</strong></div>
                <div>Teachers: <strong>${targetTeachers.length}</strong></div>
                <div>Working Days: <strong>${workingDays}</strong></div>
                <div>Total Present: <strong style="color:var(--success)">${totalPresent}</strong></div>
                <div>Total Absent: <strong style="color:var(--danger)">${totalAbsent}</strong></div>
                <div>Total Half Day: <strong style="color:var(--warning)">${totalHalf}</strong></div>
                <div>No Deduction Applied: <strong style="color:var(--success)">${totalNoDeduction}</strong></div>
                <div>Chargeable Absent: <strong style="color:var(--danger)">${totalChargeableAbsent}</strong></div>
                ${noDeductionLeaveDays > 0 ? `<div>No Deduction Policy: <strong>${noDeductionLeaveDays} absent day(s)/month</strong></div>` : ""}
            </div>
            <div class="report-table-wrap">
                <table class="report-table">
                    <thead>
                        <tr>
                            <th>Teacher</th>
                            <th>Marked / Working</th>
                            <th>Present</th>
                            <th>Absent</th>
                            <th>Half Day</th>
                            <th>No Deduction</th>
                            <th>Chargeable Absent</th>
                            <th>Daily Breakdown</th>
                        </tr>
                    </thead>
                    <tbody>${rows}</tbody>
                </table>
            </div>
        `;
    } catch (error) {
        console.error(error);
        contentEl.innerHTML = `<div class="empty-state">Unable to load report: ${escapeHtml(error.message)}</div>`;
    }
};

// ═══════════════════════════════════════════════════════════════════
// NEW: Edit Teacher Details Modal
// ═══════════════════════════════════════════════════════════════════
window.updateEditSections = () => {
    const editSectionSelect = $("editSectionSelect");
    editSectionSelect.innerHTML = `<option value="">Select section</option>${ALL_SECTIONS.map((s) => `<option value="${s}">${s}</option>`).join("")}`;
};

window.updateEditClassSections = () => {
    const sectionSelect = $("editClassesSectionSelect");
    if (!sectionSelect) return;
    sectionSelect.innerHTML = `<option value="">Select section</option>${ALL_SECTIONS.map((section) => `<option value="${section}">${section}</option>`).join("")}`;
};

window.addTeacherClassOnlyAssignment = () => addAssignmentFromSelect(
    draftClassOnlyAssignments,
    $("editClassesClassSelect"),
    $("editClassesSectionSelect"),
    "editClassesAssignmentsList",
    "removeTeacherClassOnlyAssignment"
);

window.removeTeacherClassOnlyAssignment = (index) => {
    draftClassOnlyAssignments.splice(index, 1);
    renderAssignmentList("editClassesAssignmentsList", draftClassOnlyAssignments, "removeTeacherClassOnlyAssignment");
};

window.openEditTeacherClassesModal = (teacherUid) => {
    const teacher = getTeacherByUid(teacherUid);
    if (!teacher) return showToast("Teacher not found.", "error");

    $("editClassesTeacherUid").value = teacherUid;
    $("editTeacherClassesSubtitle").textContent = `${teacher.name || "Teacher"} | ${teacher.teacherId || "N/A"}`;
    draftClassOnlyAssignments = getTeacherAssignments(teacher);

    const classSelect = $("editClassesClassSelect");
    classSelect.innerHTML = `<option value="">Select class</option>${CLASS_LIST.map((className) => `<option value="${className}">${className}</option>`).join("")}`;
    window.updateEditClassSections();
    renderAssignmentList("editClassesAssignmentsList", draftClassOnlyAssignments, "removeTeacherClassOnlyAssignment");
    openModalElement("editTeacherClassesModal");
};

window.closeEditTeacherClassesModal = () => {
    closeModalElement("editTeacherClassesModal");
    draftClassOnlyAssignments = [];
};

window.saveTeacherClassAssignments = async () => {
    const teacherUid = $("editClassesTeacherUid")?.value || "";
    const teacher = getTeacherByUid(teacherUid);
    if (!teacher) return showToast("Teacher not found.", "error");
    if (!draftClassOnlyAssignments.length) return showToast("Add at least one assigned class before saving.", "error");

    draftClassOnlyAssignments = dedupeAssignments(draftClassOnlyAssignments);
    const primary = primaryAssignment(draftClassOnlyAssignments);
    const saveBtn = $("saveEditClassesBtn");
    setButtonLoading(saveBtn, "Saving...", true);

    try {
        await Promise.all([
            setDoc(doc(db, "users", teacherUid), {
                class: primary.class,
                section: primary.section,
                assignedClasses: draftClassOnlyAssignments,
                updatedAt: serverTimestamp()
            }, { merge: true }),
            setDoc(doc(db, "schools", adminUID, "teacher_salaries", teacherUid), {
                class: primary.class,
                section: primary.section,
                assignedClasses: draftClassOnlyAssignments,
                updatedAt: serverTimestamp()
            }, { merge: true })
        ]);

        teacher.class = primary.class;
        teacher.section = primary.section;
        teacher.assignedClasses = [...draftClassOnlyAssignments];
        renderTeacherList();
        renderSalaryTeacherOptions();
        renderAttendanceRows();
        window.closeEditTeacherClassesModal();
        showToast("Teacher class assignments updated.");
    } catch (error) {
        console.error(error);
        showToast(error.message || "Unable to update class assignments.", "error");
    } finally {
        setButtonLoading(saveBtn, "Saving...", false);
    }
};

let editTeacherModalReturnFocus = null;

function setEditTeacherModalOpen(isOpen) {
    const modal = isOpen ? openModalElement("editTeacherModal") : closeModalElement("editTeacherModal");
    if (!modal) return;

    document.body.classList.toggle("edit-teacher-dialog-open", isOpen);

    if (isOpen) {
        requestAnimationFrame(() => $("editTeacherCloseBtn")?.focus());
    } else {
        editTeacherModalReturnFocus?.focus?.();
        editTeacherModalReturnFocus = null;
    }
}

window.openEditTeacherModal = (teacherUid) => {
    const teacher = getTeacherByUid(teacherUid);
    if (!teacher) return showToast("Teacher not found.", "error");

    editTeacherModalReturnFocus = document.activeElement;

    $("editTeacherUid").value = teacherUid;
    $("removeTeacherPhotoFlag").value = "0";
    $("editTeacherPhoto").value = "";
    $("editTeacherName").value = teacher.name || "";
    $("editTeacherEmail").value = teacher.email || "";
    const photoUrl = getTeacherPhotoUrl(teacher);
    $("editTeacherPhotoPreview").innerHTML = photoUrl
        ? `<img src="${escapeHtml(photoUrl)}" alt="${escapeHtml(teacher.name || "Teacher")} photo">`
        : escapeHtml(getInitials(teacher.name || teacher.teacherId, "T"));
    draftEditTeacherAssignments = getTeacherAssignments(teacher);

    // Populate edit class select
    const editClassSelect = $("editClassSelect");
    editClassSelect.innerHTML = `<option value="">Select class</option>${CLASS_LIST.map((c) => `<option value="${c}" ${c === teacher.class ? "selected" : ""}>${c}</option>`).join("")}`;

    // Populate sections and set current
    window.updateEditSections();
    const editSectionSelect = $("editSectionSelect");
    if (teacher.section) {
        editSectionSelect.value = teacher.section;
    }
    renderAssignmentList("editTeacherAssignmentsList", draftEditTeacherAssignments, "removeEditTeacherAssignment");

    setEditTeacherModalOpen(true);
};

window.previewCurrentTeacherPhoto = () => {
    const teacher = getTeacherByUid($("editTeacherUid")?.value || "");
    const photoUrl = getTeacherPhotoUrl(teacher || {});
    window.openPhotoPreview(photoUrl, teacher?.name || "Teacher");
};

window.previewEditedTeacherPhoto = () => {
    const teacher = getTeacherByUid($("editTeacherUid")?.value || "") || {};
    const file = $("editTeacherPhoto")?.files?.[0];
    const preview = $("editTeacherPhotoPreview");
    if (!preview) return;
    $("removeTeacherPhotoFlag").value = "0";
    if (!file) {
        const photoUrl = getTeacherPhotoUrl(teacher);
        preview.innerHTML = photoUrl
            ? `<img src="${escapeHtml(photoUrl)}" alt="${escapeHtml(teacher.name || "Teacher")} photo">`
            : escapeHtml(getInitials(teacher.name || teacher.teacherId, "T"));
        return;
    }
    const reader = new FileReader();
    reader.onload = () => { preview.innerHTML = `<img src="${reader.result}" alt="Selected teacher photo">`; };
    reader.readAsDataURL(file);
};

window.removeTeacherPhoto = () => {
    $("editTeacherPhoto").value = "";
    $("removeTeacherPhotoFlag").value = "1";
    $("editTeacherPhotoPreview").textContent = "No photo";
};

window.closeEditTeacherModal = (event) => {
    if (event) {
        event.preventDefault?.();
        event.stopPropagation?.();
    }
    setEditTeacherModalOpen(false);
};

function wireEditTeacherModalClose() {
    const modal = $("editTeacherModal");
    const closeButton = $("editTeacherCloseBtn");
    const cancelButton = $("editTeacherCancelBtn");
    if (!modal || modal.dataset.closeWired === "true") return;
    modal.dataset.closeWired = "true";

    modal.addEventListener("click", (event) => {
        if (event.target === modal) window.closeEditTeacherModal(event);
    });
    closeButton?.addEventListener("click", (event) => window.closeEditTeacherModal(event));
    cancelButton?.addEventListener("click", (event) => window.closeEditTeacherModal(event));
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && !modal.hidden && modal.style.display !== "none") window.closeEditTeacherModal(event);
    });
}

window.saveEditedTeacher = async () => {
    const teacherUid = $("editTeacherUid").value;
    const name  = $("editTeacherName").value.trim();
    const email = $("editTeacherEmail").value.trim().toLowerCase();
    const selectedPhoto = $("editTeacherPhoto")?.files?.[0] || null;
    const removePhoto = $("removeTeacherPhotoFlag")?.value === "1";
    if (!draftEditTeacherAssignments.length) {
        addAssignmentFromSelect(draftEditTeacherAssignments, $("editClassSelect"), $("editSectionSelect"), "editTeacherAssignmentsList", "removeEditTeacherAssignment");
    }
    draftEditTeacherAssignments = dedupeAssignments(draftEditTeacherAssignments);
    const primary = primaryAssignment(draftEditTeacherAssignments);

    if (!teacherUid || !name || !email || !primary.class || !primary.section) {
        return showToast("Fill all fields before saving.", "error");
    }

    const saveBtn = $("saveEditTeacherBtn");
    setButtonLoading(saveBtn, "Saving…", true);

    try {
        const photoUpload = selectedPhoto ? await uploadCloudinaryPhoto(selectedPhoto, "teachers", teacherUid) : null;
        const photoFields = photoUpload
            ? { photoUrl: photoUpload.photoUrl, photoPublicId: photoUpload.photoPublicId }
            : removePhoto ? { photoUrl: "", photoPublicId: "" } : {};
        // Update main user document
        await setDoc(doc(db, "users", teacherUid), {
            name,
            email,
            class: primary.class,
            section: primary.section,
            assignedClasses: draftEditTeacherAssignments,
            ...photoFields,
            updatedAt: serverTimestamp()
        }, { merge: true });

        // Update teacher_salaries sub-collection record
        await setDoc(doc(db, "schools", adminUID, "teacher_salaries", teacherUid), {
            teacherName: name,
            teacherEmail: email,
            class: primary.class,
            section: primary.section,
            assignedClasses: draftEditTeacherAssignments,
            ...photoFields,
            updatedAt: serverTimestamp()
        }, { merge: true });

        // Update local teachers array so cards refresh immediately
        const teacher = getTeacherByUid(teacherUid);
        if (teacher) {
            teacher.name    = name;
            teacher.email   = email;
            teacher.class   = primary.class;
            teacher.section = primary.section;
            teacher.assignedClasses = [...draftEditTeacherAssignments];
            if (photoUpload || removePhoto) {
                teacher.photoUrl = photoFields.photoUrl || "";
                teacher.photoPublicId = photoFields.photoPublicId || "";
            }
        }

        renderTeacherList();
        renderSalaryTeacherOptions();
        renderAttendanceRows();
        setEditTeacherModalOpen(false);
        showToast("Teacher details updated successfully.");
    } catch (error) {
        console.error(error);
        showToast(error.message || "Unable to update teacher details.", "error");
    } finally {
        setButtonLoading(saveBtn, "Saving…", false);
    }
};

// ═══════════════════════════════════════════════════════════════════
// Existing window-level functions (unchanged except where noted)
// ═══════════════════════════════════════════════════════════════════
window.switchTab = (tabName) => {
    if (tabName === "attendance" && !requireAttendanceAccess()) tabName = "directory";
    document.querySelectorAll(".tab-btn").forEach((button) => button.classList.toggle("active", button.dataset.tab === tabName));
    document.querySelectorAll(".tab-panel").forEach((panel) => panel.classList.toggle("active", panel.id === `${tabName}Tab`));
    if (tabName === "attendance") loadTeacherAttendanceForDate().catch((error) => showToast(error.message || "Unable to load attendance.", "error"));
    if (tabName === "salary") renderSalaryRecordList();
};

window.goBack = () => { window.location.href = "admin-dashboard.html"; };

window.updateSections = () => {
    sectionSelectEl.innerHTML = `<option value="">Select section</option>${ALL_SECTIONS.map((section) => `<option value="${section}">${section}</option>`).join("")}`;
};

window.handleAttendanceRowChange = (select) => {
    if (!requireAttendanceAccess()) return;
    const row = select.closest(".attendance-row");
    const chip = row.querySelector(".status-chip");
    const weight = row.querySelector(".attendance-weight");
    const status = normalizeAttendanceStatus(select.value);
    select.value = status;
    chip.textContent = status;
    chip.className = `status-chip ${status === "Present" ? "status-present" : status === "Half Day" ? "status-half" : "status-absent"}`;
    weight.textContent = `${getAttendanceWeight(status)} day`;
    renderAttendanceSummaryFromRows();
};

window.fillTeacherAttendanceStatus = (status) => {
    if (!requireAttendanceAccess()) return;
    const safeStatus = normalizeAttendanceStatus(status);
    document.querySelectorAll(".attendance-status:not([disabled])").forEach((select) => {
        select.value = safeStatus;
        window.handleAttendanceRowChange(select);
    });
};

window.setBulkCheckInNow = () => {
    if (!requireAttendanceAccess()) return;
    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    document.querySelectorAll(".attendance-checkin:not([disabled])").forEach((input) => {
        if (!input.value) input.value = time;
    });
};

window.clearBulkTimes = () => {
    if (!requireAttendanceAccess()) return;
    document.querySelectorAll(".attendance-checkin:not([disabled]), .attendance-checkout:not([disabled])").forEach((input) => { input.value = ""; });
};

window.generateTeacherAttendanceQr = (teacherUid) => {
    if (!requireAttendanceAccess()) return;
    const teacher = getTeacherByUid(teacherUid);
    if (!teacher) return showToast("Teacher not found.", "error");
    pendingQrTeacherUid = teacherUid;
    clearActiveTeacherQr(true);
    $("qrModalTitle").textContent = `${teacher.name || "Teacher"} Attendance QR`;
    $("qrModalSubtitle").textContent = `Teacher ID: ${teacher.teacherId || "N/A"} | Select the QR attendance type before generating.`;
    $("teacherQrMode").value = "checkin";
    $("teacherQrMode").disabled = false;
    $("confirmGenerateQrBtn").disabled = false;
    $("teacherQrImage").removeAttribute("src");
    $("teacherQrCodeText").textContent = "Choose QR type and click Generate Selected QR.";
    $("teacherQrMeta").textContent = "The QR will disappear from admin automatically after this teacher scans it successfully.";
    openModalElement("teacherQrModal");
};

function clearActiveTeacherQr(deactivateToken = true) {
    if (activeQrRefreshTimer) {
        window.clearInterval(activeQrRefreshTimer);
        activeQrRefreshTimer = null;
    }
    if (activeQrUnsubscribe) {
        activeQrUnsubscribe();
        activeQrUnsubscribe = null;
    }
    if (deactivateToken && activeQrTokenRef) {
        setDoc(activeQrTokenRef, {
            active: false,
            expiredByAdmin: true,
            expiredAt: serverTimestamp()
        }, { merge: true }).catch(console.error);
    }
    activeQrTokenRef = null;
}

async function createTeacherQrToken(teacher, qrMode) {
    const date = localDateValue();
    const actionTime = currentTimeValue();
    const modeLabels = {
        checkin: "Check-In Present",
        halfday: "Half Day Check-Out",
        checkout: "Check-Out"
    };
    const teacherUid = teacher.uid;
    const tokenId = `${teacherUid}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const qrPayload = buildTeacherQrPayload(tokenId);
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=320x320&margin=16&data=${encodeURIComponent(qrPayload)}`;
    const expiresAtMillis = Date.now() + TEACHER_QR_REFRESH_MS;

    if (activeQrUnsubscribe) {
        activeQrUnsubscribe();
        activeQrUnsubscribe = null;
    }
    if (activeQrTokenRef) {
        await setDoc(activeQrTokenRef, {
            active: false,
            expiredByRotation: true,
            expiredAt: serverTimestamp()
        }, { merge: true }).catch(console.error);
    }

    const tokenRef = doc(db, "schools", adminUID, "teacher_attendance_qr", tokenId);
    activeQrTokenRef = tokenRef;
    await setDoc(tokenRef, {
        tokenId,
        teacherUid,
        teacherId: teacher.teacherId || "",
        teacherName: teacher.name || "",
        teacherEmail: teacher.email || "",
        schoolId: adminUID,
        date,
        qrMode,
        modeLabel: modeLabels[qrMode] || modeLabels.checkin,
        actionTime,
        checkInTime: qrMode === "checkin" ? actionTime : "",
        checkOutTime: qrMode !== "checkin" ? actionTime : "",
        status: qrMode === "halfday" ? "Half Day" : "Present",
        active: true,
        payload: qrPayload,
        expiresAtMillis,
        createdAt: serverTimestamp(),
        createdBy: auth.currentUser?.email || "admin"
    });

    $("qrModalTitle").textContent = `${teacher.name || "Teacher"} Attendance QR`;
    $("teacherQrMode").value = qrMode;
    $("teacherQrMode").disabled = true;
    $("qrModalSubtitle").textContent = `Teacher ID: ${teacher.teacherId || "N/A"} | ${modeLabels[qrMode] || modeLabels.checkin}: ${formatDateLabel(date)} ${actionTime}`;
    $("teacherQrImage").src = qrUrl;
    $("teacherQrCodeText").textContent = qrPayload;
    $("teacherQrMeta").textContent = "This QR refreshes every 30 seconds and works only for this teacher.";
        openModalElement("teacherQrModal");
    activeQrUnsubscribe = onSnapshot(tokenRef, (snap) => {
        if (!snap.exists()) return;
        const token = snap.data();
        if (token.active === false && token.scannedByUid === teacher.uid) {
            clearActiveTeacherQr(false);
            closeModalElement("teacherQrModal");
            $("teacherQrImage").removeAttribute("src");
            $("teacherQrCodeText").textContent = "";
            $("confirmGenerateQrBtn").disabled = false;
            $("teacherQrMode").disabled = false;
            showToast(`${teacher.name || "Teacher"} attendance marked. QR closed automatically.`, "success");
            loadTeacherAttendanceForDate().catch((error) => showToast(error.message || "Unable to refresh attendance.", "error"));
        }
    });
}

window.confirmGenerateTeacherAttendanceQr = async () => {
    if (!requireAttendanceAccess()) return;
    const teacher = getTeacherByUid(pendingQrTeacherUid);
    if (!teacher) return showToast("Teacher not found.", "error");
    const qrMode = $("teacherQrMode")?.value || "checkin";

    try {
        clearActiveTeacherQr(true);
        $("confirmGenerateQrBtn").disabled = true;
        $("teacherQrCodeText").textContent = "Generating QR...";
        await createTeacherQrToken(teacher, qrMode);
        activeQrRefreshTimer = window.setInterval(async () => {
            if ($("teacherQrModal").hidden || $("teacherQrModal").style.display === "none") return clearActiveTeacherQr(true);
            try {
                await createTeacherQrToken(teacher, qrMode);
            } catch (error) {
                console.error(error);
                showToast(error.message || "Unable to refresh teacher QR.", "error");
            }
        }, TEACHER_QR_REFRESH_MS);
        showToast("Teacher attendance QR generated. It will refresh every 30 seconds.", "info");
    } catch (error) {
        console.error(error);
        $("confirmGenerateQrBtn").disabled = false;
        showToast(error.message || "Unable to generate teacher QR.", "error");
    }
};

window.closeTeacherQrModal = (event) => {
    if (event) {
        event.preventDefault?.();
        event.stopPropagation?.();
    }
    if (!event || shouldCloseModalFromEvent(event, "teacherQrModal")) closeModalElement("teacherQrModal");
    if (($("teacherQrModal").hidden || $("teacherQrModal").style.display === "none") && (activeQrUnsubscribe || activeQrRefreshTimer || activeQrTokenRef)) {
        clearActiveTeacherQr(true);
        $("confirmGenerateQrBtn").disabled = false;
        $("teacherQrMode").disabled = false;
    }
};

window.saveTeacherAttendance = async () => {
    if (!requireAttendanceAccess()) return;
    if (!teachers.length) return showToast("Add teachers first before saving attendance.", "error");
    if (!attendanceDateEl.value) return showToast("Select an attendance date first.", "error");

    try {
        const rows = Array.from(document.querySelectorAll(".attendance-row"));
        await Promise.all(rows.map((row) => {
            const teacherUid = row.dataset.teacherUid;
            const teacher = getTeacherByUid(teacherUid);
            const existingRecord = selectedAttendanceRecords.find((record) => record.teacherUid === teacherUid && record.date === attendanceDateEl.value) || {};
            const qrLocked = row.dataset.qrLocked === "true";
            const requestedStatus = normalizeAttendanceStatus(row.querySelector(".attendance-status")?.value || existingRecord.status || "Present");
            const existingStatus = normalizeAttendanceStatus(existingRecord.status || "Present");
            const status = qrLocked
                ? (existingStatus === "Present" && requestedStatus === "Half Day" ? "Half Day" : existingStatus)
                : requestedStatus;
            return setDoc(doc(db, "schools", adminUID, "teacher_attendance", `${teacherUid}_${attendanceDateEl.value}`), {
                teacherUid,
                teacherId: teacher.teacherId || "",
                teacherName: teacher.name || "",
                teacherEmail: teacher.email || "",
                class: teacher.class || "",
                section: teacher.section || "",
                date: attendanceDateEl.value,
                status,
                presentWeight: getAttendanceWeight(status),
                checkInTime: qrLocked ? (existingRecord.checkInTime || "") : row.querySelector(".attendance-checkin").value,
                checkOutTime: qrLocked ? (existingRecord.checkOutTime || "") : row.querySelector(".attendance-checkout").value,
                notes: qrLocked ? (existingRecord.notes || "") : row.querySelector(".attendance-note").value.trim(),
                updatedAt: serverTimestamp(),
                updatedBy: auth.currentUser?.email || "admin"
            }, { merge: true });
        }));
        await loadTeacherAttendanceForDate();
        showToast("Teacher attendance saved successfully.");
    } catch (error) {
        console.error(error);
        showToast(error.message || "Unable to save teacher attendance.", "error");
    }
};

window.markRemainingTeachersAbsent = async () => {
    if (!requireAttendanceAccess()) return;
    if (!teachers.length) return showToast("Add teachers first before marking attendance.", "error");
    if (!attendanceDateEl.value) return showToast("Select an attendance date first.", "error");

    const date = attendanceDateEl.value;
    const recordedTeacherIds = new Set(selectedAttendanceRecords.filter((record) => record.date === date).map((record) => record.teacherUid));
    const remainingTeachers = teachers.filter((teacher) => !recordedTeacherIds.has(teacher.uid));
    if (!remainingTeachers.length) return showToast("Every teacher already has attendance for this date.", "info");
    if (!window.confirm(`Mark ${remainingTeachers.length} remaining teacher(s) absent for ${formatDateLabel(date)}?`)) return;

    try {
        await Promise.all(remainingTeachers.map((teacher) => setDoc(doc(db, "schools", adminUID, "teacher_attendance", `${teacher.uid}_${date}`), {
            teacherUid: teacher.uid,
            teacherId: teacher.teacherId || "",
            teacherName: teacher.name || "",
            teacherEmail: teacher.email || "",
            class: teacher.class || "",
            section: teacher.section || "",
            date,
            status: "Absent",
            presentWeight: 0,
            checkInTime: "",
            checkOutTime: "",
            notes: "Marked absent by admin for remaining teachers.",
            updatedAt: serverTimestamp(),
            updatedBy: auth.currentUser?.email || "admin"
        }, { merge: true })));
        await loadTeacherAttendanceForDate();
        showToast(`${remainingTeachers.length} remaining teacher(s) marked absent.`);
    } catch (error) {
        console.error(error);
        showToast(error.message || "Unable to mark remaining teachers absent.", "error");
    }
};

window.openAttendanceForTeacher = (teacherUid) => {
    if (!requireAttendanceAccess()) return;
    window.switchTab("attendance");
    const teacher = getTeacherByUid(teacherUid);
    if (teacher) showToast(`Attendance view opened for ${teacher.name}.`, "info");
};

window.updateTeacherSalary = async (teacherUid) => {
    const teacher = getTeacherByUid(teacherUid);
    if (!teacher) return showToast("Teacher not found.", "error");
    const monthlySalary = roundCurrency($(`salary_${teacherUid}`).value || 0);
    if (monthlySalary < 0) return showToast("Monthly salary cannot be negative.", "error");

    try {
        await setDoc(doc(db, "users", teacherUid), { monthlySalary, updatedAt: serverTimestamp() }, { merge: true });
        await setDoc(doc(db, "schools", adminUID, "teacher_salaries", teacherUid), {
            teacherUid,
            teacherId: teacher.teacherId || "",
            teacherName: teacher.name || "",
            monthlySalary,
            currency: "INR",
            active: true,
            updatedAt: serverTimestamp()
        }, { merge: true });
        teacher.monthlySalary = monthlySalary;
        renderTeacherList();
        renderSalaryTeacherOptions();
        updateTopStats();
        showToast("Monthly salary updated.");
    } catch (error) {
        console.error(error);
        showToast(error.message || "Unable to update teacher salary.", "error");
    }
};

window.openSalaryDeskForTeacher = async (teacherUid) => {
    salaryTeacherSelectEl.value = teacherUid;
    window.switchTab("salary");
    await window.loadSalaryPreview();
};

window.loadSalaryPreview = async () => {
    const teacherUid = salaryTeacherSelectEl.value;
    const monthValue = salaryMonthEl.value;
    if (!teacherUid || !monthValue) return renderSalaryPreview(null);
    try {
        const preview = await buildSalaryPreview(teacherUid, monthValue);
        const existing = salaryRecords.find((record) => record.teacherUid === teacherUid && record.monthKey === monthValue) || null;
        renderSalaryPreview(preview, existing);
    } catch (error) {
        console.error(error);
        showToast(error.message || "Unable to load salary preview.", "error");
    }
};

window.generateSelectedSalaryRecord = async () => {
    if (!salaryTeacherSelectEl.value || !salaryMonthEl.value) return showToast("Select a teacher and month first.", "error");
    try {
        const record = await ensureSalaryRecord(salaryTeacherSelectEl.value, salaryMonthEl.value);
        await loadSalaryRecords();
        const updated = salaryRecords.find((entry) => entry.id === record.id) || record;
        setActiveSalaryRecord(updated);
        renderSalaryPreview(updated, updated);
        updateTopStats();
        showToast("Salary record generated.");
    } catch (error) {
        console.error(error);
        showToast(error.message || "Unable to generate salary record.", "error");
    }
};

window.generateAllSalaryRecords = async () => {
    if (!teachers.length) return showToast("No teachers found to generate salary records.", "error");
    if (!salaryMonthEl.value) return showToast("Select a salary month first.", "error");
    try {
        for (const teacher of teachers) {
            await ensureSalaryRecord(teacher.uid, salaryMonthEl.value);
        }
        await loadSalaryRecords();
        renderSalaryRecordList();
        updateTopStats();
        showToast("Salary records generated for all teachers.");
    } catch (error) {
        console.error(error);
        showToast(error.message || "Unable to generate all salary records.", "error");
    }
};

window.activateSalaryRecord = (recordId) => {
    const record = salaryRecords.find((entry) => entry.id === recordId);
    if (!record) return showToast("Salary record not found.", "error");
    salaryTeacherSelectEl.value = record.teacherUid;
    salaryMonthEl.value = record.monthKey;
    setActiveSalaryRecord(record);
    renderSalaryPreview(record, record);
    paymentAmountEl.focus();
};

window.recordSalaryPayment = async () => {
    if (!activeSalaryRecordId || !activeSalaryRecord) return showToast("Select a salary record first.", "error");
    const amount = roundCurrency(paymentAmountEl.value || 0);
    if (amount <= 0 || !paymentDateEl.value) return showToast("Enter payment amount and payment date.", "error");

    try {
        const recordRef = doc(db, "schools", adminUID, "teacher_salary_records", activeSalaryRecordId);
        const snap = await getDoc(recordRef);
        if (!snap.exists()) return showToast("Salary record no longer exists.", "error");
        const record = { id: snap.id, ...snap.data() };
        const payments = Array.isArray(record.payments) ? [...record.payments] : [];
        const newPayment = {
            amount,
            paymentDate: paymentDateEl.value,
            note: paymentNoteEl.value.trim(),
            recordedBy: auth.currentUser?.email || "admin",
            recordedAt: new Date().toISOString(),
            ledgerTransactionId: newLedgerTransactionId("SAL")
        };
        payments.push(newPayment);
        const paidAmount = roundCurrency(payments.reduce((sum, payment) => sum + Number(payment.amount || 0), 0));
        const remainingAmount = roundCurrency(Math.max(Number(record.netSalary || 0) - paidAmount, 0));
        await setDoc(recordRef, {
            payments,
            paidAmount,
            remainingAmount,
            status: getSalaryStatus(Number(record.netSalary || 0), paidAmount),
            updatedAt: serverTimestamp(),
            updatedBy: auth.currentUser?.email || "admin"
        }, { merge: true });
        await syncSalaryDebit({
            db,
            schoolId: adminUID,
            actor: { uid: auth.currentUser.uid, email: auth.currentUser.email, role: "admin" },
            recordId: activeSalaryRecordId,
            record,
            payment: newPayment,
            paymentIndex: payments.length - 1
        });
        paymentAmountEl.value = "";
        paymentDateEl.value = todayISO();
        paymentNoteEl.value = "";
        await loadSalaryRecords();
        const updated = salaryRecords.find((entry) => entry.id === activeSalaryRecordId) || null;
        setActiveSalaryRecord(updated);
        if (updated) renderSalaryPreview(updated, updated);
        updateTopStats();
        showToast("Salary payment recorded.");
    } catch (error) {
        console.error(error);
        showToast(error.message || "Unable to record salary payment.", "error");
    }
};

window.recalculateSalaryRecord = async (teacherUid, monthKey) => {
    try {
        const record = await ensureSalaryRecord(teacherUid, monthKey);
        await loadSalaryRecords();
        const updated = salaryRecords.find((entry) => entry.id === record.id) || record;
        setActiveSalaryRecord(updated);
        renderSalaryPreview(updated, updated);
        updateTopStats();
        showToast("Salary record recalculated from attendance.");
    } catch (error) {
        console.error(error);
        showToast(error.message || "Unable to recalculate salary record.", "error");
    }
};

window.deleteSalaryRecord = async (recordId) => {
    if (!window.confirm("Delete this salary record and its payment history?")) return;
    try {
        await deleteDoc(doc(db, "schools", adminUID, "teacher_salary_records", recordId));
        if (activeSalaryRecordId === recordId) {
            setActiveSalaryRecord(null);
            renderSalaryPreview(null);
        }
        await loadSalaryRecords();
        updateTopStats();
        showToast("Salary record deleted.");
    } catch (error) {
        console.error(error);
        showToast(error.message || "Unable to delete salary record.", "error");
    }
};

window.deleteTeacher = async (teacherUid) => {
    const teacher = getTeacherByUid(teacherUid);
    if (!teacher) return showToast("Teacher not found.", "error");
    if (!window.confirm(`Remove ${teacher.name} from active teachers?\n\nTheir old attendance and salary records will stay saved and searchable under Removed Teachers.`)) return;
    try {
        await Promise.all([
            setDoc(doc(db, "users", teacherUid), {
                removedFromPanel: true,
                panelStatus: "removed",
                active: false,
                removedAt: serverTimestamp(),
                removedBy: auth.currentUser?.email || "admin",
                updatedAt: serverTimestamp()
            }, { merge: true }),
            setDoc(doc(db, "schools", adminUID, "teacher_salaries", teacherUid), {
                active: false,
                removedFromPanel: true,
                panelStatus: "removed",
                removedAt: serverTimestamp(),
                removedBy: auth.currentUser?.email || "admin",
                updatedAt: serverTimestamp()
            }, { merge: true }).catch(() => {})
        ]);
        if (activeSalaryRecord?.teacherUid === teacherUid) {
            setActiveSalaryRecord(null);
            renderSalaryPreview(null);
        }
        await refreshEverything();
        window.setTeacherDirectoryView("removed");
        showToast("Teacher moved to Removed Teachers.");
    } catch (error) {
        console.error(error);
        showToast(error.message || "Unable to remove teacher.", "error");
    }
};

addTeacherForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = $("teacherName").value.trim();
    const email = $("teacherEmail").value.trim().toLowerCase();
    const password = $("teacherPassword").value;
    const monthlySalary = roundCurrency($("teacherSalary").value || 0);
    const teacherPhotoFile = $("teacherPhoto")?.files?.[0] || null;
    if (!draftTeacherAssignments.length) {
        addAssignmentFromSelect(draftTeacherAssignments, classSelectEl, sectionSelectEl, "teacherAssignmentsList", "removeTeacherAssignment");
    }
    draftTeacherAssignments = dedupeAssignments(draftTeacherAssignments);
    const primary = primaryAssignment(draftTeacherAssignments);
    if (!name || !email || !password || !primary.class || !primary.section || monthlySalary < 0) {
        return showToast("Fill all teacher account fields correctly.", "error");
    }
    try {
        setButtonLoading(createTeacherBtn, "Creating Teacher...", true);
        const userCred = await createUserWithEmailAndPassword(teacherCreatorAuth, email, password);
        const teacherUid = userCred.user.uid;
        const teacherId = await generateTeacherId();
        const photoUpload = teacherPhotoFile ? await uploadCloudinaryPhoto(teacherPhotoFile, "teachers", teacherUid) : { photoUrl: "", photoPublicId: "" };
        await setDoc(doc(db, "users", teacherUid), {
            name,
            email,
            teacherId,
            role: "teacher",
            class: primary.class,
            section: primary.section,
            assignedClasses: draftTeacherAssignments,
            monthlySalary,
            adminId: adminUID,
            schoolId: adminUID,
            schoolName,
            photoUrl: photoUpload.photoUrl,
            photoPublicId: photoUpload.photoPublicId,
            active: true,
            removedFromPanel: false,
            panelStatus: "active",
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });
        await setDoc(doc(db, "schools", adminUID, "teacher_salaries", teacherUid), {
            teacherUid,
            teacherId,
            teacherName: name,
            teacherEmail: email,
            class: primary.class,
            section: primary.section,
            assignedClasses: draftTeacherAssignments,
            monthlySalary,
            photoUrl: photoUpload.photoUrl,
            photoPublicId: photoUpload.photoPublicId,
            currency: "INR",
            active: true,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });
        addTeacherForm.reset();
        draftTeacherAssignments = [];
        renderAssignmentList("teacherAssignmentsList", draftTeacherAssignments, "removeTeacherAssignment");
        window.updateSections();
        await loadTeachers();
        await loadSalaryRecords();
        renderAttendanceRows();
        updateTopStats();
        showToast("Teacher account created successfully.");
    } catch (error) {
        console.error(error);
        showToast(error.message || "Unable to create teacher account.", "error");
    } finally {
        await signOut(teacherCreatorAuth).catch(() => {});
        setButtonLoading(createTeacherBtn, "Creating Teacher...", false);
    }
});

teacherSearchEl.addEventListener("input", renderTeacherList);
attendanceDateEl.addEventListener("change", () => loadTeacherAttendanceForDate().catch((error) => showToast(error.message || "Unable to load attendance.", "error")));
salaryTeacherSelectEl.addEventListener("change", () => {
    window.loadSalaryPreview().catch((error) => showToast(error.message || "Unable to preview salary.", "error"));
    renderSalaryRecordList();
});
salaryMonthEl.addEventListener("change", () => {
    updateTopStats();
    window.loadSalaryPreview().catch((error) => showToast(error.message || "Unable to preview salary.", "error"));
    renderSalaryRecordList();
});
salaryStatusFilterEl?.addEventListener("change", renderSalaryRecordList);

window.logout = async () => {
    try {
        await signOut(auth);
        window.location.href = "index.html";
    } catch (error) {
        console.error(error);
        showToast("Unable to logout right now.", "error");
    }
};

CLASS_LIST.forEach((className) => {
    classSelectEl.innerHTML += `<option value="${className}">${className}</option>`;
});
window.updateSections();
renderAssignmentList("teacherAssignmentsList", draftTeacherAssignments, "removeTeacherAssignment");
wireEditTeacherModalClose();
attendanceDateEl.value = todayISO();
salaryMonthEl.value = currentMonthValue();
paymentDateEl.value = todayISO();
recordPaymentBtnEl.disabled = true;

onAuthStateChanged(auth, async (user) => {
    if (!user) {
        window.location.href = "index.html";
        return;
    }
    try {
        const isAdmin = await loadAdminContext(user);
        if (!isAdmin) return;
        await refreshEverything();
        updateTopStats();
    } catch (error) {
        console.error(error);
        showToast("Unable to load teacher operations right now.", "error");
    }
});
