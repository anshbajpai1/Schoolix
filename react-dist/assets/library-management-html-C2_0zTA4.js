const r={file:"library-management.html",title:"Library Management - Schoolix",htmlClass:"",bodyClass:"",body:`\r
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
    <!-- Header -->\r
    <div class="card">\r
        <div class="header-row">\r
            <div>\r
                <h1>Library Staff Management</h1>\r
                <p class="muted">Create and manage librarian accounts.</p>\r
            </div>\r
        </div>\r
    </div>\r
\r
    <!-- Add Librarian -->\r
    <div class="card">\r
        <h2 class="section-icon">\r
            <svg viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\r
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>\r
            </svg>\r
            Add Librarian\r
        </h2>\r
        <form id="addLibrarianForm">\r
            <div class="form-grid">\r
                <input type="text" id="librarianName" placeholder="Librarian Name" required>\r
                <input type="email" id="librarianEmail" placeholder="Librarian Email" required>\r
                <input type="password" id="librarianPassword" placeholder="Set Password" required minlength="6">\r
                <button type="submit" class="primary-btn">Create Librarian Account</button>\r
            </div>\r
        </form>\r
    </div>\r
\r
    <!-- Librarians List -->\r
    <div class="card">\r
        <h2 class="section-icon">\r
            <svg viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\r
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>\r
            </svg>\r
            Librarians List\r
        </h2>\r
        <div id="librarianList"></div>\r
    </div>\r
\r
<script src="school-branding.js"><\/script>\r
<script type="module">\r
import { initializeApp } from "./firebase-compat.js";\r
import {\r
    getAuth,\r
    createUserWithEmailAndPassword,\r
    onAuthStateChanged,\r
    signOut\r
} from "./firebase-compat.js";\r
import {\r
    getFirestore,\r
    doc,\r
    setDoc,\r
    getDoc,\r
    getDocs,\r
    collection,\r
    deleteDoc,\r
    serverTimestamp,\r
    query,\r
    where\r
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
\r
// Secondary app instance for creating new users without affecting admin session\r
const staffCreatorApp = initializeApp(firebaseConfig, "staffCreatorApp");\r
const staffCreatorAuth = getAuth(staffCreatorApp);\r
\r
const librarianForm = document.getElementById("addLibrarianForm");\r
const librarianListEl = document.getElementById("librarianList");\r
let adminUID = null;\r
\r
onAuthStateChanged(auth, async (user) => {\r
    if (!user) {\r
        window.location.href = "#/index.html";\r
        return;\r
    }\r
\r
    const userDoc = await getDoc(doc(db, "users", user.uid));\r
    if (!userDoc.exists() || userDoc.data().role !== "admin") {\r
        alert("Access denied. Only admin can manage staff.");\r
        window.location.href = "#/index.html";\r
        return;\r
    }\r
\r
    adminUID = user.uid;\r
    loadStaff("librarian", librarianListEl);\r
});\r
\r
// ── Librarian form ──────────────────────────────────────────\r
librarianForm.addEventListener("submit", async (e) => {\r
    e.preventDefault();\r
    await createStaff(\r
        "librarian",\r
        document.getElementById("librarianName").value.trim(),\r
        document.getElementById("librarianEmail").value.trim().toLowerCase(),\r
        document.getElementById("librarianPassword").value.trim(),\r
        librarianForm\r
    );\r
});\r
\r
// ── Shared create function ───────────────────────────────────\r
async function createStaff(role, name, email, password, formEl) {\r
    const submitBtn = formEl.querySelector("button[type='submit']");\r
    const originalText = submitBtn.textContent;\r
    if (!name || !email || !password) {\r
        alert("Please fill all fields.");\r
        return;\r
    }\r
    try {\r
        submitBtn.disabled = true;\r
        submitBtn.textContent = "Creating...";\r
        const userCred = await createUserWithEmailAndPassword(staffCreatorAuth, email, password);\r
        const uid = userCred.user.uid;\r
\r
        await setDoc(doc(db, "users", uid), {\r
            name,\r
            email,\r
            role,\r
            adminId: adminUID,\r
            schoolId: adminUID,\r
            createdAt: serverTimestamp(),\r
            updatedAt: serverTimestamp()\r
        });\r
\r
        alert(\`\${capitalize(role)} account created successfully.\`);
        formEl.reset();\r
\r
        await loadStaff("librarian", librarianListEl);\r
    } catch (error) {\r
        alert(error.message);\r
    } finally {\r
        submitBtn.disabled = false;\r
        submitBtn.textContent = originalText;\r
    }\r
}\r
\r
// ── Shared load function ─────────────────────────────────────\r
async function loadStaff(role, listEl) {\r
    if (!adminUID) return;\r
    listEl.innerHTML = \`<div class="empty">Loading \${role}s...</div>\`;\r
    try {\r
        const [adminSnap, schoolSnap] = await Promise.all([\r
            getDocs(query(collection(db, "users"), where("role", "==", role), where("adminId", "==", adminUID))),\r
            getDocs(query(collection(db, "users"), where("role", "==", role), where("schoolId", "==", adminUID)))\r
        ]);\r
        listEl.innerHTML = "";\r
        let count = 0;\r
        const seen = new Set();\r
\r
        [...adminSnap.docs, ...schoolSnap.docs].forEach((docSnap) => {\r
            if (seen.has(docSnap.id)) return;\r
            seen.add(docSnap.id);\r
            const data = docSnap.data();\r
            count++;\r
            const row = document.createElement("div");\r
            row.className = "list-item";\r
            row.innerHTML = \`\r
                <div class="list-meta">\r
                    <strong>\${data.name || "N/A"}</strong><br>\r
                    \${data.email || "N/A"}<br>\r
                    <span class="badge badge-librarian">\${capitalize(role)}</span>\r
                </div>\r
                <div class="item-actions">\r
                    <button class="secondary-btn" onclick="window.location.href='#/teacher-profile.html?id=\${docSnap.id}'">View Profile</button>\r
                    <button class="danger-btn" onclick="deleteStaff('\${docSnap.id}', '\${role}')">Delete</button>\r
                </div>\r
            \`;\r
            listEl.appendChild(row);\r
        });\r
\r
        if (count === 0) {\r
            listEl.innerHTML = \`<div class="empty">No \${role}s found.</div>\`;\r
        }\r
    } catch (error) {\r
        console.error(\`\${role} load failed:\`, error);\r
        listEl.innerHTML = \`<div class="empty">Unable to load \${role}s: \${error.message}</div>\`;\r
    }\r
}\r
\r
// ── Delete ───────────────────────────────────────────────────\r
window.deleteStaff = async (uid, role) => {\r
    if (!confirm(\`Delete \${role} record?\`)) return;\r
    await deleteDoc(doc(db, "users", uid));\r
    alert(\`\${capitalize(role)} record deleted.\`);\r
    loadStaff("librarian", librarianListEl);\r
};\r
\r
// ── Logout ───────────────────────────────────────────────────\r
window.logout = async () => {\r
    try {\r
        await signOut(auth);\r
        window.location.href = "#/index.html";\r
    } catch (error) {\r
        alert("Logout failed.");\r
    }\r
};\r
\r
function capitalize(str) {\r
    return str.charAt(0).toUpperCase() + str.slice(1);\r
}\r
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
`},{attributes:{src:"school-branding.js"},text:""},{attributes:{type:"module"},text:`\r
import { initializeApp } from "./firebase-compat.js";\r
import {\r
    getAuth,\r
    createUserWithEmailAndPassword,\r
    onAuthStateChanged,\r
    signOut\r
} from "./firebase-compat.js";\r
import {\r
    getFirestore,\r
    doc,\r
    setDoc,\r
    getDoc,\r
    getDocs,\r
    collection,\r
    deleteDoc,\r
    serverTimestamp,\r
    query,\r
    where\r
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
\r
// Secondary app instance for creating new users without affecting admin session\r
const staffCreatorApp = initializeApp(firebaseConfig, "staffCreatorApp");\r
const staffCreatorAuth = getAuth(staffCreatorApp);\r
\r
const librarianForm = document.getElementById("addLibrarianForm");\r
const librarianListEl = document.getElementById("librarianList");\r
let adminUID = null;\r
\r
onAuthStateChanged(auth, async (user) => {\r
    if (!user) {\r
        window.location.href = "#/index.html";\r
        return;\r
    }\r
\r
    const userDoc = await getDoc(doc(db, "users", user.uid));\r
    if (!userDoc.exists() || userDoc.data().role !== "admin") {\r
        alert("Access denied. Only admin can manage staff.");\r
        window.location.href = "#/index.html";\r
        return;\r
    }\r
\r
    adminUID = user.uid;\r
    loadStaff("librarian", librarianListEl);\r
});\r
\r
// ── Librarian form ──────────────────────────────────────────\r
librarianForm.addEventListener("submit", async (e) => {\r
    e.preventDefault();\r
    await createStaff(\r
        "librarian",\r
        document.getElementById("librarianName").value.trim(),\r
        document.getElementById("librarianEmail").value.trim().toLowerCase(),\r
        document.getElementById("librarianPassword").value.trim(),\r
        librarianForm\r
    );\r
});\r
\r
// ── Shared create function ───────────────────────────────────\r
async function createStaff(role, name, email, password, formEl) {\r
    const submitBtn = formEl.querySelector("button[type='submit']");\r
    const originalText = submitBtn.textContent;\r
    if (!name || !email || !password) {\r
        alert("Please fill all fields.");\r
        return;\r
    }\r
    try {\r
        submitBtn.disabled = true;\r
        submitBtn.textContent = "Creating...";\r
        const userCred = await createUserWithEmailAndPassword(staffCreatorAuth, email, password);\r
        const uid = userCred.user.uid;\r
\r
        await setDoc(doc(db, "users", uid), {\r
            name,\r
            email,\r
            role,\r
            adminId: adminUID,\r
            schoolId: adminUID,\r
            createdAt: serverTimestamp(),\r
            updatedAt: serverTimestamp()\r
        });\r
\r
        alert(\`\${capitalize(role)} account created successfully.\`);
        formEl.reset();\r
\r
        await loadStaff("librarian", librarianListEl);\r
    } catch (error) {\r
        alert(error.message);\r
    } finally {\r
        submitBtn.disabled = false;\r
        submitBtn.textContent = originalText;\r
    }\r
}\r
\r
// ── Shared load function ─────────────────────────────────────\r
async function loadStaff(role, listEl) {\r
    if (!adminUID) return;\r
    listEl.innerHTML = \`<div class="empty">Loading \${role}s...</div>\`;\r
    try {\r
        const [adminSnap, schoolSnap] = await Promise.all([\r
            getDocs(query(collection(db, "users"), where("role", "==", role), where("adminId", "==", adminUID))),\r
            getDocs(query(collection(db, "users"), where("role", "==", role), where("schoolId", "==", adminUID)))\r
        ]);\r
        listEl.innerHTML = "";\r
        let count = 0;\r
        const seen = new Set();\r
\r
        [...adminSnap.docs, ...schoolSnap.docs].forEach((docSnap) => {\r
            if (seen.has(docSnap.id)) return;\r
            seen.add(docSnap.id);\r
            const data = docSnap.data();\r
            count++;\r
            const row = document.createElement("div");\r
            row.className = "list-item";\r
            row.innerHTML = \`\r
                <div class="list-meta">\r
                    <strong>\${data.name || "N/A"}</strong><br>\r
                    \${data.email || "N/A"}<br>\r
                    <span class="badge badge-librarian">\${capitalize(role)}</span>\r
                </div>\r
                <div class="item-actions">\r
                    <button class="secondary-btn" onclick="window.location.href='#/teacher-profile.html?id=\${docSnap.id}'">View Profile</button>\r
                    <button class="danger-btn" onclick="deleteStaff('\${docSnap.id}', '\${role}')">Delete</button>\r
                </div>\r
            \`;\r
            listEl.appendChild(row);\r
        });\r
\r
        if (count === 0) {\r
            listEl.innerHTML = \`<div class="empty">No \${role}s found.</div>\`;\r
        }\r
    } catch (error) {\r
        console.error(\`\${role} load failed:\`, error);\r
        listEl.innerHTML = \`<div class="empty">Unable to load \${role}s: \${error.message}</div>\`;\r
    }\r
}\r
\r
// ── Delete ───────────────────────────────────────────────────\r
window.deleteStaff = async (uid, role) => {\r
    if (!confirm(\`Delete \${role} record?\`)) return;\r
    await deleteDoc(doc(db, "users", uid));\r
    alert(\`\${capitalize(role)} record deleted.\`);\r
    loadStaff("librarian", librarianListEl);\r
};\r
\r
// ── Logout ───────────────────────────────────────────────────\r
window.logout = async () => {\r
    try {\r
        await signOut(auth);\r
        window.location.href = "#/index.html";\r
    } catch (error) {\r
        alert("Logout failed.");\r
    }\r
};\r
\r
function capitalize(str) {\r
    return str.charAt(0).toUpperCase() + str.slice(1);\r
}\r
`},{attributes:{type:"module",src:"access-control.js"},text:""},{attributes:{src:"schoolix-polish.js"},text:""},{attributes:{src:"admin-shell.js?v=navbar-20260721"},text:""}]};export{r as default};
