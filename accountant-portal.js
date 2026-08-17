const ACCOUNTANT_ICONS = {
  dashboard: '<rect x="3" y="3" width="7" height="7" rx="1.5"></rect><rect x="14" y="3" width="7" height="7" rx="1.5"></rect><rect x="14" y="14" width="7" height="7" rx="1.5"></rect><rect x="3" y="14" width="7" height="7" rx="1.5"></rect>',
  fees: '<path d="M6 3h12"></path><path d="M6 8h12"></path><path d="M8 3c4 0 6 2 6 5s-2 5-6 5l7 8"></path>',
  accounts: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15Z"></path><path d="M8 7h8"></path><path d="M8 11h6"></path>',
  salary: '<rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="M7 9h10"></path><path d="M7 13h4"></path><path d="M15 13h2"></path>',
  scan: '<path d="M3 7V5a2 2 0 0 1 2-2h2"></path><path d="M17 3h2a2 2 0 0 1 2 2v2"></path><path d="M21 17v2a2 2 0 0 1-2 2h-2"></path><path d="M7 21H5a2 2 0 0 1-2-2v-2"></path><path d="M7 12h10"></path>',
  attendance: '<path d="M9 11l3 3L22 4"></path><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>',
  notices: '<path d="M3 11v2a2 2 0 0 0 2 2h2l4 4v-4h4l6 3V6l-6 3H5a2 2 0 0 0-2 2Z"></path><path d="M21 9v6"></path>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"></rect><path d="M16 2v4"></path><path d="M8 2v4"></path><path d="M3 10h18"></path>',
  user: '<circle cx="12" cy="8" r="4"></circle><path d="M4 21a8 8 0 0 1 16 0"></path>',
  clock: '<circle cx="12" cy="12" r="9"></circle><path d="M12 7v5l3 2"></path>',
  logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><path d="m16 17 5-5-5-5"></path><path d="M21 12H9"></path>'
};

const ACCOUNTANT_VIEW_SESSION_KEY = "schoolix.viewSessionId";
const ACCOUNTANT_HEADER_OPENED_KEY = "schoolix.accountantLastOpenedAt";
const ACCOUNTANT_FIREBASE_CONFIG = {
  apiKey: "AIzaSyAomGwef93HFT9Xyx7SVW95FPw_IcIAICE",
  authDomain: "schoolix-48107.firebaseapp.com",
  projectId: "schoolix-48107"
};

const ACCOUNTANT_NAV_ITEMS = [
  { key: "dashboard", href: "accountant-dashboard.html", label: "Dashboard", icon: "dashboard", section: "Accounts" },
  { key: "fees", href: "fees-report.html", label: "Fees", icon: "fees" },
  { key: "accounts", href: "school-accounts.html", label: "Ledger", icon: "accounts" },
  { key: "salary", href: "accountant-salary.html", label: "Salary", icon: "salary" },
  { key: "qr", href: "accountant-qr-checkin.html", label: "QR Check-In", icon: "scan", section: "Attendance" },
  { key: "attendance", href: "accountant-attendance.html", label: "Records", icon: "attendance" },
  { key: "notices", href: "accountant-notices.html", label: "Notices", icon: "notices", section: "Communication" }
];

function isAccountantNativeApp() {
  return Boolean(window.Capacitor?.isNativePlatform?.());
}

function visibleAccountantNavItems() {
  if (!isAccountantNativeApp()) return ACCOUNTANT_NAV_ITEMS;
  const allowed = new Set(["dashboard", "qr", "attendance", "notices"]);
  return ACCOUNTANT_NAV_ITEMS.filter((item) => allowed.has(item.key));
}

function accountantNavIcon(name) {
  return `<span class="library-nav-icon" aria-hidden="true"><svg viewBox="0 0 24 24">${ACCOUNTANT_ICONS[name] || ACCOUNTANT_ICONS.dashboard}</svg></span>`;
}

function accountantInlineIcon(name) {
  return `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${ACCOUNTANT_ICONS[name] || ACCOUNTANT_ICONS.dashboard}</svg>`;
}

function accountantEscapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
}

function accountantClean(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function accountantLinkedSchoolId(data = {}) {
  return accountantClean(data.adminId || data.schoolId || data.schoolID || data.adminUID || data.adminUid || data.schoolUID || data.schoolUid || data.schoolDocId || data.schoolDocID || "");
}

function accountantSchoolName() {
  return accountantClean(window.SchoolBranding?.getSchoolName?.()) || (() => {
    try { return accountantClean(localStorage.getItem("schoolix.schoolName")); } catch (_) { return ""; }
  })() || "Schoolix";
}

function accountantPageInfo() {
  const key = activeAccountantKey();
  const item = ACCOUNTANT_NAV_ITEMS.find((entry) => entry.key === key) || ACCOUNTANT_NAV_ITEMS[0];
  return { ...item, group: item.section || "Accounts" };
}

function accountantSessionLabel(session = {}) {
  return accountantClean(session.label || session.session || session.name || session.academicSession || session.year || session.id);
}

function getStoredAccountantViewSessionId() {
  try { return localStorage.getItem(ACCOUNTANT_VIEW_SESSION_KEY) || ""; } catch (_) { return ""; }
}

function storeAccountantViewSessionId(sessionId) {
  try {
    if (sessionId) localStorage.setItem(ACCOUNTANT_VIEW_SESSION_KEY, sessionId);
    else localStorage.removeItem(ACCOUNTANT_VIEW_SESSION_KEY);
  } catch (_) {}
}

function accountantLastOpenedLabel() {
  const now = new Date();
  try { localStorage.setItem(ACCOUNTANT_HEADER_OPENED_KEY, now.toISOString()); } catch (_) {}
  return now.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
}

function setAccountantHeaderText(id, text) {
  const element = document.getElementById(id);
  if (element) element.textContent = text;
}

function activeAccountantKey() {
  const explicit = document.body?.dataset?.accountantPage;
  if (explicit) return explicit;
  const page = location.pathname.split("/").pop() || "accountant-dashboard.html";
  if (page === "accountant-qr-checkin.html") return "qr";
  if (page === "accountant-attendance.html") return "attendance";
  if (page === "accountant-notices.html") return "notices";
  if (page === "fees-report.html") return "fees";
  if (page === "school-accounts.html") return "accounts";
  if (page === "accountant-salary.html") return "salary";
  return "dashboard";
}

function useSimpleAccountantShell() {
  return document.body?.dataset?.accountantSimpleShell === "true" || activeAccountantKey() === "dashboard";
}

function accountantSidebarHtml() {
  const active = activeAccountantKey();
  let lastSection = "";
  const links = visibleAccountantNavItems().map((item) => {
    const section = item.section && item.section !== lastSection
      ? `<div class="library-nav-label">${item.section}</div>`
      : "";
    if (item.section) lastSection = item.section;
    const current = item.key === active;
    return `${section}<a class="library-nav-link ${current ? "active" : ""}" href="${item.href}" title="${accountantEscapeHtml(item.label)}" ${current ? 'aria-current="page"' : ""}>${accountantNavIcon(item.icon)}<span class="library-nav-text">${accountantEscapeHtml(item.label)}</span></a>`;
  }).join("");

  return `
    <div class="library-brand">
      <div class="library-brand-mark" aria-hidden="true"><svg viewBox="0 0 24 24">${ACCOUNTANT_ICONS.accounts}</svg></div>
      <div>
        <strong id="sidebarSchoolName">Schoolix</strong>
        <span>Accounts Portal</span>
      </div>
    </div>
    <nav class="library-nav" aria-label="Accounts navigation">${links}</nav>
    <div class="library-sidebar-footer">Fees, ledger, notices, and attendance records in one workspace.</div>
    <div class="sx-accountant-sidebar-toggle-wrap">
      <button type="button" class="library-menu-button sx-accountant-sidebar-toggle" id="accountantSidebarToggle" aria-label="Close accounts navigation" aria-expanded="true" title="Collapse sidebar">
        ${accountantToggleIconHtml()}
      </button>
    </div>
  `;
}

function renderAccountantSidebar() {
  const sidebar = document.getElementById("librarySidebar") || document.getElementById("noticeSidebar");
  if (!sidebar) return;
  sidebar.classList.add("library-sidebar");
  sidebar.innerHTML = accountantSidebarHtml();
}

function accountantToggleIconHtml() {
  return '<span class="library-toggle-arrow" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="m15 18-6-6 6-6"></path></svg></span>';
}

function normalizeAccountantMenuButton(button) {
  if (!button) return;
  button.innerHTML = accountantToggleIconHtml();
  button.setAttribute("aria-label", "Open accounts navigation");
}

function bindAccountantToggleButton(button) {
  if (!button) return;
  normalizeAccountantMenuButton(button);
  button.onclick = () => window.toggleAccountantSidebar();
}

function setupAccountantToggleButtons() {
  bindAccountantToggleButton(document.getElementById("libraryMenuButton") || document.getElementById("noticeMenuButton"));
  bindAccountantToggleButton(document.getElementById("accountantSidebarToggle"));
}

function signalAccountantShellReady() {
  window.SchoolixAccountantShellReady = true;
  const notify = () => {
    window.SchoolixPageLoader?.markReady?.("accountant-shell-ready");
    window.SchoolixPageLoader?.requestHide?.("accountant-shell-ready");
    try {
      window.dispatchEvent(new CustomEvent("schoolix:page-ready", { detail: { source: "accountant-shell" } }));
    } catch (_) {}
  };
  notify();
  requestAnimationFrame(notify);
  window.setTimeout(notify, 120);
  window.setTimeout(notify, 420);
}

function ensureAccountantStylesheet() {
  if (document.querySelector('link[href*="accountant-portal.css"]')) return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "accountant-portal.css?v=accountant-portal-20260806-3";
  document.head.appendChild(link);
}

function ensureAccountantShell() {
  ensureAccountantStylesheet();
  document.body.classList.add("library-dashboard-app", "sx-accountant-shell-enabled");
  document.body.classList.toggle("sx-accountant-simple-shell", useSimpleAccountantShell());
  document.documentElement.classList.toggle("is-native-app", isAccountantNativeApp());
  document.body.classList.toggle("is-native-app", isAccountantNativeApp());
  document.body.classList.remove("sx-admin-shell-enabled", "sx-admin-shell-open", "sx-admin-shell-collapsed", "sx-admin-shell-header-only");
  document.querySelectorAll(".sx-admin-sidebar, .sx-admin-menu-btn, .sx-admin-overlay, .sx-admin-header").forEach((element) => element.remove());

  let layout = document.querySelector(".library-app-layout");
  let main = document.querySelector(".library-app-layout > .library-main");
  if (!layout) {
    layout = document.createElement("div");
    layout.className = "library-app-layout sx-accountant-injected-layout";
    layout.setAttribute("data-accountant-shell", "true");

    main = document.createElement("main");
    main.className = "library-main sx-accountant-injected-main";

    Array.from(document.body.children).forEach((child) => {
      if (child.id === "sxPageLoader") return;
      if (child.matches("script, style, link, .library-app-layout, .library-sidebar, .library-sidebar-overlay, .library-menu-button")) return;
      main.appendChild(child);
    });

    layout.appendChild(main);
    const loader = document.getElementById("sxPageLoader");
    if (loader?.nextSibling) document.body.insertBefore(layout, loader.nextSibling);
    else document.body.prepend(layout);
  }
  if (!main) {
    main = document.createElement("main");
    main.className = "library-main sx-accountant-injected-main";
    layout.appendChild(main);
  }

  let overlay = document.getElementById("librarySidebarOverlay") || document.getElementById("sidebarOverlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.className = "library-sidebar-overlay";
    overlay.id = "librarySidebarOverlay";
    overlay.setAttribute("aria-hidden", "true");
    layout.prepend(overlay);
  } else if (overlay.parentElement !== layout) {
    layout.prepend(overlay);
  }

  let sidebar = document.getElementById("librarySidebar") || document.getElementById("noticeSidebar");
  if (!sidebar) {
    sidebar = document.createElement("aside");
    sidebar.className = "library-sidebar";
    sidebar.id = "librarySidebar";
    layout.insertBefore(sidebar, layout.querySelector(".library-main"));
  } else if (sidebar.parentElement !== layout) {
    layout.insertBefore(sidebar, layout.querySelector(".library-main"));
  }

  let menuButton = document.getElementById("libraryMenuButton") || document.getElementById("noticeMenuButton");
  if (!menuButton) {
    menuButton = document.createElement("button");
    menuButton.id = "libraryMenuButton";
    menuButton.type = "button";
    menuButton.className = "library-menu-button sx-accountant-floating-menu";
    menuButton.setAttribute("aria-label", "Open accounts navigation");
    menuButton.setAttribute("aria-expanded", "false");
    normalizeAccountantMenuButton(menuButton);
    main.prepend(menuButton);
  } else {
    menuButton.classList.add("sx-accountant-floating-menu");
    normalizeAccountantMenuButton(menuButton);
    if (!menuButton.closest(".library-main") || menuButton.closest(".library-page-topbar")) main.prepend(menuButton);
  }

  renderAccountantSidebar();
  if (useSimpleAccountantShell()) document.querySelector(".sx-accountant-header")?.remove();
  else ensureAccountantHeader();
  setupAccountantToggleButtons();
  restoreAccountantCollapsedState();
  overlay.onclick = () => setAccountantSidebar(false);
  sidebar.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setAccountantSidebar(false)));
  if (!useSimpleAccountantShell()) loadAccountantHeaderContext();
  signalAccountantShellReady();
}

