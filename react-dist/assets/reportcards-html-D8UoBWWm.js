const e={file:"reportcards.html",title:"Report Card — Schoolix",htmlClass:"",bodyClass:"",body:`\r
<div id="sxPageLoader" class="sx-page-loader" role="status" aria-live="polite">\r
  <section class="dots-container" aria-label="Loading page">\r
    <div class="dot"></div>\r
    <div class="dot"></div>\r
    <div class="dot"></div>\r
    <div class="dot"></div>\r
    <div class="dot"></div>\r
  </section>\r
</div>\r
  <div class="container">\r
\r
    <!-- Top bar -->\r
    <div class="top-bar">\r
      <div class="brand">\r
        <div class="brand-mark">\r
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>\r
        </div>\r
        <div>\r
          <h1>Schoolix — Report Card Generator</h1>\r
          <p class="subtitle">Global subjects, session-aware report cards</p>\r
        </div>\r
      </div>\r
      <a class="btn-back" href="#/index.html">\r
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>\r
        Back to Dashboard\r
      </a>\r
    </div>\r
\r
    <div class="layout">\r
      <!-- MAIN -->\r
      <div>\r
        <!-- Session -->\r
        <div class="panel">\r
          <div class="panel-header">\r
            <div class="panel-title">\r
              <div class="icon-box">\r
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>\r
              </div>\r
              <div>\r
                <h3>Academic Session</h3>\r
                <p>Select the session for this report card</p>\r
              </div>\r
            </div>\r
          </div>\r
          <div class="field">\r
            <label for="sessionSelector">Session</label>\r
            <select id="sessionSelector" onchange="onSessionChange()">\r
              <option value="">— Select Session —</option>\r
            </select>\r
          </div>\r
          <div id="sessionLockBanner" class="banner banner-warn">\r
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>\r
            This session is locked. Report cards are view-only.\r
          </div>\r
          <div id="sessionActiveBanner" class="banner banner-ok">\r
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>\r
            Active session selected.\r
          </div>\r
        </div>\r
\r
        <!-- Student search -->\r
        <div class="panel">\r
          <div class="panel-header">\r
            <div class="panel-title">\r
              <div class="icon-box">\r
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>\r
              </div>\r
              <div>\r
                <h3>Student Search</h3>\r
                <p>Fetch a student by their ID</p>\r
              </div>\r
            </div>\r
          </div>\r
          <div class="form-row">\r
            <div class="field">\r
              <label for="studentId">Student ID</label>\r
              <input id="studentId" type="text" placeholder="Enter student ID" />\r
            </div>\r
            <div class="field">\r
              <label for="name">Student Name</label>\r
              <input id="name" type="text" placeholder="Auto-filled after fetch" readonly />\r
            </div>\r
            <div class="field">\r
              <label for="class">Class &amp; Section</label>\r
              <input id="class" type="text" placeholder="Auto-filled after fetch" readonly />\r
            </div>\r
          </div>\r
          <div class="toolbar" style="margin-top:16px;">\r
            <button class="btn btn-primary" onclick="fetchStudent()">\r
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>\r
              Fetch Student\r
            </button>\r
          </div>\r
        </div>\r
\r
        <!-- Global subjects -->\r
        <div class="panel" id="subjectsCard">\r
          <div class="panel-header">\r
            <div class="panel-title">\r
              <div class="icon-box">\r
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>\r
              </div>\r
              <div>\r
                <h3>Global Subjects (School Level)</h3>\r
                <p>Saved once, reusable for every student</p>\r
              </div>\r
            </div>\r
            <div class="stat-chips">\r
              <span class="chip"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg><span id="subjectCount">0 Subjects</span></span>\r
              <span class="chip"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20V10M18 20V4M6 20v-4"/></svg><span id="totalMarks">0 Marks</span></span>\r
              <span class="chip"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg><span id="avgMarks">-- %</span></span>\r
            </div>\r
          </div>\r
\r
          <div class="banner-info">\r
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>\r
            These subjects are saved at school level and can be used for any student.\r
          </div>\r
\r
          <div class="subject-head">\r
            <span>Subject</span><span>Obtained</span><span>Max Marks</span><span></span>\r
          </div>\r
          <div id="subjects"></div>\r
\r
          <div class="toolbar">\r
            <button class="btn btn-secondary" onclick="addSubject()">\r
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>\r
              Add Subject\r
            </button>\r
            <button class="btn btn-success" id="saveSubjectsBtn" onclick="saveSubjects()">\r
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>\r
              Save Global Subjects\r
            </button>\r
            <button class="btn btn-info" onclick="loadSubjects()">\r
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>\r
              Load Global Subjects\r
            </button>\r
            <button class="btn btn-danger" id="deleteSubjectsBtn" onclick="deleteAllGlobalSubjects()">\r
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>\r
              Delete All Global\r
            </button>\r
          </div>\r
          <div id="subjectsStatus" class="status-msg"></div>\r
        </div>\r
\r
        <!-- Report actions -->\r
        <div class="panel">\r
          <div class="panel-header">\r
            <div class="panel-title">\r
              <div class="icon-box">\r
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>\r
              </div>\r
              <div>\r
                <h3>Report Card</h3>\r
                <p>Generate, save, lock and print</p>\r
              </div>\r
            </div>\r
          </div>\r
          <div class="toolbar">\r
            <button class="btn btn-primary" onclick="generateReport()">\r
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>\r
              Generate Report\r
            </button>\r
            <button class="btn btn-success" id="saveReportBtn" onclick="saveReportCard()" disabled>\r
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>\r
              Save Report Card\r
            </button>\r
            <button class="btn btn-warning" id="lockReportBtn" onclick="lockReportCard()" disabled>\r
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>\r
              Lock Report Card\r
            </button>\r
            <button class="btn btn-secondary" onclick="printReport()">\r
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>\r
              Print Report\r
            </button>\r
            <button class="btn btn-danger" onclick="clearAll()">\r
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>\r
              Clear All\r
            </button>\r
          </div>\r
        </div>\r
\r
        <!-- Report output -->\r
        <div id="reportSection"></div>\r
      </div>\r
\r
      <!-- SIDEBAR -->\r
      <aside>\r
        <div class="panel">\r
          <div class="panel-header">\r
            <div class="panel-title">\r
              <div class="icon-box">\r
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>\r
              </div>\r
              <div>\r
                <h3>Quick Actions</h3>\r
                <p>Shortcuts</p>\r
              </div>\r
            </div>\r
          </div>\r
          <button class="btn btn-primary btn-block" onclick="viewGeneratedReports()">\r
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>\r
            View All Reports\r
          </button>\r
        </div>\r
\r
        <div class="panel">\r
          <div class="panel-header">\r
            <div class="panel-title">\r
              <div class="icon-box">\r
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7L12 16.9 5.7 21 8 14 2 9.4h7.6z"/></svg>\r
              </div>\r
              <div>\r
                <h3>Global Subjects</h3>\r
                <p>Why use them</p>\r
              </div>\r
            </div>\r
          </div>\r
          <div class="side-list">\r
            <div class="side-feature">\r
              <span class="tick"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>\r
              <p>Save once, use for all students</p>\r
            </div>\r
            <div class="side-feature">\r
              <span class="tick"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>\r
              <p>School-level subject list</p>\r
            </div>\r
            <div class="side-feature">\r
              <span class="tick"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>\r
              <p>Delete all global subjects anytime</p>\r
            </div>\r
            <div class="side-feature">\r
              <span class="tick"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>\r
              <p>Best for a standard curriculum</p>\r
            </div>\r
          </div>\r
        </div>\r
      </aside>\r
    </div>\r
  </div>\r
\r
  <script type="module">\r
    import { initializeApp } from "./firebase-compat.js";\r
    import { getFirestore, collection, getDocs, getDoc, doc, addDoc, updateDoc, deleteDoc, query, where, orderBy, serverTimestamp } from "./firebase-compat.js";\r
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
\r
    let currentUser = null;\r
    let currentStudent = null;\r
    let unsubscribeSubjects = null;\r
    let subjectsData = [];\r
    let subjectsSaved = false;\r
    let reportGenerated = false;\r
    let lastGeneratedReportData = null;\r
    let currentSession = "";\r
    let currentSessionId = "";\r
    let currentSessionLocked = false;\r
    let currentReportCardId = null;\r
\r
    onAuthStateChanged(auth, async (user) => {\r
      if (!user) {\r
        window.location.href = "#/index.html";\r
        return;\r
      }\r
      currentUser = user;\r
      await loadSessionDropdown();\r
      loadSubjects();\r
      updateStats();\r
    });\r
\r
    // ── SESSION MANAGEMENT ─────────────────────────────────────────────\r
    async function loadSessionDropdown() {\r
      const sel = document.getElementById("sessionSelector");\r
      if (!sel || !currentUser) return;\r
      sel.innerHTML = '<option value="">Loading sessions…</option>';\r
      try {\r
        const snap = await getDocs(collection(db, "schools", currentUser.uid, "sessions"));\r
        let activeId = null;\r
        try {\r
          const activeSnap = await getDoc(doc(db, "schools", currentUser.uid, "settings", "activeSession"));\r
          if (activeSnap.exists()) activeId = activeSnap.data().sessionId;\r
        } catch(e) {}\r
        let viewSessionId = "";\r
        try { viewSessionId = localStorage.getItem("schoolix.viewSessionId") || ""; } catch (_) {}\r
\r
        sel.innerHTML = '<option value="">— Select Session —</option>';\r
        let activeSession = null;\r
        let sessions = [];\r
        snap.forEach(d => {\r
          sessions.push({ id: d.id, ...d.data() });\r
        });\r
        sessions.sort((a, b) => (b.startYear || 0) - (a.startYear || 0));\r
        sessions.forEach(data => {\r
          const isViewing = data.id === (viewSessionId || activeId);\r
          const opt = document.createElement("option");\r
          opt.value = data.session;\r
          opt.dataset.id = data.id;\r
          opt.dataset.locked = data.locked ? "1" : "0";\r
          opt.textContent = data.session + (isViewing ? " (Viewing)" : "") + (data.id === activeId ? " (Active)" : "") + (data.locked ? " (Locked)" : "");\r
          if (isViewing) { opt.selected = true; activeSession = data; }\r
          sel.appendChild(opt);\r
        });\r
        if (snap.empty) {\r
          sel.innerHTML = '<option value="">No sessions — go to Additional Settings</option>';\r
        }\r
        if (activeSession) {\r
          currentSession = activeSession.session;\r
          currentSessionId = activeSession.id;\r
          currentSessionLocked = activeSession.locked;\r
          updateSessionBanner();\r
        }\r
      } catch(e) {\r
        console.error("Session load:", e);\r
      }\r
    }\r
\r
    window.onSessionChange = function() {\r
      const sel = document.getElementById("sessionSelector");\r
      const opt = sel.options[sel.selectedIndex];\r
      currentSession = sel.value;\r
      currentSessionId = opt?.dataset?.id || "";\r
      currentSessionLocked = opt && opt.dataset.locked === "1";\r
      updateSessionBanner();\r
      // Reset report when session changes\r
      currentStudent = null;\r
      lastGeneratedReportData = null;\r
      reportGenerated = false;\r
      currentReportCardId = null;\r
      document.getElementById("reportSection").innerHTML = "";\r
      document.getElementById("name").value = "";\r
      document.getElementById("class").value = "";\r
      document.getElementById("studentId").value = "";\r
      updateSaveReportButton();\r
      // Reset subject marks to 0 for new session\r
      document.querySelectorAll(".subject-row input[type=number]").forEach(inp => { if(inp.placeholder==="Obtained") inp.value = 0; });\r
    };\r
\r
    function updateSessionBanner() {\r
      const lockBanner = document.getElementById("sessionLockBanner");\r
      const activeBanner = document.getElementById("sessionActiveBanner");\r
      if (!lockBanner || !activeBanner) return;\r
      if (!currentSession) { lockBanner.style.display="none"; activeBanner.style.display="none"; return; }\r
      if (currentSessionLocked) {\r
        lockBanner.style.display="flex"; activeBanner.style.display="none";\r
        setSubjectInputsReadOnly(true);\r
      } else {\r
        lockBanner.style.display="none"; activeBanner.style.display="flex";\r
        setSubjectInputsReadOnly(false);\r
      }\r
      updateSaveReportButton();\r
    }\r
\r
    function setSubjectInputsReadOnly(readonly) {\r
      document.querySelectorAll(".subject-row input").forEach(inp => {\r
        inp.readOnly = readonly;\r
        inp.style.background = readonly ? "#f8f9fa" : "";\r
        inp.style.cursor = readonly ? "not-allowed" : "";\r
      });\r
      const addBtn = document.querySelector('button[onclick="addSubject()"]');\r
      const saveBtn = document.getElementById("saveSubjectsBtn");\r
      const delBtn = document.getElementById("deleteSubjectsBtn");\r
      if (addBtn) addBtn.disabled = readonly;\r
      if (saveBtn) saveBtn.disabled = readonly;\r
      if (delBtn) delBtn.disabled = readonly;\r
    }\r
\r
    window.viewGeneratedReports = () => {\r
      window.open(\`#/reports.html?uid=\${currentUser.uid}\`, '_blank');\r
    };\r
\r
    window.deleteAllGlobalSubjects = async () => {\r
      if (currentSessionLocked) return showStatus('subjectsStatus', "Selected session is locked. Subjects are view only.", 'error');\r
      if (!currentUser) return showStatus('subjectsStatus', "Please login first.", 'error');\r
\r
      if (!confirm('Delete all global subjects?\\nThis will remove subjects for all students.')) {\r
        return;\r
      }\r
\r
      const deleteBtn = document.getElementById('deleteSubjectsBtn');\r
      deleteBtn.disabled = true;\r
\r
      try {\r
        const snapshot = await getDocs(collection(db, "schools", currentUser.uid, "globalSubjects"));\r
        const deletePromises = snapshot.docs.map(d => deleteDoc(doc(db, "schools", currentUser.uid, "globalSubjects", d.id)));\r
        await Promise.all(deletePromises);\r
\r
        // Clear UI\r
        document.getElementById("subjects").innerHTML = "";\r
        subjectsData = [];\r
        subjectsSaved = false;\r
\r
        updateCardStatus();\r
        updateStats();\r
\r
        showStatus('subjectsStatus', 'All global subjects deleted successfully.', 'success');\r
\r
      } catch (error) {\r
        console.error("Delete error:", error);\r
        showStatus('subjectsStatus', "Failed to delete subjects.", 'error');\r
      } finally {\r
        deleteBtn.disabled = false;\r
      }\r
    };\r
\r
    window.saveSubjects = async () => {\r
      if (currentSessionLocked) return showStatus('subjectsStatus', "Selected session is locked. Subjects are view only.", 'error');\r
      if (!currentUser) return showStatus('subjectsStatus', "Please login first.", 'error');\r
\r
      const saveBtn = document.getElementById('saveSubjectsBtn');\r
      saveBtn.disabled = true;\r
\r
      try {\r
        // Get all valid subjects\r
        const rows = document.querySelectorAll(".subject-row");\r
        const validSubjects = [];\r
\r
        rows.forEach(r => {\r
          const name = r.children[0]?.value?.trim();\r
          const obtained = parseFloat(r.children[1]?.value) || 0;\r
          const maxMarks = parseFloat(r.children[2]?.value) || 100;\r
\r
          if (name) {\r
            validSubjects.push({\r
              name,\r
              obtained,\r
              maxMarks,\r
              timestamp: serverTimestamp(),\r
              userId: currentUser.uid,\r
              isGlobal: true });\r
          }\r
        });\r
\r
        if (validSubjects.length === 0) {\r
          saveBtn.disabled = false;\r
          return showStatus('subjectsStatus', "No valid subjects to save.", 'error');\r
        }\r
\r
        // Delete old global subjects first\r
        const oldSnapshot = await getDocs(collection(db, "schools", currentUser.uid, "globalSubjects"));\r
        const deletePromises = oldSnapshot.docs.map(d => deleteDoc(doc(db, "schools", currentUser.uid, "globalSubjects", d.id)));\r
        await Promise.all(deletePromises);\r
\r
        // Save new global subjects\r
        const savePromises = validSubjects.map(subject =>\r
          addDoc(collection(db, "schools", currentUser.uid, "globalSubjects"), subject)\r
        );\r
\r
        await Promise.all(savePromises);\r
\r
        subjectsSaved = true;\r
        updateCardStatus();\r
\r
        showStatus('subjectsStatus', \`\${validSubjects.length} global subjects saved.\`, 'success');\r
        updateStats();\r
\r
      } catch (error) {\r
        console.error("Save global subjects error:", error);\r
        showStatus('subjectsStatus', "Failed to save global subjects.", 'error');\r
      } finally {\r
        saveBtn.disabled = false;\r
      }\r
    };\r
\r
    function subjectRowHTML(name = "", obtained = "", maxMarks = 100) {\r
      const safe = (v) => String(v).replace(/"/g, "&quot;");\r
      return \`\r
        <input type="text" placeholder="Subject Name" value="\${safe(name)}" oninput="updateSubjectData(this)" />\r
        <input type="number" placeholder="Obtained" value="\${obtained === "" ? "" : safe(obtained)}" oninput="updateSubjectData(this); updateStats()" />\r
        <input type="number" placeholder="Max Marks" value="\${safe(maxMarks)}" oninput="updateSubjectData(this); updateStats()" />\r
        <button class="row-del" onclick="deleteSubject(this)" title="Remove">\r
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>\r
        </button>\`;\r
    }\r
\r
    window.loadSubjects = async () => {\r
      if (!currentUser) return showStatus('subjectsStatus', "Please login first.", 'error');\r
\r
      const container = document.getElementById("subjects");\r
      container.innerHTML = '<div class="loading"><span class="spinner"></span> Loading global subjects...</div>';\r
\r
      try {\r
        if (unsubscribeSubjects) {\r
          unsubscribeSubjects();\r
          unsubscribeSubjects = null;\r
        }\r
\r
        const snapshot = await getDocs(\r
          query(collection(db, "schools", currentUser.uid, "globalSubjects"), orderBy('timestamp', 'desc'))\r
        );\r
\r
        container.innerHTML = "";\r
        subjectsData = [];\r
\r
        if (snapshot.empty) {\r
          container.innerHTML = \`<div class="state-box">\r
            <div class="icon-circle"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg></div>\r
            <h4>No global subjects saved</h4>\r
            <p>Add and save subjects to continue.</p>\r
          </div>\`;\r
          subjectsSaved = false;\r
          updateCardStatus();\r
          updateStats();\r
          setSubjectInputsReadOnly(currentSessionLocked);\r
          return;\r
        }\r
\r
        let index = 0;\r
        snapshot.forEach((docSnap) => {\r
          const subject = docSnap.data();\r
          subjectsData[index] = subject;\r
\r
          const div = document.createElement("div");\r
          div.className = "subject-row";\r
          div.innerHTML = subjectRowHTML(subject.name ?? "", subject.obtained ?? 0, subject.maxMarks ?? 100);\r
          container.appendChild(div);\r
          index++;\r
        });\r
\r
        subjectsSaved = true;\r
        updateCardStatus();\r
        updateStats();\r
        setSubjectInputsReadOnly(currentSessionLocked);\r
        showStatus('subjectsStatus', \`Loaded \${snapshot.size} global subjects.\`, 'success');\r
\r
      } catch (error) {\r
        console.error("Load global error:", error);\r
        document.getElementById("subjects").innerHTML = \`<div class="state-box">\r
          <div class="icon-circle" style="background:#fef2f2;color:#dc2626"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg></div>\r
          <h4>Error loading global subjects</h4>\r
          <p>Try saving first.</p>\r
        </div>\`;\r
        showStatus('subjectsStatus', "Error loading global subjects.", 'error');\r
      }\r
    };\r
\r
    window.updateStats = () => {\r
      const rows = document.querySelectorAll(".subject-row");\r
      let count = 0, totalObtained = 0, totalMax = 0;\r
\r
      rows.forEach(r => {\r
        const name = r.children[0]?.value?.trim();\r
        const obtained = parseFloat(r.children[1]?.value) || 0;\r
        const maxMarks = parseFloat(r.children[2]?.value) || 100;\r
\r
        if (name) {\r
          count++;\r
          totalObtained += obtained;\r
          totalMax += maxMarks;\r
        }\r
      });\r
\r
      const avg = totalMax > 0 ? ((totalObtained / totalMax) * 100).toFixed(1) : 0;\r
\r
      document.getElementById("subjectCount").textContent = \`\${count} Subjects\`;\r
      document.getElementById("totalMarks").textContent = \`\${totalObtained}/\${totalMax}\`;\r
      document.getElementById("avgMarks").textContent = \`\${avg}%\`;\r
    };\r
\r
    window.addSubject = () => {\r
      if (currentSessionLocked) return showStatus('subjectsStatus', "Selected session is locked. Subjects are view only.", 'error');\r
      const div = document.createElement("div");\r
      div.className = "subject-row";\r
      div.innerHTML = subjectRowHTML("", "", 100);\r
      document.getElementById("subjects").appendChild(div);\r
      subjectsSaved = false;\r
      updateCardStatus();\r
      updateStats();\r
    };\r
\r
    window.deleteSubject = (btn) => {\r
      if (currentSessionLocked) return showStatus('subjectsStatus', "Selected session is locked. Subjects are view only.", 'error');\r
      btn.parentElement.remove();\r
      subjectsSaved = false;\r
      updateCardStatus();\r
      updateStats();\r
    };\r
\r
    window.updateSubjectData = (input) => {\r
      const row = input.closest('.subject-row');\r
      const index = Array.from(row.parentNode.children).indexOf(row);\r
\r
      if (index >= subjectsData.length) {\r
        subjectsData[index] = { name: '', obtained: 0, maxMarks: 100 };\r
      }\r
\r
      if (input === row.children[0]) subjectsData[index].name = input.value;\r
      if (input === row.children[1]) subjectsData[index].obtained = parseFloat(input.value) || 0;\r
      if (input === row.children[2]) subjectsData[index].maxMarks = parseFloat(input.value) || 100;\r
\r
      subjectsSaved = false;\r
      updateCardStatus();\r
    };\r
\r
    window.fetchStudent = async () => {\r
      const studentId = document.getElementById("studentId").value.trim();\r
      if (!studentId || !currentUser) return alert("Enter student ID and login first.");\r
\r
      try {\r
        document.getElementById("reportSection").innerHTML = '<div class="panel"><div class="loading"><span class="spinner"></span> Fetching student...</div></div>';\r
\r
        const q = query(collection(db, "schools", currentUser.uid, "students"), where("studentId", "==", studentId));\r
        const snap = await getDocs(q);\r
\r
        if (snap.empty) {\r
          alert("Student not found. Add student first.");\r
          document.getElementById("reportSection").innerHTML = "";\r
          return;\r
        }\r
\r
        snap.forEach(docSnap => {\r
          currentStudent = docSnap.data();\r
        });\r
\r
        document.getElementById("name").value = currentStudent.name || "N/A";\r
        document.getElementById("class").value = \`\${currentStudent.class || ""}-\${currentStudent.section || ""}\`.replace(/--/g, "-");\r
        document.getElementById("reportSection").innerHTML = "";\r
\r
        alert("Student fetched successfully.");\r
\r
      } catch (error) {\r
        console.error("Fetch error:", error);\r
        alert("Error fetching student.");\r
      }\r
    };\r
\r
    window.generateReport = () => {\r
      if (currentSessionLocked) return alert("Selected session is locked. Report cards are view only.");\r
      if (!currentStudent) return alert("Fetch student first.");\r
\r
      const rows = document.querySelectorAll(".subject-row");\r
      let htmlRows = "", totalObtained = 0, totalMax = 0;\r
\r
      rows.forEach(r => {\r
        const name = r.children[0]?.value?.trim();\r
        const obtained = parseFloat(r.children[1]?.value) || 0;\r
        const maxMarks = parseFloat(r.children[2]?.value) || 100;\r
\r
        if (name) {\r
          totalObtained += obtained;\r
          totalMax += maxMarks;\r
          const percent = maxMarks > 0 ? ((obtained / maxMarks) * 100) : 0;\r
          const remarks = percent >= 90 ? "Excellent" : percent >= 75 ? "Good" : percent >= 60 ? "Satisfactory" : "Needs Improvement";\r
          htmlRows += \`<tr><td>\${name}</td><td>\${obtained}</td><td>\${maxMarks}</td><td>\${percent.toFixed(1)}%</td><td>\${remarks}</td></tr>\`;\r
        }\r
      });\r
\r
      if (!htmlRows) return alert("Add global subjects with marks first.");\r
\r
      const percentage = ((totalObtained / totalMax) * 100).toFixed(2);\r
      const grade = percentage >= 90 ? "A+" : percentage >= 80 ? "A" : percentage >= 70 ? "B+" :\r
                    percentage >= 60 ? "B" : percentage >= 50 ? "C" : percentage >= 40 ? "D" : "F";\r
\r
      reportGenerated = true;\r
      updateSaveReportButton();\r
\r
      const academicYear = currentSession || \`\${new Date().getFullYear()}-\${new Date().getFullYear()+1}\`;\r
      const schoolName = window.SchoolBranding?.getSchoolName() || "Schoolix Public School";\r
      lastGeneratedReportData = {\r
        totalObtained,\r
        totalMax,\r
        percentage: Number(percentage),\r
        grade,\r
        subjects: Array.from(rows).map((r) => ({\r
          name: r.children[0]?.value?.trim(),\r
          obtained: parseFloat(r.children[1]?.value) || 0,\r
          maxMarks: parseFloat(r.children[2]?.value) || 100\r
        })).filter((s) => s.name)\r
      };\r
\r
      document.getElementById("reportSection").innerHTML = \`\r
        <div class="report">\r
          <div class="r-head">\r
            <div class="r-brand">Academic Report Card</div>\r
            <h2>\${schoolName}</h2>\r
            <div class="r-sub">Report Card</div>\r
            <div class="r-year">Academic Year: \${academicYear}</div>\r
          </div>\r
\r
          <div class="r-meta">\r
            <div><strong>Name:</strong> <span>\${currentStudent.name || "N/A"}</span></div>\r
            <div><strong>Student ID:</strong> <span>\${currentStudent.studentId || "N/A"}</span></div>\r
            <div><strong>Class:</strong> <span>\${currentStudent.class || "N/A"}-\${currentStudent.section || ""}</span></div>\r
            <div><strong>Roll No:</strong> <span>\${currentStudent.roll || "N/A"}</span></div>\r
          </div>\r
\r
          <table>\r
            <thead>\r
              <tr><th>Subject</th><th>Obtained</th><th>Maximum</th><th>Percentage</th><th>Remarks</th></tr>\r
            </thead>\r
            <tbody>\${htmlRows}</tbody>\r
          </table>\r
\r
          <div class="r-stats">\r
            <div class="r-stat"><b>\${totalObtained.toFixed(0)}</b><small>Total Obtained</small></div>\r
            <div class="r-stat"><b>\${totalMax}</b><small>Total Maximum</small></div>\r
            <div class="r-stat"><b>\${percentage}%</b><small>Percentage</small></div>\r
            <div class="r-stat"><b>\${grade}</b><small>Final Grade</small></div>\r
          </div>\r
\r
          <div class="r-sign">\r
            <div>Class Teacher Signature</div>\r
            <div>Parent/Guardian Signature</div>\r
            <div>Principal Signature</div>\r
          </div>\r
\r
          <div class="r-foot">\r
            Generated on: \${new Date().toLocaleDateString()} &nbsp;|&nbsp; Prepared by: \${currentUser.email}\r
          </div>\r
        </div>\r
      \`;\r
    };\r
\r
    window.saveReportCard = async () => {\r
      if (currentSessionLocked) return alert("Selected session is locked. Report cards are view only.");\r
      if (!reportGenerated || !document.querySelector(".report")) {\r
        return alert("Generate report first.");\r
      }\r
\r
      if (!currentStudent || !lastGeneratedReportData) return alert("Fetch student first.");\r
\r
      const saveBtn = document.getElementById('saveReportBtn');\r
      saveBtn.disabled = true;\r
\r
      try {\r
        const reportHtml = document.querySelector(".report").outerHTML;\r
\r
        const reportData = {\r
          student: currentStudent,\r
          subjects: lastGeneratedReportData.subjects.map((s) => ({ ...s, isGlobal: true })),\r
          totalObtained: lastGeneratedReportData.totalObtained,\r
          totalMax: lastGeneratedReportData.totalMax,\r
          percentage: lastGeneratedReportData.percentage,\r
          grade: lastGeneratedReportData.grade,\r
          reportHtml,\r
          createdAt: serverTimestamp(),\r
          createdBy: currentUser.uid,\r
          studentId: currentStudent.studentId,\r
          usedGlobalSubjects: true,\r
          sessionId: currentSessionId || "",\r
          session: currentSession || "N/A",\r
          locked: false\r
        };\r
\r
        const docRef = await addDoc(collection(db, "schools", currentUser.uid, "reportCards"), reportData);\r
        currentReportCardId = docRef.id;\r
\r
        alert("Report card saved successfully. Check View All Reports.");\r
        document.getElementById("lockReportBtn").disabled = false;\r
\r
      } catch (error) {\r
        console.error("Save report error:", error);\r
        alert("Failed to save report card.");\r
      } finally {\r
        setTimeout(() => {\r
          updateSaveReportButton();\r
        }, 2000);\r
      }\r
    };\r
\r
    window.lockReportCard = async () => {\r
      if (currentSessionLocked) return alert("Selected session is locked. Report cards are already view only.");\r
      if (!currentReportCardId) return alert("Save the report card first.");\r
      if (!confirm("Lock this report card? Marks cannot be changed after locking.")) return;\r
      try {\r
        await updateDoc(doc(db, "schools", currentUser.uid, "reportCards", currentReportCardId), { locked: true });\r
        alert("Report card locked successfully.");\r
        const lockBtn = document.getElementById("lockReportBtn");\r
        lockBtn.disabled = true;\r
        lockBtn.textContent = "Locked";\r
        // disable editing\r
        document.querySelectorAll(".subject-row input[type=number]").forEach(inp => {\r
          inp.readOnly = true; inp.style.background="#f8f9fa"; inp.style.cursor="not-allowed";\r
        });\r
        document.getElementById("saveReportBtn").disabled = true;\r
      } catch(e) {\r
        console.error("Lock failed:", e);\r
        alert("Failed to lock report card.");\r
      }\r
    };\r
\r
    window.printReport = () => {\r
      const report = document.querySelector(".report");\r
      if (!report) return alert("Generate report first.");\r
\r
      const printWin = window.open('', '_blank');\r
      printWin.document.write(\`\r
        <html><head>\r
<title>Report Card</title>\r
        <style>\r
          body{font-family:'Inter',Arial,sans-serif;margin:24px;color:#0f172a;}\r
          .report{border:1px solid #d1d5db;border-radius:12px;padding:36px;}\r
          .r-head{text-align:center;border-bottom:2px solid #000;padding-bottom:14px;margin-bottom:20px;}\r
          .r-brand{text-transform:uppercase;letter-spacing:.16em;color:#1d4ed8;font-weight:700;font-size:11px;}\r
          .r-head h2{font-size:1.8rem;margin:4px 0;}\r
          .r-sub{color:#64748b;font-weight:600;}\r
          .r-year{color:#94a3b8;font-size:12px;}\r
          .r-meta{display:grid;grid-template-columns:1fr 1fr;gap:8px 24px;margin-bottom:18px;}\r
          .r-meta div{padding:8px 10px;background:#f8fafc;border:1px solid #e5e7eb;border-radius:8px;font-size:13px;}\r
          table{width:100%;border-collapse:collapse;margin:6px 0 18px;}\r
          th,td{border:1px solid #d1d5db;padding:9px 10px;text-align:center;font-size:13px;}\r
          td:first-child{text-align:left;}\r
          th{background:#1d4ed8;color:#fff;}\r
          .r-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:22px;}\r
          .r-stat{border:1px solid #e5e7eb;border-radius:10px;padding:12px;text-align:center;background:#f8fafc;}\r
          .r-stat b{display:block;font-size:1.4rem;color:#1d4ed8;}\r
          .r-stat small{color:#64748b;font-size:11px;text-transform:uppercase;}\r
          .r-sign{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:44px;}\r
          .r-sign div{text-align:center;border-top:1.5px solid #000;padding-top:8px;font-size:12px;}\r
          .r-foot{margin-top:24px;padding-top:12px;border-top:1px dashed #d1d5db;text-align:center;color:#94a3b8;font-size:11px;}\r
          @media print{body{margin:0;}.report{box-shadow:none;border:none;}}\r
        </style>\r
</head><body>\${report.outerHTML}`,styles:[{tag:"style",attributes:{id:"sxCriticalLoaderStyle"},text:`\r
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
    import { getFirestore, collection, getDocs, getDoc, doc, addDoc, updateDoc, deleteDoc, query, where, orderBy, serverTimestamp } from "./firebase-compat.js";\r
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
\r
    let currentUser = null;\r
    let currentStudent = null;\r
    let unsubscribeSubjects = null;\r
    let subjectsData = [];\r
    let subjectsSaved = false;\r
    let reportGenerated = false;\r
    let lastGeneratedReportData = null;\r
    let currentSession = "";\r
    let currentSessionId = "";\r
    let currentSessionLocked = false;\r
    let currentReportCardId = null;\r
\r
    onAuthStateChanged(auth, async (user) => {\r
      if (!user) {\r
        window.location.href = "#/index.html";\r
        return;\r
      }\r
      currentUser = user;\r
      await loadSessionDropdown();\r
      loadSubjects();\r
      updateStats();\r
    });\r
\r
    // ── SESSION MANAGEMENT ─────────────────────────────────────────────\r
    async function loadSessionDropdown() {\r
      const sel = document.getElementById("sessionSelector");\r
      if (!sel || !currentUser) return;\r
      sel.innerHTML = '<option value="">Loading sessions…</option>';\r
      try {\r
        const snap = await getDocs(collection(db, "schools", currentUser.uid, "sessions"));\r
        let activeId = null;\r
        try {\r
          const activeSnap = await getDoc(doc(db, "schools", currentUser.uid, "settings", "activeSession"));\r
          if (activeSnap.exists()) activeId = activeSnap.data().sessionId;\r
        } catch(e) {}\r
        let viewSessionId = "";\r
        try { viewSessionId = localStorage.getItem("schoolix.viewSessionId") || ""; } catch (_) {}\r
\r
        sel.innerHTML = '<option value="">— Select Session —</option>';\r
        let activeSession = null;\r
        let sessions = [];\r
        snap.forEach(d => {\r
          sessions.push({ id: d.id, ...d.data() });\r
        });\r
        sessions.sort((a, b) => (b.startYear || 0) - (a.startYear || 0));\r
        sessions.forEach(data => {\r
          const isViewing = data.id === (viewSessionId || activeId);\r
          const opt = document.createElement("option");\r
          opt.value = data.session;\r
          opt.dataset.id = data.id;\r
          opt.dataset.locked = data.locked ? "1" : "0";\r
          opt.textContent = data.session + (isViewing ? " (Viewing)" : "") + (data.id === activeId ? " (Active)" : "") + (data.locked ? " (Locked)" : "");\r
          if (isViewing) { opt.selected = true; activeSession = data; }\r
          sel.appendChild(opt);\r
        });\r
        if (snap.empty) {\r
          sel.innerHTML = '<option value="">No sessions — go to Additional Settings</option>';\r
        }\r
        if (activeSession) {\r
          currentSession = activeSession.session;\r
          currentSessionId = activeSession.id;\r
          currentSessionLocked = activeSession.locked;\r
          updateSessionBanner();\r
        }\r
      } catch(e) {\r
        console.error("Session load:", e);\r
      }\r
    }\r
\r
    window.onSessionChange = function() {\r
      const sel = document.getElementById("sessionSelector");\r
      const opt = sel.options[sel.selectedIndex];\r
      currentSession = sel.value;\r
      currentSessionId = opt?.dataset?.id || "";\r
      currentSessionLocked = opt && opt.dataset.locked === "1";\r
      updateSessionBanner();\r
      // Reset report when session changes\r
      currentStudent = null;\r
      lastGeneratedReportData = null;\r
      reportGenerated = false;\r
      currentReportCardId = null;\r
      document.getElementById("reportSection").innerHTML = "";\r
      document.getElementById("name").value = "";\r
      document.getElementById("class").value = "";\r
      document.getElementById("studentId").value = "";\r
      updateSaveReportButton();\r
      // Reset subject marks to 0 for new session\r
      document.querySelectorAll(".subject-row input[type=number]").forEach(inp => { if(inp.placeholder==="Obtained") inp.value = 0; });\r
    };\r
\r
    function updateSessionBanner() {\r
      const lockBanner = document.getElementById("sessionLockBanner");\r
      const activeBanner = document.getElementById("sessionActiveBanner");\r
      if (!lockBanner || !activeBanner) return;\r
      if (!currentSession) { lockBanner.style.display="none"; activeBanner.style.display="none"; return; }\r
      if (currentSessionLocked) {\r
        lockBanner.style.display="flex"; activeBanner.style.display="none";\r
        setSubjectInputsReadOnly(true);\r
      } else {\r
        lockBanner.style.display="none"; activeBanner.style.display="flex";\r
        setSubjectInputsReadOnly(false);\r
      }\r
      updateSaveReportButton();\r
    }\r
\r
    function setSubjectInputsReadOnly(readonly) {\r
      document.querySelectorAll(".subject-row input").forEach(inp => {\r
        inp.readOnly = readonly;\r
        inp.style.background = readonly ? "#f8f9fa" : "";\r
        inp.style.cursor = readonly ? "not-allowed" : "";\r
      });\r
      const addBtn = document.querySelector('button[onclick="addSubject()"]');\r
      const saveBtn = document.getElementById("saveSubjectsBtn");\r
      const delBtn = document.getElementById("deleteSubjectsBtn");\r
      if (addBtn) addBtn.disabled = readonly;\r
      if (saveBtn) saveBtn.disabled = readonly;\r
      if (delBtn) delBtn.disabled = readonly;\r
    }\r
\r
    window.viewGeneratedReports = () => {\r
      window.open(\`#/reports.html?uid=\${currentUser.uid}\`, '_blank');\r
    };\r
\r
    window.deleteAllGlobalSubjects = async () => {\r
      if (currentSessionLocked) return showStatus('subjectsStatus', "Selected session is locked. Subjects are view only.", 'error');\r
      if (!currentUser) return showStatus('subjectsStatus', "Please login first.", 'error');\r
\r
      if (!confirm('Delete all global subjects?\\nThis will remove subjects for all students.')) {\r
        return;\r
      }\r
\r
      const deleteBtn = document.getElementById('deleteSubjectsBtn');\r
      deleteBtn.disabled = true;\r
\r
      try {\r
        const snapshot = await getDocs(collection(db, "schools", currentUser.uid, "globalSubjects"));\r
        const deletePromises = snapshot.docs.map(d => deleteDoc(doc(db, "schools", currentUser.uid, "globalSubjects", d.id)));\r
        await Promise.all(deletePromises);\r
\r
        // Clear UI\r
        document.getElementById("subjects").innerHTML = "";\r
        subjectsData = [];\r
        subjectsSaved = false;\r
\r
        updateCardStatus();\r
        updateStats();\r
\r
        showStatus('subjectsStatus', 'All global subjects deleted successfully.', 'success');\r
\r
      } catch (error) {\r
        console.error("Delete error:", error);\r
        showStatus('subjectsStatus', "Failed to delete subjects.", 'error');\r
      } finally {\r
        deleteBtn.disabled = false;\r
      }\r
    };\r
\r
    window.saveSubjects = async () => {\r
      if (currentSessionLocked) return showStatus('subjectsStatus', "Selected session is locked. Subjects are view only.", 'error');\r
      if (!currentUser) return showStatus('subjectsStatus', "Please login first.", 'error');\r
\r
      const saveBtn = document.getElementById('saveSubjectsBtn');\r
      saveBtn.disabled = true;\r
\r
      try {\r
        // Get all valid subjects\r
        const rows = document.querySelectorAll(".subject-row");\r
        const validSubjects = [];\r
\r
        rows.forEach(r => {\r
          const name = r.children[0]?.value?.trim();\r
          const obtained = parseFloat(r.children[1]?.value) || 0;\r
          const maxMarks = parseFloat(r.children[2]?.value) || 100;\r
\r
          if (name) {\r
            validSubjects.push({\r
              name,\r
              obtained,\r
              maxMarks,\r
              timestamp: serverTimestamp(),\r
              userId: currentUser.uid,\r
              isGlobal: true });\r
          }\r
        });\r
\r
        if (validSubjects.length === 0) {\r
          saveBtn.disabled = false;\r
          return showStatus('subjectsStatus', "No valid subjects to save.", 'error');\r
        }\r
\r
        // Delete old global subjects first\r
        const oldSnapshot = await getDocs(collection(db, "schools", currentUser.uid, "globalSubjects"));\r
        const deletePromises = oldSnapshot.docs.map(d => deleteDoc(doc(db, "schools", currentUser.uid, "globalSubjects", d.id)));\r
        await Promise.all(deletePromises);\r
\r
        // Save new global subjects\r
        const savePromises = validSubjects.map(subject =>\r
          addDoc(collection(db, "schools", currentUser.uid, "globalSubjects"), subject)\r
        );\r
\r
        await Promise.all(savePromises);\r
\r
        subjectsSaved = true;\r
        updateCardStatus();\r
\r
        showStatus('subjectsStatus', \`\${validSubjects.length} global subjects saved.\`, 'success');\r
        updateStats();\r
\r
      } catch (error) {\r
        console.error("Save global subjects error:", error);\r
        showStatus('subjectsStatus', "Failed to save global subjects.", 'error');\r
      } finally {\r
        saveBtn.disabled = false;\r
      }\r
    };\r
\r
    function subjectRowHTML(name = "", obtained = "", maxMarks = 100) {\r
      const safe = (v) => String(v).replace(/"/g, "&quot;");\r
      return \`\r
        <input type="text" placeholder="Subject Name" value="\${safe(name)}" oninput="updateSubjectData(this)" />\r
        <input type="number" placeholder="Obtained" value="\${obtained === "" ? "" : safe(obtained)}" oninput="updateSubjectData(this); updateStats()" />\r
        <input type="number" placeholder="Max Marks" value="\${safe(maxMarks)}" oninput="updateSubjectData(this); updateStats()" />\r
        <button class="row-del" onclick="deleteSubject(this)" title="Remove">\r
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>\r
        </button>\`;\r
    }\r
\r
    window.loadSubjects = async () => {\r
      if (!currentUser) return showStatus('subjectsStatus', "Please login first.", 'error');\r
\r
      const container = document.getElementById("subjects");\r
      container.innerHTML = '<div class="loading"><span class="spinner"></span> Loading global subjects...</div>';\r
\r
      try {\r
        if (unsubscribeSubjects) {\r
          unsubscribeSubjects();\r
          unsubscribeSubjects = null;\r
        }\r
\r
        const snapshot = await getDocs(\r
          query(collection(db, "schools", currentUser.uid, "globalSubjects"), orderBy('timestamp', 'desc'))\r
        );\r
\r
        container.innerHTML = "";\r
        subjectsData = [];\r
\r
        if (snapshot.empty) {\r
          container.innerHTML = \`<div class="state-box">\r
            <div class="icon-circle"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg></div>\r
            <h4>No global subjects saved</h4>\r
            <p>Add and save subjects to continue.</p>\r
          </div>\`;\r
          subjectsSaved = false;\r
          updateCardStatus();\r
          updateStats();\r
          setSubjectInputsReadOnly(currentSessionLocked);\r
          return;\r
        }\r
\r
        let index = 0;\r
        snapshot.forEach((docSnap) => {\r
          const subject = docSnap.data();\r
          subjectsData[index] = subject;\r
\r
          const div = document.createElement("div");\r
          div.className = "subject-row";\r
          div.innerHTML = subjectRowHTML(subject.name ?? "", subject.obtained ?? 0, subject.maxMarks ?? 100);\r
          container.appendChild(div);\r
          index++;\r
        });\r
\r
        subjectsSaved = true;\r
        updateCardStatus();\r
        updateStats();\r
        setSubjectInputsReadOnly(currentSessionLocked);\r
        showStatus('subjectsStatus', \`Loaded \${snapshot.size} global subjects.\`, 'success');\r
\r
      } catch (error) {\r
        console.error("Load global error:", error);\r
        document.getElementById("subjects").innerHTML = \`<div class="state-box">\r
          <div class="icon-circle" style="background:#fef2f2;color:#dc2626"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg></div>\r
          <h4>Error loading global subjects</h4>\r
          <p>Try saving first.</p>\r
        </div>\`;\r
        showStatus('subjectsStatus', "Error loading global subjects.", 'error');\r
      }\r
    };\r
\r
    window.updateStats = () => {\r
      const rows = document.querySelectorAll(".subject-row");\r
      let count = 0, totalObtained = 0, totalMax = 0;\r
\r
      rows.forEach(r => {\r
        const name = r.children[0]?.value?.trim();\r
        const obtained = parseFloat(r.children[1]?.value) || 0;\r
        const maxMarks = parseFloat(r.children[2]?.value) || 100;\r
\r
        if (name) {\r
          count++;\r
          totalObtained += obtained;\r
          totalMax += maxMarks;\r
        }\r
      });\r
\r
      const avg = totalMax > 0 ? ((totalObtained / totalMax) * 100).toFixed(1) : 0;\r
\r
      document.getElementById("subjectCount").textContent = \`\${count} Subjects\`;\r
      document.getElementById("totalMarks").textContent = \`\${totalObtained}/\${totalMax}\`;\r
      document.getElementById("avgMarks").textContent = \`\${avg}%\`;\r
    };\r
\r
    window.addSubject = () => {\r
      if (currentSessionLocked) return showStatus('subjectsStatus', "Selected session is locked. Subjects are view only.", 'error');\r
      const div = document.createElement("div");\r
      div.className = "subject-row";\r
      div.innerHTML = subjectRowHTML("", "", 100);\r
      document.getElementById("subjects").appendChild(div);\r
      subjectsSaved = false;\r
      updateCardStatus();\r
      updateStats();\r
    };\r
\r
    window.deleteSubject = (btn) => {\r
      if (currentSessionLocked) return showStatus('subjectsStatus', "Selected session is locked. Subjects are view only.", 'error');\r
      btn.parentElement.remove();\r
      subjectsSaved = false;\r
      updateCardStatus();\r
      updateStats();\r
    };\r
\r
    window.updateSubjectData = (input) => {\r
      const row = input.closest('.subject-row');\r
      const index = Array.from(row.parentNode.children).indexOf(row);\r
\r
      if (index >= subjectsData.length) {\r
        subjectsData[index] = { name: '', obtained: 0, maxMarks: 100 };\r
      }\r
\r
      if (input === row.children[0]) subjectsData[index].name = input.value;\r
      if (input === row.children[1]) subjectsData[index].obtained = parseFloat(input.value) || 0;\r
      if (input === row.children[2]) subjectsData[index].maxMarks = parseFloat(input.value) || 100;\r
\r
      subjectsSaved = false;\r
      updateCardStatus();\r
    };\r
\r
    window.fetchStudent = async () => {\r
      const studentId = document.getElementById("studentId").value.trim();\r
      if (!studentId || !currentUser) return alert("Enter student ID and login first.");\r
\r
      try {\r
        document.getElementById("reportSection").innerHTML = '<div class="panel"><div class="loading"><span class="spinner"></span> Fetching student...</div></div>';\r
\r
        const q = query(collection(db, "schools", currentUser.uid, "students"), where("studentId", "==", studentId));\r
        const snap = await getDocs(q);\r
\r
        if (snap.empty) {\r
          alert("Student not found. Add student first.");\r
          document.getElementById("reportSection").innerHTML = "";\r
          return;\r
        }\r
\r
        snap.forEach(docSnap => {\r
          currentStudent = docSnap.data();\r
        });\r
\r
        document.getElementById("name").value = currentStudent.name || "N/A";\r
        document.getElementById("class").value = \`\${currentStudent.class || ""}-\${currentStudent.section || ""}\`.replace(/--/g, "-");\r
        document.getElementById("reportSection").innerHTML = "";\r
\r
        alert("Student fetched successfully.");\r
\r
      } catch (error) {\r
        console.error("Fetch error:", error);\r
        alert("Error fetching student.");\r
      }\r
    };\r
\r
    window.generateReport = () => {\r
      if (currentSessionLocked) return alert("Selected session is locked. Report cards are view only.");\r
      if (!currentStudent) return alert("Fetch student first.");\r
\r
      const rows = document.querySelectorAll(".subject-row");\r
      let htmlRows = "", totalObtained = 0, totalMax = 0;\r
\r
      rows.forEach(r => {\r
        const name = r.children[0]?.value?.trim();\r
        const obtained = parseFloat(r.children[1]?.value) || 0;\r
        const maxMarks = parseFloat(r.children[2]?.value) || 100;\r
\r
        if (name) {\r
          totalObtained += obtained;\r
          totalMax += maxMarks;\r
          const percent = maxMarks > 0 ? ((obtained / maxMarks) * 100) : 0;\r
          const remarks = percent >= 90 ? "Excellent" : percent >= 75 ? "Good" : percent >= 60 ? "Satisfactory" : "Needs Improvement";\r
          htmlRows += \`<tr><td>\${name}</td><td>\${obtained}</td><td>\${maxMarks}</td><td>\${percent.toFixed(1)}%</td><td>\${remarks}</td></tr>\`;\r
        }\r
      });\r
\r
      if (!htmlRows) return alert("Add global subjects with marks first.");\r
\r
      const percentage = ((totalObtained / totalMax) * 100).toFixed(2);\r
      const grade = percentage >= 90 ? "A+" : percentage >= 80 ? "A" : percentage >= 70 ? "B+" :\r
                    percentage >= 60 ? "B" : percentage >= 50 ? "C" : percentage >= 40 ? "D" : "F";\r
\r
      reportGenerated = true;\r
      updateSaveReportButton();\r
\r
      const academicYear = currentSession || \`\${new Date().getFullYear()}-\${new Date().getFullYear()+1}\`;\r
      const schoolName = window.SchoolBranding?.getSchoolName() || "Schoolix Public School";\r
      lastGeneratedReportData = {\r
        totalObtained,\r
        totalMax,\r
        percentage: Number(percentage),\r
        grade,\r
        subjects: Array.from(rows).map((r) => ({\r
          name: r.children[0]?.value?.trim(),\r
          obtained: parseFloat(r.children[1]?.value) || 0,\r
          maxMarks: parseFloat(r.children[2]?.value) || 100\r
        })).filter((s) => s.name)\r
      };\r
\r
      document.getElementById("reportSection").innerHTML = \`\r
        <div class="report">\r
          <div class="r-head">\r
            <div class="r-brand">Academic Report Card</div>\r
            <h2>\${schoolName}</h2>\r
            <div class="r-sub">Report Card</div>\r
            <div class="r-year">Academic Year: \${academicYear}</div>\r
          </div>\r
\r
          <div class="r-meta">\r
            <div><strong>Name:</strong> <span>\${currentStudent.name || "N/A"}</span></div>\r
            <div><strong>Student ID:</strong> <span>\${currentStudent.studentId || "N/A"}</span></div>\r
            <div><strong>Class:</strong> <span>\${currentStudent.class || "N/A"}-\${currentStudent.section || ""}</span></div>\r
            <div><strong>Roll No:</strong> <span>\${currentStudent.roll || "N/A"}</span></div>\r
          </div>\r
\r
          <table>\r
            <thead>\r
              <tr><th>Subject</th><th>Obtained</th><th>Maximum</th><th>Percentage</th><th>Remarks</th></tr>\r
            </thead>\r
            <tbody>\${htmlRows}</tbody>\r
          </table>\r
\r
          <div class="r-stats">\r
            <div class="r-stat"><b>\${totalObtained.toFixed(0)}</b><small>Total Obtained</small></div>\r
            <div class="r-stat"><b>\${totalMax}</b><small>Total Maximum</small></div>\r
            <div class="r-stat"><b>\${percentage}%</b><small>Percentage</small></div>\r
            <div class="r-stat"><b>\${grade}</b><small>Final Grade</small></div>\r
          </div>\r
\r
          <div class="r-sign">\r
            <div>Class Teacher Signature</div>\r
            <div>Parent/Guardian Signature</div>\r
            <div>Principal Signature</div>\r
          </div>\r
\r
          <div class="r-foot">\r
            Generated on: \${new Date().toLocaleDateString()} &nbsp;|&nbsp; Prepared by: \${currentUser.email}\r
          </div>\r
        </div>\r
      \`;\r
    };\r
\r
    window.saveReportCard = async () => {\r
      if (currentSessionLocked) return alert("Selected session is locked. Report cards are view only.");\r
      if (!reportGenerated || !document.querySelector(".report")) {\r
        return alert("Generate report first.");\r
      }\r
\r
      if (!currentStudent || !lastGeneratedReportData) return alert("Fetch student first.");\r
\r
      const saveBtn = document.getElementById('saveReportBtn');\r
      saveBtn.disabled = true;\r
\r
      try {\r
        const reportHtml = document.querySelector(".report").outerHTML;\r
\r
        const reportData = {\r
          student: currentStudent,\r
          subjects: lastGeneratedReportData.subjects.map((s) => ({ ...s, isGlobal: true })),\r
          totalObtained: lastGeneratedReportData.totalObtained,\r
          totalMax: lastGeneratedReportData.totalMax,\r
          percentage: lastGeneratedReportData.percentage,\r
          grade: lastGeneratedReportData.grade,\r
          reportHtml,\r
          createdAt: serverTimestamp(),\r
          createdBy: currentUser.uid,\r
          studentId: currentStudent.studentId,\r
          usedGlobalSubjects: true,\r
          sessionId: currentSessionId || "",\r
          session: currentSession || "N/A",\r
          locked: false\r
        };\r
\r
        const docRef = await addDoc(collection(db, "schools", currentUser.uid, "reportCards"), reportData);\r
        currentReportCardId = docRef.id;\r
\r
        alert("Report card saved successfully. Check View All Reports.");\r
        document.getElementById("lockReportBtn").disabled = false;\r
\r
      } catch (error) {\r
        console.error("Save report error:", error);\r
        alert("Failed to save report card.");\r
      } finally {\r
        setTimeout(() => {\r
          updateSaveReportButton();\r
        }, 2000);\r
      }\r
    };\r
\r
    window.lockReportCard = async () => {\r
      if (currentSessionLocked) return alert("Selected session is locked. Report cards are already view only.");\r
      if (!currentReportCardId) return alert("Save the report card first.");\r
      if (!confirm("Lock this report card? Marks cannot be changed after locking.")) return;\r
      try {\r
        await updateDoc(doc(db, "schools", currentUser.uid, "reportCards", currentReportCardId), { locked: true });\r
        alert("Report card locked successfully.");\r
        const lockBtn = document.getElementById("lockReportBtn");\r
        lockBtn.disabled = true;\r
        lockBtn.textContent = "Locked";\r
        // disable editing\r
        document.querySelectorAll(".subject-row input[type=number]").forEach(inp => {\r
          inp.readOnly = true; inp.style.background="#f8f9fa"; inp.style.cursor="not-allowed";\r
        });\r
        document.getElementById("saveReportBtn").disabled = true;\r
      } catch(e) {\r
        console.error("Lock failed:", e);\r
        alert("Failed to lock report card.");\r
      }\r
    };\r
\r
    window.printReport = () => {\r
      const report = document.querySelector(".report");\r
      if (!report) return alert("Generate report first.");\r
\r
      const printWin = window.open('', '_blank');\r
      printWin.document.write(\`\r
        <html><head>\r
<title>Report Card</title>\r
        <style>\r
          body{font-family:'Inter',Arial,sans-serif;margin:24px;color:#0f172a;}\r
          .report{border:1px solid #d1d5db;border-radius:12px;padding:36px;}\r
          .r-head{text-align:center;border-bottom:2px solid #000;padding-bottom:14px;margin-bottom:20px;}\r
          .r-brand{text-transform:uppercase;letter-spacing:.16em;color:#1d4ed8;font-weight:700;font-size:11px;}\r
          .r-head h2{font-size:1.8rem;margin:4px 0;}\r
          .r-sub{color:#64748b;font-weight:600;}\r
          .r-year{color:#94a3b8;font-size:12px;}\r
          .r-meta{display:grid;grid-template-columns:1fr 1fr;gap:8px 24px;margin-bottom:18px;}\r
          .r-meta div{padding:8px 10px;background:#f8fafc;border:1px solid #e5e7eb;border-radius:8px;font-size:13px;}\r
          table{width:100%;border-collapse:collapse;margin:6px 0 18px;}\r
          th,td{border:1px solid #d1d5db;padding:9px 10px;text-align:center;font-size:13px;}\r
          td:first-child{text-align:left;}\r
          th{background:#1d4ed8;color:#fff;}\r
          .r-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:22px;}\r
          .r-stat{border:1px solid #e5e7eb;border-radius:10px;padding:12px;text-align:center;background:#f8fafc;}\r
          .r-stat b{display:block;font-size:1.4rem;color:#1d4ed8;}\r
          .r-stat small{color:#64748b;font-size:11px;text-transform:uppercase;}\r
          .r-sign{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:44px;}\r
          .r-sign div{text-align:center;border-top:1.5px solid #000;padding-top:8px;font-size:12px;}\r
          .r-foot{margin-top:24px;padding-top:12px;border-top:1px dashed #d1d5db;text-align:center;color:#94a3b8;font-size:11px;}\r
          @media print{body{margin:0;}.report{box-shadow:none;border:none;}}\r
        </style>\r
</head><body>\${report.outerHTML}</body></html>\r
      \`);\r
      printWin.document.close();\r
      printWin.focus();\r
      setTimeout(() => printWin.print(), 300);\r
    };\r
\r
    window.clearAll = () => {\r
      if(confirm("Clear everything? Global subjects will remain saved.")) {\r
        document.getElementById("studentId").value = "";\r
        document.getElementById("name").value = "";\r
        document.getElementById("class").value = "";\r
        document.getElementById("reportSection").innerHTML = "";\r
        currentStudent = null;\r
        reportGenerated = false;\r
        lastGeneratedReportData = null;\r
        updateSaveReportButton();\r
      }\r
    };\r
\r
    window.updateCardStatus = () => {\r
      // status now reflected via stats chips; kept for compatibility\r
    };\r
\r
    window.updateSaveReportButton = () => {\r
      const saveReportBtn = document.getElementById('saveReportBtn');\r
      const lockBtn = document.getElementById('lockReportBtn');\r
      const printBtn = document.querySelector('button[onclick="printReport()"]');\r
      const canEdit = reportGenerated && currentStudent && !currentSessionLocked;\r
      if (saveReportBtn) saveReportBtn.disabled = !canEdit;\r
      if (lockBtn) lockBtn.disabled = !currentReportCardId || currentSessionLocked;\r
      if (printBtn) printBtn.disabled = !(reportGenerated && currentStudent);\r
    };\r
\r
    window.showStatus = (elementId, message, type) => {\r
      const statusEl = document.getElementById(elementId);\r
      const icon = type === 'success'\r
        ? '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>'\r
        : '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>';\r
      statusEl.innerHTML = \`<div class="save-status \${type}">\${icon}<span>\${message}</span></div>\`;\r
      setTimeout(() => {\r
        statusEl.innerHTML = '';\r
      }, 5000);\r
    };\r
\r
    document.addEventListener('DOMContentLoaded', () => {\r
      if (!document.querySelector('.subject-row')) addSubject();\r
      updateStats();\r
      updateCardStatus();\r
      updateSaveReportButton();\r
    });\r
  `},{attributes:{type:"module",src:"access-control.js"},text:""},{attributes:{src:"schoolix-polish.js"},text:""},{attributes:{src:"admin-shell.js?v=navbar-20260721"},text:""}]};export{e as default};
