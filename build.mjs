// Build step for Varisya — prerenders the React app to static HTML and ships a
// precompiled production bundle (no in-browser Babel). Output goes to dist/.
import { transformSync } from "esbuild";
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, readdirSync, rmSync, statSync } from "fs";
import { join } from "path";
import React from "react";
import { renderToString } from "react-dom/server";
import { createRequire } from "module";
import { fileURLToPath } from "url";

const require = createRequire(import.meta.url);
const ROOT = fileURLToPath(new URL(".", import.meta.url));
const SRC = join(ROOT, "public");
const OUT = join(ROOT, "dist");
const ORDER = ["tweaks-panel.jsx", "components.jsx", "sections.jsx", "app.jsx"];
const REACT_DESTRUCTURE = /const\s*\{[^}]*\}\s*=\s*React\s*;?/g;

function transpile(name, { stripMount }) {
  let code = readFileSync(join(SRC, name), "utf8");
  code = code.replace(REACT_DESTRUCTURE, ""); // dedupe React hook destructuring
  if (stripMount) {
    code = code
      .split("\n")
      .filter((l) => !l.includes("ReactDOM.createRoot"))
      .join("\n");
  }
  const out = transformSync(code, { loader: "jsx", jsx: "transform", target: "es2019" });
  return out.code;
}

const HOOKS = "const { useState, useEffect, useRef, useCallback, useMemo } = React;\n";

// ---- 1. Server-render <App/> to an HTML string -----------------------------
function prerender() {
  const body =
    HOOKS +
    ORDER.map((f) => transpile(f, { stripMount: true })).join("\n") +
    "\nmodule.exports = { App };\n";
  const tmp = join(ROOT, ".ssr-bundle.cjs");
  writeFileSync(tmp, body);
  // Provide the browser globals the module touches at load time (only window,
  // for the Object.assign(window, …) export lines; render itself is pure).
  globalThis.React = React;
  globalThis.window = globalThis.window || {};
  globalThis.document = globalThis.document || {
    documentElement: { style: {}, setAttribute() {}, removeAttribute() {} },
    body: { style: {} },
    addEventListener() {}, removeEventListener() {}, getElementById() { return null; },
  };
  const { App } = require(tmp);
  const html = renderToString(React.createElement(App));
  rmSync(tmp, { force: true });
  return html;
}

// ---- 2. Build the client bundle (hydrate, production React) ----------------
function clientBundle() {
  const parts = ORDER.map((f) =>
    transpile(f, { stripMount: f === "app.jsx" })
  );
  // Re-add a hydration mount in place of the stripped createRoot call.
  const mount =
    'ReactDOM.hydrateRoot(document.getElementById("root"), React.createElement(App));';
  return HOOKS + parts.join("\n") + "\n" + mount + "\n";
}

// ---- 3. Assemble dist/ ------------------------------------------------------
function copyStatic() {
  rmSync(OUT, { recursive: true, force: true });
  mkdirSync(OUT, { recursive: true });
  for (const f of readdirSync(SRC)) {
    if (statSync(join(SRC, f)).isFile()) copyFileSync(join(SRC, f), join(OUT, f));
  }
}

const REACT_PROD = `
  <script crossorigin src="https://unpkg.com/react@18.3.1/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js"></script>
  <script src="app.js" defer></script>`;

function buildHtml(appHtml) {
  let html = readFileSync(join(SRC, "index.html"), "utf8");
  // Inject prerendered markup into the root container.
  html = html.replace(
    /<div id="root">\s*<\/div>/,
    `<div id="root">${appHtml}</div>`
  );
  // Replace the dev React + in-browser Babel block with the production bundle.
  html = html.replace(
    /\s*<script src="https:\/\/unpkg\.com\/react@[\s\S]*?<script type="text\/babel" src="app\.jsx"><\/script>/,
    REACT_PROD
  );
  return html;
}

// ---- run --------------------------------------------------------------------
const appHtml = prerender();
// Safety: never ship an empty prerender.
if (!/Books, Inventory, Billing|shaped to/.test(appHtml) || appHtml.length < 5000) {
  throw new Error("Prerender produced unexpected/empty HTML — aborting build.");
}
const client = transformSync(clientBundle(), { minify: true, target: "es2019" }).code;
copyStatic();
// Remove the raw .jsx sources from the deploy (now compiled into app.js).
for (const f of ORDER) rmSync(join(OUT, f), { force: true });
writeFileSync(join(OUT, "app.js"), client);
writeFileSync(join(OUT, "index.html"), buildHtml(appHtml));

console.log(`prerendered ${appHtml.length} chars of HTML`);
console.log(`client bundle ${client.length} chars (minified)`);
