const e={file:"generate-tc.html",title:"Transfer Certificate - Schoolix",htmlClass:"",bodyClass:"",body:`\r
<div id="sxPageLoader" class="sx-page-loader" role="status" aria-live="polite">\r
  <section class="dots-container" aria-label="Loading page">\r
    <div class="dot"></div>\r
    <div class="dot"></div>\r
    <div class="dot"></div>\r
    <div class="dot"></div>\r
    <div class="dot"></div>\r
  </section>\r
</div>\r
  <div class="toast-host" id="toastHost"></div>\r
\r
  <div class="container">\r
    <!-- Top bar -->\r
    <div class="top-bar">\r
      <div class="brand">\r
        <div class="brand-mark" aria-hidden="true">\r
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="15" x2="15" y2="15"/><line x1="9" y1="11" x2="15" y2="11"/></svg>\r
        </div>\r
        <div>\r
          <h1>Transfer Certificate</h1>\r
          <div class="subtitle">Issue official TC, print, and manage records</div>\r
        </div>\r
      </div>\r
      <button class="btn-back" onclick="goBack()">\r
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>\r
        Back to Students\r
      </button>\r
    </div>\r
\r
    <!-- Tabs -->\r
    <div class="tabs" role="tablist">\r
      <button class="tab-btn active" onclick="switchTab('generate')">\r
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>\r
        Generate TC\r
      </button>\r
      <button class="tab-btn" onclick="switchTab('issued')">\r
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="m9 15 2 2 4-4"/></svg>\r
        Issued Certificates\r
      </button>\r
    </div>\r
\r
    <!-- Generate Tab -->\r
    <div id="generateTab" class="tab-content active">\r
      <!-- Search Panel -->\r
      <div class="panel">\r
        <div class="panel-header">\r
          <div class="panel-title">\r
            <div class="icon-box">\r
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>\r
            </div>\r
            <div>\r
              <h3>Find Student</h3>\r
              <p>Search for a student to generate TC</p>\r
            </div>\r
          </div>\r
          <button class="btn btn-primary btn-sm" onclick="loadAllStudents()">\r
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>\r
            Show All Students\r
          </button>\r
        </div>\r
\r
        <div class="search-grid">\r
          <div class="field">\r
            <label>Student Name</label>\r
            <div class="search-input-wrap">\r
              <svg class="search-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>\r
              <input type="text" id="searchName" placeholder="Enter name..." oninput="searchStudent()" />\r
            </div>\r
          </div>\r
          <div class="field">\r
            <label>Student ID</label>\r
            <input type="text" id="searchStudentId" placeholder="e.g. STU001" oninput="searchStudent()" />\r
          </div>\r
          <div class="field">\r
            <label>Roll No</label>\r
            <input type="text" id="searchRoll" placeholder="e.g. 12" oninput="searchStudent()" />\r
          </div>\r
          <div class="field">\r
            <label>Class</label>\r
            <select id="searchClass" onchange="searchStudent()">\r
              <option value="">Select Class</option>\r
            </select>\r
          </div>\r
        </div>\r
\r
        <div id="studentResult">\r
          <div class="empty-state">\r
            <div class="icon-circle">\r
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>\r
            </div>\r
            <h4>Search for a student</h4>\r
            <p>Enter Student Name, ID, Roll No, or Class to find students</p>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <!-- TC Form -->\r
      <div class="panel" id="tcFormSection" style="display:none;">\r
        <div class="panel-header">\r
          <div class="panel-title">\r
            <div class="icon-box">\r
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>\r
            </div>\r
            <div>\r
              <h3>TC Details</h3>\r
              <p>Fill certificate information</p>\r
            </div>\r
          </div>\r
          <button class="btn btn-success" onclick="showTCPREVIEW()">\r
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>\r
            Preview TC\r
          </button>\r
        </div>\r
\r
        <div class="selected-strip">\r
          <div class="avatar">\r
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>\r
          </div>\r
          <div>\r
            <div class="label">Selected Student</div>\r
            <div class="name" id="selectedStudentName"></div>\r
          </div>\r
        </div>\r
\r
        <div class="divider">Certificate &amp; Reason</div>\r
        <div class="form-row">\r
          <div class="field">\r
            <label>Reason for Leaving</label>\r
            <select id="reason">\r
              <option value="">Select reason</option>\r
              <option>Personal Reasons</option>\r
              <option>Parent Job Transfer</option>\r
              <option>Change of Residence</option>\r
              <option>Better Educational Opportunity</option>\r
              <option>Migration to Another School</option>\r
              <option>Completed Highest Class in School</option>\r
              <option>Others</option>\r
            </select>\r
          </div>\r
          <div class="field"><label>TC / Certificate Number</label><input type="text" id="tcNumber" /></div>\r
          <div class="field"><label>Book No.</label><input type="text" id="bookNo" placeholder="e.g. 01" /></div>\r
          <div class="field"><label>Date of Application</label><input type="date" id="applicationDate" /></div>\r
          <div class="field"><label>Date of Leaving (Struck off)</label><input type="date" id="leavingDate" /></div>\r
          <div class="field"><label>Date of Issue</label><input type="date" id="issueDate" /></div>\r
          <div class="field"><label>Place of Issue</label><input type="text" id="placeOfIssue" placeholder="City / Town" /></div>\r
        </div>\r
\r
        <div class="divider">Parent / Guardian Details</div>\r
        <div class="form-row">\r
          <div class="field"><label>Father's Name</label><input type="text" id="fatherName" /></div>\r
          <div class="field"><label>Mother's Name</label><input type="text" id="motherName" /></div>\r
          <div class="field"><label>Guardian's Name</label><input type="text" id="guardianName" placeholder="If applicable" /></div>\r
          <div class="field"><label>Nationality</label><input type="text" id="nationality" placeholder="Indian" /></div>\r
          <div class="field"><label>Religion</label><input type="text" id="religion" placeholder="e.g. Hindu" /></div>\r
          <div class="field"><label>Category (SC/ST/OBC/Gen)</label><input type="text" id="category" placeholder="General / SC / ST / OBC" /></div>\r
        </div>\r
\r
        <div class="divider">Student &amp; Admission</div>\r
        <div class="form-row">\r
          <div class="field"><label>Admission / Register No.</label><input type="text" id="admissionNo" /></div>\r
          <div class="field"><label>Roll No</label><input type="text" id="rollNo" /></div>\r
          <div class="field"><label>Aadhaar / PAN No.</label><input type="text" id="aadhaarPen" placeholder="Optional" /></div>\r
          <div class="field"><label>Date of Birth (figures)</label><input type="date" id="dob" /></div>\r
          <div class="field"><label>Date of Birth (in words)</label><input type="text" id="dobWords" placeholder="e.g. Fifth March Two Thousand Ten" /></div>\r
          <div class="field"><label>Date of First Admission</label><input type="date" id="admissionDate" /></div>\r
          <div class="field"><label>Class in which Admitted</label><input type="text" id="admittedClass" placeholder="e.g. Nursery / I" /></div>\r
          <div class="field"><label>Class Last Studied</label><input type="text" id="lastClass" /></div>\r
          <div class="field"><label>Section</label><input type="text" id="section" /></div>\r
          <div class="field"><label>Medium of Instruction</label><input type="text" id="medium" placeholder="English / Hindi" /></div>\r
        </div>\r
\r
        <div class="divider">Academic Record</div>\r
        <div class="form-row">\r
          <div class="field"><label>Annual Exam Last Taken &amp; Result</label><input type="text" id="lastExamResult" /></div>\r
          <div class="field"><label>Whether Qualified for Promotion</label><input type="text" id="qualifiedPromotion" placeholder="Yes / No" /></div>\r
          <div class="field"><label>Promoted to Class</label><input type="text" id="promotedTo" /></div>\r
          <div class="field"><label>Whether Failed / Repeated</label><input type="text" id="failedRepeated" placeholder="No" /></div>\r
          <div class="field"><label>Subjects Studied</label><input type="text" id="subjects" placeholder="English, Hindi, Maths, Science, Social Science" /></div>\r
          <div class="field"><label>Co-curricular / Games</label><input type="text" id="coCurricular" placeholder="e.g. Football, Music" /></div>\r
          <div class="field"><label>NCC / Scout / Guide</label><input type="text" id="nccScout" placeholder="No" /></div>\r
          <div class="field"><label>Total Working Days</label><input type="text" id="workingDays" placeholder="220" /></div>\r
          <div class="field"><label>Total Days Present</label><input type="text" id="daysPresent" placeholder="210" /></div>\r
          <div class="field"><label>General Conduct</label><input type="text" id="conduct" placeholder="Good" /></div>\r
        </div>\r
\r
        <div class="divider">Fees &amp; Remarks</div>\r
        <div class="form-row">\r
          <div class="field"><label>School Dues Paid Upto</label><input type="text" id="feesPaidUpto" placeholder="Paid in Full" /></div>\r
          <div class="field"><label>Fee Concession (if any)</label><input type="text" id="feeConcession" placeholder="Nil" /></div>\r
          <div class="field"><label>Identification Mark (i)</label><input type="text" id="identMark1" /></div>\r
          <div class="field"><label>Identification Mark (ii)</label><input type="text" id="identMark2" /></div>\r
          <div class="field"><label>Remarks</label><input type="text" id="remarks" placeholder="Character &amp; conduct good" /></div>\r
        </div>\r
\r
        <div class="divider">School &amp; Signatories</div>\r
        <div class="form-row">\r
          <div class="field"><label>School Name</label><input type="text" id="schoolName" /></div>\r
          <div class="field"><label>School Address</label><input type="text" id="schoolAddress" /></div>\r
          <div class="field"><label>Affiliation No.</label><input type="text" id="affiliationNo" placeholder="Optional" /></div>\r
          <div class="field"><label>School Reg. / UDISE No.</label><input type="text" id="udise" placeholder="Optional" /></div>\r
          <div class="field"><label>Class Teacher</label><input type="text" id="classTeacher" /></div>\r
          <div class="field"><label>Head Clerk / Accountant</label><input type="text" id="clerk" placeholder="Optional" /></div>\r
          <div class="field"><label>Principal Name</label><input type="text" id="principalName" /></div>\r
        </div>\r
\r
        <p style="margin-top:16px; font-size:12.5px; color: var(--text-muted); display:flex; align-items:center; gap:8px;">\r
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>\r
          Tip: In the preview you can click and edit <strong>every line</strong> of the certificate directly, including titles, labels and values, before saving or printing.\r
        </p>\r
      </div>\r
\r
      <!-- TC Preview -->\r
      <div class="panel" id="tcPreview" style="display:none;">\r
        <div class="preview-header">\r
          <div class="panel-title">\r
            <div class="icon-box">\r
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>\r
            </div>\r
            <div>\r
              <h3>TC Preview & Edit</h3>\r
              <p>Review before printing</p>\r
            </div>\r
          </div>\r
          <div class="toolbar">\r
            <button class="btn btn-secondary btn-sm" onclick="updatePreviewFromForm()">\r
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>\r
              Refresh Preview\r
            </button>\r
            <button class="btn btn-success btn-sm" onclick="finalizeTC()">\r
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>\r
              Save & Print TC\r
            </button>\r
            <button class="btn btn-ghost btn-sm" onclick="backToForm()">\r
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>\r
              Back to Form\r
            </button>\r
          </div>\r
        </div>\r
        <div class="edit-hint">\r
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>\r
          Everything below is editable. Click any title, label or value to change it, then Save &amp; Print.\r
        </div>\r
        <div class="preview-content" id="previewContent"></div>\r
      </div>\r
    </div>\r
\r
    <!-- Issued Tab -->\r
    <div id="issuedTab" class="tab-content">\r
      <div class="panel">\r
        <div class="panel-header">\r
          <div class="panel-title">\r
            <div class="icon-box">\r
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="m9 15 2 2 4-4"/></svg>\r
            </div>\r
            <div>\r
              <h3>Issued Transfer Certificates</h3>\r
              <p>Search, print or download previously issued TCs</p>\r
            </div>\r
          </div>\r
        </div>\r
\r
        <div class="search-grid">\r
          <div class="field">\r
            <label>Student</label>\r
            <div class="search-input-wrap">\r
              <svg class="search-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>\r
              <input type="text" id="tcSearchStudent" placeholder="Name or Student ID" oninput="searchIssuedTCs()" />\r
            </div>\r
          </div>\r
          <div class="field">\r
            <label>TC Number</label>\r
            <input type="text" id="tcSearchNumber" placeholder="e.g. TC-..." oninput="searchIssuedTCs()" />\r
          </div>\r
          <div class="field">\r
            <label>Class</label>\r
            <select id="tcSearchClass" onchange="searchIssuedTCs()"><option value="">All Classes</option></select>\r
          </div>\r
          <div class="field">\r
            <label>Issue Date</label>\r
            <input type="date" id="tcSearchDate" onchange="searchIssuedTCs()" />\r
          </div>\r
        </div>\r
\r
        <div id="issuedTCsList"></div>\r
      </div>\r
    </div>\r
  </div>\r
\r
  <!-- Delete modal -->\r
  <div class="delete-confirm" id="deleteModal">\r
    <div class="delete-modal">\r
      <div class="icon-danger">\r
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/></svg>\r
      </div>\r
      <h3>Delete TC</h3>\r
      <p id="deleteMessage">Are you sure you want to delete this TC?</p>\r
      <div class="delete-actions">\r
        <button class="btn btn-secondary" onclick="closeDeleteModal()">Cancel</button>\r
        <button class="btn" style="background: var(--danger); color: #fff;" id="confirmDelete">Yes, Delete</button>\r
      </div>\r
    </div>\r
  </div>\r
\r
  <!-- ================== SCRIPT (logic preserved) ================== -->\r
  <script type="module">\r
    import { initializeApp } from "./firebase-compat.js";\r
    import { getFirestore, collection, getDocs, getDoc, doc, addDoc, setDoc, updateDoc, deleteDoc, query, where, serverTimestamp } from "./firebase-compat.js";\r
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
    let allStudents = [];\r
    let allTCs = [];\r
    let selectedStudent = null;\r
    let tcPreviewData = {};\r
    let tcToDelete = null;\r
\r
    function esc(value) {\r
      return String(value ?? "").replace(/[&<>"']/g, (char) => ({\r
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"\r
      }[char]));\r
    }\r
\r
    function safeDateText(value) {\r
      if (!value) return "";\r
      const raw = value?.toDate ? value.toDate() : value;\r
      const date = raw instanceof Date ? raw : new Date(raw);\r
      return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleDateString("en-IN");\r
    }\r
\r
    function getPassoutYearFromTC(tcData = {}) {\r
      const source = tcData.leavingDate || tcData.issueDate || tcData.generatedAt || new Date().toISOString();\r
      const date = new Date(source);\r
      if (!Number.isNaN(date.getTime())) return String(date.getFullYear());\r
      const years = String(source).match(/\\b(20\\d{2}|19\\d{2})\\b/g);\r
      return years?.length ? years[years.length - 1] : String(new Date().getFullYear());\r
    }\r
\r
    async function loadStudentArchiveRecords(student = {}) {\r
      const sid = student.studentId || student.id || "";\r
      if (!sid) return { attendance: [], fees: [], reportCards: [] };\r
      const [attendanceSnap, feesSnap, reportsSnap] = await Promise.all([\r
        getDocs(query(collection(db, "schools", currentUser.uid, "attendance"), where("studentId", "==", sid))),\r
        getDocs(query(collection(db, "schools", currentUser.uid, "fees"), where("studentId", "==", sid))),\r
        getDocs(query(collection(db, "schools", currentUser.uid, "reportCards"), where("studentId", "==", sid)))\r
      ]);\r
      return {\r
        attendance: attendanceSnap.docs.map((d) => ({ id: d.id, ...d.data() })),\r
        fees: feesSnap.docs.map((d) => ({ id: d.id, ...d.data() })),\r
        reportCards: reportsSnap.docs.map((d) => ({ id: d.id, ...d.data() }))\r
      };\r
    }\r
\r
    async function archiveTCStudent(student, tcData, tcDocId) {\r
      const archiveId = student.id || student.studentId;\r
      const existingRecords = student.records || {};\r
      const records = student._recordSource === "archive"\r
        ? {\r
            attendance: Array.isArray(existingRecords.attendance) ? existingRecords.attendance : [],\r
            fees: Array.isArray(existingRecords.fees) ? existingRecords.fees : [],\r
            reportCards: Array.isArray(existingRecords.reportCards) ? existingRecords.reportCards : []\r
          }\r
        : await loadStudentArchiveRecords(student);\r
      await setDoc(doc(db, "schools", currentUser.uid, "passedOutStudents", archiveId), {\r
        ...student,\r
        _recordSource: null,\r
        activeStudentDocId: student.id || "",\r
        originalStudentDocId: student.id || "",\r
        studentId: student.studentId || student.id || "",\r
        passoutYear: student.passoutYear || getPassoutYearFromTC(tcData),\r
        archiveReason: student.archiveReason || "Transfer Certificate",\r
        archiveSource: "transfer-certificate",\r
        status: student._recordSource === "archive" ? (student.status || "Passed Out") : "TC Issued",\r
        finalClass: student.finalClass || student.class || "",\r
        finalSection: student.finalSection || student.section || "",\r
        tcIssued: true,\r
        tcNumber: tcData.tcNumber || "",\r
        tcCertificateDocId: tcDocId || "",\r
        tcIssuedAt: tcData.generatedAt || new Date().toISOString(),\r
        transferCertificate: { id: tcDocId || "", ...tcData },\r
        records,\r
        archivedAt: serverTimestamp(),\r
        updatedAt: serverTimestamp()\r
      }, { merge: true });\r
      if (student._recordSource !== "archive") {\r
        await deleteDoc(doc(db, "schools", currentUser.uid, "students", student.id));\r
      }\r
    }\r
\r
    function studentDisplayName(student) {\r
      return student?.name || student?.studentName || "N/A";\r
    }\r
    function initials(name) {\r
      return String(name || '?').split(/\\s+/).filter(Boolean).slice(0,2).map(w => w[0].toUpperCase()).join('') || '?';\r
    }\r
\r
    function getStoredSchoolName() {\r
      return window.SchoolBranding?.getSchoolName() || "Schoolix School";\r
    }\r
    function getDefaultSchoolAddress() {\r
      return "Affiliated to State Board";\r
    }\r
\r
    window.goBack = () => window.location.href = "#/students.html";\r
\r
    function showToast(message, type = 'success') {\r
      const host = document.getElementById('toastHost');\r
      const toast = document.createElement('div');\r
      toast.className = \`toast \${type}\`;\r
      const icon = type === 'error'\r
        ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>'\r
        : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>';\r
      toast.innerHTML = \`\${icon}<span>\${esc(message)}</span>\`;\r
      host.appendChild(toast);\r
      setTimeout(() => toast.remove(), 4000);\r
    }\r
\r
    function showLoading(show, containerId) {\r
      const container = document.getElementById(containerId);\r
      if (!container) return;\r
      if (show) container.innerHTML = '<div class="loading"><div class="spinner"></div><span>Loading...</span></div>';\r
    }\r
\r
    window.switchTab = (tabName) => {\r
      document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));\r
      document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));\r
      document.querySelector(\`[onclick="switchTab('\${tabName}')"]\`).classList.add('active');\r
      document.getElementById(tabName + 'Tab').classList.add('active');\r
    };\r
\r
    window.showDeleteModal = (tcId, tcNumber) => {\r
      tcToDelete = tcId;\r
      document.getElementById('deleteMessage').textContent = \`Are you sure you want to delete TC \${tcNumber}?\`;\r
      document.getElementById('deleteModal').classList.add('open');\r
    };\r
    window.closeDeleteModal = () => {\r
      document.getElementById('deleteModal').classList.remove('open');\r
      tcToDelete = null;\r
    };\r
    window.confirmDeleteTC = async () => {\r
      if (!tcToDelete) return;\r
      try {\r
        const tcSnap = await getDoc(doc(db, "schools", currentUser.uid, "transferCertificates", tcToDelete));\r
        const tcData = tcSnap.exists() ? tcSnap.data() : null;\r
        await deleteDoc(doc(db, "schools", currentUser.uid, "transferCertificates", tcToDelete));\r
        if (tcData?.studentDocId) {\r
          await updateDoc(doc(db, "schools", currentUser.uid, "students", tcData.studentDocId), {\r
            tcIssued: false, tcNumber: "", tcIssuedAt: null, tcCertificateDocId: null, updatedAt: serverTimestamp()\r
          }).catch(() => {});\r
        } else if (tcData?.studentId) {\r
          const stSnap = await getDocs(query(collection(db, "schools", currentUser.uid, "students"), where("studentId", "==", tcData.studentId)));\r
          if (!stSnap.empty) {\r
            await updateDoc(doc(db, "schools", currentUser.uid, "students", stSnap.docs[0].id), {\r
              tcIssued: false, tcNumber: "", tcIssuedAt: null, tcCertificateDocId: null, updatedAt: serverTimestamp()\r
            }).catch(() => {});\r
          }\r
        }\r
        if (tcData?.archiveStudentDocId) {\r
          await updateDoc(doc(db, "schools", currentUser.uid, "passedOutStudents", tcData.archiveStudentDocId), {\r
            tcIssued: false,\r
            tcNumber: "",\r
            tcIssuedAt: null,\r
            tcCertificateDocId: null,\r
            transferCertificate: null,\r
            status: "Passed Out",\r
            updatedAt: serverTimestamp()\r
          }).catch(() => {});\r
        } else if (tcData?.studentId) {\r
          const archivedSnap = await getDocs(query(collection(db, "schools", currentUser.uid, "passedOutStudents"), where("studentId", "==", tcData.studentId)));\r
          if (!archivedSnap.empty) {\r
            await updateDoc(doc(db, "schools", currentUser.uid, "passedOutStudents", archivedSnap.docs[0].id), {\r
              tcIssued: false,\r
              tcNumber: "",\r
              tcIssuedAt: null,\r
              tcCertificateDocId: null,\r
              transferCertificate: null,\r
              status: "Passed Out",\r
              updatedAt: serverTimestamp()\r
            }).catch(() => {});\r
          }\r
        }\r
        showToast('TC deleted. Student record unlocked.', 'success');\r
        closeDeleteModal();\r
        await loadIssuedTCs();\r
        await loadStudents();\r
      } catch (error) {\r
        console.error("Error deleting TC:", error);\r
        showToast('Error deleting TC', 'error');\r
      }\r
    };\r
\r
    onAuthStateChanged(auth, async (user) => {\r
      if (!user) { showToast('Please login first', 'error'); return window.location.href = "#/index.html"; }\r
      currentUser = user;\r
      try {\r
        await Promise.all([loadStudents(), loadIssuedTCs()]);\r
        switchTab('generate');\r
      } catch (error) {\r
        console.error('Error initializing:', error);\r
        showToast('Error loading data: ' + error.message, 'error');\r
      }\r
    });\r
\r
    window.loadStudents = async () => {\r
      if (!currentUser) { showToast('Please login first', 'error'); return; }\r
      try {\r
        showLoading(true, "studentResult");\r
        const [studentSnap, archivedSnap] = await Promise.all([\r
          getDocs(collection(db, "schools", currentUser.uid, "students")),\r
          getDocs(collection(db, "schools", currentUser.uid, "passedOutStudents"))\r
        ]);\r
        allStudents = [];\r
        studentSnap.forEach((d) => allStudents.push({ id: d.id, _recordSource: "active", ...d.data() }));\r
        archivedSnap.forEach((d) => allStudents.push({ id: d.id, _recordSource: "archive", ...d.data() }));\r
        populateClassFilter();\r
        document.getElementById("studentResult").innerHTML = emptySearchState();\r
        showToast(\`Loaded \${allStudents.length} students including passed out records.\`, 'success');\r
      } catch (error) {\r
        console.error("Error loading students:", error);\r
        document.getElementById("studentResult").innerHTML = \`\r
          <div class="error-state">\r
            <div class="icon-circle"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg></div>\r
            <h4>Error loading students</h4>\r
            <p>\${esc(error.message)}</p>\r
            <button class="btn btn-primary btn-sm" style="margin-top:12px;" onclick="loadStudents()">Retry</button>\r
          </div>\`;\r
        showToast('Error loading students', 'error');\r
      }\r
    };\r
\r
    window.loadAllStudents = async () => { await loadStudents(); renderSearchResults(allStudents); };\r
\r
    window.searchStudent = () => {\r
      const searchName = document.getElementById("searchName")?.value?.trim().toLowerCase() || '';\r
      const searchRoll = document.getElementById("searchRoll")?.value?.trim() || '';\r
      const searchClass = document.getElementById("searchClass")?.value || '';\r
      const searchStudentId = document.getElementById("searchStudentId")?.value?.trim().toLowerCase() || '';\r
      if (!searchName && !searchRoll && !searchClass && !searchStudentId) {\r
        document.getElementById("studentResult").innerHTML = emptySearchState();\r
        return;\r
      }\r
      const found = allStudents.filter(s => {\r
        const matchesName = !searchName || (studentDisplayName(s).toLowerCase().includes(searchName));\r
        const matchesRoll = !searchRoll || (s.roll?.toString() === searchRoll);\r
        const matchesClass = !searchClass || (s.class === searchClass) || (s.finalClass === searchClass);\r
        const matchesId = !searchStudentId || (s.studentId?.toLowerCase().includes(searchStudentId));\r
        return matchesName && matchesRoll && matchesClass && matchesId;\r
      });\r
      renderSearchResults(found);\r
    };\r
\r
    function emptySearchState() {\r
      return \`<div class="empty-state">\r
        <div class="icon-circle"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></div>\r
        <h4>Search for a student</h4>\r
        <p>Enter Student Name, ID, Roll No, or Class to find students</p>\r
      </div>\`;\r
    }\r
\r
    function renderSearchResults(students) {\r
      const resultDiv = document.getElementById("studentResult");\r
      if (students.length === 0) {\r
        resultDiv.innerHTML = \`<div class="empty-state">\r
          <div class="icon-circle"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="8" y1="12" x2="16" y2="12"/></svg></div>\r
          <h4>No students found</h4><p>Try different search criteria or Show All Students</p></div>\`;\r
        return;\r
      }\r
      const html = '<div class="cards-list">' + students.map(s => {\r
        const issued = !!s.tcIssued;\r
        const archived = s._recordSource === "archive";\r
        const name = studentDisplayName(s);\r
        return \`\r
        <div class="card-item \${issued ? 'tc-issued-card' : ''}" data-student-id="\${esc(s.id)}" onclick="selectStudent('\${esc(s.id)}')">\r
          <div class="card-head">\r
            <div class="card-title">\r
              <div class="avatar">\${esc(initials(name))}</div>\r
              <span>\${esc(name)}</span>\r
            </div>\r
            \${archived ? '<span class="pill pill-warning">Passed Out</span>' : ''}\r
            \${issued ? '<span class="pill pill-danger"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>TC Issued</span>' : ''}\r
          </div>\r
          <div class="card-body-grid">\r
            <div><strong>Student ID:</strong>\${esc(s.studentId || 'N/A')}</div>\r
            <div><strong>Class:</strong>\${esc(s.finalClass || s.class || '?')}\${(s.finalSection || s.section) ? ' - ' + esc(s.finalSection || s.section) : ''}</div>\r
            <div><strong>Roll No:</strong>\${esc(s.roll || s.rollNo || '?')}</div>\r
            \${archived ? \`<div><strong>Passout Year:</strong>\${esc(s.passoutYear || 'N/A')}</div>\` : ''}\r
            \${s.father ? \`<div><strong>Father:</strong>\${esc(s.father)}</div>\` : ''}\r
            \${s.mother ? \`<div><strong>Mother:</strong>\${esc(s.mother)}</div>\` : ''}\r
            \${s.phone ? \`<div><strong>Phone:</strong>\${esc(s.phone)}</div>\` : ''}\r
          </div>\r
          \${issued ? '<div class="tc-note"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>Transfer Certificate already issued. Cannot generate again.</div>' : ''}\r
        </div>\`;\r
      }).join('') + '</div>';\r
      resultDiv.innerHTML = html;\r
    }\r
\r
    window.selectStudent = (id) => {\r
      selectedStudent = allStudents.find(s => s.id === id);\r
      if (!selectedStudent) { showToast('Student not found', 'error'); return; }\r
      if (selectedStudent.tcIssued) { showToast('TC already issued for this student. Cannot generate again.', 'error'); return; }\r
      document.querySelectorAll('.card-item').forEach(card => card.classList.remove('selected'));\r
      const cardEl = document.querySelector(\`.card-item[data-student-id="\${id}"]\`);\r
      if (cardEl) cardEl.classList.add('selected');\r
      document.getElementById("selectedStudentName").textContent = studentDisplayName(selectedStudent);\r
      document.getElementById("tcFormSection").style.display = "block";\r
      populateTCForm();\r
      document.getElementById("tcFormSection").scrollIntoView({ behavior: 'smooth' });\r
      showToast(\`\${studentDisplayName(selectedStudent)} selected. Fill TC details below.\`, 'success');\r
    };\r
\r
    function populateClassFilter() {\r
      const classSet = new Set();\r
      allStudents.forEach(s => {\r
        if (s.class) classSet.add(s.class);\r
        if (s.finalClass) classSet.add(s.finalClass);\r
      });\r
      const select = document.getElementById('searchClass');\r
      select.innerHTML = '<option value="">Select Class</option>';\r
      Array.from(classSet).sort().forEach(c => { select.innerHTML += \`<option value="\${esc(c)}">\${esc(c)}</option>\`; });\r
    }\r
\r
    function populateTCForm() {\r
      if (!selectedStudent) return;\r
      const today = new Date().toISOString().split('T')[0];\r
      const iso = (v) => v ? new Date(v).toISOString().split('T')[0] : '';\r
      const set = (id, val) => { const el = document.getElementById(id); if (el) el.value = val ?? ''; };\r
      const s = selectedStudent;\r
      set("tcNumber", \`TC-\${s.studentId || s.id || 'N/A'}-\${Date.now().toString().slice(-6)}\`);\r
      set("bookNo", "");\r
      set("applicationDate", today);\r
      set("leavingDate", today);\r
      set("issueDate", today);\r
      set("placeOfIssue", "");\r
      // Parent / guardian\r
      set("fatherName", s.father || s.fatherName || '');\r
      set("motherName", s.mother || s.motherName || '');\r
      set("guardianName", s.guardian || s.guardianName || '');\r
      set("nationality", s.nationality || 'Indian');\r
      set("religion", s.religion || '');\r
      set("category", s.category || 'General');\r
      // Student / admission\r
      set("admissionNo", s.admissionNo || s.studentId || '');\r
      set("rollNo", s.roll || s.rollNo || '');\r
      set("aadhaarPen", s.aadhaar || s.pen || '');\r
      set("dob", iso(s.dob));\r
      set("dobWords", "");\r
      set("admissionDate", iso(s.admissionDate));\r
      set("admittedClass", s.admittedClass || '');\r
      const lastClass = s.finalClass || s.class || "";\r
      const lastSection = s.finalSection || s.section || "";\r
      set("lastClass", \`\${lastClass}\${lastSection ? \` (\${lastSection})\` : ''}\`.trim());\r
      set("section", s.section || '');\r
      set("medium", s.medium || 'English');\r
      // Academic\r
      set("lastExamResult", \`Passed Class \${s.class || 'N/A'}\`);\r
      set("qualifiedPromotion", "Yes");\r
      set("promotedTo", "");\r
      set("failedRepeated", "No");\r
      set("subjects", "English, Hindi, Mathematics, Science, Social Science");\r
      set("coCurricular", "");\r
      set("nccScout", "No");\r
      set("workingDays", "220");\r
      set("daysPresent", "210");\r
      set("conduct", "Good");\r
      // Fees / remarks\r
      set("feesPaidUpto", "Paid in Full");\r
      set("feeConcession", "Nil");\r
      set("identMark1", "");\r
      set("identMark2", "");\r
      set("remarks", "Character and Conduct Good");\r
      // School / signatories\r
      set("schoolName", getStoredSchoolName());\r
      set("schoolAddress", getDefaultSchoolAddress());\r
      set("affiliationNo", "");\r
      set("udise", "");\r
      set("classTeacher", s.classTeacher || 'Class Teacher');\r
      set("clerk", "");\r
      set("principalName", 'Principal');\r
    }\r
\r
    window.showTCPREVIEW = () => {\r
      if (!selectedStudent) { showToast('Please select a student first', 'error'); return; }\r
      const data = getFormData();\r
      if (!data.reason || !data.leavingDate || !data.tcNumber) {\r
        showToast("Reason, leaving date and TC number are required.", "error"); return;\r
      }\r
      tcPreviewData = { ...data, studentId: selectedStudent.studentId, studentName: studentDisplayName(selectedStudent) };\r
      renderPreview();\r
      document.getElementById("tcPreview").style.display = "block";\r
      document.getElementById("tcFormSection").style.display = "none";\r
      document.getElementById("tcPreview").scrollIntoView({ behavior: 'smooth' });\r
    };\r
\r
    function getFormData() {\r
      const val = (id) => document.getElementById(id)?.value ?? '';\r
      return {\r
        reason: val("reason"),\r
        tcNumber: val("tcNumber"),\r
        bookNo: val("bookNo"),\r
        applicationDate: val("applicationDate"),\r
        leavingDate: val("leavingDate"),\r
        issueDate: val("issueDate"),\r
        placeOfIssue: val("placeOfIssue"),\r
        fatherName: val("fatherName"),\r
        motherName: val("motherName"),\r
        guardianName: val("guardianName"),\r
        nationality: val("nationality"),\r
        religion: val("religion"),\r
        category: val("category"),\r
        admissionNo: val("admissionNo"),\r
        rollNo: val("rollNo"),\r
        aadhaarPen: val("aadhaarPen"),\r
        dob: val("dob"),\r
        dobWords: val("dobWords"),\r
        admissionDate: val("admissionDate"),\r
        admittedClass: val("admittedClass"),\r
        lastClass: val("lastClass"),\r
        section: val("section"),\r
        medium: val("medium"),\r
        lastExamResult: val("lastExamResult"),\r
        qualifiedPromotion: val("qualifiedPromotion"),\r
        promotedTo: val("promotedTo"),\r
        failedRepeated: val("failedRepeated"),\r
        subjects: val("subjects"),\r
        coCurricular: val("coCurricular"),\r
        nccScout: val("nccScout"),\r
        workingDays: val("workingDays"),\r
        daysPresent: val("daysPresent"),\r
        conduct: val("conduct"),\r
        feesPaidUpto: val("feesPaidUpto"),\r
        feeConcession: val("feeConcession"),\r
        identMark1: val("identMark1"),\r
        identMark2: val("identMark2"),\r
        remarks: val("remarks"),\r
        schoolName: val("schoolName"),\r
        schoolAddress: val("schoolAddress"),\r
        affiliationNo: val("affiliationNo"),\r
        udise: val("udise"),\r
        classTeacher: val("classTeacher"),\r
        clerk: val("clerk"),\r
        principal: val("principalName")\r
      };\r
    }\r
\r
    // Renders an inline-editable value span so every value can be edited in the preview\r
    function ef(key, value, placeholder = '-') {\r
      return \`<span class="editable-field" contenteditable="true" data-key="\${esc(key)}" data-placeholder="\${esc(placeholder)}">\${esc(value ?? '')}</span>\`;\r
    }\r
\r
    // Reads every edited value back out of the preview into a plain object\r
    function collectEditedData() {\r
      const previewContent = document.getElementById("previewContent");\r
      const out = {};\r
      previewContent.querySelectorAll('[data-key]').forEach(node => {\r
        out[node.dataset.key] = node.textContent.trim();\r
      });\r
      out.previewHtml = previewContent.innerHTML;\r
      return out;\r
    }\r
\r
    function renderPreview() {\r
      const previewContent = document.getElementById("previewContent");\r
      const d = tcPreviewData;\r
      const issueTxt = d.issueDate ? new Date(d.issueDate).toLocaleDateString('en-IN') : new Date().toLocaleDateString('en-IN');\r
      previewContent.setAttribute('contenteditable', 'true');\r
      previewContent.spellcheck = false;\r
      previewContent.innerHTML = \`\r
        <h2>TRANSFER CERTIFICATE</h2>\r
        <div class="school-name">\${ef('schoolName', d.schoolName || getStoredSchoolName(), 'School name')}</div>\r
        <div class="school-addr">\${ef('schoolAddress', d.schoolAddress || getDefaultSchoolAddress(), 'School address')}\r
          <div style="font-size:12px; color:#64748b; margin-top:4px;">\r
            Affiliation No: \${ef('affiliationNo', d.affiliationNo, '-')} &nbsp;|&nbsp; Reg./UDISE No: \${ef('udise', d.udise, '-')}\r
          </div>\r
        </div>\r
\r
        <div class="meta-row">\r
          <div><strong>Certificate No:</strong> \${ef('tcNumber', d.tcNumber, '-')}<br/>\r
               <strong>Book No:</strong> \${ef('bookNo', d.bookNo, '-')}<br/>\r
               <strong>Admission / Register No:</strong> \${ef('admissionNo', d.admissionNo, '-')}</div>\r
          <div style="text-align:right;"><strong>Date of Issue:</strong> \${ef('issueDateText', issueTxt, '-')}<br/>\r
               <strong>Place:</strong> \${ef('placeOfIssue', d.placeOfIssue, '-')}</div>\r
        </div>\r
\r
        <div class="tc-field"><strong>1. Name of Pupil:</strong> \${ef('studentName', d.studentName)}</div>\r
        <div class="tc-field"><strong>2. Mother's Name:</strong> \${ef('motherName', d.motherName)}</div>\r
        <div class="tc-field"><strong>3. Father's Name:</strong> \${ef('fatherName', d.fatherName)}</div>\r
        <div class="tc-field"><strong>4. Guardian's Name:</strong> \${ef('guardianName', d.guardianName)}</div>\r
        <div class="tc-field"><strong>5. Nationality:</strong> \${ef('nationality', d.nationality || 'Indian')}</div>\r
        <div class="tc-field"><strong>6. Religion:</strong> \${ef('religion', d.religion)}</div>\r
        <div class="tc-field"><strong>7. Category (SC/ST/OBC/Gen):</strong> \${ef('category', d.category || 'General')}</div>\r
        <div class="tc-field"><strong>8. Aadhaar / PEN No:</strong> \${ef('aadhaarPen', d.aadhaarPen)}</div>\r
        <div class="tc-field"><strong>9. Date of Birth (in figures):</strong> \${ef('dob', safeDateText(d.dob))}</div>\r
        <div class="tc-field"><strong>10. Date of Birth (in words):</strong> \${ef('dobWords', d.dobWords)}</div>\r
        <div class="tc-field"><strong>11. Date of First Admission:</strong> \${ef('admissionDate', safeDateText(d.admissionDate))}</div>\r
        <div class="tc-field"><strong>12. Class in which Admitted:</strong> \${ef('admittedClass', d.admittedClass)}</div>\r
        <div class="tc-field"><strong>13. Class in which Last Studied:</strong> \${ef('lastClass', d.lastClass)}</div>\r
        <div class="tc-field"><strong>14. Section:</strong> \${ef('section', d.section)}</div>\r
        <div class="tc-field"><strong>15. Medium of Instruction:</strong> \${ef('medium', d.medium || 'English')}</div>\r
        <div class="tc-field"><strong>16. Roll No:</strong> \${ef('rollNo', d.rollNo)}</div>\r
        <div class="tc-field"><strong>17. Annual Exam Last Taken &amp; Result:</strong> \${ef('lastExamResult', d.lastExamResult)}</div>\r
        <div class="tc-field"><strong>18. Whether Qualified for Promotion:</strong> \${ef('qualifiedPromotion', d.qualifiedPromotion || 'Yes')}</div>\r
        <div class="tc-field"><strong>19. Promoted to Class:</strong> \${ef('promotedTo', d.promotedTo)}</div>\r
        <div class="tc-field"><strong>20. Whether Failed / Repeated:</strong> \${ef('failedRepeated', d.failedRepeated || 'No')}</div>\r
        <div class="tc-field"><strong>21. Subjects Studied:</strong> \${ef('subjects', d.subjects || 'English, Hindi, Mathematics, Science, Social Science')}</div>\r
        <div class="tc-field"><strong>22. Co-curricular Activities / Games:</strong> \${ef('coCurricular', d.coCurricular)}</div>\r
        <div class="tc-field"><strong>23. Whether NCC Cadet / Scout / Guide:</strong> \${ef('nccScout', d.nccScout || 'No')}</div>\r
        <div class="tc-field"><strong>24. Total No. of Working Days:</strong> \${ef('workingDays', d.workingDays || '220')}</div>\r
        <div class="tc-field"><strong>25. Total No. of Days Present:</strong> \${ef('daysPresent', d.daysPresent || '210')}</div>\r
        <div class="tc-field"><strong>26. School Dues Paid Upto:</strong> \${ef('feesPaidUpto', d.feesPaidUpto || 'Paid in Full')}</div>\r
        <div class="tc-field"><strong>27. Fee Concession (if any):</strong> \${ef('feeConcession', d.feeConcession || 'Nil')}</div>\r
        <div class="tc-field"><strong>28. General Conduct:</strong> \${ef('conduct', d.conduct || 'Good')}</div>\r
        <div class="tc-field"><strong>29. Date of Application for Certificate:</strong> \${ef('applicationDate', safeDateText(d.applicationDate))}</div>\r
        <div class="tc-field"><strong>30. Date of Leaving School / Struck Off:</strong> \${ef('leavingDate', safeDateText(d.leavingDate))}</div>\r
        <div class="tc-field"><strong>31. Reason for Leaving School:</strong> \${ef('reason', d.reason)}</div>\r
        <div class="tc-field"><strong>32. Identification Mark (i):</strong> \${ef('identMark1', d.identMark1)}</div>\r
        <div class="tc-field"><strong>33. Identification Mark (ii):</strong> \${ef('identMark2', d.identMark2)}</div>\r
        <div class="tc-field"><strong>34. Any Other Remarks:</strong> \${ef('remarks', d.remarks || 'Character and Conduct Good')}</div>\r
\r
        <div class="sig-row">\r
          <div class="sig-box"><div class="sig-line"></div><strong>Prepared / Clerk</strong><div>\${ef('clerk', d.clerk)}</div></div>\r
          <div class="sig-box"><div class="sig-line"></div><strong>Class Teacher</strong><div>\${ef('classTeacher', d.classTeacher)}</div></div>\r
          <div class="sig-box"><div class="sig-line"></div><strong>Principal / Head</strong><div>\${ef('principal', d.principal)}</div></div>\r
        </div>\r
      \`;\r
    }\r
\r
    window.updatePreviewFromForm = () => {\r
      if (!selectedStudent) return;\r
      tcPreviewData = { ...getFormData(), studentId: selectedStudent.studentId, studentName: studentDisplayName(selectedStudent) };\r
      renderPreview();\r
      showToast('Preview updated from form.', 'success');\r
    };\r
\r
    window.backToForm = () => {\r
      document.getElementById("tcPreview").style.display = "none";\r
      document.getElementById("tcFormSection").style.display = "block";\r
    };\r
\r
    window.finalizeTC = async () => {\r
      if (!selectedStudent) { showToast('Please select a student first', 'error'); return; }\r
      if (selectedStudent.tcIssued) { showToast('This student already has a TC issued.', 'error'); return; }\r
      try {\r
        const edited = collectEditedData();\r
        const finalData = {\r
          ...tcPreviewData,\r
          ...edited,\r
          studentId: selectedStudent.studentId,\r
          studentName: studentDisplayName(selectedStudent),\r
          class: selectedStudent.finalClass || selectedStudent.class || 'N/A',\r
          section: selectedStudent.finalSection || selectedStudent.section || '',\r
          roll: selectedStudent.roll || 'N/A',\r
          generatedBy: currentUser.uid,\r
          generatedAt: new Date().toISOString(),\r
          studentDocId: selectedStudent._recordSource === "archive" ? "" : selectedStudent.id,\r
          archiveStudentDocId: selectedStudent._recordSource === "archive" ? selectedStudent.id : ""\r
        };\r
        if (!finalData.leavingDate) { showToast('Please set leaving date', 'error'); return; }\r
        if (!finalData.tcNumber) { showToast('Please enter TC number', 'error'); return; }\r
        const duplicateSnap = await getDocs(query(\r
          collection(db, "schools", currentUser.uid, "transferCertificates"),\r
          where("studentId", "==", selectedStudent.studentId)\r
        ));\r
        if (!duplicateSnap.empty) {\r
          showToast("TC already exists for this student. Refreshing records.", "error");\r
          await loadIssuedTCs(); return;\r
        }\r
        const docRef = await addDoc(collection(db, "schools", currentUser.uid, "transferCertificates"), finalData);\r
        await archiveTCStudent(selectedStudent, finalData, docRef.id);\r
        if (selectedStudent._recordSource === "archive") {\r
          allStudents = allStudents.map((s) => s.id === selectedStudent.id ? {\r
            ...s,\r
            tcIssued: true,\r
            tcNumber: finalData.tcNumber || "",\r
            tcCertificateDocId: docRef.id,\r
            transferCertificate: { id: docRef.id, ...finalData },\r
            status: s.status || "Passed Out"\r
          } : s);\r
        } else {\r
          allStudents = allStudents.filter((s) => s.id !== selectedStudent.id);\r
        }\r
        selectedStudent = null;\r
        showToast(\`TC \${finalData.tcNumber} saved and uploaded to student dashboard.\`, 'success');\r
        await loadIssuedTCs();\r
        generateAndPrintTC(finalData);\r
        resetForm();\r
        switchTab('issued');\r
      } catch (error) {\r
        console.error("Error saving TC:", error);\r
        showToast('Error saving TC: ' + error.message, 'error');\r
      }\r
    };\r
\r
    function resetForm() {\r
      document.getElementById("tcPreview").style.display = "none";\r
      document.getElementById("tcFormSection").style.display = "none";\r
      selectedStudent = null;\r
      tcPreviewData = {};\r
      document.getElementById("selectedStudentName").textContent = '';\r
      document.querySelectorAll('#tcFormSection input, #tcFormSection select, #tcFormSection textarea').forEach(el => { el.value = ''; });\r
      ['searchName', 'searchRoll', 'searchClass', 'searchStudentId'].forEach(id => {\r
        const el = document.getElementById(id); if (el) el.value = '';\r
      });\r
      document.getElementById("studentResult").innerHTML = emptySearchState();\r
    }\r
\r
    async function loadIssuedTCs() {\r
      try {\r
        showLoading(true, "issuedTCsList");\r
        const tcSnap = await getDocs(collection(db, "schools", currentUser.uid, "transferCertificates"));\r
        allTCs = tcSnap.docs.map(d => ({ id: d.id, ...d.data() })).sort((a,b) => new Date(b.generatedAt || 0) - new Date(a.generatedAt || 0));\r
        populateTCClassFilter();\r
        renderIssuedTCs(allTCs);\r
      } catch (error) {\r
        console.error("Error loading TCs:", error);\r
        showToast('Error loading TCs', 'error');\r
      }\r
    }\r
\r
    window.searchIssuedTCs = () => {\r
      const searchStudent = document.getElementById("tcSearchStudent")?.value?.trim().toLowerCase() || '';\r
      const searchNumber = document.getElementById("tcSearchNumber")?.value?.trim().toLowerCase() || '';\r
      const searchClass = document.getElementById("tcSearchClass")?.value || '';\r
      const searchDate = document.getElementById("tcSearchDate")?.value || '';\r
      let filtered = allTCs.filter(tc => {\r
        if (searchStudent && !tc.studentName?.toLowerCase().includes(searchStudent) && !tc.studentId?.toLowerCase().includes(searchStudent)) return false;\r
        if (searchNumber && !tc.tcNumber?.toLowerCase().includes(searchNumber)) return false;\r
        if (searchClass && tc.class !== searchClass) return false;\r
        if (searchDate) {\r
          const generated = new Date(tc.generatedAt || 0);\r
          if (Number.isNaN(generated.getTime()) || generated.toISOString().split('T')[0] !== searchDate) return false;\r
        }\r
        return true;\r
      });\r
      renderIssuedTCs(filtered);\r
    };\r
\r
    function renderIssuedTCs(tcs) {\r
      const resultDiv = document.getElementById("issuedTCsList");\r
      if (tcs.length === 0) {\r
        resultDiv.innerHTML = \`<div class="empty-state">\r
          <div class="icon-circle"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></div>\r
          <h4>No TCs found</h4><p>No transfer certificates match your search criteria</p></div>\`;\r
        return;\r
      }\r
      const html = '<div class="cards-list">' + tcs.map(tc => \`\r
        <div class="card-item" style="cursor:default; border-left: 4px solid var(--success);">\r
          <div class="card-head">\r
            <div class="card-title">\r
              <div class="avatar" style="background: var(--success-50); color: var(--success);">\r
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>\r
              </div>\r
              <span>TC: \${esc(tc.tcNumber || 'N/A')}</span>\r
            </div>\r
            <span class="pill pill-success">Issued</span>\r
          </div>\r
          <div class="card-body-grid">\r
            <div><strong>Student:</strong>\${esc(tc.studentName || 'N/A')}</div>\r
            <div><strong>ID:</strong>\${esc(tc.studentId || 'N/A')}</div>\r
            <div><strong>Class:</strong>\${esc(tc.class || 'N/A')}\${tc.section ? \` (\${esc(tc.section)})\` : ''}</div>\r
            <div><strong>Issued:</strong>\${esc(safeDateText(tc.generatedAt))}</div>\r
            <div style="grid-column: 1 / -1;"><strong>Reason:</strong>\${esc(tc.reason || '')}</div>\r
          </div>\r
          <div class="toolbar" style="margin-top: 14px;">\r
            <button class="btn btn-primary btn-sm" onclick="printTC('\${esc(tc.id)}')">\r
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>\r
              Print TC\r
            </button>\r
            <button class="btn btn-secondary btn-sm" onclick="downloadTCPDF('\${esc(tc.id)}')">\r
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>\r
              Download PDF\r
            </button>\r
          </div>\r
        </div>\r
      \`).join('') + '</div>';\r
      resultDiv.innerHTML = html;\r
    }\r
\r
    function populateTCClassFilter() {\r
      const classSet = new Set();\r
      allTCs.forEach(tc => { if (tc.class) classSet.add(tc.class); });\r
      const select = document.getElementById('tcSearchClass');\r
      select.innerHTML = '<option value="">All Classes</option>';\r
      Array.from(classSet).sort().forEach(c => { select.innerHTML += \`<option value="\${esc(c)}">\${esc(c)}</option>\`; });\r
    }\r
\r
    function generateAndPrintTC(tcData) {\r
      const htmlContent = generateTCHTML(tcData);\r
      const printWindow = window.open('', '_blank');\r
      if (!printWindow) { showToast("Popup blocked. Allow popups to print TC.", "error"); return; }\r
      printWindow.document.write(htmlContent);\r
      printWindow.document.close();\r
      setTimeout(() => printWindow.print(), 500);\r
    }\r
\r
    function tcPrintStyles() {\r
      return \`\r
        @page { size: A4; margin: 16mm; }\r
        body { font-family: 'Times New Roman', Georgia, serif; color: #111; padding: 0; margin: 0; }\r
        .tc-container { max-width: 800px; margin: 0 auto; padding: 30px; border: 2px solid #333; }\r
        h2 { text-align: center; font-size: 26px; letter-spacing: 4px; margin: 0 0 8px; }\r
        .school-name { text-align: center; font-size: 20px; font-weight: bold; }\r
        .school-addr { text-align: center; font-size: 14px; color: #444; padding-bottom: 14px; margin-bottom: 20px; border-bottom: 2px double #333; }\r
        .meta-row { display: flex; justify-content: space-between; margin-bottom: 22px; font-size: 14px; gap: 20px; }\r
        .tc-field { font-size: 14.5px; margin: 8px 0; }\r
        .tc-field strong { display: inline-block; min-width: 300px; }\r
        .sig-row { display: flex; justify-content: space-between; margin-top: 64px; gap: 24px; }\r
        .sig-box { text-align: center; flex: 1; }\r
        .sig-line { border-top: 1.5px solid #333; margin-bottom: 6px; height: 40px; }\r
        /* Neutralise the on-screen editable styling for a clean printout */\r
        .editable-field { border: none !important; background: transparent !important; padding: 0 !important; min-width: 0 !important; box-shadow: none !important; font: inherit !important; }\r
        [contenteditable] { outline: none; }\r
        @media print { body { margin: 0; padding: 0; } .tc-container { border: none; } }\r
      \`;\r
    }\r
\r
    function generateTCHTML(tcData) {\r
      // Prefer the exact certificate the user edited inline in the preview\r
      const body = tcData.previewHtml\r
        ? tcData.previewHtml\r
        : fallbackTCBody(tcData);\r
      return \`<!DOCTYPE html><html><head>\r
<meta charset="UTF-8">\r
        <title>Transfer Certificate - \${esc(tcData.studentName || '')}</title>\r
        <style>\${tcPrintStyles()}</style>\r
</head><body><div class="tc-container">\${body}</div>`,styles:[{tag:"style",attributes:{id:"sxCriticalLoaderStyle"},text:`\r
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
    import { getFirestore, collection, getDocs, getDoc, doc, addDoc, setDoc, updateDoc, deleteDoc, query, where, serverTimestamp } from "./firebase-compat.js";\r
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
    let allStudents = [];\r
    let allTCs = [];\r
    let selectedStudent = null;\r
    let tcPreviewData = {};\r
    let tcToDelete = null;\r
\r
    function esc(value) {\r
      return String(value ?? "").replace(/[&<>"']/g, (char) => ({\r
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"\r
      }[char]));\r
    }\r
\r
    function safeDateText(value) {\r
      if (!value) return "";\r
      const raw = value?.toDate ? value.toDate() : value;\r
      const date = raw instanceof Date ? raw : new Date(raw);\r
      return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleDateString("en-IN");\r
    }\r
\r
    function getPassoutYearFromTC(tcData = {}) {\r
      const source = tcData.leavingDate || tcData.issueDate || tcData.generatedAt || new Date().toISOString();\r
      const date = new Date(source);\r
      if (!Number.isNaN(date.getTime())) return String(date.getFullYear());\r
      const years = String(source).match(/\\b(20\\d{2}|19\\d{2})\\b/g);\r
      return years?.length ? years[years.length - 1] : String(new Date().getFullYear());\r
    }\r
\r
    async function loadStudentArchiveRecords(student = {}) {\r
      const sid = student.studentId || student.id || "";\r
      if (!sid) return { attendance: [], fees: [], reportCards: [] };\r
      const [attendanceSnap, feesSnap, reportsSnap] = await Promise.all([\r
        getDocs(query(collection(db, "schools", currentUser.uid, "attendance"), where("studentId", "==", sid))),\r
        getDocs(query(collection(db, "schools", currentUser.uid, "fees"), where("studentId", "==", sid))),\r
        getDocs(query(collection(db, "schools", currentUser.uid, "reportCards"), where("studentId", "==", sid)))\r
      ]);\r
      return {\r
        attendance: attendanceSnap.docs.map((d) => ({ id: d.id, ...d.data() })),\r
        fees: feesSnap.docs.map((d) => ({ id: d.id, ...d.data() })),\r
        reportCards: reportsSnap.docs.map((d) => ({ id: d.id, ...d.data() }))\r
      };\r
    }\r
\r
    async function archiveTCStudent(student, tcData, tcDocId) {\r
      const archiveId = student.id || student.studentId;\r
      const existingRecords = student.records || {};\r
      const records = student._recordSource === "archive"\r
        ? {\r
            attendance: Array.isArray(existingRecords.attendance) ? existingRecords.attendance : [],\r
            fees: Array.isArray(existingRecords.fees) ? existingRecords.fees : [],\r
            reportCards: Array.isArray(existingRecords.reportCards) ? existingRecords.reportCards : []\r
          }\r
        : await loadStudentArchiveRecords(student);\r
      await setDoc(doc(db, "schools", currentUser.uid, "passedOutStudents", archiveId), {\r
        ...student,\r
        _recordSource: null,\r
        activeStudentDocId: student.id || "",\r
        originalStudentDocId: student.id || "",\r
        studentId: student.studentId || student.id || "",\r
        passoutYear: student.passoutYear || getPassoutYearFromTC(tcData),\r
        archiveReason: student.archiveReason || "Transfer Certificate",\r
        archiveSource: "transfer-certificate",\r
        status: student._recordSource === "archive" ? (student.status || "Passed Out") : "TC Issued",\r
        finalClass: student.finalClass || student.class || "",\r
        finalSection: student.finalSection || student.section || "",\r
        tcIssued: true,\r
        tcNumber: tcData.tcNumber || "",\r
        tcCertificateDocId: tcDocId || "",\r
        tcIssuedAt: tcData.generatedAt || new Date().toISOString(),\r
        transferCertificate: { id: tcDocId || "", ...tcData },\r
        records,\r
        archivedAt: serverTimestamp(),\r
        updatedAt: serverTimestamp()\r
      }, { merge: true });\r
      if (student._recordSource !== "archive") {\r
        await deleteDoc(doc(db, "schools", currentUser.uid, "students", student.id));\r
      }\r
    }\r
\r
    function studentDisplayName(student) {\r
      return student?.name || student?.studentName || "N/A";\r
    }\r
    function initials(name) {\r
      return String(name || '?').split(/\\s+/).filter(Boolean).slice(0,2).map(w => w[0].toUpperCase()).join('') || '?';\r
    }\r
\r
    function getStoredSchoolName() {\r
      return window.SchoolBranding?.getSchoolName() || "Schoolix School";\r
    }\r
    function getDefaultSchoolAddress() {\r
      return "Affiliated to State Board";\r
    }\r
\r
    window.goBack = () => window.location.href = "#/students.html";\r
\r
    function showToast(message, type = 'success') {\r
      const host = document.getElementById('toastHost');\r
      const toast = document.createElement('div');\r
      toast.className = \`toast \${type}\`;\r
      const icon = type === 'error'\r
        ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>'\r
        : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>';\r
      toast.innerHTML = \`\${icon}<span>\${esc(message)}</span>\`;\r
      host.appendChild(toast);\r
      setTimeout(() => toast.remove(), 4000);\r
    }\r
\r
    function showLoading(show, containerId) {\r
      const container = document.getElementById(containerId);\r
      if (!container) return;\r
      if (show) container.innerHTML = '<div class="loading"><div class="spinner"></div><span>Loading...</span></div>';\r
    }\r
\r
    window.switchTab = (tabName) => {\r
      document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));\r
      document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));\r
      document.querySelector(\`[onclick="switchTab('\${tabName}')"]\`).classList.add('active');\r
      document.getElementById(tabName + 'Tab').classList.add('active');\r
    };\r
\r
    window.showDeleteModal = (tcId, tcNumber) => {\r
      tcToDelete = tcId;\r
      document.getElementById('deleteMessage').textContent = \`Are you sure you want to delete TC \${tcNumber}?\`;\r
      document.getElementById('deleteModal').classList.add('open');\r
    };\r
    window.closeDeleteModal = () => {\r
      document.getElementById('deleteModal').classList.remove('open');\r
      tcToDelete = null;\r
    };\r
    window.confirmDeleteTC = async () => {\r
      if (!tcToDelete) return;\r
      try {\r
        const tcSnap = await getDoc(doc(db, "schools", currentUser.uid, "transferCertificates", tcToDelete));\r
        const tcData = tcSnap.exists() ? tcSnap.data() : null;\r
        await deleteDoc(doc(db, "schools", currentUser.uid, "transferCertificates", tcToDelete));\r
        if (tcData?.studentDocId) {\r
          await updateDoc(doc(db, "schools", currentUser.uid, "students", tcData.studentDocId), {\r
            tcIssued: false, tcNumber: "", tcIssuedAt: null, tcCertificateDocId: null, updatedAt: serverTimestamp()\r
          }).catch(() => {});\r
        } else if (tcData?.studentId) {\r
          const stSnap = await getDocs(query(collection(db, "schools", currentUser.uid, "students"), where("studentId", "==", tcData.studentId)));\r
          if (!stSnap.empty) {\r
            await updateDoc(doc(db, "schools", currentUser.uid, "students", stSnap.docs[0].id), {\r
              tcIssued: false, tcNumber: "", tcIssuedAt: null, tcCertificateDocId: null, updatedAt: serverTimestamp()\r
            }).catch(() => {});\r
          }\r
        }\r
        if (tcData?.archiveStudentDocId) {\r
          await updateDoc(doc(db, "schools", currentUser.uid, "passedOutStudents", tcData.archiveStudentDocId), {\r
            tcIssued: false,\r
            tcNumber: "",\r
            tcIssuedAt: null,\r
            tcCertificateDocId: null,\r
            transferCertificate: null,\r
            status: "Passed Out",\r
            updatedAt: serverTimestamp()\r
          }).catch(() => {});\r
        } else if (tcData?.studentId) {\r
          const archivedSnap = await getDocs(query(collection(db, "schools", currentUser.uid, "passedOutStudents"), where("studentId", "==", tcData.studentId)));\r
          if (!archivedSnap.empty) {\r
            await updateDoc(doc(db, "schools", currentUser.uid, "passedOutStudents", archivedSnap.docs[0].id), {\r
              tcIssued: false,\r
              tcNumber: "",\r
              tcIssuedAt: null,\r
              tcCertificateDocId: null,\r
              transferCertificate: null,\r
              status: "Passed Out",\r
              updatedAt: serverTimestamp()\r
            }).catch(() => {});\r
          }\r
        }\r
        showToast('TC deleted. Student record unlocked.', 'success');\r
        closeDeleteModal();\r
        await loadIssuedTCs();\r
        await loadStudents();\r
      } catch (error) {\r
        console.error("Error deleting TC:", error);\r
        showToast('Error deleting TC', 'error');\r
      }\r
    };\r
\r
    onAuthStateChanged(auth, async (user) => {\r
      if (!user) { showToast('Please login first', 'error'); return window.location.href = "#/index.html"; }\r
      currentUser = user;\r
      try {\r
        await Promise.all([loadStudents(), loadIssuedTCs()]);\r
        switchTab('generate');\r
      } catch (error) {\r
        console.error('Error initializing:', error);\r
        showToast('Error loading data: ' + error.message, 'error');\r
      }\r
    });\r
\r
    window.loadStudents = async () => {\r
      if (!currentUser) { showToast('Please login first', 'error'); return; }\r
      try {\r
        showLoading(true, "studentResult");\r
        const [studentSnap, archivedSnap] = await Promise.all([\r
          getDocs(collection(db, "schools", currentUser.uid, "students")),\r
          getDocs(collection(db, "schools", currentUser.uid, "passedOutStudents"))\r
        ]);\r
        allStudents = [];\r
        studentSnap.forEach((d) => allStudents.push({ id: d.id, _recordSource: "active", ...d.data() }));\r
        archivedSnap.forEach((d) => allStudents.push({ id: d.id, _recordSource: "archive", ...d.data() }));\r
        populateClassFilter();\r
        document.getElementById("studentResult").innerHTML = emptySearchState();\r
        showToast(\`Loaded \${allStudents.length} students including passed out records.\`, 'success');\r
      } catch (error) {\r
        console.error("Error loading students:", error);\r
        document.getElementById("studentResult").innerHTML = \`\r
          <div class="error-state">\r
            <div class="icon-circle"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg></div>\r
            <h4>Error loading students</h4>\r
            <p>\${esc(error.message)}</p>\r
            <button class="btn btn-primary btn-sm" style="margin-top:12px;" onclick="loadStudents()">Retry</button>\r
          </div>\`;\r
        showToast('Error loading students', 'error');\r
      }\r
    };\r
\r
    window.loadAllStudents = async () => { await loadStudents(); renderSearchResults(allStudents); };\r
\r
    window.searchStudent = () => {\r
      const searchName = document.getElementById("searchName")?.value?.trim().toLowerCase() || '';\r
      const searchRoll = document.getElementById("searchRoll")?.value?.trim() || '';\r
      const searchClass = document.getElementById("searchClass")?.value || '';\r
      const searchStudentId = document.getElementById("searchStudentId")?.value?.trim().toLowerCase() || '';\r
      if (!searchName && !searchRoll && !searchClass && !searchStudentId) {\r
        document.getElementById("studentResult").innerHTML = emptySearchState();\r
        return;\r
      }\r
      const found = allStudents.filter(s => {\r
        const matchesName = !searchName || (studentDisplayName(s).toLowerCase().includes(searchName));\r
        const matchesRoll = !searchRoll || (s.roll?.toString() === searchRoll);\r
        const matchesClass = !searchClass || (s.class === searchClass) || (s.finalClass === searchClass);\r
        const matchesId = !searchStudentId || (s.studentId?.toLowerCase().includes(searchStudentId));\r
        return matchesName && matchesRoll && matchesClass && matchesId;\r
      });\r
      renderSearchResults(found);\r
    };\r
\r
    function emptySearchState() {\r
      return \`<div class="empty-state">\r
        <div class="icon-circle"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></div>\r
        <h4>Search for a student</h4>\r
        <p>Enter Student Name, ID, Roll No, or Class to find students</p>\r
      </div>\`;\r
    }\r
\r
    function renderSearchResults(students) {\r
      const resultDiv = document.getElementById("studentResult");\r
      if (students.length === 0) {\r
        resultDiv.innerHTML = \`<div class="empty-state">\r
          <div class="icon-circle"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="8" y1="12" x2="16" y2="12"/></svg></div>\r
          <h4>No students found</h4><p>Try different search criteria or Show All Students</p></div>\`;\r
        return;\r
      }\r
      const html = '<div class="cards-list">' + students.map(s => {\r
        const issued = !!s.tcIssued;\r
        const archived = s._recordSource === "archive";\r
        const name = studentDisplayName(s);\r
        return \`\r
        <div class="card-item \${issued ? 'tc-issued-card' : ''}" data-student-id="\${esc(s.id)}" onclick="selectStudent('\${esc(s.id)}')">\r
          <div class="card-head">\r
            <div class="card-title">\r
              <div class="avatar">\${esc(initials(name))}</div>\r
              <span>\${esc(name)}</span>\r
            </div>\r
            \${archived ? '<span class="pill pill-warning">Passed Out</span>' : ''}\r
            \${issued ? '<span class="pill pill-danger"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>TC Issued</span>' : ''}\r
          </div>\r
          <div class="card-body-grid">\r
            <div><strong>Student ID:</strong>\${esc(s.studentId || 'N/A')}</div>\r
            <div><strong>Class:</strong>\${esc(s.finalClass || s.class || '?')}\${(s.finalSection || s.section) ? ' - ' + esc(s.finalSection || s.section) : ''}</div>\r
            <div><strong>Roll No:</strong>\${esc(s.roll || s.rollNo || '?')}</div>\r
            \${archived ? \`<div><strong>Passout Year:</strong>\${esc(s.passoutYear || 'N/A')}</div>\` : ''}\r
            \${s.father ? \`<div><strong>Father:</strong>\${esc(s.father)}</div>\` : ''}\r
            \${s.mother ? \`<div><strong>Mother:</strong>\${esc(s.mother)}</div>\` : ''}\r
            \${s.phone ? \`<div><strong>Phone:</strong>\${esc(s.phone)}</div>\` : ''}\r
          </div>\r
          \${issued ? '<div class="tc-note"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>Transfer Certificate already issued. Cannot generate again.</div>' : ''}\r
        </div>\`;\r
      }).join('') + '</div>';\r
      resultDiv.innerHTML = html;\r
    }\r
\r
    window.selectStudent = (id) => {\r
      selectedStudent = allStudents.find(s => s.id === id);\r
      if (!selectedStudent) { showToast('Student not found', 'error'); return; }\r
      if (selectedStudent.tcIssued) { showToast('TC already issued for this student. Cannot generate again.', 'error'); return; }\r
      document.querySelectorAll('.card-item').forEach(card => card.classList.remove('selected'));\r
      const cardEl = document.querySelector(\`.card-item[data-student-id="\${id}"]\`);\r
      if (cardEl) cardEl.classList.add('selected');\r
      document.getElementById("selectedStudentName").textContent = studentDisplayName(selectedStudent);\r
      document.getElementById("tcFormSection").style.display = "block";\r
      populateTCForm();\r
      document.getElementById("tcFormSection").scrollIntoView({ behavior: 'smooth' });\r
      showToast(\`\${studentDisplayName(selectedStudent)} selected. Fill TC details below.\`, 'success');\r
    };\r
\r
    function populateClassFilter() {\r
      const classSet = new Set();\r
      allStudents.forEach(s => {\r
        if (s.class) classSet.add(s.class);\r
        if (s.finalClass) classSet.add(s.finalClass);\r
      });\r
      const select = document.getElementById('searchClass');\r
      select.innerHTML = '<option value="">Select Class</option>';\r
      Array.from(classSet).sort().forEach(c => { select.innerHTML += \`<option value="\${esc(c)}">\${esc(c)}</option>\`; });\r
    }\r
\r
    function populateTCForm() {\r
      if (!selectedStudent) return;\r
      const today = new Date().toISOString().split('T')[0];\r
      const iso = (v) => v ? new Date(v).toISOString().split('T')[0] : '';\r
      const set = (id, val) => { const el = document.getElementById(id); if (el) el.value = val ?? ''; };\r
      const s = selectedStudent;\r
      set("tcNumber", \`TC-\${s.studentId || s.id || 'N/A'}-\${Date.now().toString().slice(-6)}\`);\r
      set("bookNo", "");\r
      set("applicationDate", today);\r
      set("leavingDate", today);\r
      set("issueDate", today);\r
      set("placeOfIssue", "");\r
      // Parent / guardian\r
      set("fatherName", s.father || s.fatherName || '');\r
      set("motherName", s.mother || s.motherName || '');\r
      set("guardianName", s.guardian || s.guardianName || '');\r
      set("nationality", s.nationality || 'Indian');\r
      set("religion", s.religion || '');\r
      set("category", s.category || 'General');\r
      // Student / admission\r
      set("admissionNo", s.admissionNo || s.studentId || '');\r
      set("rollNo", s.roll || s.rollNo || '');\r
      set("aadhaarPen", s.aadhaar || s.pen || '');\r
      set("dob", iso(s.dob));\r
      set("dobWords", "");\r
      set("admissionDate", iso(s.admissionDate));\r
      set("admittedClass", s.admittedClass || '');\r
      const lastClass = s.finalClass || s.class || "";\r
      const lastSection = s.finalSection || s.section || "";\r
      set("lastClass", \`\${lastClass}\${lastSection ? \` (\${lastSection})\` : ''}\`.trim());\r
      set("section", s.section || '');\r
      set("medium", s.medium || 'English');\r
      // Academic\r
      set("lastExamResult", \`Passed Class \${s.class || 'N/A'}\`);\r
      set("qualifiedPromotion", "Yes");\r
      set("promotedTo", "");\r
      set("failedRepeated", "No");\r
      set("subjects", "English, Hindi, Mathematics, Science, Social Science");\r
      set("coCurricular", "");\r
      set("nccScout", "No");\r
      set("workingDays", "220");\r
      set("daysPresent", "210");\r
      set("conduct", "Good");\r
      // Fees / remarks\r
      set("feesPaidUpto", "Paid in Full");\r
      set("feeConcession", "Nil");\r
      set("identMark1", "");\r
      set("identMark2", "");\r
      set("remarks", "Character and Conduct Good");\r
      // School / signatories\r
      set("schoolName", getStoredSchoolName());\r
      set("schoolAddress", getDefaultSchoolAddress());\r
      set("affiliationNo", "");\r
      set("udise", "");\r
      set("classTeacher", s.classTeacher || 'Class Teacher');\r
      set("clerk", "");\r
      set("principalName", 'Principal');\r
    }\r
\r
    window.showTCPREVIEW = () => {\r
      if (!selectedStudent) { showToast('Please select a student first', 'error'); return; }\r
      const data = getFormData();\r
      if (!data.reason || !data.leavingDate || !data.tcNumber) {\r
        showToast("Reason, leaving date and TC number are required.", "error"); return;\r
      }\r
      tcPreviewData = { ...data, studentId: selectedStudent.studentId, studentName: studentDisplayName(selectedStudent) };\r
      renderPreview();\r
      document.getElementById("tcPreview").style.display = "block";\r
      document.getElementById("tcFormSection").style.display = "none";\r
      document.getElementById("tcPreview").scrollIntoView({ behavior: 'smooth' });\r
    };\r
\r
    function getFormData() {\r
      const val = (id) => document.getElementById(id)?.value ?? '';\r
      return {\r
        reason: val("reason"),\r
        tcNumber: val("tcNumber"),\r
        bookNo: val("bookNo"),\r
        applicationDate: val("applicationDate"),\r
        leavingDate: val("leavingDate"),\r
        issueDate: val("issueDate"),\r
        placeOfIssue: val("placeOfIssue"),\r
        fatherName: val("fatherName"),\r
        motherName: val("motherName"),\r
        guardianName: val("guardianName"),\r
        nationality: val("nationality"),\r
        religion: val("religion"),\r
        category: val("category"),\r
        admissionNo: val("admissionNo"),\r
        rollNo: val("rollNo"),\r
        aadhaarPen: val("aadhaarPen"),\r
        dob: val("dob"),\r
        dobWords: val("dobWords"),\r
        admissionDate: val("admissionDate"),\r
        admittedClass: val("admittedClass"),\r
        lastClass: val("lastClass"),\r
        section: val("section"),\r
        medium: val("medium"),\r
        lastExamResult: val("lastExamResult"),\r
        qualifiedPromotion: val("qualifiedPromotion"),\r
        promotedTo: val("promotedTo"),\r
        failedRepeated: val("failedRepeated"),\r
        subjects: val("subjects"),\r
        coCurricular: val("coCurricular"),\r
        nccScout: val("nccScout"),\r
        workingDays: val("workingDays"),\r
        daysPresent: val("daysPresent"),\r
        conduct: val("conduct"),\r
        feesPaidUpto: val("feesPaidUpto"),\r
        feeConcession: val("feeConcession"),\r
        identMark1: val("identMark1"),\r
        identMark2: val("identMark2"),\r
        remarks: val("remarks"),\r
        schoolName: val("schoolName"),\r
        schoolAddress: val("schoolAddress"),\r
        affiliationNo: val("affiliationNo"),\r
        udise: val("udise"),\r
        classTeacher: val("classTeacher"),\r
        clerk: val("clerk"),\r
        principal: val("principalName")\r
      };\r
    }\r
\r
    // Renders an inline-editable value span so every value can be edited in the preview\r
    function ef(key, value, placeholder = '-') {\r
      return \`<span class="editable-field" contenteditable="true" data-key="\${esc(key)}" data-placeholder="\${esc(placeholder)}">\${esc(value ?? '')}</span>\`;\r
    }\r
\r
    // Reads every edited value back out of the preview into a plain object\r
    function collectEditedData() {\r
      const previewContent = document.getElementById("previewContent");\r
      const out = {};\r
      previewContent.querySelectorAll('[data-key]').forEach(node => {\r
        out[node.dataset.key] = node.textContent.trim();\r
      });\r
      out.previewHtml = previewContent.innerHTML;\r
      return out;\r
    }\r
\r
    function renderPreview() {\r
      const previewContent = document.getElementById("previewContent");\r
      const d = tcPreviewData;\r
      const issueTxt = d.issueDate ? new Date(d.issueDate).toLocaleDateString('en-IN') : new Date().toLocaleDateString('en-IN');\r
      previewContent.setAttribute('contenteditable', 'true');\r
      previewContent.spellcheck = false;\r
      previewContent.innerHTML = \`\r
        <h2>TRANSFER CERTIFICATE</h2>\r
        <div class="school-name">\${ef('schoolName', d.schoolName || getStoredSchoolName(), 'School name')}</div>\r
        <div class="school-addr">\${ef('schoolAddress', d.schoolAddress || getDefaultSchoolAddress(), 'School address')}\r
          <div style="font-size:12px; color:#64748b; margin-top:4px;">\r
            Affiliation No: \${ef('affiliationNo', d.affiliationNo, '-')} &nbsp;|&nbsp; Reg./UDISE No: \${ef('udise', d.udise, '-')}\r
          </div>\r
        </div>\r
\r
        <div class="meta-row">\r
          <div><strong>Certificate No:</strong> \${ef('tcNumber', d.tcNumber, '-')}<br/>\r
               <strong>Book No:</strong> \${ef('bookNo', d.bookNo, '-')}<br/>\r
               <strong>Admission / Register No:</strong> \${ef('admissionNo', d.admissionNo, '-')}</div>\r
          <div style="text-align:right;"><strong>Date of Issue:</strong> \${ef('issueDateText', issueTxt, '-')}<br/>\r
               <strong>Place:</strong> \${ef('placeOfIssue', d.placeOfIssue, '-')}</div>\r
        </div>\r
\r
        <div class="tc-field"><strong>1. Name of Pupil:</strong> \${ef('studentName', d.studentName)}</div>\r
        <div class="tc-field"><strong>2. Mother's Name:</strong> \${ef('motherName', d.motherName)}</div>\r
        <div class="tc-field"><strong>3. Father's Name:</strong> \${ef('fatherName', d.fatherName)}</div>\r
        <div class="tc-field"><strong>4. Guardian's Name:</strong> \${ef('guardianName', d.guardianName)}</div>\r
        <div class="tc-field"><strong>5. Nationality:</strong> \${ef('nationality', d.nationality || 'Indian')}</div>\r
        <div class="tc-field"><strong>6. Religion:</strong> \${ef('religion', d.religion)}</div>\r
        <div class="tc-field"><strong>7. Category (SC/ST/OBC/Gen):</strong> \${ef('category', d.category || 'General')}</div>\r
        <div class="tc-field"><strong>8. Aadhaar / PEN No:</strong> \${ef('aadhaarPen', d.aadhaarPen)}</div>\r
        <div class="tc-field"><strong>9. Date of Birth (in figures):</strong> \${ef('dob', safeDateText(d.dob))}</div>\r
        <div class="tc-field"><strong>10. Date of Birth (in words):</strong> \${ef('dobWords', d.dobWords)}</div>\r
        <div class="tc-field"><strong>11. Date of First Admission:</strong> \${ef('admissionDate', safeDateText(d.admissionDate))}</div>\r
        <div class="tc-field"><strong>12. Class in which Admitted:</strong> \${ef('admittedClass', d.admittedClass)}</div>\r
        <div class="tc-field"><strong>13. Class in which Last Studied:</strong> \${ef('lastClass', d.lastClass)}</div>\r
        <div class="tc-field"><strong>14. Section:</strong> \${ef('section', d.section)}</div>\r
        <div class="tc-field"><strong>15. Medium of Instruction:</strong> \${ef('medium', d.medium || 'English')}</div>\r
        <div class="tc-field"><strong>16. Roll No:</strong> \${ef('rollNo', d.rollNo)}</div>\r
        <div class="tc-field"><strong>17. Annual Exam Last Taken &amp; Result:</strong> \${ef('lastExamResult', d.lastExamResult)}</div>\r
        <div class="tc-field"><strong>18. Whether Qualified for Promotion:</strong> \${ef('qualifiedPromotion', d.qualifiedPromotion || 'Yes')}</div>\r
        <div class="tc-field"><strong>19. Promoted to Class:</strong> \${ef('promotedTo', d.promotedTo)}</div>\r
        <div class="tc-field"><strong>20. Whether Failed / Repeated:</strong> \${ef('failedRepeated', d.failedRepeated || 'No')}</div>\r
        <div class="tc-field"><strong>21. Subjects Studied:</strong> \${ef('subjects', d.subjects || 'English, Hindi, Mathematics, Science, Social Science')}</div>\r
        <div class="tc-field"><strong>22. Co-curricular Activities / Games:</strong> \${ef('coCurricular', d.coCurricular)}</div>\r
        <div class="tc-field"><strong>23. Whether NCC Cadet / Scout / Guide:</strong> \${ef('nccScout', d.nccScout || 'No')}</div>\r
        <div class="tc-field"><strong>24. Total No. of Working Days:</strong> \${ef('workingDays', d.workingDays || '220')}</div>\r
        <div class="tc-field"><strong>25. Total No. of Days Present:</strong> \${ef('daysPresent', d.daysPresent || '210')}</div>\r
        <div class="tc-field"><strong>26. School Dues Paid Upto:</strong> \${ef('feesPaidUpto', d.feesPaidUpto || 'Paid in Full')}</div>\r
        <div class="tc-field"><strong>27. Fee Concession (if any):</strong> \${ef('feeConcession', d.feeConcession || 'Nil')}</div>\r
        <div class="tc-field"><strong>28. General Conduct:</strong> \${ef('conduct', d.conduct || 'Good')}</div>\r
        <div class="tc-field"><strong>29. Date of Application for Certificate:</strong> \${ef('applicationDate', safeDateText(d.applicationDate))}</div>\r
        <div class="tc-field"><strong>30. Date of Leaving School / Struck Off:</strong> \${ef('leavingDate', safeDateText(d.leavingDate))}</div>\r
        <div class="tc-field"><strong>31. Reason for Leaving School:</strong> \${ef('reason', d.reason)}</div>\r
        <div class="tc-field"><strong>32. Identification Mark (i):</strong> \${ef('identMark1', d.identMark1)}</div>\r
        <div class="tc-field"><strong>33. Identification Mark (ii):</strong> \${ef('identMark2', d.identMark2)}</div>\r
        <div class="tc-field"><strong>34. Any Other Remarks:</strong> \${ef('remarks', d.remarks || 'Character and Conduct Good')}</div>\r
\r
        <div class="sig-row">\r
          <div class="sig-box"><div class="sig-line"></div><strong>Prepared / Clerk</strong><div>\${ef('clerk', d.clerk)}</div></div>\r
          <div class="sig-box"><div class="sig-line"></div><strong>Class Teacher</strong><div>\${ef('classTeacher', d.classTeacher)}</div></div>\r
          <div class="sig-box"><div class="sig-line"></div><strong>Principal / Head</strong><div>\${ef('principal', d.principal)}</div></div>\r
        </div>\r
      \`;\r
    }\r
\r
    window.updatePreviewFromForm = () => {\r
      if (!selectedStudent) return;\r
      tcPreviewData = { ...getFormData(), studentId: selectedStudent.studentId, studentName: studentDisplayName(selectedStudent) };\r
      renderPreview();\r
      showToast('Preview updated from form.', 'success');\r
    };\r
\r
    window.backToForm = () => {\r
      document.getElementById("tcPreview").style.display = "none";\r
      document.getElementById("tcFormSection").style.display = "block";\r
    };\r
\r
    window.finalizeTC = async () => {\r
      if (!selectedStudent) { showToast('Please select a student first', 'error'); return; }\r
      if (selectedStudent.tcIssued) { showToast('This student already has a TC issued.', 'error'); return; }\r
      try {\r
        const edited = collectEditedData();\r
        const finalData = {\r
          ...tcPreviewData,\r
          ...edited,\r
          studentId: selectedStudent.studentId,\r
          studentName: studentDisplayName(selectedStudent),\r
          class: selectedStudent.finalClass || selectedStudent.class || 'N/A',\r
          section: selectedStudent.finalSection || selectedStudent.section || '',\r
          roll: selectedStudent.roll || 'N/A',\r
          generatedBy: currentUser.uid,\r
          generatedAt: new Date().toISOString(),\r
          studentDocId: selectedStudent._recordSource === "archive" ? "" : selectedStudent.id,\r
          archiveStudentDocId: selectedStudent._recordSource === "archive" ? selectedStudent.id : ""\r
        };\r
        if (!finalData.leavingDate) { showToast('Please set leaving date', 'error'); return; }\r
        if (!finalData.tcNumber) { showToast('Please enter TC number', 'error'); return; }\r
        const duplicateSnap = await getDocs(query(\r
          collection(db, "schools", currentUser.uid, "transferCertificates"),\r
          where("studentId", "==", selectedStudent.studentId)\r
        ));\r
        if (!duplicateSnap.empty) {\r
          showToast("TC already exists for this student. Refreshing records.", "error");\r
          await loadIssuedTCs(); return;\r
        }\r
        const docRef = await addDoc(collection(db, "schools", currentUser.uid, "transferCertificates"), finalData);\r
        await archiveTCStudent(selectedStudent, finalData, docRef.id);\r
        if (selectedStudent._recordSource === "archive") {\r
          allStudents = allStudents.map((s) => s.id === selectedStudent.id ? {\r
            ...s,\r
            tcIssued: true,\r
            tcNumber: finalData.tcNumber || "",\r
            tcCertificateDocId: docRef.id,\r
            transferCertificate: { id: docRef.id, ...finalData },\r
            status: s.status || "Passed Out"\r
          } : s);\r
        } else {\r
          allStudents = allStudents.filter((s) => s.id !== selectedStudent.id);\r
        }\r
        selectedStudent = null;\r
        showToast(\`TC \${finalData.tcNumber} saved and uploaded to student dashboard.\`, 'success');\r
        await loadIssuedTCs();\r
        generateAndPrintTC(finalData);\r
        resetForm();\r
        switchTab('issued');\r
      } catch (error) {\r
        console.error("Error saving TC:", error);\r
        showToast('Error saving TC: ' + error.message, 'error');\r
      }\r
    };\r
\r
    function resetForm() {\r
      document.getElementById("tcPreview").style.display = "none";\r
      document.getElementById("tcFormSection").style.display = "none";\r
      selectedStudent = null;\r
      tcPreviewData = {};\r
      document.getElementById("selectedStudentName").textContent = '';\r
      document.querySelectorAll('#tcFormSection input, #tcFormSection select, #tcFormSection textarea').forEach(el => { el.value = ''; });\r
      ['searchName', 'searchRoll', 'searchClass', 'searchStudentId'].forEach(id => {\r
        const el = document.getElementById(id); if (el) el.value = '';\r
      });\r
      document.getElementById("studentResult").innerHTML = emptySearchState();\r
    }\r
\r
    async function loadIssuedTCs() {\r
      try {\r
        showLoading(true, "issuedTCsList");\r
        const tcSnap = await getDocs(collection(db, "schools", currentUser.uid, "transferCertificates"));\r
        allTCs = tcSnap.docs.map(d => ({ id: d.id, ...d.data() })).sort((a,b) => new Date(b.generatedAt || 0) - new Date(a.generatedAt || 0));\r
        populateTCClassFilter();\r
        renderIssuedTCs(allTCs);\r
      } catch (error) {\r
        console.error("Error loading TCs:", error);\r
        showToast('Error loading TCs', 'error');\r
      }\r
    }\r
\r
    window.searchIssuedTCs = () => {\r
      const searchStudent = document.getElementById("tcSearchStudent")?.value?.trim().toLowerCase() || '';\r
      const searchNumber = document.getElementById("tcSearchNumber")?.value?.trim().toLowerCase() || '';\r
      const searchClass = document.getElementById("tcSearchClass")?.value || '';\r
      const searchDate = document.getElementById("tcSearchDate")?.value || '';\r
      let filtered = allTCs.filter(tc => {\r
        if (searchStudent && !tc.studentName?.toLowerCase().includes(searchStudent) && !tc.studentId?.toLowerCase().includes(searchStudent)) return false;\r
        if (searchNumber && !tc.tcNumber?.toLowerCase().includes(searchNumber)) return false;\r
        if (searchClass && tc.class !== searchClass) return false;\r
        if (searchDate) {\r
          const generated = new Date(tc.generatedAt || 0);\r
          if (Number.isNaN(generated.getTime()) || generated.toISOString().split('T')[0] !== searchDate) return false;\r
        }\r
        return true;\r
      });\r
      renderIssuedTCs(filtered);\r
    };\r
\r
    function renderIssuedTCs(tcs) {\r
      const resultDiv = document.getElementById("issuedTCsList");\r
      if (tcs.length === 0) {\r
        resultDiv.innerHTML = \`<div class="empty-state">\r
          <div class="icon-circle"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></div>\r
          <h4>No TCs found</h4><p>No transfer certificates match your search criteria</p></div>\`;\r
        return;\r
      }\r
      const html = '<div class="cards-list">' + tcs.map(tc => \`\r
        <div class="card-item" style="cursor:default; border-left: 4px solid var(--success);">\r
          <div class="card-head">\r
            <div class="card-title">\r
              <div class="avatar" style="background: var(--success-50); color: var(--success);">\r
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>\r
              </div>\r
              <span>TC: \${esc(tc.tcNumber || 'N/A')}</span>\r
            </div>\r
            <span class="pill pill-success">Issued</span>\r
          </div>\r
          <div class="card-body-grid">\r
            <div><strong>Student:</strong>\${esc(tc.studentName || 'N/A')}</div>\r
            <div><strong>ID:</strong>\${esc(tc.studentId || 'N/A')}</div>\r
            <div><strong>Class:</strong>\${esc(tc.class || 'N/A')}\${tc.section ? \` (\${esc(tc.section)})\` : ''}</div>\r
            <div><strong>Issued:</strong>\${esc(safeDateText(tc.generatedAt))}</div>\r
            <div style="grid-column: 1 / -1;"><strong>Reason:</strong>\${esc(tc.reason || '')}</div>\r
          </div>\r
          <div class="toolbar" style="margin-top: 14px;">\r
            <button class="btn btn-primary btn-sm" onclick="printTC('\${esc(tc.id)}')">\r
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>\r
              Print TC\r
            </button>\r
            <button class="btn btn-secondary btn-sm" onclick="downloadTCPDF('\${esc(tc.id)}')">\r
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>\r
              Download PDF\r
            </button>\r
          </div>\r
        </div>\r
      \`).join('') + '</div>';\r
      resultDiv.innerHTML = html;\r
    }\r
\r
    function populateTCClassFilter() {\r
      const classSet = new Set();\r
      allTCs.forEach(tc => { if (tc.class) classSet.add(tc.class); });\r
      const select = document.getElementById('tcSearchClass');\r
      select.innerHTML = '<option value="">All Classes</option>';\r
      Array.from(classSet).sort().forEach(c => { select.innerHTML += \`<option value="\${esc(c)}">\${esc(c)}</option>\`; });\r
    }\r
\r
    function generateAndPrintTC(tcData) {\r
      const htmlContent = generateTCHTML(tcData);\r
      const printWindow = window.open('', '_blank');\r
      if (!printWindow) { showToast("Popup blocked. Allow popups to print TC.", "error"); return; }\r
      printWindow.document.write(htmlContent);\r
      printWindow.document.close();\r
      setTimeout(() => printWindow.print(), 500);\r
    }\r
\r
    function tcPrintStyles() {\r
      return \`\r
        @page { size: A4; margin: 16mm; }\r
        body { font-family: 'Times New Roman', Georgia, serif; color: #111; padding: 0; margin: 0; }\r
        .tc-container { max-width: 800px; margin: 0 auto; padding: 30px; border: 2px solid #333; }\r
        h2 { text-align: center; font-size: 26px; letter-spacing: 4px; margin: 0 0 8px; }\r
        .school-name { text-align: center; font-size: 20px; font-weight: bold; }\r
        .school-addr { text-align: center; font-size: 14px; color: #444; padding-bottom: 14px; margin-bottom: 20px; border-bottom: 2px double #333; }\r
        .meta-row { display: flex; justify-content: space-between; margin-bottom: 22px; font-size: 14px; gap: 20px; }\r
        .tc-field { font-size: 14.5px; margin: 8px 0; }\r
        .tc-field strong { display: inline-block; min-width: 300px; }\r
        .sig-row { display: flex; justify-content: space-between; margin-top: 64px; gap: 24px; }\r
        .sig-box { text-align: center; flex: 1; }\r
        .sig-line { border-top: 1.5px solid #333; margin-bottom: 6px; height: 40px; }\r
        /* Neutralise the on-screen editable styling for a clean printout */\r
        .editable-field { border: none !important; background: transparent !important; padding: 0 !important; min-width: 0 !important; box-shadow: none !important; font: inherit !important; }\r
        [contenteditable] { outline: none; }\r
        @media print { body { margin: 0; padding: 0; } .tc-container { border: none; } }\r
      \`;\r
    }\r
\r
    function generateTCHTML(tcData) {\r
      // Prefer the exact certificate the user edited inline in the preview\r
      const body = tcData.previewHtml\r
        ? tcData.previewHtml\r
        : fallbackTCBody(tcData);\r
      return \`<!DOCTYPE html><html><head>\r
<meta charset="UTF-8">\r
        <title>Transfer Certificate - \${esc(tcData.studentName || '')}</title>\r
        <style>\${tcPrintStyles()}</style>\r
</head><body><div class="tc-container">\${body}</div></body></html>\`;\r
    }\r
\r
    // Used only when no inline-edited HTML was stored (older records)\r
    function fallbackTCBody(t) {\r
      const row = (n, label, value) => \`<div class="tc-field"><strong>\${n}. \${label}:</strong> \${esc(value ?? '')}</div>\`;\r
      return \`\r
        <h2>TRANSFER CERTIFICATE</h2>\r
        <div class="school-name">\${esc(t.schoolName || getStoredSchoolName())}</div>\r
        <div class="school-addr">\${esc(t.schoolAddress || getDefaultSchoolAddress())}\r
          <div style="font-size:12px;color:#555;margin-top:4px;">Affiliation No: \${esc(t.affiliationNo || '-')} | Reg./UDISE No: \${esc(t.udise || '-')}</div>\r
        </div>\r
        <div class="meta-row">\r
          <div><strong>Certificate No:</strong> \${esc(t.tcNumber || '')}<br/><strong>Book No:</strong> \${esc(t.bookNo || '-')}<br/><strong>Admission / Register No:</strong> \${esc(t.admissionNo || t.rollNo || '')}</div>\r
          <div style="text-align:right;"><strong>Date of Issue:</strong> \${esc(safeDateText(t.issueDate || t.generatedAt))}<br/><strong>Place:</strong> \${esc(t.placeOfIssue || '-')}</div>\r
        </div>\r
        \${row(1, "Name of Pupil", t.studentName)}\r
        \${row(2, "Mother's Name", t.motherName)}\r
        \${row(3, "Father's Name", t.fatherName)}\r
        \${row(4, "Guardian's Name", t.guardianName)}\r
        \${row(5, "Nationality", t.nationality || 'Indian')}\r
        \${row(6, "Religion", t.religion)}\r
        \${row(7, "Category (SC/ST/OBC/Gen)", t.category || 'General')}\r
        \${row(8, "Aadhaar / PEN No", t.aadhaarPen)}\r
        \${row(9, "Date of Birth (in figures)", safeDateText(t.dob))}\r
        \${row(10, "Date of Birth (in words)", t.dobWords)}\r
        \${row(11, "Date of First Admission", safeDateText(t.admissionDate))}\r
        \${row(12, "Class in which Admitted", t.admittedClass)}\r
        \${row(13, "Class in which Last Studied", t.lastClass)}\r
        \${row(14, "Section", t.section)}\r
        \${row(15, "Medium of Instruction", t.medium || 'English')}\r
        \${row(16, "Roll No", t.rollNo)}\r
        \${row(17, "Annual Exam Last Taken & Result", t.lastExamResult)}\r
        \${row(18, "Whether Qualified for Promotion", t.qualifiedPromotion || 'Yes')}\r
        \${row(19, "Promoted to Class", t.promotedTo)}\r
        \${row(20, "Whether Failed / Repeated", t.failedRepeated || 'No')}\r
        \${row(21, "Subjects Studied", t.subjects || 'English, Hindi, Mathematics, Science, Social Science')}\r
        \${row(22, "Co-curricular Activities / Games", t.coCurricular)}\r
        \${row(23, "Whether NCC Cadet / Scout / Guide", t.nccScout || 'No')}\r
        \${row(24, "Total No. of Working Days", t.workingDays || '220')}\r
        \${row(25, "Total No. of Days Present", t.daysPresent || '210')}\r
        \${row(26, "School Dues Paid Upto", t.feesPaidUpto || 'Paid in Full')}\r
        \${row(27, "Fee Concession (if any)", t.feeConcession || 'Nil')}\r
        \${row(28, "General Conduct", t.conduct || 'Good')}\r
        \${row(29, "Date of Application for Certificate", safeDateText(t.applicationDate))}\r
        \${row(30, "Date of Leaving School / Struck Off", safeDateText(t.leavingDate))}\r
        \${row(31, "Reason for Leaving School", t.reason)}\r
        \${row(32, "Identification Mark (i)", t.identMark1)}\r
        \${row(33, "Identification Mark (ii)", t.identMark2)}\r
        \${row(34, "Any Other Remarks", t.remarks || 'Character and Conduct Good')}\r
        <div class="sig-row">\r
          <div class="sig-box"><div class="sig-line"></div><strong>Prepared / Clerk</strong><div>\${esc(t.clerk || '')}</div></div>\r
          <div class="sig-box"><div class="sig-line"></div><strong>Class Teacher</strong><div>\${esc(t.classTeacher || 'Class Teacher')}</div></div>\r
          <div class="sig-box"><div class="sig-line"></div><strong>Principal / Head</strong><div>\${esc(t.principal || 'Principal')}</div></div>\r
        </div>\`;\r
    }\r
\r
    window.printTC = (tcId) => { const tc = allTCs.find(t => t.id === tcId); if (tc) generateAndPrintTC(tc); };\r
    window.downloadTCPDF = (tcId) => { const tc = allTCs.find(t => t.id === tcId); if (tc) generateAndPrintTC(tc); };\r
\r
    document.addEventListener('DOMContentLoaded', () => {\r
      document.getElementById('confirmDelete')?.addEventListener('click', window.confirmDeleteTC);\r
    });\r
    document.getElementById('confirmDelete')?.addEventListener('click', window.confirmDeleteTC);\r
  `},{attributes:{type:"module",src:"access-control.js"},text:""},{attributes:{src:"schoolix-polish.js"},text:""},{attributes:{src:"admin-shell.js?v=navbar-20260721"},text:""}]};export{e as default};
