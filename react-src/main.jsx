import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, useLocation, useNavigate } from "react-router-dom";
import { pageNames, pages } from "./generated/pages.js";
import { isInternalPageLink, resolvePage, toAssetUrl } from "./router-utils.js";
import "./react-shell.css";

function addAttributes(element, attributes = {}) {
  for (const [name, value] of Object.entries(attributes)) element.setAttribute(name, name === "src" || name === "href" ? toAssetUrl(value) : value);
}

function ReactScreen({ page }) {
  const screen = pages[page];
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let disposed = false;
    const additions = [];
    document.title = screen.title;
    document.documentElement.className = screen.htmlClass;
    document.body.className = screen.bodyClass;

    async function run() {
      for (const style of screen.styles) {
        const element = document.createElement(style.tag);
        addAttributes(element, style.attributes);
        if (style.tag === "style") element.textContent = style.text;
        element.dataset.schoolixReactAsset = page;
        document.head.appendChild(element);
        additions.push(element);
      }
      await new Promise((resolve) => requestAnimationFrame(resolve));
      for (const source of screen.scripts) {
        if (disposed) return;
        const script = document.createElement("script");
        addAttributes(script, source.attributes);
        script.async = false;
        script.dataset.schoolixReactAsset = page;
        if (!source.attributes.src) script.textContent = source.text;
        const complete = new Promise((resolve) => {
          script.addEventListener("load", resolve, { once: true });
          script.addEventListener("error", resolve, { once: true });
        });
        document.body.appendChild(script);
        additions.push(script);
        if (source.attributes.src) await complete;
      }
      // The branding script can load before a dynamically-created sidebar.
      // Run it once more after the route has fully initialized so the product
      // mark is always visible until a school-specific logo replaces it.
      window.SchoolBranding?.applyDefaultSchoolixLogo?.();
      window.SchoolBranding?.applySchoolBranding?.();
      if (!disposed) setReady(true);
    }
    setReady(false);
    run();
    return () => { disposed = true; additions.forEach((element) => element.remove()); };
  }, [page, screen]);

  return <main className={`schoolix-page${ready ? " is-ready" : ""}`} dangerouslySetInnerHTML={{ __html: screen.body }} />;
}

function NotFoundScreen() {
  return <main className="schoolix-react-not-found">
    <section>
      <img src="/schoolix-app-icon.svg" alt="Schoolix" />
      <div className="schoolix-react-not-found-code">404</div>
      <h1>Page not found</h1>
      <p>The page you requested is unavailable or may have moved.</p>
      <a href="#/index.html">Go to sign in</a>
    </section>
  </main>;
}

function AppRouter() {
  const location = useLocation();
  const navigate = useNavigate();
  const page = useMemo(() => resolvePage(location.pathname), [location.pathname]);

  useEffect(() => {
    const onClick = (event) => {
      const anchor = event.target.closest("a[href]");
      if (!anchor || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (!isInternalPageLink(anchor, pageNames)) return;
      const destination = new URL(anchor.href, window.location.href);
      const next = destination.pathname.split("/").pop();
      event.preventDefault();
      navigate(`/${next}${destination.search}${destination.hash}`);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [navigate]);

  return page ? <ReactScreen page={page} /> : <NotFoundScreen />;
}

createRoot(document.getElementById("root")).render(<HashRouter><AppRouter /></HashRouter>);
