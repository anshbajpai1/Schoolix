import {
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc
} from "./firebase-compat.js?v=staff-loaders-20260806";

const moneyValue = (value) => {
  const amount = Number(value || 0);
  return Number.isFinite(amount) ? Math.round(amount * 100) / 100 : 0;
};

const cleanId = (value) => String(value || "")
  .replace(/[^a-zA-Z0-9_-]/g, "_")
  .replace(/_+/g, "_")
  .slice(0, 180);

export function newLedgerTransactionId(prefix = "TXN") {
  const uuid = globalThis.crypto?.randomUUID?.() || `${Date.now()}_${Math.random().toString(36).slice(2)}`;
  return `${prefix}-${uuid}`;
}

function dateValue(value) {
  const raw = value?.toDate?.() || value || new Date();
  const date = raw instanceof Date ? raw : new Date(raw);
  return Number.isNaN(date.getTime()) ? new Date().toISOString().slice(0, 10) : date.toISOString().slice(0, 10);
}

function paymentSourceId(payment, fallback) {
  return String(
    payment?.ledgerTransactionId || payment?.transactionId || payment?.txnId ||
    payment?.paymentId || payment?.razorpayPaymentId || payment?.razorpay_payment_id || fallback
  );
}

function generatedFeeTxnId(feeId, fee, index) {
  const base = String(fee?.id || feeId || `${fee?.studentId || "student"}-${fee?.month || fee?.feeMonth || "fee"}`)
    .replace(/[^a-zA-Z0-9]/g, "")
    .slice(-8)
    .toUpperCase() || "FEE";
  return `TXN-${base}-${String(index + 1).padStart(2, "0")}`;
}

function feePaymentReferenceId(feeId, fee, payment, index) {
  return String(
    payment?.transactionId || payment?.txnId || payment?.paymentId ||
    payment?.razorpayPaymentId || payment?.razorpay_payment_id ||
    payment?.razorpay_order_id || generatedFeeTxnId(feeId, fee, index)
  );
}

async function upsertAutomaticEntry(db, schoolId, actor, entry) {
  if (!schoolId || !actor?.uid || moneyValue(entry.amount) <= 0 || !entry.sourceId) return false;
  const entryId = cleanId(`${entry.sourceType}_${entry.sourceId}`);
  const entryRef = doc(db, "schools", schoolId, "accounts", entryId);
  const existing = await getDoc(entryRef);
  const existingData = existing.exists() ? existing.data() : {};
  await setDoc(entryRef, {
    ...entry,
    schoolId,
    amount: moneyValue(entry.amount),
    automatic: true,
    createdBy: existingData.createdBy || actor.uid,
    createdByName: existingData.createdByName || actor.name || actor.email || "Schoolix automation",
    createdByRole: existingData.createdByRole || actor.role || "system",
    createdAt: existingData.createdAt || serverTimestamp(),
    updatedAt: serverTimestamp(),
    updatedBy: actor.uid,
    updatedByName: actor.name || actor.email || "Schoolix automation"
  }, { merge: true });
  return true;
}

export async function syncFeeCredit({ db, schoolId, actor, feeId, fee = {}, payment = {}, paymentIndex = 0 }) {
  const received = moneyValue(payment.receivedAmount ?? payment.fullAmount ?? payment.amount);
  if (received <= 0 || String(payment.status || "").toLowerCase().includes("adjusted from extra")) return false;
  const sourceId = paymentSourceId(payment, `${feeId}_payment_${paymentIndex}`);
  const referenceId = feePaymentReferenceId(feeId, fee, payment, paymentIndex);
  const studentName = String(fee.studentName || fee.name || "Student");
  const studentId = String(fee.studentId || fee.admissionNo || fee.studentDocId || "-");
  const feeMonth = String(fee.month || fee.feeMonth || "Fee payment");
  const classLabel = [fee.class, fee.section].filter(Boolean).join("-");
  return upsertAutomaticEntry(db, schoolId, actor, {
    sourceType: "student_fee",
    sourceId,
    sourceDocumentId: feeId,
    type: "credit",
    amount: received,
    reason: `Fee received from ${studentName} (${studentId}) - ${feeMonth}`,
    transactionDate: dateValue(payment.date || payment.paymentDate || payment.paidAt || fee.lastPaymentDate || fee.date),
    category: "Fees",
    paymentMode: String(payment.paymentMode || payment.mode || payment.method || "Other"),
    reference: referenceId,
    notes: [classLabel ? `Class ${classLabel}` : "", payment.note || payment.remarks || ""].filter(Boolean).join(" | "),
    studentId,
    studentName,
    studentClass: String(fee.class || ""),
    studentSection: String(fee.section || ""),
    sessionId: String(fee.sessionId || ""),
    session: String(fee.session || fee.currentYear || fee.academicSession || ""),
    feeMonth,
    appliedAmount: moneyValue(payment.appliedAmount ?? payment.amount),
    extraAmount: moneyValue(payment.extraAmount)
  });
}

