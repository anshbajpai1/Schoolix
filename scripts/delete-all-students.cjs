const fs = require("fs");
const path = require("path");

const PROJECT_ID = "schoolix-48107";
const DATABASE = "(default)";
const FIRESTORE_ROOT = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/${DATABASE}/documents`;
const IDENTITY_ROOT = `https://identitytoolkit.googleapis.com/v1/projects/${PROJECT_ID}`;

const SCHOOL_COLLECTIONS_TO_CLEAR = [
  "students",
  "passedOutStudents",
  "attendance",
  "fees",
  "reportCards",
  "marks",
  "library_issues",
  "onlineFeeTransactions",
  "transferCertificates"
];

function firebaseToolsLib(file) {
  return path.join(process.env.APPDATA, "npm", "node_modules", "firebase-tools", "lib", file);
}

async function getAccessToken() {
  const auth = require(firebaseToolsLib("auth.js"));
  const scopes = require(firebaseToolsLib("scopes.js"));
  const configPath = path.join(process.env.USERPROFILE, ".config", "configstore", "firebase-tools.json");
  const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
  const token = await auth.getAccessToken(config.tokens.refresh_token, [scopes.CLOUD_PLATFORM]);
  if (!token?.access_token) throw new Error("Unable to refresh Firebase CLI access token.");
  return token.access_token;
}

function encodePath(value) {
  return String(value).split("/").map(encodeURIComponent).join("/");
}

function documentId(name) {
  return String(name || "").split("/").pop();
}

function fieldValueToJson(value) {
  if (!value || typeof value !== "object") return value;
  if ("stringValue" in value) return value.stringValue;
  if ("integerValue" in value) return Number(value.integerValue);
  if ("doubleValue" in value) return Number(value.doubleValue);
  if ("booleanValue" in value) return value.booleanValue;
  if ("timestampValue" in value) return value.timestampValue;
  if ("nullValue" in value) return null;
  if ("arrayValue" in value) return (value.arrayValue.values || []).map(fieldValueToJson);
  if ("mapValue" in value) return fieldsToJson(value.mapValue.fields || {});
  if ("referenceValue" in value) return value.referenceValue;
  return value;
}

function fieldsToJson(fields) {
  return Object.fromEntries(Object.entries(fields || {}).map(([key, value]) => [key, fieldValueToJson(value)]));
}

async function api(token, url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(options.headers || {})
    }
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`${options.method || "GET"} ${url} failed: ${response.status} ${text}`);
  }
  if (response.status === 204) return null;
  return response.json();
}

async function listCollection(token, collectionPath) {
  const docs = [];
  let pageToken = "";
  do {
    const url = new URL(`${FIRESTORE_ROOT}/${encodePath(collectionPath)}`);
    url.searchParams.set("pageSize", "300");
    if (pageToken) url.searchParams.set("pageToken", pageToken);
    const body = await api(token, url.toString());
    docs.push(...(body.documents || []));
    pageToken = body.nextPageToken || "";
  } while (pageToken);
  return docs;
}

async function runUsersByRoleQuery(token) {
  const body = {
    structuredQuery: {
      from: [{ collectionId: "users" }],
      where: {
        fieldFilter: {
          field: { fieldPath: "role" },
          op: "IN",
          value: {
            arrayValue: {
              values: [
                { stringValue: "student" },
                { stringValue: "students" },
                { stringValue: "parent" },
                { stringValue: "parents" }
              ]
            }
          }
        }
      }
    }
  };
  const rows = await api(token, `${FIRESTORE_ROOT}:runQuery`, {
    method: "POST",
    body: JSON.stringify(body)
  });
  return rows.map((row) => row.document).filter(Boolean);
}

async function deleteDocuments(token, documents) {
  let deleted = 0;
  for (const chunk of chunks(documents, 25)) {
    await Promise.all(chunk.map((doc) => api(token, `https://firestore.googleapis.com/v1/${doc.name}`, { method: "DELETE" })));
    deleted += chunk.length;
  }
  return deleted;
}

