const e={file:"admin-timetable.html",title:"Admin Timetable",htmlClass:"",bodyClass:"sx-admin-tool",body:`\r
<div id="sxPageLoader" class="sx-page-loader" role="status" aria-live="polite">\r
  <section class="sx-loader-card" aria-label="Loading page">\r
    <div class="sx-loader-mark"></div>\r
    <div class="sx-loader-title">Schoolix Timetable</div>\r
    <div class="sx-loader-subtitle">Preparing classes and teachers...</div>\r
    <div class="sx-loader-bar"></div>\r
  </section>\r
</div>\r
\r
<!-- LOADING -->\r
<div class="loading-overlay" id="loadingOverlay">\r
  <div class="loader">\r
    <div class="spinner"></div>\r
    <p id="loadingText">Loading data...</p>\r
  </div>\r
</div>\r
\r
<!-- TOAST -->\r
<div class="toast" id="toast">\r
  <span class="toast-icon" id="toastIcon"></span>\r
  <span id="toastMsg"></span>\r
</div>\r
\r
<div class="subjects-modal" id="syncTimeModal" aria-hidden="true">\r
  <div class="subjects-panel" role="dialog" aria-modal="true" aria-labelledby="syncTimeModalTitle">\r
    <div class="subjects-panel-head">\r
      <div>\r
        <div class="subjects-title" id="syncTimeModalTitle">Sync Period Time</div>\r
        <div class="subjects-meta" id="syncTimeModalMeta">Choose class and section to copy period timings from.</div>\r
      </div>\r
      <button class="btn btn-secondary subject-delete-btn" onclick="closeSyncTimeModal()" aria-label="Close sync time">\r
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">\r
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>\r
        </svg>\r
      </button>\r
    </div>\r
    <div class="subjects-body">\r
      <div class="sync-time-grid">\r
        <div class="field-group">\r
          <label>Class</label>\r
          <select id="syncClassSelect" onchange="populateSyncSectionSelect()">\r
            <option value="">Select Class</option>\r
          </select>\r
        </div>\r
        <div class="field-group">\r
          <label>Section</label>\r
          <select id="syncSectionSelect">\r
            <option value="">Select Section</option>\r
          </select>\r
        </div>\r
      </div>\r
      <div class="sync-time-note">Only period start and end times will be copied. Subjects and teachers in this timetable will stay the same.</div>\r
    </div>\r
    <div class="subjects-panel-actions">\r
      <button class="btn btn-secondary" onclick="closeSyncTimeModal()">Cancel</button>\r
      <button class="btn btn-success" onclick="syncTimeFromSelectedTimetable()">Sync Time</button>\r
    </div>\r
  </div>\r
</div>\r
\r
<!-- MAIN -->\r
<div class="main">\r
\r
  <!-- PAGE HEADER -->\r
  <div class="page-header">\r
    <h1>\r
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-4px;margin-right:8px;color:var(--accent)">\r
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>\r
        <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>\r
        <line x1="3" y1="10" x2="21" y2="10"/>\r
      </svg>\r
      Class Timetable\r
    </h1>\r
    <p>Create and manage weekly schedules for each class section with subjects, teachers, and timings.</p>\r
  </div>\r
\r
  <!-- CONTROLS -->\r
  <div class="control-card">\r
    <div class="field-group">\r
      <label>\r
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>\r
        Class\r
      </label>\r
      <select id="classSelect">\r
        <option value="">Select Class</option>\r
      </select>\r
    </div>\r
    <div class="field-group">\r
      <label>\r
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>\r
        Section\r
      </label>\r
      <select id="sectionSelect">\r
        <option value="">Select Section</option>\r
      </select>\r
    </div>\r
    <div class="field-group">\r
      <label>\r
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>\r
        View Teacher Timetable\r
      </label>\r
      <select id="teacherViewSelect">\r
        <option value="">Select Teacher</option>\r
      </select>\r
    </div>\r
    <div class="actions">\r
      <button class="btn btn-primary" onclick="loadTimetable()">\r
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">\r
          <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4.18"/>\r
        </svg>\r
        Load Timetable\r
      </button>\r
      <button class="btn btn-secondary" onclick="addPeriod()">\r
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">\r
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>\r
        </svg>\r
        Add Period\r
      </button>\r
      <button class="btn btn-secondary" onclick="openSyncTimeModal()">\r
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">\r
          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/><path d="M4 4v5h5"/>\r
        </svg>\r
        Sync Time\r
      </button>\r
      <button class="btn btn-success" onclick="saveTimetable()">\r
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">\r
          <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>\r
        </svg>\r
        Save Timetable\r
      </button>\r
      <button class="btn btn-secondary" onclick="viewTeacherTimetable()">\r
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">\r
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"/><circle cx="12" cy="12" r="3"/>\r
        </svg>\r
        View Teacher\r
      </button>\r
    </div>\r
  </div>\r
\r
  <div class="teacher-view-card" id="teacherViewCard">\r
    <div class="teacher-view-head">\r
      <div>\r
        <div class="teacher-view-title" id="teacherViewTitle">Teacher Timetable</div>\r
        <div class="teacher-view-meta" id="teacherViewMeta"></div>\r
      </div>\r
      <button class="btn btn-secondary" onclick="closeTeacherTimetableView()">Close View</button>\r
    </div>\r
    <div id="teacherTimetableView"></div>\r
  </div>\r
\r
  <!-- STATS BAR -->\r
  <div class="stats-bar" id="statsBar" style="display:none">\r
    <div class="stat-chip">\r
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/></svg>\r
      <span>Class:</span> <strong id="statClass">—</strong>\r
    </div>\r
    <div class="stat-chip">\r
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>\r
      <span>Section:</span> <strong id="statSection" style="color:var(--gold)">—</strong>\r
    </div>\r
    <div class="stat-chip">\r
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--green)" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>\r
      <span>Periods:</span> <strong id="statPeriods" style="color:var(--green)">0</strong>\r
    </div>\r
    <div class="stat-chip">\r
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>\r
      <span>Days:</span> <strong style="color:var(--muted)">6</strong>\r
    </div>\r
  </div>\r
\r
  <!-- TIMETABLE AREA -->\r
  <div id="timetableContainer">\r
    <div class="empty-state">\r
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">\r
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>\r
        <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>\r
        <line x1="3" y1="10" x2="21" y2="10"/>\r
      </svg>\r
      <h3>No Timetable Loaded</h3>\r
      <p>Select a class and section above, then click "Load Timetable" to get started.</p>\r
    </div>\r
  </div>\r
\r
</div>\r
\r
<script type="module">\r
  import { initializeApp }          from "./firebase-compat.js";\r
  import { getAuth, onAuthStateChanged } from "./firebase-compat.js";\r
  import {\r
    getFirestore, collection, getDocs,\r
    query, where, doc, getDoc, setDoc, serverTimestamp\r
  } from "./firebase-compat.js";\r
\r
  // ── FIREBASE ──\r
  const firebaseConfig = {\r
    apiKey:            "AIzaSyAomGwef93HFT9Xyx7SVW95FPw_IcIAICE",\r
    authDomain:        "schoolix-48107.firebaseapp.com",\r
    projectId:         "schoolix-48107",\r
    storageBucket:     "schoolix-48107.firebasestorage.app",\r
    messagingSenderId: "133937954491",\r
    appId:             "1:133937954491:web:69d8064422617eb8c4339e"\r
  };\r
  const app  = initializeApp(firebaseConfig);\r
  const auth = getAuth(app);\r
  const db   = getFirestore(app);\r
\r
  let currentUser      = null;\r
  let teachers         = [];\r
  let allStudents      = [];\r
  let currentTimetable = null;\r
  let currentClassSubjects = [];\r
  let allTimetables = [];\r
  let timetableCachePromise = null;\r
  let timetableCacheAt = 0;\r
  let loadClassesRun = 0;\r
\r
  const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];\r
\r
  // ── HELPERS ──\r
  function showLoading(on, message = "Loading data...") {\r
    const overlay = document.getElementById("loadingOverlay");\r
    const text = document.getElementById("loadingText");\r
    if (text) text.textContent = message;\r
    overlay.classList.toggle("show", on);\r
  }\r
  function nextPaint() {\r
    return new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));\r
  }\r
  function toast(msg, type = "success") {\r
    const t    = document.getElementById("toast");\r
    const icon = document.getElementById("toastIcon");\r
    document.getElementById("toastMsg").textContent = msg;\r
    t.className = \`toast \${type} show\`;\r
    icon.innerHTML = type === "success"\r
      ? \`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>\`\r
      : \`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>\`;\r
    clearTimeout(t._timer);\r
    t._timer = setTimeout(() => t.classList.remove("show"), 3000);\r
  }\r
\r
  // ── LOAD CLASSES ──\r
  function cleanText(value) {\r
    return String(value || "").replace(/\\s+/g, " ").trim();\r
  }\r
\r
  function canonicalClass(value) {\r
    return cleanText(value);\r
  }\r
\r
  function canonicalSection(value) {\r
    return cleanText(value).toUpperCase();\r
  }\r
\r
  function normalizeIdentity(value) {\r
    return cleanText(value).toLowerCase();\r
  }\r
\r
  function teacherIdentityKey(teacher = {}) {\r
    const legacyUid = normalizeIdentity(teacher.legacyUid || teacher.firebaseUid);\r
    if (legacyUid) return \`uid:\${legacyUid}\`;\r
    const teacherId = normalizeIdentity(teacher.teacherId);\r
    if (teacherId) return \`teacherId:\${teacherId}\`;\r
    const email = normalizeIdentity(teacher.email || teacher.authEmail);\r
    if (email) return \`email:\${email}\`;\r
    return \`doc:\${normalizeIdentity(teacher.uid || teacher.docId)}\`;\r
  }\r
\r
  function teacherScore(teacher = {}) {\r
    const docId = cleanText(teacher.docId || teacher.uid);\r
    const legacyUid = cleanText(teacher.legacyUid || teacher.firebaseUid);\r
    const isMirror = Boolean(legacyUid && docId && legacyUid !== docId);\r
    return (isMirror ? 0 : 100)\r
      + (teacher.removedFromPanel === true || teacher.panelStatus === "removed" || teacher.active === false ? 0 : 10)\r
      + (teacher.teacherId ? 4 : 0)\r
      + (teacher.name ? 2 : 0);\r
  }\r
\r
  function dedupeTeachers(list = []) {\r
    const byIdentity = new Map();\r
    list.forEach(teacher => {\r
      const key = teacherIdentityKey(teacher);\r
      const current = byIdentity.get(key);\r
      if (!current || teacherScore(teacher) > teacherScore(current)) {\r
        byIdentity.set(key, teacher);\r
      }\r
    });\r
    return [...byIdentity.values()];\r
  }\r
\r
  function timetableKey(timetable = {}) {\r
    const className = canonicalClass(timetable.class || String(timetable.id || "").split("-")[0]);\r
    const sectionName = canonicalSection(timetable.section || String(timetable.id || "").split("-").slice(1).join("-"));\r
    if (className || sectionName) return \`\${className}|\${sectionName}\`;\r
    return cleanText(timetable.id);\r
  }\r
\r
  function dedupeTimetables(list = []) {\r
    const byClassSection = new Map();\r
    list.forEach(timetable => {\r
      const key = timetableKey(timetable);\r
      if (!key) return;\r
      const current = byClassSection.get(key);\r
      if (!current || String(timetable.updatedAt || "").localeCompare(String(current.updatedAt || "")) >= 0) {\r
        byClassSection.set(key, timetable);\r
      }\r
    });\r
    return [...byClassSection.values()];\r
  }\r
\r
  function createSelectOption(value, label = value) {\r
    const option = document.createElement("option");\r
    option.value = value;\r
    option.textContent = label;\r
    return option;\r
  }\r
\r
  function replaceSelectOptions(select, placeholder, values = [], selectedValue = "") {\r
    if (!select) return;\r
    const options = [\r
      createSelectOption("", placeholder),\r
      ...values.map(value => createSelectOption(value))\r
    ];\r
    select.replaceChildren(...options);\r
    if (selectedValue && values.some(value => String(value) === String(selectedValue))) {\r
      select.value = selectedValue;\r
    }\r
  }\r
\r
  async function loadClasses() {\r
    const runId = ++loadClassesRun;\r
    const classSelect   = document.getElementById("classSelect");\r
    const sectionSelect = document.getElementById("sectionSelect");\r
    if (!classSelect || !sectionSelect) return;\r
    const previousClass = classSelect.value;\r
    const previousSection = sectionSelect.value;\r
\r
    const snap = await getDocs(collection(db, "schools", currentUser.uid, "students"));\r
    const nextStudents = [];\r
    snap.forEach(d => {\r
      const data = d.data();\r
      const className = canonicalClass(data.class);\r
      const sectionName = canonicalSection(data.section);\r
      if (className && sectionName)\r
        nextStudents.push({ class: className, section: sectionName });\r
    });\r
    const seenPlacements = new Set();\r
    const uniquePlacements = nextStudents.filter(student => {\r
      const key = \`\${student.class}|\${student.section}\`;\r
      if (seenPlacements.has(key)) return false;\r
      seenPlacements.add(key);\r
      return true;\r
    });\r
    if (runId !== loadClassesRun) return;\r
    allStudents = uniquePlacements;\r
\r
    const uniqueClasses = [...new Set(allStudents.map(s => s.class))];\r
    uniqueClasses.sort((a, b) => (parseInt(a) || 0) - (parseInt(b) || 0));\r
\r
    const renderSections = (selectedSection = "") => {\r
      const sel = classSelect.value;\r
      const sections = [...new Set(allStudents.filter(s => s.class === sel).map(s => s.section))];\r
      sections.sort();\r
      replaceSelectOptions(sectionSelect, "Select Section", sections, selectedSection);\r
    };\r
\r
    replaceSelectOptions(classSelect, "Select Class", uniqueClasses, previousClass);\r
    renderSections(classSelect.value === previousClass ? previousSection : "");\r
\r
    classSelect.onchange = () => {\r
      renderSections("");\r
    };\r
  }\r
\r
  // ── LOAD TEACHERS ──\r
  async function loadTeachers() {\r
    const nextTeachers = [];\r
    const q    = query(collection(db, "users"), where("role","==","teacher"), where("adminId","==",currentUser.uid));\r
    const snap = await getDocs(q);\r
    snap.forEach(d => {\r
      const data = d.data() || {};\r
      const rawSubjects = data.subjects || (data.subject ? [data.subject] : []);\r
      const subjectsList = Array.isArray(rawSubjects) ? rawSubjects : [rawSubjects];\r
      nextTeachers.push({\r
        uid: d.id,\r
        docId: d.id,\r
        teacherId: data.teacherId || "",\r
        email: cleanText(data.email || ""),\r
        authEmail: cleanText(data.authEmail || ""),\r
        name: cleanText(data.name || "Teacher"),\r
        subjects: subjectsList.map(s => String(s).trim()).filter(Boolean),\r
        legacyUid: data.legacyUid || "",\r
        firebaseUid: data.firebaseUid || "",\r
        panelStatus: data.panelStatus || "",\r
        removedFromPanel: data.removedFromPanel === true,\r
        active: data.active !== false\r
      });\r
    });\r
    teachers = dedupeTeachers(nextTeachers)\r
      .filter(teacher => teacher.removedFromPanel !== true && teacher.panelStatus !== "removed" && teacher.active !== false);\r
    populateTeacherViewSelect();\r
  }\r
\r
  function populateTeacherViewSelect() {\r
    const sel = document.getElementById("teacherViewSelect");\r
    if (!sel) return;\r
    sel.innerHTML = \`<option value="">Select Teacher</option>\`;\r
    teachers\r
      .slice()\r
      .sort((a, b) => String(a.name || "").localeCompare(String(b.name || "")))\r
      .forEach(teacher => {\r
        const opt = document.createElement("option");\r
        opt.value = teacher.uid;\r
        opt.textContent = \`\${teacher.name} (\${teacher.teacherId || teacher.uid})\`;\r
        sel.appendChild(opt);\r
      });\r
  }\r
\r
  function findTeacherBySlot(slot = {}) {\r
    const candidates = [slot.teacherUid, slot.teacherId, slot.teacher, slot.teacherEmail]\r
      .map(v => String(v || "").trim().toLowerCase())\r
      .filter(Boolean);\r
    return teachers.find(t => {\r
      const ids = [t.uid, t.teacherId, t.email, t.name]\r
        .map(v => String(v || "").trim().toLowerCase())\r
        .filter(Boolean);\r
      return candidates.some(candidate => ids.includes(candidate));\r
    }) || null;\r
  }\r
\r
  function hasTeacherReference(slot = {}) {\r
    return [slot.teacherUid, slot.teacherId, slot.teacherName, slot.teacherEmail, slot.teacher]\r
      .some(value => cleanText(value));\r
  }\r
\r
  function clearTeacherReference(slot = {}) {\r
    slot.teacherUid = "";\r
    slot.teacherId = "";\r
    slot.teacherName = "";\r
    slot.teacherEmail = "";\r
    if ("teacher" in slot) slot.teacher = "";\r
    return slot;\r
  }\r
\r
  function clearInactiveTeacherSlots(schedule = currentTimetable?.schedule) {\r
    if (!schedule) return;\r
    Object.values(schedule || {}).forEach(daySlots => {\r
      Object.values(daySlots || {}).forEach(slot => {\r
        if (hasTeacherReference(slot) && !findTeacherBySlot(slot)) clearTeacherReference(slot);\r
      });\r
    });\r
  }\r
\r
  function getTeacherReadableId(slot = {}) {\r
    const teacher = findTeacherBySlot(slot);\r
    return teacher?.teacherId || slot.teacherReadableId || slot.teacherId || slot.teacherUid || "—";\r
  }\r
\r
  function slotBelongsToTeacher(slot = {}, teacher = {}) {\r
    const slotIds = [slot.teacherUid, slot.teacherId, slot.teacher, slot.teacherEmail, slot.teacherName]\r
      .map(v => String(v || "").trim().toLowerCase())\r
      .filter(Boolean);\r
    const teacherIds = [teacher.uid, teacher.teacherId, teacher.email, teacher.name]\r
      .map(v => String(v || "").trim().toLowerCase())\r
      .filter(Boolean);\r
    return slotIds.some(id => teacherIds.includes(id));\r
  }\r
\r
  // ── EMPTY SCHEDULE ──\r
  function createEmptySchedule() {\r
    const schedule = {};\r
    days.forEach(day => {\r
      schedule[day] = {};\r
      for (let i = 1; i <= 7; i++) {\r
        schedule[day][\`Period \${i}\`] = { subject: "", teacherUid: "", teacherId: "", teacherName: "" };\r
      }\r
    });\r
    return schedule;\r
  }\r
\r
  function createEmptyPeriodTimes(count = 7) {\r
    const periodTimes = {};\r
    for (let i = 1; i <= count; i++) {\r
      periodTimes[\`Period \${i}\`] = { startTime: "", endTime: "" };\r
    }\r
    return periodTimes;\r
  }\r
\r
  function getSortedPeriodKeys(schedule = currentTimetable?.schedule) {\r
    return Object.keys(schedule?.Monday || {})\r
      .sort((a,b) => parseInt(a.replace("Period ","")) - parseInt(b.replace("Period ","")));\r
  }\r
\r
  function normalizeTimetablePeriods() {\r
    if (!currentTimetable?.schedule) return;\r
    const orderedPeriods = getSortedPeriodKeys();\r
    const normalized = {};\r
    const normalizedTimes = {};\r
    days.forEach(day => { normalized[day] = {}; });\r
\r
    orderedPeriods.forEach((period, index) => {\r
      const nextKey = \`Period \${index + 1}\`;\r
      const savedTime = currentTimetable.periodTimes?.[period] || {};\r
      const legacyTimeSlot = days\r
        .map(day => currentTimetable.schedule[day]?.[period])\r
        .find(slot => slot?.startTime || slot?.endTime) || {};\r
      normalizedTimes[nextKey] = {\r
        startTime: savedTime.startTime || legacyTimeSlot.startTime || "",\r
        endTime: savedTime.endTime || legacyTimeSlot.endTime || ""\r
      };\r
      days.forEach(day => {\r
        const slot = currentTimetable.schedule[day]?.[period] || {};\r
        const matchedTeacher = findTeacherBySlot(slot);\r
        const teacherFields = matchedTeacher ? {\r
          teacherUid: slot.teacherUid || matchedTeacher.uid || "",\r
          teacherId: matchedTeacher.teacherId || slot.teacherId || "",\r
          teacherName: slot.teacherName || matchedTeacher.name || "",\r
          teacherEmail: slot.teacherEmail || matchedTeacher.email || ""\r
        } : {\r
          teacherUid: "",\r
          teacherId: "",\r
          teacherName: "",\r
          teacherEmail: ""\r
        };\r
        normalized[day][nextKey] = {\r
          subject: slot.subject || "",\r
          ...teacherFields\r
        };\r
      });\r
    });\r
\r
    currentTimetable.schedule = normalized;\r
    currentTimetable.periodTimes = normalizedTimes;\r
    syncPeriodTimesToSlots();\r
  }\r
\r
  function getPeriodTime(period) {\r
    currentTimetable.periodTimes = currentTimetable.periodTimes || {};\r
    currentTimetable.periodTimes[period] = currentTimetable.periodTimes[period] || { startTime: "", endTime: "" };\r
    return currentTimetable.periodTimes[period];\r
  }\r
\r
  function syncPeriodTimesToSlots() {\r
    if (!currentTimetable?.schedule) return;\r
    getSortedPeriodKeys().forEach(period => {\r
      const time = getPeriodTime(period);\r
      days.forEach(day => {\r
        currentTimetable.schedule[day][period] = currentTimetable.schedule[day][period] || {};\r
        currentTimetable.schedule[day][period].startTime = time.startTime || "";\r
        currentTimetable.schedule[day][period].endTime = time.endTime || "";\r
      });\r
    });\r
  }\r
\r
  // ── LOAD TIMETABLE ──\r
  function extractPeriodTimes(timetable = {}) {\r
    const schedule = timetable.schedule || {};\r
    const sourcePeriods = sortPeriodKeys([\r
      ...new Set([\r
        ...Object.keys(timetable.periodTimes || {}),\r
        ...Object.keys(schedule.Monday || {})\r
      ])\r
    ]);\r
    const extracted = {};\r
    sourcePeriods.forEach((period, index) => {\r
      const targetPeriod = \`Period \${index + 1}\`;\r
      const savedTime = timetable.periodTimes?.[period] || {};\r
      const legacyTimeSlot = days\r
        .map(day => schedule[day]?.[period])\r
        .find(slot => slot?.startTime || slot?.endTime) || {};\r
      extracted[targetPeriod] = {\r
        startTime: savedTime.startTime || legacyTimeSlot.startTime || "",\r
        endTime: savedTime.endTime || legacyTimeSlot.endTime || ""\r
      };\r
    });\r
    return extracted;\r
  }\r
\r
  function normalizeSubjectName(value) {\r
    return String(value || "").replace(/\\s+/g, " ").trim();\r
  }\r
\r
  function mergeSubjects(...lists) {\r
    const seen = new Set();\r
    const subjects = [];\r
    lists.flat().forEach(value => {\r
      const name = normalizeSubjectName(typeof value === "string" ? value : value?.name);\r
      const key = name.toLowerCase();\r
      if (!name || seen.has(key)) return;\r
      seen.add(key);\r
      subjects.push(name);\r
    });\r
    return subjects.sort((a, b) => a.localeCompare(b));\r
  }\r
\r
  function collectSubjectsFromSchedule(schedule = currentTimetable?.schedule) {\r
    const subjects = [];\r
    Object.values(schedule || {}).forEach(daySlots => {\r
      Object.values(daySlots || {}).forEach(slot => subjects.push(slot?.subject || ""));\r
    });\r
    return mergeSubjects(subjects);\r
  }\r
\r
  function classSubjectDocId(className = currentTimetable?.class) {\r
    return \`timetable-\${String(className || "").replace(/[^a-zA-Z0-9_-]/g, "_")}\`;\r
  }\r
\r
  function classSubjectsRef(className = currentTimetable?.class) {\r
    return doc(db, "schools", currentUser.uid, "subjects", classSubjectDocId(className));\r
  }\r
\r
  async function refreshTimetableCache(force = false) {\r
    if (!currentUser) return allTimetables;\r
    const cacheIsFresh = allTimetables.length && (Date.now() - timetableCacheAt < 60000);\r
    if (!force && cacheIsFresh) return allTimetables;\r
    if (!force && timetableCachePromise) return timetableCachePromise;\r
    timetableCachePromise = getDocs(collection(db, "schools", currentUser.uid, "timetables"))\r
      .then(snapshot => {\r
        allTimetables = dedupeTimetables(snapshot.docs.map(item => ({ id: item.id, ...(item.data() || {}) })));\r
        timetableCacheAt = Date.now();\r
        return allTimetables;\r
      })\r
      .finally(() => { timetableCachePromise = null; });\r
    return timetableCachePromise;\r
  }\r
\r
  let schoolSubjects = [];\r
\r
  async function loadSchoolSubjects() {\r
    if (!currentUser) return [];\r
    try {\r
      const snap = await getDocs(collection(db, "schools", currentUser.uid, "subjects"));\r
      const list = [];\r
      snap.forEach(d => {\r
        const data = d.data() || {};\r
        const name = normalizeSubjectName(data.name || "");\r
        if (name) list.push(name);\r
      });\r
      schoolSubjects = mergeSubjects(list);\r
    } catch (e) {\r
      console.warn("Failed to load school subjects from Firestore:", e);\r
    }\r
    return schoolSubjects;\r
  }\r
\r
  function subjectOptions(selected = "") {\r
    const selectedName = normalizeSubjectName(selected);\r
    const subjects = mergeSubjects(schoolSubjects, selectedName ? [selectedName] : []);\r
    const options = [\`<option value="">Select subject</option>\`];\r
    subjects.forEach(subject => {\r
      const isSelected = subject.toLowerCase() === selectedName.toLowerCase() ? " selected" : "";\r
      options.push(\`<option value="\${escHtml(subject)}"\${isSelected}>\${escHtml(subject)}</option>\`);\r
    });\r
    if (!subjects.length) options.push(\`<option value="" disabled>No school subjects found</option>\`);\r
    return options.join("");\r
  }\r
\r
  function getTeachersForSubject(subject) {\r
    if (!subject) return teachers;\r
    const target = String(subject).trim().toLowerCase();\r
    return teachers.filter(t => {\r
      const subList = Array.isArray(t.subjects) ? t.subjects : (t.subject ? [t.subject] : []);\r
      return subList.some(s => String(s).trim().toLowerCase() === target);\r
    });\r
  }\r
\r
  function teacherSelectOptions(subject = "", selectedTeacherUid = "", day = "", period = "") {\r
    const cleanSubj = String(subject || "").trim();\r
    const matching = getTeachersForSubject(cleanSubj);\r
    const options = [\`<option value="">Select teacher</option>\`];\r
    const isTeacherSelected = (t) => {\r
      if (!selectedTeacherUid) return false;\r
      const target = String(selectedTeacherUid).toLowerCase();\r
      return (t.uid && t.uid.toLowerCase() === target) ||\r
             (t.teacherId && t.teacherId.toLowerCase() === target) ||\r
             (t.name && t.name.toLowerCase() === target);\r
    };\r
\r
    if (cleanSubj && matching.length > 0) {\r
      matching.forEach(t => {\r
        const isSelected = isTeacherSelected(t);\r
        const conflict = (day && period) ? findTeacherConflict(t, day, period) : null;\r
        options.push(\`<option value="\${t.uid}"\${isSelected ? " selected" : ""}>\${escHtml(t.name)} (\${escHtml(t.teacherId || t.uid)})\${conflict ? " [Busy]" : ""}</option>\`);\r
      });\r
      const otherTeachers = teachers.filter(t => !matching.some(m => m.uid === t.uid));\r
      if (otherTeachers.length > 0) {\r
        options.push(\`<optgroup label="Other Teachers">\`);\r
        otherTeachers.forEach(t => {\r
          const isSelected = isTeacherSelected(t);\r
          const conflict = (day && period) ? findTeacherConflict(t, day, period) : null;\r
          options.push(\`<option value="\${t.uid}"\${isSelected ? " selected" : ""}>\${escHtml(t.name)} (\${escHtml(t.teacherId || t.uid)})\${conflict ? " [Busy]" : ""}</option>\`);\r
        });\r
        options.push(\`</optgroup>\`);\r
      }\r
    } else if (cleanSubj && matching.length === 0) {\r
      options.push(\`<option value="" disabled>-- No teacher assigned for "\${escHtml(cleanSubj)}" --</option>\`);\r
      if (teachers.length > 0) {\r
        options.push(\`<optgroup label="All Teachers">\`);\r
        teachers.forEach(t => {\r
          const isSelected = isTeacherSelected(t);\r
          const conflict = (day && period) ? findTeacherConflict(t, day, period) : null;\r
          options.push(\`<option value="\${t.uid}"\${isSelected ? " selected" : ""}>\${escHtml(t.name)} (\${escHtml(t.teacherId || t.uid)})\${conflict ? " [Busy]" : ""}</option>\`);\r
        });\r
        options.push(\`</optgroup>\`);\r
      }\r
    } else {\r
      teachers.forEach(t => {\r
        const isSelected = isTeacherSelected(t);\r
        const conflict = (day && period) ? findTeacherConflict(t, day, period) : null;\r
        options.push(\`<option value="\${t.uid}"\${isSelected ? " selected" : ""}>\${escHtml(t.name)} (\${escHtml(t.teacherId || t.uid)})\${conflict ? " [Busy]" : ""}</option>\`);\r
      });\r
    }\r
    return options.join("");\r
  }\r
\r
  window.onSlotSubjectChange = function (day, period, select) {\r
    const subject = select.value || "";\r
    updateSlot(day, period, "subject", subject);\r
    const slotKey = \`\${day}-\${period.replace(/ /g, "_")}\`;\r
    const teacherSel = document.getElementById(\`tsel-\${slotKey}\`);\r
    if (teacherSel) {\r
      const currentSlot = currentTimetable.schedule?.[day]?.[period] || {};\r
      const currentTeacherUid = currentSlot.teacherUid || currentSlot.teacherId || currentSlot.teacherName || "";\r
      teacherSel.innerHTML = teacherSelectOptions(subject, currentTeacherUid, day, period);\r
      \r
      const matching = getTeachersForSubject(subject);\r
      const stillMatches = currentTeacherUid && matching.some(t => t.uid === currentTeacherUid || t.teacherId === currentTeacherUid || t.name === currentTeacherUid);\r
      if (!stillMatches && currentTeacherUid && subject) {\r
        updateSlot(day, period, "teacherUid", "");\r
        updateSlot(day, period, "teacherId", "");\r
        updateSlot(day, period, "teacherName", "");\r
        updateSlot(day, period, "teacherEmail", "");\r
        teacherSel.value = "";\r
        const badge = document.getElementById(\`tid-\${slotKey}\`);\r
        if (badge) badge.textContent = "—";\r
      }\r
    }\r
  };\r
\r
  window.onSlotTeacherChange = function (day, period, select) {\r
    const teacherUid = select.value;\r
    const slotKey = \`\${day}-\${period.replace(/ /g, "_")}\`;\r
    if (!teacherUid) {\r
      updateSlot(day, period, "teacherUid", "");\r
      updateSlot(day, period, "teacherId", "");\r
      updateSlot(day, period, "teacherName", "");\r
      updateSlot(day, period, "teacherEmail", "");\r
      const badge = document.getElementById(\`tid-\${slotKey}\`);\r
      if (badge) badge.textContent = "—";\r
      return;\r
    }\r
    const teacher = teachers.find(t => t.uid === teacherUid);\r
    if (!teacher) return;\r
    const conflict = findTeacherConflict(teacher, day, period);\r
    if (conflict) {\r
      toast(conflictMessage(teacher, conflict, day, period), "error");\r
      select.value = currentTimetable.schedule?.[day]?.[period]?.teacherUid || "";\r
      return;\r
    }\r
    updateSlot(day, period, "teacherUid", teacher.uid);\r
    updateSlot(day, period, "teacherId", teacher.teacherId || teacher.uid);\r
    updateSlot(day, period, "teacherName", teacher.name);\r
    updateSlot(day, period, "teacherEmail", teacher.email || "");\r
    const badge = document.getElementById(\`tid-\${slotKey}\`);\r
    if (badge) badge.textContent = teacher.teacherId || teacher.uid;\r
  };\r
\r
  function getClassOptions() {\r
    return [...new Set(allStudents.map(student => student.class).filter(Boolean))]\r
      .sort((a, b) => (parseInt(a, 10) || 0) - (parseInt(b, 10) || 0) || String(a).localeCompare(String(b)));\r
  }\r
\r
  function getSectionOptions(className) {\r
    return [...new Set(allStudents\r
      .filter(student => String(student.class) === String(className))\r
      .map(student => student.section)\r
      .filter(Boolean))]\r
      .sort((a, b) => String(a).localeCompare(String(b)));\r
  }\r
\r
  window.populateSyncSectionSelect = function () {\r
    const className = document.getElementById("syncClassSelect")?.value || "";\r
    const sectionSelect = document.getElementById("syncSectionSelect");\r
    if (!sectionSelect) return;\r
    sectionSelect.innerHTML = \`<option value="">Select Section</option>\`;\r
    getSectionOptions(className).forEach(section => {\r
      const option = document.createElement("option");\r
      option.value = option.textContent = section;\r
      sectionSelect.appendChild(option);\r
    });\r
  };\r
\r
  window.openSyncTimeModal = function () {\r
    if (!currentTimetable) { toast("Load a timetable first", "error"); return; }\r
    const classSelect = document.getElementById("syncClassSelect");\r
    const meta = document.getElementById("syncTimeModalMeta");\r
    if (meta) meta.textContent = \`Copy timings into Class \${currentTimetable.class}-\${currentTimetable.section}\`;\r
    classSelect.innerHTML = \`<option value="">Select Class</option>\`;\r
    getClassOptions().forEach(className => {\r
      const option = document.createElement("option");\r
      option.value = option.textContent = className;\r
      classSelect.appendChild(option);\r
    });\r
    classSelect.value = currentTimetable.class || "";\r
    populateSyncSectionSelect();\r
    document.getElementById("syncSectionSelect").value = currentTimetable.section || "";\r
    const modal = document.getElementById("syncTimeModal");\r
    modal.classList.add("show");\r
    modal.setAttribute("aria-hidden", "false");\r
  };\r
\r
  window.closeSyncTimeModal = function () {\r
    const modal = document.getElementById("syncTimeModal");\r
    modal.classList.remove("show");\r
    modal.setAttribute("aria-hidden", "true");\r
  };\r
\r
  window.syncTimeFromSelectedTimetable = async function () {\r
    if (!currentTimetable) { toast("Load a timetable first", "error"); return; }\r
    const sourceClass = document.getElementById("syncClassSelect")?.value || "";\r
    const sourceSection = document.getElementById("syncSectionSelect")?.value || "";\r
    if (!sourceClass || !sourceSection) { toast("Select source class and section", "error"); return; }\r
    showLoading(true, "Syncing period times...");\r
    try {\r
      await nextPaint();\r
      const sourceRef = doc(db, "schools", currentUser.uid, "timetables", \`\${sourceClass}-\${sourceSection}\`);\r
      const sourceSnap = await getDoc(sourceRef);\r
      if (!sourceSnap.exists()) {\r
        toast("Selected timetable not found", "error");\r
        showLoading(false);\r
        return;\r
      }\r
      const sourceTimes = extractPeriodTimes(sourceSnap.data() || {});\r
      const currentPeriods = getSortedPeriodKeys();\r
      let synced = 0;\r
      currentTimetable.periodTimes = currentTimetable.periodTimes || {};\r
      currentPeriods.forEach(period => {\r
        const sourceTime = sourceTimes[period];\r
        if (!sourceTime || (!sourceTime.startTime && !sourceTime.endTime)) return;\r
        currentTimetable.periodTimes[period] = {\r
          startTime: sourceTime.startTime || "",\r
          endTime: sourceTime.endTime || ""\r
        };\r
        synced += 1;\r
      });\r
      syncPeriodTimesToSlots();\r
      renderTimetable();\r
      closeSyncTimeModal();\r
      toast(synced ? \`Synced \${synced} period time\${synced === 1 ? "" : "s"}\` : "No period times found to sync", synced ? "success" : "error");\r
    } catch(e) {\r
      console.error(e);\r
      toast("Error syncing period times", "error");\r
    }\r
    showLoading(false);\r
  };\r
\r
  function clearSubjectFromSchedule(subject) {\r
    const target = normalizeSubjectName(subject).toLowerCase();\r
    if (!target || !currentTimetable?.schedule) return;\r
    Object.values(currentTimetable.schedule).forEach(daySlots => {\r
      Object.values(daySlots || {}).forEach(slot => {\r
        if (normalizeSubjectName(slot?.subject).toLowerCase() === target) slot.subject = "";\r
      });\r
    });\r
  }\r
\r
  function clearSubjectsNotInClassList() {\r
    const allowed = new Set(currentClassSubjects.map(subject => subject.toLowerCase()));\r
    if (!currentTimetable?.schedule) return;\r
    Object.values(currentTimetable.schedule).forEach(daySlots => {\r
      Object.values(daySlots || {}).forEach(slot => {\r
        const subject = normalizeSubjectName(slot?.subject);\r
        if (subject && !allowed.has(subject.toLowerCase())) slot.subject = "";\r
      });\r
    });\r
  }\r
\r
  function currentTimetableDocId() {\r
    if (!currentTimetable) return "";\r
    return \`\${currentTimetable.class}-\${currentTimetable.section}\`;\r
  }\r
\r
  function sameTeacher(teacher = {}, slot = {}) {\r
    const teacherIds = [teacher.uid, teacher.teacherId, teacher.email, teacher.name]\r
      .map(value => String(value || "").trim().toLowerCase())\r
      .filter(Boolean);\r
    const slotIds = [slot.teacherUid, slot.teacherId, slot.teacher, slot.teacherEmail, slot.teacherName]\r
      .map(value => String(value || "").trim().toLowerCase())\r
      .filter(Boolean);\r
    return teacherIds.some(id => slotIds.includes(id));\r
  }\r
\r
  function findTeacherConflict(teacher, day, period) {\r
    const currentId = currentTimetableDocId();\r
    return allTimetables.find(timetable => {\r
      const timetableId = timetable.id || \`\${timetable.class || ""}-\${timetable.section || ""}\`;\r
      if (timetableId === currentId) return false;\r
      const slot = timetable.schedule?.[day]?.[period];\r
      return slot && sameTeacher(teacher, slot);\r
    }) || null;\r
  }\r
\r
  function conflictMessage(teacher, conflict, day, period) {\r
    const classLabel = [conflict?.class, conflict?.section].filter(Boolean).join(" ");\r
    return \`\${teacher.name} already has \${period} on \${day}\${classLabel ? \` in Class \${classLabel}\` : ""}.\`;\r
  }\r
\r
  function validateNoTeacherConflicts() {\r
    if (!currentTimetable?.schedule) return true;\r
    for (const day of days) {\r
      const slots = currentTimetable.schedule[day] || {};\r
      for (const period of Object.keys(slots)) {\r
        const slot = slots[period] || {};\r
        const teacher = findTeacherBySlot(slot);\r
        if (!teacher) continue;\r
        const conflict = findTeacherConflict(teacher, day, period);\r
        if (conflict) {\r
          toast(conflictMessage(teacher, conflict, day, period), "error");\r
          return false;\r
        }\r
      }\r
    }\r
    return true;\r
  }\r
\r
  window.addClassSubject = function () {\r
    if (!currentTimetable) { toast("Load a timetable first", "error"); return; }\r
    const input = document.getElementById("subjectNameInput");\r
    const subject = normalizeSubjectName(input?.value || "");\r
    if (!subject) { toast("Enter subject name", "error"); return; }\r
    currentClassSubjects = mergeSubjects(currentClassSubjects, [subject]);\r
    currentTimetable.classSubjects = currentClassSubjects;\r
    if (input) input.value = "";\r
    renderSubjectsModal();\r
    renderTimetable();\r
  };\r
\r
  window.deleteClassSubject = function (index) {\r
    const subject = currentClassSubjects[index];\r
    if (!subject) return;\r
    currentClassSubjects = currentClassSubjects.filter((_, i) => i !== index);\r
    clearSubjectFromSchedule(subject);\r
    currentTimetable.classSubjects = currentClassSubjects;\r
    renderSubjectsModal();\r
    renderTimetable();\r
  };\r
\r
  window.saveClassSubjects = async function () {\r
    if (!currentTimetable) { toast("Load a timetable first", "error"); return; }\r
    showLoading(true, "Saving subjects...");\r
    try {\r
      await nextPaint();\r
      currentClassSubjects = mergeSubjects(currentClassSubjects);\r
      currentTimetable.classSubjects = currentClassSubjects;\r
      await setDoc(classSubjectsRef(), {\r
        type: "timetableClassSubjects",\r
        className: currentTimetable.class,\r
        subjects: currentClassSubjects,\r
        updatedAt: serverTimestamp()\r
      });\r
      const ref = doc(db, "schools", currentUser.uid, "timetables", \`\${currentTimetable.class}-\${currentTimetable.section}\`);\r
      await setDoc(ref, { ...currentTimetable, updatedAt: serverTimestamp() });\r
      allTimetables = allTimetables.filter(timetable => (timetable.id || \`\${timetable.class || ""}-\${timetable.section || ""}\`) !== currentTimetableDocId());\r
      allTimetables.push({ id: currentTimetableDocId(), ...currentTimetable });\r
      allTimetables = dedupeTimetables(allTimetables);\r
      toast("Subjects saved successfully!");\r
    } catch(e) {\r
      console.error(e);\r
      toast("Error saving subjects", "error");\r
    }\r
    showLoading(false);\r
  };\r
\r
  window.loadTimetable = async function () {\r
    const cls = document.getElementById("classSelect").value;\r
    const sec = document.getElementById("sectionSelect").value;\r
    if (!cls || !sec) { toast("Please select a class and section", "error"); return; }\r
    showLoading(true, "Loading timetable...");\r
    try {\r
      await nextPaint();\r
      const ref  = doc(db, "schools", currentUser.uid, "timetables", \`\${cls}-\${sec}\`);\r
      const [snap] = await Promise.all([getDoc(ref), loadSchoolSubjects()]);\r
      if (snap.exists()) {\r
        currentTimetable = snap.data();\r
        currentTimetable.class = currentTimetable.class || cls;\r
        currentTimetable.section = currentTimetable.section || sec;\r
        normalizeTimetablePeriods();\r
        clearInactiveTeacherSlots();\r
      } else {\r
        currentTimetable = { class: cls, section: sec, schedule: createEmptySchedule(), periodTimes: createEmptyPeriodTimes() };\r
        syncPeriodTimesToSlots();\r
      }\r
      renderTimetable();\r
      document.getElementById("statsBar").style.display = "flex";\r
      document.getElementById("statClass").textContent   = cls;\r
      document.getElementById("statSection").textContent = sec;\r
      refreshTimetableCache().catch(console.error);\r
    } catch(e) {\r
      toast("Failed to load timetable", "error");\r
    }\r
    showLoading(false);\r
  };\r
\r
  // ── ADD PERIOD ──\r
  window.addPeriod = function () {\r
    if (!currentTimetable) { toast("Load a timetable first", "error"); return; }\r
    normalizeTimetablePeriods();\r
    const periods = getSortedPeriodKeys();\r
    const next    = periods.length + 1;\r
    currentTimetable.periodTimes = currentTimetable.periodTimes || {};\r
    currentTimetable.periodTimes[\`Period \${next}\`] = { startTime: "", endTime: "" };\r
    days.forEach(day => {\r
      currentTimetable.schedule[day][\`Period \${next}\`] = { subject: "", teacherUid: "", teacherId: "", teacherName: "", startTime: "", endTime: "" };\r
    });\r
    renderTimetable();\r
    toast(\`Period \${next} added\`);\r
  };\r
\r
  // ── REMOVE PERIOD ──\r
  window.removePeriod = function (periodNum) {\r
    if (!currentTimetable) return;\r
    const key = \`Period \${periodNum}\`;\r
    days.forEach(day => { delete currentTimetable.schedule[day][key]; });\r
    if (currentTimetable.periodTimes) delete currentTimetable.periodTimes[key];\r
    normalizeTimetablePeriods();\r
    renderTimetable();\r
    toast(\`Period \${periodNum} removed\`);\r
  };\r
\r
  // ── UPDATE SLOT ──\r
  window.updateSlot = function (day, period, field, value) {\r
    currentTimetable.schedule[day][period][field] = value;\r
    if (field === "teacherName") {\r
      currentTimetable.schedule[day][period].teacherUid = "";\r
      currentTimetable.schedule[day][period].teacherId = "";\r
      currentTimetable.schedule[day][period].teacherEmail = "";\r
      const badge = document.getElementById(\`tid-\${day}-\${period.replace(" ","_")}\`);\r
      if (badge) badge.textContent = "—";\r
    }\r
  };\r
\r
  window.updatePeriodTime = function (period, field, value) {\r
    if (!["startTime", "endTime"].includes(field)) return;\r
    const time = getPeriodTime(period);\r
    time[field] = value;\r
    syncPeriodTimesToSlots();\r
    updatePeriodTimeDisplay(period);\r
  };\r
\r
  function updatePeriodTimeDisplay(period) {\r
    const slot = getPeriodTime(period);\r
    const el   = document.getElementById(\`time-display-\${period.replace(" ","_")}\`);\r
    if (!el) return;\r
    if (slot.startTime && slot.endTime) {\r
      el.textContent = \`\${slot.startTime} – \${slot.endTime}\`;\r
    } else if (slot.startTime) {\r
      el.textContent = \`From \${slot.startTime}\`;\r
    } else {\r
      el.textContent = "";\r
    }\r
  }\r
\r
  // ── SEARCH TEACHER ──\r
  window.searchTeacher = function (input, day, period) {\r
    const value     = input.value.toLowerCase();\r
    const resultBox = document.getElementById(\`tr-\${day}-\${period.replace(" ","_")}\`);\r
    resultBox.innerHTML = "";\r
    if (!value) return;\r
    const filtered = teachers.filter(t =>\r
      (t.name || "").toLowerCase().includes(value) ||\r
      (t.teacherId || "").toLowerCase().includes(value)\r
    );\r
    filtered.slice(0, 6).forEach(teacher => {\r
      const conflict = findTeacherConflict(teacher, day, period);\r
      const div = document.createElement("div");\r
      div.className = \`teacher-result-item\${conflict ? " busy" : ""}\`;\r
      div.innerHTML = \`<div class="t-name">\${escHtml(teacher.name)}</div><div class="t-id">\${conflict ? escHtml(conflictMessage(teacher, conflict, day, period)) : escHtml(teacher.teacherId || teacher.uid)}</div>\`;\r
      div.onclick = () => {\r
        if (conflict) {\r
          toast(conflictMessage(teacher, conflict, day, period), "error");\r
          return;\r
        }\r
        input.value = teacher.name;\r
        currentTimetable.schedule[day][period].teacherUid  = teacher.uid;\r
        currentTimetable.schedule[day][period].teacherId   = teacher.teacherId || teacher.uid;\r
        currentTimetable.schedule[day][period].teacherName = teacher.name;\r
        currentTimetable.schedule[day][period].teacherEmail = teacher.email || "";\r
        // Update badge\r
        const badge = document.getElementById(\`tid-\${day}-\${period.replace(" ","_")}\`);\r
        if (badge) badge.textContent = teacher.teacherId || teacher.uid;\r
        resultBox.innerHTML = "";\r
      };\r
      resultBox.appendChild(div);\r
    });\r
  };\r
\r
  // ── RENDER ──\r
  function renderTimetableLegacyDailyTime() {\r
    const container = document.getElementById("timetableContainer");\r
    normalizeTimetablePeriods();\r
    const periods = getSortedPeriodKeys();\r
\r
    document.getElementById("statPeriods").textContent = periods.length;\r
\r
    const dayIcons = {\r
      Monday:    \`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>\`,\r
      Tuesday:   \`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v1m0 16v1M4.22 4.22l.707.707m12.728 12.728.707.707M3 12h1m16 0h1M4.927 19.073l.707-.707M18.364 5.636l.707-.707"/></svg>\`,\r
      Wednesday: \`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>\`,\r
      Thursday:  \`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>\`,\r
      Friday:    \`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/></svg>\`,\r
      Saturday:  \`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a10 10 0 1 0 10 10H12z"/></svg>\`,\r
    };\r
\r
    let html = \`<div class="table-wrapper"><table>\r
      <thead><tr>\r
        <th>Period / Time</th>\r
        \${days.map(d => \`<th><div class="day-icon">\${dayIcons[d] || ""} \${d}</div></th>\`).join("")}\r
      </tr></thead>\r
      <tbody>\`;\r
\r
    periods.forEach(period => {\r
      const pNum   = period.replace("Period ","");\r
      const pKey   = period.replace(" ","_");\r
      const monday = currentTimetable.schedule["Monday"][period];\r
      const timeDisplay = (monday.startTime && monday.endTime)\r
        ? \`\${monday.startTime} – \${monday.endTime}\`\r
        : (monday.startTime ? \`From \${monday.startTime}\` : "");\r
\r
      html += \`<tr>\r
        <td>\r
          <div class="period-cell">\r
            <div class="period-num">\r
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2.2" style="vertical-align:-2px;margin-right:4px"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>\r
              \${period}\r
            </div>\r
            <div class="period-time-display" id="time-display-\${pKey}">\${timeDisplay}</div>\r
            \${periods.length > 1 ? \`<button class="btn btn-danger period-remove" onclick="removePeriod(\${pNum})">\r
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>\r
              Remove\r
            </button>\` : ""}\r
          </div>\r
        </td>\`;\r
\r
      days.forEach(day => {\r
        const slot    = currentTimetable.schedule[day][period] || {};\r
        const slotKey = \`\${day}-\${pKey}\`;\r
        html += \`<td>\r
          <div class="slot-cell">\r
\r
            <div class="field-label-small">\r
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>\r
              Subject\r
            </div>\r
            <input class="slot-input subject-input" type="text" placeholder="e.g. Mathematics"\r
              value="\${escHtml(slot.subject || '')}"\r
              onchange="updateSlot('\${day}','\${period}','subject',this.value)">\r
\r
            <div class="field-label-small" style="margin-top:2px">\r
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>\r
              <span style="color:var(--gold)">Start</span>\r
            </div>\r
            <input class="slot-input time-input" type="text"\r
              value="\${escHtml(slot.startTime || '')}"\r
              onchange="updateSlot('\${day}','\${period}','startTime',this.value)">\r
\r
            <div class="field-label-small">\r
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>\r
              <span style="color:var(--gold)">End</span>\r
            </div>\r
            <input class="slot-input time-input" type="text"\r
              value="\${escHtml(slot.endTime || '')}"\r
              onchange="updateSlot('\${day}','\${period}','endTime',this.value)">\r
\r
            <div class="field-label-small" style="margin-top:2px">\r
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>\r
              Teacher\r
            </div>\r
            <div class="teacher-search-wrap">\r
              <input class="slot-input" type="text" placeholder="Search teacher…"\r
                value="\${escHtml(slot.teacherName || '')}"\r
                oninput="updateSlot('\${day}','\${period}','teacherName',this.value); searchTeacher(this,'\${day}','\${period}')">\r
              <div class="teacher-results" id="tr-\${slotKey}"></div>\r
            </div>\r
\r
            <div class="teacher-id-badge">\r
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 3H8l-2 4h12z"/></svg>\r
              <span id="tid-\${slotKey}">\${escHtml(getTeacherReadableId(slot))}</span>\r
            </div>\r
          </div>\r
        </td>\`;\r
      });\r
      html += \`</tr>\`;\r
    });\r
\r
    html += \`</tbody></table></div>\`;\r
    container.innerHTML = html;\r
  }\r
\r
  function renderTimetable() {\r
    const container = document.getElementById("timetableContainer");\r
    normalizeTimetablePeriods();\r
    const periods = getSortedPeriodKeys();\r
\r
    document.getElementById("statPeriods").textContent = periods.length;\r
\r
    const dayIcons = {\r
      Monday:    \`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>\`,\r
      Tuesday:   \`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v1m0 16v1M4.22 4.22l.707.707m12.728 12.728.707.707M3 12h1m16 0h1M4.927 19.073l.707-.707M18.364 5.636l.707-.707"/></svg>\`,\r
      Wednesday: \`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>\`,\r
      Thursday:  \`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>\`,\r
      Friday:    \`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/></svg>\`,\r
      Saturday:  \`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a10 10 0 1 0 10 10H12z"/></svg>\`\r
    };\r
\r
    let html = \`<div class="table-wrapper"><table>\r
      <thead><tr>\r
        <th>Period / Time</th>\r
        \${days.map(d => \`<th><div class="day-icon">\${dayIcons[d] || ""} \${d}</div></th>\`).join("")}\r
      </tr></thead>\r
      <tbody>\`;\r
\r
    periods.forEach(period => {\r
      const pNum = period.replace("Period ", "");\r
      const pKey = period.replace(" ", "_");\r
      const periodTime = getPeriodTime(period);\r
      const timeDisplay = getTimeLabel(periodTime);\r
\r
      html += \`<tr>\r
        <td>\r
          <div class="period-cell">\r
            <div class="period-num">\r
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2.2" style="vertical-align:-2px;margin-right:4px"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>\r
              \${period}\r
            </div>\r
            <div class="period-time-display" id="time-display-\${pKey}">\${escHtml(timeDisplay)}</div>\r
            <div class="period-time-controls">\r
              <div class="field-label-small">\r
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>\r
                <span style="color:var(--gold)">Start</span>\r
              </div>\r
              <input class="slot-input time-input" type="text" value="\${escHtml(periodTime.startTime || "")}" onchange="updatePeriodTime('\${period}','startTime',this.value)">\r
              <div class="field-label-small">\r
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>\r
                <span style="color:var(--gold)">End</span>\r
              </div>\r
              <input class="slot-input time-input" type="text" value="\${escHtml(periodTime.endTime || "")}" onchange="updatePeriodTime('\${period}','endTime',this.value)">\r
            </div>\r
            \${periods.length > 1 ? \`<button class="btn btn-danger period-remove" onclick="removePeriod(\${pNum})">\r
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>\r
              Remove\r
            </button>\` : ""}\r
          </div>\r
        </td>\`;\r
\r
      days.forEach(day => {\r
        const slot = currentTimetable.schedule[day][period] || {};\r
        const slotKey = \`\${day}-\${pKey}\`;\r
        html += \`<td>\r
          <div class="slot-cell">\r
            <div class="field-label-small">\r
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>\r
              Subject\r
            </div>\r
            <input class="slot-input subject-input" type="text" placeholder="e.g. Mathematics" value="\${escHtml(slot.subject || "")}" onchange="updateSlot('\${day}','\${period}','subject',this.value)">\r
\r
            <div class="field-label-small" style="margin-top:2px">\r
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>\r
              Teacher\r
            </div>\r
            <div class="teacher-search-wrap">\r
              <input class="slot-input" type="text" placeholder="Search teacher..." value="\${escHtml(slot.teacherName || "")}" oninput="updateSlot('\${day}','\${period}','teacherName',this.value); searchTeacher(this,'\${day}','\${period}')">\r
              <div class="teacher-results" id="tr-\${slotKey}"></div>\r
            </div>\r
\r
            <div class="teacher-id-badge">\r
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 3H8l-2 4h12z"/></svg>\r
              <span id="tid-\${slotKey}">\${escHtml(getTeacherReadableId(slot))}</span>\r
            </div>\r
          </div>\r
        </td>\`;\r
      });\r
      html += \`</tr>\`;\r
    });\r
\r
    html += \`</tbody></table></div>\`;\r
    container.innerHTML = html;\r
  }\r
\r
  function sortPeriodKeys(periods = []) {\r
    return periods.slice().sort((a, b) =>\r
      (parseInt(String(a).replace("Period ", ""), 10) || 0) -\r
      (parseInt(String(b).replace("Period ", ""), 10) || 0)\r
    );\r
  }\r
\r
  function getTimeLabel(slot = {}) {\r
    if (slot.startTime && slot.endTime) return \`\${formatTime12(slot.startTime)} - \${formatTime12(slot.endTime)}\`;\r
    if (slot.startTime) return \`From \${formatTime12(slot.startTime)}\`;\r
    if (slot.endTime) return \`Until \${formatTime12(slot.endTime)}\`;\r
    return "";\r
  }\r
\r
  function formatTime12(value) {\r
    const match = String(value || "").trim().match(/^(\\d{1,2}):(\\d{2})/);\r
    if (!match) return String(value || "");\r
    let hours = Number(match[1]);\r
    const minutes = match[2];\r
    if (!Number.isFinite(hours)) return String(value || "");\r
    const suffix = hours >= 12 ? "PM" : "AM";\r
    hours = hours % 12 || 12;\r
    return \`\${hours}:\${minutes} \${suffix}\`;\r
  }\r
\r
  function timeParts12(value) {\r
    const match = String(value || "").trim().match(/^(\\d{1,2}):(\\d{2})/);\r
    if (!match) return { hour: "", minute: "", meridiem: "AM" };\r
    const rawHour = Number(match[1]);\r
    const minute = match[2];\r
    if (!Number.isFinite(rawHour)) return { hour: "", minute: "", meridiem: "AM" };\r
    return {\r
      hour: String(rawHour % 12 || 12),\r
      minute,\r
      meridiem: rawHour >= 12 ? "PM" : "AM"\r
    };\r
  }\r
\r
  function toTime24(hour, minute, meridiem) {\r
    let value = Number(hour || 0);\r
    if (!Number.isFinite(value) || value < 1 || value > 12 || !minute) return "";\r
    const suffix = meridiem === "PM" ? "PM" : "AM";\r
    if (suffix === "AM" && value === 12) value = 0;\r
    if (suffix === "PM" && value !== 12) value += 12;\r
    return \`\${String(value).padStart(2, "0")}:\${String(minute).padStart(2, "0")}\`;\r
  }\r
\r
  function timeOptions(selectedValue, values) {\r
    return values.map(value => \`<option value="\${escHtml(value)}" \${String(value) === String(selectedValue) ? "selected" : ""}>\${escHtml(value)}</option>\`).join("");\r
  }\r
\r
  function renderTime12Controls(period, field, value) {\r
    const parts = timeParts12(value);\r
    const id = \`\${period.replace(/\\s+/g, "_")}_\${field}\`;\r
    const hours = Array.from({ length: 12 }, (_, index) => String(index + 1));\r
    const minutes = Array.from({ length: 12 }, (_, index) => String(index * 5).padStart(2, "0"));\r
    return \`<div class="time-12-controls" data-period="\${escHtml(period)}" data-field="\${escHtml(field)}">\r
      <select class="slot-input time-input" id="\${id}_hour" aria-label="\${escHtml(period)} \${field} hour" onchange="updatePeriodTime12('\${period}','\${field}')">\r
        <option value="">Hr</option>\${timeOptions(parts.hour, hours)}\r
      </select>\r
      <select class="slot-input time-input" id="\${id}_minute" aria-label="\${escHtml(period)} \${field} minute" onchange="updatePeriodTime12('\${period}','\${field}')">\r
        <option value="">Min</option>\${timeOptions(parts.minute, minutes)}\r
      </select>\r
      <select class="slot-input time-input" id="\${id}_meridiem" aria-label="\${escHtml(period)} \${field} AM PM" onchange="updatePeriodTime12('\${period}','\${field}')">\r
        \${timeOptions(parts.meridiem, ["AM", "PM"])}\r
      </select>\r
    </div>\`;\r
  }\r
\r
  window.updatePeriodTime12 = function (period, field) {\r
    const id = \`\${period.replace(/\\s+/g, "_")}_\${field}\`;\r
    const hour = document.getElementById(\`\${id}_hour\`)?.value || "";\r
    const minute = document.getElementById(\`\${id}_minute\`)?.value || "";\r
    const meridiem = document.getElementById(\`\${id}_meridiem\`)?.value || "AM";\r
    updatePeriodTime(period, field, toTime24(hour, minute, meridiem));\r
  };\r
\r
  window.closeTeacherTimetableView = function() {\r
    document.getElementById("teacherViewCard").classList.remove("show");\r
    document.getElementById("teacherTimetableView").innerHTML = "";\r
  };\r
\r
  window.viewTeacherTimetable = async function() {\r
    const teacherUid = document.getElementById("teacherViewSelect").value;\r
    if (!teacherUid) {\r
      toast("Please select a teacher first", "error");\r
      return;\r
    }\r
\r
    const teacher = teachers.find(t => t.uid === teacherUid);\r
    if (!teacher) {\r
      toast("Teacher not found", "error");\r
      return;\r
    }\r
\r
    showLoading(true, "Loading teacher timetable...");\r
    try {\r
      await nextPaint();\r
      const timetables = await refreshTimetableCache(true);\r
      const teacherSchedule = {};\r
      let slotCount = 0;\r
      const classSet = new Set();\r
      const seenSlots = new Set();\r
\r
      timetables.forEach(timetable => {\r
        const className = timetable.class || String(timetable.id).split("-")[0] || "";\r
        const sectionName = timetable.section || String(timetable.id).split("-").slice(1).join("-") || "";\r
        const classLabel = sectionName ? \`\${className}-\${sectionName}\` : className;\r
\r
        Object.entries(timetable.schedule || {}).forEach(([day, daySlots]) => {\r
          Object.entries(daySlots || {}).forEach(([period, slot]) => {\r
            if (!slotBelongsToTeacher(slot, teacher)) return;\r
            const commonTime = timetable.periodTimes?.[period] || {};\r
            const uniqueSlotKey = \`\${timetableKey(timetable)}|\${day}|\${period}|\${teacher.uid}\`;\r
            if (seenSlots.has(uniqueSlotKey)) return;\r
            seenSlots.add(uniqueSlotKey);\r
            if (!teacherSchedule[day]) teacherSchedule[day] = {};\r
            if (!teacherSchedule[day][period]) teacherSchedule[day][period] = [];\r
            teacherSchedule[day][period].push({\r
              ...slot,\r
              startTime: commonTime.startTime || slot.startTime || "",\r
              endTime: commonTime.endTime || slot.endTime || "",\r
              classLabel,\r
              class: className,\r
              section: sectionName\r
            });\r
            slotCount += 1;\r
            if (classLabel) classSet.add(classLabel);\r
          });\r
        });\r
      });\r
\r
      const card = document.getElementById("teacherViewCard");\r
      document.getElementById("teacherViewTitle").textContent =\r
        \`\${teacher.name} - Full Timetable\`;\r
      document.getElementById("teacherViewMeta").textContent =\r
        \`Teacher ID: \${teacher.teacherId || teacher.uid} | \${slotCount} lecture\${slotCount === 1 ? "" : "s"} | \${classSet.size} class\${classSet.size === 1 ? "" : "es"}\`;\r
\r
      document.getElementById("teacherTimetableView").innerHTML = renderTeacherReadonlyTimetable(teacherSchedule);\r
      card.classList.add("show");\r
      card.scrollIntoView({ behavior: "smooth", block: "start" });\r
    } catch (error) {\r
      console.error(error);\r
      toast("Failed to load teacher timetable", "error");\r
    }\r
    showLoading(false);\r
  };\r
\r
  function renderTeacherReadonlyTimetable(schedule = {}) {\r
    const scheduleDays = days.filter(day => schedule[day]);\r
    const allPeriods = sortPeriodKeys([...new Set(scheduleDays.flatMap(day => Object.keys(schedule[day] || {})))]);\r
\r
    if (!scheduleDays.length || !allPeriods.length) {\r
      return \`<div class="empty-state" style="padding:2rem;"><h3>No timetable found</h3><p>No periods are assigned to this teacher yet.</p></div>\`;\r
    }\r
\r
    let html = \`<div class="table-wrapper"><table>\r
      <thead><tr>\r
        <th>Period / Time</th>\r
        \${days.map(day => \`<th>\${day}</th>\`).join("")}\r
      </tr></thead><tbody>\`;\r
\r
    allPeriods.forEach(period => {\r
      html += \`<tr><td><div class="period-cell"><div class="period-num">\${escHtml(period)}</div></div></td>\`;\r
      days.forEach(day => {\r
        const slots = schedule[day]?.[period] || [];\r
        if (!slots.length) {\r
          html += \`<td><span style="color:var(--muted);font-size:0.8rem;">—</span></td>\`;\r
          return;\r
        }\r
        html += \`<td>\${slots.map(slot => \`\r
          <div class="readonly-slot">\r
            <strong>\${escHtml(slot.subject || "Lecture")}</strong>\r
            <div>Class: \${escHtml(slot.classLabel || "—")}</div>\r
            <div>Teacher ID: \${escHtml(getTeacherReadableId(slot))}</div>\r
          </div>\r
        \`).join('<div style="height:8px"></div>')}</td>\`;\r
      });\r
      html += \`</tr>\`;\r
    });\r
\r
    html += \`</tbody></table></div>\`;\r
    return html;\r
  }\r
\r
  function escHtml(s) {\r
    return String(s).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;");\r
  }\r
\r
  // ── SAVE ──\r
  renderTimetable = function renderTimetableFlipped() {\r
    const container = document.getElementById("timetableContainer");\r
    normalizeTimetablePeriods();\r
    const periods = getSortedPeriodKeys();\r
    document.getElementById("statPeriods").textContent = periods.length;\r
\r
    let html = \`<div class="table-wrapper"><table><thead><tr><th>Day</th>\`;\r
    html += periods.map(period => {\r
      const periodTime = getPeriodTime(period);\r
      const timeLabel = getTimeLabel(periodTime);\r
      const pNum = period.replace("Period ", "");\r
      return \`<th><div class="period-cell"><div class="period-num">\${escHtml(period)}</div><div class="period-time-display" id="time-display-\${period.replace(" ", "_")}">\${escHtml(timeLabel)}</div><div class="period-time-controls"><div class="field-label-small"><span style="color:var(--gold)">Start</span></div>\${renderTime12Controls(period, "startTime", periodTime.startTime || "")}<div class="field-label-small"><span style="color:var(--gold)">End</span></div>\${renderTime12Controls(period, "endTime", periodTime.endTime || "")}\${periods.length > 1 ? \`<button class="btn btn-danger period-remove" onclick="removePeriod(\${pNum})">Remove</button>\` : ""}</div></div></th>\`;\r
    }).join("");\r
    html += \`</tr></thead><tbody>\`;\r
\r
    days.forEach(day => {\r
      html += \`<tr><td><strong>\${escHtml(day)}</strong></td>\`;\r
      periods.forEach(period => {\r
        const slot = currentTimetable.schedule[day]?.[period] || {};\r
        const slotKey = \`\${day}-\${period.replace(/ /g, "_")}\`;\r
        const teacherUid = slot.teacherUid || slot.teacherId || "";\r
        html += \`<td><div class="slot-cell">\r
          <div class="field-label-small">Subject</div>\r
          <select class="slot-input subject-input" onchange="onSlotSubjectChange('\${day}','\${period}',this)">\${subjectOptions(slot.subject || "")}</select>\r
          <div class="field-label-small" style="margin-top:2px">Teacher</div>\r
          <select class="slot-input teacher-select" id="tsel-\${slotKey}" onchange="onSlotTeacherChange('\${day}','\${period}',this)">\${teacherSelectOptions(slot.subject || "", teacherUid, day, period)}</select>\r
          <div class="teacher-id-badge"><span id="tid-\${slotKey}">\${escHtml(getTeacherReadableId(slot))}</span></div>\r
        </div></td>\`;\r
      });\r
      html += \`</tr>\`;\r
    });\r
\r
    html += \`</tbody></table></div>\`;\r
    container.innerHTML = html;\r
  };\r
\r
  renderTeacherReadonlyTimetable = function renderTeacherReadonlyTimetableFlipped(schedule = {}) {\r
    const scheduleDays = days.filter(day => schedule[day]);\r
    const allPeriods = sortPeriodKeys([...new Set(scheduleDays.flatMap(day => Object.keys(schedule[day] || {})))]);\r
    if (!scheduleDays.length || !allPeriods.length) return \`<div class="empty-state" style="padding:2rem;"><h3>No timetable found</h3><p>No periods are assigned to this teacher yet.</p></div>\`;\r
    let html = \`<div class="table-wrapper"><table><thead><tr><th>Day</th>\`;\r
    allPeriods.forEach(period => {\r
      const firstSlot = scheduleDays.flatMap(day => schedule[day]?.[period] || []).find(slot => getTimeLabel(slot)) || {};\r
      const time = getTimeLabel(firstSlot);\r
      html += \`<th><strong>\${escHtml(period)}</strong>\${time ? \`<div class="class-info">\${escHtml(time)}</div>\` : ""}</th>\`;\r
    });\r
    html += \`</tr></thead><tbody>\`;\r
    scheduleDays.forEach(day => {\r
      html += \`<tr><td><strong>\${escHtml(day)}</strong></td>\`;\r
      allPeriods.forEach(period => {\r
        const slots = schedule[day]?.[period] || [];\r
        html += slots.length ? \`<td>\${slots.map(slot => \`<div class="readonly-slot"><strong>\${escHtml(slot.subject || "Lecture")}</strong><div>Class: \${escHtml(slot.classLabel || "-")}</div><div>Teacher ID: \${escHtml(getTeacherReadableId(slot))}</div></div>\`).join('<div style="height:8px"></div>')}</td>\` : \`<td><span style="color:var(--muted);font-size:0.8rem;">-</span></td>\`;\r
      });\r
      html += \`</tr>\`;\r
    });\r
    html += \`</tbody></table></div>\`;\r
    return html;\r
  };\r
\r
  window.saveTimetable = async function () {\r
    if (!currentTimetable) { toast("Load a timetable first", "error"); return; }\r
    showLoading(true, "Saving timetable...");\r
    try {\r
      await nextPaint();\r
      normalizeTimetablePeriods();\r
      syncPeriodTimesToSlots();\r
      await refreshTimetableCache(true);\r
      if (!validateNoTeacherConflicts()) {\r
        showLoading(false);\r
        return;\r
      }\r
      const ref = doc(db, "schools", currentUser.uid, "timetables",\r
        \`\${currentTimetable.class}-\${currentTimetable.section}\`);\r
      await setDoc(ref, { ...currentTimetable, updatedAt: serverTimestamp() });\r
      allTimetables = allTimetables.filter(timetable => (timetable.id || \`\${timetable.class || ""}-\${timetable.section || ""}\`) !== currentTimetableDocId());\r
      allTimetables.push({ id: currentTimetableDocId(), ...currentTimetable });\r
      allTimetables = dedupeTimetables(allTimetables);\r
      toast("Timetable saved successfully!");\r
    } catch(e) {\r
      console.error(e);\r
      toast("Error saving timetable", "error");\r
    }\r
    showLoading(false);\r
  };\r
\r
  // ── AUTH ──\r
  onAuthStateChanged(auth, async user => {\r
    if (!user) { toast("Please login first", "error"); return; }\r
    currentUser = user;\r
    showLoading(true, "Preparing admin timetable...");\r
    await nextPaint();\r
    await loadTeachers();\r
    await loadSchoolSubjects();\r
    await loadClasses();\r
    showLoading(false);\r
    refreshTimetableCache().catch(console.error);\r
  });\r
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
  setTimeout(emergencyHide, 1600);\r
}());\r
`},{attributes:{type:"module"},text:`\r
  import { initializeApp }          from "./firebase-compat.js";\r
  import { getAuth, onAuthStateChanged } from "./firebase-compat.js";\r
  import {\r
    getFirestore, collection, getDocs,\r
    query, where, doc, getDoc, setDoc, serverTimestamp\r
  } from "./firebase-compat.js";\r
\r
  // ── FIREBASE ──\r
  const firebaseConfig = {\r
    apiKey:            "AIzaSyAomGwef93HFT9Xyx7SVW95FPw_IcIAICE",\r
    authDomain:        "schoolix-48107.firebaseapp.com",\r
    projectId:         "schoolix-48107",\r
    storageBucket:     "schoolix-48107.firebasestorage.app",\r
    messagingSenderId: "133937954491",\r
    appId:             "1:133937954491:web:69d8064422617eb8c4339e"\r
  };\r
  const app  = initializeApp(firebaseConfig);\r
  const auth = getAuth(app);\r
  const db   = getFirestore(app);\r
\r
  let currentUser      = null;\r
  let teachers         = [];\r
  let allStudents      = [];\r
  let currentTimetable = null;\r
  let currentClassSubjects = [];\r
  let allTimetables = [];\r
  let timetableCachePromise = null;\r
  let timetableCacheAt = 0;\r
  let loadClassesRun = 0;\r
\r
  const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];\r
\r
  // ── HELPERS ──\r
  function showLoading(on, message = "Loading data...") {\r
    const overlay = document.getElementById("loadingOverlay");\r
    const text = document.getElementById("loadingText");\r
    if (text) text.textContent = message;\r
    overlay.classList.toggle("show", on);\r
  }\r
  function nextPaint() {\r
    return new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));\r
  }\r
  function toast(msg, type = "success") {\r
    const t    = document.getElementById("toast");\r
    const icon = document.getElementById("toastIcon");\r
    document.getElementById("toastMsg").textContent = msg;\r
    t.className = \`toast \${type} show\`;\r
    icon.innerHTML = type === "success"\r
      ? \`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>\`\r
      : \`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>\`;\r
    clearTimeout(t._timer);\r
    t._timer = setTimeout(() => t.classList.remove("show"), 3000);\r
  }\r
\r
  // ── LOAD CLASSES ──\r
  function cleanText(value) {\r
    return String(value || "").replace(/\\s+/g, " ").trim();\r
  }\r
\r
  function canonicalClass(value) {\r
    return cleanText(value);\r
  }\r
\r
  function canonicalSection(value) {\r
    return cleanText(value).toUpperCase();\r
  }\r
\r
  function normalizeIdentity(value) {\r
    return cleanText(value).toLowerCase();\r
  }\r
\r
  function teacherIdentityKey(teacher = {}) {\r
    const legacyUid = normalizeIdentity(teacher.legacyUid || teacher.firebaseUid);\r
    if (legacyUid) return \`uid:\${legacyUid}\`;\r
    const teacherId = normalizeIdentity(teacher.teacherId);\r
    if (teacherId) return \`teacherId:\${teacherId}\`;\r
    const email = normalizeIdentity(teacher.email || teacher.authEmail);\r
    if (email) return \`email:\${email}\`;\r
    return \`doc:\${normalizeIdentity(teacher.uid || teacher.docId)}\`;\r
  }\r
\r
  function teacherScore(teacher = {}) {\r
    const docId = cleanText(teacher.docId || teacher.uid);\r
    const legacyUid = cleanText(teacher.legacyUid || teacher.firebaseUid);\r
    const isMirror = Boolean(legacyUid && docId && legacyUid !== docId);\r
    return (isMirror ? 0 : 100)\r
      + (teacher.removedFromPanel === true || teacher.panelStatus === "removed" || teacher.active === false ? 0 : 10)\r
      + (teacher.teacherId ? 4 : 0)\r
      + (teacher.name ? 2 : 0);\r
  }\r
\r
  function dedupeTeachers(list = []) {\r
    const byIdentity = new Map();\r
    list.forEach(teacher => {\r
      const key = teacherIdentityKey(teacher);\r
      const current = byIdentity.get(key);\r
      if (!current || teacherScore(teacher) > teacherScore(current)) {\r
        byIdentity.set(key, teacher);\r
      }\r
    });\r
    return [...byIdentity.values()];\r
  }\r
\r
  function timetableKey(timetable = {}) {\r
    const className = canonicalClass(timetable.class || String(timetable.id || "").split("-")[0]);\r
    const sectionName = canonicalSection(timetable.section || String(timetable.id || "").split("-").slice(1).join("-"));\r
    if (className || sectionName) return \`\${className}|\${sectionName}\`;\r
    return cleanText(timetable.id);\r
  }\r
\r
  function dedupeTimetables(list = []) {\r
    const byClassSection = new Map();\r
    list.forEach(timetable => {\r
      const key = timetableKey(timetable);\r
      if (!key) return;\r
      const current = byClassSection.get(key);\r
      if (!current || String(timetable.updatedAt || "").localeCompare(String(current.updatedAt || "")) >= 0) {\r
        byClassSection.set(key, timetable);\r
      }\r
    });\r
    return [...byClassSection.values()];\r
  }\r
\r
  function createSelectOption(value, label = value) {\r
    const option = document.createElement("option");\r
    option.value = value;\r
    option.textContent = label;\r
    return option;\r
  }\r
\r
  function replaceSelectOptions(select, placeholder, values = [], selectedValue = "") {\r
    if (!select) return;\r
    const options = [\r
      createSelectOption("", placeholder),\r
      ...values.map(value => createSelectOption(value))\r
    ];\r
    select.replaceChildren(...options);\r
    if (selectedValue && values.some(value => String(value) === String(selectedValue))) {\r
      select.value = selectedValue;\r
    }\r
  }\r
\r
  async function loadClasses() {\r
    const runId = ++loadClassesRun;\r
    const classSelect   = document.getElementById("classSelect");\r
    const sectionSelect = document.getElementById("sectionSelect");\r
    if (!classSelect || !sectionSelect) return;\r
    const previousClass = classSelect.value;\r
    const previousSection = sectionSelect.value;\r
\r
    const snap = await getDocs(collection(db, "schools", currentUser.uid, "students"));\r
    const nextStudents = [];\r
    snap.forEach(d => {\r
      const data = d.data();\r
      const className = canonicalClass(data.class);\r
      const sectionName = canonicalSection(data.section);\r
      if (className && sectionName)\r
        nextStudents.push({ class: className, section: sectionName });\r
    });\r
    const seenPlacements = new Set();\r
    const uniquePlacements = nextStudents.filter(student => {\r
      const key = \`\${student.class}|\${student.section}\`;\r
      if (seenPlacements.has(key)) return false;\r
      seenPlacements.add(key);\r
      return true;\r
    });\r
    if (runId !== loadClassesRun) return;\r
    allStudents = uniquePlacements;\r
\r
    const uniqueClasses = [...new Set(allStudents.map(s => s.class))];\r
    uniqueClasses.sort((a, b) => (parseInt(a) || 0) - (parseInt(b) || 0));\r
\r
    const renderSections = (selectedSection = "") => {\r
      const sel = classSelect.value;\r
      const sections = [...new Set(allStudents.filter(s => s.class === sel).map(s => s.section))];\r
      sections.sort();\r
      replaceSelectOptions(sectionSelect, "Select Section", sections, selectedSection);\r
    };\r
\r
    replaceSelectOptions(classSelect, "Select Class", uniqueClasses, previousClass);\r
    renderSections(classSelect.value === previousClass ? previousSection : "");\r
\r
    classSelect.onchange = () => {\r
      renderSections("");\r
    };\r
  }\r
\r
  // ── LOAD TEACHERS ──\r
  async function loadTeachers() {\r
    const nextTeachers = [];\r
    const q    = query(collection(db, "users"), where("role","==","teacher"), where("adminId","==",currentUser.uid));\r
    const snap = await getDocs(q);\r
    snap.forEach(d => {\r
      const data = d.data() || {};\r
      const rawSubjects = data.subjects || (data.subject ? [data.subject] : []);\r
      const subjectsList = Array.isArray(rawSubjects) ? rawSubjects : [rawSubjects];\r
      nextTeachers.push({\r
        uid: d.id,\r
        docId: d.id,\r
        teacherId: data.teacherId || "",\r
        email: cleanText(data.email || ""),\r
        authEmail: cleanText(data.authEmail || ""),\r
        name: cleanText(data.name || "Teacher"),\r
        subjects: subjectsList.map(s => String(s).trim()).filter(Boolean),\r
        legacyUid: data.legacyUid || "",\r
        firebaseUid: data.firebaseUid || "",\r
        panelStatus: data.panelStatus || "",\r
        removedFromPanel: data.removedFromPanel === true,\r
        active: data.active !== false\r
      });\r
    });\r
    teachers = dedupeTeachers(nextTeachers)\r
      .filter(teacher => teacher.removedFromPanel !== true && teacher.panelStatus !== "removed" && teacher.active !== false);\r
    populateTeacherViewSelect();\r
  }\r
\r
  function populateTeacherViewSelect() {\r
    const sel = document.getElementById("teacherViewSelect");\r
    if (!sel) return;\r
    sel.innerHTML = \`<option value="">Select Teacher</option>\`;\r
    teachers\r
      .slice()\r
      .sort((a, b) => String(a.name || "").localeCompare(String(b.name || "")))\r
      .forEach(teacher => {\r
        const opt = document.createElement("option");\r
        opt.value = teacher.uid;\r
        opt.textContent = \`\${teacher.name} (\${teacher.teacherId || teacher.uid})\`;\r
        sel.appendChild(opt);\r
      });\r
  }\r
\r
  function findTeacherBySlot(slot = {}) {\r
    const candidates = [slot.teacherUid, slot.teacherId, slot.teacher, slot.teacherEmail]\r
      .map(v => String(v || "").trim().toLowerCase())\r
      .filter(Boolean);\r
    return teachers.find(t => {\r
      const ids = [t.uid, t.teacherId, t.email, t.name]\r
        .map(v => String(v || "").trim().toLowerCase())\r
        .filter(Boolean);\r
      return candidates.some(candidate => ids.includes(candidate));\r
    }) || null;\r
  }\r
\r
  function hasTeacherReference(slot = {}) {\r
    return [slot.teacherUid, slot.teacherId, slot.teacherName, slot.teacherEmail, slot.teacher]\r
      .some(value => cleanText(value));\r
  }\r
\r
  function clearTeacherReference(slot = {}) {\r
    slot.teacherUid = "";\r
    slot.teacherId = "";\r
    slot.teacherName = "";\r
    slot.teacherEmail = "";\r
    if ("teacher" in slot) slot.teacher = "";\r
    return slot;\r
  }\r
\r
  function clearInactiveTeacherSlots(schedule = currentTimetable?.schedule) {\r
    if (!schedule) return;\r
    Object.values(schedule || {}).forEach(daySlots => {\r
      Object.values(daySlots || {}).forEach(slot => {\r
        if (hasTeacherReference(slot) && !findTeacherBySlot(slot)) clearTeacherReference(slot);\r
      });\r
    });\r
  }\r
\r
  function getTeacherReadableId(slot = {}) {\r
    const teacher = findTeacherBySlot(slot);\r
    return teacher?.teacherId || slot.teacherReadableId || slot.teacherId || slot.teacherUid || "—";\r
  }\r
\r
  function slotBelongsToTeacher(slot = {}, teacher = {}) {\r
    const slotIds = [slot.teacherUid, slot.teacherId, slot.teacher, slot.teacherEmail, slot.teacherName]\r
      .map(v => String(v || "").trim().toLowerCase())\r
      .filter(Boolean);\r
    const teacherIds = [teacher.uid, teacher.teacherId, teacher.email, teacher.name]\r
      .map(v => String(v || "").trim().toLowerCase())\r
      .filter(Boolean);\r
    return slotIds.some(id => teacherIds.includes(id));\r
  }\r
\r
  // ── EMPTY SCHEDULE ──\r
  function createEmptySchedule() {\r
    const schedule = {};\r
    days.forEach(day => {\r
      schedule[day] = {};\r
      for (let i = 1; i <= 7; i++) {\r
        schedule[day][\`Period \${i}\`] = { subject: "", teacherUid: "", teacherId: "", teacherName: "" };\r
      }\r
    });\r
    return schedule;\r
  }\r
\r
  function createEmptyPeriodTimes(count = 7) {\r
    const periodTimes = {};\r
    for (let i = 1; i <= count; i++) {\r
      periodTimes[\`Period \${i}\`] = { startTime: "", endTime: "" };\r
    }\r
    return periodTimes;\r
  }\r
\r
  function getSortedPeriodKeys(schedule = currentTimetable?.schedule) {\r
    return Object.keys(schedule?.Monday || {})\r
      .sort((a,b) => parseInt(a.replace("Period ","")) - parseInt(b.replace("Period ","")));\r
  }\r
\r
  function normalizeTimetablePeriods() {\r
    if (!currentTimetable?.schedule) return;\r
    const orderedPeriods = getSortedPeriodKeys();\r
    const normalized = {};\r
    const normalizedTimes = {};\r
    days.forEach(day => { normalized[day] = {}; });\r
\r
    orderedPeriods.forEach((period, index) => {\r
      const nextKey = \`Period \${index + 1}\`;\r
      const savedTime = currentTimetable.periodTimes?.[period] || {};\r
      const legacyTimeSlot = days\r
        .map(day => currentTimetable.schedule[day]?.[period])\r
        .find(slot => slot?.startTime || slot?.endTime) || {};\r
      normalizedTimes[nextKey] = {\r
        startTime: savedTime.startTime || legacyTimeSlot.startTime || "",\r
        endTime: savedTime.endTime || legacyTimeSlot.endTime || ""\r
      };\r
      days.forEach(day => {\r
        const slot = currentTimetable.schedule[day]?.[period] || {};\r
        const matchedTeacher = findTeacherBySlot(slot);\r
        const teacherFields = matchedTeacher ? {\r
          teacherUid: slot.teacherUid || matchedTeacher.uid || "",\r
          teacherId: matchedTeacher.teacherId || slot.teacherId || "",\r
          teacherName: slot.teacherName || matchedTeacher.name || "",\r
          teacherEmail: slot.teacherEmail || matchedTeacher.email || ""\r
        } : {\r
          teacherUid: "",\r
          teacherId: "",\r
          teacherName: "",\r
          teacherEmail: ""\r
        };\r
        normalized[day][nextKey] = {\r
          subject: slot.subject || "",\r
          ...teacherFields\r
        };\r
      });\r
    });\r
\r
    currentTimetable.schedule = normalized;\r
    currentTimetable.periodTimes = normalizedTimes;\r
    syncPeriodTimesToSlots();\r
  }\r
\r
  function getPeriodTime(period) {\r
    currentTimetable.periodTimes = currentTimetable.periodTimes || {};\r
    currentTimetable.periodTimes[period] = currentTimetable.periodTimes[period] || { startTime: "", endTime: "" };\r
    return currentTimetable.periodTimes[period];\r
  }\r
\r
  function syncPeriodTimesToSlots() {\r
    if (!currentTimetable?.schedule) return;\r
    getSortedPeriodKeys().forEach(period => {\r
      const time = getPeriodTime(period);\r
      days.forEach(day => {\r
        currentTimetable.schedule[day][period] = currentTimetable.schedule[day][period] || {};\r
        currentTimetable.schedule[day][period].startTime = time.startTime || "";\r
        currentTimetable.schedule[day][period].endTime = time.endTime || "";\r
      });\r
    });\r
  }\r
\r
  // ── LOAD TIMETABLE ──\r
  function extractPeriodTimes(timetable = {}) {\r
    const schedule = timetable.schedule || {};\r
    const sourcePeriods = sortPeriodKeys([\r
      ...new Set([\r
        ...Object.keys(timetable.periodTimes || {}),\r
        ...Object.keys(schedule.Monday || {})\r
      ])\r
    ]);\r
    const extracted = {};\r
    sourcePeriods.forEach((period, index) => {\r
      const targetPeriod = \`Period \${index + 1}\`;\r
      const savedTime = timetable.periodTimes?.[period] || {};\r
      const legacyTimeSlot = days\r
        .map(day => schedule[day]?.[period])\r
        .find(slot => slot?.startTime || slot?.endTime) || {};\r
      extracted[targetPeriod] = {\r
        startTime: savedTime.startTime || legacyTimeSlot.startTime || "",\r
        endTime: savedTime.endTime || legacyTimeSlot.endTime || ""\r
      };\r
    });\r
    return extracted;\r
  }\r
\r
  function normalizeSubjectName(value) {\r
    return String(value || "").replace(/\\s+/g, " ").trim();\r
  }\r
\r
  function mergeSubjects(...lists) {\r
    const seen = new Set();\r
    const subjects = [];\r
    lists.flat().forEach(value => {\r
      const name = normalizeSubjectName(typeof value === "string" ? value : value?.name);\r
      const key = name.toLowerCase();\r
      if (!name || seen.has(key)) return;\r
      seen.add(key);\r
      subjects.push(name);\r
    });\r
    return subjects.sort((a, b) => a.localeCompare(b));\r
  }\r
\r
  function collectSubjectsFromSchedule(schedule = currentTimetable?.schedule) {\r
    const subjects = [];\r
    Object.values(schedule || {}).forEach(daySlots => {\r
      Object.values(daySlots || {}).forEach(slot => subjects.push(slot?.subject || ""));\r
    });\r
    return mergeSubjects(subjects);\r
  }\r
\r
  function classSubjectDocId(className = currentTimetable?.class) {\r
    return \`timetable-\${String(className || "").replace(/[^a-zA-Z0-9_-]/g, "_")}\`;\r
  }\r
\r
  function classSubjectsRef(className = currentTimetable?.class) {\r
    return doc(db, "schools", currentUser.uid, "subjects", classSubjectDocId(className));\r
  }\r
\r
  async function refreshTimetableCache(force = false) {\r
    if (!currentUser) return allTimetables;\r
    const cacheIsFresh = allTimetables.length && (Date.now() - timetableCacheAt < 60000);\r
    if (!force && cacheIsFresh) return allTimetables;\r
    if (!force && timetableCachePromise) return timetableCachePromise;\r
    timetableCachePromise = getDocs(collection(db, "schools", currentUser.uid, "timetables"))\r
      .then(snapshot => {\r
        allTimetables = dedupeTimetables(snapshot.docs.map(item => ({ id: item.id, ...(item.data() || {}) })));\r
        timetableCacheAt = Date.now();\r
        return allTimetables;\r
      })\r
      .finally(() => { timetableCachePromise = null; });\r
    return timetableCachePromise;\r
  }\r
\r
  let schoolSubjects = [];\r
\r
  async function loadSchoolSubjects() {\r
    if (!currentUser) return [];\r
    try {\r
      const snap = await getDocs(collection(db, "schools", currentUser.uid, "subjects"));\r
      const list = [];\r
      snap.forEach(d => {\r
        const data = d.data() || {};\r
        const name = normalizeSubjectName(data.name || "");\r
        if (name) list.push(name);\r
      });\r
      schoolSubjects = mergeSubjects(list);\r
    } catch (e) {\r
      console.warn("Failed to load school subjects from Firestore:", e);\r
    }\r
    return schoolSubjects;\r
  }\r
\r
  function subjectOptions(selected = "") {\r
    const selectedName = normalizeSubjectName(selected);\r
    const subjects = mergeSubjects(schoolSubjects, selectedName ? [selectedName] : []);\r
    const options = [\`<option value="">Select subject</option>\`];\r
    subjects.forEach(subject => {\r
      const isSelected = subject.toLowerCase() === selectedName.toLowerCase() ? " selected" : "";\r
      options.push(\`<option value="\${escHtml(subject)}"\${isSelected}>\${escHtml(subject)}</option>\`);\r
    });\r
    if (!subjects.length) options.push(\`<option value="" disabled>No school subjects found</option>\`);\r
    return options.join("");\r
  }\r
\r
  function getTeachersForSubject(subject) {\r
    if (!subject) return teachers;\r
    const target = String(subject).trim().toLowerCase();\r
    return teachers.filter(t => {\r
      const subList = Array.isArray(t.subjects) ? t.subjects : (t.subject ? [t.subject] : []);\r
      return subList.some(s => String(s).trim().toLowerCase() === target);\r
    });\r
  }\r
\r
  function teacherSelectOptions(subject = "", selectedTeacherUid = "", day = "", period = "") {\r
    const cleanSubj = String(subject || "").trim();\r
    const matching = getTeachersForSubject(cleanSubj);\r
    const options = [\`<option value="">Select teacher</option>\`];\r
    const isTeacherSelected = (t) => {\r
      if (!selectedTeacherUid) return false;\r
      const target = String(selectedTeacherUid).toLowerCase();\r
      return (t.uid && t.uid.toLowerCase() === target) ||\r
             (t.teacherId && t.teacherId.toLowerCase() === target) ||\r
             (t.name && t.name.toLowerCase() === target);\r
    };\r
\r
    if (cleanSubj && matching.length > 0) {\r
      matching.forEach(t => {\r
        const isSelected = isTeacherSelected(t);\r
        const conflict = (day && period) ? findTeacherConflict(t, day, period) : null;\r
        options.push(\`<option value="\${t.uid}"\${isSelected ? " selected" : ""}>\${escHtml(t.name)} (\${escHtml(t.teacherId || t.uid)})\${conflict ? " [Busy]" : ""}</option>\`);\r
      });\r
      const otherTeachers = teachers.filter(t => !matching.some(m => m.uid === t.uid));\r
      if (otherTeachers.length > 0) {\r
        options.push(\`<optgroup label="Other Teachers">\`);\r
        otherTeachers.forEach(t => {\r
          const isSelected = isTeacherSelected(t);\r
          const conflict = (day && period) ? findTeacherConflict(t, day, period) : null;\r
          options.push(\`<option value="\${t.uid}"\${isSelected ? " selected" : ""}>\${escHtml(t.name)} (\${escHtml(t.teacherId || t.uid)})\${conflict ? " [Busy]" : ""}</option>\`);\r
        });\r
        options.push(\`</optgroup>\`);\r
      }\r
    } else if (cleanSubj && matching.length === 0) {\r
      options.push(\`<option value="" disabled>-- No teacher assigned for "\${escHtml(cleanSubj)}" --</option>\`);\r
      if (teachers.length > 0) {\r
        options.push(\`<optgroup label="All Teachers">\`);\r
        teachers.forEach(t => {\r
          const isSelected = isTeacherSelected(t);\r
          const conflict = (day && period) ? findTeacherConflict(t, day, period) : null;\r
          options.push(\`<option value="\${t.uid}"\${isSelected ? " selected" : ""}>\${escHtml(t.name)} (\${escHtml(t.teacherId || t.uid)})\${conflict ? " [Busy]" : ""}</option>\`);\r
        });\r
        options.push(\`</optgroup>\`);\r
      }\r
    } else {\r
      teachers.forEach(t => {\r
        const isSelected = isTeacherSelected(t);\r
        const conflict = (day && period) ? findTeacherConflict(t, day, period) : null;\r
        options.push(\`<option value="\${t.uid}"\${isSelected ? " selected" : ""}>\${escHtml(t.name)} (\${escHtml(t.teacherId || t.uid)})\${conflict ? " [Busy]" : ""}</option>\`);\r
      });\r
    }\r
    return options.join("");\r
  }\r
\r
  window.onSlotSubjectChange = function (day, period, select) {\r
    const subject = select.value || "";\r
    updateSlot(day, period, "subject", subject);\r
    const slotKey = \`\${day}-\${period.replace(/ /g, "_")}\`;\r
    const teacherSel = document.getElementById(\`tsel-\${slotKey}\`);\r
    if (teacherSel) {\r
      const currentSlot = currentTimetable.schedule?.[day]?.[period] || {};\r
      const currentTeacherUid = currentSlot.teacherUid || currentSlot.teacherId || currentSlot.teacherName || "";\r
      teacherSel.innerHTML = teacherSelectOptions(subject, currentTeacherUid, day, period);\r
      \r
      const matching = getTeachersForSubject(subject);\r
      const stillMatches = currentTeacherUid && matching.some(t => t.uid === currentTeacherUid || t.teacherId === currentTeacherUid || t.name === currentTeacherUid);\r
      if (!stillMatches && currentTeacherUid && subject) {\r
        updateSlot(day, period, "teacherUid", "");\r
        updateSlot(day, period, "teacherId", "");\r
        updateSlot(day, period, "teacherName", "");\r
        updateSlot(day, period, "teacherEmail", "");\r
        teacherSel.value = "";\r
        const badge = document.getElementById(\`tid-\${slotKey}\`);\r
        if (badge) badge.textContent = "—";\r
      }\r
    }\r
  };\r
\r
  window.onSlotTeacherChange = function (day, period, select) {\r
    const teacherUid = select.value;\r
    const slotKey = \`\${day}-\${period.replace(/ /g, "_")}\`;\r
    if (!teacherUid) {\r
      updateSlot(day, period, "teacherUid", "");\r
      updateSlot(day, period, "teacherId", "");\r
      updateSlot(day, period, "teacherName", "");\r
      updateSlot(day, period, "teacherEmail", "");\r
      const badge = document.getElementById(\`tid-\${slotKey}\`);\r
      if (badge) badge.textContent = "—";\r
      return;\r
    }\r
    const teacher = teachers.find(t => t.uid === teacherUid);\r
    if (!teacher) return;\r
    const conflict = findTeacherConflict(teacher, day, period);\r
    if (conflict) {\r
      toast(conflictMessage(teacher, conflict, day, period), "error");\r
      select.value = currentTimetable.schedule?.[day]?.[period]?.teacherUid || "";\r
      return;\r
    }\r
    updateSlot(day, period, "teacherUid", teacher.uid);\r
    updateSlot(day, period, "teacherId", teacher.teacherId || teacher.uid);\r
    updateSlot(day, period, "teacherName", teacher.name);\r
    updateSlot(day, period, "teacherEmail", teacher.email || "");\r
    const badge = document.getElementById(\`tid-\${slotKey}\`);\r
    if (badge) badge.textContent = teacher.teacherId || teacher.uid;\r
  };\r
\r
  function getClassOptions() {\r
    return [...new Set(allStudents.map(student => student.class).filter(Boolean))]\r
      .sort((a, b) => (parseInt(a, 10) || 0) - (parseInt(b, 10) || 0) || String(a).localeCompare(String(b)));\r
  }\r
\r
  function getSectionOptions(className) {\r
    return [...new Set(allStudents\r
      .filter(student => String(student.class) === String(className))\r
      .map(student => student.section)\r
      .filter(Boolean))]\r
      .sort((a, b) => String(a).localeCompare(String(b)));\r
  }\r
\r
  window.populateSyncSectionSelect = function () {\r
    const className = document.getElementById("syncClassSelect")?.value || "";\r
    const sectionSelect = document.getElementById("syncSectionSelect");\r
    if (!sectionSelect) return;\r
    sectionSelect.innerHTML = \`<option value="">Select Section</option>\`;\r
    getSectionOptions(className).forEach(section => {\r
      const option = document.createElement("option");\r
      option.value = option.textContent = section;\r
      sectionSelect.appendChild(option);\r
    });\r
  };\r
\r
  window.openSyncTimeModal = function () {\r
    if (!currentTimetable) { toast("Load a timetable first", "error"); return; }\r
    const classSelect = document.getElementById("syncClassSelect");\r
    const meta = document.getElementById("syncTimeModalMeta");\r
    if (meta) meta.textContent = \`Copy timings into Class \${currentTimetable.class}-\${currentTimetable.section}\`;\r
    classSelect.innerHTML = \`<option value="">Select Class</option>\`;\r
    getClassOptions().forEach(className => {\r
      const option = document.createElement("option");\r
      option.value = option.textContent = className;\r
      classSelect.appendChild(option);\r
    });\r
    classSelect.value = currentTimetable.class || "";\r
    populateSyncSectionSelect();\r
    document.getElementById("syncSectionSelect").value = currentTimetable.section || "";\r
    const modal = document.getElementById("syncTimeModal");\r
    modal.classList.add("show");\r
    modal.setAttribute("aria-hidden", "false");\r
  };\r
\r
  window.closeSyncTimeModal = function () {\r
    const modal = document.getElementById("syncTimeModal");\r
    modal.classList.remove("show");\r
    modal.setAttribute("aria-hidden", "true");\r
  };\r
\r
  window.syncTimeFromSelectedTimetable = async function () {\r
    if (!currentTimetable) { toast("Load a timetable first", "error"); return; }\r
    const sourceClass = document.getElementById("syncClassSelect")?.value || "";\r
    const sourceSection = document.getElementById("syncSectionSelect")?.value || "";\r
    if (!sourceClass || !sourceSection) { toast("Select source class and section", "error"); return; }\r
    showLoading(true, "Syncing period times...");\r
    try {\r
      await nextPaint();\r
      const sourceRef = doc(db, "schools", currentUser.uid, "timetables", \`\${sourceClass}-\${sourceSection}\`);\r
      const sourceSnap = await getDoc(sourceRef);\r
      if (!sourceSnap.exists()) {\r
        toast("Selected timetable not found", "error");\r
        showLoading(false);\r
        return;\r
      }\r
      const sourceTimes = extractPeriodTimes(sourceSnap.data() || {});\r
      const currentPeriods = getSortedPeriodKeys();\r
      let synced = 0;\r
      currentTimetable.periodTimes = currentTimetable.periodTimes || {};\r
      currentPeriods.forEach(period => {\r
        const sourceTime = sourceTimes[period];\r
        if (!sourceTime || (!sourceTime.startTime && !sourceTime.endTime)) return;\r
        currentTimetable.periodTimes[period] = {\r
          startTime: sourceTime.startTime || "",\r
          endTime: sourceTime.endTime || ""\r
        };\r
        synced += 1;\r
      });\r
      syncPeriodTimesToSlots();\r
      renderTimetable();\r
      closeSyncTimeModal();\r
      toast(synced ? \`Synced \${synced} period time\${synced === 1 ? "" : "s"}\` : "No period times found to sync", synced ? "success" : "error");\r
    } catch(e) {\r
      console.error(e);\r
      toast("Error syncing period times", "error");\r
    }\r
    showLoading(false);\r
  };\r
\r
  function clearSubjectFromSchedule(subject) {\r
    const target = normalizeSubjectName(subject).toLowerCase();\r
    if (!target || !currentTimetable?.schedule) return;\r
    Object.values(currentTimetable.schedule).forEach(daySlots => {\r
      Object.values(daySlots || {}).forEach(slot => {\r
        if (normalizeSubjectName(slot?.subject).toLowerCase() === target) slot.subject = "";\r
      });\r
    });\r
  }\r
\r
  function clearSubjectsNotInClassList() {\r
    const allowed = new Set(currentClassSubjects.map(subject => subject.toLowerCase()));\r
    if (!currentTimetable?.schedule) return;\r
    Object.values(currentTimetable.schedule).forEach(daySlots => {\r
      Object.values(daySlots || {}).forEach(slot => {\r
        const subject = normalizeSubjectName(slot?.subject);\r
        if (subject && !allowed.has(subject.toLowerCase())) slot.subject = "";\r
      });\r
    });\r
  }\r
\r
  function currentTimetableDocId() {\r
    if (!currentTimetable) return "";\r
    return \`\${currentTimetable.class}-\${currentTimetable.section}\`;\r
  }\r
\r
  function sameTeacher(teacher = {}, slot = {}) {\r
    const teacherIds = [teacher.uid, teacher.teacherId, teacher.email, teacher.name]\r
      .map(value => String(value || "").trim().toLowerCase())\r
      .filter(Boolean);\r
    const slotIds = [slot.teacherUid, slot.teacherId, slot.teacher, slot.teacherEmail, slot.teacherName]\r
      .map(value => String(value || "").trim().toLowerCase())\r
      .filter(Boolean);\r
    return teacherIds.some(id => slotIds.includes(id));\r
  }\r
\r
  function findTeacherConflict(teacher, day, period) {\r
    const currentId = currentTimetableDocId();\r
    return allTimetables.find(timetable => {\r
      const timetableId = timetable.id || \`\${timetable.class || ""}-\${timetable.section || ""}\`;\r
      if (timetableId === currentId) return false;\r
      const slot = timetable.schedule?.[day]?.[period];\r
      return slot && sameTeacher(teacher, slot);\r
    }) || null;\r
  }\r
\r
  function conflictMessage(teacher, conflict, day, period) {\r
    const classLabel = [conflict?.class, conflict?.section].filter(Boolean).join(" ");\r
    return \`\${teacher.name} already has \${period} on \${day}\${classLabel ? \` in Class \${classLabel}\` : ""}.\`;\r
  }\r
\r
  function validateNoTeacherConflicts() {\r
    if (!currentTimetable?.schedule) return true;\r
    for (const day of days) {\r
      const slots = currentTimetable.schedule[day] || {};\r
      for (const period of Object.keys(slots)) {\r
        const slot = slots[period] || {};\r
        const teacher = findTeacherBySlot(slot);\r
        if (!teacher) continue;\r
        const conflict = findTeacherConflict(teacher, day, period);\r
        if (conflict) {\r
          toast(conflictMessage(teacher, conflict, day, period), "error");\r
          return false;\r
        }\r
      }\r
    }\r
    return true;\r
  }\r
\r
  window.addClassSubject = function () {\r
    if (!currentTimetable) { toast("Load a timetable first", "error"); return; }\r
    const input = document.getElementById("subjectNameInput");\r
    const subject = normalizeSubjectName(input?.value || "");\r
    if (!subject) { toast("Enter subject name", "error"); return; }\r
    currentClassSubjects = mergeSubjects(currentClassSubjects, [subject]);\r
    currentTimetable.classSubjects = currentClassSubjects;\r
    if (input) input.value = "";\r
    renderSubjectsModal();\r
    renderTimetable();\r
  };\r
\r
  window.deleteClassSubject = function (index) {\r
    const subject = currentClassSubjects[index];\r
    if (!subject) return;\r
    currentClassSubjects = currentClassSubjects.filter((_, i) => i !== index);\r
    clearSubjectFromSchedule(subject);\r
    currentTimetable.classSubjects = currentClassSubjects;\r
    renderSubjectsModal();\r
    renderTimetable();\r
  };\r
\r
  window.saveClassSubjects = async function () {\r
    if (!currentTimetable) { toast("Load a timetable first", "error"); return; }\r
    showLoading(true, "Saving subjects...");\r
    try {\r
      await nextPaint();\r
      currentClassSubjects = mergeSubjects(currentClassSubjects);\r
      currentTimetable.classSubjects = currentClassSubjects;\r
      await setDoc(classSubjectsRef(), {\r
        type: "timetableClassSubjects",\r
        className: currentTimetable.class,\r
        subjects: currentClassSubjects,\r
        updatedAt: serverTimestamp()\r
      });\r
      const ref = doc(db, "schools", currentUser.uid, "timetables", \`\${currentTimetable.class}-\${currentTimetable.section}\`);\r
      await setDoc(ref, { ...currentTimetable, updatedAt: serverTimestamp() });\r
      allTimetables = allTimetables.filter(timetable => (timetable.id || \`\${timetable.class || ""}-\${timetable.section || ""}\`) !== currentTimetableDocId());\r
      allTimetables.push({ id: currentTimetableDocId(), ...currentTimetable });\r
      allTimetables = dedupeTimetables(allTimetables);\r
      toast("Subjects saved successfully!");\r
    } catch(e) {\r
      console.error(e);\r
      toast("Error saving subjects", "error");\r
    }\r
    showLoading(false);\r
  };\r
\r
  window.loadTimetable = async function () {\r
    const cls = document.getElementById("classSelect").value;\r
    const sec = document.getElementById("sectionSelect").value;\r
    if (!cls || !sec) { toast("Please select a class and section", "error"); return; }\r
    showLoading(true, "Loading timetable...");\r
    try {\r
      await nextPaint();\r
      const ref  = doc(db, "schools", currentUser.uid, "timetables", \`\${cls}-\${sec}\`);\r
      const [snap] = await Promise.all([getDoc(ref), loadSchoolSubjects()]);\r
      if (snap.exists()) {\r
        currentTimetable = snap.data();\r
        currentTimetable.class = currentTimetable.class || cls;\r
        currentTimetable.section = currentTimetable.section || sec;\r
        normalizeTimetablePeriods();\r
        clearInactiveTeacherSlots();\r
      } else {\r
        currentTimetable = { class: cls, section: sec, schedule: createEmptySchedule(), periodTimes: createEmptyPeriodTimes() };\r
        syncPeriodTimesToSlots();\r
      }\r
      renderTimetable();\r
      document.getElementById("statsBar").style.display = "flex";\r
      document.getElementById("statClass").textContent   = cls;\r
      document.getElementById("statSection").textContent = sec;\r
      refreshTimetableCache().catch(console.error);\r
    } catch(e) {\r
      toast("Failed to load timetable", "error");\r
    }\r
    showLoading(false);\r
  };\r
\r
  // ── ADD PERIOD ──\r
  window.addPeriod = function () {\r
    if (!currentTimetable) { toast("Load a timetable first", "error"); return; }\r
    normalizeTimetablePeriods();\r
    const periods = getSortedPeriodKeys();\r
    const next    = periods.length + 1;\r
    currentTimetable.periodTimes = currentTimetable.periodTimes || {};\r
    currentTimetable.periodTimes[\`Period \${next}\`] = { startTime: "", endTime: "" };\r
    days.forEach(day => {\r
      currentTimetable.schedule[day][\`Period \${next}\`] = { subject: "", teacherUid: "", teacherId: "", teacherName: "", startTime: "", endTime: "" };\r
    });\r
    renderTimetable();\r
    toast(\`Period \${next} added\`);\r
  };\r
\r
  // ── REMOVE PERIOD ──\r
  window.removePeriod = function (periodNum) {\r
    if (!currentTimetable) return;\r
    const key = \`Period \${periodNum}\`;\r
    days.forEach(day => { delete currentTimetable.schedule[day][key]; });\r
    if (currentTimetable.periodTimes) delete currentTimetable.periodTimes[key];\r
    normalizeTimetablePeriods();\r
    renderTimetable();\r
    toast(\`Period \${periodNum} removed\`);\r
  };\r
\r
  // ── UPDATE SLOT ──\r
  window.updateSlot = function (day, period, field, value) {\r
    currentTimetable.schedule[day][period][field] = value;\r
    if (field === "teacherName") {\r
      currentTimetable.schedule[day][period].teacherUid = "";\r
      currentTimetable.schedule[day][period].teacherId = "";\r
      currentTimetable.schedule[day][period].teacherEmail = "";\r
      const badge = document.getElementById(\`tid-\${day}-\${period.replace(" ","_")}\`);\r
      if (badge) badge.textContent = "—";\r
    }\r
  };\r
\r
  window.updatePeriodTime = function (period, field, value) {\r
    if (!["startTime", "endTime"].includes(field)) return;\r
    const time = getPeriodTime(period);\r
    time[field] = value;\r
    syncPeriodTimesToSlots();\r
    updatePeriodTimeDisplay(period);\r
  };\r
\r
  function updatePeriodTimeDisplay(period) {\r
    const slot = getPeriodTime(period);\r
    const el   = document.getElementById(\`time-display-\${period.replace(" ","_")}\`);\r
    if (!el) return;\r
    if (slot.startTime && slot.endTime) {\r
      el.textContent = \`\${slot.startTime} – \${slot.endTime}\`;\r
    } else if (slot.startTime) {\r
      el.textContent = \`From \${slot.startTime}\`;\r
    } else {\r
      el.textContent = "";\r
    }\r
  }\r
\r
  // ── SEARCH TEACHER ──\r
  window.searchTeacher = function (input, day, period) {\r
    const value     = input.value.toLowerCase();\r
    const resultBox = document.getElementById(\`tr-\${day}-\${period.replace(" ","_")}\`);\r
    resultBox.innerHTML = "";\r
    if (!value) return;\r
    const filtered = teachers.filter(t =>\r
      (t.name || "").toLowerCase().includes(value) ||\r
      (t.teacherId || "").toLowerCase().includes(value)\r
    );\r
    filtered.slice(0, 6).forEach(teacher => {\r
      const conflict = findTeacherConflict(teacher, day, period);\r
      const div = document.createElement("div");\r
      div.className = \`teacher-result-item\${conflict ? " busy" : ""}\`;\r
      div.innerHTML = \`<div class="t-name">\${escHtml(teacher.name)}</div><div class="t-id">\${conflict ? escHtml(conflictMessage(teacher, conflict, day, period)) : escHtml(teacher.teacherId || teacher.uid)}</div>\`;\r
      div.onclick = () => {\r
        if (conflict) {\r
          toast(conflictMessage(teacher, conflict, day, period), "error");\r
          return;\r
        }\r
        input.value = teacher.name;\r
        currentTimetable.schedule[day][period].teacherUid  = teacher.uid;\r
        currentTimetable.schedule[day][period].teacherId   = teacher.teacherId || teacher.uid;\r
        currentTimetable.schedule[day][period].teacherName = teacher.name;\r
        currentTimetable.schedule[day][period].teacherEmail = teacher.email || "";\r
        // Update badge\r
        const badge = document.getElementById(\`tid-\${day}-\${period.replace(" ","_")}\`);\r
        if (badge) badge.textContent = teacher.teacherId || teacher.uid;\r
        resultBox.innerHTML = "";\r
      };\r
      resultBox.appendChild(div);\r
    });\r
  };\r
\r
  // ── RENDER ──\r
  function renderTimetableLegacyDailyTime() {\r
    const container = document.getElementById("timetableContainer");\r
    normalizeTimetablePeriods();\r
    const periods = getSortedPeriodKeys();\r
\r
    document.getElementById("statPeriods").textContent = periods.length;\r
\r
    const dayIcons = {\r
      Monday:    \`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>\`,\r
      Tuesday:   \`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v1m0 16v1M4.22 4.22l.707.707m12.728 12.728.707.707M3 12h1m16 0h1M4.927 19.073l.707-.707M18.364 5.636l.707-.707"/></svg>\`,\r
      Wednesday: \`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>\`,\r
      Thursday:  \`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>\`,\r
      Friday:    \`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/></svg>\`,\r
      Saturday:  \`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a10 10 0 1 0 10 10H12z"/></svg>\`,\r
    };\r
\r
    let html = \`<div class="table-wrapper"><table>\r
      <thead><tr>\r
        <th>Period / Time</th>\r
        \${days.map(d => \`<th><div class="day-icon">\${dayIcons[d] || ""} \${d}</div></th>\`).join("")}\r
      </tr></thead>\r
      <tbody>\`;\r
\r
    periods.forEach(period => {\r
      const pNum   = period.replace("Period ","");\r
      const pKey   = period.replace(" ","_");\r
      const monday = currentTimetable.schedule["Monday"][period];\r
      const timeDisplay = (monday.startTime && monday.endTime)\r
        ? \`\${monday.startTime} – \${monday.endTime}\`\r
        : (monday.startTime ? \`From \${monday.startTime}\` : "");\r
\r
      html += \`<tr>\r
        <td>\r
          <div class="period-cell">\r
            <div class="period-num">\r
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2.2" style="vertical-align:-2px;margin-right:4px"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>\r
              \${period}\r
            </div>\r
            <div class="period-time-display" id="time-display-\${pKey}">\${timeDisplay}</div>\r
            \${periods.length > 1 ? \`<button class="btn btn-danger period-remove" onclick="removePeriod(\${pNum})">\r
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>\r
              Remove\r
            </button>\` : ""}\r
          </div>\r
        </td>\`;\r
\r
      days.forEach(day => {\r
        const slot    = currentTimetable.schedule[day][period] || {};\r
        const slotKey = \`\${day}-\${pKey}\`;\r
        html += \`<td>\r
          <div class="slot-cell">\r
\r
            <div class="field-label-small">\r
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>\r
              Subject\r
            </div>\r
            <input class="slot-input subject-input" type="text" placeholder="e.g. Mathematics"\r
              value="\${escHtml(slot.subject || '')}"\r
              onchange="updateSlot('\${day}','\${period}','subject',this.value)">\r
\r
            <div class="field-label-small" style="margin-top:2px">\r
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>\r
              <span style="color:var(--gold)">Start</span>\r
            </div>\r
            <input class="slot-input time-input" type="text"\r
              value="\${escHtml(slot.startTime || '')}"\r
              onchange="updateSlot('\${day}','\${period}','startTime',this.value)">\r
\r
            <div class="field-label-small">\r
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>\r
              <span style="color:var(--gold)">End</span>\r
            </div>\r
            <input class="slot-input time-input" type="text"\r
              value="\${escHtml(slot.endTime || '')}"\r
              onchange="updateSlot('\${day}','\${period}','endTime',this.value)">\r
\r
            <div class="field-label-small" style="margin-top:2px">\r
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>\r
              Teacher\r
            </div>\r
            <div class="teacher-search-wrap">\r
              <input class="slot-input" type="text" placeholder="Search teacher…"\r
                value="\${escHtml(slot.teacherName || '')}"\r
                oninput="updateSlot('\${day}','\${period}','teacherName',this.value); searchTeacher(this,'\${day}','\${period}')">\r
              <div class="teacher-results" id="tr-\${slotKey}"></div>\r
            </div>\r
\r
            <div class="teacher-id-badge">\r
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 3H8l-2 4h12z"/></svg>\r
              <span id="tid-\${slotKey}">\${escHtml(getTeacherReadableId(slot))}</span>\r
            </div>\r
          </div>\r
        </td>\`;\r
      });\r
      html += \`</tr>\`;\r
    });\r
\r
    html += \`</tbody></table></div>\`;\r
    container.innerHTML = html;\r
  }\r
\r
  function renderTimetable() {\r
    const container = document.getElementById("timetableContainer");\r
    normalizeTimetablePeriods();\r
    const periods = getSortedPeriodKeys();\r
\r
    document.getElementById("statPeriods").textContent = periods.length;\r
\r
    const dayIcons = {\r
      Monday:    \`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>\`,\r
      Tuesday:   \`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v1m0 16v1M4.22 4.22l.707.707m12.728 12.728.707.707M3 12h1m16 0h1M4.927 19.073l.707-.707M18.364 5.636l.707-.707"/></svg>\`,\r
      Wednesday: \`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>\`,\r
      Thursday:  \`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>\`,\r
      Friday:    \`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/></svg>\`,\r
      Saturday:  \`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a10 10 0 1 0 10 10H12z"/></svg>\`\r
    };\r
\r
    let html = \`<div class="table-wrapper"><table>\r
      <thead><tr>\r
        <th>Period / Time</th>\r
        \${days.map(d => \`<th><div class="day-icon">\${dayIcons[d] || ""} \${d}</div></th>\`).join("")}\r
      </tr></thead>\r
      <tbody>\`;\r
\r
    periods.forEach(period => {\r
      const pNum = period.replace("Period ", "");\r
      const pKey = period.replace(" ", "_");\r
      const periodTime = getPeriodTime(period);\r
      const timeDisplay = getTimeLabel(periodTime);\r
\r
      html += \`<tr>\r
        <td>\r
          <div class="period-cell">\r
            <div class="period-num">\r
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2.2" style="vertical-align:-2px;margin-right:4px"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>\r
              \${period}\r
            </div>\r
            <div class="period-time-display" id="time-display-\${pKey}">\${escHtml(timeDisplay)}</div>\r
            <div class="period-time-controls">\r
              <div class="field-label-small">\r
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>\r
                <span style="color:var(--gold)">Start</span>\r
              </div>\r
              <input class="slot-input time-input" type="text" value="\${escHtml(periodTime.startTime || "")}" onchange="updatePeriodTime('\${period}','startTime',this.value)">\r
              <div class="field-label-small">\r
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>\r
                <span style="color:var(--gold)">End</span>\r
              </div>\r
              <input class="slot-input time-input" type="text" value="\${escHtml(periodTime.endTime || "")}" onchange="updatePeriodTime('\${period}','endTime',this.value)">\r
            </div>\r
            \${periods.length > 1 ? \`<button class="btn btn-danger period-remove" onclick="removePeriod(\${pNum})">\r
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>\r
              Remove\r
            </button>\` : ""}\r
          </div>\r
        </td>\`;\r
\r
      days.forEach(day => {\r
        const slot = currentTimetable.schedule[day][period] || {};\r
        const slotKey = \`\${day}-\${pKey}\`;\r
        html += \`<td>\r
          <div class="slot-cell">\r
            <div class="field-label-small">\r
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>\r
              Subject\r
            </div>\r
            <input class="slot-input subject-input" type="text" placeholder="e.g. Mathematics" value="\${escHtml(slot.subject || "")}" onchange="updateSlot('\${day}','\${period}','subject',this.value)">\r
\r
            <div class="field-label-small" style="margin-top:2px">\r
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>\r
              Teacher\r
            </div>\r
            <div class="teacher-search-wrap">\r
              <input class="slot-input" type="text" placeholder="Search teacher..." value="\${escHtml(slot.teacherName || "")}" oninput="updateSlot('\${day}','\${period}','teacherName',this.value); searchTeacher(this,'\${day}','\${period}')">\r
              <div class="teacher-results" id="tr-\${slotKey}"></div>\r
            </div>\r
\r
            <div class="teacher-id-badge">\r
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 3H8l-2 4h12z"/></svg>\r
              <span id="tid-\${slotKey}">\${escHtml(getTeacherReadableId(slot))}</span>\r
            </div>\r
          </div>\r
        </td>\`;\r
      });\r
      html += \`</tr>\`;\r
    });\r
\r
    html += \`</tbody></table></div>\`;\r
    container.innerHTML = html;\r
  }\r
\r
  function sortPeriodKeys(periods = []) {\r
    return periods.slice().sort((a, b) =>\r
      (parseInt(String(a).replace("Period ", ""), 10) || 0) -\r
      (parseInt(String(b).replace("Period ", ""), 10) || 0)\r
    );\r
  }\r
\r
  function getTimeLabel(slot = {}) {\r
    if (slot.startTime && slot.endTime) return \`\${formatTime12(slot.startTime)} - \${formatTime12(slot.endTime)}\`;\r
    if (slot.startTime) return \`From \${formatTime12(slot.startTime)}\`;\r
    if (slot.endTime) return \`Until \${formatTime12(slot.endTime)}\`;\r
    return "";\r
  }\r
\r
  function formatTime12(value) {\r
    const match = String(value || "").trim().match(/^(\\d{1,2}):(\\d{2})/);\r
    if (!match) return String(value || "");\r
    let hours = Number(match[1]);\r
    const minutes = match[2];\r
    if (!Number.isFinite(hours)) return String(value || "");\r
    const suffix = hours >= 12 ? "PM" : "AM";\r
    hours = hours % 12 || 12;\r
    return \`\${hours}:\${minutes} \${suffix}\`;\r
  }\r
\r
  function timeParts12(value) {\r
    const match = String(value || "").trim().match(/^(\\d{1,2}):(\\d{2})/);\r
    if (!match) return { hour: "", minute: "", meridiem: "AM" };\r
    const rawHour = Number(match[1]);\r
    const minute = match[2];\r
    if (!Number.isFinite(rawHour)) return { hour: "", minute: "", meridiem: "AM" };\r
    return {\r
      hour: String(rawHour % 12 || 12),\r
      minute,\r
      meridiem: rawHour >= 12 ? "PM" : "AM"\r
    };\r
  }\r
\r
  function toTime24(hour, minute, meridiem) {\r
    let value = Number(hour || 0);\r
    if (!Number.isFinite(value) || value < 1 || value > 12 || !minute) return "";\r
    const suffix = meridiem === "PM" ? "PM" : "AM";\r
    if (suffix === "AM" && value === 12) value = 0;\r
    if (suffix === "PM" && value !== 12) value += 12;\r
    return \`\${String(value).padStart(2, "0")}:\${String(minute).padStart(2, "0")}\`;\r
  }\r
\r
  function timeOptions(selectedValue, values) {\r
    return values.map(value => \`<option value="\${escHtml(value)}" \${String(value) === String(selectedValue) ? "selected" : ""}>\${escHtml(value)}</option>\`).join("");\r
  }\r
\r
  function renderTime12Controls(period, field, value) {\r
    const parts = timeParts12(value);\r
    const id = \`\${period.replace(/\\s+/g, "_")}_\${field}\`;\r
    const hours = Array.from({ length: 12 }, (_, index) => String(index + 1));\r
    const minutes = Array.from({ length: 12 }, (_, index) => String(index * 5).padStart(2, "0"));\r
    return \`<div class="time-12-controls" data-period="\${escHtml(period)}" data-field="\${escHtml(field)}">\r
      <select class="slot-input time-input" id="\${id}_hour" aria-label="\${escHtml(period)} \${field} hour" onchange="updatePeriodTime12('\${period}','\${field}')">\r
        <option value="">Hr</option>\${timeOptions(parts.hour, hours)}\r
      </select>\r
      <select class="slot-input time-input" id="\${id}_minute" aria-label="\${escHtml(period)} \${field} minute" onchange="updatePeriodTime12('\${period}','\${field}')">\r
        <option value="">Min</option>\${timeOptions(parts.minute, minutes)}\r
      </select>\r
      <select class="slot-input time-input" id="\${id}_meridiem" aria-label="\${escHtml(period)} \${field} AM PM" onchange="updatePeriodTime12('\${period}','\${field}')">\r
        \${timeOptions(parts.meridiem, ["AM", "PM"])}\r
      </select>\r
    </div>\`;\r
  }\r
\r
  window.updatePeriodTime12 = function (period, field) {\r
    const id = \`\${period.replace(/\\s+/g, "_")}_\${field}\`;\r
    const hour = document.getElementById(\`\${id}_hour\`)?.value || "";\r
    const minute = document.getElementById(\`\${id}_minute\`)?.value || "";\r
    const meridiem = document.getElementById(\`\${id}_meridiem\`)?.value || "AM";\r
    updatePeriodTime(period, field, toTime24(hour, minute, meridiem));\r
  };\r
\r
  window.closeTeacherTimetableView = function() {\r
    document.getElementById("teacherViewCard").classList.remove("show");\r
    document.getElementById("teacherTimetableView").innerHTML = "";\r
  };\r
\r
  window.viewTeacherTimetable = async function() {\r
    const teacherUid = document.getElementById("teacherViewSelect").value;\r
    if (!teacherUid) {\r
      toast("Please select a teacher first", "error");\r
      return;\r
    }\r
\r
    const teacher = teachers.find(t => t.uid === teacherUid);\r
    if (!teacher) {\r
      toast("Teacher not found", "error");\r
      return;\r
    }\r
\r
    showLoading(true, "Loading teacher timetable...");\r
    try {\r
      await nextPaint();\r
      const timetables = await refreshTimetableCache(true);\r
      const teacherSchedule = {};\r
      let slotCount = 0;\r
      const classSet = new Set();\r
      const seenSlots = new Set();\r
\r
      timetables.forEach(timetable => {\r
        const className = timetable.class || String(timetable.id).split("-")[0] || "";\r
        const sectionName = timetable.section || String(timetable.id).split("-").slice(1).join("-") || "";\r
        const classLabel = sectionName ? \`\${className}-\${sectionName}\` : className;\r
\r
        Object.entries(timetable.schedule || {}).forEach(([day, daySlots]) => {\r
          Object.entries(daySlots || {}).forEach(([period, slot]) => {\r
            if (!slotBelongsToTeacher(slot, teacher)) return;\r
            const commonTime = timetable.periodTimes?.[period] || {};\r
            const uniqueSlotKey = \`\${timetableKey(timetable)}|\${day}|\${period}|\${teacher.uid}\`;\r
            if (seenSlots.has(uniqueSlotKey)) return;\r
            seenSlots.add(uniqueSlotKey);\r
            if (!teacherSchedule[day]) teacherSchedule[day] = {};\r
            if (!teacherSchedule[day][period]) teacherSchedule[day][period] = [];\r
            teacherSchedule[day][period].push({\r
              ...slot,\r
              startTime: commonTime.startTime || slot.startTime || "",\r
              endTime: commonTime.endTime || slot.endTime || "",\r
              classLabel,\r
              class: className,\r
              section: sectionName\r
            });\r
            slotCount += 1;\r
            if (classLabel) classSet.add(classLabel);\r
          });\r
        });\r
      });\r
\r
      const card = document.getElementById("teacherViewCard");\r
      document.getElementById("teacherViewTitle").textContent =\r
        \`\${teacher.name} - Full Timetable\`;\r
      document.getElementById("teacherViewMeta").textContent =\r
        \`Teacher ID: \${teacher.teacherId || teacher.uid} | \${slotCount} lecture\${slotCount === 1 ? "" : "s"} | \${classSet.size} class\${classSet.size === 1 ? "" : "es"}\`;\r
\r
      document.getElementById("teacherTimetableView").innerHTML = renderTeacherReadonlyTimetable(teacherSchedule);\r
      card.classList.add("show");\r
      card.scrollIntoView({ behavior: "smooth", block: "start" });\r
    } catch (error) {\r
      console.error(error);\r
      toast("Failed to load teacher timetable", "error");\r
    }\r
    showLoading(false);\r
  };\r
\r
  function renderTeacherReadonlyTimetable(schedule = {}) {\r
    const scheduleDays = days.filter(day => schedule[day]);\r
    const allPeriods = sortPeriodKeys([...new Set(scheduleDays.flatMap(day => Object.keys(schedule[day] || {})))]);\r
\r
    if (!scheduleDays.length || !allPeriods.length) {\r
      return \`<div class="empty-state" style="padding:2rem;"><h3>No timetable found</h3><p>No periods are assigned to this teacher yet.</p></div>\`;\r
    }\r
\r
    let html = \`<div class="table-wrapper"><table>\r
      <thead><tr>\r
        <th>Period / Time</th>\r
        \${days.map(day => \`<th>\${day}</th>\`).join("")}\r
      </tr></thead><tbody>\`;\r
\r
    allPeriods.forEach(period => {\r
      html += \`<tr><td><div class="period-cell"><div class="period-num">\${escHtml(period)}</div></div></td>\`;\r
      days.forEach(day => {\r
        const slots = schedule[day]?.[period] || [];\r
        if (!slots.length) {\r
          html += \`<td><span style="color:var(--muted);font-size:0.8rem;">—</span></td>\`;\r
          return;\r
        }\r
        html += \`<td>\${slots.map(slot => \`\r
          <div class="readonly-slot">\r
            <strong>\${escHtml(slot.subject || "Lecture")}</strong>\r
            <div>Class: \${escHtml(slot.classLabel || "—")}</div>\r
            <div>Teacher ID: \${escHtml(getTeacherReadableId(slot))}</div>\r
          </div>\r
        \`).join('<div style="height:8px"></div>')}</td>\`;\r
      });\r
      html += \`</tr>\`;\r
    });\r
\r
    html += \`</tbody></table></div>\`;\r
    return html;\r
  }\r
\r
  function escHtml(s) {\r
    return String(s).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;");\r
  }\r
\r
  // ── SAVE ──\r
  renderTimetable = function renderTimetableFlipped() {\r
    const container = document.getElementById("timetableContainer");\r
    normalizeTimetablePeriods();\r
    const periods = getSortedPeriodKeys();\r
    document.getElementById("statPeriods").textContent = periods.length;\r
\r
    let html = \`<div class="table-wrapper"><table><thead><tr><th>Day</th>\`;\r
    html += periods.map(period => {\r
      const periodTime = getPeriodTime(period);\r
      const timeLabel = getTimeLabel(periodTime);\r
      const pNum = period.replace("Period ", "");\r
      return \`<th><div class="period-cell"><div class="period-num">\${escHtml(period)}</div><div class="period-time-display" id="time-display-\${period.replace(" ", "_")}">\${escHtml(timeLabel)}</div><div class="period-time-controls"><div class="field-label-small"><span style="color:var(--gold)">Start</span></div>\${renderTime12Controls(period, "startTime", periodTime.startTime || "")}<div class="field-label-small"><span style="color:var(--gold)">End</span></div>\${renderTime12Controls(period, "endTime", periodTime.endTime || "")}\${periods.length > 1 ? \`<button class="btn btn-danger period-remove" onclick="removePeriod(\${pNum})">Remove</button>\` : ""}</div></div></th>\`;\r
    }).join("");\r
    html += \`</tr></thead><tbody>\`;\r
\r
    days.forEach(day => {\r
      html += \`<tr><td><strong>\${escHtml(day)}</strong></td>\`;\r
      periods.forEach(period => {\r
        const slot = currentTimetable.schedule[day]?.[period] || {};\r
        const slotKey = \`\${day}-\${period.replace(/ /g, "_")}\`;\r
        const teacherUid = slot.teacherUid || slot.teacherId || "";\r
        html += \`<td><div class="slot-cell">\r
          <div class="field-label-small">Subject</div>\r
          <select class="slot-input subject-input" onchange="onSlotSubjectChange('\${day}','\${period}',this)">\${subjectOptions(slot.subject || "")}</select>\r
          <div class="field-label-small" style="margin-top:2px">Teacher</div>\r
          <select class="slot-input teacher-select" id="tsel-\${slotKey}" onchange="onSlotTeacherChange('\${day}','\${period}',this)">\${teacherSelectOptions(slot.subject || "", teacherUid, day, period)}</select>\r
          <div class="teacher-id-badge"><span id="tid-\${slotKey}">\${escHtml(getTeacherReadableId(slot))}</span></div>\r
        </div></td>\`;\r
      });\r
      html += \`</tr>\`;\r
    });\r
\r
    html += \`</tbody></table></div>\`;\r
    container.innerHTML = html;\r
  };\r
\r
  renderTeacherReadonlyTimetable = function renderTeacherReadonlyTimetableFlipped(schedule = {}) {\r
    const scheduleDays = days.filter(day => schedule[day]);\r
    const allPeriods = sortPeriodKeys([...new Set(scheduleDays.flatMap(day => Object.keys(schedule[day] || {})))]);\r
    if (!scheduleDays.length || !allPeriods.length) return \`<div class="empty-state" style="padding:2rem;"><h3>No timetable found</h3><p>No periods are assigned to this teacher yet.</p></div>\`;\r
    let html = \`<div class="table-wrapper"><table><thead><tr><th>Day</th>\`;\r
    allPeriods.forEach(period => {\r
      const firstSlot = scheduleDays.flatMap(day => schedule[day]?.[period] || []).find(slot => getTimeLabel(slot)) || {};\r
      const time = getTimeLabel(firstSlot);\r
      html += \`<th><strong>\${escHtml(period)}</strong>\${time ? \`<div class="class-info">\${escHtml(time)}</div>\` : ""}</th>\`;\r
    });\r
    html += \`</tr></thead><tbody>\`;\r
    scheduleDays.forEach(day => {\r
      html += \`<tr><td><strong>\${escHtml(day)}</strong></td>\`;\r
      allPeriods.forEach(period => {\r
        const slots = schedule[day]?.[period] || [];\r
        html += slots.length ? \`<td>\${slots.map(slot => \`<div class="readonly-slot"><strong>\${escHtml(slot.subject || "Lecture")}</strong><div>Class: \${escHtml(slot.classLabel || "-")}</div><div>Teacher ID: \${escHtml(getTeacherReadableId(slot))}</div></div>\`).join('<div style="height:8px"></div>')}</td>\` : \`<td><span style="color:var(--muted);font-size:0.8rem;">-</span></td>\`;\r
      });\r
      html += \`</tr>\`;\r
    });\r
    html += \`</tbody></table></div>\`;\r
    return html;\r
  };\r
\r
  window.saveTimetable = async function () {\r
    if (!currentTimetable) { toast("Load a timetable first", "error"); return; }\r
    showLoading(true, "Saving timetable...");\r
    try {\r
      await nextPaint();\r
      normalizeTimetablePeriods();\r
      syncPeriodTimesToSlots();\r
      await refreshTimetableCache(true);\r
      if (!validateNoTeacherConflicts()) {\r
        showLoading(false);\r
        return;\r
      }\r
      const ref = doc(db, "schools", currentUser.uid, "timetables",\r
        \`\${currentTimetable.class}-\${currentTimetable.section}\`);\r
      await setDoc(ref, { ...currentTimetable, updatedAt: serverTimestamp() });\r
      allTimetables = allTimetables.filter(timetable => (timetable.id || \`\${timetable.class || ""}-\${timetable.section || ""}\`) !== currentTimetableDocId());\r
      allTimetables.push({ id: currentTimetableDocId(), ...currentTimetable });\r
      allTimetables = dedupeTimetables(allTimetables);\r
      toast("Timetable saved successfully!");\r
    } catch(e) {\r
      console.error(e);\r
      toast("Error saving timetable", "error");\r
    }\r
    showLoading(false);\r
  };\r
\r
  // ── AUTH ──\r
  onAuthStateChanged(auth, async user => {\r
    if (!user) { toast("Please login first", "error"); return; }\r
    currentUser = user;\r
    showLoading(true, "Preparing admin timetable...");\r
    await nextPaint();\r
    await loadTeachers();\r
    await loadSchoolSubjects();\r
    await loadClasses();\r
    showLoading(false);\r
    refreshTimetableCache().catch(console.error);\r
  });\r
`},{attributes:{type:"module",src:"access-control.js"},text:""},{attributes:{src:"schoolix-polish.js"},text:""},{attributes:{src:"admin-shell.js?v=navbar-20260721"},text:""}]};export{e as default};
