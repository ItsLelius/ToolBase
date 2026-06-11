import { useState, useEffect, useRef } from "react";
import { Github, Menu, X, ArrowRight } from "lucide-react";
import GhostButton from "../ui/GhostButton";
import NavAccentButton from "../ui/NavAccentButton";
import { BG, BORDER, TEXT_PRIMARY } from "../../utils/theme";

export default function Navbar({ pal }) {
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [collapsed,  setCollapsed]  = useState(false);

  const navRef  = useRef(null);
  const logoRef = useRef(null);
  const btnsRef = useRef(null);

  // Measure whether buttons fit; collapse to hamburger if not
  useEffect(() => {
    const check = () => {
      if (!navRef.current || !logoRef.current || !btnsRef.current) return;
      const navW  = navRef.current.offsetWidth;
      const logoW = logoRef.current.offsetWidth;
      const btnsW = btnsRef.current.scrollWidth;
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
    <header style={{
      position: "relative", zIndex: 20,
      borderBottom: "1px solid " + BORDER,
      background: "rgba(13,13,15,0.88)",
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
          {/* Fallback logo */}
          <div style={{ display: "none", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: "26px", height: "26px", background: TEXT_PRIMARY,
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
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

        {/* Desktop buttons */}
        <div
          ref={btnsRef}
          style={{
            display: collapsed ? "none" : "flex",
            alignItems: "center", gap: "10px", flexShrink: 0,
          }}
        >
          <GhostButton href="https://github.com" icon={<Github size={11} strokeWidth={2}/>}>
            GITHUB
          </GhostButton>
          <NavAccentButton href="/main" fromColor={pal.from}>
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

      {/* Dropdown — absolute so it overlays, never pushes content */}
      {collapsed && menuOpen && (
        <div style={{
          position: "absolute", top: "60px", left: 0, right: 0,
          zIndex: 30,
          borderTop: "1px solid " + BORDER,
          borderBottom: "1px solid " + BORDER,
          background: "rgba(13,13,15,0.98)",
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
            <ArrowRight size={11} strokeWidth={2} style={{ color: pal.from }}/>
          </a>
        </div>
      )}
    </header>
  );
} 