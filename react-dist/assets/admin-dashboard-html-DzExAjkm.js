const e={file:"admin-dashboard.html",title:"Schoolix - Admin Dashboard",htmlClass:"",bodyClass:"sx-admin-app",body:`\r
<div id="sxPageLoader" class="sx-page-loader" role="status" aria-live="polite">\r
  <section class="dots-container" aria-label="Loading page">\r
    <div class="dot"></div>\r
    <div class="dot"></div>\r
    <div class="dot"></div>\r
    <div class="dot"></div>\r
    <div class="dot"></div>\r
  </section>\r
</div>\r
<div id="sx-page-root">\r
<div class="page-wrap">\r
\r
    <!-- ── TOP BAR (logout) ──────────────────────── -->\r
    <!-- ── HERO / SCHOOL NAME ────────────────────── -->\r
    <div class="hero">\r
        <div class="hero-badge">\r
            <i class="fas fa-shield-alt"></i>\r
            Admin Workspace\r
        </div>\r
        <div class="school-name" id="schoolDisplayName">\r
            <span>Schoolix</span>\r
        </div>\r
        <div class="school-owner" id="schoolTagline">Panel owner will appear here</div>\r
    </div>\r
\r
    <!-- ── WELCOME BANNER ────────────────────────── -->\r
    <div class="user-welcome" id="userWelcome">\r
        <div class="welcome-avatar">\r
            <i class="fas fa-user-tie"></i>\r
        </div>\r
        <div class="welcome-text">\r
            <div class="welcome-title">Welcome back, <span id="userName"></span></div>\r
            <div class="welcome-subtitle" id="userEmail"></div>\r
        </div>\r
    </div>\r
\r
    <!-- ── STATS ──────────────────────────────────── -->\r
    <div class="stats-bar">\r
        <div class="stat-item">\r
            <div class="stat-icon"><i class="fas fa-users"></i> Students</div>\r
            <span class="stat-number" id="totalStudents">Loading</span>\r
        </div>\r
        <div class="stat-item">\r
            <div class="stat-icon"><i class="fas fa-layer-group"></i> Class Sections</div>\r
            <span class="stat-number" id="totalClasses">Loading</span>\r
        </div>\r
        <div class="stat-item">\r
            <div class="stat-icon"><i class="fas fa-chalkboard-teacher"></i> Teachers</div>\r
            <span class="stat-number" id="totalTeachers">Loading</span>\r
        </div>\r
        <div class="stat-item">\r
            <div class="stat-icon"><i class="fas fa-rupee-sign"></i> Collected Fees</div>\r
            <span class="stat-number" id="totalFees">Loading</span>\r
        </div>\r
    </div>\r
\r
    <!-- ── DASHBOARD GRID ────────────────────────── -->\r
    <div class="section-label">Quick Access</div>\r
    <div class="dashboard-grid">\r
\r
        <a href="#/add-student.html" class="card students" title="Add New Students">\r
            <div class="card-icon"><i class="fas fa-user-plus"></i></div>\r
            <div class="card-text">\r
                <div class="card-title">Add Students</div>\r
                <div class="card-subtitle">Enroll new student</div>\r
            </div>\r
            <i class="fas fa-chevron-right card-arrow"></i>\r
        </a>\r
\r
        <a href="#/students.html" class="card students" title="View All Students">\r
            <div class="card-icon"><i class="fas fa-users"></i></div>\r
            <div class="card-text">\r
                <div class="card-title">View Students</div>\r
                <div class="card-subtitle">Browse all records</div>\r
            </div>\r
            <i class="fas fa-chevron-right card-arrow"></i>\r
        </a>\r
\r
        <a href="passed-out-#/students.html" class="card students" title="Passed Out Students">\r
            <div class="card-icon"><i class="fas fa-user-graduate"></i></div>\r
            <div class="card-text">\r
                <div class="card-title">Passed Out</div>\r
                <div class="card-subtitle">Year-wise archive</div>\r
            </div>\r
            <i class="fas fa-chevron-right card-arrow"></i>\r
        </a>\r
\r
        <a href="#/teachers.html" class="card teacher" title="Manage teachers, attendance and salary">\r
            <div class="card-icon"><i class="fas fa-chalkboard-teacher"></i></div>\r
            <div class="card-text">\r
                <div class="card-title">Manage Teachers</div>\r
                <div class="card-subtitle">Attendance & salary</div>\r
            </div>\r
            <i class="fas fa-chevron-right card-arrow"></i>\r
        </a>\r
\r
        <a href="subjects.html" class="card reports" title="Manage school subjects">\r
            <div class="card-icon"><i class="fas fa-book-open"></i></div>\r
            <div class="card-text">\r
                <div class="card-title">Manage Subjects</div>\r
                <div class="card-subtitle">School subject catalogue</div>\r
            </div>\r
            <i class="fas fa-chevron-right card-arrow"></i>\r
        </a>\r
\r
        <a href="#/staff-management.html" class="card staff" title="Manage all staff accounts">\r
            <div class="card-icon"><i class="fas fa-users-gear"></i></div>\r
            <div class="card-text">\r
                <div class="card-title">Staff Management</div>\r
                <div class="card-subtitle">Teachers, librarian & accounts</div>\r
            </div>\r
            <i class="fas fa-chevron-right card-arrow"></i>\r
        </a>\r
\r
        <a href="#/generate-tc.html" class="card tc" title="Generate Transfer Certificate">\r
            <div class="card-icon"><i class="fas fa-file-signature"></i></div>\r
            <div class="card-text">\r
                <div class="card-title">Generate TC</div>\r
                <div class="card-subtitle">Transfer certificate</div>\r
            </div>\r
            <i class="fas fa-chevron-right card-arrow"></i>\r
        </a>\r
\r
        <a href="#/reportcards.html" class="card reports" title="Generate Report Cards">\r
            <div class="card-icon"><i class="fas fa-chart-line"></i></div>\r
            <div class="card-text">\r
                <div class="card-title">Report Cards</div>\r
                <div class="card-subtitle">Generate & print</div>\r
            </div>\r
            <i class="fas fa-chevron-right card-arrow"></i>\r
        </a>\r
\r
        <a href="#/fees-report.html" class="card fees" title="Fees Management">\r
            <div class="card-icon"><i class="fas fa-rupee-sign"></i></div>\r
            <div class="card-text">\r
                <div class="card-title">Fees Report</div>\r
                <div class="card-subtitle">Payments & dues</div>\r
            </div>\r
            <i class="fas fa-chevron-right card-arrow"></i>\r
        </a>\r
\r
        <a href="#/school-accounts.html" class="card accounts" title="Manage school income and expenses">\r
            <div class="card-icon"><i class="fas fa-book"></i></div>\r
            <div class="card-text">\r
                <div class="card-title">Accounts Management</div>\r
                <div class="card-subtitle">Credits, debits & balance</div>\r
            </div>\r
            <i class="fas fa-chevron-right card-arrow"></i>\r
        </a>\r
\r
        <a href="#/notifications.html" class="card notifications" title="Push app notification">\r
            <div class="card-icon"><i class="fas fa-bell"></i></div>\r
            <div class="card-text">\r
                <div class="card-title">Push Notification</div>\r
                <div class="card-subtitle">Notify teachers & students</div>\r
            </div>\r
            <i class="fas fa-chevron-right card-arrow"></i>\r
        </a>\r
\r
        <a href="#/notices.html" class="card notifications" title="Create school notices">\r
            <div class="card-icon"><i class="fas fa-bullhorn"></i></div>\r
            <div class="card-text">\r
                <div class="card-title">Notices</div>\r
                <div class="card-subtitle">Text, PDF & app alerts</div>\r
            </div>\r
            <i class="fas fa-chevron-right card-arrow"></i>\r
        </a>\r
\r
        <a href="#/accountant-management.html" class="card accountant" title="Add accountant login">\r
            <div class="card-icon"><i class="fas fa-user-tie"></i></div>\r
            <div class="card-text">\r
                <div class="card-title">Add Accountant</div>\r
                <div class="card-subtitle">Portal login & accounts</div>\r
            </div>\r
            <i class="fas fa-chevron-right card-arrow"></i>\r
        </a>\r
\r
        <a href="#/library-management.html" class="card library" title="Library Management">\r
            <div class="card-icon"><i class="fas fa-book-open"></i></div>\r
            <div class="card-text">\r
                <div class="card-title">Library</div>\r
                <div class="card-subtitle">Books & librarian</div>\r
            </div>\r
            <i class="fas fa-chevron-right card-arrow"></i>\r
        </a>\r
\r
        <a href="#/vehicle-management.html" class="card vehicle" title="Vehicle Management">\r
            <div class="card-icon"><i class="fas fa-bus"></i></div>\r
            <div class="card-text">\r
                <div class="card-title">Vehicle Management</div>\r
                <div class="card-subtitle">Routes & transport</div>\r
            </div>\r
            <i class="fas fa-chevron-right card-arrow"></i>\r
        </a>\r
\r
       \r
\r
        <a href="#/admin-timetable.html" class="card timetable" title="Manage Timetables">\r
            <div class="card-icon"><i class="fas fa-calendar-alt"></i></div>\r
            <div class="card-text">\r
                <div class="card-title">Timetable</div>\r
                <div class="card-subtitle">Schedule & periods</div>\r
            </div>\r
            <i class="fas fa-chevron-right card-arrow"></i>\r
        </a>\r
 <a href="#/additional-settings.html" class="card settings" title="Additional Settings">\r
            <div class="card-icon"><i class="fas fa-cog"></i></div>\r
            <div class="card-text">\r
                <div class="card-title">Additional Settings</div>\r
                <div class="card-subtitle">System preferences</div>\r
            </div>\r
            <i class="fas fa-chevron-right card-arrow"></i>\r
        </a>\r
    </div>\r
\r
    <!-- ── LOGIN SECTION ─────────────────────────── -->\r
    <div class="login-section" id="loginSection">\r
        <button class="btn-primary pulse" onclick="loginWithGoogle()">\r
            <i class="fab fa-google"></i>\r
            Sign in with Google\r
        </button>\r
        <div class="features-text">\r
            Secure access · Cloud sync · Fast performance · Responsive layout\r
        </div>\r
    </div>\r
\r
</div><!-- /page-wrap -->\r
</div><!-- /sx-page-root -->\r
\r
<div class="sx-first-login-launch" id="firstLoginLaunch" aria-hidden="true">\r
    <div class="sx-launch-stage">\r
        <div class="sx-launch-logo" id="firstLoginLaunchLogo">\r
            <img src="schoolix-app-icon.svg" alt="Schoolix">\r
        </div>\r
        <div class="sx-launch-title">Welcome to Schoolix</div>\r
        <div class="sx-launch-copy" id="firstLoginLaunchCopy">Preparing your school workspace...</div>\r
        <div class="sx-launch-steps" aria-hidden="true"><span></span><span></span><span></span></div>\r
    </div>\r
</div>\r
\r
<div class="sx-first-setup-overlay" id="firstSetupOverlay" aria-hidden="true">\r
    <section class="sx-setup-modal" role="dialog" aria-modal="true" aria-labelledby="firstSetupTitle">\r
        <div class="sx-setup-head">\r
            <div class="sx-setup-eyebrow">First time setup</div>\r
            <h2 id="firstSetupTitle">Set up your school year</h2>\r
            <p>Save the active academic session now. These basics keep students, fees, reports and attendance aligned from day one.</p>\r
        </div>\r
        <form class="sx-setup-body" id="firstSetupForm">\r
            <div class="sx-setup-grid">\r
                <div class="sx-setup-field">\r
                    <label for="setupStartYear">Session start year</label>\r
                    <input type="number" id="setupStartYear" min="2000" max="2100" required>\r
                </div>\r
                <div class="sx-setup-field">\r
                    <label for="setupEndYear">Session end year</label>\r
                    <input type="number" id="setupEndYear" min="2001" max="2101" required>\r
                </div>\r
                <div class="sx-setup-field">\r
                    <label for="setupSchoolPhone">School phone</label>\r
                    <input type="tel" id="setupSchoolPhone" placeholder="Optional">\r
                </div>\r
                <div class="sx-setup-field">\r
                    <label for="setupSchoolCode">School code</label>\r
                    <input type="text" id="setupSchoolCode" placeholder="Optional">\r
                </div>\r
                <div class="sx-setup-field full">\r
                    <label for="setupSchoolAddress">School address</label>\r
                    <textarea id="setupSchoolAddress" placeholder="Optional"></textarea>\r
                </div>\r
            </div>\r
            <div class="sx-setup-actions">\r
                <div class="sx-setup-status" id="firstSetupStatus">This window appears only for this admin's first login.</div>\r
                <button type="submit" class="sx-setup-save" id="firstSetupSaveBtn">\r
                    <i class="fas fa-check"></i> Save & enter dashboard\r
                </button>\r
            </div>\r
        </form>\r
    </section>\r
</div>\r
\r
    <script src="school-branding.js"><\/script>\r
    <script type="module">\r
        import { initializeApp } from "./firebase-compat.js";\r
        import { \r
            getAuth, \r
            signInWithPopup, \r
            GoogleAuthProvider, \r
            signOut,\r
            onAuthStateChanged\r
        } from "./firebase-compat.js";\r
        import { \r
            getFirestore\r
        } from "./firebase-compat.js";\r
        import {\r
            doc,\r
            getDoc,\r
            setDoc,\r
            updateDoc,\r
            collection,\r
            getDocs,\r
            query,\r
            where,\r
            serverTimestamp\r
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
        const provider = new GoogleAuthProvider();\r
\r
        const userWelcome = document.getElementById('userWelcome');\r
        const userNameEl = document.getElementById('userName');\r
        const userEmailEl = document.getElementById('userEmail');\r
        const loginSection = document.getElementById('loginSection');\r
        const schoolDisplayNameEl = document.getElementById('schoolDisplayName');\r
        const schoolTaglineEl = document.getElementById('schoolTagline');\r
        const firstLoginLaunch = document.getElementById('firstLoginLaunch');\r
        const firstLoginLaunchCopy = document.getElementById('firstLoginLaunchCopy');\r
        const firstLoginLaunchLogo = document.getElementById('firstLoginLaunchLogo');\r
        const firstSetupOverlay = document.getElementById('firstSetupOverlay');\r
        const firstSetupForm = document.getElementById('firstSetupForm');\r
        const firstSetupStatus = document.getElementById('firstSetupStatus');\r
        const firstSetupSaveBtn = document.getElementById('firstSetupSaveBtn');\r
        const dashboardStatsCachePrefix = 'schoolix.dashboardStats.v1.';\r
        const dashboardStatsCacheTtl = 5 * 60 * 1000;\r
        let onboardingUser = null;\r
        let onboardingProfile = null;\r
\r
        function formatCurrency(value) {\r
            return \`₹\${Math.round(Number(value || 0)).toLocaleString('en-IN')}\`;\r
        }\r
\r
        async function loadAdminProfile(user) {\r
            try {\r
                const userSnap = await getDoc(doc(db, "users", user.uid));\r
                if (!userSnap.exists()) return null;\r
\r
                const adminData = userSnap.data();\r
                const schoolName = adminData.schoolName || window.SchoolBranding?.getSchoolName() || "Schoolix";\r
                window.SchoolBranding?.persistSchoolLogo?.(adminData.logoUrl || adminData.schoolLogoUrl || "");\r
                const adminName = adminData.name || user.displayName || user.email.split('@')[0];\r
\r
                window.SchoolBranding?.persistSchoolName(schoolName);\r
                schoolDisplayNameEl.innerHTML = \`<span>\${schoolName}</span>\`;\r
                schoolTaglineEl.textContent = \`Panel Owner: \${adminName}\`;\r
                userNameEl.textContent = adminName;\r
                userEmailEl.textContent = \`\${schoolName} · \${user.email}\`;\r
\r
                return { ...adminData, schoolName, adminName };\r
            } catch (error) {\r
                console.error("Admin profile load error:", error);\r
                return null;\r
            }\r
        }\r
\r
        function escapeAttribute(value) {\r
            return String(value || "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");\r
        }\r
\r
        function suggestAcademicYears() {\r
            const now = new Date();\r
            const start = now.getMonth() >= 3 ? now.getFullYear() : now.getFullYear() - 1;\r
            return { start, end: start + 1 };\r
        }\r
\r
        function getOnboardingStorageKey(userId) {\r
            return \`schoolix.adminOnboardingDone.\${userId}\`;\r
        }\r
\r
        function needsFirstSetup(user, adminData) {\r
            if (!user || String(adminData?.role || "").toLowerCase() !== "admin") return false;\r
            if (adminData?.onboardingRequired !== true) return false;\r
            try {\r
                if (localStorage.getItem(getOnboardingStorageKey(user.uid)) === "true") return false;\r
            } catch (_) {}\r
            return adminData?.onboardingCompleted !== true && !adminData?.onboardingCompletedAt;\r
        }\r
\r
        function primeSetupForm(adminData = {}) {\r
            const years = suggestAcademicYears();\r
            document.getElementById("setupStartYear").value = adminData.setup?.sessionStartYear || years.start;\r
            document.getElementById("setupEndYear").value = adminData.setup?.sessionEndYear || years.end;\r
            document.getElementById("setupSchoolPhone").value = adminData.schoolPhone || adminData.phone || "";\r
            document.getElementById("setupSchoolCode").value = adminData.schoolCode || "";\r
            document.getElementById("setupSchoolAddress").value = adminData.schoolAddress || adminData.address || "";\r
        }\r
\r
        async function runFirstLoginOnboarding(user, adminData) {\r
            if (!needsFirstSetup(user, adminData)) return;\r
            onboardingUser = user;\r
            onboardingProfile = adminData || {};\r
            primeSetupForm(onboardingProfile);\r
            firstLoginLaunchCopy.textContent = \`Preparing \${onboardingProfile.schoolName || "your school"} workspace...\`;\r
            const logoUrl = onboardingProfile.logoUrl || onboardingProfile.schoolLogoUrl || "";\r
            firstLoginLaunchLogo.innerHTML = logoUrl\r
                ? \`<img src="\${escapeAttribute(logoUrl)}" alt="School logo">\`\r
                : \`<img src="schoolix-app-icon.svg" alt="Schoolix">\`;\r
            firstLoginLaunch.classList.add("is-visible");\r
            firstLoginLaunch.setAttribute("aria-hidden", "false");\r
            window.setTimeout(() => {\r
                firstLoginLaunch.classList.remove("is-visible");\r
                firstLoginLaunch.setAttribute("aria-hidden", "true");\r
                firstSetupOverlay.classList.add("is-visible");\r
                firstSetupOverlay.setAttribute("aria-hidden", "false");\r
                document.getElementById("setupStartYear")?.focus();\r
            }, 2050);\r
        }\r
\r
        function setSetupStatus(message, type = "") {\r
            firstSetupStatus.textContent = message;\r
            firstSetupStatus.className = \`sx-setup-status \${type}\`.trim();\r
        }\r
\r
        firstSetupForm.addEventListener("submit", async (event) => {\r
            event.preventDefault();\r
            if (!onboardingUser) return;\r
            const startYear = Number(document.getElementById("setupStartYear").value);\r
            const endYear = Number(document.getElementById("setupEndYear").value);\r
            const schoolPhone = document.getElementById("setupSchoolPhone").value.trim();\r
            const schoolCode = document.getElementById("setupSchoolCode").value.trim();\r
            const schoolAddress = document.getElementById("setupSchoolAddress").value.trim();\r
            if (!startYear || !endYear || endYear <= startYear) {\r
                setSetupStatus("Please enter a valid academic session.", "error");\r
                return;\r
            }\r
            const sessionLabel = \`\${startYear}-\${endYear}\`;\r
            const sessionId = sessionLabel.replace(/[^0-9a-zA-Z]+/g, "-").replace(/^-+|-+$/g, "");\r
            firstSetupSaveBtn.disabled = true;\r
            setSetupStatus("Saving setup...");\r
            try {\r
                await setDoc(doc(db, "schools", onboardingUser.uid, "sessions", sessionId), {\r
                    startYear,\r
                    endYear,\r
                    session: sessionLabel,\r
                    locked: false,\r
                    classesLocked: false,\r
                    createdAt: serverTimestamp(),\r
                    createdBy: onboardingUser.uid,\r
                    createdFrom: "first-login-setup"\r
                }, { merge: true });\r
\r
                await setDoc(doc(db, "schools", onboardingUser.uid, "settings", "activeSession"), {\r
                    sessionId,\r
                    session: sessionLabel,\r
                    sessionLabel,\r
                    updatedAt: serverTimestamp(),\r
                    updatedBy: onboardingUser.uid\r
                }, { merge: true });\r
\r
                const setupPayload = {\r
                    onboardingRequired: false,\r
                    onboardingCompleted: true,\r
                    onboardingCompletedAt: serverTimestamp(),\r
                    setup: {\r
                        sessionId,\r
                        session: sessionLabel,\r
                        sessionStartYear: startYear,\r
                        sessionEndYear: endYear,\r
                        completedAt: new Date().toISOString()\r
                    },\r
                    updatedAt: serverTimestamp()\r
                };\r
                if (schoolPhone) setupPayload.schoolPhone = schoolPhone;\r
                if (schoolCode) setupPayload.schoolCode = schoolCode;\r
                if (schoolAddress) setupPayload.schoolAddress = schoolAddress;\r
\r
                await Promise.all([\r
                    updateDoc(doc(db, "users", onboardingUser.uid), setupPayload),\r
                    setDoc(doc(db, "schools", onboardingUser.uid), setupPayload, { merge: true })\r
                ]);\r
\r
                try { localStorage.setItem(getOnboardingStorageKey(onboardingUser.uid), "true"); } catch (_) {}\r
                setSetupStatus("Setup saved. Opening dashboard...", "success");\r
                window.setTimeout(() => {\r
                    firstSetupOverlay.classList.remove("is-visible");\r
                    firstSetupOverlay.setAttribute("aria-hidden", "true");\r
                }, 600);\r
            } catch (error) {\r
                console.error("First setup save error:", error);\r
                setSetupStatus(error.message || "Setup save failed. Please try again.", "error");\r
                firstSetupSaveBtn.disabled = false;\r
            }\r
        });\r
\r
        onAuthStateChanged(auth, async (user) => {\r
            if (user) {\r
                userWelcome.classList.add('show');\r
                loginSection.style.display = 'none';\r
                renderCachedDashboardStats(user.uid);\r
                const adminProfilePromise = loadAdminProfile(user);\r
                // Keep the first interactive paint free of large collection reads.\r
                // Fresh totals are loaded immediately after the browser gets a frame.\r
                requestAnimationFrame(() => requestAnimationFrame(() => refreshDashboardStats(user.uid)));\r
                const adminProfile = await adminProfilePromise;\r
                await runFirstLoginOnboarding(user, adminProfile);\r
            } else {\r
                userWelcome.classList.remove('show');\r
                loginSection.style.display = 'block';\r
            }\r
        });\r
\r
        window.loginWithGoogle = async () => {\r
            try {\r
                const loginBtn = document.querySelector('.btn-primary');\r
                loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing in…';\r
                loginBtn.disabled = true;\r
                await signInWithPopup(auth, provider);\r
            } catch (error) {\r
                console.error("Login error:", error);\r
                alert("Login failed: " + error.message);\r
                location.reload();\r
            }\r
        };\r
\r
        window.logout = async () => {\r
            try {\r
                const logoutBtn = document.querySelector('.btn-logout');\r
                logoutBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging out…';\r
                logoutBtn.disabled = true;\r
                await signOut(auth);\r
                window.location.href = '#/index.html';\r
            } catch (error) {\r
                console.error("Logout error:", error);\r
                alert("Logout failed. Please try again.");\r
                location.reload();\r
            }\r
        };\r
\r
        function applyDashboardStats(stats) {\r
            document.getElementById('totalStudents').textContent = Number(stats.students || 0).toLocaleString();\r
            document.getElementById('totalClasses').textContent = Number(stats.classes || 0).toLocaleString();\r
            document.getElementById('totalTeachers').textContent = Number(stats.teachers || 0).toLocaleString();\r
            document.getElementById('totalFees').textContent = formatCurrency(stats.fees || 0);\r
        }\r
\r
        function renderCachedDashboardStats(adminId) {\r
            try {\r
                const cached = JSON.parse(sessionStorage.getItem(dashboardStatsCachePrefix + adminId) || 'null');\r
                if (cached && Date.now() - cached.savedAt < dashboardStatsCacheTtl) applyDashboardStats(cached);\r
            } catch (_) {\r
                // Stats cache is only an instant visual fallback.\r
            }\r
        }\r
\r
        function cacheDashboardStats(adminId, stats) {\r
            try {\r
                sessionStorage.setItem(dashboardStatsCachePrefix + adminId, JSON.stringify({ ...stats, savedAt: Date.now() }));\r
            } catch (_) {}\r
        }\r
\r
        async function refreshDashboardStats(adminId) {\r
            try {\r
                const [studentSnap, teacherSnap, feeSnap] = await Promise.all([\r
                    getDocs(collection(db, "schools", adminId, "students")),\r
                    getDocs(query(collection(db, "users"), where("role", "==", "teacher"), where("adminId", "==", adminId))),\r
                    getDocs(collection(db, "schools", adminId, "fees"))\r
                ]);\r
\r
                const sections = new Set();\r
                studentSnap.forEach((docSnap) => {\r
                    const student = docSnap.data();\r
                    sections.add(\`\${student.class || ""}-\${student.section || ""}\`);\r
                });\r
\r
                let collectedFees = 0;\r
                feeSnap.forEach((docSnap) => {\r
                    const fee = docSnap.data();\r
                    collectedFees += Number(fee.totalCollectedAmount || fee.totalPaidAmount || fee.paidAmount || 0);\r
                });\r
\r
                const stats = {\r
                    students: studentSnap.size,\r
                    classes: sections.size,\r
                    teachers: teacherSnap.size,\r
                    fees: collectedFees\r
                };\r
                applyDashboardStats(stats);\r
                cacheDashboardStats(adminId, stats);\r
            } catch (error) {\r
                console.error('Dashboard stats refresh error:', error);\r
            }\r
        }\r
    <\/script>\r
    <script type="module" src="admin-shell.js?v=admin-performance-20261024"><\/script>\r
    <script type="module" src="access-control.js"><\/script>\r
  <script src="schoolix-polish.js" defer><\/script>\r
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
`},{tag:"link",attributes:{rel:"stylesheet",href:"schoolix-erp.css"},text:""},{tag:"link",attributes:{rel:"stylesheet",href:"schoolix-polish.css"},text:""},{tag:"link",attributes:{rel:"stylesheet",href:"admin-shell.css?v=admin-performance-20261024"},text:""}],scripts:[{attributes:{id:"sxCriticalLoaderScript"},text:`\r
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
        import { \r
            getAuth, \r
            signInWithPopup, \r
            GoogleAuthProvider, \r
            signOut,\r
            onAuthStateChanged\r
        } from "./firebase-compat.js";\r
        import { \r
            getFirestore\r
        } from "./firebase-compat.js";\r
        import {\r
            doc,\r
            getDoc,\r
            setDoc,\r
            updateDoc,\r
            collection,\r
            getDocs,\r
            query,\r
            where,\r
            serverTimestamp\r
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
        const provider = new GoogleAuthProvider();\r
\r
        const userWelcome = document.getElementById('userWelcome');\r
        const userNameEl = document.getElementById('userName');\r
        const userEmailEl = document.getElementById('userEmail');\r
        const loginSection = document.getElementById('loginSection');\r
        const schoolDisplayNameEl = document.getElementById('schoolDisplayName');\r
        const schoolTaglineEl = document.getElementById('schoolTagline');\r
        const firstLoginLaunch = document.getElementById('firstLoginLaunch');\r
        const firstLoginLaunchCopy = document.getElementById('firstLoginLaunchCopy');\r
        const firstLoginLaunchLogo = document.getElementById('firstLoginLaunchLogo');\r
        const firstSetupOverlay = document.getElementById('firstSetupOverlay');\r
        const firstSetupForm = document.getElementById('firstSetupForm');\r
        const firstSetupStatus = document.getElementById('firstSetupStatus');\r
        const firstSetupSaveBtn = document.getElementById('firstSetupSaveBtn');\r
        const dashboardStatsCachePrefix = 'schoolix.dashboardStats.v1.';\r
        const dashboardStatsCacheTtl = 5 * 60 * 1000;\r
        let onboardingUser = null;\r
        let onboardingProfile = null;\r
\r
        function formatCurrency(value) {\r
            return \`₹\${Math.round(Number(value || 0)).toLocaleString('en-IN')}\`;\r
        }\r
\r
        async function loadAdminProfile(user) {\r
            try {\r
                const userSnap = await getDoc(doc(db, "users", user.uid));\r
                if (!userSnap.exists()) return null;\r
\r
                const adminData = userSnap.data();\r
                const schoolName = adminData.schoolName || window.SchoolBranding?.getSchoolName() || "Schoolix";\r
                window.SchoolBranding?.persistSchoolLogo?.(adminData.logoUrl || adminData.schoolLogoUrl || "");\r
                const adminName = adminData.name || user.displayName || user.email.split('@')[0];\r
\r
                window.SchoolBranding?.persistSchoolName(schoolName);\r
                schoolDisplayNameEl.innerHTML = \`<span>\${schoolName}</span>\`;\r
                schoolTaglineEl.textContent = \`Panel Owner: \${adminName}\`;\r
                userNameEl.textContent = adminName;\r
                userEmailEl.textContent = \`\${schoolName} · \${user.email}\`;\r
\r
                return { ...adminData, schoolName, adminName };\r
            } catch (error) {\r
                console.error("Admin profile load error:", error);\r
                return null;\r
            }\r
        }\r
\r
        function escapeAttribute(value) {\r
            return String(value || "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");\r
        }\r
\r
        function suggestAcademicYears() {\r
            const now = new Date();\r
            const start = now.getMonth() >= 3 ? now.getFullYear() : now.getFullYear() - 1;\r
            return { start, end: start + 1 };\r
        }\r
\r
        function getOnboardingStorageKey(userId) {\r
            return \`schoolix.adminOnboardingDone.\${userId}\`;\r
        }\r
\r
        function needsFirstSetup(user, adminData) {\r
            if (!user || String(adminData?.role || "").toLowerCase() !== "admin") return false;\r
            if (adminData?.onboardingRequired !== true) return false;\r
            try {\r
                if (localStorage.getItem(getOnboardingStorageKey(user.uid)) === "true") return false;\r
            } catch (_) {}\r
            return adminData?.onboardingCompleted !== true && !adminData?.onboardingCompletedAt;\r
        }\r
\r
        function primeSetupForm(adminData = {}) {\r
            const years = suggestAcademicYears();\r
            document.getElementById("setupStartYear").value = adminData.setup?.sessionStartYear || years.start;\r
            document.getElementById("setupEndYear").value = adminData.setup?.sessionEndYear || years.end;\r
            document.getElementById("setupSchoolPhone").value = adminData.schoolPhone || adminData.phone || "";\r
            document.getElementById("setupSchoolCode").value = adminData.schoolCode || "";\r
            document.getElementById("setupSchoolAddress").value = adminData.schoolAddress || adminData.address || "";\r
        }\r
\r
        async function runFirstLoginOnboarding(user, adminData) {\r
            if (!needsFirstSetup(user, adminData)) return;\r
            onboardingUser = user;\r
            onboardingProfile = adminData || {};\r
            primeSetupForm(onboardingProfile);\r
            firstLoginLaunchCopy.textContent = \`Preparing \${onboardingProfile.schoolName || "your school"} workspace...\`;\r
            const logoUrl = onboardingProfile.logoUrl || onboardingProfile.schoolLogoUrl || "";\r
            firstLoginLaunchLogo.innerHTML = logoUrl\r
                ? \`<img src="\${escapeAttribute(logoUrl)}" alt="School logo">\`\r
                : \`<img src="schoolix-app-icon.svg" alt="Schoolix">\`;\r
            firstLoginLaunch.classList.add("is-visible");\r
            firstLoginLaunch.setAttribute("aria-hidden", "false");\r
            window.setTimeout(() => {\r
                firstLoginLaunch.classList.remove("is-visible");\r
                firstLoginLaunch.setAttribute("aria-hidden", "true");\r
                firstSetupOverlay.classList.add("is-visible");\r
                firstSetupOverlay.setAttribute("aria-hidden", "false");\r
                document.getElementById("setupStartYear")?.focus();\r
            }, 2050);\r
        }\r
\r
        function setSetupStatus(message, type = "") {\r
            firstSetupStatus.textContent = message;\r
            firstSetupStatus.className = \`sx-setup-status \${type}\`.trim();\r
        }\r
\r
        firstSetupForm.addEventListener("submit", async (event) => {\r
            event.preventDefault();\r
            if (!onboardingUser) return;\r
            const startYear = Number(document.getElementById("setupStartYear").value);\r
            const endYear = Number(document.getElementById("setupEndYear").value);\r
            const schoolPhone = document.getElementById("setupSchoolPhone").value.trim();\r
            const schoolCode = document.getElementById("setupSchoolCode").value.trim();\r
            const schoolAddress = document.getElementById("setupSchoolAddress").value.trim();\r
            if (!startYear || !endYear || endYear <= startYear) {\r
                setSetupStatus("Please enter a valid academic session.", "error");\r
                return;\r
            }\r
            const sessionLabel = \`\${startYear}-\${endYear}\`;\r
            const sessionId = sessionLabel.replace(/[^0-9a-zA-Z]+/g, "-").replace(/^-+|-+$/g, "");\r
            firstSetupSaveBtn.disabled = true;\r
            setSetupStatus("Saving setup...");\r
            try {\r
                await setDoc(doc(db, "schools", onboardingUser.uid, "sessions", sessionId), {\r
                    startYear,\r
                    endYear,\r
                    session: sessionLabel,\r
                    locked: false,\r
                    classesLocked: false,\r
                    createdAt: serverTimestamp(),\r
                    createdBy: onboardingUser.uid,\r
                    createdFrom: "first-login-setup"\r
                }, { merge: true });\r
\r
                await setDoc(doc(db, "schools", onboardingUser.uid, "settings", "activeSession"), {\r
                    sessionId,\r
                    session: sessionLabel,\r
                    sessionLabel,\r
                    updatedAt: serverTimestamp(),\r
                    updatedBy: onboardingUser.uid\r
                }, { merge: true });\r
\r
                const setupPayload = {\r
                    onboardingRequired: false,\r
                    onboardingCompleted: true,\r
                    onboardingCompletedAt: serverTimestamp(),\r
                    setup: {\r
                        sessionId,\r
                        session: sessionLabel,\r
                        sessionStartYear: startYear,\r
                        sessionEndYear: endYear,\r
                        completedAt: new Date().toISOString()\r
                    },\r
                    updatedAt: serverTimestamp()\r
                };\r
                if (schoolPhone) setupPayload.schoolPhone = schoolPhone;\r
                if (schoolCode) setupPayload.schoolCode = schoolCode;\r
                if (schoolAddress) setupPayload.schoolAddress = schoolAddress;\r
\r
                await Promise.all([\r
                    updateDoc(doc(db, "users", onboardingUser.uid), setupPayload),\r
                    setDoc(doc(db, "schools", onboardingUser.uid), setupPayload, { merge: true })\r
                ]);\r
\r
                try { localStorage.setItem(getOnboardingStorageKey(onboardingUser.uid), "true"); } catch (_) {}\r
                setSetupStatus("Setup saved. Opening dashboard...", "success");\r
                window.setTimeout(() => {\r
                    firstSetupOverlay.classList.remove("is-visible");\r
                    firstSetupOverlay.setAttribute("aria-hidden", "true");\r
                }, 600);\r
            } catch (error) {\r
                console.error("First setup save error:", error);\r
                setSetupStatus(error.message || "Setup save failed. Please try again.", "error");\r
                firstSetupSaveBtn.disabled = false;\r
            }\r
        });\r
\r
        onAuthStateChanged(auth, async (user) => {\r
            if (user) {\r
                userWelcome.classList.add('show');\r
                loginSection.style.display = 'none';\r
                renderCachedDashboardStats(user.uid);\r
                const adminProfilePromise = loadAdminProfile(user);\r
                // Keep the first interactive paint free of large collection reads.\r
                // Fresh totals are loaded immediately after the browser gets a frame.\r
                requestAnimationFrame(() => requestAnimationFrame(() => refreshDashboardStats(user.uid)));\r
                const adminProfile = await adminProfilePromise;\r
                await runFirstLoginOnboarding(user, adminProfile);\r
            } else {\r
                userWelcome.classList.remove('show');\r
                loginSection.style.display = 'block';\r
            }\r
        });\r
\r
        window.loginWithGoogle = async () => {\r
            try {\r
                const loginBtn = document.querySelector('.btn-primary');\r
                loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing in…';\r
                loginBtn.disabled = true;\r
                await signInWithPopup(auth, provider);\r
            } catch (error) {\r
                console.error("Login error:", error);\r
                alert("Login failed: " + error.message);\r
                location.reload();\r
            }\r
        };\r
\r
        window.logout = async () => {\r
            try {\r
                const logoutBtn = document.querySelector('.btn-logout');\r
                logoutBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging out…';\r
                logoutBtn.disabled = true;\r
                await signOut(auth);\r
                window.location.href = '#/index.html';\r
            } catch (error) {\r
                console.error("Logout error:", error);\r
                alert("Logout failed. Please try again.");\r
                location.reload();\r
            }\r
        };\r
\r
        function applyDashboardStats(stats) {\r
            document.getElementById('totalStudents').textContent = Number(stats.students || 0).toLocaleString();\r
            document.getElementById('totalClasses').textContent = Number(stats.classes || 0).toLocaleString();\r
            document.getElementById('totalTeachers').textContent = Number(stats.teachers || 0).toLocaleString();\r
            document.getElementById('totalFees').textContent = formatCurrency(stats.fees || 0);\r
        }\r
\r
        function renderCachedDashboardStats(adminId) {\r
            try {\r
                const cached = JSON.parse(sessionStorage.getItem(dashboardStatsCachePrefix + adminId) || 'null');\r
                if (cached && Date.now() - cached.savedAt < dashboardStatsCacheTtl) applyDashboardStats(cached);\r
            } catch (_) {\r
                // Stats cache is only an instant visual fallback.\r
            }\r
        }\r
\r
        function cacheDashboardStats(adminId, stats) {\r
            try {\r
                sessionStorage.setItem(dashboardStatsCachePrefix + adminId, JSON.stringify({ ...stats, savedAt: Date.now() }));\r
            } catch (_) {}\r
        }\r
\r
        async function refreshDashboardStats(adminId) {\r
            try {\r
                const [studentSnap, teacherSnap, feeSnap] = await Promise.all([\r
                    getDocs(collection(db, "schools", adminId, "students")),\r
                    getDocs(query(collection(db, "users"), where("role", "==", "teacher"), where("adminId", "==", adminId))),\r
                    getDocs(collection(db, "schools", adminId, "fees"))\r
                ]);\r
\r
                const sections = new Set();\r
                studentSnap.forEach((docSnap) => {\r
                    const student = docSnap.data();\r
                    sections.add(\`\${student.class || ""}-\${student.section || ""}\`);\r
                });\r
\r
                let collectedFees = 0;\r
                feeSnap.forEach((docSnap) => {\r
                    const fee = docSnap.data();\r
                    collectedFees += Number(fee.totalCollectedAmount || fee.totalPaidAmount || fee.paidAmount || 0);\r
                });\r
\r
                const stats = {\r
                    students: studentSnap.size,\r
                    classes: sections.size,\r
                    teachers: teacherSnap.size,\r
                    fees: collectedFees\r
                };\r
                applyDashboardStats(stats);\r
                cacheDashboardStats(adminId, stats);\r
            } catch (error) {\r
                console.error('Dashboard stats refresh error:', error);\r
            }\r
        }\r
    `},{attributes:{type:"module",src:"admin-shell.js?v=admin-performance-20261024"},text:""},{attributes:{type:"module",src:"access-control.js"},text:""},{attributes:{src:"schoolix-polish.js"},text:""}]};export{e as default};
