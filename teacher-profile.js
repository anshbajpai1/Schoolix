import { initializeApp } from "./firebase-compat.js";
import { getAuth, onAuthStateChanged } from "./firebase-compat.js";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  serverTimestamp,
  setDoc,
  where
} from "./firebase-compat.js";

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

const CLOUDINARY_CLOUD_NAME = "fthnumnk";
const CLOUDINARY_UPLOAD_PRESET = "schoolix_student_photos";
const CLOUDINARY_DOCUMENT_UPLOAD_PRESET = window.SchoolixCloudinaryDocumentPreset
  || localStorage.getItem("schoolixCloudinaryDocumentPreset")
  || "schoolix_documents";
const SUPABASE_ATTACHMENT_URL = "https://ezkmeedcqetztkeppxil.supabase.co/functions/v1/upload-notice-attachment";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJIUzI1NiIsInJlZiI6ImV6a21lZWRjcWV0enRrZXBweGlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxMjk5NjAsImV4cCI6MjA5MzcwNTk2MH0.1davJ_NYkFhHToUtcFBR0kA6dk0-cOkaIbK2SCObkQg";
const DOCUMENT_MAX_SIZE_MB = 10;
const DOCUMENT_ALLOWED_TYPES = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/jpg"
]);

const teacherUid = new URLSearchParams(window.location.search).get("id") || "";
let adminUID = "";
let schoolName = "Schoolix";
let teacher = null;
let profileExtra = {};
let attendanceRecords = [];
let salaryRecords = [];
let leaveRecords = [];
let activityRecords = [];
let currentEditTab = "personal";

const identityDocTypes = [
  ["aadhaar", "Aadhaar Card"],
  ["pan", "PAN Card"],
  ["passport", "Passport"],
  ["drivingLicense", "Driving License"]
];

const profileDocTypes = [
  ["degreeCertificates", "Degree Certificates"],
  ["experienceCertificates", "Experience Certificates"],
  ["resume", "Resume"],
  ["offerLetter", "Offer Letter"],
  ["joiningLetter", "Joining Letter"],
  ["idCard", "ID Card"],
  ["policeVerification", "Police Verification"],
  ["medicalCertificate", "Medical Certificate"]
];

const editSections = {
  personal: {
    label: "Personal",
    fields: [
      ["name", "Full Name", "text", true],
      ["fatherName", "Father Name"],
      ["motherName", "Mother Name"],
      ["gender", "Gender", "select:Male|Female|Other|Prefer not to say"],
      ["dob", "Date of Birth", "date"],
      ["phone", "Phone Number", "tel"],
      ["email", "Email", "email", true],
      ["address", "Address", "textarea"],
      ["city", "City"],
      ["state", "State"],
      ["pinCode", "PIN Code"],
      ["nationality", "Nationality"],
      ["religion", "Religion"],
      ["maritalStatus", "Marital Status", "select:Single|Married|Other"],
      ["bloodGroup", "Blood Group", "select:A+|A-|B+|B-|AB+|AB-|O+|O-"]
    ]
  },
  professional: {
    label: "Professional",
    fields: [
      ["teacherId", "Teacher ID"],
      ["joiningDate", "Joining Date", "date"],
      ["qualification", "Qualification"],
      ["experience", "Experience"],
      ["department", "Department"],
      ["designation", "Designation"],
      ["subjectsText", "Subjects"],
      ["assignedClassesText", "Assigned Classes"],
      ["assignedSectionsText", "Assigned Sections"],
      ["employmentType", "Employment Type", "select:Full Time|Part Time|Contract|Visiting"],
      ["workShift", "Work Shift"],
      ["monthlySalary", "Monthly Salary", "number"]
    ]
  },
  identity: {
    label: "Identity",
    fields: [
      ["aadhaarNumber", "Aadhaar Number"],
      ["panNumber", "PAN Number"],
      ["passportNumber", "Passport Number"],
      ["drivingLicenseNumber", "Driving License Number"]
    ]
  },
  bank: {
    label: "Bank",
    fields: [
      ["accountHolderName", "Account Holder Name"],
      ["bankName", "Bank Name"],
      ["branch", "Branch"],
      ["accountNumber", "Account Number"],
      ["ifscCode", "IFSC Code"],
      ["upiId", "UPI ID"],
      ["salaryAccount", "Salary Account", "select:Yes|No"]
    ]
  },
  emergency: {
    label: "Emergency",
    fields: [
      ["emergencyContactPerson", "Contact Person"],
      ["emergencyRelationship", "Relationship"],
      ["emergencyPhone", "Phone Number", "tel"],
      ["emergencyAlternatePhone", "Alternate Phone", "tel"],
      ["emergencyAddress", "Address", "textarea"]
    ]
  }
};

function $(id) {
  return document.getElementById(id);
}

function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" }[m]));
}

function clean(value) {
  return String(value ?? "").trim();
}

function money(value) {
  return Number(value || 0).toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });
}

function display(value, fallback = "-") {
  const text = clean(value);
  return text || fallback;
}

function fileSizeLabel(bytes = 0) {
  const size = Number(bytes || 0);
  if (!size) return "-";
  if (size < 1024 * 1024) return `${Math.max(1, Math.round(size / 1024))} KB`;
  return `${(size / (1024 * 1024)).toFixed(size < 10 * 1024 * 1024 ? 1 : 0)} MB`;
}

function cloudinaryResourceType(file = {}) {
  if (String(file.type || "").startsWith("image/")) return "image";
  if (file.type === "application/pdf") return "raw";
  return "auto";
}

function documentUploadPreset(file = {}) {
  const type = String(file.type || "").toLowerCase();
  const ext = String(file.name || "").split(".").pop()?.toLowerCase() || "";
  if (type === "application/pdf" || ext === "pdf") return CLOUDINARY_DOCUMENT_UPLOAD_PRESET;
  return CLOUDINARY_DOCUMENT_UPLOAD_PRESET || CLOUDINARY_UPLOAD_PRESET;
}

function validateDocumentFile(file) {
  if (!file) throw new Error("Please choose a document.");
  const type = String(file.type || "").toLowerCase();
  const ext = String(file.name || "").split(".").pop()?.toLowerCase() || "";
  const isPdf = type === "application/pdf" || ext === "pdf";
  const isImage = type.startsWith("image/") || ["jpg", "jpeg", "png", "webp"].includes(ext);
  if (!isPdf && !isImage && !DOCUMENT_ALLOWED_TYPES.has(type)) {
    throw new Error("Only PDF, JPG, PNG or WEBP documents can be uploaded.");
  }
  if (file.size > DOCUMENT_MAX_SIZE_MB * 1024 * 1024) {
    throw new Error(`Document must be under ${DOCUMENT_MAX_SIZE_MB} MB.`);
  }
}

