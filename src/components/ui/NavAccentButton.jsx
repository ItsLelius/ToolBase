import { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function NavAccentButton({ children, href, fromColor }) {
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