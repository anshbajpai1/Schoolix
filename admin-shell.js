(function () {
  const DASHBOARD = "admin-dashboard.html";
  const storageKey = "schoolix.schoolName";
  const logoStorageKey = "schoolix.schoolLogoUrl";
  const collapseStorageKey = "schoolix.adminSidebarCollapsed";
  const viewSessionStorageKey = "schoolix.viewSessionId";
  const lastOpenedStorageKey = "schoolix.adminLastOpenedAt";
  const assistantHistoryKey = "schoolix.aiAssistantHistory";
  const assistantEndpoint = "https://ezkmeedcqetztkeppxil.supabase.co/functions/v1/school-assistant";
  const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6a21lZWRjcWV0enRrZXBweGlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxMjk5NjAsImV4cCI6MjA5MzcwNTk2MH0.1davJ_NYkFhHToUtcFBR0kA6dk0-cOkaIbK2SCObkQg";
  const currentFile = (location.pathname.split("/").pop() || DASHBOARD).toLowerCase();
  const isDashboardPage = currentFile === DASHBOARD;
  const skipFiles = new Set(["index.html", "admin-signup.html"]);
  const desktopQuery = window.matchMedia("(min-width: 761px)");
  const assistantState = {
    authUser: null,
    schoolId: "",
    role: "",
    busy: false,
    messages: []
  };
  const firebaseConfig = {
    apiKey: "AIzaSyAomGwef93HFT9Xyx7SVW95FPw_IcIAICE",
    authDomain: "schoolix-48107.firebaseapp.com",
    projectId: "schoolix-48107"
  };
  const svgAttrs = 'viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"';
  const icons = {
    dashboard: `<svg ${svgAttrs}><rect x="3" y="3" width="7" height="7" rx="1.5"></rect><rect x="14" y="3" width="7" height="7" rx="1.5"></rect><rect x="14" y="14" width="7" height="7" rx="1.5"></rect><rect x="3" y="14" width="7" height="7" rx="1.5"></rect></svg>`,
    addStudent: `<svg ${svgAttrs}><path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"></path><circle cx="9.5" cy="7" r="4"></circle><path d="M19 8v6"></path><path d="M22 11h-6"></path></svg>`,
    students: `<svg ${svgAttrs}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,
    graduate: `<svg ${svgAttrs}><path d="M22 10 12 5 2 10l10 5 10-5Z"></path><path d="M6 12v5c3 2 9 2 12 0v-5"></path><path d="M22 10v6"></path></svg>`,
    certificate: `<svg ${svgAttrs}><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path><path d="M14 2v6h6"></path><path d="M9 13h6"></path><path d="M9 17h3"></path></svg>`,
    teachers: `<svg ${svgAttrs}><path d="M3 5h18"></path><path d="M4 5v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V5"></path><path d="M8 9h8"></path><path d="M8 13h5"></path><path d="M12 19v3"></path></svg>`,
    staff: `<svg ${svgAttrs}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path><path d="M19 8v4"></path><path d="M21 10h-4"></path></svg>`,
    timetable: `<svg ${svgAttrs}><rect x="3" y="4" width="18" height="18" rx="2"></rect><path d="M16 2v4"></path><path d="M8 2v4"></path><path d="M3 10h18"></path><path d="M8 14h.01"></path><path d="M12 14h.01"></path><path d="M16 14h.01"></path></svg>`,
    reportCards: `<svg ${svgAttrs}><path d="M4 19.5V4a2 2 0 0 1 2-2h12v20H6a2 2 0 0 1-2-2.5Z"></path><path d="M8 7h6"></path><path d="M8 11h8"></path><path d="M8 15h5"></path></svg>`,
    reports: `<svg ${svgAttrs}><path d="M3 3v18h18"></path><path d="m19 9-5 5-4-4-3 3"></path><path d="M14 9h5v5"></path></svg>`,
    adminReports: `<svg ${svgAttrs}><path d="M12 3 4 7v6c0 5 3.5 7.5 8 9 4.5-1.5 8-4 8-9V7l-8-4Z"></path><path d="M9 12l2 2 4-4"></path></svg>`,
    fees: `<svg ${svgAttrs}><rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="M3 10h18"></path><path d="M7 15h.01"></path><path d="M11 15h3"></path></svg>`,
    accountant: `<svg ${svgAttrs}><rect x="4" y="2" width="16" height="20" rx="2"></rect><path d="M8 6h8"></path><path d="M8 10h2"></path><path d="M14 10h2"></path><path d="M8 14h2"></path><path d="M14 14h2"></path><path d="M8 18h8"></path></svg>`,
    library: `<svg ${svgAttrs}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15Z"></path><path d="M8 7h8"></path></svg>`,
    transport: `<svg ${svgAttrs}><path d="M7 17h10"></path><path d="M5 17H3V7a2 2 0 0 1 2-2h11l5 5v7h-2"></path><circle cx="7" cy="17" r="2"></circle><circle cx="17" cy="17" r="2"></circle><path d="M16 5v5h5"></path></svg>`,
    notifications: `<svg ${svgAttrs}><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"></path><path d="M10 21h4"></path></svg>`,
    notices: `<svg ${svgAttrs}><path d="M3 11v2a2 2 0 0 0 2 2h2l4 4v-4h4l6 3V6l-6 3H5a2 2 0 0 0-2 2Z"></path><path d="M21 9v6"></path></svg>`,
    settings: `<svg ${svgAttrs}><path d="M12 15.5A3.5 3.5 0 1 0 12 8a3.5 3.5 0 0 0 0 7.5Z"></path><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6V20a2 2 0 1 1-4 0v-.09a1.7 1.7 0 0 0-1-.6 1.7 1.7 0 0 0-1.88.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1H4a2 2 0 1 1 0-4h.09a1.7 1.7 0 0 0 .6-1 1.7 1.7 0 0 0-.34-1.88l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6V4a2 2 0 1 1 4 0v.09a1.7 1.7 0 0 0 1 .6 1.7 1.7 0 0 0 1.88-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 9c.24.37.4.78.6 1H20a2 2 0 1 1 0 4h-.09a1.7 1.7 0 0 0-.51 1Z"></path></svg>`,
    calendar: `<svg ${svgAttrs}><rect x="3" y="4" width="18" height="18" rx="2"></rect><path d="M16 2v4"></path><path d="M8 2v4"></path><path d="M3 10h18"></path></svg>`,
    user: `<svg ${svgAttrs}><circle cx="12" cy="8" r="4"></circle><path d="M4 21a8 8 0 0 1 16 0"></path></svg>`,
    clock: `<svg ${svgAttrs}><circle cx="12" cy="12" r="9"></circle><path d="M12 7v5l3 2"></path></svg>`,
    home: `<svg ${svgAttrs}><path d="m3 10 9-7 9 7"></path><path d="M5 10v10h14V10"></path><path d="M9 20v-6h6v6"></path></svg>`,
    logout: `<svg ${svgAttrs}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><path d="m16 17 5-5-5-5"></path><path d="M21 12H9"></path></svg>`,
    assistant: `<svg ${svgAttrs}><path d="M12 8V4"></path><path d="M8 4h8"></path><rect x="4" y="8" width="16" height="12" rx="3"></rect><path d="M9 14h.01"></path><path d="M15 14h.01"></path><path d="M9 18h6"></path></svg>`,
    send: `<svg ${svgAttrs}><path d="m22 2-7 20-4-9-9-4Z"></path><path d="M22 2 11 13"></path></svg>`,
    close: `<svg ${svgAttrs}><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>`
  };

  const navGroups = [
    {
      label: "Overview",
      items: [
        { href: "admin-dashboard.html", label: "Dashboard", icon: "dashboard" }
      ]
    },
    {
      label: "Students",
      items: [
        { href: "add-student.html", label: "Add Student", icon: "addStudent" },
        { href: "students.html", label: "Students", icon: "students" },
        { href: "passed-out-students.html", label: "Passed Out", icon: "graduate" },
        { href: "generate-tc.html", label: "Transfer Certificate", icon: "certificate" }
      ]
    },
    {
      label: "Academics",
      items: [
        { href: "teachers.html", label: "Teachers", icon: "teachers" },
        { href: "staff-management.html", label: "Staff Management", icon: "staff" },
        { href: "admin-timetable.html", label: "Timetable", icon: "timetable" },
        { href: "reportcards.html", label: "Report Cards", icon: "reportCards" },
        { href: "reports.html", label: "Reports", icon: "reports" },
        { href: "admin-report-cards.html", label: "Admin Reports", icon: "adminReports" }
      ]
    },
    {
      label: "Operations",
      items: [
        { href: "fees-report.html", label: "Fees Report", icon: "fees" },
        { href: "school-accounts.html", label: "Accounts Management", icon: "accountant" },
        { href: "accountant-management.html", label: "Accountant", icon: "accountant" },
        { href: "library-management.html", label: "Library", icon: "library" },
        { href: "vehicle-management.html", label: "Transport", icon: "transport" },
        { href: "notifications.html", label: "App Notifications", icon: "notifications" },
        { href: "notices.html", label: "Notices", icon: "notices" },
        { href: "additional-settings.html", label: "Settings", icon: "settings" }
      ]
    }
  ];

  function normalize(value) {
    return String(value || "").replace(/\s+/g, " ").trim();
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function getSchoolName() {
    const branded = window.SchoolBranding?.getSchoolName?.();
    if (normalize(branded)) return normalize(branded);
    try {
      return normalize(localStorage.getItem(storageKey)) || "Schoolix";
    } catch (_) {
      return "Schoolix";
    }
  }

  function firstNonEmpty(...values) {
    return values.map((value) => String(value || "").trim()).find(Boolean) || "";
  }

  function getSchoolLogoUrl() {
    const branded = window.SchoolBranding?.getSchoolLogoUrl?.();
    if (firstNonEmpty(branded)) return firstNonEmpty(branded);
    try {
      return firstNonEmpty(localStorage.getItem(logoStorageKey));
    } catch (_) {
      return "";
    }
  }

  function initials(name) {
    const words = normalize(name).split(" ").filter(Boolean);
    if (!words.length) return "SX";
    return words.slice(0, 2).map((word) => word[0]).join("").toUpperCase();
  }

  function renderIcon(name) {
    return icons[name] || icons.settings;
  }

  function renderProductLogo(alt = "Schoolix logo") {
    return `<img src="schoolix-app-icon.svg" alt="${escapeHtml(alt)}" draggable="false">`;
  }

  function renderBrandLogo(alt = "School logo") {
    const logoUrl = getSchoolLogoUrl();
    if (!logoUrl) return renderProductLogo();
    return `<img src="${escapeHtml(logoUrl)}" alt="${escapeHtml(alt)}" draggable="false">`;
  }

  function setBrandLogo(logoUrl = getSchoolLogoUrl()) {
    const mark = document.getElementById("sxAdminBrandMark");
    if (!mark) return;
    const cleanLogoUrl = firstNonEmpty(logoUrl);
    mark.classList.add("schoolix-branded-logo");
    mark.classList.toggle("schoolix-product-logo", !cleanLogoUrl);
    mark.dataset.schoolixLogoSource = cleanLogoUrl ? "school" : "product";
    mark.innerHTML = cleanLogoUrl
      ? `<img src="${escapeHtml(cleanLogoUrl)}" alt="School logo" draggable="false">`
      : renderProductLogo();
  }

  function persistBrandingContext({ schoolName, logoUrl } = {}) {
    const cleanSchoolName = normalize(schoolName);
    const cleanLogoUrl = firstNonEmpty(logoUrl);
    if (cleanSchoolName) {
      window.SchoolBranding?.persistSchoolName?.(cleanSchoolName);
      try {
        localStorage.setItem(storageKey, cleanSchoolName);
      } catch (_) {}
    }
    if (cleanLogoUrl) {
      window.SchoolBranding?.persistSchoolLogo?.(cleanLogoUrl);
      try {
        localStorage.setItem(logoStorageKey, cleanLogoUrl);
      } catch (_) {}
    }
    refreshBrand();
  }

  function getCurrentPageItem() {
    for (const group of navGroups) {
      const item = group.items.find((entry) => currentFile === entry.href.toLowerCase());
      if (item) return { ...item, group: group.label };
    }
    const title = normalize(document.title.replace(/^schoolix\s*[-|:]\s*/i, "")) || "Admin Page";
    return { href: currentFile, label: title, icon: "dashboard", group: "Admin" };
  }

  function formatDateTime() {
    const date = new Date();
    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  }

  function getLastOpenedLabel() {
    try {
      const previous = localStorage.getItem(lastOpenedStorageKey);
      localStorage.setItem(lastOpenedStorageKey, new Date().toISOString());
      if (!previous) return "First open";
      const date = new Date(previous);
      if (Number.isNaN(date.getTime())) return "First open";
      return date.toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    } catch (_) {
      return formatDateTime();
    }
  }

  function setHeaderText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  }

  function readAssistantHistory() {
    try {
      const parsed = JSON.parse(sessionStorage.getItem(assistantHistoryKey) || "[]");
      return Array.isArray(parsed) ? parsed.slice(-24) : [];
    } catch (_) {
      return [];
    }
  }

  function saveAssistantHistory() {
    try {
      sessionStorage.setItem(assistantHistoryKey, JSON.stringify(assistantState.messages.slice(-24)));
    } catch (_) {
      // Chat history is a convenience only.
    }
  }

  function showAssistantToast(message, type = "info") {
    const toast = document.createElement("div");
    toast.className = `sx-ai-toast sx-ai-toast-${type === "error" ? "error" : "info"}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    window.setTimeout(() => toast.classList.add("is-visible"), 20);
    window.setTimeout(() => {
      toast.classList.remove("is-visible");
      window.setTimeout(() => toast.remove(), 220);
    }, 3200);
  }

  function renderAssistantMessages() {
    const list = document.getElementById("sxAiMessages");
    if (!list) return;
    const messages = assistantState.messages.length ? assistantState.messages : [{
      role: "assistant",
      content: "Namaste. Ask me about fees, attendance, or monthly collection reports."
    }];
    list.innerHTML = messages.map((message) => {
      const role = message.role === "user" ? "user" : "assistant";
      return [
        `<div class="sx-ai-message sx-ai-message-${role}">`,
        `<div class="sx-ai-bubble">${escapeHtml(message.content).replace(/\n/g, "<br>")}</div>`,
        "</div>"
      ].join("");
    }).join("");
    list.scrollTop = list.scrollHeight;
  }

  function setAssistantLoading(loading) {
    assistantState.busy = loading;
    const form = document.getElementById("sxAiForm");
    const input = document.getElementById("sxAiInput");
    const sendButton = document.getElementById("sxAiSend");
    const loader = document.getElementById("sxAiTyping");
    if (form) form.classList.toggle("is-loading", loading);
    if (input) input.disabled = loading;
    if (sendButton) sendButton.disabled = loading;
    if (loader) loader.hidden = !loading;
    const list = document.getElementById("sxAiMessages");
    if (list) list.scrollTop = list.scrollHeight;
  }

  function setAssistantOpen(open) {
    const panel = document.getElementById("sxAiPanel");
    const launcher = document.getElementById("sxAiLauncher");
    if (!panel || !launcher) return;
    panel.hidden = !open;
    launcher.setAttribute("aria-expanded", String(open));
    if (open) {
      renderAssistantMessages();
      window.setTimeout(() => document.getElementById("sxAiInput")?.focus(), 80);
    }
  }

  async function submitAssistantMessage(event) {
    event?.preventDefault?.();
    if (assistantState.busy) return;
    const input = document.getElementById("sxAiInput");
    const value = normalize(input?.value || "");
    if (!value) return;
    if (!assistantState.authUser) {
      showAssistantToast("Please wait for admin login to finish.", "error");
      return;
    }
    assistantState.messages.push({ role: "user", content: value });
    input.value = "";
    renderAssistantMessages();
    setAssistantLoading(true);
    try {
      const token = await assistantState.authUser.getIdToken();
      const response = await fetch(assistantEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": supabaseAnonKey,
          "Authorization": `Bearer ${supabaseAnonKey}`,
          "x-firebase-token": token
        },
        body: JSON.stringify({
          message: value,
          schoolId: assistantState.schoolId,
          sessionId: getStoredViewSessionId(),
          page: currentFile
        })
      });
      const rawBody = await response.text();
      let data = {};
      try {
        data = rawBody ? JSON.parse(rawBody) : {};
      } catch (_) {
        data = { error: rawBody };
      }
      if (!response.ok) throw new Error(data.error || data.message || `Assistant request failed (${response.status})`);
      assistantState.messages.push({
        role: "assistant",
        content: normalize(data.reply) || "I could not prepare a response for that question."
      });
      saveAssistantHistory();
      renderAssistantMessages();
    } catch (error) {
      const rawMessage = error instanceof Error ? error.message : "Assistant is unavailable right now.";
      const message = /failed to fetch|networkerror/i.test(rawMessage)
        ? "Assistant backend is not reachable. Please check the deployed school-assistant function and internet connection."
        : rawMessage;
      assistantState.messages.push({ role: "assistant", content: message });
      saveAssistantHistory();
      renderAssistantMessages();
      showAssistantToast(message, "error");
    } finally {
      setAssistantLoading(false);
    }
  }

  function createAssistant() {
    if (document.getElementById("sxAiAssistant") || skipFiles.has(currentFile)) return;
    assistantState.messages = readAssistantHistory();
    const assistant = document.createElement("section");
    assistant.id = "sxAiAssistant";
    assistant.className = "sx-ai-assistant";
    assistant.setAttribute("aria-label", "AI School Assistant");
    assistant.innerHTML = [
      `<button type="button" class="sx-ai-launcher" id="sxAiLauncher" aria-haspopup="dialog" aria-expanded="false" title="AI School Assistant">${renderIcon("assistant")}<span>AI Assistant</span></button>`,
      '<div class="sx-ai-panel" id="sxAiPanel" role="dialog" aria-modal="false" aria-labelledby="sxAiTitle" hidden>',
      '<div class="sx-ai-head">',
      `<div class="sx-ai-head-icon">${renderIcon("assistant")}</div>`,
      '<div><strong id="sxAiTitle">AI School Assistant</strong><small>Fees and attendance insights</small></div>',
      `<button type="button" class="sx-ai-close" id="sxAiClose" aria-label="Close assistant">${renderIcon("close")}</button>`,
      '</div>',
      '<div class="sx-ai-messages" id="sxAiMessages" aria-live="polite"></div>',
      '<div class="sx-ai-typing" id="sxAiTyping" hidden><span></span><span></span><span></span></div>',
      '<form class="sx-ai-form" id="sxAiForm">',
      '<textarea id="sxAiInput" rows="1" maxlength="1000" placeholder="Ask about fees or attendance..."></textarea>',
      `<button type="submit" id="sxAiSend" aria-label="Send message">${renderIcon("send")}</button>`,
      '</form>',
      '</div>'
    ].join("");
    document.body.appendChild(assistant);
    renderAssistantMessages();
    document.getElementById("sxAiLauncher")?.addEventListener("click", () => {
      const panel = document.getElementById("sxAiPanel");
      setAssistantOpen(panel?.hidden !== false);
    });
    document.getElementById("sxAiClose")?.addEventListener("click", () => setAssistantOpen(false));
    document.getElementById("sxAiForm")?.addEventListener("submit", submitAssistantMessage);
    document.getElementById("sxAiInput")?.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && !event.shiftKey) submitAssistantMessage(event);
    });
  }

  function getSessionLabel(session) {
    return normalize(session?.session || session?.name || (
      session?.startYear && session?.endYear ? `${session.startYear}-${session.endYear}` : ""
    )) || "Unnamed session";
  }

  function sortSessions(sessions) {
    return [...sessions].sort((a, b) => {
      const left = Number(b.startYear || String(b.session || "").slice(0, 4) || 0);
      const right = Number(a.startYear || String(a.session || "").slice(0, 4) || 0);
      return left - right || getSessionLabel(b).localeCompare(getSessionLabel(a), undefined, { numeric: true });
    });
  }

  function setSessionDropdownState(open) {
    const dropdown = document.getElementById("sxAdminSessionDropdown");
    const button = document.getElementById("sxAdminSessionButton");
    if (!dropdown || !button) return;
    dropdown.hidden = !open;
    button.setAttribute("aria-expanded", String(open));
  }

  function getStoredViewSessionId() {
    try {
      return localStorage.getItem(viewSessionStorageKey) || "";
    } catch (_) {
      return "";
    }
  }

  function storeViewSessionId(sessionId) {
    try {
      localStorage.setItem(viewSessionStorageKey, sessionId || "");
    } catch (_) {
      // Ignore private browsing/storage failures.
    }
  }

  function renderSessionOptions({ sessions = [], activeSessionId = "", viewSessionId = "", canChange = false, onSelect }) {
    const list = document.getElementById("sxAdminSessionList");
    if (!list) return;
    if (!sessions.length) {
      list.innerHTML = '<div class="sx-admin-session-empty">No sessions saved yet.</div>';
      return;
    }
    list.innerHTML = sortSessions(sessions).map((session) => {
      const label = getSessionLabel(session);
      const isActive = session.id === activeSessionId;
      const isViewing = session.id === viewSessionId;
      const locked = session.locked === true;
      const classesLocked = session.classesLocked === true;
      return [
        `<button type="button" class="sx-admin-session-option${isViewing ? " is-active" : ""}" data-session-id="${escapeHtml(session.id)}" ${!canChange || isViewing ? "disabled" : ""}>`,
        '<span>',
        `<strong>${escapeHtml(label)}</strong>`,
        `<small>${isViewing ? "Currently viewing" : "View this session"}${isActive ? " / School active" : ""}${locked ? " / Locked" : ""}${classesLocked ? " / Classes locked" : ""}</small>`,
        '</span>',
        `<span class="sx-admin-session-state">${locked ? "Locked" : "Open"}</span>`,
        "</button>"
      ].join("");
    }).join("");
    list.querySelectorAll(".sx-admin-session-option").forEach((button) => {
      button.addEventListener("click", () => {
        const id = button.dataset.sessionId || "";
        if (id && typeof onSelect === "function") onSelect(id);
      });
    });
  }

  function createHeader() {
    if (document.querySelector(".sx-admin-header")) return;
    const schoolName = getSchoolName();
    const page = getCurrentPageItem();
    const header = document.createElement("header");
    header.className = "sx-admin-header";
    header.setAttribute("aria-label", "Admin workspace header");
    header.innerHTML = [
      '<div class="sx-admin-header-main">',
      `<div class="sx-admin-header-icon">${renderIcon(page.icon)}</div>`,
      '<div class="sx-admin-header-title-wrap">',
      `<div class="sx-admin-header-kicker"><span id="sxAdminHeaderSchool">${escapeHtml(schoolName)}</span> / ${escapeHtml(page.group)}</div>`,
      `<h1 id="sxAdminHeaderPage">${escapeHtml(page.label)}</h1>`,
      "</div>",
      "</div>",
      '<div class="sx-admin-header-meta" aria-label="Admin page context">',
      '<div class="sx-admin-session-menu">',
      '<button type="button" class="sx-admin-meta-pill sx-admin-session-pill" id="sxAdminSessionButton" aria-haspopup="listbox" aria-expanded="false">',
      `<span class="sx-admin-meta-icon">${renderIcon("calendar")}</span>`,
      '<span><small>Viewing session</small><strong id="sxAdminActiveSession">Loading...</strong></span>',
      '<span class="sx-admin-session-caret" aria-hidden="true">v</span>',
      "</button>",
      '<div class="sx-admin-session-dropdown" id="sxAdminSessionDropdown" hidden>',
      '<div class="sx-admin-session-dropdown-head">',
      '<strong>View Session</strong>',
      '<small id="sxAdminSessionHint">Loading sessions...</small>',
      "</div>",
      '<div class="sx-admin-session-list" id="sxAdminSessionList">',
      '<div class="sx-admin-session-empty">Loading sessions...</div>',
      "</div>",
      "</div>",
      "</div>",
      '<div class="sx-admin-meta-pill">',
      `<span class="sx-admin-meta-icon">${renderIcon("user")}</span>`,
      '<span><small>Signed in as</small><strong id="sxAdminSignedInAs">Admin</strong></span>',
      "</div>",
      '<div class="sx-admin-meta-pill">',
      `<span class="sx-admin-meta-icon">${renderIcon("clock")}</span>`,
      `<span><small>Last opened</small><strong id="sxAdminOpenedAt">${escapeHtml(getLastOpenedLabel())}</strong></span>`,
      "</div>",
      '<div class="sx-admin-header-actions">',
      `<button type="button" class="sx-admin-header-action sx-admin-logout-action sx-admin-logout-trigger" title="Logout">${renderIcon("logout")}<span>Logout</span></button>`,
      "</div>",
      "</div>"
    ].join("");

    const sidebar = document.querySelector(".sx-admin-sidebar");
    if (sidebar?.nextSibling) {
      document.body.insertBefore(header, sidebar.nextSibling);
    } else {
      document.body.prepend(header);
    }
    syncHeaderOffset(header);
    const sessionButton = document.getElementById("sxAdminSessionButton");
    sessionButton?.addEventListener("click", (event) => {
      event.stopPropagation();
      const dropdown = document.getElementById("sxAdminSessionDropdown");
      setSessionDropdownState(dropdown?.hidden !== false);
    });
    document.addEventListener("click", (event) => {
      if (!event.target.closest?.(".sx-admin-session-menu")) setSessionDropdownState(false);
    });
  }

  function syncHeaderOffset(header) {
    const update = () => {
      if (!header?.isConnected) return;
      const height = Math.ceil(header.getBoundingClientRect().height);
      if (height > 0) {
        document.documentElement.style.setProperty("--sx-admin-header-offset", `${height + 16}px`);
      }
    };
    update();
    requestAnimationFrame(update);
    window.setTimeout(update, 250);
    window.setTimeout(update, 1000);
    if (window.ResizeObserver) {
      window.sxAdminHeaderResizeObserver?.disconnect?.();
      window.sxAdminHeaderResizeObserver = new ResizeObserver(update);
      window.sxAdminHeaderResizeObserver.observe(header);
    } else {
      window.addEventListener("resize", update, { passive: true });
    }
  }

  function isFloatingLayer(element) {
    if (!element || element === document.body || element === document.documentElement) return false;
    // Interactive controls can contain words such as "modal" in their class
    // names (for example, "history-modal-close"). They are part of a layer,
    // not layers themselves, and must never be moved out of their modal.
    if (element.matches?.("button,input,select,textarea,a,label,[role='button']")) return false;
    const floatingAncestor = element.parentElement?.closest?.(
      "dialog,.modal,.modal-overlay,.modal-backdrop,.popup,.popup-overlay,[id$='Modal'],[id$='Popup']"
    );
    if (floatingAncestor) return false;
    const name = `${element.id || ""} ${element.className || ""}`.toLowerCase();
    if (name.includes("sx-admin-sidebar") || name.includes("sx-admin-header") || name.includes("sx-admin-menu")) return false;
    if (/(^|[-_\s])(modal-content|modal-card|modal-box|modal-header|modal-body|photo-preview-content)([-_\s]|$)/.test(name)) return false;
    if (element.tagName === "DIALOG") return true;
    if (/(^|[-_\s])(modal|popup|toast|notification|snackbar|alert)([-_\s]|$)/.test(name)) return true;
    const style = getComputedStyle(element);
    const zIndex = Number.parseInt(style.zIndex, 10);
    return style.position === "fixed" && Number.isFinite(zIndex) && zIndex >= 1000;
  }

  function isLayerVisible(element) {
    if (!element || element.hidden) return false;
    const style = getComputedStyle(element);
    return style.display !== "none" && style.visibility !== "hidden" && style.opacity !== "0";
  }

  function hoistFloatingLayer(element) {
    if (!isFloatingLayer(element) || !isLayerVisible(element)) return;
    if (element.parentElement !== document.body) {
      element.dataset.sxAdminHoisted = "true";
      document.body.appendChild(element);
    }
    const isToast = /(^|[-_\s])(toast|notification|snackbar)([-_\s]|$)/.test(`${element.id || ""} ${element.className || ""}`.toLowerCase());
    element.style.setProperty("z-index", isToast ? "2147482020" : "2147482000", "important");
  }

  function scanFloatingLayers(root = document) {
    if (root !== document && root.nodeType !== Node.ELEMENT_NODE) return;
    const selector = "dialog,.modal,.modal-overlay,.modal-backdrop,.popup,.popup-overlay,.toast,.notification,.snackbar,[id$='Modal'],[id$='Popup'],[id*='toast' i],[class~='modal'],[class~='popup'],[class~='toast'],[class~='notification'],[class~='snackbar']";
    const elements = root === document
      ? Array.from(document.querySelectorAll(selector))
      : [root, ...Array.from(root.querySelectorAll?.(selector) || [])];
    elements.forEach(hoistFloatingLayer);
  }

  async function loadBrandingForSchool({ db, getDoc, doc, schoolId, userId, userData = {} }) {
    const sources = [];
    if (userData && Object.keys(userData).length) sources.push(userData);

    async function addSource(pathParts, label) {
      try {
        const snap = await getDoc(doc(db, ...pathParts));
        if (snap.exists()) sources.push(snap.data());
      } catch (error) {
        console.warn(`Admin ${label} branding unavailable:`, error);
      }
    }

    if (schoolId && schoolId !== userId) {
      await addSource(["users", schoolId], "owner profile");
    }
    if (schoolId) {
      await addSource(["schools", schoolId], "school profile");
      await addSource(["schools", schoolId, "config", "branding"], "school config");
    }

    let schoolName = getSchoolName();
    let logoUrl = getSchoolLogoUrl();
    sources.forEach((source) => {
      schoolName = firstNonEmpty(source.schoolName, schoolName);
      logoUrl = firstNonEmpty(source.logoUrl, source.schoolLogoUrl, logoUrl);
    });

    persistBrandingContext({ schoolName, logoUrl });
  }

  function installFloatingLayerGuard() {
    if (document.body.dataset.sxAdminFloatingGuard === "true") return;
    document.body.dataset.sxAdminFloatingGuard = "true";
    scanFloatingLayers();
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          mutation.addedNodes.forEach((node) => scanFloatingLayers(node));
        } else if (mutation.type === "attributes") {
          scanFloatingLayers(mutation.target);
        }
      });
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["class", "style", "hidden", "open"]
    });
  }

  async function loadFirebaseContext() {
    try {
      const [{ initializeApp, getApps }, { getAuth, onAuthStateChanged, signOut }, { getFirestore, doc, getDoc, collection, getDocs }] = await Promise.all([
        import("./firebase-compat.js?v=staff-loaders-20260806"),
        import("./firebase-compat.js?v=staff-loaders-20260806"),
        import("./firebase-compat.js?v=staff-loaders-20260806")
      ]);
      const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
      const auth = getAuth(app);
      const db = getFirestore(app);
      document.querySelectorAll(".sx-admin-logout-trigger").forEach((logoutButton) => {
        if (logoutButton.dataset.sxLogoutBound === "true") return;
        logoutButton.dataset.sxLogoutBound = "true";
        logoutButton.addEventListener("click", async () => {
          if (logoutButton.disabled) return;
          const original = logoutButton.innerHTML;
          document.querySelectorAll(".sx-admin-logout-trigger").forEach((button) => {
            button.disabled = true;
            button.innerHTML = `${renderIcon("logout")}<span>Logging out...</span>`;
          });
        try {
          await signOut(auth);
          window.location.href = "index.html";
        } catch (error) {
          console.warn("Admin logout failed:", error);
          document.querySelectorAll(".sx-admin-logout-trigger").forEach((button) => {
            button.disabled = false;
            button.innerHTML = original;
          });
          window.alert("Logout failed. Please try again.");
        }
        });
      });

      async function refreshSessionsForSchool({ schoolId, canChange }) {
        const [activeSnap, sessionsSnap] = await Promise.all([
          getDoc(doc(db, "schools", schoolId, "settings", "activeSession")),
          getDocs(collection(db, "schools", schoolId, "sessions"))
        ]);
        const activeData = activeSnap.exists() ? activeSnap.data() : {};
        const activeSessionId = activeData.sessionId || "";
        const sessions = sessionsSnap.docs.map((sessionDoc) => ({ id: sessionDoc.id, ...sessionDoc.data() }));
        let viewSessionId = getStoredViewSessionId();
        if (viewSessionId && !sessions.some((session) => session.id === viewSessionId)) {
          viewSessionId = "";
          storeViewSessionId("");
        }
        viewSessionId = viewSessionId || activeSessionId;
        const viewSession = sessions.find((session) => session.id === viewSessionId);
        const activeSession = sessions.find((session) => session.id === activeSessionId);
        const viewLabel = viewSession ? getSessionLabel(viewSession) : normalize(activeData.session || activeData.name || "");
        const locked = viewSession?.locked === true;
        setHeaderText("sxAdminActiveSession", viewLabel ? `${viewLabel}${locked ? " (Locked)" : ""}` : "No session selected");
        setHeaderText("sxAdminSessionHint", canChange ? "Choose a session to view" : "Only admin can switch view");
        renderSessionOptions({
          sessions,
          activeSessionId,
          viewSessionId,
          canChange,
          onSelect: async (sessionId) => {
            const session = sessions.find((entry) => entry.id === sessionId);
            if (!session) return;
            const label = getSessionLabel(session);
            const button = document.getElementById("sxAdminSessionButton");
            if (button) button.disabled = true;
            setHeaderText("sxAdminActiveSession", label);
            try {
              storeViewSessionId(sessionId);
              setSessionDropdownState(false);
              await refreshSessionsForSchool({ schoolId, canChange });
              window.dispatchEvent(new CustomEvent("schoolix:active-session-changed", {
                detail: { sessionId, session: label }
              }));
              window.location.reload();
            } catch (error) {
              console.warn("Session view switch failed:", error);
              setHeaderText("sxAdminActiveSession", activeSession ? getSessionLabel(activeSession) : "Session unavailable");
              window.alert("Unable to switch session view. Please try again.");
            } finally {
              if (button) button.disabled = false;
            }
          }
        });
      }

      onAuthStateChanged(auth, async (user) => {
        if (!user) {
          assistantState.authUser = null;
          assistantState.schoolId = "";
          assistantState.role = "";
          setHeaderText("sxAdminSignedInAs", "Not signed in");
          setHeaderText("sxAdminActiveSession", "No active session");
          return;
        }

        assistantState.authUser = user;
        let schoolId = user.uid;
        let roleLabel = "Admin";
        let role = "admin";
        let userData = {};
        let isSchoolOwner = true;
        try {
          const userSnap = await getDoc(doc(db, "users", user.uid));
          userData = userSnap.exists() ? userSnap.data() : {};
          role = normalize(userData.role || "admin").toLowerCase();
          roleLabel = role ? role[0].toUpperCase() + role.slice(1) : "Admin";
          isSchoolOwner = role === "admin" || role === "superadmin" || userData.superAdmin === true;
          schoolId = isSchoolOwner ? user.uid : (userData.adminId || userData.schoolId || user.uid);
          assistantState.schoolId = schoolId;
          assistantState.role = role;
          setHeaderText("sxAdminSignedInAs", roleLabel);
        } catch (_) {
          assistantState.schoolId = schoolId;
          assistantState.role = role;
          setHeaderText("sxAdminSignedInAs", roleLabel);
        }

        await loadBrandingForSchool({
          db,
          getDoc,
          doc,
          schoolId,
          userId: user.uid,
          userData: isSchoolOwner ? userData : {}
        });

        try {
          await refreshSessionsForSchool({ schoolId, canChange: role === "admin" });
        } catch (_) {
          setHeaderText("sxAdminActiveSession", "Session unavailable");
        }
      });
    } catch (error) {
      console.warn("Admin header context failed:", error);
      setHeaderText("sxAdminActiveSession", "Session unavailable");
    }
  }

  function closeSidebar() {
    document.body.classList.remove("sx-admin-shell-open");
    updateMenuButtonState();
  }

  function isDesktop() {
    return desktopQuery.matches;
  }

  function getStoredCollapsed() {
    try {
      return localStorage.getItem(collapseStorageKey) === "true";
    } catch (_) {
      return false;
    }
  }

  function storeCollapsed(value) {
    try {
      localStorage.setItem(collapseStorageKey, value ? "true" : "false");
    } catch (_) {
      // Ignore private browsing/storage failures.
    }
  }

  function updateMenuButtonState() {
    const button = document.querySelector(".sx-admin-menu-btn");
    if (!button) return;
    const collapsed = document.body.classList.contains("sx-admin-shell-collapsed");
    const open = document.body.classList.contains("sx-admin-shell-open");
    button.setAttribute("aria-expanded", String(isDesktop() ? !collapsed : open));
    button.setAttribute("aria-label", isDesktop()
      ? (collapsed ? "Open admin navigation" : "Close admin navigation")
      : (open ? "Close admin navigation" : "Open admin navigation"));
  }

  function markShellAnimating() {
    document.body.classList.add("sx-admin-shell-animating");
    window.clearTimeout(markShellAnimating.timer);
    markShellAnimating.timer = window.setTimeout(() => {
      document.body.classList.remove("sx-admin-shell-animating");
    }, 280);
  }

  function scrollActiveNavIntoView() {
    const nav = document.querySelector(".sx-admin-nav");
    const activeLink = nav?.querySelector(".sx-admin-nav-link.is-active");
    if (!nav || !activeLink) return;
    const sync = () => {
      const navRect = nav.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();
      const isAbove = linkRect.top < navRect.top + 12;
      const isBelow = linkRect.bottom > navRect.bottom - 12;
      if (!isAbove && !isBelow) return;
      const nextTop = activeLink.offsetTop - nav.clientHeight + activeLink.offsetHeight + 34;
      nav.scrollTo({ top: Math.max(0, nextTop), behavior: document.body.classList.contains("sx-admin-shell-hydrating") ? "auto" : "smooth" });
    };
    requestAnimationFrame(sync);
    window.setTimeout(sync, 250);
  }

  function createSidebar() {
    if (document.querySelector(".sx-admin-sidebar")) {
      createHeader();
      scrollActiveNavIntoView();
      return;
    }
    document.body.classList.add("sx-admin-shell-enabled", "sx-admin-shell-hydrating");

    const schoolName = getSchoolName();
    const sidebar = document.createElement("aside");
    sidebar.className = "sx-admin-sidebar";
    sidebar.setAttribute("aria-label", "Admin navigation");
    const safeSchoolName = escapeHtml(schoolName);
    const schoolLogoUrl = getSchoolLogoUrl();
    sidebar.innerHTML = [
      '<div class="sx-admin-brand" data-school-branding="ignore">',
      `<div class="sx-admin-brand-mark schoolix-branded-logo${schoolLogoUrl ? "" : " schoolix-product-logo"}" id="sxAdminBrandMark" data-schoolix-logo-source="${schoolLogoUrl ? "school" : "product"}">${renderBrandLogo()}</div>`,
      '<div>',
      `<div class="sx-admin-brand-name" id="sxAdminBrandName">${safeSchoolName}</div>`,
      '<div class="sx-admin-brand-kicker">Admin Panel</div>',
      "</div>",
      "</div>",
      '<nav class="sx-admin-nav">',
      navGroups.map((group) => [
        '<div class="sx-admin-nav-group">',
        `<div class="sx-admin-nav-label">${group.label}</div>`,
        group.items.map((item) => {
          const isActive = currentFile === item.href.toLowerCase();
          return [
            `<a class="sx-admin-nav-link${isActive ? " is-active" : ""}" href="${item.href}" title="${escapeHtml(item.label)}" ${isActive ? 'aria-current="page"' : ""}>`,
            `<span class="sx-admin-nav-icon">${renderIcon(item.icon)}</span>`,
            `<span class="sx-admin-nav-text">${item.label}</span>`,
            "</a>"
          ].join("");
        }).join(""),
        "</div>"
      ].join("")).join(""),
      "</nav>",
      '<div class="sx-admin-sidebar-footer">',
      '<div>Secure school workspace</div>',
      "</div>"
    ].join("");

    const button = document.createElement("button");
    button.type = "button";
    button.className = "sx-admin-menu-btn";
    button.setAttribute("aria-label", "Open admin navigation");
    button.setAttribute("aria-expanded", "false");
    button.innerHTML = [
      '<span class="sx-admin-toggle-arrow" aria-hidden="true">',
      `<svg ${svgAttrs}><path d="m15 18-6-6 6-6"></path></svg>`,
      "</span>"
    ].join("");

    const overlay = document.createElement("div");
    overlay.className = "sx-admin-overlay";
    overlay.addEventListener("click", closeSidebar);

    button.addEventListener("click", () => {
      markShellAnimating();
      if (isDesktop()) {
        const collapsed = document.body.classList.toggle("sx-admin-shell-collapsed");
        document.body.classList.remove("sx-admin-shell-open");
        storeCollapsed(collapsed);
      } else {
        document.body.classList.toggle("sx-admin-shell-open");
      }
      updateMenuButtonState();
    });

    sidebar.addEventListener("click", (event) => {
      if (event.target.closest("a")) closeSidebar();
    });

    document.body.prepend(overlay);
    document.body.prepend(sidebar);
    document.body.prepend(button);
    createHeader();
    document.body.classList.toggle("sx-admin-shell-collapsed", isDesktop() && getStoredCollapsed());
    scrollActiveNavIntoView();
    requestAnimationFrame(() => {
      document.body.classList.remove("sx-admin-shell-hydrating");
      scrollActiveNavIntoView();
    });
    desktopQuery.addEventListener("change", () => {
      markShellAnimating();
      document.body.classList.remove("sx-admin-shell-open");
      document.body.classList.toggle("sx-admin-shell-collapsed", isDesktop() && getStoredCollapsed());
      updateMenuButtonState();
    });
    updateMenuButtonState();
    scrollActiveNavIntoView();
  }

  function refreshBrand() {
    const schoolName = getSchoolName();
    const name = document.getElementById("sxAdminBrandName");
    const headerSchool = document.getElementById("sxAdminHeaderSchool");
    if (name) name.textContent = schoolName;
    setBrandLogo();
    if (headerSchool) headerSchool.textContent = schoolName;
  }

  function init() {
    if (skipFiles.has(currentFile)) return;
    if (isDashboardPage) {
      document.body.classList.add("sx-admin-shell-enabled", "sx-admin-shell-header-only");
      createHeader();
      createAssistant();
      installFloatingLayerGuard();
      refreshBrand();
      loadFirebaseContext();
      window.setTimeout(refreshBrand, 600);
      window.setTimeout(refreshBrand, 1600);
      return;
    }
    createSidebar();
    createAssistant();
    installFloatingLayerGuard();
    refreshBrand();
    loadFirebaseContext();
    window.setTimeout(refreshBrand, 600);
    window.setTimeout(refreshBrand, 1600);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
