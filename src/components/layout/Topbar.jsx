import { Search, X, SlidersHorizontal } from "lucide-react";
import { BORDER, TEXT_PRIMARY } from "../../utils/theme";

export default function Topbar({ search, onSearch, count, pal, loading }) {
  return (
    <div style={{
      borderBottom: "1px solid " + BORDER,
      padding: "14px 20px",
      display: "flex",
      alignItems: "center",
      gap: "12px",
      flexShrink: 0,
      background: "rgba(13,13,15,0.5)",
    }}>
      {/* Search */}
      <div style={{
        flex: 1,
        position: "relative",
        display: "flex",
        alignItems: "center",
      }}>
        <Search
          size={14}
          strokeWidth={1.8}
          style={{
            position: "absolute",
            left: "14px",
            color: search ? "rgba(238,236,234,0.5)" : "rgba(238,236,234,0.25)",
            pointerEvents: "none",
            transition: "color 0.15s",
          }}
        />
        <input
          type="text"
          value={search}
          onChange={e => onSearch(e.target.value)}
          placeholder="Search tools..."
          style={{
            width: "100%",
            background: "rgba(255,255,255,0.04)",
            border: `1px solid ${search ? pal.from + "55" : BORDER}`,
            borderRadius: "8px",
            color: TEXT_PRIMARY,
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: "14px",
            fontWeight: 400,
            padding: "10px 40px 10px 40px",
            outline: "none",
            transition: "border-color 0.15s, box-shadow 0.15s",
          }}
          onFocus={e => {
            e.target.style.borderColor = pal.from + "88";
            e.target.style.boxShadow = `0 0 0 3px ${pal.from}14`;
          }}
          onBlur={e => {
            e.target.style.borderColor = search ? pal.from + "55" : BORDER;
            e.target.style.boxShadow = "none";
          }}
        />
        {search && (
          <button
            onClick={() => onSearch("")}
            style={{
              position: "absolute", right: "12px",
              background: "rgba(255,255,255,0.06)",
              border: "none",
              borderRadius: "4px",
              color: "rgba(238,236,234,0.5)",
              cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              width: "20px", height: "20px",
              transition: "all 0.15s",
              padding: 0,
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = TEXT_PRIMARY; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "rgba(238,236,234,0.5)"; }}
          >
            <X size={11} strokeWidth={2.5} />
          </button>
        )}
      </div>

      {/* Count badge */}
      <div style={{
        display: "flex", alignItems: "center", gap: "6px",
        padding: "6px 12px",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid " + BORDER,
        borderRadius: "6px",
        flexShrink: 0,
      }}>
        <span style={{
          fontFamily: "Inter, system-ui, sans-serif",
          fontSize: "12px",
          fontWeight: 600,
          color: loading ? "rgba(238,236,234,0.2)" : TEXT_PRIMARY,
          transition: "color 0.2s",
        }}>
          {loading ? "—" : count}
        </span>
        <span style={{
          fontFamily: "Inter, system-ui, sans-serif",
          fontSize: "11px",
          color: "rgba(238,236,234,0.3)",
          fontWeight: 400,
        }}>
          {count === 1 ? "tool" : "tools"}
        </span>
      </div>
    </div>
  );
}