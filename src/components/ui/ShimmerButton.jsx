import { useState, useRef } from "react";
import { ArrowRight } from "lucide-react";

export default function ShimmerButton({ children, href, fromColor }) {
  const [hover, setHover] = useState(false);
  const [pos,   setPos]   = useState({ x: 0, y: 0 });
  const ref = useRef(null);

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
      <span style={{ position: "relative", zIndex: 1, color: fromColor }}>
        {children}
      </span>
      <ArrowRight size={12} strokeWidth={2} style={{
        position: "relative", zIndex: 1, flexShrink: 0, color: fromColor,
      }} />
    </a>
  );
}