export async function syncSalaryDebit({ db, schoolId, actor, recordId, record = {}, payment = {}, paymentIndex = 0 }) {
  const amount = moneyValue(payment.amount);
  if (amount <= 0) return false;
  const sourceId = paymentSourceId(payment, `${recordId}_payment_${paymentIndex}`);
  const staffRole = String(record.staffRole || record.role || (record.sourceType === "staff_salary" ? "staff" : "teacher"));
  const teacherName = String(record.teacherName || record.staffName || record.name || "Staff");
  const teacherId = String(record.teacherId || record.staffId || record.teacherUid || record.staffUid || "-");
  const salaryMonth = String(record.monthLabel || record.monthKey || "Salary");
  return upsertAutomaticEntry(db, schoolId, actor, {
    sourceType: String(record.sourceType || (staffRole === "teacher" ? "teacher_salary" : "staff_salary")),
    sourceId,
    sourceDocumentId: recordId,
    type: "debit",
    amount,
    reason: `Salary paid to ${teacherName} (${teacherId}) - ${salaryMonth}`,
    transactionDate: dateValue(payment.paymentDate || payment.date || payment.recordedAt),
    category: "Salary",
    paymentMode: String(payment.paymentMode || payment.mode || "Other"),
    reference: sourceId,
    notes: String(payment.note || `${staffRole} salary payment`),
    teacherId,
    teacherUid: String(record.teacherUid || ""),
    teacherName,
    staffId: String(record.staffId || teacherId || ""),
    staffUid: String(record.staffUid || record.teacherUid || ""),
    staffName: String(record.staffName || teacherName || ""),
    staffRole,
    sessionId: String(record.sessionId || ""),
    session: String(record.session || record.currentYear || record.academicSession || ""),
    salaryMonth
  });
}

export const syncStaffSalaryDebit = syncSalaryDebit;

export async function backfillAutomaticAccounts({ db, schoolId, actor }) {
  const [feeSnapshot, salarySnapshot, staffSalarySnapshot] = await Promise.all([
    getDocs(collection(db, "schools", schoolId, "fees")),
    getDocs(collection(db, "schools", schoolId, "teacher_salary_records")),
    getDocs(collection(db, "schools", schoolId, "staff_salary_records")).catch(() => ({ docs: [] }))
  ]);
  const tasks = [];
  feeSnapshot.docs.forEach((item) => {
    const fee = item.data();
    const payments = Array.isArray(fee.payments) ? fee.payments : [];
    if (payments.length) {
      payments.forEach((payment, index) => tasks.push(syncFeeCredit({ db, schoolId, actor, feeId: item.id, fee, payment, paymentIndex: index })));
      return;
    }
    const paid = moneyValue(fee.totalCollectedAmount ?? fee.totalPaidAmount ?? fee.paidAmount);
    if (paid > 0) {
      tasks.push(syncFeeCredit({
        db,
        schoolId,
        actor,
        feeId: item.id,
        fee,
        payment: {
          receivedAmount: paid,
          appliedAmount: moneyValue(fee.totalPaidAmount ?? fee.paidAmount),
          extraAmount: moneyValue(fee.totalExtraPaidAmount),
          date: fee.datePaid || fee.lastPaymentDate || fee.updatedAt || fee.date,
          note: "Imported from existing paid fee record",
          ledgerTransactionId: `legacy-${item.id}`
        },
        paymentIndex: 0
      }));
    }
  });
  salarySnapshot.docs.forEach((item) => {
    const record = item.data();
    const payments = Array.isArray(record.payments) ? record.payments : [];
    payments.forEach((payment, index) => tasks.push(syncSalaryDebit({ db, schoolId, actor, recordId: item.id, record, payment, paymentIndex: index })));
  });
  staffSalarySnapshot.docs.forEach((item) => {
    const record = item.data();
    const payments = Array.isArray(record.payments) ? record.payments : [];
    const role = String(record.staffRole || record.role || "").toLowerCase();
    const sourceType = role === "teacher" || record.teacherUid ? "teacher_salary" : "staff_salary";
    payments.forEach((payment, index) => tasks.push(syncSalaryDebit({ db, schoolId, actor, recordId: item.id, record: { ...record, sourceType }, payment, paymentIndex: index })));
  });
  await Promise.all(tasks);
  return tasks.length;
}
