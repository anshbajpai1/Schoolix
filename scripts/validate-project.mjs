import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const jsonFiles = ["capacitor.config.json", "firebase.json", "manifest.webmanifest", "update.json", "version.json"];
const entryPages = ["index.html", "offline.html", "404.html"];
const localAssetPattern = /(?:src|href)=["']([^"'#?]+)["']/gi;
const ignoredTargets = new Set(["/", "#"]);
let failures = 0;

async function exists(target) {
  try {
    await access(target);
    return true;
  } catch {
    return false;
  }
}

function fail(message) {
  failures += 1;
  console.error(`✗ ${message}`);
}

for (const file of jsonFiles) {
  try {
    JSON.parse(await readFile(path.join(root, file), "utf8"));
    console.log(`✓ Valid JSON: ${file}`);
  } catch (error) {
    fail(`Invalid JSON in ${file}: ${error.message}`);
  }
}

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
    if (!reference || ignoredTargets.has(reference) || /^(?:https?:|data:|blob:|mailto:|tel:|javascript:)/i.test(reference)) continue;
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
