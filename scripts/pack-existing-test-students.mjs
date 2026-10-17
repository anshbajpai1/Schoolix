const SUPABASE_URL = "https://ezkmeedcqetztkeppxil.supabase.co";
const SCHOOL_ID = "f9b46318-2100-4558-bd46-5502a36d4297";
const SESSION_ID = "2026-2027";
const TARGET_PER_CLASS = 20;
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const APPLY = process.argv.includes("--apply");
const CLASS_ORDER = ["PG", "NURSERY", "LKG", "UKG", ...Array.from({ length: 12 }, (_, i) => String(i + 1))];
const FIRST_NAMES = ["Aarav", "Anaya", "Vihaan", "Diya", "Kabir", "Isha", "Reyansh", "Myra", "Arjun", "Saanvi", "Ishaan", "Navya", "Aditya", "Kiara", "Krish", "Tara", "Dev", "Aadhya", "Yuvan", "Riya"];
const LAST_NAMES = ["Sharma", "Verma", "Gupta", "Singh", "Mehta", "Patel", "Rao", "Jain", "Kapoor", "Sinha"];

if (!KEY) throw new Error("Set SUPABASE_SERVICE_ROLE_KEY before running this script.");

async function rest(table, query = {}, options = {}) {
  const url = new URL(`${SUPABASE_URL}/rest/v1/${table}`);
  Object.entries(query).forEach(([key, value]) => url.searchParams.set(key, value));
  const response = await fetch(url, {
    ...options,
    headers: {
      apikey: KEY,
      Authorization: `Bearer ${KEY}`,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates,return=minimal",
      ...options.headers,
    },
  });
  const body = await response.text();
  if (!response.ok) throw new Error(`${table}: ${response.status} ${body.slice(0, 400)}`);
  return body ? JSON.parse(body) : null;
}

async function getRows(collectionName) {
  return rest("firestore_documents", {
    school_id: `eq.${SCHOOL_ID}`,
    collection_name: `eq.${collectionName}`,
    select: "path,path_depth,collection_name,document_id,school_id,data,updated_at",
    limit: "1000",
  });
}

async function upsertRows(rows) {
  for (let index = 0; index < rows.length; index += 50) {
    await rest("firestore_documents", { on_conflict: "path" }, {
      method: "POST",
      body: JSON.stringify(rows.slice(index, index + 50)),
    });
  }
}

function isTest(row) {
  return /^TEST\d+$/i.test(String(row.data?.studentId || "").trim());
}

function record(path, data) {
  const parts = path.split("/");
  return {
    path,
    path_depth: parts.length,
    collection_name: parts.at(-2),
    document_id: parts.at(-1),
    school_id: SCHOOL_ID,
    data,
    updated_at: new Date().toISOString(),
  };
}

function makeTestStudent(className, classIndex, slot, schoolName) {
  const studentId = `TEST30${String(classIndex + 1).padStart(2, "0")}${String(slot).padStart(3, "0")}`;
  const now = new Date().toISOString();
  const name = `${FIRST_NAMES[(slot - 1) % FIRST_NAMES.length]} ${LAST_NAMES[(classIndex + slot - 1) % LAST_NAMES.length]}`;
  const email = `schoolix.fill.${studentId.toLowerCase()}@example.invalid`;
  const data = {
    studentId,
    name,
    class: className,
    section: "A",
    roll: "",
    rollNo: "",
    srNumber: `T-${studentId.slice(4)}`,
    father: "Test Parent",
    fatherPhone: "",
    mother: "Test Parent",
    motherPhone: "",
    phone: "",
    address: "Test data",
    dob: `${className === "PG" ? 2022 : className === "NURSERY" ? 2021 : className === "LKG" ? 2020 : className === "UKG" ? 2019 : 2026 - Number(className) - 5}-06-15`,
    gender: slot % 2 ? "Male" : "Female",
    category: "General",
    bloodGroup: "",
    religion: "",
    previousSchool: "",
    status: "Active",
    tcIssued: false,
    dateOfAdmission: now.slice(0, 10),
    yearOfAdmission: "2026",
    currentYear: SESSION_ID,
    sessionId: SESSION_ID,
    session: SESSION_ID,
    academicSession: SESSION_ID,
    sessionPlacements: {},
    aadharNumber: "",
    email,
    parentEmail: email,
    photoUrl: "",
    photoPublicId: "",
    authUid: "",
    schoolId: SCHOOL_ID,
    adminId: SCHOOL_ID,
    schoolName,
    createdAt: now,
    updatedAt: now,
    testData: true,
  };
  return record(`schools/${SCHOOL_ID}/students/testfill-${studentId.toLowerCase()}`, data);
}

const school = (await rest("firestore_documents", {
  path: `eq.schools/${SCHOOL_ID}`,
  select: "data",
  limit: "1",
}))?.[0];
if (school?.data?.schoolName !== "Bs education center") throw new Error("School identity did not match Bs education center.");

