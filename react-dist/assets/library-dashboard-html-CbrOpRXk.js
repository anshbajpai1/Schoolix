const e={file:"library-dashboard.html",title:"Library Dashboard - Schoolix",htmlClass:"",bodyClass:"library-dashboard-app",body:`\r
<div id="sxPageLoader" class="sx-page-loader" role="status" aria-live="polite">\r
  <section class="dots-container" aria-label="Loading page">\r
    <div class="dot"></div>\r
    <div class="dot"></div>\r
    <div class="dot"></div>\r
    <div class="dot"></div>\r
    <div class="dot"></div>\r
  </section>\r
</div>\r
<div class="library-app-layout">\r
    <div class="library-sidebar-overlay" id="librarySidebarOverlay" aria-hidden="true"></div>\r
    <aside class="library-sidebar" id="librarySidebar">\r
        <div class="library-brand">\r
            <div class="library-brand-mark" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15Z"></path><path d="M8 7h8"></path></svg></div>\r
            <div>\r
                <strong>Schoolix</strong>\r
                <span>Library Portal</span>\r
            </div>\r
        </div>\r
        <nav class="library-nav" aria-label="Library navigation">\r
            <div class="library-nav-label">Library</div>\r
            <a class="library-nav-link active" href="#/library-dashboard.html" aria-current="page">\r
                <span class="library-nav-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1.5"></rect><rect x="14" y="3" width="7" height="7" rx="1.5"></rect><rect x="14" y="14" width="7" height="7" rx="1.5"></rect><rect x="3" y="14" width="7" height="7" rx="1.5"></rect></svg></span>\r
                Dashboard\r
            </a>\r
            <a class="library-nav-link" href="librarian-#/notices.html">\r
                <span class="library-nav-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M3 11v2a2 2 0 0 0 2 2h2l4 4v-4h4l6 3V6l-6 3H5a2 2 0 0 0-2 2Z"></path><path d="M21 9v6"></path></svg></span>\r
                Notices\r
            </a>\r
        </nav>\r
        <div class="library-sidebar-footer">Library records and notices in one workspace.</div>\r
    </aside>\r
    <main class="library-main">\r
<div class="container">\r
    <div class="library-hero card">\r
        <div class="top">\r
            <div class="hero-copy">\r
                <span class="eyebrow">Library Workspace</span>\r
                <h1>Library Dashboard</h1>\r
                <p class="muted" id="welcomeText">Checking access...</p>\r
            </div>\r
            <div class="hero-actions">\r
                <button class="library-menu-button" id="libraryMenuButton" type="button" aria-label="Open library navigation" aria-expanded="false">\r
                    <svg viewBox="0 0 24 24"><path d="M4 6h16"></path><path d="M4 12h16"></path><path d="M4 18h16"></path></svg>\r
                </button>\r
                <button class="btn btn-primary" onclick="window.location.href='librarian-#/notices.html'">\r
                    <span class="btn-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M3 11v2a2 2 0 0 0 2 2h2l4 4v-4h4l6 3V6l-6 3H5a2 2 0 0 0-2 2Z"></path><path d="M21 9v6"></path></svg></span>\r
                    Notices\r
                </button>\r
                <button class="logout-btn" onclick="logout()">\r
                    <span class="btn-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><path d="m16 17 5-5-5-5"></path><path d="M21 12H9"></path></svg></span>\r
                    Logout\r
                </button>\r
            </div>\r
        </div>\r
    </div>\r
\r
    <div class="card overview-card">\r
        <div class="section-head">\r
            <div>\r
                <span class="eyebrow">Live Register</span>\r
                <h2>Quick Overview</h2>\r
            </div>\r
        </div>\r
        <div class="stats">\r
            <div class="stat stat-students">\r
                <span class="stat-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg></span>\r
                <strong id="totalStudentsStat">0</strong>\r
                <span>Total Students</span>\r
            </div>\r
            <div class="stat stat-issued">\r
                <span class="stat-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15Z"></path><path d="M8 7h8"></path><path d="M8 11h6"></path></svg></span>\r
                <strong id="issuedBooksStat">0</strong>\r
                <span>Issued Books</span>\r
            </div>\r
            <div class="stat stat-returned">\r
                <span class="stat-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"></path></svg></span>\r
                <strong id="returnedBooksStat">0</strong>\r
                <span>Returned Books</span>\r
            </div>\r
            <div class="stat stat-days">\r
                <span class="stat-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"></rect><path d="M16 2v4"></path><path d="M8 2v4"></path><path d="M3 10h18"></path></svg></span>\r
                <strong id="maxDaysStat">14</strong>\r
                <span>Max Days Allowed</span>\r
            </div>\r
            <div class="stat stat-due">\r
                <span class="stat-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"></circle><path d="M12 7v5l3 2"></path></svg></span>\r
                <strong id="dueTodayStat">0</strong>\r
                <span>Due Today</span>\r
            </div>\r
            <div class="stat stat-overdue">\r
                <span class="stat-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path></svg></span>\r
                <strong id="overdueBooksStat">0</strong>\r
                <span>Overdue Books</span>\r
            </div>\r
        </div>\r
    </div>\r
\r
    <div class="card">\r
        <div class="section-head">\r
            <div>\r
                <span class="eyebrow">Shortcuts</span>\r
                <h2>Quick Actions</h2>\r
            </div>\r
        </div>\r
        <div class="quick-grid">\r
            <button class="quick-action" onclick="focusIssueForm()"><span class="quick-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 5v14"></path><path d="M5 12h14"></path></svg></span><strong>Issue a Book</strong><span>Select student and enter book number</span></button>\r
            <button class="quick-action" onclick="showDueToday()"><span class="quick-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"></circle><path d="M12 7v5l3 2"></path></svg></span><strong>Due Today</strong><span>Books due today or earlier</span></button>\r
            <button class="quick-action" onclick="showOverdue()"><span class="quick-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path></svg></span><strong>Overdue Books</strong><span>Delayed returns only</span></button>\r
            <button class="quick-action" onclick="clearLibraryFilters()"><span class="quick-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M3 6h18"></path><path d="M7 12h10"></path><path d="M10 18h4"></path></svg></span><strong>Clear Filters</strong><span>Show complete issue register</span></button>\r
            <button class="quick-action" onclick="window.location.href='#/library-qr-checkin.html'"><span class="quick-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M3 7V5a2 2 0 0 1 2-2h2"></path><path d="M17 3h2a2 2 0 0 1 2 2v2"></path><path d="M21 17v2a2 2 0 0 1-2 2h-2"></path><path d="M7 21H5a2 2 0 0 1-2-2v-2"></path><path d="M7 12h10"></path></svg></span><strong>QR Check-In</strong><span>Open attendance scanner</span></button>\r
            <button class="quick-action" onclick="window.location.href='#/librarian-attendance.html'"><span class="quick-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M9 11l3 3L22 4"></path><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg></span><strong>My Attendance</strong><span>View daily records</span></button>\r
        </div>\r
    </div>\r
\r
    <div class="grid-two" id="issueRegister">\r
        <div class="card">\r
            <div class="section-head">\r
                <div>\r
                    <span class="eyebrow">Borrowers</span>\r
                    <h2>All Students</h2>\r
                </div>\r
            </div>\r
            <input id="studentSearch" class="search-input" placeholder="Search by Student ID or Name">\r
            <div class="list-toolbar">\r
                <label>Show\r
                    <select id="studentPageSize" class="select-input" style="width:auto;margin-top:0;">\r
                        <option value="25">25</option>\r
                        <option value="50">50</option>\r
                        <option value="all">All</option>\r
                    </select>\r
                    students\r
                </label>\r
                <div class="pager" id="studentPager"></div>\r
            </div>\r
            <div class="student-list" id="studentList"><div class="empty sx-inline-loading">Loading students...</div></div>\r
        </div>\r
\r
        <div class="card">\r
            <div class="section-head">\r
                <div>\r
                    <span class="eyebrow">Circulation</span>\r
                    <h2>Issue Book</h2>\r
                </div>\r
            </div>\r
            <input id="issueStudentId" class="text-input" placeholder="Student ID (e.g. SCH001)">\r
            <input id="issueBookNumber" class="text-input" placeholder="Book Number">\r
            <input id="issueBookTitle" class="text-input" placeholder="Book Title (optional)">\r
            <div class="selected-student" id="selectedStudentCard"><strong>No student selected</strong>Select a student from the list or type Student ID manually.</div>\r
            <button class="btn btn-primary issue-submit" style="margin-top: 10px;" onclick="issueBook()">\r
                <span class="btn-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15Z"></path><path d="M12 6v8"></path><path d="M8 10h8"></path></svg></span>\r
                Issue Book\r
            </button>\r
            <p class="muted" style="margin-top: 10px;">Tip: Student row pe click karke ID auto-fill ho jayega.</p>\r
        </div>\r
    </div>\r
\r
    <div class="card">\r
        <div class="section-head">\r
            <div>\r
                <span class="eyebrow">Policy</span>\r
                <h2>Library Rules</h2>\r
            </div>\r
        </div>\r
        <div class="settings-row">\r
            <div>\r
                <label for="maxDaysInput">Max number of days books permitted</label>\r
                <input id="maxDaysInput" class="text-input" type="number" min="1" max="365" placeholder="e.g. 14">\r
                <p class="muted" style="margin-top: 8px;">Return date student panel me automatically isi value se calculate hoga.</p>\r
            </div>\r
            <button class="btn btn-primary" onclick="saveLibrarySettings()">\r
                <span class="btn-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z"></path><path d="M17 21v-8H7v8"></path><path d="M7 3v5h8"></path></svg></span>\r
                Save Rules\r
            </button>\r
        </div>\r
    </div>\r
\r
    <div class="card">\r
        <div class="section-head">\r
            <div>\r
                <span class="eyebrow">Issue Register</span>\r
                <h2>Issued / Returned Books</h2>\r
            </div>\r
        </div>\r
        <div class="filters">\r
            <input id="issueSearch" class="search-input" placeholder="Search by Book Number, Title, Student ID or Name">\r
            <select id="statusFilter" class="select-input">\r
                <option value="all">All</option>\r
                <option value="issued">Only Issued</option>\r
                <option value="returned">Only Returned</option>\r
            </select>\r
            <input id="issueAgeFilter" class="text-input" type="number" min="0" placeholder="Issued at least N days ago">\r
            <select id="dueFilter" class="select-input">\r
                <option value="all">All Due Dates</option>\r
                <option value="due-now">Due / Overdue Today</option>\r
                <option value="overdue">Overdue Only</option>\r
            </select>\r
        </div>\r
        <div class="issue-list" id="issueList"><div class="empty sx-inline-loading">Loading issue records...</div></div>\r
    </div>\r
</div>\r
    </main>\r
</div>\r
\r
<script src="school-branding.js"><\/script>\r
<script type="module">\r
import { initializeApp } from "./firebase-compat.js";\r
import { getAuth, onAuthStateChanged, signOut } from "./firebase-compat.js";\r
import {\r
    getFirestore,\r
    doc,\r
    getDoc,\r
    collection,\r
    getDocs,\r
    addDoc,\r
    updateDoc,\r
    setDoc,\r
    serverTimestamp\r
} from "./firebase-compat.js";\r
\r
const firebaseConfig = {\r
    apiKey: "AIzaSyAomGwef93HFT9Xyx7SVW95FPw_IcIAICE",\r
    authDomain: "schoolix-48107.firebaseapp.com",\r
    projectId: "schoolix-48107",\r
    storageBucket: "schoolix-48107.firebasestorage.app",\r
    messagingSenderId: "133937954491",\r
    appId: "1:133937954491:web:69d8064422617eb8c4339e"\r
};\r
\r
const app = initializeApp(firebaseConfig);\r
const auth = getAuth(app);\r
const db = getFirestore(app);\r
const welcomeText = document.getElementById("welcomeText");\r
const studentListEl = document.getElementById("studentList");\r
const issueListEl = document.getElementById("issueList");\r
const totalStudentsStatEl = document.getElementById("totalStudentsStat");\r
const issuedBooksStatEl = document.getElementById("issuedBooksStat");\r
const returnedBooksStatEl = document.getElementById("returnedBooksStat");\r
const maxDaysStatEl = document.getElementById("maxDaysStat");\r
const dueTodayStatEl = document.getElementById("dueTodayStat");\r
const overdueBooksStatEl = document.getElementById("overdueBooksStat");\r
const studentSearchEl = document.getElementById("studentSearch");\r
const studentPageSizeEl = document.getElementById("studentPageSize");\r
const studentPagerEl = document.getElementById("studentPager");\r
const issueSearchEl = document.getElementById("issueSearch");\r
const statusFilterEl = document.getElementById("statusFilter");\r
const issueAgeFilterEl = document.getElementById("issueAgeFilter");\r
const dueFilterEl = document.getElementById("dueFilter");\r
const issueStudentIdEl = document.getElementById("issueStudentId");\r
const issueBookNumberEl = document.getElementById("issueBookNumber");\r
const issueBookTitleEl = document.getElementById("issueBookTitle");\r
const issueSubmitButtonEl = document.querySelector(".issue-submit");\r
const maxDaysInputEl = document.getElementById("maxDaysInput");\r
const selectedStudentCardEl = document.getElementById("selectedStudentCard");\r
const librarySidebarEl = document.getElementById("librarySidebar");\r
const librarySidebarOverlayEl = document.getElementById("librarySidebarOverlay");\r
const libraryMenuButtonEl = document.getElementById("libraryMenuButton");\r
\r
let adminId = null;\r
let currentLibrarian = null;\r
let librarySettings = { maxDays: 14 };\r
let students = [];\r
let issues = [];\r
let filteredStudents = [];\r
let filteredIssues = [];\r
let studentPage = 1;\r
\r
function closeLibrarySidebar() {\r
    librarySidebarEl?.classList.remove("open");\r
    librarySidebarOverlayEl?.classList.remove("open");\r
    librarySidebarOverlayEl?.setAttribute("aria-hidden", "true");\r
    libraryMenuButtonEl?.setAttribute("aria-expanded", "false");\r
}\r
\r
function openLibrarySidebar() {\r
    librarySidebarEl?.classList.add("open");\r
    librarySidebarOverlayEl?.classList.add("open");\r
    librarySidebarOverlayEl?.setAttribute("aria-hidden", "false");\r
    libraryMenuButtonEl?.setAttribute("aria-expanded", "true");\r
}\r
\r
libraryMenuButtonEl?.addEventListener("click", () => {\r
    librarySidebarEl?.classList.contains("open") ? closeLibrarySidebar() : openLibrarySidebar();\r
});\r
librarySidebarOverlayEl?.addEventListener("click", closeLibrarySidebar);\r
librarySidebarEl?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeLibrarySidebar));\r
document.addEventListener("keydown", (event) => {\r
    if (event.key === "Escape") closeLibrarySidebar();\r
});\r
\r
onAuthStateChanged(auth, async (user) => {\r
    if (!user) {\r
        window.location.href = "#/index.html";\r
        return;\r
    }\r
\r
    const userDoc = await getDoc(doc(db, "users", user.uid));\r
    if (!userDoc.exists() || userDoc.data().role !== "librarian") {\r
        alert("Access denied. Librarian account required.");\r
        window.location.href = "#/index.html";\r
        return;\r
    }\r
\r
    const data = userDoc.data();\r
    adminId = data.adminId || data.schoolId || "";\r
    currentLibrarian = {\r
        uid: user.uid,\r
        name: data.name || "Librarian",\r
        email: data.email || user.email || ""\r
    };\r
    if (!adminId) {\r
        alert("Admin mapping missing for librarian account.");\r
        window.location.href = "#/index.html";\r
        return;\r
    }\r
    welcomeText.textContent = \`Welcome \${data.name || "Librarian"} (\${data.email || user.email})\`;\r
    await loadLibrarySettings();\r
    await loadStudents();\r
    await loadIssues();\r
});\r
\r
window.logout = async () => {\r
    try {\r
        await signOut(auth);\r
        window.location.href = "#/index.html";\r
    } catch (error) {\r
        alert("Logout failed.");\r
    }\r
};\r
\r
function esc(value) {\r
    return String(value ?? "")\r
        .replace(/&/g, "&amp;")\r
        .replace(/</g, "&lt;")\r
        .replace(/>/g, "&gt;")\r
        .replace(/"/g, "&quot;")\r
        .replace(/'/g, "&#39;");\r
}\r
\r
function normalizeMaxDays(value) {\r
    const days = Number(value);\r
    if (!Number.isFinite(days) || days < 1) return 14;\r
    return Math.min(365, Math.floor(days));\r
}\r
\r
function toDate(value) {\r
    if (!value) return null;\r
    if (value.toDate) return value.toDate();\r
    if (typeof value.seconds === "number") return new Date(value.seconds * 1000);\r
    const parsed = new Date(value);\r
    return Number.isNaN(parsed.getTime()) ? null : parsed;\r
}\r
\r
function addDays(date, days) {\r
    const result = new Date(date);\r
    result.setDate(result.getDate() + days);\r
    return result;\r
}\r
\r
function getIssuedDate(entry) {\r
    return toDate(entry.issuedAt) || toDate(entry.issuedAtMs);\r
}\r
\r
function getMaxDaysForEntry(entry) {\r
    return normalizeMaxDays(entry.maxDaysAllowed || librarySettings.maxDays);\r
}\r
\r
function getDueDate(entry) {\r
    const storedDueDate = toDate(entry.dueDate) || toDate(entry.dueDateMs);\r
    if (storedDueDate) return storedDueDate;\r
    const issued = getIssuedDate(entry);\r
    return issued ? addDays(issued, getMaxDaysForEntry(entry)) : null;\r
}\r
\r
function getIssueAgeDays(entry) {\r
    const issued = getIssuedDate(entry);\r
    if (!issued) return null;\r
    return Math.max(0, Math.floor((Date.now() - issued.getTime()) / 86400000));\r
}\r
\r
function isOverdue(entry) {\r
    if (entry.status === "returned") return false;\r
    const dueDate = getDueDate(entry);\r
    if (!dueDate) return false;\r
    const startOfToday = new Date();\r
    startOfToday.setHours(0, 0, 0, 0);\r
    return dueDate.getTime() < startOfToday.getTime();\r
}\r
\r
function isDueToday(entry) {\r
    if (entry.status === "returned") return false;\r
    const dueDate = getDueDate(entry);\r
    if (!dueDate) return false;\r
    const endOfToday = new Date();\r
    endOfToday.setHours(23, 59, 59, 999);\r
    return dueDate.getTime() <= endOfToday.getTime();\r
}\r
\r
function formatDateTime(value) {\r
    const date = toDate(value);\r
    return date ? date.toLocaleString() : "N/A";\r
}\r
\r
function formatDateOnly(value) {\r
    const date = toDate(value);\r
    return date ? date.toLocaleDateString() : "N/A";\r
}\r
\r
async function loadLibrarySettings() {\r
    try {\r
        const settingsSnap = await getDoc(doc(db, "schools", adminId, "settings", "library"));\r
        librarySettings = {\r
            maxDays: normalizeMaxDays(settingsSnap.exists() ? settingsSnap.data().maxDays : 14)\r
        };\r
    } catch (error) {\r
        console.warn("Library settings load failed:", error);\r
        librarySettings = { maxDays: 14 };\r
    }\r
    maxDaysInputEl.value = String(librarySettings.maxDays);\r
    maxDaysStatEl.textContent = librarySettings.maxDays;\r
}\r
\r
window.saveLibrarySettings = async () => {\r
    const maxDays = normalizeMaxDays(maxDaysInputEl.value);\r
    try {\r
        await setDoc(doc(db, "schools", adminId, "settings", "library"), {\r
            maxDays,\r
            updatedAt: serverTimestamp(),\r
            updatedBy: auth.currentUser.uid\r
        }, { merge: true });\r
        librarySettings.maxDays = maxDays;\r
        maxDaysInputEl.value = String(maxDays);\r
        maxDaysStatEl.textContent = maxDays;\r
        renderIssues();\r
        alert("Library rules saved.");\r
    } catch (error) {\r
        console.error("Library settings save failed:", error);\r
        alert("Failed to save library rules.");\r
    }\r
};\r
\r
async function loadStudents() {\r
    studentListEl.innerHTML = '<div class="empty sx-inline-loading">Loading students...</div>';\r
    try {\r
        const snapshot = await getDocs(collection(db, "schools", adminId, "students"));\r
        students = snapshot.docs.map((docSnap) => ({\r
            id: docSnap.id,\r
            ...docSnap.data()\r
        }));\r
        filteredStudents = [...students];\r
        totalStudentsStatEl.textContent = students.length;\r
        renderStudents();\r
    } catch (error) {\r
        console.error("Failed to load students:", error);\r
        studentListEl.innerHTML = '<div class="empty">Failed to load students.</div>';\r
    }\r
}\r
\r
function renderStudents() {\r
    studentListEl.innerHTML = "";\r
    if (filteredStudents.length === 0) {\r
        studentListEl.innerHTML = '<div class="empty">No students found.</div>';\r
        renderStudentPager(0, 0, 1);\r
        return;\r
    }\r
\r
    const pageSizeValue = studentPageSizeEl?.value || "25";\r
    const pageSize = pageSizeValue === "all" ? filteredStudents.length : Number(pageSizeValue || 25);\r
    const totalPages = Math.max(1, Math.ceil(filteredStudents.length / Math.max(1, pageSize)));\r
    studentPage = Math.min(Math.max(1, studentPage), totalPages);\r
    const start = pageSizeValue === "all" ? 0 : (studentPage - 1) * pageSize;\r
    const visibleStudents = pageSizeValue === "all" ? filteredStudents : filteredStudents.slice(start, start + pageSize);\r
\r
    visibleStudents.forEach((student) => {\r
        const tc = !!student.tcIssued;\r
        const row = document.createElement("div");\r
        row.className = "row" + (tc ? " row-tc" : "");\r
        row.innerHTML = \`\r
            <div class="row-main">\r
                <span class="row-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"></circle><path d="M4 21a8 8 0 0 1 16 0"></path></svg></span>\r
                <div>\r
                    <strong>\${student.name || "N/A"}</strong>\r
                    \${tc ? ' <span class="pill pill-tc">TC Issued</span>' : ""}<br>\r
                    <small>ID: \${student.studentId || "N/A"} | Class: \${student.class || "-"}-\${student.section || "-"}</small>\r
                    \${tc ? "<br><small style=\\"color:#b91c1c;\\">Books cannot be issued - student has left (TC).</small>" : ""}\r
                </div>\r
            </div>\r
            <button class="btn btn-success" \${tc ? "disabled" : ""}>\${tc ? "Blocked" : "Select"}</button>\r
        \`;\r
        const btn = row.querySelector("button");\r
        btn.addEventListener("click", () => {\r
            if (tc) {\r
                alert("This student has a Transfer Certificate issued. Library issue is not allowed.");\r
                return;\r
            }\r
            issueStudentIdEl.value = student.studentId || "";\r
            updateSelectedStudentCard(student);\r
            issueStudentIdEl.focus();\r
        });\r
        studentListEl.appendChild(row);\r
    });\r
    renderStudentPager(filteredStudents.length, visibleStudents.length, totalPages);\r
}\r
\r
function renderStudentPager(total, visible, totalPages) {\r
    if (!studentPagerEl) return;\r
    if (!total) {\r
        studentPagerEl.innerHTML = "";\r
        return;\r
    }\r
    const pageSizeValue = studentPageSizeEl?.value || "25";\r
    const start = pageSizeValue === "all" ? 1 : ((studentPage - 1) * Number(pageSizeValue) + 1);\r
    const end = pageSizeValue === "all" ? total : Math.min(total, start + visible - 1);\r
    studentPagerEl.innerHTML = \`\r
        <span>\${start}-\${end} of \${total}</span>\r
        <button type="button" id="studentPrevPage" \${studentPage <= 1 || pageSizeValue === "all" ? "disabled" : ""}>Prev</button>\r
        <span>Page \${pageSizeValue === "all" ? 1 : studentPage}/\${pageSizeValue === "all" ? 1 : totalPages}</span>\r
        <button type="button" id="studentNextPage" \${studentPage >= totalPages || pageSizeValue === "all" ? "disabled" : ""}>Next</button>\r
    \`;\r
    document.getElementById("studentPrevPage")?.addEventListener("click", () => {\r
        studentPage = Math.max(1, studentPage - 1);\r
        renderStudents();\r
    });\r
    document.getElementById("studentNextPage")?.addEventListener("click", () => {\r
        studentPage = Math.min(totalPages, studentPage + 1);\r
        renderStudents();\r
    });\r
}\r
\r
async function loadIssues() {\r
    issueListEl.innerHTML = '<div class="empty sx-inline-loading">Loading issue records...</div>';\r
    try {\r
        const snapshot = await getDocs(collection(db, "schools", adminId, "library_issues"));\r
        issues = snapshot.docs.map((docSnap) => ({\r
            id: docSnap.id,\r
            ...docSnap.data()\r
        }));\r
        filteredIssues = [...issues];\r
        updateIssueStats();\r
        renderIssues();\r
    } catch (error) {\r
        console.error("Failed to load issues:", error);\r
        issueListEl.innerHTML = '<div class="empty">Failed to load issue records.</div>';\r
    }\r
}\r
\r
function updateIssueStats() {\r
    const issuedCount = issues.filter((item) => item.status === "issued").length;\r
    const returnedCount = issues.filter((item) => item.status === "returned").length;\r
    const dueTodayCount = issues.filter(isDueToday).length;\r
    const overdueCount = issues.filter(isOverdue).length;\r
    issuedBooksStatEl.textContent = issuedCount;\r
    returnedBooksStatEl.textContent = returnedCount;\r
    if (dueTodayStatEl) dueTodayStatEl.textContent = dueTodayCount;\r
    if (overdueBooksStatEl) overdueBooksStatEl.textContent = overdueCount;\r
}\r
\r
function renderIssues() {\r
    issueListEl.innerHTML = "";\r
    if (filteredIssues.length === 0) {\r
        issueListEl.innerHTML = '<div class="empty">No book records found.</div>';\r
        return;\r
    }\r
\r
    filteredIssues\r
        .sort((a, b) => {\r
            const aTime = getIssuedDate(a)?.getTime() || 0;\r
            const bTime = getIssuedDate(b)?.getTime() || 0;\r
            return bTime - aTime;\r
        })\r
        .forEach((entry) => {\r
            const issuedDate = formatDateTime(entry.issuedAt || entry.issuedAtMs);\r
            const returnedDate = entry.returnedAt || entry.returnedAtMs\r
                ? formatDateTime(entry.returnedAt || entry.returnedAtMs)\r
                : "-";\r
            const dueDate = getDueDate(entry);\r
            const ageDays = getIssueAgeDays(entry);\r
            const overdue = isOverdue(entry);\r
            const issuedBy = entry.issuedByName || entry.issuedByEmail || entry.issuedBy || "Library staff";\r
            const statusPill = entry.status === "returned"\r
                ? '<span class="pill pill-returned">RETURNED</span>'\r
                : overdue\r
                    ? '<span class="pill pill-overdue">OVERDUE</span>'\r
                    : '<span class="pill pill-issued">ISSUED</span>';\r
\r
            const row = document.createElement("div");\r
            row.className = "row issue-row";\r
            row.innerHTML = \`\r
                <div class="row-main">\r
                    <span class="row-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15Z"></path><path d="M8 7h8"></path><path d="M8 11h6"></path></svg></span>\r
                    <div>\r
                        <strong>\${esc(entry.bookNumber || "-")}</strong> \${statusPill}<br>\r
                        <small>Title: \${esc(entry.bookTitle || "-")}</small><br>\r
                        <small>Student: \${esc(entry.studentName || "-")} (\${esc(entry.studentId || "-")})</small><br>\r
                        <small>Issued: \${esc(issuedDate)} | Return by: \${esc(formatDateOnly(dueDate))} | Returned: \${esc(returnedDate)}</small><br>\r
                        <small>Issued by: \${esc(issuedBy)} | Age: \${ageDays === null ? "N/A" : \`\${ageDays} day(s)\`}</small>\r
                    </div>\r
                </div>\r
                <div class="row-actions">\r
                \${entry.status === "issued"\r
                    ? '<button class="btn btn-primary" data-action="renew">Renew</button><button class="btn btn-success" data-action="return">Mark Returned</button>'\r
                    : '<span class="muted">Completed</span>'}\r
                </div>\r
            \`;\r
\r
            if (entry.status === "issued") {\r
                row.querySelector('[data-action="return"]').addEventListener("click", async () => {\r
                    await markReturned(entry.id);\r
                });\r
                row.querySelector('[data-action="renew"]').addEventListener("click", async () => {\r
                    await renewIssue(entry.id);\r
                });\r
            }\r
            issueListEl.appendChild(row);\r
        });\r
}\r
\r
window.issueBook = async () => {\r
    if (issueSubmitButtonEl?.disabled) return;\r
    const studentId = issueStudentIdEl.value.trim();\r
    const bookNumber = issueBookNumberEl.value.trim();\r
    const bookTitle = issueBookTitleEl.value.trim();\r
\r
    if (!studentId || !bookNumber) {\r
        alert("Student ID and Book Number are required.");\r
        return;\r
    }\r
\r
    const student = students.find((s) => (s.studentId || "").toLowerCase() === studentId.toLowerCase());\r
    if (!student) {\r
        alert("Student not found. Please enter valid Student ID.");\r
        return;\r
    }\r
    if (student.tcIssued) {\r
        alert("Transfer Certificate issued for this student. Books cannot be issued.");\r
        return;\r
    }\r
\r
    const alreadyIssued = issues.find((item) =>\r
        (item.bookNumber || "").toLowerCase() === bookNumber.toLowerCase() && item.status === "issued"\r
    );\r
    if (alreadyIssued) {\r
        alert("This book is already issued and not returned yet.");\r
        return;\r
    }\r
\r
    try {\r
        issueSubmitButtonEl?.classList.add("sx-action-loading");\r
        if (issueSubmitButtonEl) issueSubmitButtonEl.disabled = true;\r
        const issuedOn = new Date();\r
        const maxDaysAllowed = normalizeMaxDays(librarySettings.maxDays);\r
        const dueDate = addDays(issuedOn, maxDaysAllowed);\r
        await addDoc(collection(db, "schools", adminId, "library_issues"), {\r
            studentRefId: student.id || null,\r
            studentId: student.studentId || studentId,\r
            studentName: student.name || "",\r
            class: student.class || "",\r
            section: student.section || "",\r
            bookNumber,\r
            bookTitle: bookTitle || "",\r
            status: "issued",\r
            issuedBy: auth.currentUser.uid,\r
            issuedByName: currentLibrarian?.name || "Librarian",\r
            issuedByEmail: currentLibrarian?.email || "",\r
            issuedAt: serverTimestamp(),\r
            issuedAtMs: issuedOn.getTime(),\r
            maxDaysAllowed,\r
            dueDate,\r
            dueDateMs: dueDate.getTime(),\r
            returnedAt: null,\r
            returnedAtMs: null\r
        });\r
\r
        issueBookNumberEl.value = "";\r
        issueBookTitleEl.value = "";\r
        await loadIssues();\r
        alert("Book issued successfully.");\r
    } catch (error) {\r
        console.error("Issue failed:", error);\r
        alert("Failed to issue book.");\r
    } finally {\r
        issueSubmitButtonEl?.classList.remove("sx-action-loading");\r
        if (issueSubmitButtonEl) issueSubmitButtonEl.disabled = false;\r
    }\r
};\r
\r
async function markReturned(issueId) {\r
    if (!confirm("Mark this book as returned?")) return;\r
    try {\r
        await updateDoc(doc(db, "schools", adminId, "library_issues", issueId), {\r
            status: "returned",\r
            returnedAt: serverTimestamp(),\r
            returnedAtMs: Date.now()\r
        });\r
        await loadIssues();\r
    } catch (error) {\r
        console.error("Return update failed:", error);\r
        alert("Failed to update return status.");\r
    }\r
}\r
\r
studentSearchEl.addEventListener("input", () => {\r
    const q = studentSearchEl.value.trim().toLowerCase();\r
    filteredStudents = students.filter((student) => {\r
        const sid = (student.studentId || "").toLowerCase();\r
        const name = (student.name || "").toLowerCase();\r
        return sid.includes(q) || name.includes(q);\r
    });\r
    studentPage = 1;\r
    renderStudents();\r
});\r
\r
studentPageSizeEl?.addEventListener("change", () => {\r
    studentPage = 1;\r
    renderStudents();\r
});\r
\r
function applyIssueFilters() {\r
    const q = issueSearchEl.value.trim().toLowerCase();\r
    const status = statusFilterEl.value;\r
    const minAgeRaw = issueAgeFilterEl.value.trim();\r
    const minAge = Number(minAgeRaw);\r
    const hasMinAge = minAgeRaw !== "" && Number.isFinite(minAge) && minAge >= 0;\r
    const dueFilter = dueFilterEl.value;\r
    const endOfToday = new Date();\r
    endOfToday.setHours(23, 59, 59, 999);\r
\r
    filteredIssues = issues.filter((entry) => {\r
        const matchesSearch =\r
            (entry.bookNumber || "").toLowerCase().includes(q) ||\r
            (entry.bookTitle || "").toLowerCase().includes(q) ||\r
            (entry.studentId || "").toLowerCase().includes(q) ||\r
            (entry.studentName || "").toLowerCase().includes(q);\r
        const matchesStatus = status === "all" ? true : entry.status === status;\r
        const ageDays = getIssueAgeDays(entry);\r
        const matchesAge = !hasMinAge || (ageDays !== null && ageDays >= minAge);\r
        const dueDate = getDueDate(entry);\r
        const matchesDue = dueFilter === "all"\r
            ? true\r
            : dueFilter === "overdue"\r
                ? isOverdue(entry)\r
                : entry.status !== "returned" && dueDate && dueDate.getTime() <= endOfToday.getTime();\r
        return matchesSearch && matchesStatus && matchesAge && matchesDue;\r
    });\r
    renderIssues();\r
}\r
\r
async function renewIssue(issueId) {\r
    const entry = issues.find((item) => item.id === issueId);\r
    if (!entry) return;\r
    const nextDue = addDays(new Date(), normalizeMaxDays(librarySettings.maxDays));\r
    try {\r
        await updateDoc(doc(db, "schools", adminId, "library_issues", issueId), {\r
            dueDate: nextDue,\r
            dueDateMs: nextDue.getTime(),\r
            renewedAt: serverTimestamp(),\r
            renewedAtMs: Date.now(),\r
            renewedBy: auth.currentUser.uid\r
        });\r
        await loadIssues();\r
    } catch (error) {\r
        console.error("Renew failed:", error);\r
        alert("Failed to renew book.");\r
    }\r
}\r
\r
function updateSelectedStudentCard(student) {\r
    if (!selectedStudentCardEl) return;\r
    const activeIssues = issues.filter((entry) => entry.status === "issued" && entry.studentId === student.studentId);\r
    selectedStudentCardEl.innerHTML = \`<strong>\${esc(student.name || "Student")} (\${esc(student.studentId || "-")})</strong>Class \${esc(student.class || "-")}-\${esc(student.section || "-")} | Active books: \${activeIssues.length}\`;\r
}\r
\r
window.focusIssueForm = () => {\r
    issueStudentIdEl.focus();\r
};\r
\r
window.showDueToday = () => {\r
    dueFilterEl.value = "due-now";\r
    statusFilterEl.value = "issued";\r
    applyIssueFilters();\r
};\r
\r
window.showOverdue = () => {\r
    dueFilterEl.value = "overdue";\r
    statusFilterEl.value = "issued";\r
    applyIssueFilters();\r
};\r
\r
window.clearLibraryFilters = () => {\r
    issueSearchEl.value = "";\r
    statusFilterEl.value = "all";\r
    issueAgeFilterEl.value = "";\r
    dueFilterEl.value = "all";\r
    filteredIssues = [...issues];\r
    renderIssues();\r
};\r
\r
issueSearchEl.addEventListener("input", applyIssueFilters);\r
statusFilterEl.addEventListener("change", applyIssueFilters);\r
issueAgeFilterEl.addEventListener("input", applyIssueFilters);\r
dueFilterEl.addEventListener("change", applyIssueFilters);\r
<\/script>\r
<script src="library-portal.js"><\/script>\r
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
`},{tag:"link",attributes:{rel:"stylesheet",href:"schoolix-polish.css"},text:""},{tag:"link",attributes:{rel:"stylesheet",href:"library-portal.css"},text:""}],scripts:[{attributes:{id:"sxCriticalLoaderScript"},text:`\r
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
import { getAuth, onAuthStateChanged, signOut } from "./firebase-compat.js";\r
import {\r
    getFirestore,\r
    doc,\r
    getDoc,\r
    collection,\r
    getDocs,\r
    addDoc,\r
    updateDoc,\r
    setDoc,\r
    serverTimestamp\r
} from "./firebase-compat.js";\r
\r
const firebaseConfig = {\r
    apiKey: "AIzaSyAomGwef93HFT9Xyx7SVW95FPw_IcIAICE",\r
    authDomain: "schoolix-48107.firebaseapp.com",\r
    projectId: "schoolix-48107",\r
    storageBucket: "schoolix-48107.firebasestorage.app",\r
    messagingSenderId: "133937954491",\r
    appId: "1:133937954491:web:69d8064422617eb8c4339e"\r
};\r
\r
const app = initializeApp(firebaseConfig);\r
const auth = getAuth(app);\r
const db = getFirestore(app);\r
const welcomeText = document.getElementById("welcomeText");\r
const studentListEl = document.getElementById("studentList");\r
const issueListEl = document.getElementById("issueList");\r
const totalStudentsStatEl = document.getElementById("totalStudentsStat");\r
const issuedBooksStatEl = document.getElementById("issuedBooksStat");\r
const returnedBooksStatEl = document.getElementById("returnedBooksStat");\r
const maxDaysStatEl = document.getElementById("maxDaysStat");\r
const dueTodayStatEl = document.getElementById("dueTodayStat");\r
const overdueBooksStatEl = document.getElementById("overdueBooksStat");\r
const studentSearchEl = document.getElementById("studentSearch");\r
const studentPageSizeEl = document.getElementById("studentPageSize");\r
const studentPagerEl = document.getElementById("studentPager");\r
const issueSearchEl = document.getElementById("issueSearch");\r
const statusFilterEl = document.getElementById("statusFilter");\r
const issueAgeFilterEl = document.getElementById("issueAgeFilter");\r
const dueFilterEl = document.getElementById("dueFilter");\r
const issueStudentIdEl = document.getElementById("issueStudentId");\r
const issueBookNumberEl = document.getElementById("issueBookNumber");\r
const issueBookTitleEl = document.getElementById("issueBookTitle");\r
const issueSubmitButtonEl = document.querySelector(".issue-submit");\r
const maxDaysInputEl = document.getElementById("maxDaysInput");\r
const selectedStudentCardEl = document.getElementById("selectedStudentCard");\r
const librarySidebarEl = document.getElementById("librarySidebar");\r
const librarySidebarOverlayEl = document.getElementById("librarySidebarOverlay");\r
const libraryMenuButtonEl = document.getElementById("libraryMenuButton");\r
\r
let adminId = null;\r
let currentLibrarian = null;\r
let librarySettings = { maxDays: 14 };\r
let students = [];\r
let issues = [];\r
let filteredStudents = [];\r
let filteredIssues = [];\r
let studentPage = 1;\r
\r
function closeLibrarySidebar() {\r
    librarySidebarEl?.classList.remove("open");\r
    librarySidebarOverlayEl?.classList.remove("open");\r
    librarySidebarOverlayEl?.setAttribute("aria-hidden", "true");\r
    libraryMenuButtonEl?.setAttribute("aria-expanded", "false");\r
}\r
\r
function openLibrarySidebar() {\r
    librarySidebarEl?.classList.add("open");\r
    librarySidebarOverlayEl?.classList.add("open");\r
    librarySidebarOverlayEl?.setAttribute("aria-hidden", "false");\r
    libraryMenuButtonEl?.setAttribute("aria-expanded", "true");\r
}\r
\r
libraryMenuButtonEl?.addEventListener("click", () => {\r
    librarySidebarEl?.classList.contains("open") ? closeLibrarySidebar() : openLibrarySidebar();\r
});\r
librarySidebarOverlayEl?.addEventListener("click", closeLibrarySidebar);\r
librarySidebarEl?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeLibrarySidebar));\r
document.addEventListener("keydown", (event) => {\r
    if (event.key === "Escape") closeLibrarySidebar();\r
});\r
\r
onAuthStateChanged(auth, async (user) => {\r
    if (!user) {\r
        window.location.href = "#/index.html";\r
        return;\r
    }\r
\r
    const userDoc = await getDoc(doc(db, "users", user.uid));\r
    if (!userDoc.exists() || userDoc.data().role !== "librarian") {\r
        alert("Access denied. Librarian account required.");\r
        window.location.href = "#/index.html";\r
        return;\r
    }\r
\r
    const data = userDoc.data();\r
    adminId = data.adminId || data.schoolId || "";\r
    currentLibrarian = {\r
        uid: user.uid,\r
        name: data.name || "Librarian",\r
        email: data.email || user.email || ""\r
    };\r
    if (!adminId) {\r
        alert("Admin mapping missing for librarian account.");\r
        window.location.href = "#/index.html";\r
        return;\r
    }\r
    welcomeText.textContent = \`Welcome \${data.name || "Librarian"} (\${data.email || user.email})\`;\r
    await loadLibrarySettings();\r
    await loadStudents();\r
    await loadIssues();\r
});\r
\r
window.logout = async () => {\r
    try {\r
        await signOut(auth);\r
        window.location.href = "#/index.html";\r
    } catch (error) {\r
        alert("Logout failed.");\r
    }\r
};\r
\r
function esc(value) {\r
    return String(value ?? "")\r
        .replace(/&/g, "&amp;")\r
        .replace(/</g, "&lt;")\r
        .replace(/>/g, "&gt;")\r
        .replace(/"/g, "&quot;")\r
        .replace(/'/g, "&#39;");\r
}\r
\r
function normalizeMaxDays(value) {\r
    const days = Number(value);\r
    if (!Number.isFinite(days) || days < 1) return 14;\r
    return Math.min(365, Math.floor(days));\r
}\r
\r
function toDate(value) {\r
    if (!value) return null;\r
    if (value.toDate) return value.toDate();\r
    if (typeof value.seconds === "number") return new Date(value.seconds * 1000);\r
    const parsed = new Date(value);\r
    return Number.isNaN(parsed.getTime()) ? null : parsed;\r
}\r
\r
function addDays(date, days) {\r
    const result = new Date(date);\r
    result.setDate(result.getDate() + days);\r
    return result;\r
}\r
\r
function getIssuedDate(entry) {\r
    return toDate(entry.issuedAt) || toDate(entry.issuedAtMs);\r
}\r
\r
function getMaxDaysForEntry(entry) {\r
    return normalizeMaxDays(entry.maxDaysAllowed || librarySettings.maxDays);\r
}\r
\r
function getDueDate(entry) {\r
    const storedDueDate = toDate(entry.dueDate) || toDate(entry.dueDateMs);\r
    if (storedDueDate) return storedDueDate;\r
    const issued = getIssuedDate(entry);\r
    return issued ? addDays(issued, getMaxDaysForEntry(entry)) : null;\r
}\r
\r
function getIssueAgeDays(entry) {\r
    const issued = getIssuedDate(entry);\r
    if (!issued) return null;\r
    return Math.max(0, Math.floor((Date.now() - issued.getTime()) / 86400000));\r
}\r
\r
function isOverdue(entry) {\r
    if (entry.status === "returned") return false;\r
    const dueDate = getDueDate(entry);\r
    if (!dueDate) return false;\r
    const startOfToday = new Date();\r
    startOfToday.setHours(0, 0, 0, 0);\r
    return dueDate.getTime() < startOfToday.getTime();\r
}\r
\r
function isDueToday(entry) {\r
    if (entry.status === "returned") return false;\r
    const dueDate = getDueDate(entry);\r
    if (!dueDate) return false;\r
    const endOfToday = new Date();\r
    endOfToday.setHours(23, 59, 59, 999);\r
    return dueDate.getTime() <= endOfToday.getTime();\r
}\r
\r
function formatDateTime(value) {\r
    const date = toDate(value);\r
    return date ? date.toLocaleString() : "N/A";\r
}\r
\r
function formatDateOnly(value) {\r
    const date = toDate(value);\r
    return date ? date.toLocaleDateString() : "N/A";\r
}\r
\r
async function loadLibrarySettings() {\r
    try {\r
        const settingsSnap = await getDoc(doc(db, "schools", adminId, "settings", "library"));\r
        librarySettings = {\r
            maxDays: normalizeMaxDays(settingsSnap.exists() ? settingsSnap.data().maxDays : 14)\r
        };\r
    } catch (error) {\r
        console.warn("Library settings load failed:", error);\r
        librarySettings = { maxDays: 14 };\r
    }\r
    maxDaysInputEl.value = String(librarySettings.maxDays);\r
    maxDaysStatEl.textContent = librarySettings.maxDays;\r
}\r
\r
window.saveLibrarySettings = async () => {\r
    const maxDays = normalizeMaxDays(maxDaysInputEl.value);\r
    try {\r
        await setDoc(doc(db, "schools", adminId, "settings", "library"), {\r
            maxDays,\r
            updatedAt: serverTimestamp(),\r
            updatedBy: auth.currentUser.uid\r
        }, { merge: true });\r
        librarySettings.maxDays = maxDays;\r
        maxDaysInputEl.value = String(maxDays);\r
        maxDaysStatEl.textContent = maxDays;\r
        renderIssues();\r
        alert("Library rules saved.");\r
    } catch (error) {\r
        console.error("Library settings save failed:", error);\r
        alert("Failed to save library rules.");\r
    }\r
};\r
\r
async function loadStudents() {\r
    studentListEl.innerHTML = '<div class="empty sx-inline-loading">Loading students...</div>';\r
    try {\r
        const snapshot = await getDocs(collection(db, "schools", adminId, "students"));\r
        students = snapshot.docs.map((docSnap) => ({\r
            id: docSnap.id,\r
            ...docSnap.data()\r
        }));\r
        filteredStudents = [...students];\r
        totalStudentsStatEl.textContent = students.length;\r
        renderStudents();\r
    } catch (error) {\r
        console.error("Failed to load students:", error);\r
        studentListEl.innerHTML = '<div class="empty">Failed to load students.</div>';\r
    }\r
}\r
\r
function renderStudents() {\r
    studentListEl.innerHTML = "";\r
    if (filteredStudents.length === 0) {\r
        studentListEl.innerHTML = '<div class="empty">No students found.</div>';\r
        renderStudentPager(0, 0, 1);\r
        return;\r
    }\r
\r
    const pageSizeValue = studentPageSizeEl?.value || "25";\r
    const pageSize = pageSizeValue === "all" ? filteredStudents.length : Number(pageSizeValue || 25);\r
    const totalPages = Math.max(1, Math.ceil(filteredStudents.length / Math.max(1, pageSize)));\r
    studentPage = Math.min(Math.max(1, studentPage), totalPages);\r
    const start = pageSizeValue === "all" ? 0 : (studentPage - 1) * pageSize;\r
    const visibleStudents = pageSizeValue === "all" ? filteredStudents : filteredStudents.slice(start, start + pageSize);\r
\r
    visibleStudents.forEach((student) => {\r
        const tc = !!student.tcIssued;\r
        const row = document.createElement("div");\r
        row.className = "row" + (tc ? " row-tc" : "");\r
        row.innerHTML = \`\r
            <div class="row-main">\r
                <span class="row-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"></circle><path d="M4 21a8 8 0 0 1 16 0"></path></svg></span>\r
                <div>\r
                    <strong>\${student.name || "N/A"}</strong>\r
                    \${tc ? ' <span class="pill pill-tc">TC Issued</span>' : ""}<br>\r
                    <small>ID: \${student.studentId || "N/A"} | Class: \${student.class || "-"}-\${student.section || "-"}</small>\r
                    \${tc ? "<br><small style=\\"color:#b91c1c;\\">Books cannot be issued - student has left (TC).</small>" : ""}\r
                </div>\r
            </div>\r
            <button class="btn btn-success" \${tc ? "disabled" : ""}>\${tc ? "Blocked" : "Select"}</button>\r
        \`;\r
        const btn = row.querySelector("button");\r
        btn.addEventListener("click", () => {\r
            if (tc) {\r
                alert("This student has a Transfer Certificate issued. Library issue is not allowed.");\r
                return;\r
            }\r
            issueStudentIdEl.value = student.studentId || "";\r
            updateSelectedStudentCard(student);\r
            issueStudentIdEl.focus();\r
        });\r
        studentListEl.appendChild(row);\r
    });\r
    renderStudentPager(filteredStudents.length, visibleStudents.length, totalPages);\r
}\r
\r
function renderStudentPager(total, visible, totalPages) {\r
    if (!studentPagerEl) return;\r
    if (!total) {\r
        studentPagerEl.innerHTML = "";\r
        return;\r
    }\r
    const pageSizeValue = studentPageSizeEl?.value || "25";\r
    const start = pageSizeValue === "all" ? 1 : ((studentPage - 1) * Number(pageSizeValue) + 1);\r
    const end = pageSizeValue === "all" ? total : Math.min(total, start + visible - 1);\r
    studentPagerEl.innerHTML = \`\r
        <span>\${start}-\${end} of \${total}</span>\r
        <button type="button" id="studentPrevPage" \${studentPage <= 1 || pageSizeValue === "all" ? "disabled" : ""}>Prev</button>\r
        <span>Page \${pageSizeValue === "all" ? 1 : studentPage}/\${pageSizeValue === "all" ? 1 : totalPages}</span>\r
        <button type="button" id="studentNextPage" \${studentPage >= totalPages || pageSizeValue === "all" ? "disabled" : ""}>Next</button>\r
    \`;\r
    document.getElementById("studentPrevPage")?.addEventListener("click", () => {\r
        studentPage = Math.max(1, studentPage - 1);\r
        renderStudents();\r
    });\r
    document.getElementById("studentNextPage")?.addEventListener("click", () => {\r
        studentPage = Math.min(totalPages, studentPage + 1);\r
        renderStudents();\r
    });\r
}\r
\r
async function loadIssues() {\r
    issueListEl.innerHTML = '<div class="empty sx-inline-loading">Loading issue records...</div>';\r
    try {\r
        const snapshot = await getDocs(collection(db, "schools", adminId, "library_issues"));\r
        issues = snapshot.docs.map((docSnap) => ({\r
            id: docSnap.id,\r
            ...docSnap.data()\r
        }));\r
        filteredIssues = [...issues];\r
        updateIssueStats();\r
        renderIssues();\r
    } catch (error) {\r
        console.error("Failed to load issues:", error);\r
        issueListEl.innerHTML = '<div class="empty">Failed to load issue records.</div>';\r
    }\r
}\r
\r
function updateIssueStats() {\r
    const issuedCount = issues.filter((item) => item.status === "issued").length;\r
    const returnedCount = issues.filter((item) => item.status === "returned").length;\r
    const dueTodayCount = issues.filter(isDueToday).length;\r
    const overdueCount = issues.filter(isOverdue).length;\r
    issuedBooksStatEl.textContent = issuedCount;\r
    returnedBooksStatEl.textContent = returnedCount;\r
    if (dueTodayStatEl) dueTodayStatEl.textContent = dueTodayCount;\r
    if (overdueBooksStatEl) overdueBooksStatEl.textContent = overdueCount;\r
}\r
\r
function renderIssues() {\r
    issueListEl.innerHTML = "";\r
    if (filteredIssues.length === 0) {\r
        issueListEl.innerHTML = '<div class="empty">No book records found.</div>';\r
        return;\r
    }\r
\r
    filteredIssues\r
        .sort((a, b) => {\r
            const aTime = getIssuedDate(a)?.getTime() || 0;\r
            const bTime = getIssuedDate(b)?.getTime() || 0;\r
            return bTime - aTime;\r
        })\r
        .forEach((entry) => {\r
            const issuedDate = formatDateTime(entry.issuedAt || entry.issuedAtMs);\r
            const returnedDate = entry.returnedAt || entry.returnedAtMs\r
                ? formatDateTime(entry.returnedAt || entry.returnedAtMs)\r
                : "-";\r
            const dueDate = getDueDate(entry);\r
            const ageDays = getIssueAgeDays(entry);\r
            const overdue = isOverdue(entry);\r
            const issuedBy = entry.issuedByName || entry.issuedByEmail || entry.issuedBy || "Library staff";\r
            const statusPill = entry.status === "returned"\r
                ? '<span class="pill pill-returned">RETURNED</span>'\r
                : overdue\r
                    ? '<span class="pill pill-overdue">OVERDUE</span>'\r
                    : '<span class="pill pill-issued">ISSUED</span>';\r
\r
            const row = document.createElement("div");\r
            row.className = "row issue-row";\r
            row.innerHTML = \`\r
                <div class="row-main">\r
                    <span class="row-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15Z"></path><path d="M8 7h8"></path><path d="M8 11h6"></path></svg></span>\r
                    <div>\r
                        <strong>\${esc(entry.bookNumber || "-")}</strong> \${statusPill}<br>\r
                        <small>Title: \${esc(entry.bookTitle || "-")}</small><br>\r
                        <small>Student: \${esc(entry.studentName || "-")} (\${esc(entry.studentId || "-")})</small><br>\r
                        <small>Issued: \${esc(issuedDate)} | Return by: \${esc(formatDateOnly(dueDate))} | Returned: \${esc(returnedDate)}</small><br>\r
                        <small>Issued by: \${esc(issuedBy)} | Age: \${ageDays === null ? "N/A" : \`\${ageDays} day(s)\`}</small>\r
                    </div>\r
                </div>\r
                <div class="row-actions">\r
                \${entry.status === "issued"\r
                    ? '<button class="btn btn-primary" data-action="renew">Renew</button><button class="btn btn-success" data-action="return">Mark Returned</button>'\r
                    : '<span class="muted">Completed</span>'}\r
                </div>\r
            \`;\r
\r
            if (entry.status === "issued") {\r
                row.querySelector('[data-action="return"]').addEventListener("click", async () => {\r
                    await markReturned(entry.id);\r
                });\r
                row.querySelector('[data-action="renew"]').addEventListener("click", async () => {\r
                    await renewIssue(entry.id);\r
                });\r
            }\r
            issueListEl.appendChild(row);\r
        });\r
}\r
\r
window.issueBook = async () => {\r
    if (issueSubmitButtonEl?.disabled) return;\r
    const studentId = issueStudentIdEl.value.trim();\r
    const bookNumber = issueBookNumberEl.value.trim();\r
    const bookTitle = issueBookTitleEl.value.trim();\r
\r
    if (!studentId || !bookNumber) {\r
        alert("Student ID and Book Number are required.");\r
        return;\r
    }\r
\r
    const student = students.find((s) => (s.studentId || "").toLowerCase() === studentId.toLowerCase());\r
    if (!student) {\r
        alert("Student not found. Please enter valid Student ID.");\r
        return;\r
    }\r
    if (student.tcIssued) {\r
        alert("Transfer Certificate issued for this student. Books cannot be issued.");\r
        return;\r
    }\r
\r
    const alreadyIssued = issues.find((item) =>\r
        (item.bookNumber || "").toLowerCase() === bookNumber.toLowerCase() && item.status === "issued"\r
    );\r
    if (alreadyIssued) {\r
        alert("This book is already issued and not returned yet.");\r
        return;\r
    }\r
\r
    try {\r
        issueSubmitButtonEl?.classList.add("sx-action-loading");\r
        if (issueSubmitButtonEl) issueSubmitButtonEl.disabled = true;\r
        const issuedOn = new Date();\r
        const maxDaysAllowed = normalizeMaxDays(librarySettings.maxDays);\r
        const dueDate = addDays(issuedOn, maxDaysAllowed);\r
        await addDoc(collection(db, "schools", adminId, "library_issues"), {\r
            studentRefId: student.id || null,\r
            studentId: student.studentId || studentId,\r
            studentName: student.name || "",\r
            class: student.class || "",\r
            section: student.section || "",\r
            bookNumber,\r
            bookTitle: bookTitle || "",\r
            status: "issued",\r
            issuedBy: auth.currentUser.uid,\r
            issuedByName: currentLibrarian?.name || "Librarian",\r
            issuedByEmail: currentLibrarian?.email || "",\r
            issuedAt: serverTimestamp(),\r
            issuedAtMs: issuedOn.getTime(),\r
            maxDaysAllowed,\r
            dueDate,\r
            dueDateMs: dueDate.getTime(),\r
            returnedAt: null,\r
            returnedAtMs: null\r
        });\r
\r
        issueBookNumberEl.value = "";\r
        issueBookTitleEl.value = "";\r
        await loadIssues();\r
        alert("Book issued successfully.");\r
    } catch (error) {\r
        console.error("Issue failed:", error);\r
        alert("Failed to issue book.");\r
    } finally {\r
        issueSubmitButtonEl?.classList.remove("sx-action-loading");\r
        if (issueSubmitButtonEl) issueSubmitButtonEl.disabled = false;\r
    }\r
};\r
\r
async function markReturned(issueId) {\r
    if (!confirm("Mark this book as returned?")) return;\r
    try {\r
        await updateDoc(doc(db, "schools", adminId, "library_issues", issueId), {\r
            status: "returned",\r
            returnedAt: serverTimestamp(),\r
            returnedAtMs: Date.now()\r
        });\r
        await loadIssues();\r
    } catch (error) {\r
        console.error("Return update failed:", error);\r
        alert("Failed to update return status.");\r
    }\r
}\r
\r
studentSearchEl.addEventListener("input", () => {\r
    const q = studentSearchEl.value.trim().toLowerCase();\r
    filteredStudents = students.filter((student) => {\r
        const sid = (student.studentId || "").toLowerCase();\r
        const name = (student.name || "").toLowerCase();\r
        return sid.includes(q) || name.includes(q);\r
    });\r
    studentPage = 1;\r
    renderStudents();\r
});\r
\r
studentPageSizeEl?.addEventListener("change", () => {\r
    studentPage = 1;\r
    renderStudents();\r
});\r
\r
function applyIssueFilters() {\r
    const q = issueSearchEl.value.trim().toLowerCase();\r
    const status = statusFilterEl.value;\r
    const minAgeRaw = issueAgeFilterEl.value.trim();\r
    const minAge = Number(minAgeRaw);\r
    const hasMinAge = minAgeRaw !== "" && Number.isFinite(minAge) && minAge >= 0;\r
    const dueFilter = dueFilterEl.value;\r
    const endOfToday = new Date();\r
    endOfToday.setHours(23, 59, 59, 999);\r
\r
    filteredIssues = issues.filter((entry) => {\r
        const matchesSearch =\r
            (entry.bookNumber || "").toLowerCase().includes(q) ||\r
            (entry.bookTitle || "").toLowerCase().includes(q) ||\r
            (entry.studentId || "").toLowerCase().includes(q) ||\r
            (entry.studentName || "").toLowerCase().includes(q);\r
        const matchesStatus = status === "all" ? true : entry.status === status;\r
        const ageDays = getIssueAgeDays(entry);\r
        const matchesAge = !hasMinAge || (ageDays !== null && ageDays >= minAge);\r
        const dueDate = getDueDate(entry);\r
        const matchesDue = dueFilter === "all"\r
            ? true\r
            : dueFilter === "overdue"\r
                ? isOverdue(entry)\r
                : entry.status !== "returned" && dueDate && dueDate.getTime() <= endOfToday.getTime();\r
        return matchesSearch && matchesStatus && matchesAge && matchesDue;\r
    });\r
    renderIssues();\r
}\r
\r
async function renewIssue(issueId) {\r
    const entry = issues.find((item) => item.id === issueId);\r
    if (!entry) return;\r
    const nextDue = addDays(new Date(), normalizeMaxDays(librarySettings.maxDays));\r
    try {\r
        await updateDoc(doc(db, "schools", adminId, "library_issues", issueId), {\r
            dueDate: nextDue,\r
            dueDateMs: nextDue.getTime(),\r
            renewedAt: serverTimestamp(),\r
            renewedAtMs: Date.now(),\r
            renewedBy: auth.currentUser.uid\r
        });\r
        await loadIssues();\r
    } catch (error) {\r
        console.error("Renew failed:", error);\r
        alert("Failed to renew book.");\r
    }\r
}\r
\r
function updateSelectedStudentCard(student) {\r
    if (!selectedStudentCardEl) return;\r
    const activeIssues = issues.filter((entry) => entry.status === "issued" && entry.studentId === student.studentId);\r
    selectedStudentCardEl.innerHTML = \`<strong>\${esc(student.name || "Student")} (\${esc(student.studentId || "-")})</strong>Class \${esc(student.class || "-")}-\${esc(student.section || "-")} | Active books: \${activeIssues.length}\`;\r
}\r
\r
window.focusIssueForm = () => {\r
    issueStudentIdEl.focus();\r
};\r
\r
window.showDueToday = () => {\r
    dueFilterEl.value = "due-now";\r
    statusFilterEl.value = "issued";\r
    applyIssueFilters();\r
};\r
\r
window.showOverdue = () => {\r
    dueFilterEl.value = "overdue";\r
    statusFilterEl.value = "issued";\r
    applyIssueFilters();\r
};\r
\r
window.clearLibraryFilters = () => {\r
    issueSearchEl.value = "";\r
    statusFilterEl.value = "all";\r
    issueAgeFilterEl.value = "";\r
    dueFilterEl.value = "all";\r
    filteredIssues = [...issues];\r
    renderIssues();\r
};\r
\r
issueSearchEl.addEventListener("input", applyIssueFilters);\r
statusFilterEl.addEventListener("change", applyIssueFilters);\r
issueAgeFilterEl.addEventListener("input", applyIssueFilters);\r
dueFilterEl.addEventListener("change", applyIssueFilters);\r
`},{attributes:{src:"library-portal.js"},text:""},{attributes:{type:"module",src:"access-control.js"},text:""},{attributes:{src:"schoolix-polish.js"},text:""}]};export{e as default};
