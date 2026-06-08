/* global React, Icon, Btn, Wordmark */
// VARISYA — content + page sections. Exports section components to window.

/* ===================== CONTENT ===================== */
const PRODUCTS = [
  { n: "01", icon: "book",    name: "Books",      desc: "Accounting, GST, TDS, ledgers and financial statements — the system of record finance actually trusts.", tags: ["GST", "TDS", "Ledgers", "P&L"] },
  { n: "02", icon: "box",     name: "Inventory",  desc: "Stock, warehouses, batches and stock movement, reconciled against the same books in real time.", tags: ["Warehouses", "Batches", "Movement"] },
  { n: "03", icon: "receipt", name: "Billing",    desc: "Invoicing, pricing rules and collections — built around how your business actually quotes and bills.", tags: ["Invoicing", "Pricing rules", "Collections"] },
  { n: "04", icon: "store",   name: "Storefront", desc: "A commerce front wired to the same data as the rest of the suite — one source of truth, no sync.", tags: ["Commerce", "Unified data"] },
];

const HERO_COPY = {
  partner: {
    eyebrow: "Premium technology partner",
    head: ['Your business software, ', { em: "shaped to you" }, ' — and run on your own infrastructure.'],
    lede: "Varisya takes four proven products — Books, Inventory, Billing and Storefront — and customizes them to your exact workflows. Self-hosted, white-label, with dedicated engineering and SLA-grade support every month.",
  },
  adapt: {
    eyebrow: "Self-hosted · White-label · Unlimited users",
    head: ['Software that ', { em: "adapts to your operation" }, ', not the other way around.'],
    lede: "A monthly retainer that bundles ongoing customization with premium technical support. You own your data and your infrastructure; we own the engineering.",
  },
  finance: {
    eyebrow: "Built for finance-led operations",
    head: ['Books, Inventory, Billing & Storefront — ', { em: "customized, and owned by you." }],
    lede: "Dedicated engineering capacity every month keeps the system continuously shaped to your business. Deployed on your infrastructure, under your brand, priced as a retainer — never per seat.",
  },
};

const INCLUDED = [
  ["Engineering ", "tailored to your workflows", ", every month"],
  ["You own your ", "data & infrastructure", ""],
  ["White-label — ", "your brand", " throughout"],
  ["Onboarding & ", "data migration", ""],
  ["Version ", "upgrades & maintenance", ""],
  ["", "Unlimited users", " — never priced per seat"],
];
const BILLED = [
  ["Hosting & infrastructure", "on your accounts"],
  ["SMS gateways", "at cost"],
  ["WhatsApp Business API", "at cost"],
  ["Payment-gateway fees", "at cost"],
  ["Any third-party API usage", "at cost"],
];

const TIERS = [
  {
    name: "Essential", reco: false, from: "from", amt: "₹39,000", per: "/ month",
    best: "Tailored apps on your own setup",
    feats: [
      ["Up to ", "2 of the 4", " products"],
      ["~2 dev-days / month, ", "pooled engineer", ""],
      ["", "Next-business-day", " email support"],
      ["Self-hosted, ", "guided setup", ""],
      ["", "Unlimited users", ""],
    ],
  },
  {
    name: "Professional", reco: true, from: "", amt: "₹79,000", per: "/ month",
    best: "Active tailoring with fast, dedicated support",
    feats: [
      ["", "All 4 products", ""],
      ["Dedicated engineer, ", "~6–8 dev-days / month", ""],
      ["", "Monthly roadmap", ""],
      ["Same-day priority — ", "phone, WhatsApp, email", ""],
      ["Self-hosted + staging + ", "managed upgrades", ""],
      ["", "Unlimited users", ""],
    ],
  },
  {
    name: "Enterprise", reco: false, from: "Custom — from", amt: "₹1,49,000", per: "/ month",
    best: "Multi-entity / high-complexity operations",
    feats: [
      ["All 4 + ", "custom modules", ""],
      ["Dedicated pod, ", "SLA-bound delivery", ""],
      ["", "24×7 support", ", hours-level SLA, account manager"],
      ["HA / multi-site, ", "SSO, audit logs", ""],
      ["", "On-site option", ""],
    ],
  },
];

