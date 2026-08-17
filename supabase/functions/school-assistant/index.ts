const PROJECT_ID = Deno.env.get("FIREBASE_PROJECT_ID") || "schoolix-48107";
const FIREBASE_WEB_API_KEY = Deno.env.get("FIREBASE_WEB_API_KEY") || "AIzaSyAomGwef93HFT9Xyx7SVW95FPw_IcIAICE";
const OPENAI_MODEL = Deno.env.get("OPENAI_MODEL") || "gpt-4o-mini";
const GEMINI_MODEL = Deno.env.get("GEMINI_MODEL") || "gemini-3.5-flash-lite";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-firebase-token",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function cleanText(value: unknown) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function normalizeKey(value: unknown) {
  return cleanText(value).toLowerCase();
}

function base64UrlEncode(input: string | ArrayBuffer) {
  const bytes = typeof input === "string" ? new TextEncoder().encode(input) : new Uint8Array(input);
  let binary = "";
  bytes.forEach((byte) => binary += String.fromCharCode(byte));
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

async function importPrivateKey(pem: string) {
  const body = pem.replace(/\\n/g, "\n")
    .replace(/-----BEGIN PRIVATE KEY-----/g, "")
    .replace(/-----END PRIVATE KEY-----/g, "")
    .replace(/\s+/g, "");
  const binary = atob(body);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
  return crypto.subtle.importKey(
    "pkcs8",
    bytes,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"],
  );
}

async function getGoogleAccessToken() {
  const encodedAccount = Deno.env.get("FIREBASE_SERVICE_ACCOUNT_JSON_BASE64");
  const serviceAccount = encodedAccount
    ? JSON.parse(new TextDecoder().decode(Uint8Array.from(atob(encodedAccount), (char) => char.charCodeAt(0))))
    : {};
  const clientEmail = Deno.env.get("FIREBASE_CLIENT_EMAIL") || serviceAccount.client_email;
  const privateKey = Deno.env.get("FIREBASE_PRIVATE_KEY") || serviceAccount.private_key;
  if (!clientEmail || !privateKey) throw new Error("Firebase service account secrets are not configured");

  const now = Math.floor(Date.now() / 1000);
  const claim = {
    iss: clientEmail,
    scope: "https://www.googleapis.com/auth/datastore",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  };
  const unsignedJwt = `${base64UrlEncode(JSON.stringify({ alg: "RS256", typ: "JWT" }))}.${base64UrlEncode(JSON.stringify(claim))}`;
  const key = await importPrivateKey(privateKey);
  const signature = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", key, new TextEncoder().encode(unsignedJwt));
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: `${unsignedJwt}.${base64UrlEncode(signature)}`,
    }),
  });
  const data = await response.json();
  if (!response.ok || !data.access_token) throw new Error("Unable to authorize Firestore reader");
  return String(data.access_token);
}

async function verifyFirebaseUser(idToken: string) {
  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${encodeURIComponent(FIREBASE_WEB_API_KEY)}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
    },
  );
  const data = await response.json();
  const user = data.users?.[0];
  if (!response.ok || !user?.localId) throw new Error("Your admin session is invalid or expired");
  return { uid: String(user.localId), email: String(user.email || "") };
}

function readFirestoreValue(value: any): any {
  if (!value || typeof value !== "object") return null;
  if ("stringValue" in value) return value.stringValue;
  if ("booleanValue" in value) return Boolean(value.booleanValue);
  if ("integerValue" in value) return Number(value.integerValue);
  if ("doubleValue" in value) return Number(value.doubleValue);
  if ("timestampValue" in value) return value.timestampValue;
  if ("arrayValue" in value) return (value.arrayValue.values || []).map(readFirestoreValue);
  if ("mapValue" in value) return readFirestoreFields(value.mapValue.fields || {});
  return null;
}

function readFirestoreFields(fields: Record<string, any>) {
  return Object.fromEntries(Object.entries(fields || {}).map(([key, value]) => [key, readFirestoreValue(value)]));
}

async function getDocument(accessToken: string, path: string) {
  const response = await fetch(
    `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/${path}`,
    { headers: { Authorization: `Bearer ${accessToken}` } },
  );
  const data = await response.json();
  if (!response.ok) return null;
  return readFirestoreFields(data.fields || {});
}

async function runQuery(accessToken: string, parentPath: string, structuredQuery: Record<string, unknown>) {
  const runQueryPath = parentPath ? `documents/${parentPath}:runQuery` : "documents:runQuery";
  const response = await fetch(
    `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/${runQueryPath}`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
      body: JSON.stringify({ structuredQuery }),
    },
  );
  const data = await response.json();
  if (!response.ok) throw new Error(data.error?.message || "Unable to read school data");
  return (Array.isArray(data) ? data : [])
    .filter((item: any) => item.document?.fields)
    .map((item: any) => ({
      id: String(item.document.name || "").split("/").pop() || "",
      ...readFirestoreFields(item.document.fields || {}),
    }));
}

function fieldEquals(fieldPath: string, value: string) {
  return { fieldFilter: { field: { fieldPath }, op: "EQUAL", value: { stringValue: value } } };
}

function andFilters(filters: Record<string, unknown>[]) {
  return filters.length === 1 ? filters[0] : { compositeFilter: { op: "AND", filters } };
}

