const e={file:"admin-report-cards.html",title:"Admin - Report Cards Management",htmlClass:"",bodyClass:"",body:`\r
<div id="sxPageLoader" class="sx-page-loader" role="status" aria-live="polite">\r
  <section class="dots-container" aria-label="Loading page">\r
    <div class="dot"></div>\r
    <div class="dot"></div>\r
    <div class="dot"></div>\r
    <div class="dot"></div>\r
    <div class="dot"></div>\r
  </section>\r
</div>\r
\r
<!-- SVG Icon Sprite -->\r
<svg width="0" height="0" style="position:absolute" aria-hidden="true">\r
  <defs>\r
    <symbol id="i-clipboard" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M9 12h6M9 16h4"/></symbol>\r
    <symbol id="i-lock" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></symbol>\r
    <symbol id="i-unlock" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></symbol>\r
    <symbol id="i-search" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></symbol>\r
    <symbol id="i-filter" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 5h18l-7 9v6l-4-2v-4z"/></symbol>\r
    <symbol id="i-refresh" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-3-6.7L21 8"/><path d="M21 3v5h-5"/></symbol>\r
    <symbol id="i-chart" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 5-6"/></symbol>\r
    <symbol id="i-percent" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></symbol>\r
    <symbol id="i-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></symbol>\r
    <symbol id="i-award" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="9" r="6"/><path d="m8.5 13.5-1.5 8 5-3 5 3-1.5-8"/></symbol>\r
    <symbol id="i-eye" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"/><circle cx="12" cy="12" r="3"/></symbol>\r
    <symbol id="i-print" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9V2h12v7"/><rect x="4" y="9" width="16" height="9" rx="2"/><path d="M6 18h12v4H6z"/></symbol>\r
    <symbol id="i-trash" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M6 6l1 14a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-14"/></symbol>\r
    <symbol id="i-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></symbol>\r
    <symbol id="i-crown" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6l4 6 5-8 5 8 4-6-2 13H5z"/></symbol>\r
    <symbol id="i-user" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></symbol>\r
    <symbol id="i-alert" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 2 20h20z"/><path d="M12 9v5"/><circle cx="12" cy="17.5" r="0.5" fill="currentColor"/></symbol>\r
    <symbol id="i-empty" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M9 15h6M9 11h2"/></symbol>\r
  </defs>\r
</svg>\r
\r
<div class="container">\r
  <div class="header">\r
    <div>\r
      <h1><svg class="icon-lg"><use href="#i-clipboard"/></svg> Report Cards Management</h1>\r
      <p>View, manage, and analyze student report cards</p>\r
    </div>\r
  </div>\r
\r
  <div class="content">\r
    <div id="lockBanner" class="lock-banner">\r
      <svg class="icon-lg"><use href="#i-lock"/></svg>\r
      <div><strong>Selected term is locked.</strong> Teachers cannot edit marks or regenerate report cards for this term. Admin edits from this page are still allowed.</div>\r
    </div>\r
    <div id="liveBanner" class="live-banner">\r
      <svg class="icon-lg"><use href="#i-check"/></svg>\r
      <div><strong>Selected term is live.</strong> Students with cleared dues can now view this term's report cards.</div>\r
    </div>\r
\r
    <h2 class="section-title"><svg class="icon"><use href="#i-lock"/></svg> Term-wise Report Card Lock</h2>\r
    <div class="term-lock-panel">\r
      <div>\r
        <div class="term-lock-title">Lock one term at a time</div>\r
        <div class="term-lock-note">When a term is locked, teachers can only view marks/report cards for that term. Admin can still edit marks here.</div>\r
      </div>\r
      <select id="termLockSelect" onchange="onTermLockSelectChange()">\r
        <option value="">Loading terms...</option>\r
      </select>\r
      <span id="termLockStatus" class="term-lock-status unlocked"><svg class="icon-sm"><use href="#i-unlock"/></svg><span>Unlocked</span></span>\r
      <button id="termLockToggleBtn" class="danger" onclick="toggleSelectedTermLock()">\r
        <svg class="icon"><use href="#i-lock"/></svg>\r
        <span id="termLockToggleText">Lock Term</span>\r
      </button>\r
    </div>\r
\r
    <h2 class="section-title"><svg class="icon"><use href="#i-eye"/></svg> Result Visibility</h2>\r
    <div class="term-lock-panel">\r
      <div>\r
        <div class="term-lock-title">Make one term live for students</div>\r
        <div class="term-lock-note">Teacher/admin reports stay private until this is turned live. Existing fee-dues lock still applies for students.</div>\r
      </div>\r
      <select id="termLiveSelect" onchange="onTermLiveSelectChange()">\r
        <option value="">Loading terms...</option>\r
      </select>\r
      <span id="termLiveStatus" class="term-lock-status hidden"><svg class="icon-sm"><use href="#i-lock"/></svg><span>Hidden</span></span>\r
      <button id="termLiveToggleBtn" class="success" onclick="toggleSelectedTermLive()">\r
        <svg class="icon"><use href="#i-eye"/></svg>\r
        <span id="termLiveToggleText">Make Live</span>\r
      </button>\r
    </div>\r
\r
    <h2 class="section-title"><svg class="icon"><use href="#i-filter"/></svg> Search and Filter</h2>\r
    <div class="filters-section">\r
      <input type="text" id="searchName" placeholder="Search by student name...">\r
      <input type="text" id="searchStudentId" placeholder="Search by student ID...">\r
      <input type="text" id="searchClass" placeholder="Search by class (e.g. 10-A)">\r
      <select id="gradeFilter">\r
        <option value="">All Grades</option>\r
        <option value="A+">Grade A+</option>\r
        <option value="A">Grade A</option>\r
        <option value="B">Grade B</option>\r
        <option value="C">Grade C</option>\r
        <option value="F">Grade F</option>\r
      </select>\r
      <select id="termFilter">\r
        <option value="">All Terms</option>\r
      </select>\r
      <div class="button-group">\r
        <button class="primary" onclick="applyFilters()"><svg class="icon"><use href="#i-search"/></svg> Search</button>\r
        <button class="secondary" onclick="resetFilters()"><svg class="icon"><use href="#i-refresh"/></svg> Reset</button>\r
      </div>\r
    </div>\r
\r
    <h2 class="section-title"><svg class="icon"><use href="#i-user"/></svg> Class-wise Results</h2>\r
    <div class="class-results-panel">\r
      <div>\r
        <div class="class-results-title">View report cards by class-section</div>\r
        <div class="class-results-note">Select a class and section to list all generated student results below.</div>\r
      </div>\r
      <select id="classResultSelect" onchange="populateClassResultSections()">\r
        <option value="">All Classes</option>\r
      </select>\r
      <select id="sectionResultSelect">\r
        <option value="">All Sections</option>\r
      </select>\r
      <button class="primary" onclick="showClassWiseResults()"><svg class="icon"><use href="#i-search"/></svg> Show Results</button>\r
    </div>\r
\r
    <h2 class="section-title"><svg class="icon"><use href="#i-chart"/></svg> Statistics</h2>\r
    <div class="stats-grid" id="statsGrid" style="display:none;">\r
      <div class="stat-card">\r
        <div class="stat-icon-wrap"><svg class="icon-lg"><use href="#i-clipboard"/></svg></div>\r
        <div><div class="stat-label">Total Reports</div><div class="stat-value" id="totalReports">0</div></div>\r
      </div>\r
      <div class="stat-card secondary">\r
        <div class="stat-icon-wrap"><svg class="icon-lg"><use href="#i-percent"/></svg></div>\r
        <div><div class="stat-label">Average %</div><div class="stat-value" id="avgPercentage">0%</div></div>\r
      </div>\r
      <div class="stat-card success">\r
        <div class="stat-icon-wrap"><svg class="icon-lg"><use href="#i-check"/></svg></div>\r
        <div><div class="stat-label">Passed Students</div><div class="stat-value" id="passedCount">0</div></div>\r
      </div>\r
      <div class="stat-card warning">\r
        <div class="stat-icon-wrap"><svg class="icon-lg"><use href="#i-award"/></svg></div>\r
        <div><div class="stat-label">A+ Grades</div><div class="stat-value" id="aPlusCount">0</div></div>\r
      </div>\r
    </div>\r
\r
    <h2 class="section-title"><svg class="icon"><use href="#i-clipboard"/></svg> All Report Cards</h2>\r
    <div class="table-wrapper">\r
      <table>\r
        <thead>\r
          <tr>\r
            <th>Student Name</th>\r
            <th>Student ID</th>\r
            <th>Class</th>\r
            <th>Percentage</th>\r
            <th>Grade</th>\r
            <th>Term</th>\r
            <th>Generated By</th>\r
            <th>Date</th>\r
            <th>Actions</th>\r
          </tr>\r
        </thead>\r
        <tbody id="tableBody">\r
          <tr><td colspan="9" class="loading"><span class="spinner"></span> Loading...</td></tr>\r
        </tbody>\r
      </table>\r
    </div>\r
  </div>\r
</div>\r
\r
<div id="reportModal" class="modal">\r
  <div class="modal-content">\r
    <div class="modal-header">\r
      <h2><svg class="icon-lg"><use href="#i-clipboard"/></svg> Report Card Details</h2>\r
      <button type="button" class="modal-close" onclick="closeModal(event)" aria-label="Close report card details"><svg class="icon-lg"><use href="#i-close"/></svg></button>\r
    </div>\r
    <div class="modal-body" id="modalBody">Loading...</div>\r
  </div>\r
</div>\r
\r
<script type="module">\r
import { initializeApp } from "./firebase-compat.js";\r
import { getFirestore, collection, query, orderBy, getDocs, doc, getDoc, setDoc, deleteDoc } from "./firebase-compat.js";\r
import { getAuth, onAuthStateChanged } from "./firebase-compat.js";\r
\r
const firebaseConfig = {\r
  apiKey: "AIzaSyAomGwef93HFT9Xyx7SVW95FPw_IcIAICE",\r
  authDomain: "schoolix-48107.firebaseapp.com",\r
  projectId: "schoolix-48107",\r
  storageBucket: "schoolix-48107.firebasestorage.app",\r
  messagingSenderId: "133937954491",\r
  appId: "1:133937954491:web:69d8064422617eb8c4339e",\r
  measurementId: "G-EG23XE5Q0Z"\r
};\r
\r
const app = initializeApp(firebaseConfig);\r
const db = getFirestore(app);\r
const auth = getAuth(app);\r
const RESULT_NOTIFICATION_SEND_URL = "https://ezkmeedcqetztkeppxil.supabase.co/functions/v1/send-app-notification";\r
const RESULT_NOTIFICATION_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6a21lZWRjcWV0enRrZXBweGlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxMjk5NjAsImV4cCI6MjA5MzcwNTk2MH0.1davJ_NYkFhHToUtcFBR0kA6dk0-cOkaIbK2SCObkQg";\r
\r
let allReports = [];\r
let allTerms = [];\r
let reportTermLocks = {};\r
let reportTermVisibility = {};\r
let currentAdminId = null;\r
let activeSessionId = "";\r
let activeSessionLabel = "";\r
let selectedLockTermKey = "";\r
let selectedLiveTermKey = "";\r
\r
async function loadActiveSession() {\r
  activeSessionId = "";\r
  activeSessionLabel = "";\r
  try {\r
    let viewSessionId = "";\r
    try { viewSessionId = localStorage.getItem("schoolix.viewSessionId") || ""; } catch (_) {}\r
    const activeSnap = await getDoc(doc(db, "schools", currentAdminId, "settings", "activeSession"));\r
    activeSessionId = viewSessionId || (activeSnap.exists() ? activeSnap.data().sessionId || "" : "");\r
    if (!activeSessionId) return;\r
    const sessionSnap = await getDoc(doc(db, "schools", currentAdminId, "sessions", activeSessionId));\r
    if (!sessionSnap.exists()) {\r
      try { if (viewSessionId) localStorage.removeItem("schoolix.viewSessionId"); } catch (_) {}\r
      activeSessionId = activeSnap.exists() ? activeSnap.data().sessionId || "" : "";\r
      if (!activeSessionId || activeSessionId === viewSessionId) return;\r
      const fallbackSnap = await getDoc(doc(db, "schools", currentAdminId, "sessions", activeSessionId));\r
      if (!fallbackSnap.exists()) return;\r
      const fallbackData = fallbackSnap.data();\r
      activeSessionLabel = fallbackData.session || fallbackData.name || "";\r
      return;\r
    }\r
    const data = sessionSnap.data();\r
    activeSessionLabel = data.session || data.name || "";\r
  } catch (e) { console.error("Session load error:", e); }\r
}\r
\r
function normalizeTermKey(value) {\r
  return String(value || "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");\r
}\r
\r
function getTermLabel(termKey) {\r
  return allTerms.find((term) => term.termKey === termKey)?.label || termKey || "Selected term";\r
}\r
\r
function getTermLockKey(termKey) {\r
  if (!termKey) return "";\r
  return activeSessionId ? \`\${activeSessionId}__\${termKey}\` : termKey;\r
}\r
\r
function isTermLocked(termKey) {\r
  return reportTermLocks[getTermLockKey(termKey)]?.locked === true;\r
}\r
\r
function getTermVisibilityKey(termKey) {\r
  return getTermLockKey(termKey);\r
}\r
\r
function isTermLive(termKey) {\r
  return reportTermVisibility[getTermVisibilityKey(termKey)]?.live === true;\r
}\r
\r
async function sendResultLiveNotification(termLabel) {\r
  const token = await auth.currentUser?.getIdToken(true);\r
  if (!token) return;\r
  const response = await fetch(RESULT_NOTIFICATION_SEND_URL, {\r
    method: "POST",\r
    headers: {\r
      "Content-Type": "application/json",\r
      "apikey": RESULT_NOTIFICATION_ANON_KEY,\r
      "Authorization": \`Bearer \${RESULT_NOTIFICATION_ANON_KEY}\`,\r
      "x-firebase-auth": token\r
    },\r
    body: JSON.stringify({\r
      title: "Result is live",\r
      message: \`\${termLabel} result is now live. Students with cleared dues can view it in the app.\`,\r
      audience: "students"\r
    })\r
  });\r
  if (!response.ok) throw new Error(await response.text());\r
}\r
\r
function getReportTermKey(report = {}) {\r
  return report.termKey || normalizeTermKey(report.termLabel || report.term || "");\r
}\r
\r
async function loadTermsAndLocks() {\r
  allTerms = [];\r
  reportTermLocks = {};\r
  reportTermVisibility = {};\r
  try {\r
    const termSnap = await getDocs(collection(db, "schools", currentAdminId, "terms"));\r
    const unique = new Map();\r
    termSnap.docs\r
      .map(d => ({ id: d.id, ...d.data() }))\r
      .filter(term => {\r
        if (!activeSessionId && !activeSessionLabel) return true;\r
        if (!term.sessionId && !term.session && !term.currentYear && !term.academicSession) return true;\r
        return term.sessionId === activeSessionId ||\r
          term.session === activeSessionLabel ||\r
          term.currentYear === activeSessionLabel ||\r
          term.academicSession === activeSessionLabel;\r
      })\r
      .forEach(term => {\r
        const termKey = term.termKey || normalizeTermKey(term.label || term.term || term.name || term.id);\r
        if (!termKey) return;\r
        unique.set(termKey, {\r
          ...term,\r
          termKey,\r
          label: term.label || term.term || term.name || termKey\r
        });\r
      });\r
    allTerms = Array.from(unique.values()).sort((a, b) => (a.createdAt?.seconds || 0) - (b.createdAt?.seconds || 0));\r
\r
    const lockSnap = await getDoc(doc(db, "schools", currentAdminId, "settings", "reportCardTermLocks"));\r
    reportTermLocks = lockSnap.exists() ? (lockSnap.data().locks || {}) : {};\r
    const visibilitySnap = await getDoc(doc(db, "schools", currentAdminId, "settings", "reportCardTermVisibility"));\r
    reportTermVisibility = visibilitySnap.exists() ? (visibilitySnap.data().terms || {}) : {};\r
  } catch (e) { console.error("Term lock load error:", e); }\r
  populateTermControls();\r
  updateTermLockUI();\r
  updateTermLiveUI();\r
}\r
\r
function populateTermControls() {\r
  const lockSelect = document.getElementById("termLockSelect");\r
  const liveSelect = document.getElementById("termLiveSelect");\r
  const filterSelect = document.getElementById("termFilter");\r
  if (lockSelect) {\r
    lockSelect.innerHTML = allTerms.length\r
      ? allTerms.map(term => \`<option value="\${escapeHtml(term.termKey)}">\${escapeHtml(term.label)}</option>\`).join("")\r
      : '<option value="">No terms found</option>';\r
    if (!selectedLockTermKey || !allTerms.some(term => term.termKey === selectedLockTermKey)) {\r
      selectedLockTermKey = allTerms[0]?.termKey || "";\r
    }\r
    lockSelect.value = selectedLockTermKey;\r
  }\r
  if (liveSelect) {\r
    liveSelect.innerHTML = allTerms.length\r
      ? allTerms.map(term => \`<option value="\${escapeHtml(term.termKey)}">\${escapeHtml(term.label)}</option>\`).join("")\r
      : '<option value="">No terms found</option>';\r
    if (!selectedLiveTermKey || !allTerms.some(term => term.termKey === selectedLiveTermKey)) {\r
      selectedLiveTermKey = selectedLockTermKey || allTerms[0]?.termKey || "";\r
    }\r
    liveSelect.value = selectedLiveTermKey;\r
  }\r
  if (filterSelect) {\r
    const current = filterSelect.value;\r
    filterSelect.innerHTML = '<option value="">All Terms</option>' +\r
      allTerms.map(term => \`<option value="\${escapeHtml(term.termKey)}">\${escapeHtml(term.label)}</option>\`).join("");\r
    filterSelect.value = allTerms.some(term => term.termKey === current) ? current : "";\r
  }\r
}\r
\r
function updateTermLockUI() {\r
  const btn = document.getElementById("termLockToggleBtn");\r
  const btnText = document.getElementById("termLockToggleText");\r
  const btnIcon = btn?.querySelector("svg use");\r
  const status = document.getElementById("termLockStatus");\r
  const statusText = status?.querySelector("span");\r
  const statusIcon = status?.querySelector("svg use");\r
  const banner = document.getElementById("lockBanner");\r
  const locked = isTermLocked(selectedLockTermKey);\r
\r
  if (!selectedLockTermKey) {\r
    if (btn) btn.disabled = true;\r
    if (statusText) statusText.textContent = "No term";\r
    if (banner) banner.classList.remove("show");\r
    return;\r
  }\r
  if (btn) btn.disabled = false;\r
  if (locked) {\r
    btn.classList.remove("danger"); btn.classList.add("success");\r
    btnText.textContent = "Unlock Term";\r
    btnIcon?.setAttribute("href", "#i-unlock");\r
    status.classList.remove("unlocked"); status.classList.add("locked");\r
    statusText.textContent = "Locked";\r
    statusIcon?.setAttribute("href", "#i-lock");\r
    banner.classList.add("show");\r
  } else {\r
    btn.classList.remove("success"); btn.classList.add("danger");\r
    btnText.textContent = "Lock Term";\r
    btnIcon?.setAttribute("href", "#i-lock");\r
    status.classList.remove("locked"); status.classList.add("unlocked");\r
    statusText.textContent = "Unlocked";\r
    statusIcon?.setAttribute("href", "#i-unlock");\r
    banner.classList.remove("show");\r
  }\r
}\r
\r
window.onTermLockSelectChange = () => {\r
  selectedLockTermKey = document.getElementById("termLockSelect").value;\r
  updateTermLockUI();\r
};\r
\r
window.toggleSelectedTermLock = async () => {\r
  if (!currentAdminId) return;\r
  if (!selectedLockTermKey) return alert("Select a term first.");\r
  const newState = !isTermLocked(selectedLockTermKey);\r
  const label = getTermLabel(selectedLockTermKey);\r
  const msg = newState\r
    ? \`Lock report cards for \${label}?\\n\\nTeachers will NOT be able to edit marks or regenerate report cards for this term. Admin can still edit from this page.\`\r
    : \`Unlock report cards for \${label}?\\n\\nTeachers will be able to edit marks and regenerate report cards for this term again.\`;\r
  if (!confirm(msg)) return;\r
  try {\r
    const lockKey = getTermLockKey(selectedLockTermKey);\r
    reportTermLocks = {\r
      ...reportTermLocks,\r
      [lockKey]: {\r
        locked: newState,\r
        termKey: selectedLockTermKey,\r
        termLabel: label,\r
        sessionId: activeSessionId || "",\r
        session: activeSessionLabel || "",\r
        updatedAt: new Date(),\r
        updatedBy: auth.currentUser?.uid || "admin"\r
      }\r
    };\r
    await setDoc(doc(db, "schools", currentAdminId, "settings", "reportCardTermLocks"), {\r
      locks: reportTermLocks,\r
      updatedAt: new Date(),\r
      updatedBy: auth.currentUser?.uid || "admin"\r
    }, { merge: true });\r
    updateTermLockUI();\r
    alert(newState ? \`\${label} locked successfully.\` : \`\${label} unlocked successfully.\`);\r
  } catch (e) {\r
    console.error(e);\r
    alert("Failed to update term lock.");\r
  }\r
};\r
\r
function updateTermLiveUI() {\r
  const btn = document.getElementById("termLiveToggleBtn");\r
  const btnText = document.getElementById("termLiveToggleText");\r
  const btnIcon = btn?.querySelector("svg use");\r
  const status = document.getElementById("termLiveStatus");\r
  const statusText = status?.querySelector("span");\r
  const statusIcon = status?.querySelector("svg use");\r
  const banner = document.getElementById("liveBanner");\r
  const live = isTermLive(selectedLiveTermKey);\r
\r
  if (!selectedLiveTermKey) {\r
    if (btn) btn.disabled = true;\r
    if (statusText) statusText.textContent = "No term";\r
    if (banner) banner.classList.remove("show");\r
    return;\r
  }\r
  if (btn) btn.disabled = false;\r
  if (live) {\r
    btn.classList.remove("success"); btn.classList.add("warning");\r
    btnText.textContent = "Hide From Students";\r
    btnIcon?.setAttribute("href", "#i-lock");\r
    status.classList.remove("hidden"); status.classList.add("live");\r
    statusText.textContent = "Live";\r
    statusIcon?.setAttribute("href", "#i-eye");\r
    banner.classList.add("show");\r
  } else {\r
    btn.classList.remove("warning"); btn.classList.add("success");\r
    btnText.textContent = "Make Live";\r
    btnIcon?.setAttribute("href", "#i-eye");\r
    status.classList.remove("live"); status.classList.add("hidden");\r
    statusText.textContent = "Hidden";\r
    statusIcon?.setAttribute("href", "#i-lock");\r
    banner.classList.remove("show");\r
  }\r
}\r
\r
window.onTermLiveSelectChange = () => {\r
  selectedLiveTermKey = document.getElementById("termLiveSelect").value;\r
  updateTermLiveUI();\r
};\r
\r
window.toggleSelectedTermLive = async () => {\r
  if (!currentAdminId) return;\r
  if (!selectedLiveTermKey) return alert("Select a term first.");\r
  const newState = !isTermLive(selectedLiveTermKey);\r
  const label = getTermLabel(selectedLiveTermKey);\r
  const msg = newState\r
    ? \`Make \${label} live?\\n\\nStudents with no pending dues will be able to view this term's result. Students with dues will stay locked.\`\r
    : \`Hide \${label} from students?\\n\\nTeachers and admin can still see reports, but students will not see this term.\`;\r
  if (!confirm(msg)) return;\r
  try {\r
    const visibilityKey = getTermVisibilityKey(selectedLiveTermKey);\r
    reportTermVisibility = {\r
      ...reportTermVisibility,\r
      [visibilityKey]: {\r
        live: newState,\r
        termKey: selectedLiveTermKey,\r
        termLabel: label,\r
        sessionId: activeSessionId || "",\r
        session: activeSessionLabel || "",\r
        updatedAt: new Date(),\r
        updatedBy: auth.currentUser?.uid || "admin"\r
      }\r
    };\r
    await setDoc(doc(db, "schools", currentAdminId, "settings", "reportCardTermVisibility"), {\r
      terms: reportTermVisibility,\r
      updatedAt: new Date(),\r
      updatedBy: auth.currentUser?.uid || "admin"\r
    }, { merge: true });\r
    if (newState) {\r
      try {\r
        await sendResultLiveNotification(label);\r
      } catch (notificationError) {\r
        console.warn("Result live notification failed", notificationError);\r
      }\r
    }\r
    updateTermLiveUI();\r
    alert(newState ? \`\${label} is now live for eligible students.\` : \`\${label} is now hidden from students.\`);\r
  } catch (e) {\r
    console.error(e);\r
    alert("Failed to update result visibility.");\r
  }\r
};\r
\r
function reportBelongsToActiveSession(report) {\r
  if (!activeSessionId && !activeSessionLabel) return true;\r
  if (!report.sessionId && !report.session && !report.currentYear && !report.academicSession) return false;\r
  return report.sessionId === activeSessionId ||\r
    report.session === activeSessionLabel ||\r
    report.currentYear === activeSessionLabel ||\r
    report.academicSession === activeSessionLabel;\r
}\r
\r
function isAdminGenerated(report) {\r
  if (report.generatedByAdmin === true) return true;\r
  if (report.createdByRole && String(report.createdByRole).toLowerCase() === "admin") return true;\r
  const cb = String(report.createdBy || "").toLowerCase();\r
  return cb === "admin" || cb.includes("admin");\r
}\r
\r
onAuthStateChanged(auth, async (user) => {\r
  if (!user) { window.location.href = "#/index.html"; return; }\r
  currentAdminId = user.uid;\r
  await loadAllReports();\r
});\r
\r
window.loadAllReports = async () => {\r
  if (!currentAdminId) return;\r
  const tableBody = document.getElementById('tableBody');\r
  tableBody.innerHTML = '<tr><td colspan="9" class="loading"><span class="spinner"></span> Loading all reports...</td></tr>';\r
  try {\r
    await loadActiveSession();\r
    await loadTermsAndLocks();\r
    const q = query(collection(db, "schools", currentAdminId, "reportCards"), orderBy('createdAt', 'desc'));\r
    const snapshot = await getDocs(q);\r
    allReports = [];\r
    snapshot.forEach((d) => {\r
      const report = { id: d.id, ...d.data() };\r
      if (reportBelongsToActiveSession(report)) allReports.push(report);\r
    });\r
    populateClassResultControls();\r
    displayReports(allReports);\r
    updateStats(allReports);\r
  } catch (error) {\r
    console.error("Load error:", error);\r
    tableBody.innerHTML = '<tr><td colspan="9" class="empty-state"><svg><use href="#i-alert"/></svg><h3>Error loading reports</h3><p>' + (error.message || '') + '</p></td></tr>';\r
  }\r
};\r
\r
function getReportClass(report = {}) {\r
  return String(report.student?.class || report.class || "").trim();\r
}\r
\r
function getReportSection(report = {}) {\r
  return String(report.student?.section || report.section || "").trim();\r
}\r
\r
function populateClassResultControls() {\r
  const classSelect = document.getElementById("classResultSelect");\r
  const sectionSelect = document.getElementById("sectionResultSelect");\r
  if (!classSelect || !sectionSelect) return;\r
  const previousClass = classSelect.value;\r
  const classes = Array.from(new Set(allReports.map(getReportClass).filter(Boolean)))\r
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));\r
  classSelect.innerHTML = '<option value="">All Classes</option>' +\r
    classes.map(className => \`<option value="\${escapeHtml(className)}">\${escapeHtml(className)}</option>\`).join("");\r
  classSelect.value = classes.includes(previousClass) ? previousClass : "";\r
  populateClassResultSections();\r
}\r
\r
window.populateClassResultSections = () => {\r
  const classSelect = document.getElementById("classResultSelect");\r
  const sectionSelect = document.getElementById("sectionResultSelect");\r
  if (!classSelect || !sectionSelect) return;\r
  const selectedClass = classSelect.value;\r
  const previousSection = sectionSelect.value;\r
  const sections = Array.from(new Set(\r
    allReports\r
      .filter(report => !selectedClass || getReportClass(report) === selectedClass)\r
      .map(getReportSection)\r
      .filter(Boolean)\r
  )).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));\r
  sectionSelect.innerHTML = '<option value="">All Sections</option>' +\r
    sections.map(section => \`<option value="\${escapeHtml(section)}">\${escapeHtml(section)}</option>\`).join("");\r
  sectionSelect.value = sections.includes(previousSection) ? previousSection : "";\r
};\r
\r
window.showClassWiseResults = () => {\r
  const selectedClass = document.getElementById("classResultSelect")?.value || "";\r
  const selectedSection = document.getElementById("sectionResultSelect")?.value || "";\r
  const filtered = allReports.filter(report => {\r
    const classMatch = !selectedClass || getReportClass(report) === selectedClass;\r
    const sectionMatch = !selectedSection || getReportSection(report) === selectedSection;\r
    return classMatch && sectionMatch;\r
  });\r
  document.getElementById("searchClass").value = selectedClass\r
    ? \`\${selectedClass}\${selectedSection ? \`-\${selectedSection}\` : ""}\`\r
    : "";\r
  document.getElementById("searchName").value = "";\r
  document.getElementById("searchStudentId").value = "";\r
  document.getElementById("gradeFilter").value = "";\r
  displayReports(filtered);\r
  updateStats(filtered);\r
};\r
\r
function escapeHtml(s) {\r
  return String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));\r
}\r
\r
window.displayReports = (reports) => {\r
  const tableBody = document.getElementById('tableBody');\r
  if (reports.length === 0) {\r
    tableBody.innerHTML = '<tr><td colspan="9"><div class="empty-state"><svg><use href="#i-empty"/></svg><h3>No Reports Found</h3><p>No report cards match your criteria</p></div></td></tr>';\r
    return;\r
  }\r
  tableBody.innerHTML = '';\r
  reports.forEach(report => {\r
    const studentName = report.student?.name || 'N/A';\r
    const studentId = report.student?.studentId || 'N/A';\r
    const classInfo = \`\${report.student?.class || '-'}-\${report.student?.section || '-'}\`;\r
    const percentage = report.percentage ? Number(report.percentage).toFixed(1) : 0;\r
    const grade = report.grade || 'N/A';\r
    const termLabel = report.termLabel || report.term || getTermLabel(getReportTermKey(report)) || 'N/A';\r
    const date = report.createdAt?.toDate ? new Date(report.createdAt.toDate()).toLocaleDateString('en-IN') : 'N/A';\r
    const gradeClass = 'grade-' + String(grade).toLowerCase();\r
    const percentageClass = percentage >= 75 ? 'high' : percentage >= 40 ? 'medium' : 'low';\r
    const generatedBy = isAdminGenerated(report)\r
      ? \`<span class="admin-badge"><svg class="icon-sm"><use href="#i-crown"/></svg> Admin Generated</span>\`\r
      : \`<span class="teacher-badge"><svg class="icon-sm"><use href="#i-user"/></svg> \${escapeHtml(report.createdBy || 'Teacher')}</span>\`;\r
\r
    const row = document.createElement('tr');\r
    row.innerHTML = \`\r
      <td><div class="student-cell">\${escapeHtml(studentName)}</div></td>\r
      <td><span class="student-id">\${escapeHtml(studentId)}</span></td>\r
      <td>\${escapeHtml(classInfo)}</td>\r
      <td><span class="percentage \${percentageClass}">\${percentage}%</span></td>\r
      <td><span class="grade-badge \${gradeClass}">\${escapeHtml(grade)}</span></td>\r
      <td>\${escapeHtml(termLabel)}</td>\r
      <td>\${generatedBy}</td>\r
      <td>\${date}</td>\r
      <td>\r
        <div class="actions">\r
          <button class="action-btn view" onclick="viewReport('\${report.id}')"><svg class="icon-sm"><use href="#i-eye"/></svg> View</button>\r
          <button class="action-btn edit" onclick="editReport('\${report.id}')"><svg class="icon-sm"><use href="#i-clipboard"/></svg> Edit</button>\r
          <button class="action-btn print" onclick="printReport('\${report.id}')"><svg class="icon-sm"><use href="#i-print"/></svg> Print</button>\r
          <button class="action-btn delete" onclick="deleteReportCard('\${report.id}', '\${escapeHtml(studentName).replace(/'/g,"\\\\'")}')"><svg class="icon-sm"><use href="#i-trash"/></svg> Delete</button>\r
        </div>\r
      </td>\`;\r
    tableBody.appendChild(row);\r
  });\r
};\r
\r
window.updateStats = (reports) => {\r
  const total = reports.length;\r
  const grid = document.getElementById('statsGrid');\r
  if (total === 0) { grid.style.display = 'none'; return; }\r
  const avgPercentage = reports.reduce((s, r) => s + (Number(r.percentage) || 0), 0) / total;\r
  const passedCount = reports.filter(r => (Number(r.percentage) || 0) >= 40).length;\r
  const aPlusCount = reports.filter(r => r.grade === 'A+').length;\r
  grid.style.display = 'grid';\r
  document.getElementById('totalReports').textContent = total;\r
  document.getElementById('avgPercentage').textContent = avgPercentage.toFixed(1) + '%';\r
  document.getElementById('passedCount').textContent = passedCount;\r
  document.getElementById('aPlusCount').textContent = aPlusCount;\r
};\r
\r
window.applyFilters = () => {\r
  const searchName = document.getElementById('searchName').value.toLowerCase();\r
  const searchStudentId = document.getElementById('searchStudentId').value.toLowerCase();\r
  const searchClass = document.getElementById('searchClass').value.toUpperCase();\r
  const gradeFilter = document.getElementById('gradeFilter').value;\r
  const termFilter = document.getElementById('termFilter').value;\r
  const filtered = allReports.filter(report => {\r
    const nameMatch = !searchName || (report.student?.name || '').toLowerCase().includes(searchName);\r
    const studentIdMatch = !searchStudentId || String(report.student?.studentId || report.studentId || '').toLowerCase().includes(searchStudentId);\r
    const classMatch = !searchClass || \`\${report.student?.class || ''}-\${report.student?.section || ''}\`.toUpperCase().includes(searchClass);\r
    const gradeMatch = !gradeFilter || report.grade === gradeFilter;\r
    const termMatch = !termFilter || getReportTermKey(report) === termFilter;\r
    return nameMatch && studentIdMatch && classMatch && gradeMatch && termMatch;\r
  });\r
  displayReports(filtered);\r
  updateStats(filtered);\r
};\r
\r
window.resetFilters = () => {\r
  document.getElementById('searchName').value = '';\r
  document.getElementById('searchStudentId').value = '';\r
  document.getElementById('searchClass').value = '';\r
  document.getElementById('gradeFilter').value = '';\r
  document.getElementById('termFilter').value = '';\r
  displayReports(allReports);\r
  updateStats(allReports);\r
};\r
\r
window.viewReport = (reportId) => {\r
  const report = allReports.find(r => r.id === reportId);\r
  if (!report) return alert('Report not found');\r
  const percentage = report.percentage ? Number(report.percentage).toFixed(1) : 0;\r
  const subjectsHtml = (report.subjects || []).map(sub => \`\r
    <tr><td>\${escapeHtml(sub.name)}</td><td>\${escapeHtml(sub.obtained)} / \${escapeHtml(sub.maxMarks)}</td></tr>\`).join('');\r
  const genBadge = isAdminGenerated(report)\r
    ? \`<span class="admin-badge"><svg class="icon-sm"><use href="#i-crown"/></svg> Admin Generated</span>\`\r
    : \`<span class="teacher-badge"><svg class="icon-sm"><use href="#i-user"/></svg> \${escapeHtml(report.createdBy || 'Teacher')}</span>\`;\r
\r
  document.getElementById('modalBody').innerHTML = \`\r
    <div class="report-info">\r
      <div class="report-info-item"><span class="report-info-label">Student Name</span><span class="report-info-value">\${escapeHtml(report.student?.name || 'N/A')}</span></div>\r
      <div class="report-info-item"><span class="report-info-label">Student ID</span><span class="report-info-value">\${escapeHtml(report.student?.studentId || 'N/A')}</span></div>\r
      <div class="report-info-item"><span class="report-info-label">Class</span><span class="report-info-value">\${escapeHtml(report.student?.class || 'N/A')}-\${escapeHtml(report.student?.section || 'N/A')}</span></div>\r
      <div class="report-info-item"><span class="report-info-label">Grade</span><span class="report-info-value">\${escapeHtml(report.grade || 'N/A')}</span></div>\r
      <div class="report-info-item"><span class="report-info-label">Percentage</span><span class="report-info-value">\${percentage}%</span></div>\r
      <div class="report-info-item"><span class="report-info-label">Generated By</span><span class="report-info-value">\${genBadge}</span></div>\r
    </div>\r
    <h3 class="section-title" style="font-size:16px;">Subject Marks</h3>\r
    <table class="subjects-table">\r
      <thead><tr><th>Subject</th><th>Marks</th></tr></thead>\r
      <tbody>\${subjectsHtml || '<tr><td colspan="2" style="text-align:center;color:#718096;">No subjects</td></tr>'}</tbody>\r
    </table>\`;\r
  document.getElementById('reportModal').style.display = 'block';\r
};\r
\r
function getReportGrade(percentage) {\r
  const pct = Number(percentage || 0);\r
  if (pct >= 90) return "A+";\r
  if (pct >= 75) return "A";\r
  if (pct >= 60) return "B";\r
  if (pct >= 40) return "C";\r
  return "F";\r
}\r
\r
function getReportMarksTermKey(report = {}) {\r
  const termKey = getReportTermKey(report);\r
  return report.sessionId ? \`\${report.sessionId}__\${termKey}\` : termKey;\r
}\r
\r
window.editReport = (reportId) => {\r
  const report = allReports.find(r => r.id === reportId);\r
  if (!report) return alert('Report not found');\r
  const subjects = report.subjects || [];\r
  const rows = subjects.map((sub, index) => \`\r
    <div class="edit-row">\r
      <div>\r
        <strong>\${escapeHtml(sub.name || \`Subject \${index + 1}\`)}</strong><br>\r
        <small>Max marks: \${escapeHtml(sub.maxMarks || 100)}</small>\r
      </div>\r
      <input class="admin-mark-input" data-index="\${index}" data-subject="\${escapeHtml(sub.name || '')}" type="number" min="0" max="\${escapeHtml(sub.maxMarks || 100)}" value="\${escapeHtml(sub.obtained ?? 0)}">\r
      <input class="admin-max-input" data-index="\${index}" type="number" min="1" value="\${escapeHtml(sub.maxMarks || 100)}">\r
    </div>\r
  \`).join('');\r
\r
  document.getElementById('modalBody').innerHTML = \`\r
    <div class="report-info">\r
      <div class="report-info-item"><span class="report-info-label">Student</span><span class="report-info-value">\${escapeHtml(report.student?.name || 'N/A')}</span></div>\r
      <div class="report-info-item"><span class="report-info-label">Student ID</span><span class="report-info-value">\${escapeHtml(report.student?.studentId || 'N/A')}</span></div>\r
      <div class="report-info-item"><span class="report-info-label">Term</span><span class="report-info-value">\${escapeHtml(report.termLabel || report.term || 'N/A')}</span></div>\r
      <div class="report-info-item"><span class="report-info-label">Lock Status</span><span class="report-info-value">\${isTermLocked(getReportTermKey(report)) ? 'Locked for teachers' : 'Unlocked'}</span></div>\r
    </div>\r
    <h3 class="section-title" style="font-size:16px;">Admin Edit Marks</h3>\r
    <div class="edit-grid">\${rows || '<div class="empty-state">No subjects found in this report.</div>'}</div>\r
    <div style="display:flex;gap:10px;justify-content:flex-end;margin-top:22px;flex-wrap:wrap;">\r
      <button class="secondary" onclick="viewReport('\${report.id}')">Cancel</button>\r
      <button class="primary" onclick="saveReportEdits('\${report.id}')"><svg class="icon"><use href="#i-check"/></svg> Save Marks</button>\r
    </div>\r
  \`;\r
  document.getElementById('reportModal').style.display = 'block';\r
};\r
\r
window.saveReportEdits = async (reportId) => {\r
  const report = allReports.find(r => r.id === reportId);\r
  if (!report) return alert('Report not found');\r
  const marks = Array.from(document.querySelectorAll('.admin-mark-input'));\r
  const maxInputs = Array.from(document.querySelectorAll('.admin-max-input'));\r
  const previousSubjects = report.subjects || [];\r
  let total = 0;\r
  let totalMax = 0;\r
  const updatedSubjects = previousSubjects.map((sub, index) => {\r
    const obtained = Number(marks.find(input => Number(input.dataset.index) === index)?.value || 0);\r
    const maxMarks = Math.max(1, Number(maxInputs.find(input => Number(input.dataset.index) === index)?.value || sub.maxMarks || 100));\r
    total += obtained;\r
    totalMax += maxMarks;\r
    return { ...sub, obtained, maxMarks };\r
  });\r
  const percentage = totalMax ? Math.round((total / totalMax) * 100) : 0;\r
  const grade = getReportGrade(percentage);\r
  const studentId = report.student?.studentId || report.studentId;\r
  const marksTermKey = getReportMarksTermKey(report);\r
\r
  try {\r
    await setDoc(doc(db, "schools", currentAdminId, "reportCards", reportId), {\r
      subjects: updatedSubjects,\r
      totalMarks: total,\r
      totalMaxMarks: totalMax,\r
      percentage,\r
      grade,\r
      generatedByAdmin: true,\r
      editedByAdmin: true,\r
      updatedAt: new Date(),\r
      updatedBy: auth.currentUser?.uid || "admin"\r
    }, { merge: true });\r
\r
    if (studentId && marksTermKey) {\r
      const marksPayload = {};\r
      updatedSubjects.forEach((sub) => {\r
        if (!sub.name) return;\r
        marksPayload[sub.name] = {\r
          obtained: Number(sub.obtained || 0),\r
          maxMarks: Number(sub.maxMarks || 100)\r
        };\r
      });\r
      await setDoc(doc(db, "schools", currentAdminId, "marks", studentId), {\r
        terms: { [marksTermKey]: marksPayload },\r
        updatedAt: new Date(),\r
        updatedBy: auth.currentUser?.uid || "admin",\r
        updatedByRole: "admin"\r
      }, { merge: true });\r
    }\r
\r
    alert("Marks updated successfully.");\r
    await loadAllReports();\r
    editReport(reportId);\r
  } catch (error) {\r
    console.error("Save marks error:", error);\r
    alert("Unable to save marks.");\r
  }\r
};\r
\r
window.printReport = (reportId) => {\r
  const report = allReports.find(r => r.id === reportId);\r
  if (!report) return alert('Report not found');\r
  const percentage = report.percentage ? Number(report.percentage).toFixed(1) : 0;\r
  const genLabel = isAdminGenerated(report) ? 'Admin Generated' : (report.createdBy || 'Teacher');\r
  const subjectsHtml = (report.subjects || []).map(sub => \`\r
    <tr><td>\${escapeHtml(sub.name)}</td><td>\${escapeHtml(sub.obtained)}</td><td>\${escapeHtml(sub.maxMarks)}</td></tr>\`).join('');\r
  const w = window.open('', '_blank');\r
  w.document.write(\`<!DOCTYPE html><html><head>\r
<title>Report Card</title>\r
    <style>\r
      body{font-family:Segoe UI,sans-serif;padding:40px;color:#2d3748;}\r
      .rc{max-width:800px;margin:0 auto;border:2px solid #667eea;border-radius:12px;padding:30px;}\r
      h1{text-align:center;color:#667eea;margin:0 0 5px;}\r
      .sub{text-align:center;color:#718096;margin-bottom:25px;}\r
      .info{display:grid;grid-template-columns:1fr 1fr;gap:15px;margin-bottom:25px;padding:15px;background:#f7fafc;border-radius:8px;}\r
      .info div{font-size:14px;} .info b{color:#4a5568;display:block;font-size:11px;text-transform:uppercase;margin-bottom:3px;}\r
      table{width:100%;border-collapse:collapse;margin:15px 0;}\r
      th,td{padding:10px;border:1px solid #e2e8f0;text-align:left;}\r
      th{background:#667eea;color:white;}\r
      .totals{display:flex;justify-content:space-around;padding:20px;background:#f0f4ff;border-radius:8px;margin-top:20px;}\r
      .totals div{text-align:center;} .totals b{display:block;font-size:24px;color:#667eea;}\r
      .foot{text-align:center;margin-top:30px;font-size:12px;color:#718096;}\r
      @media print{body{padding:0;} .rc{border:none;}}\r
    </style></head><body>\r
    <div class="rc">\r
      <h1>Student Report Card</h1>\r
      <p class="sub">Academic Performance Report</p>\r
      <div class="info">\r
        <div><b>Student Name</b>\${escapeHtml(report.student?.name || 'N/A')}</div>\r
        <div><b>Student ID</b>\${escapeHtml(report.student?.studentId || 'N/A')}</div>\r
        <div><b>Class</b>\${escapeHtml(report.student?.class || 'N/A')}-\${escapeHtml(report.student?.section || 'N/A')}</div>\r
        <div><b>Generated By</b>\${escapeHtml(genLabel)}</div>\r
      </div>\r
      <table>\r
        <thead><tr><th>Subject</th><th>Marks Obtained</th><th>Max Marks</th></tr></thead>\r
        <tbody>\${subjectsHtml}</tbody>\r
      </table>\r
      <div class="totals">\r
        <div><b>\${escapeHtml(report.grade || 'N/A')}</b>Overall Grade</div>\r
        <div><b>\${percentage}%</b>Percentage</div>\r
      </div>\r
      <p class="foot">Generated on \${new Date().toLocaleDateString('en-IN',{year:'numeric',month:'long',day:'numeric'})}</p>\r
    </div>\r
    <script>window.onload=()=>window.print();<\\/script>`,styles:[{tag:"style",attributes:{id:"sxCriticalLoaderStyle"},text:`\r
html.sx-page-loading,\r
html.sx-page-loading body {\r
  min-height: 100%;\r
  background: #f8fafc !important;\r
}\r
html.sx-page-loading body::before,\r
html.sx-page-loading body::after {\r
  visibility: hidden !important;\r
}\r
html.sx-page-loading body > :not(#sxPageLoader):not(script):not(style) {\r
  visibility: hidden !important;\r
}\r
.sx-page-loader {\r
  position: fixed;\r
  inset: 0;\r
  z-index: 2147482500;\r
  display: flex;\r
  align-items: stretch;\r
  justify-content: stretch;\r
  background: #f8fafc;\r
  transition: opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1), visibility 0.25s ease;\r
  overflow: hidden;\r
}\r
.sx-page-loader.is-hidden {\r
  opacity: 0;\r
  visibility: hidden;\r
  pointer-events: none;\r
}\r
.sx-page-loader .dots-container {\r
  position: fixed;\r
  inset: 0;\r
  display: block;\r
  width: 100vw;\r
  height: 100vh;\r
  padding: 0;\r
  margin: 0;\r
  overflow: hidden;\r
  background: #f8fafc;\r
}\r
.sx-page-loader .dots-container::before,\r
.sx-page-loader .dots-container::after,\r
.sx-page-loader .dot {\r
  display: none !important;\r
}\r
`},{tag:"link",attributes:{rel:"stylesheet",href:"schoolix-polish.css"},text:""},{tag:"link",attributes:{rel:"stylesheet",href:"admin-shell.css?v=navbar-20260721"},text:""}],scripts:[{attributes:{id:"sxCriticalLoaderScript"},text:`\r
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
`},{attributes:{type:"module"},text:`\r
import { initializeApp } from "./firebase-compat.js";\r
import { getFirestore, collection, query, orderBy, getDocs, doc, getDoc, setDoc, deleteDoc } from "./firebase-compat.js";\r
import { getAuth, onAuthStateChanged } from "./firebase-compat.js";\r
\r
const firebaseConfig = {\r
  apiKey: "AIzaSyAomGwef93HFT9Xyx7SVW95FPw_IcIAICE",\r
  authDomain: "schoolix-48107.firebaseapp.com",\r
  projectId: "schoolix-48107",\r
  storageBucket: "schoolix-48107.firebasestorage.app",\r
  messagingSenderId: "133937954491",\r
  appId: "1:133937954491:web:69d8064422617eb8c4339e",\r
  measurementId: "G-EG23XE5Q0Z"\r
};\r
\r
const app = initializeApp(firebaseConfig);\r
const db = getFirestore(app);\r
const auth = getAuth(app);\r
const RESULT_NOTIFICATION_SEND_URL = "https://ezkmeedcqetztkeppxil.supabase.co/functions/v1/send-app-notification";\r
const RESULT_NOTIFICATION_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6a21lZWRjcWV0enRrZXBweGlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxMjk5NjAsImV4cCI6MjA5MzcwNTk2MH0.1davJ_NYkFhHToUtcFBR0kA6dk0-cOkaIbK2SCObkQg";\r
\r
let allReports = [];\r
let allTerms = [];\r
let reportTermLocks = {};\r
let reportTermVisibility = {};\r
let currentAdminId = null;\r
let activeSessionId = "";\r
let activeSessionLabel = "";\r
let selectedLockTermKey = "";\r
let selectedLiveTermKey = "";\r
\r
async function loadActiveSession() {\r
  activeSessionId = "";\r
  activeSessionLabel = "";\r
  try {\r
    let viewSessionId = "";\r
    try { viewSessionId = localStorage.getItem("schoolix.viewSessionId") || ""; } catch (_) {}\r
    const activeSnap = await getDoc(doc(db, "schools", currentAdminId, "settings", "activeSession"));\r
    activeSessionId = viewSessionId || (activeSnap.exists() ? activeSnap.data().sessionId || "" : "");\r
    if (!activeSessionId) return;\r
    const sessionSnap = await getDoc(doc(db, "schools", currentAdminId, "sessions", activeSessionId));\r
    if (!sessionSnap.exists()) {\r
      try { if (viewSessionId) localStorage.removeItem("schoolix.viewSessionId"); } catch (_) {}\r
      activeSessionId = activeSnap.exists() ? activeSnap.data().sessionId || "" : "";\r
      if (!activeSessionId || activeSessionId === viewSessionId) return;\r
      const fallbackSnap = await getDoc(doc(db, "schools", currentAdminId, "sessions", activeSessionId));\r
      if (!fallbackSnap.exists()) return;\r
      const fallbackData = fallbackSnap.data();\r
      activeSessionLabel = fallbackData.session || fallbackData.name || "";\r
      return;\r
    }\r
    const data = sessionSnap.data();\r
    activeSessionLabel = data.session || data.name || "";\r
  } catch (e) { console.error("Session load error:", e); }\r
}\r
\r
function normalizeTermKey(value) {\r
  return String(value || "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");\r
}\r
\r
function getTermLabel(termKey) {\r
  return allTerms.find((term) => term.termKey === termKey)?.label || termKey || "Selected term";\r
}\r
\r
function getTermLockKey(termKey) {\r
  if (!termKey) return "";\r
  return activeSessionId ? \`\${activeSessionId}__\${termKey}\` : termKey;\r
}\r
\r
function isTermLocked(termKey) {\r
  return reportTermLocks[getTermLockKey(termKey)]?.locked === true;\r
}\r
\r
function getTermVisibilityKey(termKey) {\r
  return getTermLockKey(termKey);\r
}\r
\r
function isTermLive(termKey) {\r
  return reportTermVisibility[getTermVisibilityKey(termKey)]?.live === true;\r
}\r
\r
async function sendResultLiveNotification(termLabel) {\r
  const token = await auth.currentUser?.getIdToken(true);\r
  if (!token) return;\r
  const response = await fetch(RESULT_NOTIFICATION_SEND_URL, {\r
    method: "POST",\r
    headers: {\r
      "Content-Type": "application/json",\r
      "apikey": RESULT_NOTIFICATION_ANON_KEY,\r
      "Authorization": \`Bearer \${RESULT_NOTIFICATION_ANON_KEY}\`,\r
      "x-firebase-auth": token\r
    },\r
    body: JSON.stringify({\r
      title: "Result is live",\r
      message: \`\${termLabel} result is now live. Students with cleared dues can view it in the app.\`,\r
      audience: "students"\r
    })\r
  });\r
  if (!response.ok) throw new Error(await response.text());\r
}\r
\r
function getReportTermKey(report = {}) {\r
  return report.termKey || normalizeTermKey(report.termLabel || report.term || "");\r
}\r
\r
async function loadTermsAndLocks() {\r
  allTerms = [];\r
  reportTermLocks = {};\r
  reportTermVisibility = {};\r
  try {\r
    const termSnap = await getDocs(collection(db, "schools", currentAdminId, "terms"));\r
    const unique = new Map();\r
    termSnap.docs\r
      .map(d => ({ id: d.id, ...d.data() }))\r
      .filter(term => {\r
        if (!activeSessionId && !activeSessionLabel) return true;\r
        if (!term.sessionId && !term.session && !term.currentYear && !term.academicSession) return true;\r
        return term.sessionId === activeSessionId ||\r
          term.session === activeSessionLabel ||\r
          term.currentYear === activeSessionLabel ||\r
          term.academicSession === activeSessionLabel;\r
      })\r
      .forEach(term => {\r
        const termKey = term.termKey || normalizeTermKey(term.label || term.term || term.name || term.id);\r
        if (!termKey) return;\r
        unique.set(termKey, {\r
          ...term,\r
          termKey,\r
          label: term.label || term.term || term.name || termKey\r
        });\r
      });\r
    allTerms = Array.from(unique.values()).sort((a, b) => (a.createdAt?.seconds || 0) - (b.createdAt?.seconds || 0));\r
\r
    const lockSnap = await getDoc(doc(db, "schools", currentAdminId, "settings", "reportCardTermLocks"));\r
    reportTermLocks = lockSnap.exists() ? (lockSnap.data().locks || {}) : {};\r
    const visibilitySnap = await getDoc(doc(db, "schools", currentAdminId, "settings", "reportCardTermVisibility"));\r
    reportTermVisibility = visibilitySnap.exists() ? (visibilitySnap.data().terms || {}) : {};\r
  } catch (e) { console.error("Term lock load error:", e); }\r
  populateTermControls();\r
  updateTermLockUI();\r
  updateTermLiveUI();\r
}\r
\r
function populateTermControls() {\r
  const lockSelect = document.getElementById("termLockSelect");\r
  const liveSelect = document.getElementById("termLiveSelect");\r
  const filterSelect = document.getElementById("termFilter");\r
  if (lockSelect) {\r
    lockSelect.innerHTML = allTerms.length\r
      ? allTerms.map(term => \`<option value="\${escapeHtml(term.termKey)}">\${escapeHtml(term.label)}</option>\`).join("")\r
      : '<option value="">No terms found</option>';\r
    if (!selectedLockTermKey || !allTerms.some(term => term.termKey === selectedLockTermKey)) {\r
      selectedLockTermKey = allTerms[0]?.termKey || "";\r
    }\r
    lockSelect.value = selectedLockTermKey;\r
  }\r
  if (liveSelect) {\r
    liveSelect.innerHTML = allTerms.length\r
      ? allTerms.map(term => \`<option value="\${escapeHtml(term.termKey)}">\${escapeHtml(term.label)}</option>\`).join("")\r
      : '<option value="">No terms found</option>';\r
    if (!selectedLiveTermKey || !allTerms.some(term => term.termKey === selectedLiveTermKey)) {\r
      selectedLiveTermKey = selectedLockTermKey || allTerms[0]?.termKey || "";\r
    }\r
    liveSelect.value = selectedLiveTermKey;\r
  }\r
  if (filterSelect) {\r
    const current = filterSelect.value;\r
    filterSelect.innerHTML = '<option value="">All Terms</option>' +\r
      allTerms.map(term => \`<option value="\${escapeHtml(term.termKey)}">\${escapeHtml(term.label)}</option>\`).join("");\r
    filterSelect.value = allTerms.some(term => term.termKey === current) ? current : "";\r
  }\r
}\r
\r
function updateTermLockUI() {\r
  const btn = document.getElementById("termLockToggleBtn");\r
  const btnText = document.getElementById("termLockToggleText");\r
  const btnIcon = btn?.querySelector("svg use");\r
  const status = document.getElementById("termLockStatus");\r
  const statusText = status?.querySelector("span");\r
  const statusIcon = status?.querySelector("svg use");\r
  const banner = document.getElementById("lockBanner");\r
  const locked = isTermLocked(selectedLockTermKey);\r
\r
  if (!selectedLockTermKey) {\r
    if (btn) btn.disabled = true;\r
    if (statusText) statusText.textContent = "No term";\r
    if (banner) banner.classList.remove("show");\r
    return;\r
  }\r
  if (btn) btn.disabled = false;\r
  if (locked) {\r
    btn.classList.remove("danger"); btn.classList.add("success");\r
    btnText.textContent = "Unlock Term";\r
    btnIcon?.setAttribute("href", "#i-unlock");\r
    status.classList.remove("unlocked"); status.classList.add("locked");\r
    statusText.textContent = "Locked";\r
    statusIcon?.setAttribute("href", "#i-lock");\r
    banner.classList.add("show");\r
  } else {\r
    btn.classList.remove("success"); btn.classList.add("danger");\r
    btnText.textContent = "Lock Term";\r
    btnIcon?.setAttribute("href", "#i-lock");\r
    status.classList.remove("locked"); status.classList.add("unlocked");\r
    statusText.textContent = "Unlocked";\r
    statusIcon?.setAttribute("href", "#i-unlock");\r
    banner.classList.remove("show");\r
  }\r
}\r
\r
window.onTermLockSelectChange = () => {\r
  selectedLockTermKey = document.getElementById("termLockSelect").value;\r
  updateTermLockUI();\r
};\r
\r
window.toggleSelectedTermLock = async () => {\r
  if (!currentAdminId) return;\r
  if (!selectedLockTermKey) return alert("Select a term first.");\r
  const newState = !isTermLocked(selectedLockTermKey);\r
  const label = getTermLabel(selectedLockTermKey);\r
  const msg = newState\r
    ? \`Lock report cards for \${label}?\\n\\nTeachers will NOT be able to edit marks or regenerate report cards for this term. Admin can still edit from this page.\`\r
    : \`Unlock report cards for \${label}?\\n\\nTeachers will be able to edit marks and regenerate report cards for this term again.\`;\r
  if (!confirm(msg)) return;\r
  try {\r
    const lockKey = getTermLockKey(selectedLockTermKey);\r
    reportTermLocks = {\r
      ...reportTermLocks,\r
      [lockKey]: {\r
        locked: newState,\r
        termKey: selectedLockTermKey,\r
        termLabel: label,\r
        sessionId: activeSessionId || "",\r
        session: activeSessionLabel || "",\r
        updatedAt: new Date(),\r
        updatedBy: auth.currentUser?.uid || "admin"\r
      }\r
    };\r
    await setDoc(doc(db, "schools", currentAdminId, "settings", "reportCardTermLocks"), {\r
      locks: reportTermLocks,\r
      updatedAt: new Date(),\r
      updatedBy: auth.currentUser?.uid || "admin"\r
    }, { merge: true });\r
    updateTermLockUI();\r
    alert(newState ? \`\${label} locked successfully.\` : \`\${label} unlocked successfully.\`);\r
  } catch (e) {\r
    console.error(e);\r
    alert("Failed to update term lock.");\r
  }\r
};\r
\r
function updateTermLiveUI() {\r
  const btn = document.getElementById("termLiveToggleBtn");\r
  const btnText = document.getElementById("termLiveToggleText");\r
  const btnIcon = btn?.querySelector("svg use");\r
  const status = document.getElementById("termLiveStatus");\r
  const statusText = status?.querySelector("span");\r
  const statusIcon = status?.querySelector("svg use");\r
  const banner = document.getElementById("liveBanner");\r
  const live = isTermLive(selectedLiveTermKey);\r
\r
  if (!selectedLiveTermKey) {\r
    if (btn) btn.disabled = true;\r
    if (statusText) statusText.textContent = "No term";\r
    if (banner) banner.classList.remove("show");\r
    return;\r
  }\r
  if (btn) btn.disabled = false;\r
  if (live) {\r
    btn.classList.remove("success"); btn.classList.add("warning");\r
    btnText.textContent = "Hide From Students";\r
    btnIcon?.setAttribute("href", "#i-lock");\r
    status.classList.remove("hidden"); status.classList.add("live");\r
    statusText.textContent = "Live";\r
    statusIcon?.setAttribute("href", "#i-eye");\r
    banner.classList.add("show");\r
  } else {\r
    btn.classList.remove("warning"); btn.classList.add("success");\r
    btnText.textContent = "Make Live";\r
    btnIcon?.setAttribute("href", "#i-eye");\r
    status.classList.remove("live"); status.classList.add("hidden");\r
    statusText.textContent = "Hidden";\r
    statusIcon?.setAttribute("href", "#i-lock");\r
    banner.classList.remove("show");\r
  }\r
}\r
\r
window.onTermLiveSelectChange = () => {\r
  selectedLiveTermKey = document.getElementById("termLiveSelect").value;\r
  updateTermLiveUI();\r
};\r
\r
window.toggleSelectedTermLive = async () => {\r
  if (!currentAdminId) return;\r
  if (!selectedLiveTermKey) return alert("Select a term first.");\r
  const newState = !isTermLive(selectedLiveTermKey);\r
  const label = getTermLabel(selectedLiveTermKey);\r
  const msg = newState\r
    ? \`Make \${label} live?\\n\\nStudents with no pending dues will be able to view this term's result. Students with dues will stay locked.\`\r
    : \`Hide \${label} from students?\\n\\nTeachers and admin can still see reports, but students will not see this term.\`;\r
  if (!confirm(msg)) return;\r
  try {\r
    const visibilityKey = getTermVisibilityKey(selectedLiveTermKey);\r
    reportTermVisibility = {\r
      ...reportTermVisibility,\r
      [visibilityKey]: {\r
        live: newState,\r
        termKey: selectedLiveTermKey,\r
        termLabel: label,\r
        sessionId: activeSessionId || "",\r
        session: activeSessionLabel || "",\r
        updatedAt: new Date(),\r
        updatedBy: auth.currentUser?.uid || "admin"\r
      }\r
    };\r
    await setDoc(doc(db, "schools", currentAdminId, "settings", "reportCardTermVisibility"), {\r
      terms: reportTermVisibility,\r
      updatedAt: new Date(),\r
      updatedBy: auth.currentUser?.uid || "admin"\r
    }, { merge: true });\r
    if (newState) {\r
      try {\r
        await sendResultLiveNotification(label);\r
      } catch (notificationError) {\r
        console.warn("Result live notification failed", notificationError);\r
      }\r
    }\r
    updateTermLiveUI();\r
    alert(newState ? \`\${label} is now live for eligible students.\` : \`\${label} is now hidden from students.\`);\r
  } catch (e) {\r
    console.error(e);\r
    alert("Failed to update result visibility.");\r
  }\r
};\r
\r
function reportBelongsToActiveSession(report) {\r
  if (!activeSessionId && !activeSessionLabel) return true;\r
  if (!report.sessionId && !report.session && !report.currentYear && !report.academicSession) return false;\r
  return report.sessionId === activeSessionId ||\r
    report.session === activeSessionLabel ||\r
    report.currentYear === activeSessionLabel ||\r
    report.academicSession === activeSessionLabel;\r
}\r
\r
function isAdminGenerated(report) {\r
  if (report.generatedByAdmin === true) return true;\r
  if (report.createdByRole && String(report.createdByRole).toLowerCase() === "admin") return true;\r
  const cb = String(report.createdBy || "").toLowerCase();\r
  return cb === "admin" || cb.includes("admin");\r
}\r
\r
onAuthStateChanged(auth, async (user) => {\r
  if (!user) { window.location.href = "#/index.html"; return; }\r
  currentAdminId = user.uid;\r
  await loadAllReports();\r
});\r
\r
window.loadAllReports = async () => {\r
  if (!currentAdminId) return;\r
  const tableBody = document.getElementById('tableBody');\r
  tableBody.innerHTML = '<tr><td colspan="9" class="loading"><span class="spinner"></span> Loading all reports...</td></tr>';\r
  try {\r
    await loadActiveSession();\r
    await loadTermsAndLocks();\r
    const q = query(collection(db, "schools", currentAdminId, "reportCards"), orderBy('createdAt', 'desc'));\r
    const snapshot = await getDocs(q);\r
    allReports = [];\r
    snapshot.forEach((d) => {\r
      const report = { id: d.id, ...d.data() };\r
      if (reportBelongsToActiveSession(report)) allReports.push(report);\r
    });\r
    populateClassResultControls();\r
    displayReports(allReports);\r
    updateStats(allReports);\r
  } catch (error) {\r
    console.error("Load error:", error);\r
    tableBody.innerHTML = '<tr><td colspan="9" class="empty-state"><svg><use href="#i-alert"/></svg><h3>Error loading reports</h3><p>' + (error.message || '') + '</p></td></tr>';\r
  }\r
};\r
\r
function getReportClass(report = {}) {\r
  return String(report.student?.class || report.class || "").trim();\r
}\r
\r
function getReportSection(report = {}) {\r
  return String(report.student?.section || report.section || "").trim();\r
}\r
\r
function populateClassResultControls() {\r
  const classSelect = document.getElementById("classResultSelect");\r
  const sectionSelect = document.getElementById("sectionResultSelect");\r
  if (!classSelect || !sectionSelect) return;\r
  const previousClass = classSelect.value;\r
  const classes = Array.from(new Set(allReports.map(getReportClass).filter(Boolean)))\r
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));\r
  classSelect.innerHTML = '<option value="">All Classes</option>' +\r
    classes.map(className => \`<option value="\${escapeHtml(className)}">\${escapeHtml(className)}</option>\`).join("");\r
  classSelect.value = classes.includes(previousClass) ? previousClass : "";\r
  populateClassResultSections();\r
}\r
\r
window.populateClassResultSections = () => {\r
  const classSelect = document.getElementById("classResultSelect");\r
  const sectionSelect = document.getElementById("sectionResultSelect");\r
  if (!classSelect || !sectionSelect) return;\r
  const selectedClass = classSelect.value;\r
  const previousSection = sectionSelect.value;\r
  const sections = Array.from(new Set(\r
    allReports\r
      .filter(report => !selectedClass || getReportClass(report) === selectedClass)\r
      .map(getReportSection)\r
      .filter(Boolean)\r
  )).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));\r
  sectionSelect.innerHTML = '<option value="">All Sections</option>' +\r
    sections.map(section => \`<option value="\${escapeHtml(section)}">\${escapeHtml(section)}</option>\`).join("");\r
  sectionSelect.value = sections.includes(previousSection) ? previousSection : "";\r
};\r
\r
window.showClassWiseResults = () => {\r
  const selectedClass = document.getElementById("classResultSelect")?.value || "";\r
  const selectedSection = document.getElementById("sectionResultSelect")?.value || "";\r
  const filtered = allReports.filter(report => {\r
    const classMatch = !selectedClass || getReportClass(report) === selectedClass;\r
    const sectionMatch = !selectedSection || getReportSection(report) === selectedSection;\r
    return classMatch && sectionMatch;\r
  });\r
  document.getElementById("searchClass").value = selectedClass\r
    ? \`\${selectedClass}\${selectedSection ? \`-\${selectedSection}\` : ""}\`\r
    : "";\r
  document.getElementById("searchName").value = "";\r
  document.getElementById("searchStudentId").value = "";\r
  document.getElementById("gradeFilter").value = "";\r
  displayReports(filtered);\r
  updateStats(filtered);\r
};\r
\r
function escapeHtml(s) {\r
  return String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));\r
}\r
\r
window.displayReports = (reports) => {\r
  const tableBody = document.getElementById('tableBody');\r
  if (reports.length === 0) {\r
    tableBody.innerHTML = '<tr><td colspan="9"><div class="empty-state"><svg><use href="#i-empty"/></svg><h3>No Reports Found</h3><p>No report cards match your criteria</p></div></td></tr>';\r
    return;\r
  }\r
  tableBody.innerHTML = '';\r
  reports.forEach(report => {\r
    const studentName = report.student?.name || 'N/A';\r
    const studentId = report.student?.studentId || 'N/A';\r
    const classInfo = \`\${report.student?.class || '-'}-\${report.student?.section || '-'}\`;\r
    const percentage = report.percentage ? Number(report.percentage).toFixed(1) : 0;\r
    const grade = report.grade || 'N/A';\r
    const termLabel = report.termLabel || report.term || getTermLabel(getReportTermKey(report)) || 'N/A';\r
    const date = report.createdAt?.toDate ? new Date(report.createdAt.toDate()).toLocaleDateString('en-IN') : 'N/A';\r
    const gradeClass = 'grade-' + String(grade).toLowerCase();\r
    const percentageClass = percentage >= 75 ? 'high' : percentage >= 40 ? 'medium' : 'low';\r
    const generatedBy = isAdminGenerated(report)\r
      ? \`<span class="admin-badge"><svg class="icon-sm"><use href="#i-crown"/></svg> Admin Generated</span>\`\r
      : \`<span class="teacher-badge"><svg class="icon-sm"><use href="#i-user"/></svg> \${escapeHtml(report.createdBy || 'Teacher')}</span>\`;\r
\r
    const row = document.createElement('tr');\r
    row.innerHTML = \`\r
      <td><div class="student-cell">\${escapeHtml(studentName)}</div></td>\r
      <td><span class="student-id">\${escapeHtml(studentId)}</span></td>\r
      <td>\${escapeHtml(classInfo)}</td>\r
      <td><span class="percentage \${percentageClass}">\${percentage}%</span></td>\r
      <td><span class="grade-badge \${gradeClass}">\${escapeHtml(grade)}</span></td>\r
      <td>\${escapeHtml(termLabel)}</td>\r
      <td>\${generatedBy}</td>\r
      <td>\${date}</td>\r
      <td>\r
        <div class="actions">\r
          <button class="action-btn view" onclick="viewReport('\${report.id}')"><svg class="icon-sm"><use href="#i-eye"/></svg> View</button>\r
          <button class="action-btn edit" onclick="editReport('\${report.id}')"><svg class="icon-sm"><use href="#i-clipboard"/></svg> Edit</button>\r
          <button class="action-btn print" onclick="printReport('\${report.id}')"><svg class="icon-sm"><use href="#i-print"/></svg> Print</button>\r
          <button class="action-btn delete" onclick="deleteReportCard('\${report.id}', '\${escapeHtml(studentName).replace(/'/g,"\\\\'")}')"><svg class="icon-sm"><use href="#i-trash"/></svg> Delete</button>\r
        </div>\r
      </td>\`;\r
    tableBody.appendChild(row);\r
  });\r
};\r
\r
window.updateStats = (reports) => {\r
  const total = reports.length;\r
  const grid = document.getElementById('statsGrid');\r
  if (total === 0) { grid.style.display = 'none'; return; }\r
  const avgPercentage = reports.reduce((s, r) => s + (Number(r.percentage) || 0), 0) / total;\r
  const passedCount = reports.filter(r => (Number(r.percentage) || 0) >= 40).length;\r
  const aPlusCount = reports.filter(r => r.grade === 'A+').length;\r
  grid.style.display = 'grid';\r
  document.getElementById('totalReports').textContent = total;\r
  document.getElementById('avgPercentage').textContent = avgPercentage.toFixed(1) + '%';\r
  document.getElementById('passedCount').textContent = passedCount;\r
  document.getElementById('aPlusCount').textContent = aPlusCount;\r
};\r
\r
window.applyFilters = () => {\r
  const searchName = document.getElementById('searchName').value.toLowerCase();\r
  const searchStudentId = document.getElementById('searchStudentId').value.toLowerCase();\r
  const searchClass = document.getElementById('searchClass').value.toUpperCase();\r
  const gradeFilter = document.getElementById('gradeFilter').value;\r
  const termFilter = document.getElementById('termFilter').value;\r
  const filtered = allReports.filter(report => {\r
    const nameMatch = !searchName || (report.student?.name || '').toLowerCase().includes(searchName);\r
    const studentIdMatch = !searchStudentId || String(report.student?.studentId || report.studentId || '').toLowerCase().includes(searchStudentId);\r
    const classMatch = !searchClass || \`\${report.student?.class || ''}-\${report.student?.section || ''}\`.toUpperCase().includes(searchClass);\r
    const gradeMatch = !gradeFilter || report.grade === gradeFilter;\r
    const termMatch = !termFilter || getReportTermKey(report) === termFilter;\r
    return nameMatch && studentIdMatch && classMatch && gradeMatch && termMatch;\r
  });\r
  displayReports(filtered);\r
  updateStats(filtered);\r
};\r
\r
window.resetFilters = () => {\r
  document.getElementById('searchName').value = '';\r
  document.getElementById('searchStudentId').value = '';\r
  document.getElementById('searchClass').value = '';\r
  document.getElementById('gradeFilter').value = '';\r
  document.getElementById('termFilter').value = '';\r
  displayReports(allReports);\r
  updateStats(allReports);\r
};\r
\r
window.viewReport = (reportId) => {\r
  const report = allReports.find(r => r.id === reportId);\r
  if (!report) return alert('Report not found');\r
  const percentage = report.percentage ? Number(report.percentage).toFixed(1) : 0;\r
  const subjectsHtml = (report.subjects || []).map(sub => \`\r
    <tr><td>\${escapeHtml(sub.name)}</td><td>\${escapeHtml(sub.obtained)} / \${escapeHtml(sub.maxMarks)}</td></tr>\`).join('');\r
  const genBadge = isAdminGenerated(report)\r
    ? \`<span class="admin-badge"><svg class="icon-sm"><use href="#i-crown"/></svg> Admin Generated</span>\`\r
    : \`<span class="teacher-badge"><svg class="icon-sm"><use href="#i-user"/></svg> \${escapeHtml(report.createdBy || 'Teacher')}</span>\`;\r
\r
  document.getElementById('modalBody').innerHTML = \`\r
    <div class="report-info">\r
      <div class="report-info-item"><span class="report-info-label">Student Name</span><span class="report-info-value">\${escapeHtml(report.student?.name || 'N/A')}</span></div>\r
      <div class="report-info-item"><span class="report-info-label">Student ID</span><span class="report-info-value">\${escapeHtml(report.student?.studentId || 'N/A')}</span></div>\r
      <div class="report-info-item"><span class="report-info-label">Class</span><span class="report-info-value">\${escapeHtml(report.student?.class || 'N/A')}-\${escapeHtml(report.student?.section || 'N/A')}</span></div>\r
      <div class="report-info-item"><span class="report-info-label">Grade</span><span class="report-info-value">\${escapeHtml(report.grade || 'N/A')}</span></div>\r
      <div class="report-info-item"><span class="report-info-label">Percentage</span><span class="report-info-value">\${percentage}%</span></div>\r
      <div class="report-info-item"><span class="report-info-label">Generated By</span><span class="report-info-value">\${genBadge}</span></div>\r
    </div>\r
    <h3 class="section-title" style="font-size:16px;">Subject Marks</h3>\r
    <table class="subjects-table">\r
      <thead><tr><th>Subject</th><th>Marks</th></tr></thead>\r
      <tbody>\${subjectsHtml || '<tr><td colspan="2" style="text-align:center;color:#718096;">No subjects</td></tr>'}</tbody>\r
    </table>\`;\r
  document.getElementById('reportModal').style.display = 'block';\r
};\r
\r
function getReportGrade(percentage) {\r
  const pct = Number(percentage || 0);\r
  if (pct >= 90) return "A+";\r
  if (pct >= 75) return "A";\r
  if (pct >= 60) return "B";\r
  if (pct >= 40) return "C";\r
  return "F";\r
}\r
\r
function getReportMarksTermKey(report = {}) {\r
  const termKey = getReportTermKey(report);\r
  return report.sessionId ? \`\${report.sessionId}__\${termKey}\` : termKey;\r
}\r
\r
window.editReport = (reportId) => {\r
  const report = allReports.find(r => r.id === reportId);\r
  if (!report) return alert('Report not found');\r
  const subjects = report.subjects || [];\r
  const rows = subjects.map((sub, index) => \`\r
    <div class="edit-row">\r
      <div>\r
        <strong>\${escapeHtml(sub.name || \`Subject \${index + 1}\`)}</strong><br>\r
        <small>Max marks: \${escapeHtml(sub.maxMarks || 100)}</small>\r
      </div>\r
      <input class="admin-mark-input" data-index="\${index}" data-subject="\${escapeHtml(sub.name || '')}" type="number" min="0" max="\${escapeHtml(sub.maxMarks || 100)}" value="\${escapeHtml(sub.obtained ?? 0)}">\r
      <input class="admin-max-input" data-index="\${index}" type="number" min="1" value="\${escapeHtml(sub.maxMarks || 100)}">\r
    </div>\r
  \`).join('');\r
\r
  document.getElementById('modalBody').innerHTML = \`\r
    <div class="report-info">\r
      <div class="report-info-item"><span class="report-info-label">Student</span><span class="report-info-value">\${escapeHtml(report.student?.name || 'N/A')}</span></div>\r
      <div class="report-info-item"><span class="report-info-label">Student ID</span><span class="report-info-value">\${escapeHtml(report.student?.studentId || 'N/A')}</span></div>\r
      <div class="report-info-item"><span class="report-info-label">Term</span><span class="report-info-value">\${escapeHtml(report.termLabel || report.term || 'N/A')}</span></div>\r
      <div class="report-info-item"><span class="report-info-label">Lock Status</span><span class="report-info-value">\${isTermLocked(getReportTermKey(report)) ? 'Locked for teachers' : 'Unlocked'}</span></div>\r
    </div>\r
    <h3 class="section-title" style="font-size:16px;">Admin Edit Marks</h3>\r
    <div class="edit-grid">\${rows || '<div class="empty-state">No subjects found in this report.</div>'}</div>\r
    <div style="display:flex;gap:10px;justify-content:flex-end;margin-top:22px;flex-wrap:wrap;">\r
      <button class="secondary" onclick="viewReport('\${report.id}')">Cancel</button>\r
      <button class="primary" onclick="saveReportEdits('\${report.id}')"><svg class="icon"><use href="#i-check"/></svg> Save Marks</button>\r
    </div>\r
  \`;\r
  document.getElementById('reportModal').style.display = 'block';\r
};\r
\r
window.saveReportEdits = async (reportId) => {\r
  const report = allReports.find(r => r.id === reportId);\r
  if (!report) return alert('Report not found');\r
  const marks = Array.from(document.querySelectorAll('.admin-mark-input'));\r
  const maxInputs = Array.from(document.querySelectorAll('.admin-max-input'));\r
  const previousSubjects = report.subjects || [];\r
  let total = 0;\r
  let totalMax = 0;\r
  const updatedSubjects = previousSubjects.map((sub, index) => {\r
    const obtained = Number(marks.find(input => Number(input.dataset.index) === index)?.value || 0);\r
    const maxMarks = Math.max(1, Number(maxInputs.find(input => Number(input.dataset.index) === index)?.value || sub.maxMarks || 100));\r
    total += obtained;\r
    totalMax += maxMarks;\r
    return { ...sub, obtained, maxMarks };\r
  });\r
  const percentage = totalMax ? Math.round((total / totalMax) * 100) : 0;\r
  const grade = getReportGrade(percentage);\r
  const studentId = report.student?.studentId || report.studentId;\r
  const marksTermKey = getReportMarksTermKey(report);\r
\r
  try {\r
    await setDoc(doc(db, "schools", currentAdminId, "reportCards", reportId), {\r
      subjects: updatedSubjects,\r
      totalMarks: total,\r
      totalMaxMarks: totalMax,\r
      percentage,\r
      grade,\r
      generatedByAdmin: true,\r
      editedByAdmin: true,\r
      updatedAt: new Date(),\r
      updatedBy: auth.currentUser?.uid || "admin"\r
    }, { merge: true });\r
\r
    if (studentId && marksTermKey) {\r
      const marksPayload = {};\r
      updatedSubjects.forEach((sub) => {\r
        if (!sub.name) return;\r
        marksPayload[sub.name] = {\r
          obtained: Number(sub.obtained || 0),\r
          maxMarks: Number(sub.maxMarks || 100)\r
        };\r
      });\r
      await setDoc(doc(db, "schools", currentAdminId, "marks", studentId), {\r
        terms: { [marksTermKey]: marksPayload },\r
        updatedAt: new Date(),\r
        updatedBy: auth.currentUser?.uid || "admin",\r
        updatedByRole: "admin"\r
      }, { merge: true });\r
    }\r
\r
    alert("Marks updated successfully.");\r
    await loadAllReports();\r
    editReport(reportId);\r
  } catch (error) {\r
    console.error("Save marks error:", error);\r
    alert("Unable to save marks.");\r
  }\r
};\r
\r
window.printReport = (reportId) => {\r
  const report = allReports.find(r => r.id === reportId);\r
  if (!report) return alert('Report not found');\r
  const percentage = report.percentage ? Number(report.percentage).toFixed(1) : 0;\r
  const genLabel = isAdminGenerated(report) ? 'Admin Generated' : (report.createdBy || 'Teacher');\r
  const subjectsHtml = (report.subjects || []).map(sub => \`\r
    <tr><td>\${escapeHtml(sub.name)}</td><td>\${escapeHtml(sub.obtained)}</td><td>\${escapeHtml(sub.maxMarks)}</td></tr>\`).join('');\r
  const w = window.open('', '_blank');\r
  w.document.write(\`<!DOCTYPE html><html><head>\r
<title>Report Card</title>\r
    <style>\r
      body{font-family:Segoe UI,sans-serif;padding:40px;color:#2d3748;}\r
      .rc{max-width:800px;margin:0 auto;border:2px solid #667eea;border-radius:12px;padding:30px;}\r
      h1{text-align:center;color:#667eea;margin:0 0 5px;}\r
      .sub{text-align:center;color:#718096;margin-bottom:25px;}\r
      .info{display:grid;grid-template-columns:1fr 1fr;gap:15px;margin-bottom:25px;padding:15px;background:#f7fafc;border-radius:8px;}\r
      .info div{font-size:14px;} .info b{color:#4a5568;display:block;font-size:11px;text-transform:uppercase;margin-bottom:3px;}\r
      table{width:100%;border-collapse:collapse;margin:15px 0;}\r
      th,td{padding:10px;border:1px solid #e2e8f0;text-align:left;}\r
      th{background:#667eea;color:white;}\r
      .totals{display:flex;justify-content:space-around;padding:20px;background:#f0f4ff;border-radius:8px;margin-top:20px;}\r
      .totals div{text-align:center;} .totals b{display:block;font-size:24px;color:#667eea;}\r
      .foot{text-align:center;margin-top:30px;font-size:12px;color:#718096;}\r
      @media print{body{padding:0;} .rc{border:none;}}\r
    </style></head><body>\r
    <div class="rc">\r
      <h1>Student Report Card</h1>\r
      <p class="sub">Academic Performance Report</p>\r
      <div class="info">\r
        <div><b>Student Name</b>\${escapeHtml(report.student?.name || 'N/A')}</div>\r
        <div><b>Student ID</b>\${escapeHtml(report.student?.studentId || 'N/A')}</div>\r
        <div><b>Class</b>\${escapeHtml(report.student?.class || 'N/A')}-\${escapeHtml(report.student?.section || 'N/A')}</div>\r
        <div><b>Generated By</b>\${escapeHtml(genLabel)}</div>\r
      </div>\r
      <table>\r
        <thead><tr><th>Subject</th><th>Marks Obtained</th><th>Max Marks</th></tr></thead>\r
        <tbody>\${subjectsHtml}</tbody>\r
      </table>\r
      <div class="totals">\r
        <div><b>\${escapeHtml(report.grade || 'N/A')}</b>Overall Grade</div>\r
        <div><b>\${percentage}%</b>Percentage</div>\r
      </div>\r
      <p class="foot">Generated on \${new Date().toLocaleDateString('en-IN',{year:'numeric',month:'long',day:'numeric'})}</p>\r
    </div>\r
    <script>window.onload=()=>window.print();<\\/script></body></html>\`);\r
  w.document.close();\r
};\r
\r
window.deleteReportCard = async (reportId, studentName) => {\r
  if (!confirm(\`Delete report card for "\${studentName}"?\\n\\nThis action cannot be undone.\`)) return;\r
  try {\r
    await deleteDoc(doc(db, "schools", currentAdminId, "reportCards", reportId));\r
    alert('Report card deleted successfully');\r
    await loadAllReports();\r
  } catch (error) {\r
    console.error("Delete error:", error);\r
    alert('Error deleting report card');\r
  }\r
};\r
\r
function setReportModalOpen(isOpen) {\r
  const modal = document.getElementById('reportModal');\r
  if (!modal) return;\r
  modal.style.display = isOpen ? 'block' : 'none';\r
  modal.setAttribute('aria-hidden', isOpen ? 'false' : 'true');\r
}\r
\r
window.closeModal = (event) => {\r
  event?.preventDefault?.();\r
  event?.stopPropagation?.();\r
  setReportModalOpen(false);\r
};\r
\r
document.getElementById('reportModal')?.addEventListener('click', (event) => {\r
  if (event.target === event.currentTarget) setReportModalOpen(false);\r
});\r
\r
document.addEventListener('keydown', (event) => {\r
  if (event.key === 'Escape' && document.getElementById('reportModal')?.style.display !== 'none') {\r
    setReportModalOpen(false);\r
  }\r
});\r
\r
document.getElementById('searchName').addEventListener('input', applyFilters);\r
document.getElementById('searchStudentId').addEventListener('input', applyFilters);\r
document.getElementById('searchClass').addEventListener('input', applyFilters);\r
document.getElementById('gradeFilter').addEventListener('change', applyFilters);\r
document.getElementById('termFilter').addEventListener('change', applyFilters);\r
\r
`},{attributes:{type:"module",src:"access-control.js"},text:""},{attributes:{src:"schoolix-polish.js"},text:""},{attributes:{src:"admin-shell.js?v=navbar-20260721"},text:""}]};export{e as default};
