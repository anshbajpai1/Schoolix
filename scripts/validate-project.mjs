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

const capacitorConfig = parsedJson.get("capacitor.config.json");
if (capacitorConfig) {
  const appId = String(capacitorConfig.appId || "").trim();
  if (!appId) {
    fail("Capacitor config must declare an Android application id.");
  } else {
    try {
      const gradle = await readFile(path.join(root, "android", "app", "build.gradle"), "utf8");
      const androidAppId = gradle.match(/applicationId\s+[\"']([^\"']+)[\"']/)?.[1];
      if (androidAppId !== appId) {
        fail(`Android applicationId must match Capacitor appId (${appId}).`);
      }
    } catch (error) {
      fail(`Unable to validate Android application id: ${error.message}`);
    }
  }
}

for (const file of ["sw.js", "schoolix-app.js"]) {
  if (!(await exists(path.join(root, file)))) fail(`Missing required offline-support file: ${file}`);
}

const firebaseConfig = parsedJson.get("firebase.json");
if (firebaseConfig) {
  if (firebaseConfig.hosting?.public !== "hosting") fail("Firebase Hosting must publish the generated hosting directory.");
  const headers = firebaseConfig.hosting?.headers || [];
  const serviceWorkerHeaders = headers.find((rule) => rule.source === "/sw.js")?.headers || [];
  const cacheControl = serviceWorkerHeaders.find((header) => header.key?.toLowerCase() === "cache-control")?.value || "";
  if (!/no-cache/i.test(cacheControl)) fail("Service worker responses must not be served from a stale cache.");
}

try {
  const gitignore = await readFile(path.join(root, ".gitignore"), "utf8");
  for (const rule of [".env", "*service-account*.json", "android/app/google-services.json"]) {
    if (!gitignore.includes(rule)) fail(`.gitignore must protect ${rule}.`);
  }
} catch (error) {
  fail(`Unable to read .gitignore: ${error.message}`);
}

try {
  const robots = await readFile(path.join(root, "robots.txt"), "utf8");
  const sitemap = await readFile(path.join(root, "sitemap.xml"), "utf8");
  const sitemapUrl = robots.match(/^Sitemap:\s*(\S+)$/im)?.[1];
  if (!sitemapUrl) fail("robots.txt must declare the sitemap URL.");
  if (!/<urlset\b/i.test(sitemap)) fail("sitemap.xml must contain a URL set.");
} catch (error) {
  fail(`Unable to validate search-discovery files: ${error.message}`);
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
  if (!/<html\b[^>]*\blang\s*=/i.test(html)) fail(`${page} is missing a document language.`);
  if (!/<meta\s+charset\s*=\s*["']?utf-8/i.test(html)) fail(`${page} is missing a UTF-8 charset declaration.`);
  if (!/<meta\s+name\s*=\s*["']viewport["']/i.test(html)) fail(`${page} is missing a responsive viewport declaration.`);
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
