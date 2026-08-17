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
  const PAGE_LOADER_MIN_VISIBLE_MS = 60;
  const PAGE_LOADER_STABLE_MS = 60;
  const PAGE_LOADER_FAST_PAGE = /(?:accountant|fees-report|school-accounts|admin-timetable)/i.test(location.pathname);
  const PAGE_LOADER_MAX_WAIT_MS = PAGE_LOADER_FAST_PAGE ? 900 : 1600;
  const PAGE_LOADER_CHECK_DEBOUNCE_MS = 40;
  const PAGE_LOADER_DISABLED = window.SchoolixDisablePageLoader === true;
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
    const run = () => {
      if ("requestIdleCallback" in window) window.requestIdleCallback(fn, { timeout: 900 });
      else setTimeout(fn, 120);
    };
    requestAnimationFrame(() => requestAnimationFrame(run));
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
      return;
    }
    const loader = document.createElement("div");
    loader.id = "sxPageLoader";
    loader.className = "sx-page-loader";
    loader.setAttribute("role", "status");
    loader.setAttribute("aria-live", "polite");
    loader.innerHTML = [
      '<section class="dots-container" aria-label="Loading page">',
      '<div class="dot"></div>',
      '<div class="dot"></div>',
      '<div class="dot"></div>',
      '<div class="dot"></div>',
      '<div class="dot"></div>',
      "</section>"
    ].join("");
    document.body.prepend(loader);
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

    pageLoaderState.observer = new MutationObserver(() => {
      clearTimeout(pageLoaderState.stableTimer);
      pageLoaderState.stableTimer = 0;
      schedulePageLoaderCheck();
    });
    pageLoaderState.observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class", "hidden", "style", "aria-busy", "data-loading"],
      childList: true,
      characterData: true,
      subtree: true
    });

    pageLoaderState.maxTimer = setTimeout(() => {
      if (!pageLoaderState.hidden) hidePageLoader();
    }, PAGE_LOADER_MAX_WAIT_MS);

    schedulePageLoaderCheck();
  }

  function isLoadingText(text) {
    return /^(loading|loading data|loading sessions|loading terms|please wait|fetching|processing)(\.{0,3}|\u2026)?$/i.test(String(text || "").trim());
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
        hasRenderablePageContent() &&
        !hasPendingCriticalImages();

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
    document.body.classList.add("sx-polished");
    document.querySelectorAll("input, select, textarea").forEach((control) => {
      if (!control.getAttribute("aria-label") && !control.id) return;
      control.classList.add("sx-control-polished");
    });
  }

  ready(() => {
    ensurePageLoader();
    optimizeMedia();
    enhanceProfessionalSurface();
    enhanceLoadingText();
    afterFirstPaint(() => enhancePagination());
    hidePageLoaderAfterFullLoad();

    document.addEventListener("pointerdown", (event) => {
      const button = event.target.closest("button,.btn,.action-btn");
      buttonPressFeedback(button);
    });

    let scanTimer = 0;
    const observer = new MutationObserver((mutations) => {
      let shouldScan = false;
      mutations.forEach((mutation) => {
        if (mutation.type === "childList" && mutation.addedNodes.length) shouldScan = true;
        if (mutation.type === "characterData") shouldScan = true;
      });
      if (!shouldScan) return;
      clearTimeout(scanTimer);
      scanTimer = setTimeout(() => {
        clearStaleLoadingText();
        optimizeMedia();
        enhanceLoadingText();
        afterFirstPaint(() => enhancePagination());
      }, 90);
    });
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
  });
})();
