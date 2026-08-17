(function () {
  const STORAGE_KEY = "schoolix.schoolName";
  const LOGO_STORAGE_KEY = "schoolix.schoolLogoUrl";
  const STYLE_ID = "schoolBrandingStyles";
  const DEFAULT_LOGO_URL = "/schoolix-app-icon.svg";
  const DEFAULT_LOGO_TARGET_SELECTOR = [
    ".brand-icon",
    ".auth-loader-mark",
    ".logo-mark",
    ".sidebar-logo .logo-mark",
    ".topbar-logo",
    ".notice-brand-mark",
    ".sx-admin-brand-mark",
    "#sxAdminBrandMark"
  ].join(",");
  const BRAND_PATTERNS = [
    /Schoolix Public School/gi,
    /Schoolix Academy/gi,
    /SCHOOLIX SCHOOL/gi,
    /Schoolix/gi
  ];

  let isApplying = false;
  let applyQueued = false;

  function normalizeSchoolName(value) {
    return String(value || "").replace(/\s+/g, " ").trim();
  }

  function containsBrandToken(value) {
    const text = String(value || "");
    return BRAND_PATTERNS.some((pattern) => new RegExp(pattern.source, pattern.flags).test(text));
  }

  function replaceBrandText(value, schoolName) {
    return BRAND_PATTERNS.reduce(
      (output, pattern) => output.replace(new RegExp(pattern.source, pattern.flags), schoolName),
      String(value || "")
    );
  }

  function safeStorageGet() {
    try {
      return localStorage.getItem(STORAGE_KEY) || "";
    } catch (error) {
      return "";
    }
  }

  function safeStorageSet(schoolName) {
    try {
      localStorage.setItem(STORAGE_KEY, schoolName);
    } catch (error) {
      console.warn("Unable to save school name:", error);
    }
  }

  function safeLogoStorageSet(logoUrl) {
    try {
      if (logoUrl) localStorage.setItem(LOGO_STORAGE_KEY, logoUrl);
      else localStorage.removeItem(LOGO_STORAGE_KEY);
    } catch (error) {
      console.warn("Unable to save school logo:", error);
    }
  }

  function getSchoolName() {
    return normalizeSchoolName(safeStorageGet());
  }

  function getSchoolLogoUrl() {
    try {
      return localStorage.getItem(LOGO_STORAGE_KEY) || "";
    } catch (error) {
      return "";
    }
  }

  function ensureStyles() {
    if (document.getElementById(STYLE_ID)) {
      return;
    }

    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      :root {
        --panel-theme-primary: #2563eb;
        --panel-theme-primary-dark: #1d4ed8;
        --panel-theme-accent: #0f172a;
        --panel-theme-line: rgba(148, 163, 184, 0.26);
        --panel-theme-shadow: 0 18px 42px rgba(15, 23, 42, 0.10);
      }

      body {
        font-family: "Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
      }

      .card,
      .top-bar,
      .header,
      .controls,
      .glass-card,
      .teacher-info,
      .attendance-form,
      .report-card,
      .modal-content,
      .search-section,
      .tc-form,
      .tc-preview,
      .login-container,
      .container > .card {
        box-shadow: var(--panel-theme-shadow);
        border: 1px solid var(--panel-theme-line);
      }

      input,
      select,
      textarea {
        border-radius: 12px;
      }

      button,
      .btn,
      .btn-login,
      .btn-google,
      .btn-primary,
      .btn-secondary,
      .btn-success,
      .btn-danger,
      .btn-warning,
      .btn-info,
      .btn-logout,
      .logout-btn,
      .primary-btn,
      .danger-btn,
      .add-btn,
      .delete-btn,
      .action-btn {
        border-radius: 12px;
        font-weight: 700;
        letter-spacing: 0.01em;
        transition: transform 180ms ease, box-shadow 180ms ease, filter 180ms ease;
      }

      button:hover,
      .btn:hover,
      .btn-login:hover,
      .btn-google:hover,
      .btn-primary:hover,
      .btn-secondary:hover,
      .btn-success:hover,
      .btn-danger:hover,
      .btn-warning:hover,
      .btn-info:hover,
      .btn-logout:hover,
      .logout-btn:hover,
      .primary-btn:hover,
      .danger-btn:hover,
      .add-btn:hover,
      .delete-btn:hover,
      .action-btn:hover {
        transform: translateY(-1px);
      }

      .schoolix-action-icon {
        width: 1em;
        height: 1em;
        display: inline-block;
        vertical-align: -0.15em;
        margin-right: 0.42em;
        color: currentColor;
        flex: 0 0 auto;
      }

      button .schoolix-action-icon,
      .btn .schoolix-action-icon,
      .action-btn .schoolix-action-icon {
        pointer-events: none;
      }

      .schoolix-btn-spinner {
        width: 1em;
        height: 1em;
        border: 2px solid currentColor;
        border-right-color: transparent;
        border-radius: 999px;
        display: inline-block;
        margin-right: 0.45em;
        vertical-align: -0.15em;
        animation: schoolixSpin 760ms linear infinite;
      }

      .schoolix-loading,
      .schoolix-loading:hover {
        opacity: 0.82;
        transform: none !important;
        pointer-events: none;
      }

      .schoolix-branded-logo {
        overflow: hidden;
      }

      .schoolix-branded-logo img {
        width: 100%;
        height: 100%;
        display: block;
        object-fit: cover;
        border-radius: inherit;
      }

      .schoolix-product-logo {
        padding: 0 !important;
        color: transparent !important;
        font-size: 0 !important;
        line-height: 0 !important;
        background: #07111f !important;
      }

      .schoolix-product-logo svg,
      .schoolix-product-logo i {
        display: none !important;
      }

      @keyframes schoolixSpin {
        to { transform: rotate(360deg); }
      }

    `;

    document.head.appendChild(style);
  }

  function renderBanner() {
    ensureStyles();
  }

  function applyDocumentTitle(schoolName) {
    if (!document.title) {
      return;
    }

    if (!document.documentElement.dataset.schoolBrandOriginalTitle) {
      document.documentElement.dataset.schoolBrandOriginalTitle = document.title;
    }

    const originalTitle = document.documentElement.dataset.schoolBrandOriginalTitle;
    const nextTitle = containsBrandToken(originalTitle)
      ? replaceBrandText(originalTitle, schoolName)
      : `${schoolName} - ${originalTitle}`;

    if (document.title !== nextTitle) {
      document.title = nextTitle;
    }
  }

  function applyLeafText(schoolName) {
    const elements = document.body.querySelectorAll(
      "h1, h2, h3, h4, h5, h6, p, span, div, button, label, strong, small, a"
    );

    elements.forEach((element) => {
      if (element.closest("[data-school-branding='ignore']")) {
        return;
      }

      if (element.childElementCount > 0) {
        return;
      }

      const rawText = element.dataset.schoolBrandOriginalText || element.textContent;
      if (!containsBrandToken(rawText)) {
        return;
      }

      if (!element.dataset.schoolBrandOriginalText) {
        element.dataset.schoolBrandOriginalText = rawText;
      }

      const nextText = replaceBrandText(element.dataset.schoolBrandOriginalText, schoolName);
      if (element.textContent !== nextText) {
        element.textContent = nextText;
      }
    });
  }

  function applyInputs(schoolName) {
    const controls = document.querySelectorAll("input, textarea");

    controls.forEach((control) => {
      if (control.placeholder && containsBrandToken(control.placeholder)) {
        if (!control.dataset.schoolBrandOriginalPlaceholder) {
          control.dataset.schoolBrandOriginalPlaceholder = control.placeholder;
        }

        const nextPlaceholder = replaceBrandText(control.dataset.schoolBrandOriginalPlaceholder, schoolName);
        if (control.placeholder !== nextPlaceholder) {
          control.placeholder = nextPlaceholder;
        }
      }

      if (!control.value || !containsBrandToken(control.value)) {
        return;
      }

      if (!control.dataset.schoolBrandOriginalValue) {
        control.dataset.schoolBrandOriginalValue = control.value;
      }

      const renderedValue = replaceBrandText(control.dataset.schoolBrandOriginalValue, schoolName);
      const previousValue = control.dataset.schoolBrandRenderedValue || "";
      const canUpdateValue =
        !control.value ||
        control.value === control.dataset.schoolBrandOriginalValue ||
        control.value === previousValue;

      if (canUpdateValue) {
        control.value = renderedValue;
        control.dataset.schoolBrandRenderedValue = renderedValue;
      }
    });

    const schoolNameField = document.getElementById("schoolName");
    if (schoolNameField && "value" in schoolNameField && !String(schoolNameField.value || "").trim()) {
      schoolNameField.value = schoolName;
      schoolNameField.dataset.schoolBrandRenderedValue = schoolName;
    }
  }

  const ACTION_ICON_PATHS = {
    add: '<path d="M12 5v14M5 12h14"/>',
    attendance: '<path d="M9 5h6"/><path d="M9 3h6v4H9z"/><path d="M5 5h2m10 0h2v16H5V5"/><path d="M9 14l2 2 4-4"/>',
    back: '<path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/>',
    delete: '<path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/>',
    edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
    eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>',
    logout: '<path d="M10 17l5-5-5-5"/><path d="M15 12H3"/><path d="M21 3v18h-6"/>',
    print: '<path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 14h12v8H6z"/>',
    refresh: '<path d="M20 11a8 8 0 0 0-14.5-4.5L3 9"/><path d="M3 3v6h6"/><path d="M4 13a8 8 0 0 0 14.5 4.5L21 15"/><path d="M21 21v-6h-6"/>',
    salary: '<path d="M3 7a2 2 0 0 1 2-2h14v14H5a2 2 0 0 1-2-2z"/><path d="M17 12h4v4h-4a2 2 0 0 1 0-4z"/>',
    save: '<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><path d="M17 21v-8H7v8M7 3v5h8"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="M21 21l-4.3-4.3"/>',
    user: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>'
  };

  function actionIconName(label) {
    const text = String(label || "").trim().toLowerCase();
    if (!text) return "";
    if (text.includes("delete") || text.includes("remove")) return "delete";
    if (text.includes("print")) return "print";
    if (text.includes("save")) return "save";
    if (text.includes("refresh") || text.includes("reload") || text.includes("load")) return "refresh";
    if (text.includes("logout")) return "logout";
    if (text.includes("back")) return "back";
    if (text.includes("edit") || text.includes("update")) return "edit";
    if (text.includes("view") || text.includes("preview") || text.includes("open")) return "eye";
    if (text.includes("salary") || text.includes("payment") || text.includes("paid")) return "salary";
    if (text.includes("attendance") || text.includes("present") || text.includes("absent") || text.includes("half day")) return "attendance";
    if (text.includes("add") || text.includes("create") || text.includes("generate")) return "add";
    if (text.includes("search")) return "search";
    if (text.includes("teacher") || text.includes("student")) return "user";
    return "";
  }

  function actionIconSvg(name) {
    const path = ACTION_ICON_PATHS[name];
    if (!path) return "";
    return `<svg class="schoolix-action-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${path}</svg>`;
  }

  function setButtonLoading(button, loading, label) {
    if (!button || button.dataset.schoolixManualLoading === "true") return;

    if (loading) {
      if (!button.dataset.schoolixDefaultHtml) {
        button.dataset.schoolixDefaultHtml = button.innerHTML;
      }
      button.classList.add("schoolix-loading");
      button.disabled = true;
      button.setAttribute("aria-busy", "true");
      button.innerHTML = `<span class="schoolix-btn-spinner" aria-hidden="true"></span>${label || "Working..."}`;
      return;
    }

    if (button.dataset.schoolixDefaultHtml) {
      button.innerHTML = button.dataset.schoolixDefaultHtml;
    }
    button.classList.remove("schoolix-loading");
    button.disabled = false;
    button.removeAttribute("aria-busy");
  }

  function shouldLoadForButton(button, fnName) {
    const label = String(button?.textContent || "").toLowerCase();
    const onclick = String(button?.getAttribute("onclick") || fnName || "").toLowerCase();
    const text = `${label} ${onclick}`;
    if (!button || button.disabled) return false;
    if (/print|download|export|view|open|close|cancel|back|dashboard|switchtab|reset|clear|logout|window\.location/.test(text)) {
      return false;
    }
    return /save|add|create|delete|generate|load|fetch|search|apply|confirm|record|mark|impose|update|refresh|scan|submit/.test(text);
  }

  function loadingLabelFor(button) {
    const label = String(button?.textContent || "").toLowerCase();
    if (label.includes("delete")) return "Deleting...";
    if (label.includes("save")) return "Saving...";
    if (label.includes("create")) return "Creating...";
    if (label.includes("generate")) return "Generating...";
    if (label.includes("search") || label.includes("fetch")) return "Searching...";
    if (label.includes("load") || label.includes("refresh")) return "Loading...";
    if (label.includes("mark")) return "Updating...";
    if (label.includes("impose")) return "Imposing...";
    return "Working...";
  }

  function buttonForFunctionCall(fnName) {
    const active = document.activeElement;
    if (active?.matches?.("button, .btn, .action-btn")) {
      const onclick = active.getAttribute("onclick") || "";
      if (onclick.includes(`${fnName}(`) || onclick.includes(fnName)) return active;
    }
    return Array.from(document.querySelectorAll("button[onclick], .btn[onclick], .action-btn[onclick]"))
      .find((button) => (button.getAttribute("onclick") || "").includes(`${fnName}(`));
  }

  function wrapActionHandler(fnName) {
    const fn = window[fnName];
    if (typeof fn !== "function" || fn.schoolixWrapped === true) return;

    const wrapped = function (...args) {
      const button = buttonForFunctionCall(fnName);
      const useLoader = shouldLoadForButton(button, fnName);
      if (useLoader) setButtonLoading(button, true, loadingLabelFor(button));

      let result;
      try {
        result = fn.apply(this, args);
      } catch (error) {
        if (useLoader) setButtonLoading(button, false);
        throw error;
      }

      if (result && typeof result.finally === "function") {
        return result.finally(() => {
          if (useLoader) setButtonLoading(button, false);
        });
      }

      if (useLoader) {
        window.setTimeout(() => setButtonLoading(button, false), 700);
      }
      return result;
    };

    wrapped.schoolixWrapped = true;
    wrapped.schoolixOriginal = fn;
    window[fnName] = wrapped;
  }

  function applyButtonLoaders() {
    if (!document.body) return;
    const names = new Set();
    document.querySelectorAll("button[onclick], .btn[onclick], .action-btn[onclick]").forEach((button) => {
      const onclick = button.getAttribute("onclick") || "";
      const match = onclick.trim().match(/^([A-Za-z_$][\w$]*)\s*\(/);
      if (match && shouldLoadForButton(button, match[1])) {
        names.add(match[1]);
      }
    });
    names.forEach(wrapActionHandler);
  }

  function applyActionIcons() {
    if (!document.body) return;
    document.querySelectorAll("button, .btn, .action-btn").forEach((button) => {
      if (button.dataset.schoolIconApplied === "true") return;
      if (button.querySelector("svg, i, .schoolix-action-icon, [data-icon]")) return;
      const iconName = button.dataset.schoolIcon || actionIconName(button.textContent);
      if (!iconName) return;
      button.insertAdjacentHTML("afterbegin", actionIconSvg(iconName));
      button.dataset.schoolIconApplied = "true";
    });
  }

  function applyPanelIllustrations() {
    if (!document.body) return;
    document.querySelectorAll(".schoolix-panel-visual").forEach((visual) => visual.remove());
    document.querySelectorAll(".schoolix-visual-host").forEach((host) => host.classList.remove("schoolix-visual-host"));
  }

  function escapeAttribute(value = "") {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function schoolixLogoMarkup(alt = "Schoolix logo") {
    return `<img src="${escapeAttribute(DEFAULT_LOGO_URL)}" alt="${escapeAttribute(alt)}" draggable="false">`;
  }

  function applyDefaultSchoolixLogo(root = document) {
    if (!document.body) return;
    root.querySelectorAll(DEFAULT_LOGO_TARGET_SELECTOR).forEach((target) => {
      if (target.dataset.schoolixLogoSource === "school") return;
      target.classList.add("schoolix-branded-logo", "schoolix-product-logo");
      target.dataset.schoolixLogoSource = "product";
      if (!target.querySelector(`img[src="${DEFAULT_LOGO_URL}"]`)) {
        target.innerHTML = schoolixLogoMarkup();
      }
    });
  }

  function applySchoolLogo(explicitLogoUrl) {
    const logoUrl = String(explicitLogoUrl || getSchoolLogoUrl() || "").trim();
    if (!document.body || !logoUrl) return logoUrl;
    const targets = document.querySelectorAll(".school-avatar,.logo-mark,.sidebar-logo .logo-mark,.brand-icon,.sx-admin-brand-mark,#sxAdminBrandMark");
    targets.forEach((target) => {
      if (target.dataset.schoolBranding === "ignore") return;
      target.classList.add("schoolix-branded-logo");
      target.classList.remove("schoolix-product-logo");
      target.dataset.schoolixLogoSource = "school";
      target.innerHTML = `<img src="${logoUrl.replace(/"/g, "&quot;")}" alt="School logo">`;
    });
    return logoUrl;
  }

  function applySchoolBranding(explicitSchoolName) {
    const schoolName = normalizeSchoolName(explicitSchoolName || getSchoolName());
    if (!document.body) {
      renderBanner("");
      return schoolName;
    }

    if (!schoolName) {
      renderBanner("");
      applyDefaultSchoolixLogo();
      applyPanelIllustrations();
      applyActionIcons();
      applyButtonLoaders();
      return schoolName;
    }

    if (isApplying) {
      return schoolName;
    }

    isApplying = true;

    try {
      renderBanner(schoolName);
      applyDocumentTitle(schoolName);
      applyLeafText(schoolName);
      applyInputs(schoolName);
      applyDefaultSchoolixLogo();
      applySchoolLogo();
      applyPanelIllustrations();
      applyActionIcons();
      applyButtonLoaders();
    } catch (error) {
      console.warn("School branding apply skipped:", error);
    } finally {
      isApplying = false;
    }

    return schoolName;
  }

  function scheduleApply() {
    if (applyQueued) {
      return;
    }

    applyQueued = true;
    window.requestAnimationFrame(() => {
      applyQueued = false;
      applySchoolBranding();
    });
  }

  function persistSchoolName(value) {
    const schoolName = normalizeSchoolName(value);
    if (!schoolName) {
      return "";
    }

    safeStorageSet(schoolName);
    applySchoolBranding(schoolName);
    return schoolName;
  }

  function persistSchoolLogo(value) {
    const logoUrl = String(value || "").trim();
    safeLogoStorageSet(logoUrl);
    applySchoolLogo(logoUrl);
    return logoUrl;
  }

  const observer = new MutationObserver(() => {
    if (!isApplying) {
      scheduleApply();
    }
  });

  function initialize() {
    try {
      applySchoolBranding();
    } catch (error) {
      console.warn("School branding initialize skipped:", error);
    }
    if (document.body) {
      observer.observe(document.body, { childList: true, subtree: true });
    }
    window.setTimeout(applyButtonLoaders, 300);
    window.setTimeout(applyButtonLoaders, 1200);
  }

  window.SchoolBranding = {
    STORAGE_KEY,
    LOGO_STORAGE_KEY,
    normalizeSchoolName,
    getSchoolName,
    getSchoolLogoUrl,
    persistSchoolName,
    persistSchoolLogo,
    applySchoolBranding,
    applySchoolLogo,
    applyDefaultSchoolixLogo,
    setButtonLoading
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();
