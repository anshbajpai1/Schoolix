const e={file:"student-dashboard.html",title:"Student Dashboard | Schoolix",htmlClass:"",bodyClass:"sx-dark-portal",body:`\r
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
<!-- --- SIDEBAR --- -->\r
<aside class="sidebar" id="sidebar">\r
  <div class="sidebar-logo">\r
    <div class="logo-mark">\r
      <img src="schoolix-app-icon.svg" alt="Schoolix logo">\r
    </div>\r
    <div>\r
      <div class="logo-text">Schoolix</div>\r
      <div class="logo-sub" id="sidebarSchoolName">Loading...</div>\r
    </div>\r
  </div>\r
\r
  <nav class="sidebar-nav">\r
    <div class="nav-section">Main</div>\r
    <div class="nav-item active" data-page="overview" onclick="navigate('overview')">\r
      <div class="nav-icon">\r
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\r
          <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>\r
          <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>\r
        </svg>\r
      </div>\r
      Overview\r
    </div>\r
    <div class="nav-item" data-page="profile" onclick="navigate('profile')">\r
      <div class="nav-icon">\r
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\r
          <circle cx="12" cy="8" r="4"/>\r
          <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>\r
        </svg>\r
      </div>\r
      My Profile\r
    </div>\r
    <div class="nav-item" data-page="notices" onclick="navigate('notices')">\r
      <div class="nav-icon">\r
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\r
          <path d="M3 11v2a2 2 0 0 0 2 2h2l4 4v-4h4l6 3V6l-6 3H5a2 2 0 0 0-2 2z"/>\r
          <path d="M21 9v6"/>\r
        </svg>\r
      </div>\r
      Notices\r
    </div>\r
\r
    <div class="nav-section" style="margin-top:8px">Academics</div>\r
    <div class="nav-item" data-page="attendance" onclick="navigate('attendance')">\r
      <div class="nav-icon">\r
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\r
          <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>\r
          <path d="M9 16l2 2 4-4"/>\r
        </svg>\r
      </div>\r
      Attendance\r
    </div>\r
    <div class="nav-item" data-page="fees" onclick="navigate('fees')">\r
      <div class="nav-icon">\r
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\r
          <rect x="1" y="6" width="22" height="13" rx="2"/>\r
          <path d="M1 10h22M8 16h.01M12 16h.01"/>\r
        </svg>\r
      </div>\r
      Fee History\r
    </div>\r
    <div class="nav-item" data-page="results" onclick="navigate('results')">\r
      <div class="nav-icon">\r
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\r
          <path d="M9 11l3 3L22 4"/>\r
          <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>\r
        </svg>\r
      </div>\r
      Report Cards\r
    </div>\r
    <div class="nav-item" data-page="transport" onclick="navigate('transport')">\r
      <div class="nav-icon">\r
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\r
          <path d="M6 3h12a1 1 0 0 1 1 1v3h2a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-1v3H5v-3H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h2V4a1 1 0 0 1 1-1z"/>\r
          <circle cx="9" cy="17" r="2"/><circle cx="15" cy="17" r="2"/>\r
        </svg>\r
      </div>\r
      My Transport\r
    </div>\r
\r
    <div class="nav-item" data-page="library" onclick="navigate('library')">\r
      <div class="nav-icon">\r
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\r
          <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/>\r
          <path d="M4 4.5A2.5 2.5 0 016.5 2H20v20H6.5A2.5 2.5 0 014 19.5z"/>\r
        </svg>\r
      </div>\r
      My Library\r
    </div>\r
\r
    <div class="nav-item" data-page="timetable" onclick="navigate('timetable')">\r
      <div class="nav-icon">\r
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\r
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>\r
          <line x1="16" y1="2" x2="16" y2="6"/>\r
          <line x1="8" y1="2" x2="8" y2="6"/>\r
          <line x1="3" y1="10" x2="21" y2="10"/>\r
        </svg>\r
      </div>\r
      Timetable\r
    </div>\r
  </nav>\r
\r
  <div class="sidebar-footer">\r
    <button class="logout-btn" id="logoutBtn">\r
      <div class="nav-icon">\r
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\r
          <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>\r
          <polyline points="16 17 21 12 16 7"/>\r
          <line x1="21" y1="12" x2="9" y2="12"/>\r
        </svg>\r
      </div>\r
      Sign Out\r
    </button>\r
  </div>\r
</aside>\r
\r
<!-- --- MAIN --- -->\r
<div class="main-area">\r
  <header class="topbar">\r
    <div class="topbar-left">\r
      <button class="mobile-toggle" onclick="openSidebar()">\r
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">\r
          <line x1="3" y1="6" x2="21" y2="6"/>\r
          <line x1="3" y1="12" x2="21" y2="12"/>\r
          <line x1="3" y1="18" x2="21" y2="18"/>\r
        </svg>\r
      </button>\r
      <div class="page-label" id="topbarTitle">Overview</div>\r
    </div>\r
\r
    <div class="topbar-right">\r
      <div class="session-selector-wrap">\r
        <label>Session</label>\r
        <select id="headerSessionSelector" onchange="onHeaderSessionChange()">\r
          <option value="">Loading...</option>\r
        </select>\r
      </div>\r
\r
      <button class="refresh-btn" onclick="refreshDashboard()">\r
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">\r
          <path d="M23 4v6h-6"/><path d="M1 20v-6h6"/>\r
          <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/>\r
        </svg>\r
        <span>Refresh</span>\r
      </button>\r
\r
      <!-- CLICKABLE STUDENT CHIP -->\r
      <div class="student-chip" id="studentChip" onclick="toggleProfileDropdown()">\r
        <div class="avatar" id="topbarAvatar">S</div>\r
        <span id="topbarName">Student</span>\r
        <svg class="chip-caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">\r
          <polyline points="6 9 12 15 18 9"/>\r
        </svg>\r
\r
        <!-- Profile Dropdown -->\r
        <div class="profile-dropdown" id="profileDropdown">\r
          <div class="pd-header">\r
            <div class="pd-avatar" id="pdAvatar">S</div>\r
            <div class="pd-header-info">\r
              <div class="pd-name" id="pdName">Student</div>\r
              <div class="pd-class" id="pdClass">Class -</div>\r
              <div class="pd-school-badge" id="pdSchoolBadge">\r
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" style="width:10px;height:10px;flex-shrink:0">\r
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>\r
                  <path d="M6 12v5c3 3 9 3 12 0v-5"/>\r
                </svg>\r
                <span id="pdSchoolName">Loading...</span>\r
              </div>\r
            </div>\r
          </div>\r
\r
          <div class="pd-body">\r
            <div class="pd-row" onclick="navigate('profile'); closeProfileDropdown();">\r
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">\r
                <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>\r
              </svg>\r
              View Full Profile\r
            </div>\r
\r
            <div class="pd-row blue-row" onclick="openResetPasswordModal(); event.stopPropagation();">\r
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">\r
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>\r
                <path d="M7 11V7a5 5 0 0110 0v4"/>\r
              </svg>\r
              Reset Password\r
            </div>\r
\r
            <div class="pd-divider"></div>\r
\r
            <div class="pd-row rose-row" id="pdLogoutBtn">\r
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">\r
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>\r
                <polyline points="16 17 21 12 16 7"/>\r
                <line x1="21" y1="12" x2="9" y2="12"/>\r
              </svg>\r
              Sign Out\r
            </div>\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
  </header>\r
\r
  <div class="page-content">\r
    <div id="globalStatus"></div>\r
\r
    <!-- --- OVERVIEW --- -->\r
    <div class="page active" id="page-overview">\r
      <div class="welcome-bar">\r
        <div class="welcome-bar-bg"></div>\r
        <div class="welcome-bar-grid"></div>\r
        <div class="welcome-icon">\r
          <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">\r
            <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>\r
            <path d="M6 12v5c3 3 9 3 12 0v-5"/>\r
          </svg>\r
        </div>\r
        <div class="welcome-bar-content">\r
          <h2 id="welcomeTitle">Welcome back</h2>\r
          <p id="welcomeSub">Loading your dashboard...</p>\r
          <div class="welcome-bar-badges" id="welcomeBadges"></div>\r
        </div>\r
      </div>\r
\r
      <div class="grid-4">\r
        <div class="stat-card blue clickable" data-overview-page="attendance" role="button" tabindex="0" aria-label="Open attendance page">\r
          <div class="stat-card-top">\r
            <div class="stat-card-label">Attendance</div>\r
            <div class="stat-icon">\r
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\r
                <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/><path d="M9 16l2 2 4-4"/>\r
              </svg>\r
            </div>\r
          </div>\r
          <div class="stat-card-value" id="ovAttendance">-</div>\r
          <div class="stat-card-sub" id="ovAttendanceSub">No data yet</div>\r
        </div>\r
        <div class="stat-card rose clickable" data-overview-page="fees" role="button" tabindex="0" aria-label="Open fee details page">\r
          <div class="stat-card-top">\r
            <div class="stat-card-label">Fees Due</div>\r
            <div class="stat-icon">\r
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\r
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>\r
              </svg>\r
            </div>\r
          </div>\r
          <div class="stat-card-value" id="ovFeesDue">-</div>\r
          <div class="stat-card-sub" id="ovFeesSub">No records yet</div>\r
        </div>\r
        <div class="stat-card green clickable" data-overview-page="results" role="button" tabindex="0" aria-label="Open report cards page">\r
          <div class="stat-card-top">\r
            <div class="stat-card-label">Latest Result</div>\r
            <div class="stat-icon">\r
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\r
                <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>\r
              </svg>\r
            </div>\r
          </div>\r
          <div class="stat-card-value" id="ovResult">-</div>\r
          <div class="stat-card-sub" id="ovResultSub">No report card</div>\r
        </div>\r
        <div class="stat-card teal clickable" data-overview-page="profile" role="button" tabindex="0" aria-label="Open student profile page">\r
          <div class="stat-card-top">\r
            <div class="stat-card-label">Total Records</div>\r
            <div class="stat-icon">\r
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\r
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>\r
              </svg>\r
            </div>\r
          </div>\r
          <div class="stat-card-value" id="ovRecords">-</div>\r
          <div class="stat-card-sub">Across all modules</div>\r
        </div>\r
      </div>\r
\r
      <div class="card">\r
        <div class="card-title">\r
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\r
            <path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z"/><polyline points="13 2 13 9 20 9"/>\r
          </svg>\r
          Quick Actions\r
        </div>\r
        <div class="quick-links">\r
          <button class="quick-link" onclick="navigate('profile')">\r
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>\r
            My Profile\r
          </button>\r
          <button class="quick-link" onclick="navigate('attendance')">\r
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/><path d="M9 16l2 2 4-4"/></svg>\r
            Attendance\r
          </button>\r
          <button class="quick-link" onclick="navigate('fees')">\r
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="6" width="22" height="13" rx="2"/><path d="M1 10h22"/></svg>\r
            Fee History\r
          </button>\r
          <button class="quick-link" onclick="navigate('results')">\r
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>\r
            Report Cards\r
          </button>\r
          <button class="quick-link" onclick="navigate('transport')">\r
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h12a1 1 0 0 1 1 1v3h2a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-1v3H5v-3H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h2V4a1 1 0 0 1 1-1z"/><circle cx="9" cy="17" r="2"/><circle cx="15" cy="17" r="2"/></svg>\r
            My Transport\r
          </button>\r
          <button class="quick-link" onclick="navigate('library')">\r
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M4 4.5A2.5 2.5 0 016.5 2H20v20H6.5A2.5 2.5 0 014 19.5z"/></svg>\r
            My Library\r
          </button>\r
          <button class="quick-link" onclick="openResetPasswordModal()">\r
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>\r
            Reset Password\r
          </button>\r
          <button class="quick-link" onclick="printStudentSummary()">\r
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>\r
            Print Summary\r
          </button>\r
        </div>\r
      </div>\r
    </div>\r
\r
    <!-- --- PROFILE --- -->\r
    <div class="page" id="page-profile">\r
      <div class="page-header">\r
        <h1>My Profile</h1>\r
        <p>Your student record and account information.</p>\r
      </div>\r
      <div class="profile-grid" id="profileGrid">\r
        <div class="empty-state">\r
          <div class="empty-icon">\r
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>\r
          </div>\r
          Loading profile data...\r
        </div>\r
      </div>\r
      <div class="card archive-card hidden" id="archiveDetailsCard">\r
        <div class="card-title">Passout / TC Details</div>\r
        <div class="archive-grid" id="archiveDetailsGrid"></div>\r
      </div>\r
      <!-- Reset password from profile page too -->\r
      <div style="margin-top:20px">\r
        <div class="card">\r
          <div class="card-title">\r
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\r
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>\r
            </svg>\r
            Account Security\r
          </div>\r
          <p style="color:var(--text2);font-size:13.5px;margin-bottom:14px;line-height:1.65">\r
            If you want to change your password, click below. A password reset link will be sent to your registered email address.\r
          </p>\r
          <button class="quick-link" onclick="openResetPasswordModal()" style="background:var(--blue-dim);border-color:rgba(79,144,255,0.25);color:var(--blue)">\r
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>\r
            Reset Password\r
          </button>\r
        </div>\r
      </div>\r
    </div>\r
\r
    <!-- --- ATTENDANCE --- -->\r
    <div class="page" id="page-attendance">\r
      <div class="page-header">\r
        <h1>Attendance</h1>\r
        <p>Full attendance history as recorded by school staff.</p>\r
      </div>\r
      <div class="grid-4">\r
        <div class="stat-card blue">\r
          <div class="stat-card-top">\r
            <div class="stat-card-label">Overall %</div>\r
            <div class="stat-icon">\r
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>\r
            </div>\r
          </div>\r
          <div class="stat-card-value" id="attPct">-</div>\r
          <div class="stat-card-sub" id="attTotal">0 records</div>\r
        </div>\r
        <div class="stat-card green">\r
          <div class="stat-card-top">\r
            <div class="stat-card-label">Present</div>\r
            <div class="stat-icon">\r
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M20 6L9 17l-5-5"/></svg>\r
            </div>\r
          </div>\r
          <div class="stat-card-value" id="attPresent">-</div>\r
          <div class="stat-card-sub">Days present</div>\r
        </div>\r
        <div class="stat-card amber">\r
          <div class="stat-card-top">\r
            <div class="stat-card-label">Half Day</div>\r
            <div class="stat-icon">\r
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 2v10M12 22v-2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>\r
            </div>\r
          </div>\r
          <div class="stat-card-value" id="attHalf">-</div>\r
          <div class="stat-card-sub">Half days</div>\r
        </div>\r
        <div class="stat-card rose">\r
          <div class="stat-card-top">\r
            <div class="stat-card-label">Absent</div>\r
            <div class="stat-icon">\r
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>\r
            </div>\r
          </div>\r
          <div class="stat-card-value" id="attAbsent">-</div>\r
          <div class="stat-card-sub">Days absent</div>\r
        </div>\r
      </div>\r
      <div class="table-toolbar">\r
        <div class="filter-control">\r
          <label for="attendanceMonthFilter">Attendance Month</label>\r
          <select id="attendanceMonthFilter" onchange="onAttendanceMonthChange()">\r
            <option value="">All months</option>\r
          </select>\r
        </div>\r
        <div class="filter-note" id="attendanceFilterNote">Showing attendance for the selected session.</div>\r
      </div>\r
      <div class="table-wrap">\r
        <table>\r
          <thead>\r
            <tr>\r
              <th>Date</th><th>Status</th><th>Marked By</th><th>Remarks</th>\r
            </tr>\r
          </thead>\r
          <tbody id="attendanceTable">\r
            <tr><td colspan="4">\r
              <div class="empty-state">\r
                <div class="empty-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg></div>\r
                No attendance records yet.\r
              </div>\r
            </td></tr>\r
          </tbody>\r
        </table>\r
      </div>\r
    </div>\r
\r
    <!-- --- FEES --- -->\r
    <div class="page" id="page-fees">\r
      <div class="page-header">\r
        <h1>Fee History</h1>\r
        <p>Month-wise fee records, payments, and outstanding balance.</p>\r
      </div>\r
\r
      <div style="display:flex;gap:10px;flex-wrap:wrap;margin:-6px 0 18px;align-items:center;">\r
        <button class="btn-secondary" type="button" onclick="openFeesSummaryModal()" id="feesSummaryBtn" style="flex:0 0 auto;">\r
          Full Fees Summary\r
        </button>\r
        <button class="btn-secondary" type="button" onclick="downloadFeesSummary()" id="feesDownloadBtn" style="flex:0 0 auto;">\r
          Download\r
        </button>\r
      </div>\r
\r
      <div class="grid-3">\r
        <div class="stat-card blue">\r
          <div class="stat-card-top">\r
            <div class="stat-card-label">Total Assigned</div>\r
            <div class="stat-icon">\r
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="1" y="6" width="22" height="13" rx="2"/><path d="M1 10h22"/></svg>\r
            </div>\r
          </div>\r
          <div class="stat-card-value" id="feesTotal">-</div>\r
          <div class="stat-card-sub" id="feesMonths">0 months</div>\r
        </div>\r
        <div class="stat-card green">\r
          <div class="stat-card-top">\r
            <div class="stat-card-label">Total Paid</div>\r
            <div class="stat-icon">\r
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M20 6L9 17l-5-5"/></svg>\r
            </div>\r
          </div>\r
          <div class="stat-card-value" id="feesPaid">-</div>\r
          <div class="stat-card-sub">Amount paid so far</div>\r
        </div>\r
        <div class="stat-card rose">\r
          <div class="stat-card-top">\r
            <div class="stat-card-label">Amount Due</div>\r
            <div class="stat-icon">\r
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>\r
            </div>\r
          </div>\r
          <div class="stat-card-value" id="feesDue">-</div>\r
          <div class="stat-card-sub">Remaining balance</div>\r
        </div>\r
      </div>\r
      <div class="table-wrap">\r
        <table>\r
          <thead>\r
            <tr>\r
              <th>Month</th><th>Assigned</th><th>Paid</th><th>Due</th><th>Status</th><th>Remark</th><th>Receipt</th>\r
            </tr>\r
          </thead>\r
          <tbody id="feesTable">\r
            <tr><td colspan="7">\r
              <div class="empty-state">\r
                <div class="empty-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><rect x="1" y="6" width="22" height="13" rx="2"/><path d="M1 10h22"/></svg></div>\r
                No fee records found yet.\r
              </div>\r
            </td></tr>\r
          </tbody>\r
        </table>\r
      </div>\r
      <div class="card" style="margin-top:18px;">\r
        <div class="card-title">Payment Transactions</div>\r
        <div class="table-wrap">\r
          <table>\r
            <thead>\r
              <tr>\r
                <th>Date</th><th>Month</th><th>Amount</th><th>Status</th><th>Reason</th><th>Transaction ID</th><th>Receipt ID</th><th>Receipt</th>\r
              </tr>\r
            </thead>\r
            <tbody id="feeTransactionsTable">\r
              <tr><td colspan="8"><div class="empty-state">No payment transactions yet.</div></td></tr>\r
            </tbody>\r
          </table>\r
        </div>\r
      </div>\r
    </div>\r
\r
    <!-- --- RESULTS --- -->\r
    <div class="page" id="page-results">\r
      <div class="page-header">\r
        <h1>Report Cards</h1>\r
        <p>View your marks and grades for each exam term.</p>\r
      </div>\r
      <div class="term-row">\r
        <label for="studentTermSelect">Select Term</label>\r
        <select id="studentTermSelect" onchange="onStudentTermChange()">\r
          <option value="">- Loading terms -</option>\r
        </select>\r
      </div>\r
      <div id="resultPanel">\r
        <div class="empty-state">\r
          <div class="empty-icon">\r
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>\r
          </div>\r
          Select a term above to view your report card.\r
        </div>\r
      </div>\r
    </div>\r
\r
    <!-- --- MY TRANSPORT --- -->\r
    <div class="page" id="page-transport">\r
      <div class="page-header">\r
        <h1>My Transport</h1>\r
        <p>Your assigned vehicle and route details.</p>\r
      </div>\r
      <div id="transportPanel">\r
        <div class="empty-state">\r
          <div class="empty-icon">\r
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M6 3h12a1 1 0 0 1 1 1v3h2a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-1v3H5v-3H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h2V4a1 1 0 0 1 1-1z"/><circle cx="9" cy="17" r="2"/><circle cx="15" cy="17" r="2"/></svg>\r
          </div>\r
          No transport assigned yet.\r
        </div>\r
      </div>\r
    </div>\r
\r
    <!-- MY LIBRARY -->\r
    <div class="page" id="page-library">\r
      <div class="page-header">\r
        <h1>My Library</h1>\r
        <p>Your issued books, return dates, and library status.</p>\r
      </div>\r
      <div class="grid-3">\r
        <div class="stat-card amber">\r
          <div class="stat-card-top">\r
            <div class="stat-card-label">Issued</div>\r
            <div class="stat-icon">\r
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M4 4.5A2.5 2.5 0 016.5 2H20v20H6.5A2.5 2.5 0 014 19.5z"/></svg>\r
            </div>\r
          </div>\r
          <div class="stat-card-value" id="libIssued">-</div>\r
          <div class="stat-card-sub">Books currently with you</div>\r
        </div>\r
        <div class="stat-card green">\r
          <div class="stat-card-top">\r
            <div class="stat-card-label">Returned</div>\r
            <div class="stat-icon">\r
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M20 6L9 17l-5-5"/></svg>\r
            </div>\r
          </div>\r
          <div class="stat-card-value" id="libReturned">-</div>\r
          <div class="stat-card-sub">Completed library records</div>\r
        </div>\r
        <div class="stat-card rose">\r
          <div class="stat-card-top">\r
            <div class="stat-card-label">Overdue</div>\r
            <div class="stat-icon">\r
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>\r
            </div>\r
          </div>\r
          <div class="stat-card-value" id="libOverdue">-</div>\r
          <div class="stat-card-sub" id="libMaxDays">Based on library rules</div>\r
        </div>\r
      </div>\r
      <div class="table-wrap">\r
        <table>\r
          <thead>\r
            <tr>\r
              <th>Book</th><th>Issued On</th><th>Return By</th><th>Returned On</th><th>Issued By</th><th>Status</th>\r
            </tr>\r
          </thead>\r
          <tbody id="libraryTable">\r
            <tr><td colspan="6">\r
              <div class="empty-state">\r
                <div class="empty-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M4 4.5A2.5 2.5 0 016.5 2H20v20H6.5A2.5 2.5 0 014 19.5z"/></svg></div>\r
                No library records found yet.\r
              </div>\r
            </td></tr>\r
          </tbody>\r
        </table>\r
      </div>\r
    </div>\r
\r
    <!-- --- TIMETABLE --- -->\r
    <div class="page" id="page-timetable">\r
      <div class="page-header">\r
        <h1>My Timetable</h1>\r
        <p>Your class schedule and subjects.</p>\r
      </div>\r
      <div id="studentTimetable">\r
        <div class="empty-state">\r
          <div class="empty-icon">\r
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">\r
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>\r
              <line x1="16" y1="2" x2="16" y2="6"/>\r
              <line x1="8" y1="2" x2="8" y2="6"/>\r
              <line x1="3" y1="10" x2="21" y2="10"/>\r
            </svg>\r
          </div>\r
          Loading your timetable...\r
        </div>\r
      </div>\r
    </div>\r
\r
    <!-- --- NOTICES --- -->\r
    <div class="page" id="page-notices">\r
      <div class="page-header">\r
        <h1>Notices</h1>\r
        <p>Important school announcements, circulars and documents.</p>\r
      </div>\r
      <section class="dashboard-notice-board" data-dashboard-notices data-notice-role="student">\r
        <div class="dashboard-notice-toolbar">\r
          <div class="dashboard-notice-heading">\r
            <span class="dashboard-notice-heading-icon"><svg viewBox="0 0 24 24"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/></svg></span>\r
            <div><h2>Latest Notices</h2><p data-notice-summary>Loading school announcements...</p></div>\r
          </div>\r
          <div class="dashboard-notice-actions"><span class="dashboard-notice-count" data-notice-count>--</span><button class="dashboard-notice-refresh" data-notice-refresh type="button"><svg viewBox="0 0 24 24"><path d="M20 11a8.1 8.1 0 1 0 2 5M20 4v7h-7"/></svg>Refresh</button></div>\r
        </div>\r
        <div class="dashboard-notice-list" data-notice-list aria-live="polite"><div class="dashboard-notice-empty"><span class="dashboard-notice-spinner"></span><strong>Loading notices</strong><small>Please wait a moment...</small></div></div>\r
      </section>\r
    </div>\r
  </div>\r
</div>\r
\r
<!-- --- RESET PASSWORD MODAL --- -->\r
<div class="modal-overlay" id="resetPasswordModal">\r
  <div class="modal-box" onclick="event.stopPropagation()">\r
    <div id="resetModalContent">\r
      <div class="modal-icon">\r
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">\r
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>\r
        </svg>\r
      </div>\r
      <h3>Reset Password</h3>\r
      <p>A password reset link will be sent to your registered email address. Click the link in the email to set a new password.</p>\r
      <div class="modal-email-display" id="resetEmailDisplay">Loading email...</div>\r
      <div class="modal-actions">\r
        <button class="btn-secondary" onclick="closeResetPasswordModal()">Cancel</button>\r
        <button class="btn-primary" id="sendResetBtn" onclick="sendPasswordReset()">\r
          Send Reset Link\r
        </button>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
\r
<div class="modal-overlay" id="photoPreviewModal">\r
  <div class="modal-box" onclick="event.stopPropagation()">\r
    <div class="modal-actions" style="justify-content:space-between;margin-bottom:14px">\r
      <h3 id="photoPreviewTitle" style="margin:0;color:var(--text)">Photo</h3>\r
      <button class="btn-secondary" onclick="closePhotoPreview()">Close</button>\r
    </div>\r
    <div style="display:grid;place-items:center;background:#020617;border-radius:18px;padding:16px">\r
      <img id="photoPreviewImage" alt="Preview" style="max-width:100%;max-height:72vh;object-fit:contain;border-radius:12px">\r
    </div>\r
  </div>\r
</div>\r
\r
<!-- --- RECEIPT MODAL --- -->\r
<div class="modal-overlay" id="resultDueModal">\r
  <div class="modal-box" onclick="event.stopPropagation()">\r
    <div class="modal-icon" style="background:var(--rose-dim);color:var(--rose);">\r
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">\r
        <rect x="3" y="6" width="18" height="13" rx="2"></rect>\r
        <path d="M3 10h18"></path>\r
        <path d="M7 15h.01"></path>\r
        <path d="M11 15h3"></path>\r
      </svg>\r
    </div>\r
    <h3>Result temporarily locked</h3>\r
    <p id="resultDueModalText">Your report card will be available after pending fee dues are cleared.</p>\r
    <div class="modal-actions">\r
      <button class="btn-secondary" onclick="closeResultDueModal()">Close</button>\r
      <button class="btn-primary" onclick="navigate('fees'); closeResultDueModal()">View Fee Details</button>\r
    </div>\r
  </div>\r
</div>\r
\r
<div class="receipt-modal" id="receiptModal">\r
  <div class="receipt-box">\r
    <div class="receipt-top">\r
      <div class="receipt-school" id="receiptSchoolName">Schoolix Public School</div>\r
      <div class="receipt-sub">Official Fee Payment Receipt</div>\r
      <div class="receipt-paid" id="receiptPaid">PAID</div>\r
    </div>\r
    <div class="receipt-content">\r
      <div class="receipt-grid">\r
        <div class="receipt-item">\r
          <strong>Student Name</strong>\r
          <span id="rStudent">-</span>\r
        </div>\r
        <div class="receipt-item">\r
          <strong>Student ID</strong>\r
          <span id="rStudentId">-</span>\r
        </div>\r
        <div class="receipt-item">\r
          <strong>Class</strong>\r
          <span id="rClass">-</span>\r
        </div>\r
        <div class="receipt-item">\r
          <strong>Receipt No.</strong>\r
          <span id="rReceipt">-</span>\r
        </div>\r
        <div class="receipt-item">\r
          <strong>Payment Date</strong>\r
          <span id="rDate">-</span>\r
        </div>\r
      </div>\r
\r
      <!-- Fees Summary container (reused inside same modal) -->\r
      <div id="feesSummaryContainer" class="fees-summary">\r
        <div class="fees-summary-grid">\r
          <div class="fees-summary-card">\r
            <div class="fees-summary-label">Total Assigned</div>\r
            <div class="fees-summary-value" id="fsTotalAssigned">-</div>\r
            <div class="fees-summary-sub" id="fsMonths">0 months</div>\r
          </div>\r
          <div class="fees-summary-card fees-summary-card--paid">\r
            <div class="fees-summary-label">Total Paid</div>\r
            <div class="fees-summary-value" id="fsTotalPaid">-</div>\r
            <div class="fees-summary-sub">Paid amount</div>\r
          </div>\r
          <div class="fees-summary-card fees-summary-card--due">\r
            <div class="fees-summary-label">Amount Due</div>\r
            <div class="fees-summary-value" id="fsTotalDue">-</div>\r
            <div class="fees-summary-sub">Remaining balance</div>\r
          </div>\r
          <div class="fees-summary-card" id="fsExtraCard" style="display:none;border-left:4px solid #0f766e;">\r
            <div class="fees-summary-label">Extra Paid</div>\r
            <div class="fees-summary-value" id="fsTotalExtra" style="color:#0f766e;">-</div>\r
            <div class="fees-summary-sub">Available for adjustment</div>\r
          </div>\r
        </div>\r
\r
        <div class="fees-summary-section">\r
          <div class="fees-summary-section-title">Monthly Fee Breakdown</div>\r
          <table class="fees-summary-table">\r
            <thead>\r
              <tr>\r
                <th>Month</th>\r
                <th>Amount</th>\r
                <th>Status</th>\r
                <th>Remark</th>\r
              </tr>\r
            </thead>\r
            <tbody id="fsMonthlyBreakdown"></tbody>\r
          </table>\r
        </div>\r
\r
        <div class="fees-summary-section">\r
          <div class="fees-summary-section-title">Payment Transactions</div>\r
          <table class="fees-summary-table">\r
            <thead>\r
              <tr>\r
                <th>Date</th>\r
                <th>Month</th>\r
                <th>Amount</th>\r
                <th>Reason</th>\r
                <th>Txn ID</th>\r
                <th>Receipt ID</th>\r
              </tr>\r
            </thead>\r
            <tbody id="fsTransactionRows"></tbody>\r
          </table>\r
        </div>\r
\r
        <div class="fees-summary-section">\r
          <div class="fees-summary-section-title">Breakdown by Status</div>\r
          <table class="fees-summary-table">\r
            <thead>\r
              <tr>\r
                <th>Status</th>\r
                <th>Count</th>\r
              </tr>\r
            </thead>\r
            <tbody id="fsStatusRows"></tbody>\r
          </table>\r
        </div>\r
      </div>\r
\r
      <!-- Existing receipt table (only used when opening receipt modal from fee rows) -->\r
      <table class="receipt-table" id="receiptTable">\r
        <thead>\r
          <tr>\r
            <th>Month</th><th>Amount</th><th>Status</th>\r
          </tr>\r
        </thead>\r
        <tbody id="receiptTableBody"></tbody>\r
      </table>\r
\r
      <div class="receipt-total">\r
        <div class="receipt-total-box">\r
          <strong>Total Paid</strong>\r
          <span id="rAmount">&#8377;0</span>\r
        </div>\r
      </div>\r
    </div>\r
    <div class="receipt-actions">\r
      <button class="receipt-btn close-btn" onclick="closeReceipt()">Close</button>\r
      <button class="receipt-btn print-btn" onclick="window.print()">Print Receipt</button>\r
    </div>\r
  </div>\r
</div>\r
\r
<script src="school-branding.js"><\/script>\r
<script src="/schoolix-app.js?v=navbar-20260721" defer><\/script>\r
<script type="module">\r
  import { initializeApp } from "./firebase-compat.js";\r
  import {\r
    getFirestore, doc, getDoc, getDocs, collection, query, where, limit, clearFirestoreReadCache\r
  } from "./firebase-compat.js";\r
  import {\r
    getAuth, signOut, onAuthStateChanged\r
  } from "./firebase-compat.js";\r
  import { createVehicleMap, locationStatus } from "./schoolix-maplibre.js";\r
  import { liveLocations, parentVehicleForStudent, subscribeTransport } from "./schoolix-transport.js";\r
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
  const db  = getFirestore(app);\r
  const auth = getAuth(app);\r
  const $   = (id) => document.getElementById(id);\r
  let transportLiveMap = null;\r
  let transportLiveUnsubscribe = null;\r
  const SESSION_KEY = "schoolixStudentSession";\r
  const SUPABASE_URL = "https://ezkmeedcqetztkeppxil.supabase.co";\r
  const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6a21lZWRjcWV0enRrZXBweGlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxMjk5NjAsImV4cCI6MjA5MzcwNTk2MH0.1davJ_NYkFhHToUtcFBR0kA6dk0-cOkaIbK2SCObkQg";\r
  const PASSWORD_RESET_FUNCTION_URL = \`\${SUPABASE_URL}/functions/v1/send-password-reset-email\`;\r
\r
  function clearMapMissing(mapApi, vehicleIds = []) {\r
    if (typeof mapApi?.clearMissing === "function") {\r
      mapApi.clearMissing(vehicleIds);\r
      return;\r
    }\r
    const keep = new Set(vehicleIds.map((id) => String(id)));\r
    mapApi?.markers?.forEach?.((entry, id) => {\r
      if (!keep.has(String(id))) {\r
        entry?.marker?.remove?.();\r
        mapApi.markers.delete(id);\r
      }\r
    });\r
  }\r
\r
  const state = {\r
    session: null, schoolId: "", schoolName: "",\r
    profile: null, attendance: [], fees: [], reports: [], terms: [], transactions: [],\r
    resultVisibility: {},\r
    sessions: [], activeSessionId: "", activeSessionLabel: "",\r
    activeSessionLocked: false, allDataBySession: {}, transport: null,\r
    libraryIssues: [], librarySettings: { maxDays: 14 }, teacherLookup: new Map(),\r
    timetableLoaded: false,\r
    archivedProfile: null, isArchived: false, attendanceMonthFilter: "", attendanceMonthFilterTouched: false,\r
    schoolActiveSessionId: "", userSelectedSessionId: "", sessionLoadError: "",\r
    sessionsLoadedForSchool: "", lastResumeRefreshAt: 0, resumeRefreshPromise: null\r
  };\r
\r
  function firstProfileText(...values) {\r
    return values.map(value => String(value || "").replace(/\\s+/g, " ").trim()).find(Boolean) || "";\r
  }\r
\r
  function studentDisplayName(profile = state.profile || state.session || {}) {\r
    return firstProfileText(profile.name, profile.fullName, profile.studentName, profile.displayName) || "Student";\r
  }\r
\r
  function linkedSchoolId(profile = {}) {\r
    return firstProfileText(\r
      profile.schoolId,\r
      profile.schoolID,\r
      profile.schoolUid,\r
      profile.schoolUID,\r
      profile.schoolDocId,\r
      profile.schoolDocID,\r
      profile.adminId,\r
      profile.adminID,\r
      profile.adminUid,\r
      profile.adminUID,\r
      profile.adminDocId,\r
      profile.adminDocID\r
    );\r
  }\r
\r
  function setStudentSchoolId(value = "") {\r
    const nextSchoolId = String(value || "").trim();\r
    if (nextSchoolId === state.schoolId) return false;\r
    state.schoolId = nextSchoolId;\r
    state.sessions = [];\r
    state.activeSessionId = "";\r
    state.activeSessionLabel = "";\r
    state.activeSessionLocked = false;\r
    state.schoolActiveSessionId = "";\r
    state.userSelectedSessionId = "";\r
    state.sessionLoadError = "";\r
    state.sessionsLoadedForSchool = "";\r
    state.timetableLoaded = false;\r
    return true;\r
  }\r
\r
  function renderStudentIdentity(profile = state.profile || state.session || {}, schoolName = "") {\r
    const name = studentDisplayName(profile);\r
    const school = firstProfileText(schoolName, state.schoolName, profile.schoolName, "Schoolix");\r
    if ($("topbarName")) $("topbarName").textContent = name;\r
    if ($("pdName")) $("pdName").textContent = name;\r
    if ($("sidebarSchoolName")) $("sidebarSchoolName").textContent = school;\r
    if ($("pdSchoolName")) $("pdSchoolName").textContent = school;\r
    if ($("welcomeTitle")) $("welcomeTitle").textContent = \`Welcome back, \${name}\`;\r
    if ($("welcomeSub")) $("welcomeSub").textContent = school;\r
    setAvatarElement("topbarAvatar", profile);\r
    setAvatarElement("pdAvatar", profile);\r
  }\r
\r
  function cachedSchoolNameFor(schoolId = "") {\r
    if (!schoolId) return "";\r
    try { return localStorage.getItem("schoolixSchoolName_" + schoolId) || ""; } catch { return ""; }\r
  }\r
\r
  function hydrateInitialStudentIdentity() {\r
    const session = state.session || loadSession() || {};\r
    const schoolId = linkedSchoolId(session);\r
    const school = firstProfileText(\r
      session.schoolName,\r
      cachedSchoolNameFor(schoolId),\r
      window.SchoolBranding?.getSchoolName?.(),\r
      "Schoolix"\r
    );\r
    if (school && school !== "Schoolix") state.schoolName = school;\r
    renderStudentIdentity(session, school);\r
  }\r
\r
  const PAGE_TITLES = {\r
    overview: "Overview", profile: "My Profile",\r
    attendance: "Attendance", fees: "Fee History", results: "Report Cards",\r
    transport: "My Transport", library: "My Library", timetable: "My Timetable", notices: "Notices"\r
  };\r
\r
  const TIMETABLE_DAYS = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];\r
  const TIMETABLE_PERIODS = ['9:00-10:00','10:00-11:00','11:00-12:00','12:00-1:00','1:00-2:00','2:00-3:00','3:00-4:00'];\r
\r
  /* --- NAVIGATION --- */\r
  window.navigate = function(pageId) {\r
    if (pageId === "results" && isResultLocked()) {\r
      renderResultLockedPanel();\r
      openResultDueModal();\r
    }\r
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));\r
    document.querySelectorAll(".nav-item").forEach(n => n.classList.remove("active"));\r
    const p = $("page-" + pageId); if (p) p.classList.add("active");\r
    const n = document.querySelector(\`.nav-item[data-page="\${pageId}"]\`); if (n) n.classList.add("active");\r
    $("topbarTitle").textContent = PAGE_TITLES[pageId] || pageId;\r
    if (pageId === "timetable") {\r
      loadStudentTimetable();\r
    }\r
    if (["overview", "profile", "attendance", "fees", "results", "transport", "library", "timetable", "notices"].includes(pageId)) {\r
      history.replaceState(null, "", \`#\${pageId}\`);\r
    }\r
    closeSidebar();\r
  };\r
\r
  window.openSidebar  = () => { $("sidebar").classList.add("open"); $("sidebarOverlay").classList.add("open"); };\r
  window.closeSidebar = () => { $("sidebar").classList.remove("open"); $("sidebarOverlay").classList.remove("open"); };\r
  $("resultDueModal")?.addEventListener("click", function(e) {\r
    if (e.target === this) closeResultDueModal();\r
  });\r
\r
  function wireOverviewCards() {\r
    document.querySelectorAll("[data-overview-page]").forEach((card) => {\r
      if (card.dataset.boundOverviewNav === "true") return;\r
      card.dataset.boundOverviewNav = "true";\r
      const targetPage = card.dataset.overviewPage;\r
      const openTarget = () => {\r
        if (targetPage) navigate(targetPage);\r
      };\r
      card.addEventListener("click", openTarget);\r
      card.addEventListener("keydown", (event) => {\r
        if (event.key !== "Enter" && event.key !== " ") return;\r
        event.preventDefault();\r
        openTarget();\r
      });\r
    });\r
  }\r
\r
  /* --- PROFILE DROPDOWN --- */\r
  window.toggleProfileDropdown = function() {\r
    const chip = $("studentChip");\r
    const dd   = $("profileDropdown");\r
    const isOpen = dd.classList.contains("open");\r
    if (isOpen) {\r
      dd.classList.remove("open");\r
      chip.classList.remove("open");\r
    } else {\r
      dd.classList.add("open");\r
      chip.classList.add("open");\r
    }\r
  };\r
\r
  window.closeProfileDropdown = function() {\r
    $("profileDropdown").classList.remove("open");\r
    $("studentChip").classList.remove("open");\r
  };\r
\r
  async function loadStudentTimetable() {\r
    const container = $("studentTimetable");\r
    if (state.timetableLoaded && container?.dataset.loadedFor === \`\${state.schoolId}|\${state.profile?.class || state.session?.class || ""}|\${state.profile?.section || state.session?.section || ""}\`) return;\r
    const className = state.profile?.class || state.session?.class || "";\r
    const sectionName = state.profile?.section || state.session?.section || "";\r
\r
    if (!state.schoolId || !className || !sectionName) {\r
      container.innerHTML = \`<div class="empty-state">Class or section information is missing. Please contact your school office.</div>\`;\r
      return;\r
    }\r
\r
    container.innerHTML = \`<div class="empty-state">Loading timetable...</div>\`;\r
\r
    try {\r
      const [teachersSnap, timetableSnap] = await Promise.all([\r
        getDocs(collection(db, "schools", state.schoolId, "teachers")),\r
        getDoc(doc(db, "schools", state.schoolId, "timetables", \`\${className}-\${sectionName}\`))\r
      ]);\r
\r
      const teacherLookup = new Map(teachersSnap.docs.map(d => [d.id, d.data().name || "Teacher"]));\r
\r
      if (!timetableSnap.exists()) {\r
        state.timetableLoaded = true;\r
        container.dataset.loadedFor = \`\${state.schoolId}|\${className}|\${sectionName}\`;\r
        container.innerHTML = \`<div class="empty-state">No timetable has been published yet for Class \${esc(className)}-\${esc(sectionName)}.</div>\`;\r
        return;\r
      }\r
\r
      const timetableData = timetableSnap.data() || {};\r
      const schedule = timetableData.schedule || {};\r
      renderStudentTimetable(schedule, teacherLookup, className, sectionName, timetableData.periodTimes || {});\r
      state.timetableLoaded = true;\r
      container.dataset.loadedFor = \`\${state.schoolId}|\${className}|\${sectionName}\`;\r
    } catch (err) {\r
      console.error("Error loading student timetable:", err);\r
      container.innerHTML = \`<div class="empty-state">Error loading timetable. Please refresh or contact the school office.</div>\`;\r
    }\r
  }\r
\r
  function renderStudentTimetable(schedule, teacherLookup, className, sectionName, periodTimes = {}) {\r
    const container = $("studentTimetable");\r
    const days = TIMETABLE_DAYS.filter(day => schedule && typeof schedule === 'object' && day in schedule);\r
    const periods = days.length\r
      ? Array.from(new Set(days.flatMap(day => Object.keys(schedule[day] || {}))))\r
        .sort((a,b) => parseInt(a.replace("Period ","")) - parseInt(b.replace("Period ","")))\r
      : TIMETABLE_PERIODS;\r
\r
    if (!days.length) {\r
      container.innerHTML = \`<div class="empty-state">No timetable has been set yet for Class \${esc(className)}-\${esc(sectionName)}.</div>\`;\r
      return;\r
    }\r
\r
    let html = '<div class="timetable-grid"><table class="timetable-table">';\r
    html += '<thead><tr><th>Day</th>';\r
    periods.forEach(period => {\r
      const periodTime = periodTimes[period] || days.map(day => schedule[day]?.[period]).find(slot => slot?.startTime || slot?.endTime) || {};\r
      const timeLabel = periodTime.startTime && periodTime.endTime\r
        ? \`\${formatTimetableTime12(periodTime.startTime)} - \${formatTimetableTime12(periodTime.endTime)}\`\r
        : periodTime.startTime\r
          ? \`From \${formatTimetableTime12(periodTime.startTime)}\`\r
          : periodTime.endTime\r
            ? \`Until \${formatTimetableTime12(periodTime.endTime)}\`\r
            : '';\r
      html += \`<th><strong>\${esc(period)}</strong>\${timeLabel ? \`<div class="class-info">\${esc(timeLabel)}</div>\` : ''}</th>\`;\r
    });\r
    html += '</tr></thead><tbody>';\r
\r
    days.forEach(day => {\r
      html += \`<tr><td><strong>\${esc(day)}</strong></td>\`;\r
      periods.forEach(period => {\r
        const slot = schedule[day]?.[period] || {};\r
        const teacherName = slot.teacherName || (slot.teacher ? teacherLookup.get(slot.teacher) || slot.teacher : '');\r
\r
        if (slot.subject || teacherName || slot.room) {\r
          html += \`<td><div class="timetable-slot"><div class="subject">\${esc(slot.subject || '-')}</div>\`;\r
          if (teacherName) html += \`<div class="class-info">Teacher: \${esc(teacherName)}</div>\`;\r
          if (slot.room) html += \`<div class="room">\${esc(slot.room)}</div>\`;\r
          html += '</div></td>';\r
        } else {\r
          html += '<td style="color: var(--muted); font-style: italic;">-</td>';\r
        }\r
      });\r
      html += '</tr>';\r
    });\r
\r
    html += '</tbody></table></div>';\r
    container.innerHTML = html;\r
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
  // Close dropdown when clicking outside\r
  document.addEventListener("click", function(e) {\r
    if (!$("studentChip").contains(e.target)) closeProfileDropdown();\r
  });\r
\r
  /* --- RESET PASSWORD MODAL --- */\r
  window.openResetPasswordModal = async function() {\r
  closeProfileDropdown();\r
\r
  // Pehle modal open karo with loading state\r
  $("resetPasswordModal").classList.add("open");\r
  $("resetModalContent").innerHTML = \`\r
    <div class="modal-icon">\r
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">\r
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>\r
        <path d="M7 11V7a5 5 0 0110 0v4"/>\r
      </svg>\r
    </div>\r
    <h3>Reset Password</h3>\r
    <div style="color:var(--text2);font-size:13.5px;margin:12px 0;display:flex;align-items:center;gap:8px">\r
      <svg style="width:16px;height:16px;animation:spin 1s linear infinite;flex-shrink:0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">\r
        <path d="M23 4v6h-6"/><path d="M1 20v-6h6"/>\r
        <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/>\r
      </svg>\r
      Fetching latest account info...\r
    </div>\r
  \`;\r
\r
  // Firestore se FRESH email fetch karo (admin ne jo bhi update kiya ho)\r
  let email = "";\r
  try {\r
    let sk = getStudentKey();\r
    if (sk) {\r
      // 1. Users collection check\r
      const userSnap = await getDoc(doc(db, "users", sk));\r
      if (userSnap.exists()) {\r
        email = userSnap.data().email || "";\r
      }\r
\r
      // 2. Students collection - admin yahan update karta hai, priority denge\r
      if (state.schoolId) {\r
        const sSnap = await getDocs(\r
          query(collection(db, "schools", state.schoolId, "students"), where("studentId", "==", sk))\r
        );\r
        if (!sSnap.empty) {\r
          const freshEmail = sSnap.docs[0].data().email || "";\r
          if (freshEmail) email = freshEmail; // students collection ki email override karega\r
        }\r
      }\r
    }\r
  } catch (e) {\r
    console.warn("Fresh email fetch failed, falling back to cache:", e);\r
    email = state.session?.email || state.profile?.email || "";\r
  }\r
\r
  // State bhi update karo taaki baad mein bhi fresh rahe\r
  if (email) {\r
    if (state.profile) state.profile.email = email;\r
    if (state.session) {\r
      state.session.email = email;\r
      saveSession(state.session);\r
    }\r
  }\r
\r
  // Ab actual modal content render karo fresh email ke saath\r
  $("resetModalContent").innerHTML = \`\r
    <div class="modal-icon">\r
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">\r
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>\r
        <path d="M7 11V7a5 5 0 0110 0v4"/>\r
      </svg>\r
    </div>\r
    <h3>Reset Password</h3>\r
    <p>A password reset link will be sent to your registered email address. Click the link in the email to set a new password.</p>\r
    <div class="modal-email-display">\${esc(email || "No email on file")}</div>\r
    <div class="modal-actions">\r
      <button class="btn-secondary" onclick="closeResetPasswordModal()">Cancel</button>\r
      <button class="btn-primary" id="sendResetBtn" onclick="sendPasswordReset()" \${!email ? "disabled" : ""}>\r
        Send Reset Link\r
      </button>\r
    </div>\r
  \`;\r
\r
  // sendPasswordReset ke liye current email accessible banana\r
  window._currentResetEmail = email;\r
};\r
  window.closeResetPasswordModal = function() {\r
    $("resetPasswordModal").classList.remove("open");\r
  };\r
\r
  // Close modal on backdrop click\r
  $("resetPasswordModal").addEventListener("click", function(e) {\r
    if (e.target === this) closeResetPasswordModal();\r
  });\r
\r
  window.sendPasswordReset = async function() {\r
    const email = (window._currentResetEmail || state.session?.email || state.profile?.email || "").trim();\r
    if (!email) { showToast("No email address found for this account.", "error"); return; }\r
\r
    const btn = $("sendResetBtn");\r
    if (btn) {\r
      btn.disabled = true;\r
      btn.textContent = "Sending...";\r
    }\r
\r
    try {\r
      const response = await fetch(PASSWORD_RESET_FUNCTION_URL, {\r
        method: "POST",\r
        headers: {\r
          "Content-Type": "application/json",\r
          "apikey": SUPABASE_ANON_KEY,\r
          "Authorization": \`Bearer \${SUPABASE_ANON_KEY}\`\r
        },\r
        body: JSON.stringify({\r
          email,\r
          schoolName: state.schoolName || window.SchoolBranding?.getSchoolName?.() || "Schoolix"\r
        })\r
      });\r
      if (!response.ok) {\r
        let details = "Password reset email failed.";\r
        try {\r
          const data = await response.json();\r
          details = data.error || data.details || details;\r
        } catch {\r
          details = await response.text() || details;\r
        }\r
        throw new Error(details);\r
      }\r
      // Show success state\r
      $("resetModalContent").innerHTML = \`\r
        <div class="modal-success">\r
          <div class="check-icon">\r
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" style="width:26px;height:26px">\r
              <path d="M20 6L9 17l-5-5"/>\r
            </svg>\r
          </div>\r
          <h3 style="margin-bottom:10px">Email Sent!</h3>\r
          <p style="color:var(--text2);font-size:13.5px;line-height:1.65;margin-bottom:20px">\r
            A password reset link has been sent to <strong style="color:var(--text)">\${esc(email)}</strong>.\r
            Check your inbox and follow the instructions to set a new password.\r
          </p>\r
          <button class="btn-primary" onclick="closeResetPasswordModal()">Done</button>\r
        </div>\r
      \`;\r
      showToast("Password reset email sent!", "success");\r
    } catch (err) {\r
      console.error(err);\r
      let msg = "Failed to send reset email.";\r
      if (err.message) msg = err.message;\r
      showToast(msg, "error");\r
      if (btn) { btn.disabled = false; btn.textContent = "Send Reset Link"; }\r
    }\r
  };\r
\r
  /* --- SESSION --- */\r
  function loadSession() { try { const r = localStorage.getItem(SESSION_KEY); return r ? JSON.parse(r) : null; } catch { return null; } }\r
  function saveSession(s) { localStorage.setItem(SESSION_KEY, JSON.stringify(s)); }\r
  function clearSession() { localStorage.removeItem(SESSION_KEY); }\r
  function redirectToLogin() { clearSession(); window.location.href = "#/index.html"; }\r
  function waitForAuthUser(timeoutMs = 16000) {\r
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
  function selectAuthenticatedStudentProfile(profiles = [], user = {}) {\r
    const unique = [...new Map(profiles.filter(Boolean).map((profile) => [String(profile.id || ""), profile])).values()];\r
    const allowed = unique.filter((profile) => {\r
      const role = String(profile.role || "").trim().toLowerCase();\r
      return ["student", "parent", "parents"].includes(role);\r
    });\r
    if (!allowed.length) return null;\r
\r
    const signedIds = new Set([user.uid, user.supabaseUid].map((value) => String(value || "").trim()).filter(Boolean));\r
    const signedEmail = String(user.email || "").trim().toLowerCase();\r
    const authLinked = allowed.filter((profile) => (\r
      [profile.id, profile.authUid, profile.uid, profile.supabaseAuthUid, profile.legacyUid, profile.firebaseUid]\r
        .map((value) => String(value || "").trim())\r
        .some((value) => signedIds.has(value))\r
    ));\r
    const expectedStudentId = String(\r
      authLinked[0]?.studentId || state.session?.studentId || ""\r
    ).trim();\r
    const sameAuthenticatedEmail = allowed.filter((profile) => (\r
      signedEmail && [profile.email, profile.authEmail, profile.parentEmail, profile.fatherEmail, profile.motherEmail, profile.guardianEmail]\r
        .some((value) => String(value || "").trim().toLowerCase() === signedEmail)\r
    ));\r
    let candidates = [...new Map([...authLinked, ...sameAuthenticatedEmail].map((profile) => [profile.id, profile])).values()];\r
    if (expectedStudentId) {\r
      const sameStudent = candidates.filter((profile) => String(profile.studentId || "").trim() === expectedStudentId);\r
      if (sameStudent.length) candidates = sameStudent;\r
    }\r
    if (!candidates.length) return null;\r
\r
    const identityKeys = new Set(candidates.map((profile) => [\r
      linkedSchoolId(profile),\r
      profile.studentId || "",\r
      String(profile.role || "").toLowerCase()\r
    ].map((value) => String(value || "").trim().toLowerCase()).join("|")).filter((key) => key !== "||"));\r
    if (identityKeys.size !== 1) return null;\r
\r
    return candidates.sort((left, right) => {\r
      const score = (profile) => {\r
        const ids = [profile.id, profile.authUid, profile.uid, profile.supabaseAuthUid, profile.legacyUid, profile.firebaseUid]\r
          .map((value) => String(value || "").trim());\r
        return (ids.some((value) => signedIds.has(value)) ? 100 : 0)\r
          + (String(profile.id || "") === String(profile.studentId || "") ? 20 : 0)\r
          + (linkedSchoolId(profile) ? 10 : 0);\r
      };\r
      return score(right) - score(left);\r
    })[0] || null;\r
  }\r
\r
  async function reconcileStudentSession() {\r
    const user = await waitForAuthUser();\r
    if (!user) {\r
      clearSession();\r
      state.session = null;\r
      return null;\r
    }\r
    try {\r
      const profiles = [];\r
      try {\r
        const profileSnap = await getDoc(doc(db, "users", user.uid));\r
        if (profileSnap?.exists?.()) profiles.push({ id: profileSnap.id, ...profileSnap.data() });\r
      } catch (error) {\r
        console.warn("Direct authenticated student profile read failed:", error);\r
      }\r
      const authEmail = String(user.email || "").trim().toLowerCase();\r
      const lookups = [];\r
      if (user.supabaseUid) lookups.push(["authUid", String(user.supabaseUid).trim()]);\r
      if (authEmail) lookups.push(["authEmail", authEmail], ["email", authEmail]);\r
      const lookupResults = await Promise.allSettled(lookups.map(([field, value]) => (\r
        getDocs(query(collection(db, "users"), where(field, "==", value)))\r
      )));\r
      lookupResults.forEach((result) => {\r
        if (result.status === "rejected") {\r
          console.warn("Authenticated student profile lookup failed:", result.reason);\r
          return;\r
        }\r
        result.value.docs.forEach((entry) => profiles.push({ id: entry.id, ...entry.data() }));\r
      });\r
\r
      const profile = selectAuthenticatedStudentProfile(profiles, user);\r
      if (!profile || !linkedSchoolId(profile)) {\r
        clearSession();\r
        state.session = null;\r
        return null;\r
      }\r
      const role = String(profile.role || "").toLowerCase();\r
      const loginAs = String(state.session?.loginAs || "").toLowerCase();\r
      if (!["student", "parent", "parents"].includes(role) && loginAs !== "parent") {\r
        clearSession();\r
        state.session = null;\r
        return null;\r
      }\r
      const next = {\r
        ...(state.session || {}),\r
        uid: user.uid,\r
        authUid: user.supabaseUid || user.uid,\r
        supabaseAuthUid: user.supabaseUid || state.session?.supabaseAuthUid || "",\r
        studentId: profile.studentId || state.session?.studentId || profile.id || user.uid,\r
        studentDocId: profile.studentDocId || state.session?.studentDocId || profile.id || "",\r
        name: profile.name || profile.studentName || state.session?.name || "",\r
        class: profile.class || state.session?.class || "",\r
        section: profile.section || state.session?.section || "",\r
        rollNo: profile.rollNo || profile.roll || state.session?.rollNo || "",\r
        email: profile.email || user.email || state.session?.email || "",\r
        schoolId: linkedSchoolId(profile) || linkedSchoolId(state.session || {}),\r
        schoolName: profile.schoolName || state.session?.schoolName || "",\r
        role: "student",\r
        loginAs: state.session?.loginAs || (role === "parent" || role === "parents" ? "parent" : "student"),\r
        loginAt: state.session?.loginAt || new Date().toISOString()\r
      };\r
      saveSession(next);\r
      state.session = next;\r
      return next;\r
    } catch (error) {\r
      console.warn("Student session recovery failed:", error);\r
      clearSession();\r
      state.session = null;\r
      return null;\r
    }\r
  }\r
  async function logoutStudent() {\r
    try {\r
      await signOut(auth);\r
    } catch (error) {\r
      console.warn("Firebase sign out failed:", error);\r
    } finally {\r
      clearSession();\r
      showToast("Signed out successfully.", "success");\r
      setTimeout(() => window.location.replace("#/index.html"), 350);\r
    }\r
  }\r
\r
  /* --- UTILS --- */\r
  function esc(v) {\r
    return String(v??"")\r
      .replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")\r
      .replace(/"/g,"&quot;").replace(/'/g,"&#39;");\r
  }\r
  function moneyNumber(v) {\r
    if (typeof v === "number") return Number.isFinite(v) ? v : 0;\r
    const parsed = Number(String(v || "0").replace(/[^\\d.-]/g, ""));\r
    return Number.isFinite(parsed) ? parsed : 0;\r
  }\r
  function fmt(v) { return \`\\u20B9\${moneyNumber(v).toLocaleString("en-IN")}\`; }\r
  function getStudentInitials(value) {\r
    const words = String(value || "Student").trim().split(/\\s+/).filter(Boolean);\r
    if (!words.length) return "S";\r
    return words.slice(0, 2).map((word) => word[0]).join("").toUpperCase();\r
  }\r
  function getStudentPhotoUrl(profile = state.profile || {}) {\r
    return String(profile.photoUrl || profile.imageUrl || profile.profilePhotoUrl || profile.avatarUrl || "").trim();\r
  }\r
  function renderStudentPhoto(profile = state.profile || {}, className = "profile-photo-card") {\r
    const photoUrl = getStudentPhotoUrl(profile);\r
    const initials = getStudentInitials(profile.name || profile.studentId || getStudentKey());\r
    return \`<button type="button" class="\${className}" onclick="openPhotoPreview('\${esc(photoUrl)}','\${esc(profile.name || "Student")}')">\${photoUrl ? \`<img src="\${esc(photoUrl)}" alt="\${esc(profile.name || "Student")} photo">\` : esc(initials)}</button>\`;\r
  }\r
  function setAvatarElement(id, profile = state.profile || {}) {\r
    const el = $(id);\r
    if (!el) return;\r
    const photoUrl = getStudentPhotoUrl(profile);\r
    const initials = getStudentInitials(profile.name || profile.studentId || getStudentKey());\r
    el.innerHTML = photoUrl ? \`<img src="\${esc(photoUrl)}" alt="\${esc(profile.name || "Student")} photo">\` : esc(initials);\r
    el.onclick = (event) => {\r
      event.stopPropagation();\r
      openPhotoPreview(photoUrl, profile.name || "Student");\r
    };\r
  }\r
  window.openPhotoPreview = function(photoUrl, title = "Photo") {\r
    if (!photoUrl) return showToast("Photo is not available yet.", "info");\r
    $("photoPreviewTitle").textContent = title || "Photo";\r
    $("photoPreviewImage").src = photoUrl;\r
    $("photoPreviewImage").alt = \`\${title || "Photo"} preview\`;\r
    $("photoPreviewModal").classList.add("open");\r
  };\r
  window.closePhotoPreview = function() {\r
    $("photoPreviewModal").classList.remove("open");\r
    $("photoPreviewImage").removeAttribute("src");\r
  };\r
  function toDate(v) { if (!v) return null; if (v?.toDate) return v.toDate(); if (typeof v?.seconds === "number") return new Date(v.seconds*1000); const p=new Date(v); return isNaN(p)?null:p; }\r
  function fmtDate(v) {\r
    if (typeof v==="string"&&/^\\d{4}-\\d{2}-\\d{2}$/.test(v)) {\r
      const [y,m,d]=v.split("-").map(Number); return new Date(y,m-1,d).toLocaleDateString("en-IN");\r
    }\r
    const d=toDate(v); return d?d.toLocaleDateString("en-IN"):"N/A";\r
  }\r
  function fmtDateTime(v) { const d=toDate(v); return d?d.toLocaleString("en-IN"):"N/A"; }\r
  const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];\r
  function monthKeyFromDate(value) {\r
    const d = toDate(value);\r
    if (!d) return "";\r
    return \`\${d.getFullYear()}-\${String(d.getMonth() + 1).padStart(2, "0")}\`;\r
  }\r
  function currentMonthKey() {\r
    const now = new Date();\r
    return \`\${now.getFullYear()}-\${String(now.getMonth() + 1).padStart(2, "0")}\`;\r
  }\r
  function monthLabelFromKey(key) {\r
    const [year, month] = String(key || "").split("-");\r
    const idx = Number(month) - 1;\r
    return year && MONTH_NAMES[idx] ? \`\${MONTH_NAMES[idx]} \${year}\` : key || "All months";\r
  }\r
  function getAttendanceMonthKey(record = {}) {\r
    return monthKeyFromDate(record.date || record.timestamp || record.createdAt || record.updatedAt);\r
  }\r
  function normalizeArchivedArray(value) {\r
    return Array.isArray(value) ? value : [];\r
  }\r
  function addDays(date, days) { const d=new Date(date); d.setDate(d.getDate()+days); return d; }\r
  function normalizeLibraryMaxDays(value) {\r
    const days = Number(value);\r
    if (!Number.isFinite(days) || days < 1) return 14;\r
    return Math.min(365, Math.floor(days));\r
  }\r
  function getLibraryIssuedDate(entry) { return toDate(entry.issuedAt) || toDate(entry.issuedAtMs); }\r
  function getLibraryMaxDays(entry) { return normalizeLibraryMaxDays(entry.maxDaysAllowed || state.librarySettings?.maxDays); }\r
  function getLibraryDueDate(entry) {\r
    const stored = toDate(entry.dueDate) || toDate(entry.dueDateMs);\r
    if (stored) return stored;\r
    const issued = getLibraryIssuedDate(entry);\r
    return issued ? addDays(issued, getLibraryMaxDays(entry)) : null;\r
  }\r
  function isLibraryOverdue(entry) {\r
    if (entry.status === "returned") return false;\r
    const due = getLibraryDueDate(entry);\r
    if (!due) return false;\r
    const start = new Date(); start.setHours(0,0,0,0);\r
    return due.getTime() < start.getTime();\r
  }\r
\r
  function showToast(msg, type="info") {\r
    const t=document.createElement("div"); t.className="toast"; t.textContent=msg;\r
    t.style.background =\r
      type==="error"   ? "linear-gradient(135deg,#b42318,#d64c3c)" :\r
      type==="success" ? "linear-gradient(135deg,#059669,#10b981)" :\r
                         "linear-gradient(135deg,#2a5cff,#4f90ff)";\r
    document.body.appendChild(t);\r
    setTimeout(()=>t.remove(), 3400);\r
  }\r
\r
  function getStudentKey() {\r
    const studentId = String(state.session?.studentId || "").trim();\r
    if (studentId) return studentId;\r
    return String(state.session?.uid || "").trim();\r
  }\r
\r
  function isPermissionError(error) {\r
    const code = String(error?.code || "");\r
    const message = String(error?.message || "");\r
    return code === "permission-denied" || /permission|insufficient permissions/i.test(message);\r
  }\r
\r
  async function safeGetDoc(ref) {\r
    try { return await getDoc(ref); }\r
    catch (error) {\r
      if (!isPermissionError(error)) console.warn("Firestore read failed:", error);\r
      return null;\r
    }\r
  }\r
\r
  async function safeGetDocs(ref) {\r
    try { return await getDocs(ref); }\r
    catch (error) {\r
      if (!isPermissionError(error)) console.warn("Firestore query failed:", error);\r
      return { docs: [], empty: true };\r
    }\r
  }\r
\r
  async function fetchStudentProfileDoc(primaryKey) {\r
    const candidates = [];\r
    const uid = String(state.session?.uid || "").trim();\r
    const authUid = String(state.session?.authUid || "").trim();\r
    const studentId = String(state.session?.studentId || "").trim();\r
    const studentDocId = String(state.session?.studentDocId || "").trim();\r
    // Authentication-linked identifiers are authoritative. Student IDs are\r
    // school-local and can collide across schools, so they must be last.\r
    if (uid) candidates.push(uid);\r
    if (authUid && authUid !== uid) candidates.push(authUid);\r
    if (studentDocId && studentDocId !== uid && studentDocId !== authUid) candidates.push(studentDocId);\r
    if (primaryKey && primaryKey !== uid && primaryKey !== authUid && primaryKey !== studentDocId) candidates.push(primaryKey);\r
    if (studentId && !candidates.includes(studentId)) candidates.push(studentId);\r
\r
    const uniqueIds = [...new Set(candidates.filter(Boolean))];\r
    for (const candidate of uniqueIds) {\r
      try {\r
        const snap = await safeGetDoc(doc(db, "users", candidate));\r
        if (snap?.exists?.()) {\r
          const profile = { id: snap.id, ...snap.data() };\r
          const role = String(profile.role || "student").trim().toLowerCase();\r
          const profileAuthIds = [profile.id, profile.authUid, profile.uid, profile.legacyUid, profile.firebaseUid]\r
            .map((value) => String(value || "").trim());\r
          const authLinked = profileAuthIds.includes(uid) || profileAuthIds.includes(authUid);\r
          const canonicalSchoolId = linkedSchoolId(state.session || {});\r
          const sameSchool = Boolean(canonicalSchoolId && linkedSchoolId(profile) === canonicalSchoolId);\r
          const sameStudent = studentId && String(profile.studentId || "").trim() === studentId;\r
          const signedEmail = String(state.session?.email || "").trim().toLowerCase();\r
          const sameEmail = signedEmail && [profile.email, profile.authEmail, profile.parentEmail, profile.fatherEmail, profile.motherEmail, profile.guardianEmail]\r
            .some((value) => String(value || "").trim().toLowerCase() === signedEmail);\r
          if (["student", "parent", "parents", ""].includes(role) && sameSchool && (authLinked || (sameStudent && sameEmail))) return profile;\r
        }\r
      } catch (error) {\r
        if (!isPermissionError(error)) console.warn("Profile lookup failed:", error);\r
      }\r
    }\r
    const emailCandidates = [\r
      state.session?.authEmail,\r
      state.session?.email,\r
      state.session?.parentEmail,\r
      state.session?.fatherEmail,\r
      state.session?.motherEmail,\r
      state.session?.guardianEmail\r
    ].map(value => String(value || "").trim().toLowerCase()).filter(Boolean);\r
    const emailMatches = [];\r
    for (const email of [...new Set(emailCandidates)]) {\r
      for (const field of ["authEmail", "email", "parentEmail", "fatherEmail", "motherEmail", "guardianEmail"]) {\r
        const snap = await safeGetDocs(query(collection(db, "users"), where(field, "==", email)));\r
        for (const match of snap.docs || []) {\r
          const profile = { id: match.id, ...match.data(), _matchedField: field };\r
          const role = String(profile.role || "student").trim().toLowerCase();\r
          if (["student", "parent", "parents", ""].includes(role)) emailMatches.push(profile);\r
        }\r
      }\r
    }\r
    const uniqueMatches = [...new Map(emailMatches.map((profile) => [profile.id, profile])).values()];\r
    const scoredMatches = uniqueMatches.map((profile) => {\r
      const authIds = [profile.id, profile.authUid, profile.uid, profile.legacyUid, profile.firebaseUid]\r
        .map((value) => String(value || "").trim());\r
      const score = (authIds.includes(uid) || authIds.includes(authUid) ? 120 : 0)\r
        + (studentId && String(profile.studentId || "").trim() === studentId ? 80 : 0)\r
        + (linkedSchoolId(profile) && linkedSchoolId(profile) === linkedSchoolId(state.session || {}) ? 40 : 0);\r
      return { profile, score };\r
    }).sort((a, b) => b.score - a.score);\r
    const bestMatch = scoredMatches[0] || null;\r
    const canonicalSchoolId = linkedSchoolId(state.session || {});\r
    if (bestMatch?.score >= 120 && canonicalSchoolId && linkedSchoolId(bestMatch.profile) === canonicalSchoolId) {\r
      return bestMatch.profile;\r
    }\r
    return null;\r
  }\r
\r
  function studentLookupValues(...values) {\r
    return [...new Set(values.map(value => String(value || "").trim()).filter(Boolean))];\r
  }\r
\r
  async function fetchStudentRecordFromSchool(schoolId, profileSeed = {}, primaryKey = "") {\r
    if (!schoolId) return null;\r
    const docCandidates = [\r
      profileSeed.studentDocId,\r
      state.session?.studentDocId,\r
      primaryKey,\r
      state.session?.studentId,\r
      state.session?.uid\r
    ].map(value => String(value || "").trim()).filter(Boolean);\r
\r
    for (const candidate of [...new Set(docCandidates)]) {\r
      const snap = await safeGetDoc(doc(db, "schools", schoolId, "students", candidate));\r
      if (snap?.exists?.()) return { id: snap.id, ...snap.data() };\r
    }\r
\r
    const queryCandidates = [\r
      ["studentId", profileSeed.studentId || state.session?.studentId || primaryKey],\r
      ["authUid", profileSeed.authUid || state.session?.authUid || state.session?.uid],\r
      ["uid", profileSeed.uid || state.session?.uid],\r
      ["email", profileSeed.email || state.session?.email],\r
      ["authEmail", profileSeed.authEmail || state.session?.authEmail],\r
      ["parentEmail", profileSeed.parentEmail || state.session?.parentEmail],\r
      ["fatherEmail", profileSeed.fatherEmail || state.session?.fatherEmail],\r
      ["motherEmail", profileSeed.motherEmail || state.session?.motherEmail],\r
      ["guardianEmail", profileSeed.guardianEmail || state.session?.guardianEmail]\r
    ].filter(([, value]) => String(value || "").trim());\r
\r
    for (const [field, value] of queryCandidates) {\r
      for (const lookupValue of studentLookupValues(value, String(value || "").toLowerCase(), String(value || "").toUpperCase())) {\r
        const snap = await safeGetDocs(query(\r
          collection(db, "schools", schoolId, "students"),\r
          where(field, "==", lookupValue)\r
        ));\r
        if (!snap.empty) return { id: snap.docs[0].id, ...snap.docs[0].data() };\r
      }\r
    }\r
\r
    return null;\r
  }\r
\r
  async function fetchArchivedStudentFromSchool(schoolId, profileSeed = {}, primaryKey = "") {\r
    if (!schoolId) return null;\r
    const docCandidates = [\r
      profileSeed.studentDocId,\r
      state.session?.studentDocId,\r
      primaryKey,\r
      profileSeed.studentId,\r
      state.session?.studentId,\r
      state.session?.uid\r
    ].map(value => String(value || "").trim()).filter(Boolean);\r
\r
    for (const candidate of [...new Set(docCandidates)]) {\r
      const snap = await safeGetDoc(doc(db, "schools", schoolId, "passedOutStudents", candidate));\r
      if (snap?.exists?.()) return { id: snap.id, ...snap.data() };\r
    }\r
\r
    const queryCandidates = [\r
      ["studentId", profileSeed.studentId || state.session?.studentId || primaryKey],\r
      ["authUid", profileSeed.authUid || state.session?.authUid || state.session?.uid],\r
      ["uid", profileSeed.uid || state.session?.uid],\r
      ["email", profileSeed.email || state.session?.email],\r
      ["authEmail", profileSeed.authEmail || state.session?.authEmail],\r
      ["parentEmail", profileSeed.parentEmail || state.session?.parentEmail],\r
      ["fatherEmail", profileSeed.fatherEmail || state.session?.fatherEmail],\r
      ["motherEmail", profileSeed.motherEmail || state.session?.motherEmail],\r
      ["guardianEmail", profileSeed.guardianEmail || state.session?.guardianEmail]\r
    ].filter(([, value]) => String(value || "").trim());\r
\r
    for (const [field, value] of queryCandidates) {\r
      for (const lookupValue of studentLookupValues(value, String(value || "").toLowerCase(), String(value || "").toUpperCase())) {\r
        const snap = await safeGetDocs(query(\r
          collection(db, "schools", schoolId, "passedOutStudents"),\r
          where(field, "==", lookupValue)\r
        ));\r
        if (!snap.empty) return { id: snap.docs[0].id, ...snap.docs[0].data() };\r
      }\r
    }\r
\r
    return null;\r
  }\r
\r
  function latestByRecent(items) {\r
    return [...items].sort((a,b)=>\r
      (toDate(b.updatedAt)||toDate(b.date)||toDate(b.createdAt)||0)-\r
      (toDate(a.updatedAt)||toDate(a.date)||toDate(a.createdAt)||0)\r
    );\r
  }\r
\r
  function uniqueFeeItems(items = [], signatureFn) {\r
    const seen = new Set();\r
    return items.filter((item, index) => {\r
      const signature = String(signatureFn(item, index) || "").toLowerCase();\r
      if (seen.has(signature)) return false;\r
      seen.add(signature);\r
      return true;\r
    });\r
  }\r
\r
  function feeImpositionEntries(fee = {}) {\r
    return uniqueFeeItems(\r
      Array.isArray(fee.impositions) ? fee.impositions : [],\r
      (imposition) => [imposition.month || fee.month || "", imposition.amount || 0, imposition.remarks || ""].join("|")\r
    );\r
  }\r
\r
  function normalizeFeeForDisplay(fee = {}) {\r
    const impositions = feeImpositionEntries(fee);\r
    if (!impositions.length) return fee;\r
    const uniquePrincipal = impositions.reduce((sum, imposition) => sum + moneyNumber(imposition.amount || 0), 0);\r
    const fine = feeFineAmount(fee);\r
    const storedTotal = moneyNumber(fee.amount ?? fee.originalAmount ?? 0);\r
    if (uniquePrincipal <= 0 || uniquePrincipal >= storedTotal) return { ...fee, impositions };\r
    const totalPaid = moneyNumber(fee.totalPaidAmount ?? fee.paidAmount ?? 0);\r
    const extra = feeExtraAmount(fee);\r
    const total = uniquePrincipal + fine;\r
    const due = Math.max(0, total - totalPaid);\r
    return {\r
      ...fee,\r
      impositions,\r
      amount: total,\r
      originalAmount: total,\r
      remainingAmount: due,\r
      totalCollectedAmount: totalPaid + extra,\r
      status: due <= 0 ? "Paid" : totalPaid > 0 ? "Partial" : (fee.status || "Imposed")\r
    };\r
  }\r
\r
  function uniqueFeesByMonth(fees) {\r
    const map=new Map();\r
    for (const f of latestByRecent(fees).map(normalizeFeeForDisplay)) {\r
      const k=String(f.month||"").trim().toLowerCase()||f.id;\r
      if (!map.has(k)) {\r
        map.set(k, f);\r
      } else {\r
        const existing = map.get(k);\r
        const grouped = [existing, f].map(normalizeFeeForDisplay);\r
        const impositions = uniqueFeeItems(grouped.flatMap(feeImpositionEntries), (imposition) =>\r
          [imposition.month || existing.month || "", imposition.amount || 0, imposition.remarks || ""].join("|")\r
        );\r
        const fineDetails = uniqueFeeItems(grouped.flatMap((fee) => feeFineDetails(fee)), (fine) =>\r
          fine.ruleKey || [fine.amount || 0, fine.reason || ""].join("|")\r
        );\r
        const payments = uniqueFeeItems(grouped.flatMap((fee) => Array.isArray(fee.payments) ? fee.payments : []), (payment, index) =>\r
          payment.transactionId || payment.ledgerTransactionId || payment.txnId || payment.paymentId || [\r
            payment.receivedAmount ?? payment.amount ?? 0,\r
            payment.appliedAmount ?? payment.amount ?? 0,\r
            payment.extraAmount || 0,\r
            payment.status || "",\r
            payment.note || "",\r
            index\r
          ].join("|")\r
        );\r
        const storedTotal = Math.max(...grouped.map((fee) => moneyNumber(fee.amount ?? fee.originalAmount ?? 0)));\r
        const principal = impositions.reduce((sum, imposition) => sum + moneyNumber(imposition.amount || 0), 0);\r
        const fine = fineDetails.reduce((sum, detail) => sum + moneyNumber(detail.amount || 0), 0);\r
        const total = principal > 0 && principal < storedTotal ? principal + fine : storedTotal;\r
        const paymentPaid = payments.reduce((sum, payment) => sum + moneyNumber(payment.appliedAmount ?? payment.amount ?? 0), 0);\r
        const storedPaid = Math.max(...grouped.map((fee) => moneyNumber(fee.totalPaidAmount ?? fee.paidAmount ?? 0)));\r
        const paid = Math.max(paymentPaid, storedPaid);\r
        const extra = Math.max(...grouped.map((fee) => feeExtraAmount(fee)));\r
        const due = Math.max(0, total - paid);\r
        map.set(k, normalizeFeeForDisplay({\r
          ...existing,\r
          amount: total,\r
          originalAmount: total,\r
          paidAmount: paid,\r
          totalPaidAmount: paid,\r
          totalExtraPaidAmount: extra,\r
          totalCollectedAmount: paid + extra,\r
          remainingAmount: due,\r
          status: due <= 0 ? "Paid" : paid > 0 ? "Partial" : (existing.status || "Imposed"),\r
          impositions,\r
          fineDetails,\r
          payments\r
        }));\r
      }\r
    }\r
    return [...map.values()];\r
  }\r
\r
  function feeExtraAmount(fee = {}) {\r
    const stored = moneyNumber(fee.totalExtraPaidAmount || fee.extraPaidAmount || fee.extraAmount || 0);\r
    if (stored) return stored;\r
    return (Array.isArray(fee.payments) ? fee.payments : [])\r
      .reduce((sum, payment) => sum + moneyNumber(payment.extraAmount || 0), 0);\r
  }\r
\r
  function feeFineDetails(fee = {}) {\r
    return Array.isArray(fee.fineDetails) ? fee.fineDetails : [];\r
  }\r
\r
  function feeFineAmount(fee = {}) {\r
    const stored = moneyNumber(fee.totalFineAmount || fee.fineAmount || 0);\r
    if (stored) return stored;\r
    return feeFineDetails(fee).reduce((sum, fine) => sum + moneyNumber(fine.amount || 0), 0);\r
  }\r
\r
  function calcAttendance(records) {\r
    const total=records.length; if (!total) return {total:0,present:0,half:0,absent:0,percentage:0};\r
    const c=records.reduce((a,r)=>{\r
      const s=String(r.status||"").toLowerCase();\r
      if(s==="present") a.present++; else if(s==="half day") a.half++; else a.absent++;\r
      return a;\r
    },{total,present:0,half:0,absent:0});\r
    return {...c, percentage:Math.round(((c.present+c.half*0.5)/total)*100)};\r
  }\r
\r
  function calcFees(fees) {\r
    return uniqueFeesByMonth(fees).reduce((s,f)=>{\r
      const amt=moneyNumber(f.amount??f.originalAmount??0);\r
      const paid=moneyNumber(f.totalPaidAmount??f.paidAmount??0);\r
      const extra=feeExtraAmount(f);\r
      const due=moneyNumber(f.remainingAmount??Math.max(0,amt-paid));\r
      s.total+=amt; s.paid+=paid; s.extra+=extra; s.collected+=paid+extra; s.due+=due; return s;\r
    },{total:0,paid:0,extra:0,collected:0,due:0});\r
  }\r
\r
  function getResultDueAmount() {\r
    return Math.max(0, Number(calcFees(state.fees).due || 0));\r
  }\r
\r
  function isResultLocked() {\r
    return getResultDueAmount() > 0;\r
  }\r
\r
  function resultLockMessage() {\r
    return \`Your fee dues are not clear yet. Please clear pending dues of \${fmt(getResultDueAmount())} to unlock your report card.\`;\r
  }\r
\r
  function renderResultLockedPanel() {\r
    const panel = $("resultPanel");\r
    if (!panel) return;\r
    panel.innerHTML = \`\r
      <div class="result-lock-panel">\r
        <div class="result-lock-icon">\r
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">\r
            <rect x="3" y="6" width="18" height="13" rx="2"></rect>\r
            <path d="M3 10h18"></path>\r
            <path d="M7 15h.01"></path>\r
            <path d="M11 15h3"></path>\r
          </svg>\r
        </div>\r
        <div>\r
          <h3>Report card locked until dues are cleared</h3>\r
          <p>\${esc(resultLockMessage())}</p>\r
          <span class="result-lock-amount">Pending dues: \${esc(fmt(getResultDueAmount()))}</span>\r
        </div>\r
      </div>\r
    \`;\r
  }\r
\r
  window.openResultDueModal = function() {\r
    const text = $("resultDueModalText");\r
    if (text) text.textContent = resultLockMessage();\r
    $("resultDueModal")?.classList.add("open");\r
  };\r
\r
  window.closeResultDueModal = function() {\r
    $("resultDueModal")?.classList.remove("open");\r
  };\r
\r
  function compactId(value, fallback = "-") {\r
    const raw = String(value || "").trim();\r
    if (!raw) return fallback;\r
    return raw.length > 28 ? \`\${raw.slice(0, 12)}...\${raw.slice(-8)}\` : raw;\r
  }\r
\r
  function generatedTxnId(fee, index) {\r
    const base = String(fee.id || \`\${fee.studentId || getStudentKey() || "student"}-\${fee.month || "fee"}\`)\r
      .replace(/[^a-zA-Z0-9]/g, "")\r
      .slice(-8)\r
      .toUpperCase() || "FEE";\r
    return \`TXN-\${base}-\${String(index + 1).padStart(2, "0")}\`;\r
  }\r
\r
  function generatedReceiptId(fee, payment, index) {\r
    const existing = payment?.receiptId || payment?.receiptNo || payment?.receiptNumber || payment?.receipt || payment?.receipt_id;\r
    if (existing) return String(existing);\r
    const dateKey = toDate(payment?.date || payment?.paidAt || payment?.createdAt)?.toISOString().slice(0,10).replace(/-/g,"") || "DATE";\r
    const base = String(fee.id || fee.month || "fee").replace(/[^a-zA-Z0-9]/g, "").slice(-6).toUpperCase() || "FEE";\r
    return \`RCP-\${base}-\${dateKey}-\${String(index + 1).padStart(2, "0")}\`;\r
  }\r
\r
  function buildFeeTransactions() {\r
    const rows = [];\r
    uniqueFeesByMonth(state.fees || []).forEach((fee) => {\r
      const fallbackImposedAmount = Math.max(0, moneyNumber(fee.amount ?? fee.originalAmount ?? 0) - feeFineAmount(fee));\r
      const impositions = feeImpositionEntries(fee);\r
      const imposedAmount = impositions.reduce((sum, imposition) => sum + moneyNumber(imposition.amount || 0), 0) || fallbackImposedAmount;\r
      const imposedDate = impositions[0]?.date || fee.imposedDate || fee.date || fee.createdAt;\r
      const imposedRemarks = impositions.map((imposition) => imposition.remarks).filter(Boolean).join(", ") || fee.impositionRemark || fee.remarks || "";\r
      const imposedTransactionId = impositions.map((imposition) => imposition.transactionId).filter(Boolean)[0] || "";\r
      const impositionRows = imposedAmount > 0\r
        ? [{\r
            amount: imposedAmount,\r
            month: fee.month,\r
            date: imposedDate,\r
            status: fee.status === "Paid" ? "Imposed" : (fee.status || "Imposed"),\r
            remarks: imposedRemarks,\r
            transactionId: imposedTransactionId\r
          }]\r
        : fallbackImposedAmount > 0\r
          ? [{\r
              amount: fallbackImposedAmount,\r
              month: fee.month,\r
              date: fee.imposedDate || fee.date || fee.createdAt,\r
              status: fee.status === "Paid" ? "Imposed" : (fee.status || "Imposed"),\r
              remarks: fee.impositionRemark || fee.remarks || ""\r
            }]\r
          : [];\r
      impositionRows.forEach((imposition, index) => {\r
        const amount = moneyNumber(imposition.amount || 0);\r
        if (!Number.isFinite(amount) || amount <= 0) return;\r
        const dateKey = toDate(imposition.date || fee.imposedDate || fee.date || fee.createdAt)?.toISOString().slice(0, 10).replace(/-/g, "") || "DATE";\r
        const base = String(fee.id || \`\${fee.studentId || getStudentKey() || "student"}-\${fee.month || "fee"}\`)\r
          .replace(/[^a-zA-Z0-9]/g, "")\r
          .slice(-8)\r
          .toUpperCase() || "FEE";\r
        rows.push({\r
          id: \`\${fee.id || fee.month || "fee"}_imposed_\${index}\`,\r
          feeId: fee.id || "",\r
          month: imposition.month || fee.month || "-",\r
          amount,\r
          appliedAmount: 0,\r
          extraAmount: 0,\r
          status: "Fee imposed",\r
          date: imposition.date || fee.imposedDate || fee.date || fee.createdAt,\r
          transactionId: imposition.transactionId || \`IMP-\${base}-\${dateKey}-\${String(index + 1).padStart(2, "0")}\`,\r
          receiptId: "-",\r
          remarks: imposition.remarks || fee.impositionRemark || fee.remarks || "Fee imposed",\r
          source: "fee-imposition"\r
        });\r
      });\r
      const payments = Array.isArray(fee.payments) ? fee.payments : [];\r
      payments.forEach((payment, index) => {\r
        const amount = moneyNumber(payment.receivedAmount ?? payment.appliedAmount ?? payment.amount ?? 0);\r
        if (!Number.isFinite(amount) || amount <= 0) return;\r
        const transactionId = payment.transactionId || payment.txnId || payment.paymentId || generatedTxnId(fee, index);\r
        rows.push({\r
          id: \`\${fee.id || fee.month || "fee"}_\${index}\`,\r
          feeId: fee.id || "",\r
          month: fee.month || payment.month || "-",\r
          amount,\r
          appliedAmount: moneyNumber(payment.appliedAmount ?? payment.amount ?? amount),\r
          extraAmount: moneyNumber(payment.extraAmount ?? 0),\r
          status: payment.status || fee.status || "Paid",\r
          date: payment.date || payment.paidAt || payment.createdAt || fee.lastPaymentDate || fee.updatedAt || fee.date,\r
          transactionId,\r
          receiptId: generatedReceiptId(fee, payment, index),\r
          remarks: payment.remarks || fee.remarks || "",\r
          source: "fee-payment"\r
        });\r
      });\r
      feeFineDetails(fee).forEach((fine, index) => {\r
        const amount = moneyNumber(fine.amount || 0);\r
        if (!Number.isFinite(amount) || amount <= 0) return;\r
        const ruleKey = String(fine.ruleKey || \`\${fee.id || fee.month || "fee"}-fine-\${index}\`);\r
        const txId = \`FINE-\${ruleKey.replace(/[^a-zA-Z0-9]/g, "").slice(-14).toUpperCase()}-\${String(index + 1).padStart(2, "0")}\`;\r
        rows.push({\r
          id: \`\${fee.id || fee.month || "fee"}_fine_\${index}\`,\r
          feeId: fee.id || "",\r
          month: fine.month || fee.month || "-",\r
          amount,\r
          appliedAmount: amount,\r
          extraAmount: 0,\r
          status: "Fine",\r
          date: fine.date || fee.updatedAt || fee.date,\r
          transactionId: txId,\r
          receiptId: "-",\r
          remarks: fine.reason || \`Late fee fine for \${fine.month || fee.month || "fee month"}\`,\r
          source: "fee-fine"\r
        });\r
      });\r
    });\r
\r
    const seen = new Set(rows.map(r => String(r.transactionId || "").toLowerCase()).filter(Boolean));\r
    (state.transactions || []).forEach((tx) => {\r
      const status = String(tx.status || "").toLowerCase();\r
      const amount = moneyNumber(tx.amount || 0);\r
      const transactionId = tx.transactionId || tx.paymentId || tx.id || "";\r
      if (!amount || !transactionId || seen.has(String(transactionId).toLowerCase())) return;\r
      if (status && !status.includes("paid") && !status.includes("captured") && !status.includes("success")) return;\r
      rows.push({\r
        id: tx.id || transactionId,\r
        feeId: tx.feeId || "",\r
        month: tx.month || "-",\r
        amount,\r
        appliedAmount: amount,\r
        extraAmount: 0,\r
        status: tx.status || "Paid",\r
        date: tx.updatedAt || tx.createdAt,\r
        transactionId,\r
        receiptId: tx.receiptId || tx.receiptNo || \`RCP-\${String(transactionId).replace(/[^a-zA-Z0-9]/g,"").slice(-10).toUpperCase()}\`,\r
        remarks: tx.error || tx.remarks || "",\r
        source: "online-transaction"\r
      });\r
    });\r
\r
    return rows.sort((a,b)=>(toDate(b.date)||0)-(toDate(a.date)||0));\r
  }\r
\r
  function parseTimestampMillis(val) {\r
    if (!val) return 0;\r
    if (typeof val?.toMillis === "function") return val.toMillis();\r
    if (typeof val?.toDate === "function") return val.toDate().getTime();\r
    if (val?.seconds) return val.seconds * 1000;\r
    if (val instanceof Date) return val.getTime();\r
    if (typeof val === "number") return val;\r
    if (typeof val === "string") {\r
      const parsed = Date.parse(val);\r
      if (!isNaN(parsed)) return parsed;\r
    }\r
    return 0;\r
  }\r
\r
  function latestReport(r) {\r
    if (!Array.isArray(r) || !r.length) return null;\r
    return [...r].sort((a,b)=>(parseTimestampMillis(b.createdAt || b.updatedAt) - parseTimestampMillis(a.createdAt || a.updatedAt)))[0]||null;\r
  }\r
\r
  /* --- SCHOOL NAME (Permanent, from Firestore) --- */\r
  async function fetchAndSetSchoolName(schoolId) {\r
    if (!schoolId) return;\r
    let cachedName = "";\r
    try { cachedName = localStorage.getItem("schoolixSchoolName_" + schoolId) || ""; } catch {}\r
    let name = firstProfileText(state.session?.schoolName, cachedName, window.SchoolBranding?.getSchoolName?.(), "Schoolix");\r
    let logoUrl = "";\r
    applySchoolName(name);\r
\r
    const schoolSnap = await safeGetDoc(doc(db, "schools", schoolId));\r
    if (schoolSnap?.exists?.()) {\r
      const school = schoolSnap.data();\r
      name = firstProfileText(school.schoolName, school.name, school.instituteName, school.institute, name);\r
      logoUrl = firstProfileText(school.logoUrl, school.schoolLogoUrl, logoUrl);\r
    }\r
\r
    const brandSnap = await safeGetDoc(doc(db, "schools", schoolId, "config", "branding"));\r
    if (brandSnap?.exists?.()) {\r
      const brand = brandSnap.data();\r
      name = firstProfileText(brand.schoolName, brand.name, name);\r
      logoUrl = firstProfileText(brand.logoUrl, brand.schoolLogoUrl, logoUrl);\r
    }\r
\r
    const adminSnap = await safeGetDoc(doc(db, "users", schoolId));\r
    if (adminSnap?.exists?.()) {\r
      const admin = adminSnap.data();\r
      name = firstProfileText(admin.schoolName, admin.instituteName, name);\r
      logoUrl = firstProfileText(admin.logoUrl, admin.schoolLogoUrl, logoUrl);\r
    }\r
\r
    state.schoolName = name;\r
    if (state.session) {\r
      state.session = { ...state.session, schoolId, schoolName: name };\r
      saveSession(state.session);\r
    }\r
    try { localStorage.setItem("schoolixSchoolName_" + schoolId, name); } catch {}\r
    if (logoUrl) window.SchoolBranding?.persistSchoolLogo?.(logoUrl);\r
    applySchoolName(name);\r
  }\r
\r
  function applySchoolName(name) {\r
    if (!name) return;\r
    state.schoolName = name;\r
    if ($("sidebarSchoolName")) $("sidebarSchoolName").textContent = name;\r
    if ($("pdSchoolName")) $("pdSchoolName").textContent = name;\r
    // Also update welcome bar subtitle\r
    if ($("welcomeSub")) {\r
      $("welcomeSub").textContent = name;\r
    }\r
    window.SchoolBranding?.persistSchoolName?.(name);\r
  }\r
\r
  async function loadAttendanceTeacherLookup() {\r
    state.teacherLookup = new Map();\r
    if (!state.schoolId) return;\r
    try {\r
      const teachersSnap = await getDocs(collection(db, "schools", state.schoolId, "teachers"));\r
      teachersSnap.docs.forEach((teacherDoc) => {\r
        const teacher = teacherDoc.data() || {};\r
        const name = teacher.name || teacher.teacherName || teacher.fullName || "Teacher";\r
        [teacherDoc.id, teacher.uid, teacher.teacherId, teacher.email].filter(Boolean).forEach((key) => {\r
          state.teacherLookup.set(String(key), name);\r
        });\r
      });\r
    } catch (error) {\r
      console.warn("Teacher lookup fetch failed:", error);\r
    }\r
  }\r
\r
  /* --- PLACEMENT HELPERS --- */\r
  function getPlacementForSession(sessionId = state.activeSessionId) {\r
    if (!state.profile || !sessionId) return null;\r
    const placements = state.profile.sessionPlacements || {};\r
    if (placements[sessionId]) return placements[sessionId];\r
    const session = state.sessions.find(s => s.id === sessionId);\r
    const label = getSessionLabel(session);\r
    return Object.values(placements).find(p =>\r
      p?.sessionId === sessionId ||\r
      (label && (p?.session === label || p?.currentYear === label))\r
    ) || null;\r
  }\r
\r
  function getClassForSession() {\r
    const p = getPlacementForSession();\r
    return p?.class || state.profile?.class || "";\r
  }\r
  function getSectionForSession() {\r
    const p = getPlacementForSession();\r
    return p?.section || state.profile?.section || "";\r
  }\r
  function getRollForSession() {\r
    const p = getPlacementForSession();\r
    return p?.roll || state.profile?.roll || state.profile?.rollNo || "";\r
  }\r
\r
  function badgeCls(s) {\r
    const n=String(s||"").toLowerCase();\r
    if(n==="present") return "present"; if(n==="absent") return "absent"; if(n==="half day") return "half";\r
    if(n==="paid") return "paid"; if(n==="partial paid"||n==="partial") return "partial"; if(n==="unpaid") return "unpaid";\r
    if(n==="issued") return "issued"; if(n==="returned") return "returned"; if(n==="overdue") return "overdue";\r
    return "pending";\r
  }\r
\r
  function termKey(t) {\r
    return String(t||"").trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");\r
  }\r
\r
  function cleanTermToken(t) {\r
    return String(t || "").trim().toLowerCase().replace(/[^a-z0-9]/g, "");\r
  }\r
\r
  function termKeysMatch(k1, k2) {\r
    if (!k1 || !k2) return false;\r
    const s1 = cleanTermToken(k1);\r
    const s2 = cleanTermToken(k2);\r
    return s1.length > 0 && s1 === s2;\r
  }\r
\r
  function getReportRemarks(obtained, maxMarks) {\r
    if (obtained == null || isNaN(obtained)) return "Not evaluated";\r
    const max = Number(maxMarks || 100);\r
    const pct = max ? (Number(obtained) / max) * 100 : 0;\r
    if (pct >= 85) return "Excellent";\r
    if (pct >= 70) return "Very Good";\r
    if (pct >= 50) return "Good";\r
    if (pct >= 33) return "Satisfactory";\r
    return "Needs Improvement";\r
  }\r
\r
  function getReportGrade(pct) {\r
    const p = Number(pct || 0);\r
    if (p >= 90) return "A+";\r
    if (p >= 80) return "A";\r
    if (p >= 60) return "B";\r
    if (p >= 33) return "C";\r
    return "F";\r
  }\r
\r
  function getReportTermKey(report = {}) {\r
    return report.termKey || termKey(report.termLabel || report.term || "");\r
  }\r
\r
  function getResultVisibilityKey(termKeyValue) {\r
    if (!termKeyValue) return "";\r
    const sessionId = state.activeSessionId || "";\r
    return sessionId ? \`\${sessionId}__\${termKeyValue}\` : termKeyValue;\r
  }\r
\r
  function isResultTermLive(termKeyValue) {\r
    if (!termKeyValue) return true;\r
    const visibilityMap = state.resultVisibility;\r
    if (!visibilityMap || typeof visibilityMap !== "object" || Object.keys(visibilityMap).length === 0) {\r
      return true;\r
    }\r
\r
    const directKey = getResultVisibilityKey(termKeyValue);\r
    const bareKey = termKeyValue;\r
    const normKey = cleanTermToken(termKeyValue);\r
\r
    let entry = visibilityMap[directKey] || visibilityMap[bareKey];\r
    if (!entry) {\r
      entry = Object.values(visibilityMap).find(v => {\r
        if (!v) return false;\r
        const candidateKey = cleanTermToken(v.termKey || v.termLabel || v.term || "");\r
        return candidateKey && candidateKey === normKey;\r
      });\r
    }\r
\r
    if (entry && typeof entry === "object") {\r
      return entry.live !== false;\r
    }\r
\r
    return true;\r
  }\r
\r
  function filterLiveReportsForStudent(reports = []) {\r
    return reports.filter(report => isResultTermLive(getReportTermKey(report)));\r
  }\r
\r
  function filterLiveTermsForStudent(terms = []) {\r
    return terms.filter(term => {\r
      const key = term.termKey || termKey(term.label || term.term || term.name || term.id || "");\r
      return isResultTermLive(key);\r
    });\r
  }\r
\r
  /* --- RENDER: PROFILE --- */\r
  function renderProfile(p) {\r
    const school = state.schoolName || window.SchoolBranding?.getSchoolName?.() || "Schoolix Academy";\r
    const status = p.status || (p.tcIssued ? "TC Issued" : state.isArchived ? "Passed Out" : "Active");\r
    const items = [\r
      ["Full Name", p.name], ["Student ID", p.studentId||getStudentKey()],\r
      ["SR Number", p.srNumber],\r
      ["Class", getClassForSession()], ["Section", getSectionForSession()], ["Roll No.", getRollForSession()],\r
      ["Status", status], ["Admission Date", fmtDate(p.admissionDate || p.dateOfAdmission)],\r
      ["Date of Birth", fmtDate(p.dob)], ["Gender", p.gender], ["Category", p.category],\r
      ["Aadhaar Number", p.aadharNumber], ["Blood Group", p.bloodGroup], ["Religion", p.religion],\r
      ["Father's Name", p.father], ["Mother's Name", p.mother],\r
      ["Father's Phone", p.fatherPhone||p.fatherMobile||p.fatherContact||p.phone],\r
      ["Mother's Phone", p.motherPhone||p.motherMobile||p.motherContact||p.phone],\r
      ["Phone", p.phone], ["Email", p.email],\r
      ["Parent Email", p.parentEmail || p.fatherEmail || p.motherEmail],\r
      ["Previous School", p.previousSchool], ["Address", p.address],\r
      ["Document List", p.documentList || p.documents],\r
      ["Academic Year", p.currentYear], ["Year of Admission", p.yearOfAdmission], ["School", school]\r
    ];\r
    $("profileGrid").innerHTML = \`<div style="grid-column:1/-1">\${renderStudentPhoto(p)}</div>\` + items.map(([l,v]) => \`\r
      <div class="profile-item"><strong>\${esc(l)}</strong><span>\${esc(v||"-")}</span></div>\r
    \`).join("");\r
    renderArchiveDetails(p);\r
  }\r
\r
  function renderArchiveDetails(p = {}) {\r
    const card = $("archiveDetailsCard");\r
    const grid = $("archiveDetailsGrid");\r
    if (!card || !grid) return;\r
    if (!state.isArchived) {\r
      card.classList.add("hidden");\r
      grid.innerHTML = "";\r
      return;\r
    }\r
    const tc = p.transferCertificate || {};\r
    const finalClass = [p.finalClass || p.class, p.finalSection || p.section].filter(Boolean).join("-");\r
    const baseStatus = p.status || (p.tcIssued ? "TC Issued" : "Passed Out");\r
    const statusText = p.tcIssued && baseStatus !== "TC Issued" ? \`\${baseStatus} + TC Issued\` : baseStatus;\r
    const items = [\r
      ["Archive Status", statusText],\r
      ["Passout Year", p.passoutYear],\r
      ["Archive Reason", p.archiveReason],\r
      ["Final Class", finalClass],\r
      ["TC Number", p.tcNumber || tc.tcNumber],\r
      ["TC Leaving Date", tc.leavingDate],\r
      ["TC Reason", tc.reason],\r
      ["TC Conduct", tc.conduct],\r
      ["Archived Attendance", normalizeArchivedArray(p.records?.attendance).length],\r
      ["Archived Fee Records", normalizeArchivedArray(p.records?.fees).length],\r
      ["Archived Report Cards", normalizeArchivedArray(p.records?.reportCards).length]\r
    ];\r
    grid.innerHTML = items.map(([label, value]) => \`\r
      <div class="archive-item"><strong>\${esc(label)}</strong><span>\${esc(value || "-")}</span></div>\r
    \`).join("");\r
    card.classList.remove("hidden");\r
  }\r
\r
  /* --- RENDER: ATTENDANCE --- */\r
  function populateAttendanceMonthFilter(records = []) {\r
    const select = $("attendanceMonthFilter");\r
    if (!select) return;\r
    const preferredMonth = currentMonthKey();\r
    const current = state.attendanceMonthFilterTouched\r
      ? (state.attendanceMonthFilter || "")\r
      : (state.attendanceMonthFilter || select.value || preferredMonth);\r
    const months = [...new Set([preferredMonth, ...records.map(getAttendanceMonthKey).filter(Boolean)].filter(Boolean))]\r
      .sort((a, b) => b.localeCompare(a));\r
    select.innerHTML = \`<option value="">All months</option>\` + months.map((key) =>\r
      \`<option value="\${esc(key)}">\${esc(monthLabelFromKey(key))}</option>\`\r
    ).join("");\r
    if (current === "") {\r
      select.value = "";\r
      state.attendanceMonthFilter = "";\r
    } else if (current && months.includes(current)) {\r
      select.value = current;\r
      state.attendanceMonthFilter = current;\r
    } else {\r
      select.value = preferredMonth;\r
      state.attendanceMonthFilter = preferredMonth;\r
    }\r
  }\r
\r
  window.onAttendanceMonthChange = function() {\r
    state.attendanceMonthFilter = $("attendanceMonthFilter")?.value || "";\r
    state.attendanceMonthFilterTouched = true;\r
    renderAttendance(state.attendance);\r
  };\r
\r
  function renderAttendance(records) {\r
    populateAttendanceMonthFilter(records);\r
    const visibleRecords = state.attendanceMonthFilter\r
      ? records.filter((record) => getAttendanceMonthKey(record) === state.attendanceMonthFilter)\r
      : records;\r
    const s = calcAttendance(visibleRecords);\r
    $("attPct").textContent     = s.total ? \`\${s.percentage}%\` : "-";\r
    $("attTotal").textContent   = \`\${s.total} total records\`;\r
    $("attPresent").textContent = s.total ? s.present : "-";\r
    $("attHalf").textContent    = s.total ? s.half    : "-";\r
    $("attAbsent").textContent  = s.total ? s.absent  : "-";\r
\r
    if ($("attendanceFilterNote")) {\r
      const monthText = state.attendanceMonthFilter ? monthLabelFromKey(state.attendanceMonthFilter) : "all months";\r
      $("attendanceFilterNote").textContent = \`Showing \${monthText} for \${state.activeSessionLabel || "selected session"}.\`;\r
    }\r
\r
    if (!visibleRecords.length) {\r
      $("attendanceTable").innerHTML = \`<tr><td colspan="4"><div class="empty-state"><div class="empty-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg></div>No attendance records found yet.</div></td></tr>\`;\r
      return;\r
    }\r
    $("attendanceTable").innerHTML = visibleRecords.map(r => {\r
      const status = r.status || "Pending";\r
      const markedBy = getAttendanceMarkerName(r);\r
      return \`<tr>\r
        <td>\${esc(fmtDate(r.date))}</td>\r
        <td><span class="badge \${badgeCls(status)}">\${esc(status)}</span></td>\r
        <td style="color:var(--text2)">\${esc(markedBy)}</td>\r
        <td style="color:var(--text2)">\${esc(r.remarks||"-")}</td>\r
      </tr>\`;\r
    }).join("");\r
  }\r
\r
  function getAttendanceMarkerName(record) {\r
    const role = String(record.markedByRole || record.source || record.createdByRole || "").toLowerCase();\r
    if (role.includes("admin")) return record.markedBy || "Admin Staff";\r
\r
    const directName = record.markedBy || record.teacherName || record.createdByName || record.updatedByName;\r
    if (directName) return directName;\r
\r
    const teacherKey = record.teacherId || record.teacherUid || record.markedByUid || record.createdBy;\r
    if (teacherKey && state.teacherLookup?.has(teacherKey)) return state.teacherLookup.get(teacherKey);\r
    if (teacherKey) return "Teacher";\r
\r
    return "Admin Staff";\r
  }\r
\r
  /* --- RENDER: FEES --- */\r
  function renderFees(fees) {\r
    const unique = uniqueFeesByMonth(fees);\r
    const s = calcFees(fees);\r
\r
    $("feesTotal").textContent  = s.total ? fmt(s.total) : "-";\r
    $("feesPaid").textContent   = s.collected ? fmt(s.collected) : "-";\r
    $("feesDue").textContent    = fmt(s.due);\r
    $("feesMonths").textContent = s.extra > 0 ? \`\${unique.length} month(s)  -  Extra \${fmt(s.extra)}\` : \`\${unique.length} month(s)\`;\r
\r
    if (!unique.length) {\r
      $("feesTable").innerHTML = \`<tr><td colspan="7"><div class="empty-state"><div class="empty-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><rect x="1" y="6" width="22" height="13" rx="2"/><path d="M1 10h22"/></svg></div>No fee records found yet.</div></td></tr>\`;\r
      renderFeeTransactions();\r
      return;\r
    }\r
    $("feesTable").innerHTML = unique.map(f => {\r
      const amt  = moneyNumber(f.amount??f.originalAmount??0);\r
      const paid = moneyNumber(f.totalPaidAmount??f.paidAmount??0);\r
      const extra = feeExtraAmount(f);\r
      const collected = paid + extra;\r
      const fine = feeFineAmount(f);\r
      const due  = moneyNumber(f.remainingAmount??Math.max(0,amt-paid));\r
      const status = f.status||"Pending";\r
      const fJson = JSON.stringify(f).replace(/'/g, "&#39;").replace(/"/g, "&quot;");\r
      return \`<tr>\r
        <td style="font-weight:700;color:var(--text)">\${esc(f.month||"-")}</td>\r
        <td>\${esc(fmt(amt))}\${fine > 0 ? \`<div style="font-size:12px;color:#b45309;margin-top:4px;">Fine \${esc(fmt(fine))}</div>\` : ""}</td>\r
        <td style="font-weight:800;color:var(--green)">\${esc(fmt(collected))}\${extra > 0 ? \`<div style="font-size:12px;color:var(--teal);margin-top:4px;">Includes extra \${esc(fmt(extra))}</div>\` : ""}</td>\r
        <td style="color:\${due>0?"var(--rose)":"var(--text2)"}">\${esc(fmt(due))}</td>\r
        <td><span class="badge \${badgeCls(status)}">\${esc(status)}</span></td>\r
        <td style="color:var(--text2);font-size:12px;max-width:220px;white-space:normal;">\${esc(f.remarks || f.impositionRemark || "-")}</td>\r
        <td>\r
          \${paid > 0\r
            ? \`<button class="receipt-trigger-btn" onclick='openReceipt(\${fJson})'>Receipt</button>\`\r
            : due > 0 ? "" : \`<span style="color:var(--text3);font-size:12px">-</span>\`\r
          }\r
        </td>\r
      </tr>\`;\r
    }).join("");\r
    renderFeeTransactions();\r
  }\r
\r
  function renderFeeTransactions() {\r
    const box = $("feeTransactionsTable");\r
    if (!box) return;\r
    const rows = buildFeeTransactions();\r
    if (!rows.length) {\r
      box.innerHTML = \`<tr><td colspan="8"><div class="empty-state">No payment transactions yet.</div></td></tr>\`;\r
      return;\r
    }\r
    box.innerHTML = rows.map((tx) => {\r
      const status = String(tx.status || "pending");\r
      const cls = status.toLowerCase().includes("paid") || status.toLowerCase().includes("captured")\r
        ? "paid"\r
        : status.toLowerCase().includes("fail")\r
          ? "unpaid"\r
          : "pending";\r
      const txJson = JSON.stringify(tx).replace(/'/g, "&#39;").replace(/"/g, "&quot;");\r
      const isFine = tx.source === "fee-fine";\r
      const isImposition = tx.source === "fee-imposition";\r
      return \`<tr>\r
        <td>\${esc(fmtDateTime(tx.date))}</td>\r
        <td>\${esc(tx.month || "-")}</td>\r
        <td style="font-weight:800;color:var(--text)">\${esc(fmt(tx.amount || 0))}\${moneyNumber(tx.extraAmount) > 0 ? \`<div style="font-size:12px;color:var(--teal);margin-top:4px;">Extra \${esc(fmt(tx.extraAmount))}</div>\` : ""}</td>\r
        <td><span class="badge \${cls}">\${esc(status)}</span></td>\r
        <td style="font-size:12px;color:var(--text2);max-width:260px;white-space:normal;">\${esc(tx.remarks || (isFine ? "Late fee fine" : "-"))}</td>\r
        <td style="font-size:12px;color:var(--text2);word-break:break-all;" title="\${esc(tx.transactionId || "-")}">\${esc(compactId(tx.transactionId))}</td>\r
        <td style="font-size:12px;color:var(--text2);word-break:break-all;" title="\${esc(tx.receiptId || "-")}">\${esc(compactId(tx.receiptId))}</td>\r
        <td>\${isFine || isImposition ? \`<span style="color:var(--text3);font-size:12px">-</span>\` : \`<button class="receipt-trigger-btn" onclick='openTransactionReceipt(\${txJson})'>Receipt</button>\`}</td>\r
      </tr>\`;\r
    }).join("");\r
  }\r
\r
  /* --- RENDER: TERM DROPDOWN --- */\r
  function renderTermDropdown(terms) {\r
    const sel = $("studentTermSelect");\r
    if (!sel) return;\r
    if (isResultLocked()) {\r
      sel.innerHTML = \`<option value="">Results locked until dues are cleared</option>\`;\r
      sel.disabled = true;\r
      renderResultLockedPanel();\r
      return;\r
    }\r
    sel.disabled = false;\r
    const uniqueTerms = [];\r
    const seen = new Set();\r
    terms.forEach(t => {\r
      const key = t.termKey || termKey(t.label||t.term||"");\r
      if (!key || seen.has(cleanTermToken(key))) return;\r
      seen.add(cleanTermToken(key));\r
      uniqueTerms.push({ ...t, termKey: key });\r
    });\r
    if (!uniqueTerms.length) {\r
      sel.innerHTML = \`<option value="">- No terms available -</option>\`;\r
      $("resultPanel").innerHTML = \`<div class="empty-state"><div class="empty-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg></div>No terms or report cards available for this session.</div>\`;\r
      return;\r
    }\r
    sel.innerHTML = \`<option value="">- Select a term -</option>\`;\r
    uniqueTerms.forEach(t => {\r
      const opt = document.createElement("option");\r
      opt.value = t.termKey || termKey(t.label||t.term||"");\r
      opt.textContent = t.label||t.term||t.termKey||"Unknown Term";\r
      sel.appendChild(opt);\r
    });\r
  }\r
\r
  function findReportForTermKey(tk) {\r
    if (!tk) return null;\r
    return state.reports.find(r =>\r
      termKeysMatch(r.termKey, tk) ||\r
      termKeysMatch(r.termLabel || r.term || "", tk)\r
    ) || null;\r
  }\r
\r
  window.onStudentTermChange = function() {\r
    if (isResultLocked()) {\r
      renderResultLockedPanel();\r
      openResultDueModal();\r
      return;\r
    }\r
    const tk = $("studentTermSelect").value;\r
    if (!tk) {\r
      $("resultPanel").innerHTML = \`<div class="empty-state"><div class="empty-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg></div>Select a term above to view your report card.</div>\`;\r
      return;\r
    }\r
    renderReportForTerm(tk);\r
  };\r
\r
  function renderReportForTerm(tk) {\r
    if (isResultLocked()) {\r
      renderResultLockedPanel();\r
      return;\r
    }\r
    const report = findReportForTermKey(tk);\r
    if (!report) {\r
      $("resultPanel").innerHTML = \`<div class="empty-state"><div class="empty-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg></div>No marks or report card recorded for this term yet.</div>\`;\r
      return;\r
    }\r
    renderReportPanel(report);\r
  }\r
\r
  function renderReportPanel(report) {\r
    if (isResultLocked()) {\r
      renderResultLockedPanel();\r
      return;\r
    }\r
    if (!report) { $("resultPanel").innerHTML = \`<div class="empty-state">No report card available.</div>\`; return; }\r
    const subjects = Array.isArray(report.subjects) ? report.subjects : [];\r
    const pct = Number(report.percentage||0);\r
    const profile = state.profile||{};\r
    const classInfo = \`\${report.student?.class||getClassForSession()||profile.class||"-"}-\${report.student?.section||getSectionForSession()||profile.section||"-"}\`;\r
    const termLabel = report.termLabel||report.term||"Report Card";\r
    const grade = report.grade||"-";\r
    const gradeColor = grade==="A+"?"var(--green)":grade==="A"?"var(--blue)":grade==="B"?"var(--amber)":grade==="C"?"#fb923c":"var(--rose)";\r
    const gradeBg    = grade==="A+"?"var(--green-dim)":grade==="A"?"var(--blue-dim)":grade==="B"?"var(--amber-dim)":grade==="C"?"rgba(251,146,60,0.1)":"var(--rose-dim)";\r
\r
    $("resultPanel").innerHTML = \`\r
      <div class="report-card">\r
        <div class="report-header">\r
          <div>\r
            <h3>\${esc(termLabel)}</h3>\r
            <div class="report-meta">\r
              <strong>Student:</strong> \${esc(report.student?.name||profile.name||"-")}\r
              &nbsp;&middot;&nbsp;<strong>ID:</strong> \${esc(report.student?.studentId||getStudentKey())}\r
              &nbsp;&middot;&nbsp;<strong>Class:</strong> \${esc(classInfo)}<br>\r
              <strong>Percentage:</strong> \${pct?\`\${Math.round(pct)}%\`:"-"}\r
              &nbsp;&middot;&nbsp;<strong>Total Marks:</strong> \${esc(String(report.totalMarks??"-"))}/\${esc(String(report.totalMaxMarks??"-"))}\r
              &nbsp;&middot;&nbsp;<strong>Generated:</strong> \${esc(fmtDate(report.createdAt))}\r
            </div>\r
          </div>\r
          <div class="grade-pill" style="background:\${gradeBg};color:\${gradeColor};border:1px solid \${gradeColor}33;">\${esc(grade)}</div>\r
        </div>\r
        \${subjects.length ? \`\r
          <div class="subjects-table">\r
            <div class="subject-row subject-header">\r
              <div>Subject</div><div>Obtained</div><div>Max Marks</div><div>Remarks</div>\r
            </div>\r
            \${subjects.map(sub => {\r
              const ob = (sub.obtained != null && sub.obtained !== "" && !isNaN(sub.obtained)) ? Number(sub.obtained) : "";\r
              const max = Number(sub.maxMarks??sub.max??100);\r
              const sp = max ? Math.round((ob!==""?ob:0)/max*100) : 0;\r
              const col = sp>=75?"var(--green)":sp>=40?"var(--amber)":"var(--rose)";\r
              return \`<div class="subject-row">\r
                <div style="font-weight:600;color:var(--text)">\${esc(sub.name||sub.subject||"Subject")}</div>\r
                <div style="font-weight:700;color:\${col}">\${ob!==""?esc(String(ob)):"-"}</div>\r
                <div style="color:var(--text2)">\${esc(String(max))}</div>\r
                <div style="color:var(--text2);font-size:13px">\${esc(sub.remarks||"-")}</div>\r
              </div>\`;\r
            }).join("")}\r
          </div>\r
        \` : \`<div class="empty-state" style="margin:20px;border-radius:var(--r-md)">No subject-wise marks available.</div>\`}\r
      </div>\r
    \`;\r
  }\r
\r
  /* --- RENDER: TRANSPORT --- */\r
  function normalizeTransportVehicle(row) {\r
    const vehicle = row?.vehicle || row;\r
    if (!vehicle) return null;\r
    const data = vehicle.data || {};\r
    return {\r
      id: vehicle.id,\r
      vehicleNumber: vehicle.vehicleNumber || vehicle.vehicle_number || data.vehicleNumber || "-",\r
      vehicleType: vehicle.vehicleType || vehicle.vehicle_type || data.vehicleType || "Bus",\r
      capacity: vehicle.capacity || data.capacity || 0,\r
      driverName: vehicle.driverName || data.driverName || "-",\r
      driverPhone: vehicle.driverPhone || data.driverPhone || data.phone || "-",\r
      driverEmail: vehicle.driverEmail || data.driverEmail || "",\r
      routeId: vehicle.routeId || vehicle.route_id || row?.route_id || "",\r
      routeName: vehicle.routeName || data.routeName || "",\r
      routeFrom: vehicle.routeFrom || data.routeFrom || "",\r
      routeTo: vehicle.routeTo || data.routeTo || "",\r
      routeVia: vehicle.routeVia || data.routeVia || [],\r
      studentTracking: vehicle.studentTracking || data.studentTracking || {},\r
      ...data\r
    };\r
  }\r
\r
  async function resolveStudentTransport(recordStudentId) {\r
    const assignedVehicleId = state.profile?.assignedVehicleId || state.profile?.vehicleId;\r
    if (assignedVehicleId) {\r
      const vSnap = await safeGetDoc(doc(db,"schools",state.schoolId,"vehicles",assignedVehicleId));\r
      if (vSnap?.exists?.()) {\r
        const vehicle = { id: vSnap.id, ...vSnap.data() };\r
        if (vehicle.routeId) {\r
          const rtSnap = await safeGetDoc(doc(db,"schools",state.schoolId,"routes",vehicle.routeId));\r
          if (rtSnap?.exists?.()) vehicle.route = { id: rtSnap.id, ...rtSnap.data() };\r
        }\r
        return vehicle;\r
      }\r
    }\r
\r
    const transportRow = await parentVehicleForStudent(state.schoolId, recordStudentId).catch((error) => {\r
      console.warn("Student transport lookup unavailable", error);\r
      return null;\r
    });\r
    const vehicle = normalizeTransportVehicle(transportRow);\r
    if (!vehicle) return null;\r
    if (vehicle.routeId) {\r
      const rtSnap = await safeGetDoc(doc(db,"schools",state.schoolId,"routes",vehicle.routeId)).catch(() => null);\r
      if (rtSnap?.exists?.()) vehicle.route = { id: rtSnap.id, ...rtSnap.data() };\r
    }\r
    return vehicle;\r
  }\r
\r
  function renderTransport(vehicle) {\r
    if (!vehicle) {\r
      $("transportPanel").innerHTML = \`<div class="empty-state">\r
        <div class="empty-icon">\r
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M6 3h12a1 1 0 0 1 1 1v3h2a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-1v3H5v-3H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h2V4a1 1 0 0 1 1-1z"/><circle cx="9" cy="17" r="2"/><circle cx="15" cy="17" r="2"/></svg>\r
        </div>\r
        No vehicle has been assigned to you yet. Please contact your school.\r
      </div>\`;\r
      return;\r
    }\r
\r
    const route = vehicle.route || {};\r
    const viaStops = Array.isArray(vehicle.viaStops) ? vehicle.viaStops : [];\r
    \r
    // Check multiple field names for driver contact\r
    const driverContact = vehicle.driverContact || vehicle.driverPhone || vehicle.contact || vehicle.phone || "-";\r
    \r
    // Get pickup and drop-off times and places for this student\r
    const studentTracking = vehicle.studentTracking || {};\r
    let sk = getStudentKey();\r
    const myTracking = studentTracking[sk] || {};\r
    const pickupTime = myTracking.pickupTime || "-";\r
    const dropoffTime = myTracking.dropoffTime || "-";\r
    const pickupPlace = myTracking.pickupPlace || route.pickupPoint || vehicle.pickupPoint || "-";\r
    const dropoffPlace = myTracking.dropoffPlace || route.dropoffPoint || vehicle.dropoffPoint || "-";\r
\r
    $("transportPanel").innerHTML = \`\r
      <div class="card">\r
        <div class="card-title" style="color:var(--blue);margin-bottom:20px">\r
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 3h12a1 1 0 0 1 1 1v3h2a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-1v3H5v-3H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h2V4a1 1 0 0 1 1-1z"/><circle cx="9" cy="17" r="2"/><circle cx="15" cy="17" r="2"/></svg>\r
          Vehicle Details\r
        </div>\r
        <div style="border:1px solid var(--border);border-radius:var(--r-lg);overflow:hidden;margin-bottom:20px;background:var(--bg3)">\r
          <div style="padding:14px 16px;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;gap:12px;align-items:center;flex-wrap:wrap">\r
            <div>\r
              <div style="font-size:13px;font-weight:800;color:var(--text)">Track Bus</div>\r
              <div id="transportLiveStatus" style="font-size:12px;color:var(--text3);margin-top:3px">Checking active trip...</div>\r
            </div>\r
            <span id="transportLiveBadge" class="badge">Waiting</span>\r
          </div>\r
          <div id="studentTransportMap" style="height:320px"></div>\r
        </div>\r
        \r
        <div class="profile-grid" style="margin-bottom:24px">\r
          <div class="profile-item">\r
            <strong>Vehicle Number</strong>\r
            <span>\${esc(vehicle.vehicleNumber||"-")}</span>\r
          </div>\r
          <div class="profile-item">\r
            <strong>Vehicle Type</strong>\r
            <span>\${esc(vehicle.vehicleType||"-")}</span>\r
          </div>\r
          <div class="profile-item">\r
            <strong>Seating Capacity</strong>\r
            <span>\${esc(String(vehicle.capacity||"-"))} seats</span>\r
          </div>\r
        </div>\r
\r
        <div style="border-top:1px solid var(--border);padding-top:20px;margin-bottom:24px">\r
          <h3 style="font-size:14px;font-weight:700;color:var(--text);margin-bottom:16px">Driver Information</h3>\r
          <div class="profile-grid">\r
            <div class="profile-item">\r
              <strong>Driver Name</strong>\r
              <span>\${esc(vehicle.driverName||"-")}</span>\r
            </div>\r
            <div class="profile-item">\r
              <strong>Driver Contact</strong>\r
              <span style="color:var(--blue);font-weight:600">\${esc(String(driverContact))}</span>\r
            </div>\r
          </div>\r
        </div>\r
\r
        \${(route.routeId || vehicle.routeId) ? \`\r
          <div style="border-top:1px solid var(--border);padding-top:20px;">\r
            <h3 style="font-size:14px;font-weight:700;color:var(--text);margin-bottom:16px">Your Route</h3>\r
            <div style="background:var(--bg3);border:1px solid var(--border);border-radius:var(--r-lg);padding:18px;margin-bottom:16px">\r
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px">\r
                <div>\r
                  <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:var(--text3);margin-bottom:6px">Route Name</div>\r
                  <div style="font-size:15px;font-weight:600;color:var(--text)">\${esc(route.routeName || vehicle.routeName || "-")}</div>\r
                </div>\r
                <div>\r
                  <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:var(--text3);margin-bottom:6px">Route ID</div>\r
                  <div style="font-size:15px;font-weight:600;color:var(--blue)">\${esc(route.routeId || vehicle.routeId || "-")}</div>\r
                </div>\r
              </div>\r
              \r
              <div style="padding:12px;background:var(--panel);border-radius:var(--r-md);border-left:3px solid var(--blue)">\r
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:16px">\r
                <div style="background:rgba(79,144,255,0.08);border:1px solid rgba(79,144,255,0.16);border-radius:var(--r-md);padding:14px">\r
                  <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:var(--blue);margin-bottom:8px"> Pickup Point</div>\r
                  <div style="font-size:15px;font-weight:600;color:var(--text);margin-bottom:8px">\${esc(route.pickupPoint || vehicle.pickupPoint || pickupPlace)}</div>\r
                  <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:var(--text3);margin-bottom:4px">Pickup Time</div>\r
                  <div style="font-size:18px;font-weight:700;color:var(--blue)">\${pickupTime !== "-" ? pickupTime : "Not Set"}</div>\r
                </div>\r
                <div style="background:rgba(52,211,153,0.08);border:1px solid rgba(52,211,153,0.16);border-radius:var(--r-md);padding:14px">\r
                  <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:var(--green);margin-bottom:8px">Drop-off Point</div>\r
                  <div style="font-size:15px;font-weight:600;color:var(--text);margin-bottom:8px">\${esc(route.dropoffPoint || vehicle.dropoffPoint || dropoffPlace)}</div>\r
                  <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:var(--text3);margin-bottom:4px">Drop-off Time</div>\r
                  <div style="font-size:18px;font-weight:700;color:var(--green)">\${dropoffTime !== "-" ? dropoffTime : "Not Set"}</div>\r
                </div>\r
              </div>\r
              <div style="padding:12px;background:var(--panel);border-radius:var(--r-md);border-left:3px solid var(--blue)">\r
                <div style="display:flex;align-items:flex-start;gap:12px;margin-bottom:10px">\r
                  <svg style="width:18px;height:18px;color:var(--blue);flex-shrink:0;margin-top:2px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>\r
                  <div>\r
                    <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:var(--text3)">Pickup Point</div>\r
                    <div style="font-size:14px;font-weight:600;color:var(--text);margin-top:4px">\${esc(route.pickupPoint || vehicle.pickupPoint || pickupPlace)}</div>\r
                  </div>\r
                </div>\r
                \r
                <div style="display:flex;align-items:center;justify-content:center;height:24px;margin:8px 0">\r
                  <svg style="width:20px;height:20px;color:var(--text3)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>\r
                </div>\r
                \r
                <div style="display:flex;align-items:flex-start;gap:12px">\r
                  <svg style="width:18px;height:18px;color:var(--rose);flex-shrink:0;margin-top:2px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>\r
                  <div>\r
                    <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:var(--text3)">Dropoff Point</div>\r
                    <div style="font-size:14px;font-weight:600;color:var(--text);margin-top:4px">\${esc(route.dropoffPoint || vehicle.dropoffPoint || dropoffPlace)}</div>\r
                  </div>\r
                </div>\r
              </div>\r
            </div>\r
            \r
            \${viaStops.length ? \`\r
              <div style="background:var(--teal-dim);border:1px solid rgba(45,212,184,0.3);border-radius:var(--r-md);padding:14px">\r
                <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:var(--teal);margin-bottom:12px">Via Stops on This Route</div>\r
                <div style="display:flex;flex-direction:column;gap:8px">\r
                  \${viaStops.map((stop, idx) => \`\r
                    <div style="display:flex;align-items:center;gap:10px;padding:8px;background:rgba(45,212,184,0.1);border-radius:var(--r-sm)">\r
                      <div style="width:24px;height:24px;background:var(--teal);color:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:12px">\${idx + 1}</div>\r
                      <div style="font-size:13.5px;color:var(--text)">\${esc(stop)}</div>\r
                    </div>\r
                  \`).join("")}\r
                </div>\r
              </div>\r
            \` : ""}\r
          </div>\r
        \` : ""}\r
      </div>\r
    \`;\r
    initTransportLiveMap(vehicle);\r
  }\r
\r
  async function initTransportLiveMap(vehicle) {\r
    if (transportLiveUnsubscribe) {\r
      transportLiveUnsubscribe();\r
      transportLiveUnsubscribe = null;\r
    }\r
    const mapEl = $("studentTransportMap");\r
    if (!vehicle?.id || !mapEl) return;\r
    transportLiveMap = await createVehicleMap(mapEl, { zoom: 15, recenterLabel: "Show my bus" });\r
    const update = async () => {\r
      const rows = await liveLocations([vehicle.id]).catch(() => []);\r
      const status = $("transportLiveStatus");\r
      const badge = $("transportLiveBadge");\r
      if (!rows.length) {\r
        if (status) status.textContent = "Your child's vehicle is currently not on an active trip.";\r
        if (badge) badge.textContent = "OFF";\r
        clearMapMissing(transportLiveMap, []);\r
        return;\r
      }\r
      const loc = rows[0];\r
      const liveState = locationStatus(loc.updated_at);\r
      transportLiveMap?.setVehicle(vehicle.id, loc, vehicle.vehicleNumber || "Bus", {\r
        driver: vehicle.driverName || "",\r
        route: vehicle.routeName || "",\r
        status: liveState\r
      });\r
      if (status) status.textContent = \`Last updated: \${formatTransportLiveAge(loc.updated_at)}\`;\r
      if (badge) badge.textContent = liveState.toUpperCase();\r
    };\r
    await update();\r
    transportLiveUnsubscribe = subscribeTransport("schoolix_vehicle_live_locations", \`vehicle_id=eq.\${vehicle.id}\`, update, update);\r
  }\r
\r
  function formatTransportLiveAge(value) {\r
    if (!value) return "-";\r
    const seconds = Math.max(0, Math.round((Date.now() - new Date(value).getTime()) / 1000));\r
    if (seconds < 60) return \`\${seconds} seconds ago\`;\r
    return \`\${Math.round(seconds / 60)} minutes ago\`;\r
  }\r
\r
  /* LIBRARY */\r
  function renderLibrary(issues) {\r
    const rows = [...issues].sort((a,b)=>(getLibraryIssuedDate(b)?.getTime()||0)-(getLibraryIssuedDate(a)?.getTime()||0));\r
    const issued = rows.filter(r => r.status === "issued").length;\r
    const returned = rows.filter(r => r.status === "returned").length;\r
    const overdue = rows.filter(isLibraryOverdue).length;\r
\r
    if ($("libIssued")) $("libIssued").textContent = issued ? String(issued) : "-";\r
    if ($("libReturned")) $("libReturned").textContent = returned ? String(returned) : "-";\r
    if ($("libOverdue")) $("libOverdue").textContent = overdue ? String(overdue) : "-";\r
    if ($("libMaxDays")) $("libMaxDays").textContent = \`Max \${state.librarySettings.maxDays} day(s) permitted\`;\r
\r
    if (!$("libraryTable")) return;\r
    if (!rows.length) {\r
      $("libraryTable").innerHTML = \`<tr><td colspan="6"><div class="empty-state"><div class="empty-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M4 4.5A2.5 2.5 0 016.5 2H20v20H6.5A2.5 2.5 0 014 19.5z"/></svg></div>No library records found yet.</div></td></tr>\`;\r
      return;\r
    }\r
\r
    $("libraryTable").innerHTML = rows.map(entry => {\r
      const status = entry.status === "returned" ? "returned" : isLibraryOverdue(entry) ? "overdue" : "issued";\r
      const statusText = status === "overdue" ? "Overdue" : status === "returned" ? "Returned" : "Issued";\r
      const issuedBy = entry.issuedByName || entry.issuedByEmail || entry.issuedBy || "Library staff";\r
      const bookTitle = entry.bookTitle || "Untitled book";\r
      const bookNumber = entry.bookNumber ? \`Book No. \${entry.bookNumber}\` : "Book number not available";\r
      const dueDate = getLibraryDueDate(entry);\r
      return \`<tr>\r
        <td>\r
          <div style="font-weight:700;color:var(--text)">\${esc(bookTitle)}</div>\r
          <div style="color:var(--text2);font-size:12px;margin-top:3px">\${esc(bookNumber)}</div>\r
        </td>\r
        <td>\${esc(fmtDateTime(entry.issuedAt || entry.issuedAtMs))}</td>\r
        <td>\r
          <div>\${esc(fmtDate(dueDate))}</div>\r
          <div style="color:var(--text3);font-size:12px;margin-top:3px">\${getLibraryMaxDays(entry)} day(s)</div>\r
        </td>\r
        <td>\${entry.returnedAt || entry.returnedAtMs ? esc(fmtDateTime(entry.returnedAt || entry.returnedAtMs)) : '<span style="color:var(--text3)">-</span>'}</td>\r
        <td style="color:var(--text2)">\${esc(issuedBy)}</td>\r
        <td><span class="badge \${badgeCls(status)}">\${esc(statusText)}</span></td>\r
      </tr>\`;\r
    }).join("");\r
  }\r
\r
  /* --- OVERVIEW --- */\r
  function renderOverview() {\r
    const p = state.profile||{};\r
    const att   = calcAttendance(state.attendance);\r
    const fees  = calcFees(state.fees);\r
    const report = latestReport(state.reports);\r
    const records = state.attendance.length + uniqueFeesByMonth(state.fees).length + state.reports.length + state.libraryIssues.length;\r
    const school = state.schoolName || window.SchoolBranding?.getSchoolName?.() || "Schoolix Academy";\r
    const currentClass   = getClassForSession();\r
    const currentSection = getSectionForSession();\r
    const currentRoll    = getRollForSession();\r
\r
    $("welcomeTitle").textContent = \`Welcome back, \${studentDisplayName(p)}\`;\r
    $("welcomeSub").textContent   = school;\r
\r
    $("welcomeBadges").innerHTML = [\r
      currentClass ? \`<span class="w-badge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" style="width:12px;height:12px"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/></svg>Class \${currentClass}-\${currentSection||""}</span>\` : "",\r
      currentRoll  ? \`<span class="w-badge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" style="width:12px;height:12px"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>Roll No. \${currentRoll}</span>\` : "",\r
    ].join("");\r
\r
    $("ovAttendance").textContent = att.total ? \`\${att.percentage}%\` : "-";\r
    $("ovAttendanceSub").textContent = att.total ? \`\${att.present} present  -  \${att.absent} absent\` : "No data yet";\r
    $("ovFeesDue").textContent = fmt(fees.due);\r
    $("ovFeesSub").textContent = uniqueFeesByMonth(state.fees).length ? \`\${uniqueFeesByMonth(state.fees).length} fee record(s)\` : "No records yet";\r
    if (isResultLocked()) {\r
      $("ovResult").textContent = "Locked";\r
      $("ovResultSub").textContent = \`Clear dues \${fmt(getResultDueAmount())} to view\`;\r
    } else {\r
      $("ovResult").textContent  = report ? \`\${Math.round(Number(report.percentage||0))}%\` : "-";\r
      $("ovResultSub").textContent = report ? \`Latest: \${report.termLabel||report.term||"Report Card"}\` : "No report card";\r
    }\r
    $("ovRecords").textContent = String(records);\r
    document.querySelectorAll('.nav-item[data-page="results"]').forEach((item) => {\r
      item.classList.toggle("is-locked", isResultLocked());\r
      item.setAttribute("title", isResultLocked() ? resultLockMessage() : "Report Cards");\r
    });\r
\r
    // Update topbar & dropdown\r
    setAvatarElement("topbarAvatar", p);\r
    $("topbarName").textContent   = studentDisplayName(p);\r
    setAvatarElement("pdAvatar", p);\r
    $("pdName").textContent       = studentDisplayName(p);\r
    $("pdClass").textContent      = currentClass\r
      ? \`Class \${currentClass}\${currentSection ? "-"+currentSection : ""}\${currentRoll ? "  -  Roll "+currentRoll : ""}\`\r
      : "Class -";\r
    $("pdSchoolName").textContent = school;\r
    $("sidebarSchoolName").textContent = school;\r
  }\r
\r
  /* --- SESSION MANAGEMENT --- */\r
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
  function normalizeSchoolSession(id, data = {}) {\r
    const sessionId = String(id || data.id || "").trim();\r
    const label = getSessionLabel({ id: sessionId, ...data }) || sessionId;\r
    return { ...data, id: sessionId || label, session: label, name: data.name || label };\r
  }\r
\r
  function findSessionByValue(value) {\r
    const candidate = String(value || "").trim().toLowerCase();\r
    if (!candidate) return null;\r
    return state.sessions.find((session) => (\r
      [session.id, getSessionLabel(session), session.session, session.name, session.sessionLabel]\r
        .some((entry) => String(entry || "").trim().toLowerCase() === candidate)\r
    )) || null;\r
  }\r
\r
  function sortSessions(sessions) {\r
    return [...sessions].sort((a, b) => {\r
      const aOrder = Number(a.startYear||0) || new Date(a.startDate||a.createdAt?.seconds*1000||a.createdAt||0).getTime();\r
      const bOrder = Number(b.startYear||0) || new Date(b.startDate||b.createdAt?.seconds*1000||b.createdAt||0).getTime();\r
      return bOrder - aOrder;\r
    });\r
  }\r
\r
  function setSelectedSession(sessionId) {\r
    const s = findSessionByValue(sessionId);\r
    if (!s) return false;\r
    state.activeSessionId    = s.id;\r
    state.activeSessionLabel = getSessionLabel(s);\r
    state.activeSessionLocked = s.locked === true;\r
    return true;\r
  }\r
\r
  function setSelectedSessionFromSettings(settings = {}) {\r
    const idCandidates = [\r
      settings.sessionId,\r
      settings.activeSessionId,\r
      settings.currentSessionId,\r
      settings.academicSessionId,\r
      settings.id\r
    ];\r
    const labelCandidates = [\r
      settings.session,\r
      settings.activeSession,\r
      settings.currentSession,\r
      settings.sessionLabel,\r
      settings.currentYear,\r
      settings.academicSession\r
    ];\r
    for (const candidate of [...idCandidates, ...labelCandidates]) {\r
      const match = findSessionByValue(candidate);\r
      if (match) return match;\r
    }\r
    return null;\r
  }\r
\r
  function belongsToSelectedSession(entry) {\r
    if (!entry) return false;\r
    // A session has to be resolved before records can be displayed. Returning\r
    // true here would expose records from every academic session while the\r
    // dashboard is still loading or when the school has no active session.\r
    if (!state.activeSessionId && !state.activeSessionLabel) return false;\r
    if (entry.id && String(entry.id).startsWith(\`\${state.activeSessionId}__\`)) return true;\r
    if (!entry.sessionId && !entry.session && !entry.currentYear && !entry.academicSession) {\r
      return true;\r
    }\r
    return entry.sessionId === state.activeSessionId ||\r
      entry.session === state.activeSessionId ||\r
      entry.currentYear === state.activeSessionId ||\r
      entry.academicSession === state.activeSessionId ||\r
      entry.session === state.activeSessionLabel ||\r
      entry.currentYear === state.activeSessionLabel ||\r
      entry.academicSession === state.activeSessionLabel;\r
  }\r
\r
  function normalizeTermClass(value) {\r
    let raw = String(value || "").trim().toUpperCase();\r
    raw = raw.replace(/^CLASS\\s+/, "").replace(/^GRADE\\s+/, "");\r
    raw = raw.replace(/(\\d+)(ST|ND|RD|TH)\\b/g, "$1");\r
    if (/^\\d+$/.test(raw)) return String(Number(raw));\r
    return raw.trim();\r
  }\r
\r
  function normalizeTermSection(value) {\r
    let raw = String(value || "").trim().toUpperCase();\r
    if (["ALL", "ALL SECTIONS", "ALL SECTION", "ANY", "*", ""].includes(raw)) return "";\r
    return raw.replace(/[^A-Z]/g, "").slice(0, 1);\r
  }\r
\r
  function termMatchesStudentPlacement(term) {\r
    if (!term?.class && !term?.section) return true;\r
    const rawTermClass = String(term.class || "").trim().toUpperCase();\r
    if (["ALL", "ALL CLASSES", "ALL CLASS", "ANY", "*", ""].includes(rawTermClass)) return true;\r
\r
    const termClass = normalizeTermClass(term.class);\r
    const termSection = normalizeTermSection(term.section);\r
    const studentClass = normalizeTermClass(getClassForSession() || state.profile?.class);\r
    const studentSection = normalizeTermSection(getSectionForSession() || state.profile?.section);\r
\r
    if (termClass && studentClass && termClass !== studentClass) return false;\r
    if (termSection && studentSection && termSection !== studentSection) return false;\r
    return true;\r
  }\r
\r
  async function loadStudentSessions({ force = false } = {}) {\r
    const schoolIdAtStart = String(state.schoolId || "").trim();\r
    try {\r
      if (!schoolIdAtStart) return { selectionChanged: false, sessionsChanged: false };\r
      if (force) clearFirestoreReadCache();\r
      state.sessionLoadError = "";\r
\r
      const previousSessionIds = state.sessions.map((session) => session.id).sort().join("|");\r
      const previousSelectedId = state.activeSessionId;\r
      const [sessionsResult, settingsResult] = await Promise.allSettled([\r
        getDocs(collection(db, "schools", schoolIdAtStart, "sessions")),\r
        getDoc(doc(db, "schools", schoolIdAtStart, "settings", "activeSession"))\r
      ]);\r
      if (state.schoolId !== schoolIdAtStart) return { selectionChanged: false, sessionsChanged: false };\r
      if (sessionsResult.status === "rejected") throw sessionsResult.reason;\r
\r
      const snap = sessionsResult.value;\r
      state.sessions = snap.docs.map(d => normalizeSchoolSession(d.id, d.data()));\r
\r
      const settingsSnap = settingsResult.status === "fulfilled" ? settingsResult.value : null;\r
      const schoolActiveSession = settingsSnap?.exists?.()\r
        ? setSelectedSessionFromSettings(settingsSnap.data() || {})\r
        : null;\r
      let configuredSessionMismatch = false;\r
      state.schoolActiveSessionId = schoolActiveSession?.id || "";\r
      if (settingsResult.status === "rejected") {\r
        console.warn("Active session setting load failed:", settingsResult.reason);\r
        state.sessionLoadError = "School sessions loaded, but the active session could not be verified.";\r
      } else if (settingsSnap?.exists?.()) {\r
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
        if (configuredValue && !schoolActiveSession) {\r
          configuredSessionMismatch = true;\r
          state.sessionLoadError = "The school's active-session setting does not match any configured session.";\r
        }\r
      }\r
\r
      const userSelectedSession = findSessionByValue(state.userSelectedSessionId);\r
      const automaticSession = settingsResult.status === "rejected" || configuredSessionMismatch\r
        ? null\r
        : schoolActiveSession || sortSessions(state.sessions)[0] || null;\r
      const preferredSession = userSelectedSession || automaticSession;\r
      if (preferredSession) setSelectedSession(preferredSession.id);\r
      else {\r
        state.activeSessionId = "";\r
        state.activeSessionLabel = "";\r
        state.activeSessionLocked = false;\r
        state.userSelectedSessionId = "";\r
      }\r
\r
      state.sessionsLoadedForSchool = schoolIdAtStart;\r
\r
      populateHeaderSessionSelector();\r
      return {\r
        selectionChanged: previousSelectedId !== state.activeSessionId,\r
        sessionsChanged: previousSessionIds !== state.sessions.map((session) => session.id).sort().join("|")\r
      };\r
    } catch(e) {\r
      console.error("Session load failed:", e);\r
      state.sessions = [];\r
      state.schoolActiveSessionId = "";\r
      state.sessionLoadError = "Unable to load this school's sessions. Check your connection and sign in again if it continues.";\r
      state.activeSessionId = "";\r
      state.activeSessionLabel = "";\r
      state.activeSessionLocked = false;\r
      populateHeaderSessionSelector();\r
      return { selectionChanged: false, sessionsChanged: false, error: e };\r
    }\r
  }\r
\r
  function populateHeaderSessionSelector() {\r
    const sel = $("headerSessionSelector");\r
    if (!sel) return;\r
\r
    sel.innerHTML = "";\r
    sortSessions(state.sessions).forEach(s => {\r
      const opt = document.createElement("option");\r
      opt.value = s.id;\r
      opt.textContent = \`\${getSessionLabel(s)||"Unnamed"}\${s.locked?" (Locked)":""}\`;\r
      if (s.id === state.activeSessionId) opt.selected = true;\r
      sel.appendChild(opt);\r
    });\r
    if (!sel.options.length) {\r
      const opt = document.createElement("option");\r
      opt.value = "";\r
      opt.textContent = state.sessionLoadError ? "Unable to load school sessions" : "No school sessions configured";\r
      sel.appendChild(opt);\r
    }\r
    sel.title = state.sessionLoadError || "Select an academic session";\r
  }\r
\r
  window.onHeaderSessionChange = async function() {\r
    const sel = $("headerSessionSelector");\r
    if (!sel || !sel.value) return;\r
    if (!setSelectedSession(sel.value)) return;\r
    state.userSelectedSessionId = state.activeSessionId;\r
    await loadStudentData();\r
  };\r
\r
  /* --- LOAD DATA --- */\r
  async function loadLibrarySettings() {\r
    state.librarySettings = { maxDays: 14 };\r
    if (!state.schoolId) return;\r
    try {\r
      const snap = await getDoc(doc(db, "schools", state.schoolId, "settings", "library"));\r
      if (snap.exists()) {\r
        state.librarySettings.maxDays = normalizeLibraryMaxDays(snap.data().maxDays);\r
      }\r
    } catch(e) {\r
      console.warn("Library settings fetch failed:", e);\r
    }\r
  }\r
\r
  async function loadStudentData({ forceSessionRefresh = false } = {}) {\r
    if (!state.session) { redirectToLogin(); return; }\r
\r
    $("globalStatus").innerHTML = \`<div class="loading-banner">\r
      <svg style="width:16px;height:16px;animation:spin 1s linear infinite;flex-shrink:0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">\r
        <path d="M23 4v6h-6"/><path d="M1 20v-6h6"/>\r
        <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/>\r
      </svg>\r
      Loading student records...\r
    </div>\`;\r
\r
    let sk = getStudentKey();\r
    if (!sk) {\r
      $("globalStatus").innerHTML = \`<div class="error-banner">Student session is missing. Please sign in again.</div>\`;\r
      return;\r
    }\r
\r
    try {\r
      let sp = {\r
        ...(state.session || {}),\r
        studentId: state.session.studentId||state.session.uid||"",\r
        name: studentDisplayName(state.session), class: state.session.class||"",\r
        section: state.session.section||"", roll: state.session.rollNo||"",\r
        email: state.session.email||"", schoolId: linkedSchoolId(state.session),\r
        schoolName: state.session.schoolName||""\r
      };\r
      setStudentSchoolId(linkedSchoolId(sp));\r
      state.profile = { ...sp };\r
      applySchoolName(firstProfileText(sp.schoolName, cachedSchoolNameFor(state.schoolId), state.schoolName, window.SchoolBranding?.getSchoolName?.(), "Schoolix"));\r
      renderStudentIdentity(state.profile, sp.schoolName);\r
\r
      // Fetch user profile using the authenticated UID first, then fall back to the stored student ID.\r
      const userDoc = await fetchStudentProfileDoc(sk);\r
      if (userDoc) {\r
        sp = {\r
          ...sp,\r
          name: firstProfileText(userDoc.name, userDoc.fullName, userDoc.studentName, sp.name),\r
          class: userDoc.class||sp.class||"",\r
          section: userDoc.section||sp.section||"",\r
          roll: userDoc.rollNo||userDoc.roll||sp.roll||"",\r
          email: userDoc.email||userDoc.authEmail||sp.email||"",\r
          schoolId: linkedSchoolId(userDoc)||sp.schoolId||"",\r
          schoolName: userDoc.schoolName||sp.schoolName||"",\r
          studentDocId: userDoc.studentDocId||sp.studentDocId||userDoc.id||"",\r
          // Keep the authenticated Supabase account as the canonical auth\r
          // bridge. Migrated profile copies can carry an older/deleted UID.\r
          authUid: state.session?.authUid||state.session?.supabaseAuthUid||userDoc.authUid||sp.authUid||"",\r
          supabaseAuthUid: state.session?.supabaseAuthUid||userDoc.supabaseAuthUid||sp.supabaseAuthUid||"",\r
          studentId: userDoc.studentId||sp.studentId||state.session?.studentId||""\r
        };\r
        setStudentSchoolId(linkedSchoolId(sp) || linkedSchoolId(state.session || {}));\r
        state.session = {...state.session,...sp,schoolId:state.schoolId};\r
        saveSession(state.session);\r
        applySchoolName(firstProfileText(sp.schoolName, cachedSchoolNameFor(state.schoolId), state.schoolName, "Schoolix"));\r
      } else {\r
        setStudentSchoolId(linkedSchoolId(sp) || linkedSchoolId(state.session || {}));\r
        applySchoolName(firstProfileText(sp.schoolName, cachedSchoolNameFor(state.schoolId), state.schoolName, "Schoolix"));\r
      }\r
      sk = String(sp.studentId || sk).trim();\r
\r
      if (!state.schoolId) {\r
        $("globalStatus").innerHTML = \`<div class="error-banner">School link not found. Contact the school office.</div>\`;\r
        return;\r
      }\r
\r
      await Promise.all([\r
        fetchAndSetSchoolName(state.schoolId),\r
        loadStudentSessions({ force: forceSessionRefresh }),\r
        loadLibrarySettings(),\r
        loadAttendanceTeacherLookup()\r
      ]);\r
\r
      // Fetch student record\r
      const schoolStudent = await fetchStudentRecordFromSchool(state.schoolId, sp, sk);\r
      const archivedStudent = schoolStudent ? null : await fetchArchivedStudentFromSchool(state.schoolId, sp, sk);\r
      state.isArchived = Boolean(archivedStudent);\r
      state.archivedProfile = archivedStudent || null;\r
      state.attendanceMonthFilter = currentMonthKey();\r
      state.attendanceMonthFilterTouched = false;\r
      state.profile = schoolStudent\r
        ? { ...sp, id:schoolStudent.id, ...schoolStudent, name:firstProfileText(schoolStudent.name, schoolStudent.fullName, schoolStudent.studentName, sp.name), studentId:schoolStudent.studentId||sk, schoolId:state.schoolId }\r
        : archivedStudent\r
          ? { ...sp, id:archivedStudent.id, ...archivedStudent, name:firstProfileText(archivedStudent.name, archivedStudent.fullName, archivedStudent.studentName, sp.name), studentId:archivedStudent.studentId||sk, schoolId:state.schoolId }\r
          : { id:sk, ...sp, schoolId:state.schoolId, studentId:sk };\r
      renderStudentIdentity(state.profile, state.schoolName);\r
      const recordStudentId = String(state.profile.studentId || sk).trim();\r
      window.dispatchEvent(new CustomEvent("schoolix:student-session-ready", {\r
        detail: {\r
          schoolId: state.schoolId,\r
          role: "student",\r
          studentId: recordStudentId,\r
          studentDocId: state.profile.studentDocId || state.profile.id || "",\r
          email: state.profile.email || state.session?.email || "",\r
          authUid: state.profile.authUid || state.session?.uid || ""\r
        }\r
      }));\r
      window.SchoolixSyncNativeNotifications?.({\r
        schoolId: state.schoolId,\r
        role: "student",\r
        studentId: recordStudentId,\r
        studentDocId: state.profile.studentDocId || state.profile.id || "",\r
        email: state.profile.email || state.session?.email || "",\r
        authUid: state.profile.authUid || state.session?.uid || ""\r
      });\r
\r
      const candidateStudentIds = Array.from(new Set([\r
        recordStudentId,\r
        state.profile?.studentId,\r
        state.profile?.id,\r
        state.profile?.studentDocId,\r
        sk,\r
        state.session?.studentId,\r
        state.session?.uid,\r
        state.profile?.authUid,\r
        state.profile?.srNumber\r
      ].map(s => String(s || "").trim()).filter(Boolean)));\r
\r
      if (state.isArchived) {\r
        const archivedRecords = state.profile.records || {};\r
        state.attendance = latestByRecent(normalizeArchivedArray(archivedRecords.attendance).filter(belongsToSelectedSession));\r
        state.fees = latestByRecent(normalizeArchivedArray(archivedRecords.fees).filter(belongsToSelectedSession));\r
        state.reports = latestByRecent(normalizeArchivedArray(archivedRecords.reportCards).filter(belongsToSelectedSession));\r
        state.transactions = [];\r
        state.libraryIssues = [];\r
      } else {\r
        const [aSnaps, fSnaps] = await Promise.all([\r
          Promise.all(candidateStudentIds.map(sid => safeGetDocs(query(collection(db,"schools",state.schoolId,"attendance"),where("studentId","==",sid))))),\r
          Promise.all(candidateStudentIds.map(sid => safeGetDocs(query(collection(db,"schools",state.schoolId,"fees"),where("studentId","==",sid)))))\r
        ]);\r
        const attendanceMap = new Map();\r
        aSnaps.forEach(snap => snap?.docs?.forEach(d => attendanceMap.set(d.id, { id: d.id, ...d.data() })));\r
        const feeMap = new Map();\r
        fSnaps.forEach(snap => snap?.docs?.forEach(d => feeMap.set(d.id, { id: d.id, ...d.data() })));\r
        state.attendance = latestByRecent(Array.from(attendanceMap.values()).filter(belongsToSelectedSession));\r
        state.fees = latestByRecent(Array.from(feeMap.values()).filter(belongsToSelectedSession));\r
      }\r
\r
      const [txRows, libraryRows, reportRows, marksData, termRows, transportData, visibilityData] = await Promise.all([\r
        (async () => {\r
          if (state.isArchived) return [];\r
          const txSnaps = await Promise.all(candidateStudentIds.map(sid =>\r
            safeGetDocs(query(collection(db,"schools",state.schoolId,"onlineFeeTransactions"),where("studentId","==",sid)))\r
          ));\r
          const txMap = new Map();\r
          txSnaps.forEach(snap => snap?.docs?.forEach(d => txMap.set(d.id, { id: d.id, ...d.data() })));\r
          return Array.from(txMap.values()).filter(belongsToSelectedSession);\r
        })(),\r
        (async () => {\r
          if (state.isArchived) return [];\r
          const lSnaps = await Promise.all(candidateStudentIds.map(sid =>\r
            safeGetDocs(query(collection(db,"schools",state.schoolId,"library_issues"),where("studentId","==",sid)))\r
          ));\r
          const lMap = new Map();\r
          lSnaps.forEach(snap => snap?.docs?.forEach(d => lMap.set(d.id, { id: d.id, ...d.data() })));\r
          return Array.from(lMap.values());\r
        })(),\r
        (async () => {\r
          if (state.isArchived) return state.reports;\r
          const reportQueries = [];\r
          candidateStudentIds.forEach((sid) => {\r
            reportQueries.push(\r
              safeGetDocs(query(collection(db,"schools",state.schoolId,"reportCards"),where("student.studentId","==",sid))),\r
              safeGetDocs(query(collection(db,"schools",state.schoolId,"reportCards"),where("studentId","==",sid))),\r
              safeGetDocs(query(collection(db,"schools",state.schoolId,"reportCards"),where("student.id","==",sid)))\r
            );\r
          });\r
          const querySnaps = await Promise.all(reportQueries);\r
          const reportsById = new Map();\r
          querySnaps.forEach((snap) => {\r
            if (snap?.docs) {\r
              snap.docs.forEach((reportDoc) => {\r
                reportsById.set(reportDoc.id, { id: reportDoc.id, ...reportDoc.data() });\r
              });\r
            }\r
          });\r
          return [...reportsById.values()].filter(belongsToSelectedSession);\r
        })(),\r
        (async () => {\r
          if (state.isArchived) return {};\r
          const marksPromises = candidateStudentIds.map(sid =>\r
            safeGetDoc(doc(db, "schools", state.schoolId, "marks", sid))\r
          );\r
          const marksSnaps = await Promise.all(marksPromises);\r
          const combinedTerms = {};\r
          marksSnaps.forEach(snap => {\r
            if (snap?.exists?.()) {\r
              const data = snap.data() || {};\r
              const terms = data.terms || {};\r
              Object.entries(terms).forEach(([k, v]) => {\r
                if (v && typeof v === "object") {\r
                  combinedTerms[k] = { ...(combinedTerms[k] || {}), ...v };\r
                }\r
              });\r
            }\r
          });\r
          return combinedTerms;\r
        })(),\r
        (async () => {\r
          const tSnap = await safeGetDocs(collection(db,"schools",state.schoolId,"terms"));\r
          return tSnap.docs\r
            .map(d=>({id:d.id,...d.data()}))\r
            .filter(belongsToSelectedSession)\r
            .filter(termMatchesStudentPlacement)\r
            .sort((a,b)=>(a.createdAt?.seconds||0)-(b.createdAt?.seconds||0));\r
        })(),\r
        (async () => {\r
          if (state.isArchived) return null;\r
          return resolveStudentTransport(recordStudentId);\r
        })(),\r
        (async () => {\r
          const visibilitySnap = await safeGetDoc(doc(db, "schools", state.schoolId, "settings", "reportCardTermVisibility"));\r
          return visibilitySnap?.exists?.() ? (visibilitySnap.data().terms || {}) : {};\r
        })()\r
      ]);\r
\r
      // Merge marks into report rows\r
      const studentMarksTerms = marksData || {};\r
      const finalReports = [...reportRows];\r
\r
      Object.entries(studentMarksTerms).forEach(([rawKey, subjectMarks]) => {\r
        if (!subjectMarks || typeof subjectMarks !== "object" || Object.keys(subjectMarks).length === 0) return;\r
\r
        let tKey = rawKey;\r
        if (rawKey.includes("__")) {\r
          const [sessKey, ...rest] = rawKey.split("__");\r
          if (state.activeSessionId && sessKey !== state.activeSessionId && sessKey !== state.activeSessionLabel) {\r
            return;\r
          }\r
          tKey = rest.join("__");\r
        }\r
\r
        const canonicalTermKey = termKey(tKey);\r
        const subArr = Object.entries(subjectMarks).map(([subName, entry]) => {\r
          const obtained = (entry?.obtained != null && entry?.obtained !== "" && !isNaN(entry?.obtained)) ? Number(entry.obtained) : null;\r
          const maxMarks = Number(entry?.maxMarks || entry?.max || 100);\r
          return {\r
            name: subName,\r
            obtained,\r
            maxMarks,\r
            remarks: getReportRemarks(obtained, maxMarks)\r
          };\r
        }).filter(s => s.name);\r
\r
        let total = 0, totalMax = 0, hasScored = false;\r
        subArr.forEach(s => {\r
          if (s.obtained != null) {\r
            total += s.obtained;\r
            hasScored = true;\r
          }\r
          totalMax += s.maxMarks;\r
        });\r
\r
        const pct = totalMax ? Math.round((total / totalMax) * 100) : 0;\r
        const grade = hasScored ? getReportGrade(pct) : "-";\r
\r
        const existingReport = finalReports.find(r =>\r
          termKeysMatch(r.termKey || termKey(r.termLabel || r.term || ""), canonicalTermKey)\r
        );\r
\r
        if (existingReport) {\r
          if (!existingReport.subjects || !existingReport.subjects.length) {\r
            existingReport.subjects = subArr;\r
            existingReport.totalMarks = total;\r
            existingReport.totalMaxMarks = totalMax;\r
            existingReport.percentage = pct;\r
            existingReport.grade = grade;\r
          }\r
        } else {\r
          const prettyTerm = tKey.replace(/-/g, " ").replace(/\\b\\w/g, c => c.toUpperCase());\r
          finalReports.push({\r
            id: \`marks_\${recordStudentId}_\${canonicalTermKey}\`,\r
            term: prettyTerm,\r
            termKey: canonicalTermKey,\r
            termLabel: prettyTerm,\r
            sessionId: state.activeSessionId || "",\r
            session: state.activeSessionLabel || "",\r
            student: {\r
              name: state.profile?.name || "",\r
              studentId: recordStudentId,\r
              class: getClassForSession() || state.profile?.class || "",\r
              section: getSectionForSession() || state.profile?.section || "",\r
              roll: getRollForSession() || state.profile?.roll || ""\r
            },\r
            subjects: subArr,\r
            totalMarks: total,\r
            totalMaxMarks: totalMax,\r
            percentage: pct,\r
            grade,\r
            createdAt: new Date(),\r
            fromMarks: true\r
          });\r
        }\r
      });\r
\r
      // Build unique terms from terms collection, report cards, and marks\r
      const uniqueTerms = new Map();\r
      function registerTerm(rawKey, label, meta = {}) {\r
        const k = termKey(rawKey || label || "");\r
        if (!k) return;\r
        if (!uniqueTerms.has(k)) {\r
          uniqueTerms.set(k, {\r
            ...meta,\r
            termKey: k,\r
            label: label || meta.label || meta.term || meta.name || k.replace(/-/g, " ").replace(/\\b\\w/g, c => c.toUpperCase()),\r
            id: meta.id || k\r
          });\r
        }\r
      }\r
\r
      termRows.forEach(t => registerTerm(t.termKey || t.id, t.label || t.term || t.name, t));\r
      finalReports.forEach(r => registerTerm(r.termKey, r.termLabel || r.term, r));\r
      Object.keys(studentMarksTerms).forEach(rawKey => {\r
        let tKey = rawKey;\r
        if (rawKey.includes("__")) {\r
          const [sessKey, ...rest] = rawKey.split("__");\r
          if (state.activeSessionId && sessKey !== state.activeSessionId && sessKey !== state.activeSessionLabel) return;\r
          tKey = rest.join("__");\r
        }\r
        registerTerm(tKey);\r
      });\r
\r
      state.transactions = txRows;\r
      state.libraryIssues = libraryRows;\r
      state.resultVisibility = visibilityData || {};\r
      state.reports = filterLiveReportsForStudent(finalReports);\r
      state.terms = Array.from(uniqueTerms.values()).filter(t => isResultTermLive(t.termKey));\r
      state.transport = transportData;\r
\r
      state.reports.sort((a,b)=>(b.createdAt?.seconds||0)-(a.createdAt?.seconds||0));\r
\r
      // Render everything\r
      renderOverview();\r
      renderProfile(state.profile);\r
      renderAttendance(state.attendance);\r
      renderFees(state.fees);\r
      renderLibrary(state.libraryIssues);\r
      renderTransport(state.transport);\r
      state.timetableLoaded = false;\r
      const timetable = $("studentTimetable");\r
      if (timetable) {\r
        timetable.dataset.loadedFor = "";\r
        timetable.innerHTML = \`<div class="empty-state">Open this tab to load your timetable.</div>\`;\r
      }\r
\r
      renderTermDropdown(state.terms);\r
\r
      if (state.terms.length > 0) {\r
        const rep = latestReport(state.reports) || state.reports[0];\r
        let selectedKey = "";\r
        if (rep) {\r
          const target = rep.termKey || termKey(rep.termLabel || rep.term || "");\r
          const matchingTerm = state.terms.find(t => termKeysMatch(t.termKey, target));\r
          if (matchingTerm) selectedKey = matchingTerm.termKey;\r
        }\r
        if (!selectedKey && state.terms[0]) {\r
          selectedKey = state.terms[0].termKey;\r
        }\r
        if (selectedKey) {\r
          const termSelect = $("studentTermSelect");\r
          if (termSelect) {\r
            termSelect.value = selectedKey;\r
            renderReportForTerm(selectedKey);\r
          }\r
        }\r
      }\r
\r
      $("globalStatus").innerHTML = state.sessionLoadError\r
        ? \`<div class="error-banner">\${esc(state.sessionLoadError)}</div>\`\r
        : "";\r
\r
    } catch (err) {\r
      console.error(err);\r
      $("globalStatus").innerHTML = \`<div class="error-banner">\${esc(err?.message||"Unknown error")}</div>\`;\r
    }\r
  }\r
\r
  window.refreshDashboard = async () => {\r
    clearFirestoreReadCache();\r
    await loadStudentData({ forceSessionRefresh: true });\r
    showToast(\r
      state.sessionLoadError || "Dashboard refreshed.",\r
      state.sessionLoadError ? "error" : "success"\r
    );\r
  };\r
\r
  /* --- PRINT SUMMARY --- */\r
  window.printStudentSummary = () => {\r
    const school = state.schoolName || window.SchoolBranding?.getSchoolName?.() || "Schoolix Academy";\r
    const p = state.profile||{};\r
    const att  = calcAttendance(state.attendance);\r
    const fees = calcFees(state.fees);\r
    const rep  = latestReport(state.reports);\r
    const html = \`<div style="font-family:'Segoe UI',sans-serif;max-width:860px;margin:0 auto;padding:28px;color:#0f172a">\r
      <div style="background:linear-gradient(135deg,#1d4ed8,#2563eb);color:#fff;border-radius:16px;padding:24px 28px;margin-bottom:20px">\r
        <div style="font-size:11px;text-transform:uppercase;letter-spacing:.1em;opacity:.75">\${esc(school)}</div>\r
        <h1 style="font-size:26px;margin:8px 0 4px;letter-spacing:-.02em">Student Summary</h1>\r
        <div style="font-size:13px;opacity:.8">ID: \${esc(p.studentId||getStudentKey())}</div>\r
      </div>\r
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">\r
        <div style="border:1px solid #e2e8f0;border-radius:12px;padding:16px">\r
          <h3 style="margin:0 0 10px;color:#1d4ed8;font-size:12px;text-transform:uppercase;letter-spacing:.08em">Profile</h3>\r
          <p style="margin:4px 0"><strong>Name:</strong> \${esc(p.name||"-")}</p>\r
          <p style="margin:4px 0"><strong>Class:</strong> \${esc(getClassForSession()||"-")}-\${esc(getSectionForSession()||"-")}</p>\r
          <p style="margin:4px 0"><strong>Roll No.:</strong> \${esc(getRollForSession()||"-")}</p>\r
          <p style="margin:4px 0"><strong>School:</strong> \${esc(school)}</p>\r
        </div>\r
        <div style="border:1px solid #e2e8f0;border-radius:12px;padding:16px">\r
          <h3 style="margin:0 0 10px;color:#1d4ed8;font-size:12px;text-transform:uppercase;letter-spacing:.08em">Overview</h3>\r
          <p style="margin:4px 0"><strong>Attendance:</strong> \${att.total?\`\${att.percentage}%\`:"-"}</p>\r
          <p style="margin:4px 0"><strong>Fees Due:</strong> \${esc(fmt(fees.due))}</p>\r
          <p style="margin:4px 0"><strong>Latest Result:</strong> \${rep?\`\${Math.round(Number(rep.percentage||0))}%\`:"-"}</p>\r
        </div>\r
      </div>\r
    </div>\`;\r
    const printHtml = \`<!DOCTYPE html><html><head>\r
<title>Student Summary - \${esc(school)}</title><style>body{margin:0;background:#f8fafc}</style></head><body>\${html}`,styles:[{tag:"style",attributes:{id:"sxCriticalLoaderStyle"},text:`
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
`},{attributes:{src:"school-branding.js"},text:""},{attributes:{src:"/schoolix-app.js?v=navbar-20260721"},text:""},{attributes:{type:"module"},text:`\r
  import { initializeApp } from "./firebase-compat.js";\r
  import {\r
    getFirestore, doc, getDoc, getDocs, collection, query, where, limit, clearFirestoreReadCache\r
  } from "./firebase-compat.js";\r
  import {\r
    getAuth, signOut, onAuthStateChanged\r
  } from "./firebase-compat.js";\r
  import { createVehicleMap, locationStatus } from "./schoolix-maplibre.js";\r
  import { liveLocations, parentVehicleForStudent, subscribeTransport } from "./schoolix-transport.js";\r
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
  const db  = getFirestore(app);\r
  const auth = getAuth(app);\r
  const $   = (id) => document.getElementById(id);\r
  let transportLiveMap = null;\r
  let transportLiveUnsubscribe = null;\r
  const SESSION_KEY = "schoolixStudentSession";\r
  const SUPABASE_URL = "https://ezkmeedcqetztkeppxil.supabase.co";\r
  const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6a21lZWRjcWV0enRrZXBweGlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxMjk5NjAsImV4cCI6MjA5MzcwNTk2MH0.1davJ_NYkFhHToUtcFBR0kA6dk0-cOkaIbK2SCObkQg";\r
  const PASSWORD_RESET_FUNCTION_URL = \`\${SUPABASE_URL}/functions/v1/send-password-reset-email\`;\r
\r
  function clearMapMissing(mapApi, vehicleIds = []) {\r
    if (typeof mapApi?.clearMissing === "function") {\r
      mapApi.clearMissing(vehicleIds);\r
      return;\r
    }\r
    const keep = new Set(vehicleIds.map((id) => String(id)));\r
    mapApi?.markers?.forEach?.((entry, id) => {\r
      if (!keep.has(String(id))) {\r
        entry?.marker?.remove?.();\r
        mapApi.markers.delete(id);\r
      }\r
    });\r
  }\r
\r
  const state = {\r
    session: null, schoolId: "", schoolName: "",\r
    profile: null, attendance: [], fees: [], reports: [], terms: [], transactions: [],\r
    resultVisibility: {},\r
    sessions: [], activeSessionId: "", activeSessionLabel: "",\r
    activeSessionLocked: false, allDataBySession: {}, transport: null,\r
    libraryIssues: [], librarySettings: { maxDays: 14 }, teacherLookup: new Map(),\r
    timetableLoaded: false,\r
    archivedProfile: null, isArchived: false, attendanceMonthFilter: "", attendanceMonthFilterTouched: false,\r
    schoolActiveSessionId: "", userSelectedSessionId: "", sessionLoadError: "",\r
    sessionsLoadedForSchool: "", lastResumeRefreshAt: 0, resumeRefreshPromise: null\r
  };\r
\r
  function firstProfileText(...values) {\r
    return values.map(value => String(value || "").replace(/\\s+/g, " ").trim()).find(Boolean) || "";\r
  }\r
\r
  function studentDisplayName(profile = state.profile || state.session || {}) {\r
    return firstProfileText(profile.name, profile.fullName, profile.studentName, profile.displayName) || "Student";\r
  }\r
\r
  function linkedSchoolId(profile = {}) {\r
    return firstProfileText(\r
      profile.schoolId,\r
      profile.schoolID,\r
      profile.schoolUid,\r
      profile.schoolUID,\r
      profile.schoolDocId,\r
      profile.schoolDocID,\r
      profile.adminId,\r
      profile.adminID,\r
      profile.adminUid,\r
      profile.adminUID,\r
      profile.adminDocId,\r
      profile.adminDocID\r
    );\r
  }\r
\r
  function setStudentSchoolId(value = "") {\r
    const nextSchoolId = String(value || "").trim();\r
    if (nextSchoolId === state.schoolId) return false;\r
    state.schoolId = nextSchoolId;\r
    state.sessions = [];\r
    state.activeSessionId = "";\r
    state.activeSessionLabel = "";\r
    state.activeSessionLocked = false;\r
    state.schoolActiveSessionId = "";\r
    state.userSelectedSessionId = "";\r
    state.sessionLoadError = "";\r
    state.sessionsLoadedForSchool = "";\r
    state.timetableLoaded = false;\r
    return true;\r
  }\r
\r
  function renderStudentIdentity(profile = state.profile || state.session || {}, schoolName = "") {\r
    const name = studentDisplayName(profile);\r
    const school = firstProfileText(schoolName, state.schoolName, profile.schoolName, "Schoolix");\r
    if ($("topbarName")) $("topbarName").textContent = name;\r
    if ($("pdName")) $("pdName").textContent = name;\r
    if ($("sidebarSchoolName")) $("sidebarSchoolName").textContent = school;\r
    if ($("pdSchoolName")) $("pdSchoolName").textContent = school;\r
    if ($("welcomeTitle")) $("welcomeTitle").textContent = \`Welcome back, \${name}\`;\r
    if ($("welcomeSub")) $("welcomeSub").textContent = school;\r
    setAvatarElement("topbarAvatar", profile);\r
    setAvatarElement("pdAvatar", profile);\r
  }\r
\r
  function cachedSchoolNameFor(schoolId = "") {\r
    if (!schoolId) return "";\r
    try { return localStorage.getItem("schoolixSchoolName_" + schoolId) || ""; } catch { return ""; }\r
  }\r
\r
  function hydrateInitialStudentIdentity() {\r
    const session = state.session || loadSession() || {};\r
    const schoolId = linkedSchoolId(session);\r
    const school = firstProfileText(\r
      session.schoolName,\r
      cachedSchoolNameFor(schoolId),\r
      window.SchoolBranding?.getSchoolName?.(),\r
      "Schoolix"\r
    );\r
    if (school && school !== "Schoolix") state.schoolName = school;\r
    renderStudentIdentity(session, school);\r
  }\r
\r
  const PAGE_TITLES = {\r
    overview: "Overview", profile: "My Profile",\r
    attendance: "Attendance", fees: "Fee History", results: "Report Cards",\r
    transport: "My Transport", library: "My Library", timetable: "My Timetable", notices: "Notices"\r
  };\r
\r
  const TIMETABLE_DAYS = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];\r
  const TIMETABLE_PERIODS = ['9:00-10:00','10:00-11:00','11:00-12:00','12:00-1:00','1:00-2:00','2:00-3:00','3:00-4:00'];\r
\r
  /* --- NAVIGATION --- */\r
  window.navigate = function(pageId) {\r
    if (pageId === "results" && isResultLocked()) {\r
      renderResultLockedPanel();\r
      openResultDueModal();\r
    }\r
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));\r
    document.querySelectorAll(".nav-item").forEach(n => n.classList.remove("active"));\r
    const p = $("page-" + pageId); if (p) p.classList.add("active");\r
    const n = document.querySelector(\`.nav-item[data-page="\${pageId}"]\`); if (n) n.classList.add("active");\r
    $("topbarTitle").textContent = PAGE_TITLES[pageId] || pageId;\r
    if (pageId === "timetable") {\r
      loadStudentTimetable();\r
    }\r
    if (["overview", "profile", "attendance", "fees", "results", "transport", "library", "timetable", "notices"].includes(pageId)) {\r
      history.replaceState(null, "", \`#\${pageId}\`);\r
    }\r
    closeSidebar();\r
  };\r
\r
  window.openSidebar  = () => { $("sidebar").classList.add("open"); $("sidebarOverlay").classList.add("open"); };\r
  window.closeSidebar = () => { $("sidebar").classList.remove("open"); $("sidebarOverlay").classList.remove("open"); };\r
  $("resultDueModal")?.addEventListener("click", function(e) {\r
    if (e.target === this) closeResultDueModal();\r
  });\r
\r
  function wireOverviewCards() {\r
    document.querySelectorAll("[data-overview-page]").forEach((card) => {\r
      if (card.dataset.boundOverviewNav === "true") return;\r
      card.dataset.boundOverviewNav = "true";\r
      const targetPage = card.dataset.overviewPage;\r
      const openTarget = () => {\r
        if (targetPage) navigate(targetPage);\r
      };\r
      card.addEventListener("click", openTarget);\r
      card.addEventListener("keydown", (event) => {\r
        if (event.key !== "Enter" && event.key !== " ") return;\r
        event.preventDefault();\r
        openTarget();\r
      });\r
    });\r
  }\r
\r
  /* --- PROFILE DROPDOWN --- */\r
  window.toggleProfileDropdown = function() {\r
    const chip = $("studentChip");\r
    const dd   = $("profileDropdown");\r
    const isOpen = dd.classList.contains("open");\r
    if (isOpen) {\r
      dd.classList.remove("open");\r
      chip.classList.remove("open");\r
    } else {\r
      dd.classList.add("open");\r
      chip.classList.add("open");\r
    }\r
  };\r
\r
  window.closeProfileDropdown = function() {\r
    $("profileDropdown").classList.remove("open");\r
    $("studentChip").classList.remove("open");\r
  };\r
\r
  async function loadStudentTimetable() {\r
    const container = $("studentTimetable");\r
    if (state.timetableLoaded && container?.dataset.loadedFor === \`\${state.schoolId}|\${state.profile?.class || state.session?.class || ""}|\${state.profile?.section || state.session?.section || ""}\`) return;\r
    const className = state.profile?.class || state.session?.class || "";\r
    const sectionName = state.profile?.section || state.session?.section || "";\r
\r
    if (!state.schoolId || !className || !sectionName) {\r
      container.innerHTML = \`<div class="empty-state">Class or section information is missing. Please contact your school office.</div>\`;\r
      return;\r
    }\r
\r
    container.innerHTML = \`<div class="empty-state">Loading timetable...</div>\`;\r
\r
    try {\r
      const [teachersSnap, timetableSnap] = await Promise.all([\r
        getDocs(collection(db, "schools", state.schoolId, "teachers")),\r
        getDoc(doc(db, "schools", state.schoolId, "timetables", \`\${className}-\${sectionName}\`))\r
      ]);\r
\r
      const teacherLookup = new Map(teachersSnap.docs.map(d => [d.id, d.data().name || "Teacher"]));\r
\r
      if (!timetableSnap.exists()) {\r
        state.timetableLoaded = true;\r
        container.dataset.loadedFor = \`\${state.schoolId}|\${className}|\${sectionName}\`;\r
        container.innerHTML = \`<div class="empty-state">No timetable has been published yet for Class \${esc(className)}-\${esc(sectionName)}.</div>\`;\r
        return;\r
      }\r
\r
      const timetableData = timetableSnap.data() || {};\r
      const schedule = timetableData.schedule || {};\r
      renderStudentTimetable(schedule, teacherLookup, className, sectionName, timetableData.periodTimes || {});\r
      state.timetableLoaded = true;\r
      container.dataset.loadedFor = \`\${state.schoolId}|\${className}|\${sectionName}\`;\r
    } catch (err) {\r
      console.error("Error loading student timetable:", err);\r
      container.innerHTML = \`<div class="empty-state">Error loading timetable. Please refresh or contact the school office.</div>\`;\r
    }\r
  }\r
\r
  function renderStudentTimetable(schedule, teacherLookup, className, sectionName, periodTimes = {}) {\r
    const container = $("studentTimetable");\r
    const days = TIMETABLE_DAYS.filter(day => schedule && typeof schedule === 'object' && day in schedule);\r
    const periods = days.length\r
      ? Array.from(new Set(days.flatMap(day => Object.keys(schedule[day] || {}))))\r
        .sort((a,b) => parseInt(a.replace("Period ","")) - parseInt(b.replace("Period ","")))\r
      : TIMETABLE_PERIODS;\r
\r
    if (!days.length) {\r
      container.innerHTML = \`<div class="empty-state">No timetable has been set yet for Class \${esc(className)}-\${esc(sectionName)}.</div>\`;\r
      return;\r
    }\r
\r
    let html = '<div class="timetable-grid"><table class="timetable-table">';\r
    html += '<thead><tr><th>Day</th>';\r
    periods.forEach(period => {\r
      const periodTime = periodTimes[period] || days.map(day => schedule[day]?.[period]).find(slot => slot?.startTime || slot?.endTime) || {};\r
      const timeLabel = periodTime.startTime && periodTime.endTime\r
        ? \`\${formatTimetableTime12(periodTime.startTime)} - \${formatTimetableTime12(periodTime.endTime)}\`\r
        : periodTime.startTime\r
          ? \`From \${formatTimetableTime12(periodTime.startTime)}\`\r
          : periodTime.endTime\r
            ? \`Until \${formatTimetableTime12(periodTime.endTime)}\`\r
            : '';\r
      html += \`<th><strong>\${esc(period)}</strong>\${timeLabel ? \`<div class="class-info">\${esc(timeLabel)}</div>\` : ''}</th>\`;\r
    });\r
    html += '</tr></thead><tbody>';\r
\r
    days.forEach(day => {\r
      html += \`<tr><td><strong>\${esc(day)}</strong></td>\`;\r
      periods.forEach(period => {\r
        const slot = schedule[day]?.[period] || {};\r
        const teacherName = slot.teacherName || (slot.teacher ? teacherLookup.get(slot.teacher) || slot.teacher : '');\r
\r
        if (slot.subject || teacherName || slot.room) {\r
          html += \`<td><div class="timetable-slot"><div class="subject">\${esc(slot.subject || '-')}</div>\`;\r
          if (teacherName) html += \`<div class="class-info">Teacher: \${esc(teacherName)}</div>\`;\r
          if (slot.room) html += \`<div class="room">\${esc(slot.room)}</div>\`;\r
          html += '</div></td>';\r
        } else {\r
          html += '<td style="color: var(--muted); font-style: italic;">-</td>';\r
        }\r
      });\r
      html += '</tr>';\r
    });\r
\r
    html += '</tbody></table></div>';\r
    container.innerHTML = html;\r
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
  // Close dropdown when clicking outside\r
  document.addEventListener("click", function(e) {\r
    if (!$("studentChip").contains(e.target)) closeProfileDropdown();\r
  });\r
\r
  /* --- RESET PASSWORD MODAL --- */\r
  window.openResetPasswordModal = async function() {\r
  closeProfileDropdown();\r
\r
  // Pehle modal open karo with loading state\r
  $("resetPasswordModal").classList.add("open");\r
  $("resetModalContent").innerHTML = \`\r
    <div class="modal-icon">\r
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">\r
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>\r
        <path d="M7 11V7a5 5 0 0110 0v4"/>\r
      </svg>\r
    </div>\r
    <h3>Reset Password</h3>\r
    <div style="color:var(--text2);font-size:13.5px;margin:12px 0;display:flex;align-items:center;gap:8px">\r
      <svg style="width:16px;height:16px;animation:spin 1s linear infinite;flex-shrink:0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">\r
        <path d="M23 4v6h-6"/><path d="M1 20v-6h6"/>\r
        <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/>\r
      </svg>\r
      Fetching latest account info...\r
    </div>\r
  \`;\r
\r
  // Firestore se FRESH email fetch karo (admin ne jo bhi update kiya ho)\r
  let email = "";\r
  try {\r
    let sk = getStudentKey();\r
    if (sk) {\r
      // 1. Users collection check\r
      const userSnap = await getDoc(doc(db, "users", sk));\r
      if (userSnap.exists()) {\r
        email = userSnap.data().email || "";\r
      }\r
\r
      // 2. Students collection - admin yahan update karta hai, priority denge\r
      if (state.schoolId) {\r
        const sSnap = await getDocs(\r
          query(collection(db, "schools", state.schoolId, "students"), where("studentId", "==", sk))\r
        );\r
        if (!sSnap.empty) {\r
          const freshEmail = sSnap.docs[0].data().email || "";\r
          if (freshEmail) email = freshEmail; // students collection ki email override karega\r
        }\r
      }\r
    }\r
  } catch (e) {\r
    console.warn("Fresh email fetch failed, falling back to cache:", e);\r
    email = state.session?.email || state.profile?.email || "";\r
  }\r
\r
  // State bhi update karo taaki baad mein bhi fresh rahe\r
  if (email) {\r
    if (state.profile) state.profile.email = email;\r
    if (state.session) {\r
      state.session.email = email;\r
      saveSession(state.session);\r
    }\r
  }\r
\r
  // Ab actual modal content render karo fresh email ke saath\r
  $("resetModalContent").innerHTML = \`\r
    <div class="modal-icon">\r
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">\r
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>\r
        <path d="M7 11V7a5 5 0 0110 0v4"/>\r
      </svg>\r
    </div>\r
    <h3>Reset Password</h3>\r
    <p>A password reset link will be sent to your registered email address. Click the link in the email to set a new password.</p>\r
    <div class="modal-email-display">\${esc(email || "No email on file")}</div>\r
    <div class="modal-actions">\r
      <button class="btn-secondary" onclick="closeResetPasswordModal()">Cancel</button>\r
      <button class="btn-primary" id="sendResetBtn" onclick="sendPasswordReset()" \${!email ? "disabled" : ""}>\r
        Send Reset Link\r
      </button>\r
    </div>\r
  \`;\r
\r
  // sendPasswordReset ke liye current email accessible banana\r
  window._currentResetEmail = email;\r
};\r
  window.closeResetPasswordModal = function() {\r
    $("resetPasswordModal").classList.remove("open");\r
  };\r
\r
  // Close modal on backdrop click\r
  $("resetPasswordModal").addEventListener("click", function(e) {\r
    if (e.target === this) closeResetPasswordModal();\r
  });\r
\r
  window.sendPasswordReset = async function() {\r
    const email = (window._currentResetEmail || state.session?.email || state.profile?.email || "").trim();\r
    if (!email) { showToast("No email address found for this account.", "error"); return; }\r
\r
    const btn = $("sendResetBtn");\r
    if (btn) {\r
      btn.disabled = true;\r
      btn.textContent = "Sending...";\r
    }\r
\r
    try {\r
      const response = await fetch(PASSWORD_RESET_FUNCTION_URL, {\r
        method: "POST",\r
        headers: {\r
          "Content-Type": "application/json",\r
          "apikey": SUPABASE_ANON_KEY,\r
          "Authorization": \`Bearer \${SUPABASE_ANON_KEY}\`\r
        },\r
        body: JSON.stringify({\r
          email,\r
          schoolName: state.schoolName || window.SchoolBranding?.getSchoolName?.() || "Schoolix"\r
        })\r
      });\r
      if (!response.ok) {\r
        let details = "Password reset email failed.";\r
        try {\r
          const data = await response.json();\r
          details = data.error || data.details || details;\r
        } catch {\r
          details = await response.text() || details;\r
        }\r
        throw new Error(details);\r
      }\r
      // Show success state\r
      $("resetModalContent").innerHTML = \`\r
        <div class="modal-success">\r
          <div class="check-icon">\r
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" style="width:26px;height:26px">\r
              <path d="M20 6L9 17l-5-5"/>\r
            </svg>\r
          </div>\r
          <h3 style="margin-bottom:10px">Email Sent!</h3>\r
          <p style="color:var(--text2);font-size:13.5px;line-height:1.65;margin-bottom:20px">\r
            A password reset link has been sent to <strong style="color:var(--text)">\${esc(email)}</strong>.\r
            Check your inbox and follow the instructions to set a new password.\r
          </p>\r
          <button class="btn-primary" onclick="closeResetPasswordModal()">Done</button>\r
        </div>\r
      \`;\r
      showToast("Password reset email sent!", "success");\r
    } catch (err) {\r
      console.error(err);\r
      let msg = "Failed to send reset email.";\r
      if (err.message) msg = err.message;\r
      showToast(msg, "error");\r
      if (btn) { btn.disabled = false; btn.textContent = "Send Reset Link"; }\r
    }\r
  };\r
\r
  /* --- SESSION --- */\r
  function loadSession() { try { const r = localStorage.getItem(SESSION_KEY); return r ? JSON.parse(r) : null; } catch { return null; } }\r
  function saveSession(s) { localStorage.setItem(SESSION_KEY, JSON.stringify(s)); }\r
  function clearSession() { localStorage.removeItem(SESSION_KEY); }\r
  function redirectToLogin() { clearSession(); window.location.href = "#/index.html"; }\r
  function waitForAuthUser(timeoutMs = 16000) {\r
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
  function selectAuthenticatedStudentProfile(profiles = [], user = {}) {\r
    const unique = [...new Map(profiles.filter(Boolean).map((profile) => [String(profile.id || ""), profile])).values()];\r
    const allowed = unique.filter((profile) => {\r
      const role = String(profile.role || "").trim().toLowerCase();\r
      return ["student", "parent", "parents"].includes(role);\r
    });\r
    if (!allowed.length) return null;\r
\r
    const signedIds = new Set([user.uid, user.supabaseUid].map((value) => String(value || "").trim()).filter(Boolean));\r
    const signedEmail = String(user.email || "").trim().toLowerCase();\r
    const authLinked = allowed.filter((profile) => (\r
      [profile.id, profile.authUid, profile.uid, profile.supabaseAuthUid, profile.legacyUid, profile.firebaseUid]\r
        .map((value) => String(value || "").trim())\r
        .some((value) => signedIds.has(value))\r
    ));\r
    const expectedStudentId = String(\r
      authLinked[0]?.studentId || state.session?.studentId || ""\r
    ).trim();\r
    const sameAuthenticatedEmail = allowed.filter((profile) => (\r
      signedEmail && [profile.email, profile.authEmail, profile.parentEmail, profile.fatherEmail, profile.motherEmail, profile.guardianEmail]\r
        .some((value) => String(value || "").trim().toLowerCase() === signedEmail)\r
    ));\r
    let candidates = [...new Map([...authLinked, ...sameAuthenticatedEmail].map((profile) => [profile.id, profile])).values()];\r
    if (expectedStudentId) {\r
      const sameStudent = candidates.filter((profile) => String(profile.studentId || "").trim() === expectedStudentId);\r
      if (sameStudent.length) candidates = sameStudent;\r
    }\r
    if (!candidates.length) return null;\r
\r
    const identityKeys = new Set(candidates.map((profile) => [\r
      linkedSchoolId(profile),\r
      profile.studentId || "",\r
      String(profile.role || "").toLowerCase()\r
    ].map((value) => String(value || "").trim().toLowerCase()).join("|")).filter((key) => key !== "||"));\r
    if (identityKeys.size !== 1) return null;\r
\r
    return candidates.sort((left, right) => {\r
      const score = (profile) => {\r
        const ids = [profile.id, profile.authUid, profile.uid, profile.supabaseAuthUid, profile.legacyUid, profile.firebaseUid]\r
          .map((value) => String(value || "").trim());\r
        return (ids.some((value) => signedIds.has(value)) ? 100 : 0)\r
          + (String(profile.id || "") === String(profile.studentId || "") ? 20 : 0)\r
          + (linkedSchoolId(profile) ? 10 : 0);\r
      };\r
      return score(right) - score(left);\r
    })[0] || null;\r
  }\r
\r
  async function reconcileStudentSession() {\r
    const user = await waitForAuthUser();\r
    if (!user) {\r
      clearSession();\r
      state.session = null;\r
      return null;\r
    }\r
    try {\r
      const profiles = [];\r
      try {\r
        const profileSnap = await getDoc(doc(db, "users", user.uid));\r
        if (profileSnap?.exists?.()) profiles.push({ id: profileSnap.id, ...profileSnap.data() });\r
      } catch (error) {\r
        console.warn("Direct authenticated student profile read failed:", error);\r
      }\r
      const authEmail = String(user.email || "").trim().toLowerCase();\r
      const lookups = [];\r
      if (user.supabaseUid) lookups.push(["authUid", String(user.supabaseUid).trim()]);\r
      if (authEmail) lookups.push(["authEmail", authEmail], ["email", authEmail]);\r
      const lookupResults = await Promise.allSettled(lookups.map(([field, value]) => (\r
        getDocs(query(collection(db, "users"), where(field, "==", value)))\r
      )));\r
      lookupResults.forEach((result) => {\r
        if (result.status === "rejected") {\r
          console.warn("Authenticated student profile lookup failed:", result.reason);\r
          return;\r
        }\r
        result.value.docs.forEach((entry) => profiles.push({ id: entry.id, ...entry.data() }));\r
      });\r
\r
      const profile = selectAuthenticatedStudentProfile(profiles, user);\r
      if (!profile || !linkedSchoolId(profile)) {\r
        clearSession();\r
        state.session = null;\r
        return null;\r
      }\r
      const role = String(profile.role || "").toLowerCase();\r
      const loginAs = String(state.session?.loginAs || "").toLowerCase();\r
      if (!["student", "parent", "parents"].includes(role) && loginAs !== "parent") {\r
        clearSession();\r
        state.session = null;\r
        return null;\r
      }\r
      const next = {\r
        ...(state.session || {}),\r
        uid: user.uid,\r
        authUid: user.supabaseUid || user.uid,\r
        supabaseAuthUid: user.supabaseUid || state.session?.supabaseAuthUid || "",\r
        studentId: profile.studentId || state.session?.studentId || profile.id || user.uid,\r
        studentDocId: profile.studentDocId || state.session?.studentDocId || profile.id || "",\r
        name: profile.name || profile.studentName || state.session?.name || "",\r
        class: profile.class || state.session?.class || "",\r
        section: profile.section || state.session?.section || "",\r
        rollNo: profile.rollNo || profile.roll || state.session?.rollNo || "",\r
        email: profile.email || user.email || state.session?.email || "",\r
        schoolId: linkedSchoolId(profile) || linkedSchoolId(state.session || {}),\r
        schoolName: profile.schoolName || state.session?.schoolName || "",\r
        role: "student",\r
        loginAs: state.session?.loginAs || (role === "parent" || role === "parents" ? "parent" : "student"),\r
        loginAt: state.session?.loginAt || new Date().toISOString()\r
      };\r
      saveSession(next);\r
      state.session = next;\r
      return next;\r
    } catch (error) {\r
      console.warn("Student session recovery failed:", error);\r
      clearSession();\r
      state.session = null;\r
      return null;\r
    }\r
  }\r
  async function logoutStudent() {\r
    try {\r
      await signOut(auth);\r
    } catch (error) {\r
      console.warn("Firebase sign out failed:", error);\r
    } finally {\r
      clearSession();\r
      showToast("Signed out successfully.", "success");\r
      setTimeout(() => window.location.replace("#/index.html"), 350);\r
    }\r
  }\r
\r
  /* --- UTILS --- */\r
  function esc(v) {\r
    return String(v??"")\r
      .replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")\r
      .replace(/"/g,"&quot;").replace(/'/g,"&#39;");\r
  }\r
  function moneyNumber(v) {\r
    if (typeof v === "number") return Number.isFinite(v) ? v : 0;\r
    const parsed = Number(String(v || "0").replace(/[^\\d.-]/g, ""));\r
    return Number.isFinite(parsed) ? parsed : 0;\r
  }\r
  function fmt(v) { return \`\\u20B9\${moneyNumber(v).toLocaleString("en-IN")}\`; }\r
  function getStudentInitials(value) {\r
    const words = String(value || "Student").trim().split(/\\s+/).filter(Boolean);\r
    if (!words.length) return "S";\r
    return words.slice(0, 2).map((word) => word[0]).join("").toUpperCase();\r
  }\r
  function getStudentPhotoUrl(profile = state.profile || {}) {\r
    return String(profile.photoUrl || profile.imageUrl || profile.profilePhotoUrl || profile.avatarUrl || "").trim();\r
  }\r
  function renderStudentPhoto(profile = state.profile || {}, className = "profile-photo-card") {\r
    const photoUrl = getStudentPhotoUrl(profile);\r
    const initials = getStudentInitials(profile.name || profile.studentId || getStudentKey());\r
    return \`<button type="button" class="\${className}" onclick="openPhotoPreview('\${esc(photoUrl)}','\${esc(profile.name || "Student")}')">\${photoUrl ? \`<img src="\${esc(photoUrl)}" alt="\${esc(profile.name || "Student")} photo">\` : esc(initials)}</button>\`;\r
  }\r
  function setAvatarElement(id, profile = state.profile || {}) {\r
    const el = $(id);\r
    if (!el) return;\r
    const photoUrl = getStudentPhotoUrl(profile);\r
    const initials = getStudentInitials(profile.name || profile.studentId || getStudentKey());\r
    el.innerHTML = photoUrl ? \`<img src="\${esc(photoUrl)}" alt="\${esc(profile.name || "Student")} photo">\` : esc(initials);\r
    el.onclick = (event) => {\r
      event.stopPropagation();\r
      openPhotoPreview(photoUrl, profile.name || "Student");\r
    };\r
  }\r
  window.openPhotoPreview = function(photoUrl, title = "Photo") {\r
    if (!photoUrl) return showToast("Photo is not available yet.", "info");\r
    $("photoPreviewTitle").textContent = title || "Photo";\r
    $("photoPreviewImage").src = photoUrl;\r
    $("photoPreviewImage").alt = \`\${title || "Photo"} preview\`;\r
    $("photoPreviewModal").classList.add("open");\r
  };\r
  window.closePhotoPreview = function() {\r
    $("photoPreviewModal").classList.remove("open");\r
    $("photoPreviewImage").removeAttribute("src");\r
  };\r
  function toDate(v) { if (!v) return null; if (v?.toDate) return v.toDate(); if (typeof v?.seconds === "number") return new Date(v.seconds*1000); const p=new Date(v); return isNaN(p)?null:p; }\r
  function fmtDate(v) {\r
    if (typeof v==="string"&&/^\\d{4}-\\d{2}-\\d{2}$/.test(v)) {\r
      const [y,m,d]=v.split("-").map(Number); return new Date(y,m-1,d).toLocaleDateString("en-IN");\r
    }\r
    const d=toDate(v); return d?d.toLocaleDateString("en-IN"):"N/A";\r
  }\r
  function fmtDateTime(v) { const d=toDate(v); return d?d.toLocaleString("en-IN"):"N/A"; }\r
  const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];\r
  function monthKeyFromDate(value) {\r
    const d = toDate(value);\r
    if (!d) return "";\r
    return \`\${d.getFullYear()}-\${String(d.getMonth() + 1).padStart(2, "0")}\`;\r
  }\r
  function currentMonthKey() {\r
    const now = new Date();\r
    return \`\${now.getFullYear()}-\${String(now.getMonth() + 1).padStart(2, "0")}\`;\r
  }\r
  function monthLabelFromKey(key) {\r
    const [year, month] = String(key || "").split("-");\r
    const idx = Number(month) - 1;\r
    return year && MONTH_NAMES[idx] ? \`\${MONTH_NAMES[idx]} \${year}\` : key || "All months";\r
  }\r
  function getAttendanceMonthKey(record = {}) {\r
    return monthKeyFromDate(record.date || record.timestamp || record.createdAt || record.updatedAt);\r
  }\r
  function normalizeArchivedArray(value) {\r
    return Array.isArray(value) ? value : [];\r
  }\r
  function addDays(date, days) { const d=new Date(date); d.setDate(d.getDate()+days); return d; }\r
  function normalizeLibraryMaxDays(value) {\r
    const days = Number(value);\r
    if (!Number.isFinite(days) || days < 1) return 14;\r
    return Math.min(365, Math.floor(days));\r
  }\r
  function getLibraryIssuedDate(entry) { return toDate(entry.issuedAt) || toDate(entry.issuedAtMs); }\r
  function getLibraryMaxDays(entry) { return normalizeLibraryMaxDays(entry.maxDaysAllowed || state.librarySettings?.maxDays); }\r
  function getLibraryDueDate(entry) {\r
    const stored = toDate(entry.dueDate) || toDate(entry.dueDateMs);\r
    if (stored) return stored;\r
    const issued = getLibraryIssuedDate(entry);\r
    return issued ? addDays(issued, getLibraryMaxDays(entry)) : null;\r
  }\r
  function isLibraryOverdue(entry) {\r
    if (entry.status === "returned") return false;\r
    const due = getLibraryDueDate(entry);\r
    if (!due) return false;\r
    const start = new Date(); start.setHours(0,0,0,0);\r
    return due.getTime() < start.getTime();\r
  }\r
\r
  function showToast(msg, type="info") {\r
    const t=document.createElement("div"); t.className="toast"; t.textContent=msg;\r
    t.style.background =\r
      type==="error"   ? "linear-gradient(135deg,#b42318,#d64c3c)" :\r
      type==="success" ? "linear-gradient(135deg,#059669,#10b981)" :\r
                         "linear-gradient(135deg,#2a5cff,#4f90ff)";\r
    document.body.appendChild(t);\r
    setTimeout(()=>t.remove(), 3400);\r
  }\r
\r
  function getStudentKey() {\r
    const studentId = String(state.session?.studentId || "").trim();\r
    if (studentId) return studentId;\r
    return String(state.session?.uid || "").trim();\r
  }\r
\r
  function isPermissionError(error) {\r
    const code = String(error?.code || "");\r
    const message = String(error?.message || "");\r
    return code === "permission-denied" || /permission|insufficient permissions/i.test(message);\r
  }\r
\r
  async function safeGetDoc(ref) {\r
    try { return await getDoc(ref); }\r
    catch (error) {\r
      if (!isPermissionError(error)) console.warn("Firestore read failed:", error);\r
      return null;\r
    }\r
  }\r
\r
  async function safeGetDocs(ref) {\r
    try { return await getDocs(ref); }\r
    catch (error) {\r
      if (!isPermissionError(error)) console.warn("Firestore query failed:", error);\r
      return { docs: [], empty: true };\r
    }\r
  }\r
\r
  async function fetchStudentProfileDoc(primaryKey) {\r
    const candidates = [];\r
    const uid = String(state.session?.uid || "").trim();\r
    const authUid = String(state.session?.authUid || "").trim();\r
    const studentId = String(state.session?.studentId || "").trim();\r
    const studentDocId = String(state.session?.studentDocId || "").trim();\r
    // Authentication-linked identifiers are authoritative. Student IDs are\r
    // school-local and can collide across schools, so they must be last.\r
    if (uid) candidates.push(uid);\r
    if (authUid && authUid !== uid) candidates.push(authUid);\r
    if (studentDocId && studentDocId !== uid && studentDocId !== authUid) candidates.push(studentDocId);\r
    if (primaryKey && primaryKey !== uid && primaryKey !== authUid && primaryKey !== studentDocId) candidates.push(primaryKey);\r
    if (studentId && !candidates.includes(studentId)) candidates.push(studentId);\r
\r
    const uniqueIds = [...new Set(candidates.filter(Boolean))];\r
    for (const candidate of uniqueIds) {\r
      try {\r
        const snap = await safeGetDoc(doc(db, "users", candidate));\r
        if (snap?.exists?.()) {\r
          const profile = { id: snap.id, ...snap.data() };\r
          const role = String(profile.role || "student").trim().toLowerCase();\r
          const profileAuthIds = [profile.id, profile.authUid, profile.uid, profile.legacyUid, profile.firebaseUid]\r
            .map((value) => String(value || "").trim());\r
          const authLinked = profileAuthIds.includes(uid) || profileAuthIds.includes(authUid);\r
          const canonicalSchoolId = linkedSchoolId(state.session || {});\r
          const sameSchool = Boolean(canonicalSchoolId && linkedSchoolId(profile) === canonicalSchoolId);\r
          const sameStudent = studentId && String(profile.studentId || "").trim() === studentId;\r
          const signedEmail = String(state.session?.email || "").trim().toLowerCase();\r
          const sameEmail = signedEmail && [profile.email, profile.authEmail, profile.parentEmail, profile.fatherEmail, profile.motherEmail, profile.guardianEmail]\r
            .some((value) => String(value || "").trim().toLowerCase() === signedEmail);\r
          if (["student", "parent", "parents", ""].includes(role) && sameSchool && (authLinked || (sameStudent && sameEmail))) return profile;\r
        }\r
      } catch (error) {\r
        if (!isPermissionError(error)) console.warn("Profile lookup failed:", error);\r
      }\r
    }\r
    const emailCandidates = [\r
      state.session?.authEmail,\r
      state.session?.email,\r
      state.session?.parentEmail,\r
      state.session?.fatherEmail,\r
      state.session?.motherEmail,\r
      state.session?.guardianEmail\r
    ].map(value => String(value || "").trim().toLowerCase()).filter(Boolean);\r
    const emailMatches = [];\r
    for (const email of [...new Set(emailCandidates)]) {\r
      for (const field of ["authEmail", "email", "parentEmail", "fatherEmail", "motherEmail", "guardianEmail"]) {\r
        const snap = await safeGetDocs(query(collection(db, "users"), where(field, "==", email)));\r
        for (const match of snap.docs || []) {\r
          const profile = { id: match.id, ...match.data(), _matchedField: field };\r
          const role = String(profile.role || "student").trim().toLowerCase();\r
          if (["student", "parent", "parents", ""].includes(role)) emailMatches.push(profile);\r
        }\r
      }\r
    }\r
    const uniqueMatches = [...new Map(emailMatches.map((profile) => [profile.id, profile])).values()];\r
    const scoredMatches = uniqueMatches.map((profile) => {\r
      const authIds = [profile.id, profile.authUid, profile.uid, profile.legacyUid, profile.firebaseUid]\r
        .map((value) => String(value || "").trim());\r
      const score = (authIds.includes(uid) || authIds.includes(authUid) ? 120 : 0)\r
        + (studentId && String(profile.studentId || "").trim() === studentId ? 80 : 0)\r
        + (linkedSchoolId(profile) && linkedSchoolId(profile) === linkedSchoolId(state.session || {}) ? 40 : 0);\r
      return { profile, score };\r
    }).sort((a, b) => b.score - a.score);\r
    const bestMatch = scoredMatches[0] || null;\r
    const canonicalSchoolId = linkedSchoolId(state.session || {});\r
    if (bestMatch?.score >= 120 && canonicalSchoolId && linkedSchoolId(bestMatch.profile) === canonicalSchoolId) {\r
      return bestMatch.profile;\r
    }\r
    return null;\r
  }\r
\r
  function studentLookupValues(...values) {\r
    return [...new Set(values.map(value => String(value || "").trim()).filter(Boolean))];\r
  }\r
\r
  async function fetchStudentRecordFromSchool(schoolId, profileSeed = {}, primaryKey = "") {\r
    if (!schoolId) return null;\r
    const docCandidates = [\r
      profileSeed.studentDocId,\r
      state.session?.studentDocId,\r
      primaryKey,\r
      state.session?.studentId,\r
      state.session?.uid\r
    ].map(value => String(value || "").trim()).filter(Boolean);\r
\r
    for (const candidate of [...new Set(docCandidates)]) {\r
      const snap = await safeGetDoc(doc(db, "schools", schoolId, "students", candidate));\r
      if (snap?.exists?.()) return { id: snap.id, ...snap.data() };\r
    }\r
\r
    const queryCandidates = [\r
      ["studentId", profileSeed.studentId || state.session?.studentId || primaryKey],\r
      ["authUid", profileSeed.authUid || state.session?.authUid || state.session?.uid],\r
      ["uid", profileSeed.uid || state.session?.uid],\r
      ["email", profileSeed.email || state.session?.email],\r
      ["authEmail", profileSeed.authEmail || state.session?.authEmail],\r
      ["parentEmail", profileSeed.parentEmail || state.session?.parentEmail],\r
      ["fatherEmail", profileSeed.fatherEmail || state.session?.fatherEmail],\r
      ["motherEmail", profileSeed.motherEmail || state.session?.motherEmail],\r
      ["guardianEmail", profileSeed.guardianEmail || state.session?.guardianEmail]\r
    ].filter(([, value]) => String(value || "").trim());\r
\r
    for (const [field, value] of queryCandidates) {\r
      for (const lookupValue of studentLookupValues(value, String(value || "").toLowerCase(), String(value || "").toUpperCase())) {\r
        const snap = await safeGetDocs(query(\r
          collection(db, "schools", schoolId, "students"),\r
          where(field, "==", lookupValue)\r
        ));\r
        if (!snap.empty) return { id: snap.docs[0].id, ...snap.docs[0].data() };\r
      }\r
    }\r
\r
    return null;\r
  }\r
\r
  async function fetchArchivedStudentFromSchool(schoolId, profileSeed = {}, primaryKey = "") {\r
    if (!schoolId) return null;\r
    const docCandidates = [\r
      profileSeed.studentDocId,\r
      state.session?.studentDocId,\r
      primaryKey,\r
      profileSeed.studentId,\r
      state.session?.studentId,\r
      state.session?.uid\r
    ].map(value => String(value || "").trim()).filter(Boolean);\r
\r
    for (const candidate of [...new Set(docCandidates)]) {\r
      const snap = await safeGetDoc(doc(db, "schools", schoolId, "passedOutStudents", candidate));\r
      if (snap?.exists?.()) return { id: snap.id, ...snap.data() };\r
    }\r
\r
    const queryCandidates = [\r
      ["studentId", profileSeed.studentId || state.session?.studentId || primaryKey],\r
      ["authUid", profileSeed.authUid || state.session?.authUid || state.session?.uid],\r
      ["uid", profileSeed.uid || state.session?.uid],\r
      ["email", profileSeed.email || state.session?.email],\r
      ["authEmail", profileSeed.authEmail || state.session?.authEmail],\r
      ["parentEmail", profileSeed.parentEmail || state.session?.parentEmail],\r
      ["fatherEmail", profileSeed.fatherEmail || state.session?.fatherEmail],\r
      ["motherEmail", profileSeed.motherEmail || state.session?.motherEmail],\r
      ["guardianEmail", profileSeed.guardianEmail || state.session?.guardianEmail]\r
    ].filter(([, value]) => String(value || "").trim());\r
\r
    for (const [field, value] of queryCandidates) {\r
      for (const lookupValue of studentLookupValues(value, String(value || "").toLowerCase(), String(value || "").toUpperCase())) {\r
        const snap = await safeGetDocs(query(\r
          collection(db, "schools", schoolId, "passedOutStudents"),\r
          where(field, "==", lookupValue)\r
        ));\r
        if (!snap.empty) return { id: snap.docs[0].id, ...snap.docs[0].data() };\r
      }\r
    }\r
\r
    return null;\r
  }\r
\r
  function latestByRecent(items) {\r
    return [...items].sort((a,b)=>\r
      (toDate(b.updatedAt)||toDate(b.date)||toDate(b.createdAt)||0)-\r
      (toDate(a.updatedAt)||toDate(a.date)||toDate(a.createdAt)||0)\r
    );\r
  }\r
\r
  function uniqueFeeItems(items = [], signatureFn) {\r
    const seen = new Set();\r
    return items.filter((item, index) => {\r
      const signature = String(signatureFn(item, index) || "").toLowerCase();\r
      if (seen.has(signature)) return false;\r
      seen.add(signature);\r
      return true;\r
    });\r
  }\r
\r
  function feeImpositionEntries(fee = {}) {\r
    return uniqueFeeItems(\r
      Array.isArray(fee.impositions) ? fee.impositions : [],\r
      (imposition) => [imposition.month || fee.month || "", imposition.amount || 0, imposition.remarks || ""].join("|")\r
    );\r
  }\r
\r
  function normalizeFeeForDisplay(fee = {}) {\r
    const impositions = feeImpositionEntries(fee);\r
    if (!impositions.length) return fee;\r
    const uniquePrincipal = impositions.reduce((sum, imposition) => sum + moneyNumber(imposition.amount || 0), 0);\r
    const fine = feeFineAmount(fee);\r
    const storedTotal = moneyNumber(fee.amount ?? fee.originalAmount ?? 0);\r
    if (uniquePrincipal <= 0 || uniquePrincipal >= storedTotal) return { ...fee, impositions };\r
    const totalPaid = moneyNumber(fee.totalPaidAmount ?? fee.paidAmount ?? 0);\r
    const extra = feeExtraAmount(fee);\r
    const total = uniquePrincipal + fine;\r
    const due = Math.max(0, total - totalPaid);\r
    return {\r
      ...fee,\r
      impositions,\r
      amount: total,\r
      originalAmount: total,\r
      remainingAmount: due,\r
      totalCollectedAmount: totalPaid + extra,\r
      status: due <= 0 ? "Paid" : totalPaid > 0 ? "Partial" : (fee.status || "Imposed")\r
    };\r
  }\r
\r
  function uniqueFeesByMonth(fees) {\r
    const map=new Map();\r
    for (const f of latestByRecent(fees).map(normalizeFeeForDisplay)) {\r
      const k=String(f.month||"").trim().toLowerCase()||f.id;\r
      if (!map.has(k)) {\r
        map.set(k, f);\r
      } else {\r
        const existing = map.get(k);\r
        const grouped = [existing, f].map(normalizeFeeForDisplay);\r
        const impositions = uniqueFeeItems(grouped.flatMap(feeImpositionEntries), (imposition) =>\r
          [imposition.month || existing.month || "", imposition.amount || 0, imposition.remarks || ""].join("|")\r
        );\r
        const fineDetails = uniqueFeeItems(grouped.flatMap((fee) => feeFineDetails(fee)), (fine) =>\r
          fine.ruleKey || [fine.amount || 0, fine.reason || ""].join("|")\r
        );\r
        const payments = uniqueFeeItems(grouped.flatMap((fee) => Array.isArray(fee.payments) ? fee.payments : []), (payment, index) =>\r
          payment.transactionId || payment.ledgerTransactionId || payment.txnId || payment.paymentId || [\r
            payment.receivedAmount ?? payment.amount ?? 0,\r
            payment.appliedAmount ?? payment.amount ?? 0,\r
            payment.extraAmount || 0,\r
            payment.status || "",\r
            payment.note || "",\r
            index\r
          ].join("|")\r
        );\r
        const storedTotal = Math.max(...grouped.map((fee) => moneyNumber(fee.amount ?? fee.originalAmount ?? 0)));\r
        const principal = impositions.reduce((sum, imposition) => sum + moneyNumber(imposition.amount || 0), 0);\r
        const fine = fineDetails.reduce((sum, detail) => sum + moneyNumber(detail.amount || 0), 0);\r
        const total = principal > 0 && principal < storedTotal ? principal + fine : storedTotal;\r
        const paymentPaid = payments.reduce((sum, payment) => sum + moneyNumber(payment.appliedAmount ?? payment.amount ?? 0), 0);\r
        const storedPaid = Math.max(...grouped.map((fee) => moneyNumber(fee.totalPaidAmount ?? fee.paidAmount ?? 0)));\r
        const paid = Math.max(paymentPaid, storedPaid);\r
        const extra = Math.max(...grouped.map((fee) => feeExtraAmount(fee)));\r
        const due = Math.max(0, total - paid);\r
        map.set(k, normalizeFeeForDisplay({\r
          ...existing,\r
          amount: total,\r
          originalAmount: total,\r
          paidAmount: paid,\r
          totalPaidAmount: paid,\r
          totalExtraPaidAmount: extra,\r
          totalCollectedAmount: paid + extra,\r
          remainingAmount: due,\r
          status: due <= 0 ? "Paid" : paid > 0 ? "Partial" : (existing.status || "Imposed"),\r
          impositions,\r
          fineDetails,\r
          payments\r
        }));\r
      }\r
    }\r
    return [...map.values()];\r
  }\r
\r
  function feeExtraAmount(fee = {}) {\r
    const stored = moneyNumber(fee.totalExtraPaidAmount || fee.extraPaidAmount || fee.extraAmount || 0);\r
    if (stored) return stored;\r
    return (Array.isArray(fee.payments) ? fee.payments : [])\r
      .reduce((sum, payment) => sum + moneyNumber(payment.extraAmount || 0), 0);\r
  }\r
\r
  function feeFineDetails(fee = {}) {\r
    return Array.isArray(fee.fineDetails) ? fee.fineDetails : [];\r
  }\r
\r
  function feeFineAmount(fee = {}) {\r
    const stored = moneyNumber(fee.totalFineAmount || fee.fineAmount || 0);\r
    if (stored) return stored;\r
    return feeFineDetails(fee).reduce((sum, fine) => sum + moneyNumber(fine.amount || 0), 0);\r
  }\r
\r
  function calcAttendance(records) {\r
    const total=records.length; if (!total) return {total:0,present:0,half:0,absent:0,percentage:0};\r
    const c=records.reduce((a,r)=>{\r
      const s=String(r.status||"").toLowerCase();\r
      if(s==="present") a.present++; else if(s==="half day") a.half++; else a.absent++;\r
      return a;\r
    },{total,present:0,half:0,absent:0});\r
    return {...c, percentage:Math.round(((c.present+c.half*0.5)/total)*100)};\r
  }\r
\r
  function calcFees(fees) {\r
    return uniqueFeesByMonth(fees).reduce((s,f)=>{\r
      const amt=moneyNumber(f.amount??f.originalAmount??0);\r
      const paid=moneyNumber(f.totalPaidAmount??f.paidAmount??0);\r
      const extra=feeExtraAmount(f);\r
      const due=moneyNumber(f.remainingAmount??Math.max(0,amt-paid));\r
      s.total+=amt; s.paid+=paid; s.extra+=extra; s.collected+=paid+extra; s.due+=due; return s;\r
    },{total:0,paid:0,extra:0,collected:0,due:0});\r
  }\r
\r
  function getResultDueAmount() {\r
    return Math.max(0, Number(calcFees(state.fees).due || 0));\r
  }\r
\r
  function isResultLocked() {\r
    return getResultDueAmount() > 0;\r
  }\r
\r
  function resultLockMessage() {\r
    return \`Your fee dues are not clear yet. Please clear pending dues of \${fmt(getResultDueAmount())} to unlock your report card.\`;\r
  }\r
\r
  function renderResultLockedPanel() {\r
    const panel = $("resultPanel");\r
    if (!panel) return;\r
    panel.innerHTML = \`\r
      <div class="result-lock-panel">\r
        <div class="result-lock-icon">\r
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">\r
            <rect x="3" y="6" width="18" height="13" rx="2"></rect>\r
            <path d="M3 10h18"></path>\r
            <path d="M7 15h.01"></path>\r
            <path d="M11 15h3"></path>\r
          </svg>\r
        </div>\r
        <div>\r
          <h3>Report card locked until dues are cleared</h3>\r
          <p>\${esc(resultLockMessage())}</p>\r
          <span class="result-lock-amount">Pending dues: \${esc(fmt(getResultDueAmount()))}</span>\r
        </div>\r
      </div>\r
    \`;\r
  }\r
\r
  window.openResultDueModal = function() {\r
    const text = $("resultDueModalText");\r
    if (text) text.textContent = resultLockMessage();\r
    $("resultDueModal")?.classList.add("open");\r
  };\r
\r
  window.closeResultDueModal = function() {\r
    $("resultDueModal")?.classList.remove("open");\r
  };\r
\r
  function compactId(value, fallback = "-") {\r
    const raw = String(value || "").trim();\r
    if (!raw) return fallback;\r
    return raw.length > 28 ? \`\${raw.slice(0, 12)}...\${raw.slice(-8)}\` : raw;\r
  }\r
\r
  function generatedTxnId(fee, index) {\r
    const base = String(fee.id || \`\${fee.studentId || getStudentKey() || "student"}-\${fee.month || "fee"}\`)\r
      .replace(/[^a-zA-Z0-9]/g, "")\r
      .slice(-8)\r
      .toUpperCase() || "FEE";\r
    return \`TXN-\${base}-\${String(index + 1).padStart(2, "0")}\`;\r
  }\r
\r
  function generatedReceiptId(fee, payment, index) {\r
    const existing = payment?.receiptId || payment?.receiptNo || payment?.receiptNumber || payment?.receipt || payment?.receipt_id;\r
    if (existing) return String(existing);\r
    const dateKey = toDate(payment?.date || payment?.paidAt || payment?.createdAt)?.toISOString().slice(0,10).replace(/-/g,"") || "DATE";\r
    const base = String(fee.id || fee.month || "fee").replace(/[^a-zA-Z0-9]/g, "").slice(-6).toUpperCase() || "FEE";\r
    return \`RCP-\${base}-\${dateKey}-\${String(index + 1).padStart(2, "0")}\`;\r
  }\r
\r
  function buildFeeTransactions() {\r
    const rows = [];\r
    uniqueFeesByMonth(state.fees || []).forEach((fee) => {\r
      const fallbackImposedAmount = Math.max(0, moneyNumber(fee.amount ?? fee.originalAmount ?? 0) - feeFineAmount(fee));\r
      const impositions = feeImpositionEntries(fee);\r
      const imposedAmount = impositions.reduce((sum, imposition) => sum + moneyNumber(imposition.amount || 0), 0) || fallbackImposedAmount;\r
      const imposedDate = impositions[0]?.date || fee.imposedDate || fee.date || fee.createdAt;\r
      const imposedRemarks = impositions.map((imposition) => imposition.remarks).filter(Boolean).join(", ") || fee.impositionRemark || fee.remarks || "";\r
      const imposedTransactionId = impositions.map((imposition) => imposition.transactionId).filter(Boolean)[0] || "";\r
      const impositionRows = imposedAmount > 0\r
        ? [{\r
            amount: imposedAmount,\r
            month: fee.month,\r
            date: imposedDate,\r
            status: fee.status === "Paid" ? "Imposed" : (fee.status || "Imposed"),\r
            remarks: imposedRemarks,\r
            transactionId: imposedTransactionId\r
          }]\r
        : fallbackImposedAmount > 0\r
          ? [{\r
              amount: fallbackImposedAmount,\r
              month: fee.month,\r
              date: fee.imposedDate || fee.date || fee.createdAt,\r
              status: fee.status === "Paid" ? "Imposed" : (fee.status || "Imposed"),\r
              remarks: fee.impositionRemark || fee.remarks || ""\r
            }]\r
          : [];\r
      impositionRows.forEach((imposition, index) => {\r
        const amount = moneyNumber(imposition.amount || 0);\r
        if (!Number.isFinite(amount) || amount <= 0) return;\r
        const dateKey = toDate(imposition.date || fee.imposedDate || fee.date || fee.createdAt)?.toISOString().slice(0, 10).replace(/-/g, "") || "DATE";\r
        const base = String(fee.id || \`\${fee.studentId || getStudentKey() || "student"}-\${fee.month || "fee"}\`)\r
          .replace(/[^a-zA-Z0-9]/g, "")\r
          .slice(-8)\r
          .toUpperCase() || "FEE";\r
        rows.push({\r
          id: \`\${fee.id || fee.month || "fee"}_imposed_\${index}\`,\r
          feeId: fee.id || "",\r
          month: imposition.month || fee.month || "-",\r
          amount,\r
          appliedAmount: 0,\r
          extraAmount: 0,\r
          status: "Fee imposed",\r
          date: imposition.date || fee.imposedDate || fee.date || fee.createdAt,\r
          transactionId: imposition.transactionId || \`IMP-\${base}-\${dateKey}-\${String(index + 1).padStart(2, "0")}\`,\r
          receiptId: "-",\r
          remarks: imposition.remarks || fee.impositionRemark || fee.remarks || "Fee imposed",\r
          source: "fee-imposition"\r
        });\r
      });\r
      const payments = Array.isArray(fee.payments) ? fee.payments : [];\r
      payments.forEach((payment, index) => {\r
        const amount = moneyNumber(payment.receivedAmount ?? payment.appliedAmount ?? payment.amount ?? 0);\r
        if (!Number.isFinite(amount) || amount <= 0) return;\r
        const transactionId = payment.transactionId || payment.txnId || payment.paymentId || generatedTxnId(fee, index);\r
        rows.push({\r
          id: \`\${fee.id || fee.month || "fee"}_\${index}\`,\r
          feeId: fee.id || "",\r
          month: fee.month || payment.month || "-",\r
          amount,\r
          appliedAmount: moneyNumber(payment.appliedAmount ?? payment.amount ?? amount),\r
          extraAmount: moneyNumber(payment.extraAmount ?? 0),\r
          status: payment.status || fee.status || "Paid",\r
          date: payment.date || payment.paidAt || payment.createdAt || fee.lastPaymentDate || fee.updatedAt || fee.date,\r
          transactionId,\r
          receiptId: generatedReceiptId(fee, payment, index),\r
          remarks: payment.remarks || fee.remarks || "",\r
          source: "fee-payment"\r
        });\r
      });\r
      feeFineDetails(fee).forEach((fine, index) => {\r
        const amount = moneyNumber(fine.amount || 0);\r
        if (!Number.isFinite(amount) || amount <= 0) return;\r
        const ruleKey = String(fine.ruleKey || \`\${fee.id || fee.month || "fee"}-fine-\${index}\`);\r
        const txId = \`FINE-\${ruleKey.replace(/[^a-zA-Z0-9]/g, "").slice(-14).toUpperCase()}-\${String(index + 1).padStart(2, "0")}\`;\r
        rows.push({\r
          id: \`\${fee.id || fee.month || "fee"}_fine_\${index}\`,\r
          feeId: fee.id || "",\r
          month: fine.month || fee.month || "-",\r
          amount,\r
          appliedAmount: amount,\r
          extraAmount: 0,\r
          status: "Fine",\r
          date: fine.date || fee.updatedAt || fee.date,\r
          transactionId: txId,\r
          receiptId: "-",\r
          remarks: fine.reason || \`Late fee fine for \${fine.month || fee.month || "fee month"}\`,\r
          source: "fee-fine"\r
        });\r
      });\r
    });\r
\r
    const seen = new Set(rows.map(r => String(r.transactionId || "").toLowerCase()).filter(Boolean));\r
    (state.transactions || []).forEach((tx) => {\r
      const status = String(tx.status || "").toLowerCase();\r
      const amount = moneyNumber(tx.amount || 0);\r
      const transactionId = tx.transactionId || tx.paymentId || tx.id || "";\r
      if (!amount || !transactionId || seen.has(String(transactionId).toLowerCase())) return;\r
      if (status && !status.includes("paid") && !status.includes("captured") && !status.includes("success")) return;\r
      rows.push({\r
        id: tx.id || transactionId,\r
        feeId: tx.feeId || "",\r
        month: tx.month || "-",\r
        amount,\r
        appliedAmount: amount,\r
        extraAmount: 0,\r
        status: tx.status || "Paid",\r
        date: tx.updatedAt || tx.createdAt,\r
        transactionId,\r
        receiptId: tx.receiptId || tx.receiptNo || \`RCP-\${String(transactionId).replace(/[^a-zA-Z0-9]/g,"").slice(-10).toUpperCase()}\`,\r
        remarks: tx.error || tx.remarks || "",\r
        source: "online-transaction"\r
      });\r
    });\r
\r
    return rows.sort((a,b)=>(toDate(b.date)||0)-(toDate(a.date)||0));\r
  }\r
\r
  function parseTimestampMillis(val) {\r
    if (!val) return 0;\r
    if (typeof val?.toMillis === "function") return val.toMillis();\r
    if (typeof val?.toDate === "function") return val.toDate().getTime();\r
    if (val?.seconds) return val.seconds * 1000;\r
    if (val instanceof Date) return val.getTime();\r
    if (typeof val === "number") return val;\r
    if (typeof val === "string") {\r
      const parsed = Date.parse(val);\r
      if (!isNaN(parsed)) return parsed;\r
    }\r
    return 0;\r
  }\r
\r
  function latestReport(r) {\r
    if (!Array.isArray(r) || !r.length) return null;\r
    return [...r].sort((a,b)=>(parseTimestampMillis(b.createdAt || b.updatedAt) - parseTimestampMillis(a.createdAt || a.updatedAt)))[0]||null;\r
  }\r
\r
  /* --- SCHOOL NAME (Permanent, from Firestore) --- */\r
  async function fetchAndSetSchoolName(schoolId) {\r
    if (!schoolId) return;\r
    let cachedName = "";\r
    try { cachedName = localStorage.getItem("schoolixSchoolName_" + schoolId) || ""; } catch {}\r
    let name = firstProfileText(state.session?.schoolName, cachedName, window.SchoolBranding?.getSchoolName?.(), "Schoolix");\r
    let logoUrl = "";\r
    applySchoolName(name);\r
\r
    const schoolSnap = await safeGetDoc(doc(db, "schools", schoolId));\r
    if (schoolSnap?.exists?.()) {\r
      const school = schoolSnap.data();\r
      name = firstProfileText(school.schoolName, school.name, school.instituteName, school.institute, name);\r
      logoUrl = firstProfileText(school.logoUrl, school.schoolLogoUrl, logoUrl);\r
    }\r
\r
    const brandSnap = await safeGetDoc(doc(db, "schools", schoolId, "config", "branding"));\r
    if (brandSnap?.exists?.()) {\r
      const brand = brandSnap.data();\r
      name = firstProfileText(brand.schoolName, brand.name, name);\r
      logoUrl = firstProfileText(brand.logoUrl, brand.schoolLogoUrl, logoUrl);\r
    }\r
\r
    const adminSnap = await safeGetDoc(doc(db, "users", schoolId));\r
    if (adminSnap?.exists?.()) {\r
      const admin = adminSnap.data();\r
      name = firstProfileText(admin.schoolName, admin.instituteName, name);\r
      logoUrl = firstProfileText(admin.logoUrl, admin.schoolLogoUrl, logoUrl);\r
    }\r
\r
    state.schoolName = name;\r
    if (state.session) {\r
      state.session = { ...state.session, schoolId, schoolName: name };\r
      saveSession(state.session);\r
    }\r
    try { localStorage.setItem("schoolixSchoolName_" + schoolId, name); } catch {}\r
    if (logoUrl) window.SchoolBranding?.persistSchoolLogo?.(logoUrl);\r
    applySchoolName(name);\r
  }\r
\r
  function applySchoolName(name) {\r
    if (!name) return;\r
    state.schoolName = name;\r
    if ($("sidebarSchoolName")) $("sidebarSchoolName").textContent = name;\r
    if ($("pdSchoolName")) $("pdSchoolName").textContent = name;\r
    // Also update welcome bar subtitle\r
    if ($("welcomeSub")) {\r
      $("welcomeSub").textContent = name;\r
    }\r
    window.SchoolBranding?.persistSchoolName?.(name);\r
  }\r
\r
  async function loadAttendanceTeacherLookup() {\r
    state.teacherLookup = new Map();\r
    if (!state.schoolId) return;\r
    try {\r
      const teachersSnap = await getDocs(collection(db, "schools", state.schoolId, "teachers"));\r
      teachersSnap.docs.forEach((teacherDoc) => {\r
        const teacher = teacherDoc.data() || {};\r
        const name = teacher.name || teacher.teacherName || teacher.fullName || "Teacher";\r
        [teacherDoc.id, teacher.uid, teacher.teacherId, teacher.email].filter(Boolean).forEach((key) => {\r
          state.teacherLookup.set(String(key), name);\r
        });\r
      });\r
    } catch (error) {\r
      console.warn("Teacher lookup fetch failed:", error);\r
    }\r
  }\r
\r
  /* --- PLACEMENT HELPERS --- */\r
  function getPlacementForSession(sessionId = state.activeSessionId) {\r
    if (!state.profile || !sessionId) return null;\r
    const placements = state.profile.sessionPlacements || {};\r
    if (placements[sessionId]) return placements[sessionId];\r
    const session = state.sessions.find(s => s.id === sessionId);\r
    const label = getSessionLabel(session);\r
    return Object.values(placements).find(p =>\r
      p?.sessionId === sessionId ||\r
      (label && (p?.session === label || p?.currentYear === label))\r
    ) || null;\r
  }\r
\r
  function getClassForSession() {\r
    const p = getPlacementForSession();\r
    return p?.class || state.profile?.class || "";\r
  }\r
  function getSectionForSession() {\r
    const p = getPlacementForSession();\r
    return p?.section || state.profile?.section || "";\r
  }\r
  function getRollForSession() {\r
    const p = getPlacementForSession();\r
    return p?.roll || state.profile?.roll || state.profile?.rollNo || "";\r
  }\r
\r
  function badgeCls(s) {\r
    const n=String(s||"").toLowerCase();\r
    if(n==="present") return "present"; if(n==="absent") return "absent"; if(n==="half day") return "half";\r
    if(n==="paid") return "paid"; if(n==="partial paid"||n==="partial") return "partial"; if(n==="unpaid") return "unpaid";\r
    if(n==="issued") return "issued"; if(n==="returned") return "returned"; if(n==="overdue") return "overdue";\r
    return "pending";\r
  }\r
\r
  function termKey(t) {\r
    return String(t||"").trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");\r
  }\r
\r
  function cleanTermToken(t) {\r
    return String(t || "").trim().toLowerCase().replace(/[^a-z0-9]/g, "");\r
  }\r
\r
  function termKeysMatch(k1, k2) {\r
    if (!k1 || !k2) return false;\r
    const s1 = cleanTermToken(k1);\r
    const s2 = cleanTermToken(k2);\r
    return s1.length > 0 && s1 === s2;\r
  }\r
\r
  function getReportRemarks(obtained, maxMarks) {\r
    if (obtained == null || isNaN(obtained)) return "Not evaluated";\r
    const max = Number(maxMarks || 100);\r
    const pct = max ? (Number(obtained) / max) * 100 : 0;\r
    if (pct >= 85) return "Excellent";\r
    if (pct >= 70) return "Very Good";\r
    if (pct >= 50) return "Good";\r
    if (pct >= 33) return "Satisfactory";\r
    return "Needs Improvement";\r
  }\r
\r
  function getReportGrade(pct) {\r
    const p = Number(pct || 0);\r
    if (p >= 90) return "A+";\r
    if (p >= 80) return "A";\r
    if (p >= 60) return "B";\r
    if (p >= 33) return "C";\r
    return "F";\r
  }\r
\r
  function getReportTermKey(report = {}) {\r
    return report.termKey || termKey(report.termLabel || report.term || "");\r
  }\r
\r
  function getResultVisibilityKey(termKeyValue) {\r
    if (!termKeyValue) return "";\r
    const sessionId = state.activeSessionId || "";\r
    return sessionId ? \`\${sessionId}__\${termKeyValue}\` : termKeyValue;\r
  }\r
\r
  function isResultTermLive(termKeyValue) {\r
    if (!termKeyValue) return true;\r
    const visibilityMap = state.resultVisibility;\r
    if (!visibilityMap || typeof visibilityMap !== "object" || Object.keys(visibilityMap).length === 0) {\r
      return true;\r
    }\r
\r
    const directKey = getResultVisibilityKey(termKeyValue);\r
    const bareKey = termKeyValue;\r
    const normKey = cleanTermToken(termKeyValue);\r
\r
    let entry = visibilityMap[directKey] || visibilityMap[bareKey];\r
    if (!entry) {\r
      entry = Object.values(visibilityMap).find(v => {\r
        if (!v) return false;\r
        const candidateKey = cleanTermToken(v.termKey || v.termLabel || v.term || "");\r
        return candidateKey && candidateKey === normKey;\r
      });\r
    }\r
\r
    if (entry && typeof entry === "object") {\r
      return entry.live !== false;\r
    }\r
\r
    return true;\r
  }\r
\r
  function filterLiveReportsForStudent(reports = []) {\r
    return reports.filter(report => isResultTermLive(getReportTermKey(report)));\r
  }\r
\r
  function filterLiveTermsForStudent(terms = []) {\r
    return terms.filter(term => {\r
      const key = term.termKey || termKey(term.label || term.term || term.name || term.id || "");\r
      return isResultTermLive(key);\r
    });\r
  }\r
\r
  /* --- RENDER: PROFILE --- */\r
  function renderProfile(p) {\r
    const school = state.schoolName || window.SchoolBranding?.getSchoolName?.() || "Schoolix Academy";\r
    const status = p.status || (p.tcIssued ? "TC Issued" : state.isArchived ? "Passed Out" : "Active");\r
    const items = [\r
      ["Full Name", p.name], ["Student ID", p.studentId||getStudentKey()],\r
      ["SR Number", p.srNumber],\r
      ["Class", getClassForSession()], ["Section", getSectionForSession()], ["Roll No.", getRollForSession()],\r
      ["Status", status], ["Admission Date", fmtDate(p.admissionDate || p.dateOfAdmission)],\r
      ["Date of Birth", fmtDate(p.dob)], ["Gender", p.gender], ["Category", p.category],\r
      ["Aadhaar Number", p.aadharNumber], ["Blood Group", p.bloodGroup], ["Religion", p.religion],\r
      ["Father's Name", p.father], ["Mother's Name", p.mother],\r
      ["Father's Phone", p.fatherPhone||p.fatherMobile||p.fatherContact||p.phone],\r
      ["Mother's Phone", p.motherPhone||p.motherMobile||p.motherContact||p.phone],\r
      ["Phone", p.phone], ["Email", p.email],\r
      ["Parent Email", p.parentEmail || p.fatherEmail || p.motherEmail],\r
      ["Previous School", p.previousSchool], ["Address", p.address],\r
      ["Document List", p.documentList || p.documents],\r
      ["Academic Year", p.currentYear], ["Year of Admission", p.yearOfAdmission], ["School", school]\r
    ];\r
    $("profileGrid").innerHTML = \`<div style="grid-column:1/-1">\${renderStudentPhoto(p)}</div>\` + items.map(([l,v]) => \`\r
      <div class="profile-item"><strong>\${esc(l)}</strong><span>\${esc(v||"-")}</span></div>\r
    \`).join("");\r
    renderArchiveDetails(p);\r
  }\r
\r
  function renderArchiveDetails(p = {}) {\r
    const card = $("archiveDetailsCard");\r
    const grid = $("archiveDetailsGrid");\r
    if (!card || !grid) return;\r
    if (!state.isArchived) {\r
      card.classList.add("hidden");\r
      grid.innerHTML = "";\r
      return;\r
    }\r
    const tc = p.transferCertificate || {};\r
    const finalClass = [p.finalClass || p.class, p.finalSection || p.section].filter(Boolean).join("-");\r
    const baseStatus = p.status || (p.tcIssued ? "TC Issued" : "Passed Out");\r
    const statusText = p.tcIssued && baseStatus !== "TC Issued" ? \`\${baseStatus} + TC Issued\` : baseStatus;\r
    const items = [\r
      ["Archive Status", statusText],\r
      ["Passout Year", p.passoutYear],\r
      ["Archive Reason", p.archiveReason],\r
      ["Final Class", finalClass],\r
      ["TC Number", p.tcNumber || tc.tcNumber],\r
      ["TC Leaving Date", tc.leavingDate],\r
      ["TC Reason", tc.reason],\r
      ["TC Conduct", tc.conduct],\r
      ["Archived Attendance", normalizeArchivedArray(p.records?.attendance).length],\r
      ["Archived Fee Records", normalizeArchivedArray(p.records?.fees).length],\r
      ["Archived Report Cards", normalizeArchivedArray(p.records?.reportCards).length]\r
    ];\r
    grid.innerHTML = items.map(([label, value]) => \`\r
      <div class="archive-item"><strong>\${esc(label)}</strong><span>\${esc(value || "-")}</span></div>\r
    \`).join("");\r
    card.classList.remove("hidden");\r
  }\r
\r
  /* --- RENDER: ATTENDANCE --- */\r
  function populateAttendanceMonthFilter(records = []) {\r
    const select = $("attendanceMonthFilter");\r
    if (!select) return;\r
    const preferredMonth = currentMonthKey();\r
    const current = state.attendanceMonthFilterTouched\r
      ? (state.attendanceMonthFilter || "")\r
      : (state.attendanceMonthFilter || select.value || preferredMonth);\r
    const months = [...new Set([preferredMonth, ...records.map(getAttendanceMonthKey).filter(Boolean)].filter(Boolean))]\r
      .sort((a, b) => b.localeCompare(a));\r
    select.innerHTML = \`<option value="">All months</option>\` + months.map((key) =>\r
      \`<option value="\${esc(key)}">\${esc(monthLabelFromKey(key))}</option>\`\r
    ).join("");\r
    if (current === "") {\r
      select.value = "";\r
      state.attendanceMonthFilter = "";\r
    } else if (current && months.includes(current)) {\r
      select.value = current;\r
      state.attendanceMonthFilter = current;\r
    } else {\r
      select.value = preferredMonth;\r
      state.attendanceMonthFilter = preferredMonth;\r
    }\r
  }\r
\r
  window.onAttendanceMonthChange = function() {\r
    state.attendanceMonthFilter = $("attendanceMonthFilter")?.value || "";\r
    state.attendanceMonthFilterTouched = true;\r
    renderAttendance(state.attendance);\r
  };\r
\r
  function renderAttendance(records) {\r
    populateAttendanceMonthFilter(records);\r
    const visibleRecords = state.attendanceMonthFilter\r
      ? records.filter((record) => getAttendanceMonthKey(record) === state.attendanceMonthFilter)\r
      : records;\r
    const s = calcAttendance(visibleRecords);\r
    $("attPct").textContent     = s.total ? \`\${s.percentage}%\` : "-";\r
    $("attTotal").textContent   = \`\${s.total} total records\`;\r
    $("attPresent").textContent = s.total ? s.present : "-";\r
    $("attHalf").textContent    = s.total ? s.half    : "-";\r
    $("attAbsent").textContent  = s.total ? s.absent  : "-";\r
\r
    if ($("attendanceFilterNote")) {\r
      const monthText = state.attendanceMonthFilter ? monthLabelFromKey(state.attendanceMonthFilter) : "all months";\r
      $("attendanceFilterNote").textContent = \`Showing \${monthText} for \${state.activeSessionLabel || "selected session"}.\`;\r
    }\r
\r
    if (!visibleRecords.length) {\r
      $("attendanceTable").innerHTML = \`<tr><td colspan="4"><div class="empty-state"><div class="empty-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg></div>No attendance records found yet.</div></td></tr>\`;\r
      return;\r
    }\r
    $("attendanceTable").innerHTML = visibleRecords.map(r => {\r
      const status = r.status || "Pending";\r
      const markedBy = getAttendanceMarkerName(r);\r
      return \`<tr>\r
        <td>\${esc(fmtDate(r.date))}</td>\r
        <td><span class="badge \${badgeCls(status)}">\${esc(status)}</span></td>\r
        <td style="color:var(--text2)">\${esc(markedBy)}</td>\r
        <td style="color:var(--text2)">\${esc(r.remarks||"-")}</td>\r
      </tr>\`;\r
    }).join("");\r
  }\r
\r
  function getAttendanceMarkerName(record) {\r
    const role = String(record.markedByRole || record.source || record.createdByRole || "").toLowerCase();\r
    if (role.includes("admin")) return record.markedBy || "Admin Staff";\r
\r
    const directName = record.markedBy || record.teacherName || record.createdByName || record.updatedByName;\r
    if (directName) return directName;\r
\r
    const teacherKey = record.teacherId || record.teacherUid || record.markedByUid || record.createdBy;\r
    if (teacherKey && state.teacherLookup?.has(teacherKey)) return state.teacherLookup.get(teacherKey);\r
    if (teacherKey) return "Teacher";\r
\r
    return "Admin Staff";\r
  }\r
\r
  /* --- RENDER: FEES --- */\r
  function renderFees(fees) {\r
    const unique = uniqueFeesByMonth(fees);\r
    const s = calcFees(fees);\r
\r
    $("feesTotal").textContent  = s.total ? fmt(s.total) : "-";\r
    $("feesPaid").textContent   = s.collected ? fmt(s.collected) : "-";\r
    $("feesDue").textContent    = fmt(s.due);\r
    $("feesMonths").textContent = s.extra > 0 ? \`\${unique.length} month(s)  -  Extra \${fmt(s.extra)}\` : \`\${unique.length} month(s)\`;\r
\r
    if (!unique.length) {\r
      $("feesTable").innerHTML = \`<tr><td colspan="7"><div class="empty-state"><div class="empty-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><rect x="1" y="6" width="22" height="13" rx="2"/><path d="M1 10h22"/></svg></div>No fee records found yet.</div></td></tr>\`;\r
      renderFeeTransactions();\r
      return;\r
    }\r
    $("feesTable").innerHTML = unique.map(f => {\r
      const amt  = moneyNumber(f.amount??f.originalAmount??0);\r
      const paid = moneyNumber(f.totalPaidAmount??f.paidAmount??0);\r
      const extra = feeExtraAmount(f);\r
      const collected = paid + extra;\r
      const fine = feeFineAmount(f);\r
      const due  = moneyNumber(f.remainingAmount??Math.max(0,amt-paid));\r
      const status = f.status||"Pending";\r
      const fJson = JSON.stringify(f).replace(/'/g, "&#39;").replace(/"/g, "&quot;");\r
      return \`<tr>\r
        <td style="font-weight:700;color:var(--text)">\${esc(f.month||"-")}</td>\r
        <td>\${esc(fmt(amt))}\${fine > 0 ? \`<div style="font-size:12px;color:#b45309;margin-top:4px;">Fine \${esc(fmt(fine))}</div>\` : ""}</td>\r
        <td style="font-weight:800;color:var(--green)">\${esc(fmt(collected))}\${extra > 0 ? \`<div style="font-size:12px;color:var(--teal);margin-top:4px;">Includes extra \${esc(fmt(extra))}</div>\` : ""}</td>\r
        <td style="color:\${due>0?"var(--rose)":"var(--text2)"}">\${esc(fmt(due))}</td>\r
        <td><span class="badge \${badgeCls(status)}">\${esc(status)}</span></td>\r
        <td style="color:var(--text2);font-size:12px;max-width:220px;white-space:normal;">\${esc(f.remarks || f.impositionRemark || "-")}</td>\r
        <td>\r
          \${paid > 0\r
            ? \`<button class="receipt-trigger-btn" onclick='openReceipt(\${fJson})'>Receipt</button>\`\r
            : due > 0 ? "" : \`<span style="color:var(--text3);font-size:12px">-</span>\`\r
          }\r
        </td>\r
      </tr>\`;\r
    }).join("");\r
    renderFeeTransactions();\r
  }\r
\r
  function renderFeeTransactions() {\r
    const box = $("feeTransactionsTable");\r
    if (!box) return;\r
    const rows = buildFeeTransactions();\r
    if (!rows.length) {\r
      box.innerHTML = \`<tr><td colspan="8"><div class="empty-state">No payment transactions yet.</div></td></tr>\`;\r
      return;\r
    }\r
    box.innerHTML = rows.map((tx) => {\r
      const status = String(tx.status || "pending");\r
      const cls = status.toLowerCase().includes("paid") || status.toLowerCase().includes("captured")\r
        ? "paid"\r
        : status.toLowerCase().includes("fail")\r
          ? "unpaid"\r
          : "pending";\r
      const txJson = JSON.stringify(tx).replace(/'/g, "&#39;").replace(/"/g, "&quot;");\r
      const isFine = tx.source === "fee-fine";\r
      const isImposition = tx.source === "fee-imposition";\r
      return \`<tr>\r
        <td>\${esc(fmtDateTime(tx.date))}</td>\r
        <td>\${esc(tx.month || "-")}</td>\r
        <td style="font-weight:800;color:var(--text)">\${esc(fmt(tx.amount || 0))}\${moneyNumber(tx.extraAmount) > 0 ? \`<div style="font-size:12px;color:var(--teal);margin-top:4px;">Extra \${esc(fmt(tx.extraAmount))}</div>\` : ""}</td>\r
        <td><span class="badge \${cls}">\${esc(status)}</span></td>\r
        <td style="font-size:12px;color:var(--text2);max-width:260px;white-space:normal;">\${esc(tx.remarks || (isFine ? "Late fee fine" : "-"))}</td>\r
        <td style="font-size:12px;color:var(--text2);word-break:break-all;" title="\${esc(tx.transactionId || "-")}">\${esc(compactId(tx.transactionId))}</td>\r
        <td style="font-size:12px;color:var(--text2);word-break:break-all;" title="\${esc(tx.receiptId || "-")}">\${esc(compactId(tx.receiptId))}</td>\r
        <td>\${isFine || isImposition ? \`<span style="color:var(--text3);font-size:12px">-</span>\` : \`<button class="receipt-trigger-btn" onclick='openTransactionReceipt(\${txJson})'>Receipt</button>\`}</td>\r
      </tr>\`;\r
    }).join("");\r
  }\r
\r
  /* --- RENDER: TERM DROPDOWN --- */\r
  function renderTermDropdown(terms) {\r
    const sel = $("studentTermSelect");\r
    if (!sel) return;\r
    if (isResultLocked()) {\r
      sel.innerHTML = \`<option value="">Results locked until dues are cleared</option>\`;\r
      sel.disabled = true;\r
      renderResultLockedPanel();\r
      return;\r
    }\r
    sel.disabled = false;\r
    const uniqueTerms = [];\r
    const seen = new Set();\r
    terms.forEach(t => {\r
      const key = t.termKey || termKey(t.label||t.term||"");\r
      if (!key || seen.has(cleanTermToken(key))) return;\r
      seen.add(cleanTermToken(key));\r
      uniqueTerms.push({ ...t, termKey: key });\r
    });\r
    if (!uniqueTerms.length) {\r
      sel.innerHTML = \`<option value="">- No terms available -</option>\`;\r
      $("resultPanel").innerHTML = \`<div class="empty-state"><div class="empty-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg></div>No terms or report cards available for this session.</div>\`;\r
      return;\r
    }\r
    sel.innerHTML = \`<option value="">- Select a term -</option>\`;\r
    uniqueTerms.forEach(t => {\r
      const opt = document.createElement("option");\r
      opt.value = t.termKey || termKey(t.label||t.term||"");\r
      opt.textContent = t.label||t.term||t.termKey||"Unknown Term";\r
      sel.appendChild(opt);\r
    });\r
  }\r
\r
  function findReportForTermKey(tk) {\r
    if (!tk) return null;\r
    return state.reports.find(r =>\r
      termKeysMatch(r.termKey, tk) ||\r
      termKeysMatch(r.termLabel || r.term || "", tk)\r
    ) || null;\r
  }\r
\r
  window.onStudentTermChange = function() {\r
    if (isResultLocked()) {\r
      renderResultLockedPanel();\r
      openResultDueModal();\r
      return;\r
    }\r
    const tk = $("studentTermSelect").value;\r
    if (!tk) {\r
      $("resultPanel").innerHTML = \`<div class="empty-state"><div class="empty-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg></div>Select a term above to view your report card.</div>\`;\r
      return;\r
    }\r
    renderReportForTerm(tk);\r
  };\r
\r
  function renderReportForTerm(tk) {\r
    if (isResultLocked()) {\r
      renderResultLockedPanel();\r
      return;\r
    }\r
    const report = findReportForTermKey(tk);\r
    if (!report) {\r
      $("resultPanel").innerHTML = \`<div class="empty-state"><div class="empty-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg></div>No marks or report card recorded for this term yet.</div>\`;\r
      return;\r
    }\r
    renderReportPanel(report);\r
  }\r
\r
  function renderReportPanel(report) {\r
    if (isResultLocked()) {\r
      renderResultLockedPanel();\r
      return;\r
    }\r
    if (!report) { $("resultPanel").innerHTML = \`<div class="empty-state">No report card available.</div>\`; return; }\r
    const subjects = Array.isArray(report.subjects) ? report.subjects : [];\r
    const pct = Number(report.percentage||0);\r
    const profile = state.profile||{};\r
    const classInfo = \`\${report.student?.class||getClassForSession()||profile.class||"-"}-\${report.student?.section||getSectionForSession()||profile.section||"-"}\`;\r
    const termLabel = report.termLabel||report.term||"Report Card";\r
    const grade = report.grade||"-";\r
    const gradeColor = grade==="A+"?"var(--green)":grade==="A"?"var(--blue)":grade==="B"?"var(--amber)":grade==="C"?"#fb923c":"var(--rose)";\r
    const gradeBg    = grade==="A+"?"var(--green-dim)":grade==="A"?"var(--blue-dim)":grade==="B"?"var(--amber-dim)":grade==="C"?"rgba(251,146,60,0.1)":"var(--rose-dim)";\r
\r
    $("resultPanel").innerHTML = \`\r
      <div class="report-card">\r
        <div class="report-header">\r
          <div>\r
            <h3>\${esc(termLabel)}</h3>\r
            <div class="report-meta">\r
              <strong>Student:</strong> \${esc(report.student?.name||profile.name||"-")}\r
              &nbsp;&middot;&nbsp;<strong>ID:</strong> \${esc(report.student?.studentId||getStudentKey())}\r
              &nbsp;&middot;&nbsp;<strong>Class:</strong> \${esc(classInfo)}<br>\r
              <strong>Percentage:</strong> \${pct?\`\${Math.round(pct)}%\`:"-"}\r
              &nbsp;&middot;&nbsp;<strong>Total Marks:</strong> \${esc(String(report.totalMarks??"-"))}/\${esc(String(report.totalMaxMarks??"-"))}\r
              &nbsp;&middot;&nbsp;<strong>Generated:</strong> \${esc(fmtDate(report.createdAt))}\r
            </div>\r
          </div>\r
          <div class="grade-pill" style="background:\${gradeBg};color:\${gradeColor};border:1px solid \${gradeColor}33;">\${esc(grade)}</div>\r
        </div>\r
        \${subjects.length ? \`\r
          <div class="subjects-table">\r
            <div class="subject-row subject-header">\r
              <div>Subject</div><div>Obtained</div><div>Max Marks</div><div>Remarks</div>\r
            </div>\r
            \${subjects.map(sub => {\r
              const ob = (sub.obtained != null && sub.obtained !== "" && !isNaN(sub.obtained)) ? Number(sub.obtained) : "";\r
              const max = Number(sub.maxMarks??sub.max??100);\r
              const sp = max ? Math.round((ob!==""?ob:0)/max*100) : 0;\r
              const col = sp>=75?"var(--green)":sp>=40?"var(--amber)":"var(--rose)";\r
              return \`<div class="subject-row">\r
                <div style="font-weight:600;color:var(--text)">\${esc(sub.name||sub.subject||"Subject")}</div>\r
                <div style="font-weight:700;color:\${col}">\${ob!==""?esc(String(ob)):"-"}</div>\r
                <div style="color:var(--text2)">\${esc(String(max))}</div>\r
                <div style="color:var(--text2);font-size:13px">\${esc(sub.remarks||"-")}</div>\r
              </div>\`;\r
            }).join("")}\r
          </div>\r
        \` : \`<div class="empty-state" style="margin:20px;border-radius:var(--r-md)">No subject-wise marks available.</div>\`}\r
      </div>\r
    \`;\r
  }\r
\r
  /* --- RENDER: TRANSPORT --- */\r
  function normalizeTransportVehicle(row) {\r
    const vehicle = row?.vehicle || row;\r
    if (!vehicle) return null;\r
    const data = vehicle.data || {};\r
    return {\r
      id: vehicle.id,\r
      vehicleNumber: vehicle.vehicleNumber || vehicle.vehicle_number || data.vehicleNumber || "-",\r
      vehicleType: vehicle.vehicleType || vehicle.vehicle_type || data.vehicleType || "Bus",\r
      capacity: vehicle.capacity || data.capacity || 0,\r
      driverName: vehicle.driverName || data.driverName || "-",\r
      driverPhone: vehicle.driverPhone || data.driverPhone || data.phone || "-",\r
      driverEmail: vehicle.driverEmail || data.driverEmail || "",\r
      routeId: vehicle.routeId || vehicle.route_id || row?.route_id || "",\r
      routeName: vehicle.routeName || data.routeName || "",\r
      routeFrom: vehicle.routeFrom || data.routeFrom || "",\r
      routeTo: vehicle.routeTo || data.routeTo || "",\r
      routeVia: vehicle.routeVia || data.routeVia || [],\r
      studentTracking: vehicle.studentTracking || data.studentTracking || {},\r
      ...data\r
    };\r
  }\r
\r
  async function resolveStudentTransport(recordStudentId) {\r
    const assignedVehicleId = state.profile?.assignedVehicleId || state.profile?.vehicleId;\r
    if (assignedVehicleId) {\r
      const vSnap = await safeGetDoc(doc(db,"schools",state.schoolId,"vehicles",assignedVehicleId));\r
      if (vSnap?.exists?.()) {\r
        const vehicle = { id: vSnap.id, ...vSnap.data() };\r
        if (vehicle.routeId) {\r
          const rtSnap = await safeGetDoc(doc(db,"schools",state.schoolId,"routes",vehicle.routeId));\r
          if (rtSnap?.exists?.()) vehicle.route = { id: rtSnap.id, ...rtSnap.data() };\r
        }\r
        return vehicle;\r
      }\r
    }\r
\r
    const transportRow = await parentVehicleForStudent(state.schoolId, recordStudentId).catch((error) => {\r
      console.warn("Student transport lookup unavailable", error);\r
      return null;\r
    });\r
    const vehicle = normalizeTransportVehicle(transportRow);\r
    if (!vehicle) return null;\r
    if (vehicle.routeId) {\r
      const rtSnap = await safeGetDoc(doc(db,"schools",state.schoolId,"routes",vehicle.routeId)).catch(() => null);\r
      if (rtSnap?.exists?.()) vehicle.route = { id: rtSnap.id, ...rtSnap.data() };\r
    }\r
    return vehicle;\r
  }\r
\r
  function renderTransport(vehicle) {\r
    if (!vehicle) {\r
      $("transportPanel").innerHTML = \`<div class="empty-state">\r
        <div class="empty-icon">\r
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M6 3h12a1 1 0 0 1 1 1v3h2a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-1v3H5v-3H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h2V4a1 1 0 0 1 1-1z"/><circle cx="9" cy="17" r="2"/><circle cx="15" cy="17" r="2"/></svg>\r
        </div>\r
        No vehicle has been assigned to you yet. Please contact your school.\r
      </div>\`;\r
      return;\r
    }\r
\r
    const route = vehicle.route || {};\r
    const viaStops = Array.isArray(vehicle.viaStops) ? vehicle.viaStops : [];\r
    \r
    // Check multiple field names for driver contact\r
    const driverContact = vehicle.driverContact || vehicle.driverPhone || vehicle.contact || vehicle.phone || "-";\r
    \r
    // Get pickup and drop-off times and places for this student\r
    const studentTracking = vehicle.studentTracking || {};\r
    let sk = getStudentKey();\r
    const myTracking = studentTracking[sk] || {};\r
    const pickupTime = myTracking.pickupTime || "-";\r
    const dropoffTime = myTracking.dropoffTime || "-";\r
    const pickupPlace = myTracking.pickupPlace || route.pickupPoint || vehicle.pickupPoint || "-";\r
    const dropoffPlace = myTracking.dropoffPlace || route.dropoffPoint || vehicle.dropoffPoint || "-";\r
\r
    $("transportPanel").innerHTML = \`\r
      <div class="card">\r
        <div class="card-title" style="color:var(--blue);margin-bottom:20px">\r
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 3h12a1 1 0 0 1 1 1v3h2a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-1v3H5v-3H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h2V4a1 1 0 0 1 1-1z"/><circle cx="9" cy="17" r="2"/><circle cx="15" cy="17" r="2"/></svg>\r
          Vehicle Details\r
        </div>\r
        <div style="border:1px solid var(--border);border-radius:var(--r-lg);overflow:hidden;margin-bottom:20px;background:var(--bg3)">\r
          <div style="padding:14px 16px;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;gap:12px;align-items:center;flex-wrap:wrap">\r
            <div>\r
              <div style="font-size:13px;font-weight:800;color:var(--text)">Track Bus</div>\r
              <div id="transportLiveStatus" style="font-size:12px;color:var(--text3);margin-top:3px">Checking active trip...</div>\r
            </div>\r
            <span id="transportLiveBadge" class="badge">Waiting</span>\r
          </div>\r
          <div id="studentTransportMap" style="height:320px"></div>\r
        </div>\r
        \r
        <div class="profile-grid" style="margin-bottom:24px">\r
          <div class="profile-item">\r
            <strong>Vehicle Number</strong>\r
            <span>\${esc(vehicle.vehicleNumber||"-")}</span>\r
          </div>\r
          <div class="profile-item">\r
            <strong>Vehicle Type</strong>\r
            <span>\${esc(vehicle.vehicleType||"-")}</span>\r
          </div>\r
          <div class="profile-item">\r
            <strong>Seating Capacity</strong>\r
            <span>\${esc(String(vehicle.capacity||"-"))} seats</span>\r
          </div>\r
        </div>\r
\r
        <div style="border-top:1px solid var(--border);padding-top:20px;margin-bottom:24px">\r
          <h3 style="font-size:14px;font-weight:700;color:var(--text);margin-bottom:16px">Driver Information</h3>\r
          <div class="profile-grid">\r
            <div class="profile-item">\r
              <strong>Driver Name</strong>\r
              <span>\${esc(vehicle.driverName||"-")}</span>\r
            </div>\r
            <div class="profile-item">\r
              <strong>Driver Contact</strong>\r
              <span style="color:var(--blue);font-weight:600">\${esc(String(driverContact))}</span>\r
            </div>\r
          </div>\r
        </div>\r
\r
        \${(route.routeId || vehicle.routeId) ? \`\r
          <div style="border-top:1px solid var(--border);padding-top:20px;">\r
            <h3 style="font-size:14px;font-weight:700;color:var(--text);margin-bottom:16px">Your Route</h3>\r
            <div style="background:var(--bg3);border:1px solid var(--border);border-radius:var(--r-lg);padding:18px;margin-bottom:16px">\r
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px">\r
                <div>\r
                  <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:var(--text3);margin-bottom:6px">Route Name</div>\r
                  <div style="font-size:15px;font-weight:600;color:var(--text)">\${esc(route.routeName || vehicle.routeName || "-")}</div>\r
                </div>\r
                <div>\r
                  <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:var(--text3);margin-bottom:6px">Route ID</div>\r
                  <div style="font-size:15px;font-weight:600;color:var(--blue)">\${esc(route.routeId || vehicle.routeId || "-")}</div>\r
                </div>\r
              </div>\r
              \r
              <div style="padding:12px;background:var(--panel);border-radius:var(--r-md);border-left:3px solid var(--blue)">\r
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:16px">\r
                <div style="background:rgba(79,144,255,0.08);border:1px solid rgba(79,144,255,0.16);border-radius:var(--r-md);padding:14px">\r
                  <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:var(--blue);margin-bottom:8px"> Pickup Point</div>\r
                  <div style="font-size:15px;font-weight:600;color:var(--text);margin-bottom:8px">\${esc(route.pickupPoint || vehicle.pickupPoint || pickupPlace)}</div>\r
                  <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:var(--text3);margin-bottom:4px">Pickup Time</div>\r
                  <div style="font-size:18px;font-weight:700;color:var(--blue)">\${pickupTime !== "-" ? pickupTime : "Not Set"}</div>\r
                </div>\r
                <div style="background:rgba(52,211,153,0.08);border:1px solid rgba(52,211,153,0.16);border-radius:var(--r-md);padding:14px">\r
                  <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:var(--green);margin-bottom:8px">Drop-off Point</div>\r
                  <div style="font-size:15px;font-weight:600;color:var(--text);margin-bottom:8px">\${esc(route.dropoffPoint || vehicle.dropoffPoint || dropoffPlace)}</div>\r
                  <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:var(--text3);margin-bottom:4px">Drop-off Time</div>\r
                  <div style="font-size:18px;font-weight:700;color:var(--green)">\${dropoffTime !== "-" ? dropoffTime : "Not Set"}</div>\r
                </div>\r
              </div>\r
              <div style="padding:12px;background:var(--panel);border-radius:var(--r-md);border-left:3px solid var(--blue)">\r
                <div style="display:flex;align-items:flex-start;gap:12px;margin-bottom:10px">\r
                  <svg style="width:18px;height:18px;color:var(--blue);flex-shrink:0;margin-top:2px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>\r
                  <div>\r
                    <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:var(--text3)">Pickup Point</div>\r
                    <div style="font-size:14px;font-weight:600;color:var(--text);margin-top:4px">\${esc(route.pickupPoint || vehicle.pickupPoint || pickupPlace)}</div>\r
                  </div>\r
                </div>\r
                \r
                <div style="display:flex;align-items:center;justify-content:center;height:24px;margin:8px 0">\r
                  <svg style="width:20px;height:20px;color:var(--text3)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>\r
                </div>\r
                \r
                <div style="display:flex;align-items:flex-start;gap:12px">\r
                  <svg style="width:18px;height:18px;color:var(--rose);flex-shrink:0;margin-top:2px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>\r
                  <div>\r
                    <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:var(--text3)">Dropoff Point</div>\r
                    <div style="font-size:14px;font-weight:600;color:var(--text);margin-top:4px">\${esc(route.dropoffPoint || vehicle.dropoffPoint || dropoffPlace)}</div>\r
                  </div>\r
                </div>\r
              </div>\r
            </div>\r
            \r
            \${viaStops.length ? \`\r
              <div style="background:var(--teal-dim);border:1px solid rgba(45,212,184,0.3);border-radius:var(--r-md);padding:14px">\r
                <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:var(--teal);margin-bottom:12px">Via Stops on This Route</div>\r
                <div style="display:flex;flex-direction:column;gap:8px">\r
                  \${viaStops.map((stop, idx) => \`\r
                    <div style="display:flex;align-items:center;gap:10px;padding:8px;background:rgba(45,212,184,0.1);border-radius:var(--r-sm)">\r
                      <div style="width:24px;height:24px;background:var(--teal);color:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:12px">\${idx + 1}</div>\r
                      <div style="font-size:13.5px;color:var(--text)">\${esc(stop)}</div>\r
                    </div>\r
                  \`).join("")}\r
                </div>\r
              </div>\r
            \` : ""}\r
          </div>\r
        \` : ""}\r
      </div>\r
    \`;\r
    initTransportLiveMap(vehicle);\r
  }\r
\r
  async function initTransportLiveMap(vehicle) {\r
    if (transportLiveUnsubscribe) {\r
      transportLiveUnsubscribe();\r
      transportLiveUnsubscribe = null;\r
    }\r
    const mapEl = $("studentTransportMap");\r
    if (!vehicle?.id || !mapEl) return;\r
    transportLiveMap = await createVehicleMap(mapEl, { zoom: 15, recenterLabel: "Show my bus" });\r
    const update = async () => {\r
      const rows = await liveLocations([vehicle.id]).catch(() => []);\r
      const status = $("transportLiveStatus");\r
      const badge = $("transportLiveBadge");\r
      if (!rows.length) {\r
        if (status) status.textContent = "Your child's vehicle is currently not on an active trip.";\r
        if (badge) badge.textContent = "OFF";\r
        clearMapMissing(transportLiveMap, []);\r
        return;\r
      }\r
      const loc = rows[0];\r
      const liveState = locationStatus(loc.updated_at);\r
      transportLiveMap?.setVehicle(vehicle.id, loc, vehicle.vehicleNumber || "Bus", {\r
        driver: vehicle.driverName || "",\r
        route: vehicle.routeName || "",\r
        status: liveState\r
      });\r
      if (status) status.textContent = \`Last updated: \${formatTransportLiveAge(loc.updated_at)}\`;\r
      if (badge) badge.textContent = liveState.toUpperCase();\r
    };\r
    await update();\r
    transportLiveUnsubscribe = subscribeTransport("schoolix_vehicle_live_locations", \`vehicle_id=eq.\${vehicle.id}\`, update, update);\r
  }\r
\r
  function formatTransportLiveAge(value) {\r
    if (!value) return "-";\r
    const seconds = Math.max(0, Math.round((Date.now() - new Date(value).getTime()) / 1000));\r
    if (seconds < 60) return \`\${seconds} seconds ago\`;\r
    return \`\${Math.round(seconds / 60)} minutes ago\`;\r
  }\r
\r
  /* LIBRARY */\r
  function renderLibrary(issues) {\r
    const rows = [...issues].sort((a,b)=>(getLibraryIssuedDate(b)?.getTime()||0)-(getLibraryIssuedDate(a)?.getTime()||0));\r
    const issued = rows.filter(r => r.status === "issued").length;\r
    const returned = rows.filter(r => r.status === "returned").length;\r
    const overdue = rows.filter(isLibraryOverdue).length;\r
\r
    if ($("libIssued")) $("libIssued").textContent = issued ? String(issued) : "-";\r
    if ($("libReturned")) $("libReturned").textContent = returned ? String(returned) : "-";\r
    if ($("libOverdue")) $("libOverdue").textContent = overdue ? String(overdue) : "-";\r
    if ($("libMaxDays")) $("libMaxDays").textContent = \`Max \${state.librarySettings.maxDays} day(s) permitted\`;\r
\r
    if (!$("libraryTable")) return;\r
    if (!rows.length) {\r
      $("libraryTable").innerHTML = \`<tr><td colspan="6"><div class="empty-state"><div class="empty-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M4 4.5A2.5 2.5 0 016.5 2H20v20H6.5A2.5 2.5 0 014 19.5z"/></svg></div>No library records found yet.</div></td></tr>\`;\r
      return;\r
    }\r
\r
    $("libraryTable").innerHTML = rows.map(entry => {\r
      const status = entry.status === "returned" ? "returned" : isLibraryOverdue(entry) ? "overdue" : "issued";\r
      const statusText = status === "overdue" ? "Overdue" : status === "returned" ? "Returned" : "Issued";\r
      const issuedBy = entry.issuedByName || entry.issuedByEmail || entry.issuedBy || "Library staff";\r
      const bookTitle = entry.bookTitle || "Untitled book";\r
      const bookNumber = entry.bookNumber ? \`Book No. \${entry.bookNumber}\` : "Book number not available";\r
      const dueDate = getLibraryDueDate(entry);\r
      return \`<tr>\r
        <td>\r
          <div style="font-weight:700;color:var(--text)">\${esc(bookTitle)}</div>\r
          <div style="color:var(--text2);font-size:12px;margin-top:3px">\${esc(bookNumber)}</div>\r
        </td>\r
        <td>\${esc(fmtDateTime(entry.issuedAt || entry.issuedAtMs))}</td>\r
        <td>\r
          <div>\${esc(fmtDate(dueDate))}</div>\r
          <div style="color:var(--text3);font-size:12px;margin-top:3px">\${getLibraryMaxDays(entry)} day(s)</div>\r
        </td>\r
        <td>\${entry.returnedAt || entry.returnedAtMs ? esc(fmtDateTime(entry.returnedAt || entry.returnedAtMs)) : '<span style="color:var(--text3)">-</span>'}</td>\r
        <td style="color:var(--text2)">\${esc(issuedBy)}</td>\r
        <td><span class="badge \${badgeCls(status)}">\${esc(statusText)}</span></td>\r
      </tr>\`;\r
    }).join("");\r
  }\r
\r
  /* --- OVERVIEW --- */\r
  function renderOverview() {\r
    const p = state.profile||{};\r
    const att   = calcAttendance(state.attendance);\r
    const fees  = calcFees(state.fees);\r
    const report = latestReport(state.reports);\r
    const records = state.attendance.length + uniqueFeesByMonth(state.fees).length + state.reports.length + state.libraryIssues.length;\r
    const school = state.schoolName || window.SchoolBranding?.getSchoolName?.() || "Schoolix Academy";\r
    const currentClass   = getClassForSession();\r
    const currentSection = getSectionForSession();\r
    const currentRoll    = getRollForSession();\r
\r
    $("welcomeTitle").textContent = \`Welcome back, \${studentDisplayName(p)}\`;\r
    $("welcomeSub").textContent   = school;\r
\r
    $("welcomeBadges").innerHTML = [\r
      currentClass ? \`<span class="w-badge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" style="width:12px;height:12px"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/></svg>Class \${currentClass}-\${currentSection||""}</span>\` : "",\r
      currentRoll  ? \`<span class="w-badge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" style="width:12px;height:12px"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>Roll No. \${currentRoll}</span>\` : "",\r
    ].join("");\r
\r
    $("ovAttendance").textContent = att.total ? \`\${att.percentage}%\` : "-";\r
    $("ovAttendanceSub").textContent = att.total ? \`\${att.present} present  -  \${att.absent} absent\` : "No data yet";\r
    $("ovFeesDue").textContent = fmt(fees.due);\r
    $("ovFeesSub").textContent = uniqueFeesByMonth(state.fees).length ? \`\${uniqueFeesByMonth(state.fees).length} fee record(s)\` : "No records yet";\r
    if (isResultLocked()) {\r
      $("ovResult").textContent = "Locked";\r
      $("ovResultSub").textContent = \`Clear dues \${fmt(getResultDueAmount())} to view\`;\r
    } else {\r
      $("ovResult").textContent  = report ? \`\${Math.round(Number(report.percentage||0))}%\` : "-";\r
      $("ovResultSub").textContent = report ? \`Latest: \${report.termLabel||report.term||"Report Card"}\` : "No report card";\r
    }\r
    $("ovRecords").textContent = String(records);\r
    document.querySelectorAll('.nav-item[data-page="results"]').forEach((item) => {\r
      item.classList.toggle("is-locked", isResultLocked());\r
      item.setAttribute("title", isResultLocked() ? resultLockMessage() : "Report Cards");\r
    });\r
\r
    // Update topbar & dropdown\r
    setAvatarElement("topbarAvatar", p);\r
    $("topbarName").textContent   = studentDisplayName(p);\r
    setAvatarElement("pdAvatar", p);\r
    $("pdName").textContent       = studentDisplayName(p);\r
    $("pdClass").textContent      = currentClass\r
      ? \`Class \${currentClass}\${currentSection ? "-"+currentSection : ""}\${currentRoll ? "  -  Roll "+currentRoll : ""}\`\r
      : "Class -";\r
    $("pdSchoolName").textContent = school;\r
    $("sidebarSchoolName").textContent = school;\r
  }\r
\r
  /* --- SESSION MANAGEMENT --- */\r
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
  function normalizeSchoolSession(id, data = {}) {\r
    const sessionId = String(id || data.id || "").trim();\r
    const label = getSessionLabel({ id: sessionId, ...data }) || sessionId;\r
    return { ...data, id: sessionId || label, session: label, name: data.name || label };\r
  }\r
\r
  function findSessionByValue(value) {\r
    const candidate = String(value || "").trim().toLowerCase();\r
    if (!candidate) return null;\r
    return state.sessions.find((session) => (\r
      [session.id, getSessionLabel(session), session.session, session.name, session.sessionLabel]\r
        .some((entry) => String(entry || "").trim().toLowerCase() === candidate)\r
    )) || null;\r
  }\r
\r
  function sortSessions(sessions) {\r
    return [...sessions].sort((a, b) => {\r
      const aOrder = Number(a.startYear||0) || new Date(a.startDate||a.createdAt?.seconds*1000||a.createdAt||0).getTime();\r
      const bOrder = Number(b.startYear||0) || new Date(b.startDate||b.createdAt?.seconds*1000||b.createdAt||0).getTime();\r
      return bOrder - aOrder;\r
    });\r
  }\r
\r
  function setSelectedSession(sessionId) {\r
    const s = findSessionByValue(sessionId);\r
    if (!s) return false;\r
    state.activeSessionId    = s.id;\r
    state.activeSessionLabel = getSessionLabel(s);\r
    state.activeSessionLocked = s.locked === true;\r
    return true;\r
  }\r
\r
  function setSelectedSessionFromSettings(settings = {}) {\r
    const idCandidates = [\r
      settings.sessionId,\r
      settings.activeSessionId,\r
      settings.currentSessionId,\r
      settings.academicSessionId,\r
      settings.id\r
    ];\r
    const labelCandidates = [\r
      settings.session,\r
      settings.activeSession,\r
      settings.currentSession,\r
      settings.sessionLabel,\r
      settings.currentYear,\r
      settings.academicSession\r
    ];\r
    for (const candidate of [...idCandidates, ...labelCandidates]) {\r
      const match = findSessionByValue(candidate);\r
      if (match) return match;\r
    }\r
    return null;\r
  }\r
\r
  function belongsToSelectedSession(entry) {\r
    if (!entry) return false;\r
    // A session has to be resolved before records can be displayed. Returning\r
    // true here would expose records from every academic session while the\r
    // dashboard is still loading or when the school has no active session.\r
    if (!state.activeSessionId && !state.activeSessionLabel) return false;\r
    if (entry.id && String(entry.id).startsWith(\`\${state.activeSessionId}__\`)) return true;\r
    if (!entry.sessionId && !entry.session && !entry.currentYear && !entry.academicSession) {\r
      return true;\r
    }\r
    return entry.sessionId === state.activeSessionId ||\r
      entry.session === state.activeSessionId ||\r
      entry.currentYear === state.activeSessionId ||\r
      entry.academicSession === state.activeSessionId ||\r
      entry.session === state.activeSessionLabel ||\r
      entry.currentYear === state.activeSessionLabel ||\r
      entry.academicSession === state.activeSessionLabel;\r
  }\r
\r
  function normalizeTermClass(value) {\r
    let raw = String(value || "").trim().toUpperCase();\r
    raw = raw.replace(/^CLASS\\s+/, "").replace(/^GRADE\\s+/, "");\r
    raw = raw.replace(/(\\d+)(ST|ND|RD|TH)\\b/g, "$1");\r
    if (/^\\d+$/.test(raw)) return String(Number(raw));\r
    return raw.trim();\r
  }\r
\r
  function normalizeTermSection(value) {\r
    let raw = String(value || "").trim().toUpperCase();\r
    if (["ALL", "ALL SECTIONS", "ALL SECTION", "ANY", "*", ""].includes(raw)) return "";\r
    return raw.replace(/[^A-Z]/g, "").slice(0, 1);\r
  }\r
\r
  function termMatchesStudentPlacement(term) {\r
    if (!term?.class && !term?.section) return true;\r
    const rawTermClass = String(term.class || "").trim().toUpperCase();\r
    if (["ALL", "ALL CLASSES", "ALL CLASS", "ANY", "*", ""].includes(rawTermClass)) return true;\r
\r
    const termClass = normalizeTermClass(term.class);\r
    const termSection = normalizeTermSection(term.section);\r
    const studentClass = normalizeTermClass(getClassForSession() || state.profile?.class);\r
    const studentSection = normalizeTermSection(getSectionForSession() || state.profile?.section);\r
\r
    if (termClass && studentClass && termClass !== studentClass) return false;\r
    if (termSection && studentSection && termSection !== studentSection) return false;\r
    return true;\r
  }\r
\r
  async function loadStudentSessions({ force = false } = {}) {\r
    const schoolIdAtStart = String(state.schoolId || "").trim();\r
    try {\r
      if (!schoolIdAtStart) return { selectionChanged: false, sessionsChanged: false };\r
      if (force) clearFirestoreReadCache();\r
      state.sessionLoadError = "";\r
\r
      const previousSessionIds = state.sessions.map((session) => session.id).sort().join("|");\r
      const previousSelectedId = state.activeSessionId;\r
      const [sessionsResult, settingsResult] = await Promise.allSettled([\r
        getDocs(collection(db, "schools", schoolIdAtStart, "sessions")),\r
        getDoc(doc(db, "schools", schoolIdAtStart, "settings", "activeSession"))\r
      ]);\r
      if (state.schoolId !== schoolIdAtStart) return { selectionChanged: false, sessionsChanged: false };\r
      if (sessionsResult.status === "rejected") throw sessionsResult.reason;\r
\r
      const snap = sessionsResult.value;\r
      state.sessions = snap.docs.map(d => normalizeSchoolSession(d.id, d.data()));\r
\r
      const settingsSnap = settingsResult.status === "fulfilled" ? settingsResult.value : null;\r
      const schoolActiveSession = settingsSnap?.exists?.()\r
        ? setSelectedSessionFromSettings(settingsSnap.data() || {})\r
        : null;\r
      let configuredSessionMismatch = false;\r
      state.schoolActiveSessionId = schoolActiveSession?.id || "";\r
      if (settingsResult.status === "rejected") {\r
        console.warn("Active session setting load failed:", settingsResult.reason);\r
        state.sessionLoadError = "School sessions loaded, but the active session could not be verified.";\r
      } else if (settingsSnap?.exists?.()) {\r
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
        if (configuredValue && !schoolActiveSession) {\r
          configuredSessionMismatch = true;\r
          state.sessionLoadError = "The school's active-session setting does not match any configured session.";\r
        }\r
      }\r
\r
      const userSelectedSession = findSessionByValue(state.userSelectedSessionId);\r
      const automaticSession = settingsResult.status === "rejected" || configuredSessionMismatch\r
        ? null\r
        : schoolActiveSession || sortSessions(state.sessions)[0] || null;\r
      const preferredSession = userSelectedSession || automaticSession;\r
      if (preferredSession) setSelectedSession(preferredSession.id);\r
      else {\r
        state.activeSessionId = "";\r
        state.activeSessionLabel = "";\r
        state.activeSessionLocked = false;\r
        state.userSelectedSessionId = "";\r
      }\r
\r
      state.sessionsLoadedForSchool = schoolIdAtStart;\r
\r
      populateHeaderSessionSelector();\r
      return {\r
        selectionChanged: previousSelectedId !== state.activeSessionId,\r
        sessionsChanged: previousSessionIds !== state.sessions.map((session) => session.id).sort().join("|")\r
      };\r
    } catch(e) {\r
      console.error("Session load failed:", e);\r
      state.sessions = [];\r
      state.schoolActiveSessionId = "";\r
      state.sessionLoadError = "Unable to load this school's sessions. Check your connection and sign in again if it continues.";\r
      state.activeSessionId = "";\r
      state.activeSessionLabel = "";\r
      state.activeSessionLocked = false;\r
      populateHeaderSessionSelector();\r
      return { selectionChanged: false, sessionsChanged: false, error: e };\r
    }\r
  }\r
\r
  function populateHeaderSessionSelector() {\r
    const sel = $("headerSessionSelector");\r
    if (!sel) return;\r
\r
    sel.innerHTML = "";\r
    sortSessions(state.sessions).forEach(s => {\r
      const opt = document.createElement("option");\r
      opt.value = s.id;\r
      opt.textContent = \`\${getSessionLabel(s)||"Unnamed"}\${s.locked?" (Locked)":""}\`;\r
      if (s.id === state.activeSessionId) opt.selected = true;\r
      sel.appendChild(opt);\r
    });\r
    if (!sel.options.length) {\r
      const opt = document.createElement("option");\r
      opt.value = "";\r
      opt.textContent = state.sessionLoadError ? "Unable to load school sessions" : "No school sessions configured";\r
      sel.appendChild(opt);\r
    }\r
    sel.title = state.sessionLoadError || "Select an academic session";\r
  }\r
\r
  window.onHeaderSessionChange = async function() {\r
    const sel = $("headerSessionSelector");\r
    if (!sel || !sel.value) return;\r
    if (!setSelectedSession(sel.value)) return;\r
    state.userSelectedSessionId = state.activeSessionId;\r
    await loadStudentData();\r
  };\r
\r
  /* --- LOAD DATA --- */\r
  async function loadLibrarySettings() {\r
    state.librarySettings = { maxDays: 14 };\r
    if (!state.schoolId) return;\r
    try {\r
      const snap = await getDoc(doc(db, "schools", state.schoolId, "settings", "library"));\r
      if (snap.exists()) {\r
        state.librarySettings.maxDays = normalizeLibraryMaxDays(snap.data().maxDays);\r
      }\r
    } catch(e) {\r
      console.warn("Library settings fetch failed:", e);\r
    }\r
  }\r
\r
  async function loadStudentData({ forceSessionRefresh = false } = {}) {\r
    if (!state.session) { redirectToLogin(); return; }\r
\r
    $("globalStatus").innerHTML = \`<div class="loading-banner">\r
      <svg style="width:16px;height:16px;animation:spin 1s linear infinite;flex-shrink:0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">\r
        <path d="M23 4v6h-6"/><path d="M1 20v-6h6"/>\r
        <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/>\r
      </svg>\r
      Loading student records...\r
    </div>\`;\r
\r
    let sk = getStudentKey();\r
    if (!sk) {\r
      $("globalStatus").innerHTML = \`<div class="error-banner">Student session is missing. Please sign in again.</div>\`;\r
      return;\r
    }\r
\r
    try {\r
      let sp = {\r
        ...(state.session || {}),\r
        studentId: state.session.studentId||state.session.uid||"",\r
        name: studentDisplayName(state.session), class: state.session.class||"",\r
        section: state.session.section||"", roll: state.session.rollNo||"",\r
        email: state.session.email||"", schoolId: linkedSchoolId(state.session),\r
        schoolName: state.session.schoolName||""\r
      };\r
      setStudentSchoolId(linkedSchoolId(sp));\r
      state.profile = { ...sp };\r
      applySchoolName(firstProfileText(sp.schoolName, cachedSchoolNameFor(state.schoolId), state.schoolName, window.SchoolBranding?.getSchoolName?.(), "Schoolix"));\r
      renderStudentIdentity(state.profile, sp.schoolName);\r
\r
      // Fetch user profile using the authenticated UID first, then fall back to the stored student ID.\r
      const userDoc = await fetchStudentProfileDoc(sk);\r
      if (userDoc) {\r
        sp = {\r
          ...sp,\r
          name: firstProfileText(userDoc.name, userDoc.fullName, userDoc.studentName, sp.name),\r
          class: userDoc.class||sp.class||"",\r
          section: userDoc.section||sp.section||"",\r
          roll: userDoc.rollNo||userDoc.roll||sp.roll||"",\r
          email: userDoc.email||userDoc.authEmail||sp.email||"",\r
          schoolId: linkedSchoolId(userDoc)||sp.schoolId||"",\r
          schoolName: userDoc.schoolName||sp.schoolName||"",\r
          studentDocId: userDoc.studentDocId||sp.studentDocId||userDoc.id||"",\r
          // Keep the authenticated Supabase account as the canonical auth\r
          // bridge. Migrated profile copies can carry an older/deleted UID.\r
          authUid: state.session?.authUid||state.session?.supabaseAuthUid||userDoc.authUid||sp.authUid||"",\r
          supabaseAuthUid: state.session?.supabaseAuthUid||userDoc.supabaseAuthUid||sp.supabaseAuthUid||"",\r
          studentId: userDoc.studentId||sp.studentId||state.session?.studentId||""\r
        };\r
        setStudentSchoolId(linkedSchoolId(sp) || linkedSchoolId(state.session || {}));\r
        state.session = {...state.session,...sp,schoolId:state.schoolId};\r
        saveSession(state.session);\r
        applySchoolName(firstProfileText(sp.schoolName, cachedSchoolNameFor(state.schoolId), state.schoolName, "Schoolix"));\r
      } else {\r
        setStudentSchoolId(linkedSchoolId(sp) || linkedSchoolId(state.session || {}));\r
        applySchoolName(firstProfileText(sp.schoolName, cachedSchoolNameFor(state.schoolId), state.schoolName, "Schoolix"));\r
      }\r
      sk = String(sp.studentId || sk).trim();\r
\r
      if (!state.schoolId) {\r
        $("globalStatus").innerHTML = \`<div class="error-banner">School link not found. Contact the school office.</div>\`;\r
        return;\r
      }\r
\r
      await Promise.all([\r
        fetchAndSetSchoolName(state.schoolId),\r
        loadStudentSessions({ force: forceSessionRefresh }),\r
        loadLibrarySettings(),\r
        loadAttendanceTeacherLookup()\r
      ]);\r
\r
      // Fetch student record\r
      const schoolStudent = await fetchStudentRecordFromSchool(state.schoolId, sp, sk);\r
      const archivedStudent = schoolStudent ? null : await fetchArchivedStudentFromSchool(state.schoolId, sp, sk);\r
      state.isArchived = Boolean(archivedStudent);\r
      state.archivedProfile = archivedStudent || null;\r
      state.attendanceMonthFilter = currentMonthKey();\r
      state.attendanceMonthFilterTouched = false;\r
      state.profile = schoolStudent\r
        ? { ...sp, id:schoolStudent.id, ...schoolStudent, name:firstProfileText(schoolStudent.name, schoolStudent.fullName, schoolStudent.studentName, sp.name), studentId:schoolStudent.studentId||sk, schoolId:state.schoolId }\r
        : archivedStudent\r
          ? { ...sp, id:archivedStudent.id, ...archivedStudent, name:firstProfileText(archivedStudent.name, archivedStudent.fullName, archivedStudent.studentName, sp.name), studentId:archivedStudent.studentId||sk, schoolId:state.schoolId }\r
          : { id:sk, ...sp, schoolId:state.schoolId, studentId:sk };\r
      renderStudentIdentity(state.profile, state.schoolName);\r
      const recordStudentId = String(state.profile.studentId || sk).trim();\r
      window.dispatchEvent(new CustomEvent("schoolix:student-session-ready", {\r
        detail: {\r
          schoolId: state.schoolId,\r
          role: "student",\r
          studentId: recordStudentId,\r
          studentDocId: state.profile.studentDocId || state.profile.id || "",\r
          email: state.profile.email || state.session?.email || "",\r
          authUid: state.profile.authUid || state.session?.uid || ""\r
        }\r
      }));\r
      window.SchoolixSyncNativeNotifications?.({\r
        schoolId: state.schoolId,\r
        role: "student",\r
        studentId: recordStudentId,\r
        studentDocId: state.profile.studentDocId || state.profile.id || "",\r
        email: state.profile.email || state.session?.email || "",\r
        authUid: state.profile.authUid || state.session?.uid || ""\r
      });\r
\r
      const candidateStudentIds = Array.from(new Set([\r
        recordStudentId,\r
        state.profile?.studentId,\r
        state.profile?.id,\r
        state.profile?.studentDocId,\r
        sk,\r
        state.session?.studentId,\r
        state.session?.uid,\r
        state.profile?.authUid,\r
        state.profile?.srNumber\r
      ].map(s => String(s || "").trim()).filter(Boolean)));\r
\r
      if (state.isArchived) {\r
        const archivedRecords = state.profile.records || {};\r
        state.attendance = latestByRecent(normalizeArchivedArray(archivedRecords.attendance).filter(belongsToSelectedSession));\r
        state.fees = latestByRecent(normalizeArchivedArray(archivedRecords.fees).filter(belongsToSelectedSession));\r
        state.reports = latestByRecent(normalizeArchivedArray(archivedRecords.reportCards).filter(belongsToSelectedSession));\r
        state.transactions = [];\r
        state.libraryIssues = [];\r
      } else {\r
        const [aSnaps, fSnaps] = await Promise.all([\r
          Promise.all(candidateStudentIds.map(sid => safeGetDocs(query(collection(db,"schools",state.schoolId,"attendance"),where("studentId","==",sid))))),\r
          Promise.all(candidateStudentIds.map(sid => safeGetDocs(query(collection(db,"schools",state.schoolId,"fees"),where("studentId","==",sid)))))\r
        ]);\r
        const attendanceMap = new Map();\r
        aSnaps.forEach(snap => snap?.docs?.forEach(d => attendanceMap.set(d.id, { id: d.id, ...d.data() })));\r
        const feeMap = new Map();\r
        fSnaps.forEach(snap => snap?.docs?.forEach(d => feeMap.set(d.id, { id: d.id, ...d.data() })));\r
        state.attendance = latestByRecent(Array.from(attendanceMap.values()).filter(belongsToSelectedSession));\r
        state.fees = latestByRecent(Array.from(feeMap.values()).filter(belongsToSelectedSession));\r
      }\r
\r
      const [txRows, libraryRows, reportRows, marksData, termRows, transportData, visibilityData] = await Promise.all([\r
        (async () => {\r
          if (state.isArchived) return [];\r
          const txSnaps = await Promise.all(candidateStudentIds.map(sid =>\r
            safeGetDocs(query(collection(db,"schools",state.schoolId,"onlineFeeTransactions"),where("studentId","==",sid)))\r
          ));\r
          const txMap = new Map();\r
          txSnaps.forEach(snap => snap?.docs?.forEach(d => txMap.set(d.id, { id: d.id, ...d.data() })));\r
          return Array.from(txMap.values()).filter(belongsToSelectedSession);\r
        })(),\r
        (async () => {\r
          if (state.isArchived) return [];\r
          const lSnaps = await Promise.all(candidateStudentIds.map(sid =>\r
            safeGetDocs(query(collection(db,"schools",state.schoolId,"library_issues"),where("studentId","==",sid)))\r
          ));\r
          const lMap = new Map();\r
          lSnaps.forEach(snap => snap?.docs?.forEach(d => lMap.set(d.id, { id: d.id, ...d.data() })));\r
          return Array.from(lMap.values());\r
        })(),\r
        (async () => {\r
          if (state.isArchived) return state.reports;\r
          const reportQueries = [];\r
          candidateStudentIds.forEach((sid) => {\r
            reportQueries.push(\r
              safeGetDocs(query(collection(db,"schools",state.schoolId,"reportCards"),where("student.studentId","==",sid))),\r
              safeGetDocs(query(collection(db,"schools",state.schoolId,"reportCards"),where("studentId","==",sid))),\r
              safeGetDocs(query(collection(db,"schools",state.schoolId,"reportCards"),where("student.id","==",sid)))\r
            );\r
          });\r
          const querySnaps = await Promise.all(reportQueries);\r
          const reportsById = new Map();\r
          querySnaps.forEach((snap) => {\r
            if (snap?.docs) {\r
              snap.docs.forEach((reportDoc) => {\r
                reportsById.set(reportDoc.id, { id: reportDoc.id, ...reportDoc.data() });\r
              });\r
            }\r
          });\r
          return [...reportsById.values()].filter(belongsToSelectedSession);\r
        })(),\r
        (async () => {\r
          if (state.isArchived) return {};\r
          const marksPromises = candidateStudentIds.map(sid =>\r
            safeGetDoc(doc(db, "schools", state.schoolId, "marks", sid))\r
          );\r
          const marksSnaps = await Promise.all(marksPromises);\r
          const combinedTerms = {};\r
          marksSnaps.forEach(snap => {\r
            if (snap?.exists?.()) {\r
              const data = snap.data() || {};\r
              const terms = data.terms || {};\r
              Object.entries(terms).forEach(([k, v]) => {\r
                if (v && typeof v === "object") {\r
                  combinedTerms[k] = { ...(combinedTerms[k] || {}), ...v };\r
                }\r
              });\r
            }\r
          });\r
          return combinedTerms;\r
        })(),\r
        (async () => {\r
          const tSnap = await safeGetDocs(collection(db,"schools",state.schoolId,"terms"));\r
          return tSnap.docs\r
            .map(d=>({id:d.id,...d.data()}))\r
            .filter(belongsToSelectedSession)\r
            .filter(termMatchesStudentPlacement)\r
            .sort((a,b)=>(a.createdAt?.seconds||0)-(b.createdAt?.seconds||0));\r
        })(),\r
        (async () => {\r
          if (state.isArchived) return null;\r
          return resolveStudentTransport(recordStudentId);\r
        })(),\r
        (async () => {\r
          const visibilitySnap = await safeGetDoc(doc(db, "schools", state.schoolId, "settings", "reportCardTermVisibility"));\r
          return visibilitySnap?.exists?.() ? (visibilitySnap.data().terms || {}) : {};\r
        })()\r
      ]);\r
\r
      // Merge marks into report rows\r
      const studentMarksTerms = marksData || {};\r
      const finalReports = [...reportRows];\r
\r
      Object.entries(studentMarksTerms).forEach(([rawKey, subjectMarks]) => {\r
        if (!subjectMarks || typeof subjectMarks !== "object" || Object.keys(subjectMarks).length === 0) return;\r
\r
        let tKey = rawKey;\r
        if (rawKey.includes("__")) {\r
          const [sessKey, ...rest] = rawKey.split("__");\r
          if (state.activeSessionId && sessKey !== state.activeSessionId && sessKey !== state.activeSessionLabel) {\r
            return;\r
          }\r
          tKey = rest.join("__");\r
        }\r
\r
        const canonicalTermKey = termKey(tKey);\r
        const subArr = Object.entries(subjectMarks).map(([subName, entry]) => {\r
          const obtained = (entry?.obtained != null && entry?.obtained !== "" && !isNaN(entry?.obtained)) ? Number(entry.obtained) : null;\r
          const maxMarks = Number(entry?.maxMarks || entry?.max || 100);\r
          return {\r
            name: subName,\r
            obtained,\r
            maxMarks,\r
            remarks: getReportRemarks(obtained, maxMarks)\r
          };\r
        }).filter(s => s.name);\r
\r
        let total = 0, totalMax = 0, hasScored = false;\r
        subArr.forEach(s => {\r
          if (s.obtained != null) {\r
            total += s.obtained;\r
            hasScored = true;\r
          }\r
          totalMax += s.maxMarks;\r
        });\r
\r
        const pct = totalMax ? Math.round((total / totalMax) * 100) : 0;\r
        const grade = hasScored ? getReportGrade(pct) : "-";\r
\r
        const existingReport = finalReports.find(r =>\r
          termKeysMatch(r.termKey || termKey(r.termLabel || r.term || ""), canonicalTermKey)\r
        );\r
\r
        if (existingReport) {\r
          if (!existingReport.subjects || !existingReport.subjects.length) {\r
            existingReport.subjects = subArr;\r
            existingReport.totalMarks = total;\r
            existingReport.totalMaxMarks = totalMax;\r
            existingReport.percentage = pct;\r
            existingReport.grade = grade;\r
          }\r
        } else {\r
          const prettyTerm = tKey.replace(/-/g, " ").replace(/\\b\\w/g, c => c.toUpperCase());\r
          finalReports.push({\r
            id: \`marks_\${recordStudentId}_\${canonicalTermKey}\`,\r
            term: prettyTerm,\r
            termKey: canonicalTermKey,\r
            termLabel: prettyTerm,\r
            sessionId: state.activeSessionId || "",\r
            session: state.activeSessionLabel || "",\r
            student: {\r
              name: state.profile?.name || "",\r
              studentId: recordStudentId,\r
              class: getClassForSession() || state.profile?.class || "",\r
              section: getSectionForSession() || state.profile?.section || "",\r
              roll: getRollForSession() || state.profile?.roll || ""\r
            },\r
            subjects: subArr,\r
            totalMarks: total,\r
            totalMaxMarks: totalMax,\r
            percentage: pct,\r
            grade,\r
            createdAt: new Date(),\r
            fromMarks: true\r
          });\r
        }\r
      });\r
\r
      // Build unique terms from terms collection, report cards, and marks\r
      const uniqueTerms = new Map();\r
      function registerTerm(rawKey, label, meta = {}) {\r
        const k = termKey(rawKey || label || "");\r
        if (!k) return;\r
        if (!uniqueTerms.has(k)) {\r
          uniqueTerms.set(k, {\r
            ...meta,\r
            termKey: k,\r
            label: label || meta.label || meta.term || meta.name || k.replace(/-/g, " ").replace(/\\b\\w/g, c => c.toUpperCase()),\r
            id: meta.id || k\r
          });\r
        }\r
      }\r
\r
      termRows.forEach(t => registerTerm(t.termKey || t.id, t.label || t.term || t.name, t));\r
      finalReports.forEach(r => registerTerm(r.termKey, r.termLabel || r.term, r));\r
      Object.keys(studentMarksTerms).forEach(rawKey => {\r
        let tKey = rawKey;\r
        if (rawKey.includes("__")) {\r
          const [sessKey, ...rest] = rawKey.split("__");\r
          if (state.activeSessionId && sessKey !== state.activeSessionId && sessKey !== state.activeSessionLabel) return;\r
          tKey = rest.join("__");\r
        }\r
        registerTerm(tKey);\r
      });\r
\r
      state.transactions = txRows;\r
      state.libraryIssues = libraryRows;\r
      state.resultVisibility = visibilityData || {};\r
      state.reports = filterLiveReportsForStudent(finalReports);\r
      state.terms = Array.from(uniqueTerms.values()).filter(t => isResultTermLive(t.termKey));\r
      state.transport = transportData;\r
\r
      state.reports.sort((a,b)=>(b.createdAt?.seconds||0)-(a.createdAt?.seconds||0));\r
\r
      // Render everything\r
      renderOverview();\r
      renderProfile(state.profile);\r
      renderAttendance(state.attendance);\r
      renderFees(state.fees);\r
      renderLibrary(state.libraryIssues);\r
      renderTransport(state.transport);\r
      state.timetableLoaded = false;\r
      const timetable = $("studentTimetable");\r
      if (timetable) {\r
        timetable.dataset.loadedFor = "";\r
        timetable.innerHTML = \`<div class="empty-state">Open this tab to load your timetable.</div>\`;\r
      }\r
\r
      renderTermDropdown(state.terms);\r
\r
      if (state.terms.length > 0) {\r
        const rep = latestReport(state.reports) || state.reports[0];\r
        let selectedKey = "";\r
        if (rep) {\r
          const target = rep.termKey || termKey(rep.termLabel || rep.term || "");\r
          const matchingTerm = state.terms.find(t => termKeysMatch(t.termKey, target));\r
          if (matchingTerm) selectedKey = matchingTerm.termKey;\r
        }\r
        if (!selectedKey && state.terms[0]) {\r
          selectedKey = state.terms[0].termKey;\r
        }\r
        if (selectedKey) {\r
          const termSelect = $("studentTermSelect");\r
          if (termSelect) {\r
            termSelect.value = selectedKey;\r
            renderReportForTerm(selectedKey);\r
          }\r
        }\r
      }\r
\r
      $("globalStatus").innerHTML = state.sessionLoadError\r
        ? \`<div class="error-banner">\${esc(state.sessionLoadError)}</div>\`\r
        : "";\r
\r
    } catch (err) {\r
      console.error(err);\r
      $("globalStatus").innerHTML = \`<div class="error-banner">\${esc(err?.message||"Unknown error")}</div>\`;\r
    }\r
  }\r
\r
  window.refreshDashboard = async () => {\r
    clearFirestoreReadCache();\r
    await loadStudentData({ forceSessionRefresh: true });\r
    showToast(\r
      state.sessionLoadError || "Dashboard refreshed.",\r
      state.sessionLoadError ? "error" : "success"\r
    );\r
  };\r
\r
  /* --- PRINT SUMMARY --- */\r
  window.printStudentSummary = () => {\r
    const school = state.schoolName || window.SchoolBranding?.getSchoolName?.() || "Schoolix Academy";\r
    const p = state.profile||{};\r
    const att  = calcAttendance(state.attendance);\r
    const fees = calcFees(state.fees);\r
    const rep  = latestReport(state.reports);\r
    const html = \`<div style="font-family:'Segoe UI',sans-serif;max-width:860px;margin:0 auto;padding:28px;color:#0f172a">\r
      <div style="background:linear-gradient(135deg,#1d4ed8,#2563eb);color:#fff;border-radius:16px;padding:24px 28px;margin-bottom:20px">\r
        <div style="font-size:11px;text-transform:uppercase;letter-spacing:.1em;opacity:.75">\${esc(school)}</div>\r
        <h1 style="font-size:26px;margin:8px 0 4px;letter-spacing:-.02em">Student Summary</h1>\r
        <div style="font-size:13px;opacity:.8">ID: \${esc(p.studentId||getStudentKey())}</div>\r
      </div>\r
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">\r
        <div style="border:1px solid #e2e8f0;border-radius:12px;padding:16px">\r
          <h3 style="margin:0 0 10px;color:#1d4ed8;font-size:12px;text-transform:uppercase;letter-spacing:.08em">Profile</h3>\r
          <p style="margin:4px 0"><strong>Name:</strong> \${esc(p.name||"-")}</p>\r
          <p style="margin:4px 0"><strong>Class:</strong> \${esc(getClassForSession()||"-")}-\${esc(getSectionForSession()||"-")}</p>\r
          <p style="margin:4px 0"><strong>Roll No.:</strong> \${esc(getRollForSession()||"-")}</p>\r
          <p style="margin:4px 0"><strong>School:</strong> \${esc(school)}</p>\r
        </div>\r
        <div style="border:1px solid #e2e8f0;border-radius:12px;padding:16px">\r
          <h3 style="margin:0 0 10px;color:#1d4ed8;font-size:12px;text-transform:uppercase;letter-spacing:.08em">Overview</h3>\r
          <p style="margin:4px 0"><strong>Attendance:</strong> \${att.total?\`\${att.percentage}%\`:"-"}</p>\r
          <p style="margin:4px 0"><strong>Fees Due:</strong> \${esc(fmt(fees.due))}</p>\r
          <p style="margin:4px 0"><strong>Latest Result:</strong> \${rep?\`\${Math.round(Number(rep.percentage||0))}%\`:"-"}</p>\r
        </div>\r
      </div>\r
    </div>\`;\r
    const printHtml = \`<!DOCTYPE html><html><head>\r
<title>Student Summary - \${esc(school)}</title><style>body{margin:0;background:#f8fafc}</style></head><body>\${html}</body></html>\`;\r
    if (window.SchoolixPrint?.printHtml?.(\`Student Summary - \${school}\`, printHtml)) return;\r
    const w = window.open("","_blank");\r
    if (!w) return showToast("Please allow popups to print.", "error");\r
    w.document.write(\`<!DOCTYPE html><html><head>\r
<title>Student Summary - \${esc(school)}</title><style>body{margin:0;background:#f8fafc}</style></head><body>\${html}<script>window.onload=()=>{window.print();window.onafterprint=()=>window.close()}<\\/script></body></html>\`);\r
    w.document.close();\r
  };\r
\r
  /* --- RECEIPT --- */\r
  function buildFeesSummary() {\r
    const unique = uniqueFeesByMonth(state.fees);\r
    const total = calcFees(state.fees);\r
    const transactions = buildFeeTransactions();\r
\r
    const byStatus = unique.reduce((acc, f) => {\r
      const st = String(f.status || "Pending").trim().toLowerCase();\r
      acc[st] = (acc[st] || 0) + 1;\r
      return acc;\r
    }, {});\r
\r
    return {\r
      months: unique.length,\r
      totalAssigned: total.total,\r
      totalPaid: total.collected,\r
      totalExtra: total.extra,\r
      totalCollected: total.collected,\r
      totalDue: total.due,\r
      byStatus,\r
      transactions\r
    };\r
  }\r
\r
  window.openFeesSummaryModal = function() {\r
    const summary = buildFeesSummary();\r
    const school = state.schoolName || window.SchoolBranding?.getSchoolName?.() || "Schoolix Public School";\r
\r
    $("receiptModal").classList.add("open");\r
    $("receiptSchoolName").textContent = school;\r
    $("rStudent").textContent = state.profile?.name || "Student";\r
    $("rStudentId").textContent = state.profile?.studentId || getStudentKey() || "-";\r
    $("rClass").textContent   = \`\${getClassForSession()||"-"} \${getSectionForSession()||""}\`.trim();\r
    $("rReceipt").textContent = "FEE-SUM";\r
    $("rDate").textContent    = new Date().toLocaleDateString("en-IN");\r
    $("rAmount").textContent  = fmt(summary.totalCollected || summary.totalPaid);\r
\r
    // Fees summary UI (responsive + PDF-friendly)\r
    $("feesSummaryContainer").classList.add("active");\r
    $("receiptTableBody").innerHTML = ""; // hide receipt-style table in summary mode\r
\r
    $("fsTotalAssigned").textContent = fmt(summary.totalAssigned);\r
    $("fsTotalPaid").textContent     = fmt(summary.totalPaid);\r
    $("fsTotalDue").textContent      = fmt(summary.totalDue);\r
    $("fsMonths").textContent        = \`\${summary.months} month(s)\`;\r
    if ($("fsExtraCard")) $("fsExtraCard").style.display = summary.totalExtra > 0 ? "block" : "none";\r
    if ($("fsTotalExtra")) $("fsTotalExtra").textContent = fmt(summary.totalExtra);\r
\r
    const statusRows = Object.entries(summary.byStatus)\r
      .sort((a,b)=>b[1]-a[1])\r
      .map(([st, cnt]) => {\r
        const pretty = st ? st.replace(/\\s+/g,' ') : 'pending';\r
        const color = st.includes('paid') ? '#16a34a' : (st.includes('due') || st.includes('unpaid')) ? '#ef4444' : '#1e3a8a';\r
        return \`<tr>\r
          <td style="font-weight:800;color:\${color}">\${esc(pretty)}</td>\r
          <td style="font-weight:800">\${esc(String(cnt))}</td>\r
        </tr>\`;\r
      })\r
      .join("");\r
\r
    $("fsStatusRows").innerHTML = statusRows || \`<tr><td style="color:#64748b;font-weight:700">Pending</td><td style="font-weight:800">0</td></tr>\`;\r
\r
    // Monthly breakdown - one row per month, even when paid in multiple transactions\r
    const monthlyRows = uniqueFeesByMonth(state.fees)\r
      .sort((a,b) => (a.month || "").localeCompare(b.month || ""))\r
      .map(fee => {\r
        const paid = moneyNumber(fee.totalPaidAmount || fee.paidAmount || 0);\r
        const extra = feeExtraAmount(fee);\r
        const collected = paid + extra;\r
        const fine = feeFineAmount(fee);\r
        const status = fee.status || (paid > 0 ? "Paid" : "Unpaid");\r
        const statusColor = status.toLowerCase().includes("paid") ? "#16a34a" : status.toLowerCase().includes("partial") ? "#f59e0b" : "#dc2626";\r
        return \`<tr>\r
          <td style="font-weight:700;color:#000">\${esc(fee.month || "-")}</td>\r
          <td style="font-weight:700;color:#000">\${esc(fmt(collected))}\${extra > 0 ? \`<div style="font-size:12px;color:#0f766e;margin-top:4px;">Includes extra \${esc(fmt(extra))}</div>\` : ""}\${fine > 0 ? \`<div style="font-size:12px;color:#b45309;margin-top:4px;">Fine \${esc(fmt(fine))}</div>\` : ""}</td>\r
          <td style="font-weight:800;color:\${statusColor}">\${esc(status)}</td>\r
          <td style="font-weight:700;color:#475569">\${esc(fee.remarks || fee.impositionRemark || "-")}</td>\r
        </tr>\`;\r
      })\r
      .join("");\r
\r
    $("fsMonthlyBreakdown").innerHTML = monthlyRows || \`<tr><td colspan="4" style="color:#64748b;text-align:center;font-weight:700">No fee records found</td></tr>\`;\r
\r
    const transactionRows = summary.transactions.map(tx => \`\r
      <tr>\r
        <td style="font-weight:700;color:#000">\${esc(fmtDateTime(tx.date))}</td>\r
        <td style="font-weight:700;color:#000">\${esc(tx.month || "-")}</td>\r
        <td style="font-weight:700;color:#000">\${esc(fmt(tx.amount || 0))}</td>\r
        <td style="font-weight:700;color:#475569;max-width:260px;white-space:normal">\${esc(tx.remarks || "-")}</td>\r
        <td style="font-weight:700;color:#000;word-break:break-all">\${esc(tx.transactionId || "-")}</td>\r
        <td style="font-weight:700;color:#000;word-break:break-all">\${esc(tx.receiptId || "-")}</td>\r
      </tr>\r
    \`).join("");\r
    $("fsTransactionRows").innerHTML = transactionRows || \`<tr><td colspan="6" style="color:#64748b;text-align:center;font-weight:700">No payment transactions found</td></tr>\`;\r
\r
    $("receiptPaid").textContent = "SUMMARY";\r
\r
    // Make sure receipt table is hidden in summary mode\r
    const receiptTable = document.getElementById("receiptTable");\r
    if (receiptTable) receiptTable.style.display = "none";\r
  };\r
\r
  // Download FEES SUMMARY as PDF\r
\r
  window.downloadFeesSummary = async function() {\r
    const summary = buildFeesSummary();\r
\r
    // Lazily load html2canvas + jsPDF only when user downloads\r
    if (!window.html2canvas || !window.jspdf) {\r
      const loadScript = (src) => new Promise((resolve, reject) => {\r
        const s = document.createElement('script');\r
        s.src = src;\r
        s.onload = resolve;\r
        s.onerror = reject;\r
        document.head.appendChild(s);\r
      });\r
\r
      try {\r
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js');\r
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');\r
      } catch (e) {\r
        showToast('PDF libraries failed to load.', 'error');\r
        console.error(e);\r
        return;\r
      }\r
    }\r
\r
    const modal = $("receiptModal");\r
    if (!modal) return;\r
\r
    // Ensure summary content is visible for capture\r
    openFeesSummaryModal();\r
\r
    // Wait a tick so the DOM updates apply\r
    await new Promise(r => setTimeout(r, 120));\r
\r
    const captureEl = document.getElementById('feesSummaryContainer');\r
    if (!captureEl) return;\r
\r
    // Wrap capture in a white background helper for consistent colors in PDF\r
    const wrapper = document.createElement('div');\r
    wrapper.style.background = '#ffffff';\r
    wrapper.style.padding = '18px';\r
    wrapper.style.borderRadius = '16px';\r
    wrapper.style.color = '#111827';\r
    wrapper.appendChild(captureEl.cloneNode(true));\r
    wrapper.style.width = '860px';\r
    wrapper.style.maxWidth = '100%';\r
    wrapper.style.position = 'absolute';\r
    wrapper.style.left = '-99999px';\r
    wrapper.style.top = '0';\r
    document.body.appendChild(wrapper);\r
\r
    const canvas = await window.html2canvas(wrapper, {\r
      scale: 2,\r
      useCORS: true,\r
      backgroundColor: '#ffffff',\r
      logging: false,\r
      windowWidth: wrapper.scrollWidth,\r
    });\r
\r
    const imgData = canvas.toDataURL('image/png');\r
    const pdf = new window.jspdf.jsPDF({\r
      orientation: 'p',\r
      unit: 'pt',\r
      format: 'a4'\r
    });\r
\r
    const pageWidth = pdf.internal.pageSize.getWidth();\r
    const pageHeight = pdf.internal.pageSize.getHeight();\r
    const imgProps = pdf.getImageProperties(imgData);\r
    const pdfWidth = pageWidth - 36; // margin\r
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;\r
\r
    const position = 18;\r
\r
    // Fit single page (summary should fit). If too tall, browser-generated image will extend.\r
    pdf.addImage(imgData, 'PNG', 18, position, pdfWidth, pdfHeight, undefined, 'FAST');\r
\r
    const filename = \`fees-summary_\${getStudentKey() || 'student'}_\${Date.now()}.pdf\`;\r
\r
    pdf.save(filename);\r
\r
    wrapper.remove();\r
    // close modal after download\r
    modal.classList.remove('open');\r
    // Restore receipt table visibility for safety\r
    const receiptTableRestore = document.getElementById('receiptTable');\r
    if (receiptTableRestore) receiptTableRestore.style.display = '';\r
\r
  };\r
\r
  window.openReceipt = function(fee) {\r
    const school = state.schoolName || window.SchoolBranding?.getSchoolName?.() || "Schoolix Public School";\r
    $("receiptModal").classList.add("open");\r
    $("receiptSchoolName").textContent = school;\r
    $("rStudent").textContent = state.profile?.name || "Student";\r
    $("rStudentId").textContent = state.profile?.studentId || getStudentKey() || "-";\r
    $("rClass").textContent   = \`\${getClassForSession()||"-"} \${getSectionForSession()||""}\`.trim();\r
    $("rReceipt").textContent = "RCPT-" + Math.floor(Math.random()*99999);\r
    $("rDate").textContent    = new Date().toLocaleDateString("en-IN");\r
    const paid = moneyNumber(fee.totalPaidAmount||fee.paidAmount||0);\r
    const extra = feeExtraAmount(fee);\r
    const collected = paid + extra;\r
    const status = fee.status || (paid > 0 ? "Paid" : "Unpaid");\r
    const statusColor = status.toLowerCase().includes("paid") ? "#16a34a" : status.toLowerCase().includes("partial") ? "#f59e0b" : "#dc2626";\r
    $("rAmount").textContent = fmt(collected);\r
    $("receiptTableBody").innerHTML = \`\r
      <tr>\r
        <td style="color:#000;font-weight:600">\${esc(fee.month||"-")}</td>\r
        <td style="color:#000;font-weight:600">\${esc(fmt(paid))}\${extra > 0 ? \`<br><span style="font-size:12px;color:#0f766e">Extra paid \${esc(fmt(extra))}</span>\` : ""}</td>\r
        <td style="color:\${statusColor};font-weight:700">\${esc(status)}</td>\r
      </tr>\r
    \`;\r
    // Hide summary container for individual receipt\r
    $("feesSummaryContainer").classList.remove("active");\r
    const receiptTable = document.getElementById("receiptTable");\r
    if (receiptTable) receiptTable.style.display = "table";\r
    $("receiptPaid").textContent = status.toUpperCase();\r
  };\r
\r
  window.openTransactionReceipt = function(tx) {\r
    const school = state.schoolName || window.SchoolBranding?.getSchoolName?.() || "Schoolix Public School";\r
    const status = tx.status || "Paid";\r
    const statusColor = String(status).toLowerCase().includes("paid") ? "#16a34a" : String(status).toLowerCase().includes("partial") ? "#f59e0b" : "#1e40af";\r
    $("receiptModal").classList.add("open");\r
    $("receiptSchoolName").textContent = school;\r
    $("rStudent").textContent = state.profile?.name || "Student";\r
    $("rStudentId").textContent = state.profile?.studentId || getStudentKey() || "-";\r
    $("rClass").textContent = \`\${getClassForSession()||"-"} \${getSectionForSession()||""}\`.trim();\r
    $("rReceipt").textContent = tx.receiptId || "-";\r
    $("rDate").textContent = fmtDateTime(tx.date);\r
    $("rAmount").textContent = fmt(tx.amount || 0);\r
    $("receiptTableBody").innerHTML = \`\r
      <tr>\r
        <td style="color:#000;font-weight:600">\${esc(tx.month||"-")}<br><span style="font-size:11px;color:#64748b">Txn: \${esc(tx.transactionId || "-")}</span></td>\r
        <td style="color:#000;font-weight:600">\${esc(fmt(tx.amount || 0))}\${moneyNumber(tx.extraAmount) > 0 ? \`<br><span style="font-size:12px;color:#0f766e">Extra paid \${esc(fmt(tx.extraAmount))}</span>\` : ""}</td>\r
        <td style="color:\${statusColor};font-weight:700">\${esc(status)}</td>\r
      </tr>\r
    \`;\r
    $("feesSummaryContainer").classList.remove("active");\r
    const receiptTable = document.getElementById("receiptTable");\r
    if (receiptTable) receiptTable.style.display = "table";\r
    $("receiptPaid").textContent = "RECEIPT";\r
  };\r
\r
  window.closeReceipt = function() {\r
    $("receiptModal").classList.remove("open");\r
  };\r
\r
  $("receiptModal").addEventListener("click", function(e) {\r
    if (e.target === this) closeReceipt();\r
  });\r
\r
  async function refreshStudentContextAfterResume() {\r
    if (document.visibilityState === "hidden" || !state.session || !state.profile) return;\r
    if (Date.now() - state.lastResumeRefreshAt < 2500) return;\r
    if (state.resumeRefreshPromise) return state.resumeRefreshPromise;\r
    state.lastResumeRefreshAt = Date.now();\r
    state.resumeRefreshPromise = (async () => {\r
      clearFirestoreReadCache();\r
      await reconcileStudentSession();\r
      if (!state.session) return redirectToLogin();\r
      await loadStudentData({ forceSessionRefresh: true });\r
    })().catch((error) => {\r
      console.warn("Student app resume refresh failed:", error);\r
    }).finally(() => {\r
      state.resumeRefreshPromise = null;\r
    });\r
    return state.resumeRefreshPromise;\r
  }\r
\r
  document.addEventListener("visibilitychange", () => {\r
    if (document.visibilityState === "visible") refreshStudentContextAfterResume();\r
  });\r
  window.addEventListener("focus", refreshStudentContextAfterResume);\r
  window.addEventListener("pageshow", (event) => {\r
    if (event.persisted) refreshStudentContextAfterResume();\r
  });\r
  window.addEventListener("schoolix:app-resume", refreshStudentContextAfterResume);\r
\r
  /* --- INIT --- */\r
  document.addEventListener("DOMContentLoaded", async () => {\r
    state.session = loadSession();\r
    hydrateInitialStudentIdentity();\r
    wireOverviewCards();\r
    await reconcileStudentSession();\r
    hydrateInitialStudentIdentity();\r
    if (!state.session) { redirectToLogin(); return; }\r
\r
    // Logout button (sidebar)\r
    const lb = $("logoutBtn");\r
    if (lb) lb.addEventListener("click", logoutStudent);\r
\r
    // Logout from dropdown\r
    const pdLb = $("pdLogoutBtn");\r
    if (pdLb) pdLb.addEventListener("click", async (e) => {\r
      e.stopPropagation();\r
      await logoutStudent();\r
    });\r
\r
    await loadStudentData();\r
    state.lastResumeRefreshAt = Date.now();\r
    const requestedPage = decodeURIComponent(window.location.hash.replace(/^#/, ""));\r
    if (["overview", "profile", "attendance", "fees", "results", "transport", "library", "timetable", "notices"].includes(requestedPage)) {\r
      window.navigate(requestedPage);\r
    }\r
  });\r
`},{attributes:{type:"module",src:"notice-panel.js?v=notices-20260720"},text:""},{attributes:{type:"module",src:"access-control.js"},text:""},{attributes:{src:"schoolix-polish.js"},text:""}]};export{e as default};