const students = await getRows("students");
if (students.length >= 1000) throw new Error("Student query may be truncated; stop before changing data.");
const byClass = new Map(CLASS_ORDER.map((name) => [name, []]));
const nonTestByClass = new Map(CLASS_ORDER.map((name) => [name, []]));
const knownIds = new Set(students.map((row) => String(row.data?.studentId || "").toUpperCase()));
for (const row of students) {
  const className = String(row.data?.class || "").trim();
  if (!byClass.has(className)) continue;
  (isTest(row) ? byClass : nonTestByClass).get(className).push(row);
}

const newRows = [];
const changes = [];
const summary = [];
for (const [classIndex, className] of CLASS_ORDER.entries()) {
  const tests = byClass.get(className);
  if (tests.length === 0) continue;
  if (tests.length > TARGET_PER_CLASS) throw new Error(`Class ${className} already has ${tests.length} test students; refusing to move extras.`);

  for (let slot = 1; tests.length < TARGET_PER_CLASS; slot++) {
    const candidate = makeTestStudent(className, classIndex, slot, school.data.schoolName);
    if (knownIds.has(candidate.data.studentId)) continue;
    knownIds.add(candidate.data.studentId);
    tests.push(candidate);
    newRows.push(candidate);
  }

  const occupied = new Map();
  const realBySection = new Map();
  for (const row of nonTestByClass.get(className)) {
    const section = String(row.data?.section || "A").trim() || "A";
    occupied.set(section, (occupied.get(section) || 0) + 1);
    if (!realBySection.has(section)) realBySection.set(section, new Set());
    const realRoll = Number(row.data?.roll || row.data?.rollNo);
    if (Number.isInteger(realRoll) && realRoll > 0) realBySection.get(section).add(realRoll);
  }

  tests.sort((left, right) => String(left.data.studentId).localeCompare(String(right.data.studentId), "en", { numeric: true }));
  for (const row of tests) {
    const section = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").find((value) => (occupied.get(value) || 0) < 20);
    if (!section) throw new Error(`No free section for Class ${className}.`);
    occupied.set(section, (occupied.get(section) || 0) + 1);
    const usedRolls = realBySection.get(section) || new Set();
    let rollNumber = 1;
    while (usedRolls.has(rollNumber)) rollNumber++;
    usedRolls.add(rollNumber);
    realBySection.set(section, usedRolls);
    const roll = String(rollNumber).padStart(2, "0");
    const old = row.data;
    const existingPlacement = old.sessionPlacements?.[SESSION_ID] || {};
    const placement = {
      ...existingPlacement,
      class: className,
      section,
      roll,
      session: SESSION_ID,
      sessionId: SESSION_ID,
      currentYear: SESSION_ID,
    };
    if (old.section !== section || old.roll !== roll || old.rollNo !== roll || existingPlacement.section !== section || existingPlacement.roll !== roll) {
      row.data = {
        ...old,
        section,
        roll,
        rollNo: roll,
        sessionPlacements: { ...old.sessionPlacements, [SESSION_ID]: placement },
        updatedAt: new Date().toISOString(),
      };
      row.updated_at = new Date().toISOString();
      changes.push(row);
    }
  }
  summary.push({ class: className, existing: tests.length - newRows.filter((row) => row.data.class === className).length, added: newRows.filter((row) => row.data.class === className).length, sections: [...occupied].map(([section, count]) => `${section}:${count}`).join(" ") });
}

console.table(summary);
console.log(`Student rows to update: ${changes.length - newRows.length}; new test students: ${newRows.length}.`);
if (!APPLY) {
  console.log("Dry run only. Pass --apply to write the planned changes.");
  process.exit(0);
}

await upsertRows(changes);

// Keep existing student login mirrors and fee labels consistent with moved students.
const moved = new Map(changes.filter((row) => !newRows.includes(row)).map((row) => [row.data.studentId, row.data]));
for (const collectionName of ["users", "fees"]) {
  const rows = await getRows(collectionName);
  if (rows.length >= 1000) throw new Error(`${collectionName} query may be truncated; student rows are saved, rerun after reviewing.`);
  const patches = rows.filter((row) => moved.has(row.data?.studentId)).map((row) => {
    const student = moved.get(row.data.studentId);
    const data = {
      ...row.data,
      section: student.section,
      roll: student.roll,
      rollNo: student.rollNo,
      updatedAt: new Date().toISOString(),
    };
    if (collectionName === "users" && data.sessionPlacements?.[SESSION_ID]) {
      data.sessionPlacements = { ...data.sessionPlacements, [SESSION_ID]: student.sessionPlacements[SESSION_ID] };
    }
    return { ...row, data, updated_at: new Date().toISOString() };
  });
  await upsertRows(patches);
  console.log(`${collectionName} mirrors updated: ${patches.length}.`);
}

const verified = await getRows("students");
for (const row of summary) {
  const classRows = verified.filter((student) => student.data?.class === row.class);
  const testCount = classRows.filter(isTest).length;
  const sections = new Map();
  classRows.forEach((student) => sections.set(student.data?.section || "A", (sections.get(student.data?.section || "A") || 0) + 1));
  if (testCount !== TARGET_PER_CLASS || [...sections.values()].some((count) => count > 20)) {
    throw new Error(`Verification failed for Class ${row.class}: ${testCount} test students; sections ${JSON.stringify([...sections])}`);
  }
}
console.log(`Verified ${summary.length} classes with ${TARGET_PER_CLASS} test students each.`);
