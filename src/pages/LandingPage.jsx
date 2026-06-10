import { useState, useEffect, useRef } from "react";
import { Github, ArrowRight, Sparkles, Menu, X } from "lucide-react";

const WORDS = [
  "DEVELOPERS","DESIGNERS","ENGINEERS","CREATORS",
  "STUDENTS","FOUNDERS","ARTISTS","WRITERS",
];

const PALETTES = [
  { from: "#818CF8", to: "#60A5FA" },
  { from: "#F472B6", to: "#A78BFA" },
  { from: "#34D399", to: "#60A5FA" },
  { from: "#FB923C", to: "#F472B6" },
  { from: "#FBBF24", to: "#34D399" },
  { from: "#60A5FA", to: "#C084FC" },
  { from: "#F87171", to: "#FB923C" },
  { from: "#A78BFA", to: "#60A5FA" },
];

const BG           = "#0D0D0F";
const TEXT_PRIMARY = "#EEECEA";
const TEXT_DIM     = "rgba(238,236,234,0.32)";
const BORDER       = "rgba(238,236,234,0.08)";
const SCRAMBLE     = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@$%";
const DECRYPT_MS   = 1000;
const PAUSE_MS     = 2800;

function useDecrypt(target, seed) {
  const [display, setDisplay] = useState(() => target.replace(/\S/g, SCRAMBLE[0]));
  const raf     = useRef(null);
  const seedRef = useRef(seed);

  useEffect(() => {
    seedRef.current = seed;
    const thisSeed = seed;
    const start    = performance.now();
    const run = (now) => {
      if (seedRef.current !== thisSeed) return;
      const p      = Math.min((now - start) / DECRYPT_MS, 1);
      const locked = Math.floor(p * target.length);
      setDisplay(
        target.split("").map((ch, i) =>
          ch === " " ? "\u00A0"
          : i < locked ? ch
          : SCRAMBLE[Math.floor(Math.random() * SCRAMBLE.length)]
        ).join("")
      );
      if (p < 1) raf.current = requestAnimationFrame(run);
      else setDisplay(target.replace(/ /g, "\u00A0"));
    };
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(run);
    return () => cancelAnimationFrame(raf.current);
  }, [target, seed]);

  return display;
}

