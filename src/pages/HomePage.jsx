import { useRef } from "react";
import { ArrowRight, Sparkles, User, SendHorizontal } from "lucide-react";
import Navbar from "../components/Navbar";
import { useDecrypt } from "../hooks/useDecrypt";
import { useChatTyping } from "../hooks/useChatTyping";

const CATEGORIES = [
  { label: "AI & Machine Learning", lit: true },
  { label: "Developer Tools", lit: false },
  { label: "Design", lit: false },
  { label: "Productivity", lit: true },
  { label: "Analytics", lit: false },
  { label: "DevOps & CI/CD", lit: false },
  { label: "Security", lit: true },
  { label: "Databases", lit: false },
  { label: "No-Code / Low-Code", lit: false },
  { label: "APIs & Integrations", lit: true },
  { label: "Testing & QA", lit: false },
  { label: "Cloud Infrastructure", lit: false },
];

const FLOAT_CARDS = [
  { label: "Figma",   sub: "Design · Free",       cls: "fa", top: "10%", left: "0%",  icon: "check"  },
  { label: "VS Code", sub: "Dev · Open source",   cls: "fb", top: "62%", left: "-1%", icon: "code"   },
  { label: "Notion",  sub: "Productivity · Free", cls: "fc", top: "8%",  left: "81%", icon: "table"  },
  { label: "Vercel",  sub: "Deploy · Free plan",  cls: "fd", top: "63%", left: "83%", icon: "layers" },
];

function FloatIcon({ type }) {
  const p = { width: 13, height: 13, fill: "none", stroke: "var(--t1)", strokeWidth: 1.6 };
  if (type === "check")  return <svg {...p} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>;
  if (type === "code")   return <svg {...p} viewBox="0 0 24 24"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>;
  if (type === "table")  return <svg {...p} viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>;
  return <svg {...p} viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>;
}

function SectionLabel({ left, right }) {
  return (
    <div className="section-label-row">
      <span className="section-label">{left}</span>
      <div className="section-rule" />
      {right && <span className="section-label">{right}</span>}
    </div>
  );
}

function CheckItem({ text }) {
  return (
    <div className="check-item">
      <div className="check-box">
        <svg width="9" height="9" viewBox="0 0 12 12" fill="none" stroke="var(--t1)" strokeWidth="2">
          <polyline points="2 6 5 9 10 3" />
        </svg>
      </div>
      <span className="check-text">{text}</span>
    </div>
  );
}