function moneyValue(value: unknown) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function feeTotal(fee: Record<string, unknown>) {
  return moneyValue(fee.originalAmount ?? fee.amount ?? fee.totalAmount);
}

function feePaid(fee: Record<string, unknown>) {
  const totalPaid = Number(fee.totalPaidAmount ?? fee.paidAmount);
  if (Number.isFinite(totalPaid)) return Math.max(0, totalPaid);
  const payments = Array.isArray(fee.payments) ? fee.payments : [];
  return payments.reduce((sum, payment: Record<string, unknown>) => {
    return sum + moneyValue(payment.appliedAmount ?? payment.receivedAmount ?? payment.amount);
  }, 0);
}

function feeDue(fee: Record<string, unknown>) {
  const remaining = Number(fee.remainingAmount);
  if (Number.isFinite(remaining)) return Math.max(0, remaining);
  return Math.max(0, feeTotal(fee) - feePaid(fee));
}

function dateOnly(value: unknown) {
  const raw = cleanText(value);
  if (!raw) return "";
  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw;
  const parsed = new Date(raw);
  if (Number.isNaN(parsed.getTime())) return "";
  return parsed.toISOString().slice(0, 10);
}

function indiaDateParts(baseDate = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(baseDate);
  const map = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return { year: Number(map.year), month: Number(map.month), day: Number(map.day) };
}

function makeDate(year: number, month: number, day: number) {
  return new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
}

function isoFromParts(year: number, month: number, day: number) {
  return makeDate(year, month, day).toISOString().slice(0, 10);
}

