import { useState } from "react";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { BG, BORDER, TEXT_PRIMARY } from "../../utils/theme";

export default function ToolCard({ tool, fromColor }) {
  const [hover, setHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative",
        background: hover ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.02)",
        borderBottom: "1px solid " + BORDER,
        borderRight: "1px solid " + BORDER,
        padding: "24px",
        transition: "background 0.2s",
        cursor: "default",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        minHeight: "160px",
      }}
    >
      {/* Top accent line on hover */}
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0,
        height: "2px",
        background: `linear-gradient(90deg, ${fromColor}, transparent)`,
        opacity: hover ? 1 : 0,
        transition: "opacity 0.2s",
      }} />

      {/* Category tag */}
      {tool.categories?.name && (
        <span style={{
          alignSelf: "flex-start",
          fontFamily: "Inter, system-ui, sans-serif",
          fontSize: "11px",
          fontWeight: 500,
          color: fromColor,
          background: `${fromColor}15`,
          border: `1px solid ${fromColor}30`,
          borderRadius: "4px",
          padding: "3px 8px",
          letterSpacing: "0.02em",
        }}>
          {tool.categories.name}
        </span>
      )}

      {/* Name */}
      <h3 style={{
        fontFamily: "Inter, system-ui, sans-serif",
        fontSize: "15px",
        fontWeight: 600,
        color: hover ? TEXT_PRIMARY : "rgba(238,236,234,0.9)",
        letterSpacing: "-0.01em",
        lineHeight: 1.3,
        margin: 0,
        transition: "color 0.15s",
      }}>
        {tool.name}
      </h3>

      {/* Description */}
      {tool.description && (
        <p style={{
          fontFamily: "Inter, system-ui, sans-serif",
          fontSize: "13px",
          color: "rgba(238,236,234,0.4)",
          letterSpacing: "0.01em",
          lineHeight: 1.7,
          margin: 0,
          flex: 1,
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}>
          {tool.description}
        </p>
      )}

      {/* Link */}
      {tool.link && (
        <a
          href={tool.link}
          target="_blank"
          rel="noopener noreferrer"
          onClick={e => e.stopPropagation()}
          style={{
            alignSelf: "flex-start",
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: "12px",
            fontWeight: 500,
            color: hover ? fromColor : "rgba(238,236,234,0.3)",
            textDecoration: "none",
            letterSpacing: "0.01em",
            marginTop: "auto",
            paddingTop: "4px",
            transition: "color 0.15s",
            borderTop: `1px solid ${hover ? fromColor + "20" : "transparent"}`,
          }}
        >
          Visit site
          <ArrowUpRight size={12} strokeWidth={2} />
        </a>
      )}
    </div>
  );
}