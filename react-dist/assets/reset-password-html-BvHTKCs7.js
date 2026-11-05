const e={file:"reset-password.html",title:"Reset Password - Schoolix",htmlClass:"",bodyClass:"",body:`\r
<div id="sxPageLoader" class="sx-page-loader" role="status" aria-live="polite">\r
  <section class="dots-container" aria-label="Loading page">\r
    <div class="dot"></div>\r
    <div class="dot"></div>\r
    <div class="dot"></div>\r
    <div class="dot"></div>\r
    <div class="dot"></div>\r
  </section>\r
</div>\r
  <main class="panel">\r
    <h1>Reset Password</h1>\r
    <p>Choose a new password for your Schoolix account.</p>\r
    <form id="resetForm">\r
      <label for="password">New password</label>\r
      <input id="password" type="password" minlength="6" autocomplete="new-password" required>\r
      <label for="confirmPassword">Confirm password</label>\r
      <input id="confirmPassword" type="password" minlength="6" autocomplete="new-password" required>\r
      <button id="submitBtn" type="submit">Update password</button>\r
    </form>\r
    <div id="message" class="msg"></div>\r
  </main>\r
\r
  <script>\r
    const SUPABASE_URL = "https://ezkmeedcqetztkeppxil.supabase.co";\r
    const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6a21lZWRjcWV0enRrZXBweGlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxMjk5NjAsImV4cCI6MjA5MzcwNTk2MH0.1davJ_NYkFhHToUtcFBR0kA6dk0-cOkaIbK2SCObkQg";\r
    const token = new URLSearchParams(window.location.search).get("token") || "";\r
    const form = document.getElementById("resetForm");\r
    const message = document.getElementById("message");\r
    const submitBtn = document.getElementById("submitBtn");\r
\r
    function showMessage(text, ok = false) {\r
      message.textContent = text;\r
      message.className = \`msg \${ok ? "ok" : ""}\`;\r
      message.style.display = "block";\r
    }\r
\r
    if (!token) {\r
      form.style.display = "none";\r
      showMessage("This reset link is missing or invalid.");\r
    }\r
\r
    form.addEventListener("submit", async (event) => {\r
      event.preventDefault();\r
      const password = document.getElementById("password").value;\r
      const confirmPassword = document.getElementById("confirmPassword").value;\r
      if (password.length < 6) return showMessage("Password must be at least 6 characters.");\r
      if (password !== confirmPassword) return showMessage("Passwords do not match.");\r
\r
      submitBtn.disabled = true;\r
      try {\r
        const response = await fetch(\`\${SUPABASE_URL}/functions/v1/complete-password-reset\`, {\r
          method: "POST",\r
          headers: {\r
            "Content-Type": "application/json",\r
            "apikey": SUPABASE_ANON_KEY,\r
            "Authorization": \`Bearer \${SUPABASE_ANON_KEY}\`\r
          },\r
          body: JSON.stringify({ token, password })\r
        });\r
        const data = await response.json().catch(() => ({}));\r
        if (!response.ok) throw new Error(data.error || "Password reset failed.");\r
        showMessage("Password updated successfully. You can now sign in with your new password.", true);\r
        form.reset();\r
        setTimeout(() => { window.location.href = "#/index.html"; }, 2200);\r
      } catch (error) {\r
        showMessage(error.message || "Password reset failed.");\r
      } finally {\r
        submitBtn.disabled = false;\r
      }\r
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
    const SUPABASE_URL = "https://ezkmeedcqetztkeppxil.supabase.co";\r
    const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6a21lZWRjcWV0enRrZXBweGlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxMjk5NjAsImV4cCI6MjA5MzcwNTk2MH0.1davJ_NYkFhHToUtcFBR0kA6dk0-cOkaIbK2SCObkQg";\r
    const token = new URLSearchParams(window.location.search).get("token") || "";\r
    const form = document.getElementById("resetForm");\r
    const message = document.getElementById("message");\r
    const submitBtn = document.getElementById("submitBtn");\r
\r
    function showMessage(text, ok = false) {\r
      message.textContent = text;\r
      message.className = \`msg \${ok ? "ok" : ""}\`;\r
      message.style.display = "block";\r
    }\r
\r
    if (!token) {\r
      form.style.display = "none";\r
      showMessage("This reset link is missing or invalid.");\r
    }\r
\r
    form.addEventListener("submit", async (event) => {\r
      event.preventDefault();\r
      const password = document.getElementById("password").value;\r
      const confirmPassword = document.getElementById("confirmPassword").value;\r
      if (password.length < 6) return showMessage("Password must be at least 6 characters.");\r
      if (password !== confirmPassword) return showMessage("Passwords do not match.");\r
\r
      submitBtn.disabled = true;\r
      try {\r
        const response = await fetch(\`\${SUPABASE_URL}/functions/v1/complete-password-reset\`, {\r
          method: "POST",\r
          headers: {\r
            "Content-Type": "application/json",\r
            "apikey": SUPABASE_ANON_KEY,\r
            "Authorization": \`Bearer \${SUPABASE_ANON_KEY}\`\r
          },\r
          body: JSON.stringify({ token, password })\r
        });\r
        const data = await response.json().catch(() => ({}));\r
        if (!response.ok) throw new Error(data.error || "Password reset failed.");\r
        showMessage("Password updated successfully. You can now sign in with your new password.", true);\r
        form.reset();\r
        setTimeout(() => { window.location.href = "#/index.html"; }, 2200);\r
      } catch (error) {\r
        showMessage(error.message || "Password reset failed.");\r
      } finally {\r
        submitBtn.disabled = false;\r
      }\r
    });\r
  `},{attributes:{src:"schoolix-polish.js"},text:""}]};export{e as default};