function formatDate(value) {
  if (!value) return "-";
  if (value?.seconds) return formatDate(new Date(value.seconds * 1000).toISOString());
  const parsed = new Date(`${String(value).slice(0, 10)}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return String(value);
  return parsed.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

function todayMonth() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

function todayDate() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

function attendanceDateKey(value) {
  if (!value) return "";
  if (value?.seconds) return attendanceDateKey(new Date(value.seconds * 1000));
  if (value instanceof Date) {
    if (Number.isNaN(value.getTime())) return "";
    return `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(2, "0")}-${String(value.getDate()).padStart(2, "0")}`;
  }
  const text = clean(value);
  const direct = text.match(/^(\d{4}-\d{2}-\d{2})/);
  if (direct) return direct[1];
  const parsed = new Date(text);
  if (Number.isNaN(parsed.getTime())) return text.slice(0, 10);
  return attendanceDateKey(parsed);
}

function attendanceRecordFromSnap(snap) {
  const data = snap.data();
  const idDate = String(snap.id || "").startsWith(`${teacherUid}_`) ? snap.id.slice(teacherUid.length + 1) : "";
  return { id: snap.id, ...data, date: data.date || idDate };
}

function sortDateValue(value) {
  if (value?.seconds) return new Date(value.seconds * 1000).toISOString();
  const dateKey = attendanceDateKey(value);
  return dateKey || clean(value);
}

function currentTime() {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
}

function teacherValue(...keys) {
  for (const key of keys) {
    const value = key.includes(".")
      ? key.split(".").reduce((obj, part) => obj?.[part], { ...teacher, ...profileExtra })
      : profileExtra[key] ?? teacher?.[key];
    if (value !== undefined && value !== null && String(value).trim?.() !== "") return value;
  }
  return "";
}

function assignments() {
  const raw = Array.isArray(teacher?.assignedClasses) ? teacher.assignedClasses : [];
  const normalized = raw.map((item) => ({
    class: clean(item.class || item.className),
    section: clean(item.section).toUpperCase()
  })).filter((item) => item.class || item.section);
  if ((teacher?.class || teacher?.section) && !normalized.length) {
    normalized.push({ class: clean(teacher.class), section: clean(teacher.section).toUpperCase() });
  }
  return normalized;
}

function assignmentText() {
  const list = assignments();
  return list.length ? list.map((item) => `${item.class || "Class"}-${item.section || "-"}`).join(", ") : "-";
}

function subjectText() {
  const subjects = teacherValue("subjects", "subject", "subjectsText");
  return Array.isArray(subjects) ? subjects.filter(Boolean).join(", ") : display(subjects);
}

function statusInfo() {
  const raw = clean(teacherValue("status", "panelStatus")).toLowerCase();
  if (teacher?.removedFromPanel || raw === "removed") return { label: "Removed", cls: "status-removed" };
  if (raw.includes("leave")) return { label: "On Leave", cls: "status-leave" };
  return { label: "Active", cls: "status-active" };
}

function getPhotoUrl() {
  return clean(teacherValue("photoUrl", "imageUrl", "profilePhotoUrl", "avatarUrl"));
}

function initials(value) {
  const words = clean(value || teacher?.name || "Teacher").split(/\s+/).filter(Boolean);
  return (words.slice(0, 2).map((word) => word[0]).join("") || "T").toUpperCase();
}

function setPhoto(button, size = "lg") {
  const url = getPhotoUrl();
  const name = display(teacher?.name, roleLabel());
  button.innerHTML = url ? `<img src="${esc(url)}" alt="${esc(name)} photo" loading="lazy">` : esc(initials(name));
  button.title = url ? `Preview ${name} photo` : "Photo not uploaded";
  button.dataset.photoUrl = url;
}

function showToast(message, type = "success") {
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3400);
}

function setStatus(message, type = "error") {
  $("globalStatus").innerHTML = message ? `<div class="alert alert-${type}">${esc(message)}</div>` : "";
}

function detail(label, value) {
  return `<div class="detail-item"><span>${esc(label)}</span><strong>${esc(display(value))}</strong></div>`;
}

function summary(label, value) {
  return `<div class="summary-row"><span>${esc(label)}</span><strong>${esc(display(value))}</strong></div>`;
}

function roleKey() {
  return clean(teacher?.role || "staff").toLowerCase() || "staff";
}

function isTeacherRole() {
  return roleKey() === "teacher";
}

function roleLabel(value = roleKey()) {
  return {
    teacher: "Teacher",
    librarian: "Librarian",
    accountant: "Accountant",
    staff: "Staff"
  }[clean(value).toLowerCase()] || "Staff";
}

function profileCollectionName() {
  return isTeacherRole() ? "teacher_profiles" : "staff_profiles";
}

function salaryCollectionName() {
  return isTeacherRole() ? "teacher_salary_records" : "staff_salary_records";
}

function attendanceCollectionName() {
  return isTeacherRole() ? "teacher_attendance" : "staff_attendance";
}

function qrCollectionName() {
  return isTeacherRole() ? "teacher_attendance_qr" : "staff_attendance_qr";
}

function staffUidField() {
  return isTeacherRole() ? "teacherUid" : "staffUid";
}

function professionalIdField() {
  return isTeacherRole() ? "teacherId" : "staffId";
}

function roleBackPage() {
  return {
    teacher: "teachers.html",
    librarian: "library-management.html",
    accountant: "accountant-management.html",
    staff: "staff-management.html"
  }[roleKey()] || "staff-management.html";
}

function roleBackLabel() {
  return {
    teacher: "Teachers",
    librarian: "Librarians",
    accountant: "Accountants",
    staff: "Staff"
  }[roleKey()] || "Staff";
}

async function loadAdminContext(user) {
  const snap = await getDoc(doc(db, "users", user.uid));
  if (!snap.exists() || snap.data().role !== "admin") {
    window.location.href = "teacher-dashboard.html";
    return false;
  }
  const data = snap.data();
  adminUID = data.adminId || data.schoolId || user.uid;
  schoolName = data.schoolName || window.SchoolBranding?.getSchoolName?.() || "Schoolix";
  window.SchoolBranding?.persistSchoolName?.(schoolName);
  return true;
}

async function loadTeacher() {
  if (!teacherUid) throw new Error("Profile UID missing from URL.");
  const teacherSnap = await getDoc(doc(db, "users", teacherUid));
  if (!teacherSnap.exists()) throw new Error("Staff profile was not found.");
  const data = teacherSnap.data();
  if (data.adminId !== adminUID && data.schoolId !== adminUID) throw new Error("This staff member does not belong to the signed-in school.");
  teacher = { uid: teacherSnap.id, ...data };
}

async function loadProfileExtra() {
  try {
    const extraSnap = await getDoc(doc(db, "schools", adminUID, profileCollectionName(), teacherUid));
    profileExtra = extraSnap.exists() ? extraSnap.data() : {};
  } catch (error) {
    console.warn("Unable to load staff profile extras", error);
    profileExtra = {};
  }
}

async function loadRelatedData() {
  const uidField = staffUidField();
  const [attendanceSnap, salarySnap, teacherLeaveSnap, staffLeaveSnap, activitySnap] = await Promise.all([
    getDocs(query(collection(db, "schools", adminUID, attendanceCollectionName()), where(uidField, "==", teacherUid))).catch(() => ({ docs: [] })),
    getDocs(query(collection(db, "schools", adminUID, salaryCollectionName()), where(uidField, "==", teacherUid))).catch(() => ({ docs: [] })),
    getDocs(query(collection(db, "schools", adminUID, "teacher_leaves"), where("teacherUid", "==", teacherUid))).catch(() => ({ docs: [] })),
    getDocs(query(collection(db, "schools", adminUID, "staff_leaves"), where("staffUid", "==", teacherUid))).catch(() => ({ docs: [] })),
    getDocs(query(collection(db, "schools", adminUID, isTeacherRole() ? "teacher_activity" : "staff_activity"), where(uidField, "==", teacherUid))).catch(() => ({ docs: [] }))
  ]);
  attendanceRecords = attendanceSnap.docs.map(attendanceRecordFromSnap).sort((a, b) => attendanceDateKey(b.date).localeCompare(attendanceDateKey(a.date)));
  salaryRecords = salarySnap.docs.map((item) => ({ id: item.id, ...item.data() })).sort((a, b) => clean(b.monthKey).localeCompare(clean(a.monthKey)));
  leaveRecords = [...teacherLeaveSnap.docs, ...staffLeaveSnap.docs]
    .map((item) => ({ id: item.id, ...item.data() }))
    .sort((a, b) => sortDateValue(b.fromDate || b.date || b.createdAt).localeCompare(sortDateValue(a.fromDate || a.date || a.createdAt)));
  activityRecords = activitySnap.docs.map((item) => ({ id: item.id, ...item.data() })).sort((a, b) => clean(b.createdAt || b.date).localeCompare(clean(a.createdAt || a.date)));
}

function renderHeader() {
  const status = statusInfo();
  const label = roleLabel();
  document.title = `${label} Profile | Schoolix`;
  document.body.dataset.sxTitle = `${label} Profile`;
  const qrButton = $("generateQrAction");
  if (qrButton) {
    qrButton.hidden = false;
    qrButton.textContent = "Generate QR";
  }
  const backButton = $("profileBackButton");
  if (backButton) backButton.textContent = `Back to ${roleBackLabel()}`;
  $("profileRoleLabel").textContent = `${label} Profile`;
  $("teacherName").textContent = display(teacher.name, label);
  $("teacherIdChip").textContent = `${label} ID ${display(teacherValue(professionalIdField(), "teacherId", "staffId", "employeeId"), "N/A")}`;
  $("teacherEmailChip").textContent = display(teacher.email, "No email");
  $("teacherPhoneChip").textContent = display(teacherValue("phone", "phoneNumber", "mobile"), "No phone");
  $("teacherStatusBadge").textContent = status.label;
  $("teacherStatusBadge").className = `status-badge ${status.cls}`;
  const roleTags = [
    `Role: ${label}`,
    `Department: ${display(teacherValue("department"))}`,
    `Designation: ${display(teacherValue("designation"))}`,
    `Experience: ${display(teacherValue("experience"))}`,
    `Qualification: ${display(teacherValue("qualification"))}`,
    `Joining: ${formatDate(teacherValue("joiningDate"))}`,
    `Salary: ${money(teacherValue("monthlySalary"))}`
  ];
  const teacherTags = [`Classes: ${assignmentText()}`, `Subjects: ${subjectText()}`];
  $("heroTags").innerHTML = [...(isTeacherRole() ? teacherTags : []), ...roleTags].map((item) => `<span>${esc(item)}</span>`).join("");
  setPhoto($("heroPhoto"), "xl");
  setPhoto($("sidebarPhoto"), "lg");
}

function renderSidebar() {
  const label = roleLabel();
  $("sidebarName").textContent = display(teacher.name, label);
  $("sidebarDesignation").textContent = display(teacherValue("designation"), label);
  $("sidebarSummary").innerHTML = [
    [isTeacherRole() ? "Class Teacher Of" : "Assigned Area", isTeacherRole() ? assignmentText() : teacherValue("department")],
    ["Experience", teacherValue("experience")],
    ["Qualification", teacherValue("qualification")],
    ["Blood Group", teacherValue("bloodGroup")],
    ["Gender", teacherValue("gender")],
    ["Date of Birth", formatDate(teacherValue("dob", "dateOfBirth"))],
    ["Joining Date", formatDate(teacherValue("joiningDate"))],
    ["Employee ID", teacherValue("employeeId", professionalIdField(), "teacherId", "staffId")]
  ].map(([label, value]) => summary(label, value)).join("");
}

function renderMetrics() {
  const salaryDue = salaryRecords.reduce((sum, item) => sum + Number(item.remainingAmount || 0), 0);
  const salaryPaid = salaryRecords.reduce((sum, item) => sum + Number(item.paidAmount || 0), 0);
  const presentWeight = attendanceRecords.reduce((sum, item) => sum + (item.status === "Present" ? 1 : item.status === "Half Day" ? 0.5 : 0), 0);
  const attendancePct = attendanceRecords.length ? Math.round((presentWeight / attendanceRecords.length) * 100) : 0;
  $("metricGrid").innerHTML = [
    ["Attendance", `${attendancePct}%`],
    ["Salary Paid", money(salaryPaid)],
    ["Salary Due", money(salaryDue)],
    ["Documents", `${Object.values(profileExtra.documents || {}).filter((doc) => doc?.url).length}/${profileDocTypes.length}`]
  ].map(([label, value]) => `<div class="metric"><span>${esc(label)}</span><strong>${esc(value)}</strong></div>`).join("");
}

function renderDetails() {
  $("personalDetails").innerHTML = [
    ["Full Name", teacher.name],
    ["Father Name", teacherValue("fatherName")],
    ["Mother Name", teacherValue("motherName")],
    ["Gender", teacherValue("gender")],
    ["Date of Birth", formatDate(teacherValue("dob", "dateOfBirth"))],
    ["Phone Number", teacherValue("phone", "phoneNumber", "mobile")],
    ["Email", teacher.email],
    ["Address", teacherValue("address")],
    ["City", teacherValue("city")],
    ["State", teacherValue("state")],
    ["PIN Code", teacherValue("pinCode")],
    ["Nationality", teacherValue("nationality")],
    ["Religion", teacherValue("religion")],
    ["Marital Status", teacherValue("maritalStatus")],
    ["Blood Group", teacherValue("bloodGroup")]
  ].map(([label, value]) => detail(label, value)).join("");

  $("professionalDetails").innerHTML = [
    [`${roleLabel()} ID`, teacherValue(professionalIdField(), "teacherId", "staffId", "employeeId")],
    ["Joining Date", formatDate(teacherValue("joiningDate"))],
    ["Qualification", teacherValue("qualification")],
    ["Experience", teacherValue("experience")],
    ["Department", teacherValue("department")],
    ["Designation", teacherValue("designation")],
    ["Subjects", subjectText()],
    ["Assigned Classes", assignmentText()],
    ["Assigned Sections", assignments().map((item) => item.section).filter(Boolean).join(", ")],
    ["Employment Type", teacherValue("employmentType")],
    ["Work Shift", teacherValue("workShift")]
  ].map(([label, value]) => detail(label, value)).join("");

  $("bankDetails").innerHTML = [
    ["Account Holder Name", teacherValue("accountHolderName")],
    ["Bank Name", teacherValue("bankName")],
    ["Branch", teacherValue("branch")],
    ["Account Number", teacherValue("accountNumber")],
    ["IFSC Code", teacherValue("ifscCode")],
    ["UPI ID", teacherValue("upiId")],
    ["Salary Account", teacherValue("salaryAccount")]
  ].map(([label, value]) => detail(label, value)).join("");

  $("emergencyDetails").innerHTML = [
    ["Contact Person", teacherValue("emergencyContactPerson")],
    ["Relationship", teacherValue("emergencyRelationship")],
    ["Phone Number", teacherValue("emergencyPhone")],
    ["Alternate Phone", teacherValue("emergencyAlternatePhone")],
    ["Address", teacherValue("emergencyAddress")]
  ].map(([label, value]) => detail(label, value)).join("");
}

function documentCard(type, label, group) {
  const bucket = profileExtra[group] || {};
  const docItem = bucket[type] || {};
  const hasFile = Boolean(docItem.url);
  const inputId = `${group}_${type}_input`;
  const meta = hasFile
    ? `Uploaded ${esc(formatDate(docItem.uploadedAt || docItem.updatedAt))}${docItem.fileName ? ` • ${esc(docItem.fileName)}` : ""}`
    : "No document uploaded yet.";
  return `
    <article class="document-card">
      <div>
        <h3>${esc(label)}</h3>
        <div class="doc-meta">${meta}</div>
      </div>
      <input class="doc-upload" type="file" id="${inputId}" accept="application/pdf,image/*" onchange="uploadTeacherDocument('${group}','${type}','${esc(label)}', this.files[0])">
      <div class="doc-actions">
        <button type="button" class="doc-action" onclick="document.getElementById('${inputId}').click()">${hasFile ? "Replace" : "Upload"}</button>
        ${hasFile ? `<button type="button" class="doc-action" onclick="previewDocument('${group}','${type}')">View</button><a class="doc-action" href="${esc(docItem.url)}" target="_blank" rel="noopener">Open</a><button type="button" class="doc-action danger" onclick="deleteTeacherDocument('${group}','${type}')">Delete</button>` : ""}
      </div>
    </article>
  `;
}

function renderDocuments() {
  $("identityDocuments").innerHTML = [
    ...[
      ["Aadhaar Number", teacherValue("aadhaarNumber")],
      ["PAN Number", teacherValue("panNumber")],
      ["Passport", teacherValue("passportNumber")],
      ["Driving License", teacherValue("drivingLicenseNumber")]
    ].map(([label, value]) => detail(label, value)),
    ...identityDocTypes.map(([type, label]) => documentCard(type, label, "identityDocuments"))
  ].join("");
  $("profileDocuments").innerHTML = profileDocTypes.map(([type, label]) => documentCard(type, label, "documents")).join("");
}

function salaryStatusClass(status = "") {
  const cleanStatus = status.toLowerCase();
  if (cleanStatus.includes("paid") && !cleanStatus.includes("partial")) return "status-active";
  if (cleanStatus.includes("partial")) return "status-leave";
  return "status-removed";
}

function renderSalaryRows() {
  $("salaryRows").innerHTML = salaryRecords.length ? salaryRecords.map((record) => {
    const payments = Array.isArray(record.payments) ? record.payments : [];
    const latestPayment = payments[payments.length - 1] || {};
    return `
      <tr onclick="openSalaryDetail('${esc(record.id)}')">
        <td>${esc(record.monthLabel || record.monthKey || "-")}</td>
        <td>${money(record.baseSalary || record.basicSalary || 0)}</td>
        <td>${money(record.allowances || 0)}</td>
        <td>${money(record.deductionAmount || record.deductions || 0)}</td>
        <td>${money(record.netSalary || 0)}</td>
        <td>${money(record.paidAmount || 0)}</td>
        <td>${money(record.remainingAmount || 0)}</td>
        <td><span class="status-badge ${salaryStatusClass(record.status)}">${esc(record.status || "Unpaid")}</span></td>
        <td>${esc(formatDate(latestPayment.paymentDate || record.paymentDate))}</td>
        <td>${latestPayment.ledgerTransactionId ? esc(latestPayment.ledgerTransactionId) : "-"}</td>
      </tr>
    `;
  }).join("") : `<tr><td colspan="10"><div class="empty-state">No salary history has been generated yet.</div></td></tr>`;
}

function monthRecords(monthKey) {
  return attendanceRecords.filter((record) => attendanceDateKey(record.date).startsWith(monthKey));
}

function mergeAttendanceRecords(records = []) {
  const merged = new Map(attendanceRecords.map((record) => [attendanceDateKey(record.date), record]));
  records.forEach((record) => {
    const dateKey = attendanceDateKey(record.date);
    if (dateKey) merged.set(dateKey, record);
  });
  attendanceRecords = Array.from(merged.values()).sort((a, b) => attendanceDateKey(b.date).localeCompare(attendanceDateKey(a.date)));
}

async function loadAttendanceForMonth(monthKey) {
  if (!adminUID || !teacherUid || !monthKey) return;
  const [year, month] = monthKey.split("-").map(Number);
  if (!year || !month) return;
  const totalDays = new Date(year, month, 0).getDate();
  const refs = Array.from({ length: totalDays }, (_, index) => {
    const date = `${monthKey}-${String(index + 1).padStart(2, "0")}`;
    return getDoc(doc(db, "schools", adminUID, attendanceCollectionName(), `${teacherUid}_${date}`));
  });
  const snaps = await Promise.all(refs);
  mergeAttendanceRecords(snaps.filter((snap) => snap.exists()).map(attendanceRecordFromSnap));
}

async function renderAttendanceCalendar() {
  const monthKey = $("attendanceMonth").value || todayMonth();
  const [year, month] = monthKey.split("-").map(Number);
  const firstDate = new Date(year, month - 1, 1);
  const totalDays = new Date(year, month, 0).getDate();
  const offset = firstDate.getDay();
  if (adminUID && teacherUid) {
    $("attendanceCalendar").innerHTML = `<div class="empty-state">Loading attendance...</div>`;
    try {
      await loadAttendanceForMonth(monthKey);
    } catch (error) {
      console.warn("Unable to load monthly attendance", error);
      showToast("Unable to load attendance for selected month.", "error");
    }
  }
  const records = new Map(monthRecords(monthKey).map((record) => [attendanceDateKey(record.date), record]));
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const cells = [];
  dayNames.forEach((day) => cells.push(`<div class="calendar-head">${day}</div>`));
  for (let i = 0; i < offset; i += 1) cells.push(`<div class="calendar-day empty"></div>`);
  for (let day = 1; day <= totalDays; day += 1) {
    const date = `${monthKey}-${String(day).padStart(2, "0")}`;
    const record = records.get(date);
    const weekday = new Date(year, month - 1, day).getDay();
    const status = record?.status || (weekday === 0 ? "Weekend" : "Holiday");
    const cls = status === "Present" ? "day-present" : status === "Half Day" ? "day-half" : status === "Absent" ? "day-absent" : status === "Weekend" ? "day-weekend" : "day-holiday";
    const qrClass = record?.qrTokenId || record?.scannedByUid || record?.lastQrMode ? " day-qr" : "";
    cells.push(`<button type="button" class="calendar-day ${cls}${qrClass}" onclick="openAttendanceDetail('${date}')"><strong>${day}</strong><span class="calendar-status">${esc(status)}</span></button>`);
  }
  $("attendanceCalendar").innerHTML = `<div class="calendar-grid">${cells.join("")}</div>`;

  const monthly = Array.from(records.values());
  const present = monthly.filter((item) => item.status === "Present").length;
  const absent = monthly.filter((item) => item.status === "Absent").length;
  const half = monthly.filter((item) => item.status === "Half Day").length;
  const late = monthly.filter((item) => item.late || item.lateEntry || item.isLate).length;
  const pct = monthly.length ? Math.round(((present + half * 0.5) / monthly.length) * 100) : 0;
  $("attendanceMetrics").innerHTML = [
    ["Present Days", present],
    ["Absent Days", absent],
    ["Half Days", half],
    ["Late Entries", late],
    ["Attendance %", `${pct}%`]
  ].map(([label, value]) => `<div class="metric"><span>${esc(label)}</span><strong>${esc(value)}</strong></div>`).join("");
}

function renderTimeline() {
  const leaveEntries = [
    ...leaveRecords.map((leave) => ({
      kind: "leave",
      title: `${leave.leaveType || leave.type || "Leave"}: ${leave.status || "Pending"}`,
      date: leave.fromDate || leave.date || leave.createdAt,
      html: `
        <strong>${esc(leave.leaveType || leave.type || "Leave")}: ${esc(leave.status || "Pending")}</strong>
        <span>${esc(leave.reason || "No reason added")} | ${formatDate(leave.fromDate || leave.date)} to ${formatDate(leave.toDate || leave.fromDate || leave.date)} | ${esc(leave.days || leave.totalDays || "-")} day(s)</span>
        <span>Approved by ${esc(leave.approvedBy || leave.reviewedBy || "-")}${leave.documentUrl ? ` | <a href="${esc(leave.documentUrl)}" target="_blank" rel="noopener">Supporting document</a>` : ""}</span>
      `
    })),
    ...attendanceRecords
      .filter((record) => clean(record.status).toLowerCase() === "absent")
      .map((record) => ({
        kind: "absent",
        title: "Absent",
        date: record.date || record.updatedAt,
        html: `
          <strong>Absent: ${esc(formatDate(record.date))}</strong>
          <span>${esc(record.notes || "Marked absent in attendance.")}</span>
          <span>Marked by ${esc(record.markedBy || record.updatedBy || "-")}${record.updatedAt ? ` | Updated ${esc(formatDate(record.updatedAt))}` : ""}</span>
        `
      }))
  ].sort((a, b) => sortDateValue(b.date).localeCompare(sortDateValue(a.date)));

  $("leaveTimeline").innerHTML = leaveEntries.length ? leaveEntries.map((entry) => `
    <div class="timeline-item">
      ${entry.html}
    </div>
  `).join("") : `<div class="empty-state">No leave history found for this ${esc(roleLabel().toLowerCase())}.</div>`;

  const generated = [
    { title: `${roleLabel()} Created`, date: teacher.createdAt || teacher.joiningDate, detail: `${teacher.name || roleLabel()} account opened.` },
    ...salaryRecords.slice(0, 8).map((item) => ({ title: "Salary Updated", date: item.updatedAt || item.generatedAt || item.monthKey, detail: `${item.monthLabel || item.monthKey}: ${item.status || "Unpaid"}` })),
    ...attendanceRecords.slice(0, 8).map((item) => ({ title: "Attendance Corrected", date: item.updatedAt || item.date, detail: `${formatDate(item.date)}: ${item.status || "-"}` })),
    ...Object.values(profileExtra.documents || {}).filter((item) => item?.url).map((item) => ({ title: "Documents Uploaded", date: item.uploadedAt, detail: item.name || "Document uploaded" })),
    ...activityRecords.map((item) => ({ title: item.title || item.type || "Profile Activity", date: item.createdAt || item.date, detail: item.detail || item.message || "" }))
  ].filter((item) => item.title);
  $("activityTimeline").innerHTML = generated.length ? generated
    .sort((a, b) => String(b.date?.seconds || b.date || "").localeCompare(String(a.date?.seconds || a.date || "")))
    .slice(0, 18)
    .map((item) => `<div class="timeline-item"><strong>${esc(item.title)}</strong><span>${esc(formatDate(item.date))}</span><span>${esc(item.detail)}</span></div>`).join("")
    : `<div class="empty-state">No activity has been recorded yet.</div>`;
}

function renderAll() {
  renderHeader();
  renderSidebar();
  renderMetrics();
  renderDetails();
  renderDocuments();
  renderSalaryRows();
  $("attendanceMonth").value = $("attendanceMonth").value || todayMonth();
  renderAttendanceCalendar();
  renderTimeline();
}

function fieldValue(key) {
  if (key === "subjectsText") return subjectText() === "-" ? "" : subjectText();
  if (key === "assignedClassesText") return assignmentText() === "-" ? "" : assignmentText();
  if (key === "assignedSectionsText") return assignments().map((item) => item.section).filter(Boolean).join(", ");
  return teacherValue(key);
}

function renderEditForm() {
  $("editTabs").innerHTML = Object.entries(editSections).map(([key, section]) => `<button type="button" class="form-tab ${key === currentEditTab ? "active" : ""}" onclick="switchEditTab('${key}')">${esc(section.label)}</button>`).join("");
  $("editFields").innerHTML = Object.entries(editSections).map(([key, section]) => `
    <section class="edit-section ${key === currentEditTab ? "active" : ""}" data-edit-section="${key}">
      ${section.fields.map(([fieldKey, label, type = "text", required = false]) => {
        const value = fieldValue(fieldKey);
        const fieldLabel = fieldKey === "teacherId" ? `${roleLabel()} ID` : label;
        if (type === "textarea") {
          return `<label class="field full"><span>${esc(fieldLabel)}${required ? " *" : ""}</span><textarea data-field="${esc(fieldKey)}" ${required ? "required" : ""}>${esc(value)}</textarea></label>`;
        }
        if (type.startsWith("select:")) {
          const options = type.slice(7).split("|");
          return `<label class="field"><span>${esc(fieldLabel)}${required ? " *" : ""}</span><select data-field="${esc(fieldKey)}" ${required ? "required" : ""}><option value="">Select</option>${options.map((option) => `<option value="${esc(option)}" ${clean(value) === option ? "selected" : ""}>${esc(option)}</option>`).join("")}</select></label>`;
        }
        return `<label class="field"><span>${esc(fieldLabel)}${required ? " *" : ""}</span><input data-field="${esc(fieldKey)}" type="${esc(type)}" value="${esc(value)}" ${required ? "required" : ""}></label>`;
      }).join("")}
    </section>
  `).join("");
}

function parseList(value) {
  return clean(value).split(",").map((item) => clean(item)).filter(Boolean);
}

function parseAssignments(text) {
  return parseList(text).map((item) => {
    const [cls, section] = item.split("-").map(clean);
    return { class: cls || item, section: (section || "").toUpperCase() };
  });
}

async function saveProfile(event) {
  event.preventDefault();
  const fields = Array.from(document.querySelectorAll("[data-field]"));
  const data = Object.fromEntries(fields.map((field) => [field.dataset.field, clean(field.value)]));
  if (!data.name || !data.email) return showToast("Full name and email are required.", "error");
  const monthlySalary = Number(data.monthlySalary || 0);
  if (Number.isNaN(monthlySalary) || monthlySalary < 0) return showToast("Monthly salary must be valid.", "error");

  const assignedClasses = parseAssignments(data.assignedClassesText || assignmentText());
  const idField = professionalIdField();
  const professionalId = data.teacherId || teacherValue(idField, "teacherId", "staffId", "employeeId") || "";
  const userPayload = {
    name: data.name,
    email: data.email.toLowerCase(),
    [idField]: professionalId,
    employeeId: teacher.employeeId || professionalId,
    monthlySalary,
    qualification: data.qualification,
    experience: data.experience,
    designation: data.designation,
    department: data.department,
    phone: data.phone,
    updatedAt: serverTimestamp()
  };
  if (isTeacherRole()) {
    userPayload.subject = data.subjectsText;
    userPayload.subjects = parseList(data.subjectsText);
    userPayload.assignedClasses = assignedClasses;
    userPayload.class = assignedClasses[0]?.class || teacher.class || "";
    userPayload.section = assignedClasses[0]?.section || teacher.section || "";
  }
  const extraPayload = {
    ...data,
    monthlySalary,
    [idField]: professionalId,
    subjects: isTeacherRole() ? parseList(data.subjectsText) : [],
    assignedClasses: isTeacherRole() ? assignedClasses : [],
    updatedAt: serverTimestamp(),
    updatedBy: auth.currentUser?.email || "admin"
  };
  delete extraPayload.assignedClassesText;
  delete extraPayload.assignedSectionsText;
  delete extraPayload.subjectsText;

  const button = $("saveProfileBtn");
  button.disabled = true;
  button.textContent = "Saving...";
  try {
    const writes = [
      setDoc(doc(db, "users", teacherUid), userPayload, { merge: true }),
      setDoc(doc(db, "schools", adminUID, profileCollectionName(), teacherUid), extraPayload, { merge: true })
    ];
    if (isTeacherRole()) {
      writes.push(setDoc(doc(db, "schools", adminUID, "teacher_salaries", teacherUid), {
        teacherUid,
        teacherId: professionalId,
        teacherName: userPayload.name,
        teacherEmail: userPayload.email,
        monthlySalary,
        class: userPayload.class,
        section: userPayload.section,
        assignedClasses,
        updatedAt: serverTimestamp()
      }, { merge: true }));
    }
    await Promise.all(writes);
    await loadTeacher();
    renderAll();
    closeEditProfile();
    showToast(`${roleLabel()} profile updated successfully.`);
  } catch (error) {
    console.error(error);
    showToast(error.message || `Unable to save ${roleLabel().toLowerCase()} profile.`, "error");
  } finally {
    button.disabled = false;
    button.textContent = "Save Profile";
  }
}

async function uploadToCloudinary(file, group, type) {
  if (!file) return null;
  validateDocumentFile(file);
  const resourceType = cloudinaryResourceType(file);
  const cleanBaseName = clean(file.name).replace(/\.[^.]+$/, "").replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 48);
  const uploadPreset = documentUploadPreset(file);
  const makeForm = () => {
    const form = new FormData();
    form.append("file", file);
    form.append("upload_preset", uploadPreset);
    form.append("folder", `schoolix/${profileCollectionName()}/${adminUID}/${teacherUid}/${group}`);
    form.append("public_id", `${type}_${Date.now()}_${cleanBaseName}`);
    form.append("tags", `schoolix,${profileCollectionName()},${group},${type}`);
    return form;
  };
  async function sendUpload(targetResourceType) {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${encodeURIComponent(CLOUDINARY_CLOUD_NAME)}/${targetResourceType}/upload`, { method: "POST", body: makeForm() });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      const message = data.error?.message || "Cloudinary upload failed.";
      if (/preset not found|not whitelisted|format pdf not allowed|file format pdf not allowed/i.test(message)) {
        throw new Error(`Cloudinary document preset issue: create an unsigned preset named "${CLOUDINARY_DOCUMENT_UPLOAD_PRESET}" and allow PDF/raw uploads. Original error: ${message}`);
      }
      throw new Error(message);
    }
    return data;
  }
  let data;
  try {
    data = await sendUpload(resourceType);
  } catch (error) {
    if (resourceType !== "auto") data = await sendUpload("auto");
    else throw error;
  }
  return {
    url: data.secure_url || data.url || "",
    publicId: data.public_id || "",
    resourceType: data.resource_type || resourceType,
    format: data.format || String(file.name || "").split(".").pop() || "",
    bytes: data.bytes || file.size || 0
  };
}

