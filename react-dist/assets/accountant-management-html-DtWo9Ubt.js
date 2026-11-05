const n={file:"accountant-management.html",title:"Accountant Management - Schoolix",htmlClass:"",bodyClass:"",body:`\r
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
        <div class="card">\r
            <div class="header-row">\r
                <div>\r
                    <h1>Accountant Management</h1>\r
                    <p class="muted">Create and manage accountant portal logins.</p>\r
                </div>\r
                <div class="actions">\r
                    <button class="back-btn" onclick="window.location.href='#/admin-dashboard.html'">Dashboard</button>\r
                </div>\r
            </div>\r
        </div>\r
\r
        <div class="card">\r
            <h2 class="section-icon">\r
                <svg viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2" stroke-linecap="round"\r
                    stroke-linejoin="round">\r
                    <path d="M3 3h18v18H3z" />\r
                    <path d="M7 7h10" />\r
                    <path d="M7 11h10" />\r
                    <path d="M7 15h4" />\r
                </svg>\r
                Add Accountant\r
            </h2>\r
            <form id="addAccountantForm">\r
                <div class="form-grid">\r
                    <input type="text" id="accountantName" placeholder="Accountant Name" required>\r
                    <input type="email" id="accountantEmail" placeholder="Accountant Email" required>\r
                    <input type="password" id="accountantPassword" placeholder="Set Password" required minlength="6">\r
                    <button type="submit" class="primary-btn">Create Accountant Account</button>\r
                </div>\r
            </form>\r
        </div> \r
\r
        <div class="card">\r
            <h2 class="section-icon">\r
                <svg viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2" stroke-linecap="round"\r
                    stroke-linejoin="round">\r
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />\r
                    <circle cx="9" cy="7" r="4" />\r
                    <path d="M22 11h-6" />\r
                    <path d="M19 8v6" />\r
                </svg>\r
                Accountants List\r
            </h2>\r
            <div id="accountantList"></div>\r
        </div>\r
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
        const accountantCreatorApp = initializeApp(firebaseConfig, "accountantCreatorApp");\r
        const accountantCreatorAuth = getAuth(accountantCreatorApp);\r
\r
        const accountantForm = document.getElementById("addAccountantForm");\r
        const accountantListEl = document.getElementById("accountantList");\r
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
                alert("Access denied. Only admin can manage accountants.");\r
                window.location.href = "#/index.html";\r
                return;\r
            }\r
\r
            adminUID = user.uid;\r
            loadAccountants();\r
        });\r
\r
        accountantForm.addEventListener("submit", async (e) => {\r
            e.preventDefault();\r
            const submitBtn = accountantForm.querySelector("button[type='submit']");\r
            const originalText = submitBtn.textContent;\r
            const name = document.getElementById("accountantName").value.trim();\r
            const email = document.getElementById("accountantEmail").value.trim().toLowerCase();\r
            const password = document.getElementById("accountantPassword").value.trim();\r
            if (!name || !email || !password) {\r
                alert("Please fill all fields.");\r
                return;\r
            }\r
\r
            try {\r
                submitBtn.disabled = true;\r
                submitBtn.textContent = "Creating...";\r
                const userCred = await createUserWithEmailAndPassword(accountantCreatorAuth, email, password);\r
                const uid = userCred.user.uid;\r
                await setDoc(doc(db, "users", uid), {\r
                    name,\r
                    email,\r
                    role: "accountant",\r
                    adminId: adminUID,\r
                    schoolId: adminUID,\r
                    createdAt: serverTimestamp(),\r
                    updatedAt: serverTimestamp()\r
                });\r
                await signOut(accountantCreatorAuth).catch(() => { });\r
                alert("Accountant account created successfully.");\r
                accountantForm.reset();\r
                await loadAccountants();\r
            } catch (error) {\r
                alert(error.message);\r
            } finally {\r
                submitBtn.disabled = false;\r
                submitBtn.textContent = originalText;\r
            }\r
        });\r
\r
        async function loadAccountants() {\r
            if (!adminUID) return;\r
            accountantListEl.innerHTML = \`<div class="empty">Loading accountants...</div>\`;\r
            try {\r
                const [adminSnap, schoolSnap] = await Promise.all([\r
                    getDocs(query(collection(db, "users"), where("role", "==", "accountant"), where("adminId", "==", adminUID))),\r
                    getDocs(query(collection(db, "users"), where("role", "==", "accountant"), where("schoolId", "==", adminUID)))\r
                ]);\r
                accountantListEl.innerHTML = "";\r
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
                    <span class="badge">Accountant</span>\r
                </div>\r
                <div class="item-actions">\r
                    <button class="secondary-btn" onclick="window.location.href='#/teacher-profile.html?id=\${docSnap.id}'">View Profile</button>\r
                    <button class="danger-btn" onclick="deleteAccountant('\${docSnap.id}')">Delete</button>\r
                </div>\r
            \`;\r
                    accountantListEl.appendChild(row);\r
                });\r
\r
                if (count === 0) {\r
                    accountantListEl.innerHTML = \`<div class="empty">No accountants found.</div>\`;\r
                }\r
            } catch (error) {\r
                console.error("Accountants load failed:", error);\r
                accountantListEl.innerHTML = \`<div class="empty">Unable to load accountants: \${error.message}</div>\`;\r
            }\r
        }\r
\r
        window.deleteAccountant = async (uid) => {\r
            if (!confirm("Delete accountant record?")) return;\r
            await deleteDoc(doc(db, "users", uid));\r
            alert("Accountant record deleted.");\r
            loadAccountants();\r
        };\r
\r
        window.logout = async () => {\r
            try {\r
                await signOut(auth);\r
                window.location.href = "#/index.html";\r
            } catch (error) {\r
                alert("Logout failed.");\r
            }\r
        };\r
    <\/script>\r
    <script type="module" src="access-control.js"><\/script>\r
    <script src="schoolix-polish.js" defer><\/script>\r
    <script src="admin-shell.js?v=navbar-20260721" defer><\/script>\r
`,styles:[{tag:"style",attributes:{id:"sxCriticalLoaderStyle"},text:`\r
        html.sx-page-loading,\r
        html.sx-page-loading body {\r
            min-height: 100%;\r
            background: #f8fafc !important;\r
        }\r
\r
        html.sx-page-loading body::before,\r
        html.sx-page-loading body::after {\r
            visibility: hidden !important;\r
        }\r
\r
        html.sx-page-loading body> :not(#sxPageLoader):not(script):not(style) {\r
            visibility: hidden !important;\r
        }\r
\r
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
\r
        .sx-page-loader.is-hidden {\r
            opacity: 0;\r
            visibility: hidden;\r
            pointer-events: none;\r
        }\r
\r
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
\r
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
                } catch (_) { }\r
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
        const accountantCreatorApp = initializeApp(firebaseConfig, "accountantCreatorApp");\r
        const accountantCreatorAuth = getAuth(accountantCreatorApp);\r
\r
        const accountantForm = document.getElementById("addAccountantForm");\r
        const accountantListEl = document.getElementById("accountantList");\r
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
                alert("Access denied. Only admin can manage accountants.");\r
                window.location.href = "#/index.html";\r
                return;\r
            }\r
\r
            adminUID = user.uid;\r
            loadAccountants();\r
        });\r
\r
        accountantForm.addEventListener("submit", async (e) => {\r
            e.preventDefault();\r
            const submitBtn = accountantForm.querySelector("button[type='submit']");\r
            const originalText = submitBtn.textContent;\r
            const name = document.getElementById("accountantName").value.trim();\r
            const email = document.getElementById("accountantEmail").value.trim().toLowerCase();\r
            const password = document.getElementById("accountantPassword").value.trim();\r
            if (!name || !email || !password) {\r
                alert("Please fill all fields.");\r
                return;\r
            }\r
\r
            try {\r
                submitBtn.disabled = true;\r
                submitBtn.textContent = "Creating...";\r
                const userCred = await createUserWithEmailAndPassword(accountantCreatorAuth, email, password);\r
                const uid = userCred.user.uid;\r
                await setDoc(doc(db, "users", uid), {\r
                    name,\r
                    email,\r
                    role: "accountant",\r
                    adminId: adminUID,\r
                    schoolId: adminUID,\r
                    createdAt: serverTimestamp(),\r
                    updatedAt: serverTimestamp()\r
                });\r
                await signOut(accountantCreatorAuth).catch(() => { });\r
                alert("Accountant account created successfully.");\r
                accountantForm.reset();\r
                await loadAccountants();\r
            } catch (error) {\r
                alert(error.message);\r
            } finally {\r
                submitBtn.disabled = false;\r
                submitBtn.textContent = originalText;\r
            }\r
        });\r
\r
        async function loadAccountants() {\r
            if (!adminUID) return;\r
            accountantListEl.innerHTML = \`<div class="empty">Loading accountants...</div>\`;\r
            try {\r
                const [adminSnap, schoolSnap] = await Promise.all([\r
                    getDocs(query(collection(db, "users"), where("role", "==", "accountant"), where("adminId", "==", adminUID))),\r
                    getDocs(query(collection(db, "users"), where("role", "==", "accountant"), where("schoolId", "==", adminUID)))\r
                ]);\r
                accountantListEl.innerHTML = "";\r
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
                    <span class="badge">Accountant</span>\r
                </div>\r
                <div class="item-actions">\r
                    <button class="secondary-btn" onclick="window.location.href='#/teacher-profile.html?id=\${docSnap.id}'">View Profile</button>\r
                    <button class="danger-btn" onclick="deleteAccountant('\${docSnap.id}')">Delete</button>\r
                </div>\r
            \`;\r
                    accountantListEl.appendChild(row);\r
                });\r
\r
                if (count === 0) {\r
                    accountantListEl.innerHTML = \`<div class="empty">No accountants found.</div>\`;\r
                }\r
            } catch (error) {\r
                console.error("Accountants load failed:", error);\r
                accountantListEl.innerHTML = \`<div class="empty">Unable to load accountants: \${error.message}</div>\`;\r
            }\r
        }\r
\r
        window.deleteAccountant = async (uid) => {\r
            if (!confirm("Delete accountant record?")) return;\r
            await deleteDoc(doc(db, "users", uid));\r
            alert("Accountant record deleted.");\r
            loadAccountants();\r
        };\r
\r
        window.logout = async () => {\r
            try {\r
                await signOut(auth);\r
                window.location.href = "#/index.html";\r
            } catch (error) {\r
                alert("Logout failed.");\r
            }\r
        };\r
    `},{attributes:{type:"module",src:"access-control.js"},text:""},{attributes:{src:"schoolix-polish.js"},text:""},{attributes:{src:"admin-shell.js?v=navbar-20260721"},text:""}]};export{n as default};
