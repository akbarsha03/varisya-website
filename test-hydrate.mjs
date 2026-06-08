// Headless hydration check: load dist/index.html into jsdom, register its
// window/document as Node globals, then run the real client bundle against the
// prerendered DOM. Fails on any JS error or React hydration mismatch (which
// React reports via console.error).
import { readFileSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";
import { JSDOM } from "jsdom";
import React from "react";
import * as ReactDOMClient from "react-dom/client";

const ROOT = fileURLToPath(new URL(".", import.meta.url));
const html = readFileSync(join(ROOT, "dist", "index.html"), "utf8");
const appJs = readFileSync(join(ROOT, "dist", "app.js"), "utf8");

const dom = new JSDOM(html, { pretendToBeVisual: true, url: "https://varisya.com/" });
const { window } = dom;

// Register jsdom globals so the Node-loaded react-dom sees a browser env.
for (const k of ["window", "document", "HTMLElement", "Node", "Event",
  "CustomEvent", "getComputedStyle", "MutationObserver"]) {
  try { if (window[k] !== undefined) globalThis[k] = window[k]; } catch {}
}
globalThis.requestAnimationFrame = (cb) => setTimeout(cb, 0);
globalThis.cancelAnimationFrame = () => {};
globalThis.ResizeObserver = class { observe() {} unobserve() {} disconnect() {} };
globalThis.React = React;
globalThis.ReactDOM = { createRoot: ReactDOMClient.createRoot, hydrateRoot: ReactDOMClient.hydrateRoot };

// Capture React's warnings/errors (hydration mismatches come through here).
const messages = [];
const realErr = console.error.bind(console);
console.error = (...a) => messages.push("console.error: " + a.map(String).join(" "));
console.warn = (...a) => messages.push("console.warn: " + a.map(String).join(" "));

const rootBefore = document.getElementById("root").innerHTML.length;
let thrown = null;
try {
  (0, eval)(appJs); // indirect eval → runs against globalThis (browser env)
} catch (e) {
  thrown = e;
}
await new Promise((r) => setTimeout(r, 250));
console.error = realErr;

const rootAfter = document.getElementById("root").innerHTML.length;
console.log("root innerHTML length: before=%d after=%d", rootBefore, rootAfter);
console.log("data-direction after mount:", document.documentElement.getAttribute("data-direction"));
if (messages.length) {
  console.log("\n--- React/console messages (%d) ---", messages.length);
  messages.slice(0, 20).forEach((m) => console.log(m.slice(0, 400)));
}
if (thrown) { console.log("\nRUNTIME ERROR ❌\n" + thrown.stack); process.exit(1); }
const bad = messages.filter((m) => /hydrat|did not match|mismatch|Minified React error|Warning/i.test(m));
if (bad.length) { console.log("\nHYDRATION PROBLEM ❌"); process.exit(1); }
console.log("\nHYDRATION OK ✅ (no mismatch, no runtime error)");