async function uploadToSupabaseAttachment(file, group, type) {
  validateDocumentFile(file);
  const idToken = await auth.currentUser?.getIdToken();
  if (!idToken) throw new Error("Admin login required for document upload.");
  const form = new FormData();
  form.append("schoolId", adminUID);
  form.append("file", file, file.name || `${type}.pdf`);
  form.append("context", JSON.stringify({
    source: "teacher-profile",
    profileCollection: profileCollectionName(),
    staffUid: teacherUid,
    group,
    type
  }));
  const response = await fetch(SUPABASE_ATTACHMENT_URL, {
    method: "POST",
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      "x-firebase-token": idToken
    },
    body: form
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.attachmentUrl) throw new Error(data.error || "Document upload failed.");
  return {
    url: data.attachmentUrl,
    publicId: data.storagePath || "",
    resourceType: "supabase_storage",
    format: data.attachmentType || String(file.name || "").split(".").pop() || "",
    bytes: file.size || 0
  };
}

async function uploadDocumentFile(file, group, type) {
  const isPdf = String(file.type || "").toLowerCase() === "application/pdf" || String(file.name || "").toLowerCase().endsWith(".pdf");
  try {
    return await uploadToCloudinary(file, group, type);
  } catch (error) {
    console.warn("Cloudinary document upload failed, using Supabase fallback", error);
    if (!isPdf) throw error;
    const fallback = await uploadToSupabaseAttachment(file, group, type);
    return {
      ...fallback,
      fallbackFrom: "cloudinary",
      fallbackReason: error.message || "Cloudinary upload failed"
    };
  }
}

