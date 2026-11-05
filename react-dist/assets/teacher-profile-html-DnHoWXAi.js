const n={file:"teacher-profile.html",title:"Staff Profile | Schoolix",htmlClass:"",bodyClass:"sx-admin-app sx-dark-portal",body:`\r
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
<main class="profile-shell" id="profileShell">\r
  <section class="profile-hero card">\r
    <div class="hero-bg"></div>\r
    <div class="hero-main">\r
      <button type="button" class="back-link" id="profileBackButton" onclick="goBackToRolePage()">Back</button>\r
      <div class="hero-identity">\r
        <button type="button" class="teacher-photo-xl" id="heroPhoto" onclick="previewTeacherPhoto()">T</button>\r
        <div class="hero-copy">\r
          <span class="eyebrow" id="profileRoleLabel">Faculty Profile</span>\r
          <h1 id="teacherName">Loading profile...</h1>\r
          <div class="hero-subline">\r
            <span id="teacherIdChip">Staff ID</span>\r
            <span id="teacherEmailChip">Email</span>\r
            <span id="teacherPhoneChip">Phone</span>\r
            <span class="status-badge status-active" id="teacherStatusBadge">Active</span>\r
          </div>\r
          <div class="hero-tags" id="heroTags"></div>\r
        </div>\r
      </div>\r
    </div>\r
    <div class="hero-actions">\r
      <button type="button" class="btn btn-primary" onclick="openEditProfile()">Edit Profile</button>\r
      <button type="button" class="btn btn-light" id="generateQrAction" onclick="generateTeacherQr()">Generate QR</button>\r
      <button type="button" class="btn btn-light" onclick="jumpToSection('attendanceSection')">Attendance</button>\r
      <button type="button" class="btn btn-light" onclick="jumpToSection('salarySection')">Salary</button>\r
      <button type="button" class="btn btn-light" onclick="printTeacherProfile()">Print Profile</button>\r
    </div>\r
  </section>\r
\r
  <div id="globalStatus"></div>\r
\r
  <section class="skeleton-grid" id="skeletonState" hidden aria-hidden="true">\r
    <div class="skeleton-card"></div>\r
    <div class="skeleton-card wide"></div>\r
    <div class="skeleton-card wide"></div>\r
  </section>\r
\r
  <section class="profile-layout" id="profileContent" hidden>\r
    <aside class="sidebar-card card">\r
      <button type="button" class="teacher-photo-lg" id="sidebarPhoto" onclick="previewTeacherPhoto()">T</button>\r
      <h2 id="sidebarName">Loading profile...</h2>\r
      <p id="sidebarDesignation">Designation</p>\r
      <div class="sidebar-summary" id="sidebarSummary"></div>\r
    </aside>\r
\r
    <div class="content-stack">\r
      <section class="metric-grid" id="metricGrid"></section>\r
\r
      <section class="card detail-card">\r
        <div class="card-head"><div><span class="kicker">Personal</span><h2>Personal Details</h2></div></div>\r
        <div class="detail-grid" id="personalDetails"></div>\r
      </section>\r
\r
      <section class="card detail-card">\r
        <div class="card-head"><div><span class="kicker">Professional</span><h2>Professional Details</h2></div></div>\r
        <div class="detail-grid" id="professionalDetails"></div>\r
      </section>\r
\r
      <section class="card detail-card">\r
        <div class="card-head">\r
          <div><span class="kicker">Identity</span><h2>Identity Documents</h2></div>\r
        </div>\r
        <div class="document-grid" id="identityDocuments"></div>\r
      </section>\r
\r
      <section class="card detail-card">\r
        <div class="card-head"><div><span class="kicker">Payroll</span><h2>Bank Details</h2></div></div>\r
        <div class="detail-grid" id="bankDetails"></div>\r
      </section>\r
\r
      <section class="card detail-card">\r
        <div class="card-head"><div><span class="kicker">Safety</span><h2>Emergency Contact</h2></div></div>\r
        <div class="detail-grid" id="emergencyDetails"></div>\r
      </section>\r
\r
      <section class="card detail-card">\r
        <div class="card-head">\r
          <div><span class="kicker">Files</span><h2>Documents</h2></div>\r
        </div>\r
        <div class="document-grid" id="profileDocuments"></div>\r
      </section>\r
\r
      <section class="card detail-card" id="salarySection">\r
        <div class="card-head"><div><span class="kicker">Salary</span><h2>Salary History</h2></div></div>\r
        <div class="table-wrap"><table class="data-table"><thead><tr><th>Month</th><th>Basic</th><th>Allowances</th><th>Deductions</th><th>Net</th><th>Paid</th><th>Remaining</th><th>Status</th><th>Payment Date</th><th>Receipt</th></tr></thead><tbody id="salaryRows"></tbody></table></div>\r
      </section>\r
\r
      <section class="card detail-card" id="attendanceSection">\r
        <div class="card-head">\r
          <div><span class="kicker">Attendance</span><h2>Monthly Attendance Calendar</h2></div>\r
          <div class="attendance-month-actions">
            <input type="month" id="attendanceMonth">
            <button type="button" class="btn btn-primary" id="attendanceMonthShow">Show</button>
          </div>
        </div>\r
        <div class="calendar-wrap" id="attendanceCalendar"></div>\r
        <div class="metric-grid compact" id="attendanceMetrics"></div>\r
      </section>\r
\r
      <section class="card detail-card">\r
        <div class="card-head"><div><span class="kicker">Leaves</span><h2>Leave History</h2></div></div>\r
        <div class="timeline" id="leaveTimeline"></div>\r
      </section>\r
\r
      <section class="card detail-card">\r
        <div class="card-head"><div><span class="kicker">Activity</span><h2>Activity Timeline</h2></div></div>\r
        <div class="timeline" id="activityTimeline"></div>\r
      </section>\r
    </div>\r
  </section>\r
</main>\r
\r
<div class="modal" id="editModal" hidden>\r
  <div class="modal-panel">\r
    <div class="modal-head">\r
      <div><span class="kicker">Edit</span><h2 id="editProfileTitle">Edit Staff Profile</h2></div>\r
      <button type="button" class="icon-btn" onclick="closeEditProfile()" aria-label="Close edit profile">x</button>\r
    </div>\r
    <form id="editProfileForm" class="edit-form">\r
      <div class="form-tabs" id="editTabs"></div>\r
      <div id="editFields"></div>\r
      <div class="modal-actions">\r
        <button type="button" class="btn btn-light" onclick="closeEditProfile()">Cancel</button>\r
        <button type="submit" class="btn btn-primary" id="saveProfileBtn">Save Profile</button>\r
      </div>\r
    </form>\r
  </div>\r
</div>\r
\r
<div class="modal" id="detailModal" hidden>\r
  <div class="modal-panel small">\r
    <div class="modal-head">\r
      <div><span class="kicker" id="detailKicker">Details</span><h2 id="detailTitle">Details</h2></div>\r
      <button type="button" class="icon-btn" onclick="closeDetailModal()" aria-label="Close details">x</button>\r
    </div>\r
    <div id="detailBody"></div>\r
  </div>\r
</div>\r
\r
<script src="school-branding.js"><\/script>\r
<script type="module" src="teacher-profile.js"><\/script>\r
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
`},{tag:"link",attributes:{href:"https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap",rel:"stylesheet"},text:""},{tag:"link",attributes:{rel:"stylesheet",href:"teacher-profile.css"},text:""},{tag:"link",attributes:{rel:"stylesheet",href:"schoolix-polish.css"},text:""},{tag:"link",attributes:{rel:"stylesheet",href:"admin-shell.css?v=navbar-20260721"},text:""},{tag:"link",attributes:{rel:"stylesheet",href:"schoolix-portal-dark.css"},text:""}],scripts:[{attributes:{id:"sxCriticalLoaderScript"},text:`\r
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
`},{attributes:{src:"school-branding.js"},text:""},{attributes:{type:"module",src:"teacher-profile.js"},text:""},{attributes:{type:"module",src:"access-control.js"},text:""},{attributes:{src:"schoolix-polish.js"},text:""},{attributes:{src:"admin-shell.js?v=navbar-20260721"},text:""}]};export{n as default};
