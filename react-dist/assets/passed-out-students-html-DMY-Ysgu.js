const e={file:"passed-out-students.html",title:"Passed Out Students - Schoolix",htmlClass:"",bodyClass:"",body:`\r
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
    <div class="top-bar">\r
      <div class="top-bar-left">\r
        <div class="icon-badge">\r
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">\r
            <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />\r
          </svg>\r
        </div>\r
        <div>\r
          <div class="eyebrow">\r
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">\r
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />\r
            </svg>\r
            Read Only Archive\r
          </div>\r
          <h1>Passed Out Students</h1>\r
          <p class="subtitle">Class 12 passout aur TC issued students ka year-wise permanent view</p>\r
        </div>\r
      </div>\r
      <div class="actions">\r
        <a href="#/students.html" class="btn btn-secondary">\r
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">\r
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />\r
          </svg>\r
          Active Students\r
        </a>\r
        <a href="#/admin-dashboard.html" class="btn btn-primary">\r
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">\r
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />\r
          </svg>\r
          Dashboard\r
        </a>\r
      </div>\r
    </div>\r
\r
    <div class="panel">\r
      <div class="filters">\r
        <div class="filter-group">\r
          <label>\r
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">\r
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />\r
            </svg>\r
            Search\r
          </label>\r
          <div class="input-wrapper">\r
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">\r
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />\r
            </svg>\r
            <input type="text" id="searchInput" placeholder="Search by name, ID, phone, email..." oninput="applyFilters()">\r
          </div>\r
        </div>\r
        <div class="filter-group">\r
          <label>\r
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">\r
              <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />\r
            </svg>\r
            Passout Year\r
          </label>\r
          <select id="yearFilter" onchange="applyFilters()">\r
            <option value="">All Years</option>\r
          </select>\r
        </div>\r
        <div class="filter-group">\r
          <label>\r
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">\r
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />\r
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6z" />\r
            </svg>\r
            Status\r
          </label>\r
          <select id="statusFilter" onchange="applyFilters()">\r
            <option value="">All Status</option>\r
            <option value="Passed Out">Passed Out</option>\r
            <option value="TC Issued">TC Issued</option>\r
          </select>\r
        </div>\r
        <button class="btn btn-secondary" onclick="resetFilters()">\r
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">\r
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />\r
          </svg>\r
          Reset\r
        </button>\r
      </div>\r
    </div>\r
\r
    <div class="stats" id="statsGrid">\r
      <!-- Stats populated by JS -->\r
    </div>\r
\r
    <div class="table-wrap">\r
      <div class="head">\r
        <div>\r
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">\r
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />\r
          </svg>\r
          Student\r
        </div>\r
        <div>\r
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">\r
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />\r
          </svg>\r
          ID / Roll\r
        </div>\r
        <div>\r
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">\r
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />\r
          </svg>\r
          SR No.\r
        </div>\r
        <div>\r
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">\r
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" />\r
          </svg>\r
          Final Class\r
        </div>\r
        <div>\r
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">\r
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />\r
          </svg>\r
          Phone\r
        </div>\r
        <div>\r
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">\r
            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />\r
          </svg>\r
          Year\r
        </div>\r
        <div>\r
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">\r
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />\r
          </svg>\r
          Status\r
        </div>\r
        <div>Action</div>\r
      </div>\r
      <div id="studentsList">\r
        <div class="loading-state">\r
          <div class="loading-spinner"></div>\r
          Loading passed out students...\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
\r
  <!-- Detail Modal -->\r
  <div class="modal" id="detailModal">\r
    <div class="modal-card">\r
      <div class="modal-head">\r
        <div>\r
          <h2 id="modalTitle">\r
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">\r
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />\r
            </svg>\r
            Student Details\r
          </h2>\r
          <p>\r
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">\r
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />\r
            </svg>\r
            View only record. Editing is disabled for archived students.\r
          </p>\r
        </div>\r
        <button class="btn-close" onclick="closeDetails()">\r
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">\r
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />\r
          </svg>\r
          Close\r
        </button>\r
      </div>\r
      <div class="modal-body" id="modalBody">\r
        <!-- Modal content populated by JS -->\r
      </div>\r
    </div>\r
  </div>\r
\r
  <script type="module">\r
    import { initializeApp } from "./firebase-compat.js";\r
    import { getFirestore, collection, getDocs } from "./firebase-compat.js";\r
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
    let currentUser = null;\r
    let allArchived = [];\r
    let filteredArchived = [];\r
    let activeDetailStudent = null;\r
\r
    const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({\r
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"\r
    }[char]));\r
    const val = (value) => value === undefined || value === null || value === "" ? "N/A" : value;\r
    const phoneOf = (s = {}) => s.fatherPhone || s.fatherMobile || s.motherPhone || s.motherMobile || s.phone || "";\r
    const finalClassOf = (s = {}) => [s.finalClass || s.class, s.finalSection || s.section].filter(Boolean).join("-") || "N/A";\r
    const recordCount = (s = {}, key) => Array.isArray(s.records?.[key]) ? s.records[key].length : 0;\r
    const monthOrder = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];\r
    const formatCurrency = (value = 0) => \`₹\${Number(value || 0).toLocaleString("en-IN")}\`;\r
\r
    function archiveStatus(student = {}) {\r
      return student.status || (student.tcIssued ? "TC Issued" : "Passed Out");\r
    }\r
\r
    function archiveStatusText(student = {}) {\r
      const base = archiveStatus(student);\r
      return student.tcIssued && base !== "TC Issued" ? \`\${base} + TC Issued\` : base;\r
    }\r
\r
    function archiveStatusPills(student = {}) {\r
      const base = archiveStatus(student);\r
      const academicLabel = base === "TC Issued" && !student.passoutYear ? "TC Only" : base;\r
      const academicClass = academicLabel === "Passed Out" ? "promoted" : "neutral";\r
      const tcLabel = student.tcIssued ? "TC Issued" : "TC Not Issued";\r
      const tcClass = student.tcIssued ? "tc" : "neutral";\r
      const checkIcon = \`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>\`;\r
      return \`\r
        <div class="status-panel">\r
          <div class="status-line">\r
            <span class="status-label">Academic</span>\r
            <span class="pill \${academicClass}">\${academicLabel === "Passed Out" ? checkIcon : ""}\${esc(academicLabel)}</span>\r
          </div>\r
          <div class="status-line">\r
            <span class="status-label">TC</span>\r
            <span class="pill \${tcClass}">\${student.tcIssued ? checkIcon : ""}\${esc(tcLabel)}</span>\r
          </div>\r
        </div>\r
      \`;\r
    }\r
\r
    function toDate(value) {\r
      if (!value) return null;\r
      if (value?.toDate) return value.toDate();\r
      if (value?.seconds) return new Date(value.seconds * 1000);\r
      if (value instanceof Date) return value;\r
      const date = new Date(value);\r
      return Number.isNaN(date.getTime()) ? null : date;\r
    }\r
\r
    function formatDate(value) {\r
      const date = toDate(value);\r
      return date ? date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : val(value);\r
    }\r
\r
    function getMonthName(value) {\r
      if (monthOrder.includes(value)) return value;\r
      const date = toDate(value);\r
      return date ? monthOrder[date.getMonth()] : "Other";\r
    }\r
\r
    function getYearValue(value, fallback = "") {\r
      const date = toDate(value);\r
      if (date) return String(date.getFullYear());\r
      const years = String(value || fallback || "").match(/\\b(20\\d{2}|19\\d{2})\\b/g);\r
      return years?.length ? years[years.length - 1] : "No Year";\r
    }\r
\r
    function getSessionLabel(record = {}, fallback = "No Session") {\r
      return record.session || record.academicSession || record.currentYear || record.sessionName || record.sessionId || fallback;\r
    }\r
\r
    function getFeeAmounts(fee = {}) {\r
      const total = Number(fee.originalAmount ?? fee.amount ?? 0);\r
      const applied = Array.isArray(fee.payments)\r
        ? fee.payments.reduce((sum, payment) => sum + Number(payment.appliedAmount ?? payment.amount ?? 0), 0)\r
        : Number(fee.totalPaidAmount ?? fee.paidAmount ?? 0);\r
      const extra = Number(fee.totalExtraPaidAmount ?? fee.extraAmount ?? 0);\r
      const collected = Number(fee.totalCollectedAmount ?? applied + extra);\r
      const due = Number.isFinite(Number(fee.remainingAmount))\r
        ? Number(fee.remainingAmount)\r
        : Math.max(0, total - applied);\r
      return { total, applied, extra, collected, due: Math.max(0, due) };\r
    }\r
\r
    function statusClass(value = "") {\r
      const text = String(value).toLowerCase();\r
      if (text.includes("present") || text === "paid") return "paid present";\r
      if (text.includes("half") || text.includes("partial")) return "partial half";\r
      if (text.includes("absent") || text.includes("unpaid") || text.includes("imposed") || text.includes("pending")) return "due absent";\r
      return "";\r
    }\r
\r
    function groupBy(records, getKey) {\r
      return records.reduce((map, record) => {\r
        const key = getKey(record);\r
        if (!map.has(key)) map.set(key, []);\r
        map.get(key).push(record);\r
        return map;\r
      }, new Map());\r
    }\r
\r
    function sortMonthKeys(keys) {\r
      return [...keys].sort((a, b) => {\r
        const [yearA, monthA] = a.split("::");\r
        const [yearB, monthB] = b.split("::");\r
        const yearDiff = Number(yearB || 0) - Number(yearA || 0);\r
        if (yearDiff) return yearDiff;\r
        return monthOrder.indexOf(monthA) - monthOrder.indexOf(monthB);\r
      });\r
    }\r
\r
    function uniqueOptions(records, getKey) {\r
      return [...new Set(records.map(getKey).filter(Boolean))];\r
    }\r
\r
    function monthKeyForRecord(record = {}) {\r
      const source = record.date || record.timestamp || record.createdAt || record.updatedAt || record.month;\r
      return \`\${getYearValue(source, getSessionLabel(record))}::\${getMonthName(record.month || source)}\`;\r
    }\r
\r
    function renderSelectOptions(values, placeholder) {\r
      return \`<option value="">\${esc(placeholder)}</option>\${values.map((value) => \`<option value="\${esc(value)}">\${esc(value.replace("::", " - "))}</option>\`).join("")}\`;\r
    }\r
\r
    function getReportTermKey(report = {}) {\r
      return report.termLabel || report.term || report.termKey || report.examName || report.title || "Untitled Term";\r
    }\r
\r
    function renderReportControls(type, student = {}) {\r
      const records = Array.isArray(student.records?.[type]) ? student.records[type] : [];\r
      if (!records.length) return '<div class="report-empty">No archived records found for this student.</div>';\r
      const sessions = uniqueOptions(records, getSessionLabel).sort();\r
      if (type === "reportCards") {\r
        const terms = uniqueOptions(records, getReportTermKey).sort();\r
        return \`\r
          <div class="report-controls">\r
            <div class="filter-group">\r
              <label>Result Session</label>\r
              <select id="\${type}SessionFilter" onchange="renderArchivedReport('\${type}')">\r
                \${renderSelectOptions(sessions, "Select session")}\r
              </select>\r
            </div>\r
            <div class="filter-group">\r
              <label>Result Term</label>\r
              <select id="\${type}TermFilter" onchange="renderArchivedReport('\${type}')">\r
                \${renderSelectOptions(terms, "Select term")}\r
              </select>\r
            </div>\r
          </div>\r
          <div id="\${type}ReportOutput" class="report-empty">Select session and term to view result history.</div>\r
        \`;\r
      }\r
      const months = sortMonthKeys(uniqueOptions(records, monthKeyForRecord));\r
      const title = type === "attendance" ? "Attendance History" : "Payment History";\r
      return \`\r
        <div class="report-controls">\r
          <div class="filter-group">\r
            <label>\${title} Session</label>\r
            <select id="\${type}SessionFilter" onchange="renderArchivedReport('\${type}')">\r
              \${renderSelectOptions(sessions, "Select session")}\r
            </select>\r
          </div>\r
          <div class="filter-group">\r
            <label>\${title} Month</label>\r
            <select id="\${type}MonthFilter" onchange="renderArchivedReport('\${type}')">\r
              \${renderSelectOptions(months, "Select month")}\r
            </select>\r
          </div>\r
        </div>\r
        <div id="\${type}ReportOutput" class="report-empty">Select session and month to view \${title.toLowerCase()}.</div>\r
      \`;\r
    }\r
\r
    window.renderArchivedReport = (type) => {\r
      if (!activeDetailStudent) return;\r
      const output = document.getElementById(\`\${type}ReportOutput\`);\r
      const selectedSession = document.getElementById(\`\${type}SessionFilter\`)?.value || "";\r
      if (type === "reportCards") {\r
        const selectedTerm = document.getElementById(\`\${type}TermFilter\`)?.value || "";\r
        if (!output) return;\r
        if (!selectedSession || !selectedTerm) {\r
          output.className = "report-empty";\r
          output.innerHTML = "Select session and term to view result history.";\r
          return;\r
        }\r
        const records = (activeDetailStudent.records?.reportCards || []).filter((record) =>\r
          getSessionLabel(record) === selectedSession && getReportTermKey(record) === selectedTerm\r
        );\r
        output.className = "";\r
        output.innerHTML = renderResultTable(records);\r
        return;\r
      }\r
      const selectedMonth = document.getElementById(\`\${type}MonthFilter\`)?.value || "";\r
      if (!output) return;\r
      if (!selectedSession || !selectedMonth) {\r
        output.className = "report-empty";\r
        output.innerHTML = \`Select session and month to view \${type === "attendance" ? "attendance history" : "payment history"}.\`;\r
        return;\r
      }\r
      const records = (activeDetailStudent.records?.[type] || []).filter((record) =>\r
        getSessionLabel(record) === selectedSession && monthKeyForRecord(record) === selectedMonth\r
      );\r
      output.className = "";\r
      output.innerHTML = type === "attendance" ? renderAttendanceTable(records, selectedMonth) : renderFeesTable(records, selectedMonth);\r
    };\r
\r
    function renderAttendanceTable(records = [], selectedMonth = "") {\r
      if (!records.length) return '<div class="report-empty">No attendance found for selected session and month.</div>';\r
      const [year, month] = selectedMonth.split("::");\r
      const sorted = records.sort((a, b) => (toDate(a.date || a.timestamp || a.createdAt) || 0) - (toDate(b.date || b.timestamp || b.createdAt) || 0));\r
      const counts = sorted.reduce((summary, record) => {\r
        const status = String(record.status || "Not Marked");\r
        if (status === "Present") summary.present += 1;\r
        else if (status === "Absent") summary.absent += 1;\r
        else if (status === "Half Day") summary.half += 1;\r
        else summary.other += 1;\r
        return summary;\r
      }, { present: 0, absent: 0, half: 0, other: 0 });\r
      const marked = counts.present + counts.absent + counts.half + counts.other;\r
      const percentage = marked ? Math.round(((counts.present + counts.half * 0.5) / marked) * 100) : 0;\r
      return \`\r
        <div class="report-section">\r
          <div class="report-head">\r
            <span>\${esc(month)} \${esc(year)}</span>\r
            <span>Present \${counts.present} | Half \${counts.half} | Absent \${counts.absent} | Attendance \${percentage}%</span>\r
          </div>\r
          <table class="report-table">\r
            <thead>\r
              <tr><th>Date</th><th>Status</th><th>Class</th><th>Marked By</th><th>Remarks</th></tr>\r
            </thead>\r
            <tbody>\r
              \${sorted.map((record) => \`\r
                <tr>\r
                  <td>\${esc(formatDate(record.date || record.timestamp || record.createdAt))}</td>\r
                  <td><span class="status-chip \${statusClass(record.status)}">\${esc(record.status || "Not Marked")}</span></td>\r
                  <td>\${esc([record.class, record.section].filter(Boolean).join("-") || "N/A")}</td>\r
                  <td>\${esc(record.markedBy || record.markedByRole || "N/A")}</td>\r
                  <td>\${esc(record.remarks || record.note || "")}</td>\r
                </tr>\r
              \`).join("")}\r
            </tbody>\r
          </table>\r
        </div>\r
      \`;\r
    }\r
\r
    function renderFeesTable(records = [], selectedMonth = "") {\r
      if (!records.length) return '<div class="report-empty">No fee/payment history found for selected session and month.</div>';\r
      const [year, month] = selectedMonth.split("::");\r
      const sorted = records.sort((a, b) => (toDate(a.date || a.createdAt) || 0) - (toDate(b.date || b.createdAt) || 0));\r
      const totals = sorted.reduce((sum, fee) => {\r
        const amount = getFeeAmounts(fee);\r
        sum.assigned += amount.total;\r
        sum.applied += amount.applied;\r
        sum.extra += amount.extra;\r
        sum.due += amount.due;\r
        return sum;\r
      }, { assigned: 0, applied: 0, extra: 0, due: 0 });\r
      return \`\r
        <div class="report-section">\r
          <div class="report-head">\r
            <span>\${esc(month)} \${esc(year)}</span>\r
            <span>Assigned \${formatCurrency(totals.assigned)} | Paid \${formatCurrency(totals.applied)} | Due \${formatCurrency(totals.due)}</span>\r
          </div>\r
          <table class="report-table">\r
            <thead>\r
              <tr><th>Month</th><th>Assigned</th><th>Paid / Applied</th><th>Extra</th><th>Due</th><th>Status</th><th>Payments</th></tr>\r
            </thead>\r
            <tbody>\r
              \${sorted.map((fee) => {\r
                const amount = getFeeAmounts(fee);\r
                const payments = Array.isArray(fee.payments) && fee.payments.length\r
                  ? fee.payments.map((payment) => \`\${esc(formatDate(payment.date))}: \${formatCurrency(payment.receivedAmount ?? payment.fullAmount ?? payment.amount ?? 0)} received, \${formatCurrency(payment.appliedAmount ?? payment.amount ?? 0)} applied\`).join("<br>")\r
                  : "No payment history";\r
                return \`\r
                  <tr>\r
                    <td>\${esc(fee.month || "N/A")}<br><small style="color:var(--slate-500)">\${esc(formatDate(fee.date || fee.createdAt || fee.updatedAt))}</small></td>\r
                    <td class="money">\${formatCurrency(amount.total)}</td>\r
                    <td class="money">\${formatCurrency(amount.applied)}</td>\r
                    <td class="money">\${formatCurrency(amount.extra)}</td>\r
                    <td class="money">\${formatCurrency(amount.due)}</td>\r
                    <td><span class="status-chip \${statusClass(fee.status)}">\${esc(fee.status || "Pending")}</span></td>\r
                    <td>\${payments}</td>\r
                  </tr>\r
                \`;\r
              }).join("")}\r
            </tbody>\r
          </table>\r
        </div>\r
      \`;\r
    }\r
\r
    function renderResultTable(records = []) {\r
      if (!records.length) return '<div class="report-empty">No result/report card found for selected session and term.</div>';\r
      const sorted = records.sort((a, b) => (toDate(b.createdAt || b.generatedAt || b.updatedAt) || 0) - (toDate(a.createdAt || a.generatedAt || a.updatedAt) || 0));\r
      return sorted.map((report) => {\r
        const subjects = Array.isArray(report.subjects) ? report.subjects : [];\r
        const totalObtained = report.totalMarks ?? report.obtainedMarks ?? subjects.reduce((sum, sub) => sum + Number(sub.obtained ?? sub.obtainedMarks ?? sub.marks ?? 0), 0);\r
        const totalMax = report.totalMaxMarks ?? report.maxMarks ?? subjects.reduce((sum, sub) => sum + Number(sub.maxMarks ?? sub.totalMarks ?? 0), 0);\r
        const percentage = report.percentage ?? (Number(totalMax) ? ((Number(totalObtained) / Number(totalMax)) * 100).toFixed(2) : "");\r
        return \`\r
          <div class="report-section">\r
            <div class="report-head">\r
              <span>\${esc(getReportTermKey(report))}</span>\r
              <span>Percentage \${esc(percentage || "N/A")}% | Grade \${esc(report.grade || "N/A")}</span>\r
            </div>\r
            <div class="detail-grid" style="padding:16px;background:var(--slate-50)">\r
              \${field("Session", getSessionLabel(report))}\r
              \${field("Generated", formatDate(report.createdAt || report.generatedAt || report.updatedAt))}\r
              \${field("Total Marks", \`\${totalObtained || "N/A"} / \${totalMax || "N/A"}\`)}\r
              \${field("Rank", report.rank)}\r
              \${field("Remarks", report.remarks || report.teacherRemarks || report.resultRemarks)}\r
            </div>\r
            <table class="report-table">\r
              <thead>\r
                <tr><th>Subject</th><th>Obtained</th><th>Max</th><th>Grade</th><th>Remarks</th></tr>\r
              </thead>\r
              <tbody>\r
                \${subjects.length ? subjects.map((sub) => \`\r
                  <tr>\r
                    <td>\${esc(sub.name || sub.subject || "Subject")}</td>\r
                    <td>\${esc(sub.obtained ?? sub.obtainedMarks ?? sub.marks ?? "N/A")}</td>\r
                    <td>\${esc(sub.maxMarks ?? sub.totalMarks ?? "N/A")}</td>\r
                    <td>\${esc(sub.grade || "N/A")}</td>\r
                    <td>\${esc(sub.remarks || "")}</td>\r
                  </tr>\r
                \`).join("") : '<tr><td colspan="5" style="text-align:center;color:var(--slate-500)">No subject details saved in this report.</td></tr>'}\r
              </tbody>\r
            </table>\r
          </div>\r
        \`;\r
      }).join("");\r
    }\r
\r
    function searchableText(student = {}) {\r
      return [\r
        student.name, student.studentName, student.studentId, student.roll, student.email,\r
        student.parentEmail, student.father, student.mother, student.fatherPhone,\r
        student.motherPhone, student.phone, student.passoutYear, student.tcNumber,\r
        student.srNumber, student.category, student.gender, student.aadharNumber,\r
        student.archiveReason, archiveStatusText(student), student.tcIssued ? "tc issued" : "tc not issued", finalClassOf(student)\r
      ].join(" ").toLowerCase();\r
    }\r
\r
    function populateYears() {\r
      const select = document.getElementById("yearFilter");\r
      const years = [...new Set(allArchived.map((s) => s.passoutYear).filter(Boolean))]\r
        .sort((a, b) => Number(b) - Number(a));\r
      select.innerHTML = '<option value="">All Years</option>' + years.map((year) => \`<option value="\${esc(year)}">\${esc(year)}</option>\`).join("");\r
    }\r
\r
    function updateStats(students = filteredArchived) {\r
      const years = new Set(students.map((s) => s.passoutYear).filter(Boolean));\r
      const tc = students.filter((s) => s.tcIssued || archiveStatus(s) === "TC Issued").length;\r
      const passed = students.filter((s) => archiveStatus(s) === "Passed Out").length;\r
      document.getElementById("statsGrid").innerHTML = \`\r
        <div class="stat">\r
          <div class="stat-header">\r
            <div class="stat-icon blue">\r
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">\r
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />\r
              </svg>\r
            </div>\r
          </div>\r
          <strong>\${students.length}</strong>\r
          <span>Visible Records</span>\r
        </div>\r
        <div class="stat">\r
          <div class="stat-header">\r
            <div class="stat-icon green">\r
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">\r
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />\r
              </svg>\r
            </div>\r
          </div>\r
          <strong>\${years.size}</strong>\r
          <span>Passout Years</span>\r
        </div>\r
        <div class="stat">\r
          <div class="stat-header">\r
            <div class="stat-icon orange">\r
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">\r
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" />\r
              </svg>\r
            </div>\r
          </div>\r
          <strong>\${passed}</strong>\r
          <span>Class 12 Passout</span>\r
        </div>\r
        <div class="stat">\r
          <div class="stat-header">\r
            <div class="stat-icon red">\r
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">\r
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />\r
              </svg>\r
            </div>\r
          </div>\r
          <strong>\${tc}</strong>\r
          <span>TC Issued</span>\r
        </div>\r
      \`;\r
    }\r
\r
    function renderStudents(students = filteredArchived) {\r
      updateStats(students);\r
      const target = document.getElementById("studentsList");\r
      if (!students.length) {\r
        target.innerHTML = \`\r
          <div class="empty">\r
            <div class="empty-icon">\r
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">\r
                <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />\r
              </svg>\r
            </div>\r
            No archived students found for selected filters.\r
          </div>\r
        \`;\r
        return;\r
      }\r
      target.innerHTML = students.map((s) => {\r
        return \`\r
          <div class="row">\r
            <div class="student-cell" data-label="Student">\r
              <div class="avatar">\r
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">\r
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />\r
                </svg>\r
              </div>\r
              <div>\r
                <div class="name">\${esc(s.name || s.studentName || "N/A")}</div>\r
                <div class="muted">\r
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">\r
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />\r
                  </svg>\r
                  \${esc(s.email || s.parentEmail || "No email")}\r
                </div>\r
              </div>\r
            </div>\r
            <div class="id-cell" data-label="ID / Roll">\r
              <span class="id-value">\${esc(s.studentId || s.id || "N/A")}</span>\r
              <span class="roll-value">\r
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">\r
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5" />\r
                </svg>\r
                Roll \${esc(s.roll || "-")}\r
              </span>\r
            </div>\r
            <div class="id-cell" data-label="SR No.">\r
              <span class="id-value">\${esc(s.srNumber || "N/A")}</span>\r
              <span class="roll-value">School record</span>\r
            </div>\r
            <div data-label="Final Class">\r
              <span class="class-badge">\r
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">\r
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" />\r
                </svg>\r
                \${esc(finalClassOf(s))}\r
              </span>\r
            </div>\r
            <div data-label="Phone">\r
              <span class="phone-value">\r
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">\r
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />\r
                </svg>\r
                \${esc(phoneOf(s) || "N/A")}\r
              </span>\r
            </div>\r
            <div data-label="Year">\r
              <span class="year-badge">\r
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">\r
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />\r
                </svg>\r
                \${esc(s.passoutYear || "N/A")}\r
              </span>\r
            </div>\r
            <div data-label="Status">\${archiveStatusPills(s)}</div>\r
            <div data-label="Action">\r
              <button class="btn-view" onclick="showDetails('\${esc(s.id)}')">\r
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">\r
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />\r
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />\r
                </svg>\r
                View\r
              </button>\r
            </div>\r
          </div>\r
        \`;\r
      }).join("");\r
    }\r
\r
    window.applyFilters = () => {\r
      const queryText = document.getElementById("searchInput").value.trim().toLowerCase();\r
      const year = document.getElementById("yearFilter").value;\r
      const status = document.getElementById("statusFilter").value;\r
      filteredArchived = allArchived.filter((student) => {\r
        const actualStatus = archiveStatus(student);\r
        const matchesSearch = !queryText || searchableText(student).includes(queryText);\r
        const matchesYear = !year || String(student.passoutYear || "") === year;\r
        const matchesStatus = !status || actualStatus === status || (status === "TC Issued" && student.tcIssued);\r
        return matchesSearch && matchesYear && matchesStatus;\r
      });\r
      renderStudents(filteredArchived);\r
    };\r
\r
    window.resetFilters = () => {\r
      document.getElementById("searchInput").value = "";\r
      document.getElementById("yearFilter").value = "";\r
      document.getElementById("statusFilter").value = "";\r
      window.applyFilters();\r
    };\r
\r
    function field(label, value, icon = "") {\r
      return \`<div class="field"><span>\${icon}\${esc(label)}</span><strong>\${esc(val(value))}</strong></div>\`;\r
    }\r
\r
    window.showDetails = (id) => {\r
      const student = allArchived.find((entry) => entry.id === id);\r
      if (!student) return;\r
      activeDetailStudent = student;\r
      const tc = student.transferCertificate || {};\r
      document.getElementById("modalTitle").innerHTML = \`\r
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">\r
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />\r
        </svg>\r
        \${esc(student.name || student.studentName || "Student")} (\${esc(student.passoutYear || "N/A")})\r
      \`;\r
      document.getElementById("modalBody").innerHTML = \`\r
        <div class="detail-grid">\r
          \${field("Name", student.name || student.studentName)}\r
          \${field("Student ID", student.studentId)}\r
          \${field("SR Number", student.srNumber)}\r
          \${field("Roll", student.roll)}\r
          \${field("Final Class", finalClassOf(student))}\r
          \${field("Passout Year", student.passoutYear)}\r
          \${field("Academic Status", archiveStatus(student))}\r
          \${field("TC Status", student.tcIssued ? "TC Issued" : "TC Not Issued")}\r
          \${field("Archive Reason", student.archiveReason)}\r
          \${field("Result %", student.resultPercentage)}\r
          \${field("Gender", student.gender)}\r
          \${field("Category", student.category)}\r
          \${field("Blood Group", student.bloodGroup)}\r
          \${field("Religion", student.religion)}\r
          \${field("Previous School", student.previousSchool)}\r
          \${field("Father", student.father)}\r
          \${field("Father Phone", student.fatherPhone || student.fatherMobile)}\r
          \${field("Father Email", student.fatherEmail)}\r
          \${field("Mother", student.mother)}\r
          \${field("Mother Phone", student.motherPhone || student.motherMobile)}\r
          \${field("Mother Email", student.motherEmail)}\r
          \${field("Phone", student.phone)}\r
          \${field("Email", student.email)}\r
          \${field("Parent Email", student.parentEmail || student.fatherEmail || student.motherEmail)}\r
          \${field("Admission Year", student.yearOfAdmission)}\r
          \${field("Admission Date", student.admissionDate || student.dateOfAdmission)}\r
          \${field("Current/Archive Session", student.currentYear || student.academicSession || student.session)}\r
          \${field("DOB", student.dob)}\r
          \${field("Aadhaar", student.aadharNumber)}\r
          \${field("Address", student.address)}\r
          \${field("Documents", student.documentList || student.documents)}\r
          \${field("Photo URL", student.photoUrl || student.imageUrl || student.profilePhotoUrl)}\r
        </div>\r
        <h3 class="section-title">\r
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">\r
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />\r
          </svg>\r
          Transfer Certificate\r
        </h3>\r
        <div class="detail-grid">\r
          \${field("TC Number", student.tcNumber || tc.tcNumber)}\r
          \${field("Leaving Date", tc.leavingDate)}\r
          \${field("Reason", tc.reason)}\r
          \${field("Conduct", tc.conduct)}\r
        </div>\r
        <h3 class="section-title">\r
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">\r
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776" />\r
          </svg>\r
          Saved Record Counts\r
        </h3>\r
        <div class="detail-grid">\r
          \${field("Attendance Records", recordCount(student, "attendance"))}\r
          \${field("Fee Records", recordCount(student, "fees"))}\r
          \${field("Report Cards", recordCount(student, "reportCards"))}\r
        </div>\r
        <h3 class="section-title">\r
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">\r
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />\r
          </svg>\r
          Attendance History\r
        </h3>\r
        \${renderReportControls("attendance", student)}\r
        <h3 class="section-title">\r
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">\r
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />\r
          </svg>\r
          Payment History\r
        </h3>\r
        \${renderReportControls("fees", student)}\r
        <h3 class="section-title">\r
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">\r
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" />\r
          </svg>\r
          Result History\r
        </h3>\r
        \${renderReportControls("reportCards", student)}\r
      \`;\r
      document.getElementById("detailModal").classList.add("open");\r
    };\r
\r
    window.closeDetails = () => {\r
      activeDetailStudent = null;\r
      document.getElementById("detailModal").classList.remove("open");\r
    };\r
\r
    async function loadArchivedStudents() {\r
      const snap = await getDocs(collection(db, "schools", currentUser.uid, "passedOutStudents"));\r
      allArchived = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))\r
        .sort((a, b) => Number(b.passoutYear || 0) - Number(a.passoutYear || 0) || String(a.name || "").localeCompare(String(b.name || "")));\r
      filteredArchived = [...allArchived];\r
      populateYears();\r
      renderStudents();\r
    }\r
\r
    onAuthStateChanged(auth, async (user) => {\r
      if (!user) {\r
        window.location.href = "#/index.html";\r
        return;\r
      }\r
      currentUser = user;\r
      try {\r
        await loadArchivedStudents();\r
      } catch (error) {\r
        console.error("Error loading passed out students:", error);\r
        document.getElementById("studentsList").innerHTML = \`\r
          <div class="empty">\r
            <div class="empty-icon">\r
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">\r
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />\r
              </svg>\r
            </div>\r
            Unable to load passed out students.\r
          </div>\r
        \`;\r
      }\r
    });\r
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
    import { getFirestore, collection, getDocs } from "./firebase-compat.js";\r
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
    let currentUser = null;\r
    let allArchived = [];\r
    let filteredArchived = [];\r
    let activeDetailStudent = null;\r
\r
    const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({\r
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"\r
    }[char]));\r
    const val = (value) => value === undefined || value === null || value === "" ? "N/A" : value;\r
    const phoneOf = (s = {}) => s.fatherPhone || s.fatherMobile || s.motherPhone || s.motherMobile || s.phone || "";\r
    const finalClassOf = (s = {}) => [s.finalClass || s.class, s.finalSection || s.section].filter(Boolean).join("-") || "N/A";\r
    const recordCount = (s = {}, key) => Array.isArray(s.records?.[key]) ? s.records[key].length : 0;\r
    const monthOrder = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];\r
    const formatCurrency = (value = 0) => \`₹\${Number(value || 0).toLocaleString("en-IN")}\`;\r
\r
    function archiveStatus(student = {}) {\r
      return student.status || (student.tcIssued ? "TC Issued" : "Passed Out");\r
    }\r
\r
    function archiveStatusText(student = {}) {\r
      const base = archiveStatus(student);\r
      return student.tcIssued && base !== "TC Issued" ? \`\${base} + TC Issued\` : base;\r
    }\r
\r
    function archiveStatusPills(student = {}) {\r
      const base = archiveStatus(student);\r
      const academicLabel = base === "TC Issued" && !student.passoutYear ? "TC Only" : base;\r
      const academicClass = academicLabel === "Passed Out" ? "promoted" : "neutral";\r
      const tcLabel = student.tcIssued ? "TC Issued" : "TC Not Issued";\r
      const tcClass = student.tcIssued ? "tc" : "neutral";\r
      const checkIcon = \`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>\`;\r
      return \`\r
        <div class="status-panel">\r
          <div class="status-line">\r
            <span class="status-label">Academic</span>\r
            <span class="pill \${academicClass}">\${academicLabel === "Passed Out" ? checkIcon : ""}\${esc(academicLabel)}</span>\r
          </div>\r
          <div class="status-line">\r
            <span class="status-label">TC</span>\r
            <span class="pill \${tcClass}">\${student.tcIssued ? checkIcon : ""}\${esc(tcLabel)}</span>\r
          </div>\r
        </div>\r
      \`;\r
    }\r
\r
    function toDate(value) {\r
      if (!value) return null;\r
      if (value?.toDate) return value.toDate();\r
      if (value?.seconds) return new Date(value.seconds * 1000);\r
      if (value instanceof Date) return value;\r
      const date = new Date(value);\r
      return Number.isNaN(date.getTime()) ? null : date;\r
    }\r
\r
    function formatDate(value) {\r
      const date = toDate(value);\r
      return date ? date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : val(value);\r
    }\r
\r
    function getMonthName(value) {\r
      if (monthOrder.includes(value)) return value;\r
      const date = toDate(value);\r
      return date ? monthOrder[date.getMonth()] : "Other";\r
    }\r
\r
    function getYearValue(value, fallback = "") {\r
      const date = toDate(value);\r
      if (date) return String(date.getFullYear());\r
      const years = String(value || fallback || "").match(/\\b(20\\d{2}|19\\d{2})\\b/g);\r
      return years?.length ? years[years.length - 1] : "No Year";\r
    }\r
\r
    function getSessionLabel(record = {}, fallback = "No Session") {\r
      return record.session || record.academicSession || record.currentYear || record.sessionName || record.sessionId || fallback;\r
    }\r
\r
    function getFeeAmounts(fee = {}) {\r
      const total = Number(fee.originalAmount ?? fee.amount ?? 0);\r
      const applied = Array.isArray(fee.payments)\r
        ? fee.payments.reduce((sum, payment) => sum + Number(payment.appliedAmount ?? payment.amount ?? 0), 0)\r
        : Number(fee.totalPaidAmount ?? fee.paidAmount ?? 0);\r
      const extra = Number(fee.totalExtraPaidAmount ?? fee.extraAmount ?? 0);\r
      const collected = Number(fee.totalCollectedAmount ?? applied + extra);\r
      const due = Number.isFinite(Number(fee.remainingAmount))\r
        ? Number(fee.remainingAmount)\r
        : Math.max(0, total - applied);\r
      return { total, applied, extra, collected, due: Math.max(0, due) };\r
    }\r
\r
    function statusClass(value = "") {\r
      const text = String(value).toLowerCase();\r
      if (text.includes("present") || text === "paid") return "paid present";\r
      if (text.includes("half") || text.includes("partial")) return "partial half";\r
      if (text.includes("absent") || text.includes("unpaid") || text.includes("imposed") || text.includes("pending")) return "due absent";\r
      return "";\r
    }\r
\r
    function groupBy(records, getKey) {\r
      return records.reduce((map, record) => {\r
        const key = getKey(record);\r
        if (!map.has(key)) map.set(key, []);\r
        map.get(key).push(record);\r
        return map;\r
      }, new Map());\r
    }\r
\r
    function sortMonthKeys(keys) {\r
      return [...keys].sort((a, b) => {\r
        const [yearA, monthA] = a.split("::");\r
        const [yearB, monthB] = b.split("::");\r
        const yearDiff = Number(yearB || 0) - Number(yearA || 0);\r
        if (yearDiff) return yearDiff;\r
        return monthOrder.indexOf(monthA) - monthOrder.indexOf(monthB);\r
      });\r
    }\r
\r
    function uniqueOptions(records, getKey) {\r
      return [...new Set(records.map(getKey).filter(Boolean))];\r
    }\r
\r
    function monthKeyForRecord(record = {}) {\r
      const source = record.date || record.timestamp || record.createdAt || record.updatedAt || record.month;\r
      return \`\${getYearValue(source, getSessionLabel(record))}::\${getMonthName(record.month || source)}\`;\r
    }\r
\r
    function renderSelectOptions(values, placeholder) {\r
      return \`<option value="">\${esc(placeholder)}</option>\${values.map((value) => \`<option value="\${esc(value)}">\${esc(value.replace("::", " - "))}</option>\`).join("")}\`;\r
    }\r
\r
    function getReportTermKey(report = {}) {\r
      return report.termLabel || report.term || report.termKey || report.examName || report.title || "Untitled Term";\r
    }\r
\r
    function renderReportControls(type, student = {}) {\r
      const records = Array.isArray(student.records?.[type]) ? student.records[type] : [];\r
      if (!records.length) return '<div class="report-empty">No archived records found for this student.</div>';\r
      const sessions = uniqueOptions(records, getSessionLabel).sort();\r
      if (type === "reportCards") {\r
        const terms = uniqueOptions(records, getReportTermKey).sort();\r
        return \`\r
          <div class="report-controls">\r
            <div class="filter-group">\r
              <label>Result Session</label>\r
              <select id="\${type}SessionFilter" onchange="renderArchivedReport('\${type}')">\r
                \${renderSelectOptions(sessions, "Select session")}\r
              </select>\r
            </div>\r
            <div class="filter-group">\r
              <label>Result Term</label>\r
              <select id="\${type}TermFilter" onchange="renderArchivedReport('\${type}')">\r
                \${renderSelectOptions(terms, "Select term")}\r
              </select>\r
            </div>\r
          </div>\r
          <div id="\${type}ReportOutput" class="report-empty">Select session and term to view result history.</div>\r
        \`;\r
      }\r
      const months = sortMonthKeys(uniqueOptions(records, monthKeyForRecord));\r
      const title = type === "attendance" ? "Attendance History" : "Payment History";\r
      return \`\r
        <div class="report-controls">\r
          <div class="filter-group">\r
            <label>\${title} Session</label>\r
            <select id="\${type}SessionFilter" onchange="renderArchivedReport('\${type}')">\r
              \${renderSelectOptions(sessions, "Select session")}\r
            </select>\r
          </div>\r
          <div class="filter-group">\r
            <label>\${title} Month</label>\r
            <select id="\${type}MonthFilter" onchange="renderArchivedReport('\${type}')">\r
              \${renderSelectOptions(months, "Select month")}\r
            </select>\r
          </div>\r
        </div>\r
        <div id="\${type}ReportOutput" class="report-empty">Select session and month to view \${title.toLowerCase()}.</div>\r
      \`;\r
    }\r
\r
    window.renderArchivedReport = (type) => {\r
      if (!activeDetailStudent) return;\r
      const output = document.getElementById(\`\${type}ReportOutput\`);\r
      const selectedSession = document.getElementById(\`\${type}SessionFilter\`)?.value || "";\r
      if (type === "reportCards") {\r
        const selectedTerm = document.getElementById(\`\${type}TermFilter\`)?.value || "";\r
        if (!output) return;\r
        if (!selectedSession || !selectedTerm) {\r
          output.className = "report-empty";\r
          output.innerHTML = "Select session and term to view result history.";\r
          return;\r
        }\r
        const records = (activeDetailStudent.records?.reportCards || []).filter((record) =>\r
          getSessionLabel(record) === selectedSession && getReportTermKey(record) === selectedTerm\r
        );\r
        output.className = "";\r
        output.innerHTML = renderResultTable(records);\r
        return;\r
      }\r
      const selectedMonth = document.getElementById(\`\${type}MonthFilter\`)?.value || "";\r
      if (!output) return;\r
      if (!selectedSession || !selectedMonth) {\r
        output.className = "report-empty";\r
        output.innerHTML = \`Select session and month to view \${type === "attendance" ? "attendance history" : "payment history"}.\`;\r
        return;\r
      }\r
      const records = (activeDetailStudent.records?.[type] || []).filter((record) =>\r
        getSessionLabel(record) === selectedSession && monthKeyForRecord(record) === selectedMonth\r
      );\r
      output.className = "";\r
      output.innerHTML = type === "attendance" ? renderAttendanceTable(records, selectedMonth) : renderFeesTable(records, selectedMonth);\r
    };\r
\r
    function renderAttendanceTable(records = [], selectedMonth = "") {\r
      if (!records.length) return '<div class="report-empty">No attendance found for selected session and month.</div>';\r
      const [year, month] = selectedMonth.split("::");\r
      const sorted = records.sort((a, b) => (toDate(a.date || a.timestamp || a.createdAt) || 0) - (toDate(b.date || b.timestamp || b.createdAt) || 0));\r
      const counts = sorted.reduce((summary, record) => {\r
        const status = String(record.status || "Not Marked");\r
        if (status === "Present") summary.present += 1;\r
        else if (status === "Absent") summary.absent += 1;\r
        else if (status === "Half Day") summary.half += 1;\r
        else summary.other += 1;\r
        return summary;\r
      }, { present: 0, absent: 0, half: 0, other: 0 });\r
      const marked = counts.present + counts.absent + counts.half + counts.other;\r
      const percentage = marked ? Math.round(((counts.present + counts.half * 0.5) / marked) * 100) : 0;\r
      return \`\r
        <div class="report-section">\r
          <div class="report-head">\r
            <span>\${esc(month)} \${esc(year)}</span>\r
            <span>Present \${counts.present} | Half \${counts.half} | Absent \${counts.absent} | Attendance \${percentage}%</span>\r
          </div>\r
          <table class="report-table">\r
            <thead>\r
              <tr><th>Date</th><th>Status</th><th>Class</th><th>Marked By</th><th>Remarks</th></tr>\r
            </thead>\r
            <tbody>\r
              \${sorted.map((record) => \`\r
                <tr>\r
                  <td>\${esc(formatDate(record.date || record.timestamp || record.createdAt))}</td>\r
                  <td><span class="status-chip \${statusClass(record.status)}">\${esc(record.status || "Not Marked")}</span></td>\r
                  <td>\${esc([record.class, record.section].filter(Boolean).join("-") || "N/A")}</td>\r
                  <td>\${esc(record.markedBy || record.markedByRole || "N/A")}</td>\r
                  <td>\${esc(record.remarks || record.note || "")}</td>\r
                </tr>\r
              \`).join("")}\r
            </tbody>\r
          </table>\r
        </div>\r
      \`;\r
    }\r
\r
    function renderFeesTable(records = [], selectedMonth = "") {\r
      if (!records.length) return '<div class="report-empty">No fee/payment history found for selected session and month.</div>';\r
      const [year, month] = selectedMonth.split("::");\r
      const sorted = records.sort((a, b) => (toDate(a.date || a.createdAt) || 0) - (toDate(b.date || b.createdAt) || 0));\r
      const totals = sorted.reduce((sum, fee) => {\r
        const amount = getFeeAmounts(fee);\r
        sum.assigned += amount.total;\r
        sum.applied += amount.applied;\r
        sum.extra += amount.extra;\r
        sum.due += amount.due;\r
        return sum;\r
      }, { assigned: 0, applied: 0, extra: 0, due: 0 });\r
      return \`\r
        <div class="report-section">\r
          <div class="report-head">\r
            <span>\${esc(month)} \${esc(year)}</span>\r
            <span>Assigned \${formatCurrency(totals.assigned)} | Paid \${formatCurrency(totals.applied)} | Due \${formatCurrency(totals.due)}</span>\r
          </div>\r
          <table class="report-table">\r
            <thead>\r
              <tr><th>Month</th><th>Assigned</th><th>Paid / Applied</th><th>Extra</th><th>Due</th><th>Status</th><th>Payments</th></tr>\r
            </thead>\r
            <tbody>\r
              \${sorted.map((fee) => {\r
                const amount = getFeeAmounts(fee);\r
                const payments = Array.isArray(fee.payments) && fee.payments.length\r
                  ? fee.payments.map((payment) => \`\${esc(formatDate(payment.date))}: \${formatCurrency(payment.receivedAmount ?? payment.fullAmount ?? payment.amount ?? 0)} received, \${formatCurrency(payment.appliedAmount ?? payment.amount ?? 0)} applied\`).join("<br>")\r
                  : "No payment history";\r
                return \`\r
                  <tr>\r
                    <td>\${esc(fee.month || "N/A")}<br><small style="color:var(--slate-500)">\${esc(formatDate(fee.date || fee.createdAt || fee.updatedAt))}</small></td>\r
                    <td class="money">\${formatCurrency(amount.total)}</td>\r
                    <td class="money">\${formatCurrency(amount.applied)}</td>\r
                    <td class="money">\${formatCurrency(amount.extra)}</td>\r
                    <td class="money">\${formatCurrency(amount.due)}</td>\r
                    <td><span class="status-chip \${statusClass(fee.status)}">\${esc(fee.status || "Pending")}</span></td>\r
                    <td>\${payments}</td>\r
                  </tr>\r
                \`;\r
              }).join("")}\r
            </tbody>\r
          </table>\r
        </div>\r
      \`;\r
    }\r
\r
    function renderResultTable(records = []) {\r
      if (!records.length) return '<div class="report-empty">No result/report card found for selected session and term.</div>';\r
      const sorted = records.sort((a, b) => (toDate(b.createdAt || b.generatedAt || b.updatedAt) || 0) - (toDate(a.createdAt || a.generatedAt || a.updatedAt) || 0));\r
      return sorted.map((report) => {\r
        const subjects = Array.isArray(report.subjects) ? report.subjects : [];\r
        const totalObtained = report.totalMarks ?? report.obtainedMarks ?? subjects.reduce((sum, sub) => sum + Number(sub.obtained ?? sub.obtainedMarks ?? sub.marks ?? 0), 0);\r
        const totalMax = report.totalMaxMarks ?? report.maxMarks ?? subjects.reduce((sum, sub) => sum + Number(sub.maxMarks ?? sub.totalMarks ?? 0), 0);\r
        const percentage = report.percentage ?? (Number(totalMax) ? ((Number(totalObtained) / Number(totalMax)) * 100).toFixed(2) : "");\r
        return \`\r
          <div class="report-section">\r
            <div class="report-head">\r
              <span>\${esc(getReportTermKey(report))}</span>\r
              <span>Percentage \${esc(percentage || "N/A")}% | Grade \${esc(report.grade || "N/A")}</span>\r
            </div>\r
            <div class="detail-grid" style="padding:16px;background:var(--slate-50)">\r
              \${field("Session", getSessionLabel(report))}\r
              \${field("Generated", formatDate(report.createdAt || report.generatedAt || report.updatedAt))}\r
              \${field("Total Marks", \`\${totalObtained || "N/A"} / \${totalMax || "N/A"}\`)}\r
              \${field("Rank", report.rank)}\r
              \${field("Remarks", report.remarks || report.teacherRemarks || report.resultRemarks)}\r
            </div>\r
            <table class="report-table">\r
              <thead>\r
                <tr><th>Subject</th><th>Obtained</th><th>Max</th><th>Grade</th><th>Remarks</th></tr>\r
              </thead>\r
              <tbody>\r
                \${subjects.length ? subjects.map((sub) => \`\r
                  <tr>\r
                    <td>\${esc(sub.name || sub.subject || "Subject")}</td>\r
                    <td>\${esc(sub.obtained ?? sub.obtainedMarks ?? sub.marks ?? "N/A")}</td>\r
                    <td>\${esc(sub.maxMarks ?? sub.totalMarks ?? "N/A")}</td>\r
                    <td>\${esc(sub.grade || "N/A")}</td>\r
                    <td>\${esc(sub.remarks || "")}</td>\r
                  </tr>\r
                \`).join("") : '<tr><td colspan="5" style="text-align:center;color:var(--slate-500)">No subject details saved in this report.</td></tr>'}\r
              </tbody>\r
            </table>\r
          </div>\r
        \`;\r
      }).join("");\r
    }\r
\r
    function searchableText(student = {}) {\r
      return [\r
        student.name, student.studentName, student.studentId, student.roll, student.email,\r
        student.parentEmail, student.father, student.mother, student.fatherPhone,\r
        student.motherPhone, student.phone, student.passoutYear, student.tcNumber,\r
        student.srNumber, student.category, student.gender, student.aadharNumber,\r
        student.archiveReason, archiveStatusText(student), student.tcIssued ? "tc issued" : "tc not issued", finalClassOf(student)\r
      ].join(" ").toLowerCase();\r
    }\r
\r
    function populateYears() {\r
      const select = document.getElementById("yearFilter");\r
      const years = [...new Set(allArchived.map((s) => s.passoutYear).filter(Boolean))]\r
        .sort((a, b) => Number(b) - Number(a));\r
      select.innerHTML = '<option value="">All Years</option>' + years.map((year) => \`<option value="\${esc(year)}">\${esc(year)}</option>\`).join("");\r
    }\r
\r
    function updateStats(students = filteredArchived) {\r
      const years = new Set(students.map((s) => s.passoutYear).filter(Boolean));\r
      const tc = students.filter((s) => s.tcIssued || archiveStatus(s) === "TC Issued").length;\r
      const passed = students.filter((s) => archiveStatus(s) === "Passed Out").length;\r
      document.getElementById("statsGrid").innerHTML = \`\r
        <div class="stat">\r
          <div class="stat-header">\r
            <div class="stat-icon blue">\r
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">\r
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />\r
              </svg>\r
            </div>\r
          </div>\r
          <strong>\${students.length}</strong>\r
          <span>Visible Records</span>\r
        </div>\r
        <div class="stat">\r
          <div class="stat-header">\r
            <div class="stat-icon green">\r
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">\r
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />\r
              </svg>\r
            </div>\r
          </div>\r
          <strong>\${years.size}</strong>\r
          <span>Passout Years</span>\r
        </div>\r
        <div class="stat">\r
          <div class="stat-header">\r
            <div class="stat-icon orange">\r
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">\r
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" />\r
              </svg>\r
            </div>\r
          </div>\r
          <strong>\${passed}</strong>\r
          <span>Class 12 Passout</span>\r
        </div>\r
        <div class="stat">\r
          <div class="stat-header">\r
            <div class="stat-icon red">\r
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">\r
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />\r
              </svg>\r
            </div>\r
          </div>\r
          <strong>\${tc}</strong>\r
          <span>TC Issued</span>\r
        </div>\r
      \`;\r
    }\r
\r
    function renderStudents(students = filteredArchived) {\r
      updateStats(students);\r
      const target = document.getElementById("studentsList");\r
      if (!students.length) {\r
        target.innerHTML = \`\r
          <div class="empty">\r
            <div class="empty-icon">\r
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">\r
                <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />\r
              </svg>\r
            </div>\r
            No archived students found for selected filters.\r
          </div>\r
        \`;\r
        return;\r
      }\r
      target.innerHTML = students.map((s) => {\r
        return \`\r
          <div class="row">\r
            <div class="student-cell" data-label="Student">\r
              <div class="avatar">\r
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">\r
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />\r
                </svg>\r
              </div>\r
              <div>\r
                <div class="name">\${esc(s.name || s.studentName || "N/A")}</div>\r
                <div class="muted">\r
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">\r
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />\r
                  </svg>\r
                  \${esc(s.email || s.parentEmail || "No email")}\r
                </div>\r
              </div>\r
            </div>\r
            <div class="id-cell" data-label="ID / Roll">\r
              <span class="id-value">\${esc(s.studentId || s.id || "N/A")}</span>\r
              <span class="roll-value">\r
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">\r
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5" />\r
                </svg>\r
                Roll \${esc(s.roll || "-")}\r
              </span>\r
            </div>\r
            <div class="id-cell" data-label="SR No.">\r
              <span class="id-value">\${esc(s.srNumber || "N/A")}</span>\r
              <span class="roll-value">School record</span>\r
            </div>\r
            <div data-label="Final Class">\r
              <span class="class-badge">\r
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">\r
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" />\r
                </svg>\r
                \${esc(finalClassOf(s))}\r
              </span>\r
            </div>\r
            <div data-label="Phone">\r
              <span class="phone-value">\r
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">\r
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />\r
                </svg>\r
                \${esc(phoneOf(s) || "N/A")}\r
              </span>\r
            </div>\r
            <div data-label="Year">\r
              <span class="year-badge">\r
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">\r
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />\r
                </svg>\r
                \${esc(s.passoutYear || "N/A")}\r
              </span>\r
            </div>\r
            <div data-label="Status">\${archiveStatusPills(s)}</div>\r
            <div data-label="Action">\r
              <button class="btn-view" onclick="showDetails('\${esc(s.id)}')">\r
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">\r
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />\r
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />\r
                </svg>\r
                View\r
              </button>\r
            </div>\r
          </div>\r
        \`;\r
      }).join("");\r
    }\r
\r
    window.applyFilters = () => {\r
      const queryText = document.getElementById("searchInput").value.trim().toLowerCase();\r
      const year = document.getElementById("yearFilter").value;\r
      const status = document.getElementById("statusFilter").value;\r
      filteredArchived = allArchived.filter((student) => {\r
        const actualStatus = archiveStatus(student);\r
        const matchesSearch = !queryText || searchableText(student).includes(queryText);\r
        const matchesYear = !year || String(student.passoutYear || "") === year;\r
        const matchesStatus = !status || actualStatus === status || (status === "TC Issued" && student.tcIssued);\r
        return matchesSearch && matchesYear && matchesStatus;\r
      });\r
      renderStudents(filteredArchived);\r
    };\r
\r
    window.resetFilters = () => {\r
      document.getElementById("searchInput").value = "";\r
      document.getElementById("yearFilter").value = "";\r
      document.getElementById("statusFilter").value = "";\r
      window.applyFilters();\r
    };\r
\r
    function field(label, value, icon = "") {\r
      return \`<div class="field"><span>\${icon}\${esc(label)}</span><strong>\${esc(val(value))}</strong></div>\`;\r
    }\r
\r
    window.showDetails = (id) => {\r
      const student = allArchived.find((entry) => entry.id === id);\r
      if (!student) return;\r
      activeDetailStudent = student;\r
      const tc = student.transferCertificate || {};\r
      document.getElementById("modalTitle").innerHTML = \`\r
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">\r
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />\r
        </svg>\r
        \${esc(student.name || student.studentName || "Student")} (\${esc(student.passoutYear || "N/A")})\r
      \`;\r
      document.getElementById("modalBody").innerHTML = \`\r
        <div class="detail-grid">\r
          \${field("Name", student.name || student.studentName)}\r
          \${field("Student ID", student.studentId)}\r
          \${field("SR Number", student.srNumber)}\r
          \${field("Roll", student.roll)}\r
          \${field("Final Class", finalClassOf(student))}\r
          \${field("Passout Year", student.passoutYear)}\r
          \${field("Academic Status", archiveStatus(student))}\r
          \${field("TC Status", student.tcIssued ? "TC Issued" : "TC Not Issued")}\r
          \${field("Archive Reason", student.archiveReason)}\r
          \${field("Result %", student.resultPercentage)}\r
          \${field("Gender", student.gender)}\r
          \${field("Category", student.category)}\r
          \${field("Blood Group", student.bloodGroup)}\r
          \${field("Religion", student.religion)}\r
          \${field("Previous School", student.previousSchool)}\r
          \${field("Father", student.father)}\r
          \${field("Father Phone", student.fatherPhone || student.fatherMobile)}\r
          \${field("Father Email", student.fatherEmail)}\r
          \${field("Mother", student.mother)}\r
          \${field("Mother Phone", student.motherPhone || student.motherMobile)}\r
          \${field("Mother Email", student.motherEmail)}\r
          \${field("Phone", student.phone)}\r
          \${field("Email", student.email)}\r
          \${field("Parent Email", student.parentEmail || student.fatherEmail || student.motherEmail)}\r
          \${field("Admission Year", student.yearOfAdmission)}\r
          \${field("Admission Date", student.admissionDate || student.dateOfAdmission)}\r
          \${field("Current/Archive Session", student.currentYear || student.academicSession || student.session)}\r
          \${field("DOB", student.dob)}\r
          \${field("Aadhaar", student.aadharNumber)}\r
          \${field("Address", student.address)}\r
          \${field("Documents", student.documentList || student.documents)}\r
          \${field("Photo URL", student.photoUrl || student.imageUrl || student.profilePhotoUrl)}\r
        </div>\r
        <h3 class="section-title">\r
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">\r
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />\r
          </svg>\r
          Transfer Certificate\r
        </h3>\r
        <div class="detail-grid">\r
          \${field("TC Number", student.tcNumber || tc.tcNumber)}\r
          \${field("Leaving Date", tc.leavingDate)}\r
          \${field("Reason", tc.reason)}\r
          \${field("Conduct", tc.conduct)}\r
        </div>\r
        <h3 class="section-title">\r
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">\r
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776" />\r
          </svg>\r
          Saved Record Counts\r
        </h3>\r
        <div class="detail-grid">\r
          \${field("Attendance Records", recordCount(student, "attendance"))}\r
          \${field("Fee Records", recordCount(student, "fees"))}\r
          \${field("Report Cards", recordCount(student, "reportCards"))}\r
        </div>\r
        <h3 class="section-title">\r
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">\r
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />\r
          </svg>\r
          Attendance History\r
        </h3>\r
        \${renderReportControls("attendance", student)}\r
        <h3 class="section-title">\r
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">\r
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />\r
          </svg>\r
          Payment History\r
        </h3>\r
        \${renderReportControls("fees", student)}\r
        <h3 class="section-title">\r
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">\r
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" />\r
          </svg>\r
          Result History\r
        </h3>\r
        \${renderReportControls("reportCards", student)}\r
      \`;\r
      document.getElementById("detailModal").classList.add("open");\r
    };\r
\r
    window.closeDetails = () => {\r
      activeDetailStudent = null;\r
      document.getElementById("detailModal").classList.remove("open");\r
    };\r
\r
    async function loadArchivedStudents() {\r
      const snap = await getDocs(collection(db, "schools", currentUser.uid, "passedOutStudents"));\r
      allArchived = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))\r
        .sort((a, b) => Number(b.passoutYear || 0) - Number(a.passoutYear || 0) || String(a.name || "").localeCompare(String(b.name || "")));\r
      filteredArchived = [...allArchived];\r
      populateYears();\r
      renderStudents();\r
    }\r
\r
    onAuthStateChanged(auth, async (user) => {\r
      if (!user) {\r
        window.location.href = "#/index.html";\r
        return;\r
      }\r
      currentUser = user;\r
      try {\r
        await loadArchivedStudents();\r
      } catch (error) {\r
        console.error("Error loading passed out students:", error);\r
        document.getElementById("studentsList").innerHTML = \`\r
          <div class="empty">\r
            <div class="empty-icon">\r
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">\r
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />\r
              </svg>\r
            </div>\r
            Unable to load passed out students.\r
          </div>\r
        \`;\r
      }\r
    });\r
  `},{attributes:{type:"module",src:"access-control.js"},text:""},{attributes:{src:"schoolix-polish.js"},text:""},{attributes:{src:"admin-shell.js?v=navbar-20260721"},text:""}]};export{e as default};