function setAccountantSessionDropdown(open) {
  const dropdown = document.getElementById("sxAccountantSessionDropdown");
  const button = document.getElementById("sxAccountantSessionButton");
  if (!dropdown || !button) return;
  dropdown.hidden = !open;
  button.setAttribute("aria-expanded", open ? "true" : "false");
}

function renderAccountantSessionOptions({ sessions = [], activeSessionId = "", viewSessionId = "", canChange = true }) {
  const list = document.getElementById("sxAccountantSessionList");
  if (!list) return;
  if (!sessions.length) {
    list.innerHTML = '<div class="sx-accountant-session-empty">No sessions saved yet.</div>';
    return;
  }
  const sorted = sessions.slice().sort((a, b) => String(b.createdAt?.seconds || b.startDate || b.id || "").localeCompare(String(a.createdAt?.seconds || a.startDate || a.id || "")));
  list.innerHTML = sorted.map((session) => {
    const label = accountantSessionLabel(session) || "Unnamed Session";
    const isViewing = session.id === viewSessionId;
    const isActive = session.id === activeSessionId;
    const locked = session.locked === true;
    return `<button type="button" class="sx-accountant-session-option${isViewing ? " is-active" : ""}" data-session-id="${accountantEscapeHtml(session.id)}" ${!canChange || isViewing ? "disabled" : ""}>
      <span><strong>${accountantEscapeHtml(label)}</strong><small>${isViewing ? "Currently viewing" : "View this session"}${isActive ? " / School active" : ""}${locked ? " / Locked" : ""}</small></span>
      <span class="sx-accountant-session-state">${locked ? "Locked" : "Open"}</span>
    </button>`;
  }).join("");
  list.querySelectorAll(".sx-accountant-session-option").forEach((button) => {
    button.addEventListener("click", () => {
      const sessionId = button.dataset.sessionId || "";
      const session = sessions.find((entry) => entry.id === sessionId);
      if (!session) return;
      const label = accountantSessionLabel(session);
      storeAccountantViewSessionId(sessionId);
      window.SchoolixAccountantSession = {
        sessionId,
        session: label,
        activeSessionId,
        locked: session.locked === true
      };
      window.dispatchEvent(new CustomEvent("schoolix:active-session-changed", { detail: window.SchoolixAccountantSession }));
      setAccountantSessionDropdown(false);
      window.location.reload();
    });
  });
}