function addDaysISO(days: number) {
  const now = indiaDateParts();
  const date = makeDate(now.year, now.month, now.day);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

function monthRange(offset = 0) {
  const now = indiaDateParts();
  const first = makeDate(now.year, now.month + offset, 1);
  const last = makeDate(now.year, now.month + offset + 1, 0);
  return { startDate: first.toISOString().slice(0, 10), endDate: last.toISOString().slice(0, 10) };
}

function parseRequestedDate(message: string) {
  const text = normalizeKey(message);
  const explicit = text.match(/\b(20\d{2}-\d{2}-\d{2})\b/);
  if (explicit) return explicit[1];
  const slashDate = text.match(/\b(\d{1,2})[/-](\d{1,2})[/-](20\d{2})\b/);
  if (slashDate) return isoFromParts(Number(slashDate[3]), Number(slashDate[2]), Number(slashDate[1]));
  if (/\b(kal|yesterday)\b/.test(text)) return addDaysISO(-1);
  if (/\b(aaj|today)\b/.test(text)) return addDaysISO(0);
  return addDaysISO(0);
}

function parseRequestedRange(message: string) {
  const text = normalizeKey(message);
  const explicit = [...text.matchAll(/\b(20\d{2}-\d{2}-\d{2})\b/g)].map((match) => match[1]);
  if (explicit.length >= 2) return { startDate: explicit[0], endDate: explicit[1] };
  if (/\b(last|pichhle|pichle|pichla|previous)\s+month\b|\blast month\b/.test(text)) return monthRange(-1);
  if (/\b(this|is)\s+month\b|\bis month\b|\bcurrent month\b/.test(text)) return monthRange(0);
  return monthRange(0);
}

function parseClassName(message: string) {
  const text = normalizeKey(message);
  const classMatch = text.match(/\bclass\s*([0-9]{1,2}|pg|lkg|ukg)\b/);
  if (classMatch) return classMatch[1].toUpperCase();
  const hindiMatch = text.match(/\b([0-9]{1,2})\s*(?:ke|ki|me|mein|students|student)\b/);
  if (hindiMatch) return hindiMatch[1];
  return "";
}

function parseEmail(message: string) {
  const match = message.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  return match ? match[0].trim().toLowerCase() : "";
}

function parseLookupValue(message: string) {
  const text = cleanText(message);
  const explicit = text.match(/\b(?:student|teacher|staff|employee)?\s*(?:id|uid|code|roll|admission(?:\s*no)?)\s*(?:is|hai|:|=)?\s*([A-Za-z0-9_-]{2,})\b/i);
  if (explicit) return explicit[1];
  const compact = text.match(/\b(?:STU|STD|ADM|TCH|EMP|STAFF)[A-Za-z0-9_-]*\b/i);
  return compact ? compact[0] : "";
}

function formatINR(amount: unknown) {
  return `₹${Math.round(moneyValue(amount)).toLocaleString("en-IN")}`;
}

function isQuotaError(error: unknown) {
  const message = error instanceof Error ? error.message : String(error || "");
  return /quota|billing|plan|insufficient_quota|rate limit/i.test(message);
}

function recordDate(record: Record<string, unknown>) {
  return dateOnly(record.date || record.paymentDate || record.datePaid || record.createdAt || record.updatedAt);
}

function paymentDate(payment: Record<string, unknown>) {
  return dateOnly(payment.date || payment.paymentDate || payment.createdAt || payment.paidAt);
}

function paymentAmount(payment: Record<string, unknown>) {
  return moneyValue(payment.appliedAmount ?? payment.receivedAmount ?? payment.amount);
}

function inDateRange(record: Record<string, unknown>, startDate: string, endDate: string) {
  const date = recordDate(record);
  return date && date >= startDate && date <= endDate;
}

function matchesSession(record: Record<string, unknown>, sessionId: string) {
  if (!sessionId) return true;
  const recordSessionId = cleanText(record.sessionId || record.academicSessionId);
  return !recordSessionId || recordSessionId === sessionId;
}

function matchesClass(record: Record<string, unknown>, className: string) {
  if (!className) return true;
  const normalized = normalizeClass(className);
  return normalizeClass(record.class || record.className || record.studentClass) === normalized;
}

function normalizeClass(value: unknown) {
  return cleanText(value).replace(/^class\s*/i, "").trim().toLowerCase();
}

function normalizeLookup(value: unknown) {
  return cleanText(value).toLowerCase();
}

function valueMatches(record: Record<string, unknown>, fields: string[], needle: string) {
  const normalizedNeedle = normalizeLookup(needle);
  if (!normalizedNeedle) return false;
  return fields.some((field) => normalizeLookup(record[field]) === normalizedNeedle);
}

function valueContains(record: Record<string, unknown>, fields: string[], needle: string) {
  const normalizedNeedle = normalizeLookup(needle);
  if (!normalizedNeedle) return false;
  return fields.some((field) => {
    const value = normalizeLookup(record[field]);
    return value && value.includes(normalizedNeedle);
  });
}

function redactPrivateFields(record: Record<string, unknown>) {
  const blocked = /password|passcode|secret|token|otp|apikey|api_key|privatekey|private_key|credential/i;
  return Object.fromEntries(Object.entries(record).filter(([key]) => !blocked.test(key)));
}

function pickFirst(record: Record<string, unknown>, fields: string[]) {
  for (const field of fields) {
    const value = cleanText(record[field]);
    if (value) return value;
  }
  return "";
}

async function loadFees(accessToken: string, schoolId: string) {
  return runQuery(accessToken, `schools/${encodeURIComponent(schoolId)}`, {
    from: [{ collectionId: "fees" }],
    limit: 5000,
  });
}

async function loadStudents(accessToken: string, schoolId: string) {
  return runQuery(accessToken, `schools/${encodeURIComponent(schoolId)}`, {
    from: [{ collectionId: "students" }],
    limit: 5000,
  });
}

async function loadTeachers(accessToken: string, schoolId: string) {
  const root = "";
  const byAdmin = await runQuery(accessToken, root, {
    from: [{ collectionId: "users" }],
    where: andFilters([fieldEquals("role", "teacher"), fieldEquals("adminId", schoolId)]),
    limit: 1000,
  });
  const bySchool = await runQuery(accessToken, root, {
    from: [{ collectionId: "users" }],
    where: andFilters([fieldEquals("role", "teacher"), fieldEquals("schoolId", schoolId)]),
    limit: 1000,
  });
  const seen = new Set<string>();
  return [...byAdmin, ...bySchool].filter((teacher) => {
    const key = cleanText(teacher.id || teacher.uid || teacher.email || teacher.name);
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

async function loadStaffUsers(accessToken: string, schoolId: string) {
  const root = "";
  const [byAdmin, bySchool] = await Promise.all([
    runQuery(accessToken, root, {
      from: [{ collectionId: "users" }],
      where: fieldEquals("adminId", schoolId),
      limit: 2000,
    }),
    runQuery(accessToken, root, {
      from: [{ collectionId: "users" }],
      where: fieldEquals("schoolId", schoolId),
      limit: 2000,
    }),
  ]);
  const seen = new Set<string>();
  return [...byAdmin, ...bySchool].filter((user) => {
    const key = cleanText(user.id || user.uid || user.email || user.name);
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function summarizeStudentFees(student: Record<string, unknown>, fees: Record<string, unknown>[]) {
  const ids = [
    student.studentId,
    student.id,
    student.authUid,
    student.uid,
    student.admissionNo,
    student.admissionNumber,
  ].map(cleanText).filter(Boolean);
  const studentFees = fees.filter((fee) => ids.some((id) => valueMatches(fee, ["studentId", "studentDocId", "authUid", "uid", "admissionNo", "admissionNumber"], id)));
  return {
    records: studentFees.length,
    totalAmount: studentFees.reduce((sum, fee) => sum + feeTotal(fee), 0),
    paidAmount: studentFees.reduce((sum, fee) => sum + feePaid(fee), 0),
    pendingAmount: studentFees.reduce((sum, fee) => sum + feeDue(fee), 0),
  };
}

async function getStudentDetails(args: Record<string, unknown>, context: AssistantContext) {
  const studentId = cleanText(args.studentId || args.id || "");
  const email = cleanText(args.email || "");
  const queryText = cleanText(args.query || args.name || "");
  if (!studentId && !email && !queryText) return { error: "studentId, email, or query is required." };

  const students = await loadStudents(context.accessToken, context.schoolId);
  if (!students.length) return { error: "No student records found in schools/{schoolId}/students." };

  const idFields = ["studentId", "id", "authUid", "uid", "admissionNo", "admissionNumber", "roll", "rollNo"];
  const emailFields = ["email", "studentEmail", "parentEmail", "fatherEmail", "motherEmail", "guardianEmail"];
  const textFields = ["name", "studentName", "father", "fatherName", "mother", "motherName", "guardian", "guardianName"];
  let matches = students.filter((student) =>
    (studentId && valueMatches(student, idFields, studentId)) ||
    (email && valueMatches(student, emailFields, email)) ||
    (queryText && (valueMatches(student, idFields, queryText) || valueContains(student, [...textFields, ...emailFields], queryText)))
  );

  if (!matches.length) {
    return {
      error: "No matching student found.",
      searched: { studentId, email, query: queryText },
      recordsChecked: students.length,
    };
  }

  matches = matches.slice(0, 10);
  const fees = (await loadFees(context.accessToken, context.schoolId)).filter((fee) => matchesSession(fee, context.sessionId));
  return {
    matchCount: matches.length,
    recordsChecked: students.length,
    students: matches.map((student) => ({
      summary: {
        name: pickFirst(student, ["name", "studentName"]),
        studentId: pickFirst(student, ["studentId", "id"]),
        class: pickFirst(student, ["class", "className", "studentClass"]),
        section: pickFirst(student, ["section"]),
        roll: pickFirst(student, ["roll", "rollNo"]),
        email: pickFirst(student, ["email", "studentEmail"]),
        parentPhone: pickFirst(student, ["phone", "fatherPhone", "fatherMobile", "motherPhone", "guardianPhone"]),
      },
      details: redactPrivateFields(student),
      feeSummary: summarizeStudentFees(student, fees),
    })),
  };
}

async function getStaffDetails(args: Record<string, unknown>, context: AssistantContext) {
  const email = cleanText(args.email || "");
  const staffId = cleanText(args.staffId || args.teacherId || args.id || "");
  const queryText = cleanText(args.query || args.name || "");
  if (!email && !staffId && !queryText) return { error: "email, staffId, teacherId, or query is required." };

  const users = await loadStaffUsers(context.accessToken, context.schoolId);
  if (!users.length) return { error: "No staff records found in users for this school." };

  const idFields = ["uid", "id", "teacherId", "staffId", "employeeId", "employeeCode"];
  const emailFields = ["email", "teacherEmail", "staffEmail"];
  const textFields = ["name", "displayName", "fullName", "role", "class", "section", "subject", "department"];
  let matches = users.filter((user) =>
    (email && valueMatches(user, emailFields, email)) ||
    (staffId && valueMatches(user, idFields, staffId)) ||
    (queryText && (valueMatches(user, idFields, queryText) || valueContains(user, [...textFields, ...emailFields], queryText)))
  );

  if (!matches.length) {
    return {
      error: "No matching staff/teacher found.",
      searched: { email, staffId, query: queryText },
      recordsChecked: users.length,
    };
  }

  matches = matches.slice(0, 10);
  return {
    matchCount: matches.length,
    recordsChecked: users.length,
    staff: matches.map((user) => ({
      summary: {
        name: pickFirst(user, ["name", "displayName", "fullName"]),
        email: pickFirst(user, ["email", "teacherEmail", "staffEmail"]),
        role: pickFirst(user, ["role"]),
        teacherId: pickFirst(user, ["teacherId", "staffId", "employeeId"]),
        class: pickFirst(user, ["class"]),
        section: pickFirst(user, ["section"]),
        subject: pickFirst(user, ["subject"]),
      },
      details: redactPrivateFields(user),
    })),
  };
}

async function getPendingFees(args: Record<string, unknown>, context: AssistantContext) {
  const className = cleanText(args.className || args.class || "");
  const fees = (await loadFees(context.accessToken, context.schoolId)).filter((fee) => matchesSession(fee, context.sessionId));
  if (!fees.length) return { error: "No fee records found in schools/{schoolId}/fees." };
  const pending = fees.filter((fee) => matchesClass(fee, className) && feeDue(fee) > 0);
  const studentKeys = new Set(pending.map((fee) => cleanText(fee.studentId || fee.studentDocId || fee.authUid || fee.studentName)).filter(Boolean));
  return {
    className: className || "all classes",
    pendingStudentCount: studentKeys.size,
    pendingAmount: pending.reduce((sum, fee) => sum + feeDue(fee), 0),
    recordsChecked: fees.length,
  };
}

async function getTeacherAttendance(args: Record<string, unknown>, context: AssistantContext) {
  const date = dateOnly(args.date);
  if (!date) return { error: "A valid date in YYYY-MM-DD format is required for teacher attendance." };
  const [teachers, attendance] = await Promise.all([
    loadTeachers(context.accessToken, context.schoolId),
    runQuery(context.accessToken, `schools/${encodeURIComponent(context.schoolId)}`, {
      from: [{ collectionId: "teacher_attendance" }],
      where: fieldEquals("date", date),
      limit: 1000,
    }),
  ]);
  if (!teachers.length) return { error: "No teacher records found in users with role=teacher and matching adminId/schoolId." };
  const scopedAttendance = attendance.filter((entry) => matchesSession(entry, context.sessionId));
  const statusByTeacher = new Map<string, string>();
  scopedAttendance.forEach((entry) => {
    const key = cleanText(entry.teacherUid || entry.teacherId || entry.uid || entry.id);
    if (key) statusByTeacher.set(key, cleanText(entry.status || "Present"));
  });
  const present = [...statusByTeacher.values()].filter((status) => /present|in|check/i.test(status)).length;
  const explicitlyAbsent = [...statusByTeacher.values()].filter((status) => /absent|leave/i.test(status)).length;
  const absent = explicitlyAbsent || Math.max(0, teachers.length - present);
  return {
    date,
    totalTeachers: teachers.length,
    present,
    absent,
    attendanceRecords: scopedAttendance.length,
    note: scopedAttendance.length ? "" : "No teacher_attendance records were found for this date; absent count is based on total teachers minus present records.",
  };
}

async function getFeeCollection(args: Record<string, unknown>, context: AssistantContext) {
  const startDate = dateOnly(args.startDate);
  const endDate = dateOnly(args.endDate);
  if (!startDate || !endDate) return { error: "startDate and endDate are required in YYYY-MM-DD format." };
  const fees = (await loadFees(context.accessToken, context.schoolId)).filter((fee) => matchesSession(fee, context.sessionId));
  if (!fees.length) return { error: "No fee records found in schools/{schoolId}/fees." };
  const relevant = fees.filter((fee) => {
    const payments = Array.isArray(fee.payments) ? fee.payments : [];
    return inDateRange(fee, startDate, endDate) ||
      payments.some((payment: Record<string, unknown>) => {
        const date = paymentDate(payment);
        return date && date >= startDate && date <= endDate;
      });
  });
  const paidStudentKeys = new Set<string>();
  const unpaidStudentKeys = new Set<string>();
  let totalCollectedAmount = 0;
  let pendingAmount = 0;
  relevant.forEach((fee) => {
    const studentKey = cleanText(fee.studentId || fee.studentDocId || fee.authUid || fee.studentName);
    const payments = Array.isArray(fee.payments) ? fee.payments : [];
    const paidInRange = payments.reduce((sum, payment: Record<string, unknown>) => {
      const date = paymentDate(payment);
      return date && date >= startDate && date <= endDate ? sum + paymentAmount(payment) : sum;
    }, 0);
    const paid = paidInRange || (inDateRange(fee, startDate, endDate) ? feePaid(fee) : 0);
    const due = feeDue(fee);
    totalCollectedAmount += paid;
    pendingAmount += due;
    if (studentKey && paid > 0) paidStudentKeys.add(studentKey);
    if (studentKey && due > 0) unpaidStudentKeys.add(studentKey);
  });
  return {
    startDate,
    endDate,
    totalCollectedAmount,
    pendingAmount,
    paidStudents: paidStudentKeys.size,
    unpaidStudents: unpaidStudentKeys.size,
    recordsChecked: fees.length,
    matchingRecords: relevant.length,
  };
}

async function getStudentAttendance(args: Record<string, unknown>, context: AssistantContext) {
  const date = dateOnly(args.date);
  const className = cleanText(args.className || args.class || "");
  if (!date) return { error: "A valid date in YYYY-MM-DD format is required for student attendance." };
  const [students, attendance] = await Promise.all([
    loadStudents(context.accessToken, context.schoolId),
    runQuery(context.accessToken, `schools/${encodeURIComponent(context.schoolId)}`, {
      from: [{ collectionId: "attendance" }],
      where: fieldEquals("date", date),
      limit: 5000,
    }),
  ]);
  const scopedStudents = students.filter((student) => matchesClass(student, className));
  if (!scopedStudents.length) return { error: className ? `No students found for Class ${className}.` : "No student records found in schools/{schoolId}/students." };
  const scopedKeys = new Set(scopedStudents.map((student) => cleanText(student.studentId || student.id || student.authUid)).filter(Boolean));
  const scopedAttendance = attendance.filter((entry) => matchesSession(entry, context.sessionId)).filter((entry) => {
    const studentKey = cleanText(entry.studentId || entry.studentDocId || entry.authUid);
    return !className ? scopedKeys.has(studentKey) || matchesClass(entry, className) : scopedKeys.has(studentKey) || matchesClass(entry, className);
  });
  const present = scopedAttendance.filter((entry) => cleanText(entry.status) === "Present").length;
  const halfDay = scopedAttendance.filter((entry) => cleanText(entry.status) === "Half Day").length;
  const absent = scopedAttendance.filter((entry) => cleanText(entry.status) === "Absent").length;
  const marked = present + halfDay + absent;
  return {
    date,
    className: className || "all classes",
    totalStudents: scopedStudents.length,
    present,
    halfDay,
    absent,
    notMarked: Math.max(0, scopedStudents.length - marked),
    attendanceRecords: scopedAttendance.length,
  };
}

type AssistantContext = {
  accessToken: string;
  schoolId: string;
  sessionId: string;
};

const toolHandlers: Record<string, (args: Record<string, unknown>, context: AssistantContext) => Promise<Record<string, unknown>>> = {
  getStudentDetails,
  getStaffDetails,
  getPendingFees,
  getTeacherAttendance,
  getFeeCollection,
  getStudentAttendance,
};

async function answerWithFreeFallback(message: string, context: AssistantContext, reason = "") {
  const text = normalizeKey(message);
  const quotaNote = reason ? " OpenAI quota khatam hai, isliye free fallback mode use ho raha hai." : "";

  if (/^(hi|hii|hey|hello|hyy|hy|namaste|hola)\b/.test(text)) {
    return `Namaste!${quotaNote} Aap student details, teacher/staff details, fees, attendance, ya monthly fee collection ke baare me pooch sakte hain.`;
  }

  if (/\b(student|bachcha|bachche|details|detail|profile|record)\b/.test(text) && /\b(id|uid|roll|admission|email|detail|details|profile|record)\b/.test(text)) {
    const email = parseEmail(message);
    const studentId = parseLookupValue(message);
    const query = !studentId && !email ? message : "";
    const result = await getStudentDetails({ studentId, email, query }, context);
    if (result.error) return String(result.error);
    return JSON.stringify(result);
  }

  if (/\b(teacher|staff|employee|accountant|librarian|sir|madam|details|detail|profile|record)\b/.test(text) && /\b(email|id|uid|code|detail|details|profile|record)\b/.test(text)) {
    const email = parseEmail(message);
    const staffId = parseLookupValue(message);
    const query = !staffId && !email ? message : "";
    const result = await getStaffDetails({ email, staffId, query }, context);
    if (result.error) return String(result.error);
    return JSON.stringify(result);
  }

  if (/\b(teacher|teachers|staff|sir|madam)\b/.test(text) && /\b(attendance|absent|present|leave|chhutti)\b/.test(text)) {
    const date = parseRequestedDate(message);
    const result = await getTeacherAttendance({ date }, context);
    if (result.error) return String(result.error);
    return `${date} ko total ${result.totalTeachers} teachers me se ${result.present} present aur ${result.absent} absent the.${result.note ? ` ${result.note}` : ""}`;
  }

  if (/\b(attendance|absent|present|half|aaye|nahi aaye)\b/.test(text) && /\b(student|students|class|bachche|bacche|aaj|kal|today|yesterday)\b/.test(text)) {
    const date = parseRequestedDate(message);
    const className = parseClassName(message);
    const result = await getStudentAttendance({ date, className }, context);
    if (result.error) return String(result.error);
    const label = className ? `Class ${className}` : "school";
    return `${date} ko ${label} me ${result.present} present, ${result.absent} absent, ${result.halfDay} half day aur ${result.notMarked} not marked students hain. Total students: ${result.totalStudents}.`;
  }

  if (/\b(collection|collect|collected|report|hui|hua|fee collect|fees collect)\b/.test(text) && /\b(fee|fees|amount|month|mahina|mahine)\b/.test(text)) {
    const range = parseRequestedRange(message);
    const result = await getFeeCollection(range, context);
    if (result.error) return String(result.error);
    return `${range.startDate} se ${range.endDate} tak fee collection ${formatINR(result.totalCollectedAmount)} hai. Pending amount ${formatINR(result.pendingAmount)} hai. Paid students: ${result.paidStudents}, unpaid students: ${result.unpaidStudents}.`;
  }

  if (/\b(fee|fees|dues|due|pending|unpaid|bakaya|baki)\b/.test(text)) {
    const className = parseClassName(message);
    const result = await getPendingFees({ className }, context);
    if (result.error) return String(result.error);
    const label = className ? `Class ${className}` : "school";
    return `${label} me ${result.pendingStudentCount} students ki fee pending hai. Total pending amount ${formatINR(result.pendingAmount)} hai.`;
  }

  return `OpenAI quota khatam hai, isliye free fallback mode chal raha hai. Main abhi common queries answer kar sakta hoon: "student id STU123 details", "teacher email abc@example.com details", "Class 10 fee due", "Aaj students absent", "Kal teachers absent", "Is month fee collection".`;
}

const tools = [
  {
    type: "function",
    name: "getStudentDetails",
    description: "Return full admin-safe details for matching students by student ID, admission number, roll number, UID, email, or name query. Also includes fee summary.",
    parameters: {
      type: "object",
      properties: {
        studentId: { type: "string", description: "Student ID, admission number, roll number, auth UID, or document ID." },
        email: { type: "string", description: "Student or parent/guardian email address." },
        query: { type: "string", description: "Fallback search text such as student name or parent name." },
      },
      additionalProperties: false,
    },
  },
  {
    type: "function",
    name: "getStaffDetails",
    description: "Return full admin-safe details for matching teachers or staff by email, teacher ID, staff ID, employee ID, UID, role, subject, or name query.",
    parameters: {
      type: "object",
      properties: {
        email: { type: "string", description: "Teacher or staff email address." },
        staffId: { type: "string", description: "Teacher ID, staff ID, employee ID, auth UID, or document ID." },
        query: { type: "string", description: "Fallback search text such as staff name, role, subject, class, or department." },
      },
      additionalProperties: false,
    },
  },
  {
    type: "function",
    name: "getPendingFees",
    description: "Return pending fee student count and pending amount, optionally filtered by class.",
    parameters: {
      type: "object",
      properties: {
        className: { type: "string", description: "Class name or number, for example 10, Class 10, LKG." },
      },
      additionalProperties: false,
    },
  },
  {
    type: "function",
    name: "getTeacherAttendance",
    description: "Return total, present, and absent teacher attendance for a specific date.",
    parameters: {
      type: "object",
      properties: {
        date: { type: "string", description: "Date in YYYY-MM-DD format." },
      },
      required: ["date"],
      additionalProperties: false,
    },
  },
  {
    type: "function",
    name: "getFeeCollection",
    description: "Return collected amount, pending amount, paid students, and unpaid students for a date range.",
    parameters: {
      type: "object",
      properties: {
        startDate: { type: "string", description: "Start date in YYYY-MM-DD format." },
        endDate: { type: "string", description: "End date in YYYY-MM-DD format." },
      },
      required: ["startDate", "endDate"],
      additionalProperties: false,
    },
  },
  {
    type: "function",
    name: "getStudentAttendance",
    description: "Return present, absent, half-day, and not-marked student attendance counts for a date, optionally filtered by class.",
    parameters: {
      type: "object",
      properties: {
        date: { type: "string", description: "Date in YYYY-MM-DD format." },
        className: { type: "string", description: "Optional class name or number." },
      },
      required: ["date"],
      additionalProperties: false,
    },
  },
];

function responseText(response: any) {
  if (typeof response.output_text === "string" && response.output_text.trim()) return response.output_text.trim();
  return (response.output || [])
    .filter((item: any) => item.type === "message")
    .flatMap((item: any) => item.content || [])
    .map((content: any) => content.text || "")
    .join("\n")
    .trim();
}

function geminiText(response: any) {
  return (response.candidates || [])
    .flatMap((candidate: any) => candidate.content?.parts || [])
    .map((part: any) => part.text || "")
    .join("\n")
    .trim();
}

function toGeminiSchema(schema: any): any {
  if (!schema || typeof schema !== "object") return schema;
  const next: Record<string, unknown> = {};
  Object.entries(schema).forEach(([key, value]) => {
    if (key === "additionalProperties") return;
    if (key === "type" && typeof value === "string") {
      next[key] = value.toUpperCase();
      return;
    }
    if (key === "properties" && value && typeof value === "object") {
      next[key] = Object.fromEntries(Object.entries(value).map(([name, child]) => [name, toGeminiSchema(child)]));
      return;
    }
    if (Array.isArray(value)) {
      next[key] = value.map(toGeminiSchema);
      return;
    }
    next[key] = toGeminiSchema(value);
  });
  return next;
}

function geminiTools() {
  return [{
    functionDeclarations: tools.map((tool: any) => ({
      name: tool.name,
      description: tool.description,
      parameters: toGeminiSchema(tool.parameters),
    })),
  }];
}

async function callGemini(body: Record<string, unknown>) {
  const apiKey = Deno.env.get("GEMINI_API_KEY");
  if (!apiKey) throw new Error("GEMINI_API_KEY is not configured on the backend");
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(GEMINI_MODEL)}:generateContent?key=${encodeURIComponent(apiKey)}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    },
  );
  const rawText = await response.text();
  let data: any = {};
  try {
    data = rawText ? JSON.parse(rawText) : {};
  } catch {
    data = { rawText };
  }
  if (!response.ok) {
    const message = data.error?.message || data.message || rawText || `Gemini request failed with status ${response.status}`;
    throw new Error(message);
  }
  return data;
}

async function answerWithGemini(message: string, systemPrompt: string, context: AssistantContext) {
  const baseContents = [{ role: "user", parts: [{ text: message }] }];
  const firstResponse = await callGemini({
    systemInstruction: { parts: [{ text: systemPrompt }] },
    contents: baseContents,
    tools: geminiTools(),
    toolConfig: { functionCallingConfig: { mode: "AUTO" } },
  });
  const modelContent = firstResponse.candidates?.[0]?.content;
  const functionCalls = (modelContent?.parts || [])
    .map((part: any) => part.functionCall)
    .filter(Boolean);
  if (!functionCalls.length) {
    return { reply: geminiText(firstResponse) || "Please ask a school data question I can answer.", mode: "gemini" };
  }

  const responseParts = [];
  for (const call of functionCalls) {
    const handler = toolHandlers[call.name];
    let result: Record<string, unknown>;
    try {
      result = handler ? await handler(call.args || {}, context) : { error: `Unsupported function: ${call.name}` };
    } catch (error) {
      result = { error: error instanceof Error ? error.message : "Tool execution failed" };
    }
    responseParts.push({
      functionResponse: {
        name: call.name,
        response: result,
      },
    });
  }

  const finalResponse = await callGemini({
    systemInstruction: { parts: [{ text: systemPrompt }] },
    contents: [
      ...baseContents,
      { role: "model", parts: modelContent?.parts || [] },
      { role: "user", parts: responseParts },
    ],
    tools: geminiTools(),
  });
  return {
    reply: geminiText(finalResponse) || "I found the data, but could not format a response.",
    mode: "gemini",
    toolCalls: functionCalls.map((call: any) => call.name),
  };
}

async function callOpenAI(body: Record<string, unknown>) {
  const apiKey = Deno.env.get("OPENAI_API_KEY");
  if (!apiKey) throw new Error("OPENAI_API_KEY is not configured on the backend");
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const rawText = await response.text();
  let data: any = {};
  try {
    data = rawText ? JSON.parse(rawText) : {};
  } catch {
    data = { rawText };
  }
  if (!response.ok) {
    const message = data.error?.message || data.message || rawText || `OpenAI request failed with status ${response.status}`;
    throw new Error(message);
  }
  return data;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { status: 200, headers: corsHeaders });
  if (req.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405);

  try {
    const idToken = cleanText(req.headers.get("x-firebase-token"));
    if (!idToken) return jsonResponse({ error: "Admin login required" }, 401);
    const payload = await req.json();
    const message = cleanText(payload.message);
    const sessionId = cleanText(payload.sessionId);
    if (message.length < 2) return jsonResponse({ error: "Please enter a question for the assistant" }, 400);
    if (message.length > 1000) return jsonResponse({ error: "Question is too long. Please keep it under 1000 characters." }, 400);

    const firebaseUser = await verifyFirebaseUser(idToken);
    const accessToken = await getGoogleAccessToken();
    const profile = await getDocument(accessToken, `users/${encodeURIComponent(firebaseUser.uid)}`);
    if (!profile) return jsonResponse({ error: "Admin profile was not found" }, 403);
    const role = cleanText(profile.role).toLowerCase();
    if (role !== "admin" && role !== "superadmin" && profile.superAdmin !== true) {
      return jsonResponse({ error: "Only an administrator can use the AI School Assistant" }, 403);
    }
    const schoolId = cleanText(profile.schoolId || profile.adminId || firebaseUser.uid);
    if (!schoolId || schoolId.includes("/")) return jsonResponse({ error: "Invalid school profile" }, 400);

    const today = new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
    const systemPrompt = [
      "You are Schoolix AI School Assistant for an Indian school admin panel.",
      "Answer naturally in the same language style as the admin, including Hindi/Hinglish when used.",
      "Use only the provided function tools for school data. Never claim access to raw Firestore.",
      "When the admin asks for any student's details by student ID, admission number, roll number, email, or name, call getStudentDetails.",
      "When the admin asks for teacher/staff details by email, teacher ID, staff ID, employee ID, role, subject, or name, call getStaffDetails.",
      "For detail lookups, present the important fields clearly and mention if multiple matches were found. Do not expose redacted/private fields.",
      "If a tool returns an error or missing collection/field message, clearly explain that limitation.",
      "Format rupee amounts with the Indian numbering system and the rupee symbol.",
      `Today in the school's timezone (Asia/Kolkata) is ${today}. Convert relative dates like aaj, kal, yesterday, last month, and this month to exact YYYY-MM-DD ranges before calling tools.`,
    ].join(" ");

    const assistantContext = { accessToken, schoolId, sessionId };
    if (Deno.env.get("GEMINI_API_KEY")) {
      try {
        const geminiAnswer = await answerWithGemini(message, systemPrompt, assistantContext);
        return jsonResponse({ success: true, ...geminiAnswer });
      } catch (error) {
        if (isQuotaError(error)) {
          const reply = await answerWithFreeFallback(message, assistantContext, error instanceof Error ? error.message : "quota");
          return jsonResponse({ success: true, reply, mode: "free-fallback" });
        }
        throw new Error(`Gemini error: ${error instanceof Error ? error.message : "request failed"}`);
      }
    }

    let firstResponse;
    try {
      firstResponse = await callOpenAI({
        model: OPENAI_MODEL,
        instructions: systemPrompt,
        input: [{ role: "user", content: message }],
        tools,
        tool_choice: "auto",
      });
    } catch (error) {
      if (!isQuotaError(error)) throw error;
      const reply = await answerWithFreeFallback(message, assistantContext, error instanceof Error ? error.message : "quota");
      return jsonResponse({ success: true, reply, mode: "free-fallback" });
    }

    const calls = (firstResponse.output || []).filter((item: any) => item.type === "function_call");
    if (!calls.length) {
      return jsonResponse({ success: true, reply: responseText(firstResponse) || "Please ask a school data question I can answer." });
    }

    const toolOutputs = [];
    for (const call of calls) {
      const handler = toolHandlers[call.name];
      let result: Record<string, unknown>;
      try {
        const args = call.arguments ? JSON.parse(call.arguments) : {};
        result = handler ? await handler(args, assistantContext) : { error: `Unsupported function: ${call.name}` };
      } catch (error) {
        result = { error: error instanceof Error ? error.message : "Tool execution failed" };
      }
      toolOutputs.push({
        type: "function_call_output",
        call_id: call.call_id,
        output: JSON.stringify(result),
      });
    }

    let finalResponse;
    try {
      finalResponse = await callOpenAI({
        model: OPENAI_MODEL,
        instructions: systemPrompt,
        previous_response_id: firstResponse.id,
        input: toolOutputs,
        tools,
      });
    } catch (error) {
      if (!isQuotaError(error)) throw error;
      const reply = await answerWithFreeFallback(message, assistantContext, error instanceof Error ? error.message : "quota");
      return jsonResponse({ success: true, reply, mode: "free-fallback", toolCalls: calls.map((call: any) => call.name) });
    }

    return jsonResponse({
      success: true,
      reply: responseText(finalResponse) || "I found the data, but could not format a response.",
      toolCalls: calls.map((call: any) => call.name),
    });
  } catch (error) {
    console.error("school-assistant error", error);
    const message = error instanceof Error ? error.message : "Unable to answer right now";
    const status = /session|login|admin/i.test(message) ? 401 : 500;
    return jsonResponse({ error: message }, status);
  }
});
