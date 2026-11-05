const e={file:"teacher-dashboard.html",title:"Teacher Dashboard — Schoolix",htmlClass:"",bodyClass:"sx-dark-portal",body:`\r
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
<div class="sidebar-overlay" id="sidebarOverlay" onclick="closeSidebar()"></div>\r
\r
<aside class="teacher-sidebar" id="teacherSidebar">\r
  <div class="sidebar-logo">\r
    <div class="logo-mark">\r
      <img src="schoolix-app-icon.svg" alt="Schoolix logo">\r
    </div>\r
    <div>\r
      <div class="logo-text">Schoolix</div>\r
      <div class="logo-sub" id="sidebarSchoolName">Loading...</div>\r
    </div>\r
  </div>\r
  <nav class="sidebar-nav">\r
    <div class="nav-section">Teacher</div>\r
    <div class="nav-item active" data-tab="home" onclick="switchTab('home')"><div class="nav-icon"><span class="ui-icon" data-icon="home"></span></div>Home</div>\r
    <div class="nav-item" data-tab="students" onclick="switchTab('students')"><div class="nav-icon"><span class="ui-icon" data-icon="users"></span></div>Students</div>\r
    <div class="nav-item" data-tab="timetable" onclick="switchTab('timetable')"><div class="nav-icon"><span class="ui-icon" data-icon="calendar-days"></span></div>Timetable</div>\r
    <div class="nav-item" data-tab="notices" onclick="switchTab('notices')"><div class="nav-icon"><span class="ui-icon" data-icon="bell"></span></div>Notices</div>\r
    <div class="nav-item" data-tab="qrCheckin" onclick="switchTab('qrCheckin')"><div class="nav-icon"><span class="ui-icon" data-icon="scan"></span></div>QR Check-In</div>\r
    <div class="nav-item" data-tab="myAttendance" onclick="switchTab('myAttendance')"><div class="nav-icon"><span class="ui-icon" data-icon="clipboard-check"></span></div>My Attendance</div>\r
    <div class="nav-section" style="margin-top:8px;">Class Work</div>\r
    <div class="nav-item" data-tab="attendance" onclick="switchTab('attendance')"><div class="nav-icon"><span class="ui-icon" data-icon="clipboard-check"></span></div>Student Attendance</div>\r
    <div class="nav-item" data-tab="report" onclick="switchTab('report')"><div class="nav-icon"><span class="ui-icon" data-icon="file-text"></span></div>Report Cards</div>\r
  </nav>\r
  <div class="sidebar-footer">\r
    <button class="logout-btn" onclick="logout()"><div class="nav-icon"><span class="ui-icon" data-icon="logout"></span></div>Sign Out</button>\r
  </div>\r
</aside>\r
\r
<div class="main-area">\r
  <header class="topbar">\r
    <div class="topbar-left">\r
      <button class="mobile-toggle" type="button" onclick="openSidebar()" aria-label="Open menu">\r
        <span class="ui-icon" data-icon="menu"></span>\r
      </button>\r
      <div class="page-label" id="topbarTitle">Dashboard</div>\r
    </div>\r
    <div class="topbar-right">\r
      <span class="lock-badge unlocked" id="topbarSessionBadge">No Active Session</span>\r
      <div class="session-selector-wrap"><label>Session</label><div id="topbarSessionSlot"></div></div>\r
      <div class="class-selector-wrap" id="teacherClassSelectorWrap">\r
        <label for="teacherClassSelector">Class</label>\r
        <select id="teacherClassSelector" class="search-input" onchange="onTeacherClassChange()"></select>\r
      </div>\r
      <button class="btn btn-neutral btn-sm" onclick="refreshTeacherDashboard()"><span class="ui-icon" data-icon="refresh"></span>Refresh</button>\r
      <div class="teacher-chip">\r
        <button type="button" class="avatar" id="topbarAvatar" onclick="openTeacherPhotoPreview()">T</button>\r
        <span id="topbarTeacherName">Teacher</span>\r
      </div>\r
    </div>\r
  </header>\r
  <main class="page-content">\r
\r
<div class="shell">\r
  <!-- HEADER -->\r
  <header class="header teacher-dashboard-summary">\r
    <div class="header-left">\r
      <div class="header-eyebrow" id="schoolNameLabel">Schoolix</div>\r
      <div class="header-name" id="teacherNameDisplay">Loading…</div>\r
      <div class="header-meta">\r
        <span id="classLabel"><span class="badge-class" id="classSectionBadge">—</span></span>\r
        <span class="badge-class" id="teacherIdLabel">ID: --</span>\r
        <span id="emailLabel" style="opacity:0.75;"></span>\r
      </div>\r
    </div>\r
    <div class="teacher-hero-profile">\r
      <button type="button" class="teacher-hero-photo" id="teacherHeroPhoto" onclick="openTeacherPhotoPreview()">T</button>\r
      <div class="teacher-hero-caption">\r
        <strong>My Photo</strong>\r
        <span></span>\r
      </div>\r
    </div>\r
    <div class="header-actions">\r
      <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">\r
        <span class="lock-badge unlocked" id="currentSessionBadge">No Active Session</span>\r
        <select id="headerSessionSelector" class="search-input" onchange="onHeaderSessionChange()" style="width:auto;min-width:150px;background:rgba(255,255,255,0.12);color:#fff;border-color:rgba(255,255,255,0.3);">\r
          <option value="">Loading...</option>\r
        </select>\r
      </div>\r
      <button class="btn btn-neutral" style="color:#fff;border-color:rgba(255,255,255,0.3);" onclick="logout()"><span class="ui-icon" data-icon="logout"></span>Logout</button>\r
    </div>\r
  </header>
  <script>window.paintEarlyTeacherIdentity?.();<\/script>

  <!-- STATS ROW -->\r
  <div class="stats-row teacher-dashboard-summary" id="statsRow">\r
    <div class="stat-card primary">\r
      <div class="stat-label"><span class="ui-icon" data-icon="users"></span>Total Students</div>\r
      <div class="stat-value" id="statTotal">0</div>\r
      <div class="stat-sub" id="statClassInfo">Class —</div>\r
    </div>\r
    <div class="stat-card success">\r
      <div class="stat-label"><span class="ui-icon" data-icon="check-circle"></span>Present Today</div>\r
      <div class="stat-value" id="statPresent">0</div>\r
      <div class="stat-sub" id="statTodayDate">—</div>\r
    </div>\r
    <div class="stat-card danger">\r
      <div class="stat-label"><span class="ui-icon" data-icon="x-circle"></span>Absent Today</div>\r
      <div class="stat-value" id="statAbsent">0</div>\r
      <div class="stat-sub">Marked today</div>\r
    </div>\r
    <div class="stat-card info">\r
      <div class="stat-label"><span class="ui-icon" data-icon="activity"></span>Avg Attendance</div>\r
      <div class="stat-value" id="statAvgAtt">—</div>\r
      <div class="stat-sub">All-time class avg</div>\r
    </div>\r
    <div class="stat-card warning">\r
      <div class="stat-label"><span class="ui-icon" data-icon="wallet"></span>My Net Salary</div>\r
      <div class="stat-value" id="statNetSalary">₹0</div>\r
      <div class="stat-sub" id="statSalaryMonth">—</div>\r
    </div>\r
  </div>\r
\r
  <!-- SALARY CARD -->\r
  <div class="salary-card teacher-dashboard-summary" id="salarySection">\r
    <div class="section-title">\r
      <span class="section-heading"><span class="ui-icon" data-icon="wallet"></span>My Salary This Month</span>\r
      <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;">\r
        <input type="month" id="salaryMonthPicker" class="search-input" style="min-width:160px;max-width:180px;">\r
        <button class="btn btn-primary btn-sm" onclick="loadSalaryData()"><span class="ui-icon" data-icon="refresh"></span>Load</button>\r
      </div>\r
    </div>\r
\r
    <div class="salary-breakdown" id="salaryBreakdown">\r
      <div class="sal-box blue">\r
        <div class="sal-num" id="salBase">₹0</div>\r
        <div class="sal-lbl">Base Salary</div>\r
      </div>\r
      <div class="sal-box green">\r
        <div class="sal-num" id="salPresentDays">0</div>\r
        <div class="sal-lbl">Present Days</div>\r
      </div>\r
      <div class="sal-box orange">\r
        <div class="sal-num" id="salHalfDays">0</div>\r
        <div class="sal-lbl">Half Days</div>\r
      </div>\r
      <div class="sal-box red">\r
        <div class="sal-num" id="salAbsentDays">0</div>\r
        <div class="sal-lbl">Absent Days</div>\r
      </div>\r
      <div class="sal-box red">\r
        <div class="sal-num" id="salDeduction">₹0</div>\r
        <div class="sal-lbl">Deduction</div>\r
      </div>\r
      <div class="sal-box green">\r
        <div class="sal-num" id="salNet">₹0</div>\r
        <div class="sal-lbl">Net Salary</div>\r
      </div>\r
      <div class="sal-box green">\r
        <div class="sal-num" id="salPaid">₹0</div>\r
        <div class="sal-lbl">Paid</div>\r
      </div>\r
      <div class="sal-box orange">\r
        <div class="sal-num" id="salPending">₹0</div>\r
        <div class="sal-lbl">Remaining</div>\r
      </div>\r
    </div>\r
\r
    <div class="salary-bar-wrap">\r
      <div class="salary-bar-label">\r
        <span>Payment Progress</span>\r
        <span id="salProgressLabel">0% paid</span>\r
      </div>\r
      <div class="salary-bar"><div class="salary-bar-fill" id="salProgressBar" style="width:0%"></div></div>\r
    </div>\r
\r
    <div id="salPaymentHistory" style="margin-top:12px;"></div>\r
  </div>\r
\r
 \r
\r
  <!-- MAIN TABS -->\r
  <div class="tabs-wrap">\r
    <div class="tabs-nav">\r
      <button class="tab-btn active" data-tab="students" onclick="switchTab('students')"><span class="ui-icon" data-icon="users"></span>Students</button>\r
      <button class="tab-btn" data-tab="timetable" onclick="switchTab('timetable')"><span class="ui-icon" data-icon="calendar-days"></span>Timetable</button>\r
      <button class="tab-btn" data-tab="qrCheckin" onclick="switchTab('qrCheckin')"><span class="ui-icon" data-icon="scan"></span>QR Check-In</button>\r
      <button class="tab-btn" data-tab="myAttendance" onclick="switchTab('myAttendance')"><span class="ui-icon" data-icon="clipboard-check"></span>My Attendance</button>\r
      <button class="tab-btn" data-tab="attendance" onclick="switchTab('attendance')"><span class="ui-icon" data-icon="clipboard-check"></span>Attendance</button>\r
      <button class="tab-btn" data-tab="report" onclick="switchTab('report')"><span class="ui-icon" data-icon="file-text"></span>Report Cards</button>\r
      <button class="tab-btn" data-tab="notices" onclick="switchTab('notices')"><span class="ui-icon" data-icon="bell"></span>Notices</button>\r
    </div>\r
\r
    <!-- STUDENTS TAB -->\r
    <div class="tab-content active" id="studentsTab">\r
      <div class="search-row">\r
        <input class="search-input" id="studentAttendanceBelow" type="number" min="0" max="100" step="1" placeholder="Attendance below %">\r
        <input class="search-input" id="studentSearch" placeholder="Search by name, ID or roll no…">\r
      </div>\r
      <div id="studentsList"><div class="empty-state">Loading students…</div></div>\r
      <div class="section-actions" style="margin-bottom:14px;">\r
        <button class="btn btn-primary btn-sm" onclick="printClassStudentList()"><span class="ui-icon" data-icon="printer"></span>Print Class List</button>\r
        <button class="btn btn-warning btn-sm" onclick="printDueFeeList()"><span class="ui-icon" data-icon="printer"></span>Print Fee Due List</button>\r
        <button class="btn btn-neutral btn-sm" onclick="printLowAttendanceList()"><span class="ui-icon" data-icon="printer"></span>Print Attendance Filter</button>\r
      </div>\r
    </div>\r
\r
    <!-- TIMETABLE TAB -->\r
    <div class="tab-content" id="timetableTab">\r
      <div class="section-title" style="margin-bottom:20px;">\r
        <span class="section-heading"><span class="ui-icon" data-icon="calendar-days"></span>My Timetable</span>\r
        <div class="section-actions">\r
          <button class="btn btn-neutral btn-sm" onclick="loadTeacherTimetable(true)"><span class="ui-icon" data-icon="refresh"></span>Refresh</button>\r
          <button class="btn btn-primary btn-sm" onclick="printAssignedTimetable()"><span class="ui-icon" data-icon="printer"></span>Print Assigned</button>\r
          <button class="btn btn-success btn-sm" onclick="printClassTimetable()"><span class="ui-icon" data-icon="printer"></span>Print Class</button>\r
        </div>\r
      </div>\r
      \r
      <div class="timetable-container">\r
        <div class="timetable-header">\r
          <h3><span class="section-heading"><span class="ui-icon" data-icon="school"></span>Class Teacher Responsibilities</span></h3>\r
          <div id="classTeacherInfo" class="class-teacher-info">\r
            <!-- Class teacher assignments will be loaded here -->\r
          </div>\r
        </div>\r
        \r
        <div class="timetable-grid" id="teacherTimetable">\r
          <div class="empty-state">Loading timetable...</div>\r
        </div>\r
      </div>\r
    </div>\r
\r
    <div class="tab-content" id="qrCheckinTab">\r
      <div class="section-title" style="margin-bottom:20px;">\r
        <span class="section-heading"><span class="ui-icon" data-icon="scan"></span>Teacher QR Check-In</span>\r
        <div class="section-actions">\r
          <button class="btn btn-success btn-sm" onclick="startTeacherQrScanner()"><span class="ui-icon" data-icon="scan"></span>Scan QR</button>\r
          <button class="btn btn-neutral btn-sm" onclick="stopTeacherQrScanner()"><span class="ui-icon" data-icon="x-circle"></span>Stop</button>\r
        </div>\r
      </div>\r
      <div class="qr-checkin-card">\r
        <div class="qr-video-wrap">\r
          <video id="teacherQrVideo" muted playsinline></video>\r
          <div id="teacherQrCameraHint" class="empty-state" style="background:transparent;color:#cbd5e1;">Camera preview will appear here.</div>\r
        </div>\r
        <div>\r
          <div class="qr-status-box" id="teacherQrStatus">Ask admin to generate your unique attendance QR</div>\r
          <div class="qr-manual-row">\r
            <input class="search-input" id="teacherQrManualCode" placeholder="Paste QR code if camera scan is unavailable">\r
            <button class="btn btn-primary" onclick="submitTeacherQrManualCode()"><span class="ui-icon" data-icon="check-circle"></span>Mark Attendance</button>\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
\r
    <div class="tab-content" id="myAttendanceTab">\r
      <div class="section-title" style="margin-bottom:20px;">\r
        <span class="section-heading"><span class="ui-icon" data-icon="clipboard-check"></span>My Attendance Details</span>\r
        <div class="section-actions">\r
          <input type="month" id="teacherAttendanceMonth" class="search-input" style="min-width:160px;max-width:190px;">\r
          <button class="btn btn-neutral btn-sm" onclick="loadTeacherAttendanceHistory()"><span class="ui-icon" data-icon="refresh"></span>Load</button>\r
        </div>\r
      </div>\r
      <div id="teacherAttendanceHistory" class="teacher-attendance-history">\r
        <div class="empty-state">Open this page to view your daily check-in and check-out details.</div>\r
      </div>\r
    </div>\r
\r
    <!-- ATTENDANCE TAB -->\r
    <div class="tab-content" id="attendanceTab">\r
      <div class="att-toolbar-row">\r
        <div>\r
          <label style="font-size:12px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:0.08em;display:block;margin-bottom:6px;">Date</label>\r
          <input type="date" id="attendanceDate" class="search-input" style="width:auto;">\r
        </div>\r
        <button class="btn btn-success btn-sm" data-attendance-edit-control="true" onclick="bulkMark('Present')"><span class="ui-icon" data-icon="check-circle"></span>All Present</button>\r
        <button class="btn btn-danger btn-sm" data-attendance-edit-control="true" onclick="bulkMark('Absent')"><span class="ui-icon" data-icon="x-circle"></span>All Absent</button>\r
        <button class="btn btn-warning btn-sm" data-attendance-edit-control="true" onclick="bulkMark('Half Day')"><span class="ui-icon" data-icon="clock"></span>All Half Day</button>\r
        <button class="btn btn-neutral btn-sm" onclick="reloadAttendanceTab()"><span class="ui-icon" data-icon="refresh"></span>Reload</button>\r
        <button class="btn btn-neutral btn-sm" onclick="printDailyAttendance()"><span class="ui-icon" data-icon="printer"></span>Print Attendance</button>\r
        <button class="btn btn-primary" id="saveAttBtn" data-attendance-edit-control="true" onclick="saveAttendance()"><span class="ui-icon" data-icon="save"></span>Save Attendance</button>\r
        <span class="lock-badge unlocked" id="lockBadge">Editable</span>\r
      </div>\r
\r
      <div id="lockInfo"></div>\r
\r
      <div class="att-mini-stats">\r
        <div class="att-mini p"><strong id="attP">0</strong><span>Present</span></div>\r
        <div class="att-mini a"><strong id="attA">0</strong><span>Absent</span></div>\r
        <div class="att-mini h"><strong id="attH">0</strong><span>Half Day</span></div>\r
        <div class="att-mini"><strong id="attPct">0%</strong><span>Attendance %</span></div>\r
      </div>\r
\r
      <div id="attendanceList"><div class="empty-state">Select a date and load attendance.</div></div>\r
    </div>\r
\r
    <!-- REPORT CARDS TAB -->\r
    <div class="tab-content" id="reportTab">\r
      <div class="section-title" style="margin-bottom:14px;">\r
        <span class="section-heading"><span class="ui-icon" data-icon="file-text"></span>Subjects & Marks</span>\r
        <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;">\r
          <!-- Term Dropdown -->\r
          <div class="term-dropdown-wrap">\r
            <label>Select Term</label>\r
            <select id="reportTermSelect" class="term-select" onchange="onTermSelectChange()">\r
              <option value="">Select a term</option>\r
            </select>\r
          </div>\r
          <button class="btn btn-neutral btn-sm" onclick="loadReportTab()"><span class="ui-icon" data-icon="refresh"></span>Refresh</button>\r
          <button class="btn btn-primary btn-sm" onclick="openAddSubjectModal()"><span class="ui-icon" data-icon="plus"></span>Add Subject</button>\r
          <button class="btn btn-primary btn-sm" id="saveMarksBtn" onclick="saveAllMarks()"><span class="ui-icon" data-icon="save"></span>Save Marks</button>\r
          <button class="btn btn-success btn-sm" onclick="generateAllReports()"><span class="ui-icon" data-icon="file-check"></span>Generate Term Reports</button>\r
          <button class="btn btn-warning btn-sm" onclick="showGeneratedReports()"><span class="ui-icon" data-icon="eye"></span>View Generated</button>\r
        </div>\r
      </div>\r
      <div id="activeTermBanner" style="display:none;" class="info-box success"></div>\r
      <div style="font-size:13px;color:var(--muted);margin:0 0 14px;">Terms are created by admin in Additional Settings. Select a term here to enter marks for your assigned class.</div>\r
      <div id="reportContent"><div class="empty-state">Select a term above to start entering marks.</div></div>\r
    </div>\r
\r
    <div class="tab-content" id="noticesTab">\r
      <div class="section-title dashboard-notice-section-title">\r
        <span class="section-heading"><span class="ui-icon" data-icon="bell"></span>School Notices</span>\r
      </div>\r
      <section class="dashboard-notice-board" data-dashboard-notices data-notice-role="teacher">\r
        <div class="dashboard-notice-toolbar">\r
          <div class="dashboard-notice-heading">\r
            <span class="dashboard-notice-heading-icon"><svg viewBox="0 0 24 24"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/></svg></span>\r
            <div><h2>Latest Notices</h2><p data-notice-summary>Loading staff announcements...</p></div>\r
          </div>\r
          <div class="dashboard-notice-actions"><span class="dashboard-notice-count" data-notice-count>--</span><button class="dashboard-notice-refresh" data-notice-refresh type="button"><svg viewBox="0 0 24 24"><path d="M20 11a8.1 8.1 0 1 0 2 5M20 4v7h-7"/></svg>Refresh</button></div>\r
        </div>\r
        <div class="dashboard-notice-list" data-notice-list aria-live="polite"><div class="dashboard-notice-empty"><span class="dashboard-notice-spinner"></span><strong>Loading notices</strong><small>Please wait a moment...</small></div></div>\r
      </section>\r
    </div>\r
  </div>\r
</div>\r
\r
  </main>\r
</div>\r
\r
<!-- ADD SUBJECT MODAL -->\r
<div class="modal-overlay" id="subjectModal">\r
  <div class="modal-box">\r
    <div class="modal-head">\r
      <h3>Add Subject</h3>\r
      <button class="btn btn-neutral btn-sm" onclick="closeSubjectModal()">Close</button>\r
    </div>\r
    <div class="modal-body">\r
      <div style="display:flex;gap:10px;align-items:flex-end;flex-wrap:wrap;">\r
        <div style="flex:1;min-width:220px;">\r
          <label style="font-size:12px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:0.06em;display:block;margin-bottom:6px;">Subject Name</label>\r
          <input class="search-input" id="newSubjectInput" placeholder="e.g. Mathematics">\r
        </div>\r
        <div style="width:160px;">\r
          <label style="font-size:12px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:0.06em;display:block;margin-bottom:6px;">Max Marks</label>\r
          <input class="search-input" id="newSubjectMaxInput" type="number" min="1" step="1" value="100" placeholder="100">\r
        </div>\r
        <button class="btn btn-success" onclick="addSubjectGlobal()">Add</button>\r
      </div>\r
      <div id="subjectListInModal" style="margin-top:16px;"></div>\r
    </div>\r
  </div>\r
</div>\r
\r
<!-- STUDENT DETAIL MODAL -->\r
<div class="modal-overlay" id="studentModal">\r
  <div class="modal-box">\r
    <div class="modal-head">\r
      <h3 id="modalStudentTitle">Student</h3>\r
      <button class="btn btn-neutral btn-sm" onclick="closeStudentModal()">Close</button>\r
    </div>\r
    <div class="modal-body" id="modalStudentBody"></div>\r
  </div>\r
</div>\r
\r
<div class="modal-overlay" id="photoPreviewModal">\r
  <div class="modal-box">\r
    <div class="modal-head">\r
      <h3 id="photoPreviewTitle">Photo</h3>\r
      <button class="btn btn-neutral btn-sm" onclick="closePhotoPreview()">Close</button>\r
    </div>\r
    <div class="modal-body" style="display:grid;place-items:center;background:#020617;border-radius:14px;">\r
      <img id="photoPreviewImage" alt="Preview" style="max-width:100%;max-height:72vh;object-fit:contain;border-radius:12px;">\r
    </div>\r
  </div>\r
</div>\r
\r
\r
<script src="school-branding.js"><\/script>\r
<script type="module">\r
import { initializeApp } from "./firebase-compat.js";\r
import {\r
  getAuth, signOut, onAuthStateChanged\r
} from "./firebase-compat.js";\r
import {\r
  getFirestore, doc, getDoc, getDocs, setDoc, updateDoc, addDoc, deleteDoc,\r
  collection, query, where, orderBy, limit, serverTimestamp, clearFirestoreReadCache\r
} from "./firebase-compat.js";\r
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
const auth = getAuth(app);\r
const db = getFirestore(app);\r
\r
const SUPABASE_URL = "https://ezkmeedcqetztkeppxil.supabase.co";\r
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6a21lZWRjcWV0enRrZXBweGlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxMjk5NjAsImV4cCI6MjA5MzcwNTk2MH0.1davJ_NYkFhHToUtcFBR0kA6dk0-cOkaIbK2SCObkQg";\r
const ABSENCE_EMAIL_FUNCTION_URL = \`\${SUPABASE_URL}/functions/v1/send-absence-email\`;\r
\r
let teacherData = {};\r
let adminId = "";\r
let activeSessionLocked = false;\r
let activeSessionLabel = "";\r
let activeSessionId = "";\r
let schoolActiveSessionId = "";\r
let sessionContextReady = false;\r
let teacherUserSelectedSessionId = "";\r
let teacherSessionLoadError = "";\r
let sessionsLoadedForSchool = "";\r
let teacherResumeRefreshAt = 0;\r
let teacherResumeRefreshPromise = null;\r
let allStudents = [];\r
let allFees = [];\r
let allAttendance = [];\r
let allSessions = [];\r
let activeClassSection = { class: "", section: "" };\r
let teacherAssignedPlacements = [];\r
let studentScopeMode = "direct";\r
let salaryRecord = null;\r
let isLocked = false;\r
let teacherQrStream = null;\r
let teacherQrScanTimer = null;\r
let teacherQrScanBusy = false;\r
let attendanceAccessEnabled = true;\r
// Term state\r
let allTerms = [];        // [{id, label, termKey, createdAt}]\r
let activeTermKey = "";   // currently selected termKey\r
let reportTermLocks = {};\r
let marksDirty = false;\r
\r
const ATTENDANCE_EDIT_WINDOW_MS = 48 * 60 * 60 * 1000;\r
const TEACHER_DATA_CACHE_TTL_MS = 30 * 60 * 1000;\r
const TEACHER_SESSION_CACHE_TTL_MS = 15 * 60 * 1000;\r
const CLASS_SEQUENCE = ["PG", "LKG", "UKG", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];\r
const ROMAN_TO_NUMERIC_CLASS = {\r
  I: "1", II: "2", III: "3", IV: "4", V: "5", VI: "6",\r
  VII: "7", VIII: "8", IX: "9", X: "10", XI: "11", XII: "12"\r
};\r
const CLASS_PARSE_TOKENS = Array.from(\r
  new Set([...CLASS_SEQUENCE, ...Object.keys(ROMAN_TO_NUMERIC_CLASS)])\r
).sort((left, right) => right.length - left.length);\r
const TEACHER_PAGE_TITLES = {\r
  home: "Dashboard",\r
  students: "Students",\r
  timetable: "Timetable",\r
  qrCheckin: "QR Check-In",\r
  myAttendance: "My Attendance",\r
  attendance: "Student Attendance",\r
  report: "Report Cards",\r
  notices: "Notices"\r
};\r
\r
const ATTENDANCE_TABS = new Set(["qrCheckin", "myAttendance", "attendance"]);\r
\r
function requireAttendanceAccess() {\r
  if (attendanceAccessEnabled) return true;\r
  toast("Attendance access has been disabled for your school by the Super Admin.", "error");\r
  return false;\r
}\r
\r
function applyAttendanceAccessState(adminData) {\r
  attendanceAccessEnabled = (adminData.features || {}).attendance !== false;\r
  ATTENDANCE_TABS.forEach(tabName => {\r
    document.querySelectorAll(\`[data-tab="\${tabName}"]\`).forEach(el => {\r
      el.hidden = !attendanceAccessEnabled;\r
      if ("disabled" in el) el.disabled = !attendanceAccessEnabled;\r
    });\r
    const panel = document.getElementById(\`\${tabName}Tab\`);\r
    if (!panel) return;\r
    if (!attendanceAccessEnabled) {\r
      panel.innerHTML = \`<div class="section-card"><div class="empty-state">Attendance access has been disabled for your school by the Super Admin.</div></div>\`;\r
    }\r
  });\r
  if (!attendanceAccessEnabled && ATTENDANCE_TABS.has(document.querySelector(".tab-content.active")?.id?.replace("Tab", ""))) {\r
    switchTab("home");\r
  }\r
}\r
\r
const ICON_PATHS = {\r
  activity: '<path d="M22 12h-4l-3 8L9 4l-3 8H2"/>',\r
  bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/>',\r
  "book-open": '<path d="M12 7v14"/><path d="M3 5a5 5 0 0 1 5-1l4 2v15l-4-2a5 5 0 0 0-5 1z"/><path d="M21 5a5 5 0 0 0-5-1l-4 2v15l4-2a5 5 0 0 1 5 1z"/>',\r
  "calendar-days": '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"/>',\r
  "check-circle": '<path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="9"/>',\r
  "clipboard-check": '<path d="M9 5h6"/><path d="M9 3h6v4H9z"/><path d="M5 5h2m10 0h2v16H5V5"/><path d="M9 14l2 2 4-4"/>',\r
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',\r
  eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>',\r
  "file-check": '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M9 15l2 2 4-4"/>',\r
  "file-text": '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h6"/>',\r
  home: '<path d="M3 11l9-8 9 8"/><path d="M5 10v11h14V10"/><path d="M9 21v-6h6v6"/>',\r
  logout: '<path d="M10 17l5-5-5-5"/><path d="M15 12H3"/><path d="M21 3v18h-6"/>',\r
  menu: '<path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/>',\r
  plus: '<path d="M12 5v14M5 12h14"/>',\r
  printer: '<path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 14h12v8H6z"/>',\r
  refresh: '<path d="M20 11a8 8 0 0 0-14.5-4.5L3 9"/><path d="M3 3v6h6"/><path d="M4 13a8 8 0 0 0 14.5 4.5L21 15"/><path d="M21 21v-6h-6"/>',\r
  save: '<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><path d="M17 21v-8H7v8M7 3v5h8"/>',\r
  scan: '<path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M7 12h10"/>',\r
  school: '<path d="M22 10v6"/><path d="M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 2 9 2 12 0v-5"/>',\r
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',\r
  wallet: '<path d="M3 7a2 2 0 0 1 2-2h14v14H5a2 2 0 0 1-2-2z"/><path d="M17 12h4v4h-4a2 2 0 0 1 0-4z"/>',\r
  "x-circle": '<circle cx="12" cy="12" r="9"/><path d="M15 9l-6 6M9 9l6 6"/>'\r
};\r
\r
function iconSvg(name, className = "ui-icon") {\r
  const path = ICON_PATHS[name] || ICON_PATHS["file-text"];\r
  return \`<svg class="\${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">\${path}</svg>\`;\r
}\r
\r
function hydrateStaticIcons(root = document) {\r
  root.querySelectorAll("[data-icon]").forEach((host) => {\r
    if (host.dataset.iconReady === "true") return;\r
    host.innerHTML = iconSvg(host.dataset.icon, host.className || "ui-icon");\r
    host.dataset.iconReady = "true";\r
  });\r
}\r
\r
hydrateStaticIcons();\r
\r
document.body.dataset.activeTab = "home";\r
\r
window.openSidebar = function() {\r
  $("teacherSidebar")?.classList.add("open");\r
  $("sidebarOverlay")?.classList.add("open");\r
};\r
\r
window.closeSidebar = function() {\r
  $("teacherSidebar")?.classList.remove("open");\r
  $("sidebarOverlay")?.classList.remove("open");\r
};\r
\r
function mountTeacherShellControls() {\r
  const slot = $("topbarSessionSlot");\r
  const selector = $("headerSessionSelector");\r
  if (slot && selector && selector.parentElement !== slot) {\r
    selector.removeAttribute("style");\r
    slot.appendChild(selector);\r
  }\r
}\r
\r
mountTeacherShellControls();\r
\r
// ── UTILS ──────────────────────────────────────────────────────────\r
function $(id) { return document.getElementById(id); }\r
\r
function firstProfileText(...values) {\r
  return values.map(value => String(value || "").replace(/\\s+/g, " ").trim()).find(Boolean) || "";\r
}\r
\r
function linkedTeacherSchoolId(profile = {}) {\r
  const canonical = firstProfileText(\r
    profile.schoolId,\r
    profile.schoolID,\r
    profile.schoolUid,\r
    profile.schoolUID,\r
    profile.schoolDocId,\r
    profile.schoolDocID\r
  );\r
  const legacyAdminLink = firstProfileText(\r
    profile.adminId,\r
    profile.adminID,\r
    profile.adminUid,\r
    profile.adminUID,\r
    profile.adminDocId,\r
    profile.adminDocID\r
  );\r
  if (canonical && legacyAdminLink && canonical !== legacyAdminLink) {\r
    console.warn("Teacher profile has conflicting school links; using canonical schoolId.", {\r
      schoolId: canonical,\r
      adminId: legacyAdminLink\r
    });\r
  }\r
  return canonical || legacyAdminLink;\r
}\r
\r
function setTeacherSchoolId(value = "") {\r
  const nextSchoolId = String(value || "").trim();\r
  if (nextSchoolId === adminId) return false;\r
  adminId = nextSchoolId;\r
  allSessions = [];\r
  activeSessionId = "";\r
  activeSessionLabel = "";\r
  activeSessionLocked = false;\r
  schoolActiveSessionId = "";\r
  sessionContextReady = false;\r
  teacherUserSelectedSessionId = "";\r
  teacherSessionLoadError = "";\r
  sessionsLoadedForSchool = "";\r
  allStudents = [];\r
  allFees = [];\r
  allAttendance = [];\r
  resetTeacherSessionDependentState();\r
  applySessionLockState();\r
  syncTeacherNotificationContext();\r
  return true;\r
}\r
\r
function resetTeacherSessionDependentState() {\r
  allTerms = [];\r
  activeTermKey = "";\r
  reportTermLocks = {};\r
  marksDirty = false;\r
  teacherTimetableLoadInFlight = null;\r
  cachedTeacherTimetable = {\r
    assignments: [],\r
    assignedSchedule: {},\r
    classFullTimetable: null,\r
    teacherPlacement: { class: "", section: "" }\r
  };\r
  const termSelector = $("reportTermSelect");\r
  if (termSelector) termSelector.innerHTML = \`<option value="">— Select a term —</option>\`;\r
  const termBanner = $("activeTermBanner");\r
  if (termBanner) termBanner.style.display = "none";\r
  const reportContent = $("reportContent");\r
  if (reportContent) reportContent.innerHTML = \`<div class="empty-state">Select a validated school session to load report cards.</div>\`;\r
  const studentsList = $("studentsList");\r
  if (studentsList) studentsList.innerHTML = \`<div class="empty-state">Select a validated school session to load students.</div>\`;\r
  const attendanceList = $("attendanceList");\r
  if (attendanceList) attendanceList.innerHTML = \`<div class="empty-state">Attendance data is syncing. Please try again shortly.</div>\`;\r
  ["statTotal", "statPresent", "statAbsent"].forEach((id) => {\r
    const stat = $(id);\r
    if (stat) stat.textContent = "0";\r
  });\r
  const timetableBody = $("assignedTimetableBody");\r
  if (timetableBody) timetableBody.innerHTML = \`<tr><td colspan="6" class="empty-state">Open this tab after the school session loads.</td></tr>\`;\r
  resetMarksDirtyState();\r
}\r
\r
function syncTeacherNotificationContext() {\r
  const detail = adminId ? {\r
    schoolId: adminId,\r
    role: "teacher",\r
    teacherId: teacherData.teacherId || teacherData.uid || "",\r
    teacherDocId: teacherData.docId || "",\r
    email: teacherData.email || auth.currentUser?.email || "",\r
    authUid: teacherData.authUid || auth.currentUser?.supabaseUid || auth.currentUser?.uid || ""\r
  } : {};\r
  window.SchoolixNotificationContext = detail;\r
  window.dispatchEvent(new CustomEvent("schoolix:notification-context-ready", { detail }));\r
  if (adminId) window.SchoolixSyncNativeNotifications?.(detail);\r
}\r
\r
function teacherDisplayName(profile = teacherData, authUser = auth.currentUser) {\r
  return firstProfileText(\r
    profile.name,\r
    profile.fullName,\r
    profile.teacherName,\r
    profile.displayName,\r
    authUser?.displayName,\r
    String(authUser?.email || "").split("@")[0]\r
  ) || "Teacher";\r
}\r
\r
function teacherProfileCacheKey(uid = auth.currentUser?.uid || teacherData.uid || "") {\r
  return uid ? \`schoolixTeacherProfile_\${uid}\` : "";\r
}\r
\r
function teacherProfileEmailCacheKey(email = auth.currentUser?.email || teacherData.email || "") {\r
  const normalizedEmail = String(email || "").trim().toLowerCase();\r
  return normalizedEmail ? \`schoolixTeacherProfileEmail_\${normalizedEmail}\` : "";\r
}\r
\r
function loadCachedTeacherProfile(uid = auth.currentUser?.uid || "") {
  const keys = [
    teacherProfileCacheKey(uid),
    teacherProfileEmailCacheKey(auth.currentUser?.email || teacherData.email),
    "schoolixTeacherSession",
    "schoolixLastTeacherProfile"
  ].filter(Boolean);
  for (const key of keys) {
    try {
      const cached = JSON.parse(localStorage.getItem(key) || "{}") || {};
      if (Object.keys(cached).length && (cached.name || cached.displayName || cached.schoolName)) return cached;
    } catch {}
  }
  return {};
}\r
\r
function saveCachedTeacherProfile(profile = teacherData) {
  const keys = [
    teacherProfileCacheKey(profile.uid),
    teacherProfileCacheKey(profile.authUid),
    teacherProfileCacheKey(auth.currentUser?.uid),
    teacherProfileEmailCacheKey(profile.email || auth.currentUser?.email),
    "schoolixTeacherSession",
    "schoolixLastTeacherProfile"
  ].filter(Boolean);
  if (!keys.length) return;
  const schoolId = profile.schoolId || profile.adminId || adminId || "";
  const cache = {
    uid: profile.uid || "",
    authUid: profile.authUid || auth.currentUser?.uid || "",
    docId: profile.docId || "",
    name: teacherDisplayName(profile, auth.currentUser),
    email: profile.email || auth.currentUser?.email || "",
    teacherId: profile.teacherId || "",
    class: profile.class || "",
    section: profile.section || "",
    schoolId,
    adminId: schoolId,
    schoolName: profile.schoolName || "",
    logoUrl: profile.logoUrl || profile.schoolLogoUrl || "",
    photoUrl: profile.photoUrl || profile.imageUrl || profile.profilePhotoUrl || profile.avatarUrl || ""
  };
  [...new Set(keys)].forEach((key) => {
    try { localStorage.setItem(key, JSON.stringify(cache)); } catch {}
  });
  if (cache.schoolId) {
    try { localStorage.setItem("teacherSchoolId", cache.schoolId); } catch {}
    if (cache.schoolName) {
      try { localStorage.setItem(\`schoolixSchoolName_\${cache.schoolId}\`, cache.schoolName); } catch {}
    }
  }
  if (cache.schoolName) {
    window.SchoolBranding?.persistSchoolName?.(cache.schoolName);
    try { localStorage.setItem("schoolix.schoolName", cache.schoolName); } catch {}
  }
}\r
\r
function cleanTeacherUid(value) {\r
  return String(value || "").trim();\r
}\r
\r
function canonicalTeacherUid(data = {}, docId = "", authUser = auth.currentUser) {\r
  return cleanTeacherUid(data.legacyUid || data.firebaseUid || docId || data.uid || authUser?.uid || "");\r
}\r
\r
function renderTeacherIdentity(schoolName = "", authUser = auth.currentUser) {
  const name = teacherDisplayName(teacherData, authUser);
  const targetSchoolId = adminId || teacherData.adminId || teacherData.schoolId || "";
  const cachedSchool = targetSchoolId ? (localStorage.getItem(\`schoolixSchoolName_\${targetSchoolId}\`) || "") : "";
  const resolvedSchoolName = firstProfileText(
    schoolName,
    teacherData.schoolName,
    cachedSchool,
    window.SchoolBranding?.getSchoolName?.(),
    "Schoolix"
  );
  if ($("schoolNameLabel")) $("schoolNameLabel").textContent = resolvedSchoolName;
  if ($("sidebarSchoolName")) $("sidebarSchoolName").textContent = resolvedSchoolName;
  if ($("teacherNameDisplay")) $("teacherNameDisplay").textContent = name;
  if ($("topbarTeacherName")) $("topbarTeacherName").textContent = name;
  if ($("teacherIdLabel")) $("teacherIdLabel").textContent = \`ID: \${teacherData.teacherId || teacherData.uid || authUser?.uid || "--"}\`;
  if ($("emailLabel")) $("emailLabel").textContent = teacherData.email || authUser?.email || "";
  renderTeacherProfilePhoto();
  if (resolvedSchoolName && resolvedSchoolName !== "Schoolix") {
    try {
      window.SchoolBranding?.persistSchoolName?.(resolvedSchoolName);
      if (targetSchoolId) localStorage.setItem(\`schoolixSchoolName_\${targetSchoolId}\`, resolvedSchoolName);
    } catch {}
  }
}\r
\r
async function resolveTeacherSchoolBranding(schoolId) {\r
  let cachedName = "";\r
  try { cachedName = localStorage.getItem(\`schoolixSchoolName_\${schoolId}\`) || ""; } catch {}\r
  let schoolName = firstProfileText(teacherData.schoolName, cachedName, window.SchoolBranding?.getSchoolName?.(), "Schoolix");\r
  let logoUrl = firstProfileText(teacherData.logoUrl, teacherData.schoolLogoUrl);\r
\r
  const [adminResult, schoolResult, brandResult] = await Promise.allSettled([\r
    getDoc(doc(db, "users", schoolId)),\r
    getDoc(doc(db, "schools", schoolId)),\r
    getDoc(doc(db, "schools", schoolId, "config", "branding"))\r
  ]);\r
  if (adminResult.status === "fulfilled" && adminResult.value.exists()) {\r
    const adminProfile = adminResult.value.data();\r
    schoolName = firstProfileText(adminProfile.schoolName, adminProfile.instituteName, schoolName);\r
    logoUrl = firstProfileText(adminProfile.logoUrl, adminProfile.schoolLogoUrl, logoUrl);\r
    applyAttendanceAccessState(adminProfile);\r
  }\r
  if (schoolResult.status === "fulfilled" && schoolResult.value.exists()) {\r
    const school = schoolResult.value.data();\r
    schoolName = firstProfileText(school.schoolName, school.name, school.instituteName, schoolName);\r
    logoUrl = firstProfileText(school.logoUrl, school.schoolLogoUrl, logoUrl);\r
  }\r
  if (brandResult.status === "fulfilled" && brandResult.value.exists()) {\r
    const brand = brandResult.value.data();\r
    schoolName = firstProfileText(brand.schoolName, brand.name, schoolName);\r
    logoUrl = firstProfileText(brand.logoUrl, brand.schoolLogoUrl, logoUrl);\r
  }\r
\r
  try { localStorage.setItem(\`schoolixSchoolName_\${schoolId}\`, schoolName); } catch {}\r
  window.SchoolBranding?.persistSchoolName?.(schoolName);\r
  if (logoUrl) window.SchoolBranding?.persistSchoolLogo?.(logoUrl);\r
  return schoolName;\r
}\r
\r
function todayISO() {\r
  const now = new Date();\r
  const year = now.getFullYear();\r
  const month = String(now.getMonth() + 1).padStart(2, "0");\r
  const day = String(now.getDate()).padStart(2, "0");\r
  return \`\${year}-\${month}-\${day}\`;\r
}\r
\r
function currentMonth() {\r
  const now = new Date();\r
  const year = now.getFullYear();\r
  const month = String(now.getMonth() + 1).padStart(2, "0");\r
  return \`\${year}-\${month}\`;\r
}\r
\r
function fmt(num) {\r
  if (num === null || num === undefined || isNaN(num)) return "₹0";\r
  return new Intl.NumberFormat("en-IN", {\r
    style: "currency",\r
    currency: "INR",\r
    minimumFractionDigits: 0,\r
    maximumFractionDigits: 0\r
  }).format(Number(num) || 0);\r
}\r
\r
const parseAttendanceDate = dateStr => {\r
  if (!dateStr) return null;\r
  const parsed = new Date(\`\${dateStr}T00:00:00\`);\r
  return Number.isNaN(parsed.getTime()) ? null : parsed;\r
};\r
\r
const formatAttendanceDate = dateStr => {\r
  const parsed = parseAttendanceDate(dateStr);\r
  return parsed\r
    ? parsed.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })\r
    : dateStr;\r
};\r
\r
function getSessionLabel(session) {\r
  return firstProfileText(\r
    session?.session,\r
    session?.name,\r
    session?.label,\r
    session?.sessionLabel,\r
    session?.academicSession,\r
    session?.currentYear,\r
    session?.id\r
  );\r
}\r
\r
function normalizeTeacherSession(id, data = {}) {\r
  const sessionId = String(id || data.id || "").trim();\r
  const label = getSessionLabel({ id: sessionId, ...data }) || sessionId;\r
  return { ...data, id: sessionId || label, session: label, name: data.name || label };\r
}\r
\r
function findTeacherSessionByValue(value) {\r
  const candidate = String(value || "").trim().toLowerCase();\r
  if (!candidate) return null;\r
  return allSessions.find((session) => (\r
    [session.id, getSessionLabel(session), session.session, session.name, session.sessionLabel]\r
      .some((entry) => String(entry || "").trim().toLowerCase() === candidate)\r
  )) || null;\r
}\r
\r
function sortSessions(sessions) {\r
  return [...sessions].sort((a, b) => {\r
    const aOrder = Number(a.startYear || 0) || new Date(a.startDate || a.createdAt?.seconds * 1000 || a.createdAt || 0).getTime();\r
    const bOrder = Number(b.startYear || 0) || new Date(b.startDate || b.createdAt?.seconds * 1000 || b.createdAt || 0).getTime();\r
    return bOrder - aOrder;\r
  });\r
}\r
\r
function getActiveMarksTermKey() {\r
  if (!activeTermKey) return "";\r
  return activeSessionId ? \`\${activeSessionId}__\${activeTermKey}\` : activeTermKey;\r
}\r
\r
function getTermLockKey(termKey = activeTermKey) {\r
  if (!termKey) return "";\r
  return activeSessionId ? \`\${activeSessionId}__\${termKey}\` : termKey;\r
}\r
\r
function isReportTermLocked(termKey = activeTermKey) {\r
  return reportTermLocks[getTermLockKey(termKey)]?.locked === true;\r
}\r
\r
function cleanupClassValue(value) {\r
  return String(value || "").trim().toUpperCase().replace(/^CLASS\\s+/, "");\r
}\r
\r
function normalizeSectionValue(value) {\r
  return String(value || "").trim().toUpperCase().replace(/[^A-Z]/g, "").slice(0, 1);\r
}\r
\r
function normalizeClassLabel(value) {\r
  const cleaned = cleanupClassValue(value);\r
  if (!cleaned) return "";\r
  if (cleaned === "PASSED OUT") return "Passed Out";\r
  if (/^\\d+$/.test(cleaned)) return String(Number(cleaned));\r
  return ROMAN_TO_NUMERIC_CLASS[cleaned] || cleaned;\r
}\r
\r
function extractClassSection(classValue, sectionValue = "") {\r
  const explicitSection = normalizeSectionValue(sectionValue);\r
  const cleanedClass = cleanupClassValue(classValue);\r
  if (!cleanedClass) return { class: "", section: explicitSection };\r
  if (explicitSection) return { class: normalizeClassLabel(cleanedClass), section: explicitSection };\r
  for (const token of CLASS_PARSE_TOKENS) {\r
    if (!cleanedClass.startsWith(token)) continue;\r
    const remainder = cleanedClass.slice(token.length).replace(/^[\\s-]+/, "");\r
    if (!remainder) return { class: normalizeClassLabel(token), section: "" };\r
    if (/^[A-Z]$/.test(remainder)) return { class: normalizeClassLabel(token), section: remainder };\r
  }\r
  return { class: normalizeClassLabel(cleanedClass), section: "" };\r
}\r
\r
function isSamePlacement(left, right) {\r
  return left?.class === right?.class && left?.section === right?.section;\r
}\r
\r
function getTeacherAssignedPlacements() {\r
  const fromArray = Array.isArray(teacherData.assignedClasses)\r
    ? teacherData.assignedClasses.map(item => extractClassSection(item.class || item.className, item.section))\r
    : [];\r
  const fallback = extractClassSection(teacherData.class, teacherData.section);\r
  const placements = [...fromArray, fallback].filter(item => item.class && item.section);\r
  const seen = new Set();\r
  return placements.filter(item => {\r
    const key = \`\${item.class}__\${item.section}\`;\r
    if (seen.has(key)) return false;\r
    seen.add(key);\r
    return true;\r
  });\r
}\r
\r
function getTeacherPlacement() {\r
  return teacherAssignedPlacements[0] || extractClassSection(teacherData.class, teacherData.section);\r
}\r
\r
function getActivePlacement() {\r
  return activeClassSection?.class ? activeClassSection : getTeacherPlacement();\r
}\r
\r
function isAssignedPlacement(placement) {\r
  return teacherAssignedPlacements.some(item => isSamePlacement(item, placement));\r
}\r
\r
function populateTeacherClassSelector() {\r
  const wrap = $("teacherClassSelectorWrap");\r
  const selector = $("teacherClassSelector");\r
  if (!wrap || !selector) return;\r
  wrap.classList.toggle("show", teacherAssignedPlacements.length > 1);\r
  if (teacherAssignedPlacements.length <= 1) {\r
    selector.innerHTML = "";\r
    return;\r
  }\r
  selector.innerHTML = teacherAssignedPlacements.map((placement, index) =>\r
    \`<option value="\${index}" \${isSamePlacement(placement, getActivePlacement()) ? "selected" : ""}>Class \${escapeHtml(formatShortClassSection(placement))}</option>\`\r
  ).join("");\r
}\r
\r
window.onTeacherClassChange = async function() {\r
  const selector = $("teacherClassSelector");\r
  const nextPlacement = teacherAssignedPlacements[Number(selector?.value || 0)] || teacherAssignedPlacements[0];\r
  if (!nextPlacement || isSamePlacement(nextPlacement, getActivePlacement())) return;\r
  activeClassSection = nextPlacement;\r
  cachedTeacherTimetable = { assignments: [], assignedSchedule: {}, classFullTimetable: null, teacherPlacement: nextPlacement };\r
  updateAssignmentLabels();\r
  await loadEverything();\r
  if (document.body.dataset.activeTab === "timetable") {\r
    await loadTeacherTimetable(true);\r
  }\r
};\r
\r
function getStudentPlacementForActiveSession(student) {\r
  if (!student || !activeSessionId) return null;\r
  const placements = student.sessionPlacements || {};\r
  if (placements[activeSessionId]) return placements[activeSessionId];\r
  return Object.values(placements).find((placement) =>\r
    placement?.sessionId === activeSessionId ||\r
    (activeSessionLabel && (placement?.session === activeSessionLabel || placement?.currentYear === activeSessionLabel))\r
  ) || null;\r
}\r
\r
function getStudentForActiveSession(student) {\r
  const placement = getStudentPlacementForActiveSession(student);\r
  if (!placement) return { ...student, _sessionPlacement: null };\r
  return {\r
    ...student,\r
    class: placement.class || student.class || "",\r
    section: placement.section || student.section || "",\r
    roll: placement.roll || student.roll || student.rollNo || "",\r
    currentYear: placement.currentYear || placement.session || activeSessionLabel || student.currentYear || "",\r
    _sessionPlacement: placement\r
  };\r
}\r
\r
function formatShortClassSection(placement) {\r
  if (!placement?.class && !placement?.section) return "—";\r
  return placement.section ? \`\${placement.class}-\${placement.section}\` : placement.class || placement.section;\r
}\r
\r
function formatBadgeClassSection(placement) {\r
  if (!placement?.class && !placement?.section) return "Class —";\r
  return placement.section ? \`Class \${placement.class} – \${placement.section}\` : \`Class \${placement.class}\`;\r
}\r
\r
function resolveTeacherStudentScope(students) {\r
  const teacherPlacement = getActivePlacement();\r
  const sessionStudents = students.map(getStudentForActiveSession);\r
  const directStudents = sessionStudents.filter((student) => (\r
    isSamePlacement(extractClassSection(student.class, student.section), teacherPlacement) && isAssignedPlacement(teacherPlacement)\r
  ));\r
  return { students: directStudents, activePlacement: teacherPlacement, mode: "direct" };\r
}\r
\r
function updateAssignmentLabels() {\r
  const currentPlacement = getActivePlacement();\r
  $("classSectionBadge").textContent = formatBadgeClassSection(currentPlacement);\r
  $("statClassInfo").textContent = formatBadgeClassSection(currentPlacement);\r
  populateTeacherClassSelector();\r
}\r
\r
function getVisibleStudentIds() {
  return new Set(allStudents.map((student) => student.studentId || student.id).filter(Boolean));
}

function normalizeStudentRecordId(value) {
  return String(value ?? "").trim().toLowerCase();
}

function feeBelongsToStudent(fee, studentId) {
  const wanted = normalizeStudentRecordId(studentId);
  if (!wanted) return false;
  return [fee?.studentId, fee?.studentDocId, fee?.student?.studentId, fee?.student?.id]
    .some((value) => normalizeStudentRecordId(value) === wanted);
}
\r
function getStudentInitials(value) {\r
  const words = String(value || "Student").trim().split(/\\s+/).filter(Boolean);\r
  if (!words.length) return "ST";\r
  return words.slice(0, 2).map((word) => word[0]).join("").toUpperCase();\r
}\r
\r
function getStudentPhotoUrl(student = {}) {\r
  return String(student.photoUrl || student.imageUrl || student.profilePhotoUrl || student.avatarUrl || "").trim();\r
}\r
\r
function renderStudentFace(student = {}, className = "student-face") {\r
  const photoUrl = getStudentPhotoUrl(student);\r
  const initials = getStudentInitials(student.name || student.studentId || student.id);\r
  return \`<button type="button" class="\${className}" onclick="event.stopPropagation(); openPhotoPreview('\${escapeHtml(photoUrl)}','\${escapeHtml(student.name || "Student")}')" title="View \${escapeHtml(student.name || "Student")} photo">\${photoUrl ? \`<img src="\${escapeHtml(photoUrl)}" alt="">\` : escapeHtml(initials)}</button>\`;\r
}\r
\r
function getTeacherPhotoUrl(teacher = {}) {\r
  return String(teacher.photoUrl || teacher.imageUrl || teacher.profilePhotoUrl || teacher.avatarUrl || "").trim();\r
}\r
\r
function setAvatarPhoto(elementId, profile = {}) {\r
  const el = $(elementId);\r
  if (!el) return;\r
  const photoUrl = getTeacherPhotoUrl(profile);\r
  const initials = getStudentInitials(profile.name || profile.teacherId || "Teacher");\r
  el.innerHTML = photoUrl ? \`<img src="\${escapeHtml(photoUrl)}" alt="\${escapeHtml(profile.name || "Teacher")} photo">\` : escapeHtml(initials);\r
}\r
\r
function renderTeacherProfilePhoto() {\r
  setAvatarPhoto("topbarAvatar", teacherData);\r
  setAvatarPhoto("teacherHeroPhoto", teacherData);\r
}\r
\r
window.openTeacherPhotoPreview = function() {\r
  window.openPhotoPreview(getTeacherPhotoUrl(teacherData), teacherData.name || "Teacher");\r
};\r
\r
window.openPhotoPreview = function(photoUrl, title = "Photo") {\r
  if (!photoUrl) return toast("Photo is not available yet.", "info");\r
  $("photoPreviewTitle").textContent = title || "Photo";\r
  $("photoPreviewImage").src = photoUrl;\r
  $("photoPreviewImage").alt = \`\${title || "Photo"} preview\`;\r
  $("photoPreviewModal").classList.add("open");\r
};\r
\r
window.closePhotoPreview = function() {\r
  $("photoPreviewModal").classList.remove("open");\r
  $("photoPreviewImage").removeAttribute("src");\r
}\r
\r
function toast(msg, type = "success") {\r
  const t = document.createElement("div");\r
  t.className = "toast";\r
  t.textContent = msg;\r
  const colors = {\r
    success: "linear-gradient(135deg,#16a34a,#15803d)",\r
    error: "linear-gradient(135deg,#ef4444,#dc2626)",\r
    info: "linear-gradient(135deg,var(--primary),var(--primary-dark))"\r
  };\r
  t.style.background = colors[type] || colors.success;\r
  document.body.appendChild(t);\r
  setTimeout(() => t.remove(), 3500);\r
}\r
\r
function showPanelError(targetId, message) {\r
  const el = $(targetId);\r
  if (el) el.innerHTML = \`<div class="empty-state">\${escapeHtml(message)}</div>\`;\r
}\r
\r
function countWorkingDays(monthVal) {\r
  const [y, m] = monthVal.split("-").map(Number);\r
  const total = new Date(y, m, 0).getDate();\r
  let count = 0;\r
  for (let d = 1; d <= total; d++) if (new Date(y, m-1, d).getDay() !== 0) count++;\r
  return count;\r
}\r
\r
function countAttendanceWorkingDays(records = []) {\r
  const markedDates = new Set();\r
  records.forEach((record) => {\r
    const date = String(record?.date || "").trim();\r
    if (date) markedDates.add(date);\r
  });\r
  return markedDates.size;\r
}\r
\r
// ── TERM HELPERS ───────────────────────────────────────────────────\r
function normalizeReportTerm(term) {\r
  return String(term || "").trim();\r
}\r
\r
function getReportTermKey(term) {\r
  return normalizeReportTerm(term).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");\r
}\r
\r
function getTermDocIdByTermKey(termKey) {\r
  return activeSessionId ? \`\${activeSessionId}__\${termKey}\` : termKey;\r
}\r
\r
function termBelongsToActiveSession(term) {\r
  if (!term) return false;\r
  if (!sessionContextReady || !activeSessionId) return false;\r
  if (activeSessionId) {\r
    if (term.sessionId === activeSessionId) return true;\r
    if (String(term.id || "").startsWith(\`\${activeSessionId}__\`)) return true;\r
  }\r
  return activeSessionLabel && (\r
    term.session === activeSessionLabel ||\r
    term.currentYear === activeSessionLabel ||\r
    term.academicSession === activeSessionLabel\r
  );\r
}\r
\r
function termBelongsToActivePlacement(term) {\r
  if (!term?.class && !term?.section) return true;\r
  const currentPlacement = getActivePlacement();\r
  const termPlacement = extractClassSection(term.class, term.section);\r
  if (!termPlacement.class) return true;\r
  if (termPlacement.class !== currentPlacement.class) return false;\r
  return !termPlacement.section || termPlacement.section === currentPlacement.section;\r
}\r
\r
function belongsToActiveSession(record) {
  // Never aggregate records when the school/session context is unverified.
  if (!sessionContextReady || !activeSessionId) return false;
  const activeId = normalizeStudentRecordId(activeSessionId);
  const activeLabel = normalizeStudentRecordId(activeSessionLabel);
  const recordSessions = [record?.sessionId, record?.session, record?.currentYear, record?.academicSession]
    .map(normalizeStudentRecordId)
    .filter(Boolean);
  // Check if record belongs to active session
  return recordSessions.some((value) => value === activeId || (activeLabel && value === activeLabel));
}
\r
function setSelectedSession(sessionId) {\r
  const selectedSession = findTeacherSessionByValue(sessionId);\r
  if (!selectedSession) return false;\r
  activeSessionId = selectedSession.id;\r
  activeSessionLabel = getSessionLabel(selectedSession);\r
  activeSessionLocked = selectedSession.locked === true;\r
  return true;\r
}\r
\r
function findTeacherSessionFromSettings(settings = {}) {\r
  const candidates = [\r
    settings.sessionId,\r
    settings.activeSessionId,\r
    settings.currentSessionId,\r
    settings.id\r
  ].map(value => String(value || "").trim()).filter(Boolean);\r
  for (const candidate of candidates) {\r
    const found = findTeacherSessionByValue(candidate);\r
    if (found) return found;\r
  }\r
  const labelCandidates = [\r
    settings.session,\r
    settings.activeSession,\r
    settings.currentSession,\r
    settings.sessionLabel,\r
    settings.currentYear,\r
    settings.academicSession\r
  ].map(value => String(value || "").trim()).filter(Boolean);\r
  for (const label of labelCandidates) {\r
    const found = findTeacherSessionByValue(label);\r
    if (found) return found;\r
  }\r
  return null;\r
}\r
\r
function selectFallbackSession() {\r
  const sortedSessions = sortSessions(allSessions);\r
  const openSession = sortedSessions.find(session => session.locked !== true);\r
  const fallback = openSession || sortedSessions[0];\r
  return fallback ? setSelectedSession(fallback.id) : false;\r
}\r
\r
function applySessionLockState() {\r
  if (!sessionContextReady || activeSessionLocked) {\r
    showSessionLockBanner();\r
    disableAllEditControls();\r
  } else {\r
    hideSessionLockBanner();\r
    enableAllEditControls();\r
  }\r
}\r
\r
function showSessionLockBanner() {\r
  // A missing session is handled by the disabled controls; don't cover the\r
  // dashboard with a repeated warning while a slow connection revalidates.\r
  if (!sessionContextReady) {\r
    hideSessionLockBanner();\r
    return;\r
  }\r
  // Remove existing banner\r
  const old = document.getElementById("sessionLockGlobalBanner");\r
  if (old) old.remove();\r
  const banner = document.createElement("div");\r
  banner.id = "sessionLockGlobalBanner";\r
  banner.style.cssText = "position:fixed;top:0;left:0;right:0;z-index:9999;background:linear-gradient(135deg,#dc2626,#991b1b);color:#fff;padding:12px 20px;text-align:center;font-size:14px;font-weight:700;letter-spacing:0.02em;box-shadow:0 4px 16px rgba(0,0,0,0.3);";\r
  banner.innerHTML = sessionContextReady\r
    ? \`Session <strong>\${activeSessionLabel}</strong> is locked by admin. All data is <strong>view only</strong>.\`\r
    : "";\r
  document.body.prepend(banner);\r
  // Push body down\r
  document.body.style.paddingTop = "50px";\r
}\r
\r
function hideSessionLockBanner() {\r
  const old = document.getElementById("sessionLockGlobalBanner");\r
  if (old) old.remove();\r
  document.body.style.paddingTop = "";\r
}\r
\r
function getSubjectMaxMarks(subject) {\r
  return Math.max(1, Number(subject?.maxMarks || subject?.max || 100) || 100);\r
}\r
\r
function getReportGrade(percentage) {\r
  if (percentage >= 90) return "A+";\r
  if (percentage >= 75) return "A";\r
  if (percentage >= 60) return "B";\r
  if (percentage >= 40) return "C";\r
  return "F";\r
}\r
\r
function getReportRemarks(obtained, maxMarks) {\r
  const pct = maxMarks ? (Number(obtained || 0) / Number(maxMarks || 100)) * 100 : 0;\r
  if (pct >= 80) return "Excellent";\r
  if (pct >= 60) return "Good";\r
  if (pct >= 40) return "Average";\r
  return "Poor";\r
}\r
\r
function getSubjectMarkEntry(termMarks, subject) {\r
  const subjectName = subject?.name || "Subject";\r
  const entry = termMarks?.[subjectName];\r
\r
  if (entry && typeof entry === "object") {\r
    const obtained = entry.obtained ?? entry.marks;\r
    return {\r
      obtained,\r
      maxMarks: Number(entry.maxMarks || getSubjectMaxMarks(subject))\r
    };\r
  }\r
  if (entry !== undefined && entry !== null) {\r
    return {\r
      obtained: entry,\r
      maxMarks: getSubjectMaxMarks(subject)\r
    };\r
  }\r
  // No entry - return null/undefined to indicate empty\r
  return { \r
    obtained: null, \r
    maxMarks: getSubjectMaxMarks(subject) \r
  };\r
}\r
// ── AUTH ───────────────────────────────────────────────────────────\r
function waitForTeacherAuthUser(timeoutMs = 16000) {\r
  return new Promise((resolve) => {\r
    let done = false;\r
    let unsubscribe = () => {};\r
    const finish = (user) => {\r
      if (done) return;\r
      done = true;\r
      try { unsubscribe?.(); } catch {}\r
      resolve(user || auth.currentUser || null);\r
    };\r
    unsubscribe = onAuthStateChanged(auth, finish);\r
    setTimeout(() => finish(auth.currentUser || null), timeoutMs);\r
  });\r
}\r
\r
function requireValidatedTeacherSession(action = "change data") {\r
  if (sessionContextReady && adminId && activeSessionId) return true;\r
  toast(\`Unable to \${action}: refresh and verify the school session first.\`, "error");\r
  return false;\r
}\r
\r
async function resolveTeacherProfileDocument(user = auth.currentUser) {\r
  if (!user) return null;\r
  const matches = [];\r
  const directIds = [teacherData.docId, user.uid, teacherData.uid, user.supabaseUid]\r
    .map((value) => String(value || "").trim())\r
    .filter(Boolean);\r
  const directResults = await Promise.allSettled(\r
    [...new Set(directIds)].map((id) => getDoc(doc(db, "users", id)))\r
  );\r
  directResults.forEach((result) => {\r
    if (result.status !== "fulfilled") return;\r
    const snapshot = result.value;\r
    if (snapshot.exists() && String(snapshot.data().role || "").toLowerCase() === "teacher") {\r
      matches.push({ id: snapshot.id, data: snapshot.data() || {} });\r
    }\r
  });\r
\r
  const email = String(user.email || teacherData.email || "").trim().toLowerCase();\r
  const lookups = [];\r
  const signedLookupIds = [user.uid, user.supabaseUid]\r
    .map((value) => String(value || "").trim())\r
    .filter(Boolean);\r
  signedLookupIds.forEach((id) => {\r
    lookups.push(["authUid", id], ["uid", id], ["supabaseAuthUid", id], ["legacyUid", id], ["firebaseUid", id]);\r
  });\r
  if (email) lookups.push(["email", email], ["authEmail", email]);\r
  const uniqueLookups = [...new Map(lookups\r
    .filter(([, value]) => String(value || "").trim())\r
    .map(([field, value]) => [\`\${field}:\${String(value).trim().toLowerCase()}\`, [field, value]])\r
  ).values()];\r
  const signedIds = new Set([user.uid, user.supabaseUid].map((value) => String(value || "").trim()).filter(Boolean));\r
  const directAuthMatch = matches.some((item) => (\r
    [item.id, item.data.authUid, item.data.uid, item.data.supabaseAuthUid, item.data.legacyUid, item.data.firebaseUid]\r
      .map((value) => String(value || "").trim())\r
      .some((value) => signedIds.has(value))\r
  ));\r
  if (!directAuthMatch) {\r
    const lookupResults = await Promise.allSettled(\r
      uniqueLookups.map(([field, value]) => getDocs(query(collection(db, "users"), where(field, "==", value), limit(5))))\r
    );\r
    lookupResults.forEach((result) => {\r
      if (result.status !== "fulfilled") return;\r
      result.value.docs.forEach((item) => {\r
        const data = item.data() || {};\r
        if (String(data.role || "").toLowerCase() === "teacher") matches.push({ id: item.id, data });\r
      });\r
    });\r
  }\r
  const uniqueMatches = [...new Map(matches.map((item) => [item.id, item])).values()];\r
  if (!uniqueMatches.length) return null;\r
  const authLinked = uniqueMatches.filter((item) => (\r
    [item.id, item.data.authUid, item.data.uid, item.data.supabaseAuthUid, item.data.legacyUid, item.data.firebaseUid]\r
      .map((value) => String(value || "").trim())\r
      .some((value) => signedIds.has(value))\r
  ));\r
  const expectedTeacherId = String(authLinked[0]?.data?.teacherId || teacherData.teacherId || "").trim();\r
  let candidates = uniqueMatches;\r
  if (expectedTeacherId) {\r
    const sameTeacher = candidates.filter((item) => String(item.data.teacherId || "").trim() === expectedTeacherId);\r
    if (sameTeacher.length) candidates = sameTeacher;\r
  }\r
  const schoolLinked = candidates.filter((item) => linkedTeacherSchoolId(item.data));\r
  if (schoolLinked.length) candidates = schoolLinked;\r
  const identityKeys = new Set(candidates.map((item) => [\r
    linkedTeacherSchoolId(item.data),\r
    item.data.teacherId || "",\r
    String(item.data.role || "").toLowerCase()\r
  ].map((value) => String(value || "").trim().toLowerCase()).join("|")).filter((key) => key !== "||"));\r
  if (identityKeys.size > 1) return null;\r
\r
  return candidates.sort((left, right) => {\r
    const score = (item) => {\r
      const authIds = [item.id, item.data.authUid, item.data.uid, item.data.supabaseAuthUid, item.data.legacyUid, item.data.firebaseUid]\r
        .map((value) => String(value || "").trim());\r
      return (authIds.some((value) => signedIds.has(value)) ? 100 : 0)\r
        + (linkedTeacherSchoolId(item.data) ? 20 : 0)\r
        + (item.data.active === false ? -50 : 0);\r
    };\r
    return score(right) - score(left);\r
  })[0] || null;\r
}\r
\r
async function refreshTeacherProfileContext(user = auth.currentUser) {\r
  const resolved = await resolveTeacherProfileDocument(user);\r
  if (!resolved) {\r
    setTeacherSchoolId("");\r
    teacherData = {};\r
    const error = new Error("Teacher profile not found for this signed-in account.");\r
    error.code = "teacher-profile-missing";\r
    throw error;\r
  }\r
  const resolvedTeacherProfile = resolved.data || {};\r
  const resolvedTeacherUid = canonicalTeacherUid(resolvedTeacherProfile, resolved.id, user);\r
  teacherData = {\r
    ...resolvedTeacherProfile,\r
    uid: resolvedTeacherUid,\r
    docId: resolved.id,\r
    authUid: user?.supabaseUid || user?.uid || resolvedTeacherProfile.authUid || ""\r
  };\r
  saveCachedTeacherProfile(teacherData);\r
\r
  const nextSchoolId = linkedTeacherSchoolId(teacherData);\r
  if (!nextSchoolId) {\r
    setTeacherSchoolId("");\r
    const error = new Error("Teacher profile is not linked to a school.");\r
    error.code = "teacher-school-missing";\r
    throw error;\r
  }\r
  const schoolChanged = setTeacherSchoolId(nextSchoolId);\r
  const cachedSchool = localStorage.getItem(\`schoolixSchoolName_\${nextSchoolId}\`) || "";
  let schoolName = firstProfileText(teacherData.schoolName, cachedSchool, window.SchoolBranding?.getSchoolName?.(), "Schoolix");
  renderTeacherIdentity(schoolName, user);

  // Background non-blocking branding sync
  resolveTeacherSchoolBranding(adminId).then((brandSchoolName) => {
    if (brandSchoolName && brandSchoolName !== schoolName) {
      renderTeacherIdentity(brandSchoolName, user);
    }
  }).catch((err) => console.warn("Background branding refresh:", err));\r
\r
  const previousPlacement = getActivePlacement();\r
  teacherAssignedPlacements = getTeacherAssignedPlacements();\r
  activeClassSection = !schoolChanged && isAssignedPlacement(previousPlacement)\r
    ? previousPlacement\r
    : getTeacherPlacement();\r
  updateAssignmentLabels();\r
  syncTeacherNotificationContext();\r
  return { schoolChanged };\r
}\r
\r
async function handleTeacherContextError(error, fallbackMessage = "Teacher dashboard refresh failed.") {\r
  console.warn(fallbackMessage, error);\r
  if (["teacher-profile-missing", "teacher-school-missing"].includes(String(error?.code || ""))) {\r
    setTeacherSchoolId("");\r
    await signOut(auth).catch(() => {});\r
    window.location.replace("#/index.html");\r
    return true;\r
  }\r
  toast(error?.message || fallbackMessage, "error");\r
  return false;\r
}\r
\r
onAuthStateChanged(auth, async user => {\r
  try {\r
    if (!user) {\r
      user = await waitForTeacherAuthUser();\r
      if (!user) return window.location.href = "#/index.html";\r
    }\r
\r
    const cached = loadCachedTeacherProfile(user.uid);
    teacherData = {
      uid: user.uid,
      email: user.email || cached.email || "",
      displayName: user.displayName || cached.name || "",
      ...cached
    };
    if (teacherData.schoolId || teacherData.adminId) {
      setTeacherSchoolId(teacherData.schoolId || teacherData.adminId);
    }
    const initialSchoolName = firstProfileText(
      teacherData.schoolName,
      adminId ? localStorage.getItem(\`schoolixSchoolName_\${adminId}\`) : "",
      window.SchoolBranding?.getSchoolName?.(),
      "Schoolix"
    );
    renderTeacherIdentity(initialSchoolName, user);
    updateAssignmentLabels();\r
    await refreshTeacherProfileContext(user);\r
    if (teacherData.removedFromPanel === true || teacherData.panelStatus === "removed" || teacherData.active === false) {\r
      alert("Your teacher access has been removed by the school admin.");\r
      await signOut(auth).catch(() => {});\r
      return window.location.href = "#/index.html";\r
    }\r
\r
    $("attendanceDate").value = todayISO();\r
    $("attendanceDate").max = todayISO();\r
    $("salaryMonthPicker").value = currentMonth();\r
    $("teacherAttendanceMonth").value = currentMonth();\r
    $("statTodayDate").textContent = new Date().toLocaleDateString("en-IN", {day:"numeric",month:"short"});\r
\r
    const requestedTab = decodeURIComponent(window.location.hash.replace(/^#/, ""));\r
    const sessionResult = await loadSessions();\r
    if (sessionResult.error || !sessionContextReady) {\r
      toast("Dashboard refresh pending. Please try again shortly.", "info");\r
      return;\r
    }\r
    await loadEverything({ includeSecondary: requestedTab === "report" });\r
    teacherResumeRefreshAt = Date.now();\r
    if (["home", "students", "timetable", "qrCheckin", "myAttendance", "attendance", "report", "notices"].includes(requestedTab)) {\r
      window.switchTab(requestedTab);\r
    }\r
  } catch (error) {\r
    console.error("Teacher dashboard failed to load:", error);\r
    if (await handleTeacherContextError(error, "Teacher dashboard failed to load.")) return;\r
    showPanelError("studentsList", "Teacher dashboard load nahi ho pa raha. Please refresh ya admin se teacher profile check karvao.");\r
  }\r
});\r
\r
async function loadSessions({ force = false } = {}) {\r
  const schoolIdAtStart = String(adminId || "").trim();\r
  const previousSessionIds = allSessions.map((session) => session.id).sort().join("|");\r
  const previousSelectedId = activeSessionId;\r
  const previousSchoolActiveId = schoolActiveSessionId;\r
  const previousContextReady = sessionContextReady && sessionsLoadedForSchool === schoolIdAtStart;\r
  try {\r
    if (!schoolIdAtStart) throw new Error("Teacher profile is not linked to a school.");\r
    if (!force && !allSessions.length) {\r
      let cached = null;\r
      try { cached = JSON.parse(localStorage.getItem(\`schoolixTeacherSessions_\${schoolIdAtStart}\`) || "null"); } catch {}\r
      if (cached?.savedAt && Date.now() - cached.savedAt < TEACHER_SESSION_CACHE_TTL_MS && Array.isArray(cached.sessions) && cached.sessions.length) {\r
        allSessions = cached.sessions;\r
        schoolActiveSessionId = findTeacherSessionByValue(cached.schoolActiveSessionId)?.id || "";\r
        const cachedSession = findTeacherSessionByValue(cached.activeSessionId) || sortSessions(allSessions).find((session) => session.locked !== true) || allSessions[0];\r
        if (cachedSession) setSelectedSession(cachedSession.id);\r
        sessionsLoadedForSchool = schoolIdAtStart;\r
        sessionContextReady = Boolean(activeSessionId);\r
        populateSessionSelector();\r
        populateHeaderSessionSelector();\r
        updateSessionBadge();\r
        applySessionLockState();\r
        setTimeout(() => loadSessions({ force: true }).catch(() => {}), 0);\r
        return { selectionChanged: previousSelectedId !== activeSessionId, sessionsChanged: false, fromCache: true, error: null };\r
      }\r
    }\r
    if (force) clearFirestoreReadCache();\r
    teacherSessionLoadError = "";\r
    sessionContextReady = false;\r
    applySessionLockState();\r
    const [sessionsResult, settingsResult] = await Promise.allSettled([\r
      getDocs(collection(db, "schools", schoolIdAtStart, "sessions")),\r
      getDoc(doc(db, "schools", schoolIdAtStart, "settings", "activeSession"))\r
    ]);\r
    if (adminId !== schoolIdAtStart) return { selectionChanged: false, sessionsChanged: false };\r
    if (sessionsResult.status === "rejected") throw sessionsResult.reason;\r
\r
    allSessions = sessionsResult.value.docs.map((item) => normalizeTeacherSession(item.id, item.data()));\r
    const settingsSnap = settingsResult.status === "fulfilled" ? settingsResult.value : null;\r
    const schoolActiveSession = settingsSnap?.exists?.()\r
      ? findTeacherSessionFromSettings(settingsSnap.data() || {})\r
      : null;\r
    let configuredSessionMismatch = false;\r
    if (settingsResult.status === "rejected") {\r
      console.warn("Teacher active session setting load failed:", settingsResult.reason);\r
      teacherSessionLoadError = "School sessions loaded, but the active session could not be verified.";\r
      schoolActiveSessionId = findTeacherSessionByValue(previousSchoolActiveId)?.id || "";\r
    } else {\r
      schoolActiveSessionId = schoolActiveSession?.id || "";\r
      if (settingsSnap?.exists?.()) {\r
        const settings = settingsSnap.data() || {};\r
        const configuredValue = firstProfileText(\r
          settings.sessionId,\r
          settings.activeSessionId,\r
          settings.currentSessionId,\r
          settings.academicSessionId,\r
          settings.session,\r
          settings.activeSession,\r
          settings.currentSession,\r
          settings.sessionLabel,\r
          settings.currentYear,\r
          settings.academicSession\r
        );\r
        configuredSessionMismatch = Boolean(configuredValue && !schoolActiveSession);\r
        if (configuredSessionMismatch) {\r
          teacherSessionLoadError = "The school's active-session setting does not match any configured session.";\r
        }\r
      }\r
    }\r
\r
    const userSelectedSession = findTeacherSessionByValue(teacherUserSelectedSessionId);\r
    const previousValidatedSession = previousContextReady ? findTeacherSessionByValue(previousSelectedId) : null;\r
    const sortedSessions = sortSessions(allSessions);\r
    const fallbackSession = sortedSessions.find((session) => session.locked !== true) || sortedSessions[0] || null;\r
    const preferredSession = configuredSessionMismatch\r
      ? null\r
      : settingsResult.status === "rejected"\r
        ? previousValidatedSession\r
        : userSelectedSession || schoolActiveSession || fallbackSession;\r
    if (preferredSession) setSelectedSession(preferredSession.id);\r
    else {\r
      activeSessionId = "";\r
      activeSessionLabel = "";\r
      activeSessionLocked = true;\r
      if (!allSessions.length && !teacherSessionLoadError) {\r
        teacherSessionLoadError = "No academic sessions are configured for this school.";\r
      }\r
    }\r
    sessionsLoadedForSchool = schoolIdAtStart;\r
    sessionContextReady = Boolean(preferredSession && activeSessionId);\r
\r
    const selectionChanged = previousSelectedId !== activeSessionId;\r
    if (selectionChanged) resetTeacherSessionDependentState();\r
\r
    populateSessionSelector();\r
    populateHeaderSessionSelector();\r
    updateSessionBadge();\r
    applySessionLockState();\r
    try {\r
      localStorage.setItem(\`schoolixTeacherSessions_\${schoolIdAtStart}\`, JSON.stringify({\r
        savedAt: Date.now(),\r
        sessions: allSessions,\r
        activeSessionId,\r
        schoolActiveSessionId\r
      }));\r
    } catch {}\r
    return {\r
      selectionChanged,\r
      sessionsChanged: previousSessionIds !== allSessions.map((session) => session.id).sort().join("|"),\r
      error: sessionContextReady ? null : new Error(teacherSessionLoadError || "Session context unavailable")\r
    };\r
  } catch(e) {\r
    console.error("Session loading failed:", e);\r
    allSessions = [];\r
    activeSessionId = "";\r
    activeSessionLabel = "";\r
    activeSessionLocked = true;\r
    schoolActiveSessionId = "";\r
    sessionContextReady = false;\r
    teacherSessionLoadError = "Unable to load this school's sessions. Check your connection and sign in again if it continues.";\r
    resetTeacherSessionDependentState();\r
    populateSessionSelector();\r
    populateHeaderSessionSelector();\r
    updateSessionBadge();\r
    applySessionLockState();\r
    return { selectionChanged: previousSelectedId !== "", sessionsChanged: previousSessionIds !== "", error: e };\r
  }\r
}\r
\r
function populateSessionSelector() {\r
  const selector = document.getElementById("sessionSelector");\r
  if (!selector) return;\r
  \r
  selector.innerHTML = \`<option value="">\${teacherSessionLoadError ? "Unable to load school sessions" : "— Select Session —"}</option>\`;\r
  \r
  const sortedSessions = sortSessions(allSessions);\r
  \r
  sortedSessions.forEach(session => {\r
    const option = document.createElement("option");\r
    option.value = session.id;\r
    option.textContent = \`\${getSessionLabel(session) || 'Unnamed'}\${session.id === schoolActiveSessionId ? " (School active)" : ""}\${session.locked ? " (Locked)" : ""}\`;\r
    if (session.id === activeSessionId) {\r
      option.selected = true;\r
    }\r
    selector.appendChild(option);\r
  });\r
  selector.title = teacherSessionLoadError || "Select an academic session";\r
}\r
\r
function updateSessionBadge() {\r
  const badge = document.getElementById("currentSessionBadge");\r
  if (!badge) return;\r
  \r
  if (sessionContextReady && activeSessionId && activeSessionLabel) {\r
    const prefix = schoolActiveSessionId && activeSessionId !== schoolActiveSessionId ? "Viewing" : "Active";\r
    badge.textContent = \`\${prefix}: \${activeSessionLabel}\${activeSessionLocked ? " (Locked)" : ""}\`;\r
    badge.className = activeSessionLocked ? "lock-badge locked" : "lock-badge unlocked";\r
  } else {\r
    badge.textContent = teacherSessionLoadError ? "Session unavailable" : "No Active Session";\r
    badge.className = "lock-badge locked";\r
  }\r
  const topbarBadge = $("topbarSessionBadge");\r
  if (topbarBadge) {\r
    topbarBadge.textContent = badge.textContent;\r
    topbarBadge.className = badge.className;\r
  }\r
}\r
\r
function populateHeaderSessionSelector() {\r
  const selector = document.getElementById("headerSessionSelector");\r
  if (!selector) return;\r
  \r
  selector.innerHTML = \`<option value="">\${teacherSessionLoadError ? "Unable to load school sessions" : "No school sessions configured"}</option>\`;\r
  \r
  if (!allSessions.length) return;\r
  \r
  const sortedSessions = sortSessions(allSessions);\r
  \r
  selector.innerHTML = '';\r
  \r
  sortedSessions.forEach(session => {\r
    const option = document.createElement("option");\r
    option.value = session.id;\r
    option.textContent = \`\${getSessionLabel(session) || 'Unnamed'}\${session.id === schoolActiveSessionId ? " (School active)" : ""}\${session.locked ? " (Locked)" : ""}\`;\r
    if (session.id === activeSessionId) {\r
      option.selected = true;\r
    }\r
    selector.appendChild(option);\r
  });\r
  selector.title = teacherSessionLoadError || "Select an academic session";\r
}\r
\r
window.onHeaderSessionChange = async function() {\r
  const selector = document.getElementById("headerSessionSelector");\r
  if (!selector) return;\r
  \r
  const selectedSessionId = selector.value;\r
  if (!selectedSessionId) return;\r
  \r
  if (!setSelectedSession(selectedSessionId)) return;\r
  teacherUserSelectedSessionId = activeSessionId === schoolActiveSessionId ? "" : activeSessionId;\r
  sessionContextReady = Boolean(adminId && activeSessionId && findTeacherSessionByValue(activeSessionId));\r
  \r
  updateSessionBadge();\r
  populateSessionSelector();\r
  resetTeacherSessionDependentState();\r
  applySessionLockState();\r
  \r
  // Reload data for new session\r
  await loadEverything();\r
};\r
\r
window.onSessionChange = async function() {\r
  const selector = document.getElementById("sessionSelector");\r
  if (!selector) return;\r
  \r
  const selectedSessionId = selector.value;\r
  if (!selectedSessionId) return;\r
  \r
  if (!setSelectedSession(selectedSessionId)) return;\r
  teacherUserSelectedSessionId = activeSessionId === schoolActiveSessionId ? "" : activeSessionId;\r
  sessionContextReady = Boolean(adminId && activeSessionId && findTeacherSessionByValue(activeSessionId));\r
  \r
  updateSessionBadge();\r
  populateHeaderSessionSelector();\r
  resetTeacherSessionDependentState();\r
  applySessionLockState();\r
  \r
  // Reload data for new session\r
  await loadEverything();\r
};\r
\r
\r
function disableAllEditControls() {\r
  // Disable all buttons that could modify data (except view/print/logout)\r
  const safeClasses = ["btn-secondary", "btn-info", "logout-btn", "tab-btn"];\r
  const safeOnclicks = ["logout", "printReport", "printAssignedTimetable", "printClassTimetable", "printClassStudentList", "printDueFeeList", "printLowAttendanceList", "printDailyAttendance", "loadTeacherTimetable", "switchTab", "showGeneratedReports", "loadReportTab", "loadSalaryData", "reloadAttendanceTab"];\r
  const safeIds = ["studentSearch", "studentAttendanceBelow", "attendanceDate", "salaryMonthPicker", "headerSessionSelector", "sessionSelector", "reportTermSelect", "teacherClassSelector"];\r
  document.querySelectorAll("button, input, select, textarea").forEach(el => {\r
    const onclick = el.getAttribute("onclick") || "";\r
    const isSafe = safeClasses.some(c => el.classList.contains(c)) ||\r
                   safeOnclicks.some(s => onclick.includes(s)) ||\r
                   safeIds.includes(el.id) ||\r
                   el.closest(".tab-bar");\r
    if (!isSafe) {\r
      el.disabled = true;\r
      el.style.opacity = "0.55";\r
      el.style.cursor = "not-allowed";\r
      el.title = "Session locked by admin — view only";\r
    }\r
  });\r
  // Special: make all attendance inputs disabled\r
  document.querySelectorAll("select[data-student], input[data-student]").forEach(el => {\r
    el.disabled = true;\r
  });\r
  isLocked = true;\r
}\r
\r
function enableAllEditControls() {\r
  document.querySelectorAll("button, input, select, textarea").forEach(el => {\r
    el.disabled = false;\r
    el.style.opacity = "";\r
    el.style.cursor = "";\r
    el.title = "";\r
  });\r
  isLocked = false;\r
  renderAttendanceList();\r
}\r
\r
async function loadEverything({ includeSecondary = false } = {}) {\r
  if (!sessionContextReady || !adminId || !activeSessionId) {\r
    showPanelError("studentsList", "Dashboard data is syncing. Please try again shortly.");\r
    showPanelError("attendanceList", "Attendance data is syncing. Please try again shortly.");\r
    showPanelError("reportContent", "Report card data is syncing. Please try again shortly.");\r
    applySessionLockState();\r
    return { error: new Error(teacherSessionLoadError || "Session context unavailable") };\r
  }\r
  try {\r
    await loadStudents();\r
  } catch (error) {\r
    console.error("Student loading failed:", error);\r
    allStudents = [];\r
    showPanelError("studentsList", "Students load nahi ho pa rahe.");\r
  }\r
\r
  // Paint the roster immediately. Attendance and fees can continue loading\r
  // without keeping the first useful dashboard view blank.\r
  renderStudents();\r
  updateTodayStats();\r
\r
  await Promise.all([\r
    loadAllAttendance().catch((error) => {\r
      console.error("Attendance loading failed:", error);\r
      allAttendance = [];\r
      showPanelError("attendanceList", "Attendance records load nahi ho pa rahe.");\r
    }),\r
    loadFees().catch((error) => {\r
      console.error("Fee loading failed:", error);\r
      allFees = [];\r
    }),\r
  ]);\r
\r
  updateTodayStats();\r
  renderAttendanceList();\r
\r
  const loadSecondaryData = () => Promise.allSettled([\r
    loadSalaryData(),\r
    loadTerms()\r
  ]).then((results) => {\r
    const termsResult = results[1];\r
    if (termsResult.status === "rejected") {\r
      console.error("Report term loading failed:", termsResult.reason);\r
      showPanelError("reportContent", "Report card terms load nahi ho pa rahe.");\r
    }\r
    const salaryResult = results[0];\r
    if (salaryResult.status === "rejected") {\r
      console.error("Salary loading failed:", salaryResult.reason);\r
    }\r
  });\r
  if (includeSecondary) await loadSecondaryData();\r
  else setTimeout(() => loadSecondaryData().catch(() => {}), 0);\r
}\r
\r
// ── STUDENTS ───────────────────────────────────────────────────────\r
async function loadStudents({ force = false } = {}) {\r
  if (!sessionContextReady || !adminId || !activeSessionId) {\r
    throw new Error("Teacher school session is not verified.");\r
  }\r
\r
  const cacheKey = \`schoolixTeacherStudents_\${adminId}_\${activeSessionId}_\${teacherData.docId || teacherData.uid || "teacher"}\`;\r
  if (!force) {\r
    let cached = null;\r
    try { cached = JSON.parse(localStorage.getItem(cacheKey) || "null"); } catch {}\r
    if (cached?.savedAt && Date.now() - cached.savedAt < TEACHER_DATA_CACHE_TTL_MS && Array.isArray(cached.students)) {\r
      allStudents = cached.students;\r
      activeClassSection = cached.activeClassSection || { class: "", section: "" };\r
      studentScopeMode = cached.studentScopeMode || "direct";\r
      $("statTotal").textContent = allStudents.length;\r
      updateAssignmentLabels();\r
      setTimeout(() => loadStudents({ force: true }).catch(() => {}), 0);\r
      return { fromCache: true };\r
    }\r
  }\r
  const snap = await getDocs(collection(db, "schools", adminId, "students"));\r
  const schoolStudents = snap.docs.map(d => ({ id: d.id, ...d.data() }));\r
  const resolved = resolveTeacherStudentScope(schoolStudents);\r
  allStudents = resolved.students.sort(sortStudentsByRollName);\r
  activeClassSection = resolved.activePlacement;\r
  studentScopeMode = resolved.mode;\r
  $("statTotal").textContent = allStudents.length;\r
  updateAssignmentLabels();\r
  try {\r
    localStorage.setItem(cacheKey, JSON.stringify({\r
      savedAt: Date.now(),\r
      students: allStudents,\r
      activeClassSection,\r
      studentScopeMode\r
    }));\r
  } catch {}\r
}\r
\r
async function loadFees() {
  const visibleStudentIds = getVisibleStudentIds();
  if (!visibleStudentIds.size) { allFees = []; return; }
  const snap = await getDocs(collection(db, "schools", adminId, "fees"));
  allFees = snap.docs
    .map(d => ({ id: d.id, ...d.data() }))
    .filter((entry) => [...visibleStudentIds].some((studentId) => feeBelongsToStudent(entry, studentId)) && belongsToActiveSession(entry));
}\r
\r
async function loadAllAttendance() {\r
  const visibleStudentIds = getVisibleStudentIds();\r
  if (!visibleStudentIds.size) { allAttendance = []; return; }\r
  \r
  const snap = await getDocs(collection(db, "schools", adminId, "attendance"));\r
  allAttendance = snap.docs\r
    .map(d => ({ id: d.id, ...d.data() }))\r
    .filter((entry) => visibleStudentIds.has(entry.studentId) && belongsToActiveSession(entry));\r
}\r
\r
function updateTodayStats() {\r
  const today = todayISO();\r
  const todayRecs = allAttendance.filter(a => a.date === today);\r
  $("statPresent").textContent = todayRecs.filter(a => a.status === "Present").length;\r
  $("statAbsent").textContent = todayRecs.filter(a => a.status === "Absent").length;\r
  if (allStudents.length && allAttendance.length) {\r
    const pcts = allStudents.map(s => {\r
      const sid = s.studentId || s.id;\r
      return getStudentAttendancePercentValue(sid);\r
    });\r
    $("statAvgAtt").textContent = \`\${Math.round(pcts.reduce((a, b) => a + b, 0) / pcts.length)}%\`;\r
  } else {\r
    $("statAvgAtt").textContent = "—";\r
  }\r
}\r
\r
function getFeeStatus(studentId) {
  const fees = allFees.filter((fee) => feeBelongsToStudent(fee, studentId));
  if (!fees.length) return { label: "No Record", cls: "badge-pending" };
  const total = fees.reduce((sum, fee) => sum + moneyValue(fee.originalAmount ?? fee.amount ?? 0), 0);
  const paid = fees.reduce((sum, fee) => sum + moneyValue(fee.totalPaidAmount ?? fee.paidAmount ?? 0), 0);
  const due = fees.reduce((sum, fee) => {
    if (fee.remainingAmount !== undefined && fee.remainingAmount !== null) return sum + moneyValue(fee.remainingAmount);
    return sum + Math.max(0, moneyValue(fee.originalAmount ?? fee.amount ?? 0) - moneyValue(fee.totalPaidAmount ?? fee.paidAmount ?? 0));
  }, 0);
  if (total > 0 && due <= 0) return { label: "Paid", cls: "badge-paid" };
  if (paid > 0) return { label: \`Due ₹\${due.toLocaleString("en-IN")}\`, cls: "badge-pending" };
  return { label: \`Due ₹\${due.toLocaleString("en-IN")}\`, cls: "badge-due" };
}\r
\r
function rollSortValue(student = {}) {\r
  return Number(String(student.roll || student.rollNo || "").replace(/[^\\d]/g, "")) || Number.MAX_SAFE_INTEGER;\r
}\r
\r
function sortStudentsByRollName(left, right) {\r
  return rollSortValue(left) - rollSortValue(right) ||\r
    String(left.name || "").localeCompare(String(right.name || ""), "en", { sensitivity: "base", numeric: true }) ||\r
    String(left.studentId || left.id || "").localeCompare(String(right.studentId || right.id || ""), "en", { numeric: true });\r
}\r
\r
function moneyValue(value) {\r
  const parsed = Number(String(value || "0").replace(/[^\\d.-]/g, ""));\r
  return Number.isFinite(parsed) ? parsed : 0;\r
}\r
\r
function getAttendanceWeight(status) {\r
  return status === "Present" ? 1 : status === "Half Day" ? 0.5 : 0;\r
}\r
\r
function getStudentAttendanceRecords(studentId) {\r
  return allAttendance.filter(a => a.studentId === studentId);\r
}\r
\r
function getStudentAttendancePercentValue(studentId) {\r
  const recs = getStudentAttendanceRecords(studentId);\r
  if (!recs.length) return 0;\r
  const weightedPresent = recs.reduce((sum, record) => sum + getAttendanceWeight(record.status), 0);\r
  return Math.round((weightedPresent / recs.length) * 100);\r
}\r
\r
function getAttendanceBelowThreshold() {\r
  const raw = $("studentAttendanceBelow")?.value;\r
  if (raw === undefined || raw === null || raw === "") return NaN;\r
  const parsed = Number(raw);\r
  if (!Number.isFinite(parsed)) return NaN;\r
  return Math.max(0, Math.min(100, parsed));\r
}\r
\r
function getFeeDueAmount(studentId) {
  return allFees
    .filter((fee) => feeBelongsToStudent(fee, studentId))
    .reduce((sum, fee) => {\r
      const total = moneyValue(fee.originalAmount ?? fee.amount ?? 0);\r
      const paid = moneyValue(fee.totalPaidAmount ?? fee.paidAmount ?? 0) + moneyValue(fee.extraPaidAmount ?? fee.totalExtraPaidAmount ?? 0);\r
      const due = fee.remainingAmount !== undefined ? moneyValue(fee.remainingAmount) : Math.max(0, total - paid);\r
      return sum + Math.max(0, due);\r
    }, 0);\r
}\r
\r
function getPrintableClassTitle() {\r
  return formatBadgeClassSection(getActivePlacement()).replace(/\\s+/g, " ").trim();\r
}\r
\r
function openPrintableDocument(title, subtitle, tableHtml) {\r
  const html = buildPrintablePage(title, subtitle, tableHtml);\r
  if (window.SchoolixPrint?.printHtml?.(title, html)) return;\r
  const printWindow = window.open("", "_blank");\r
  if (!printWindow) {\r
    toast("Please allow popups to print or save PDF.", "error");\r
    return;\r
  }\r
  printWindow.document.write(html);\r
  printWindow.document.close();\r
  printWindow.focus();\r
  printWindow.print();\r
}\r
\r
function printableStudentRows(students, options = {}) {\r
  return students.map((student, index) => {\r
    const sid = student.studentId || student.id || "";\r
    const dueAmount = getFeeDueAmount(sid);\r
    const attendanceRecords = getStudentAttendanceRecords(sid);\r
    const attendancePct = getStudentAttendancePercentValue(sid);\r
    return \`<tr>\r
      <td>\${index + 1}</td>\r
      <td>\${escapeHtml(student.name || "Student")}</td>\r
      <td>\${escapeHtml(sid || "-")}</td>\r
      <td>\${escapeHtml(student.roll || student.rollNo || "-")}</td>\r
      \${options.includeDue ? \`<td>\${escapeHtml(fmt(dueAmount))}</td>\` : ""}\r
      \${options.includeAttendance ? \`<td>\${attendancePct}%</td><td>\${attendanceRecords.length}</td>\` : ""}\r
    </tr>\`;\r
  }).join("");\r
}\r
\r
window.printClassStudentList = function() {\r
  if (!allStudents.length) return toast("No students found to print.", "error");\r
  const students = [...allStudents].sort(sortStudentsByRollName);\r
  const table = \`<table>\r
    <thead><tr><th>S.No.</th><th>Student Name</th><th>Student ID</th><th>Roll No.</th></tr></thead>\r
    <tbody>\${printableStudentRows(students)}</tbody>\r
  </table>\`;\r
  openPrintableDocument(\`\${getPrintableClassTitle()} Student List\`, \`\${students.length} student(s) | \${activeSessionLabel || "Current Session"}\`, table);\r
};\r
\r
window.printDueFeeList = function() {\r
  const dueStudents = allStudents\r
    .map(student => ({ ...student, dueAmount: getFeeDueAmount(student.studentId || student.id) }))\r
    .filter(student => student.dueAmount > 0)\r
    .sort((a, b) => b.dueAmount - a.dueAmount || String(a.name || "").localeCompare(String(b.name || "")));\r
  if (!dueStudents.length) return toast("No fee dues found in this class.", "info");\r
  const totalDue = dueStudents.reduce((sum, student) => sum + student.dueAmount, 0);\r
  const table = \`<table>\r
    <thead><tr><th>S.No.</th><th>Student Name</th><th>Student ID</th><th>Roll No.</th><th>Due Amount</th></tr></thead>\r
    <tbody>\${printableStudentRows(dueStudents, { includeDue: true })}</tbody>\r
  </table>\r
  <div class="footer"><strong>Total Due:</strong> \${escapeHtml(fmt(totalDue))}</div>\`;\r
  openPrintableDocument(\`\${getPrintableClassTitle()} Fee Due List\`, \`\${dueStudents.length} student(s) with pending fees | \${activeSessionLabel || "Current Session"}\`, table);\r
};\r
\r
window.printLowAttendanceList = function() {\r
  const threshold = getAttendanceBelowThreshold();\r
  const students = getFilteredStudentRoster().sort(sortStudentsByRollName);\r
  if (!students.length) {\r
    const message = Number.isNaN(threshold)\r
      ? "No students found to print."\r
      : \`No students found below \${threshold}% attendance.\`;\r
    return toast(message, Number.isNaN(threshold) ? "error" : "info");\r
  }\r
  const title = Number.isNaN(threshold)\r
    ? \`\${getPrintableClassTitle()} Attendance List\`\r
    : \`\${getPrintableClassTitle()} Low Attendance List\`;\r
  const subtitle = Number.isNaN(threshold)\r
    ? \`\${students.length} student(s) | \${activeSessionLabel || "Current Session"}\`\r
    : \`\${students.length} student(s) below \${threshold}% attendance | \${activeSessionLabel || "Current Session"}\`;\r
  const table = \`<table>\r
    <thead><tr><th>S.No.</th><th>Student Name</th><th>Student ID</th><th>Roll No.</th><th>Attendance %</th><th>Marked Days</th></tr></thead>\r
    <tbody>\${printableStudentRows(students, { includeAttendance: true })}</tbody>\r
  </table>\`;\r
  openPrintableDocument(title, subtitle, table);\r
};\r
\r
window.printDailyAttendance = function() {\r
  const date = $("attendanceDate")?.value || todayISO();\r
  if (!allStudents.length) return toast("No students found to print attendance.", "error");\r
  const rows = [...allStudents].sort(sortStudentsByRollName).map((student, index) => {\r
    const sid = student.studentId || student.id || "";\r
    const selectValue = Array.from(document.querySelectorAll(".att-select")).find(select => select.dataset.sid === sid)?.value;\r
    const savedValue = findAttendanceRecord(sid, date)?.status;\r
    const status = selectValue || savedValue || "Not Marked";\r
    return \`<tr>\r
      <td>\${index + 1}</td>\r
      <td>\${escapeHtml(student.name || "Student")}</td>\r
      <td>\${escapeHtml(sid || "-")}</td>\r
      <td>\${escapeHtml(student.roll || student.rollNo || "-")}</td>\r
      <td>\${escapeHtml(status)}</td>\r
    </tr>\`;\r
  }).join("");\r
  const counts = Array.from(document.querySelectorAll(".att-select")).reduce((acc, select) => {\r
    acc[select.value] = (acc[select.value] || 0) + 1;\r
    return acc;\r
  }, {});\r
  const summary = \`Date: \${formatAttendanceDate(date)} | Present: \${counts.Present || 0} | Absent: \${counts.Absent || 0} | Half Day: \${counts["Half Day"] || 0}\`;\r
  const table = \`<table>\r
    <thead><tr><th>S.No.</th><th>Student Name</th><th>Student ID</th><th>Roll No.</th><th>Status</th></tr></thead>\r
    <tbody>\${rows}</tbody>\r
  </table>\`;\r
  openPrintableDocument(\`\${getPrintableClassTitle()} Daily Attendance\`, summary, table);\r
};\r
\r
function getFatherPhone(student = {}) {\r
  return student.fatherPhone || student.fatherMobile || student.fatherContact || student.phone || "";\r
}\r
\r
function getMotherPhone(student = {}) {\r
  return student.motherPhone || student.motherMobile || student.motherContact || student.phone || "";\r
}\r
\r
function getParentEmail(student = {}) {\r
  return String(student.parentEmail || student.fatherEmail || student.motherEmail || student.guardianEmail || student.email || "").trim();\r
}\r
\r
function findAttendanceRecord(studentId, date) {\r
  return allAttendance.find(record =>\r
    record.studentId === studentId &&\r
    record.date === date &&\r
    (record.sessionId || "") === (activeSessionId || "")\r
  ) || allAttendance.find(record => record.studentId === studentId && record.date === date);\r
}\r
\r
async function sendAbsenceEmail(student, date, attendanceDocId) {\r
  const parentEmail = getParentEmail(student);\r
\r
  const response = await fetch(ABSENCE_EMAIL_FUNCTION_URL, {\r
    method: "POST",\r
    headers: {\r
      "Content-Type": "application/json",\r
      "apikey": SUPABASE_ANON_KEY,\r
      "Authorization": \`Bearer \${SUPABASE_ANON_KEY}\`\r
    },\r
    body: JSON.stringify({\r
      parentEmail,\r
      studentName: student.name || "Student",\r
      studentId: student.studentId || student.id || "",\r
      studentDocId: student.id || "",\r
      authUid: student.authUid || student.uid || "",\r
      studentAliases: [\r
        student.studentId,\r
        student.id,\r
        student.studentDocId,\r
        student.authUid,\r
        student.uid,\r
        student.email,\r
        student.authEmail\r
      ].filter(Boolean),\r
      schoolId: adminId || "",\r
      className: student.class || teacherData.class || "",\r
      section: student.section || teacherData.section || "",\r
      date: formatAttendanceDate(date),\r
      teacherName: teacherData.name || auth.currentUser?.email || "Teacher",\r
      schoolName: window.SchoolBranding?.getSchoolName() || "Schoolix"\r
    })\r
  });\r
\r
  if (!response.ok) {\r
    const details = await response.text();\r
    throw new Error(details || "Absence email failed");\r
  }\r
  const result = await response.json().catch(() => ({}));\r
\r
  await updateDoc(doc(db, "schools", adminId, "attendance", attendanceDocId), {\r
    absenceEmailSent: Boolean(result.emailSent),\r
    absenceEmailSentAt: serverTimestamp(),\r
    absenceEmailSentTo: result.emailSent ? parentEmail : "",\r
    absenceStudentNotificationSent: Boolean(result.notificationSent),\r
    absenceStudentNotificationSentAt: serverTimestamp()\r
  });\r
  return Boolean(result.emailSent || result.notificationSent);\r
}\r
\r
function getTodayAtt(studentId) {\r
  const r = allAttendance.find(a => a.studentId === studentId && a.date === todayISO());\r
  if (!r) return { label: "No Mark", cls: "badge-noclass" };\r
  if (r.status === "Present") return { label: "Present", cls: "badge-present" };\r
  if (r.status === "Absent") return { label: "Absent", cls: "badge-absent" };\r
  return { label: "Half Day", cls: "badge-half" };\r
}\r
\r
function getAttPct(studentId) {\r
  const recs = allAttendance.filter(a => a.studentId === studentId);\r
  if (!recs.length) return "—";\r
  return \`\${Math.round(recs.filter(a => a.status === "Present").length / recs.length * 100)}%\`;\r
}\r
\r
window.renderStudents = renderStudents;\r
\r
function getFilteredStudentRoster() {\r
  const q = ($("studentSearch")?.value || "").toLowerCase();\r
  const attendanceBelow = getAttendanceBelowThreshold();\r
  return allStudents.filter(s => {\r
    const sid = s.studentId || s.id;\r
    const matchesSearch = !q || (s.name||"").toLowerCase().includes(q) ||\r
      (s.studentId||"").toLowerCase().includes(q) ||\r
      (s.roll||"").toLowerCase().includes(q);\r
    const matchesAttendance = Number.isNaN(attendanceBelow) || getStudentAttendancePercentValue(sid) < attendanceBelow;\r
    return matchesSearch && matchesAttendance;\r
  });\r
}\r
\r
function renderStudents() {\r
  const threshold = getAttendanceBelowThreshold();\r
  const list = getFilteredStudentRoster().sort(sortStudentsByRollName);\r
  if (!list.length) {\r
    const filterLabel = Number.isNaN(threshold)\r
      ? formatShortClassSection(getActivePlacement())\r
      : \`\${formatShortClassSection(getActivePlacement())} below \${threshold}% attendance\`;\r
    $("studentsList").innerHTML = \`<div class="empty-state">No students found for \${escapeHtml(filterLabel)}.</div>\`;\r
    return;\r
  }\r
  $("studentsList").innerHTML = list.map(s => {\r
    const sid = s.studentId || s.id;\r
    const fee = getFeeStatus(sid);\r
    const att = getTodayAtt(sid);\r
    const pct = \`\${getStudentAttendancePercentValue(sid)}%\`;\r
    const tc = s.tcIssued ? \`<span class="badge badge-tc">TC</span>\` : "";\r
    const fatherPhone = getFatherPhone(s);\r
    const motherPhone = getMotherPhone(s);\r
    return \`\r
    <div class="student-row" onclick="openStudentModal('\${s.id}')">\r
      <div class="student-main">\r
        \${renderStudentFace(s)}\r
        <div>\r
        <div class="stu-name">\${s.name || "N/A"} \${tc}</div>\r
        <div class="stu-meta">ID: \${sid} | Roll: \${s.roll || "—"} | Father: \${s.father || "—"} (\${fatherPhone || "—"}) | Mother: \${s.mother || "—"} (\${motherPhone || "—"})</div>\r
      </div>\r
        </div>\r
      <div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:flex-end;">\r
        <span class="badge \${att.cls}">\${att.label}</span>\r
        <span class="badge \${fee.cls}">\${fee.label}</span>\r
        <span class="badge badge-noclass" style="background:var(--primary-soft);color:var(--primary);">\${pct} att.</span>\r
      </div>\r
    </div>\`;\r
  }).join("");\r
}\r
\r
$("studentSearch")?.addEventListener("input", renderStudents);\r
$("studentAttendanceBelow")?.addEventListener("input", renderStudents);\r
\r
// ── STUDENT MODAL ──────────────────────────────────────────────────\r
window.openStudentModal = function(docId) {\r
  const s = allStudents.find(x => x.id === docId);\r
  if (!s) return;\r
  const sid = s.studentId || s.id;\r
  const recs = allAttendance.filter(a => a.studentId === sid);\r
  const present = recs.filter(a => a.status === "Present").length;\r
  const absent = recs.filter(a => a.status === "Absent").length;\r
  const half = recs.filter(a => a.status === "Half Day").length;\r
  const pct = getStudentAttendancePercentValue(sid);\r
  const fee = getFeeStatus(sid);\r
  const fatherPhone = getFatherPhone(s);\r
  const motherPhone = getMotherPhone(s);\r
  $("modalStudentTitle").textContent = s.name || "Student";\r
  $("modalStudentBody").innerHTML = \`\r
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;">\r
      \${renderStudentFace(s)}\r
      <div>\r
        <div class="stu-name">\${escapeHtml(s.name || "Student")}</div>\r
        <div class="stu-meta">ID: \${escapeHtml(sid)}</div>\r
      </div>\r
    </div>\r
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:10px;margin-bottom:18px;">\r
      <div class="sal-box"><div class="sal-num" style="color:var(--primary);">\${pct}%</div><div class="sal-lbl">Attendance</div></div>\r
      <div class="sal-box green"><div class="sal-num">\${present}</div><div class="sal-lbl">Present</div></div>\r
      <div class="sal-box red"><div class="sal-num">\${absent}</div><div class="sal-lbl">Absent</div></div>\r
      <div class="sal-box orange"><div class="sal-num">\${half}</div><div class="sal-lbl">Half Day</div></div>\r
    </div>\r
    <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:14px;">\r
      <tr><td style="padding:8px 0;color:var(--muted);width:40%;font-weight:700;">Student ID</td><td>\${sid}</td></tr>\r
      <tr><td style="padding:8px 0;color:var(--muted);font-weight:700;">Class</td><td>\${s.class}-\${s.section} | Roll \${s.roll||"—"}</td></tr>\r
      <tr><td style="padding:8px 0;color:var(--muted);font-weight:700;">Father</td><td>\${s.father||"—"}</td></tr>\r
      <tr><td style="padding:8px 0;color:var(--muted);font-weight:700;">Father Phone</td><td>\${fatherPhone||"—"}</td></tr>\r
      <tr><td style="padding:8px 0;color:var(--muted);font-weight:700;">Mother</td><td>\${s.mother||"—"}</td></tr>\r
      <tr><td style="padding:8px 0;color:var(--muted);font-weight:700;">Mother Phone</td><td>\${motherPhone||"—"}</td></tr>\r
      <tr><td style="padding:8px 0;color:var(--muted);font-weight:700;">Primary Phone</td><td>\${s.phone||"—"}</td></tr>\r
      <tr><td style="padding:8px 0;color:var(--muted);font-weight:700;">Fee Status</td><td><span class="badge \${fee.cls}">\${fee.label}</span></td></tr>\r
    </table>\r
    \${s.tcIssued ? \`<div class="info-box locked">Transfer Certificate issued — attendance and updates are restricted.</div>\` : ""}\r
  \`;\r
  $("studentModal").classList.add("open");\r
};\r
window.closeStudentModal = () => $("studentModal").classList.remove("open");\r
\r
// ── ATTENDANCE ─────────────────────────────────────────────────────\r
async function reloadAttendanceTab() {\r
  if (!requireAttendanceAccess()) return;\r
  await loadAllAttendance();\r
  renderAttendanceList();\r
}\r
window.reloadAttendanceTab = reloadAttendanceTab;\r
\r
function getAttendanceAccessState(date) {\r
  if (!date) {\r
    return { locked: true, reason: "missing-date", badgeClass: "locked", badgeText: "Select Date",\r
      message: \`<div class="info-box notice">Select a date to view or save attendance.</div>\` };\r
  }\r
  if (date > todayISO()) {\r
    return { locked: true, reason: "future-date", badgeClass: "locked", badgeText: "Future Locked",\r
      message: \`<div class="info-box notice">Attendance can only be marked for today or the last 48 hours from the teacher panel.</div>\` };\r
  }\r
  const selectedDate = parseAttendanceDate(date);\r
  const isOlderThan48Hours = selectedDate ? (Date.now() - selectedDate.getTime()) >= ATTENDANCE_EDIT_WINDOW_MS : false;\r
  if (isOlderThan48Hours) {\r
    return { locked: true, reason: "expired-window", badgeClass: "locked", badgeText: "View Only",\r
      message: \`<div class="info-box locked">Attendance for \${formatAttendanceDate(date)} is view-only. Older than 48 hours.</div>\` };\r
  }\r
  return { locked: false, reason: "editable-window", badgeClass: "unlocked", badgeText: "Editable",\r
    message: \`<div class="info-box success">Teacher changes remain open for 48 hours. Save attendance for \${formatAttendanceDate(date)} while this window is active.</div>\` };\r
}\r
\r
function setAttendanceEditControlsDisabled(disabled) {\r
  document.querySelectorAll("[data-attendance-edit-control]").forEach(control => { control.disabled = disabled; });\r
}\r
\r
function renderAttendanceList() {\r
  if (!attendanceAccessEnabled) {\r
    $("attendanceList").innerHTML = \`<div class="empty-state">Attendance access has been disabled for your school by the Super Admin.</div>\`;\r
    return;\r
  }\r
  const date = $("attendanceDate").value;\r
  if (!date) return;\r
  const accessState = getAttendanceAccessState(date);\r
  isLocked = accessState.locked;\r
  const lockBadge = $("lockBadge");\r
  lockBadge.className = \`lock-badge \${accessState.badgeClass}\`;\r
  lockBadge.textContent = accessState.badgeText;\r
  $("lockInfo").innerHTML = accessState.message;\r
  setAttendanceEditControlsDisabled(isLocked);\r
\r
  if (!allStudents.length) {\r
    $("attendanceList").innerHTML = \`<div class="empty-state">No students found in this class/section.</div>\`;\r
    updateAttMiniStats(); return;\r
  }\r
  const attendanceForDate = allAttendance.filter(a => a.date === date);\r
  const rmap = {};\r
  attendanceForDate.forEach(a => { rmap[a.studentId] = a.status; });\r
\r
  if (isLocked && !attendanceForDate.length) {\r
    const emptyMessage = accessState.reason === "future-date"\r
      ? "Future dates cannot be marked from the teacher panel."\r
      : \`No attendance was saved for \${formatAttendanceDate(date)}. This date is now view-only.\`;\r
    $("attendanceList").innerHTML = \`<div class="empty-state">\${emptyMessage}</div>\`;\r
    updateAttMiniStats(); return;\r
  }\r
\r
  $("attendanceList").innerHTML = [...allStudents].sort(sortStudentsByRollName).map(s => {\r
    const sid = s.studentId || s.id;\r
    const hasSavedStatus = Object.prototype.hasOwnProperty.call(rmap, sid);\r
    const status = hasSavedStatus ? rmap[sid] : (isLocked ? "Not Marked" : "Present");\r
    const rowCls = status === "Present" ? "att-present" : status === "Absent" ? "att-absent" : status === "Half Day" ? "att-half" : "att-unmarked";\r
    const tc = !!s.tcIssued;\r
    const disabled = isLocked || tc ? "disabled" : "";\r
    const safeSid = escapeHtml(sid);\r
    const safeName = escapeHtml(s.name || "Student");\r
    const safeRoll = escapeHtml(s.roll || "-");\r
    const options = (isLocked\r
      ? ["Present", "Absent", "Half Day", "Not Marked"]\r
      : ["Present", "Absent", "Half Day"]\r
    ).map(v => \`<option value="\${v}" \${v===status?"selected":""}>\${v}</option>\`).join("");\r
    return \`\r
    <div class="att-row \${rowCls}" id="attrow-\${safeSid}">\r
      <div class="att-student-main">\r
        \${renderStudentFace(s, "student-face attendance-face")}\r
        <div>\r
          <div style="font-weight:700;">\${safeName} \${tc ? \`<span class="badge badge-tc">TC</span>\` : ""}</div>\r
        <div style="font-size:12px;color:var(--muted);">ID: \${safeSid} | Roll: \${safeRoll}</div>\r
      </div>\r
        </div>\r
      <select class="att-select" id="attsel-\${safeSid}" data-sid="\${safeSid}" onchange="onAttChange(this)" \${disabled}>\r
        \${options}\r
      </select>\r
    </div>\`;\r
  }).join("");\r
  updateAttMiniStats();\r
}\r
window.renderAttendanceList = renderAttendanceList;\r
\r
window.onAttChange = function(sel) {\r
  const row = sel.closest(".att-row");\r
  const statusClass = sel.value === "Present" ? "att-present" : sel.value === "Absent" ? "att-absent" : sel.value === "Half Day" ? "att-half" : "att-unmarked";\r
  row.className = \`att-row \${statusClass}\`;\r
  updateAttMiniStats();\r
};\r
\r
function updateAttMiniStats() {\r
  const rows = Array.from(document.querySelectorAll(".att-select"));\r
  let p = 0, a = 0, h = 0;\r
  rows.forEach(s => { if (s.value === "Present") p++; else if (s.value === "Absent") a++; else if (s.value === "Half Day") h++; });\r
  $("attP").textContent = p; $("attA").textContent = a; $("attH").textContent = h;\r
  const total = p + a + h;\r
  $("attPct").textContent = total ? \`\${Math.round(p/total*100)}%\` : "0%";\r
}\r
\r
window.bulkMark = function(status) {\r
  if (!requireAttendanceAccess()) return;\r
  if (!requireValidatedTeacherSession("mark attendance")) return;\r
  if (isLocked) return toast("Attendance is locked.", "error");\r
  document.querySelectorAll(".att-select:not([disabled])").forEach(sel => { sel.value = status; window.onAttChange(sel); });\r
};\r
\r
window.saveAttendance = async function() {\r
  if (!requireAttendanceAccess()) return;\r
  if (!requireValidatedTeacherSession("save attendance")) return;\r
  if (activeSessionLocked) return toast("Selected session is locked. Attendance is view only.", "error");\r
  if (isLocked) return toast("Attendance is locked.", "error");\r
  const date = $("attendanceDate").value;\r
  if (!date) return toast("Select a date.", "error");\r
  if (!confirm(\`Save attendance for \${formatAttendanceDate(date)}?\`)) return;\r
  const sels = document.querySelectorAll(".att-select:not([disabled])");\r
  if (!sels.length) return toast("No editable students.", "error");\r
  const writes = [];\r
  const absenceEmailTasks = [];\r
  sels.forEach(sel => {\r
    const sid = sel.dataset.sid;\r
    const student = allStudents.find(s => (s.studentId||s.id) === sid);\r
    if (!student) return;\r
    const attendanceDocId = \`\${sid}_\${date}_\${activeSessionId}\`;\r
    const existingRecord = findAttendanceRecord(sid, date) || {};\r
    const hasParentEmail = Boolean(getParentEmail(student));\r
    const shouldEmailAbsent = sel.value === "Absent" &&\r
      ((hasParentEmail && !existingRecord.absenceEmailSent) || !existingRecord.absenceStudentNotificationSent);\r
    const attendancePayload = {\r
      studentId: sid, studentName: student.name, class: student.class || teacherData.class, section: student.section || teacherData.section,\r
      date, status: sel.value, teacherId: teacherData.uid || auth.currentUser.uid, teacherUid: teacherData.uid || auth.currentUser.uid,\r
      teacherName: teacherData.name || auth.currentUser?.email || "Teacher",\r
      markedBy: teacherData.name || auth.currentUser?.email || "Teacher",\r
      markedByRole: "teacher",\r
      timestamp: serverTimestamp(),\r
      sessionId: activeSessionId || "", session: activeSessionLabel || ""\r
    };\r
    if (sel.value === "Absent") {\r
      attendancePayload.absenceEmailSent = existingRecord.absenceEmailSent || false;\r
      attendancePayload.absenceEmailSentAt = existingRecord.absenceEmailSentAt || null;\r
      attendancePayload.absenceEmailSentTo = existingRecord.absenceEmailSentTo || "";\r
      attendancePayload.absenceStudentNotificationSent = existingRecord.absenceStudentNotificationSent || false;\r
      attendancePayload.absenceStudentNotificationSentAt = existingRecord.absenceStudentNotificationSentAt || null;\r
    } else {\r
      attendancePayload.absenceEmailSent = false;\r
      attendancePayload.absenceEmailSentAt = null;\r
      attendancePayload.absenceEmailSentTo = "";\r
      attendancePayload.absenceStudentNotificationSent = false;\r
      attendancePayload.absenceStudentNotificationSentAt = null;\r
    }\r
    writes.push(setDoc(doc(db, "schools", adminId, "attendance", attendanceDocId), attendancePayload));\r
    if (shouldEmailAbsent) {\r
      absenceEmailTasks.push({ student, date, attendanceDocId });\r
    }\r
  });\r
  await Promise.all(writes);\r
  const emailResults = await Promise.allSettled(absenceEmailTasks.map(task => sendAbsenceEmail(task.student, task.date, task.attendanceDocId)));\r
  await loadAllAttendance();\r
  updateTodayStats();\r
  renderAttendanceList();\r
  const failedCount = emailResults.filter(result => result.status === "rejected").length;\r
  if (failedCount) {\r
    console.warn(\`\${failedCount} absence alert(s) could not be sent.\`);\r
    toast("Attendance updated.");\r
  } else {\r
    toast("Attendance updated.");\r
  }\r
};\r
\r
$("attendanceDate")?.addEventListener("change", renderAttendanceList);\r
\r
function setTeacherQrStatus(message, type = "info") {\r
  const box = $("teacherQrStatus");\r
  if (!box) return;\r
  box.textContent = message;\r
  box.style.borderColor = type === "error" ? "rgba(192,40,15,0.28)" : type === "success" ? "rgba(10,138,78,0.28)" : "var(--border)";\r
  box.style.color = type === "error" ? "var(--danger)" : type === "success" ? "var(--success)" : "var(--muted)";\r
}\r
\r
function parseTeacherQrToken(rawValue) {\r
  const value = String(rawValue || "").trim();\r
  const prefix = "SCHLX-TEACHER-ATT:";\r
  return value.startsWith(prefix) ? value.slice(prefix.length).trim() : value;\r
}\r
\r
async function markTeacherAttendanceFromQr(rawValue) {\r
  if (!requireAttendanceAccess()) return;\r
  const tokenId = parseTeacherQrToken(rawValue);\r
  if (!tokenId) return toast("QR code is empty.", "error");\r
  if (!adminId || !teacherData.uid) return toast("Teacher profile is still loading.", "error");\r
\r
  const tokenRef = doc(db, "schools", adminId, "teacher_attendance_qr", tokenId);\r
  const tokenSnap = await getDoc(tokenRef);\r
  if (!tokenSnap.exists()) throw new Error("This QR code was not found. Ask admin to generate a fresh QR.");\r
\r
  const token = tokenSnap.data();\r
  if (token.teacherUid !== teacherData.uid) throw new Error("This QR belongs to another teacher.");\r
  if (token.active === false) throw new Error("This QR code has already been used.");\r
  if (Number(token.expiresAtMillis || 0) && Date.now() > Number(token.expiresAtMillis)) {\r
    throw new Error("This QR has expired. Ask admin to show the latest QR.");\r
  }\r
  if (!token.date || token.date !== todayISO()) throw new Error("This QR is not for today's attendance.");\r
\r
  const qrMode = token.qrMode || "checkin";\r
  const attendanceRef = doc(db, "schools", adminId, "teacher_attendance", \`\${teacherData.uid}_\${token.date}\`);\r
  const existingAttendanceSnap = await getDoc(attendanceRef);\r
  const existingAttendance = existingAttendanceSnap.exists() ? existingAttendanceSnap.data() : {};\r
  const actionTime = token.actionTime || token.checkInTime || token.checkOutTime || "";\r
  const nextStatus = qrMode === "halfday" ? "Half Day" : (existingAttendance.status || "Present");\r
  const nextCheckIn = qrMode === "checkout"\r
    ? (existingAttendance.checkInTime || token.checkInTime || "")\r
    : (existingAttendance.checkInTime || token.checkInTime || actionTime);\r
  const nextCheckOut = qrMode === "checkin"\r
    ? (existingAttendance.checkOutTime || "")\r
    : (token.checkOutTime || actionTime);\r
  const notes = qrMode === "checkout"\r
    ? "Check-out marked by teacher QR scan."\r
    : qrMode === "halfday"\r
      ? "Half day marked by teacher QR scan."\r
      : "Check-in marked by teacher QR scan.";\r
\r
  await setDoc(attendanceRef, {\r
    teacherUid: teacherData.uid,\r
    teacherId: teacherData.teacherId || token.teacherId || "",\r
    teacherName: teacherData.name || token.teacherName || "",\r
    teacherEmail: teacherData.email || token.teacherEmail || "",\r
    class: teacherData.class || "",\r
    section: teacherData.section || "",\r
    date: token.date,\r
    status: nextStatus,\r
    presentWeight: nextStatus === "Half Day" ? 0.5 : 1,\r
    checkInTime: nextCheckIn,\r
    checkOutTime: nextCheckOut,\r
    notes,\r
    qrTokenId: tokenId,\r
    lastQrMode: qrMode,\r
    updatedAt: serverTimestamp(),\r
    updatedBy: teacherData.email || auth.currentUser?.email || "teacher"\r
  }, { merge: true });\r
\r
  await setDoc(tokenRef, {\r
    active: false,\r
    scannedAt: serverTimestamp(),\r
    scannedBy: teacherData.email || auth.currentUser?.email || "",\r
    scannedByUid: teacherData.uid\r
  }, { merge: true });\r
\r
  setTeacherQrStatus(\`\${token.modeLabel || "Attendance"} marked for \${formatAttendanceDate(token.date)} at \${actionTime || "admin time"}.\`, "success");\r
  toast(\`\${token.modeLabel || "Attendance"} marked.\`);\r
  window.loadTeacherAttendanceHistory?.();\r
}\r
\r
window.submitTeacherQrManualCode = async function() {\r
  if (!requireAttendanceAccess()) return;\r
  try {\r
    await markTeacherAttendanceFromQr($("teacherQrManualCode")?.value || "");\r
    $("teacherQrManualCode").value = "";\r
  } catch (error) {\r
    console.error(error);\r
    setTeacherQrStatus(error.message || "Unable to mark attendance from QR.", "error");\r
    toast(error.message || "Unable to mark attendance from QR.", "error");\r
  }\r
};\r
\r
window.startTeacherQrScanner = async function() {\r
  if (!requireAttendanceAccess()) return;\r
  if (!("BarcodeDetector" in window)) {\r
    setTeacherQrStatus("Camera QR scanning is not supported in this browser. Paste the code below instead.", "error");\r
    return;\r
  }\r
  if (teacherQrStream) return;\r
  try {\r
    const video = $("teacherQrVideo");\r
    teacherQrStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" }, audio: false });\r
    video.srcObject = teacherQrStream;\r
    video.style.display = "block";\r
    $("teacherQrCameraHint").style.display = "none";\r
    await video.play();\r
    const detector = new BarcodeDetector({ formats: ["qr_code"] });\r
    setTeacherQrStatus("Scanning for QR code...", "info");\r
    teacherQrScanTimer = window.setInterval(async () => {\r
      if (teacherQrScanBusy || !teacherQrStream) return;\r
      teacherQrScanBusy = true;\r
      try {\r
        const codes = await detector.detect(video);\r
        if (codes.length) {\r
          await markTeacherAttendanceFromQr(codes[0].rawValue);\r
          window.stopTeacherQrScanner();\r
        }\r
      } catch (error) {\r
        console.error(error);\r
        setTeacherQrStatus(error.message || "Unable to scan this QR.", "error");\r
      } finally {\r
        teacherQrScanBusy = false;\r
      }\r
    }, 700);\r
  } catch (error) {\r
    console.error(error);\r
    setTeacherQrStatus(error.message || "Camera permission was not granted.", "error");\r
  }\r
};\r
\r
window.stopTeacherQrScanner = function() {\r
  if (teacherQrScanTimer) window.clearInterval(teacherQrScanTimer);\r
  teacherQrScanTimer = null;\r
  teacherQrScanBusy = false;\r
  if (teacherQrStream) {\r
    teacherQrStream.getTracks().forEach(track => track.stop());\r
    teacherQrStream = null;\r
  }\r
  const video = $("teacherQrVideo");\r
  if (video) {\r
    video.pause();\r
    video.srcObject = null;\r
    video.style.display = "none";\r
  }\r
  if ($("teacherQrCameraHint")) $("teacherQrCameraHint").style.display = "block";\r
};\r
\r
function teacherAttendanceBadge(status) {\r
  if (status === "Present") return "badge-present";\r
  if (status === "Half Day") return "badge-half";\r
  if (status === "Absent") return "badge-absent";\r
  return "badge-noclass";\r
}\r
\r
window.loadTeacherAttendanceHistory = async function() {\r
  if (!requireAttendanceAccess()) return;\r
  const box = $("teacherAttendanceHistory");\r
  if (!box || !adminId || !teacherData.uid) return;\r
  const month = $("teacherAttendanceMonth")?.value || currentMonth();\r
  box.innerHTML = \`<div class="empty-state">Loading attendance details...</div>\`;\r
  try {\r
    const snap = await getDocs(query(collection(db, "schools", adminId, "teacher_attendance"), where("teacherUid", "==", teacherData.uid)));\r
    const monthPrefix = \`\${month}-\`;\r
    const records = snap.docs\r
      .map(docSnap => ({ id: docSnap.id, ...docSnap.data() }))\r
      .filter(record => String(record.date || "").startsWith(monthPrefix))\r
      .sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")));\r
\r
    if (!records.length) {\r
      box.innerHTML = \`<div class="empty-state">No teacher attendance found for this month.</div>\`;\r
      return;\r
    }\r
\r
    box.innerHTML = records.map(record => {\r
      const checkIn = record.checkInTime || "--";\r
      const checkOut = record.checkOutTime || "--";\r
      const status = record.status || "Not Marked";\r
      return \`\r
        <div class="teacher-attendance-record">\r
          <div>\r
            <div class="record-date">\${formatAttendanceDate(record.date)}</div>\r
            <div class="record-meta">\${escapeHtml(record.notes || "Attendance marked")}</div>\r
          </div>\r
          <span class="badge \${teacherAttendanceBadge(status)}">\${escapeHtml(status)}</span>\r
          <div class="record-meta" style="text-align:right;">\r
            <strong>In:</strong> \${escapeHtml(checkIn)}<br>\r
            <strong>Out:</strong> \${escapeHtml(checkOut)}\r
          </div>\r
        </div>\`;\r
    }).join("");\r
  } catch (error) {\r
    console.error(error);\r
    box.innerHTML = \`<div class="empty-state">Unable to load attendance details.</div>\`;\r
  }\r
};\r
\r
// ── SALARY ─────────────────────────────────────────────────────────\r
window.loadSalaryData = async function() {\r
  const month = $("salaryMonthPicker").value;\r
  if (!month || !adminId) return;\r
  $("statSalaryMonth").textContent = new Date(month+"-01").toLocaleDateString("en-IN",{month:"long",year:"numeric"});\r
  const recordId = \`\${teacherData.uid}_\${month}\`;\r
  const snap = await getDoc(doc(db, "schools", adminId, "teacher_salary_records", recordId));\r
  if (snap.exists()) {\r
    salaryRecord = snap.data();\r
    const base = Number(salaryRecord.baseSalary || teacherData.monthlySalary || 0);\r
    const net = Number(salaryRecord.netSalary || 0);\r
    const paid = Number(salaryRecord.paidAmount || 0);\r
    const remaining = Number(salaryRecord.remainingAmount || 0);\r
    const deduction = Number(salaryRecord.deductionAmount || 0);\r
    const present = Number(salaryRecord.presentDays || 0);\r
    const half = Number(salaryRecord.halfDays || 0);\r
    const absent = Number(salaryRecord.absentDays || 0);\r
    $("salBase").textContent = fmt(base); $("salPresentDays").textContent = present;\r
    $("salHalfDays").textContent = half; $("salAbsentDays").textContent = absent;\r
    $("salDeduction").textContent = fmt(deduction); $("salNet").textContent = fmt(net);\r
    $("salPaid").textContent = fmt(paid); $("salPending").textContent = fmt(remaining);\r
    $("statNetSalary").textContent = fmt(net);\r
    const pct = net > 0 ? Math.min(100, Math.round(paid/net*100)) : 0;\r
    $("salProgressBar").style.width = pct + "%";\r
    $("salProgressLabel").textContent = \`\${pct}% paid\`;\r
    const payments = Array.isArray(salaryRecord.payments) ? salaryRecord.payments : [];\r
    if (payments.length) {\r
      $("salPaymentHistory").innerHTML = \`<div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:var(--muted);margin-bottom:8px;">Payment History</div>\r
        \${payments.slice().reverse().map(p => \`<div style="display:flex;justify-content:space-between;padding:10px 14px;border:1px solid var(--border);border-radius:var(--radius-sm);margin-bottom:6px;background:var(--surface2);">\r
          <div><strong style="font-size:14px;">\${fmt(p.amount)}</strong><div style="font-size:12px;color:var(--muted);">\${p.note || "Salary payment"}</div></div>\r
          <div style="text-align:right;font-size:12px;color:var(--muted);">\${p.paymentDate ? new Date(p.paymentDate+"T00:00").toLocaleDateString("en-IN") : "—"}</div>\r
        </div>\`).join("")}\`;\r
    } else {\r
      $("salPaymentHistory").innerHTML = \`<div style="font-size:13px;color:var(--muted);margin-top:4px;">No payment recorded for this month yet.</div>\`;\r
    }\r
  } else {\r
    const base = Number(teacherData.monthlySalary || 0);\r
    const attSnap = await getDocs(query(collection(db, "schools", adminId, "teacher_attendance"), where("teacherUid", "==", teacherData.uid)));\r
    const monthRecs = attSnap.docs.map(d => d.data()).filter(r => String(r.date||"").startsWith(month+"-"));\r
    const workingDays = countAttendanceWorkingDays(monthRecs);\r
    const perDay = workingDays ? base / workingDays : 0;\r
    const present = monthRecs.filter(r => r.status === "Present").length;\r
    const half = monthRecs.filter(r => r.status === "Half Day").length;\r
    const absent = monthRecs.filter(r => r.status === "Absent").length;\r
    const deduction = Math.round((absent + half*0.5) * perDay);\r
    const net = Math.max(base - deduction, 0);\r
    $("salBase").textContent = fmt(base); $("salPresentDays").textContent = present;\r
    $("salHalfDays").textContent = half; $("salAbsentDays").textContent = absent;\r
    $("salDeduction").textContent = fmt(deduction); $("salNet").textContent = fmt(net);\r
    $("salPaid").textContent = "₹0"; $("salPending").textContent = fmt(net);\r
    $("statNetSalary").textContent = fmt(net);\r
    $("salProgressBar").style.width = "0%"; $("salProgressLabel").textContent = "0% paid";\r
    $("salPaymentHistory").innerHTML = \`<div style="font-size:13px;color:var(--muted);margin-top:4px;">Salary record not yet generated by admin for this month.</div>\`;\r
  }\r
};\r
\r
// ── TERMS ──────────────────────────────────────────────────────────\r
async function loadTerms() {\r
  await loadReportTermLocks();\r
  const snap = await getDocs(collection(db, "schools", adminId, "terms"));\r
  const scopedTerms = snap.docs\r
    .map(d => ({ id: d.id, ...d.data() }))\r
    .filter(termBelongsToActiveSession)\r
    .filter(termBelongsToActivePlacement)\r
    .sort((a, b) => (a.createdAt?.seconds || 0) - (b.createdAt?.seconds || 0));\r
  const uniqueTerms = new Map();\r
  scopedTerms.forEach((term) => {\r
    const termKey = term.termKey || getReportTermKey(term.label || term.term || "");\r
    if (!termKey) return;\r
    const normalized = { ...term, termKey, label: term.label || term.term || termKey };\r
    if (!uniqueTerms.has(termKey) || term.section) uniqueTerms.set(termKey, normalized);\r
  });\r
  allTerms = Array.from(uniqueTerms.values());\r
  if (activeTermKey && !allTerms.some((term) => term.termKey === activeTermKey)) {\r
    activeTermKey = "";\r
    $("activeTermBanner").style.display = "none";\r
  }\r
  renderTermDropdown();\r
  if (!activeTermKey && $("reportTab")?.classList.contains("active")) {\r
    $("reportContent").innerHTML = \`<div class="empty-state">Select a term above to start entering marks.</div>\`;\r
  }\r
}\r
\r
async function loadReportTermLocks() {\r
  reportTermLocks = {};\r
  if (!adminId) return;\r
  try {\r
    const snap = await getDoc(doc(db, "schools", adminId, "settings", "reportCardTermLocks"));\r
    reportTermLocks = snap.exists() ? (snap.data().locks || {}) : {};\r
  } catch (error) {\r
    console.warn("Report term locks load failed:", error);\r
  }\r
}\r
\r
function renderTermDropdown() {\r
  const sel = $("reportTermSelect");\r
  const currentVal = activeTermKey;\r
  sel.innerHTML = \`<option value="">— Select a term —</option>\`;\r
  allTerms.forEach(t => {\r
    const opt = document.createElement("option");\r
    opt.value = t.termKey;\r
    opt.textContent = \`\${t.label}\${isReportTermLocked(t.termKey) ? " (Locked)" : ""}\`;\r
    if (t.termKey === currentVal) opt.selected = true;\r
    sel.appendChild(opt);\r
  });\r
}\r
\r
window.onTermSelectChange = function() {\r
  const sel = $("reportTermSelect");\r
  activeTermKey = sel.value;\r
  if (!activeTermKey) {\r
    $("activeTermBanner").style.display = "none";\r
    $("reportContent").innerHTML = \`<div class="empty-state">Select a term above to start entering marks.</div>\`;\r
    return;\r
  }\r
  const term = allTerms.find(t => t.termKey === activeTermKey);\r
  if (term) {\r
    $("activeTermBanner").style.display = "block";\r
    $("activeTermBanner").textContent = isReportTermLocked()\r
      ? \`Active Term: \${term.label} - Locked by admin. Marks and report cards are view only.\`\r
      : \`Active Term: \${term.label} - All marks entered below will be saved under this term.\`;\r
  }\r
  loadReportTab();\r
};\r
\r
// ── REPORT CARDS ───────────────────────────────────────────────────\r
async function loadSubjects() {\r
  const snap = await getDocs(collection(db, "schools", adminId, "subjects"));\r
  return snap.docs.map(d => ({ id: d.id, ...d.data(), maxMarks: Number(d.data().maxMarks || 100) }));\r
}\r
\r
window.loadReportTab = async function() {\r
  if (!activeTermKey) {\r
    $("reportContent").innerHTML = \`<div class='empty-state'>Select a term above to start entering marks.</div>\`;\r
    return;\r
  }\r
  const term = allTerms.find(t => t.termKey === activeTermKey);\r
  if (!term) return;\r
  const termLocked = isReportTermLocked();\r
\r
  const subjects = await loadSubjects();\r
  if (!subjects.length) {\r
    $("reportContent").innerHTML = \`<div class='empty-state'>No subjects added yet. Click "+ Add Subject" to start.</div>\`;\r
    return;\r
  }\r
\r
  const marksSnap = await getDocs(collection(db, "schools", adminId, "marks"));\r
  const marksMap = {};\r
  marksSnap.forEach(d => { marksMap[d.id] = d.data(); });\r
\r
  $("reportContent").innerHTML = allStudents.map(s => {\r
    const sid = s.studentId || s.id;\r
    const marksDoc = marksMap[sid] || {};\r
    const marksTermKey = getActiveMarksTermKey();\r
   const termMarks = marksDoc.terms?.[marksTermKey] || (!activeSessionId ? (marksDoc.terms?.[activeTermKey] || marksDoc.terms?.[term.label]) : {}) || {};\r
const inputs = subjects.map(sub => {\r
  const entry = getSubjectMarkEntry(termMarks, sub);\r
  const displayValue = (entry.obtained != null && entry.obtained !== "" && !isNaN(entry.obtained)) \r
    ? Number(entry.obtained) \r
    : "";\r
  const maxMarks = entry.maxMarks || getSubjectMaxMarks(sub);\r
  return \`\r
  <div class="marks-item">\r
    <span class="marks-label">\${sub.name} <span style="font-weight:600;color:var(--muted);text-transform:none;">(Max \${maxMarks})</span></span>\r
    <input class="marks-input" type="number" min="0" max="\${maxMarks}" placeholder="0–\${maxMarks}"\r
      value="\${displayValue}"\r
      data-student-id="\${escapeHtml(sid)}"\r
      data-subject="\${escapeHtml(sub.name)}"\r
      data-max-marks="\${maxMarks}"\r
      oninput="markMarksDirty()" \${activeSessionLocked || termLocked ? "disabled" : ""}>\r
  </div>\`;\r
}).join("");\r
    return \`\r
    <div class="grade-row">\r
      <div class="grade-head">\r
        <div>\r
          <strong style="font-size:15px;">\${s.name}</strong>\r
          <div style="font-size:12px;color:var(--muted);">ID: \${sid} | Roll: \${s.roll || "—"} | Term: \${term.label}</div>\r
        </div>\r
      </div>\r
      <div class="marks-grid">\${inputs}</div>\r
    </div>\`;\r
  }).join("") || \`<div class='empty-state'>No students.</div>\`;\r
  resetMarksDirtyState();\r
};\r
\r
window.markMarksDirty = function() {\r
  marksDirty = true;\r
  const btn = $("saveMarksBtn");\r
  if (!btn) return;\r
  btn.classList.remove("btn-primary");\r
  btn.classList.add("btn-warning");\r
  btn.innerHTML = \`<span class="ui-icon" data-icon="save"></span>Save Marks\`;\r
};\r
\r
function resetMarksDirtyState() {\r
  marksDirty = false;\r
  const btn = $("saveMarksBtn");\r
  if (!btn) return;\r
  btn.disabled = false;\r
  btn.classList.remove("btn-warning");\r
  btn.classList.add("btn-primary");\r
  btn.innerHTML = \`<span class="ui-icon" data-icon="save"></span>Save Marks\`;\r
}\r
\r
window.saveAllMarks = async function() {\r
  if (!requireValidatedTeacherSession("save marks")) return;\r
  if (activeSessionLocked) return toast("Selected session is locked. Marks are view only.", "error");\r
  if (isReportTermLocked()) return toast("This term is locked by admin. Marks are view only.", "error");\r
  if (!activeTermKey) return toast("Select term first", "error");\r
\r
  const inputs = Array.from(document.querySelectorAll("#reportContent .marks-input"));\r
  if (!inputs.length) return toast("No marks to save.", "error");\r
\r
  const marksTermKey = getActiveMarksTermKey();\r
  const grouped = new Map();\r
  inputs.forEach((input) => {\r
    const sid = input.dataset.studentId || "";\r
    const subject = input.dataset.subject || "";\r
    if (!sid || !subject) return;\r
    if (!grouped.has(sid)) grouped.set(sid, {});\r
    grouped.get(sid)[subject] = {\r
      obtained: input.value === "" || input.value == null ? null : Number(input.value),\r
      maxMarks: Number(input.dataset.maxMarks || input.max || 100)\r
    };\r
  });\r
\r
  if (!grouped.size) return toast("No marks to save.", "error");\r
\r
  const btn = $("saveMarksBtn");\r
  const previousHtml = btn?.innerHTML;\r
  if (btn) {\r
    btn.disabled = true;\r
    btn.innerHTML = \`<span class="ui-icon" data-icon="save"></span>Saving...\`;\r
  }\r
\r
  try {\r
    await Promise.all(Array.from(grouped.entries()).map(([sid, termMarks]) =>\r
      setDoc(doc(db, "schools", adminId, "marks", sid), {\r
        terms: { [marksTermKey]: termMarks },\r
        updatedAt: serverTimestamp(),\r
        updatedBy: teacherData.name || auth.currentUser?.email || "Teacher"\r
      }, { merge: true })\r
    ));\r
    toast("Marks saved successfully.", "success");\r
    marksDirty = false;\r
    if (btn) {\r
      btn.classList.remove("btn-warning");\r
      btn.classList.add("btn-primary");\r
      btn.innerHTML = \`<span class="ui-icon" data-icon="save"></span>Save Marks\`;\r
    }\r
  } catch (error) {\r
    console.error("Bulk marks save error:", error);\r
    toast("Unable to save marks.", "error");\r
    if (btn && previousHtml) btn.innerHTML = previousHtml;\r
  } finally {\r
    if (btn) btn.disabled = false;\r
  }\r
};\r
\r
window.saveMark = async function(sid, subject, value, maxMarks) {\r
  if (!requireValidatedTeacherSession("save marks")) return;\r
  if (activeSessionLocked) return toast("Selected session is locked. Marks are view only.", "error");\r
  if (isReportTermLocked()) return toast("This term is locked by admin. Marks are view only.", "error");\r
  if (!activeTermKey) {\r
    toast("Select term first", "error");\r
    return;\r
  }\r
\r
  const ref = doc(db, "schools", adminId, "marks", sid);\r
  const snap = await getDoc(ref);\r
\r
  let data = snap.exists() ? snap.data() : {};\r
\r
  if (!data.terms) data.terms = {};\r
  const marksTermKey = getActiveMarksTermKey();\r
  if (!data.terms[marksTermKey]) data.terms[marksTermKey] = {};\r
\r
  const obtainedValue = value === "" || value == null ? null : Number(value);\r
  \r
  data.terms[marksTermKey][subject] = {\r
    obtained: obtainedValue,\r
    maxMarks: Number(maxMarks || 100)\r
  };\r
\r
  await setDoc(ref, data, { merge: true });\r
  toast("Saved");\r
  \r
  setTimeout(() => loadReportTab(), 500);\r
};\r
window.generateAllReports = async function() {\r
  if (!requireValidatedTeacherSession("generate reports")) return;\r
  if (activeSessionLocked) return toast("Selected session is locked. Report cards are view only.", "error");\r
  if (isReportTermLocked()) return toast("This term is locked by admin. Report cards are view only.", "error");\r
  if (marksDirty) return toast("Save marks first, then generate reports.", "error");\r
  if (!activeTermKey) return toast("Select a term first.", "error");\r
  const term = allTerms.find(t => t.termKey === activeTermKey);\r
  if (!term) return toast("Term not found.", "error");\r
\r
  const subjects = await loadSubjects();\r
  if (!subjects.length) return toast("Add subjects first.", "error");\r
\r
  const marksSnap = await getDocs(collection(db, "schools", adminId, "marks"));\r
  const marksMap = {};\r
  marksSnap.forEach(d => { marksMap[d.id] = d.data(); });\r
\r
  for (const s of allStudents) {\r
    const sid = s.studentId || s.id;\r
    const marksDoc = marksMap[sid] || {};\r
    const marksTermKey = getActiveMarksTermKey();\r
    const termMarks = marksDoc.terms?.[marksTermKey] || (!activeSessionId ? (marksDoc.terms?.[activeTermKey] || marksDoc.terms?.[term.label]) : {}) || {};\r
    let total = 0, totalMax = 0;\r
\r
    // In generateAllReports, update the subjects mapping:\r
const subArr = subjects.map(sub => {\r
  const entry = getSubjectMarkEntry(termMarks, sub);\r
  // Treat null/empty as 0 for calculations only\r
  const obtained = (entry.obtained != null && !isNaN(entry.obtained)) ? Number(entry.obtained) : 0;\r
  const maxMarks = getSubjectMaxMarks(sub);\r
  total += obtained; \r
  totalMax += maxMarks;\r
  return { \r
    name: sub.name, \r
    obtained, \r
    maxMarks, \r
    remarks: getReportRemarks(obtained, maxMarks) \r
  };\r
});\r
    const pct = totalMax ? (total / totalMax) * 100 : 0;\r
    const grade = getReportGrade(pct);\r
\r
    const reportId = \`\${sid}_\${activeSessionId}_\${activeTermKey}\`;\r
    await setDoc(doc(db, "schools", adminId, "reportCards", reportId), {\r
      term: term.label, termKey: activeTermKey, termLabel: term.label,\r
      sessionId: activeSessionId || "", session: activeSessionLabel || "",\r
      student: { name: s.name, studentId: sid, class: s.class || teacherData.class, section: s.section || teacherData.section, roll: s.roll || s.rollNo || "" },\r
      subjects: subArr, totalMarks: total, totalMaxMarks: totalMax,\r
      percentage: Math.round(pct), grade, createdAt: serverTimestamp(), createdBy: teacherData.name\r
    }, { merge: true });\r
  }\r
\r
  toast(\`Report cards generated for \${term.label}.\`, "success");\r
  await showGeneratedReports();\r
};\r
\r
window.showGeneratedReports = async function() {\r
  $("reportContent").innerHTML = "<div class='empty-state'>Loading generated reports…</div>";\r
  const snap = await getDocs(collection(db, "schools", adminId, "reportCards"));\r
  let reports = snap.docs\r
    .map(d => ({ id: d.id, ...d.data() }))\r
    .filter(r => isSamePlacement(extractClassSection(r.student?.class, r.student?.section), getActivePlacement()) && belongsToActiveSession(r));\r
\r
  if (activeTermKey) {\r
    reports = reports.filter(r => r.termKey === activeTermKey || getReportTermKey(r.termLabel || r.term || "") === activeTermKey);\r
  }\r
  reports.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));\r
\r
  if (!reports.length) {\r
    $("reportContent").innerHTML = \`<div class='empty-state'>No generated reports for this class\${activeTermKey ? \` and selected term\` : ""} yet.</div>\`;\r
    return;\r
  }\r
\r
  const gradeCls = g => g==="A+"?"grade-a-plus":g==="A"?"grade-a":g==="B"?"grade-b":g==="C"?"grade-c":"grade-f";\r
  $("reportContent").innerHTML = reports.map(r => \`\r
    <div class="grade-row">\r
      <div class="grade-head">\r
        <div>\r
          <strong style="font-size:15px;">\${r.student?.name}</strong>\r
          <div style="font-size:12px;color:var(--muted);">\r
            ID: \${r.student?.studentId} | Term: \${r.termLabel || r.term || "—"} | \${r.percentage}% | \${r.createdAt ? new Date(r.createdAt.toDate()).toLocaleDateString("en-IN") : "—"}\r
          </div>\r
        </div>\r
        <div class="grade-pill \${gradeCls(r.grade)}">\${r.grade}</div>\r
      </div>\r
      <div style="display:flex;gap:8px;margin-top:8px;flex-wrap:wrap;">\r
        <button class="btn btn-primary btn-sm" onclick="printReport('\${r.id}')">Print</button>\r
        <button class="btn btn-neutral btn-sm" onclick="loadReportTab()">← Back to Marks</button>\r
      </div>\r
    </div>\`).join("");\r
};\r
\r
window.printReport = async function(rId) {\r
  const snap = await getDoc(doc(db, "schools", adminId, "reportCards", rId));\r
  if (!snap.exists()) return;\r
  const r = snap.data();\r
  const sn = window.SchoolBranding?.getSchoolName() || "Schoolix";\r
  const reportTerm = r.termLabel || r.term || "Report Card";\r
  const totalMarks = Number(r.totalMarks || 0);\r
  const totalMaxMarks = Number(r.totalMaxMarks || 0);\r
  const subHtml = (r.subjects || []).map(s => {\r
    const obtained = Number(s.obtained || 0);\r
    const maxMarks = Number(s.maxMarks || 100);\r
    const remarks = s.remarks || getReportRemarks(obtained, maxMarks);\r
    return \`<tr><td style="border:1px solid #000;padding:10px;text-align:left;">\${s.name}</td><td style="border:1px solid #000;padding:10px;text-align:center;">\${obtained}</td><td style="border:1px solid #000;padding:10px;text-align:center;">\${maxMarks}</td><td style="border:1px solid #000;padding:10px;text-align:center;">\${remarks}</td></tr>\`;\r
  }).join("");\r
  const reportHtml = \`<!DOCTYPE html><html><head>\r
<meta charset="UTF-8"><title>\${reportTerm} - \${r.student?.name}</title>\r
  <style>body{font-family:Georgia,serif;padding:30px;max-width:800px;margin:auto;}h1{text-align:center;}table{width:100%;border-collapse:collapse;margin:20px 0;}th{background:#1e2f8a;color:#fff;padding:12px;border:1px solid #000;}@media print{body{padding:0;}}</style></head><body>\r
  <h2 style="text-align:center;">\${sn}</h2>\r
  <h3 style="text-align:center;margin-top:0;">\${reportTerm}</h3>\r
  <p><strong>Student:</strong> \${r.student?.name} &nbsp; <strong>ID:</strong> \${r.student?.studentId} &nbsp; <strong>Class:</strong> \${r.student?.class}-\${r.student?.section} &nbsp; <strong>Term:</strong> \${reportTerm}</p>\r
  <table><thead><tr><th>Subject</th><th>Obtained</th><th>Max</th><th>Remarks</th></tr></thead><tbody>\${subHtml}</tbody></table>\r
  <p><strong>Total:</strong> \${totalMarks}/\${totalMaxMarks} &nbsp; <strong>Percentage:</strong> \${r.percentage}% &nbsp; <strong>Grade:</strong> \${r.grade}</p>\r
  <div style="margin-top:60px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:20px;text-align:center;">\r
    <div><div style="border-top:1px solid #000;padding-top:8px;">Class Teacher</div></div>\r
    <div><div style="border-top:1px solid #000;padding-top:8px;">Parent Signature</div></div>\r
    <div><div style="border-top:1px solid #000;padding-top:8px;">Principal</div></div>\r
  </div>\r
  <p style="margin-top:30px;font-size:12px;color:#666;text-align:center;">Generated: \${new Date().toLocaleDateString("en-IN")} | \${sn}</p>`,styles:[{tag:"style",attributes:{id:"sxCriticalLoaderStyle"},text:`
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
`},{tag:"link",attributes:{rel:"stylesheet",href:"schoolix-polish.css"},text:""},{tag:"link",attributes:{rel:"stylesheet",href:"schoolix-portal-dark.css"},text:""},{tag:"link",attributes:{rel:"stylesheet",href:"notice-panel.css?v=notices-20260720"},text:""}],scripts:[{attributes:{id:"sxCriticalLoaderScript"},text:`\r
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
`},{attributes:{},text:`
  // Immediately paint cached teacher name, school name, photo and details before
  // any async scripts or Firebase network operations begin.
  (function () {
    function getCachedTeacherIdentity() {
      try {
        let profile = null;
        const sessionRaw = localStorage.getItem("schoolixTeacherSession");
        if (sessionRaw) {
          try { profile = JSON.parse(sessionRaw); } catch {}
        }
        if (!profile || (!profile.name && !profile.teacherName && !profile.displayName)) {
          const lastRaw = localStorage.getItem("schoolixLastTeacherProfile");
          if (lastRaw) {
            try { profile = JSON.parse(lastRaw); } catch {}
          }
        }
        if (!profile || (!profile.name && !profile.teacherName && !profile.displayName)) {
          for (let index = 0; index < localStorage.length; index += 1) {
            const key = localStorage.key(index) || "";
            if (!key.startsWith("schoolixTeacherProfile_")) continue;
            try {
              const candidate = JSON.parse(localStorage.getItem(key) || "null");
              if (candidate && (candidate.name || candidate.teacherName || candidate.displayName)) {
                profile = candidate;
                break;
              }
            } catch {}
          }
        }
        return profile || {};
      } catch (_) {
        return {};
      }
    }

    function paintEarlyTeacherIdentity() {
      try {
        const profile = getCachedTeacherIdentity();
        const adminId = profile.adminId || profile.schoolId || localStorage.getItem("teacherSchoolId") || "";
        const schoolName = (adminId ? localStorage.getItem("schoolixSchoolName_" + adminId) : "")
          || profile.schoolName
          || localStorage.getItem("schoolix.schoolName")
          || "";
        const teacherName = profile.name || profile.fullName || profile.teacherName || profile.displayName || "";

        if (teacherName) {
          const nameEl = document.getElementById("teacherNameDisplay");
          if (nameEl) nameEl.textContent = teacherName;
          const topbarName = document.getElementById("topbarTeacherName");
          if (topbarName) topbarName.textContent = teacherName;
        }

        if (schoolName && schoolName !== "Schoolix") {
          const eyebrow = document.getElementById("schoolNameLabel");
          if (eyebrow) eyebrow.textContent = schoolName;
          const sidebarSchool = document.getElementById("sidebarSchoolName");
          if (sidebarSchool) sidebarSchool.textContent = schoolName;
        }

        if (profile.teacherId) {
          const idEl = document.getElementById("teacherIdLabel");
          if (idEl) idEl.textContent = "ID: " + profile.teacherId;
        }

        if (profile.email) {
          const emailEl = document.getElementById("emailLabel");
          if (emailEl) emailEl.textContent = profile.email;
        }

        const cls = profile.class || "";
        const sec = profile.section || localStorage.getItem("teacherSection") || "";
        if (cls || sec) {
          const badgeEl = document.getElementById("classSectionBadge");
          if (badgeEl) badgeEl.textContent = cls ? (cls + " - " + (sec || "All")) : (sec ? ("Sec " + sec) : "—");
        }

        const photo = profile.photoUrl || profile.imageUrl || profile.profilePhotoUrl || profile.avatarUrl;
        if (photo) {
          const heroPhoto = document.getElementById("teacherHeroPhoto");
          if (heroPhoto) heroPhoto.innerHTML = \`<img src="\${photo.replace(/"/g, "&quot;")}" alt="Teacher Photo">\`;
          const topbarAvatar = document.getElementById("topbarAvatar");
          if (topbarAvatar) topbarAvatar.innerHTML = \`<img src="\${photo.replace(/"/g, "&quot;")}" alt="Teacher" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">\`;
        } else if (teacherName) {
          const initial = teacherName.trim().charAt(0).toUpperCase() || "T";
          const heroPhoto = document.getElementById("teacherHeroPhoto");
          if (heroPhoto && !heroPhoto.querySelector("img")) heroPhoto.textContent = initial;
          const topbarAvatar = document.getElementById("topbarAvatar");
          if (topbarAvatar && !topbarAvatar.querySelector("img")) topbarAvatar.textContent = initial;
        }
      } catch (_) {}
    }

    window.paintEarlyTeacherIdentity = paintEarlyTeacherIdentity;

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", paintEarlyTeacherIdentity, { once: true });
    } else {
      paintEarlyTeacherIdentity();
    }
    window.addEventListener("schoolix:critical-load-ready", paintEarlyTeacherIdentity, { once: true });
  }());
`},{attributes:{},text:"window.paintEarlyTeacherIdentity?.();"},{attributes:{src:"school-branding.js"},text:""},{attributes:{type:"module"},text:`\r
import { initializeApp } from "./firebase-compat.js";\r
import {\r
  getAuth, signOut, onAuthStateChanged\r
} from "./firebase-compat.js";\r
import {\r
  getFirestore, doc, getDoc, getDocs, setDoc, updateDoc, addDoc, deleteDoc,\r
  collection, query, where, orderBy, limit, serverTimestamp, clearFirestoreReadCache\r
} from "./firebase-compat.js";\r
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
const auth = getAuth(app);\r
const db = getFirestore(app);\r
\r
const SUPABASE_URL = "https://ezkmeedcqetztkeppxil.supabase.co";\r
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6a21lZWRjcWV0enRrZXBweGlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxMjk5NjAsImV4cCI6MjA5MzcwNTk2MH0.1davJ_NYkFhHToUtcFBR0kA6dk0-cOkaIbK2SCObkQg";\r
const ABSENCE_EMAIL_FUNCTION_URL = \`\${SUPABASE_URL}/functions/v1/send-absence-email\`;\r
\r
let teacherData = {};\r
let adminId = "";\r
let activeSessionLocked = false;\r
let activeSessionLabel = "";\r
let activeSessionId = "";\r
let schoolActiveSessionId = "";\r
let sessionContextReady = false;\r
let teacherUserSelectedSessionId = "";\r
let teacherSessionLoadError = "";\r
let sessionsLoadedForSchool = "";\r
let teacherResumeRefreshAt = 0;\r
let teacherResumeRefreshPromise = null;\r
let allStudents = [];\r
let allFees = [];\r
let allAttendance = [];\r
let allSessions = [];\r
let activeClassSection = { class: "", section: "" };\r
let teacherAssignedPlacements = [];\r
let studentScopeMode = "direct";\r
let salaryRecord = null;\r
let isLocked = false;\r
let teacherQrStream = null;\r
let teacherQrScanTimer = null;\r
let teacherQrScanBusy = false;\r
let attendanceAccessEnabled = true;\r
// Term state\r
let allTerms = [];        // [{id, label, termKey, createdAt}]\r
let activeTermKey = "";   // currently selected termKey\r
let reportTermLocks = {};\r
let marksDirty = false;\r
\r
const ATTENDANCE_EDIT_WINDOW_MS = 48 * 60 * 60 * 1000;\r
const TEACHER_DATA_CACHE_TTL_MS = 30 * 60 * 1000;\r
const TEACHER_SESSION_CACHE_TTL_MS = 15 * 60 * 1000;\r
const CLASS_SEQUENCE = ["PG", "LKG", "UKG", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];\r
const ROMAN_TO_NUMERIC_CLASS = {\r
  I: "1", II: "2", III: "3", IV: "4", V: "5", VI: "6",\r
  VII: "7", VIII: "8", IX: "9", X: "10", XI: "11", XII: "12"\r
};\r
const CLASS_PARSE_TOKENS = Array.from(\r
  new Set([...CLASS_SEQUENCE, ...Object.keys(ROMAN_TO_NUMERIC_CLASS)])\r
).sort((left, right) => right.length - left.length);\r
const TEACHER_PAGE_TITLES = {\r
  home: "Dashboard",\r
  students: "Students",\r
  timetable: "Timetable",\r
  qrCheckin: "QR Check-In",\r
  myAttendance: "My Attendance",\r
  attendance: "Student Attendance",\r
  report: "Report Cards",\r
  notices: "Notices"\r
};\r
\r
const ATTENDANCE_TABS = new Set(["qrCheckin", "myAttendance", "attendance"]);\r
\r
function requireAttendanceAccess() {\r
  if (attendanceAccessEnabled) return true;\r
  toast("Attendance access has been disabled for your school by the Super Admin.", "error");\r
  return false;\r
}\r
\r
function applyAttendanceAccessState(adminData) {\r
  attendanceAccessEnabled = (adminData.features || {}).attendance !== false;\r
  ATTENDANCE_TABS.forEach(tabName => {\r
    document.querySelectorAll(\`[data-tab="\${tabName}"]\`).forEach(el => {\r
      el.hidden = !attendanceAccessEnabled;\r
      if ("disabled" in el) el.disabled = !attendanceAccessEnabled;\r
    });\r
    const panel = document.getElementById(\`\${tabName}Tab\`);\r
    if (!panel) return;\r
    if (!attendanceAccessEnabled) {\r
      panel.innerHTML = \`<div class="section-card"><div class="empty-state">Attendance access has been disabled for your school by the Super Admin.</div></div>\`;\r
    }\r
  });\r
  if (!attendanceAccessEnabled && ATTENDANCE_TABS.has(document.querySelector(".tab-content.active")?.id?.replace("Tab", ""))) {\r
    switchTab("home");\r
  }\r
}\r
\r
const ICON_PATHS = {\r
  activity: '<path d="M22 12h-4l-3 8L9 4l-3 8H2"/>',\r
  bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/>',\r
  "book-open": '<path d="M12 7v14"/><path d="M3 5a5 5 0 0 1 5-1l4 2v15l-4-2a5 5 0 0 0-5 1z"/><path d="M21 5a5 5 0 0 0-5-1l-4 2v15l4-2a5 5 0 0 1 5 1z"/>',\r
  "calendar-days": '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"/>',\r
  "check-circle": '<path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="9"/>',\r
  "clipboard-check": '<path d="M9 5h6"/><path d="M9 3h6v4H9z"/><path d="M5 5h2m10 0h2v16H5V5"/><path d="M9 14l2 2 4-4"/>',\r
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',\r
  eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>',\r
  "file-check": '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M9 15l2 2 4-4"/>',\r
  "file-text": '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h6"/>',\r
  home: '<path d="M3 11l9-8 9 8"/><path d="M5 10v11h14V10"/><path d="M9 21v-6h6v6"/>',\r
  logout: '<path d="M10 17l5-5-5-5"/><path d="M15 12H3"/><path d="M21 3v18h-6"/>',\r
  menu: '<path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/>',\r
  plus: '<path d="M12 5v14M5 12h14"/>',\r
  printer: '<path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 14h12v8H6z"/>',\r
  refresh: '<path d="M20 11a8 8 0 0 0-14.5-4.5L3 9"/><path d="M3 3v6h6"/><path d="M4 13a8 8 0 0 0 14.5 4.5L21 15"/><path d="M21 21v-6h-6"/>',\r
  save: '<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><path d="M17 21v-8H7v8M7 3v5h8"/>',\r
  scan: '<path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M7 12h10"/>',\r
  school: '<path d="M22 10v6"/><path d="M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 2 9 2 12 0v-5"/>',\r
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',\r
  wallet: '<path d="M3 7a2 2 0 0 1 2-2h14v14H5a2 2 0 0 1-2-2z"/><path d="M17 12h4v4h-4a2 2 0 0 1 0-4z"/>',\r
  "x-circle": '<circle cx="12" cy="12" r="9"/><path d="M15 9l-6 6M9 9l6 6"/>'\r
};\r
\r
function iconSvg(name, className = "ui-icon") {\r
  const path = ICON_PATHS[name] || ICON_PATHS["file-text"];\r
  return \`<svg class="\${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">\${path}</svg>\`;\r
}\r
\r
function hydrateStaticIcons(root = document) {\r
  root.querySelectorAll("[data-icon]").forEach((host) => {\r
    if (host.dataset.iconReady === "true") return;\r
    host.innerHTML = iconSvg(host.dataset.icon, host.className || "ui-icon");\r
    host.dataset.iconReady = "true";\r
  });\r
}\r
\r
hydrateStaticIcons();\r
\r
document.body.dataset.activeTab = "home";\r
\r
window.openSidebar = function() {\r
  $("teacherSidebar")?.classList.add("open");\r
  $("sidebarOverlay")?.classList.add("open");\r
};\r
\r
window.closeSidebar = function() {\r
  $("teacherSidebar")?.classList.remove("open");\r
  $("sidebarOverlay")?.classList.remove("open");\r
};\r
\r
function mountTeacherShellControls() {\r
  const slot = $("topbarSessionSlot");\r
  const selector = $("headerSessionSelector");\r
  if (slot && selector && selector.parentElement !== slot) {\r
    selector.removeAttribute("style");\r
    slot.appendChild(selector);\r
  }\r
}\r
\r
mountTeacherShellControls();\r
\r
// ── UTILS ──────────────────────────────────────────────────────────\r
function $(id) { return document.getElementById(id); }\r
\r
function firstProfileText(...values) {\r
  return values.map(value => String(value || "").replace(/\\s+/g, " ").trim()).find(Boolean) || "";\r
}\r
\r
function linkedTeacherSchoolId(profile = {}) {\r
  const canonical = firstProfileText(\r
    profile.schoolId,\r
    profile.schoolID,\r
    profile.schoolUid,\r
    profile.schoolUID,\r
    profile.schoolDocId,\r
    profile.schoolDocID\r
  );\r
  const legacyAdminLink = firstProfileText(\r
    profile.adminId,\r
    profile.adminID,\r
    profile.adminUid,\r
    profile.adminUID,\r
    profile.adminDocId,\r
    profile.adminDocID\r
  );\r
  if (canonical && legacyAdminLink && canonical !== legacyAdminLink) {\r
    console.warn("Teacher profile has conflicting school links; using canonical schoolId.", {\r
      schoolId: canonical,\r
      adminId: legacyAdminLink\r
    });\r
  }\r
  return canonical || legacyAdminLink;\r
}\r
\r
function setTeacherSchoolId(value = "") {\r
  const nextSchoolId = String(value || "").trim();\r
  if (nextSchoolId === adminId) return false;\r
  adminId = nextSchoolId;\r
  allSessions = [];\r
  activeSessionId = "";\r
  activeSessionLabel = "";\r
  activeSessionLocked = false;\r
  schoolActiveSessionId = "";\r
  sessionContextReady = false;\r
  teacherUserSelectedSessionId = "";\r
  teacherSessionLoadError = "";\r
  sessionsLoadedForSchool = "";\r
  allStudents = [];\r
  allFees = [];\r
  allAttendance = [];\r
  resetTeacherSessionDependentState();\r
  applySessionLockState();\r
  syncTeacherNotificationContext();\r
  return true;\r
}\r
\r
function resetTeacherSessionDependentState() {\r
  allTerms = [];\r
  activeTermKey = "";\r
  reportTermLocks = {};\r
  marksDirty = false;\r
  teacherTimetableLoadInFlight = null;\r
  cachedTeacherTimetable = {\r
    assignments: [],\r
    assignedSchedule: {},\r
    classFullTimetable: null,\r
    teacherPlacement: { class: "", section: "" }\r
  };\r
  const termSelector = $("reportTermSelect");\r
  if (termSelector) termSelector.innerHTML = \`<option value="">— Select a term —</option>\`;\r
  const termBanner = $("activeTermBanner");\r
  if (termBanner) termBanner.style.display = "none";\r
  const reportContent = $("reportContent");\r
  if (reportContent) reportContent.innerHTML = \`<div class="empty-state">Select a validated school session to load report cards.</div>\`;\r
  const studentsList = $("studentsList");\r
  if (studentsList) studentsList.innerHTML = \`<div class="empty-state">Select a validated school session to load students.</div>\`;\r
  const attendanceList = $("attendanceList");\r
  if (attendanceList) attendanceList.innerHTML = \`<div class="empty-state">Attendance data is syncing. Please try again shortly.</div>\`;\r
  ["statTotal", "statPresent", "statAbsent"].forEach((id) => {\r
    const stat = $(id);\r
    if (stat) stat.textContent = "0";\r
  });\r
  const timetableBody = $("assignedTimetableBody");\r
  if (timetableBody) timetableBody.innerHTML = \`<tr><td colspan="6" class="empty-state">Open this tab after the school session loads.</td></tr>\`;\r
  resetMarksDirtyState();\r
}\r
\r
function syncTeacherNotificationContext() {\r
  const detail = adminId ? {\r
    schoolId: adminId,\r
    role: "teacher",\r
    teacherId: teacherData.teacherId || teacherData.uid || "",\r
    teacherDocId: teacherData.docId || "",\r
    email: teacherData.email || auth.currentUser?.email || "",\r
    authUid: teacherData.authUid || auth.currentUser?.supabaseUid || auth.currentUser?.uid || ""\r
  } : {};\r
  window.SchoolixNotificationContext = detail;\r
  window.dispatchEvent(new CustomEvent("schoolix:notification-context-ready", { detail }));\r
  if (adminId) window.SchoolixSyncNativeNotifications?.(detail);\r
}\r
\r
function teacherDisplayName(profile = teacherData, authUser = auth.currentUser) {\r
  return firstProfileText(\r
    profile.name,\r
    profile.fullName,\r
    profile.teacherName,\r
    profile.displayName,\r
    authUser?.displayName,\r
    String(authUser?.email || "").split("@")[0]\r
  ) || "Teacher";\r
}\r
\r
function teacherProfileCacheKey(uid = auth.currentUser?.uid || teacherData.uid || "") {\r
  return uid ? \`schoolixTeacherProfile_\${uid}\` : "";\r
}\r
\r
function teacherProfileEmailCacheKey(email = auth.currentUser?.email || teacherData.email || "") {\r
  const normalizedEmail = String(email || "").trim().toLowerCase();\r
  return normalizedEmail ? \`schoolixTeacherProfileEmail_\${normalizedEmail}\` : "";\r
}\r
\r
function loadCachedTeacherProfile(uid = auth.currentUser?.uid || "") {
  const keys = [
    teacherProfileCacheKey(uid),
    teacherProfileEmailCacheKey(auth.currentUser?.email || teacherData.email),
    "schoolixTeacherSession",
    "schoolixLastTeacherProfile"
  ].filter(Boolean);
  for (const key of keys) {
    try {
      const cached = JSON.parse(localStorage.getItem(key) || "{}") || {};
      if (Object.keys(cached).length && (cached.name || cached.displayName || cached.schoolName)) return cached;
    } catch {}
  }
  return {};
}\r
\r
function saveCachedTeacherProfile(profile = teacherData) {
  const keys = [
    teacherProfileCacheKey(profile.uid),
    teacherProfileCacheKey(profile.authUid),
    teacherProfileCacheKey(auth.currentUser?.uid),
    teacherProfileEmailCacheKey(profile.email || auth.currentUser?.email),
    "schoolixTeacherSession",
    "schoolixLastTeacherProfile"
  ].filter(Boolean);
  if (!keys.length) return;
  const schoolId = profile.schoolId || profile.adminId || adminId || "";
  const cache = {
    uid: profile.uid || "",
    authUid: profile.authUid || auth.currentUser?.uid || "",
    docId: profile.docId || "",
    name: teacherDisplayName(profile, auth.currentUser),
    email: profile.email || auth.currentUser?.email || "",
    teacherId: profile.teacherId || "",
    class: profile.class || "",
    section: profile.section || "",
    schoolId,
    adminId: schoolId,
    schoolName: profile.schoolName || "",
    logoUrl: profile.logoUrl || profile.schoolLogoUrl || "",
    photoUrl: profile.photoUrl || profile.imageUrl || profile.profilePhotoUrl || profile.avatarUrl || ""
  };
  [...new Set(keys)].forEach((key) => {
    try { localStorage.setItem(key, JSON.stringify(cache)); } catch {}
  });
  if (cache.schoolId) {
    try { localStorage.setItem("teacherSchoolId", cache.schoolId); } catch {}
    if (cache.schoolName) {
      try { localStorage.setItem(\`schoolixSchoolName_\${cache.schoolId}\`, cache.schoolName); } catch {}
    }
  }
  if (cache.schoolName) {
    window.SchoolBranding?.persistSchoolName?.(cache.schoolName);
    try { localStorage.setItem("schoolix.schoolName", cache.schoolName); } catch {}
  }
}\r
\r
function cleanTeacherUid(value) {\r
  return String(value || "").trim();\r
}\r
\r
function canonicalTeacherUid(data = {}, docId = "", authUser = auth.currentUser) {\r
  return cleanTeacherUid(data.legacyUid || data.firebaseUid || docId || data.uid || authUser?.uid || "");\r
}\r
\r
function renderTeacherIdentity(schoolName = "", authUser = auth.currentUser) {
  const name = teacherDisplayName(teacherData, authUser);
  const targetSchoolId = adminId || teacherData.adminId || teacherData.schoolId || "";
  const cachedSchool = targetSchoolId ? (localStorage.getItem(\`schoolixSchoolName_\${targetSchoolId}\`) || "") : "";
  const resolvedSchoolName = firstProfileText(
    schoolName,
    teacherData.schoolName,
    cachedSchool,
    window.SchoolBranding?.getSchoolName?.(),
    "Schoolix"
  );
  if ($("schoolNameLabel")) $("schoolNameLabel").textContent = resolvedSchoolName;
  if ($("sidebarSchoolName")) $("sidebarSchoolName").textContent = resolvedSchoolName;
  if ($("teacherNameDisplay")) $("teacherNameDisplay").textContent = name;
  if ($("topbarTeacherName")) $("topbarTeacherName").textContent = name;
  if ($("teacherIdLabel")) $("teacherIdLabel").textContent = \`ID: \${teacherData.teacherId || teacherData.uid || authUser?.uid || "--"}\`;
  if ($("emailLabel")) $("emailLabel").textContent = teacherData.email || authUser?.email || "";
  renderTeacherProfilePhoto();
  if (resolvedSchoolName && resolvedSchoolName !== "Schoolix") {
    try {
      window.SchoolBranding?.persistSchoolName?.(resolvedSchoolName);
      if (targetSchoolId) localStorage.setItem(\`schoolixSchoolName_\${targetSchoolId}\`, resolvedSchoolName);
    } catch {}
  }
}\r
\r
async function resolveTeacherSchoolBranding(schoolId) {\r
  let cachedName = "";\r
  try { cachedName = localStorage.getItem(\`schoolixSchoolName_\${schoolId}\`) || ""; } catch {}\r
  let schoolName = firstProfileText(teacherData.schoolName, cachedName, window.SchoolBranding?.getSchoolName?.(), "Schoolix");\r
  let logoUrl = firstProfileText(teacherData.logoUrl, teacherData.schoolLogoUrl);\r
\r
  const [adminResult, schoolResult, brandResult] = await Promise.allSettled([\r
    getDoc(doc(db, "users", schoolId)),\r
    getDoc(doc(db, "schools", schoolId)),\r
    getDoc(doc(db, "schools", schoolId, "config", "branding"))\r
  ]);\r
  if (adminResult.status === "fulfilled" && adminResult.value.exists()) {\r
    const adminProfile = adminResult.value.data();\r
    schoolName = firstProfileText(adminProfile.schoolName, adminProfile.instituteName, schoolName);\r
    logoUrl = firstProfileText(adminProfile.logoUrl, adminProfile.schoolLogoUrl, logoUrl);\r
    applyAttendanceAccessState(adminProfile);\r
  }\r
  if (schoolResult.status === "fulfilled" && schoolResult.value.exists()) {\r
    const school = schoolResult.value.data();\r
    schoolName = firstProfileText(school.schoolName, school.name, school.instituteName, schoolName);\r
    logoUrl = firstProfileText(school.logoUrl, school.schoolLogoUrl, logoUrl);\r
  }\r
  if (brandResult.status === "fulfilled" && brandResult.value.exists()) {\r
    const brand = brandResult.value.data();\r
    schoolName = firstProfileText(brand.schoolName, brand.name, schoolName);\r
    logoUrl = firstProfileText(brand.logoUrl, brand.schoolLogoUrl, logoUrl);\r
  }\r
\r
  try { localStorage.setItem(\`schoolixSchoolName_\${schoolId}\`, schoolName); } catch {}\r
  window.SchoolBranding?.persistSchoolName?.(schoolName);\r
  if (logoUrl) window.SchoolBranding?.persistSchoolLogo?.(logoUrl);\r
  return schoolName;\r
}\r
\r
function todayISO() {\r
  const now = new Date();\r
  const year = now.getFullYear();\r
  const month = String(now.getMonth() + 1).padStart(2, "0");\r
  const day = String(now.getDate()).padStart(2, "0");\r
  return \`\${year}-\${month}-\${day}\`;\r
}\r
\r
function currentMonth() {\r
  const now = new Date();\r
  const year = now.getFullYear();\r
  const month = String(now.getMonth() + 1).padStart(2, "0");\r
  return \`\${year}-\${month}\`;\r
}\r
\r
function fmt(num) {\r
  if (num === null || num === undefined || isNaN(num)) return "₹0";\r
  return new Intl.NumberFormat("en-IN", {\r
    style: "currency",\r
    currency: "INR",\r
    minimumFractionDigits: 0,\r
    maximumFractionDigits: 0\r
  }).format(Number(num) || 0);\r
}\r
\r
const parseAttendanceDate = dateStr => {\r
  if (!dateStr) return null;\r
  const parsed = new Date(\`\${dateStr}T00:00:00\`);\r
  return Number.isNaN(parsed.getTime()) ? null : parsed;\r
};\r
\r
const formatAttendanceDate = dateStr => {\r
  const parsed = parseAttendanceDate(dateStr);\r
  return parsed\r
    ? parsed.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })\r
    : dateStr;\r
};\r
\r
function getSessionLabel(session) {\r
  return firstProfileText(\r
    session?.session,\r
    session?.name,\r
    session?.label,\r
    session?.sessionLabel,\r
    session?.academicSession,\r
    session?.currentYear,\r
    session?.id\r
  );\r
}\r
\r
function normalizeTeacherSession(id, data = {}) {\r
  const sessionId = String(id || data.id || "").trim();\r
  const label = getSessionLabel({ id: sessionId, ...data }) || sessionId;\r
  return { ...data, id: sessionId || label, session: label, name: data.name || label };\r
}\r
\r
function findTeacherSessionByValue(value) {\r
  const candidate = String(value || "").trim().toLowerCase();\r
  if (!candidate) return null;\r
  return allSessions.find((session) => (\r
    [session.id, getSessionLabel(session), session.session, session.name, session.sessionLabel]\r
      .some((entry) => String(entry || "").trim().toLowerCase() === candidate)\r
  )) || null;\r
}\r
\r
function sortSessions(sessions) {\r
  return [...sessions].sort((a, b) => {\r
    const aOrder = Number(a.startYear || 0) || new Date(a.startDate || a.createdAt?.seconds * 1000 || a.createdAt || 0).getTime();\r
    const bOrder = Number(b.startYear || 0) || new Date(b.startDate || b.createdAt?.seconds * 1000 || b.createdAt || 0).getTime();\r
    return bOrder - aOrder;\r
  });\r
}\r
\r
function getActiveMarksTermKey() {\r
  if (!activeTermKey) return "";\r
  return activeSessionId ? \`\${activeSessionId}__\${activeTermKey}\` : activeTermKey;\r
}\r
\r
function getTermLockKey(termKey = activeTermKey) {\r
  if (!termKey) return "";\r
  return activeSessionId ? \`\${activeSessionId}__\${termKey}\` : termKey;\r
}\r
\r
function isReportTermLocked(termKey = activeTermKey) {\r
  return reportTermLocks[getTermLockKey(termKey)]?.locked === true;\r
}\r
\r
function cleanupClassValue(value) {\r
  return String(value || "").trim().toUpperCase().replace(/^CLASS\\s+/, "");\r
}\r
\r
function normalizeSectionValue(value) {\r
  return String(value || "").trim().toUpperCase().replace(/[^A-Z]/g, "").slice(0, 1);\r
}\r
\r
function normalizeClassLabel(value) {\r
  const cleaned = cleanupClassValue(value);\r
  if (!cleaned) return "";\r
  if (cleaned === "PASSED OUT") return "Passed Out";\r
  if (/^\\d+$/.test(cleaned)) return String(Number(cleaned));\r
  return ROMAN_TO_NUMERIC_CLASS[cleaned] || cleaned;\r
}\r
\r
function extractClassSection(classValue, sectionValue = "") {\r
  const explicitSection = normalizeSectionValue(sectionValue);\r
  const cleanedClass = cleanupClassValue(classValue);\r
  if (!cleanedClass) return { class: "", section: explicitSection };\r
  if (explicitSection) return { class: normalizeClassLabel(cleanedClass), section: explicitSection };\r
  for (const token of CLASS_PARSE_TOKENS) {\r
    if (!cleanedClass.startsWith(token)) continue;\r
    const remainder = cleanedClass.slice(token.length).replace(/^[\\s-]+/, "");\r
    if (!remainder) return { class: normalizeClassLabel(token), section: "" };\r
    if (/^[A-Z]$/.test(remainder)) return { class: normalizeClassLabel(token), section: remainder };\r
  }\r
  return { class: normalizeClassLabel(cleanedClass), section: "" };\r
}\r
\r
function isSamePlacement(left, right) {\r
  return left?.class === right?.class && left?.section === right?.section;\r
}\r
\r
function getTeacherAssignedPlacements() {\r
  const fromArray = Array.isArray(teacherData.assignedClasses)\r
    ? teacherData.assignedClasses.map(item => extractClassSection(item.class || item.className, item.section))\r
    : [];\r
  const fallback = extractClassSection(teacherData.class, teacherData.section);\r
  const placements = [...fromArray, fallback].filter(item => item.class && item.section);\r
  const seen = new Set();\r
  return placements.filter(item => {\r
    const key = \`\${item.class}__\${item.section}\`;\r
    if (seen.has(key)) return false;\r
    seen.add(key);\r
    return true;\r
  });\r
}\r
\r
function getTeacherPlacement() {\r
  return teacherAssignedPlacements[0] || extractClassSection(teacherData.class, teacherData.section);\r
}\r
\r
function getActivePlacement() {\r
  return activeClassSection?.class ? activeClassSection : getTeacherPlacement();\r
}\r
\r
function isAssignedPlacement(placement) {\r
  return teacherAssignedPlacements.some(item => isSamePlacement(item, placement));\r
}\r
\r
function populateTeacherClassSelector() {\r
  const wrap = $("teacherClassSelectorWrap");\r
  const selector = $("teacherClassSelector");\r
  if (!wrap || !selector) return;\r
  wrap.classList.toggle("show", teacherAssignedPlacements.length > 1);\r
  if (teacherAssignedPlacements.length <= 1) {\r
    selector.innerHTML = "";\r
    return;\r
  }\r
  selector.innerHTML = teacherAssignedPlacements.map((placement, index) =>\r
    \`<option value="\${index}" \${isSamePlacement(placement, getActivePlacement()) ? "selected" : ""}>Class \${escapeHtml(formatShortClassSection(placement))}</option>\`\r
  ).join("");\r
}\r
\r
window.onTeacherClassChange = async function() {\r
  const selector = $("teacherClassSelector");\r
  const nextPlacement = teacherAssignedPlacements[Number(selector?.value || 0)] || teacherAssignedPlacements[0];\r
  if (!nextPlacement || isSamePlacement(nextPlacement, getActivePlacement())) return;\r
  activeClassSection = nextPlacement;\r
  cachedTeacherTimetable = { assignments: [], assignedSchedule: {}, classFullTimetable: null, teacherPlacement: nextPlacement };\r
  updateAssignmentLabels();\r
  await loadEverything();\r
  if (document.body.dataset.activeTab === "timetable") {\r
    await loadTeacherTimetable(true);\r
  }\r
};\r
\r
function getStudentPlacementForActiveSession(student) {\r
  if (!student || !activeSessionId) return null;\r
  const placements = student.sessionPlacements || {};\r
  if (placements[activeSessionId]) return placements[activeSessionId];\r
  return Object.values(placements).find((placement) =>\r
    placement?.sessionId === activeSessionId ||\r
    (activeSessionLabel && (placement?.session === activeSessionLabel || placement?.currentYear === activeSessionLabel))\r
  ) || null;\r
}\r
\r
function getStudentForActiveSession(student) {\r
  const placement = getStudentPlacementForActiveSession(student);\r
  if (!placement) return { ...student, _sessionPlacement: null };\r
  return {\r
    ...student,\r
    class: placement.class || student.class || "",\r
    section: placement.section || student.section || "",\r
    roll: placement.roll || student.roll || student.rollNo || "",\r
    currentYear: placement.currentYear || placement.session || activeSessionLabel || student.currentYear || "",\r
    _sessionPlacement: placement\r
  };\r
}\r
\r
function formatShortClassSection(placement) {\r
  if (!placement?.class && !placement?.section) return "—";\r
  return placement.section ? \`\${placement.class}-\${placement.section}\` : placement.class || placement.section;\r
}\r
\r
function formatBadgeClassSection(placement) {\r
  if (!placement?.class && !placement?.section) return "Class —";\r
  return placement.section ? \`Class \${placement.class} – \${placement.section}\` : \`Class \${placement.class}\`;\r
}\r
\r
function resolveTeacherStudentScope(students) {\r
  const teacherPlacement = getActivePlacement();\r
  const sessionStudents = students.map(getStudentForActiveSession);\r
  const directStudents = sessionStudents.filter((student) => (\r
    isSamePlacement(extractClassSection(student.class, student.section), teacherPlacement) && isAssignedPlacement(teacherPlacement)\r
  ));\r
  return { students: directStudents, activePlacement: teacherPlacement, mode: "direct" };\r
}\r
\r
function updateAssignmentLabels() {\r
  const currentPlacement = getActivePlacement();\r
  $("classSectionBadge").textContent = formatBadgeClassSection(currentPlacement);\r
  $("statClassInfo").textContent = formatBadgeClassSection(currentPlacement);\r
  populateTeacherClassSelector();\r
}\r
\r
function getVisibleStudentIds() {
  return new Set(allStudents.map((student) => student.studentId || student.id).filter(Boolean));
}

function normalizeStudentRecordId(value) {
  return String(value ?? "").trim().toLowerCase();
}

function feeBelongsToStudent(fee, studentId) {
  const wanted = normalizeStudentRecordId(studentId);
  if (!wanted) return false;
  return [fee?.studentId, fee?.studentDocId, fee?.student?.studentId, fee?.student?.id]
    .some((value) => normalizeStudentRecordId(value) === wanted);
}
\r
function getStudentInitials(value) {\r
  const words = String(value || "Student").trim().split(/\\s+/).filter(Boolean);\r
  if (!words.length) return "ST";\r
  return words.slice(0, 2).map((word) => word[0]).join("").toUpperCase();\r
}\r
\r
function getStudentPhotoUrl(student = {}) {\r
  return String(student.photoUrl || student.imageUrl || student.profilePhotoUrl || student.avatarUrl || "").trim();\r
}\r
\r
function renderStudentFace(student = {}, className = "student-face") {\r
  const photoUrl = getStudentPhotoUrl(student);\r
  const initials = getStudentInitials(student.name || student.studentId || student.id);\r
  return \`<button type="button" class="\${className}" onclick="event.stopPropagation(); openPhotoPreview('\${escapeHtml(photoUrl)}','\${escapeHtml(student.name || "Student")}')" title="View \${escapeHtml(student.name || "Student")} photo">\${photoUrl ? \`<img src="\${escapeHtml(photoUrl)}" alt="">\` : escapeHtml(initials)}</button>\`;\r
}\r
\r
function getTeacherPhotoUrl(teacher = {}) {\r
  return String(teacher.photoUrl || teacher.imageUrl || teacher.profilePhotoUrl || teacher.avatarUrl || "").trim();\r
}\r
\r
function setAvatarPhoto(elementId, profile = {}) {\r
  const el = $(elementId);\r
  if (!el) return;\r
  const photoUrl = getTeacherPhotoUrl(profile);\r
  const initials = getStudentInitials(profile.name || profile.teacherId || "Teacher");\r
  el.innerHTML = photoUrl ? \`<img src="\${escapeHtml(photoUrl)}" alt="\${escapeHtml(profile.name || "Teacher")} photo">\` : escapeHtml(initials);\r
}\r
\r
function renderTeacherProfilePhoto() {\r
  setAvatarPhoto("topbarAvatar", teacherData);\r
  setAvatarPhoto("teacherHeroPhoto", teacherData);\r
}\r
\r
window.openTeacherPhotoPreview = function() {\r
  window.openPhotoPreview(getTeacherPhotoUrl(teacherData), teacherData.name || "Teacher");\r
};\r
\r
window.openPhotoPreview = function(photoUrl, title = "Photo") {\r
  if (!photoUrl) return toast("Photo is not available yet.", "info");\r
  $("photoPreviewTitle").textContent = title || "Photo";\r
  $("photoPreviewImage").src = photoUrl;\r
  $("photoPreviewImage").alt = \`\${title || "Photo"} preview\`;\r
  $("photoPreviewModal").classList.add("open");\r
};\r
\r
window.closePhotoPreview = function() {\r
  $("photoPreviewModal").classList.remove("open");\r
  $("photoPreviewImage").removeAttribute("src");\r
}\r
\r
function toast(msg, type = "success") {\r
  const t = document.createElement("div");\r
  t.className = "toast";\r
  t.textContent = msg;\r
  const colors = {\r
    success: "linear-gradient(135deg,#16a34a,#15803d)",\r
    error: "linear-gradient(135deg,#ef4444,#dc2626)",\r
    info: "linear-gradient(135deg,var(--primary),var(--primary-dark))"\r
  };\r
  t.style.background = colors[type] || colors.success;\r
  document.body.appendChild(t);\r
  setTimeout(() => t.remove(), 3500);\r
}\r
\r
function showPanelError(targetId, message) {\r
  const el = $(targetId);\r
  if (el) el.innerHTML = \`<div class="empty-state">\${escapeHtml(message)}</div>\`;\r
}\r
\r
function countWorkingDays(monthVal) {\r
  const [y, m] = monthVal.split("-").map(Number);\r
  const total = new Date(y, m, 0).getDate();\r
  let count = 0;\r
  for (let d = 1; d <= total; d++) if (new Date(y, m-1, d).getDay() !== 0) count++;\r
  return count;\r
}\r
\r
function countAttendanceWorkingDays(records = []) {\r
  const markedDates = new Set();\r
  records.forEach((record) => {\r
    const date = String(record?.date || "").trim();\r
    if (date) markedDates.add(date);\r
  });\r
  return markedDates.size;\r
}\r
\r
// ── TERM HELPERS ───────────────────────────────────────────────────\r
function normalizeReportTerm(term) {\r
  return String(term || "").trim();\r
}\r
\r
function getReportTermKey(term) {\r
  return normalizeReportTerm(term).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");\r
}\r
\r
function getTermDocIdByTermKey(termKey) {\r
  return activeSessionId ? \`\${activeSessionId}__\${termKey}\` : termKey;\r
}\r
\r
function termBelongsToActiveSession(term) {\r
  if (!term) return false;\r
  if (!sessionContextReady || !activeSessionId) return false;\r
  if (activeSessionId) {\r
    if (term.sessionId === activeSessionId) return true;\r
    if (String(term.id || "").startsWith(\`\${activeSessionId}__\`)) return true;\r
  }\r
  return activeSessionLabel && (\r
    term.session === activeSessionLabel ||\r
    term.currentYear === activeSessionLabel ||\r
    term.academicSession === activeSessionLabel\r
  );\r
}\r
\r
function termBelongsToActivePlacement(term) {\r
  if (!term?.class && !term?.section) return true;\r
  const currentPlacement = getActivePlacement();\r
  const termPlacement = extractClassSection(term.class, term.section);\r
  if (!termPlacement.class) return true;\r
  if (termPlacement.class !== currentPlacement.class) return false;\r
  return !termPlacement.section || termPlacement.section === currentPlacement.section;\r
}\r
\r
function belongsToActiveSession(record) {
  // Never aggregate records when the school/session context is unverified.
  if (!sessionContextReady || !activeSessionId) return false;
  const activeId = normalizeStudentRecordId(activeSessionId);
  const activeLabel = normalizeStudentRecordId(activeSessionLabel);
  const recordSessions = [record?.sessionId, record?.session, record?.currentYear, record?.academicSession]
    .map(normalizeStudentRecordId)
    .filter(Boolean);
  // Check if record belongs to active session
  return recordSessions.some((value) => value === activeId || (activeLabel && value === activeLabel));
}
\r
function setSelectedSession(sessionId) {\r
  const selectedSession = findTeacherSessionByValue(sessionId);\r
  if (!selectedSession) return false;\r
  activeSessionId = selectedSession.id;\r
  activeSessionLabel = getSessionLabel(selectedSession);\r
  activeSessionLocked = selectedSession.locked === true;\r
  return true;\r
}\r
\r
function findTeacherSessionFromSettings(settings = {}) {\r
  const candidates = [\r
    settings.sessionId,\r
    settings.activeSessionId,\r
    settings.currentSessionId,\r
    settings.id\r
  ].map(value => String(value || "").trim()).filter(Boolean);\r
  for (const candidate of candidates) {\r
    const found = findTeacherSessionByValue(candidate);\r
    if (found) return found;\r
  }\r
  const labelCandidates = [\r
    settings.session,\r
    settings.activeSession,\r
    settings.currentSession,\r
    settings.sessionLabel,\r
    settings.currentYear,\r
    settings.academicSession\r
  ].map(value => String(value || "").trim()).filter(Boolean);\r
  for (const label of labelCandidates) {\r
    const found = findTeacherSessionByValue(label);\r
    if (found) return found;\r
  }\r
  return null;\r
}\r
\r
function selectFallbackSession() {\r
  const sortedSessions = sortSessions(allSessions);\r
  const openSession = sortedSessions.find(session => session.locked !== true);\r
  const fallback = openSession || sortedSessions[0];\r
  return fallback ? setSelectedSession(fallback.id) : false;\r
}\r
\r
function applySessionLockState() {\r
  if (!sessionContextReady || activeSessionLocked) {\r
    showSessionLockBanner();\r
    disableAllEditControls();\r
  } else {\r
    hideSessionLockBanner();\r
    enableAllEditControls();\r
  }\r
}\r
\r
function showSessionLockBanner() {\r
  // A missing session is handled by the disabled controls; don't cover the\r
  // dashboard with a repeated warning while a slow connection revalidates.\r
  if (!sessionContextReady) {\r
    hideSessionLockBanner();\r
    return;\r
  }\r
  // Remove existing banner\r
  const old = document.getElementById("sessionLockGlobalBanner");\r
  if (old) old.remove();\r
  const banner = document.createElement("div");\r
  banner.id = "sessionLockGlobalBanner";\r
  banner.style.cssText = "position:fixed;top:0;left:0;right:0;z-index:9999;background:linear-gradient(135deg,#dc2626,#991b1b);color:#fff;padding:12px 20px;text-align:center;font-size:14px;font-weight:700;letter-spacing:0.02em;box-shadow:0 4px 16px rgba(0,0,0,0.3);";\r
  banner.innerHTML = sessionContextReady\r
    ? \`Session <strong>\${activeSessionLabel}</strong> is locked by admin. All data is <strong>view only</strong>.\`\r
    : "";\r
  document.body.prepend(banner);\r
  // Push body down\r
  document.body.style.paddingTop = "50px";\r
}\r
\r
function hideSessionLockBanner() {\r
  const old = document.getElementById("sessionLockGlobalBanner");\r
  if (old) old.remove();\r
  document.body.style.paddingTop = "";\r
}\r
\r
function getSubjectMaxMarks(subject) {\r
  return Math.max(1, Number(subject?.maxMarks || subject?.max || 100) || 100);\r
}\r
\r
function getReportGrade(percentage) {\r
  if (percentage >= 90) return "A+";\r
  if (percentage >= 75) return "A";\r
  if (percentage >= 60) return "B";\r
  if (percentage >= 40) return "C";\r
  return "F";\r
}\r
\r
function getReportRemarks(obtained, maxMarks) {\r
  const pct = maxMarks ? (Number(obtained || 0) / Number(maxMarks || 100)) * 100 : 0;\r
  if (pct >= 80) return "Excellent";\r
  if (pct >= 60) return "Good";\r
  if (pct >= 40) return "Average";\r
  return "Poor";\r
}\r
\r
function getSubjectMarkEntry(termMarks, subject) {\r
  const subjectName = subject?.name || "Subject";\r
  const entry = termMarks?.[subjectName];\r
\r
  if (entry && typeof entry === "object") {\r
    const obtained = entry.obtained ?? entry.marks;\r
    return {\r
      obtained,\r
      maxMarks: Number(entry.maxMarks || getSubjectMaxMarks(subject))\r
    };\r
  }\r
  if (entry !== undefined && entry !== null) {\r
    return {\r
      obtained: entry,\r
      maxMarks: getSubjectMaxMarks(subject)\r
    };\r
  }\r
  // No entry - return null/undefined to indicate empty\r
  return { \r
    obtained: null, \r
    maxMarks: getSubjectMaxMarks(subject) \r
  };\r
}\r
// ── AUTH ───────────────────────────────────────────────────────────\r
function waitForTeacherAuthUser(timeoutMs = 16000) {\r
  return new Promise((resolve) => {\r
    let done = false;\r
    let unsubscribe = () => {};\r
    const finish = (user) => {\r
      if (done) return;\r
      done = true;\r
      try { unsubscribe?.(); } catch {}\r
      resolve(user || auth.currentUser || null);\r
    };\r
    unsubscribe = onAuthStateChanged(auth, finish);\r
    setTimeout(() => finish(auth.currentUser || null), timeoutMs);\r
  });\r
}\r
\r
function requireValidatedTeacherSession(action = "change data") {\r
  if (sessionContextReady && adminId && activeSessionId) return true;\r
  toast(\`Unable to \${action}: refresh and verify the school session first.\`, "error");\r
  return false;\r
}\r
\r
async function resolveTeacherProfileDocument(user = auth.currentUser) {\r
  if (!user) return null;\r
  const matches = [];\r
  const directIds = [teacherData.docId, user.uid, teacherData.uid, user.supabaseUid]\r
    .map((value) => String(value || "").trim())\r
    .filter(Boolean);\r
  const directResults = await Promise.allSettled(\r
    [...new Set(directIds)].map((id) => getDoc(doc(db, "users", id)))\r
  );\r
  directResults.forEach((result) => {\r
    if (result.status !== "fulfilled") return;\r
    const snapshot = result.value;\r
    if (snapshot.exists() && String(snapshot.data().role || "").toLowerCase() === "teacher") {\r
      matches.push({ id: snapshot.id, data: snapshot.data() || {} });\r
    }\r
  });\r
\r
  const email = String(user.email || teacherData.email || "").trim().toLowerCase();\r
  const lookups = [];\r
  const signedLookupIds = [user.uid, user.supabaseUid]\r
    .map((value) => String(value || "").trim())\r
    .filter(Boolean);\r
  signedLookupIds.forEach((id) => {\r
    lookups.push(["authUid", id], ["uid", id], ["supabaseAuthUid", id], ["legacyUid", id], ["firebaseUid", id]);\r
  });\r
  if (email) lookups.push(["email", email], ["authEmail", email]);\r
  const uniqueLookups = [...new Map(lookups\r
    .filter(([, value]) => String(value || "").trim())\r
    .map(([field, value]) => [\`\${field}:\${String(value).trim().toLowerCase()}\`, [field, value]])\r
  ).values()];\r
  const signedIds = new Set([user.uid, user.supabaseUid].map((value) => String(value || "").trim()).filter(Boolean));\r
  const directAuthMatch = matches.some((item) => (\r
    [item.id, item.data.authUid, item.data.uid, item.data.supabaseAuthUid, item.data.legacyUid, item.data.firebaseUid]\r
      .map((value) => String(value || "").trim())\r
      .some((value) => signedIds.has(value))\r
  ));\r
  if (!directAuthMatch) {\r
    const lookupResults = await Promise.allSettled(\r
      uniqueLookups.map(([field, value]) => getDocs(query(collection(db, "users"), where(field, "==", value), limit(5))))\r
    );\r
    lookupResults.forEach((result) => {\r
      if (result.status !== "fulfilled") return;\r
      result.value.docs.forEach((item) => {\r
        const data = item.data() || {};\r
        if (String(data.role || "").toLowerCase() === "teacher") matches.push({ id: item.id, data });\r
      });\r
    });\r
  }\r
  const uniqueMatches = [...new Map(matches.map((item) => [item.id, item])).values()];\r
  if (!uniqueMatches.length) return null;\r
  const authLinked = uniqueMatches.filter((item) => (\r
    [item.id, item.data.authUid, item.data.uid, item.data.supabaseAuthUid, item.data.legacyUid, item.data.firebaseUid]\r
      .map((value) => String(value || "").trim())\r
      .some((value) => signedIds.has(value))\r
  ));\r
  const expectedTeacherId = String(authLinked[0]?.data?.teacherId || teacherData.teacherId || "").trim();\r
  let candidates = uniqueMatches;\r
  if (expectedTeacherId) {\r
    const sameTeacher = candidates.filter((item) => String(item.data.teacherId || "").trim() === expectedTeacherId);\r
    if (sameTeacher.length) candidates = sameTeacher;\r
  }\r
  const schoolLinked = candidates.filter((item) => linkedTeacherSchoolId(item.data));\r
  if (schoolLinked.length) candidates = schoolLinked;\r
  const identityKeys = new Set(candidates.map((item) => [\r
    linkedTeacherSchoolId(item.data),\r
    item.data.teacherId || "",\r
    String(item.data.role || "").toLowerCase()\r
  ].map((value) => String(value || "").trim().toLowerCase()).join("|")).filter((key) => key !== "||"));\r
  if (identityKeys.size > 1) return null;\r
\r
  return candidates.sort((left, right) => {\r
    const score = (item) => {\r
      const authIds = [item.id, item.data.authUid, item.data.uid, item.data.supabaseAuthUid, item.data.legacyUid, item.data.firebaseUid]\r
        .map((value) => String(value || "").trim());\r
      return (authIds.some((value) => signedIds.has(value)) ? 100 : 0)\r
        + (linkedTeacherSchoolId(item.data) ? 20 : 0)\r
        + (item.data.active === false ? -50 : 0);\r
    };\r
    return score(right) - score(left);\r
  })[0] || null;\r
}\r
\r
async function refreshTeacherProfileContext(user = auth.currentUser) {\r
  const resolved = await resolveTeacherProfileDocument(user);\r
  if (!resolved) {\r
    setTeacherSchoolId("");\r
    teacherData = {};\r
    const error = new Error("Teacher profile not found for this signed-in account.");\r
    error.code = "teacher-profile-missing";\r
    throw error;\r
  }\r
  const resolvedTeacherProfile = resolved.data || {};\r
  const resolvedTeacherUid = canonicalTeacherUid(resolvedTeacherProfile, resolved.id, user);\r
  teacherData = {\r
    ...resolvedTeacherProfile,\r
    uid: resolvedTeacherUid,\r
    docId: resolved.id,\r
    authUid: user?.supabaseUid || user?.uid || resolvedTeacherProfile.authUid || ""\r
  };\r
  saveCachedTeacherProfile(teacherData);\r
\r
  const nextSchoolId = linkedTeacherSchoolId(teacherData);\r
  if (!nextSchoolId) {\r
    setTeacherSchoolId("");\r
    const error = new Error("Teacher profile is not linked to a school.");\r
    error.code = "teacher-school-missing";\r
    throw error;\r
  }\r
  const schoolChanged = setTeacherSchoolId(nextSchoolId);\r
  const cachedSchool = localStorage.getItem(\`schoolixSchoolName_\${nextSchoolId}\`) || "";
  let schoolName = firstProfileText(teacherData.schoolName, cachedSchool, window.SchoolBranding?.getSchoolName?.(), "Schoolix");
  renderTeacherIdentity(schoolName, user);

  // Background non-blocking branding sync
  resolveTeacherSchoolBranding(adminId).then((brandSchoolName) => {
    if (brandSchoolName && brandSchoolName !== schoolName) {
      renderTeacherIdentity(brandSchoolName, user);
    }
  }).catch((err) => console.warn("Background branding refresh:", err));\r
\r
  const previousPlacement = getActivePlacement();\r
  teacherAssignedPlacements = getTeacherAssignedPlacements();\r
  activeClassSection = !schoolChanged && isAssignedPlacement(previousPlacement)\r
    ? previousPlacement\r
    : getTeacherPlacement();\r
  updateAssignmentLabels();\r
  syncTeacherNotificationContext();\r
  return { schoolChanged };\r
}\r
\r
async function handleTeacherContextError(error, fallbackMessage = "Teacher dashboard refresh failed.") {\r
  console.warn(fallbackMessage, error);\r
  if (["teacher-profile-missing", "teacher-school-missing"].includes(String(error?.code || ""))) {\r
    setTeacherSchoolId("");\r
    await signOut(auth).catch(() => {});\r
    window.location.replace("#/index.html");\r
    return true;\r
  }\r
  toast(error?.message || fallbackMessage, "error");\r
  return false;\r
}\r
\r
onAuthStateChanged(auth, async user => {\r
  try {\r
    if (!user) {\r
      user = await waitForTeacherAuthUser();\r
      if (!user) return window.location.href = "#/index.html";\r
    }\r
\r
    const cached = loadCachedTeacherProfile(user.uid);
    teacherData = {
      uid: user.uid,
      email: user.email || cached.email || "",
      displayName: user.displayName || cached.name || "",
      ...cached
    };
    if (teacherData.schoolId || teacherData.adminId) {
      setTeacherSchoolId(teacherData.schoolId || teacherData.adminId);
    }
    const initialSchoolName = firstProfileText(
      teacherData.schoolName,
      adminId ? localStorage.getItem(\`schoolixSchoolName_\${adminId}\`) : "",
      window.SchoolBranding?.getSchoolName?.(),
      "Schoolix"
    );
    renderTeacherIdentity(initialSchoolName, user);
    updateAssignmentLabels();\r
    await refreshTeacherProfileContext(user);\r
    if (teacherData.removedFromPanel === true || teacherData.panelStatus === "removed" || teacherData.active === false) {\r
      alert("Your teacher access has been removed by the school admin.");\r
      await signOut(auth).catch(() => {});\r
      return window.location.href = "#/index.html";\r
    }\r
\r
    $("attendanceDate").value = todayISO();\r
    $("attendanceDate").max = todayISO();\r
    $("salaryMonthPicker").value = currentMonth();\r
    $("teacherAttendanceMonth").value = currentMonth();\r
    $("statTodayDate").textContent = new Date().toLocaleDateString("en-IN", {day:"numeric",month:"short"});\r
\r
    const requestedTab = decodeURIComponent(window.location.hash.replace(/^#/, ""));\r
    const sessionResult = await loadSessions();\r
    if (sessionResult.error || !sessionContextReady) {\r
      toast("Dashboard refresh pending. Please try again shortly.", "info");\r
      return;\r
    }\r
    await loadEverything({ includeSecondary: requestedTab === "report" });\r
    teacherResumeRefreshAt = Date.now();\r
    if (["home", "students", "timetable", "qrCheckin", "myAttendance", "attendance", "report", "notices"].includes(requestedTab)) {\r
      window.switchTab(requestedTab);\r
    }\r
  } catch (error) {\r
    console.error("Teacher dashboard failed to load:", error);\r
    if (await handleTeacherContextError(error, "Teacher dashboard failed to load.")) return;\r
    showPanelError("studentsList", "Teacher dashboard load nahi ho pa raha. Please refresh ya admin se teacher profile check karvao.");\r
  }\r
});\r
\r
async function loadSessions({ force = false } = {}) {\r
  const schoolIdAtStart = String(adminId || "").trim();\r
  const previousSessionIds = allSessions.map((session) => session.id).sort().join("|");\r
  const previousSelectedId = activeSessionId;\r
  const previousSchoolActiveId = schoolActiveSessionId;\r
  const previousContextReady = sessionContextReady && sessionsLoadedForSchool === schoolIdAtStart;\r
  try {\r
    if (!schoolIdAtStart) throw new Error("Teacher profile is not linked to a school.");\r
    if (!force && !allSessions.length) {\r
      let cached = null;\r
      try { cached = JSON.parse(localStorage.getItem(\`schoolixTeacherSessions_\${schoolIdAtStart}\`) || "null"); } catch {}\r
      if (cached?.savedAt && Date.now() - cached.savedAt < TEACHER_SESSION_CACHE_TTL_MS && Array.isArray(cached.sessions) && cached.sessions.length) {\r
        allSessions = cached.sessions;\r
        schoolActiveSessionId = findTeacherSessionByValue(cached.schoolActiveSessionId)?.id || "";\r
        const cachedSession = findTeacherSessionByValue(cached.activeSessionId) || sortSessions(allSessions).find((session) => session.locked !== true) || allSessions[0];\r
        if (cachedSession) setSelectedSession(cachedSession.id);\r
        sessionsLoadedForSchool = schoolIdAtStart;\r
        sessionContextReady = Boolean(activeSessionId);\r
        populateSessionSelector();\r
        populateHeaderSessionSelector();\r
        updateSessionBadge();\r
        applySessionLockState();\r
        setTimeout(() => loadSessions({ force: true }).catch(() => {}), 0);\r
        return { selectionChanged: previousSelectedId !== activeSessionId, sessionsChanged: false, fromCache: true, error: null };\r
      }\r
    }\r
    if (force) clearFirestoreReadCache();\r
    teacherSessionLoadError = "";\r
    sessionContextReady = false;\r
    applySessionLockState();\r
    const [sessionsResult, settingsResult] = await Promise.allSettled([\r
      getDocs(collection(db, "schools", schoolIdAtStart, "sessions")),\r
      getDoc(doc(db, "schools", schoolIdAtStart, "settings", "activeSession"))\r
    ]);\r
    if (adminId !== schoolIdAtStart) return { selectionChanged: false, sessionsChanged: false };\r
    if (sessionsResult.status === "rejected") throw sessionsResult.reason;\r
\r
    allSessions = sessionsResult.value.docs.map((item) => normalizeTeacherSession(item.id, item.data()));\r
    const settingsSnap = settingsResult.status === "fulfilled" ? settingsResult.value : null;\r
    const schoolActiveSession = settingsSnap?.exists?.()\r
      ? findTeacherSessionFromSettings(settingsSnap.data() || {})\r
      : null;\r
    let configuredSessionMismatch = false;\r
    if (settingsResult.status === "rejected") {\r
      console.warn("Teacher active session setting load failed:", settingsResult.reason);\r
      teacherSessionLoadError = "School sessions loaded, but the active session could not be verified.";\r
      schoolActiveSessionId = findTeacherSessionByValue(previousSchoolActiveId)?.id || "";\r
    } else {\r
      schoolActiveSessionId = schoolActiveSession?.id || "";\r
      if (settingsSnap?.exists?.()) {\r
        const settings = settingsSnap.data() || {};\r
        const configuredValue = firstProfileText(\r
          settings.sessionId,\r
          settings.activeSessionId,\r
          settings.currentSessionId,\r
          settings.academicSessionId,\r
          settings.session,\r
          settings.activeSession,\r
          settings.currentSession,\r
          settings.sessionLabel,\r
          settings.currentYear,\r
          settings.academicSession\r
        );\r
        configuredSessionMismatch = Boolean(configuredValue && !schoolActiveSession);\r
        if (configuredSessionMismatch) {\r
          teacherSessionLoadError = "The school's active-session setting does not match any configured session.";\r
        }\r
      }\r
    }\r
\r
    const userSelectedSession = findTeacherSessionByValue(teacherUserSelectedSessionId);\r
    const previousValidatedSession = previousContextReady ? findTeacherSessionByValue(previousSelectedId) : null;\r
    const sortedSessions = sortSessions(allSessions);\r
    const fallbackSession = sortedSessions.find((session) => session.locked !== true) || sortedSessions[0] || null;\r
    const preferredSession = configuredSessionMismatch\r
      ? null\r
      : settingsResult.status === "rejected"\r
        ? previousValidatedSession\r
        : userSelectedSession || schoolActiveSession || fallbackSession;\r
    if (preferredSession) setSelectedSession(preferredSession.id);\r
    else {\r
      activeSessionId = "";\r
      activeSessionLabel = "";\r
      activeSessionLocked = true;\r
      if (!allSessions.length && !teacherSessionLoadError) {\r
        teacherSessionLoadError = "No academic sessions are configured for this school.";\r
      }\r
    }\r
    sessionsLoadedForSchool = schoolIdAtStart;\r
    sessionContextReady = Boolean(preferredSession && activeSessionId);\r
\r
    const selectionChanged = previousSelectedId !== activeSessionId;\r
    if (selectionChanged) resetTeacherSessionDependentState();\r
\r
    populateSessionSelector();\r
    populateHeaderSessionSelector();\r
    updateSessionBadge();\r
    applySessionLockState();\r
    try {\r
      localStorage.setItem(\`schoolixTeacherSessions_\${schoolIdAtStart}\`, JSON.stringify({\r
        savedAt: Date.now(),\r
        sessions: allSessions,\r
        activeSessionId,\r
        schoolActiveSessionId\r
      }));\r
    } catch {}\r
    return {\r
      selectionChanged,\r
      sessionsChanged: previousSessionIds !== allSessions.map((session) => session.id).sort().join("|"),\r
      error: sessionContextReady ? null : new Error(teacherSessionLoadError || "Session context unavailable")\r
    };\r
  } catch(e) {\r
    console.error("Session loading failed:", e);\r
    allSessions = [];\r
    activeSessionId = "";\r
    activeSessionLabel = "";\r
    activeSessionLocked = true;\r
    schoolActiveSessionId = "";\r
    sessionContextReady = false;\r
    teacherSessionLoadError = "Unable to load this school's sessions. Check your connection and sign in again if it continues.";\r
    resetTeacherSessionDependentState();\r
    populateSessionSelector();\r
    populateHeaderSessionSelector();\r
    updateSessionBadge();\r
    applySessionLockState();\r
    return { selectionChanged: previousSelectedId !== "", sessionsChanged: previousSessionIds !== "", error: e };\r
  }\r
}\r
\r
function populateSessionSelector() {\r
  const selector = document.getElementById("sessionSelector");\r
  if (!selector) return;\r
  \r
  selector.innerHTML = \`<option value="">\${teacherSessionLoadError ? "Unable to load school sessions" : "— Select Session —"}</option>\`;\r
  \r
  const sortedSessions = sortSessions(allSessions);\r
  \r
  sortedSessions.forEach(session => {\r
    const option = document.createElement("option");\r
    option.value = session.id;\r
    option.textContent = \`\${getSessionLabel(session) || 'Unnamed'}\${session.id === schoolActiveSessionId ? " (School active)" : ""}\${session.locked ? " (Locked)" : ""}\`;\r
    if (session.id === activeSessionId) {\r
      option.selected = true;\r
    }\r
    selector.appendChild(option);\r
  });\r
  selector.title = teacherSessionLoadError || "Select an academic session";\r
}\r
\r
function updateSessionBadge() {\r
  const badge = document.getElementById("currentSessionBadge");\r
  if (!badge) return;\r
  \r
  if (sessionContextReady && activeSessionId && activeSessionLabel) {\r
    const prefix = schoolActiveSessionId && activeSessionId !== schoolActiveSessionId ? "Viewing" : "Active";\r
    badge.textContent = \`\${prefix}: \${activeSessionLabel}\${activeSessionLocked ? " (Locked)" : ""}\`;\r
    badge.className = activeSessionLocked ? "lock-badge locked" : "lock-badge unlocked";\r
  } else {\r
    badge.textContent = teacherSessionLoadError ? "Session unavailable" : "No Active Session";\r
    badge.className = "lock-badge locked";\r
  }\r
  const topbarBadge = $("topbarSessionBadge");\r
  if (topbarBadge) {\r
    topbarBadge.textContent = badge.textContent;\r
    topbarBadge.className = badge.className;\r
  }\r
}\r
\r
function populateHeaderSessionSelector() {\r
  const selector = document.getElementById("headerSessionSelector");\r
  if (!selector) return;\r
  \r
  selector.innerHTML = \`<option value="">\${teacherSessionLoadError ? "Unable to load school sessions" : "No school sessions configured"}</option>\`;\r
  \r
  if (!allSessions.length) return;\r
  \r
  const sortedSessions = sortSessions(allSessions);\r
  \r
  selector.innerHTML = '';\r
  \r
  sortedSessions.forEach(session => {\r
    const option = document.createElement("option");\r
    option.value = session.id;\r
    option.textContent = \`\${getSessionLabel(session) || 'Unnamed'}\${session.id === schoolActiveSessionId ? " (School active)" : ""}\${session.locked ? " (Locked)" : ""}\`;\r
    if (session.id === activeSessionId) {\r
      option.selected = true;\r
    }\r
    selector.appendChild(option);\r
  });\r
  selector.title = teacherSessionLoadError || "Select an academic session";\r
}\r
\r
window.onHeaderSessionChange = async function() {\r
  const selector = document.getElementById("headerSessionSelector");\r
  if (!selector) return;\r
  \r
  const selectedSessionId = selector.value;\r
  if (!selectedSessionId) return;\r
  \r
  if (!setSelectedSession(selectedSessionId)) return;\r
  teacherUserSelectedSessionId = activeSessionId === schoolActiveSessionId ? "" : activeSessionId;\r
  sessionContextReady = Boolean(adminId && activeSessionId && findTeacherSessionByValue(activeSessionId));\r
  \r
  updateSessionBadge();\r
  populateSessionSelector();\r
  resetTeacherSessionDependentState();\r
  applySessionLockState();\r
  \r
  // Reload data for new session\r
  await loadEverything();\r
};\r
\r
window.onSessionChange = async function() {\r
  const selector = document.getElementById("sessionSelector");\r
  if (!selector) return;\r
  \r
  const selectedSessionId = selector.value;\r
  if (!selectedSessionId) return;\r
  \r
  if (!setSelectedSession(selectedSessionId)) return;\r
  teacherUserSelectedSessionId = activeSessionId === schoolActiveSessionId ? "" : activeSessionId;\r
  sessionContextReady = Boolean(adminId && activeSessionId && findTeacherSessionByValue(activeSessionId));\r
  \r
  updateSessionBadge();\r
  populateHeaderSessionSelector();\r
  resetTeacherSessionDependentState();\r
  applySessionLockState();\r
  \r
  // Reload data for new session\r
  await loadEverything();\r
};\r
\r
\r
function disableAllEditControls() {\r
  // Disable all buttons that could modify data (except view/print/logout)\r
  const safeClasses = ["btn-secondary", "btn-info", "logout-btn", "tab-btn"];\r
  const safeOnclicks = ["logout", "printReport", "printAssignedTimetable", "printClassTimetable", "printClassStudentList", "printDueFeeList", "printLowAttendanceList", "printDailyAttendance", "loadTeacherTimetable", "switchTab", "showGeneratedReports", "loadReportTab", "loadSalaryData", "reloadAttendanceTab"];\r
  const safeIds = ["studentSearch", "studentAttendanceBelow", "attendanceDate", "salaryMonthPicker", "headerSessionSelector", "sessionSelector", "reportTermSelect", "teacherClassSelector"];\r
  document.querySelectorAll("button, input, select, textarea").forEach(el => {\r
    const onclick = el.getAttribute("onclick") || "";\r
    const isSafe = safeClasses.some(c => el.classList.contains(c)) ||\r
                   safeOnclicks.some(s => onclick.includes(s)) ||\r
                   safeIds.includes(el.id) ||\r
                   el.closest(".tab-bar");\r
    if (!isSafe) {\r
      el.disabled = true;\r
      el.style.opacity = "0.55";\r
      el.style.cursor = "not-allowed";\r
      el.title = "Session locked by admin — view only";\r
    }\r
  });\r
  // Special: make all attendance inputs disabled\r
  document.querySelectorAll("select[data-student], input[data-student]").forEach(el => {\r
    el.disabled = true;\r
  });\r
  isLocked = true;\r
}\r
\r
function enableAllEditControls() {\r
  document.querySelectorAll("button, input, select, textarea").forEach(el => {\r
    el.disabled = false;\r
    el.style.opacity = "";\r
    el.style.cursor = "";\r
    el.title = "";\r
  });\r
  isLocked = false;\r
  renderAttendanceList();\r
}\r
\r
async function loadEverything({ includeSecondary = false } = {}) {\r
  if (!sessionContextReady || !adminId || !activeSessionId) {\r
    showPanelError("studentsList", "Dashboard data is syncing. Please try again shortly.");\r
    showPanelError("attendanceList", "Attendance data is syncing. Please try again shortly.");\r
    showPanelError("reportContent", "Report card data is syncing. Please try again shortly.");\r
    applySessionLockState();\r
    return { error: new Error(teacherSessionLoadError || "Session context unavailable") };\r
  }\r
  try {\r
    await loadStudents();\r
  } catch (error) {\r
    console.error("Student loading failed:", error);\r
    allStudents = [];\r
    showPanelError("studentsList", "Students load nahi ho pa rahe.");\r
  }\r
\r
  // Paint the roster immediately. Attendance and fees can continue loading\r
  // without keeping the first useful dashboard view blank.\r
  renderStudents();\r
  updateTodayStats();\r
\r
  await Promise.all([\r
    loadAllAttendance().catch((error) => {\r
      console.error("Attendance loading failed:", error);\r
      allAttendance = [];\r
      showPanelError("attendanceList", "Attendance records load nahi ho pa rahe.");\r
    }),\r
    loadFees().catch((error) => {\r
      console.error("Fee loading failed:", error);\r
      allFees = [];\r
    }),\r
  ]);\r
\r
  updateTodayStats();\r
  renderAttendanceList();\r
\r
  const loadSecondaryData = () => Promise.allSettled([\r
    loadSalaryData(),\r
    loadTerms()\r
  ]).then((results) => {\r
    const termsResult = results[1];\r
    if (termsResult.status === "rejected") {\r
      console.error("Report term loading failed:", termsResult.reason);\r
      showPanelError("reportContent", "Report card terms load nahi ho pa rahe.");\r
    }\r
    const salaryResult = results[0];\r
    if (salaryResult.status === "rejected") {\r
      console.error("Salary loading failed:", salaryResult.reason);\r
    }\r
  });\r
  if (includeSecondary) await loadSecondaryData();\r
  else setTimeout(() => loadSecondaryData().catch(() => {}), 0);\r
}\r
\r
// ── STUDENTS ───────────────────────────────────────────────────────\r
async function loadStudents({ force = false } = {}) {\r
  if (!sessionContextReady || !adminId || !activeSessionId) {\r
    throw new Error("Teacher school session is not verified.");\r
  }\r
\r
  const cacheKey = \`schoolixTeacherStudents_\${adminId}_\${activeSessionId}_\${teacherData.docId || teacherData.uid || "teacher"}\`;\r
  if (!force) {\r
    let cached = null;\r
    try { cached = JSON.parse(localStorage.getItem(cacheKey) || "null"); } catch {}\r
    if (cached?.savedAt && Date.now() - cached.savedAt < TEACHER_DATA_CACHE_TTL_MS && Array.isArray(cached.students)) {\r
      allStudents = cached.students;\r
      activeClassSection = cached.activeClassSection || { class: "", section: "" };\r
      studentScopeMode = cached.studentScopeMode || "direct";\r
      $("statTotal").textContent = allStudents.length;\r
      updateAssignmentLabels();\r
      setTimeout(() => loadStudents({ force: true }).catch(() => {}), 0);\r
      return { fromCache: true };\r
    }\r
  }\r
  const snap = await getDocs(collection(db, "schools", adminId, "students"));\r
  const schoolStudents = snap.docs.map(d => ({ id: d.id, ...d.data() }));\r
  const resolved = resolveTeacherStudentScope(schoolStudents);\r
  allStudents = resolved.students.sort(sortStudentsByRollName);\r
  activeClassSection = resolved.activePlacement;\r
  studentScopeMode = resolved.mode;\r
  $("statTotal").textContent = allStudents.length;\r
  updateAssignmentLabels();\r
  try {\r
    localStorage.setItem(cacheKey, JSON.stringify({\r
      savedAt: Date.now(),\r
      students: allStudents,\r
      activeClassSection,\r
      studentScopeMode\r
    }));\r
  } catch {}\r
}\r
\r
async function loadFees() {
  const visibleStudentIds = getVisibleStudentIds();
  if (!visibleStudentIds.size) { allFees = []; return; }
  const snap = await getDocs(collection(db, "schools", adminId, "fees"));
  allFees = snap.docs
    .map(d => ({ id: d.id, ...d.data() }))
    .filter((entry) => [...visibleStudentIds].some((studentId) => feeBelongsToStudent(entry, studentId)) && belongsToActiveSession(entry));
}\r
\r
async function loadAllAttendance() {\r
  const visibleStudentIds = getVisibleStudentIds();\r
  if (!visibleStudentIds.size) { allAttendance = []; return; }\r
  \r
  const snap = await getDocs(collection(db, "schools", adminId, "attendance"));\r
  allAttendance = snap.docs\r
    .map(d => ({ id: d.id, ...d.data() }))\r
    .filter((entry) => visibleStudentIds.has(entry.studentId) && belongsToActiveSession(entry));\r
}\r
\r
function updateTodayStats() {\r
  const today = todayISO();\r
  const todayRecs = allAttendance.filter(a => a.date === today);\r
  $("statPresent").textContent = todayRecs.filter(a => a.status === "Present").length;\r
  $("statAbsent").textContent = todayRecs.filter(a => a.status === "Absent").length;\r
  if (allStudents.length && allAttendance.length) {\r
    const pcts = allStudents.map(s => {\r
      const sid = s.studentId || s.id;\r
      return getStudentAttendancePercentValue(sid);\r
    });\r
    $("statAvgAtt").textContent = \`\${Math.round(pcts.reduce((a, b) => a + b, 0) / pcts.length)}%\`;\r
  } else {\r
    $("statAvgAtt").textContent = "—";\r
  }\r
}\r
\r
function getFeeStatus(studentId) {
  const fees = allFees.filter((fee) => feeBelongsToStudent(fee, studentId));
  if (!fees.length) return { label: "No Record", cls: "badge-pending" };
  const total = fees.reduce((sum, fee) => sum + moneyValue(fee.originalAmount ?? fee.amount ?? 0), 0);
  const paid = fees.reduce((sum, fee) => sum + moneyValue(fee.totalPaidAmount ?? fee.paidAmount ?? 0), 0);
  const due = fees.reduce((sum, fee) => {
    if (fee.remainingAmount !== undefined && fee.remainingAmount !== null) return sum + moneyValue(fee.remainingAmount);
    return sum + Math.max(0, moneyValue(fee.originalAmount ?? fee.amount ?? 0) - moneyValue(fee.totalPaidAmount ?? fee.paidAmount ?? 0));
  }, 0);
  if (total > 0 && due <= 0) return { label: "Paid", cls: "badge-paid" };
  if (paid > 0) return { label: \`Due ₹\${due.toLocaleString("en-IN")}\`, cls: "badge-pending" };
  return { label: \`Due ₹\${due.toLocaleString("en-IN")}\`, cls: "badge-due" };
}\r
\r
function rollSortValue(student = {}) {\r
  return Number(String(student.roll || student.rollNo || "").replace(/[^\\d]/g, "")) || Number.MAX_SAFE_INTEGER;\r
}\r
\r
function sortStudentsByRollName(left, right) {\r
  return rollSortValue(left) - rollSortValue(right) ||\r
    String(left.name || "").localeCompare(String(right.name || ""), "en", { sensitivity: "base", numeric: true }) ||\r
    String(left.studentId || left.id || "").localeCompare(String(right.studentId || right.id || ""), "en", { numeric: true });\r
}\r
\r
function moneyValue(value) {\r
  const parsed = Number(String(value || "0").replace(/[^\\d.-]/g, ""));\r
  return Number.isFinite(parsed) ? parsed : 0;\r
}\r
\r
function getAttendanceWeight(status) {\r
  return status === "Present" ? 1 : status === "Half Day" ? 0.5 : 0;\r
}\r
\r
function getStudentAttendanceRecords(studentId) {\r
  return allAttendance.filter(a => a.studentId === studentId);\r
}\r
\r
function getStudentAttendancePercentValue(studentId) {\r
  const recs = getStudentAttendanceRecords(studentId);\r
  if (!recs.length) return 0;\r
  const weightedPresent = recs.reduce((sum, record) => sum + getAttendanceWeight(record.status), 0);\r
  return Math.round((weightedPresent / recs.length) * 100);\r
}\r
\r
function getAttendanceBelowThreshold() {\r
  const raw = $("studentAttendanceBelow")?.value;\r
  if (raw === undefined || raw === null || raw === "") return NaN;\r
  const parsed = Number(raw);\r
  if (!Number.isFinite(parsed)) return NaN;\r
  return Math.max(0, Math.min(100, parsed));\r
}\r
\r
function getFeeDueAmount(studentId) {
  return allFees
    .filter((fee) => feeBelongsToStudent(fee, studentId))
    .reduce((sum, fee) => {\r
      const total = moneyValue(fee.originalAmount ?? fee.amount ?? 0);\r
      const paid = moneyValue(fee.totalPaidAmount ?? fee.paidAmount ?? 0) + moneyValue(fee.extraPaidAmount ?? fee.totalExtraPaidAmount ?? 0);\r
      const due = fee.remainingAmount !== undefined ? moneyValue(fee.remainingAmount) : Math.max(0, total - paid);\r
      return sum + Math.max(0, due);\r
    }, 0);\r
}\r
\r
function getPrintableClassTitle() {\r
  return formatBadgeClassSection(getActivePlacement()).replace(/\\s+/g, " ").trim();\r
}\r
\r
function openPrintableDocument(title, subtitle, tableHtml) {\r
  const html = buildPrintablePage(title, subtitle, tableHtml);\r
  if (window.SchoolixPrint?.printHtml?.(title, html)) return;\r
  const printWindow = window.open("", "_blank");\r
  if (!printWindow) {\r
    toast("Please allow popups to print or save PDF.", "error");\r
    return;\r
  }\r
  printWindow.document.write(html);\r
  printWindow.document.close();\r
  printWindow.focus();\r
  printWindow.print();\r
}\r
\r
function printableStudentRows(students, options = {}) {\r
  return students.map((student, index) => {\r
    const sid = student.studentId || student.id || "";\r
    const dueAmount = getFeeDueAmount(sid);\r
    const attendanceRecords = getStudentAttendanceRecords(sid);\r
    const attendancePct = getStudentAttendancePercentValue(sid);\r
    return \`<tr>\r
      <td>\${index + 1}</td>\r
      <td>\${escapeHtml(student.name || "Student")}</td>\r
      <td>\${escapeHtml(sid || "-")}</td>\r
      <td>\${escapeHtml(student.roll || student.rollNo || "-")}</td>\r
      \${options.includeDue ? \`<td>\${escapeHtml(fmt(dueAmount))}</td>\` : ""}\r
      \${options.includeAttendance ? \`<td>\${attendancePct}%</td><td>\${attendanceRecords.length}</td>\` : ""}\r
    </tr>\`;\r
  }).join("");\r
}\r
\r
window.printClassStudentList = function() {\r
  if (!allStudents.length) return toast("No students found to print.", "error");\r
  const students = [...allStudents].sort(sortStudentsByRollName);\r
  const table = \`<table>\r
    <thead><tr><th>S.No.</th><th>Student Name</th><th>Student ID</th><th>Roll No.</th></tr></thead>\r
    <tbody>\${printableStudentRows(students)}</tbody>\r
  </table>\`;\r
  openPrintableDocument(\`\${getPrintableClassTitle()} Student List\`, \`\${students.length} student(s) | \${activeSessionLabel || "Current Session"}\`, table);\r
};\r
\r
window.printDueFeeList = function() {\r
  const dueStudents = allStudents\r
    .map(student => ({ ...student, dueAmount: getFeeDueAmount(student.studentId || student.id) }))\r
    .filter(student => student.dueAmount > 0)\r
    .sort((a, b) => b.dueAmount - a.dueAmount || String(a.name || "").localeCompare(String(b.name || "")));\r
  if (!dueStudents.length) return toast("No fee dues found in this class.", "info");\r
  const totalDue = dueStudents.reduce((sum, student) => sum + student.dueAmount, 0);\r
  const table = \`<table>\r
    <thead><tr><th>S.No.</th><th>Student Name</th><th>Student ID</th><th>Roll No.</th><th>Due Amount</th></tr></thead>\r
    <tbody>\${printableStudentRows(dueStudents, { includeDue: true })}</tbody>\r
  </table>\r
  <div class="footer"><strong>Total Due:</strong> \${escapeHtml(fmt(totalDue))}</div>\`;\r
  openPrintableDocument(\`\${getPrintableClassTitle()} Fee Due List\`, \`\${dueStudents.length} student(s) with pending fees | \${activeSessionLabel || "Current Session"}\`, table);\r
};\r
\r
window.printLowAttendanceList = function() {\r
  const threshold = getAttendanceBelowThreshold();\r
  const students = getFilteredStudentRoster().sort(sortStudentsByRollName);\r
  if (!students.length) {\r
    const message = Number.isNaN(threshold)\r
      ? "No students found to print."\r
      : \`No students found below \${threshold}% attendance.\`;\r
    return toast(message, Number.isNaN(threshold) ? "error" : "info");\r
  }\r
  const title = Number.isNaN(threshold)\r
    ? \`\${getPrintableClassTitle()} Attendance List\`\r
    : \`\${getPrintableClassTitle()} Low Attendance List\`;\r
  const subtitle = Number.isNaN(threshold)\r
    ? \`\${students.length} student(s) | \${activeSessionLabel || "Current Session"}\`\r
    : \`\${students.length} student(s) below \${threshold}% attendance | \${activeSessionLabel || "Current Session"}\`;\r
  const table = \`<table>\r
    <thead><tr><th>S.No.</th><th>Student Name</th><th>Student ID</th><th>Roll No.</th><th>Attendance %</th><th>Marked Days</th></tr></thead>\r
    <tbody>\${printableStudentRows(students, { includeAttendance: true })}</tbody>\r
  </table>\`;\r
  openPrintableDocument(title, subtitle, table);\r
};\r
\r
window.printDailyAttendance = function() {\r
  const date = $("attendanceDate")?.value || todayISO();\r
  if (!allStudents.length) return toast("No students found to print attendance.", "error");\r
  const rows = [...allStudents].sort(sortStudentsByRollName).map((student, index) => {\r
    const sid = student.studentId || student.id || "";\r
    const selectValue = Array.from(document.querySelectorAll(".att-select")).find(select => select.dataset.sid === sid)?.value;\r
    const savedValue = findAttendanceRecord(sid, date)?.status;\r
    const status = selectValue || savedValue || "Not Marked";\r
    return \`<tr>\r
      <td>\${index + 1}</td>\r
      <td>\${escapeHtml(student.name || "Student")}</td>\r
      <td>\${escapeHtml(sid || "-")}</td>\r
      <td>\${escapeHtml(student.roll || student.rollNo || "-")}</td>\r
      <td>\${escapeHtml(status)}</td>\r
    </tr>\`;\r
  }).join("");\r
  const counts = Array.from(document.querySelectorAll(".att-select")).reduce((acc, select) => {\r
    acc[select.value] = (acc[select.value] || 0) + 1;\r
    return acc;\r
  }, {});\r
  const summary = \`Date: \${formatAttendanceDate(date)} | Present: \${counts.Present || 0} | Absent: \${counts.Absent || 0} | Half Day: \${counts["Half Day"] || 0}\`;\r
  const table = \`<table>\r
    <thead><tr><th>S.No.</th><th>Student Name</th><th>Student ID</th><th>Roll No.</th><th>Status</th></tr></thead>\r
    <tbody>\${rows}</tbody>\r
  </table>\`;\r
  openPrintableDocument(\`\${getPrintableClassTitle()} Daily Attendance\`, summary, table);\r
};\r
\r
function getFatherPhone(student = {}) {\r
  return student.fatherPhone || student.fatherMobile || student.fatherContact || student.phone || "";\r
}\r
\r
function getMotherPhone(student = {}) {\r
  return student.motherPhone || student.motherMobile || student.motherContact || student.phone || "";\r
}\r
\r
function getParentEmail(student = {}) {\r
  return String(student.parentEmail || student.fatherEmail || student.motherEmail || student.guardianEmail || student.email || "").trim();\r
}\r
\r
function findAttendanceRecord(studentId, date) {\r
  return allAttendance.find(record =>\r
    record.studentId === studentId &&\r
    record.date === date &&\r
    (record.sessionId || "") === (activeSessionId || "")\r
  ) || allAttendance.find(record => record.studentId === studentId && record.date === date);\r
}\r
\r
async function sendAbsenceEmail(student, date, attendanceDocId) {\r
  const parentEmail = getParentEmail(student);\r
\r
  const response = await fetch(ABSENCE_EMAIL_FUNCTION_URL, {\r
    method: "POST",\r
    headers: {\r
      "Content-Type": "application/json",\r
      "apikey": SUPABASE_ANON_KEY,\r
      "Authorization": \`Bearer \${SUPABASE_ANON_KEY}\`\r
    },\r
    body: JSON.stringify({\r
      parentEmail,\r
      studentName: student.name || "Student",\r
      studentId: student.studentId || student.id || "",\r
      studentDocId: student.id || "",\r
      authUid: student.authUid || student.uid || "",\r
      studentAliases: [\r
        student.studentId,\r
        student.id,\r
        student.studentDocId,\r
        student.authUid,\r
        student.uid,\r
        student.email,\r
        student.authEmail\r
      ].filter(Boolean),\r
      schoolId: adminId || "",\r
      className: student.class || teacherData.class || "",\r
      section: student.section || teacherData.section || "",\r
      date: formatAttendanceDate(date),\r
      teacherName: teacherData.name || auth.currentUser?.email || "Teacher",\r
      schoolName: window.SchoolBranding?.getSchoolName() || "Schoolix"\r
    })\r
  });\r
\r
  if (!response.ok) {\r
    const details = await response.text();\r
    throw new Error(details || "Absence email failed");\r
  }\r
  const result = await response.json().catch(() => ({}));\r
\r
  await updateDoc(doc(db, "schools", adminId, "attendance", attendanceDocId), {\r
    absenceEmailSent: Boolean(result.emailSent),\r
    absenceEmailSentAt: serverTimestamp(),\r
    absenceEmailSentTo: result.emailSent ? parentEmail : "",\r
    absenceStudentNotificationSent: Boolean(result.notificationSent),\r
    absenceStudentNotificationSentAt: serverTimestamp()\r
  });\r
  return Boolean(result.emailSent || result.notificationSent);\r
}\r
\r
function getTodayAtt(studentId) {\r
  const r = allAttendance.find(a => a.studentId === studentId && a.date === todayISO());\r
  if (!r) return { label: "No Mark", cls: "badge-noclass" };\r
  if (r.status === "Present") return { label: "Present", cls: "badge-present" };\r
  if (r.status === "Absent") return { label: "Absent", cls: "badge-absent" };\r
  return { label: "Half Day", cls: "badge-half" };\r
}\r
\r
function getAttPct(studentId) {\r
  const recs = allAttendance.filter(a => a.studentId === studentId);\r
  if (!recs.length) return "—";\r
  return \`\${Math.round(recs.filter(a => a.status === "Present").length / recs.length * 100)}%\`;\r
}\r
\r
window.renderStudents = renderStudents;\r
\r
function getFilteredStudentRoster() {\r
  const q = ($("studentSearch")?.value || "").toLowerCase();\r
  const attendanceBelow = getAttendanceBelowThreshold();\r
  return allStudents.filter(s => {\r
    const sid = s.studentId || s.id;\r
    const matchesSearch = !q || (s.name||"").toLowerCase().includes(q) ||\r
      (s.studentId||"").toLowerCase().includes(q) ||\r
      (s.roll||"").toLowerCase().includes(q);\r
    const matchesAttendance = Number.isNaN(attendanceBelow) || getStudentAttendancePercentValue(sid) < attendanceBelow;\r
    return matchesSearch && matchesAttendance;\r
  });\r
}\r
\r
function renderStudents() {\r
  const threshold = getAttendanceBelowThreshold();\r
  const list = getFilteredStudentRoster().sort(sortStudentsByRollName);\r
  if (!list.length) {\r
    const filterLabel = Number.isNaN(threshold)\r
      ? formatShortClassSection(getActivePlacement())\r
      : \`\${formatShortClassSection(getActivePlacement())} below \${threshold}% attendance\`;\r
    $("studentsList").innerHTML = \`<div class="empty-state">No students found for \${escapeHtml(filterLabel)}.</div>\`;\r
    return;\r
  }\r
  $("studentsList").innerHTML = list.map(s => {\r
    const sid = s.studentId || s.id;\r
    const fee = getFeeStatus(sid);\r
    const att = getTodayAtt(sid);\r
    const pct = \`\${getStudentAttendancePercentValue(sid)}%\`;\r
    const tc = s.tcIssued ? \`<span class="badge badge-tc">TC</span>\` : "";\r
    const fatherPhone = getFatherPhone(s);\r
    const motherPhone = getMotherPhone(s);\r
    return \`\r
    <div class="student-row" onclick="openStudentModal('\${s.id}')">\r
      <div class="student-main">\r
        \${renderStudentFace(s)}\r
        <div>\r
        <div class="stu-name">\${s.name || "N/A"} \${tc}</div>\r
        <div class="stu-meta">ID: \${sid} | Roll: \${s.roll || "—"} | Father: \${s.father || "—"} (\${fatherPhone || "—"}) | Mother: \${s.mother || "—"} (\${motherPhone || "—"})</div>\r
      </div>\r
        </div>\r
      <div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:flex-end;">\r
        <span class="badge \${att.cls}">\${att.label}</span>\r
        <span class="badge \${fee.cls}">\${fee.label}</span>\r
        <span class="badge badge-noclass" style="background:var(--primary-soft);color:var(--primary);">\${pct} att.</span>\r
      </div>\r
    </div>\`;\r
  }).join("");\r
}\r
\r
$("studentSearch")?.addEventListener("input", renderStudents);\r
$("studentAttendanceBelow")?.addEventListener("input", renderStudents);\r
\r
// ── STUDENT MODAL ──────────────────────────────────────────────────\r
window.openStudentModal = function(docId) {\r
  const s = allStudents.find(x => x.id === docId);\r
  if (!s) return;\r
  const sid = s.studentId || s.id;\r
  const recs = allAttendance.filter(a => a.studentId === sid);\r
  const present = recs.filter(a => a.status === "Present").length;\r
  const absent = recs.filter(a => a.status === "Absent").length;\r
  const half = recs.filter(a => a.status === "Half Day").length;\r
  const pct = getStudentAttendancePercentValue(sid);\r
  const fee = getFeeStatus(sid);\r
  const fatherPhone = getFatherPhone(s);\r
  const motherPhone = getMotherPhone(s);\r
  $("modalStudentTitle").textContent = s.name || "Student";\r
  $("modalStudentBody").innerHTML = \`\r
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;">\r
      \${renderStudentFace(s)}\r
      <div>\r
        <div class="stu-name">\${escapeHtml(s.name || "Student")}</div>\r
        <div class="stu-meta">ID: \${escapeHtml(sid)}</div>\r
      </div>\r
    </div>\r
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:10px;margin-bottom:18px;">\r
      <div class="sal-box"><div class="sal-num" style="color:var(--primary);">\${pct}%</div><div class="sal-lbl">Attendance</div></div>\r
      <div class="sal-box green"><div class="sal-num">\${present}</div><div class="sal-lbl">Present</div></div>\r
      <div class="sal-box red"><div class="sal-num">\${absent}</div><div class="sal-lbl">Absent</div></div>\r
      <div class="sal-box orange"><div class="sal-num">\${half}</div><div class="sal-lbl">Half Day</div></div>\r
    </div>\r
    <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:14px;">\r
      <tr><td style="padding:8px 0;color:var(--muted);width:40%;font-weight:700;">Student ID</td><td>\${sid}</td></tr>\r
      <tr><td style="padding:8px 0;color:var(--muted);font-weight:700;">Class</td><td>\${s.class}-\${s.section} | Roll \${s.roll||"—"}</td></tr>\r
      <tr><td style="padding:8px 0;color:var(--muted);font-weight:700;">Father</td><td>\${s.father||"—"}</td></tr>\r
      <tr><td style="padding:8px 0;color:var(--muted);font-weight:700;">Father Phone</td><td>\${fatherPhone||"—"}</td></tr>\r
      <tr><td style="padding:8px 0;color:var(--muted);font-weight:700;">Mother</td><td>\${s.mother||"—"}</td></tr>\r
      <tr><td style="padding:8px 0;color:var(--muted);font-weight:700;">Mother Phone</td><td>\${motherPhone||"—"}</td></tr>\r
      <tr><td style="padding:8px 0;color:var(--muted);font-weight:700;">Primary Phone</td><td>\${s.phone||"—"}</td></tr>\r
      <tr><td style="padding:8px 0;color:var(--muted);font-weight:700;">Fee Status</td><td><span class="badge \${fee.cls}">\${fee.label}</span></td></tr>\r
    </table>\r
    \${s.tcIssued ? \`<div class="info-box locked">Transfer Certificate issued — attendance and updates are restricted.</div>\` : ""}\r
  \`;\r
  $("studentModal").classList.add("open");\r
};\r
window.closeStudentModal = () => $("studentModal").classList.remove("open");\r
\r
// ── ATTENDANCE ─────────────────────────────────────────────────────\r
async function reloadAttendanceTab() {\r
  if (!requireAttendanceAccess()) return;\r
  await loadAllAttendance();\r
  renderAttendanceList();\r
}\r
window.reloadAttendanceTab = reloadAttendanceTab;\r
\r
function getAttendanceAccessState(date) {\r
  if (!date) {\r
    return { locked: true, reason: "missing-date", badgeClass: "locked", badgeText: "Select Date",\r
      message: \`<div class="info-box notice">Select a date to view or save attendance.</div>\` };\r
  }\r
  if (date > todayISO()) {\r
    return { locked: true, reason: "future-date", badgeClass: "locked", badgeText: "Future Locked",\r
      message: \`<div class="info-box notice">Attendance can only be marked for today or the last 48 hours from the teacher panel.</div>\` };\r
  }\r
  const selectedDate = parseAttendanceDate(date);\r
  const isOlderThan48Hours = selectedDate ? (Date.now() - selectedDate.getTime()) >= ATTENDANCE_EDIT_WINDOW_MS : false;\r
  if (isOlderThan48Hours) {\r
    return { locked: true, reason: "expired-window", badgeClass: "locked", badgeText: "View Only",\r
      message: \`<div class="info-box locked">Attendance for \${formatAttendanceDate(date)} is view-only. Older than 48 hours.</div>\` };\r
  }\r
  return { locked: false, reason: "editable-window", badgeClass: "unlocked", badgeText: "Editable",\r
    message: \`<div class="info-box success">Teacher changes remain open for 48 hours. Save attendance for \${formatAttendanceDate(date)} while this window is active.</div>\` };\r
}\r
\r
function setAttendanceEditControlsDisabled(disabled) {\r
  document.querySelectorAll("[data-attendance-edit-control]").forEach(control => { control.disabled = disabled; });\r
}\r
\r
function renderAttendanceList() {\r
  if (!attendanceAccessEnabled) {\r
    $("attendanceList").innerHTML = \`<div class="empty-state">Attendance access has been disabled for your school by the Super Admin.</div>\`;\r
    return;\r
  }\r
  const date = $("attendanceDate").value;\r
  if (!date) return;\r
  const accessState = getAttendanceAccessState(date);\r
  isLocked = accessState.locked;\r
  const lockBadge = $("lockBadge");\r
  lockBadge.className = \`lock-badge \${accessState.badgeClass}\`;\r
  lockBadge.textContent = accessState.badgeText;\r
  $("lockInfo").innerHTML = accessState.message;\r
  setAttendanceEditControlsDisabled(isLocked);\r
\r
  if (!allStudents.length) {\r
    $("attendanceList").innerHTML = \`<div class="empty-state">No students found in this class/section.</div>\`;\r
    updateAttMiniStats(); return;\r
  }\r
  const attendanceForDate = allAttendance.filter(a => a.date === date);\r
  const rmap = {};\r
  attendanceForDate.forEach(a => { rmap[a.studentId] = a.status; });\r
\r
  if (isLocked && !attendanceForDate.length) {\r
    const emptyMessage = accessState.reason === "future-date"\r
      ? "Future dates cannot be marked from the teacher panel."\r
      : \`No attendance was saved for \${formatAttendanceDate(date)}. This date is now view-only.\`;\r
    $("attendanceList").innerHTML = \`<div class="empty-state">\${emptyMessage}</div>\`;\r
    updateAttMiniStats(); return;\r
  }\r
\r
  $("attendanceList").innerHTML = [...allStudents].sort(sortStudentsByRollName).map(s => {\r
    const sid = s.studentId || s.id;\r
    const hasSavedStatus = Object.prototype.hasOwnProperty.call(rmap, sid);\r
    const status = hasSavedStatus ? rmap[sid] : (isLocked ? "Not Marked" : "Present");\r
    const rowCls = status === "Present" ? "att-present" : status === "Absent" ? "att-absent" : status === "Half Day" ? "att-half" : "att-unmarked";\r
    const tc = !!s.tcIssued;\r
    const disabled = isLocked || tc ? "disabled" : "";\r
    const safeSid = escapeHtml(sid);\r
    const safeName = escapeHtml(s.name || "Student");\r
    const safeRoll = escapeHtml(s.roll || "-");\r
    const options = (isLocked\r
      ? ["Present", "Absent", "Half Day", "Not Marked"]\r
      : ["Present", "Absent", "Half Day"]\r
    ).map(v => \`<option value="\${v}" \${v===status?"selected":""}>\${v}</option>\`).join("");\r
    return \`\r
    <div class="att-row \${rowCls}" id="attrow-\${safeSid}">\r
      <div class="att-student-main">\r
        \${renderStudentFace(s, "student-face attendance-face")}\r
        <div>\r
          <div style="font-weight:700;">\${safeName} \${tc ? \`<span class="badge badge-tc">TC</span>\` : ""}</div>\r
        <div style="font-size:12px;color:var(--muted);">ID: \${safeSid} | Roll: \${safeRoll}</div>\r
      </div>\r
        </div>\r
      <select class="att-select" id="attsel-\${safeSid}" data-sid="\${safeSid}" onchange="onAttChange(this)" \${disabled}>\r
        \${options}\r
      </select>\r
    </div>\`;\r
  }).join("");\r
  updateAttMiniStats();\r
}\r
window.renderAttendanceList = renderAttendanceList;\r
\r
window.onAttChange = function(sel) {\r
  const row = sel.closest(".att-row");\r
  const statusClass = sel.value === "Present" ? "att-present" : sel.value === "Absent" ? "att-absent" : sel.value === "Half Day" ? "att-half" : "att-unmarked";\r
  row.className = \`att-row \${statusClass}\`;\r
  updateAttMiniStats();\r
};\r
\r
function updateAttMiniStats() {\r
  const rows = Array.from(document.querySelectorAll(".att-select"));\r
  let p = 0, a = 0, h = 0;\r
  rows.forEach(s => { if (s.value === "Present") p++; else if (s.value === "Absent") a++; else if (s.value === "Half Day") h++; });\r
  $("attP").textContent = p; $("attA").textContent = a; $("attH").textContent = h;\r
  const total = p + a + h;\r
  $("attPct").textContent = total ? \`\${Math.round(p/total*100)}%\` : "0%";\r
}\r
\r
window.bulkMark = function(status) {\r
  if (!requireAttendanceAccess()) return;\r
  if (!requireValidatedTeacherSession("mark attendance")) return;\r
  if (isLocked) return toast("Attendance is locked.", "error");\r
  document.querySelectorAll(".att-select:not([disabled])").forEach(sel => { sel.value = status; window.onAttChange(sel); });\r
};\r
\r
window.saveAttendance = async function() {\r
  if (!requireAttendanceAccess()) return;\r
  if (!requireValidatedTeacherSession("save attendance")) return;\r
  if (activeSessionLocked) return toast("Selected session is locked. Attendance is view only.", "error");\r
  if (isLocked) return toast("Attendance is locked.", "error");\r
  const date = $("attendanceDate").value;\r
  if (!date) return toast("Select a date.", "error");\r
  if (!confirm(\`Save attendance for \${formatAttendanceDate(date)}?\`)) return;\r
  const sels = document.querySelectorAll(".att-select:not([disabled])");\r
  if (!sels.length) return toast("No editable students.", "error");\r
  const writes = [];\r
  const absenceEmailTasks = [];\r
  sels.forEach(sel => {\r
    const sid = sel.dataset.sid;\r
    const student = allStudents.find(s => (s.studentId||s.id) === sid);\r
    if (!student) return;\r
    const attendanceDocId = \`\${sid}_\${date}_\${activeSessionId}\`;\r
    const existingRecord = findAttendanceRecord(sid, date) || {};\r
    const hasParentEmail = Boolean(getParentEmail(student));\r
    const shouldEmailAbsent = sel.value === "Absent" &&\r
      ((hasParentEmail && !existingRecord.absenceEmailSent) || !existingRecord.absenceStudentNotificationSent);\r
    const attendancePayload = {\r
      studentId: sid, studentName: student.name, class: student.class || teacherData.class, section: student.section || teacherData.section,\r
      date, status: sel.value, teacherId: teacherData.uid || auth.currentUser.uid, teacherUid: teacherData.uid || auth.currentUser.uid,\r
      teacherName: teacherData.name || auth.currentUser?.email || "Teacher",\r
      markedBy: teacherData.name || auth.currentUser?.email || "Teacher",\r
      markedByRole: "teacher",\r
      timestamp: serverTimestamp(),\r
      sessionId: activeSessionId || "", session: activeSessionLabel || ""\r
    };\r
    if (sel.value === "Absent") {\r
      attendancePayload.absenceEmailSent = existingRecord.absenceEmailSent || false;\r
      attendancePayload.absenceEmailSentAt = existingRecord.absenceEmailSentAt || null;\r
      attendancePayload.absenceEmailSentTo = existingRecord.absenceEmailSentTo || "";\r
      attendancePayload.absenceStudentNotificationSent = existingRecord.absenceStudentNotificationSent || false;\r
      attendancePayload.absenceStudentNotificationSentAt = existingRecord.absenceStudentNotificationSentAt || null;\r
    } else {\r
      attendancePayload.absenceEmailSent = false;\r
      attendancePayload.absenceEmailSentAt = null;\r
      attendancePayload.absenceEmailSentTo = "";\r
      attendancePayload.absenceStudentNotificationSent = false;\r
      attendancePayload.absenceStudentNotificationSentAt = null;\r
    }\r
    writes.push(setDoc(doc(db, "schools", adminId, "attendance", attendanceDocId), attendancePayload));\r
    if (shouldEmailAbsent) {\r
      absenceEmailTasks.push({ student, date, attendanceDocId });\r
    }\r
  });\r
  await Promise.all(writes);\r
  const emailResults = await Promise.allSettled(absenceEmailTasks.map(task => sendAbsenceEmail(task.student, task.date, task.attendanceDocId)));\r
  await loadAllAttendance();\r
  updateTodayStats();\r
  renderAttendanceList();\r
  const failedCount = emailResults.filter(result => result.status === "rejected").length;\r
  if (failedCount) {\r
    console.warn(\`\${failedCount} absence alert(s) could not be sent.\`);\r
    toast("Attendance updated.");\r
  } else {\r
    toast("Attendance updated.");\r
  }\r
};\r
\r
$("attendanceDate")?.addEventListener("change", renderAttendanceList);\r
\r
function setTeacherQrStatus(message, type = "info") {\r
  const box = $("teacherQrStatus");\r
  if (!box) return;\r
  box.textContent = message;\r
  box.style.borderColor = type === "error" ? "rgba(192,40,15,0.28)" : type === "success" ? "rgba(10,138,78,0.28)" : "var(--border)";\r
  box.style.color = type === "error" ? "var(--danger)" : type === "success" ? "var(--success)" : "var(--muted)";\r
}\r
\r
function parseTeacherQrToken(rawValue) {\r
  const value = String(rawValue || "").trim();\r
  const prefix = "SCHLX-TEACHER-ATT:";\r
  return value.startsWith(prefix) ? value.slice(prefix.length).trim() : value;\r
}\r
\r
async function markTeacherAttendanceFromQr(rawValue) {\r
  if (!requireAttendanceAccess()) return;\r
  const tokenId = parseTeacherQrToken(rawValue);\r
  if (!tokenId) return toast("QR code is empty.", "error");\r
  if (!adminId || !teacherData.uid) return toast("Teacher profile is still loading.", "error");\r
\r
  const tokenRef = doc(db, "schools", adminId, "teacher_attendance_qr", tokenId);\r
  const tokenSnap = await getDoc(tokenRef);\r
  if (!tokenSnap.exists()) throw new Error("This QR code was not found. Ask admin to generate a fresh QR.");\r
\r
  const token = tokenSnap.data();\r
  if (token.teacherUid !== teacherData.uid) throw new Error("This QR belongs to another teacher.");\r
  if (token.active === false) throw new Error("This QR code has already been used.");\r
  if (Number(token.expiresAtMillis || 0) && Date.now() > Number(token.expiresAtMillis)) {\r
    throw new Error("This QR has expired. Ask admin to show the latest QR.");\r
  }\r
  if (!token.date || token.date !== todayISO()) throw new Error("This QR is not for today's attendance.");\r
\r
  const qrMode = token.qrMode || "checkin";\r
  const attendanceRef = doc(db, "schools", adminId, "teacher_attendance", \`\${teacherData.uid}_\${token.date}\`);\r
  const existingAttendanceSnap = await getDoc(attendanceRef);\r
  const existingAttendance = existingAttendanceSnap.exists() ? existingAttendanceSnap.data() : {};\r
  const actionTime = token.actionTime || token.checkInTime || token.checkOutTime || "";\r
  const nextStatus = qrMode === "halfday" ? "Half Day" : (existingAttendance.status || "Present");\r
  const nextCheckIn = qrMode === "checkout"\r
    ? (existingAttendance.checkInTime || token.checkInTime || "")\r
    : (existingAttendance.checkInTime || token.checkInTime || actionTime);\r
  const nextCheckOut = qrMode === "checkin"\r
    ? (existingAttendance.checkOutTime || "")\r
    : (token.checkOutTime || actionTime);\r
  const notes = qrMode === "checkout"\r
    ? "Check-out marked by teacher QR scan."\r
    : qrMode === "halfday"\r
      ? "Half day marked by teacher QR scan."\r
      : "Check-in marked by teacher QR scan.";\r
\r
  await setDoc(attendanceRef, {\r
    teacherUid: teacherData.uid,\r
    teacherId: teacherData.teacherId || token.teacherId || "",\r
    teacherName: teacherData.name || token.teacherName || "",\r
    teacherEmail: teacherData.email || token.teacherEmail || "",\r
    class: teacherData.class || "",\r
    section: teacherData.section || "",\r
    date: token.date,\r
    status: nextStatus,\r
    presentWeight: nextStatus === "Half Day" ? 0.5 : 1,\r
    checkInTime: nextCheckIn,\r
    checkOutTime: nextCheckOut,\r
    notes,\r
    qrTokenId: tokenId,\r
    lastQrMode: qrMode,\r
    updatedAt: serverTimestamp(),\r
    updatedBy: teacherData.email || auth.currentUser?.email || "teacher"\r
  }, { merge: true });\r
\r
  await setDoc(tokenRef, {\r
    active: false,\r
    scannedAt: serverTimestamp(),\r
    scannedBy: teacherData.email || auth.currentUser?.email || "",\r
    scannedByUid: teacherData.uid\r
  }, { merge: true });\r
\r
  setTeacherQrStatus(\`\${token.modeLabel || "Attendance"} marked for \${formatAttendanceDate(token.date)} at \${actionTime || "admin time"}.\`, "success");\r
  toast(\`\${token.modeLabel || "Attendance"} marked.\`);\r
  window.loadTeacherAttendanceHistory?.();\r
}\r
\r
window.submitTeacherQrManualCode = async function() {\r
  if (!requireAttendanceAccess()) return;\r
  try {\r
    await markTeacherAttendanceFromQr($("teacherQrManualCode")?.value || "");\r
    $("teacherQrManualCode").value = "";\r
  } catch (error) {\r
    console.error(error);\r
    setTeacherQrStatus(error.message || "Unable to mark attendance from QR.", "error");\r
    toast(error.message || "Unable to mark attendance from QR.", "error");\r
  }\r
};\r
\r
window.startTeacherQrScanner = async function() {\r
  if (!requireAttendanceAccess()) return;\r
  if (!("BarcodeDetector" in window)) {\r
    setTeacherQrStatus("Camera QR scanning is not supported in this browser. Paste the code below instead.", "error");\r
    return;\r
  }\r
  if (teacherQrStream) return;\r
  try {\r
    const video = $("teacherQrVideo");\r
    teacherQrStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" }, audio: false });\r
    video.srcObject = teacherQrStream;\r
    video.style.display = "block";\r
    $("teacherQrCameraHint").style.display = "none";\r
    await video.play();\r
    const detector = new BarcodeDetector({ formats: ["qr_code"] });\r
    setTeacherQrStatus("Scanning for QR code...", "info");\r
    teacherQrScanTimer = window.setInterval(async () => {\r
      if (teacherQrScanBusy || !teacherQrStream) return;\r
      teacherQrScanBusy = true;\r
      try {\r
        const codes = await detector.detect(video);\r
        if (codes.length) {\r
          await markTeacherAttendanceFromQr(codes[0].rawValue);\r
          window.stopTeacherQrScanner();\r
        }\r
      } catch (error) {\r
        console.error(error);\r
        setTeacherQrStatus(error.message || "Unable to scan this QR.", "error");\r
      } finally {\r
        teacherQrScanBusy = false;\r
      }\r
    }, 700);\r
  } catch (error) {\r
    console.error(error);\r
    setTeacherQrStatus(error.message || "Camera permission was not granted.", "error");\r
  }\r
};\r
\r
window.stopTeacherQrScanner = function() {\r
  if (teacherQrScanTimer) window.clearInterval(teacherQrScanTimer);\r
  teacherQrScanTimer = null;\r
  teacherQrScanBusy = false;\r
  if (teacherQrStream) {\r
    teacherQrStream.getTracks().forEach(track => track.stop());\r
    teacherQrStream = null;\r
  }\r
  const video = $("teacherQrVideo");\r
  if (video) {\r
    video.pause();\r
    video.srcObject = null;\r
    video.style.display = "none";\r
  }\r
  if ($("teacherQrCameraHint")) $("teacherQrCameraHint").style.display = "block";\r
};\r
\r
function teacherAttendanceBadge(status) {\r
  if (status === "Present") return "badge-present";\r
  if (status === "Half Day") return "badge-half";\r
  if (status === "Absent") return "badge-absent";\r
  return "badge-noclass";\r
}\r
\r
window.loadTeacherAttendanceHistory = async function() {\r
  if (!requireAttendanceAccess()) return;\r
  const box = $("teacherAttendanceHistory");\r
  if (!box || !adminId || !teacherData.uid) return;\r
  const month = $("teacherAttendanceMonth")?.value || currentMonth();\r
  box.innerHTML = \`<div class="empty-state">Loading attendance details...</div>\`;\r
  try {\r
    const snap = await getDocs(query(collection(db, "schools", adminId, "teacher_attendance"), where("teacherUid", "==", teacherData.uid)));\r
    const monthPrefix = \`\${month}-\`;\r
    const records = snap.docs\r
      .map(docSnap => ({ id: docSnap.id, ...docSnap.data() }))\r
      .filter(record => String(record.date || "").startsWith(monthPrefix))\r
      .sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")));\r
\r
    if (!records.length) {\r
      box.innerHTML = \`<div class="empty-state">No teacher attendance found for this month.</div>\`;\r
      return;\r
    }\r
\r
    box.innerHTML = records.map(record => {\r
      const checkIn = record.checkInTime || "--";\r
      const checkOut = record.checkOutTime || "--";\r
      const status = record.status || "Not Marked";\r
      return \`\r
        <div class="teacher-attendance-record">\r
          <div>\r
            <div class="record-date">\${formatAttendanceDate(record.date)}</div>\r
            <div class="record-meta">\${escapeHtml(record.notes || "Attendance marked")}</div>\r
          </div>\r
          <span class="badge \${teacherAttendanceBadge(status)}">\${escapeHtml(status)}</span>\r
          <div class="record-meta" style="text-align:right;">\r
            <strong>In:</strong> \${escapeHtml(checkIn)}<br>\r
            <strong>Out:</strong> \${escapeHtml(checkOut)}\r
          </div>\r
        </div>\`;\r
    }).join("");\r
  } catch (error) {\r
    console.error(error);\r
    box.innerHTML = \`<div class="empty-state">Unable to load attendance details.</div>\`;\r
  }\r
};\r
\r
// ── SALARY ─────────────────────────────────────────────────────────\r
window.loadSalaryData = async function() {\r
  const month = $("salaryMonthPicker").value;\r
  if (!month || !adminId) return;\r
  $("statSalaryMonth").textContent = new Date(month+"-01").toLocaleDateString("en-IN",{month:"long",year:"numeric"});\r
  const recordId = \`\${teacherData.uid}_\${month}\`;\r
  const snap = await getDoc(doc(db, "schools", adminId, "teacher_salary_records", recordId));\r
  if (snap.exists()) {\r
    salaryRecord = snap.data();\r
    const base = Number(salaryRecord.baseSalary || teacherData.monthlySalary || 0);\r
    const net = Number(salaryRecord.netSalary || 0);\r
    const paid = Number(salaryRecord.paidAmount || 0);\r
    const remaining = Number(salaryRecord.remainingAmount || 0);\r
    const deduction = Number(salaryRecord.deductionAmount || 0);\r
    const present = Number(salaryRecord.presentDays || 0);\r
    const half = Number(salaryRecord.halfDays || 0);\r
    const absent = Number(salaryRecord.absentDays || 0);\r
    $("salBase").textContent = fmt(base); $("salPresentDays").textContent = present;\r
    $("salHalfDays").textContent = half; $("salAbsentDays").textContent = absent;\r
    $("salDeduction").textContent = fmt(deduction); $("salNet").textContent = fmt(net);\r
    $("salPaid").textContent = fmt(paid); $("salPending").textContent = fmt(remaining);\r
    $("statNetSalary").textContent = fmt(net);\r
    const pct = net > 0 ? Math.min(100, Math.round(paid/net*100)) : 0;\r
    $("salProgressBar").style.width = pct + "%";\r
    $("salProgressLabel").textContent = \`\${pct}% paid\`;\r
    const payments = Array.isArray(salaryRecord.payments) ? salaryRecord.payments : [];\r
    if (payments.length) {\r
      $("salPaymentHistory").innerHTML = \`<div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:var(--muted);margin-bottom:8px;">Payment History</div>\r
        \${payments.slice().reverse().map(p => \`<div style="display:flex;justify-content:space-between;padding:10px 14px;border:1px solid var(--border);border-radius:var(--radius-sm);margin-bottom:6px;background:var(--surface2);">\r
          <div><strong style="font-size:14px;">\${fmt(p.amount)}</strong><div style="font-size:12px;color:var(--muted);">\${p.note || "Salary payment"}</div></div>\r
          <div style="text-align:right;font-size:12px;color:var(--muted);">\${p.paymentDate ? new Date(p.paymentDate+"T00:00").toLocaleDateString("en-IN") : "—"}</div>\r
        </div>\`).join("")}\`;\r
    } else {\r
      $("salPaymentHistory").innerHTML = \`<div style="font-size:13px;color:var(--muted);margin-top:4px;">No payment recorded for this month yet.</div>\`;\r
    }\r
  } else {\r
    const base = Number(teacherData.monthlySalary || 0);\r
    const attSnap = await getDocs(query(collection(db, "schools", adminId, "teacher_attendance"), where("teacherUid", "==", teacherData.uid)));\r
    const monthRecs = attSnap.docs.map(d => d.data()).filter(r => String(r.date||"").startsWith(month+"-"));\r
    const workingDays = countAttendanceWorkingDays(monthRecs);\r
    const perDay = workingDays ? base / workingDays : 0;\r
    const present = monthRecs.filter(r => r.status === "Present").length;\r
    const half = monthRecs.filter(r => r.status === "Half Day").length;\r
    const absent = monthRecs.filter(r => r.status === "Absent").length;\r
    const deduction = Math.round((absent + half*0.5) * perDay);\r
    const net = Math.max(base - deduction, 0);\r
    $("salBase").textContent = fmt(base); $("salPresentDays").textContent = present;\r
    $("salHalfDays").textContent = half; $("salAbsentDays").textContent = absent;\r
    $("salDeduction").textContent = fmt(deduction); $("salNet").textContent = fmt(net);\r
    $("salPaid").textContent = "₹0"; $("salPending").textContent = fmt(net);\r
    $("statNetSalary").textContent = fmt(net);\r
    $("salProgressBar").style.width = "0%"; $("salProgressLabel").textContent = "0% paid";\r
    $("salPaymentHistory").innerHTML = \`<div style="font-size:13px;color:var(--muted);margin-top:4px;">Salary record not yet generated by admin for this month.</div>\`;\r
  }\r
};\r
\r
// ── TERMS ──────────────────────────────────────────────────────────\r
async function loadTerms() {\r
  await loadReportTermLocks();\r
  const snap = await getDocs(collection(db, "schools", adminId, "terms"));\r
  const scopedTerms = snap.docs\r
    .map(d => ({ id: d.id, ...d.data() }))\r
    .filter(termBelongsToActiveSession)\r
    .filter(termBelongsToActivePlacement)\r
    .sort((a, b) => (a.createdAt?.seconds || 0) - (b.createdAt?.seconds || 0));\r
  const uniqueTerms = new Map();\r
  scopedTerms.forEach((term) => {\r
    const termKey = term.termKey || getReportTermKey(term.label || term.term || "");\r
    if (!termKey) return;\r
    const normalized = { ...term, termKey, label: term.label || term.term || termKey };\r
    if (!uniqueTerms.has(termKey) || term.section) uniqueTerms.set(termKey, normalized);\r
  });\r
  allTerms = Array.from(uniqueTerms.values());\r
  if (activeTermKey && !allTerms.some((term) => term.termKey === activeTermKey)) {\r
    activeTermKey = "";\r
    $("activeTermBanner").style.display = "none";\r
  }\r
  renderTermDropdown();\r
  if (!activeTermKey && $("reportTab")?.classList.contains("active")) {\r
    $("reportContent").innerHTML = \`<div class="empty-state">Select a term above to start entering marks.</div>\`;\r
  }\r
}\r
\r
async function loadReportTermLocks() {\r
  reportTermLocks = {};\r
  if (!adminId) return;\r
  try {\r
    const snap = await getDoc(doc(db, "schools", adminId, "settings", "reportCardTermLocks"));\r
    reportTermLocks = snap.exists() ? (snap.data().locks || {}) : {};\r
  } catch (error) {\r
    console.warn("Report term locks load failed:", error);\r
  }\r
}\r
\r
function renderTermDropdown() {\r
  const sel = $("reportTermSelect");\r
  const currentVal = activeTermKey;\r
  sel.innerHTML = \`<option value="">— Select a term —</option>\`;\r
  allTerms.forEach(t => {\r
    const opt = document.createElement("option");\r
    opt.value = t.termKey;\r
    opt.textContent = \`\${t.label}\${isReportTermLocked(t.termKey) ? " (Locked)" : ""}\`;\r
    if (t.termKey === currentVal) opt.selected = true;\r
    sel.appendChild(opt);\r
  });\r
}\r
\r
window.onTermSelectChange = function() {\r
  const sel = $("reportTermSelect");\r
  activeTermKey = sel.value;\r
  if (!activeTermKey) {\r
    $("activeTermBanner").style.display = "none";\r
    $("reportContent").innerHTML = \`<div class="empty-state">Select a term above to start entering marks.</div>\`;\r
    return;\r
  }\r
  const term = allTerms.find(t => t.termKey === activeTermKey);\r
  if (term) {\r
    $("activeTermBanner").style.display = "block";\r
    $("activeTermBanner").textContent = isReportTermLocked()\r
      ? \`Active Term: \${term.label} - Locked by admin. Marks and report cards are view only.\`\r
      : \`Active Term: \${term.label} - All marks entered below will be saved under this term.\`;\r
  }\r
  loadReportTab();\r
};\r
\r
// ── REPORT CARDS ───────────────────────────────────────────────────\r
async function loadSubjects() {\r
  const snap = await getDocs(collection(db, "schools", adminId, "subjects"));\r
  return snap.docs.map(d => ({ id: d.id, ...d.data(), maxMarks: Number(d.data().maxMarks || 100) }));\r
}\r
\r
window.loadReportTab = async function() {\r
  if (!activeTermKey) {\r
    $("reportContent").innerHTML = \`<div class='empty-state'>Select a term above to start entering marks.</div>\`;\r
    return;\r
  }\r
  const term = allTerms.find(t => t.termKey === activeTermKey);\r
  if (!term) return;\r
  const termLocked = isReportTermLocked();\r
\r
  const subjects = await loadSubjects();\r
  if (!subjects.length) {\r
    $("reportContent").innerHTML = \`<div class='empty-state'>No subjects added yet. Click "+ Add Subject" to start.</div>\`;\r
    return;\r
  }\r
\r
  const marksSnap = await getDocs(collection(db, "schools", adminId, "marks"));\r
  const marksMap = {};\r
  marksSnap.forEach(d => { marksMap[d.id] = d.data(); });\r
\r
  $("reportContent").innerHTML = allStudents.map(s => {\r
    const sid = s.studentId || s.id;\r
    const marksDoc = marksMap[sid] || {};\r
    const marksTermKey = getActiveMarksTermKey();\r
   const termMarks = marksDoc.terms?.[marksTermKey] || (!activeSessionId ? (marksDoc.terms?.[activeTermKey] || marksDoc.terms?.[term.label]) : {}) || {};\r
const inputs = subjects.map(sub => {\r
  const entry = getSubjectMarkEntry(termMarks, sub);\r
  const displayValue = (entry.obtained != null && entry.obtained !== "" && !isNaN(entry.obtained)) \r
    ? Number(entry.obtained) \r
    : "";\r
  const maxMarks = entry.maxMarks || getSubjectMaxMarks(sub);\r
  return \`\r
  <div class="marks-item">\r
    <span class="marks-label">\${sub.name} <span style="font-weight:600;color:var(--muted);text-transform:none;">(Max \${maxMarks})</span></span>\r
    <input class="marks-input" type="number" min="0" max="\${maxMarks}" placeholder="0–\${maxMarks}"\r
      value="\${displayValue}"\r
      data-student-id="\${escapeHtml(sid)}"\r
      data-subject="\${escapeHtml(sub.name)}"\r
      data-max-marks="\${maxMarks}"\r
      oninput="markMarksDirty()" \${activeSessionLocked || termLocked ? "disabled" : ""}>\r
  </div>\`;\r
}).join("");\r
    return \`\r
    <div class="grade-row">\r
      <div class="grade-head">\r
        <div>\r
          <strong style="font-size:15px;">\${s.name}</strong>\r
          <div style="font-size:12px;color:var(--muted);">ID: \${sid} | Roll: \${s.roll || "—"} | Term: \${term.label}</div>\r
        </div>\r
      </div>\r
      <div class="marks-grid">\${inputs}</div>\r
    </div>\`;\r
  }).join("") || \`<div class='empty-state'>No students.</div>\`;\r
  resetMarksDirtyState();\r
};\r
\r
window.markMarksDirty = function() {\r
  marksDirty = true;\r
  const btn = $("saveMarksBtn");\r
  if (!btn) return;\r
  btn.classList.remove("btn-primary");\r
  btn.classList.add("btn-warning");\r
  btn.innerHTML = \`<span class="ui-icon" data-icon="save"></span>Save Marks\`;\r
};\r
\r
function resetMarksDirtyState() {\r
  marksDirty = false;\r
  const btn = $("saveMarksBtn");\r
  if (!btn) return;\r
  btn.disabled = false;\r
  btn.classList.remove("btn-warning");\r
  btn.classList.add("btn-primary");\r
  btn.innerHTML = \`<span class="ui-icon" data-icon="save"></span>Save Marks\`;\r
}\r
\r
window.saveAllMarks = async function() {\r
  if (!requireValidatedTeacherSession("save marks")) return;\r
  if (activeSessionLocked) return toast("Selected session is locked. Marks are view only.", "error");\r
  if (isReportTermLocked()) return toast("This term is locked by admin. Marks are view only.", "error");\r
  if (!activeTermKey) return toast("Select term first", "error");\r
\r
  const inputs = Array.from(document.querySelectorAll("#reportContent .marks-input"));\r
  if (!inputs.length) return toast("No marks to save.", "error");\r
\r
  const marksTermKey = getActiveMarksTermKey();\r
  const grouped = new Map();\r
  inputs.forEach((input) => {\r
    const sid = input.dataset.studentId || "";\r
    const subject = input.dataset.subject || "";\r
    if (!sid || !subject) return;\r
    if (!grouped.has(sid)) grouped.set(sid, {});\r
    grouped.get(sid)[subject] = {\r
      obtained: input.value === "" || input.value == null ? null : Number(input.value),\r
      maxMarks: Number(input.dataset.maxMarks || input.max || 100)\r
    };\r
  });\r
\r
  if (!grouped.size) return toast("No marks to save.", "error");\r
\r
  const btn = $("saveMarksBtn");\r
  const previousHtml = btn?.innerHTML;\r
  if (btn) {\r
    btn.disabled = true;\r
    btn.innerHTML = \`<span class="ui-icon" data-icon="save"></span>Saving...\`;\r
  }\r
\r
  try {\r
    await Promise.all(Array.from(grouped.entries()).map(([sid, termMarks]) =>\r
      setDoc(doc(db, "schools", adminId, "marks", sid), {\r
        terms: { [marksTermKey]: termMarks },\r
        updatedAt: serverTimestamp(),\r
        updatedBy: teacherData.name || auth.currentUser?.email || "Teacher"\r
      }, { merge: true })\r
    ));\r
    toast("Marks saved successfully.", "success");\r
    marksDirty = false;\r
    if (btn) {\r
      btn.classList.remove("btn-warning");\r
      btn.classList.add("btn-primary");\r
      btn.innerHTML = \`<span class="ui-icon" data-icon="save"></span>Save Marks\`;\r
    }\r
  } catch (error) {\r
    console.error("Bulk marks save error:", error);\r
    toast("Unable to save marks.", "error");\r
    if (btn && previousHtml) btn.innerHTML = previousHtml;\r
  } finally {\r
    if (btn) btn.disabled = false;\r
  }\r
};\r
\r
window.saveMark = async function(sid, subject, value, maxMarks) {\r
  if (!requireValidatedTeacherSession("save marks")) return;\r
  if (activeSessionLocked) return toast("Selected session is locked. Marks are view only.", "error");\r
  if (isReportTermLocked()) return toast("This term is locked by admin. Marks are view only.", "error");\r
  if (!activeTermKey) {\r
    toast("Select term first", "error");\r
    return;\r
  }\r
\r
  const ref = doc(db, "schools", adminId, "marks", sid);\r
  const snap = await getDoc(ref);\r
\r
  let data = snap.exists() ? snap.data() : {};\r
\r
  if (!data.terms) data.terms = {};\r
  const marksTermKey = getActiveMarksTermKey();\r
  if (!data.terms[marksTermKey]) data.terms[marksTermKey] = {};\r
\r
  const obtainedValue = value === "" || value == null ? null : Number(value);\r
  \r
  data.terms[marksTermKey][subject] = {\r
    obtained: obtainedValue,\r
    maxMarks: Number(maxMarks || 100)\r
  };\r
\r
  await setDoc(ref, data, { merge: true });\r
  toast("Saved");\r
  \r
  setTimeout(() => loadReportTab(), 500);\r
};\r
window.generateAllReports = async function() {\r
  if (!requireValidatedTeacherSession("generate reports")) return;\r
  if (activeSessionLocked) return toast("Selected session is locked. Report cards are view only.", "error");\r
  if (isReportTermLocked()) return toast("This term is locked by admin. Report cards are view only.", "error");\r
  if (marksDirty) return toast("Save marks first, then generate reports.", "error");\r
  if (!activeTermKey) return toast("Select a term first.", "error");\r
  const term = allTerms.find(t => t.termKey === activeTermKey);\r
  if (!term) return toast("Term not found.", "error");\r
\r
  const subjects = await loadSubjects();\r
  if (!subjects.length) return toast("Add subjects first.", "error");\r
\r
  const marksSnap = await getDocs(collection(db, "schools", adminId, "marks"));\r
  const marksMap = {};\r
  marksSnap.forEach(d => { marksMap[d.id] = d.data(); });\r
\r
  for (const s of allStudents) {\r
    const sid = s.studentId || s.id;\r
    const marksDoc = marksMap[sid] || {};\r
    const marksTermKey = getActiveMarksTermKey();\r
    const termMarks = marksDoc.terms?.[marksTermKey] || (!activeSessionId ? (marksDoc.terms?.[activeTermKey] || marksDoc.terms?.[term.label]) : {}) || {};\r
    let total = 0, totalMax = 0;\r
\r
    // In generateAllReports, update the subjects mapping:\r
const subArr = subjects.map(sub => {\r
  const entry = getSubjectMarkEntry(termMarks, sub);\r
  // Treat null/empty as 0 for calculations only\r
  const obtained = (entry.obtained != null && !isNaN(entry.obtained)) ? Number(entry.obtained) : 0;\r
  const maxMarks = getSubjectMaxMarks(sub);\r
  total += obtained; \r
  totalMax += maxMarks;\r
  return { \r
    name: sub.name, \r
    obtained, \r
    maxMarks, \r
    remarks: getReportRemarks(obtained, maxMarks) \r
  };\r
});\r
    const pct = totalMax ? (total / totalMax) * 100 : 0;\r
    const grade = getReportGrade(pct);\r
\r
    const reportId = \`\${sid}_\${activeSessionId}_\${activeTermKey}\`;\r
    await setDoc(doc(db, "schools", adminId, "reportCards", reportId), {\r
      term: term.label, termKey: activeTermKey, termLabel: term.label,\r
      sessionId: activeSessionId || "", session: activeSessionLabel || "",\r
      student: { name: s.name, studentId: sid, class: s.class || teacherData.class, section: s.section || teacherData.section, roll: s.roll || s.rollNo || "" },\r
      subjects: subArr, totalMarks: total, totalMaxMarks: totalMax,\r
      percentage: Math.round(pct), grade, createdAt: serverTimestamp(), createdBy: teacherData.name\r
    }, { merge: true });\r
  }\r
\r
  toast(\`Report cards generated for \${term.label}.\`, "success");\r
  await showGeneratedReports();\r
};\r
\r
window.showGeneratedReports = async function() {\r
  $("reportContent").innerHTML = "<div class='empty-state'>Loading generated reports…</div>";\r
  const snap = await getDocs(collection(db, "schools", adminId, "reportCards"));\r
  let reports = snap.docs\r
    .map(d => ({ id: d.id, ...d.data() }))\r
    .filter(r => isSamePlacement(extractClassSection(r.student?.class, r.student?.section), getActivePlacement()) && belongsToActiveSession(r));\r
\r
  if (activeTermKey) {\r
    reports = reports.filter(r => r.termKey === activeTermKey || getReportTermKey(r.termLabel || r.term || "") === activeTermKey);\r
  }\r
  reports.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));\r
\r
  if (!reports.length) {\r
    $("reportContent").innerHTML = \`<div class='empty-state'>No generated reports for this class\${activeTermKey ? \` and selected term\` : ""} yet.</div>\`;\r
    return;\r
  }\r
\r
  const gradeCls = g => g==="A+"?"grade-a-plus":g==="A"?"grade-a":g==="B"?"grade-b":g==="C"?"grade-c":"grade-f";\r
  $("reportContent").innerHTML = reports.map(r => \`\r
    <div class="grade-row">\r
      <div class="grade-head">\r
        <div>\r
          <strong style="font-size:15px;">\${r.student?.name}</strong>\r
          <div style="font-size:12px;color:var(--muted);">\r
            ID: \${r.student?.studentId} | Term: \${r.termLabel || r.term || "—"} | \${r.percentage}% | \${r.createdAt ? new Date(r.createdAt.toDate()).toLocaleDateString("en-IN") : "—"}\r
          </div>\r
        </div>\r
        <div class="grade-pill \${gradeCls(r.grade)}">\${r.grade}</div>\r
      </div>\r
      <div style="display:flex;gap:8px;margin-top:8px;flex-wrap:wrap;">\r
        <button class="btn btn-primary btn-sm" onclick="printReport('\${r.id}')">Print</button>\r
        <button class="btn btn-neutral btn-sm" onclick="loadReportTab()">← Back to Marks</button>\r
      </div>\r
    </div>\`).join("");\r
};\r
\r
window.printReport = async function(rId) {\r
  const snap = await getDoc(doc(db, "schools", adminId, "reportCards", rId));\r
  if (!snap.exists()) return;\r
  const r = snap.data();\r
  const sn = window.SchoolBranding?.getSchoolName() || "Schoolix";\r
  const reportTerm = r.termLabel || r.term || "Report Card";\r
  const totalMarks = Number(r.totalMarks || 0);\r
  const totalMaxMarks = Number(r.totalMaxMarks || 0);\r
  const subHtml = (r.subjects || []).map(s => {\r
    const obtained = Number(s.obtained || 0);\r
    const maxMarks = Number(s.maxMarks || 100);\r
    const remarks = s.remarks || getReportRemarks(obtained, maxMarks);\r
    return \`<tr><td style="border:1px solid #000;padding:10px;text-align:left;">\${s.name}</td><td style="border:1px solid #000;padding:10px;text-align:center;">\${obtained}</td><td style="border:1px solid #000;padding:10px;text-align:center;">\${maxMarks}</td><td style="border:1px solid #000;padding:10px;text-align:center;">\${remarks}</td></tr>\`;\r
  }).join("");\r
  const reportHtml = \`<!DOCTYPE html><html><head>\r
<meta charset="UTF-8"><title>\${reportTerm} - \${r.student?.name}</title>\r
  <style>body{font-family:Georgia,serif;padding:30px;max-width:800px;margin:auto;}h1{text-align:center;}table{width:100%;border-collapse:collapse;margin:20px 0;}th{background:#1e2f8a;color:#fff;padding:12px;border:1px solid #000;}@media print{body{padding:0;}}</style></head><body>\r
  <h2 style="text-align:center;">\${sn}</h2>\r
  <h3 style="text-align:center;margin-top:0;">\${reportTerm}</h3>\r
  <p><strong>Student:</strong> \${r.student?.name} &nbsp; <strong>ID:</strong> \${r.student?.studentId} &nbsp; <strong>Class:</strong> \${r.student?.class}-\${r.student?.section} &nbsp; <strong>Term:</strong> \${reportTerm}</p>\r
  <table><thead><tr><th>Subject</th><th>Obtained</th><th>Max</th><th>Remarks</th></tr></thead><tbody>\${subHtml}</tbody></table>\r
  <p><strong>Total:</strong> \${totalMarks}/\${totalMaxMarks} &nbsp; <strong>Percentage:</strong> \${r.percentage}% &nbsp; <strong>Grade:</strong> \${r.grade}</p>\r
  <div style="margin-top:60px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:20px;text-align:center;">\r
    <div><div style="border-top:1px solid #000;padding-top:8px;">Class Teacher</div></div>\r
    <div><div style="border-top:1px solid #000;padding-top:8px;">Parent Signature</div></div>\r
    <div><div style="border-top:1px solid #000;padding-top:8px;">Principal</div></div>\r
  </div>\r
  <p style="margin-top:30px;font-size:12px;color:#666;text-align:center;">Generated: \${new Date().toLocaleDateString("en-IN")} | \${sn}</p></body></html>\`;\r
  if (window.SchoolixPrint?.printHtml?.(\`\${reportTerm} - \${r.student?.name || "Student"}\`, reportHtml)) return;\r
  const w = window.open("", "_blank");\r
  if (!w) return toast("Please allow popups to print report card.", "error");\r
  w.document.write(reportHtml);\r
  w.document.close();\r
  w.print();\r
};\r
\r
// ── SUBJECTS MODAL ─────────────────────────────────────────────────\r
window.openAddSubjectModal = async function() {\r
  if (activeSessionLocked) return toast("Selected session is locked. Subjects are view only.", "error");\r
  await refreshSubjectList();\r
  $("newSubjectInput").value = "";\r
  $("newSubjectMaxInput").value = "100";\r
  $("subjectModal").classList.add("open");\r
};\r
window.closeSubjectModal = () => $("subjectModal").classList.remove("open");\r
\r
async function refreshSubjectList() {\r
  const subjects = await loadSubjects();\r
  $("subjectListInModal").innerHTML = subjects.length\r
    ? \`<div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:var(--muted);margin-bottom:8px;">Current Subjects</div>\r
       \${subjects.map(s => \`<div style="display:flex;justify-content:space-between;align-items:center;padding:8px 12px;border:1px solid var(--border);border-radius:8px;margin-bottom:6px;background:var(--surface2);gap:10px;">\r
         <span style="font-weight:600;">\${s.name} <span style="font-size:12px;color:var(--muted);">(Max \${Number(s.maxMarks || 100)})</span></span>\r
         <button class="btn btn-danger btn-sm" onclick="deleteSubject('\${s.id}')">Delete</button>\r
       </div>\`).join("")}\`\r
    : \`<div style="font-size:13px;color:var(--muted);">No subjects yet.</div>\`;\r
}\r
\r
window.addSubjectGlobal = async function() {\r
  if (activeSessionLocked) return toast("Selected session is locked. Subjects are view only.", "error");\r
  const name = ($("newSubjectInput").value || "").trim();\r
  const maxMarks = Math.max(1, Number($("newSubjectMaxInput").value || 100) || 100);\r
  if (!name) return toast("Enter a subject name.", "error");\r
  const subjects = await loadSubjects();\r
  if (subjects.some(s => s.name.toLowerCase() === name.toLowerCase())) return toast("Subject already exists.", "error");\r
  await addDoc(collection(db, "schools", adminId, "subjects"), { name, maxMarks, createdAt: serverTimestamp(), createdBy: teacherData.name });\r
  $("newSubjectInput").value = ""; $("newSubjectMaxInput").value = "100";\r
  await refreshSubjectList();\r
  toast(\`\${name} added.\`);\r
};\r
\r
window.deleteSubject = async function(id) {\r
  if (activeSessionLocked) return toast("Selected session is locked. Subjects are view only.", "error");\r
  if (!confirm("Delete this subject?")) return;\r
  await deleteDoc(doc(db, "schools", adminId, "subjects", id));\r
  await refreshSubjectList();\r
  toast("Subject deleted.");\r
};\r
\r
// ── TAB SWITCHING ──────────────────────────────────────────────────\r
window.switchTab = function(name) {\r
  if (ATTENDANCE_TABS.has(name) && !requireAttendanceAccess()) name = "home";\r
  document.body.dataset.activeTab = name;\r
  document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));\r
  document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));\r
  document.querySelectorAll(".nav-item").forEach(item => item.classList.toggle("active", item.dataset.tab === name));\r
  const activeButton = document.querySelector(\`.tab-btn[data-tab="\${name}"]\`) || document.querySelector(\`.tab-btn[onclick="switchTab('\${name}')"]\`);\r
  activeButton?.classList.add("active");\r
  $(\`\${name}Tab\`)?.classList.add("active");\r
  if ($("topbarTitle")) $("topbarTitle").textContent = TEACHER_PAGE_TITLES[name] || name;\r
  if (name !== "qrCheckin") window.stopTeacherQrScanner?.();\r
  if (name === "timetable") loadTeacherTimetable().catch((error) => {\r
    console.error("Timetable tab failed:", error);\r
    showPanelError("assignedTimetableBody", "Timetable load nahi ho pa raha.");\r
  });\r
  if (name === "myAttendance") window.loadTeacherAttendanceHistory().catch((error) => {\r
    console.error("My attendance tab failed:", error);\r
    showPanelError("teacherAttendanceHistory", "Teacher attendance history load nahi ho pa rahi.");\r
  });\r
  if (name === "attendance") {\r
    try { renderAttendanceList(); }\r
    catch (error) {\r
      console.error("Attendance tab failed:", error);\r
      showPanelError("attendanceList", "Attendance tab load nahi ho pa raha.");\r
    }\r
  }\r
  if (name === "report") {\r
    loadTerms().catch((error) => {\r
      console.error("Report tab failed:", error);\r
      showPanelError("reportContent", "Report Cards tab load nahi ho pa raha.");\r
    });\r
  }\r
  if (["home", "students", "timetable", "qrCheckin", "myAttendance", "attendance", "report", "notices"].includes(name)) {\r
    history.replaceState(null, "", \`#\${name}\`);\r
  }\r
  window.closeSidebar?.();\r
};\r
\r
window.refreshTeacherDashboard = async function() {\r
  try {\r
    clearFirestoreReadCache();\r
    await refreshTeacherProfileContext(auth.currentUser);\r
    if (teacherData.removedFromPanel === true || teacherData.panelStatus === "removed" || teacherData.active === false) {\r
      await signOut(auth).catch(() => {});\r
      return window.location.replace("#/index.html");\r
    }\r
    const sessionResult = await loadSessions({ force: true });\r
    if (sessionResult.error || !sessionContextReady) {\r
      toast("Dashboard refresh pending. Please try again shortly.", "info");\r
      return;\r
    }\r
    await loadEverything();\r
    if ($("myAttendanceTab")?.classList.contains("active")) await window.loadTeacherAttendanceHistory();\r
    toast(teacherSessionLoadError || "Dashboard refreshed.", teacherSessionLoadError ? "error" : "success");\r
  } catch (error) {\r
    await handleTeacherContextError(error);\r
  }\r
};\r
\r
async function refreshTeacherContextAfterResume() {\r
  if (document.visibilityState === "hidden" || !teacherData.docId || !adminId) return;\r
  if (Date.now() - teacherResumeRefreshAt < 2500) return;\r
  if (teacherResumeRefreshPromise) return teacherResumeRefreshPromise;\r
  teacherResumeRefreshAt = Date.now();\r
  teacherResumeRefreshPromise = (async () => {\r
    clearFirestoreReadCache();\r
    await refreshTeacherProfileContext(auth.currentUser);\r
    if (teacherData.removedFromPanel === true || teacherData.panelStatus === "removed" || teacherData.active === false) {\r
      await signOut(auth).catch(() => {});\r
      return window.location.replace("#/index.html");\r
    }\r
    const sessionResult = await loadSessions({ force: true });\r
    if (sessionResult.error || !sessionContextReady) return;\r
    await loadEverything();\r
  })().catch(async (error) => {\r
    await handleTeacherContextError(error, "Teacher app resume refresh failed.");\r
  }).finally(() => {\r
    teacherResumeRefreshPromise = null;\r
  });\r
  return teacherResumeRefreshPromise;\r
}\r
\r
document.addEventListener("visibilitychange", () => {\r
  if (document.visibilityState === "visible") refreshTeacherContextAfterResume();\r
});\r
window.addEventListener("focus", refreshTeacherContextAfterResume);\r
window.addEventListener("pageshow", (event) => {\r
  if (event.persisted) refreshTeacherContextAfterResume();\r
});\r
window.addEventListener("schoolix:app-resume", refreshTeacherContextAfterResume);\r
\r
// ── LOGOUT ─────────────────────────────────────────────────────────\r
window.logout = async function() {
  try {
    localStorage.removeItem("schoolixTeacherSession");
    localStorage.removeItem("schoolixLastTeacherProfile");
  } catch {}
  await signOut(auth);
  window.location.href = "#/index.html";
};\r
\r
// ── TIMETABLE FUNCTIONS ─────────────────────────────────────────────\r
/* Legacy broken timetable implementation disabled.\r
// Prevent double-fetch when switchTab('timetable') wiring is duplicated\r
// Prevent double-fetch when switchTab('timetable') wiring is duplicated\r
let timetableLoadInFlight = null;\r
\r
async function loadTeacherTimetable() {\r
  if (timetableLoadInFlight) return timetableLoadInFlight;\r
\r
  timetableLoadInFlight = (async ()) => {\r
    try {\r
      const teacherUid = teacherData.uid || auth.currentUser?.uid;\r
      const schoolId = adminId || teacherData.adminId;\r
      if (!teacherUid || !schoolId) throw new Error("Teacher or school context is missing.");\r
    }\r
      function renderTimetableTableBlock({ timetable, classLabel, showAllSlotsLabel = false }) {\r
  const schedule = timetable || {};\r
  const defaultDays = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];\r
  let days = defaultDays.filter(day => Object.prototype.hasOwnProperty.call(schedule, day));\r
  if (!days.length) days = Object.keys(schedule);\r
      }\r
  const periods = days.length > 0\r
    ? Array.from(new Set(days.flatMap(day => Object.keys(schedule[day] || {}))))\r
    : [];\r
\r
  let html = '<div class="timetable-grid"><table class="timetable-table">';\r
  html += '<thead><tr><th>Time</th>';\r
  days.forEach(day => { html += \`<th>\${day}</th>\`; });\r
  html += '</tr></thead><tbody>';\r
\r
  periods.forEach(period => {\r
    html += \`<tr><td><strong>\${period}</strong></td>\`;\r
    days.forEach(day => {\r
      const slot = schedule?.[day]?.[period];\r
      const subject = slot?.subject || "";\r
      const hasSubject = Boolean(subject && String(subject).trim());\r
\r
      if (hasSubject) {\r
        html += \`\r
          <td>\r
            <div class="timetable-slot">\r
              <div class="subject">\${subject}</div>\r
              <div class="class-info">\${showAllSlotsLabel ? classLabel : classLabel}</div>\r
              \${slot.room ? \`<div class="room">Room: \${slot.room}</div>\` : ""}\r
            </div>\r
          </td>\`;\r
      } else {\r
        html += '<td style="color: var(--muted); font-style: italic;">—</td>';\r
      }\r
    });\r
    html += '</tr>';\r
  });\r
\r
  html += "</tbody></table></div>";\r
  return html;\r
}\r
\r
function renderTeacherTimetable({ myTimetable, classFullTimetable }) {\r
  const container = document.getElementById("teacherTimetable");\r
\r
  const my = Array.isArray(myTimetable) ? myTimetable : [];\r
  const full = classFullTimetable;\r
\r
  let html = "";\r
\r
  // My Timetable section\r
  html += \`\r
    <div class="teacher-timetable">\r
      <h4 style="margin-bottom: 16px; color: var(--text); font-weight: 700;">\r
        My Timetable (Assigned Periods)\r
      </h4>\r
  \`;\r
\r
  if (!my.length) {\r
    html += '<div class="empty-state">No periods assigned to you in the timetable yet.</div>';\r
  } else {\r
    // group by class\r
    const classGroups = {};\r
    my.forEach(a => {\r
      const key = \`\${a.class}-\${a.section}\`;\r
      if (!classGroups[key]) classGroups[key] = { class: a.class, section: a.section, timetable: a.timetable };\r
    });\r
\r
    Object.values(classGroups).forEach(g => {\r
      const classLabel = \`Class \${g.class}-\${g.section}\`;\r
      html += \`<div style="margin-bottom: 18px;">\r
        <h5 style="margin-bottom: 10px; color: var(--muted); font-weight: 700;">\${classLabel}</h5>\r
        \${renderTimetableTableBlock({ timetable: g.timetable, classLabel })}\r
      </div>\`;\r
    });\r
  }\r
\r
  html += \`</div>\`;\r
\r
  // Class full timetable section\r
  html += \`\r
    <div class="teacher-timetable" style="margin-top: 22px;">\r
      <h4 style="margin-bottom: 16px; color: var(--text); font-weight: 700;">\r
        My Class Full Timetable\r
      </h4>\r
  \`;\r
\r
  if (!full || !full.timetable || Object.keys(full.timetable || {}).length === 0) {\r
    html += '<div class="empty-state">Full timetable not found for your assigned class/section.</div>';\r
  } else {\r
    const classLabel = \`Class \${full.class}-\${full.section}\`;\r
    html += \`<div style="margin-bottom: 10px;">\r
      <h5 style="margin-bottom: 10px; color: var(--muted); font-weight: 700;">\${classLabel}</h5>\r
      \${renderTimetableTableBlock({ timetable: full.timetable, classLabel })}\r
    </div>\`;\r
  }\r
\r
  html += \`</div>\`;\r
\r
  container.innerHTML = html;\r
}\r
    \r
*/\r
\r
// ===== Timetable (Teacher) =====\r
const TIMETABLE_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];\r
let teacherTimetableLoadInFlight = null;\r
let cachedTeacherTimetable = {\r
  assignments: [],\r
  assignedSchedule: {},\r
  classFullTimetable: null,\r
  teacherPlacement: { class: "", section: "" }\r
};\r
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
function normalizeMatchValue(value) {\r
  return String(value || "").trim().toLowerCase();\r
}\r
\r
function getTimeLabel(slot) {\r
  if (!slot) return "";\r
  if (slot.startTime && slot.endTime) return \`\${formatTimetableTime12(slot.startTime)} - \${formatTimetableTime12(slot.endTime)}\`;\r
  if (slot.startTime) return \`From \${formatTimetableTime12(slot.startTime)}\`;\r
  if (slot.endTime) return \`Until \${formatTimetableTime12(slot.endTime)}\`;\r
  return "";\r
}\r
\r
function formatTimetableTime12(value) {\r
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
function getPeriodNumber(period) {\r
  const match = String(period || "").match(/\\d+/);\r
  return match ? Number(match[0]) : Number.MAX_SAFE_INTEGER;\r
}\r
\r
function sortPeriods(periods) {\r
  return [...periods].sort((a, b) => getPeriodNumber(a) - getPeriodNumber(b) || String(a).localeCompare(String(b)));\r
}\r
\r
function formatClassSectionText(classValue, sectionValue) {\r
  const placement = extractClassSection(classValue, sectionValue);\r
  if (!placement.class && !placement.section) return "Class not assigned";\r
  return placement.section ? \`Class \${placement.class}-\${placement.section}\` : \`Class \${placement.class}\`;\r
}\r
\r
function getTimetablePlacement(timetable) {\r
  let classValue = timetable.class || "";\r
  let sectionValue = timetable.section || "";\r
  if ((!classValue || !sectionValue) && timetable.id) {\r
    const idParts = String(timetable.id).split("-");\r
    classValue = classValue || idParts[0] || "";\r
    sectionValue = sectionValue || idParts.slice(1).join("-") || "";\r
  }\r
  return extractClassSection(classValue, sectionValue);\r
}\r
\r
function timetableIdentityKey(timetable = {}) {\r
  const placement = getTimetablePlacement(timetable);\r
  if (placement.class || placement.section) return \`\${normalizeMatchValue(placement.class)}|\${normalizeMatchValue(placement.section)}\`;\r
  return normalizeMatchValue(timetable.id);\r
}\r
\r
function dedupeTimetables(list = []) {\r
  const byClassSection = new Map();\r
  list.forEach((timetable) => {\r
    const key = timetableIdentityKey(timetable);\r
    if (!key) return;\r
    const current = byClassSection.get(key);\r
    if (!current || String(timetable.updatedAt || "").localeCompare(String(current.updatedAt || "")) >= 0) {\r
      byClassSection.set(key, timetable);\r
    }\r
  });\r
  return [...byClassSection.values()];\r
}\r
\r
function slotBelongsToTeacher(slot, teacherUid) {\r
  if (!slot || typeof slot !== "object") return false;\r
  const idCandidates = new Set([\r
    teacherUid,\r
    teacherData.uid,\r
    teacherData.teacherId,\r
    teacherData.email\r
  ].map(normalizeMatchValue).filter(Boolean));\r
  const slotIds = [\r
    slot.teacherId,\r
    slot.teacherUid,\r
    slot.teacher,\r
    slot.teacherEmail\r
  ].map(normalizeMatchValue).filter(Boolean);\r
  if (slotIds.some((id) => idCandidates.has(id))) return true;\r
\r
  const teacherName = normalizeMatchValue(teacherData.name);\r
  const slotTeacherName = normalizeMatchValue(slot.teacherName || slot.teacherLabel || slot.name);\r
  return Boolean(teacherName && slotTeacherName && teacherName === slotTeacherName);\r
}\r
\r
function timetableHasAnySlot(schedule) {\r
  return Object.values(schedule || {}).some((daySlots) =>\r
    Object.values(daySlots || {}).some((slot) =>\r
      slot?.subject || slot?.teacherName || slot?.teacherId || slot?.startTime || slot?.endTime || slot?.room\r
    )\r
  );\r
}\r
\r
function buildAssignedSchedule(assignments) {\r
  const schedule = {};\r
  assignments.forEach((assignment) => {\r
    if (!schedule[assignment.day]) schedule[assignment.day] = {};\r
    if (!schedule[assignment.day][assignment.period]) schedule[assignment.day][assignment.period] = [];\r
    schedule[assignment.day][assignment.period].push(assignment);\r
  });\r
  return schedule;\r
}\r
\r
function getScheduleDays(schedule) {\r
  const knownDays = TIMETABLE_DAYS.filter((day) => Object.prototype.hasOwnProperty.call(schedule || {}, day));\r
  return knownDays.length ? knownDays : Object.keys(schedule || {});\r
}\r
\r
function getSchedulePeriods(schedule, days) {\r
  return sortPeriods(Array.from(new Set(days.flatMap((day) => Object.keys(schedule?.[day] || {})))));\r
}\r
\r
function renderSlot(slot, options = {}) {\r
  const subject = slot.subject || "Lecture";\r
  const classLabel = slot.classLabel || formatClassSectionText(slot.class, slot.section);\r
  const teacherName = slot.teacherName || "";\r
  return \`\r
    <div class="timetable-slot">\r
      <div class="subject">\${escapeHtml(subject)}</div>\r
      \${options.showClass ? \`<div class="class-info">\${escapeHtml(classLabel)}</div>\` : ""}\r
      \${options.showTeacher && teacherName ? \`<div class="teacher">Teacher: \${escapeHtml(teacherName)}</div>\` : ""}\r
      \${slot.room ? \`<div class="room">Room: \${escapeHtml(slot.room)}</div>\` : ""}\r
    </div>\`;\r
}\r
\r
function renderTimetableTableBlock(schedule, options = {}) {\r
  const days = getScheduleDays(schedule);\r
  const periods = getSchedulePeriods(schedule, days);\r
  if (!days.length || !periods.length) return \`<div class="empty-state">No timetable slots found.</div>\`;\r
\r
  let html = '<div class="timetable-table-wrap"><table class="timetable-table">';\r
  html += '<thead><tr><th>Day</th>';\r
  periods.forEach((period) => {\r
    const slotsForPeriod = days.flatMap((day) => {\r
      const value = schedule?.[day]?.[period];\r
      return Array.isArray(value) ? value : value ? [value] : [];\r
    });\r
    const periodTime = slotsForPeriod.map(getTimeLabel).find(Boolean) || "";\r
    html += \`<th><strong>\${escapeHtml(period)}</strong>\${periodTime ? \`<div class="class-info">\${escapeHtml(periodTime)}</div>\` : ""}</th>\`;\r
  });\r
  html += '</tr></thead><tbody>';\r
\r
  days.forEach((day) => {\r
    html += \`<tr><td><strong>\${escapeHtml(day)}</strong></td>\`;\r
    periods.forEach((period) => {\r
      const value = schedule?.[day]?.[period];\r
      const slots = (Array.isArray(value) ? value : value ? [value] : []).filter((slot) =>\r
        slot?.subject || slot?.teacherName || slot?.teacherId || slot?.startTime || slot?.endTime || slot?.room || slot?.classLabel\r
      );\r
      if (!slots.length) {\r
        html += '<td style="color: var(--muted); font-style: italic;">-</td>';\r
        return;\r
      }\r
      html += \`<td>\${slots.map((slot) => renderSlot(slot, options)).join('<div style="height:10px"></div>')}</td>\`;\r
    });\r
\r
    html += '</tr>';\r
  });\r
\r
  html += '</tbody></table></div>';\r
  return html;\r
}\r
\r
function renderClassTeacherInfo(state) {\r
  const info = $("classTeacherInfo");\r
  if (!info) return;\r
  const { assignments, classFullTimetable, teacherPlacement } = state;\r
  const classLabel = formatClassSectionText(teacherPlacement.class, teacherPlacement.section);\r
  const uniqueClasses = new Set(assignments.map((assignment) => \`\${assignment.class}-\${assignment.section}\`));\r
  const hasClass = Boolean(teacherPlacement.class && teacherPlacement.section);\r
\r
  info.innerHTML = \`\r
    <div class="class-teacher-card">\r
      <div>\r
        <div class="role">Assigned Class</div>\r
        <strong>\${escapeHtml(classLabel)}</strong>\r
        <div class="meta">\${hasClass ? "Full class timetable is available below when published by admin." : "Admin has not assigned a class-section yet."}</div>\r
      </div>\r
      \${iconSvg("school")}\r
    </div>\r
    <div class="class-teacher-card">\r
      <div>\r
        <div class="role">Allotted Lectures</div>\r
        <strong>\${assignments.length}</strong>\r
        <div class="meta">\${uniqueClasses.size} class-section\${uniqueClasses.size === 1 ? "" : "s"} in timetable allotment.</div>\r
      </div>\r
      \${iconSvg("calendar-days")}\r
    </div>\r
    <div class="class-teacher-card">\r
      <div>\r
        <div class="role">Class Timetable</div>\r
        <strong>\${classFullTimetable ? "Published" : "Not found"}</strong>\r
        <div class="meta">\${classFullTimetable ? "Ready to view and print." : "Ask admin to publish timetable for this class-section."}</div>\r
      </div>\r
      \${iconSvg(classFullTimetable ? "check-circle" : "x-circle")}\r
    </div>\`;\r
}\r
\r
function renderTeacherTimetable(state) {\r
  const container = $("teacherTimetable");\r
  const { assignments, assignedSchedule, classFullTimetable, teacherPlacement } = state;\r
  const assignedClassCount = new Set(assignments.map((assignment) => \`\${assignment.class}-\${assignment.section}\`)).size;\r
  const assignedSub = assignments.length\r
    ? \`\${assignments.length} allotted lecture\${assignments.length === 1 ? "" : "s"} across \${assignedClassCount} class-section\${assignedClassCount === 1 ? "" : "s"}.\`\r
    : "No timetable period has been allotted to this teacher yet.";\r
  const classLabel = formatClassSectionText(teacherPlacement.class, teacherPlacement.section);\r
\r
  renderClassTeacherInfo(state);\r
\r
  container.innerHTML = \`\r
    <div class="teacher-timetable">\r
      <div class="timetable-section-head">\r
        <div>\r
          <h4><span class="section-heading">\${iconSvg("calendar-days")}Assigned Lectures</span></h4>\r
          <p>\${escapeHtml(assignedSub)}</p>\r
        </div>\r
        <button class="btn btn-primary btn-sm" onclick="printAssignedTimetable()">\${iconSvg("printer")}Print Assigned</button>\r
      </div>\r
      \${assignments.length\r
        ? \`<div class="timetable-meta-row">\r
            <span class="badge badge-noclass">\${assignments.length} lectures</span>\r
            <span class="badge badge-noclass">\${assignedClassCount} classes</span>\r
          </div>\${renderTimetableTableBlock(assignedSchedule, { showClass: true, showTeacher: false })}\`\r
        : '<div class="empty-state">No periods assigned to you in the admin timetable yet.</div>'}\r
    </div>\r
\r
    <div class="teacher-timetable">\r
      <div class="timetable-section-head">\r
        <div>\r
          <h4><span class="section-heading">\${iconSvg("book-open")}My Class Full Timetable</span></h4>\r
          <p></p>\r
        </div>\r
        <button class="btn btn-success btn-sm" onclick="printClassTimetable()">\${iconSvg("printer")}Print Class</button>\r
      </div>\r
      \${classFullTimetable\r
        ? renderTimetableTableBlock(classFullTimetable.schedule || {}, { showClass: false, showTeacher: true })\r
        : \`<div class="empty-state">Full timetable not found for \${escapeHtml(classLabel)}. </div>\`}\r
    </div>\`;\r
}\r
\r
async function loadTeacherTimetable(force = false) {\r
  if (teacherTimetableLoadInFlight && !force) return teacherTimetableLoadInFlight;\r
\r
  const container = $("teacherTimetable");\r
  if (container) container.innerHTML = \`<div class="empty-state">Loading timetable...</div>\`;\r
\r
  teacherTimetableLoadInFlight = (async () => {\r
    try {\r
      const teacherUid = teacherData.uid || auth.currentUser?.uid;\r
      const schoolId = adminId || teacherData.adminId;\r
      if (!teacherUid || !schoolId) throw new Error("Teacher or school context is missing.");\r
\r
      const timetablesSnap = await getDocs(collection(db, "schools", schoolId, "timetables"));\r
      const allTimetables = dedupeTimetables(timetablesSnap.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() })));\r
      const teacherPlacement = getActivePlacement();\r
      const assignments = [];\r
      const seenAssignments = new Set();\r
      let classFullTimetable = null;\r
\r
      allTimetables.forEach((timetable) => {\r
        const placement = getTimetablePlacement(timetable);\r
        const periodTimes = timetable.periodTimes || {};\r
        const schedule = timetable.schedule || {};\r
        Object.entries(schedule).forEach(([day, daySlots]) => {\r
          Object.entries(daySlots || {}).forEach(([period, slot]) => {\r
            const commonTime = periodTimes[period] || {};\r
            if (commonTime.startTime) slot.startTime = commonTime.startTime;\r
            if (commonTime.endTime) slot.endTime = commonTime.endTime;\r
          });\r
        });\r
        if (\r
          !classFullTimetable &&\r
          teacherPlacement.class &&\r
          teacherPlacement.section &&\r
          isSamePlacement(placement, teacherPlacement)\r
        ) {\r
          classFullTimetable = { ...timetable, ...placement, schedule };\r
        }\r
\r
        Object.entries(schedule).forEach(([day, daySlots]) => {\r
          Object.entries(daySlots || {}).forEach(([period, slot]) => {\r
            if (!slotBelongsToTeacher(slot, teacherUid)) return;\r
            const assignmentKey = \`\${timetableIdentityKey(timetable)}|\${day}|\${period}|\${teacherUid}\`;\r
            if (seenAssignments.has(assignmentKey)) return;\r
            seenAssignments.add(assignmentKey);\r
            assignments.push({\r
              ...slot,\r
              day,\r
              period,\r
              class: placement.class,\r
              section: placement.section,\r
              classLabel: formatClassSectionText(placement.class, placement.section),\r
              timetableId: timetable.id\r
            });\r
          });\r
        });\r
      });\r
\r
      cachedTeacherTimetable = {\r
        assignments,\r
        assignedSchedule: buildAssignedSchedule(assignments),\r
        classFullTimetable,\r
        teacherPlacement\r
      };\r
      renderTeacherTimetable(cachedTeacherTimetable);\r
    } catch (error) {\r
      console.error("Teacher timetable failed:", error);\r
      $("classTeacherInfo").innerHTML = "";\r
      $("teacherTimetable").innerHTML = \`<div class="empty-state">Unable to load timetable right now. Please refresh once admin has saved the timetable.</div>\`;\r
    } finally {\r
      teacherTimetableLoadInFlight = null;\r
    }\r
  })();\r
\r
  return teacherTimetableLoadInFlight;\r
}\r
\r
window.loadTeacherTimetable = loadTeacherTimetable;\r
\r
function buildPrintablePage(title, subtitle, tableHtml) {\r
  const schoolName = window.SchoolBranding?.getSchoolName() || teacherData.schoolName || "Schoolix";\r
  return \`\r
    <html><head>\r
<title>\${escapeHtml(title)}</title>\r
    <style>\r
      body{font-family:Arial,sans-serif;color:#111827;margin:28px;}\r
      h1{font-size:22px;margin:0 0 4px;text-align:center;}\r
      .sub{text-align:center;color:#4b5563;margin-bottom:18px;font-size:13px;}\r
      table{width:100%;border-collapse:collapse;font-size:12px;}\r
      th{background:#1e2f8a;color:#fff;padding:9px;border:1px solid #111827;text-align:center;vertical-align:top;}\r
      td{padding:9px;border:1px solid #9ca3af;vertical-align:top;text-align:center;}\r
      .subject{font-weight:700;color:#1e2f8a;margin-bottom:3px;}\r
      .class-info,.teacher,.room{font-size:11px;color:#374151;margin-top:2px;}\r
      .teacher{font-weight:700;}\r
      .timetable-slot{min-height:48px;display:flex;flex-direction:column;align-items:center;justify-content:center;}\r
      .timetable-slot + .timetable-slot{border-top:1px solid #e5e7eb;margin-top:8px;padding-top:8px;}\r
      .footer{margin-top:22px;text-align:center;font-size:11px;color:#6b7280;}\r
      @media print{body{margin:10mm;}button{display:none;}}\r
    </style></head><body>\r
      <h1>\${escapeHtml(schoolName)}</h1>\r
      <div class="sub"><strong>\${escapeHtml(title)}</strong><br>\${escapeHtml(subtitle)}</div>\r
      \${tableHtml}\r
      <div class="footer">Generated on \${new Date().toLocaleDateString("en-IN")} by \${escapeHtml(teacherData.name || "Teacher")}</div></body></html>\`;\r
}\r
\r
async function ensureTimetableLoaded() {\r
  if (!cachedTeacherTimetable.classFullTimetable && !cachedTeacherTimetable.assignments.length) {\r
    await loadTeacherTimetable(true);\r
  }\r
  return cachedTeacherTimetable;\r
}\r
\r
window.printAssignedTimetable = async function() {\r
  const state = await ensureTimetableLoaded();\r
  if (!state.assignments.length) return toast("No assigned lectures to print.", "error");\r
  const tableHtml = renderTimetableTableBlock(state.assignedSchedule, { showClass: true, showTeacher: false });\r
  const html = buildPrintablePage("Assigned Lectures", teacherData.name || "Teacher", tableHtml);\r
  if (window.SchoolixPrint?.printHtml?.("Assigned Lectures", html)) return;\r
  const w = window.open("", "_blank");\r
  if (!w) return toast("Please allow popups to print timetable.", "error");\r
  w.document.write(html);\r
  w.document.close();\r
  w.focus();\r
  w.print();\r
};\r
\r
window.printClassTimetable = async function() {\r
  const state = await ensureTimetableLoaded();\r
  if (!state.classFullTimetable) return toast("Assigned class timetable not found.", "error");\r
  const classLabel = formatClassSectionText(state.teacherPlacement.class, state.teacherPlacement.section);\r
  const tableHtml = renderTimetableTableBlock(state.classFullTimetable.schedule || {}, { showClass: false, showTeacher: true });\r
  const html = buildPrintablePage(\`\${classLabel} Full Timetable\`, teacherData.name || "Class Teacher", tableHtml);\r
  if (window.SchoolixPrint?.printHtml?.(\`\${classLabel} Full Timetable\`, html)) return;\r
  const w = window.open("", "_blank");\r
  if (!w) return toast("Please allow popups to print timetable.", "error");\r
  w.document.write(html);\r
  w.document.close();\r
  w.focus();\r
  w.print();\r
};\r
\r
// Update switchTab to load timetable when timetable tab is selected\r
// (removed extra timetable switchTab wrapper)\r
\r
// Close modals on overlay click\r
["studentModal","subjectModal"].forEach(id => {\r
  $(id)?.addEventListener("click", e => { if (e.target === $(id)) $(id).classList.remove("open"); });\r
});\r
    \r
`},{attributes:{src:"/schoolix-app.js?v=navbar-20260721"},text:""},{attributes:{type:"module",src:"notice-panel.js?v=notices-20260720"},text:""},{attributes:{type:"module",src:"access-control.js"},text:""},{attributes:{src:"schoolix-polish.js"},text:""}]};export{e as default};