function syncAccountantHeaderOffset(header) {
  if (!header?.isConnected) {
    document.documentElement.style.setProperty("--sx-accountant-header-offset", "0px");
    document.body?.style.setProperty("--sx-accountant-header-offset", "0px");
    window.sxAccountantHeaderResizeObserver?.disconnect?.();
    return;
  }
  const update = () => {
    if (!header?.isConnected) return;
    const height = Math.ceil(header.getBoundingClientRect().height);
    if (height > 0) {
      const offset = `${height + 18}px`;
      document.documentElement.style.setProperty("--sx-accountant-header-offset", offset);
      document.body?.style.setProperty("--sx-accountant-header-offset", offset);
    }
  };
  update();
  requestAnimationFrame(update);
  window.setTimeout(update, 250);
  window.setTimeout(update, 1000);
  if (window.ResizeObserver) {
    window.sxAccountantHeaderResizeObserver?.disconnect?.();
    window.sxAccountantHeaderResizeObserver = new ResizeObserver(update);
    window.sxAccountantHeaderResizeObserver.observe(header);
  } else {
    window.addEventListener("resize", update, { passive: true });
  }
}

function ensureAccountantHeader() {
  if (document.querySelector(".sx-accountant-header")) return;
  const page = accountantPageInfo();
  const header = document.createElement("header");
  header.className = "sx-accountant-header";
  header.setAttribute("aria-label", "Accountant workspace header");
  header.innerHTML = `
    <div class="sx-accountant-header-main">
      <div class="sx-accountant-header-icon">${accountantInlineIcon(page.icon)}</div>
      <div class="sx-accountant-header-title-wrap">
        <div class="sx-accountant-header-kicker"><span id="sxAccountantHeaderSchool">${accountantEscapeHtml(accountantSchoolName())}</span> / ${accountantEscapeHtml(page.group)}</div>
        <h1 id="sxAccountantHeaderPage">${accountantEscapeHtml(page.label)}</h1>
      </div>
    </div>
    <div class="sx-accountant-header-meta" aria-label="Accountant page context">
      <div class="sx-accountant-session-menu">
        <button type="button" class="sx-accountant-meta-pill sx-accountant-session-pill" id="sxAccountantSessionButton" aria-haspopup="listbox" aria-expanded="false">
          <span class="sx-accountant-meta-icon">${accountantInlineIcon("calendar")}</span>
          <span><small>Viewing session</small><strong id="sxAccountantActiveSession">Loading...</strong></span>
          <span class="sx-accountant-session-caret" aria-hidden="true">v</span>
        </button>
        <div class="sx-accountant-session-dropdown" id="sxAccountantSessionDropdown" hidden>
          <div class="sx-accountant-session-dropdown-head"><strong>View Session</strong><small id="sxAccountantSessionHint">Loading sessions...</small></div>
          <div class="sx-accountant-session-list" id="sxAccountantSessionList"><div class="sx-accountant-session-empty">Loading sessions...</div></div>
        </div>
      </div>
      <div class="sx-accountant-meta-pill">
        <span class="sx-accountant-meta-icon">${accountantInlineIcon("user")}</span>
        <span><small>Signed in as</small><strong id="sxAccountantSignedInAs">Accountant</strong></span>
      </div>
      <div class="sx-accountant-meta-pill">
        <span class="sx-accountant-meta-icon">${accountantInlineIcon("clock")}</span>
        <span><small>Last opened</small><strong id="sxAccountantOpenedAt">${accountantEscapeHtml(accountantLastOpenedLabel())}</strong></span>
      </div>
      <div class="sx-accountant-header-actions">
        <button type="button" class="sx-accountant-header-action sx-accountant-logout-trigger" title="Logout">${accountantInlineIcon("logout")}<span>Logout</span></button>
      </div>
    </div>`;
  document.body.prepend(header);
  syncAccountantHeaderOffset(header);
  document.getElementById("sxAccountantSessionButton")?.addEventListener("click", (event) => {
    event.stopPropagation();
    const dropdown = document.getElementById("sxAccountantSessionDropdown");
    setAccountantSessionDropdown(dropdown?.hidden !== false);
  });
  document.addEventListener("click", (event) => {
    if (!event.target.closest?.(".sx-accountant-session-menu")) setAccountantSessionDropdown(false);
  });
}

