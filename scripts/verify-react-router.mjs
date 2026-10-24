import assert from "node:assert/strict";
import { isInternalPageLink, resolvePage, toAssetUrl } from "../react-src/router-utils.js";

const origin = "https://schoolix.example";
const pages = new Set(["index.html", "students.html"]);

assert.equal(resolvePage("/students.html", pages), "students.html");
assert.equal(resolvePage("/index", pages), "index.html");
assert.equal(resolvePage("/%E0%A4%A", pages), null);
assert.equal(toAssetUrl("schoolix-app.css", origin), `${origin}/schoolix-app.css`);
assert.equal(toAssetUrl("#i-close", origin), "#i-close");
assert.equal(toAssetUrl("data:image/png;base64,abc", origin), "data:image/png;base64,abc");
assert.equal(isInternalPageLink({ href: `${origin}/students.html`, hasAttribute: () => false }, pages, origin), true);
assert.equal(isInternalPageLink({ href: `${origin}/students.html`, target: "_blank", hasAttribute: () => false }, pages, origin), false);

console.log("React router helpers verified.");
