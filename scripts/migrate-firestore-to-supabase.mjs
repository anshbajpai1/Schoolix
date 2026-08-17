import fs from "node:fs";
import process from "node:process";
import { cert, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { createClient } from "@supabase/supabase-js";

const {
  FIREBASE_SERVICE_ACCOUNT,
  FIREBASE_SERVICE_ACCOUNT_PATH,
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY,
  DRY_RUN = "false",
} = process.env;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error("Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY before running this script.");
}

function readServiceAccount() {
  if (FIREBASE_SERVICE_ACCOUNT) return JSON.parse(FIREBASE_SERVICE_ACCOUNT);
  if (FIREBASE_SERVICE_ACCOUNT_PATH) return JSON.parse(fs.readFileSync(FIREBASE_SERVICE_ACCOUNT_PATH, "utf8"));
  throw new Error("Set FIREBASE_SERVICE_ACCOUNT or FIREBASE_SERVICE_ACCOUNT_PATH.");
}

initializeApp({ credential: cert(readServiceAccount()) });

const firestore = getFirestore();
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

function asPlain(value) {
  if (value == null) return value;
  if (typeof value.toDate === "function") return value.toDate().toISOString();
  if (Array.isArray(value)) return value.map(asPlain);
  if (typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, asPlain(item)]));
  return value;
}

function schoolIdFromPath(path) {
  const parts = path.split("/");
  return parts[0] === "schools" ? parts[1] || null : null;
}

function collectionNameFromPath(path) {
  const parts = path.split("/");
  return parts.length <= 1 ? parts[0] : parts.at(-2);
}

async function collectCollection(collectionRef, out) {
  const snapshot = await collectionRef.get();
  for (const doc of snapshot.docs) {
    const path = doc.ref.path;
    out.push({
      path,
      path_depth: path.split("/").length,
      collection_name: collectionNameFromPath(path),
      document_id: doc.id,
      data: asPlain(doc.data()),
      updated_at: new Date().toISOString(),
    });
    out.at(-1).school_id = schoolIdFromPath(path)
      || out.at(-1).data.schoolId
      || out.at(-1).data.adminId
      || out.at(-1).data.adminUID
      || out.at(-1).data.adminUid
      || null;
    const subcollections = await doc.ref.listCollections();
    for (const subcollection of subcollections) {
      await collectCollection(subcollection, out);
    }
  }
}

