const r={file:"index.html",title:"Schoolix - Sign In",htmlClass:"",bodyClass:"sx-login-app auth-checking",body:`\r
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
<div class="auth-gate" id="authGate" role="status" aria-live="polite">\r
        <div class="auth-loader-card">\r
        <div class="auth-loader-mark">\r
            <img src="/schoolix-app-icon.svg" alt="Schoolix logo">\r
        </div>\r
        <div>\r
            <div class="auth-loader-title">Opening Schoolix</div>\r
            <div class="auth-loader-subtitle" id="authGateText">Checking your saved login...</div>\r
        </div>\r
        <div class="auth-loader-ring"><span></span></div>\r
    </div>\r
</div>\r
\r
<main class="shell">\r
\r
    <header class="mobile-brand" aria-label="Schoolix">\r
        <div class="mobile-brand-logo">\r
            <div class="brand-icon" style="width:32px;height:32px;border-radius:10px;">\r
                <img src="/schoolix-app-icon.svg" alt="">\r
            </div>\r
            Schoolix\r
        </div>\r
        <span class="mobile-brand-tag">Sign in</span>\r
    </header>\r
\r
    <!-- LEFT PANEL -->\r
    <div class="panel-left">\r
        <div class="orb orb-1"></div>\r
        <div class="orb orb-2"></div>\r
        <div class="orb orb-3"></div>\r
        <div class="grid-overlay"></div>\r
\r
        <div class="panel-left-content">\r
            <!-- Brand -->\r
            <div class="brand-logo">\r
                <div class="brand-icon">\r
                    <img src="/schoolix-app-icon.svg" alt="">\r
                </div>\r
                Schoolix\r
            </div>\r
\r
            <!-- Hero -->\r
            <div class="left-hero">\r
                <div class="hero-tag">\r
                    <span class="hero-tag-dot"></span>\r
                    School ERP Platform\r
                </div>\r
                <h1 class="hero-heading">\r
                    Empowering<br>\r
                    <span>Education,</span><br>\r
                    Simplified.\r
                </h1>\r
                <p class="hero-desc">\r
                    A practical workspace for admissions, attendance, fees, reports, teachers, and transport.\r
                </p>\r
\r
                <div class="stats-row">\r
                    <div class="stat-item">\r
                        <span class="stat-num">500+</span>\r
                        <span class="stat-label">Schools</span>\r
                    </div>\r
                    <div class="stat-divider"></div>\r
                    <div class="stat-item">\r
                        <span class="stat-num">1.2L+</span>\r
                        <span class="stat-label">Students</span>\r
                    </div>\r
                    <div class="stat-divider"></div>\r
                    <div class="stat-item">\r
                        <span class="stat-num">24/7</span>\r
                        <span class="stat-label">Access</span>\r
                    </div>\r
                </div>\r
            </div>\r
\r
            <!-- Dots -->\r
            <div class="dots-row">\r
                <div class="dot"></div>\r
                <div class="dot"></div>\r
                <div class="dot active"></div>\r
            </div>\r
        </div>\r
    </div>\r
\r
    <!-- RIGHT PANEL -->\r
    <div class="panel-right">\r
        <div class="form-card">\r
\r
            <div class="form-header">\r
                <p class="form-welcome">Welcome back</p>\r
                <h2 class="form-title">Sign In</h2>\r
                <p class="form-subtitle">Access your dashboard using your school credentials.</p>\r
\r
                <div class="form-hint">\r
                    <span class="form-hint-icon">\r
                        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>\r
                    </span>\r
                    <p>Use your <strong style="color:#c4b5fd;font-weight:600;">email</strong>, parent email, or <strong style="color:#c4b5fd;font-weight:600;">Student ID</strong> to continue.</p>\r
                </div>\r
            </div>\r
\r
            <form id="loginForm" novalidate>\r
                <div class="field">\r
                    <label class="field-label" for="email">Email Address / Student ID</label>\r
                    <div class="field-wrap">\r
                        <input\r
                            class="field-input"\r
                            type="text"\r
                            id="email"\r
                            placeholder="Enter email or Student ID"\r
                            autocomplete="username"\r
                            required\r
                        >\r
                    </div>\r
                </div>\r
\r
                <div class="field">\r
                    <label class="field-label" for="password">Password</label>\r
                    <div class="field-wrap">\r
                        <input\r
                            class="field-input"\r
                            type="password"\r
                            id="password"\r
                            placeholder="Enter your password"\r
                            autocomplete="current-password"\r
                            required\r
                        >\r
                        <button\r
                            type="button"\r
                            class="field-suffix toggle-password"\r
                            id="togglePassword"\r
                            aria-label="Show password"\r
                            aria-pressed="false"\r
                            title="Show password"\r
                        >\r
                            <svg id="eyeIcon" viewBox="0 0 24 24" aria-hidden="true">\r
                                <path d="M12 5c-5.5 0-10 4.5-11 7 1 2.5 5.5 7 11 7s10-4.5 11-7c-1-2.5-5.5-7-11-7Zm0 11.5A4.5 4.5 0 1 1 12 7a4.5 4.5 0 0 1 0 9.5Zm0-2A2.5 2.5 0 1 0 12 9a2.5 2.5 0 0 0 0 5Z"/>\r
                            </svg>\r
                        </button>\r
                    </div>\r
                </div>\r
\r
                <div class="forgot-row">\r
                    <a href="#" class="forgot-link" onclick="resetPassword(); return false;">Forgot password?</a>\r
                </div>\r
\r
                <button type="submit" class="btn-primary">Sign In</button>\r
            </form>\r
\r
            <div class="loading-bar" id="loading"></div>\r
\r
            <div class="error-msg" id="errorMsg">\r
                <span class="error-msg-icon">\r
                    <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>\r
                </span>\r
                <p id="errorText"></p>\r
            </div>\r
\r
            <div class="or-row">\r
                <div class="or-line"></div>\r
                <span class="or-text">or continue with</span>\r
                <div class="or-line"></div>\r
            </div>\r
\r
            <button class="btn-google" onclick="loginWithGoogle()">\r
                <svg class="google-svg" viewBox="0 0 48 48">\r
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>\r
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>\r
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>\r
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>\r
                    <path fill="none" d="M0 0h48v48H0z"/>\r
                </svg>\r
                Continue with Google\r
            </button>\r
\r
            <a class="btn-apk" id="downloadAndroidApp" href="/dist/Schoolix-download" download="Schoolix.apk">\r
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">\r
                    <path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/>\r
                </svg>\r
                <span id="downloadAndroidLabel">Download Android App</span>\r
            </a>\r
            <span class="download-meta" id="downloadAndroidMeta">Latest APK</span>\r
\r
        </div>\r
    </div>\r
</main>\r
\r
<script src="school-branding.js" defer><\/script>\r
<script src="/schoolix-app.js?v=navbar-20260721" defer><\/script>\r
<script type="module">\r
import { initializeApp } from "./firebase-compat.js";\r
import {\r
    getAuth,\r
    signInWithEmailAndPassword,\r
    signInWithPopup,\r
    signInWithRedirect,\r
    getRedirectResult,\r
    signInWithCredential,\r
    GoogleAuthProvider,\r
    onAuthStateChanged,\r
    signOut\r
} from "./firebase-compat.js";\r
import {\r
    getFirestore,\r
    doc,\r
    getDoc,\r
    getDocs,\r
    collection,\r
    query,\r
    where,\r
    limit,\r
    setDoc\r
} from "./firebase-compat.js";\r
\r
const firebaseConfig = {\r
    apiKey: "AIzaSyAomGwef93HFT9Xyx7SVW95FPw_IcIAICE",\r
    authDomain: "schoolix-48107.firebaseapp.com",\r
    projectId: "schoolix-48107"\r
};\r
\r
const app = initializeApp(firebaseConfig);\r
const auth = getAuth(app);\r
const db = getFirestore(app);\r
const googleProvider = new GoogleAuthProvider();\r
googleProvider.setCustomParameters({ prompt: "select_account" });\r
\r
const SUPABASE_URL = "https://ezkmeedcqetztkeppxil.supabase.co";\r
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6a21lZWRjcWV0enRrZXBweGlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxMjk5NjAsImV4cCI6MjA5MzcwNTk2MH0.1davJ_NYkFhHToUtcFBR0kA6dk0-cOkaIbK2SCObkQg";\r
const PASSWORD_RESET_FUNCTION_URL = \`\${SUPABASE_URL}/functions/v1/send-password-reset-email\`;\r
\r
const loginForm = document.getElementById('loginForm');\r
const emailInput = document.getElementById('email');\r
const passwordInput = document.getElementById('password');\r
const loadingEl = document.getElementById('loading');\r
const errorEl = document.getElementById('errorMsg');\r
const errorText = document.getElementById('errorText');\r
const togglePasswordBtn = document.getElementById('togglePassword');\r
const eyeIcon = document.getElementById('eyeIcon');\r
const downloadAndroidApp = document.getElementById('downloadAndroidApp');\r
const downloadAndroidLabel = document.getElementById('downloadAndroidLabel');\r
const downloadAndroidMeta = document.getElementById('downloadAndroidMeta');\r
const authGate = document.getElementById('authGate');\r
const authGateText = document.getElementById('authGateText');\r
let authRedirectInProgress = false;\r
let nativeGoogleResolve = null;\r
let nativeGoogleReject = null;\r
\r
const STUDENT_SESSION_KEY = "schoolixStudentSession";\r
const TEACHER_SESSION_KEY = "schoolixTeacherSession";\r
const SUPER_ADMIN_EMAIL = "anshbajpai4@gmail.com";\r
\r
function loadStudentSession() {\r
    try { return JSON.parse(localStorage.getItem(STUDENT_SESSION_KEY)); } catch { return null; }\r
}\r
function saveStudentSession(data) {\r
    localStorage.setItem(STUDENT_SESSION_KEY, JSON.stringify(data));\r
}\r
function clearStudentSession() {\r
    localStorage.removeItem(STUDENT_SESSION_KEY);\r
}\r
\r
function loadTeacherSession() {\r
    try { return JSON.parse(localStorage.getItem(TEACHER_SESSION_KEY)); } catch { return null; }\r
}\r
function saveTeacherSession(session) {\r
    if (!session) return;\r
    try {\r
        const json = JSON.stringify(session);\r
        localStorage.setItem(TEACHER_SESSION_KEY, json);\r
        localStorage.setItem("schoolixLastTeacherProfile", json);\r
        if (session.uid) {\r
            localStorage.setItem(\`schoolixTeacherProfile_\${session.uid}\`, json);\r
        }\r
        if (session.email) {\r
            localStorage.setItem(\`schoolixTeacherProfileEmail_\${String(session.email).trim().toLowerCase()}\`, json);\r
        }\r
        const schoolId = session.schoolId || session.adminId || "";\r
        if (schoolId) {\r
            localStorage.setItem("teacherSchoolId", schoolId);\r
            if (session.schoolName) {\r
                localStorage.setItem(\`schoolixSchoolName_\${schoolId}\`, session.schoolName);\r
            }\r
        }\r
        if (session.schoolName) {\r
            window.SchoolBranding?.persistSchoolName?.(session.schoolName);\r
            try { localStorage.setItem("schoolix.schoolName", session.schoolName); } catch {}\r
        }\r
        if (session.logoUrl) {\r
            window.SchoolBranding?.persistSchoolLogo?.(session.logoUrl);\r
        }\r
        if (session.section) {\r
            localStorage.setItem("teacherSection", session.section);\r
        }\r
    } catch (e) {\r
        console.warn("Unable to save teacher session:", e);\r
    }\r
}\r
function clearTeacherSession() {\r
    try {\r
        localStorage.removeItem(TEACHER_SESSION_KEY);\r
        localStorage.removeItem("schoolixLastTeacherProfile");\r
    } catch {}\r
}\r
\r
function userFacingAuthError(error, fallback = "Login failed. Please try again.") {\r
    const code = String(error?.code || "").toLowerCase();\r
    const messages = {\r
        "auth/user-not-found": "The email or password is incorrect.",\r
        "auth/wrong-password": "The email or password is incorrect.",\r
        "auth/invalid-credential": "The email or password is incorrect.",\r
        "auth/invalid-credentials": "The email or password is incorrect.",\r
        "auth/invalid-email": "Enter a valid email address.",\r
        "auth/too-many-requests": "Too many attempts. Please wait a moment and try again.",\r
        "network-request-failed": "Network connection failed. Check your internet and try again.",\r
        "deadline-exceeded": "The request took too long. Check your connection and try again.",\r
        "unavailable": "Schoolix is temporarily unavailable. Please try again shortly."\r
    };\r
    return messages[code] || window.SchoolixErrors?.message?.(error, fallback) || fallback;\r
}\r
\r
async function requestPasswordResetEmail(email) {\r
    const controller = new AbortController();\r
    const timeoutId = setTimeout(() => controller.abort(), 20000);\r
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
                schoolName: window.SchoolBranding?.getSchoolName() || "Schoolix"\r
            }),\r
            signal: controller.signal\r
        });\r
        if (!response.ok) {\r
            const error = new Error("Password reset email could not be sent.");\r
            error.code = response.status === 429 ? "resource-exhausted" : response.status >= 500 ? "unavailable" : "unknown";\r
            throw error;\r
        }\r
    } catch (error) {\r
        if (error.name === "AbortError") {\r
            const timeoutError = new Error("Password reset request timed out.");\r
            timeoutError.code = "deadline-exceeded";\r
            throw timeoutError;\r
        }\r
        throw error;\r
    } finally {\r
        clearTimeout(timeoutId);\r
    }\r
}\r
\r
function linkedSchoolId(profile = {}, adminData = null) {\r
    return String(\r
        profile.schoolId || profile.schoolID || profile.schoolUid || profile.schoolUID || profile.schoolDocId || profile.schoolDocID ||\r
        profile.adminId || profile.adminID || profile.adminUid || profile.adminUID || profile.adminDocId || profile.adminDocID ||\r
        adminData?.schoolId || adminData?.schoolID || adminData?.schoolUid || adminData?.schoolUID ||\r
        adminData?.adminId || adminData?.adminID || adminData?.adminUid || adminData?.adminUID ||\r
        adminData?.schoolDocId || adminData?.schoolDocID || adminData?.adminDocId || adminData?.adminID || adminData?.id || ""\r
    ).trim();\r
}\r
\r
function buildStudentSession(user, student = {}, adminData = null, extra = {}) {\r
    const schoolId = linkedSchoolId(student, adminData);\r
    const schoolName = student.schoolName || adminData?.schoolName || window.SchoolBranding?.getSchoolName?.() || "";\r
    return {\r
        uid: user.uid,\r
        authUid: user.supabaseUid || user.uid,\r
        supabaseAuthUid: user.supabaseUid || "",\r
        studentId: student.studentId || student.id || user.uid,\r
        studentDocId: student.studentDocId || student.id || "",\r
        name: student.name || student.fullName || student.studentName || "",\r
        class: student.class || "",\r
        section: student.section || "",\r
        rollNo: student.rollNo || student.roll || "",\r
        email: student.email || student.authEmail || user.email || "",\r
        schoolId,\r
        schoolName,\r
        role: "student",\r
        loginAt: new Date().toISOString(),\r
        ...extra\r
    };\r
}\r
\r
function buildTeacherSession(user, teacher = {}, adminData = null, extra = {}) {\r
    const schoolId = linkedSchoolId(teacher, adminData);\r
    const schoolName = teacher.schoolName || adminData?.schoolName || adminData?.instituteName || window.SchoolBranding?.getSchoolName?.() || "";\r
    const logoUrl = teacher.logoUrl || teacher.schoolLogoUrl || adminData?.logoUrl || adminData?.schoolLogoUrl || "";\r
    const photoUrl = teacher.photoUrl || teacher.imageUrl || teacher.profilePhotoUrl || teacher.avatarUrl || "";\r
    const name = teacher.name || teacher.fullName || teacher.teacherName || teacher.displayName || user.displayName || "";\r
    return {\r
        uid: user.uid,\r
        authUid: user.supabaseUid || user.uid,\r
        supabaseAuthUid: user.supabaseUid || "",\r
        docId: teacher.id || user.uid,\r
        teacherId: teacher.teacherId || teacher.staffId || teacher.id || "",\r
        name,\r
        displayName: name,\r
        email: teacher.email || teacher.authEmail || user.email || "",\r
        class: teacher.class || "",\r
        section: teacher.section || "",\r
        assignedClasses: teacher.assignedClasses || [],\r
        schoolId,\r
        adminId: schoolId,\r
        schoolName,\r
        logoUrl,\r
        photoUrl,\r
        role: "teacher",\r
        loginAt: new Date().toISOString(),\r
        ...extra\r
    };\r
}\r
\r
const FEATURE_LABELS = {\r
    dashboard: "Dashboard",\r
    teachers: "Teachers",\r
    students: "Students",\r
    attendance: "Attendance",\r
    payroll: "Payroll",\r
    reports: "Reports",\r
    announcements: "Announcements",\r
    settings: "Settings"\r
};\r
\r
async function hydrateAndroidDownloadLink() {\r
    if (!downloadAndroidApp) return;\r
    const fallbackUrl = "/dist/Schoolix-download";\r
    try {\r
        const response = await fetch(\`/version.json?t=\${Date.now()}\`, { cache: "no-store" });\r
        if (!response.ok) throw new Error("version.json unavailable");\r
        const data = await response.json();\r
        const apkUrl = String(data.apkUrl || fallbackUrl).trim();\r
        downloadAndroidApp.href = apkUrl || fallbackUrl;\r
        if (downloadAndroidLabel) downloadAndroidLabel.textContent = "Download Latest Android App";\r
        if (downloadAndroidMeta) {\r
            const versionName = data.versionName ? \`v\${data.versionName}\` : "Latest version";\r
            const versionCode = data.versionCode ? \` build \${data.versionCode}\` : "";\r
            downloadAndroidMeta.textContent = \`\${versionName}\${versionCode}\`;\r
        }\r
    } catch (error) {\r
        console.warn("Unable to load APK metadata:", error);\r
        downloadAndroidApp.href = fallbackUrl;\r
        if (downloadAndroidMeta) downloadAndroidMeta.textContent = "Latest APK";\r
    }\r
}\r
\r
function scheduleAndroidDownloadHydration() {\r
    const run = () => {\r
        if ("requestIdleCallback" in window) window.requestIdleCallback(() => hydrateAndroidDownloadLink(), { timeout: 3000 });\r
        else setTimeout(() => hydrateAndroidDownloadLink(), 1500);\r
    };\r
    if (document.readyState === "complete") run();\r
    else window.addEventListener("load", run, { once: true });\r
}\r
\r
scheduleAndroidDownloadHydration();\r
\r
function accessErrorFor(adminData, featureKey = "") {\r
    if (!adminData || adminData.access === false) {\r
        return "Your school's platform access has been disabled by the Super Admin. Please contact support.";\r
    }\r
    if (featureKey && (adminData.features || {})[featureKey] === false) {\r
        return \`\${FEATURE_LABELS[featureKey] || "This"} access has been disabled for your school by the Super Admin.\`;\r
    }\r
    return "";\r
}\r
\r
async function getAdminAccessData(userId, userData) {\r
    if (!userData) return null;\r
    if ((userData.role || "").toLowerCase() === "admin") return { id: userId, ...userData };\r
    const adminId = linkedSchoolId(userData);\r
    if (!adminId) return null;\r
    try {\r
        const adminSnap = await getDoc(doc(db, "users", adminId));\r
        return adminSnap.exists() ? { id: adminSnap.id, ...adminSnap.data() } : null;\r
    } catch (error) {\r
        console.warn("Unable to load admin access profile", error);\r
        return null;\r
    }\r
}\r
\r
const EYE_OPEN = \`<path d="M12 5c-5.5 0-10 4.5-11 7 1 2.5 5.5 7 11 7s10-4.5 11-7c-1-2.5-5.5-7-11-7Zm0 11.5A4.5 4.5 0 1 1 12 7a4.5 4.5 0 0 1 0 9.5Zm0-2A2.5 2.5 0 1 0 12 9a2.5 2.5 0 0 0 0 5Z"/>\`;\r
const EYE_CLOSED = \`<path d="M2.1 3.51 3.51 2.1l18.38 18.38-1.41 1.41-3.3-3.3A10.96 10.96 0 0 1 12 21C6.5 21 2 16.5 1 14c.52-1.31 1.63-2.97 3.22-4.49l-.21-.21A.99.99 0 0 1 2.1 3.51ZM12 7c2.76 0 5 2.24 5 5 0 .62-.11 1.21-.32 1.76l-1.6-1.6A2.97 2.97 0 0 0 12 9c-.7 0-1.34.24-1.85.64L8.79 8.28A4.97 4.97 0 0 1 12 7Zm0 10c-2.76 0-5-2.24-5-5 0-.74.16-1.45.43-2.08L5.37 8.86C4 10.12 3.1 11.42 2.78 12c1 2.09 4.59 6 9.22 6 1.11 0 2.17-.18 3.14-.5l-1.69-1.69c-.45.12-.93.19-1.45.19Zm5.63-2.69 1.48 1.48C20.48 14.93 21.48 13.46 21.9 12c-1-2.5-5.5-7-9.9-7-1.25 0-2.46.23-3.56.65l1.56 1.56c.62-.14 1.28-.21 1.98-.21 2.76 0 5 2.24 5 5 0 .47-.07.92-.2 1.31Z"/>\`;\r
\r
togglePasswordBtn.addEventListener('click', () => {\r
    const isHidden = passwordInput.type === "password";\r
    passwordInput.type = isHidden ? "text" : "password";\r
    eyeIcon.innerHTML = isHidden ? EYE_CLOSED : EYE_OPEN;\r
    togglePasswordBtn.setAttribute("aria-label", isHidden ? "Hide password" : "Show password");\r
    togglePasswordBtn.setAttribute("aria-pressed", String(isHidden));\r
});\r
\r
function showError(message) {\r
    errorText.textContent = message;\r
    errorEl.classList.add('visible');\r
    setTimeout(() => errorEl.classList.remove('visible'), 5500);\r
}\r
\r
const accessError = new URLSearchParams(window.location.search).get("access_error");\r
if (accessError) {\r
    showError(accessError);\r
    history.replaceState({}, document.title, window.location.pathname);\r
}\r
\r
function showLoading(show) {\r
    loadingEl.classList.toggle('visible', show);\r
    loginForm.style.opacity = show ? '0.65' : '1';\r
    loginForm.style.pointerEvents = show ? 'none' : '';\r
}\r
\r
function setAuthGate(message) {\r
    if (authGateText && message) authGateText.textContent = message;\r
    document.body.classList.add("auth-checking");\r
    authGate?.classList.remove("hidden");\r
}\r
\r
function hideAuthGate() {\r
    document.body.classList.remove("auth-checking");\r
    authGate?.classList.add("hidden");\r
}\r
\r
function isNativeSchoolixApp() {\r
    try {\r
        if (window.Capacitor?.isNativePlatform?.()) return true;\r
        return location.protocol === "capacitor:";\r
    } catch {\r
        return false;\r
    }\r
}\r
\r
function signInWithNativeGoogle() {\r
    return new Promise((resolve, reject) => {\r
        if (!window.SchoolixNativeAuth?.signInWithGoogle) {\r
            reject(new Error("Native Google login is not available"));\r
            return;\r
        }\r
        nativeGoogleResolve = resolve;\r
        nativeGoogleReject = reject;\r
        window.SchoolixNativeAuth.signInWithGoogle();\r
    });\r
}\r
\r
window.SchoolixNativeGoogleAuth = {\r
    async receiveIdToken(idToken) {\r
        try {\r
            const token = String(idToken || "").trim();\r
            if (!token) throw new Error("Google login token was not received");\r
            const credential = GoogleAuthProvider.credential(token);\r
            const result = await signInWithCredential(auth, credential);\r
            nativeGoogleResolve?.(result);\r
        } catch (error) {\r
            nativeGoogleReject?.(error);\r
        } finally {\r
            nativeGoogleResolve = null;\r
            nativeGoogleReject = null;\r
        }\r
    },\r
    receiveError(message) {\r
        nativeGoogleReject?.(new Error(message || "Google login failed"));\r
        nativeGoogleResolve = null;\r
        nativeGoogleReject = null;\r
    }\r
};\r
\r
function isParentIdentifier(identifier, student) {\r
    const lowered = String(identifier || "").trim().toLowerCase();\r
    if (!lowered || !lowered.includes("@")) return false;\r
    if (String(student.email || "").trim().toLowerCase() === lowered) return false;\r
    if (String(student.authEmail || "").trim().toLowerCase() === lowered) return false;\r
    return [student.parentEmail, student.fatherEmail, student.motherEmail, student.guardianEmail]\r
        .some(email => String(email || "").trim().toLowerCase() === lowered);\r
}\r
\r
function uniqueLookupValues(values = []) {\r
    const seen = new Set();\r
    return values\r
        .map(value => typeof value === "string" ? value.trim() : value)\r
        .filter(value => value !== "" && value !== null && value !== undefined)\r
        .filter(value => {\r
            const key = \`\${typeof value}:\${String(value)}\`;\r
            if (seen.has(key)) return false;\r
            seen.add(key);\r
            return true;\r
        });\r
}\r
\r
async function findStudentRecord(identifier, options = {}) {\r
    const normalized = identifier.trim();\r
    if (!normalized) return null;\r
    const lowered = normalized.toLowerCase();\r
    const uppered = normalized.toUpperCase();\r
    const idValues = uniqueLookupValues([\r
        normalized,\r
        lowered,\r
        uppered,\r
        /^\\d+$/.test(normalized) ? Number(normalized) : null\r
    ]);\r
\r
    for (const docId of uniqueLookupValues([normalized, lowered, uppered])) {\r
        try {\r
            const byIdDoc = await getDoc(doc(db, "users", docId));\r
            if (byIdDoc.exists() && (byIdDoc.data().role || "").toLowerCase() === "student") {\r
                return { id: byIdDoc.id, ...byIdDoc.data() };\r
            }\r
        } catch (error) {\r
            if (error?.code !== "permission-denied") console.warn("Student direct lookup failed:", error);\r
        }\r
    }\r
\r
    const lookups = [\r
        ["studentId", idValues],\r
        ["email", uniqueLookupValues([lowered, normalized])],\r
        ["authEmail", uniqueLookupValues([lowered, normalized])]\r
    ];\r
    if (options.parent) {\r
        const emailValues = uniqueLookupValues([lowered, normalized]);\r
        lookups.push(\r
            ["parentEmail", emailValues],\r
            ["fatherEmail", emailValues],\r
            ["motherEmail", emailValues],\r
            ["guardianEmail", emailValues]\r
        );\r
    }\r
    for (const [field, values] of lookups) {\r
        for (const value of values) {\r
            try {\r
                const snap = await getDocs(query(\r
                    collection(db, "users"),\r
                    where("role", "==", "student"),\r
                    where(field, "==", value),\r
                    limit(1)\r
                ));\r
                if (!snap.empty) return { id: snap.docs[0].id, ...snap.docs[0].data() };\r
            } catch (error) {\r
                if (error?.code !== "permission-denied") console.warn(\`Student \${field} lookup failed:\`, error);\r
            }\r
        }\r
    }\r
    return null;\r
}\r
\r
async function loginStudent(identifier, password, options = {}) {\r
    const student = await findStudentRecord(identifier, { parent: true });\r
    if (!student) return { success: false, reason: "Student or parent record not found." };\r
    const authEmail = String(student.authEmail || student.email || "").trim().toLowerCase();\r
    if (!authEmail || authEmail.endsWith("@schoolix.student")) {\r
        return { success: false, reason: "Registered email is missing for this student. Contact admin to update the student login email." };\r
    }\r
    const cred = await signInWithEmailAndPassword(auth, authEmail, password);\r
    const expectedAuthUid = String(student.authUid || "").trim();\r
    const signedInIds = [cred.user.uid, cred.user.supabaseUid].map(value => String(value || "").trim()).filter(Boolean);\r
    const signedInEmail = String(cred.user.email || "").trim().toLowerCase();\r
    const studentEmails = [student.authEmail, student.email]\r
        .map(value => String(value || "").trim().toLowerCase())\r
        .filter(Boolean);\r
    if (expectedAuthUid && !signedInIds.includes(expectedAuthUid) && !studentEmails.includes(signedInEmail)) {\r
        await signOut(auth).catch(() => {});\r
        return { success: false, reason: "Student login record is linked to a different account. Contact admin to refresh this student's login." };\r
    }\r
    const adminData = await getAdminAccessData(cred.user.uid, student);\r
    const accessReason = accessErrorFor(adminData);\r
    if (accessReason) {\r
        await signOut(auth).catch(() => {});\r
        return { success: false, reason: accessReason };\r
    }\r
    if (isParentIdentifier(identifier, student)) {\r
        saveStudentSession(buildStudentSession(cred.user, student, adminData, {\r
            loginAs: "parent",\r
            parentEmail: identifier.toLowerCase()\r
        }));\r
        window.location.href = "#/student-dashboard.html";\r
        return { success: true };\r
    }\r
    saveStudentSession(buildStudentSession(cred.user, student, adminData));\r
    setAuthGate("Opening student dashboard...");\r
    window.location.href = "#/student-dashboard.html";\r
    return { success: true };\r
}\r
\r
async function findSignedInStudentRecord(user) {\r
    if (!user) return null;\r
    const uid = String(user.uid || "").trim();\r
    const email = String(user.email || "").trim().toLowerCase();\r
    if (uid) {\r
        try {\r
            const snap = await getDocs(query(\r
                collection(db, "users"),\r
                where("role", "==", "student"),\r
                where("authUid", "==", uid),\r
                limit(1)\r
            ));\r
            if (!snap.empty) return { id: snap.docs[0].id, ...snap.docs[0].data() };\r
        } catch (error) {\r
            if (error?.code !== "permission-denied") console.warn("Student auth UID lookup failed:", error);\r
        }\r
    }\r
    return email ? await findStudentRecord(email, { parent: true }) : null;\r
}\r
\r
async function findSignedInUserRecord(user) {\r
    if (!user) return null;\r
    const uid = String(user.uid || "").trim();\r
    const email = String(user.email || "").trim().toLowerCase();\r
    const lookups = [];\r
    if (uid) lookups.push(["authUid", uid], ["uid", uid]);\r
    if (email) lookups.push(["email", email], ["authEmail", email]);\r
    for (const [field, value] of lookups) {\r
        try {\r
            const snap = await getDocs(query(collection(db, "users"), where(field, "==", value), limit(1)));\r
            if (!snap.empty) return { id: snap.docs[0].id, ...snap.docs[0].data() };\r
        } catch (error) {\r
            if (error?.code !== "permission-denied") console.warn(\`Profile \${field} recovery failed:\`, error);\r
        }\r
    }\r
    return null;\r
}\r
\r
async function syncSchoolName(userId, userData) {\r
    try {\r
        const branding = window.SchoolBranding;\r
        if (!branding) return;\r
        const direct = branding.normalizeSchoolName(userData.schoolName);\r
        if (userData.logoUrl || userData.schoolLogoUrl) branding.persistSchoolLogo?.(userData.logoUrl || userData.schoolLogoUrl);\r
        if (direct) { branding.persistSchoolName(direct); return; }\r
        const adminId = linkedSchoolId(userData) || (userData.role === "admin" ? userId : "");\r
        if (!adminId) return;\r
        let appliedName = false;\r
        const adminDoc = await getDoc(doc(db, "users", adminId));\r
        if (adminDoc.exists()) {\r
            const adminData = adminDoc.data();\r
            const n = branding.normalizeSchoolName(adminData.schoolName);\r
            if (adminData.logoUrl || adminData.schoolLogoUrl) branding.persistSchoolLogo?.(adminData.logoUrl || adminData.schoolLogoUrl);\r
            if (n) { branding.persistSchoolName(n); appliedName = true; }\r
        }\r
        const brandDoc = await getDoc(doc(db, "schools", adminId, "config", "branding"));\r
        if (brandDoc.exists()) {\r
            const brandData = brandDoc.data();\r
            const n = branding.normalizeSchoolName(brandData.schoolName);\r
            if (brandData.logoUrl || brandData.schoolLogoUrl) branding.persistSchoolLogo?.(brandData.logoUrl || brandData.schoolLogoUrl);\r
            if (n && !appliedName) branding.persistSchoolName(n);\r
        }\r
    } catch (e) { console.warn("Branding sync failed:", e); }\r
}\r
\r
async function checkUserRoleAndRedirect(user) {\r
    try {\r
        setAuthGate("Restoring your dashboard...");\r
        const email = String(user.email || "").trim().toLowerCase();\r
        if (email === SUPER_ADMIN_EMAIL) {\r
            clearStudentSession();\r
            try {\r
                await setDoc(doc(db, "users", user.uid), {\r
                    uid: user.uid,\r
                    name: "Ansh Bajpai",\r
                    email: SUPER_ADMIN_EMAIL,\r
                    role: "superAdmin",\r
                    superAdmin: true,\r
                    access: true,\r
                    updatedAt: new Date()\r
                }, { merge: true });\r
            } catch (profileError) {\r
                console.warn("Super admin profile bootstrap failed:", profileError);\r
            }\r
            setAuthGate("Opening super admin console...");\r
            window.location.href = "#/admin-signup.html";\r
            return;\r
        }\r
        const docRef = await getDoc(doc(db, "users", user.uid));\r
        let data = docRef.exists() ? docRef.data() : null;\r
        if (!data) {\r
            const recoveredUser = await findSignedInUserRecord(user);\r
            if (recoveredUser) {\r
                data = recoveredUser;\r
            }\r
        }\r
        if (!data) {\r
            const recoveredStudent = await findSignedInStudentRecord(user);\r
            if (recoveredStudent) {\r
                const adminData = await getAdminAccessData(user.uid, recoveredStudent);\r
                const accessReason = accessErrorFor(adminData);\r
                if (accessReason) {\r
                    await signOut(auth).catch(() => {});\r
                    hideAuthGate();\r
                    showError(accessReason);\r
                    return;\r
                }\r
                syncSchoolName(user.uid, recoveredStudent).catch(() => {});\r
                saveStudentSession(buildStudentSession(user, recoveredStudent, adminData));\r
                setAuthGate("Opening student dashboard...");\r
                window.location.href = "#/student-dashboard.html";\r
                return;\r
            }\r
            hideAuthGate(); showError("User data not found. Contact admin."); return;\r
        }\r
        const role = data.role;\r
        if (data.email && user.email && data.email.toLowerCase() !== user.email.toLowerCase()) {\r
            hideAuthGate();\r
            showError("Account mismatch detected"); return;\r
        }\r
        clearStudentSession();\r
        clearTeacherSession();\r
        const adminData = await getAdminAccessData(user.uid, data);\r
        const accessReason = accessErrorFor(adminData || data, role === "admin" ? "dashboard" : "");\r
        if (accessReason) {\r
            await signOut(auth).catch(() => {});\r
            hideAuthGate();\r
            showError(accessReason);\r
            return;\r
        }\r
        syncSchoolName(user.uid, data).catch(() => {});\r
        if (isNativeSchoolixApp() && role === "admin") {\r
            await signOut(auth).catch(() => {});\r
            hideAuthGate();\r
            showError("Admin login is only available on the web panel. Please use a student, parent, teacher, librarian, or accountant account in the app.");\r
            return;\r
        }\r
        if (role === "teacher") {\r
            setAuthGate("Opening teacher dashboard...");\r
            const teacherSession = buildTeacherSession(user, data, adminData, { loginAs: "teacher" });\r
            saveTeacherSession(teacherSession);\r
            window.location.href = "#/teacher-dashboard.html"; return;\r
        }\r
        if (role === "admin") { window.location.href = "#/admin-dashboard.html"; return; }\r
        if (role === "librarian") { window.location.href = "#/library-dashboard.html"; return; }\r
        if (role === "accountant") { window.location.href = "#/accountant-dashboard.html?v=accountant-dashboard-recovery-20260806"; return; }\r
        if (role === "driver") {\r
            setAuthGate("Opening driver dashboard...");\r
            window.location.href = "#/driver-dashboard.html"; return;\r
        }\r
        if (role === "student") {\r
            setAuthGate("Opening student dashboard...");\r
            saveStudentSession(buildStudentSession(user, data, adminData, { loginAs: "student" }));\r
            window.location.href = "#/student-dashboard.html"; return;\r
        }\r
        hideAuthGate();\r
        showError("Invalid role assigned");\r
    } catch (e) { hideAuthGate(); showError("Login error. Try again."); }\r
}\r
\r
loginForm.addEventListener('submit', async (e) => {\r
    e.preventDefault();\r
    const identifier = emailInput.value.trim();\r
    const password = passwordInput.value.trim();\r
    if (!identifier || !password) { showError('Please fill all fields'); return; }\r
    showLoading(true);\r
\r
    const looksLikeEmail = identifier.includes("@") || identifier.toLowerCase().includes(".com") || identifier.toLowerCase().includes(".in");\r
\r
    try {\r
        let directAuthError = null;\r
        if (looksLikeEmail) {\r
            try {\r
                const authId = identifier.toLowerCase();\r
                const cred = await signInWithEmailAndPassword(auth, authId, password);\r
                await checkUserRoleAndRedirect(cred.user);\r
                return;\r
            } catch (error) {\r
                directAuthError = error;\r
            }\r
        }\r
\r
        let studentLogin = { success: false, reason: "" };\r
        try {\r
            studentLogin = await loginStudent(identifier, password);\r
            if (studentLogin.success) return;\r
        } catch (studentAuthError) {\r
            studentLogin.reason = studentAuthError.code === "auth/wrong-password" || studentAuthError.code === "auth/invalid-credential"\r
                ? "Wrong student password"\r
                : studentAuthError.code === "auth/user-not-found"\r
                    ? "No login account found for this student. Contact admin."\r
                    : studentAuthError.message;\r
        }\r
\r
        const authError = directAuthError || new Error(studentLogin.reason || "Login failed");\r
        showError(studentLogin.reason || userFacingAuthError(authError));\r
    } catch (authError) {\r
        showError(userFacingAuthError(authError));\r
    } finally { showLoading(false); }\r
});\r
\r
async function finishGoogleLogin(user) {\r
    if (!user) return false;\r
    authRedirectInProgress = true;\r
    try {\r
        await checkUserRoleAndRedirect(user);\r
    } finally {\r
        setTimeout(() => { authRedirectInProgress = false; }, 1500);\r
    }\r
    return true;\r
}\r
\r
\r
async function handleGoogleRedirectResult() {\r
    try {\r
        const result = await getRedirectResult(auth);\r
        if (result?.user) {\r
            setAuthGate("Opening your dashboard...");\r
            await finishGoogleLogin(result.user);\r
        }\r
    } catch (error) {\r
        hideAuthGate();\r
        showError(userFacingAuthError(error, "Google login failed. Please try again."));\r
    }\r
}\r
\r
window.loginWithGoogle = async () => {\r
    showLoading(true);\r
    try {\r
        if (isNativeSchoolixApp() && window.SchoolixNativeAuth?.signInWithGoogle) {\r
            const result = await signInWithNativeGoogle();\r
            await finishGoogleLogin(result.user);\r
            return;\r
        }\r
        const result = await signInWithPopup(auth, googleProvider);\r
        await finishGoogleLogin(result.user);\r
    } catch (e) {\r
        const code = String(e?.code || "");\r
        if (code.includes("popup") || code.includes("cancelled") || code.includes("operation-not-supported")) {\r
            try {\r
                await signInWithRedirect(auth, googleProvider);\r
                return;\r
            } catch (redirectError) {\r
                showError(userFacingAuthError(redirectError, "Google login failed. Please try again."));\r
            }\r
        } else {\r
            showError(userFacingAuthError(e, "Google login failed. Please try again."));\r
        }\r
    } finally { showLoading(false); }\r
};\r
\r
window.resetPassword = async () => {\r
    const identifier = emailInput.value.trim();\r
    if (!identifier) { showError('Please enter your email or Student ID first'); return; }\r
    showLoading(true);\r
    try {\r
        let emailToReset = identifier;\r
        if (!identifier.includes("@")) {\r
            const student = await findStudentRecord(identifier, { parent: true });\r
            if (!student) { showError('Student record not found'); return; }\r
            emailToReset = String(student.authEmail || student.email || "").trim();\r
            if (!emailToReset || emailToReset.endsWith("@schoolix.student")) {\r
                showError('No registered email found for this student. Contact admin.');\r
                return;\r
            }\r
        }\r
        await requestPasswordResetEmail(emailToReset);\r
        showError('Password reset email sent to your registered address');\r
    } catch (e) {\r
        showError(userFacingAuthError(e, "Password reset email failed. Contact admin."));\r
    } finally { showLoading(false); }\r
};\r
\r
handleGoogleRedirectResult();\r
\r
onAuthStateChanged(auth, async (user) => {\r
    if (authRedirectInProgress) return;\r
    if (user) { await checkUserRoleAndRedirect(user); return; }\r
    const savedStudentSession = loadStudentSession();\r
    if (savedStudentSession) {\r
        clearStudentSession();\r
        showError("Your saved session expired. Please sign in again.");\r
    }\r
    hideAuthGate();\r
});\r
<\/script>\r
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
`},{tag:"link",attributes:{rel:"preload",href:"/schoolix-erp.css",as:"style",onload:"this.onload=null;this.rel="},text:""},{tag:"link",attributes:{rel:"preload",href:"schoolix-polish.css",as:"style",onload:"this.onload=null;this.rel="},text:""},{tag:"link",attributes:{rel:"stylesheet",href:"/schoolix-erp.css"},text:""},{tag:"link",attributes:{rel:"stylesheet",href:"schoolix-polish.css"},text:""}],scripts:[{attributes:{id:"sxCriticalLoaderScript"},text:`\r
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
  setTimeout(emergencyHide, 1400);\r
}());\r
`},{attributes:{src:"school-branding.js"},text:""},{attributes:{src:"/schoolix-app.js?v=navbar-20260721"},text:""},{attributes:{type:"module"},text:`\r
import { initializeApp } from "./firebase-compat.js";\r
import {\r
    getAuth,\r
    signInWithEmailAndPassword,\r
    signInWithPopup,\r
    signInWithRedirect,\r
    getRedirectResult,\r
    signInWithCredential,\r
    GoogleAuthProvider,\r
    onAuthStateChanged,\r
    signOut\r
} from "./firebase-compat.js";\r
import {\r
    getFirestore,\r
    doc,\r
    getDoc,\r
    getDocs,\r
    collection,\r
    query,\r
    where,\r
    limit,\r
    setDoc\r
} from "./firebase-compat.js";\r
\r
const firebaseConfig = {\r
    apiKey: "AIzaSyAomGwef93HFT9Xyx7SVW95FPw_IcIAICE",\r
    authDomain: "schoolix-48107.firebaseapp.com",\r
    projectId: "schoolix-48107"\r
};\r
\r
const app = initializeApp(firebaseConfig);\r
const auth = getAuth(app);\r
const db = getFirestore(app);\r
const googleProvider = new GoogleAuthProvider();\r
googleProvider.setCustomParameters({ prompt: "select_account" });\r
\r
const SUPABASE_URL = "https://ezkmeedcqetztkeppxil.supabase.co";\r
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6a21lZWRjcWV0enRrZXBweGlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxMjk5NjAsImV4cCI6MjA5MzcwNTk2MH0.1davJ_NYkFhHToUtcFBR0kA6dk0-cOkaIbK2SCObkQg";\r
const PASSWORD_RESET_FUNCTION_URL = \`\${SUPABASE_URL}/functions/v1/send-password-reset-email\`;\r
\r
const loginForm = document.getElementById('loginForm');\r
const emailInput = document.getElementById('email');\r
const passwordInput = document.getElementById('password');\r
const loadingEl = document.getElementById('loading');\r
const errorEl = document.getElementById('errorMsg');\r
const errorText = document.getElementById('errorText');\r
const togglePasswordBtn = document.getElementById('togglePassword');\r
const eyeIcon = document.getElementById('eyeIcon');\r
const downloadAndroidApp = document.getElementById('downloadAndroidApp');\r
const downloadAndroidLabel = document.getElementById('downloadAndroidLabel');\r
const downloadAndroidMeta = document.getElementById('downloadAndroidMeta');\r
const authGate = document.getElementById('authGate');\r
const authGateText = document.getElementById('authGateText');\r
let authRedirectInProgress = false;\r
let nativeGoogleResolve = null;\r
let nativeGoogleReject = null;\r
\r
const STUDENT_SESSION_KEY = "schoolixStudentSession";\r
const TEACHER_SESSION_KEY = "schoolixTeacherSession";\r
const SUPER_ADMIN_EMAIL = "anshbajpai4@gmail.com";\r
\r
function loadStudentSession() {\r
    try { return JSON.parse(localStorage.getItem(STUDENT_SESSION_KEY)); } catch { return null; }\r
}\r
function saveStudentSession(data) {\r
    localStorage.setItem(STUDENT_SESSION_KEY, JSON.stringify(data));\r
}\r
function clearStudentSession() {\r
    localStorage.removeItem(STUDENT_SESSION_KEY);\r
}\r
\r
function loadTeacherSession() {\r
    try { return JSON.parse(localStorage.getItem(TEACHER_SESSION_KEY)); } catch { return null; }\r
}\r
function saveTeacherSession(session) {\r
    if (!session) return;\r
    try {\r
        const json = JSON.stringify(session);\r
        localStorage.setItem(TEACHER_SESSION_KEY, json);\r
        localStorage.setItem("schoolixLastTeacherProfile", json);\r
        if (session.uid) {\r
            localStorage.setItem(\`schoolixTeacherProfile_\${session.uid}\`, json);\r
        }\r
        if (session.email) {\r
            localStorage.setItem(\`schoolixTeacherProfileEmail_\${String(session.email).trim().toLowerCase()}\`, json);\r
        }\r
        const schoolId = session.schoolId || session.adminId || "";\r
        if (schoolId) {\r
            localStorage.setItem("teacherSchoolId", schoolId);\r
            if (session.schoolName) {\r
                localStorage.setItem(\`schoolixSchoolName_\${schoolId}\`, session.schoolName);\r
            }\r
        }\r
        if (session.schoolName) {\r
            window.SchoolBranding?.persistSchoolName?.(session.schoolName);\r
            try { localStorage.setItem("schoolix.schoolName", session.schoolName); } catch {}\r
        }\r
        if (session.logoUrl) {\r
            window.SchoolBranding?.persistSchoolLogo?.(session.logoUrl);\r
        }\r
        if (session.section) {\r
            localStorage.setItem("teacherSection", session.section);\r
        }\r
    } catch (e) {\r
        console.warn("Unable to save teacher session:", e);\r
    }\r
}\r
function clearTeacherSession() {\r
    try {\r
        localStorage.removeItem(TEACHER_SESSION_KEY);\r
        localStorage.removeItem("schoolixLastTeacherProfile");\r
    } catch {}\r
}\r
\r
function userFacingAuthError(error, fallback = "Login failed. Please try again.") {\r
    const code = String(error?.code || "").toLowerCase();\r
    const messages = {\r
        "auth/user-not-found": "The email or password is incorrect.",\r
        "auth/wrong-password": "The email or password is incorrect.",\r
        "auth/invalid-credential": "The email or password is incorrect.",\r
        "auth/invalid-credentials": "The email or password is incorrect.",\r
        "auth/invalid-email": "Enter a valid email address.",\r
        "auth/too-many-requests": "Too many attempts. Please wait a moment and try again.",\r
        "network-request-failed": "Network connection failed. Check your internet and try again.",\r
        "deadline-exceeded": "The request took too long. Check your connection and try again.",\r
        "unavailable": "Schoolix is temporarily unavailable. Please try again shortly."\r
    };\r
    return messages[code] || window.SchoolixErrors?.message?.(error, fallback) || fallback;\r
}\r
\r
async function requestPasswordResetEmail(email) {\r
    const controller = new AbortController();\r
    const timeoutId = setTimeout(() => controller.abort(), 20000);\r
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
                schoolName: window.SchoolBranding?.getSchoolName() || "Schoolix"\r
            }),\r
            signal: controller.signal\r
        });\r
        if (!response.ok) {\r
            const error = new Error("Password reset email could not be sent.");\r
            error.code = response.status === 429 ? "resource-exhausted" : response.status >= 500 ? "unavailable" : "unknown";\r
            throw error;\r
        }\r
    } catch (error) {\r
        if (error.name === "AbortError") {\r
            const timeoutError = new Error("Password reset request timed out.");\r
            timeoutError.code = "deadline-exceeded";\r
            throw timeoutError;\r
        }\r
        throw error;\r
    } finally {\r
        clearTimeout(timeoutId);\r
    }\r
}\r
\r
function linkedSchoolId(profile = {}, adminData = null) {\r
    return String(\r
        profile.schoolId || profile.schoolID || profile.schoolUid || profile.schoolUID || profile.schoolDocId || profile.schoolDocID ||\r
        profile.adminId || profile.adminID || profile.adminUid || profile.adminUID || profile.adminDocId || profile.adminDocID ||\r
        adminData?.schoolId || adminData?.schoolID || adminData?.schoolUid || adminData?.schoolUID ||\r
        adminData?.adminId || adminData?.adminID || adminData?.adminUid || adminData?.adminUID ||\r
        adminData?.schoolDocId || adminData?.schoolDocID || adminData?.adminDocId || adminData?.adminID || adminData?.id || ""\r
    ).trim();\r
}\r
\r
function buildStudentSession(user, student = {}, adminData = null, extra = {}) {\r
    const schoolId = linkedSchoolId(student, adminData);\r
    const schoolName = student.schoolName || adminData?.schoolName || window.SchoolBranding?.getSchoolName?.() || "";\r
    return {\r
        uid: user.uid,\r
        authUid: user.supabaseUid || user.uid,\r
        supabaseAuthUid: user.supabaseUid || "",\r
        studentId: student.studentId || student.id || user.uid,\r
        studentDocId: student.studentDocId || student.id || "",\r
        name: student.name || student.fullName || student.studentName || "",\r
        class: student.class || "",\r
        section: student.section || "",\r
        rollNo: student.rollNo || student.roll || "",\r
        email: student.email || student.authEmail || user.email || "",\r
        schoolId,\r
        schoolName,\r
        role: "student",\r
        loginAt: new Date().toISOString(),\r
        ...extra\r
    };\r
}\r
\r
function buildTeacherSession(user, teacher = {}, adminData = null, extra = {}) {\r
    const schoolId = linkedSchoolId(teacher, adminData);\r
    const schoolName = teacher.schoolName || adminData?.schoolName || adminData?.instituteName || window.SchoolBranding?.getSchoolName?.() || "";\r
    const logoUrl = teacher.logoUrl || teacher.schoolLogoUrl || adminData?.logoUrl || adminData?.schoolLogoUrl || "";\r
    const photoUrl = teacher.photoUrl || teacher.imageUrl || teacher.profilePhotoUrl || teacher.avatarUrl || "";\r
    const name = teacher.name || teacher.fullName || teacher.teacherName || teacher.displayName || user.displayName || "";\r
    return {\r
        uid: user.uid,\r
        authUid: user.supabaseUid || user.uid,\r
        supabaseAuthUid: user.supabaseUid || "",\r
        docId: teacher.id || user.uid,\r
        teacherId: teacher.teacherId || teacher.staffId || teacher.id || "",\r
        name,\r
        displayName: name,\r
        email: teacher.email || teacher.authEmail || user.email || "",\r
        class: teacher.class || "",\r
        section: teacher.section || "",\r
        assignedClasses: teacher.assignedClasses || [],\r
        schoolId,\r
        adminId: schoolId,\r
        schoolName,\r
        logoUrl,\r
        photoUrl,\r
        role: "teacher",\r
        loginAt: new Date().toISOString(),\r
        ...extra\r
    };\r
}\r
\r
const FEATURE_LABELS = {\r
    dashboard: "Dashboard",\r
    teachers: "Teachers",\r
    students: "Students",\r
    attendance: "Attendance",\r
    payroll: "Payroll",\r
    reports: "Reports",\r
    announcements: "Announcements",\r
    settings: "Settings"\r
};\r
\r
async function hydrateAndroidDownloadLink() {\r
    if (!downloadAndroidApp) return;\r
    const fallbackUrl = "/dist/Schoolix-download";\r
    try {\r
        const response = await fetch(\`/version.json?t=\${Date.now()}\`, { cache: "no-store" });\r
        if (!response.ok) throw new Error("version.json unavailable");\r
        const data = await response.json();\r
        const apkUrl = String(data.apkUrl || fallbackUrl).trim();\r
        downloadAndroidApp.href = apkUrl || fallbackUrl;\r
        if (downloadAndroidLabel) downloadAndroidLabel.textContent = "Download Latest Android App";\r
        if (downloadAndroidMeta) {\r
            const versionName = data.versionName ? \`v\${data.versionName}\` : "Latest version";\r
            const versionCode = data.versionCode ? \` build \${data.versionCode}\` : "";\r
            downloadAndroidMeta.textContent = \`\${versionName}\${versionCode}\`;\r
        }\r
    } catch (error) {\r
        console.warn("Unable to load APK metadata:", error);\r
        downloadAndroidApp.href = fallbackUrl;\r
        if (downloadAndroidMeta) downloadAndroidMeta.textContent = "Latest APK";\r
    }\r
}\r
\r
function scheduleAndroidDownloadHydration() {\r
    const run = () => {\r
        if ("requestIdleCallback" in window) window.requestIdleCallback(() => hydrateAndroidDownloadLink(), { timeout: 3000 });\r
        else setTimeout(() => hydrateAndroidDownloadLink(), 1500);\r
    };\r
    if (document.readyState === "complete") run();\r
    else window.addEventListener("load", run, { once: true });\r
}\r
\r
scheduleAndroidDownloadHydration();\r
\r
function accessErrorFor(adminData, featureKey = "") {\r
    if (!adminData || adminData.access === false) {\r
        return "Your school's platform access has been disabled by the Super Admin. Please contact support.";\r
    }\r
    if (featureKey && (adminData.features || {})[featureKey] === false) {\r
        return \`\${FEATURE_LABELS[featureKey] || "This"} access has been disabled for your school by the Super Admin.\`;\r
    }\r
    return "";\r
}\r
\r
async function getAdminAccessData(userId, userData) {\r
    if (!userData) return null;\r
    if ((userData.role || "").toLowerCase() === "admin") return { id: userId, ...userData };\r
    const adminId = linkedSchoolId(userData);\r
    if (!adminId) return null;\r
    try {\r
        const adminSnap = await getDoc(doc(db, "users", adminId));\r
        return adminSnap.exists() ? { id: adminSnap.id, ...adminSnap.data() } : null;\r
    } catch (error) {\r
        console.warn("Unable to load admin access profile", error);\r
        return null;\r
    }\r
}\r
\r
const EYE_OPEN = \`<path d="M12 5c-5.5 0-10 4.5-11 7 1 2.5 5.5 7 11 7s10-4.5 11-7c-1-2.5-5.5-7-11-7Zm0 11.5A4.5 4.5 0 1 1 12 7a4.5 4.5 0 0 1 0 9.5Zm0-2A2.5 2.5 0 1 0 12 9a2.5 2.5 0 0 0 0 5Z"/>\`;\r
const EYE_CLOSED = \`<path d="M2.1 3.51 3.51 2.1l18.38 18.38-1.41 1.41-3.3-3.3A10.96 10.96 0 0 1 12 21C6.5 21 2 16.5 1 14c.52-1.31 1.63-2.97 3.22-4.49l-.21-.21A.99.99 0 0 1 2.1 3.51ZM12 7c2.76 0 5 2.24 5 5 0 .62-.11 1.21-.32 1.76l-1.6-1.6A2.97 2.97 0 0 0 12 9c-.7 0-1.34.24-1.85.64L8.79 8.28A4.97 4.97 0 0 1 12 7Zm0 10c-2.76 0-5-2.24-5-5 0-.74.16-1.45.43-2.08L5.37 8.86C4 10.12 3.1 11.42 2.78 12c1 2.09 4.59 6 9.22 6 1.11 0 2.17-.18 3.14-.5l-1.69-1.69c-.45.12-.93.19-1.45.19Zm5.63-2.69 1.48 1.48C20.48 14.93 21.48 13.46 21.9 12c-1-2.5-5.5-7-9.9-7-1.25 0-2.46.23-3.56.65l1.56 1.56c.62-.14 1.28-.21 1.98-.21 2.76 0 5 2.24 5 5 0 .47-.07.92-.2 1.31Z"/>\`;\r
\r
togglePasswordBtn.addEventListener('click', () => {\r
    const isHidden = passwordInput.type === "password";\r
    passwordInput.type = isHidden ? "text" : "password";\r
    eyeIcon.innerHTML = isHidden ? EYE_CLOSED : EYE_OPEN;\r
    togglePasswordBtn.setAttribute("aria-label", isHidden ? "Hide password" : "Show password");\r
    togglePasswordBtn.setAttribute("aria-pressed", String(isHidden));\r
});\r
\r
function showError(message) {\r
    errorText.textContent = message;\r
    errorEl.classList.add('visible');\r
    setTimeout(() => errorEl.classList.remove('visible'), 5500);\r
}\r
\r
const accessError = new URLSearchParams(window.location.search).get("access_error");\r
if (accessError) {\r
    showError(accessError);\r
    history.replaceState({}, document.title, window.location.pathname);\r
}\r
\r
function showLoading(show) {\r
    loadingEl.classList.toggle('visible', show);\r
    loginForm.style.opacity = show ? '0.65' : '1';\r
    loginForm.style.pointerEvents = show ? 'none' : '';\r
}\r
\r
function setAuthGate(message) {\r
    if (authGateText && message) authGateText.textContent = message;\r
    document.body.classList.add("auth-checking");\r
    authGate?.classList.remove("hidden");\r
}\r
\r
function hideAuthGate() {\r
    document.body.classList.remove("auth-checking");\r
    authGate?.classList.add("hidden");\r
}\r
\r
function isNativeSchoolixApp() {\r
    try {\r
        if (window.Capacitor?.isNativePlatform?.()) return true;\r
        return location.protocol === "capacitor:";\r
    } catch {\r
        return false;\r
    }\r
}\r
\r
function signInWithNativeGoogle() {\r
    return new Promise((resolve, reject) => {\r
        if (!window.SchoolixNativeAuth?.signInWithGoogle) {\r
            reject(new Error("Native Google login is not available"));\r
            return;\r
        }\r
        nativeGoogleResolve = resolve;\r
        nativeGoogleReject = reject;\r
        window.SchoolixNativeAuth.signInWithGoogle();\r
    });\r
}\r
\r
window.SchoolixNativeGoogleAuth = {\r
    async receiveIdToken(idToken) {\r
        try {\r
            const token = String(idToken || "").trim();\r
            if (!token) throw new Error("Google login token was not received");\r
            const credential = GoogleAuthProvider.credential(token);\r
            const result = await signInWithCredential(auth, credential);\r
            nativeGoogleResolve?.(result);\r
        } catch (error) {\r
            nativeGoogleReject?.(error);\r
        } finally {\r
            nativeGoogleResolve = null;\r
            nativeGoogleReject = null;\r
        }\r
    },\r
    receiveError(message) {\r
        nativeGoogleReject?.(new Error(message || "Google login failed"));\r
        nativeGoogleResolve = null;\r
        nativeGoogleReject = null;\r
    }\r
};\r
\r
function isParentIdentifier(identifier, student) {\r
    const lowered = String(identifier || "").trim().toLowerCase();\r
    if (!lowered || !lowered.includes("@")) return false;\r
    if (String(student.email || "").trim().toLowerCase() === lowered) return false;\r
    if (String(student.authEmail || "").trim().toLowerCase() === lowered) return false;\r
    return [student.parentEmail, student.fatherEmail, student.motherEmail, student.guardianEmail]\r
        .some(email => String(email || "").trim().toLowerCase() === lowered);\r
}\r
\r
function uniqueLookupValues(values = []) {\r
    const seen = new Set();\r
    return values\r
        .map(value => typeof value === "string" ? value.trim() : value)\r
        .filter(value => value !== "" && value !== null && value !== undefined)\r
        .filter(value => {\r
            const key = \`\${typeof value}:\${String(value)}\`;\r
            if (seen.has(key)) return false;\r
            seen.add(key);\r
            return true;\r
        });\r
}\r
\r
async function findStudentRecord(identifier, options = {}) {\r
    const normalized = identifier.trim();\r
    if (!normalized) return null;\r
    const lowered = normalized.toLowerCase();\r
    const uppered = normalized.toUpperCase();\r
    const idValues = uniqueLookupValues([\r
        normalized,\r
        lowered,\r
        uppered,\r
        /^\\d+$/.test(normalized) ? Number(normalized) : null\r
    ]);\r
\r
    for (const docId of uniqueLookupValues([normalized, lowered, uppered])) {\r
        try {\r
            const byIdDoc = await getDoc(doc(db, "users", docId));\r
            if (byIdDoc.exists() && (byIdDoc.data().role || "").toLowerCase() === "student") {\r
                return { id: byIdDoc.id, ...byIdDoc.data() };\r
            }\r
        } catch (error) {\r
            if (error?.code !== "permission-denied") console.warn("Student direct lookup failed:", error);\r
        }\r
    }\r
\r
    const lookups = [\r
        ["studentId", idValues],\r
        ["email", uniqueLookupValues([lowered, normalized])],\r
        ["authEmail", uniqueLookupValues([lowered, normalized])]\r
    ];\r
    if (options.parent) {\r
        const emailValues = uniqueLookupValues([lowered, normalized]);\r
        lookups.push(\r
            ["parentEmail", emailValues],\r
            ["fatherEmail", emailValues],\r
            ["motherEmail", emailValues],\r
            ["guardianEmail", emailValues]\r
        );\r
    }\r
    for (const [field, values] of lookups) {\r
        for (const value of values) {\r
            try {\r
                const snap = await getDocs(query(\r
                    collection(db, "users"),\r
                    where("role", "==", "student"),\r
                    where(field, "==", value),\r
                    limit(1)\r
                ));\r
                if (!snap.empty) return { id: snap.docs[0].id, ...snap.docs[0].data() };\r
            } catch (error) {\r
                if (error?.code !== "permission-denied") console.warn(\`Student \${field} lookup failed:\`, error);\r
            }\r
        }\r
    }\r
    return null;\r
}\r
\r
async function loginStudent(identifier, password, options = {}) {\r
    const student = await findStudentRecord(identifier, { parent: true });\r
    if (!student) return { success: false, reason: "Student or parent record not found." };\r
    const authEmail = String(student.authEmail || student.email || "").trim().toLowerCase();\r
    if (!authEmail || authEmail.endsWith("@schoolix.student")) {\r
        return { success: false, reason: "Registered email is missing for this student. Contact admin to update the student login email." };\r
    }\r
    const cred = await signInWithEmailAndPassword(auth, authEmail, password);\r
    const expectedAuthUid = String(student.authUid || "").trim();\r
    const signedInIds = [cred.user.uid, cred.user.supabaseUid].map(value => String(value || "").trim()).filter(Boolean);\r
    const signedInEmail = String(cred.user.email || "").trim().toLowerCase();\r
    const studentEmails = [student.authEmail, student.email]\r
        .map(value => String(value || "").trim().toLowerCase())\r
        .filter(Boolean);\r
    if (expectedAuthUid && !signedInIds.includes(expectedAuthUid) && !studentEmails.includes(signedInEmail)) {\r
        await signOut(auth).catch(() => {});\r
        return { success: false, reason: "Student login record is linked to a different account. Contact admin to refresh this student's login." };\r
    }\r
    const adminData = await getAdminAccessData(cred.user.uid, student);\r
    const accessReason = accessErrorFor(adminData);\r
    if (accessReason) {\r
        await signOut(auth).catch(() => {});\r
        return { success: false, reason: accessReason };\r
    }\r
    if (isParentIdentifier(identifier, student)) {\r
        saveStudentSession(buildStudentSession(cred.user, student, adminData, {\r
            loginAs: "parent",\r
            parentEmail: identifier.toLowerCase()\r
        }));\r
        window.location.href = "#/student-dashboard.html";\r
        return { success: true };\r
    }\r
    saveStudentSession(buildStudentSession(cred.user, student, adminData));\r
    setAuthGate("Opening student dashboard...");\r
    window.location.href = "#/student-dashboard.html";\r
    return { success: true };\r
}\r
\r
async function findSignedInStudentRecord(user) {\r
    if (!user) return null;\r
    const uid = String(user.uid || "").trim();\r
    const email = String(user.email || "").trim().toLowerCase();\r
    if (uid) {\r
        try {\r
            const snap = await getDocs(query(\r
                collection(db, "users"),\r
                where("role", "==", "student"),\r
                where("authUid", "==", uid),\r
                limit(1)\r
            ));\r
            if (!snap.empty) return { id: snap.docs[0].id, ...snap.docs[0].data() };\r
        } catch (error) {\r
            if (error?.code !== "permission-denied") console.warn("Student auth UID lookup failed:", error);\r
        }\r
    }\r
    return email ? await findStudentRecord(email, { parent: true }) : null;\r
}\r
\r
async function findSignedInUserRecord(user) {\r
    if (!user) return null;\r
    const uid = String(user.uid || "").trim();\r
    const email = String(user.email || "").trim().toLowerCase();\r
    const lookups = [];\r
    if (uid) lookups.push(["authUid", uid], ["uid", uid]);\r
    if (email) lookups.push(["email", email], ["authEmail", email]);\r
    for (const [field, value] of lookups) {\r
        try {\r
            const snap = await getDocs(query(collection(db, "users"), where(field, "==", value), limit(1)));\r
            if (!snap.empty) return { id: snap.docs[0].id, ...snap.docs[0].data() };\r
        } catch (error) {\r
            if (error?.code !== "permission-denied") console.warn(\`Profile \${field} recovery failed:\`, error);\r
        }\r
    }\r
    return null;\r
}\r
\r
async function syncSchoolName(userId, userData) {\r
    try {\r
        const branding = window.SchoolBranding;\r
        if (!branding) return;\r
        const direct = branding.normalizeSchoolName(userData.schoolName);\r
        if (userData.logoUrl || userData.schoolLogoUrl) branding.persistSchoolLogo?.(userData.logoUrl || userData.schoolLogoUrl);\r
        if (direct) { branding.persistSchoolName(direct); return; }\r
        const adminId = linkedSchoolId(userData) || (userData.role === "admin" ? userId : "");\r
        if (!adminId) return;\r
        let appliedName = false;\r
        const adminDoc = await getDoc(doc(db, "users", adminId));\r
        if (adminDoc.exists()) {\r
            const adminData = adminDoc.data();\r
            const n = branding.normalizeSchoolName(adminData.schoolName);\r
            if (adminData.logoUrl || adminData.schoolLogoUrl) branding.persistSchoolLogo?.(adminData.logoUrl || adminData.schoolLogoUrl);\r
            if (n) { branding.persistSchoolName(n); appliedName = true; }\r
        }\r
        const brandDoc = await getDoc(doc(db, "schools", adminId, "config", "branding"));\r
        if (brandDoc.exists()) {\r
            const brandData = brandDoc.data();\r
            const n = branding.normalizeSchoolName(brandData.schoolName);\r
            if (brandData.logoUrl || brandData.schoolLogoUrl) branding.persistSchoolLogo?.(brandData.logoUrl || brandData.schoolLogoUrl);\r
            if (n && !appliedName) branding.persistSchoolName(n);\r
        }\r
    } catch (e) { console.warn("Branding sync failed:", e); }\r
}\r
\r
async function checkUserRoleAndRedirect(user) {\r
    try {\r
        setAuthGate("Restoring your dashboard...");\r
        const email = String(user.email || "").trim().toLowerCase();\r
        if (email === SUPER_ADMIN_EMAIL) {\r
            clearStudentSession();\r
            try {\r
                await setDoc(doc(db, "users", user.uid), {\r
                    uid: user.uid,\r
                    name: "Ansh Bajpai",\r
                    email: SUPER_ADMIN_EMAIL,\r
                    role: "superAdmin",\r
                    superAdmin: true,\r
                    access: true,\r
                    updatedAt: new Date()\r
                }, { merge: true });\r
            } catch (profileError) {\r
                console.warn("Super admin profile bootstrap failed:", profileError);\r
            }\r
            setAuthGate("Opening super admin console...");\r
            window.location.href = "#/admin-signup.html";\r
            return;\r
        }\r
        const docRef = await getDoc(doc(db, "users", user.uid));\r
        let data = docRef.exists() ? docRef.data() : null;\r
        if (!data) {\r
            const recoveredUser = await findSignedInUserRecord(user);\r
            if (recoveredUser) {\r
                data = recoveredUser;\r
            }\r
        }\r
        if (!data) {\r
            const recoveredStudent = await findSignedInStudentRecord(user);\r
            if (recoveredStudent) {\r
                const adminData = await getAdminAccessData(user.uid, recoveredStudent);\r
                const accessReason = accessErrorFor(adminData);\r
                if (accessReason) {\r
                    await signOut(auth).catch(() => {});\r
                    hideAuthGate();\r
                    showError(accessReason);\r
                    return;\r
                }\r
                syncSchoolName(user.uid, recoveredStudent).catch(() => {});\r
                saveStudentSession(buildStudentSession(user, recoveredStudent, adminData));\r
                setAuthGate("Opening student dashboard...");\r
                window.location.href = "#/student-dashboard.html";\r
                return;\r
            }\r
            hideAuthGate(); showError("User data not found. Contact admin."); return;\r
        }\r
        const role = data.role;\r
        if (data.email && user.email && data.email.toLowerCase() !== user.email.toLowerCase()) {\r
            hideAuthGate();\r
            showError("Account mismatch detected"); return;\r
        }\r
        clearStudentSession();\r
        clearTeacherSession();\r
        const adminData = await getAdminAccessData(user.uid, data);\r
        const accessReason = accessErrorFor(adminData || data, role === "admin" ? "dashboard" : "");\r
        if (accessReason) {\r
            await signOut(auth).catch(() => {});\r
            hideAuthGate();\r
            showError(accessReason);\r
            return;\r
        }\r
        syncSchoolName(user.uid, data).catch(() => {});\r
        if (isNativeSchoolixApp() && role === "admin") {\r
            await signOut(auth).catch(() => {});\r
            hideAuthGate();\r
            showError("Admin login is only available on the web panel. Please use a student, parent, teacher, librarian, or accountant account in the app.");\r
            return;\r
        }\r
        if (role === "teacher") {\r
            setAuthGate("Opening teacher dashboard...");\r
            const teacherSession = buildTeacherSession(user, data, adminData, { loginAs: "teacher" });\r
            saveTeacherSession(teacherSession);\r
            window.location.href = "#/teacher-dashboard.html"; return;\r
        }\r
        if (role === "admin") { window.location.href = "#/admin-dashboard.html"; return; }\r
        if (role === "librarian") { window.location.href = "#/library-dashboard.html"; return; }\r
        if (role === "accountant") { window.location.href = "#/accountant-dashboard.html?v=accountant-dashboard-recovery-20260806"; return; }\r
        if (role === "driver") {\r
            setAuthGate("Opening driver dashboard...");\r
            window.location.href = "#/driver-dashboard.html"; return;\r
        }\r
        if (role === "student") {\r
            setAuthGate("Opening student dashboard...");\r
            saveStudentSession(buildStudentSession(user, data, adminData, { loginAs: "student" }));\r
            window.location.href = "#/student-dashboard.html"; return;\r
        }\r
        hideAuthGate();\r
        showError("Invalid role assigned");\r
    } catch (e) { hideAuthGate(); showError("Login error. Try again."); }\r
}\r
\r
loginForm.addEventListener('submit', async (e) => {\r
    e.preventDefault();\r
    const identifier = emailInput.value.trim();\r
    const password = passwordInput.value.trim();\r
    if (!identifier || !password) { showError('Please fill all fields'); return; }\r
    showLoading(true);\r
\r
    const looksLikeEmail = identifier.includes("@") || identifier.toLowerCase().includes(".com") || identifier.toLowerCase().includes(".in");\r
\r
    try {\r
        let directAuthError = null;\r
        if (looksLikeEmail) {\r
            try {\r
                const authId = identifier.toLowerCase();\r
                const cred = await signInWithEmailAndPassword(auth, authId, password);\r
                await checkUserRoleAndRedirect(cred.user);\r
                return;\r
            } catch (error) {\r
                directAuthError = error;\r
            }\r
        }\r
\r
        let studentLogin = { success: false, reason: "" };\r
        try {\r
            studentLogin = await loginStudent(identifier, password);\r
            if (studentLogin.success) return;\r
        } catch (studentAuthError) {\r
            studentLogin.reason = studentAuthError.code === "auth/wrong-password" || studentAuthError.code === "auth/invalid-credential"\r
                ? "Wrong student password"\r
                : studentAuthError.code === "auth/user-not-found"\r
                    ? "No login account found for this student. Contact admin."\r
                    : studentAuthError.message;\r
        }\r
\r
        const authError = directAuthError || new Error(studentLogin.reason || "Login failed");\r
        showError(studentLogin.reason || userFacingAuthError(authError));\r
    } catch (authError) {\r
        showError(userFacingAuthError(authError));\r
    } finally { showLoading(false); }\r
});\r
\r
async function finishGoogleLogin(user) {\r
    if (!user) return false;\r
    authRedirectInProgress = true;\r
    try {\r
        await checkUserRoleAndRedirect(user);\r
    } finally {\r
        setTimeout(() => { authRedirectInProgress = false; }, 1500);\r
    }\r
    return true;\r
}\r
\r
\r
async function handleGoogleRedirectResult() {\r
    try {\r
        const result = await getRedirectResult(auth);\r
        if (result?.user) {\r
            setAuthGate("Opening your dashboard...");\r
            await finishGoogleLogin(result.user);\r
        }\r
    } catch (error) {\r
        hideAuthGate();\r
        showError(userFacingAuthError(error, "Google login failed. Please try again."));\r
    }\r
}\r
\r
window.loginWithGoogle = async () => {\r
    showLoading(true);\r
    try {\r
        if (isNativeSchoolixApp() && window.SchoolixNativeAuth?.signInWithGoogle) {\r
            const result = await signInWithNativeGoogle();\r
            await finishGoogleLogin(result.user);\r
            return;\r
        }\r
        const result = await signInWithPopup(auth, googleProvider);\r
        await finishGoogleLogin(result.user);\r
    } catch (e) {\r
        const code = String(e?.code || "");\r
        if (code.includes("popup") || code.includes("cancelled") || code.includes("operation-not-supported")) {\r
            try {\r
                await signInWithRedirect(auth, googleProvider);\r
                return;\r
            } catch (redirectError) {\r
                showError(userFacingAuthError(redirectError, "Google login failed. Please try again."));\r
            }\r
        } else {\r
            showError(userFacingAuthError(e, "Google login failed. Please try again."));\r
        }\r
    } finally { showLoading(false); }\r
};\r
\r
window.resetPassword = async () => {\r
    const identifier = emailInput.value.trim();\r
    if (!identifier) { showError('Please enter your email or Student ID first'); return; }\r
    showLoading(true);\r
    try {\r
        let emailToReset = identifier;\r
        if (!identifier.includes("@")) {\r
            const student = await findStudentRecord(identifier, { parent: true });\r
            if (!student) { showError('Student record not found'); return; }\r
            emailToReset = String(student.authEmail || student.email || "").trim();\r
            if (!emailToReset || emailToReset.endsWith("@schoolix.student")) {\r
                showError('No registered email found for this student. Contact admin.');\r
                return;\r
            }\r
        }\r
        await requestPasswordResetEmail(emailToReset);\r
        showError('Password reset email sent to your registered address');\r
    } catch (e) {\r
        showError(userFacingAuthError(e, "Password reset email failed. Contact admin."));\r
    } finally { showLoading(false); }\r
};\r
\r
handleGoogleRedirectResult();\r
\r
onAuthStateChanged(auth, async (user) => {\r
    if (authRedirectInProgress) return;\r
    if (user) { await checkUserRoleAndRedirect(user); return; }\r
    const savedStudentSession = loadStudentSession();\r
    if (savedStudentSession) {\r
        clearStudentSession();\r
        showError("Your saved session expired. Please sign in again.");\r
    }\r
    hideAuthGate();\r
});\r
`},{attributes:{src:"schoolix-polish.js"},text:""}]};export{r as default};
