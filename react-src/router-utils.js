export function resolvePage(pathname, pageNames) {
  let page = "";
  try {
    page = decodeURIComponent(String(pathname || "").replace(/^\/+/, ""));
  } catch {
    return null;
  }
  if (!page || page === "index" || page === "index.html") return "index.html";
  return pageNames.has(page) ? page : null;
}

export function toAssetUrl(value, origin = window.location.origin) {
  if (!value || /^(#|data:|blob:|mailto:|tel:|javascript:)/i.test(value)) return value;
  try { return new URL(value, origin).href; } catch { return value; }
}

export function isInternalPageLink(anchor, pageNames, origin = window.location.origin) {
  if (!anchor?.href || anchor.target || anchor.hasAttribute("download")) return false;
  const destination = new URL(anchor.href, origin);
  const next = destination.pathname.split("/").pop();
  return destination.origin === origin && pageNames.has(next);
}
