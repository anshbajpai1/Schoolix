import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const PUBLIC_ENV_KEYS = [];

const PLACEHOLDERS = {
  SCHOOLIX_ANDROID_FIREBASE_API_KEY: "__SCHOOLIX_ANDROID_FIREBASE_API_KEY__"
};

function parseEnv(text = "") {
  const values = {};
  for (const rawLine of String(text).split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const separator = line.indexOf("=");
    if (separator < 1) continue;
    const key = line.slice(0, separator).trim();
    let value = line.slice(separator + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    values[key] = value;
  }
  return values;
}

export async function loadRuntimeEnv(root = process.cwd()) {
  let fileValues = {};
  try {
    fileValues = parseEnv(await readFile(path.join(root, ".env"), "utf8"));
  } catch (error) {
    if (error?.code !== "ENOENT") throw error;
  }
  return { ...fileValues, ...process.env };
}

export function requirePublicRuntimeEnv(env = {}) {
  const missing = PUBLIC_ENV_KEYS.filter((key) => !String(env[key] || "").trim());
  if (missing.length) {
    throw new Error(`Missing runtime environment values: ${missing.join(", ")}. Copy .env.example to .env and provide the values.`);
  }
}

export function injectRuntimeEnv(text, env = {}) {
  let output = String(text);
  for (const [key, placeholder] of Object.entries(PLACEHOLDERS)) {
    output = output.replaceAll(placeholder, String(env[key] || ""));
  }
  return output;
}

export async function prepareAndroidGoogleServices(root = process.cwd(), env = null) {
  const runtimeEnv = env || await loadRuntimeEnv(root);
  if (!String(runtimeEnv.SCHOOLIX_ANDROID_FIREBASE_API_KEY || "").trim()) {
    throw new Error("Missing SCHOOLIX_ANDROID_FIREBASE_API_KEY. Copy .env.example to .env and provide the Android-restricted key.");
  }
  const templatePath = path.join(root, "android", "app", "google-services.json.example");
  const outputPath = path.join(root, "android", "app", "google-services.json");
  const template = await readFile(templatePath, "utf8");
  await writeFile(outputPath, injectRuntimeEnv(template, runtimeEnv), "utf8");
  return outputPath;
}

export { PLACEHOLDERS, PUBLIC_ENV_KEYS };
