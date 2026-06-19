import { useState } from "react";
import { ArrowUpRight, Star } from "lucide-react";

// Accent color map — pass one of these keys as `tool.accent`
export const ACCENT_STYLES = {
  indigo: {
    glow: "rgba(99,102,241,0.12)",
    border: "rgba(99,102,241,0.25)",
    iconBg: "rgba(99,102,241,0.1)",
    iconColor: "#818cf8",
    tagBg: "rgba(99,102,241,0.15)",
    tagColor: "#a5b4fc",
  },
  violet: {
    glow: "rgba(139,92,246,0.12)",
    border: "rgba(139,92,246,0.25)",
    iconBg: "rgba(139,92,246,0.1)",
    iconColor: "#a78bfa",
    tagBg: "rgba(139,92,246,0.15)",
    tagColor: "#c4b5fd",
  },
  blue: {
    glow: "rgba(59,130,246,0.12)",
    border: "rgba(59,130,246,0.25)",
    iconBg: "rgba(59,130,246,0.1)",
    iconColor: "#60a5fa",
    tagBg: "rgba(59,130,246,0.15)",
    tagColor: "#93c5fd",
  },
  cyan: {
    glow: "rgba(6,182,212,0.12)",
    border: "rgba(6,182,212,0.25)",
    iconBg: "rgba(6,182,212,0.1)",
    iconColor: "#22d3ee",
    tagBg: "rgba(6,182,212,0.15)",
    tagColor: "#67e8f9",
  },
};

export default function ToolCard({ tool }) {
  const [hovered, setHovered] = useState(false);
  const accent = ACCENT_STYLES[tool.accent] || ACCENT_STYLES.indigo;
  const Icon = tool.icon;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        borderRadius: 16,
        border: `1px solid ${hovered ? accent.border : "rgba(255,255,255,0.07)"}`,
        background: hovered ? "rgba(15,15,22,0.92)" : "rgba(12,12,18,0.8)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        padding: "24px",
        cursor: "pointer",
        transition: "all 0.25s cubic-bezier(0.4,0,0.2,1)",
        transform: hovered ? "translateY(-3px) scale(1.005)" : "translateY(0) scale(1)",
        boxShadow: hovered
          ? `0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px ${accent.border}, inset 0 0 30px ${accent.glow}`
          : "0 4px 20px rgba(0,0,0,0.3)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      {/* Inner ambient glow on hover */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 16,
          background: `radial-gradient(circle at 20% 20%, ${accent.glow} 0%, transparent 60%)`,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s",
          pointerEvents: "none",
        }}
      />

      {/* Header row */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: 12,
            background: accent.iconBg,
            border: `1px solid ${accent.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "all 0.25s",
          }}
        >
          {Icon && <Icon size={20} color={accent.iconColor} strokeWidth={1.75} />}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {tool.tag && (
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                padding: "3px 8px",
                borderRadius: 6,
                background: accent.tagBg,
                color: accent.tagColor,
                fontFamily: "'Inter', system-ui, sans-serif",
              }}
            >
              {tool.tag}
            </span>
          )}
          <div
            style={{
              opacity: hovered ? 1 : 0,
              transform: hovered ? "translate(0,0)" : "translate(-4px, 4px)",
              transition: "all 0.2s",
              color: accent.iconColor,
            }}
          >
            <ArrowUpRight size={16} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
        <h3
          style={{
            margin: 0,
            fontFamily: "'Inter', system-ui, sans-serif",
            fontWeight: 600,
            fontSize: 16,
            letterSpacing: "-0.025em",
            color: hovered ? "#f1f5f9" : "#cbd5e1",
            transition: "color 0.2s",
          }}
        >
          {tool.name}
        </h3>
        <p
          style={{
            margin: 0,
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: 13.5,
            lineHeight: 1.65,
            color: "rgba(148,163,184,0.7)",
            letterSpacing: "-0.01em",
          }}
        >
          {tool.description}
        </p>
      </div>

      {/* Footer */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: 12,
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <span
          style={{
            fontSize: 12,
            color: "rgba(100,116,139,0.8)",
            fontFamily: "'Inter', system-ui, sans-serif",
            background: "rgba(255,255,255,0.04)",
            padding: "3px 10px",
            borderRadius: 6,
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {tool.category}
        </span>
        {tool.stars && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              color: "rgba(100,116,139,0.8)",
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: 13,
            }}
          >
            <Star size={13} fill="rgba(250,204,21,0.5)" color="rgba(250,204,21,0.7)" />
            <span>{tool.stars}</span>
          </div>
        )}
      </div>
    </div>
  );
}