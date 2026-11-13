import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(process.cwd(), process.argv[2] || "hosting");
const browserFile = /\.(?:html|js|mjs|cjs|css|json|webmanifest)$/i;
const forbidden = [
  { label: "Google API key", pattern: /AIza[0-9A-Za-z_-]{20,}/ },
  { label: "Supabase JWT key", pattern: /eyJ[a-zA-Z0-9_-]{20,}\.[a-zA-Z0-9_-]{10,}\.[a-zA-Z0-9_-]{10,}/ },
  { label: "Supabase service-role reference", pattern: /(?:SUPABASE_)?SERVICE_ROLE_KEY\s*[:=]/i },
  { label: "direct Supabase endpoint", pattern: /https:\/\/[^\s"']+\.supabase\.co/i },
];

async function filesIn(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? filesIn(target) : [target];
  }));
  return nested.flat();
}

const target = await stat(root).catch(() => null);
if (!target?.isDirectory()) {
  throw new Error(`Browser bundle directory not found: ${root}`);
}

const failures = [];
for (const file of (await filesIn(root)).filter((item) => browserFile.test(item))) {
  const source = await readFile(file, "utf8");
  for (const check of forbidden) {
    if (check.pattern.test(source)) failures.push(`${path.relative(root, file)} contains a ${check.label}`);
  }
}

if (failures.length) {
  console.error("Browser credential audit failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exitCode = 1;
} else {
  console.log("Browser credential audit passed.");
}