// CTA button — dark bg, accent-colored border + text, retro pixel style
function ShimmerButton({ children, href, fromColor, toColor }) {
  const [hover, setHover] = useState(false);
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  return (
    <a
      href={href}
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current.getBoundingClientRect();
        setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative",
        display: "inline-flex", alignItems: "center", gap: "12px",
        padding: "16px 36px",
        background: hover ? "rgba(255,255,255,0.04)" : "transparent",
        textDecoration: "none",
        fontFamily: "'Press Start 2P', monospace",
        fontSize: "10px",
        letterSpacing: "0.04em", lineHeight: 1,
        cursor: "pointer", overflow: "hidden",
        border: `1.5px solid ${fromColor}`,
        transition: "box-shadow 0.15s, transform 0.1s, background 0.15s",
        boxShadow: hover
          ? `0 0 18px 2px ${fromColor}33, 4px 4px 0 0 ${fromColor}22`
          : `2px 2px 0 0 ${fromColor}18`,
        transform: hover ? "translate(-1px,-1px)" : "none",
        userSelect: "none",
      }}
    >
      <span style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(160px circle at ${pos.x}px ${pos.y}px, ${fromColor}18 0%, transparent 70%)`,
        opacity: hover ? 1 : 0, transition: "opacity 0.2s", pointerEvents: "none",
      }} />
      <span style={{
        position: "relative", zIndex: 1,
        color: fromColor,
      }}>{children}</span>
      <ArrowRight size={12} strokeWidth={2} style={{
        position: "relative", zIndex: 1, flexShrink: 0,
        color: fromColor,
      }} />
    </a>
  );
}

function GhostButton({ children, href, icon }) {
  const [hover, setHover] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "inline-flex", alignItems: "center", gap: "7px",
        padding: "9px 16px",
        background: hover ? "rgba(255,255,255,0.04)" : "transparent",
        border: `1px solid ${hover ? "rgba(255,255,255,0.15)" : BORDER}`,
        color: hover ? TEXT_PRIMARY : "rgba(238,236,234,0.45)",
        textDecoration: "none",
        fontFamily: "'Press Start 2P', monospace",
        fontSize: "7px", letterSpacing: "0.05em", lineHeight: 1,
        cursor: "pointer", transition: "all 0.15s",
        userSelect: "none",
      }}
    >
      {icon}{children}
    </a>
  );
}

// Nav CTA — subtle accent-outlined dark button
function NavAccentButton({ children, href, fromColor, toColor }) {
  const [hover, setHover] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "inline-flex", alignItems: "center", gap: "8px",
        padding: "9px 16px",
        background: hover ? `${fromColor}18` : "transparent",
        border: `1px solid ${hover ? fromColor : "rgba(129,140,248,0.35)"}`,
        textDecoration: "none",
        fontFamily: "'Press Start 2P', monospace",
        fontSize: "7px", letterSpacing: "0.05em", lineHeight: 1,
        cursor: "pointer",
        transition: "all 0.15s",
        userSelect: "none",
      }}
    >
      <span style={{ color: fromColor }}>{children}</span>
      <ArrowRight size={9} strokeWidth={2.5} style={{ color: fromColor }} />
    </a>
  );
}

export default function LandingPage() {
  const [wi,       setWi]       = useState(0);
  const [seed,     setSeed]     = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);
  // true = show hamburger (buttons don't fit), false = show buttons
  const [collapsed, setCollapsed] = useState(false);

  const navRef    = useRef(null);
  const logoRef   = useRef(null);
  const btnsRef   = useRef(null);

  const pal     = PALETTES[wi % PALETTES.length];
  const grad    = `linear-gradient(90deg, ${pal.from}, ${pal.to})`;
  const display = useDecrypt(WORDS[wi], seed);

  useEffect(() => {
    const id = setInterval(() => {
      setWi(i  => (i + 1) % WORDS.length);
      setSeed(s => s + 1);
    }, PAUSE_MS + DECRYPT_MS);
    return () => clearInterval(id);
  }, []);

  // Measure whether buttons fit next to logo; if not, collapse to hamburger
  useEffect(() => {
    const check = () => {
      if (!navRef.current || !logoRef.current || !btnsRef.current) return;
      const navW  = navRef.current.offsetWidth;
      const logoW = logoRef.current.offsetWidth;
      const btnsW = btnsRef.current.scrollWidth;
      // 48px padding each side + 20px gap between logo and buttons
      const needed = logoW + btnsW + 48 * 2 + 20;
      setCollapsed(needed > navW);
    };
    check();
    const ro = new ResizeObserver(check);
    if (navRef.current) ro.observe(navRef.current);
    return () => ro.disconnect();
  }, []);

  // Close dropdown when expanding back
  useEffect(() => {
    if (!collapsed) setMenuOpen(false);
  }, [collapsed]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { width: 100%; height: 100%; background: ${BG}; overflow: hidden; }

        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes menuSlide {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .caret {
          display: inline-block;
          width: 3px;
          margin-left: 6px;
          vertical-align: middle;
          animation: blink 0.85s step-end infinite;
        }

        .grad-word {
          background: var(--g);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-family: 'Press Start 2P', monospace;
          letter-spacing: 0.01em;
          line-height: 1.1;
          white-space: nowrap;
        }

        @media (max-width: 480px) {
          .grad-word {
            font-size: clamp(20px, 7vw, 38px) !important;
            white-space: normal !important;
            text-align: center;
          }
          .hero-line {
            font-size: clamp(9px, 2.6vw, 14px) !important;
          }
          .stat-val {
            font-size: clamp(12px, 4vw, 16px) !important;
          }
          .hero-subcopy {
            font-size: 6px !important;
          }
        }
      `}</style>

      <div style={{
        "--g": grad,
        width: "100vw", height: "100vh", background: BG,
        position: "relative",
        display: "flex", flexDirection: "column",
        overflow: "hidden",
      }}>

        {/* Grid */}
        <div style={{
          position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }} />

        {/* Radial glow */}
        <div style={{
          position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
          background: `radial-gradient(ellipse 80% 60% at 50% 40%, rgba(129,140,248,0.06) 0%, transparent 70%)`,
          transition: "background 0.6s",
        }} />

        {/* Vignette */}
        <div style={{
          position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none",
          background: `
            radial-gradient(ellipse 120% 40% at 50% 0%,   ${BG} 0%, transparent 100%),
            radial-gradient(ellipse 120% 40% at 50% 100%, ${BG} 0%, transparent 100%),
            radial-gradient(ellipse 15% 100% at 0%   50%, ${BG} 0%, transparent 100%),
            radial-gradient(ellipse 15% 100% at 100% 50%, ${BG} 0%, transparent 100%)
          `,
        }} />

        {/* ── Navbar ── */}
        <header style={{
          position: "relative", zIndex: 20,
          borderBottom: "1px solid " + BORDER,
          background: `rgba(13,13,15,0.88)`,
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          flexShrink: 0,
        }}>
          <div
            ref={navRef}
            style={{
              width: "100%", maxWidth: "1200px", margin: "0 auto",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "0 clamp(20px,4vw,48px)",
              height: "60px",
            }}
          >
            {/* Logo */}
            <div ref={logoRef} style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
              <img
                src="/src/assets/logo/toolbase-pagelogo.png"
                alt="Toolbase"
                style={{ height: "32px", width: "auto", display: "block" }}
                onError={(e) => {
                  e.target.style.display = "none";
                  const fb = e.target.nextSibling;
                  if (fb) fb.style.display = "flex";
                }}
              />
              <div style={{ display: "none", alignItems: "center", gap: "10px" }}>
                <div style={{
                  width: "26px", height: "26px",
                  background: TEXT_PRIMARY,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                    <rect x="1" y="1" width="5" height="5" fill={BG} fillOpacity="0.9"/>
                    <rect x="8" y="1" width="5" height="5" fill={BG} fillOpacity="0.3"/>
                    <rect x="1" y="8" width="5" height="5" fill={BG} fillOpacity="0.3"/>
                    <rect x="8" y="8" width="5" height="5" fill={BG} fillOpacity="0.9"/>
                  </svg>
                </div>
                <span style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: "10px", color: TEXT_PRIMARY, letterSpacing: "0.05em",
                }}>TOOLBASE</span>
              </div>
            </div>

            {/* Desktop buttons — hidden when collapsed */}
            <div
              ref={btnsRef}
              style={{
                display: collapsed ? "none" : "flex",
                alignItems: "center", gap: "10px",
                flexShrink: 0,
              }}
            >
              <GhostButton href="https://github.com" icon={<Github size={11} strokeWidth={2}/>}>
                GITHUB
              </GhostButton>
              <NavAccentButton href="/main" fromColor={pal.from} toColor={pal.to}>
                BROWSE TOOLS
              </NavAccentButton>
            </div>

            {/* Hamburger — only when collapsed */}
            {collapsed && (
              <button
                onClick={() => setMenuOpen(o => !o)}
                style={{
                  background: "none",
                  border: `1px solid ${menuOpen ? "rgba(255,255,255,0.2)" : BORDER}`,
                  color: TEXT_PRIMARY, cursor: "pointer",
                  padding: "8px", display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "border-color 0.15s", flexShrink: 0,
                }}
              >
                {menuOpen ? <X size={17} strokeWidth={1.5}/> : <Menu size={17} strokeWidth={1.5}/>}
              </button>
            )}
          </div>

          {/* Dropdown — position absolute so it overlays content, never pushes it */}
          {collapsed && menuOpen && (
            <div style={{
              position: "absolute", top: "60px", left: 0, right: 0,
              zIndex: 30,
              borderTop: "1px solid " + BORDER,
              borderBottom: "1px solid " + BORDER,
              background: `rgba(13,13,15,0.98)`,
              backdropFilter: "blur(16px)",
              animation: "menuSlide 0.18s ease forwards",
              padding: "14px clamp(20px,4vw,48px) 18px",
              display: "flex", flexDirection: "column", gap: "8px",
            }}>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  padding: "12px 14px",
                  border: "1px solid " + BORDER,
                  color: "rgba(238,236,234,0.5)",
                  textDecoration: "none",
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: "8px", letterSpacing: "0.05em",
                }}
              >
                <Github size={12} strokeWidth={1.5}/> GITHUB
              </a>
              <a
                href="/main"
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "12px 14px",
                  border: `1px solid ${pal.from}`,
                  background: `${pal.from}12`,
                  textDecoration: "none",
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: "8px", letterSpacing: "0.05em",
                }}
              >
                <span style={{ color: pal.from }}>BROWSE TOOLS</span>
                <ArrowRight size={11} strokeWidth={2} style={{ color: pal.to }}/>
              </a>
            </div>
          )}
        </header>

        {/* ── Hero ── */}
        <main style={{
          position: "relative", zIndex: 10,
          flex: 1, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          textAlign: "center",
          padding: "0 clamp(20px,5vw,48px)",
          overflow: "hidden",
        }}>
          <div style={{
            width: "100%", maxWidth: "820px",
            display: "flex", flexDirection: "column",
            alignItems: "center",
            gap: "0",
          }}>

            {/* Badge */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "6px 12px",
              border: "1px solid " + BORDER,
              background: "rgba(255,255,255,0.03)",
              marginBottom: "28px",
            }}>
              <Sparkles size={8} style={{ color: pal.from, flexShrink: 0, transition: "color 0.4s" }} />
              <span style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: "6px", color: "rgba(238,236,234,0.3)", letterSpacing: "0.1em",
              }}>
                AI-POWERED TOOL DISCOVERY
              </span>
            </div>

            {/* Headline */}
            <div style={{
              display: "flex", flexDirection: "column",
              gap: "8px",
              marginBottom: "28px",
            }}>
              <span className="hero-line" style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: "clamp(12px,1.5vw,18px)",
                color: TEXT_DIM,
                letterSpacing: "0.06em", lineHeight: 1.4,
              }}>
                EVERY TOOL YOU NEED,
              </span>

              <div style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                minHeight: "clamp(36px,6vh,82px)",
              }}>
                <span
                  className="grad-word"
                  style={{ "--g": grad, fontSize: "clamp(30px,5vw,72px)" }}
                >
                  {display}
                </span>
                <span
                  className="caret"
                  style={{
                    height: "clamp(26px,5vh,60px)",
                    background: pal.from,
                    transition: "background 0.4s",
                  }}
                />
              </div>

              <span className="hero-line" style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: "clamp(12px,1.5vw,18px)",
                color: TEXT_DIM,
                letterSpacing: "0.06em", lineHeight: 1.4,
              }}>
                ONE PLACE TO FIND IT ALL.
              </span>
            </div>

            {/* Divider */}
            <div style={{
              width: "100px", height: "1px",
              background: grad, opacity: 0.25,
              marginBottom: "24px",
              transition: "background 0.4s",
            }} />

            {/* Sub-copy */}
            <p className="hero-subcopy" style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "7px",
              color: "rgba(238,236,234,0.18)",
              letterSpacing: "0.06em", lineHeight: 2.4,
              maxWidth: "440px",
              marginBottom: "32px",
            }}>
              STOP DROWNING IN BOOKMARKS.<br />
              TOOLBASE SURFACES THE EXACT TOOL<br />
              YOU NEED — ACROSS EVERY CATEGORY.
            </p>

            {/* CTA */}
            <ShimmerButton href="/main" fromColor={pal.from} toColor={pal.to}>
              FIND YOUR TOOLS
            </ShimmerButton>

            {/* Stats */}
            <div style={{
              display: "flex", alignItems: "center",
              marginTop: "36px",
              flexWrap: "wrap", justifyContent: "center",
            }}>
              {[["500+","TOOLS"],["20+","CATEGORIES"],["FREE","ALWAYS"]].map(([val, label], i) => (
                <div key={label} style={{
                  display: "flex", flexDirection: "column", alignItems: "center",
                  padding: "0 clamp(20px,3vw,44px)",
                  borderLeft: i === 0 ? "none" : "1px solid " + BORDER,
                }}>
                  <span className="stat-val" style={{
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: "clamp(13px,1.3vw,20px)",
                    color: TEXT_PRIMARY,
                    letterSpacing: "0.03em", lineHeight: 1,
                    marginBottom: "8px",
                  }}>{val}</span>
                  <span style={{
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: "6px",
                    color: "rgba(238,236,234,0.2)",
                    letterSpacing: "0.1em", lineHeight: 1,
                  }}>{label}</span>
                </div>
              ))}
            </div>

          </div>
        </main>

        {/* ── Footer ── */}
        <footer style={{
          position: "relative", zIndex: 10, textAlign: "center",
          padding: "14px clamp(20px,4vw,48px)",
          borderTop: "1px solid " + BORDER,
          flexShrink: 0,
        }}>
          <p style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: "6px",
            color: "rgba(238,236,234,0.25)",
            letterSpacing: "0.06em",
          }}>
            DESIGNED &amp; DEVELOPED BY{" "}
            <a
              href="https://lelius.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "rgba(238,236,234,0.5)", textDecoration: "none" }}
            >
              LELIUS LAWAS
            </a>
          </p>
        </footer>

      </div>
    </>
  );
}