function normalizeCoreRows(rows) {
  const schools = [];
  const users = [];
  const students = [];
  const staff = [];
  const fees = [];
  const attendance = [];
  const accounts = [];
  const reportCards = [];
  const notices = [];

  for (const row of rows) {
    const data = row.data || {};
    const parts = row.path.split("/");
    if (parts.length === 2 && parts[0] === "schools") {
      schools.push({
        id: row.document_id,
        name: data.schoolName || data.name || data.instituteName || null,
        email: data.email || null,
        phone: data.phone || data.mobile || null,
        address: data.address || null,
        access: data.access !== false,
        data,
        updated_at: row.updated_at,
      });
    }
    if (parts.length === 2 && parts[0] === "users") {
      users.push({
        id: row.document_id,
        school_id: data.schoolId || data.adminId || null,
        admin_id: data.adminId || data.schoolId || null,
        email: data.email || null,
        role: data.role || "user",
        name: data.name || data.fullName || null,
        access: data.access !== false,
        data,
        updated_at: row.updated_at,
      });
    }
    if (row.collection_name === "students" || row.collection_name === "passedOutStudents") {
      students.push({
        id: row.document_id,
        school_id: row.school_id,
        student_id: data.studentId || row.document_id,
        auth_uid: data.authUid || data.uid || null,
        name: data.name || data.studentName || null,
        class_name: data.class || data.className || null,
        section: data.section || null,
        roll_no: data.rollNo || data.roll || null,
        parent_email: data.parentEmail || data.email || null,
        status: row.collection_name === "passedOutStudents" ? "passed_out" : "active",
        data,
        updated_at: row.updated_at,
      });
    }
    if (["teachers", "teacher_profiles", "staff_profiles"].includes(row.collection_name)) {
      staff.push({
        id: row.document_id,
        school_id: row.school_id,
        user_id: data.uid || row.document_id,
        role: data.role || (row.collection_name.includes("teacher") ? "teacher" : "staff"),
        name: data.name || data.fullName || null,
        email: data.email || null,
        phone: data.phone || data.mobile || null,
        status: data.removed ? "removed" : "active",
        data,
        updated_at: row.updated_at,
      });
    }
    if (row.collection_name === "fees") {
      fees.push({
        id: row.document_id,
        school_id: row.school_id,
        student_id: data.studentId || null,
        session_id: data.sessionId || null,
        month: data.month || null,
        amount: Number(data.amount ?? data.total ?? 0) || null,
        paid_amount: Number(data.paidAmount ?? data.amountPaid ?? 0) || null,
        status: data.status || null,
        date_paid: data.datePaid || data.lastPaymentDate || null,
        data,
        updated_at: row.updated_at,
      });
    }
    if (["attendance", "teacher_attendance", "staff_attendance"].includes(row.collection_name)) {
      attendance.push({
        id: row.document_id,
        school_id: row.school_id,
        subject_type: row.collection_name === "attendance" ? "student" : row.collection_name.replace("_attendance", ""),
        subject_id: data.studentId || data.teacherUid || data.staffUid || null,
        attendance_date: data.date || null,
        status: data.status || null,
        data,
        updated_at: row.updated_at,
      });
    }
    if (row.collection_name === "accounts") {
      accounts.push({
        id: row.document_id,
        school_id: row.school_id,
        entry_type: data.type || "debit",
        amount: Number(data.amount || 0),
        reason: data.reason || "Migrated entry",
        transaction_date: data.transactionDate || null,
        category: data.category || null,
        payment_mode: data.paymentMode || null,
        created_by: data.createdBy || null,
        data,
        updated_at: row.updated_at,
      });
    }
    if (row.collection_name === "reportCards") {
      reportCards.push({
        id: row.document_id,
        school_id: row.school_id,
        student_id: data.studentId || data.student?.studentId || null,
        session_id: data.sessionId || null,
        term_id: data.termId || data.term || null,
        percentage: Number(data.percentage || 0) || null,
        grade: data.grade || null,
        locked: data.locked === true,
        data,
        updated_at: row.updated_at,
      });
    }
    if (row.collection_name === "notices") {
      notices.push({
        id: row.document_id,
        school_id: row.school_id,
        title: data.title || null,
        message: data.message || data.body || null,
        created_by: data.createdBy || null,
        deleted: data.deleted === true,
        data,
        updated_at: row.updated_at,
      });
    }
  }

  return { schools, users, students, staff, fees, attendance, accounts, reportCards, notices };
}

async function upsert(table, rows, onConflict = "id") {
  if (!rows.length) return;
  for (let i = 0; i < rows.length; i += 500) {
    const chunk = rows.slice(i, i + 500);
    if (DRY_RUN === "true") {
      console.log(`[dry-run] ${table}: ${chunk.length}`);
      continue;
    }
    const { error } = await supabase.from(table).upsert(chunk, { onConflict });
    if (error) throw new Error(`${table}: ${error.message}`);
  }
}

const rows = [];
for (const collectionRef of await firestore.listCollections()) {
  await collectCollection(collectionRef, rows);
}

console.log(`Collected ${rows.length} Firestore documents.`);
await upsert("firestore_documents", rows, "path");

const normalized = normalizeCoreRows(rows);
await upsert("schoolix_schools", normalized.schools);
await upsert("schoolix_users", normalized.users);
await upsert("schoolix_students", normalized.students);
await upsert("schoolix_staff", normalized.staff);
await upsert("schoolix_fees", normalized.fees);
await upsert("schoolix_attendance", normalized.attendance);
await upsert("schoolix_accounts", normalized.accounts);
await upsert("schoolix_report_cards", normalized.reportCards);
await upsert("schoolix_notices", normalized.notices);

console.log("Firestore to Supabase migration complete.");