export default function HomePage() {
  const decryptRef = useRef(null);
  const chatInputRef = useRef(null);

  useDecrypt(decryptRef, "in one place.", { delay: 700, loopDelay: 5200 });
  useChatTyping(chatInputRef, { startDelay: 1200 });

  const doubled = [...CATEGORIES, ...CATEGORIES];

  return (
    <div className="page-root">
      <div className="gbg" aria-hidden="true" />
      <div className="hero-warm-lift" aria-hidden="true" />

      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar />

        {/* ── HERO ── */}
        <section className="hero-section">
          <div className="hero-glow" aria-hidden="true" />

          {FLOAT_CARDS.map((c) => (
            <div key={c.label} className={`fcard ${c.cls}`} style={{ top: c.top, left: c.left }}>
              <div className="fcard-icon"><FloatIcon type={c.icon} /></div>
              <div>
                <p className="fcard-title">{c.label}</p>
                <p className="fcard-sub">{c.sub}</p>
              </div>
            </div>
          ))}

          <div className="hero-content">
            <div className="u1">
              <div className="eyebrow">
                <span className="eyebrow-dot" />
                <span className="eyebrow-text">The tool platform for everyone</span>
              </div>
            </div>

            <h1 className="u2 headline">Every tool you need,</h1>
            <h1 className="u2 headline headline-italic">
              <span ref={decryptRef} className="metal">in one place.</span>
            </h1>

            <p className="u3 subtext">
              Curated tools for developers, designers, and creators — organized, verified, free.
              Plus an <strong className="subtext-strong">AI assistant</strong> to find exactly what you need.
            </p>

            <div className="u4 cta-wrap">
              <a href="/tools" className="btn-cta btn-cta-lg">
                Explore the collection
                <ArrowRight size={13} strokeWidth={1.8} />
              </a>
            </div>

            <p className="u5 trust-text">Free · No account · Updated weekly</p>
          </div>
        </section>

        {/* ── MARQUEE ── */}
        <div className="marquee-wrapper">
          <div className="mq">
            {doubled.map((cat, i) => (
              <span key={i} className={`pill${cat.lit ? " pill-lit" : ""}`}>
                {cat.label}
              </span>
            ))}
          </div>
        </div>

        {/* ── STATS — one unified container, horizontal ── */}
        <section className="section-pad">
          <SectionLabel left="Platform" />
          <div className="stats-box">
            <div className="stats-inner">
              <div className="scell">
                <div className="snum-row">
                  <span className="snum">340</span>
                  <span className="splus">+</span>
                </div>
                <p className="slabel">Verified tools</p>
                <p className="sdesc">Hand-picked across 12 categories.<br />No spam, no dead links.</p>
              </div>
              <div className="sdiv" />
              <div className="scell">
                <div className="snum-row">
                  <span className="snum">12</span>
                  <span className="splus">+</span>
                </div>
                <p className="slabel">Categories</p>
                <div className="mini-pills">
                  {["AI & ML", "Design", "DevOps"].map((t) => (
                    <span key={t} className="mini-pill">{t}</span>
                  ))}
                  <span className="mini-pill mini-pill-dim">+9 more</span>
                </div>
              </div>
              <div className="sdiv" />
              <div className="scell">
                <span className="snum" style={{ fontSize: 38, lineHeight: 1.1, display: "block" }}>
                  Always<br />Free
                </span>
                <p className="slabel" style={{ marginBottom: 18 }}>&nbsp;</p>
                <div className="checklist">
                  <CheckItem text="No account required" />
                  <CheckItem text="No paywall, ever" />
                  <CheckItem text="Updated weekly" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── AI CHAT ── */}
        <section className="section-pad" style={{ paddingTop: 0 }}>
          <SectionLabel left="AI Assistant" right="Ask anything about tools" />
          <div className="chat-card">
            <div className="chat-hdr">
              <div className="chat-dots">
                <div className="dot" />
                <div className="dot" />
                <div className="dot" />
                <span className="chat-hdr-label">ToolBase AI</span>
              </div>
              <div className="online-badge">
                <div className="online-dot" />
                <span className="online-text">Online</span>
              </div>
            </div>

            <div className="chat-body">
              <div className="msg">
                <div className="av av-bot"><Sparkles size={13} strokeWidth={1.7} color="var(--t1)" /></div>
                <div className="bub bub-ai">
                  <p>Tell me what you're building or what problem you want to solve — I'll match you with the right tools.</p>
                </div>
              </div>
              <div className="msg msg-r">
                <div className="av av-user"><User size={13} strokeWidth={1.7} color="var(--t1)" /></div>
                <div className="bub bub-user">
                  <p>I need a free tool to design UI mockups as a beginner.</p>
                </div>
              </div>
              <div className="msg">
                <div className="av av-bot"><Sparkles size={13} strokeWidth={1.7} color="var(--t1)" /></div>
                <div className="bub bub-ai">
                  <p><strong className="strong">Figma</strong> — free, browser-based, industry standard. For something simpler: <strong className="strong">Penpot</strong> (open source) or <strong className="strong">Whimsical</strong> for wireframes.</p>
                </div>
              </div>
            </div>

            <div className="chat-foot">
              <input
                ref={chatInputRef}
                className="chat-inp"
                placeholder=""
                readOnly
              />
              <button className="send-btn">
                <SendHorizontal size={14} strokeWidth={1.8} color="var(--t1)" />
              </button>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="footer">
          <p className="footer-text">
            Designed and Developed by{" "}
            <a
              href="https://lelius.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              Lelius Lawas
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}