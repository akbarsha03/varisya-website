/* global React */
// VARISYA — shared components + icon set. Exports to window.
const { useState, useEffect, useRef } = React;

/* ---------------- Icons (stroke, 24-grid) ---------------- */
const I = {
  book: <path d="M5 4.5A1.5 1.5 0 0 1 6.5 3H19v15.5H6.5A1.5 1.5 0 0 0 5 20M5 4.5V20M5 4.5v0M19 18.5H6.5A1.5 1.5 0 0 0 5 20m0 0v.5h13M9 8h6M9 11h4" />,
  box: <path d="M12 3 4 7.2v9.6L12 21l8-4.2V7.2L12 3Zm0 0v0M4 7.2 12 11.4M12 11.4l8-4.2M12 11.4V21" />,
  receipt: <path d="M6 3h12v18l-2.4-1.6L13.2 21l-2.4-1.6L8.4 21 6 19.4V3Zm3 5h6M9 11.5h6M9 15h3" />,
  store: <path d="M4 9.5 5.4 4h13.2L20 9.5M4 9.5h16M4 9.5v0a3 3 0 0 0 6 0 3 3 0 0 0 4 0 3 3 0 0 0 6 0M5.5 11.5V20h13v-8.5M10 20v-4.5h4V20" />,
  check: <path d="M5 12.5 10 17l9-10" />,
  arrow: <path d="M5 12h13m0 0-5-5m5 5-5 5" />,
  x: <path d="M6 6l12 12M18 6 6 18" />,
  dot: <path d="M12 8v8M8 12h8" />,
  shield: <path d="M12 3 5 5.8v5.2c0 4.3 3 7.6 7 9 4-1.4 7-4.7 7-9V5.8L12 3Z" />,
  server: <path d="M4 5h16v6H4V5Zm0 8h16v6H4v-6ZM8 8h0M8 16h0" />,
  layers: <path d="M12 3 3 8l9 5 9-5-9-5ZM3 13l9 5 9-5M3 16.5l9 5 9-5" />,
  spark: <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6.3 6.3l2.5 2.5M15.2 15.2l2.5 2.5M17.7 6.3l-2.5 2.5M8.8 15.2l-2.5 2.5" />,
  lock: <path d="M7 10V8a5 5 0 0 1 10 0v2M5.5 10h13v9.5h-13V10Z" />,
  clock: <path d="M12 7v5l3.5 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />,
  tag: <path d="M3 12V4h8l9 9-8 8-9-9Zm5-4h0" />,
  globe: <path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 0c-2.5 2-3.5 5.5-3.5 9s1 7 3.5 9m0-18c2.5 2 3.5 5.5 3.5 9s-1 7-3.5 9M3.5 9h17M3.5 15h17" />,
  users: <path d="M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm0 0c-3.3 0-6 2-6 5v1h12v-1c0-3-2.7-5-6-5Zm7.5-6.8a3.5 3.5 0 0 1 0 6.6M17 11.4c2.6.5 4 2.4 4 4.6v1h-3" />,
  refresh: <path d="M4 12a8 8 0 0 1 13.7-5.6L20 8M20 8V4m0 4h-4M20 12a8 8 0 0 1-13.7 5.6L4 16m0 0v4m0-4h4" />,
  route: <path d="M6 19a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm0 0h6.5a3.5 3.5 0 0 0 0-7h-1a3.5 3.5 0 0 1 0-7H18m0 0a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />,
  headset: <path d="M5 13v-1a7 7 0 0 1 14 0v1M5 13a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h1v-5H5Zm14 0a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1v-5h1Zm0 5v1a3 3 0 0 1-3 3h-2" />,
  sliders: <path d="M5 7h8m4 0h2M5 7H3m2 0a2 2 0 1 0 4 0 2 2 0 0 0-4 0Zm10 10h4m-4 0H3m12 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />,
  doc: <path d="M7 3h7l4 4v14H7V3Zm7 0v4h4M10 12h5M10 15.5h5" />,
};
function Icon({ name, size = 24, sw = 1.6, style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" style={style}>
      {I[name] || null}
    </svg>
  );
}

/* ---------------- Wordmark ---------------- */
function Wordmark({ onClick }) {
  return (
    <a href="#top" className="wordmark" onClick={onClick} aria-label="Varisya home">
      <span className="wordmark__mark" aria-hidden="true">
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
          <rect x="1.1" y="1.1" width="27.8" height="27.8" rx="7" stroke="currentColor" strokeWidth="1.4" opacity=".5"/>
          <path d="M8 8.5 15 21l7-12.5" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="15" cy="21" r="1.7" fill="currentColor"/>
        </svg>
      </span>
      <span className="wordmark__name">Varisya</span>
    </a>
  );
}

/* ---------------- Button ---------------- */
function Btn({ variant = "primary", size, children, arrow, onClick, href, className = "", ...rest }) {
  const cls = `btn btn--${variant}${size ? " btn--" + size : ""} ${className}`;
  const inner = <>{children}{arrow && <Icon name="arrow" size={17} sw={1.8} style={{ marginLeft: -2 }} />}</>;
  const arrowWrap = arrow ? <>{children}<span className="arrow" style={{ display: "inline-flex" }}><Icon name="arrow" size={17} sw={1.8} /></span></> : children;
  if (href) return <a href={href} className={cls} onClick={onClick} {...rest}>{arrowWrap}</a>;
  return <button className={cls} onClick={onClick} {...rest}>{arrowWrap}</button>;
}

/* ---------------- Reveal on scroll ---------------- */
function useReveal() {
  // No-op: content is always visible (preview engine freezes CSS animations,
  // so scroll-reveal "from hidden" is unsafe). Kept for call-site stability.
}

Object.assign(window, { Icon, Wordmark, Btn, useReveal, useState, useEffect, useRef });
