import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import ToolCard from "../components/ui/ToolCard";
import Chatbot from "../components/ui/Chatbot";
import { getCategories, getTools } from "../services/toolsService";
import { PALETTES, BG, BORDER, TEXT_PRIMARY } from "../utils/theme";

function palForIndex(i) {
  return PALETTES[i % PALETTES.length];
}

// Spinner
function Spinner({ color }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      gap: "20px", padding: "80px 40px",
    }}>
      <div style={{
        width: "28px", height: "28px",
        border: `2px solid ${color}22`,
        borderTop: `2px solid ${color}`,
        borderRadius: "50%",
        animation: "spin 0.7s linear infinite",
      }} />
      <span style={{
        fontFamily: "'Press Start 2P', monospace",
        fontSize: "6px",
        color: "rgba(238,236,234,0.2)",
        letterSpacing: "0.1em",
      }}>LOADING...</span>
    </div>
  );
}

// Empty state
function EmptyState({ search, activeCatId, categories }) {
  const catName = activeCatId
    ? categories.find(c => c.id === activeCatId)?.name
    : null;

  return (
    <div style={{
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "80px 40px", gap: "16px", textAlign: "center",
    }}>
      <div style={{
        fontFamily: "'Press Start 2P', monospace",
        fontSize: "32px",
        marginBottom: "8px",
      }}>🔍</div>
      <span style={{
        fontFamily: "'Press Start 2P', monospace",
        fontSize: "8px",
        color: "rgba(238,236,234,0.4)",
        letterSpacing: "0.06em",
        lineHeight: 2,
      }}>
        {search
          ? `NO RESULTS FOR "${search.toUpperCase()}"`
          : catName
          ? `NO TOOLS IN ${catName.toUpperCase()} YET`
          : "NO TOOLS FOUND"}
      </span>
      <span style={{
        fontFamily: "'Press Start 2P', monospace",
        fontSize: "6px",
        color: "rgba(238,236,234,0.15)",
        letterSpacing: "0.06em",
        lineHeight: 2.4,
      }}>
        {search ? "TRY A DIFFERENT KEYWORD" : "CHECK BACK SOON"}
      </span>
    </div>
  );
}

export default function MainPage() {
  const navigate = useNavigate();

  const [categories,  setCategories]  = useState([]);
  const [tools,       setTools]       = useState([]);
  const [activeCatId, setActiveCatId] = useState(null);
  const [search,      setSearch]      = useState("");
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState(null);

  // Easter egg: triple-click logo → /admin
  const clickCount  = useRef(0);
  const clickTimer  = useRef(null);
  const handleLogoClick = () => {
    clickCount.current += 1;
    clearTimeout(clickTimer.current);
    if (clickCount.current >= 3) {
      clickCount.current = 0;
      navigate("/admin");
    } else {
      clickTimer.current = setTimeout(() => { clickCount.current = 0; }, 600);
    }
  };

  const palIndex = activeCatId
    ? categories.findIndex(c => c.id === activeCatId)
    : 0;
  const pal = palForIndex(palIndex < 0 ? 0 : palIndex);

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(e => setError(e.message));
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getTools({ categoryId: activeCatId, search })
      .then(data => { setTools(data); setLoading(false); })
      .catch(e => { setError(e.message); setLoading(false); });
  }, [activeCatId, search]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Inter:wght@400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { width: 100%; height: 100%; background: ${BG}; overflow: hidden; }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(238,236,234,0.08); border-radius: 2px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(238,236,234,0.18); }

        .tool-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 1px;
          align-content: start;
          background: rgba(238,236,234,0.04);
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .tool-card-enter {
          animation: fadeUp 0.25s ease forwards;
          opacity: 0;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        @keyframes dotBounce {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50%       { transform: translateY(-4px); opacity: 1; }
        }

        @keyframes chatSlide {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 640px) {
          .main-sidebar { display: none !important; }
          .tool-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div style={{
        width: "100vw", height: "100vh",
        background: BG,
        display: "flex", flexDirection: "column",
        overflow: "hidden",
        position: "relative",
      }}>

        {/* Grid bg */}
        <div style={{
          position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }} />

        {/* ── Header ── */}
        <header style={{
          position: "relative", zIndex: 10,
          borderBottom: "1px solid " + BORDER,
          background: "rgba(13,13,15,0.92)",
          backdropFilter: "blur(12px)",
          flexShrink: 0,
          display: "flex", alignItems: "center",
          padding: "0 clamp(16px,3vw,28px)",
          height: "54px",
          gap: "16px",
        }}>
          {/* Logo — triple click = /admin */}
          <button
            onClick={handleLogoClick}
            style={{
              background: "none", border: "none", cursor: "pointer",
              padding: 0, flexShrink: 0,
              display: "flex", alignItems: "center", gap: "8px",
            }}
          >
            <img
              src="/src/assets/logo/toolbase-pagelogo.png"
              alt="Toolbase"
              style={{ height: "28px", width: "auto" }}
              onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "block"; }}
            />
            <span style={{ display: "none", fontFamily: "'Press Start 2P', monospace", fontSize: "9px", color: TEXT_PRIMARY, letterSpacing: "0.06em" }}>
              TOOLBASE
            </span>
          </button>

          <div style={{ flex: 1, height: "1px", background: BORDER }} />

          {/* Active category breadcrumb */}
          <span style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: "6px",
            color: activeCatId ? pal.from : "rgba(238,236,234,0.2)",
            letterSpacing: "0.08em",
            transition: "color 0.3s",
          }}>
            {activeCatId
              ? categories.find(c => c.id === activeCatId)?.name?.toUpperCase()
              : "ALL TOOLS"}
          </span>
        </header>

        {/* ── Body ── */}
        <div style={{
          flex: 1, display: "flex",
          overflow: "hidden",
          position: "relative", zIndex: 1,
        }}>

          {/* Sidebar */}
          <div className="main-sidebar">
            <Sidebar
              categories={categories}
              activeId={activeCatId}
              onSelect={id => { setActiveCatId(id); setSearch(""); }}
              pal={pal}
            />
          </div>

          {/* Content */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

            <Topbar
              search={search}
              onSearch={q => { setSearch(q); setActiveCatId(null); }}
              count={tools.length}
              pal={pal}
              loading={loading}
            />

            <div style={{ flex: 1, overflowY: "auto" }}>

              {error && (
                <div style={{
                  padding: "40px",
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: "7px", color: "#F87171", letterSpacing: "0.06em", lineHeight: 2,
                }}>
                  ⚠ ERROR: {error}
                </div>
              )}

              {!error && loading && <Spinner color={pal.from} />}

              {!error && !loading && tools.length === 0 && (
                <EmptyState search={search} activeCatId={activeCatId} categories={categories} />
              )}

              {!error && !loading && tools.length > 0 && (
                <div className="tool-grid">
                  {tools.map((tool, i) => (
                    <div
                      key={tool.id}
                      className="tool-card-enter"
                      style={{ animationDelay: `${Math.min(i * 30, 300)}ms` }}
                    >
                      <ToolCard
                        tool={tool}
                        fromColor={palForIndex(
                          categories.findIndex(c => c.id === tool.category_id)
                        ).from}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Chatbot */}
        <Chatbot
          categories={categories}
          onFilter={id => { setActiveCatId(id); setSearch(""); }}
          onSearch={q => { setSearch(q); setActiveCatId(null); }}
        />
      </div>
    </>
  );
}