async function deleteAuthUsers(token, localIds) {
  const uniqueIds = [...new Set(localIds.filter(Boolean))];
  let deleted = 0;
  for (const chunk of chunks(uniqueIds, 1000)) {
    await api(token, `${IDENTITY_ROOT}/accounts:batchDelete`, {
      method: "POST",
      body: JSON.stringify({ localIds: chunk, force: true })
    });
    deleted += chunk.length;
  }
  return deleted;
}

function chunks(values, size) {
  const result = [];
  for (let index = 0; index < values.length; index += size) result.push(values.slice(index, index + size));
  return result;
}

async function main() {
  const dryRun = process.argv.includes("--dry-run");
  const skipAuthDelete = process.argv.includes("--skip-auth-delete");
  const token = await getAccessToken();

  const schoolDocs = await listCollection(token, "schools");
  const schoolIds = schoolDocs.map((doc) => documentId(doc.name));
  const backup = {
    projectId: PROJECT_ID,
    dryRun,
    createdAt: new Date().toISOString(),
    schools: {},
    users: []
  };
  const deletionTargets = [];

  for (const schoolId of schoolIds) {
    backup.schools[schoolId] = {};
    for (const collectionId of SCHOOL_COLLECTIONS_TO_CLEAR) {
      const docs = await listCollection(token, `schools/${schoolId}/${collectionId}`).catch((error) => {
        if (String(error.message).includes("404")) return [];
        throw error;
      });
      backup.schools[schoolId][collectionId] = docs.map((doc) => ({
        name: doc.name,
        id: documentId(doc.name),
        fields: fieldsToJson(doc.fields || {})
      }));
      deletionTargets.push(...docs);
    }
  }

  const userDocs = await runUsersByRoleQuery(token);
  backup.users = userDocs.map((doc) => ({
    name: doc.name,
    id: documentId(doc.name),
    fields: fieldsToJson(doc.fields || {})
  }));

  const backupPath = path.join(__dirname, `student-cleanup-backup-${new Date().toISOString().replace(/[:.]/g, "-")}.json`);
  fs.writeFileSync(backupPath, JSON.stringify(backup, null, 2));

  const authUids = backup.users
    .flatMap((entry) => [entry.id, entry.fields.authUid])
    .filter((id) => id && !String(id).includes("@"));

  console.log(`Schools found: ${schoolIds.length}`);
  for (const schoolId of schoolIds) {
    const summary = Object.entries(backup.schools[schoolId]).map(([key, docs]) => `${key}=${docs.length}`).join(", ");
    console.log(`${schoolId}: ${summary}`);
  }
  console.log(`Student/parent user docs: ${userDocs.length}`);
  console.log(`Firebase Auth user ids queued: ${new Set(authUids).size}`);
  console.log(`Backup: ${backupPath}`);

  if (dryRun) return;

  const deletedSchoolDocs = await deleteDocuments(token, deletionTargets);
  const deletedUserDocs = await deleteDocuments(token, userDocs);
  let deletedAuthUsers = 0;
  if (!skipAuthDelete && authUids.length) {
    deletedAuthUsers = await deleteAuthUsers(token, authUids);
  }

  const remainingActiveStudents = [];
  const remainingPassedOutStudents = [];
  for (const schoolId of schoolIds) {
    remainingActiveStudents.push(...await listCollection(token, `schools/${schoolId}/students`));
    remainingPassedOutStudents.push(...await listCollection(token, `schools/${schoolId}/passedOutStudents`));
  }
  const remainingUserDocs = await runUsersByRoleQuery(token);

  console.log(`Deleted school student-linked docs: ${deletedSchoolDocs}`);
  console.log(`Deleted student/parent user docs: ${deletedUserDocs}`);
  console.log(`Deleted Firebase Auth users: ${deletedAuthUsers}`);
  console.log(`Remaining active students: ${remainingActiveStudents.length}`);
  console.log(`Remaining passed-out students: ${remainingPassedOutStudents.length}`);
  console.log(`Remaining student/parent user docs: ${remainingUserDocs.length}`);
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
