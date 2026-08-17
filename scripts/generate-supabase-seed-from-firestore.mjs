import fs from "node:fs";

const INPUT = process.env.INPUT || "firestore-export.json";
const OUTPUT = process.env.OUTPUT || "supabase/migrations/202607300003_firestore_data_seed.sql";

function sql(value) {
  if (value == null) return "null";
  return `'${String(value).replace(/'/g, "''")}'`;
}

function jsonSql(value) {
  return `${sql(JSON.stringify(value ?? {}))}::jsonb`;
}

function schoolIdFromPath(path) {
  const parts = path.split("/");
  return parts[0] === "schools" ? parts[1] || null : null;
}

function collectionNameFromPath(path) {
  const parts = path.split("/");
  return parts.length === 2 ? parts[0] : parts.at(-2);
}

function rowBase(doc) {
  const parts = doc.path.split("/");
  const data = doc.data || {};
  return {
    path: doc.path,
    pathDepth: parts.length,
    collectionName: collectionNameFromPath(doc.path),
    documentId: parts.at(-1),
    schoolId: schoolIdFromPath(doc.path) || data.schoolId || data.adminId || data.adminUID || data.adminUid || null,
    data,
    updatedAt: doc.updateTime || new Date().toISOString(),
  };
}

function asNumber(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

const input = JSON.parse(fs.readFileSync(INPUT, "utf8"));
const docs = input.documents || [];
const lines = [
  "-- Generated from Firestore export. Re-runnable upsert seed.",
  "begin;",
];

for (const doc of docs) {
  const row = rowBase(doc);
  lines.push(`insert into public.firestore_documents (path, path_depth, collection_name, document_id, school_id, data, updated_at) values (${sql(row.path)}, ${row.pathDepth}, ${sql(row.collectionName)}, ${sql(row.documentId)}, ${sql(row.schoolId)}, ${jsonSql(row.data)}, ${sql(row.updatedAt)}::timestamptz) on conflict (path) do update set path_depth = excluded.path_depth, collection_name = excluded.collection_name, document_id = excluded.document_id, school_id = excluded.school_id, data = excluded.data, updated_at = excluded.updated_at;`);
}

for (const doc of docs) {
  const row = rowBase(doc);
  const data = row.data;
  const parts = row.path.split("/");

  if (parts.length === 2 && parts[0] === "schools") {
    lines.push(`insert into public.schoolix_schools (id, name, email, phone, address, access, data, updated_at) values (${sql(row.documentId)}, ${sql(data.schoolName || data.name || data.instituteName || null)}, ${sql(data.email || data.adminEmail || null)}, ${sql(data.phone || data.mobile || null)}, ${sql(data.address || null)}, ${data.access === false ? "false" : "true"}, ${jsonSql(data)}, ${sql(row.updatedAt)}::timestamptz) on conflict (id) do update set name = excluded.name, email = excluded.email, phone = excluded.phone, address = excluded.address, access = excluded.access, data = excluded.data, updated_at = excluded.updated_at;`);
  }

  if (parts.length === 2 && parts[0] === "users") {
    lines.push(`insert into public.schoolix_users (id, school_id, admin_id, email, role, name, access, data, updated_at) values (${sql(row.documentId)}, ${sql(data.schoolId || data.adminId || null)}, ${sql(data.adminId || data.schoolId || null)}, ${sql(data.email || null)}, ${sql(data.role || "user")}, ${sql(data.name || data.fullName || data.studentName || null)}, ${data.access === false ? "false" : "true"}, ${jsonSql(data)}, ${sql(row.updatedAt)}::timestamptz) on conflict (id) do update set school_id = excluded.school_id, admin_id = excluded.admin_id, email = excluded.email, role = excluded.role, name = excluded.name, access = excluded.access, data = excluded.data, updated_at = excluded.updated_at;`);
  }

  if (["students", "passedOutStudents"].includes(row.collectionName) && row.schoolId) {
    lines.push(`insert into public.schoolix_students (id, school_id, student_id, auth_uid, name, class_name, section, roll_no, parent_email, status, data, updated_at) values (${sql(row.documentId)}, ${sql(row.schoolId)}, ${sql(data.studentId || row.documentId)}, ${sql(data.authUid || data.uid || null)}, ${sql(data.name || data.studentName || null)}, ${sql(data.class || data.className || null)}, ${sql(data.section || null)}, ${sql(data.rollNo || data.roll || null)}, ${sql(data.parentEmail || data.email || null)}, ${sql(row.collectionName === "passedOutStudents" ? "passed_out" : "active")}, ${jsonSql(data)}, ${sql(row.updatedAt)}::timestamptz) on conflict (school_id, student_id) do update set auth_uid = excluded.auth_uid, name = excluded.name, class_name = excluded.class_name, section = excluded.section, roll_no = excluded.roll_no, parent_email = excluded.parent_email, status = excluded.status, data = excluded.data, updated_at = excluded.updated_at;`);
  }

  if (["teachers", "teacher_profiles", "staff_profiles"].includes(row.collectionName) && row.schoolId) {
    lines.push(`insert into public.schoolix_staff (id, school_id, user_id, role, name, email, phone, status, data, updated_at) values (${sql(row.documentId)}, ${sql(row.schoolId)}, null, ${sql(data.role || (row.collectionName.includes("teacher") ? "teacher" : "staff"))}, ${sql(data.name || data.fullName || null)}, ${sql(data.email || null)}, ${sql(data.phone || data.mobile || null)}, ${sql(data.removed ? "removed" : "active")}, ${jsonSql(data)}, ${sql(row.updatedAt)}::timestamptz) on conflict (id) do update set user_id = excluded.user_id, role = excluded.role, name = excluded.name, email = excluded.email, phone = excluded.phone, status = excluded.status, data = excluded.data, updated_at = excluded.updated_at;`);
  }

  if (row.collectionName === "fees" && row.schoolId) {
    lines.push(`insert into public.schoolix_fees (id, school_id, student_id, session_id, month, amount, paid_amount, status, date_paid, data, updated_at) values (${sql(row.documentId)}, ${sql(row.schoolId)}, ${sql(data.studentId || null)}, ${sql(data.sessionId || null)}, ${sql(data.month || null)}, ${asNumber(data.amount ?? data.total ?? data.originalAmount) ?? "null"}, ${asNumber(data.paidAmount ?? data.totalPaidAmount) ?? "null"}, ${sql(data.status || null)}, ${data.datePaid || data.lastPaymentDate ? `${sql(data.datePaid || data.lastPaymentDate)}::timestamptz` : "null"}, ${jsonSql(data)}, ${sql(row.updatedAt)}::timestamptz) on conflict (id) do update set student_id = excluded.student_id, session_id = excluded.session_id, month = excluded.month, amount = excluded.amount, paid_amount = excluded.paid_amount, status = excluded.status, date_paid = excluded.date_paid, data = excluded.data, updated_at = excluded.updated_at;`);
  }

  if (["attendance", "teacher_attendance", "staff_attendance"].includes(row.collectionName) && row.schoolId) {
    const subjectType = row.collectionName === "attendance" ? "student" : row.collectionName.replace("_attendance", "");
    lines.push(`insert into public.schoolix_attendance (id, school_id, subject_type, subject_id, attendance_date, status, data, updated_at) values (${sql(row.documentId)}, ${sql(row.schoolId)}, ${sql(subjectType)}, ${sql(data.studentId || data.teacherUid || data.staffUid || null)}, ${data.date ? `${sql(data.date)}::date` : "null"}, ${sql(data.status || null)}, ${jsonSql(data)}, ${sql(row.updatedAt)}::timestamptz) on conflict (id) do update set subject_type = excluded.subject_type, subject_id = excluded.subject_id, attendance_date = excluded.attendance_date, status = excluded.status, data = excluded.data, updated_at = excluded.updated_at;`);
  }

  if (row.collectionName === "accounts" && row.schoolId) {
    lines.push(`insert into public.schoolix_accounts (id, school_id, entry_type, amount, reason, transaction_date, category, payment_mode, created_by, data, updated_at) values (${sql(row.documentId)}, ${sql(row.schoolId)}, ${sql(data.type || "debit")}, ${asNumber(data.amount) ?? 0}, ${sql(data.reason || "Migrated entry")}, ${data.transactionDate ? `${sql(data.transactionDate)}::date` : "null"}, ${sql(data.category || null)}, ${sql(data.paymentMode || null)}, ${sql(data.createdBy || null)}, ${jsonSql(data)}, ${sql(row.updatedAt)}::timestamptz) on conflict (id) do update set entry_type = excluded.entry_type, amount = excluded.amount, reason = excluded.reason, transaction_date = excluded.transaction_date, category = excluded.category, payment_mode = excluded.payment_mode, created_by = excluded.created_by, data = excluded.data, updated_at = excluded.updated_at;`);
  }

  if (row.collectionName === "reportCards" && row.schoolId) {
    lines.push(`insert into public.schoolix_report_cards (id, school_id, student_id, session_id, term_id, percentage, grade, locked, data, updated_at) values (${sql(row.documentId)}, ${sql(row.schoolId)}, ${sql(data.studentId || data.student?.studentId || null)}, ${sql(data.sessionId || null)}, ${sql(data.termId || data.term || null)}, ${asNumber(data.percentage) ?? "null"}, ${sql(data.grade || null)}, ${data.locked === true ? "true" : "false"}, ${jsonSql(data)}, ${sql(row.updatedAt)}::timestamptz) on conflict (id) do update set student_id = excluded.student_id, session_id = excluded.session_id, term_id = excluded.term_id, percentage = excluded.percentage, grade = excluded.grade, locked = excluded.locked, data = excluded.data, updated_at = excluded.updated_at;`);
  }

  if (row.collectionName === "notices" && row.schoolId) {
    lines.push(`insert into public.schoolix_notices (id, school_id, title, message, created_by, deleted, data, updated_at) values (${sql(row.documentId)}, ${sql(row.schoolId)}, ${sql(data.title || null)}, ${sql(data.message || data.body || null)}, ${sql(data.createdBy || null)}, ${data.deleted === true ? "true" : "false"}, ${jsonSql(data)}, ${sql(row.updatedAt)}::timestamptz) on conflict (id) do update set title = excluded.title, message = excluded.message, created_by = excluded.created_by, deleted = excluded.deleted, data = excluded.data, updated_at = excluded.updated_at;`);
  }
}

lines.push("commit;");
fs.writeFileSync(OUTPUT, `${lines.join("\n")}\n`);
console.log(`Wrote ${OUTPUT} for ${docs.length} Firestore documents.`);
