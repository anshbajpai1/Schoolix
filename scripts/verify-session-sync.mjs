import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";

const projectRoot = path.resolve(import.meta.dirname, "..");

async function source(file) {
  return readFile(path.join(projectRoot, file), "utf8");
}

function assertIncludes(text, expected, message) {
  assert.ok(text.includes(expected), message || `Expected source to include ${expected}`);
}

function parseModule(code, identifier) {
  // Construction parses the complete module without executing browser/Deno APIs.
  new vm.SourceTextModule(code, { identifier });
}

function inlineModules(html, file) {
  return [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)]
    .filter((match) => /\btype\s*=\s*["']module["']/i.test(match[1]) && !/\bsrc\s*=/i.test(match[1]))
    .map((match, index) => ({ code: match[2], identifier: `${file}#module-${index + 1}` }));
}

const [
  student,
  teacher,
  login,
  compat,
  accessControl,
  appShell,
  edge,
  legacyLogin,
  mainActivity,
  gradle,
  serviceWorker,
  updateText,
  versionText,
] = await Promise.all([
  source("student-dashboard.html"),
  source("teacher-dashboard.html"),
  source("index.html"),
  source("firebase-compat.js"),
  source("access-control.js"),
  source("schoolix-app.js"),
  source("supabase/functions/schoolix-firestore/index.ts"),
  source("supabase/functions/legacy-firebase-login/index.ts"),
  source("android/app/src/main/java/com/schoolix/app/MainActivity.java"),
  source("android/app/build.gradle"),
  source("sw.js"),
  source("update.json"),
  source("version.json"),
]);

for (const [file, code] of [
  ["firebase-compat.js", compat],
  ["access-control.js", accessControl],
  ["schoolix-app.js", appShell],
]) parseModule(code, file);

for (const [file, html] of [
  ["student-dashboard.html", student],
  ["teacher-dashboard.html", teacher],
  ["index.html", login],
]) {
  const modules = inlineModules(html, file);
  assert.ok(modules.length > 0, `${file} must contain an inline module`);
  for (const module of modules) parseModule(module.code, module.identifier);
}

assertIncludes(student, "loadStudentData({ forceSessionRefresh: true })", "Student refresh/resume must force session reload");
assertIncludes(student, 'window.addEventListener("schoolix:app-resume"', "Student panel must handle native resume");
assertIncludes(student, "setSelectedSessionFromSettings", "Student active-session labels and IDs must be resolved");
assert.ok(!student.includes("ensureFallbackSessions"), "Student panel must use only the school's canonical session collection");
assert.match(
  student,
  /if \(!profile \|\| !linkedSchoolId\(profile\)\) \{\s*clearSession\(\);\s*state\.session = null;/,
  "Student recovery must reject a missing or school-less authenticated profile"
);
assert.match(
  student,
  /if \(!state\.activeSessionId && !state\.activeSessionLabel\) return false;/,
  "Student records must fail closed when no session is verified"
);

assertIncludes(teacher, "loadSessions({ force: true })", "Teacher refresh/resume must force session reload");
assertIncludes(teacher, 'window.addEventListener("schoolix:app-resume"', "Teacher panel must handle native resume");
assertIncludes(teacher, "refreshTeacherProfileContext", "Teacher school context must be re-resolved");
assertIncludes(teacher, "sessionContextReady", "Teacher reads and writes must require a validated session context");
assertIncludes(teacher, 'requireValidatedTeacherSession("save attendance")', "Teacher attendance writes must fail closed");
assertIncludes(teacher, 'requireValidatedTeacherSession("save marks")', "Teacher marks writes must fail closed");

const loginAuthHandler = login.slice(login.lastIndexOf("onAuthStateChanged(auth"));
assert.ok(
  loginAuthHandler.indexOf("const savedStudentSession = loadStudentSession()") >= 0
    && loginAuthHandler.indexOf("clearStudentSession()") > loginAuthHandler.indexOf("const savedStudentSession = loadStudentSession()")
    && !loginAuthHandler.includes('window.location.href = "student-dashboard.html"'),
  "An unauthenticated cached student session must be cleared instead of redirected"
);
assertIncludes(login, "buildStudentSession(user, data, adminData", "Every student redirect must store a complete session");
assertIncludes(compat, "clearFirestoreReadCache", "A forced panel refresh must be able to bypass the RPC cache");
assertIncludes(compat, "identityKeys.size === 1", "Migrated duplicate profiles must be resolved only when unambiguous");
assertIncludes(compat, "rpcReadGeneration += 1", "Forced refresh must invalidate completed and in-flight RPC generations");
assertIncludes(edge, "selectUnambiguousProfile", "Backend authorization must share deterministic profile resolution");
assertIncludes(legacyLogin, "app_metadata", "Legacy login must synchronize both metadata stores");
assertIncludes(appShell, "registration.unregister()", "Native builds must remove stale service workers");
assertIncludes(mainActivity, "new CustomEvent('schoolix:app-resume')", "Android resume must notify both dashboards");
assertIncludes(serviceWorker, "school-session-sync-20260810-v15b", "The service-worker import must be cache-busted for existing installs");

const update = JSON.parse(updateText);
const version = JSON.parse(versionText);
assert.deepEqual(update, version, "update.json and version.json must stay identical");
const gradleCode = Number(gradle.match(/versionCode\s+(\d+)/)?.[1]);
const gradleName = gradle.match(/versionName\s+"([^"]+)"/)?.[1];
assert.equal(update.versionCode, gradleCode, "Android and update metadata version codes must match");
assert.equal(update.versionName, gradleName, "Android and update metadata version names must match");

for (const file of ["firebase-compat.js", "access-control.js", "schoolix-app.js", "sw.js"]) {
  const [rootCode, mobileCode, androidCode, hostingCode] = await Promise.all([
    source(file),
    source(`www/${file}`),
    source(`android/app/src/main/assets/public/${file}`),
    source(`hosting/${file}`),
  ]);
  assert.equal(mobileCode, rootCode, `${file} must be copied into www`);
  assert.equal(androidCode, mobileCode, `${file} must be synced into the Android bundle`);
  assert.equal(hostingCode, rootCode, `${file} must be copied into hosting`);
}

for (const file of ["index.html", "student-dashboard.html", "teacher-dashboard.html"]) {
  const [rootHtml, mobileHtml, androidHtml, hostingHtml] = await Promise.all([
    source(file),
    source(`www/${file}`),
    source(`android/app/src/main/assets/public/${file}`),
    source(`hosting/${file}`),
  ]);
  const moduleSources = (html) => inlineModules(html, file).map((entry) => entry.code);
  assert.deepEqual(moduleSources(mobileHtml), moduleSources(rootHtml), `${file} module must be copied into www`);
  assert.deepEqual(moduleSources(androidHtml), moduleSources(mobileHtml), `${file} module must be synced into Android`);
  assert.deepEqual(moduleSources(hostingHtml), moduleSources(rootHtml), `${file} module must be copied into hosting`);
}

console.log("Session sync verification passed.");
