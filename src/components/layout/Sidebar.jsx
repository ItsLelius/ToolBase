import { useState } from "react";
import {
  LayoutGrid, Bot, Music2, Briefcase, Palette, Code2,
  GraduationCap, Type, Shapes, Megaphone, Camera,
  Zap, Share2, Image, Video, PenLine, Layers
} from "lucide-react";
import { BORDER, TEXT_PRIMARY } from "../../utils/theme";

const CATEGORY_ICONS = {
  "AI Tools":               Bot,
  "Audio & Music":          Music2,
  "Business & Finance":     Briefcase,
  "Color & Palettes":       Palette,
  "Design":                 Layers,
  "Development":            Code2,
  "Education & Learning":   GraduationCap,
  "Fonts & Typography":     Type,
  "Icons & Illustrations":  Shapes,
  "Marketing":              Megaphone,
  "Photo & Image":          Camera,
  "Productivity":           Zap,
  "Social Media":           Share2,
  "Stock & Media":          Image,
  "Video & Animation":      Video,
  "Writing & Content":      PenLine,
};

export default function Sidebar({ categories, activeId, onSelect, pal }) {
  return (
    <aside style={{
      width: "260px",
      flexShrink: 0,
      borderRight: "1px solid " + BORDER,
      display: "flex",
      flexDirection: "column",
      overflowY: "auto",
      background: "rgba(13,13,15,0.6)",
    }}>
      {/* Header */}
      <div style={{
        padding: "20px 20px 12px",
        borderBottom: "1px solid " + BORDER,
        flexShrink: 0,
      }}>
        <span style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: "7px",
          color: "rgba(238,236,234,0.3)",
          letterSpacing: "0.14em",
        }}>
          CATEGORIES
        </span>
      </div>

      {/* Items */}
      <nav style={{ padding: "8px 12px", display: "flex", flexDirection: "column", gap: "2px" }}>
        <SidebarItem
          label="All Tools"
          icon={LayoutGrid}
          active={activeId === null}
          onClick={() => onSelect(null)}
          pal={pal}
        />
        {categories.map(cat => (
          <SidebarItem
            key={cat.id}
            label={cat.name}
            icon={CATEGORY_ICONS[cat.name] || Layers}
            active={activeId === cat.id}
            onClick={() => onSelect(cat.id)}
            pal={pal}
          />
        ))}
      </nav>
    </aside>
  );
}

function SidebarItem({ label, icon: Icon, active, onClick, pal }) {
  const [hover, setHover] = useState(false);
  const lit = active || hover;

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: active
          ? `linear-gradient(90deg, ${pal.from}20, ${pal.from}08)`
          : hover ? "rgba(255,255,255,0.04)" : "transparent",
        border: "none",
        borderRadius: "6px",
        borderLeft: `3px solid ${active ? pal.from : "transparent"}`,
        color: active ? pal.from : hover ? "rgba(238,236,234,0.85)" : "rgba(238,236,234,0.45)",
        fontFamily: "Inter, system-ui, sans-serif",
        fontSize: "13px",
        fontWeight: active ? 600 : 400,
        letterSpacing: "0.01em",
        lineHeight: 1,
        padding: "11px 12px",
        textAlign: "left",
        cursor: "pointer",
        transition: "all 0.15s",
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <Icon
        size={15}
        strokeWidth={active ? 2.2 : 1.8}
        style={{
          color: active ? pal.from : hover ? "rgba(238,236,234,0.6)" : "rgba(238,236,234,0.3)",
          flexShrink: 0,
          transition: "color 0.15s",
        }}
      />
      {label}
    </button>
  );
}