window.uploadTeacherDocument = async (group, type, label, file) => {
  if (!file) return;
  const input = document.getElementById(`${group}_${type}_input`);
  try {
    showToast(`Uploading ${label}...`, "info");
    const upload = await uploadDocumentFile(file, group, type);
    const nextGroup = {
      ...(profileExtra[group] || {}),
      [type]: {
        name: label,
        fileName: file.name,
        fileType: file.type,
        size: file.size,
        url: upload.url,
        publicId: upload.publicId,
        resourceType: upload.resourceType,
        format: upload.format,
        cloudinaryBytes: upload.bytes,
        storageProvider: upload.resourceType === "supabase_storage" ? "supabase" : "cloudinary",
        fallbackReason: upload.fallbackReason || "",
        uploadedAt: new Date().toISOString(),
        uploadedBy: auth.currentUser?.email || "admin"
      }
    };
    const payload = {
      [group]: nextGroup,
      updatedAt: serverTimestamp()
    };
    await setDoc(doc(db, "schools", adminUID, profileCollectionName(), teacherUid), payload, { merge: true });
    await loadProfileExtra();
    renderDocuments();
    renderMetrics();
    showToast(`${label} uploaded.`);
  } catch (error) {
    console.error(error);
    showToast(error.message || "Unable to upload document.", "error");
  } finally {
    if (input) input.value = "";
  }
};