async function loadAccountantHeaderContext() {
  if (window.sxAccountantHeaderContextLoading) return;
  window.sxAccountantHeaderContextLoading = true;
  try {
    const [{ initializeApp, getApps }, { getAuth, onAuthStateChanged, signOut }, { getFirestore, doc, getDoc, collection, getDocs }] = await Promise.all([
      import("./firebase-compat.js?v=accountant-guard-20260806-3"),
      import("./firebase-compat.js?v=accountant-guard-20260806-3"),
      import("./firebase-compat.js?v=accountant-guard-20260806-3")
    ]);
    const app = getApps().length ? getApps()[0] : initializeApp(ACCOUNTANT_FIREBASE_CONFIG);
    const auth = getAuth(app);
    const db = getFirestore(app);
    document.querySelectorAll(".sx-accountant-logout-trigger").forEach((button) => {
      if (button.dataset.sxAccountantLogoutBound === "true") return;
      button.dataset.sxAccountantLogoutBound = "true";
      button.addEventListener("click", async () => {
        button.disabled = true;
        try {
          await signOut(auth);
          window.location.href = "index.html";
        } catch (error) {
          console.warn("Accountant logout failed:", error);
          button.disabled = false;
          window.alert("Logout failed. Please try again.");
        }
      });
    });
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setAccountantHeaderText("sxAccountantSignedInAs", "Not signed in");
        setAccountantHeaderText("sxAccountantActiveSession", "No active session");
        return;
      }
      const userSnap = await getDoc(doc(db, "users", user.uid));
      const data = userSnap.exists() ? userSnap.data() : {};
      const role = accountantClean(data.role).toLowerCase();
      const schoolId = role === "admin" || data.superAdmin === true ? user.uid : accountantLinkedSchoolId(data);
      setAccountantHeaderText("sxAccountantSignedInAs", data.name || user.email || "Accountant");
      setAccountantHeaderText("sxAccountantHeaderSchool", data.schoolName || accountantSchoolName());
      if (!schoolId) {
        setAccountantHeaderText("sxAccountantActiveSession", "No active session");
        return;
      }
      const [activeSnap, sessionsSnap] = await Promise.all([
        getDoc(doc(db, "schools", schoolId, "settings", "activeSession")),
        getDocs(collection(db, "schools", schoolId, "sessions"))
      ]);
      const activeData = activeSnap.exists() ? activeSnap.data() : {};
      const activeSessionId = activeData.sessionId || "";
      const sessions = sessionsSnap.docs.map((item) => ({ id: item.id, ...item.data() }));
      let viewSessionId = getStoredAccountantViewSessionId();
      if (viewSessionId && !sessions.some((session) => session.id === viewSessionId)) {
        viewSessionId = "";
        storeAccountantViewSessionId("");
      }
      viewSessionId = viewSessionId || activeSessionId;
      const viewSession = sessions.find((session) => session.id === viewSessionId);
      const viewLabel = viewSession ? accountantSessionLabel(viewSession) : accountantClean(activeData.session || activeData.name || "");
      const locked = viewSession?.locked === true;
      window.SchoolixAccountantSession = {
        sessionId: viewSessionId,
        session: viewLabel,
        activeSessionId,
        locked,
        schoolId
      };
      setAccountantHeaderText("sxAccountantActiveSession", viewLabel ? `${viewLabel}${locked ? " (Locked)" : ""}` : "No session selected");
      setAccountantHeaderText("sxAccountantSessionHint", "Choose a session to view");
      renderAccountantSessionOptions({ sessions, activeSessionId, viewSessionId, canChange: true });
      window.dispatchEvent(new CustomEvent("schoolix:accountant-session-ready", { detail: window.SchoolixAccountantSession }));
    });
  } catch (error) {
    console.warn("Unable to load accountant header context", error);
    setAccountantHeaderText("sxAccountantActiveSession", "Session unavailable");
  } finally {
    window.sxAccountantHeaderContextLoading = false;
  }
}

