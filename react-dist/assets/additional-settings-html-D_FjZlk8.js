const e={file:"additional-settings.html",title:"Additional Settings — Sessions",htmlClass:"",bodyClass:"sx-settings-app",body:`\r
<div id="sxPageLoader" class="sx-page-loader" role="status" aria-live="polite">\r
  <section class="dots-container" aria-label="Loading page">\r
    <div class="dot"></div>\r
    <div class="dot"></div>\r
    <div class="dot"></div>\r
    <div class="dot"></div>\r
    <div class="dot"></div>\r
  </section>\r
</div>\r
<div class="shell">\r
  <!-- Header -->\r
  <div class="card page-header">\r
    <div>\r
      <div class="page-title">Academic <span>Settings</span></div>\r
      <div style="color:var(--muted);font-size:13px;margin-top:4px;">Manage sessions, class locks, active academic year, and report-card test terms from one admin workspace.</div>\r
    </div>\r
    <span class="badge-pill">Settings</span>\r
  </div>\r
\r
  <!-- Add Session -->\r
  <div class="card">\r
    <h3>New Session</h3>\r
    <div class="form-row">\r
      <div class="field">\r
        <label>Start Year</label>\r
        <input type="number" id="startYear" placeholder="2024" min="2000" max="2099">\r
      </div>\r
      <div class="field">\r
        <label>End Year</label>\r
        <input type="number" id="endYear" placeholder="2025" min="2000" max="2099">\r
      </div>\r
    </div>\r
    <button class="btn btn-primary" onclick="saveSession()">Save Session</button>\r
    <div class="status-msg" id="status"></div>\r
  </div>\r
\r
  <!-- Sessions List -->\r
  <div class="card">\r
    <h3>All Sessions</h3>\r
    <div class="session-list" id="sessionList">\r
      <div class="empty-state">Loading sessions…</div>\r
    </div>\r
  </div>\r
  <!-- Test Terms -->\r
  <div class="card">\r
    <div class="term-toolbar">\r
      <div>\r
        <h3 style="margin-bottom:6px;">Class Wise Test Terms</h3>\r
        <div class="hint-text">Create terms for tests from the admin panel. Terms are tied to the selected session and reset when the session changes.</div>\r
      </div>\r
      <div class="field">\r
        <label for="termSessionSelect">Session</label>\r
        <select id="termSessionSelect" onchange="loadTerms()">\r
          <option value="">Loading sessions...</option>\r
        </select>\r
      </div>\r
    </div>\r
    <div class="form-row three">\r
      <div class="field">\r
        <label for="termClassSelect">Class</label>\r
        <select id="termClassSelect">\r
          <option value="">Select class</option>\r
        </select>\r
      </div>\r
      <div class="field">\r
        <label for="termSectionSelect">Section</label>\r
        <select id="termSectionSelect">\r
          <option value="">All sections</option>\r
        </select>\r
      </div>\r
      <div class="field">\r
        <label for="termNameInput">Term Name</label>\r
        <input type="text" id="termNameInput" placeholder="Term 1 / Mid Term / Final">\r
      </div>\r
    </div>\r
    <button class="btn btn-primary" onclick="saveTerm()">Save Term</button>\r
    <div class="status-msg" id="termStatus"></div>\r
    <div class="term-list" id="termList">\r
      <div class="empty-state">Select a session to load terms.</div>\r
    </div>\r
  </div>\r
</div>\r
\r
<script src="school-branding.js"><\/script>\r
<script type="module">\r
import { initializeApp } from "./firebase-compat.js";\r
import {\r
  getFirestore, collection, addDoc, getDocs, doc, setDoc, getDoc, deleteDoc, updateDoc, serverTimestamp\r
} from "./firebase-compat.js";\r
import { getAuth, onAuthStateChanged } from "./firebase-compat.js";\r
\r
const firebaseConfig = {\r
  apiKey: "AIzaSyAomGwef93HFT9Xyx7SVW95FPw_IcIAICE",\r
  authDomain: "schoolix-48107.firebaseapp.com",\r
  projectId: "schoolix-48107",\r
};\r
const app = initializeApp(firebaseConfig);\r
const db = getFirestore(app);\r
const auth = getAuth(app);\r
\r
let currentUser = null;\r
let activeSessionId = null;\r
let currentAdminProfile = {};\r
let allSessions = [];\r
\r
const CLASS_LIST = ["PG", "LKG", "UKG", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];\r
const ALL_SECTIONS = Array.from({ length: 26 }, (_, index) => String.fromCharCode(65 + index));\r
\r
function escapeHtml(value) {\r
  return String(value ?? "")\r
    .replace(/&/g, "&amp;")\r
    .replace(/</g, "&lt;")\r
    .replace(/>/g, "&gt;")\r
    .replace(/"/g, "&quot;")\r
    .replace(/'/g, "&#39;");\r
}\r
\r
function getSessionLabel(session) {\r
  return session?.session || session?.name || "";\r
}\r
\r
function normalizeReportTerm(term) {\r
  return String(term || "").trim();\r
}\r
\r
function getReportTermKey(term) {\r
  return normalizeReportTerm(term).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");\r
}\r
\r
function getClassKey(cls) {\r
  return String(cls || "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "class";\r
}\r
\r
function getSectionKey(section) {\r
  return String(section || "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "all";\r
}\r
\r
function getTermDocId(sessionId, cls, section, termKey) {\r
  return \`\${sessionId || "no-session"}__\${getClassKey(cls)}__\${getSectionKey(section)}__\${termKey}\`;\r
}\r
\r
function getSelectedTermSession() {\r
  const sessionId = document.getElementById("termSessionSelect")?.value || activeSessionId || "";\r
  return allSessions.find((session) => session.id === sessionId) || null;\r
}\r
\r
function termBelongsToSelectedTermSession(term) {\r
  const session = getSelectedTermSession();\r
  if (!session) return false;\r
  const label = getSessionLabel(session);\r
  return term.sessionId === session.id ||\r
    term.session === label ||\r
    term.currentYear === label ||\r
    String(term.id || "").startsWith(\`\${session.id}__\`);\r
}\r
\r
function formatClassSection(cls, section) {\r
  if (!cls && !section) return "All classes";\r
  return section ? \`Class \${cls}-\${section}\` : \`Class \${cls} - All sections\`;\r
}\r
\r
function setStatus(id, message, ok = true) {\r
  const el = document.getElementById(id);\r
  if (!el) return;\r
  el.style.color = ok ? "#86efac" : "#fca5a5";\r
  el.textContent = message;\r
}\r
\r
function makeSessionPlacement(student, session, locks = {}) {\r
  const existing = student.sessionPlacements?.[session.id] || {};\r
  const alreadyFrozen = existing.locked === true || existing.classLocked === true;\r
  const source = alreadyFrozen ? existing : student;\r
  const now = Date.now();\r
  const placement = {\r
    ...existing,\r
    sessionId: session.id,\r
    session: getSessionLabel(session),\r
    currentYear: getSessionLabel(session),\r
    class: source.class || "",\r
    section: source.section || "",\r
    roll: source.roll || source.rollNo || "",\r
    updatedAt: now\r
  };\r
\r
  if (locks.locked !== undefined) placement.locked = Boolean(locks.locked);\r
  if (locks.classLocked !== undefined) placement.classLocked = Boolean(locks.classLocked);\r
  if ((locks.locked || locks.classLocked) && !placement.lockedAt) placement.lockedAt = now;\r
  if (!placement.createdAt) placement.createdAt = now;\r
  return placement;\r
}\r
\r
async function writeSessionPlacements(session, locks = {}) {\r
  const snap = await getDocs(collection(db, "schools", currentUser.uid, "students"));\r
  const writes = snap.docs.map((studentDoc) => {\r
    const student = { id: studentDoc.id, ...studentDoc.data() };\r
    const placement = makeSessionPlacement(student, session, locks);\r
    return updateDoc(doc(db, "schools", currentUser.uid, "students", studentDoc.id), {\r
      [\`sessionPlacements.\${session.id}\`]: placement\r
    });\r
  });\r
  await Promise.all(writes);\r
  return writes.length;\r
}\r
\r
function populateTermClassControls() {\r
  const classSelect = document.getElementById("termClassSelect");\r
  const sectionSelect = document.getElementById("termSectionSelect");\r
  if (!classSelect || !sectionSelect) return;\r
  classSelect.innerHTML = \`<option value="">Select class</option>\${CLASS_LIST.map((cls) => \`<option value="\${cls}">\${cls}</option>\`).join("")}\`;\r
  sectionSelect.innerHTML = \`<option value="">All sections</option>\${ALL_SECTIONS.map((section) => \`<option value="\${section}">\${section}</option>\`).join("")}\`;\r
}\r
\r
function populateTermSessionSelect() {\r
  const select = document.getElementById("termSessionSelect");\r
  if (!select) return;\r
  if (!allSessions.length) {\r
    select.innerHTML = \`<option value="">Create a session first</option>\`;\r
    document.getElementById("termList").innerHTML = \`<div class="empty-state">Create a session before adding terms.</div>\`;\r
    return;\r
  }\r
  const sorted = [...allSessions].sort((a, b) => (b.startYear || 0) - (a.startYear || 0));\r
  const preferredSessionId = activeSessionId || select.value || sorted[0]?.id || "";\r
  select.innerHTML = sorted.map((session) => {\r
    const selected = session.id === preferredSessionId ? "selected" : "";\r
    const locked = session.locked ? " (Locked)" : "";\r
    return \`<option value="\${session.id}" \${selected}>\${escapeHtml(getSessionLabel(session) || "Unnamed")}\${locked}</option>\`;\r
  }).join("");\r
}\r
\r
onAuthStateChanged(auth, async (user) => {\r
  if (user) {\r
    const userSnap = await getDoc(doc(db, "users", user.uid));\r
    if (!userSnap.exists() || userSnap.data().role !== "admin") {\r
      alert("Access denied. Only admin can manage sessions and terms.");\r
      window.location.href = "#/index.html";\r
      return;\r
    }\r
    currentUser = user;\r
    currentAdminProfile = userSnap.data();\r
    populateTermClassControls();\r
    await loadActiveSession();\r
    await loadSessions();\r
    await loadTerms();\r
  } else {\r
    alert("Login required.");\r
    window.location.href = "#/index.html";\r
  }\r
});\r
\r
window.saveSession = async function() {\r
  const startYear = document.getElementById("startYear").value;\r
  const endYear = document.getElementById("endYear").value;\r
  const status = document.getElementById("status");\r
  if (!startYear || !endYear) { status.style.color="#fca5a5"; status.textContent="Fill both year fields."; return; }\r
  if (Number(endYear) <= Number(startYear)) { status.style.color="#fca5a5"; status.textContent="End year must be after start year."; return; }\r
  status.textContent = "Saving…";\r
  try {\r
    const sessionRef = await addDoc(collection(db, "schools", currentUser.uid, "sessions"), {\r
      startYear: Number(startYear), endYear: Number(endYear),\r
      session: \`\${startYear}-\${endYear}\`, createdAt: Date.now(), locked: false, classesLocked: false\r
    });\r
    const session = {\r
      id: sessionRef.id,\r
      startYear: Number(startYear),\r
      endYear: Number(endYear),\r
      session: \`\${startYear}-\${endYear}\`,\r
      locked: false,\r
      classesLocked: false\r
    };\r
    const copied = await writeSessionPlacements(session, { locked: false, classLocked: false });\r
    status.style.color = "#86efac";\r
    status.textContent = \`Session \${startYear}-\${endYear} saved. \${copied} student class snapshots copied.\`;\r
    document.getElementById("startYear").value = "";\r
    document.getElementById("endYear").value = "";\r
    await loadSessions();\r
    await loadTerms();\r
  } catch(e) {\r
    status.style.color="#fca5a5"; status.textContent="Failed to save session.";\r
  }\r
};\r
\r
async function loadSessions() {\r
  const list = document.getElementById("sessionList");\r
  list.innerHTML = '<div class="empty-state">Loading…</div>';\r
  const snapshot = await getDocs(collection(db, "schools", currentUser.uid, "sessions"));\r
  list.innerHTML = "";\r
  if (snapshot.empty) {\r
    allSessions = [];\r
    populateTermSessionSelect();\r
    list.innerHTML = '<div class="empty-state">No sessions yet. Create one above.</div>';\r
    return;\r
  }\r
  allSessions = [];\r
  snapshot.forEach(d => allSessions.push({ id: d.id, ...d.data() }));\r
  allSessions.sort((a, b) => (b.startYear || 0) - (a.startYear || 0));\r
  populateTermSessionSelect();\r
  allSessions.forEach(data => {\r
    const id = data.id;\r
    const isActive = id === activeSessionId;\r
    const isLocked = data.locked;\r
    const div = document.createElement("div");\r
    div.className = "session-item" + (isActive ? " active" : "") + (isLocked ? " locked-item" : "");\r
    div.innerHTML = \`\r
      <div class="session-meta">\r
        <div class="session-year">\${data.session}</div>\r
        <div class="session-tags">\r
          \${isActive ? '<span class="tag tag-active">Active</span>' : ""}\r
          \${isLocked ? '<span class="tag tag-locked">Locked</span>' : '<span class="tag tag-open">Open</span>'}\r
          \${data.classesLocked ? '<span class="tag tag-locked">Classes Locked</span>' : ""}\r
        </div>\r
      </div>\r
      <div class="session-actions">\r
        \${!isActive ? \`<button class="btn btn-sm btn-success" onclick="setActive('\${id}')">Set Active</button>\` : ""}\r
        <button class="btn btn-sm btn-warning" onclick="toggleLock('\${id}', \${isLocked})">\${isLocked ? "Unlock" : "Lock"}</button>\r
        <button class="btn btn-sm btn-ghost" onclick="toggleClassLock('\${id}', \${data.classesLocked || false})">\${data.classesLocked ? "Unlock Classes" : "Lock Classes"}</button>\r
        \${!isLocked ? \`<button class="btn btn-sm btn-danger" onclick="deleteSession('\${id}', \${isLocked})">Delete</button>\` : ""}\r
      </div>\r
    \`;\r
    list.appendChild(div);\r
  });\r
}\r
\r
window.setActive = async function(id) {\r
  await setDoc(doc(db, "schools", currentUser.uid, "settings", "activeSession"), { sessionId: id });\r
  activeSessionId = id;\r
  await loadSessions();\r
  await loadTerms();\r
};\r
\r
window.toggleLock = async function(id, currentStatus) {\r
  const action = currentStatus ? "unlock" : "lock";\r
  if (!confirm(\`Are you sure you want to \${action} this session?\r
\${currentStatus ? "Unlocking will allow edits by teachers." : "Locking will make teacher dashboards VIEW ONLY for this session."}\`)) return;\r
  const snap = await getDoc(doc(db, "schools", currentUser.uid, "sessions", id));\r
  if (snap.exists()) {\r
    await writeSessionPlacements({ id, ...snap.data(), locked: !currentStatus }, { locked: !currentStatus });\r
  }\r
  await setDoc(doc(db, "schools", currentUser.uid, "sessions", id), { locked: !currentStatus }, { merge: true });\r
  loadSessions();\r
};\r
\r
window.toggleClassLock = async function(id, currentStatus) {\r
  const action = currentStatus ? "unlock classes for" : "lock classes for";\r
  if (!confirm(\`Are you sure you want to \${action} this session?\r
\${currentStatus ? "Unlocking classes will allow class changes for students in this session." : "Locking classes will prevent any class changes for students in this session."}\`)) return;\r
  const snap = await getDoc(doc(db, "schools", currentUser.uid, "sessions", id));\r
  if (snap.exists()) {\r
    await writeSessionPlacements({ id, ...snap.data(), classesLocked: !currentStatus }, { classLocked: !currentStatus });\r
  }\r
  await setDoc(doc(db, "schools", currentUser.uid, "sessions", id), { classesLocked: !currentStatus }, { merge: true });\r
  loadSessions();\r
};\r
\r
window.saveTerm = async function() {\r
  const session = getSelectedTermSession();\r
  const cls = document.getElementById("termClassSelect").value;\r
  const section = document.getElementById("termSectionSelect").value;\r
  const label = normalizeReportTerm(document.getElementById("termNameInput").value);\r
  const termKey = getReportTermKey(label);\r
\r
  if (!session) return setStatus("termStatus", "Select a session first.", false);\r
  if (session.locked) return setStatus("termStatus", "This session is locked. Unlock it before adding terms.", false);\r
  if (!cls) return setStatus("termStatus", "Select class for this term.", false);\r
  if (!label || !termKey) return setStatus("termStatus", "Enter a valid term name.", false);\r
\r
  const termDocId = getTermDocId(session.id, cls, section, termKey);\r
  const termRef = doc(db, "schools", currentUser.uid, "terms", termDocId);\r
  const existing = await getDoc(termRef);\r
  if (existing.exists()) {\r
    return setStatus("termStatus", "This term already exists for the selected class/session.", false);\r
  }\r
\r
  await setDoc(termRef, {\r
    label,\r
    termKey,\r
    class: cls,\r
    section,\r
    sessionId: session.id,\r
    session: getSessionLabel(session),\r
    createdAt: serverTimestamp(),\r
    updatedAt: serverTimestamp(),\r
    createdBy: currentAdminProfile.name || currentUser.email || currentUser.uid,\r
    createdByRole: "admin"\r
  });\r
\r
  document.getElementById("termNameInput").value = "";\r
  setStatus("termStatus", \`Term "\${label}" saved for \${formatClassSection(cls, section)}.\`);\r
  await loadTerms();\r
};\r
\r
window.loadTerms = async function() {\r
  const list = document.getElementById("termList");\r
  if (!list) return;\r
  const session = getSelectedTermSession();\r
  if (!session) {\r
    list.innerHTML = \`<div class="empty-state">Create a session before adding terms.</div>\`;\r
    return;\r
  }\r
  list.innerHTML = \`<div class="empty-state">Loading terms...</div>\`;\r
  try {\r
    const snapshot = await getDocs(collection(db, "schools", currentUser.uid, "terms"));\r
    const terms = snapshot.docs\r
      .map((termDoc) => ({ id: termDoc.id, ...termDoc.data() }))\r
      .filter(termBelongsToSelectedTermSession)\r
      .sort((a, b) => {\r
        const left = \`\${a.class || ""}\${a.section || ""}\${a.label || a.term || ""}\`;\r
        const right = \`\${b.class || ""}\${b.section || ""}\${b.label || b.term || ""}\`;\r
        return left.localeCompare(right);\r
      });\r
\r
    if (!terms.length) {\r
      list.innerHTML = \`<div class="empty-state">No terms created for this session yet.</div>\`;\r
      return;\r
    }\r
\r
    list.innerHTML = terms.map((term) => {\r
      const label = escapeHtml(term.label || term.term || term.termKey || "Untitled Term");\r
      const sessionLabel = escapeHtml(term.session || getSessionLabel(session) || "Session");\r
      const classLabel = escapeHtml(formatClassSection(term.class || "", term.section || ""));\r
      return \`\r
        <div class="term-item">\r
          <div>\r
            <div class="term-name">\${label}</div>\r
            <div class="term-meta">\${classLabel} | \${sessionLabel}</div>\r
          </div>\r
          <div class="term-actions">\r
            <button class="btn btn-sm btn-danger" onclick="deleteTerm('\${term.id}')">Delete</button>\r
          </div>\r
        </div>\r
      \`;\r
    }).join("");\r
  } catch (error) {\r
    console.error(error);\r
    list.innerHTML = \`<div class="empty-state">Unable to load terms.</div>\`;\r
  }\r
};\r
\r
window.deleteTerm = async function(id) {\r
  if (!confirm("Delete this term? Existing marks and report cards will not be deleted.")) return;\r
  await deleteDoc(doc(db, "schools", currentUser.uid, "terms", id));\r
  setStatus("termStatus", "Term deleted.");\r
  await loadTerms();\r
};\r
\r
async function loadActiveSession() {\r
  const snap = await getDoc(doc(db, "schools", currentUser.uid, "settings", "activeSession"));\r
  if (snap.exists()) activeSessionId = snap.data().sessionId;\r
}\r
\r
window.deleteSession = async function(id, locked) {\r
  if (locked) { alert("Cannot delete a locked session. Unlock it first."); return; }\r
  if (!confirm("Delete this session? This cannot be undone.")) return;\r
  await deleteDoc(doc(db, "schools", currentUser.uid, "sessions", id));\r
  if (activeSessionId === id) {\r
    await deleteDoc(doc(db, "schools", currentUser.uid, "settings", "activeSession"));\r
    activeSessionId = null;\r
  }\r
  await loadSessions();\r
  await loadTerms();\r
};\r
<\/script>\r
<script type="module" src="access-control.js"><\/script>\r
  <script src="schoolix-polish.js" defer><\/script>\r
  <script src="admin-shell.js?v=navbar-20260721" defer><\/script>\r
`,styles:[{tag:"style",attributes:{id:"sxCriticalLoaderStyle"},text:`
html.sx-page-loading,
html.sx-page-loading body {
  min-height: 100%;
  background: #f8fafc !important;
}
html.sx-page-loading body::before,
html.sx-page-loading body::after {
  visibility: hidden !important;
}
html.sx-page-loading body > :not(#sxPageLoader):not(script):not(style) {
  visibility: hidden !important;
}
.sx-page-loader {
  position: fixed;
  inset: 0;
  z-index: 2147482500;
  display: flex;
  align-items: stretch;
  justify-content: stretch;
  background: #f8fafc;
  transition: opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1), visibility 0.25s ease;
  overflow: hidden;
}
.sx-page-loader.is-hidden {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}
.sx-page-loader .dots-container {
  position: fixed;
  inset: 0;
  display: block;
  width: 100vw;
  height: 100vh;
  padding: 0;
  margin: 0;
  overflow: hidden;
  background: #f8fafc;
}
.sx-page-loader .dots-container::before,
.sx-page-loader .dots-container::after,
.sx-page-loader .dot {
  display: none !important;
}
`},{tag:"link",attributes:{rel:"stylesheet",href:"schoolix-erp.css"},text:""},{tag:"link",attributes:{rel:"stylesheet",href:"schoolix-polish.css"},text:""},{tag:"link",attributes:{rel:"stylesheet",href:"admin-shell.css?v=navbar-20260721"},text:""}],scripts:[{attributes:{id:"sxCriticalLoaderScript"},text:`\r
(function () {\r
  var root = document.documentElement;\r
  root.classList.add("sx-page-loading");\r
  window.SchoolixPageLoaderEarly = window.SchoolixPageLoaderEarly || { startedAt: Date.now() };\r
\r
  function markEarlyReady(reason) {\r
    window.SchoolixPageLoaderEarly.ready = true;\r
    window.SchoolixPageLoaderEarly.reason = reason || "dom-ready";\r
    try {\r
      window.dispatchEvent(new CustomEvent("schoolix:critical-load-ready", { detail: window.SchoolixPageLoaderEarly }));\r
    } catch (_) {}\r
  }\r
\r
  function afterFirstPaint(reason) {\r
    requestAnimationFrame(function () {\r
      requestAnimationFrame(function () { markEarlyReady(reason); });\r
    });\r
  }\r
\r
  function emergencyHide() {\r
    if (window.SchoolixPageLoader || !root.classList.contains("sx-page-loading")) return;\r
    root.classList.remove("sx-page-loading");\r
    root.classList.add("sx-page-loaded");\r
    var loader = document.getElementById("sxPageLoader");\r
    if (!loader) return;\r
    loader.classList.add("is-hidden");\r
    setTimeout(function () { loader.remove(); }, 260);\r
  }\r
\r
  if (document.readyState === "loading") {\r
    document.addEventListener("DOMContentLoaded", function () { afterFirstPaint("dom-ready"); }, { once: true });\r
  } else {\r
    afterFirstPaint(document.readyState === "complete" ? "document-complete" : "dom-ready");\r
  }\r
  window.addEventListener("load", function () { markEarlyReady("window-load"); }, { once: true });\r
  setTimeout(emergencyHide, 3200);\r
}());\r
`},{attributes:{src:"school-branding.js"},text:""},{attributes:{type:"module"},text:`\r
import { initializeApp } from "./firebase-compat.js";\r
import {\r
  getFirestore, collection, addDoc, getDocs, doc, setDoc, getDoc, deleteDoc, updateDoc, serverTimestamp\r
} from "./firebase-compat.js";\r
import { getAuth, onAuthStateChanged } from "./firebase-compat.js";\r
\r
const firebaseConfig = {\r
  apiKey: "AIzaSyAomGwef93HFT9Xyx7SVW95FPw_IcIAICE",\r
  authDomain: "schoolix-48107.firebaseapp.com",\r
  projectId: "schoolix-48107",\r
};\r
const app = initializeApp(firebaseConfig);\r
const db = getFirestore(app);\r
const auth = getAuth(app);\r
\r
let currentUser = null;\r
let activeSessionId = null;\r
let currentAdminProfile = {};\r
let allSessions = [];\r
\r
const CLASS_LIST = ["PG", "LKG", "UKG", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];\r
const ALL_SECTIONS = Array.from({ length: 26 }, (_, index) => String.fromCharCode(65 + index));\r
\r
function escapeHtml(value) {\r
  return String(value ?? "")\r
    .replace(/&/g, "&amp;")\r
    .replace(/</g, "&lt;")\r
    .replace(/>/g, "&gt;")\r
    .replace(/"/g, "&quot;")\r
    .replace(/'/g, "&#39;");\r
}\r
\r
function getSessionLabel(session) {\r
  return session?.session || session?.name || "";\r
}\r
\r
function normalizeReportTerm(term) {\r
  return String(term || "").trim();\r
}\r
\r
function getReportTermKey(term) {\r
  return normalizeReportTerm(term).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");\r
}\r
\r
function getClassKey(cls) {\r
  return String(cls || "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "class";\r
}\r
\r
function getSectionKey(section) {\r
  return String(section || "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "all";\r
}\r
\r
function getTermDocId(sessionId, cls, section, termKey) {\r
  return \`\${sessionId || "no-session"}__\${getClassKey(cls)}__\${getSectionKey(section)}__\${termKey}\`;\r
}\r
\r
function getSelectedTermSession() {\r
  const sessionId = document.getElementById("termSessionSelect")?.value || activeSessionId || "";\r
  return allSessions.find((session) => session.id === sessionId) || null;\r
}\r
\r
function termBelongsToSelectedTermSession(term) {\r
  const session = getSelectedTermSession();\r
  if (!session) return false;\r
  const label = getSessionLabel(session);\r
  return term.sessionId === session.id ||\r
    term.session === label ||\r
    term.currentYear === label ||\r
    String(term.id || "").startsWith(\`\${session.id}__\`);\r
}\r
\r
function formatClassSection(cls, section) {\r
  if (!cls && !section) return "All classes";\r
  return section ? \`Class \${cls}-\${section}\` : \`Class \${cls} - All sections\`;\r
}\r
\r
function setStatus(id, message, ok = true) {\r
  const el = document.getElementById(id);\r
  if (!el) return;\r
  el.style.color = ok ? "#86efac" : "#fca5a5";\r
  el.textContent = message;\r
}\r
\r
function makeSessionPlacement(student, session, locks = {}) {\r
  const existing = student.sessionPlacements?.[session.id] || {};\r
  const alreadyFrozen = existing.locked === true || existing.classLocked === true;\r
  const source = alreadyFrozen ? existing : student;\r
  const now = Date.now();\r
  const placement = {\r
    ...existing,\r
    sessionId: session.id,\r
    session: getSessionLabel(session),\r
    currentYear: getSessionLabel(session),\r
    class: source.class || "",\r
    section: source.section || "",\r
    roll: source.roll || source.rollNo || "",\r
    updatedAt: now\r
  };\r
\r
  if (locks.locked !== undefined) placement.locked = Boolean(locks.locked);\r
  if (locks.classLocked !== undefined) placement.classLocked = Boolean(locks.classLocked);\r
  if ((locks.locked || locks.classLocked) && !placement.lockedAt) placement.lockedAt = now;\r
  if (!placement.createdAt) placement.createdAt = now;\r
  return placement;\r
}\r
\r
async function writeSessionPlacements(session, locks = {}) {\r
  const snap = await getDocs(collection(db, "schools", currentUser.uid, "students"));\r
  const writes = snap.docs.map((studentDoc) => {\r
    const student = { id: studentDoc.id, ...studentDoc.data() };\r
    const placement = makeSessionPlacement(student, session, locks);\r
    return updateDoc(doc(db, "schools", currentUser.uid, "students", studentDoc.id), {\r
      [\`sessionPlacements.\${session.id}\`]: placement\r
    });\r
  });\r
  await Promise.all(writes);\r
  return writes.length;\r
}\r
\r
function populateTermClassControls() {\r
  const classSelect = document.getElementById("termClassSelect");\r
  const sectionSelect = document.getElementById("termSectionSelect");\r
  if (!classSelect || !sectionSelect) return;\r
  classSelect.innerHTML = \`<option value="">Select class</option>\${CLASS_LIST.map((cls) => \`<option value="\${cls}">\${cls}</option>\`).join("")}\`;\r
  sectionSelect.innerHTML = \`<option value="">All sections</option>\${ALL_SECTIONS.map((section) => \`<option value="\${section}">\${section}</option>\`).join("")}\`;\r
}\r
\r
function populateTermSessionSelect() {\r
  const select = document.getElementById("termSessionSelect");\r
  if (!select) return;\r
  if (!allSessions.length) {\r
    select.innerHTML = \`<option value="">Create a session first</option>\`;\r
    document.getElementById("termList").innerHTML = \`<div class="empty-state">Create a session before adding terms.</div>\`;\r
    return;\r
  }\r
  const sorted = [...allSessions].sort((a, b) => (b.startYear || 0) - (a.startYear || 0));\r
  const preferredSessionId = activeSessionId || select.value || sorted[0]?.id || "";\r
  select.innerHTML = sorted.map((session) => {\r
    const selected = session.id === preferredSessionId ? "selected" : "";\r
    const locked = session.locked ? " (Locked)" : "";\r
    return \`<option value="\${session.id}" \${selected}>\${escapeHtml(getSessionLabel(session) || "Unnamed")}\${locked}</option>\`;\r
  }).join("");\r
}\r
\r
onAuthStateChanged(auth, async (user) => {\r
  if (user) {\r
    const userSnap = await getDoc(doc(db, "users", user.uid));\r
    if (!userSnap.exists() || userSnap.data().role !== "admin") {\r
      alert("Access denied. Only admin can manage sessions and terms.");\r
      window.location.href = "#/index.html";\r
      return;\r
    }\r
    currentUser = user;\r
    currentAdminProfile = userSnap.data();\r
    populateTermClassControls();\r
    await loadActiveSession();\r
    await loadSessions();\r
    await loadTerms();\r
  } else {\r
    alert("Login required.");\r
    window.location.href = "#/index.html";\r
  }\r
});\r
\r
window.saveSession = async function() {\r
  const startYear = document.getElementById("startYear").value;\r
  const endYear = document.getElementById("endYear").value;\r
  const status = document.getElementById("status");\r
  if (!startYear || !endYear) { status.style.color="#fca5a5"; status.textContent="Fill both year fields."; return; }\r
  if (Number(endYear) <= Number(startYear)) { status.style.color="#fca5a5"; status.textContent="End year must be after start year."; return; }\r
  status.textContent = "Saving…";\r
  try {\r
    const sessionRef = await addDoc(collection(db, "schools", currentUser.uid, "sessions"), {\r
      startYear: Number(startYear), endYear: Number(endYear),\r
      session: \`\${startYear}-\${endYear}\`, createdAt: Date.now(), locked: false, classesLocked: false\r
    });\r
    const session = {\r
      id: sessionRef.id,\r
      startYear: Number(startYear),\r
      endYear: Number(endYear),\r
      session: \`\${startYear}-\${endYear}\`,\r
      locked: false,\r
      classesLocked: false\r
    };\r
    const copied = await writeSessionPlacements(session, { locked: false, classLocked: false });\r
    status.style.color = "#86efac";\r
    status.textContent = \`Session \${startYear}-\${endYear} saved. \${copied} student class snapshots copied.\`;\r
    document.getElementById("startYear").value = "";\r
    document.getElementById("endYear").value = "";\r
    await loadSessions();\r
    await loadTerms();\r
  } catch(e) {\r
    status.style.color="#fca5a5"; status.textContent="Failed to save session.";\r
  }\r
};\r
\r
async function loadSessions() {\r
  const list = document.getElementById("sessionList");\r
  list.innerHTML = '<div class="empty-state">Loading…</div>';\r
  const snapshot = await getDocs(collection(db, "schools", currentUser.uid, "sessions"));\r
  list.innerHTML = "";\r
  if (snapshot.empty) {\r
    allSessions = [];\r
    populateTermSessionSelect();\r
    list.innerHTML = '<div class="empty-state">No sessions yet. Create one above.</div>';\r
    return;\r
  }\r
  allSessions = [];\r
  snapshot.forEach(d => allSessions.push({ id: d.id, ...d.data() }));\r
  allSessions.sort((a, b) => (b.startYear || 0) - (a.startYear || 0));\r
  populateTermSessionSelect();\r
  allSessions.forEach(data => {\r
    const id = data.id;\r
    const isActive = id === activeSessionId;\r
    const isLocked = data.locked;\r
    const div = document.createElement("div");\r
    div.className = "session-item" + (isActive ? " active" : "") + (isLocked ? " locked-item" : "");\r
    div.innerHTML = \`\r
      <div class="session-meta">\r
        <div class="session-year">\${data.session}</div>\r
        <div class="session-tags">\r
          \${isActive ? '<span class="tag tag-active">Active</span>' : ""}\r
          \${isLocked ? '<span class="tag tag-locked">Locked</span>' : '<span class="tag tag-open">Open</span>'}\r
          \${data.classesLocked ? '<span class="tag tag-locked">Classes Locked</span>' : ""}\r
        </div>\r
      </div>\r
      <div class="session-actions">\r
        \${!isActive ? \`<button class="btn btn-sm btn-success" onclick="setActive('\${id}')">Set Active</button>\` : ""}\r
        <button class="btn btn-sm btn-warning" onclick="toggleLock('\${id}', \${isLocked})">\${isLocked ? "Unlock" : "Lock"}</button>\r
        <button class="btn btn-sm btn-ghost" onclick="toggleClassLock('\${id}', \${data.classesLocked || false})">\${data.classesLocked ? "Unlock Classes" : "Lock Classes"}</button>\r
        \${!isLocked ? \`<button class="btn btn-sm btn-danger" onclick="deleteSession('\${id}', \${isLocked})">Delete</button>\` : ""}\r
      </div>\r
    \`;\r
    list.appendChild(div);\r
  });\r
}\r
\r
window.setActive = async function(id) {\r
  await setDoc(doc(db, "schools", currentUser.uid, "settings", "activeSession"), { sessionId: id });\r
  activeSessionId = id;\r
  await loadSessions();\r
  await loadTerms();\r
};\r
\r
window.toggleLock = async function(id, currentStatus) {\r
  const action = currentStatus ? "unlock" : "lock";\r
  if (!confirm(\`Are you sure you want to \${action} this session?\r
\${currentStatus ? "Unlocking will allow edits by teachers." : "Locking will make teacher dashboards VIEW ONLY for this session."}\`)) return;\r
  const snap = await getDoc(doc(db, "schools", currentUser.uid, "sessions", id));\r
  if (snap.exists()) {\r
    await writeSessionPlacements({ id, ...snap.data(), locked: !currentStatus }, { locked: !currentStatus });\r
  }\r
  await setDoc(doc(db, "schools", currentUser.uid, "sessions", id), { locked: !currentStatus }, { merge: true });\r
  loadSessions();\r
};\r
\r
window.toggleClassLock = async function(id, currentStatus) {\r
  const action = currentStatus ? "unlock classes for" : "lock classes for";\r
  if (!confirm(\`Are you sure you want to \${action} this session?\r
\${currentStatus ? "Unlocking classes will allow class changes for students in this session." : "Locking classes will prevent any class changes for students in this session."}\`)) return;\r
  const snap = await getDoc(doc(db, "schools", currentUser.uid, "sessions", id));\r
  if (snap.exists()) {\r
    await writeSessionPlacements({ id, ...snap.data(), classesLocked: !currentStatus }, { classLocked: !currentStatus });\r
  }\r
  await setDoc(doc(db, "schools", currentUser.uid, "sessions", id), { classesLocked: !currentStatus }, { merge: true });\r
  loadSessions();\r
};\r
\r
window.saveTerm = async function() {\r
  const session = getSelectedTermSession();\r
  const cls = document.getElementById("termClassSelect").value;\r
  const section = document.getElementById("termSectionSelect").value;\r
  const label = normalizeReportTerm(document.getElementById("termNameInput").value);\r
  const termKey = getReportTermKey(label);\r
\r
  if (!session) return setStatus("termStatus", "Select a session first.", false);\r
  if (session.locked) return setStatus("termStatus", "This session is locked. Unlock it before adding terms.", false);\r
  if (!cls) return setStatus("termStatus", "Select class for this term.", false);\r
  if (!label || !termKey) return setStatus("termStatus", "Enter a valid term name.", false);\r
\r
  const termDocId = getTermDocId(session.id, cls, section, termKey);\r
  const termRef = doc(db, "schools", currentUser.uid, "terms", termDocId);\r
  const existing = await getDoc(termRef);\r
  if (existing.exists()) {\r
    return setStatus("termStatus", "This term already exists for the selected class/session.", false);\r
  }\r
\r
  await setDoc(termRef, {\r
    label,\r
    termKey,\r
    class: cls,\r
    section,\r
    sessionId: session.id,\r
    session: getSessionLabel(session),\r
    createdAt: serverTimestamp(),\r
    updatedAt: serverTimestamp(),\r
    createdBy: currentAdminProfile.name || currentUser.email || currentUser.uid,\r
    createdByRole: "admin"\r
  });\r
\r
  document.getElementById("termNameInput").value = "";\r
  setStatus("termStatus", \`Term "\${label}" saved for \${formatClassSection(cls, section)}.\`);\r
  await loadTerms();\r
};\r
\r
window.loadTerms = async function() {\r
  const list = document.getElementById("termList");\r
  if (!list) return;\r
  const session = getSelectedTermSession();\r
  if (!session) {\r
    list.innerHTML = \`<div class="empty-state">Create a session before adding terms.</div>\`;\r
    return;\r
  }\r
  list.innerHTML = \`<div class="empty-state">Loading terms...</div>\`;\r
  try {\r
    const snapshot = await getDocs(collection(db, "schools", currentUser.uid, "terms"));\r
    const terms = snapshot.docs\r
      .map((termDoc) => ({ id: termDoc.id, ...termDoc.data() }))\r
      .filter(termBelongsToSelectedTermSession)\r
      .sort((a, b) => {\r
        const left = \`\${a.class || ""}\${a.section || ""}\${a.label || a.term || ""}\`;\r
        const right = \`\${b.class || ""}\${b.section || ""}\${b.label || b.term || ""}\`;\r
        return left.localeCompare(right);\r
      });\r
\r
    if (!terms.length) {\r
      list.innerHTML = \`<div class="empty-state">No terms created for this session yet.</div>\`;\r
      return;\r
    }\r
\r
    list.innerHTML = terms.map((term) => {\r
      const label = escapeHtml(term.label || term.term || term.termKey || "Untitled Term");\r
      const sessionLabel = escapeHtml(term.session || getSessionLabel(session) || "Session");\r
      const classLabel = escapeHtml(formatClassSection(term.class || "", term.section || ""));\r
      return \`\r
        <div class="term-item">\r
          <div>\r
            <div class="term-name">\${label}</div>\r
            <div class="term-meta">\${classLabel} | \${sessionLabel}</div>\r
          </div>\r
          <div class="term-actions">\r
            <button class="btn btn-sm btn-danger" onclick="deleteTerm('\${term.id}')">Delete</button>\r
          </div>\r
        </div>\r
      \`;\r
    }).join("");\r
  } catch (error) {\r
    console.error(error);\r
    list.innerHTML = \`<div class="empty-state">Unable to load terms.</div>\`;\r
  }\r
};\r
\r
window.deleteTerm = async function(id) {\r
  if (!confirm("Delete this term? Existing marks and report cards will not be deleted.")) return;\r
  await deleteDoc(doc(db, "schools", currentUser.uid, "terms", id));\r
  setStatus("termStatus", "Term deleted.");\r
  await loadTerms();\r
};\r
\r
async function loadActiveSession() {\r
  const snap = await getDoc(doc(db, "schools", currentUser.uid, "settings", "activeSession"));\r
  if (snap.exists()) activeSessionId = snap.data().sessionId;\r
}\r
\r
window.deleteSession = async function(id, locked) {\r
  if (locked) { alert("Cannot delete a locked session. Unlock it first."); return; }\r
  if (!confirm("Delete this session? This cannot be undone.")) return;\r
  await deleteDoc(doc(db, "schools", currentUser.uid, "sessions", id));\r
  if (activeSessionId === id) {\r
    await deleteDoc(doc(db, "schools", currentUser.uid, "settings", "activeSession"));\r
    activeSessionId = null;\r
  }\r
  await loadSessions();\r
  await loadTerms();\r
};\r
`},{attributes:{type:"module",src:"access-control.js"},text:""},{attributes:{src:"schoolix-polish.js"},text:""},{attributes:{src:"admin-shell.js?v=navbar-20260721"},text:""}]};export{e as default};