window.deleteTeacherDocument = async (group, type) => {
  if (!confirm(`Remove this document link from the ${roleLabel().toLowerCase()} profile?`)) return;
  const nextGroup = { ...(profileExtra[group] || {}), [type]: null };
  await setDoc(doc(db, "schools", adminUID, profileCollectionName(), teacherUid), {
    [group]: nextGroup,
    updatedAt: serverTimestamp()
  }, { merge: true });
  await loadProfileExtra();
  renderDocuments();
  renderMetrics();
  showToast("Document removed from profile.");
};

window.previewDocument = (group, type) => {
  const item = profileExtra[group]?.[type];
  if (!item?.url) return showToast("Document is not uploaded yet.", "info");
  $("detailKicker").textContent = "Preview";
  $("detailTitle").textContent = item.name || "Document";
  const fileType = String(item.fileType || "").toLowerCase();
  const isImage = fileType.startsWith("image/");
  const isPdf = fileType === "application/pdf" || String(item.fileName || "").toLowerCase().endsWith(".pdf") || item.resourceType === "raw";
  const preview = isImage
    ? `<img class="document-preview-media" src="${esc(item.url)}" alt="${esc(item.name || "Document preview")}">`
    : isPdf
      ? `<iframe class="document-preview-frame" src="${esc(item.url)}" title="${esc(item.name || "PDF preview")}"></iframe>`
      : `<div class="empty-state">Preview is not available for this file type.</div>`;
  $("detailBody").innerHTML = `
    <div class="detail-grid">
      ${detail("File Name", item.fileName)}
      ${detail("Uploaded", formatDate(item.uploadedAt))}
      ${detail("Size", fileSizeLabel(item.size || item.cloudinaryBytes))}
      ${detail("Type", item.fileType || item.format || item.resourceType)}
    </div>
    <div class="document-preview">${preview}</div>
    <p style="margin-top:14px"><a class="btn btn-primary" href="${esc(item.url)}" target="_blank" rel="noopener">Open Document</a></p>`;
  $("detailModal").hidden = false;
};