function setAccountantSidebar(open) {
  const sidebar = document.getElementById("librarySidebar") || document.getElementById("noticeSidebar");
  const overlay = document.getElementById("librarySidebarOverlay") || document.getElementById("sidebarOverlay");
  const menuButton = document.getElementById("libraryMenuButton") || document.getElementById("noticeMenuButton");
  const mobile = window.matchMedia("(max-width: 900px)").matches;
  sidebar?.classList.toggle("open", open);
  overlay?.classList.toggle("open", open);
  menuButton?.setAttribute("aria-expanded", open ? "true" : "false");
  document.body.classList.toggle("sx-accountant-mobile-sidebar-open", Boolean(open && mobile));
}

function setAccountantCollapsed(collapsed) {
  const mobile = window.matchMedia("(max-width: 900px)").matches;
  document.body.classList.toggle("sx-accountant-shell-collapsed", Boolean(collapsed && !mobile));
  try { localStorage.setItem("schoolix.accountantSidebarCollapsed", collapsed ? "1" : "0"); } catch (_) {}
  const button = document.getElementById("accountantSidebarToggle");
  button?.setAttribute("aria-expanded", collapsed ? "false" : "true");
  button?.setAttribute("aria-label", collapsed ? "Open accounts navigation" : "Close accounts navigation");
  if (button) button.title = collapsed ? "Expand sidebar" : "Collapse sidebar";
}

