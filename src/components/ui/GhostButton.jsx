import { useState } from "react";
import { BORDER, TEXT_PRIMARY } from "../../utils/theme";

export default function GhostButton({ children, href, icon }) {
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