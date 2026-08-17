const ICONS = {
  dashboard: '<rect x="3" y="3" width="7" height="7" rx="1.5"></rect><rect x="14" y="3" width="7" height="7" rx="1.5"></rect><rect x="14" y="14" width="7" height="7" rx="1.5"></rect><rect x="3" y="14" width="7" height="7" rx="1.5"></rect>',
  books: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15Z"></path><path d="M8 7h8"></path>',
  scan: '<path d="M3 7V5a2 2 0 0 1 2-2h2"></path><path d="M17 3h2a2 2 0 0 1 2 2v2"></path><path d="M21 17v2a2 2 0 0 1-2 2h-2"></path><path d="M7 21H5a2 2 0 0 1-2-2v-2"></path><path d="M7 12h10"></path>',
  attendance: '<path d="M9 11l3 3L22 4"></path><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>',
  notices: '<path d="M3 11v2a2 2 0 0 0 2 2h2l4 4v-4h4l6 3V6l-6 3H5a2 2 0 0 0-2 2Z"></path><path d="M21 9v6"></path>'
};

const NAV_ITEMS = [
  { key: "dashboard", href: "library-dashboard.html", label: "Dashboard", icon: "dashboard", section: "Library" },
  { key: "books", href: "library-dashboard.html#issueRegister", label: "Issue Register", icon: "books" },
  { key: "qr", href: "library-qr-checkin.html", label: "QR Check-In", icon: "scan", section: "Attendance" },
  { key: "attendance", href: "librarian-attendance.html", label: "My Attendance", icon: "attendance" },
  { key: "notices", href: "librarian-notices.html", label: "Notices", icon: "notices", section: "Communication" }
];

function navIcon(name) {
  return `<span class="library-nav-icon" aria-hidden="true"><svg viewBox="0 0 24 24">${ICONS[name] || ICONS.dashboard}</svg></span>`;
}

function activeKey() {
  const explicit = document.body?.dataset?.libraryPage;
  if (explicit) return explicit;
  const page = location.pathname.split("/").pop() || "library-dashboard.html";
  if (page === "library-qr-checkin.html") return "qr";
  if (page === "librarian-attendance.html") return "attendance";
  if (page === "librarian-notices.html") return "notices";
  return "dashboard";
}

function sidebarHtml() {
  const active = activeKey();
  let lastSection = "";
  const links = NAV_ITEMS.map((item) => {
    const section = item.section && item.section !== lastSection
      ? `<div class="library-nav-label">${item.section}</div>`
      : "";
    if (item.section) lastSection = item.section;
    const current = item.key === active;
    return `${section}<a class="library-nav-link ${current ? "active" : ""}" href="${item.href}" ${current ? 'aria-current="page"' : ""}>${navIcon(item.icon)}${item.label}</a>`;
  }).join("");

  return `
    <div class="library-brand">
      <div class="library-brand-mark" aria-hidden="true"><svg viewBox="0 0 24 24">${ICONS.books}</svg></div>
      <div>
        <strong id="sidebarSchoolName">Schoolix</strong>
        <span>Library Portal</span>
      </div>
    </div>
    <nav class="library-nav" aria-label="Library navigation">${links}</nav>
    <div class="library-sidebar-footer">Library, QR attendance, and notices in one workspace.</div>
  `;
}

function renderSidebar() {
  const sidebar = document.getElementById("librarySidebar") || document.getElementById("noticeSidebar");
  if (sidebar) {
    sidebar.classList.add("library-sidebar");
    sidebar.innerHTML = sidebarHtml();
  }
}

function setSidebar(open) {
  const sidebar = document.getElementById("librarySidebar") || document.getElementById("noticeSidebar");
  const overlay = document.getElementById("librarySidebarOverlay") || document.getElementById("sidebarOverlay");
  const menuButton = document.getElementById("libraryMenuButton") || document.getElementById("noticeMenuButton");
  sidebar?.classList.toggle("open", open);
  overlay?.classList.toggle("open", open);
  menuButton?.setAttribute("aria-expanded", open ? "true" : "false");
}

window.openLibrarySidebar = () => setSidebar(true);
window.closeLibrarySidebar = () => setSidebar(false);
window.toggleLibrarySidebar = () => {
  const sidebar = document.getElementById("librarySidebar") || document.getElementById("noticeSidebar");
  setSidebar(!sidebar?.classList.contains("open"));
};

document.addEventListener("DOMContentLoaded", () => {
  renderSidebar();
  (document.getElementById("libraryMenuButton") || document.getElementById("noticeMenuButton"))?.addEventListener("click", () => window.toggleLibrarySidebar());
  (document.getElementById("librarySidebarOverlay") || document.getElementById("sidebarOverlay"))?.addEventListener("click", () => setSidebar(false));
  (document.getElementById("librarySidebar") || document.getElementById("noticeSidebar"))?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setSidebar(false)));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setSidebar(false);
  });
});