window.openSalaryDetail = (recordId) => {
  const record = salaryRecords.find((item) => item.id === recordId);
  if (!record) return;
  const payments = Array.isArray(record.payments) ? record.payments : [];
  $("detailKicker").textContent = "Salary";
  $("detailTitle").textContent = `${record.teacherName || teacher.name} - ${record.monthLabel || record.monthKey}`;
  $("detailBody").innerHTML = `<div class="detail-grid">
    ${detail("Basic Salary", money(record.baseSalary || 0))}
    ${detail("Allowances", money(record.allowances || 0))}
    ${detail("Deductions", money(record.deductionAmount || record.deductions || 0))}
    ${detail("Net Salary", money(record.netSalary || 0))}
    ${detail("Paid Amount", money(record.paidAmount || 0))}
    ${detail("Remaining", money(record.remainingAmount || 0))}
    ${detail("Status", record.status || "Unpaid")}
    ${detail("Present Days", record.presentDays || 0)}
    ${detail("Absent Days", record.absentDays || 0)}
  </div><div class="timeline" style="margin-top:14px">${payments.length ? payments.map((payment) => `<div class="timeline-item"><strong>${money(payment.amount || 0)}</strong><span>${formatDate(payment.paymentDate)} | ${esc(payment.ledgerTransactionId || "Receipt pending")}</span><span>${esc(payment.note || "Salary payment")}</span></div>`).join("") : `<div class="empty-state">No payment receipts found.</div>`}</div>`;
  $("detailModal").hidden = false;
};