function restoreAccountantCollapsedState() {
  let collapsed = false;
  try { collapsed = localStorage.getItem("schoolix.accountantSidebarCollapsed") === "1"; } catch (_) {}
  setAccountantCollapsed(collapsed);
}

function toggleAccountantSidebarSize() {
  if (window.matchMedia("(max-width: 900px)").matches) {
    const sidebar = document.getElementById("librarySidebar") || document.getElementById("noticeSidebar");
    setAccountantSidebar(!sidebar?.classList.contains("open"));
    return;
  }
  setAccountantCollapsed(!document.body.classList.contains("sx-accountant-shell-collapsed"));
}

window.openAccountantSidebar = () => setAccountantSidebar(true);
window.closeAccountantSidebar = () => setAccountantSidebar(false);
window.enableAccountantShell = ensureAccountantShell;
window.toggleAccountantSidebar = toggleAccountantSidebarSize;

document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector(".library-app-layout")) document.body.classList.add("sx-accountant-shell-enabled");
  document.body.classList.toggle("sx-accountant-simple-shell", useSimpleAccountantShell());
  if (useSimpleAccountantShell()) document.querySelector(".sx-accountant-header")?.remove();
  renderAccountantSidebar();
  if (!useSimpleAccountantShell()) ensureAccountantHeader();
  const menuButton = document.getElementById("libraryMenuButton") || document.getElementById("noticeMenuButton");
  menuButton?.classList.add("sx-accountant-floating-menu");
  const main = document.querySelector(".library-app-layout > .library-main");
  if (main && menuButton?.closest(".library-page-topbar") && !useSimpleAccountantShell()) main.prepend(menuButton);
  setupAccountantToggleButtons();
  restoreAccountantCollapsedState();
  (document.getElementById("librarySidebarOverlay") || document.getElementById("sidebarOverlay"))?.addEventListener("click", () => setAccountantSidebar(false));
  (document.getElementById("librarySidebar") || document.getElementById("noticeSidebar"))?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setAccountantSidebar(false)));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setAccountantSidebar(false);
  });
  if (!useSimpleAccountantShell()) loadAccountantHeaderContext();
  signalAccountantShellReady();
});

window.addEventListener("resize", () => {
  restoreAccountantCollapsedState();
  syncAccountantHeaderOffset(document.querySelector(".sx-accountant-header"));
  if (!window.matchMedia("(max-width: 900px)").matches) setAccountantSidebar(false);
}, { passive: true });

window.visualViewport?.addEventListener("resize", () => {
  syncAccountantHeaderOffset(document.querySelector(".sx-accountant-header"));
}, { passive: true });
