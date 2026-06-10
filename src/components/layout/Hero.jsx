import { Sparkles } from "lucide-react";
import ShimmerButton from "../ui/ShimmerButton";
import { BG, BORDER, TEXT_PRIMARY, TEXT_DIM } from "../../utils/theme";

export default function Hero({ pal, grad, display }) {
  return (
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
        <ShimmerButton href="/main" fromColor={pal.from}>
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
  );
}