window.openAttendanceDetail = (date) => {
  const record = attendanceRecords.find((item) => attendanceDateKey(item.date) === date);
  const status = record?.status || "";
  const qrLocked = Boolean(record?.qrTokenId || record?.scannedByUid || record?.lastQrMode);
  const statusOptions = qrLocked && status === "Present" ? ["Present", "Half Day"] : qrLocked ? [status || "Present"] : ["Present", "Half Day", "Absent"];
  const lockNote = qrLocked
    ? `<div class="attendance-lock-note">Marked by QR scan. Admin can only change Present to Half Day; QR check-in details stay locked.</div>`
    : `<div class="attendance-lock-note neutral">No QR attendance is locked for this date. Admin can mark or change attendance manually.</div>`;
  $("detailKicker").textContent = "Attendance";
  $("detailTitle").textContent = formatDate(date);
  $("detailBody").innerHTML = `
    ${record ? `<div class="detail-grid">${detail("Status", record.status)}${detail("Check In", record.checkInTime)}${detail("Check Out", record.checkOutTime)}${detail("Weight", record.presentWeight ?? (record.status === "Present" ? 1 : record.status === "Half Day" ? 0.5 : 0))}${detail("Remarks", record.notes)}${detail("Updated By", record.updatedBy)}</div>` : `<div class="empty-state">No attendance record found for this date.</div>`}
    <form class="attendance-edit-form" onsubmit="saveProfileAttendance(event, '${esc(date)}')" data-qr-locked="${qrLocked ? "true" : "false"}">
      <h3>Admin Attendance</h3>
      ${lockNote}
      <div class="attendance-edit-grid">
        <label><span>Status</span><select id="attendanceEditStatus" ${qrLocked && status !== "Present" ? "disabled" : ""}>${statusOptions.map((item) => `<option value="${esc(item)}" ${item === status ? "selected" : ""}>${esc(item)}</option>`).join("")}</select></label>
        <label><span>Check-In</span><input type="time" id="attendanceEditCheckIn" value="${esc(record?.checkInTime || "")}" ${qrLocked ? "disabled" : ""}></label>
        <label><span>Check-Out</span><input type="time" id="attendanceEditCheckOut" value="${esc(record?.checkOutTime || "")}" ${qrLocked ? "disabled" : ""}></label>
        <label class="full"><span>Remarks</span><input type="text" id="attendanceEditNotes" value="${esc(record?.notes || "")}" placeholder="Optional note" ${qrLocked ? "disabled" : ""}></label>
      </div>
      <div class="modal-actions"><button type="submit" class="btn btn-primary" id="saveAttendanceBtn">Save Attendance</button></div>
    </form>`;
  $("detailModal").hidden = false;
};

