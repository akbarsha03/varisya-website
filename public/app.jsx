/* global React, ReactDOM, Nav, Hero, Strip, Products, Model, Pricing, CtaBand, Footer, Icon, Btn,
   useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakToggle, TweakColor, TweakSelect, TweakButton, useReveal */
const { useState, useEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "direction": "enterprise",
  "dark": false,
  "accent": "#2C49F0",
  "heroCopy": "adapt",
  "pricingLayout": "table"
}/*EDITMODE-END*/;

const ACCENTS = ["#7A2230", "#2C49F0", "#1F7A57", "#B0542F"];

/* ===================== CONSULTATION MODAL ===================== */
function ConsultModal({ onClose }) {
  const [data, setData] = useState({ name: "", email: "", company: "", size: "", message: "" });
  const [errs, setErrs] = useState({});
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);

  const set = (k) => (e) => { setData((d) => ({ ...d, [k]: e.target.value })); setErrs((x) => ({ ...x, [k]: null })); };

  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (!data.name.trim()) er.name = "Please add your name";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email)) er.email = "Enter a valid email";
    if (!data.company.trim()) er.company = "Please add your company";
    setErrs(er);
    if (Object.keys(er).length === 0) setSent(true);
  };

  return (
    <div className="modal-root" role="dialog" aria-modal="true" aria-label="Book a consultation">
      <div className="modal-scrim" onClick={onClose} />
      <div className="modal">
        <button className="modal__close" onClick={onClose} aria-label="Close"><Icon name="x" size={18} /></button>
        {sent ? (
          <div className="modal__success">
            <span className="ok"><Icon name="check" size={30} sw={2.2} /></span>
            <h3>Request received.</h3>
            <p className="modal__sub">Thanks, {data.name.split(" ")[0] || "there"}. A Varisya engineer will reply to <b>{data.email}</b> within one business day to scope your engagement.</p>
            <div className="modal__foot"><Btn variant="primary" onClick={onClose}>Done</Btn></div>
          </div>
        ) : (
          <>
            <span className="modal__eyebrow">Book a consultation</span>
            <h3>Let's scope your setup.</h3>
            <p className="modal__sub">No checkout, no per-seat pricing. Tell us a little about your operation and we'll map the suite to your workflows.</p>
            <form className="form" onSubmit={submit} noValidate>
              <div className="field row2">
                <div className={`field${errs.name ? " field--err" : ""}`}>
                  <label htmlFor="f-name">Name <span className="req">*</span></label>
                  <input id="f-name" value={data.name} onChange={set("name")} placeholder="Your name" />
                  {errs.name && <span className="field__err">{errs.name}</span>}
                </div>
                <div className={`field${errs.company ? " field--err" : ""}`}>
                  <label htmlFor="f-co">Company <span className="req">*</span></label>
                  <input id="f-co" value={data.company} onChange={set("company")} placeholder="Company name" />
                  {errs.company && <span className="field__err">{errs.company}</span>}
                </div>
              </div>
              <div className={`field${errs.email ? " field--err" : ""}`}>
                <label htmlFor="f-email">Work email <span className="req">*</span></label>
                <input id="f-email" type="email" value={data.email} onChange={set("email")} placeholder="you@company.com" />
                {errs.email && <span className="field__err">{errs.email}</span>}
              </div>
              <div className="field">
                <label htmlFor="f-size">Team / operation size</label>
                <select id="f-size" value={data.size} onChange={set("size")}>
                  <option value="">Select…</option>
                  <option>1–25 people</option>
                  <option>25–100 people</option>
                  <option>100–500 people</option>
                  <option>500+ / multi-entity</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="f-msg">What are you trying to run?</label>
                <textarea id="f-msg" value={data.message} onChange={set("message")} placeholder="e.g. Multi-warehouse inventory tied to GST-compliant books, with a branded storefront." />
              </div>
              <div className="modal__foot">
                <Btn variant="primary" arrow type="submit">Request consultation</Btn>
                <p className="modal__fine">We'll reply within one business day · hello@varisya.com</p>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

/* ===================== TWEAKS ===================== */
function VarisyaTweaks({ t, setTweak }) {
  return (
    <TweaksPanel>
      <TweakSection label="Direction" />
      <TweakRadio label="Aesthetic" value={t.direction}
        options={["ledger", "enterprise", "atelier"]}
        onChange={(v) => setTweak("direction", v)} />
      <TweakToggle label="Dark mode" value={t.dark} onChange={(v) => setTweak("dark", v)} />

      <TweakSection label="Brand accent" />
      <TweakColor label="Accent" value={t.accent} options={ACCENTS}
        onChange={(v) => setTweak("accent", v)} />
      <TweakButton label="Use direction default" secondary onClick={() => setTweak("accent", "auto")} />

      <TweakSection label="Content" />
      <TweakSelect label="Hero headline" value={t.heroCopy}
        options={[
          { value: "partner", label: "Technology partner" },
          { value: "adapt", label: "Adapts to your operation" },
          { value: "finance", label: "Finance-led / owned by you" },
        ]}
        onChange={(v) => setTweak("heroCopy", v)} />
      <TweakRadio label="Pricing layout" value={t.pricingLayout}
        options={["cards", "table"]}
        onChange={(v) => setTweak("pricingLayout", v)} />
    </TweaksPanel>
  );
}

/* ===================== APP ===================== */
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [modal, setModal] = useState(false);
  useReveal();

  useEffect(() => {
    const r = document.documentElement;
    r.setAttribute("data-direction", t.direction);
    r.setAttribute("data-mode", t.dark ? "dark" : "light");
    if (t.accent && t.accent !== "auto") {
      r.style.setProperty("--accent", t.accent);
      r.style.setProperty("--accent-soft", `color-mix(in srgb, ${t.accent} 15%, var(--surface))`);
      r.style.setProperty("--accent-ink", "#ffffff");
    } else {
      r.style.removeProperty("--accent");
      r.style.removeProperty("--accent-soft");
      r.style.removeProperty("--accent-ink");
    }
  }, [t.direction, t.dark, t.accent]);

  const openConsult = () => setModal(true);

  return (
    <>
      <Nav onConsult={openConsult} />
      <Hero copyKey={t.heroCopy} onConsult={openConsult} />
      <Strip />
      <Products />
      <Model />
      <Pricing layout={t.pricingLayout} setLayout={(v) => setTweak("pricingLayout", v)} onConsult={openConsult} />
      <CtaBand onConsult={openConsult} />
      <Footer onConsult={openConsult} />
      {modal && <ConsultModal onClose={() => setModal(false)} />}
      <VarisyaTweaks t={t} setTweak={setTweak} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
