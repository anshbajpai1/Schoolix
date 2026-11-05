import { mkdir, copyFile, rm, access, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const args = process.argv.slice(2);
const outArg = args.find((arg) => arg.startsWith("--out="));
const out = path.join(root, outArg ? outArg.slice("--out=".length) : "www");
const keepWebLoader = args.includes("--web-loader");

const files = [
  "404.html",
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
  "subjects.html",
  "subjects.css",
  "subjects-ops.js",
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
  "robots.txt",
  "sitemap.xml",
  "update.json",
  "version.json",
  "schoolix-app-icon.svg",
  "schoolix-app.css",
  "schoolix-erp.css",
  "schoolix-app.js",
  "schoolix-maplibre.js",
  "schoolix-transport.js",
  "schoolix-polish.css",
  "schoolix-portal-dark.css",
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

const siteOrigin = "https://schoolix-48107.web.app";
const pageSeo = {
  "404.html": ["Page Not Found | Schoolix", "The requested Schoolix page could not be found. Return to the secure Schoolix sign-in page."],
  "accountant-attendance.html": ["Accountant Attendance | Schoolix", "Review accountant attendance, check-in history, and verified attendance records in Schoolix."],
  "accountant-dashboard.html": ["Accountant Dashboard | Schoolix", "Manage school fee operations, attendance, salary records, and account activity from the Schoolix accountant dashboard."],
  "accountant-management.html": ["Accountant Management | Schoolix", "Create and manage accountant profiles, access, and operational details in Schoolix."],
  "accountant-notices.html": ["Accountant Notices | Schoolix", "View school notices and operational updates for accountant users in Schoolix."],
  "accountant-qr-checkin.html": ["Accountant QR Check-In | Schoolix", "Use secure QR check-in for accountant attendance in Schoolix."],
  "accountant-salary.html": ["Accountant Salary Management | Schoolix", "Review and manage accountant salary records, payments, and monthly salary details in Schoolix."],
  "add-student.html": ["Student Admissions and Fees | Schoolix", "Register students, manage admission details, assign fees, record payments, and print receipts in Schoolix."],
  "additional-settings.html": ["Academic Session Settings | Schoolix", "Configure academic sessions, active session controls, and school-level settings in Schoolix."],
  "admin-dashboard.html": ["School Administration Dashboard | Schoolix", "Monitor students, staff, fees, attendance, transport, notices, and school operations from the Schoolix admin dashboard."],
  "admin-report-cards.html": ["Admin Report Card Management | Schoolix", "Generate, review, and manage student report cards from the Schoolix admin workspace."],
  "admin-signup.html": ["School Account Administration | Schoolix", "Create and manage school accounts, subscriptions, access status, and enabled Schoolix features."],
  "admin-timetable.html": ["School Timetable Management | Schoolix", "Build and manage class timetables, teacher assignments, subjects, periods, and sections in Schoolix."],
  "driver-dashboard.html": ["Driver Transport Dashboard | Schoolix", "Access assigned vehicle details, trip controls, and live transport tracking from the Schoolix driver dashboard."],
  "fees-report.html": ["School Fees Reports | Schoolix", "Review fee collections, outstanding dues, daily transactions, payment history, and class-level fee reports in Schoolix."],
  "generate-tc.html": ["Transfer Certificate Management | Schoolix", "Generate, edit, issue, print, and manage student transfer certificates in Schoolix."],
  "index.html": ["Schoolix Sign In | School Management System", "Sign in securely to Schoolix to access school administration, student, teacher, accounts, library, and transport tools."],
  "librarian-attendance.html": ["Librarian Attendance | Schoolix", "Review librarian attendance and verified check-in history in Schoolix."],
  "librarian-notices.html": ["Librarian Notices | Schoolix", "View school notices and operational updates for library users in Schoolix."],
  "library-dashboard.html": ["Library Dashboard | Schoolix", "Monitor library activity, books, attendance, notices, and daily library operations in Schoolix."],
  "library-management.html": ["Library Management | Schoolix", "Manage books, issue and return activity, members, inventory, and library records in Schoolix."],
  "library-qr-checkin.html": ["Library QR Check-In | Schoolix", "Use secure QR check-in for library attendance in Schoolix."],
  "notices.html": ["School Notices Management | Schoolix", "Create, publish, filter, and manage school notices for students, teachers, staff, and operations teams."],
  "notifications.html": ["App Notifications | Schoolix", "Send and manage targeted Schoolix app notifications for students, teachers, staff, drivers, and school users."],
  "offline.html": ["Connection Unavailable | Schoolix", "Schoolix is temporarily offline. Reconnect to continue using your school workspace."],
  "passed-out-students.html": ["Passed Out Students | Schoolix", "Review and manage archived Schoolix student records for passed-out learners and completed academic sessions."],
  "reportcards.html": ["Student Report Card Generator | Schoolix", "Create and manage student report cards, marks, grades, terms, and printable academic results in Schoolix."],
  "reports.html": ["Admin Report Card Records | Schoolix", "Search, review, print, and manage generated student report card records in Schoolix."],
  "reset-password.html": ["Reset Schoolix Password", "Request a secure password reset link for your Schoolix account."],
  "school-accounts.html": ["School Accounts | Schoolix", "Manage school account records, balances, transactions, and financial summaries in Schoolix."],
  "staff-management.html": ["Staff Management | Schoolix", "Create, update, search, and manage school staff profiles and employment records in Schoolix."],
  "student-dashboard.html": ["Student Dashboard | Schoolix", "View attendance, fees, results, notices, timetable, transport, and profile information in the Schoolix student dashboard."],
  "student-notices.html": ["Student Notices | Schoolix", "Open the Schoolix student notices workspace to view current school announcements."],
  "students.html": ["Student Management | Schoolix", "Search, filter, review, and manage active students, attendance, fees, results, sessions, and promotions in Schoolix."],
  "subjects.html": ["Subjects and Teacher Mapping | Schoolix", "Create school subjects and map teachers to subjects for timetable and academic planning in Schoolix."],
  "teacher-dashboard.html": ["Teacher Dashboard | Schoolix", "Manage assigned classes, attendance, marks, report cards, timetable, notices, salary, and student details in Schoolix."],
  "teacher-notices.html": ["Teacher Notices | Schoolix", "Open the Schoolix teacher notices workspace to view current school announcements."],
  "teacher-profile.html": ["Staff Profile | Schoolix", "Review staff profile details, attendance, salary, timetable, and account information in Schoolix."],
  "teachers.html": ["Teacher Operations | Schoolix", "Manage teacher records, assignments, attendance, class responsibilities, and academic operations in Schoolix."],
  "vehicle-management.html": ["School Transport Management | Schoolix", "Manage school vehicles, drivers, routes, student assignments, live trips, and transport tracking in Schoolix."]
};

function escapeAttribute(value) {
  return String(value).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

async function applySeoMetadata() {
  for (const file of htmlFiles) {
    const seo = pageSeo[file];
    if (!seo) continue;
    const target = path.join(out, file);
    try {
      let html = await readFile(target, "utf8");
      const [title, description] = seo;
      const canonicalUrl = file === "index.html" ? `${siteOrigin}/` : `${siteOrigin}/${file}`;
      const robots = file === "index.html" ? "index,follow" : "noindex,nofollow";
      const meta = [
        `<meta name="description" content="${escapeAttribute(description)}">`,
        `<meta name="robots" content="${robots}">`,
        `<link rel="canonical" href="${canonicalUrl}">`,
        `<meta property="og:type" content="website">`,
        `<meta property="og:title" content="${escapeAttribute(title)}">`,
        `<meta property="og:description" content="${escapeAttribute(description)}">`,
        `<meta property="og:url" content="${canonicalUrl}">`
      ].join("\n");

      html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`);
      html = html
        .replace(/\s*<meta\s+name=["']description["'][^>]*>/gi, "")
        .replace(/\s*<meta\s+name=["']robots["'][^>]*>/gi, "")
        .replace(/\s*<link\s+rel=["']canonical["'][^>]*>/gi, "")
        .replace(/\s*<meta\s+property=["']og:(type|title|description|url)["'][^>]*>/gi, "")
        .replace(/<title>[\s\S]*?<\/title>/i, (match) => `${match}\n${meta}`)
        .replace(/<img\b(?![^>]*\balt\s*=)([^>]*)>/gi, '<img alt=""$1>');
      await writeFile(target, html);
    } catch {
      // Optional HTML files are skipped during copy.
    }
  }
}

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

if (!keepWebLoader) await applyMobileLoginTheme();
await applySharedPerformanceHints();
await applySeoMetadata();

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
