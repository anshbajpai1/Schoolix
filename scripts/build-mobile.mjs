import { mkdir, copyFile, rm, access, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const args = process.argv.slice(2);
const outArg = args.find((arg) => arg.startsWith("--out="));
const out = path.join(root, outArg ? outArg.slice("--out=".length) : "www");
const keepWebLoader = args.includes("--web-loader");

const files = [
  "index.html",
  "add-student.html",
  "additional-settings.html",
  "admin-dashboard.html",
  "accountant-dashboard.html",
  "accountant-qr-checkin.html",
  "accountant-attendance.html",
  "accountant-management.html",
  "accountant-salary.html",
  "school-accounts.html",
  "accounts-ledger.js",
  "admin-report-cards.html",
  "admin-signup.html",
  "admin-timetable.html",
  "fees-report.html",
  "students.html",
  "teachers.html",
  "teacher-profile.html",
  "teacher-profile.css",
  "teacher-profile.js",
  "staff-management.html",
  "reports.html",
  "reportcards.html",
  "library-dashboard.html",
  "library-qr-checkin.html",
  "librarian-attendance.html",
  "library-management.html",
  "notifications.html",
  "notices.html",
  "student-notices.html",
  "driver-dashboard.html",
  "teacher-notices.html",
  "librarian-notices.html",
  "accountant-notices.html",
  "accountant-portal.css",
  "accountant-portal.js",
  "library-portal.css",
  "library-portal.js",
  "staff-qr-checkin.js",
  "notice-board.css",
  "notice-board.js",
  "notice-panel.css",
  "notice-panel.js",
  "orders.html",
  "reset-password.html",
  "vehicle-management.html",
  "generate-tc.html",
  "passed-out-students.html",
  "student-dashboard.html",
  "teacher-dashboard.html",
  "offline.html",
  "manifest.webmanifest",
  "update.json",
  "version.json",
  "schoolix-app-icon.svg",
  "schoolix-app.css",
  "schoolix-erp.css",
  "schoolix-app.js",
  "schoolix-maplibre.js",
  "schoolix-transport.js",
  "schoolix-polish.css",
  "schoolix-polish.js",
  "admin-shell.css",
  "admin-shell.js",
  "sw.js",
  "school-branding.js",
  "access-control.js",
  "firebase.js",
  "firebase-compat.js",
  "supabase-config.js",
  "icons.svg",
  "schoolix-theme.css",
  "teachers-ops.css",
  "teachers-ops.js",
  "style.css"
];

const optionalAssets = new Set([
  "orders.html"
]);

const htmlFiles = files.filter((file) => file.endsWith(".html"));
const mobileNativeSplashFlag = '<script>window.SchoolixDisablePageLoader = true;</script>';
const criticalLoaderScriptPattern = /\s*<script id="sxCriticalLoaderScript">[\s\S]*?<\/script>\s*/i;
const criticalLoaderStylePattern = /\s*<style id="sxCriticalLoaderStyle">[\s\S]*?<\/style>\s*/i;
const pageLoaderMarkupPattern = /\s*<div id="sxPageLoader" class="sx-page-loader"[^>]*>[\s\S]*?<\/section>\s*<\/div>\s*/i;
const earlyLoaderTimeoutPattern = /setTimeout\(emergencyHide,\s*3200\);/g;
const supabasePerformanceHints = [
  '<link rel="preconnect" href="https://ezkmeedcqetztkeppxil.supabase.co" crossorigin>',
  '<link rel="dns-prefetch" href="//ezkmeedcqetztkeppxil.supabase.co">'
].join("\n");

async function applyMobileNativeSplashMode() {
  for (const file of htmlFiles) {
    const target = path.join(out, file);
    try {
      let html = await readFile(target, "utf8");
      html = html
        .replace(criticalLoaderScriptPattern, "\n")
        .replace(criticalLoaderStylePattern, "\n")
        .replace(pageLoaderMarkupPattern, "\n");

      if (!html.includes("SchoolixDisablePageLoader")) {
        html = html.replace(/<head>/i, `<head>\n${mobileNativeSplashFlag}`);
      }

      await writeFile(target, html);
    } catch {
      // Some configured mobile files are optional and skipped during copy.
    }
  }
}

async function applyMobileLoginTheme() {
  const target = path.join(out, "index.html");
  try {
    let html = await readFile(target, "utf8");
    html = html.replace(
      /<body\s+class="([^"]*\bsx-login-app\b[^"]*)"/i,
      (_match, classes) => {
        const classList = new Set(String(classes).split(/\s+/).filter(Boolean));
        classList.add("is-native-app");
        return `<body class="${[...classList].join(" ")}"`;
      }
    );
    await writeFile(target, html);
  } catch {
    // Login page is required in normal builds, but skipped here if the copy failed.
  }
}

async function applySharedPerformanceHints() {
  for (const file of htmlFiles) {
    const target = path.join(out, file);
    try {
      let html = await readFile(target, "utf8");
      html = html.replace(earlyLoaderTimeoutPattern, "setTimeout(emergencyHide, 1400);");
      if (!html.includes("ezkmeedcqetztkeppxil.supabase.co")) {
        html = html.replace(/<head>/i, `<head>\n${supabasePerformanceHints}`);
      }
      await writeFile(target, html);
    } catch {
      // Optional HTML files are skipped during copy.
    }
  }
}

await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });

let copiedCount = 0;
for (const file of files) {
  const source = path.join(root, file);
  try {
    await access(source);
    await copyFile(source, path.join(out, file));
    copiedCount += 1;
  } catch {
    if (!optionalAssets.has(file)) {
      console.warn(`Skipped missing asset: ${file}`);
    }
  }
}

if (!keepWebLoader) {
  await applyMobileNativeSplashMode();
  await applyMobileLoginTheme();
}
await applySharedPerformanceHints();

if (!args.includes("--skip-apk")) {
  const apkSource = path.join(root, "dist", "Schoolix-download");
  const namedApkSource = path.join(root, "dist", "Schoolix.apk");
  const apkTargetDir = path.join(out, "dist");
  try {
    await access(apkSource);
    await mkdir(apkTargetDir, { recursive: true });
    await copyFile(apkSource, path.join(apkTargetDir, "Schoolix-download"));
    try {
      await access(namedApkSource);
      await copyFile(namedApkSource, path.join(apkTargetDir, "Schoolix.apk"));
    } catch {
      await copyFile(apkSource, path.join(apkTargetDir, "Schoolix.apk"));
    }
  } catch {
    // APK download artifact is optional for local web-only builds.
  }
}

console.log(`Copied ${copiedCount} web assets to ${path.relative(root, out)}`);
