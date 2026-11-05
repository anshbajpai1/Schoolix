const n={file:"offline.html",title:"Connection lost · Schoolix",htmlClass:"",bodyClass:"",body:`\r
<div id="sxPageLoader" class="sx-page-loader" role="status" aria-live="polite">\r
  <section class="dots-container" aria-label="Loading page">\r
    <div class="dot"></div>\r
    <div class="dot"></div>\r
    <div class="dot"></div>\r
    <div class="dot"></div>\r
    <div class="dot"></div>\r
  </section>\r
</div>\r
  <main class="offline-panel">\r
    <div class="mark"><img src="/schoolix-app-icon.svg" alt=""></div>\r
    <div class="connection-state" id="connectionState"><span class="connection-dot"></span><span id="connectionLabel">No internet connection</span></div>\r
    <h1 id="offlineTitle">You’re currently offline</h1>\r
    <p id="offlineMessage">Schoolix can open saved pages, but live records, attendance, and updates need an internet connection. Reconnect and try again.</p>\r
    <button type="button" id="retryButton">Try again</button>\r
    <p class="helper" id="helperText">We’ll automatically let you know when you’re back online.</p>\r
  </main>\r
  <script>\r
    (function () {\r
      var state = document.getElementById("connectionState");\r
      var label = document.getElementById("connectionLabel");\r
      var title = document.getElementById("offlineTitle");\r
      var message = document.getElementById("offlineMessage");\r
      var button = document.getElementById("retryButton");\r
      var helper = document.getElementById("helperText");\r
      function refreshState() {\r
        var online = navigator.onLine;\r
        state.classList.toggle("is-online", online);\r
        label.textContent = online ? "Connection restored" : "No internet connection";\r
        title.textContent = online ? "You’re back online" : "You’re currently offline";\r
        message.textContent = online ? "Your connection is back. Reload this page to continue with Schoolix." : "Schoolix can open saved pages, but live records, attendance, and updates need an internet connection. Reconnect and try again.";\r
        button.textContent = online ? "Continue" : "Try again";\r
        helper.textContent = online ? "Ready when you are." : "We’ll automatically let you know when you’re back online.";\r
      }\r
      button.addEventListener("click", function () { window.location.reload(); });\r
      window.addEventListener("online", refreshState);\r
      window.addEventListener("offline", refreshState);\r
      refreshState();\r
    }());\r
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
`},{tag:"link",attributes:{rel:"stylesheet",href:"schoolix-polish.css"},text:""}],scripts:[{attributes:{id:"sxCriticalLoaderScript"},text:`\r
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
`},{attributes:{},text:`\r
    (function () {\r
      var state = document.getElementById("connectionState");\r
      var label = document.getElementById("connectionLabel");\r
      var title = document.getElementById("offlineTitle");\r
      var message = document.getElementById("offlineMessage");\r
      var button = document.getElementById("retryButton");\r
      var helper = document.getElementById("helperText");\r
      function refreshState() {\r
        var online = navigator.onLine;\r
        state.classList.toggle("is-online", online);\r
        label.textContent = online ? "Connection restored" : "No internet connection";\r
        title.textContent = online ? "You’re back online" : "You’re currently offline";\r
        message.textContent = online ? "Your connection is back. Reload this page to continue with Schoolix." : "Schoolix can open saved pages, but live records, attendance, and updates need an internet connection. Reconnect and try again.";\r
        button.textContent = online ? "Continue" : "Try again";\r
        helper.textContent = online ? "Ready when you are." : "We’ll automatically let you know when you’re back online.";\r
      }\r
      button.addEventListener("click", function () { window.location.reload(); });\r
      window.addEventListener("online", refreshState);\r
      window.addEventListener("offline", refreshState);\r
      refreshState();\r
    }());\r
  `},{attributes:{src:"schoolix-polish.js"},text:""}]};export{n as default};
