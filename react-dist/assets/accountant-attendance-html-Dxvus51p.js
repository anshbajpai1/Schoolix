const a={file:"accountant-attendance.html",title:"Accountant Attendance - Schoolix",htmlClass:"",bodyClass:"library-dashboard-app sx-accountant-shell-enabled",body:`
<div id="sxPageLoader" class="sx-page-loader" role="status" aria-live="polite">\r
  <section class="dots-container" aria-label="Loading page">\r
    <div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div>\r
  </section>\r
</div>\r
<div class="library-app-layout">\r
  <div class="library-sidebar-overlay" id="librarySidebarOverlay" aria-hidden="true"></div>\r
  <aside class="library-sidebar" id="librarySidebar"></aside>\r
  <main class="library-main">\r
    <header class="library-page-topbar">\r
      <div>\r
        <h1 class="library-page-title">Attendance Records</h1>\r
        <div class="library-page-meta">Daily attendance marked through QR or by admin.</div>\r
      </div>\r
      <button class="library-menu-button" id="libraryMenuButton" type="button" aria-label="Open accounts navigation" aria-expanded="false">
        <span class="library-toggle-arrow" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="m15 18-6-6 6-6"></path></svg></span>
      </button>
    </header>\r
    <div id="accountantAttendanceMount"></div>\r
  </main>\r
</div>\r
<script src="accountant-portal.js"><\/script>\r
<script type="module" src="staff-qr-checkin.js"><\/script>\r
<script type="module" src="access-control.js"><\/script>\r
<script src="schoolix-polish.js" defer><\/script>\r
`,styles:[{tag:"link",attributes:{rel:"stylesheet",href:"schoolix-polish.css"},text:""},{tag:"link",attributes:{rel:"stylesheet",href:"accountant-portal.css"},text:""}],scripts:[{attributes:{id:"sxCriticalLoaderScript"},text:`\r
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
`},{attributes:{src:"accountant-portal.js"},text:""},{attributes:{type:"module",src:"staff-qr-checkin.js"},text:""},{attributes:{type:"module",src:"access-control.js"},text:""},{attributes:{src:"schoolix-polish.js"},text:""}]};export{a as default};
