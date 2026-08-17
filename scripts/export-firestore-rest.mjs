import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const PROJECT_ID = process.env.FIREBASE_PROJECT_ID || "schoolix-48107";
const OUT_FILE = process.env.OUT_FILE || "firestore-export.json";
const CONFIG_PATH = path.join(os.homedir(), ".config", "configstore", "firebase-tools.json");

function readFirebaseAccessToken() {
  const config = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf8"));
  const token = config?.tokens?.access_token;
  if (!token) throw new Error("Firebase CLI access token not found. Run firebase login first.");
  return token;
}

function decodeValue(value) {
  if (!value || typeof value !== "object") return null;
  if ("nullValue" in value) return null;
  if ("stringValue" in value) return value.stringValue;
  if ("booleanValue" in value) return Boolean(value.booleanValue);
  if ("integerValue" in value) return Number(value.integerValue);
  if ("doubleValue" in value) return Number(value.doubleValue);
  if ("timestampValue" in value) return value.timestampValue;
  if ("arrayValue" in value) return (value.arrayValue.values || []).map(decodeValue);
  if ("mapValue" in value) return decodeFields(value.mapValue.fields || {});
  if ("geoPointValue" in value) return value.geoPointValue;
  if ("bytesValue" in value) return value.bytesValue;
  if ("referenceValue" in value) return value.referenceValue;
  return null;
}

function decodeFields(fields = {}) {
  return Object.fromEntries(Object.entries(fields).map(([key, value]) => [key, decodeValue(value)]));
}

function documentPath(documentName) {
  const marker = "/documents/";
  return documentName.slice(documentName.indexOf(marker) + marker.length);
}

async function firestoreFetch(url, token, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(`${response.status} ${data.error?.message || response.statusText}`);
  return data;
}

async function listCollectionIds(parentPath, token) {
  const url = parentPath
    ? `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/${parentPath}:listCollectionIds`
    : `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents:listCollectionIds`;
  const ids = [];
  let pageToken = "";
  do {
    const data = await firestoreFetch(url, token, {
      method: "POST",
      body: JSON.stringify({ pageSize: 300, pageToken }),
    });
    ids.push(...(data.collectionIds || []));
    pageToken = data.nextPageToken || "";
  } while (pageToken);
  return ids;
}

async function listDocuments(collectionPath, token) {
  const url = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/${collectionPath}`;
  const docs = [];
  let pageToken = "";
  do {
    const pageUrl = `${url}?pageSize=300${pageToken ? `&pageToken=${encodeURIComponent(pageToken)}` : ""}`;
    const data = await firestoreFetch(pageUrl, token);
    docs.push(...(data.documents || []));
    pageToken = data.nextPageToken || "";
  } while (pageToken);
  return docs;
}

async function walkCollection(collectionPath, token, rows) {
  const docs = await listDocuments(collectionPath, token);
  for (const doc of docs) {
    const path = documentPath(doc.name);
    rows.push({
      path,
      createTime: doc.createTime || null,
      updateTime: doc.updateTime || null,
      data: decodeFields(doc.fields || {}),
    });
    const children = await listCollectionIds(path, token);
    for (const child of children) {
      await walkCollection(`${path}/${child}`, token, rows);
    }
  }
}

const token = readFirebaseAccessToken();
const roots = await listCollectionIds("", token);
const rows = [];
for (const root of roots) {
  console.log(`Exporting ${root}...`);
  await walkCollection(root, token, rows);
}

fs.writeFileSync(OUT_FILE, JSON.stringify({ projectId: PROJECT_ID, exportedAt: new Date().toISOString(), documents: rows }, null, 2));
console.log(`Exported ${rows.length} documents to ${OUT_FILE}`);