window.saveProfileAttendance = async (event, date) => {
  event.preventDefault();
  const button = event.submitter || $("saveAttendanceBtn");
  const originalText = button?.textContent || "Save Attendance";
  if (button) {
    button.disabled = true;
    button.classList.add("sx-action-loading");
    button.textContent = "Saving...";
  }
  const existing = attendanceRecords.find((item) => attendanceDateKey(item.date) === date) || {};
  const qrLocked = Boolean(existing.qrTokenId || existing.scannedByUid || existing.lastQrMode);
  const currentStatus = clean(existing.status || "Present") || "Present";
  const selectedStatus = clean($("attendanceEditStatus")?.value || currentStatus) || "Present";
  const status = qrLocked
    ? (currentStatus === "Present" && selectedStatus === "Half Day" ? "Half Day" : currentStatus)
    : selectedStatus;
  const uidField = staffUidField();
  const idField = professionalIdField();
  const nameField = isTeacherRole() ? "teacherName" : "staffName";
  const emailField = isTeacherRole() ? "teacherEmail" : "staffEmail";
  const payload = {
    [uidField]: teacherUid,
    [idField]: teacherValue(idField, "teacherId", "staffId", "employeeId") || "",
    [nameField]: teacher.name || roleLabel(),
    [emailField]: teacher.email || "",
    date,
    status,
    presentWeight: status === "Present" ? 1 : status === "Half Day" ? 0.5 : 0,
    updatedAt: serverTimestamp(),
    updatedBy: auth.currentUser?.email || "admin",
    updatedByRole: "admin"
  };
  if (isTeacherRole()) {
    payload.class = teacher.class || "";
    payload.section = teacher.section || "";
  } else {
    payload.staffRole = roleKey();
  }
  if (!qrLocked) {
    payload.checkInTime = $("attendanceEditCheckIn")?.value || "";
    payload.checkOutTime = $("attendanceEditCheckOut")?.value || "";
    payload.notes = $("attendanceEditNotes")?.value?.trim() || "Marked manually by admin.";
    payload.markedByRole = "admin";
    payload.markedBy = auth.currentUser?.email || "Admin";
  }
  try {
    await setDoc(doc(db, "schools", adminUID, attendanceCollectionName(), `${teacherUid}_${date}`), payload, { merge: true });
    await loadRelatedData();
    renderAll();
    showToast("Attendance saved successfully.");
    window.openAttendanceDetail(date);
  } catch (error) {
    console.error(error);
    showToast(error.message || "Unable to save attendance.", "error");
  } finally {
    if (button) {
      button.disabled = false;
      button.classList.remove("sx-action-loading");
      button.textContent = originalText;
    }
  }
};

window.closeDetailModal = () => { $("detailModal").hidden = true; };
window.openEditProfile = () => {
  currentEditTab = "personal";
  if ($("editProfileTitle")) $("editProfileTitle").textContent = `Edit ${roleLabel()} Profile`;
  renderEditForm();
  $("editModal").hidden = false;
};
window.closeEditProfile = () => { $("editModal").hidden = true; };
window.switchEditTab = (tab) => { currentEditTab = tab; renderEditForm(); };
window.jumpToSection = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
window.goBackToRolePage = () => { window.location.href = roleBackPage(); };
window.previewTeacherPhoto = () => {
  const url = getPhotoUrl();
  if (!url) return showToast(`${roleLabel()} photo is not uploaded yet.`, "info");
  window.open(url, "_blank", "noopener");
};
window.generateTeacherQr = async () => {
  try {
    const tokenId = `${teacherUid}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const payload = `${isTeacherRole() ? "SCHLX-TEACHER-ATT" : "SCHLX-STAFF-ATT"}:${tokenId}`;
    const date = todayDate();
    const actionTime = currentTime();
    const idField = professionalIdField();
    const tokenPayload = {
      tokenId,
      schoolId: adminUID,
      date,
      qrMode: "checkin",
      modeLabel: "Check-In Present",
      actionTime,
      checkInTime: actionTime,
      checkOutTime: "",
      status: "Present",
      active: true,
      payload,
      expiresAtMillis: Date.now() + 30000,
      createdAt: serverTimestamp(),
      createdBy: auth.currentUser?.email || "admin"
    };
    if (isTeacherRole()) {
      Object.assign(tokenPayload, {
        teacherUid,
        teacherId: teacher.teacherId || "",
        teacherName: teacher.name || "",
        teacherEmail: teacher.email || ""
      });
    } else {
      Object.assign(tokenPayload, {
        staffUid: teacherUid,
        staffId: teacherValue(idField, "staffId", "employeeId") || "",
        staffName: teacher.name || "",
        staffEmail: teacher.email || "",
        staffRole: roleKey()
      });
    }
    await setDoc(doc(db, "schools", adminUID, qrCollectionName(), tokenId), tokenPayload, { merge: true });
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=320x320&margin=16&data=${encodeURIComponent(payload)}`;
    $("detailKicker").textContent = "QR Attendance";
    $("detailTitle").textContent = `${teacher.name || roleLabel()} QR`;
    $("detailBody").innerHTML = `
      <div class="empty-state" style="min-height:auto">
        <img src="${esc(qrUrl)}" alt="${esc(roleLabel())} attendance QR" style="width:min(320px,100%);border:10px solid #fff;border-radius:18px;box-shadow:var(--shadow)">
        <div style="margin-top:14px;font-family:DM Mono,Consolas,monospace;font-size:12px;overflow-wrap:anywhere">${esc(payload)}</div>
        <div style="margin-top:8px;color:var(--muted)">Check-in QR for ${esc(formatDate(date))} at ${esc(actionTime)}. Valid for the ${esc(roleLabel().toLowerCase())} attendance scanner.</div>
      </div>`;
    $("detailModal").hidden = false;
    showToast(`${roleLabel()} attendance QR generated.`, "info");
  } catch (error) {
    console.error(error);
    showToast(error.message || "Unable to generate QR.", "error");
  }
};
window.printTeacherProfile = () => window.print();

async function init(user) {
  try {
    const ok = await loadAdminContext(user);
    if (!ok) return;
    await loadTeacher();
    renderAll();
    if ($("skeletonState")) $("skeletonState").hidden = true;
    $("profileContent").hidden = false;
    await loadProfileExtra();
    renderAll();
    await loadRelatedData();
    renderAll();
  } catch (error) {
    console.warn(error);
    if ($("skeletonState")) $("skeletonState").hidden = true;
    setStatus(error.message || "Unable to load staff profile.");
  }
}

$("editProfileForm").addEventListener("submit", saveProfile);
$("attendanceMonth")?.addEventListener("change", renderAttendanceCalendar);
$("attendanceMonthShow")?.addEventListener("click", renderAttendanceCalendar);
window.renderAttendanceCalendar = renderAttendanceCalendar;
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    $("editModal").hidden = true;
    $("detailModal").hidden = true;
  }
});

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "index.html";
    return;
  }
  init(user);
});