const COMPARE_ROWS = [
  { ax: "Best for", sub: "fit",
    cells: ["Tailored apps on your own setup", "Active tailoring with fast, dedicated support", "Multi-entity / high-complexity ops"] },
  { ax: "Products", sub: "scope",
    cells: [["Up to ", "2 of the 4"], ["", "All 4"], ["", "All 4 + custom modules"]] },
  { ax: "Customization capacity", sub: "dev-days / mo",
    cells: [["~2 dev-days, ", "pooled engineer"], ["Dedicated engineer, ", "~6–8 dev-days"], ["", "Dedicated pod, SLA-bound"]] },
  { ax: "Support SLA", sub: "response",
    cells: [["", "Next-business-day"], ["Same-day priority — ", "phone, WhatsApp, email"], ["", "24×7, hours-level"]] },
  { ax: "Deployment", sub: "infrastructure",
    cells: [["Self-hosted, ", "guided setup"], ["+ staging + ", "managed upgrades"], ["HA / multi-site, ", "SSO, audit logs"]] },
];

const PNOTES = [
  ["refresh", "A monthly retainer, not a per-seat licence — users are always unlimited."],
  ["tag", "Prices are starting / indicative; the final figure is scoped per client."],
  ["server", "Hosting & all third-party usage billed at cost — no markup."],
  ["route", "Sales is consultative — every plan routes to Book a consultation."],
];

/* ===================== NAV ===================== */
function Nav({ onConsult }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const onScroll = () => ref.current && ref.current.classList.toggle("is-stuck", window.scrollY > 8);
    window.addEventListener("scroll", onScroll); onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav className="nav" ref={ref}>
      <div className="nav__inner">
        <Wordmark />
        <div className="nav__links">
          <a className="nav__link" href="#products">Products</a>
          <a className="nav__link" href="#model">How it works</a>
          <a className="nav__link" href="#pricing">Pricing</a>
          <a className="nav__link" href="#faq">FAQ</a>
          <a className="nav__link" href="#contact">Contact</a>
        </div>
        <div className="nav__right">
          <Btn variant="ghost" size="sm" onClick={onConsult}>Book a consultation</Btn>
        </div>
      </div>
    </nav>
  );
}

