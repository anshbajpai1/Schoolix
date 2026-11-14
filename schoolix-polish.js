(function () {
  const DEFAULT_PAGE_SIZE = 25;
  const PAGE_SIZE_OPTIONS = [25, 50, 1000, "all"];
  const MIN_TABLE_ROWS = 26;
  const MIN_LIST_ITEMS = 26;
  const ENHANCED = new WeakSet();
  const EXCLUDED_TABLE_SELECTOR = [
    ".timetable-table",
    ".no-pagination",
    "[data-no-pagination]",
    ".report",
    ".tc-container",
    ".print-area"
  ].join(",");
  const LIST_SELECTORS = [
    ".session-list",
    ".term-list",
    ".student-list",
    ".teacher-list",
    ".vehicle-list",
    ".book-list",
    ".records-list",
    ".history-list",
    ".issue-list",
    ".attendance-list",
    ".assignment-list",
    ".salary-records",
    ".school-list",
    ".cards-list",
    ".list",
    ".cards-grid",
    ".student-grid",
    ".teacher-grid",
    "#accountantList",
    "#librarianList",
    "#studentsList",
    "#finePreviewList",
    "#fineRulesList",
    "#issuedTCsList",
    "#notificationHistory",
    "#teacherAssignmentsList",
    "#editTeacherAssignmentsList",
    "#teacherAttendanceList",
    "#salaryRecordsList",
    "#attendanceList",
    "#subjectListInModal",
    "#routeList",
    "#vehicleList",
    "#assignedStudentsList",
    "#studentList",
    "#issueList",
    "#schoolList"
  ].join(",");
  const PAGE_LOADER_MIN_VISIBLE_MS = 0;
  const PAGE_LOADER_STABLE_MS = 16;
  const PAGE_LOADER_MAX_WAIT_MS = 520;
  const PAGE_LOADER_CHECK_DEBOUNCE_MS = 12;
  // Keep the application shell visible. Data-heavy regions get their own
  // layout-aware skeleton instead of a blocking, full-viewport placeholder.
  const PAGE_LOADER_DISABLED = true;
  const REGION_CACHE_KEY = `schoolix:region-cache:v2:${location.pathname}`;
  const REGION_CACHE_TTL_MS = 20 * 60 * 1000;
  const REGION_CACHE_MAX_BYTES = 900000;
  const REGION_CACHE_MAX_ITEMS = 36;
  const regionCacheState = { restored: new Set(), writeTimer: 0, syncing: false };
  const PAGE_LOADER_CONTENT_READY_EVENTS = [
    "schoolix:critical-load-ready",
    "schoolix:content-ready",
    "schoolix:data-ready",
    "schoolix:page-ready"
  ];
  const pageLoaderState = {
    startedAt: Date.now(),
    hidden: false,
    readySignals: new Set(),
    checkTimer: 0,
    stableTimer: 0,
    maxTimer: 0,
    observer: null
  };

  function ready(fn) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn);
    else fn();
  }

  function afterFirstPaint(fn) {
    requestAnimationFrame(() => requestAnimationFrame(() => setTimeout(fn, 0)));
  }

  if (PAGE_LOADER_DISABLED) document.documentElement.classList.add("sx-page-loaded");
  else document.documentElement.classList.add("sx-page-loading");
  window.SchoolixPageLoader = Object.assign(window.SchoolixPageLoader || {}, {
    markReady(reason = "manual") {
      pageLoaderState.readySignals.add(reason);
      schedulePageLoaderCheck();
    },
    requestHide(reason = "manual") {
      pageLoaderState.readySignals.add(reason);
      schedulePageLoaderCheck();
    }
  });
  if (window.SchoolixAccountantShellReady) pageLoaderState.readySignals.add("accountant-shell-ready");

  function isAuthPage() {
    const p = (window.location.pathname || "").toLowerCase();
    if (
      p.endsWith("index.html") ||
      p.endsWith("login.html") ||
      p.endsWith("admin-signup.html") ||
      p.endsWith("reset-password.html") ||
      p === "/" ||
      p === ""
    ) {
      return true;
    }
    return !!document.querySelector(".login-container, .auth-card, #loginForm, .signup-card");
  }

  function renderLayoutSkeleton(loader) {
    const container = loader?.querySelector(".skeleton-container, .dots-container");
    if (!container) return;
    if (container.dataset.skeletonRendered === "true") return;
    container.dataset.skeletonRendered = "true";
    container.replaceChildren();

    if (isAuthPage()) {
      const authWrap = document.createElement("div");
      authWrap.className = "sx-sk-auth-wrap";
      authWrap.innerHTML = [
        '<div class="sx-sk-auth-card">',
        '  <div class="sx-sk-block sx-sk-auth-logo"></div>',
        '  <div class="sx-sk-block sx-sk-auth-title"></div>',
        '  <div class="sx-sk-block sx-sk-auth-sub"></div>',
        '  <div class="sx-sk-block sx-sk-auth-input"></div>',
        '  <div class="sx-sk-block sx-sk-auth-input"></div>',
        '  <div class="sx-sk-block sx-sk-auth-btn"></div>',
        '  <div class="sx-sk-block sx-sk-auth-link"></div>',
        '</div>'
      ].join("");
      container.appendChild(authWrap);
      return;
    }

    const appWrap = document.createElement("div");
    appWrap.className = "sx-sk-app-wrap";
    appWrap.innerHTML = [
      '<header class="sx-sk-topbar">',
      '  <div class="sx-sk-topbar-left">',
      '    <div class="sx-sk-block sx-sk-top-logo"></div>',
      '    <div class="sx-sk-block sx-sk-top-brand"></div>',
      '  </div>',
      '  <div class="sx-sk-topbar-right">',
      '    <div class="sx-sk-block sx-sk-search-pill"></div>',
      '    <div class="sx-sk-block sx-sk-icon-btn"></div>',
      '    <div class="sx-sk-block sx-sk-avatar"></div>',
      '  </div>',
      '</header>',
      '<div class="sx-sk-body">',
      '  <aside class="sx-sk-sidebar">',
      '    <div class="sx-sk-sidebar-item"><div class="sx-sk-block sx-sk-menu-icon"></div><div class="sx-sk-block sx-sk-menu-text" style="width: 72%;"></div></div>',
      '    <div class="sx-sk-sidebar-item"><div class="sx-sk-block sx-sk-menu-icon"></div><div class="sx-sk-block sx-sk-menu-text" style="width: 84%;"></div></div>',
      '    <div class="sx-sk-sidebar-item"><div class="sx-sk-block sx-sk-menu-icon"></div><div class="sx-sk-block sx-sk-menu-text" style="width: 65%;"></div></div>',
      '    <div class="sx-sk-sidebar-item"><div class="sx-sk-block sx-sk-menu-icon"></div><div class="sx-sk-block sx-sk-menu-text" style="width: 88%;"></div></div>',
      '    <div class="sx-sk-sidebar-item"><div class="sx-sk-block sx-sk-menu-icon"></div><div class="sx-sk-block sx-sk-menu-text" style="width: 68%;"></div></div>',
      '    <div class="sx-sk-sidebar-item"><div class="sx-sk-block sx-sk-menu-icon"></div><div class="sx-sk-block sx-sk-menu-text" style="width: 78%;"></div></div>',
      '  </aside>',
      '  <main class="sx-sk-main">',
      '    <div class="sx-sk-page-head">',
      '      <div class="sx-sk-page-title-group">',
      '        <div class="sx-sk-block sx-sk-head-title"></div>',
      '        <div class="sx-sk-block sx-sk-head-sub"></div>',
      '      </div>',
      '      <div class="sx-sk-block sx-sk-head-action"></div>',
      '    </div>',
      '    <div class="sx-sk-stats-grid">',
      '      <div class="sx-sk-stat-card">',
      '        <div class="sx-sk-stat-row"><div class="sx-sk-block sx-sk-line" style="width: 54%; height: 11px;"></div><div class="sx-sk-block sx-sk-circle-sm"></div></div>',
      '        <div class="sx-sk-block sx-sk-line" style="width: 38%; height: 24px; margin-top: 8px;"></div>',
      '      </div>',
      '      <div class="sx-sk-stat-card">',
      '        <div class="sx-sk-stat-row"><div class="sx-sk-block sx-sk-line" style="width: 48%; height: 11px;"></div><div class="sx-sk-block sx-sk-circle-sm"></div></div>',
      '        <div class="sx-sk-block sx-sk-line" style="width: 44%; height: 24px; margin-top: 8px;"></div>',
      '      </div>',
      '      <div class="sx-sk-stat-card">',
      '        <div class="sx-sk-stat-row"><div class="sx-sk-block sx-sk-line" style="width: 60%; height: 11px;"></div><div class="sx-sk-block sx-sk-circle-sm"></div></div>',
      '        <div class="sx-sk-block sx-sk-line" style="width: 36%; height: 24px; margin-top: 8px;"></div>',
      '      </div>',
      '      <div class="sx-sk-stat-card">',
      '        <div class="sx-sk-stat-row"><div class="sx-sk-block sx-sk-line" style="width: 50%; height: 11px;"></div><div class="sx-sk-block sx-sk-circle-sm"></div></div>',
      '        <div class="sx-sk-block sx-sk-line" style="width: 40%; height: 24px; margin-top: 8px;"></div>',
      '      </div>',
      '    </div>',
      '    <div class="sx-sk-card">',
      '      <div class="sx-sk-card-toolbar">',
      '        <div class="sx-sk-block sx-sk-search-input"></div>',
      '        <div class="sx-sk-toolbar-actions">',
      '          <div class="sx-sk-block sx-sk-filter-pill"></div>',
      '          <div class="sx-sk-block sx-sk-filter-pill"></div>',
      '        </div>',
      '      </div>',
      '      <div class="sx-sk-table-rows">',
      '        <div class="sx-sk-table-row">',
      '          <div class="sx-sk-block sx-sk-row-avatar"></div>',
      '          <div class="sx-sk-row-content">',
      '            <div class="sx-sk-block sx-sk-line" style="width: 34%; height: 13px;"></div>',
      '            <div class="sx-sk-block sx-sk-line" style="width: 20%; height: 10px;"></div>',
      '          </div>',
      '          <div class="sx-sk-block sx-sk-status-badge"></div>',
      '        </div>',
      '        <div class="sx-sk-table-row">',
      '          <div class="sx-sk-block sx-sk-row-avatar"></div>',
      '          <div class="sx-sk-row-content">',
      '            <div class="sx-sk-block sx-sk-line" style="width: 42%; height: 13px;"></div>',
      '            <div class="sx-sk-block sx-sk-line" style="width: 25%; height: 10px;"></div>',
      '          </div>',
      '          <div class="sx-sk-block sx-sk-status-badge"></div>',
      '        </div>',
      '        <div class="sx-sk-table-row">',
      '          <div class="sx-sk-block sx-sk-row-avatar"></div>',
      '          <div class="sx-sk-row-content">',
      '            <div class="sx-sk-block sx-sk-line" style="width: 28%; height: 13px;"></div>',
      '            <div class="sx-sk-block sx-sk-line" style="width: 18%; height: 10px;"></div>',
      '          </div>',
      '          <div class="sx-sk-block sx-sk-status-badge"></div>',
      '        </div>',
      '        <div class="sx-sk-table-row">',
      '          <div class="sx-sk-block sx-sk-row-avatar"></div>',
      '          <div class="sx-sk-row-content">',
      '            <div class="sx-sk-block sx-sk-line" style="width: 38%; height: 13px;"></div>',
      '            <div class="sx-sk-block sx-sk-line" style="width: 22%; height: 10px;"></div>',
      '          </div>',
      '          <div class="sx-sk-block sx-sk-status-badge"></div>',
      '        </div>',
      '      </div>',
      '    </div>',
      '  </main>',
      '</div>'
    ].join("");
    container.appendChild(appWrap);
  }

  function ensurePageLoader() {
    if (PAGE_LOADER_DISABLED) {
      document.documentElement.classList.remove("sx-page-loading");
      document.documentElement.classList.add("sx-page-loaded");
      document.getElementById("sxPageLoader")?.remove();
      return;
    }
    const existing = document.getElementById("sxPageLoader");
    if (existing) {
      existing.classList.remove("is-hidden");
      existing.style.removeProperty("display");
      existing.style.removeProperty("visibility");
      existing.style.removeProperty("opacity");
      renderLayoutSkeleton(existing);
      window.addEventListener("resize", () => renderLayoutSkeleton(existing), { passive: true });
      return;
    }
    const loader = document.createElement("div");
    loader.id = "sxPageLoader";
    loader.className = "sx-page-loader";
    loader.setAttribute("role", "status");
    loader.setAttribute("aria-live", "polite");
    loader.innerHTML = [
      '<section class="dots-container skeleton-container" aria-label="Loading page">',
      "</section>"
    ].join("");
    document.body.prepend(loader);
    renderLayoutSkeleton(loader);
    window.addEventListener("resize", () => renderLayoutSkeleton(loader), { passive: true });
  }

  function hidePageLoader() {
    if (pageLoaderState.hidden) return;
    pageLoaderState.hidden = true;
    clearTimeout(pageLoaderState.checkTimer);
    clearTimeout(pageLoaderState.stableTimer);
    clearTimeout(pageLoaderState.maxTimer);
    if (pageLoaderState.observer) pageLoaderState.observer.disconnect();
    const loader = document.getElementById("sxPageLoader");
    document.documentElement.classList.remove("sx-page-loading");
    document.documentElement.classList.add("sx-page-loaded");
    if (!loader) return;
    loader.classList.add("is-hidden");
    setTimeout(() => loader.remove(), 260);
  }

  function hidePageLoaderAfterFullLoad() {
    if (PAGE_LOADER_DISABLED) {
      hidePageLoader();
      return;
    }

    const markReady = (reason = "dom-ready") => {
      pageLoaderState.readySignals.add(reason);
      schedulePageLoaderCheck();
    };
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => afterFirstPaint(() => markReady("dom-ready")), { once: true });
    } else {
      afterFirstPaint(() => markReady(document.readyState === "complete" ? "document-complete" : "dom-ready"));
    }
    window.addEventListener("load", () => markReady("window-load"), { once: true });

    PAGE_LOADER_CONTENT_READY_EVENTS.forEach((eventName) => {
      window.addEventListener(eventName, () => {
        pageLoaderState.readySignals.add(eventName);
        schedulePageLoaderCheck();
      });
    });

    pageLoaderState.maxTimer = setTimeout(() => {
      if (!pageLoaderState.hidden) hidePageLoader();
    }, PAGE_LOADER_MAX_WAIT_MS);

    schedulePageLoaderCheck();
  }

  function isLoadingText(text) {
    const value = String(text || "").replace(/\s+/g, " ").trim();
    if (!value || value.length > 90) return false;
    return /^(?:(?:loading|fetching|processing|preparing|checking|syncing)(?:\s+[\w&/ -]+)?|please wait)(?:\.{0,3}|\u2026)?$/i.test(value);
  }

  function isLayoutVisible(el) {
    if (!el || el.hidden) return false;
    const style = window.getComputedStyle(el);
    if (style.display === "none" || style.opacity === "0") return false;
    const rect = el.getBoundingClientRect();
    return rect.width > 1 && rect.height > 1;
  }

  function hasRenderablePageContent() {
    if (!document.body) return false;
    const candidates = Array.from(document.body.children).filter((el) => {
      if (!el || el.id === "sxPageLoader") return false;
      if (["SCRIPT", "STYLE", "TEMPLATE", "NOSCRIPT", "LINK", "META"].includes(el.tagName)) return false;
      return isLayoutVisible(el);
    });
    return candidates.some((el) => {
      const text = String(el.textContent || "").replace(/\s+/g, " ").trim();
      return text.length > 0 || el.querySelector("img,svg,canvas,video,table,input,select,textarea,button");
    });
  }

  function hasBlockingLoadingPlaceholder() {
    const selector = [
      ".sx-inline-loading",
      ".loading",
      ".loader",
      ".spinner",
      ".empty-state",
      ".status-msg",
      "[aria-busy='true']",
      "[data-loading='true']"
    ].join(",");
    return Array.from(document.querySelectorAll(selector)).some((el) => {
      if (el.id === "sxPageLoader" || el.closest("#sxPageLoader") || !isLayoutVisible(el)) return false;
      if (el.matches("[aria-busy='true'],[data-loading='true']")) return true;
      return isLoadingText(el.textContent);
    });
  }

  function hasPendingCriticalImages() {
    return Array.from(document.images || []).some((img) => {
      if (!isLayoutVisible(img) || img.loading === "lazy") return false;
      if (img.complete && img.naturalWidth !== 0) return false;
      if (!img.dataset.sxLoaderWatched) {
        img.dataset.sxLoaderWatched = "true";
        img.addEventListener("load", schedulePageLoaderCheck, { once: true });
        img.addEventListener("error", schedulePageLoaderCheck, { once: true });
      }
      const rect = img.getBoundingClientRect();
      return rect.top < window.innerHeight + 240 && rect.bottom > -240;
    });
  }

  function schedulePageLoaderCheck() {
    if (pageLoaderState.hidden) return;
    clearTimeout(pageLoaderState.checkTimer);
    pageLoaderState.checkTimer = setTimeout(() => {
      const canHide =
        Date.now() - pageLoaderState.startedAt >= PAGE_LOADER_MIN_VISIBLE_MS &&
        pageLoaderState.readySignals.size > 0 &&
        hasRenderablePageContent();

      if (!canHide) {
        clearTimeout(pageLoaderState.stableTimer);
        pageLoaderState.stableTimer = 0;
        return;
      }

      if (pageLoaderState.stableTimer) return;
      pageLoaderState.stableTimer = setTimeout(() => {
        requestAnimationFrame(() => requestAnimationFrame(hidePageLoader));
      }, PAGE_LOADER_STABLE_MS);
    }, PAGE_LOADER_CHECK_DEBOUNCE_MS);
  }

  function enhanceLoadingText(root = document) {
    const candidates = root.querySelectorAll(".empty-state, .status-msg, td, span, div, p, button");
    candidates.forEach((el) => {
      if (el.children.length > 0) return;
      if (!isLoadingText(el.textContent)) return;
      el.classList.add("sx-inline-loading");
    });
  }

  function cacheableRegion(element) {
    if (!(element instanceof HTMLElement) || !element.id) return false;
    if (element.closest("#sxPageLoader,.modal-overlay:not(.open),dialog:not([open])")) return false;
    if (element.matches("input,select,textarea,form,script,style,template")) return false;
    const identity = `${element.id} ${element.className}`.toLowerCase();
    return /(list|grid|table|tbody|records|history|stats|summary|students|teachers|attendance|fees|payments|notices|assignments|vehicles|routes|subjects|sessions|terms|results|school)/.test(identity);
  }

  function regionIsLoading(region) {
    if (!region) return false;
    if (region.matches("[aria-busy='true'],[data-loading='true']")) return true;
    const loading = region.querySelector(".sx-inline-loading,[aria-busy='true'],[data-loading='true'],.loading,.loader,.spinner,.status-msg,.empty-state");
    return !!loading && (loading.matches("[aria-busy='true'],[data-loading='true']") || isLoadingText(loading.textContent));
  }

  function regionHasUsefulContent(region) {
    if (!region || regionIsLoading(region)) return false;
    const text = String(region.textContent || "").replace(/\s+/g, " ").trim();
    return text.length > 2 || !!region.querySelector("tr,.card,[class*='item'],[class*='row'],img,svg,canvas");
  }

  function safeCachedMarkup(region) {
    const clone = region.cloneNode(true);
    clone.querySelectorAll("script,style,template,.sx-region-skeleton,.sx-pagination,.sx-runtime-error").forEach((node) => node.remove());
    clone.querySelectorAll("input,textarea,select").forEach((control) => {
      control.removeAttribute("value");
      control.removeAttribute("checked");
      control.removeAttribute("selected");
    });
    return clone.innerHTML;
  }

  function readRegionCache() {
    try {
      const cached = JSON.parse(sessionStorage.getItem(REGION_CACHE_KEY) || "null");
      if (!cached || Date.now() - Number(cached.savedAt || 0) > REGION_CACHE_TTL_MS || !Array.isArray(cached.items)) return [];
      return cached.items;
    } catch (_) {
      return [];
    }
  }

  function restoreCachedRegions() {
    readRegionCache().forEach(({ id, html }) => {
      const region = document.getElementById(id);
      if (!cacheableRegion(region) || !html || (!regionIsLoading(region) && regionHasUsefulContent(region))) return;
      region.innerHTML = html;
      region.classList.add("sx-cache-preview");
      region.dataset.sxCachePreview = "true";
      region.setAttribute("aria-busy", "true");
      regionCacheState.restored.add(region);
    });
  }

  function writeRegionCache() {
    clearTimeout(regionCacheState.writeTimer);
    regionCacheState.writeTimer = setTimeout(() => {
      const items = [];
      let bytes = 0;
      document.querySelectorAll("[id]").forEach((region) => {
        if (items.length >= REGION_CACHE_MAX_ITEMS || !cacheableRegion(region) || region.dataset.sxCachePreview === "true" || !regionHasUsefulContent(region)) return;
        const html = safeCachedMarkup(region);
        if (!html || html.length > 160000 || bytes + html.length > REGION_CACHE_MAX_BYTES) return;
        items.push({ id: region.id, html });
        bytes += html.length;
      });
      try {
        sessionStorage.setItem(REGION_CACHE_KEY, JSON.stringify({ savedAt: Date.now(), items }));
      } catch (_) {
        // Storage may be unavailable or full; live data remains unaffected.
      }
    }, 320);
  }

  function loadingRegionFor(element) {
    if (!(element instanceof HTMLElement)) return null;
    if (element.matches("[aria-busy='true'],[data-loading='true']")) return element;
    if (element.closest("tbody")) {
      const table = element.closest("table");
      return table?.closest(".table-wrap,.table-wrapper,.table-container,.responsive-table,.card,.panel") || table?.parentElement || table;
    }
    const preferred = element.closest([
      "[data-sx-loading-region]",
      LIST_SELECTORS,
      ".table-wrap,.table-wrapper,.table-container,.responsive-table",
      ".cards-grid,.card-grid,.stats-grid,.metrics-grid",
      ".panel-body,.card-body,.content-body"
    ].join(","));
    return preferred || element.parentElement;
  }

  function skeletonLayout(region) {
    if (region.matches("tbody") || region.closest("table")) return "table";
    const identity = `${region.id || ""} ${region.className || ""}`.toLowerCase();
    if (/(grid|stats|metrics|cards)/.test(identity)) return "grid";
    return "list";
  }

  function createRegionSkeleton(region) {
    const skeleton = document.createElement("div");
    const layout = skeletonLayout(region);
    const compact = region.getBoundingClientRect().height > 0 && region.getBoundingClientRect().height < 160;
    skeleton.className = `sx-region-skeleton sx-region-skeleton--${layout}${compact ? " sx-region-skeleton--compact" : ""}`;
    skeleton.setAttribute("aria-hidden", "true");
    const count = compact ? 1 : (layout === "grid" ? 4 : 3);
    skeleton.innerHTML = Array.from({ length: count }, (_, index) => (
      `<div class="sx-region-skeleton__item"><i></i><span><b style="width:${64 - index * 7}%"></b><b style="width:${38 + index * 6}%"></b></span><em></em></div>`
    )).join("");
    return skeleton;
  }

  function syncRegionalLoading() {
    if (regionCacheState.syncing) return;
    regionCacheState.syncing = true;
    try {
      const active = new Set();
      document.querySelectorAll(".sx-inline-loading,.loading,.loader,.spinner,.status-msg,[aria-busy='true'],[data-loading='true']").forEach((loading) => {
        const explicitLoader = loading.matches(".loading,.loader,.spinner,[aria-busy='true'],[data-loading='true']");
        if (loading.closest("#sxPageLoader,.sx-region-skeleton") || (!explicitLoader && !isLoadingText(loading.textContent))) return;
        const region = loadingRegionFor(loading);
        if (!region || region === document.body || region.closest("#sxPageLoader") || !isLayoutVisible(region)) return;
        active.add(region);
        region.classList.add("sx-region-loading");
        if (region.dataset.sxCachePreview === "true") {
          region.classList.add("sx-cache-refreshing");
          return;
        }
        if (!region.querySelector(":scope > .sx-region-skeleton")) region.appendChild(createRegionSkeleton(region));
      });

      document.querySelectorAll(".sx-region-loading").forEach((region) => {
        if (active.has(region)) return;
        region.classList.remove("sx-region-loading", "sx-cache-refreshing", "sx-cache-preview");
        delete region.dataset.sxCachePreview;
        if (region.getAttribute("aria-busy") === "true") region.removeAttribute("aria-busy");
        region.querySelectorAll(":scope > .sx-region-skeleton").forEach((item) => item.remove());
      });

      regionCacheState.restored.forEach((region) => {
        if (!document.contains(region)) return regionCacheState.restored.delete(region);
        if (!regionIsLoading(region) && region.dataset.sxCachePreview !== "true") regionCacheState.restored.delete(region);
      });
    } finally {
      regionCacheState.syncing = false;
    }
    writeRegionCache();
  }

  function clearSchoolixRegionCache() {
    try {
      Object.keys(sessionStorage).filter((key) => key.startsWith("schoolix:region-cache:")).forEach((key) => sessionStorage.removeItem(key));
    } catch (_) {}
  }

  function clearStaleLoadingText(root = document) {
    root.querySelectorAll(".sx-inline-loading").forEach((el) => {
      if (!isLoadingText(el.textContent)) el.classList.remove("sx-inline-loading");
    });
  }

  function optimizeMedia(root = document) {
    root.querySelectorAll("img").forEach((img) => {
      if (!img.hasAttribute("decoding")) img.setAttribute("decoding", "async");
      if (!img.hasAttribute("loading") && !img.matches("[data-priority-image], .brand-logo, .logo img, #schoolLogo")) {
        img.setAttribute("loading", "lazy");
      }
    });
  }

  function buttonPressFeedback(button) {
    if (!button || button.disabled || button.classList.contains("sx-action-loading")) return;
    button.classList.remove("sx-button-press");
    requestAnimationFrame(() => {
      button.classList.add("sx-button-press");
      setTimeout(() => button.classList.remove("sx-button-press"), 180);
    });
  }

  function makeButton(label, disabled, active, onClick) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `sx-page-btn${active ? " is-active" : ""}`;
    button.textContent = label;
    button.disabled = disabled;
    button.addEventListener("click", onClick);
    return button;
  }

  function pageWindow(current, total) {
    const pages = [];
    const start = Math.max(1, current - 1);
    const end = Math.min(total, current + 1);
    if (start > 1) pages.push(1);
    if (start > 2) pages.push("...");
    for (let i = start; i <= end; i += 1) pages.push(i);
    if (end < total - 1) pages.push("...");
    if (end < total) pages.push(total);
    return pages;
  }

  function pageSizeValue(pageSize, totalItems) {
    return pageSize === "all" ? Math.max(1, totalItems) : Number(pageSize || DEFAULT_PAGE_SIZE);
  }

  function optionLabel(option) {
    return option === "all" ? "All" : String(option);
  }

  function renderPagination(container, totalItems, pageSize, currentPage, setPage, setPageSize) {
    const effectivePageSize = pageSizeValue(pageSize, totalItems);
    const totalPages = pageSize === "all" ? 1 : Math.max(1, Math.ceil(totalItems / effectivePageSize));
    let pager = container.nextElementSibling;
    if (!pager || !pager.classList?.contains("sx-pagination")) {
      pager = document.createElement("div");
      pager.className = "sx-pagination";
      container.insertAdjacentElement("afterend", pager);
    }

    if (totalItems <= MIN_TABLE_ROWS - 1) {
      pager.hidden = true;
      return;
    }

    pager.hidden = false;
    pager.innerHTML = "";

    const start = totalItems ? (currentPage - 1) * effectivePageSize + 1 : 0;
    const end = Math.min(totalItems, currentPage * effectivePageSize);
    const meta = document.createElement("div");
    meta.className = "sx-pagination__meta";
    meta.textContent = `Showing ${start}-${end} of ${totalItems}`;

    const sizeWrap = document.createElement("label");
    sizeWrap.className = "sx-pagination__size";
    const sizeText = document.createElement("span");
    sizeText.textContent = "Rows per page";
    const sizeSelect = document.createElement("select");
    sizeSelect.className = "sx-pagination__select";
    sizeSelect.setAttribute("aria-label", "Rows per page");
    PAGE_SIZE_OPTIONS.forEach((option) => {
      const opt = document.createElement("option");
      opt.value = String(option);
      opt.textContent = optionLabel(option);
      opt.selected = String(pageSize) === String(option);
      sizeSelect.appendChild(opt);
    });
    sizeSelect.addEventListener("change", () => {
      const next = sizeSelect.value === "all" ? "all" : Number(sizeSelect.value);
      setPageSize(next);
    });
    sizeWrap.append(sizeText, sizeSelect);

    const controls = document.createElement("div");
    controls.className = "sx-pagination__controls";
    controls.appendChild(makeButton("Prev", currentPage === 1 || pageSize === "all", false, () => setPage(currentPage - 1)));

    if (pageSize !== "all") {
      pageWindow(currentPage, totalPages).forEach((item) => {
        if (item === "...") {
          const span = document.createElement("span");
          span.className = "sx-page-ellipsis";
          span.textContent = "...";
          controls.appendChild(span);
          return;
        }
        controls.appendChild(makeButton(String(item), false, item === currentPage, () => setPage(item)));
      });
    }

    controls.appendChild(makeButton("Next", currentPage === totalPages || pageSize === "all", false, () => setPage(currentPage + 1)));
    pager.append(meta, sizeWrap, controls);
  }

  function enhanceTable(table) {
    if (ENHANCED.has(table) || table.closest(EXCLUDED_TABLE_SELECTOR)) return;
    const tbody = table.tBodies && table.tBodies[0];
    if (!tbody) return;
    const rows = Array.from(tbody.rows).filter((row) => row.offsetParent !== null || row.style.display !== "none");
    if (rows.length < MIN_TABLE_ROWS) return;

    ENHANCED.add(table);
    table.classList.add("sx-paginated-table");
    let page = 1;
    let pageSize = DEFAULT_PAGE_SIZE;

    const apply = () => {
      const currentRows = Array.from(tbody.rows).filter((row) => {
        if (row.classList.contains("sx-ignore-pagination")) return false;
        if (row.hidden && row.dataset.sxPageHidden !== "true") return false;
        return true;
      });
      const effectivePageSize = pageSizeValue(pageSize, currentRows.length);
      const totalPages = pageSize === "all" ? 1 : Math.max(1, Math.ceil(currentRows.length / effectivePageSize));
      page = Math.min(page, totalPages);
      currentRows.forEach((row, index) => {
        const shouldHide = pageSize !== "all" && (index < (page - 1) * effectivePageSize || index >= page * effectivePageSize);
        row.hidden = shouldHide;
        if (shouldHide) row.dataset.sxPageHidden = "true";
        else delete row.dataset.sxPageHidden;
      });
      renderPagination(table.closest(".table-wrapper") || table, currentRows.length, pageSize, page, (next) => {
        page = next;
        apply();
      }, (nextSize) => {
        pageSize = nextSize;
        page = 1;
        apply();
      });
    };

    apply();
    const observer = new MutationObserver(() => {
      page = 1;
      apply();
    });
    observer.observe(tbody, { childList: true });
  }

  function directEntryChildren(container) {
    return Array.from(container.children).filter((child) => {
      if (child.classList.contains("sx-pagination")) return false;
      if (child.classList.contains("empty-state")) return false;
      if (child.hidden && child.dataset.sxPageHidden !== "true") return false;
      return child.matches(".session-item,.term-item,.student-card,.teacher-card,.vehicle-card,.book-card,.record-card,.fee-card,.list-item,.student-row,.teacher-row,.school-card,.tc-card,.route-card,.issue-card,.assignment-card,.salary-card,.attendance-card,.card");
    });
  }

  function enhanceList(container) {
    if (ENHANCED.has(container) || container.closest("[data-no-pagination],.no-pagination")) return;
    let items = directEntryChildren(container);
    if (items.length < MIN_LIST_ITEMS) return;

    ENHANCED.add(container);
    container.classList.add("sx-enhanced-list");
    let page = 1;
    let pageSize = DEFAULT_PAGE_SIZE;

    const apply = () => {
      items = directEntryChildren(container);
      const effectivePageSize = pageSizeValue(pageSize, items.length);
      const totalPages = pageSize === "all" ? 1 : Math.max(1, Math.ceil(items.length / effectivePageSize));
      page = Math.min(page, totalPages);
      items.forEach((item, index) => {
        const shouldHide = pageSize !== "all" && (index < (page - 1) * effectivePageSize || index >= page * effectivePageSize);
        item.hidden = shouldHide;
        if (shouldHide) item.dataset.sxPageHidden = "true";
        else delete item.dataset.sxPageHidden;
      });
      renderPagination(container, items.length, pageSize, page, (next) => {
        page = next;
        apply();
      }, (nextSize) => {
        pageSize = nextSize;
        page = 1;
        apply();
      });
    };

    apply();
    const observer = new MutationObserver(() => {
      page = 1;
      apply();
    });
    observer.observe(container, { childList: true });
  }

  function enhancePagination(root = document) {
    root.querySelectorAll("table").forEach(enhanceTable);
    root.querySelectorAll(LIST_SELECTORS).forEach(enhanceList);
  }

  function enhanceProfessionalSurface() {
    document.body.classList.add("sx-polished", "sx-enterprise-ui");
    document.querySelectorAll("input, select, textarea").forEach((control) => {
      if (!control.getAttribute("aria-label") && !control.id) return;
      control.classList.add("sx-control-polished");
    });

    document.querySelectorAll("table").forEach((table) => {
      table.classList.add("sx-data-table");
      const region = table.closest(".table-wrap,.table-wrapper,.table-container,.responsive-table,.card,.panel");
      if (region) region.classList.add("sx-data-region");
    });

    document.querySelectorAll(".card,.panel,.stat-card,.summary-card,.metric-card,.quick-action,.quick-link").forEach((surface) => {
      if (surface.matches("a,button,[role='button'],[onclick]") || surface.querySelector(":scope > a[href]")) {
        surface.classList.add("sx-interactive-surface");
      }
    });
  }

  const errorMessages = {
    "permission-denied": "You do not have permission to complete that action.",
    "unauthenticated": "Your sign-in session has expired. Please sign in again.",
    "not-found": "The requested record is no longer available.",
    "network-request-failed": "Network connection failed. Check your internet and try again.",
    "deadline-exceeded": "The request took too long. Check your connection and try again.",
    "resource-exhausted": "Too many requests. Please wait a moment and try again.",
    "unavailable": "Schoolix is temporarily unavailable. Please try again shortly.",
    "auth/invalid-credentials": "The email or password is incorrect.",
    "auth/invalid-login-credentials": "The email or password is incorrect.",
    "auth/user-not-found": "The email or password is incorrect.",
    "auth/wrong-password": "The email or password is incorrect.",
    "auth/too-many-requests": "Too many attempts. Please wait a moment and try again."
  };

  function friendlyError(error, fallback = "Something went wrong. Please try again.") {
    const code = String(error?.code || "").toLowerCase();
    if (errorMessages[code]) return errorMessages[code];
    if (!navigator.onLine || error?.name === "TypeError") return errorMessages["network-request-failed"];
    const message = String(error?.message || "").trim();
    return message && message.length <= 180 ? message : fallback;
  }

  function showGlobalError(error, options = {}) {
    const message = friendlyError(error, options.fallback);
    const existing = document.querySelector(".sx-runtime-error");
    if (existing?.dataset.message === message) return;
    existing?.remove();
    const notice = document.createElement("div");
    notice.className = "sx-runtime-error";
    notice.dataset.message = message;
    notice.setAttribute("role", "alert");
    notice.innerHTML = `<span>${message}</span><button type="button" aria-label="Dismiss error">Dismiss</button>`;
    notice.querySelector("button").addEventListener("click", () => notice.remove());
    document.body.append(notice);
    if (options.duration !== 0) window.setTimeout(() => notice.remove(), options.duration ?? 7000);
  }

  window.SchoolixErrors = Object.assign(window.SchoolixErrors || {}, {
    message: friendlyError,
    show: showGlobalError
  });

  window.addEventListener("unhandledrejection", (event) => {
    const error = event.reason;
    if (error?.name === "AbortError") return;
    console.error("Unhandled Schoolix request failure:", error);
    showGlobalError(error);
  });

  window.addEventListener("error", (event) => {
    if (!event.error) return;
    console.error("Unhandled Schoolix runtime failure:", event.error);
    showGlobalError(event.error);
  });

  window.addEventListener("offline", () => {
    showGlobalError({ code: "network-request-failed" }, { duration: 0 });
  });

  window.addEventListener("online", () => {
    const notice = document.querySelector(".sx-runtime-error");
    if (notice?.dataset.message === errorMessages["network-request-failed"]) notice.remove();
  });

  const MODAL_SELECTOR = [
    "dialog[open]",
    ".modal",
    ".modal-overlay",
    ".modal-backdrop",
    ".dialog-overlay",
    ".popup-overlay",
    ".delete-modal",
    ".receipt-modal",
    "[role='dialog']",
    "[aria-modal='true']"
  ].join(",");
  const MODAL_SURFACE_SELECTOR = [
    ".modal-content",
    ".modal-card",
    ".modal-box",
    ".dialog-content",
    ".dialog-box",
    ".popup-content",
    ".popup-card",
    "[class*='modal-content' i]",
    "[class*='modal-card' i]",
    "[class*='modal-box' i]"
  ].join(",");
  let modalLock = null;
  let modalScanFrame = 0;

  function isVisibleModal(element) {
    if (!(element instanceof HTMLElement) || element.hidden || element.getAttribute("aria-hidden") === "true") return false;
    if (typeof HTMLDialogElement !== "undefined" && element instanceof HTMLDialogElement && !element.open) return false;
    const style = getComputedStyle(element);
    if (style.display === "none" || style.visibility === "hidden" || Number(style.opacity) === 0) return false;
    return element.getClientRects().length > 0;
  }

  function modalSurface(modal) {
    if (modal.matches(".modal-backdrop") && !modal.querySelector(MODAL_SURFACE_SELECTOR)) return null;
    if (modal.matches("dialog,[role='dialog'],[aria-modal='true']") && !modal.querySelector(MODAL_SURFACE_SELECTOR)) return modal;
    return modal.querySelector(MODAL_SURFACE_SELECTOR) || modal;
  }

  function lockDocumentForModal() {
    if (modalLock) return;
    const scrollY = window.scrollY;
    modalLock = {
      scrollY,
      top: document.body.style.top,
      position: document.body.style.position,
      width: document.body.style.width
    };
    document.documentElement.classList.add("sx-modal-open");
    document.body.classList.add("sx-modal-open");
    document.body.style.top = `-${scrollY}px`;
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
  }

  function unlockDocumentFromModal() {
    if (!modalLock) return;
    const previous = modalLock;
    modalLock = null;
    document.documentElement.classList.remove("sx-modal-open");
    document.body.classList.remove("sx-modal-open");
    document.body.style.top = previous.top;
    document.body.style.position = previous.position;
    document.body.style.width = previous.width;
    window.scrollTo(0, previous.scrollY);
  }

  function enhanceOpenModals() {
    const active = Array.from(document.querySelectorAll(MODAL_SELECTOR)).filter(isVisibleModal);
    document.querySelectorAll(".sx-modal-active").forEach((modal) => {
      if (!active.includes(modal)) modal.classList.remove("sx-modal-active", "sx-modal-large", "sx-modal-fullscreen");
    });
    document.querySelectorAll(".sx-modal-scroll-surface").forEach((surface) => {
      if (!active.some((modal) => modal.contains(surface) || modal === surface)) surface.classList.remove("sx-modal-scroll-surface");
    });

    active.forEach((modal) => {
      const surface = modalSurface(modal);
      modal.classList.add("sx-modal-active");
      if (!surface) return;
      surface.classList.add("sx-modal-scroll-surface");
      const explicitFullscreen = modal.matches(".fullscreen-modal,.modal-fullscreen,[data-fullscreen='true']") ||
        Boolean(modal.querySelector("[data-fullscreen-content],iframe,object,embed,.document-preview,.image-preview,.print-preview"));
      const largeContent = explicitFullscreen || Boolean(surface.querySelector("table,.report-sheet,.report-preview,.timetable,.calendar-grid")) ||
        surface.scrollWidth > Math.min(900, window.innerWidth * 0.8);
      modal.classList.toggle("sx-modal-fullscreen", explicitFullscreen);
      modal.classList.toggle("sx-modal-large", largeContent);
    });

    if (active.length) lockDocumentForModal();
    else unlockDocumentFromModal();
  }

  function scheduleModalScan() {
    cancelAnimationFrame(modalScanFrame);
    modalScanFrame = requestAnimationFrame(enhanceOpenModals);
  }

  ready(() => {
    ensurePageLoader();
    optimizeMedia();
    enhanceProfessionalSurface();
    enhanceLoadingText();
    const authPath = (location.pathname || "").toLowerCase();
    if (authPath.endsWith("/index.html") || authPath.endsWith("/login.html") || authPath.endsWith("/reset-password.html") || authPath === "/") {
      clearSchoolixRegionCache();
    } else {
      restoreCachedRegions();
    }
    syncRegionalLoading();
    enhanceOpenModals();
    afterFirstPaint(() => enhancePagination());
    hidePageLoaderAfterFullLoad();

    document.addEventListener("pointerdown", (event) => {
      const button = event.target.closest("button,.btn,.action-btn");
      buttonPressFeedback(button);
      const logout = event.target.closest("[data-logout],#logoutBtn,.logout-btn,.btn-logout,[onclick*='logout' i],[href*='logout' i]");
      if (logout) clearSchoolixRegionCache();
    });

    let scanTimer = 0;
    const observer = new MutationObserver((mutations) => {
      let shouldScan = false;
      mutations.forEach((mutation) => {
        const target = mutation.target instanceof Element ? mutation.target : mutation.target.parentElement;
        const cachedRegion = target?.closest?.("[data-sx-cache-preview='true']");
        if (cachedRegion && (mutation.type === "characterData" || mutation.addedNodes.length || mutation.removedNodes.length)) {
          cachedRegion.classList.remove("sx-cache-preview", "sx-cache-refreshing", "sx-region-loading");
          cachedRegion.removeAttribute("aria-busy");
          delete cachedRegion.dataset.sxCachePreview;
          cachedRegion.querySelectorAll(":scope > .sx-region-skeleton").forEach((item) => item.remove());
          regionCacheState.restored.delete(cachedRegion);
        }
        if (mutation.type === "childList" && mutation.addedNodes.length) shouldScan = true;
        if (mutation.type === "characterData") shouldScan = true;
      });
      if (!shouldScan) return;
      clearTimeout(scanTimer);
      scanTimer = setTimeout(() => {
        clearStaleLoadingText();
        optimizeMedia();
        enhanceLoadingText();
        syncRegionalLoading();
        afterFirstPaint(() => enhancePagination());
      }, 90);
    });
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });

    const modalObserver = new MutationObserver(scheduleModalScan);
    modalObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["class", "style", "hidden", "open", "aria-hidden", "aria-modal"]
    });
    document.addEventListener("click", scheduleModalScan, true);
    document.addEventListener("close", scheduleModalScan, true);
    window.addEventListener("resize", scheduleModalScan, { passive: true });
  });
})();
