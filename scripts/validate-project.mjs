import { access, readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const jsonFiles = ["capacitor.config.json", "firebase.json", "manifest.webmanifest", "update.json", "version.json"];
const localAssetPattern = /(?:src|href)=["']([^"'#?]+)["']/gi;
const ignoredTargets = new Set(["/", "#"]);
let failures = 0;
const parsedJson = new Map();

async function exists(target) {
  try {
    await access(target);
    return true;
  } catch {
    return false;
  }
}

async function findRootHtmlPages() {
  const entries = await readdir(root, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".html"))
    .map((entry) => entry.name)
    .sort((left, right) => left.localeCompare(right));
}

function fail(message) {
  failures += 1;
  console.error(`✗ ${message}`);
}

for (const file of jsonFiles) {
  try {
    parsedJson.set(file, JSON.parse(await readFile(path.join(root, file), "utf8")));
    console.log(`✓ Valid JSON: ${file}`);
  } catch (error) {
    fail(`Invalid JSON in ${file}: ${error.message}`);
  }
}

const updateManifest = parsedJson.get("update.json");
const versionManifest = parsedJson.get("version.json");
if (updateManifest && versionManifest && JSON.stringify(updateManifest) !== JSON.stringify(versionManifest)) {
  fail("update.json and version.json must publish the same release metadata.");
} else if (updateManifest && versionManifest) {
  console.log("✓ Release manifests are synchronized");
}

if (updateManifest) {
  if (!Number.isInteger(updateManifest.versionCode) || updateManifest.versionCode < 1) {
    fail("Release versionCode must be a positive integer.");
  }
  if (!/^\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?$/.test(String(updateManifest.versionName || ""))) {
    fail("Release versionName must use semantic versioning (for example 1.2.3).");
  }
  if (!/^https:\/\//i.test(String(updateManifest.apkUrl || ""))) {
    fail("Release apkUrl must use HTTPS.");
  }
}

const webManifest = parsedJson.get("manifest.webmanifest");
if (webManifest) {
  for (const field of ["name", "short_name", "start_url", "display", "theme_color", "background_color"]) {
    if (!String(webManifest[field] || "").trim()) fail(`Web manifest is missing ${field}.`);
  }
  const icons = Array.isArray(webManifest.icons) ? webManifest.icons : [];
  if (!icons.length) {
    fail("Web manifest must declare at least one application icon.");
  }
  for (const icon of icons) {
    const source = String(icon?.src || "").trim();
    if (!source || /^(?:https?:|data:)/i.test(source)) continue;
    if (!(await exists(path.resolve(root, source.replace(/^\//, ""))))) {
      fail(`Web manifest references a missing icon: ${source}`);
    }
  }
  for (const target of [webManifest.start_url, ...(webManifest.shortcuts || []).map((shortcut) => shortcut?.url)]) {
    const url = String(target || "").trim();
    if (!url || /^(?:https?:|data:)/i.test(url)) continue;
    if (!(await exists(path.resolve(root, url.replace(/^\//, ""))))) {
      fail(`Web manifest references a missing route: ${url}`);
    }
  }
}

const entryPages = await findRootHtmlPages();
if (!entryPages.length) fail("No HTML entry pages were found at the project root.");

for (const page of entryPages) {
  const target = path.join(root, page);
  if (!(await exists(target))) {
    fail(`Missing entry page: ${page}`);
    continue;
  }

  const html = await readFile(target, "utf8");
  const seen = new Set();
  for (const match of html.matchAll(localAssetPattern)) {
    const reference = match[1].trim();
    if (!reference || reference.includes("${") || ignoredTargets.has(reference) || /^(?:https?:|data:|blob:|mailto:|tel:|javascript:)/i.test(reference)) continue;
    const asset = path.resolve(path.dirname(target), reference.replace(/^\//, ""));
    if (!seen.has(asset) && !(await exists(asset))) fail(`${page} references a missing local asset: ${reference}`);
    seen.add(asset);
  }
  console.log(`✓ Local assets checked: ${page}`);
}

if (failures) {
  console.error(`\nValidation failed with ${failures} issue${failures === 1 ? "" : "s"}.`);
  process.exitCode = 1;
} else {
  console.log("\nProject validation passed.");
}