/* ===================== HERO ===================== */
function renderHead(parts) {
  return parts.map((p, i) => typeof p === "string" ? <React.Fragment key={i}>{p}</React.Fragment> : <em key={i}>{p.em}</em>);
}
function Hero({ copyKey, onConsult }) {
  const c = HERO_COPY[copyKey] || HERO_COPY.partner;
  return (
    <header className="section hero" id="top">
      <div className="wrap hero__grid">
        <div>
          <span className="eyebrow">{c.eyebrow}</span>
          <h1 className="display" style={{ marginTop: 22 }}>{renderHead(c.head)}</h1>
          <p className="lede" style={{ marginTop: 24 }}>{c.lede}</p>
          <div className="hero__cta">
            <Btn variant="primary" size="lg" arrow onClick={onConsult}>Book a consultation</Btn>
            <Btn variant="ghost" size="lg" href="#pricing">See pricing</Btn>
          </div>
          <div className="hero__tags">
            {["Self-hosted", "White-label", "Unlimited users", "Onboarding & migration included"].map((t) => (
              <span className="tag" key={t}>{t}</span>
            ))}
          </div>
        </div>
        <div className="hero__visual">
          <SuiteWindow />
          <div className="float-badge">
            <span className="dot" />
            <div>
              <b style={{ display: "block" }}>Same-day support</b>
              <span>Dedicated engineer online</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
function SuiteWindow() {
  const lines = [
    ["book", "Books · GST filed", "Q1 ✓"],
    ["box", "Inventory · 3 warehouses", "1,204 SKU"],
    ["receipt", "Billing · collections", "₹4.6L"],
    ["store", "Storefront · orders", "318"],
  ];
  return (
    <div className="window">
      <div className="window__bar">
        <span className="window__dot" /><span className="window__dot" /><span className="window__dot" />
        <span className="window__title">varisya · unified suite</span>
      </div>
      <div className="window__body">
        <div className="statrow">
          <div className="stat"><div className="stat__k">Receivables</div><div className="stat__v">₹12.4L</div></div>
          <div className="stat"><div className="stat__k">Stock value</div><div className="stat__v">₹8.1L</div></div>
          <div className="stat"><div className="stat__k">This month</div><div className="stat__v">₹4.6L <small>+18%</small></div></div>
        </div>
        <div className="ledger-lines">
          {lines.map(([ic, label, amt]) => (
            <div className="ledger-line" key={label}>
              <span className="ll-label">
                <span className="ll-chip"><Icon name={ic} size={13} sw={1.7} /></span>{label}
              </span>
              <span className="ll-amt">{amt}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ===================== TRUST STRIP ===================== */
function Strip() {
  const items = [
    ["lock", "Your data, your servers"],
    ["users", "Unlimited users"],
    ["refresh", "Upgrades included"],
    ["globe", "White-label throughout"],
  ];
  return (
    <div className="strip">
      <div className="strip__inner">
        <span className="strip__label">The model, in four lines</span>
        <div className="strip__items">
          {items.map(([ic, t]) => (
            <span className="strip__item" key={t}><Icon name={ic} size={17} sw={1.7} />{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ===================== PRODUCTS ===================== */
function Products() {
  return (
    <section className="section" id="products">
      <div className="wrap">
        <div className="shead reveal">
          <span className="eyebrow">The suite</span>
          <h2 className="h2">Four proven products. One source of truth.</h2>
          <p className="lede">Each one is customized to how you actually work — and they share the same data, so finance, stock and commerce never drift apart.</p>
        </div>
        <div className="products">
          {PRODUCTS.map((p) => (
            <article className="pcard reveal" key={p.name}>
              <div className="pcard__top">
                <span className="pcard__icon"><Icon name={p.icon} size={23} sw={1.6} /></span>
                <span className="pcard__num">{p.n}</span>
              </div>
              <h3 className="pcard__name">{p.name}</h3>
              <p className="pcard__desc">{p.desc}</p>
              <div className="pcard__tags">
                {p.tags.map((t) => <span className="minitag" key={t}>{t}</span>)}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===================== MODEL ===================== */
function Model() {
  return (
    <section className="section" id="model" style={{ background: "var(--surface-2)" }}>
      <div className="wrap">
        <div className="shead reveal">
          <span className="eyebrow">How the retainer works</span>
          <h2 className="h2">One monthly fee. Engineering and support that never stop.</h2>
          <p className="lede">Varisya is the technology provider — not the host. You own the data and the infrastructure; we own the engineering that keeps shaping it to your business.</p>
        </div>

        <div className="split">
          <div className="feat reveal">
            <span className="feat__icon"><Icon name="sliders" size={22} /></span>
            <h3 className="feat__title">Ongoing customization</h3>
            <p className="feat__body">Dedicated engineering capacity every month. New modules, integrations and logic — the system is continuously shaped to your business, not frozen as a fixed feature set.</p>
          </div>
          <div className="feat reveal">
            <span className="feat__icon"><Icon name="headset" size={22} /></span>
            <h3 className="feat__title">Premium technical support</h3>
            <p className="feat__body">SLA-grade support with a dedicated engineer or pod. Same-day priority where it matters, so the people who run your operation are never left waiting.</p>
          </div>
        </div>

        <div className="incl">
          <div className="incl__panel reveal">
            <div className="incl__h"><Icon name="check" size={15} sw={2} /> Every engagement includes</div>
            <div className="incl__list">
              {INCLUDED.map((row, i) => (
                <div className="incl__item" key={i}>
                  <span className="tick"><Icon name="check" size={12} sw={2.2} /></span>
                  <span>{row[0]}<b>{row[1]}</b>{row[2]}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="incl__panel incl__panel--alt reveal">
            <div className="incl__h"><Icon name="dot" size={15} sw={2} /> Billed at cost, on your own accounts</div>
            <div className="incl__list">
              {BILLED.map(([label, note]) => (
                <div className="incl__item" key={label}>
                  <span className="cost"><Icon name="dot" size={11} sw={2.2} /></span>
                  <span><b>{label}</b> &nbsp;<span className="faint" style={{ fontFamily: "var(--font-mono)", fontSize: 12 }}>{note}</span></span>
                </div>
              ))}
              <p className="faint" style={{ fontSize: 12.5, marginTop: 4, lineHeight: 1.5 }}>Passed through with no markup — you keep the vendor relationships and the control.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===================== PRICING ===================== */
function Pricing({ layout, setLayout, onConsult }) {
  return (
    <section className="section" id="pricing">
      <div className="wrap">
        <div className="pricing__head reveal">
          <div className="shead" style={{ maxWidth: 560 }}>
            <span className="eyebrow">Pricing</span>
            <h2 className="h2">Three tiers, scoped to you.</h2>
            <p className="lede">The axis is support SLA and monthly customization capacity. Prices are in ₹ INR, exclude GST, and are indicative — every engagement is scoped on a call.</p>
          </div>
          <div className="layout-toggle" role="tablist" aria-label="Pricing layout">
            <button className={layout === "cards" ? "is-active" : ""} onClick={() => setLayout("cards")} role="tab" aria-selected={layout === "cards"}>Cards</button>
            <button className={layout === "table" ? "is-active" : ""} onClick={() => setLayout("table")} role="tab" aria-selected={layout === "table"}>Compare</button>
          </div>
        </div>

        {layout === "cards" ? <TierCards onConsult={onConsult} /> : <CompareTable onConsult={onConsult} />}

        <div className="pricing__notes reveal">
          {PNOTES.map(([ic, t]) => (
            <div className="pnote" key={t}><Icon name={ic} size={16} sw={1.7} /><span>{t}</span></div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TierCards({ onConsult }) {
  return (
    <div className="tiers">
      {TIERS.map((t) => (
        <article className={`tier${t.reco ? " tier--reco" : ""} reveal`} key={t.name}>
          {t.reco && <span className="tier__badge">Recommended</span>}
          <h3 className="tier__name">{t.name}</h3>
          <p className="tier__for">{t.best}</p>
          <div className="tier__from">{t.from}</div>
          <div className="tier__price">
            <span className="tier__amt">{t.amt}</span>
            <span className="tier__per">{t.per}</span>
          </div>
          <div className="tier__cta">
            <Btn variant={t.reco ? "primary" : "ghost"} onClick={onConsult}>Book a consultation</Btn>
          </div>
          <div className="tier__feats">
            {t.feats.map((f, i) => (
              <div className="tier__feat" key={i}>
                <span className="tick"><Icon name="check" size={11} sw={2.4} /></span>
                <span>{f[0]}<b>{f[1]}</b>{f[2]}</span>
              </div>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}

function cellContent(cell) {
  if (Array.isArray(cell)) return <span>{cell[0]}<b>{cell[1]}</b></span>;
  return <span>{cell}</span>;
}
function CompareTable({ onConsult }) {
  return (
    <div className="compare reveal">
      <div className="compare__scroll">
        <table className="ctable">
          <thead>
            <tr>
              <th className="c-axis"><span className="c-axis-label">Plan</span></th>
              {TIERS.map((t) => (
                <th key={t.name} className={t.reco ? "c-reco-col" : ""}>
                  <div className="c-tier">{t.name}</div>
                  <div className="c-price">{t.from && <span className="c-per">{t.from} </span>}{t.amt} <span className="c-per">{t.per}</span></div>
                  {t.reco && <span className="c-badge">Recommended</span>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COMPARE_ROWS.map((row) => (
              <tr key={row.ax}>
                <td><div className="c-axis-label">{row.ax}</div><div className="c-axis-sub">{row.sub}</div></td>
                {row.cells.map((cell, i) => (
                  <td key={i} className={TIERS[i].reco ? "c-reco-col" : ""}>{cellContent(cell)}</td>
                ))}
              </tr>
            ))}
            <tr>
              <td><div className="c-axis-label">Users</div><div className="c-axis-sub">seats</div></td>
              {TIERS.map((t) => <td key={t.name} className={t.reco ? "c-reco-col" : ""}><b>Unlimited</b></td>)}
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td></td>
              {TIERS.map((t) => (
                <td key={t.name} className={t.reco ? "c-reco-col" : ""}>
                  <Btn variant={t.reco ? "primary" : "ghost"} size="sm" onClick={onConsult}>Book a consultation</Btn>
                </td>
              ))}
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

/* ===================== CTA BAND + FOOTER ===================== */
function CtaBand({ onConsult }) {
  return (
    <section className="section section--tight" id="contact">
      <div className="wrap ctaband">
        <div className="ctaband__inner">
          <span className="glow" aria-hidden="true" />
          <div>
            <h2>Let's scope your engagement.</h2>
            <p>Tell us how your operation runs today. We'll map the four products to your workflows and propose a tier — no online checkout, no per-seat surprises.</p>
          </div>
          <div className="ctaband__actions">
            <Btn variant="on-dark" size="lg" arrow onClick={onConsult}>Book a consultation</Btn>
            <div className="ctaband__email">or email <a href="mailto:hello@varisya.com">hello@varisya.com</a></div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===================== FAQ ===================== */
const FAQS = [
  {
    q: "What is Varisya?",
    a: "Varisya is a premium technology partner that customizes four products — Books, Inventory, Billing and Storefront — to your exact workflows. It is deployed on your own infrastructure, white-labelled under your brand, and delivered as a monthly retainer that bundles dedicated engineering with SLA-grade support.",
  },
  {
    q: "Is Varisya self-hosted or SaaS?",
    a: "Self-hosted. The suite runs on your own infrastructure and you own your data — there is no per-seat SaaS licence. Everything is white-label, so it ships under your brand, not ours.",
  },
  {
    q: "How is Varisya priced?",
    a: "As a monthly retainer, never per seat — users are always unlimited. Plans start at ₹39,000/month (Essential), ₹79,000/month (Professional), and custom from ₹1,49,000/month (Enterprise). Hosting and any third-party usage are billed at cost with no markup, and the final figure is scoped per client.",
  },
  {
    q: "Which products are included?",
    a: "Books (accounting, GST, TDS and ledgers), Inventory (stock, warehouses and batches), Billing (invoicing, pricing rules and collections), and Storefront (a commerce front wired to the same data). They share one source of truth, so finance, stock and commerce never drift apart.",
  },
  {
    q: "What support and SLA do I get?",
    a: "Support is tiered: next-business-day email on Essential; same-day priority over phone, WhatsApp and email on Professional; and 24×7 cover with an hours-level SLA and a dedicated account manager on Enterprise.",
  },
  {
    q: "How is Varisya different from off-the-shelf software?",
    a: "Off-the-shelf tools force your operation to fit the software. Varisya does the opposite — a dedicated engineer or pod continuously tailors the suite to your workflows every month, self-hosted under your brand. It is the premium, customization-led counterpart to 399apps.",
  },
];

function FAQ() {
  return (
    <section className="section" id="faq">
      <div className="wrap">
        <div className="shead reveal">
          <span className="eyebrow">FAQ</span>
          <h2 className="h2">Questions, answered.</h2>
          <p className="lede">The essentials on what Varisya is, how it is deployed, and how pricing works.</p>
        </div>
        <div className="faq reveal">
          {FAQS.map((f, i) => (
            <details className="faq__item" key={i} open={i === 0}>
              <summary className="faq__q">
                <span>{f.q}</span>
                <span className="faq__chev" aria-hidden="true"><Icon name="arrow" size={18} sw={1.8} /></span>
              </summary>
              <div className="faq__a"><p>{f.a}</p></div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer({ onConsult }) {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__grid">
          <div>
            <Wordmark />
            <p className="footer__about">A premium technology partner. We customize Books, Inventory, Billing and Storefront to your workflows — deployed on your own infrastructure, under your brand.</p>
          </div>
          <div className="footer__col">
            <h4>Products</h4>
            <ul>
              <li><a href="#products">Books</a></li>
              <li><a href="#products">Inventory</a></li>
              <li><a href="#products">Billing</a></li>
              <li><a href="#products">Storefront</a></li>
            </ul>
          </div>
          <div className="footer__col">
            <h4>Company</h4>
            <ul>
              <li><a href="#model">How it works</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onConsult(); }}>Book a consultation</a></li>
            </ul>
          </div>
          <div className="footer__col">
            <h4>Contact</h4>
            <ul>
              <li><a href="mailto:hello@varisya.com">hello@varisya.com</a></li>
              <li><span className="faint" style={{ fontSize: 14 }}>₹ INR · GST extra</span></li>
            </ul>
          </div>
        </div>
        <div className="footer__bottom">
          <span>© 2026 Varisya. Self-hosted, white-label, unlimited users.</span>
          <span>Prices indicative · scoped per client</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Nav, Hero, Strip, Products, Model, Pricing, FAQ, CtaBand, Footer });
