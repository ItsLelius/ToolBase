import { useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Hero from "../components/layout/Hero";
import Footer from "../components/layout/Footer";
import useDecrypt from "../hooks/useDecrypt";
import { WORDS, PALETTES, BG, DECRYPT_MS, PAUSE_MS } from "../utils/theme";

export default function LandingPage() {
  const [wi,   setWi]   = useState(0);
  const [seed, setSeed] = useState(1);

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

        <Navbar pal={pal} />
        <Hero pal={pal} grad={grad} display={display} />
        <Footer />

      </div>
    </>
  );
}