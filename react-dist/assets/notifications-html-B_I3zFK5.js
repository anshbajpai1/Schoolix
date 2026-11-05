const e={file:"notifications.html",title:"Schoolix - App Notifications",htmlClass:"",bodyClass:"sx-admin-app sx-notifications-app",body:`\r
<div id="sxPageLoader" class="sx-page-loader" role="status" aria-live="polite">\r
  <section class="dots-container" aria-label="Loading page">\r
    <div class="dot"></div>\r
    <div class="dot"></div>\r
    <div class="dot"></div>\r
    <div class="dot"></div>\r
    <div class="dot"></div>\r
  </section>\r
</div>\r
<main class="notification-page">\r
  <div class="page-heading">\r
    <div>\r
      <h1>App Notifications</h1>\r
      <p>Send an announcement to selected users of your school through the Schoolix Android app.</p>\r
    </div>\r
    <div class="delivery-badge" id="audienceBadge">Everyone in this school</div>\r
  </div>\r
\r
  <section class="composer" aria-labelledby="composeTitle">\r
    <form class="composer-form" id="notificationForm">\r
      <div class="field">\r
        <label for="notificationAudience">Send to</label>\r
        <select id="notificationAudience" required>\r
          <option value="all">Everyone in this school</option>
          <option value="teachers">Teachers only</option>
          <option value="students">Students and parents only</option>
          <option value="drivers">Drivers only</option>
          <option value="students_pending_dues">Students with pending dues</option>
        </select>\r
      </div>\r
      <div class="field">\r
        <label for="notificationTitle" id="composeTitle">Notification title</label>\r
        <input id="notificationTitle" maxlength="80" minlength="3" placeholder="School announcement" required>\r
        <div class="field-meta"><span>Shown in the notification bar</span><span id="titleCount">0 / 80</span></div>\r
      </div>\r
      <div class="field">\r
        <label for="notificationMessage">Message</label>\r
        <textarea id="notificationMessage" maxlength="240" minlength="3" placeholder="Write the message users should receive..." required></textarea>\r
        <div class="field-meta"><span>Keep it clear and actionable</span><span id="messageCount">0 / 240</span></div>\r
      </div>\r
      <div class="send-row">\r
        <div class="audience" id="audienceSummary">Audience: everyone in this school</div>\r
        <button class="send-btn" id="sendNotificationBtn" type="submit">Send notification</button>\r
      </div>\r
    </form>\r
    <aside class="delivery-preview">\r
      <h2>Phone preview</h2>\r
      <p>The final appearance may vary slightly by Android version.</p>\r
      <div class="phone-preview">\r
        <div class="phone-preview-title" id="previewTitle">School announcement</div>\r
        <div class="phone-preview-message" id="previewMessage">Your notification message will appear here.</div>\r
      </div>\r
    </aside>\r
  </section>\r
\r
  <section class="history" aria-labelledby="historyTitle">\r
    <div class="history-heading">\r
      <div><h2 id="historyTitle">Recent notifications</h2><p>Latest messages sent by this school.</p></div>\r
    </div>\r
    <div class="history-list" id="notificationHistory"><div class="empty-state">Loading notification history...</div></div>\r
  </section>\r
</main>\r
\r
<script src="school-branding.js"><\/script>\r
<script type="module">\r
import { auth, db } from "./firebase.js";\r
import { onAuthStateChanged } from "./firebase-compat.js";\r
import { collection, doc, getDoc, getDocs, limit, orderBy, query } from "./firebase-compat.js";\r
\r
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6a21lZWRjcWV0enRrZXBweGlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxMjk5NjAsImV4cCI6MjA5MzcwNTk2MH0.1davJ_NYkFhHToUtcFBR0kA6dk0-cOkaIbK2SCObkQg";\r
const SEND_URL = "https://ezkmeedcqetztkeppxil.supabase.co/functions/v1/send-app-notification";\r
const $ = (id) => document.getElementById(id);\r
let currentUser = null;\r
let schoolId = "";\r
const AUDIENCE_LABELS = {\r
  all: "Everyone in this school, including drivers",
  teachers: "Teachers only",
  students: "Students and parents only",
  drivers: "Drivers only",
  students_pending_dues: "Students with pending dues",
};
\r
function escapeHtml(value) {\r
  return String(value || "")\r
    .replace(/&/g, "&amp;")\r
    .replace(/</g, "&lt;")\r
    .replace(/>/g, "&gt;")\r
    .replace(/"/g, "&quot;")\r
    .replace(/'/g, "&#39;");\r
}\r
\r
function showToast(message, type = "success") {\r
  document.querySelector(".toast")?.remove();\r
  const toast = document.createElement("div");\r
  toast.className = \`toast \${type === "error" ? "error" : ""}\`;\r
  toast.textContent = message;\r
  document.body.appendChild(toast);\r
  setTimeout(() => toast.remove(), 4200);\r
}\r
\r
function formatDate(value) {\r
  const date = value?.toDate?.() || new Date(value || 0);\r
  if (Number.isNaN(date.getTime())) return "Recently";\r
  return date.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });\r
}\r
\r
function updatePreview() {\r
  const title = $("notificationTitle").value;\r
  const message = $("notificationMessage").value;\r
  const audience = $("notificationAudience").value;\r
  const audienceLabel = AUDIENCE_LABELS[audience] || AUDIENCE_LABELS.all;\r
  $("titleCount").textContent = \`\${title.length} / 80\`;\r
  $("messageCount").textContent = \`\${message.length} / 240\`;\r
  $("previewTitle").textContent = title.trim() || "School announcement";\r
  $("previewMessage").textContent = message.trim() || "Your notification message will appear here.";\r
  $("audienceBadge").textContent = audienceLabel;\r
  $("audienceSummary").textContent = \`Audience: \${audienceLabel.toLowerCase()}\`;\r
}\r
\r
async function loadHistory() {\r
  const container = $("notificationHistory");\r
  if (!schoolId) return;\r
  try {\r
    const snapshot = await getDocs(query(\r
      collection(db, "schools", schoolId, "notifications"),\r
      orderBy("createdAt", "desc"),\r
      limit(30),\r
    ));\r
    if (snapshot.empty) {\r
      container.innerHTML = '<div class="empty-state">No app notifications sent yet.</div>';\r
      return;\r
    }\r
    container.innerHTML = snapshot.docs.map((item) => {\r
      const data = item.data();\r
      const audienceLabel = AUDIENCE_LABELS[data.audience] || AUDIENCE_LABELS.all;\r
      return \`<article class="history-item">\r
        <div><div class="history-title">\${escapeHtml(data.title)}</div><div class="history-message">\${escapeHtml(data.message)}</div></div>\r
        <div class="history-meta">\${escapeHtml(audienceLabel)}<br>\${escapeHtml(String(data.directAccepted ?? 0))} phone(s) accepted<br>\${escapeHtml(formatDate(data.createdAt))}</div>\r
      </article>\`;\r
    }).join("");\r
  } catch (error) {\r
    console.error(error);\r
    container.innerHTML = '<div class="empty-state">Unable to load notification history.</div>';\r
  }\r
}\r
\r
$("notificationForm").addEventListener("submit", async (event) => {\r
  event.preventDefault();\r
  if (!currentUser) return showToast("Admin login required.", "error");\r
  const title = $("notificationTitle").value.trim();\r
  const message = $("notificationMessage").value.trim();\r
  const audience = $("notificationAudience").value;\r
  if (title.length < 3 || message.length < 3) return showToast("Enter a valid title and message.", "error");\r
\r
  const button = $("sendNotificationBtn");\r
  button.disabled = true;\r
  button.textContent = "Sending...";\r
  try {\r
    const idToken = await currentUser.getIdToken(true);\r
    const response = await fetch(SEND_URL, {\r
      method: "POST",\r
      headers: {\r
        "Content-Type": "application/json",\r
        "apikey": SUPABASE_ANON_KEY,\r
        "Authorization": \`Bearer \${SUPABASE_ANON_KEY}\`,\r
        "x-firebase-token": idToken,\r
      },\r
      body: JSON.stringify({ title, message, audience, schoolId }),\r
    });\r
    const result = await response.json().catch(() => ({}));\r
    if (!response.ok || !result.success) throw new Error(result.error || "Unable to send notification");\r
    $("notificationForm").reset();\r
    updatePreview();\r
    const accepted = Number(result.directAccepted || 0);
    const topicAccepted = Number(result.pendingTopicAccepted || 0);
    const deliveryMode = String(result.deliveryMode || "");
    const deliveryMessage = accepted + topicAccepted > 0
      ? topicAccepted > 0 && accepted === 0
        ? \`Notification accepted for \${topicAccepted} pending-dues student topic(s).\`
        : topicAccepted > 0
          ? \`Notification accepted for \${accepted} phone(s) and \${topicAccepted} pending-dues topic(s).\`
          : \`Notification accepted for \${accepted} registered phone(s).\`
      : deliveryMode === "targeted-no-devices"
        ? "No pending-dues student phones are registered yet."
        : "Topic fallback sent, but no updated app phone is registered yet.";
    showToast(deliveryMessage, accepted + topicAccepted > 0 ? "success" : "error");
    await loadHistory();\r
  } catch (error) {\r
    console.error(error);\r
    showToast(error.message || "Unable to send notification.", "error");\r
  } finally {\r
    button.disabled = false;\r
    button.textContent = "Send notification";\r
  }\r
});\r
\r
$("notificationTitle").addEventListener("input", updatePreview);\r
$("notificationMessage").addEventListener("input", updatePreview);\r
$("notificationAudience").addEventListener("change", updatePreview);\r
updatePreview();\r
\r
onAuthStateChanged(auth, async (user) => {\r
  if (!user) {\r
    location.href = "#/index.html";\r
    return;\r
  }\r
  try {\r
    const profileSnapshot = await getDoc(doc(db, "users", user.uid));\r
    const profile = profileSnapshot.data() || {};\r
    const role = String(profile.role || "").toLowerCase();\r
    if (role !== "admin" && role !== "superadmin" && profile.superAdmin !== true) {\r
      location.href = "#/index.html";\r
      return;\r
    }\r
    currentUser = user;\r
    schoolId = String(profile.schoolId || profile.adminId || user.uid);\r
    await loadHistory();\r
  } catch (error) {\r
    console.error(error);\r
    showToast("Unable to verify admin access.", "error");\r
  }\r
});\r
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
`}],scripts:[{attributes:{id:"sxCriticalLoaderScript"},text:`\r
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
import { auth, db } from "./firebase.js";\r
import { onAuthStateChanged } from "./firebase-compat.js";\r
import { collection, doc, getDoc, getDocs, limit, orderBy, query } from "./firebase-compat.js";\r
\r
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6a21lZWRjcWV0enRrZXBweGlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxMjk5NjAsImV4cCI6MjA5MzcwNTk2MH0.1davJ_NYkFhHToUtcFBR0kA6dk0-cOkaIbK2SCObkQg";\r
const SEND_URL = "https://ezkmeedcqetztkeppxil.supabase.co/functions/v1/send-app-notification";\r
const $ = (id) => document.getElementById(id);\r
let currentUser = null;\r
let schoolId = "";\r
const AUDIENCE_LABELS = {\r
  all: "Everyone in this school, including drivers",
  teachers: "Teachers only",
  students: "Students and parents only",
  drivers: "Drivers only",
  students_pending_dues: "Students with pending dues",
};
\r
function escapeHtml(value) {\r
  return String(value || "")\r
    .replace(/&/g, "&amp;")\r
    .replace(/</g, "&lt;")\r
    .replace(/>/g, "&gt;")\r
    .replace(/"/g, "&quot;")\r
    .replace(/'/g, "&#39;");\r
}\r
\r
function showToast(message, type = "success") {\r
  document.querySelector(".toast")?.remove();\r
  const toast = document.createElement("div");\r
  toast.className = \`toast \${type === "error" ? "error" : ""}\`;\r
  toast.textContent = message;\r
  document.body.appendChild(toast);\r
  setTimeout(() => toast.remove(), 4200);\r
}\r
\r
function formatDate(value) {\r
  const date = value?.toDate?.() || new Date(value || 0);\r
  if (Number.isNaN(date.getTime())) return "Recently";\r
  return date.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });\r
}\r
\r
function updatePreview() {\r
  const title = $("notificationTitle").value;\r
  const message = $("notificationMessage").value;\r
  const audience = $("notificationAudience").value;\r
  const audienceLabel = AUDIENCE_LABELS[audience] || AUDIENCE_LABELS.all;\r
  $("titleCount").textContent = \`\${title.length} / 80\`;\r
  $("messageCount").textContent = \`\${message.length} / 240\`;\r
  $("previewTitle").textContent = title.trim() || "School announcement";\r
  $("previewMessage").textContent = message.trim() || "Your notification message will appear here.";\r
  $("audienceBadge").textContent = audienceLabel;\r
  $("audienceSummary").textContent = \`Audience: \${audienceLabel.toLowerCase()}\`;\r
}\r
\r
async function loadHistory() {\r
  const container = $("notificationHistory");\r
  if (!schoolId) return;\r
  try {\r
    const snapshot = await getDocs(query(\r
      collection(db, "schools", schoolId, "notifications"),\r
      orderBy("createdAt", "desc"),\r
      limit(30),\r
    ));\r
    if (snapshot.empty) {\r
      container.innerHTML = '<div class="empty-state">No app notifications sent yet.</div>';\r
      return;\r
    }\r
    container.innerHTML = snapshot.docs.map((item) => {\r
      const data = item.data();\r
      const audienceLabel = AUDIENCE_LABELS[data.audience] || AUDIENCE_LABELS.all;\r
      return \`<article class="history-item">\r
        <div><div class="history-title">\${escapeHtml(data.title)}</div><div class="history-message">\${escapeHtml(data.message)}</div></div>\r
        <div class="history-meta">\${escapeHtml(audienceLabel)}<br>\${escapeHtml(String(data.directAccepted ?? 0))} phone(s) accepted<br>\${escapeHtml(formatDate(data.createdAt))}</div>\r
      </article>\`;\r
    }).join("");\r
  } catch (error) {\r
    console.error(error);\r
    container.innerHTML = '<div class="empty-state">Unable to load notification history.</div>';\r
  }\r
}\r
\r
$("notificationForm").addEventListener("submit", async (event) => {\r
  event.preventDefault();\r
  if (!currentUser) return showToast("Admin login required.", "error");\r
  const title = $("notificationTitle").value.trim();\r
  const message = $("notificationMessage").value.trim();\r
  const audience = $("notificationAudience").value;\r
  if (title.length < 3 || message.length < 3) return showToast("Enter a valid title and message.", "error");\r
\r
  const button = $("sendNotificationBtn");\r
  button.disabled = true;\r
  button.textContent = "Sending...";\r
  try {\r
    const idToken = await currentUser.getIdToken(true);\r
    const response = await fetch(SEND_URL, {\r
      method: "POST",\r
      headers: {\r
        "Content-Type": "application/json",\r
        "apikey": SUPABASE_ANON_KEY,\r
        "Authorization": \`Bearer \${SUPABASE_ANON_KEY}\`,\r
        "x-firebase-token": idToken,\r
      },\r
      body: JSON.stringify({ title, message, audience, schoolId }),\r
    });\r
    const result = await response.json().catch(() => ({}));\r
    if (!response.ok || !result.success) throw new Error(result.error || "Unable to send notification");\r
    $("notificationForm").reset();\r
    updatePreview();\r
    const accepted = Number(result.directAccepted || 0);
    const topicAccepted = Number(result.pendingTopicAccepted || 0);
    const deliveryMode = String(result.deliveryMode || "");
    const deliveryMessage = accepted + topicAccepted > 0
      ? topicAccepted > 0 && accepted === 0
        ? \`Notification accepted for \${topicAccepted} pending-dues student topic(s).\`
        : topicAccepted > 0
          ? \`Notification accepted for \${accepted} phone(s) and \${topicAccepted} pending-dues topic(s).\`
          : \`Notification accepted for \${accepted} registered phone(s).\`
      : deliveryMode === "targeted-no-devices"
        ? "No pending-dues student phones are registered yet."
        : "Topic fallback sent, but no updated app phone is registered yet.";
    showToast(deliveryMessage, accepted + topicAccepted > 0 ? "success" : "error");
    await loadHistory();\r
  } catch (error) {\r
    console.error(error);\r
    showToast(error.message || "Unable to send notification.", "error");\r
  } finally {\r
    button.disabled = false;\r
    button.textContent = "Send notification";\r
  }\r
});\r
\r
$("notificationTitle").addEventListener("input", updatePreview);\r
$("notificationMessage").addEventListener("input", updatePreview);\r
$("notificationAudience").addEventListener("change", updatePreview);\r
updatePreview();\r
\r
onAuthStateChanged(auth, async (user) => {\r
  if (!user) {\r
    location.href = "#/index.html";\r
    return;\r
  }\r
  try {\r
    const profileSnapshot = await getDoc(doc(db, "users", user.uid));\r
    const profile = profileSnapshot.data() || {};\r
    const role = String(profile.role || "").toLowerCase();\r
    if (role !== "admin" && role !== "superadmin" && profile.superAdmin !== true) {\r
      location.href = "#/index.html";\r
      return;\r
    }\r
    currentUser = user;\r
    schoolId = String(profile.schoolId || profile.adminId || user.uid);\r
    await loadHistory();\r
  } catch (error) {\r
    console.error(error);\r
    showToast("Unable to verify admin access.", "error");\r
  }\r
});\r
`},{attributes:{type:"module",src:"access-control.js"},text:""},{attributes:{src:"schoolix-polish.js"},text:""},{attributes:{src:"admin-shell.js?v=navbar-20260721"},text:""}]};export{e as default};
