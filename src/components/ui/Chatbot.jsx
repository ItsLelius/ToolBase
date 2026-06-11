import { useState, useRef, useEffect } from "react";
import { X, Send, Bot, User, Sparkles } from "lucide-react";
import { BORDER, BG, TEXT_PRIMARY } from "../../utils/theme";

const SYSTEM_PROMPT = `You are ToolBase Assistant, a helpful AI embedded in ToolBase — a digital directory of software tools, design assets, and development resources for everyone: developers, designers, creators, students, founders, and marketers.

You help users in two ways:
1. Answer questions about ToolBase (what it is, how to use it, what categories exist)
2. Help users find the right tool for their needs

Available categories: AI Tools, Audio & Music, Business & Finance, Color & Palettes, Design, Development, Education & Learning, Fonts & Typography, Icons & Illustrations, Marketing, Photo & Image, Productivity, Social Media, Stock & Media, Video & Animation, Writing & Content.

When a user asks to find a tool or filter by category, respond naturally AND include a JSON action at the end of your message in this exact format on its own line:
ACTION:{"type":"filter","category":"exact category name here"}

For search actions:
ACTION:{"type":"search","query":"search term here"}

Keep responses short, friendly, and clear. No markdown. Max 3 sentences unless listing tools.`;

export default function Chatbot({ categories, onFilter, onSearch }) {
  const [open,      setOpen]     = useState(false);
  const [messages,  setMessages] = useState([
    {
      role: "assistant",
      text: "Hi! I'm your ToolBase assistant. Tell me what you're working on and I'll find the right tools for you.",
    },
  ]);
  const [input,   setInput]   = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const inputRef  = useRef(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 120);
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    const userMsg = { role: "user", text };
    const history = [...messages, userMsg];
    setMessages(history);
    setLoading(true);

    try {
      const apiMessages = history.map(m => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: m.text,
      }));

      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: apiMessages,
        }),
      });

      const data = await res.json();
      const raw  = data.content?.map(b => b.text || "").join("") || "Sorry, I couldn't respond.";
      const actionMatch = raw.match(/ACTION:(\{.*\})/);
      const displayText = raw.replace(/ACTION:\{.*\}/, "").trim();

      if (actionMatch) {
        try {
          const action = JSON.parse(actionMatch[1]);
          if (action.type === "filter") {
            const cat = categories.find(
              c => c.name.toLowerCase() === action.category.toLowerCase()
            );
            if (cat) onFilter(cat.id);
          } else if (action.type === "search") {
            onSearch(action.query);
          }
        } catch (_) {}
      }

      setMessages(prev => [...prev, { role: "assistant", text: displayText }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", text: "Something went wrong. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  const onKey = e => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  };

  return (
    <>
      {/* Panel */}
      {open && (
        <div style={{
          position: "fixed",
          bottom: "84px", right: "24px",
          width: "clamp(320px, 92vw, 400px)",
          height: "520px",
          background: "#111114",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "16px",
          display: "flex", flexDirection: "column",
          zIndex: 100,
          boxShadow: "0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)",
          animation: "chatSlide 0.22s cubic-bezier(0.34,1.56,0.64,1) forwards",
          overflow: "hidden",
        }}>

          {/* Header */}
          <div style={{
            padding: "16px 18px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            flexShrink: 0,
            background: "rgba(255,255,255,0.02)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{
                width: "32px", height: "32px",
                background: "linear-gradient(135deg, #6366F1, #60A5FA)",
                borderRadius: "8px",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <Bot size={16} strokeWidth={2} style={{ color: "#fff" }} />
              </div>
              <div>
                <div style={{
                  fontFamily: "Inter, system-ui, sans-serif",
                  fontSize: "14px", fontWeight: 600,
                  color: TEXT_PRIMARY, letterSpacing: "-0.01em",
                }}>ToolBase AI</div>
                <div style={{
                  fontFamily: "Inter, system-ui, sans-serif",
                  fontSize: "11px", color: "rgba(238,236,234,0.35)",
                  display: "flex", alignItems: "center", gap: "5px",
                  marginTop: "1px",
                }}>
                  <span style={{
                    width: "6px", height: "6px",
                    background: "#34D399",
                    borderRadius: "50%",
                    display: "inline-block",
                  }}/>
                  Online
                </div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} style={{
              background: "rgba(255,255,255,0.06)",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              color: "rgba(238,236,234,0.4)",
              display: "flex", padding: "6px",
              transition: "all 0.15s",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = TEXT_PRIMARY; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "rgba(238,236,234,0.4)"; }}
            >
              <X size={15} strokeWidth={2} />
            </button>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1, overflowY: "auto",
            padding: "16px",
            display: "flex", flexDirection: "column", gap: "16px",
          }}>
            {messages.map((m, i) => (
              <div key={i} style={{
                display: "flex",
                flexDirection: m.role === "user" ? "row-reverse" : "row",
                alignItems: "flex-end", gap: "8px",
              }}>
                {m.role === "assistant" && (
                  <div style={{
                    width: "28px", height: "28px", flexShrink: 0,
                    background: "linear-gradient(135deg, #6366F1, #60A5FA)",
                    borderRadius: "8px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Bot size={13} strokeWidth={2} style={{ color: "#fff" }} />
                  </div>
                )}
                <div style={{
                  maxWidth: "78%",
                  background: m.role === "user"
                    ? "linear-gradient(135deg, #6366F1, #60A5FA)"
                    : "rgba(255,255,255,0.05)",
                  border: m.role === "user" ? "none" : "1px solid rgba(255,255,255,0.07)",
                  borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "4px 16px 16px 16px",
                  padding: "10px 14px",
                  fontFamily: "Inter, system-ui, sans-serif",
                  fontSize: "13px",
                  fontWeight: 400,
                  color: m.role === "user" ? "#fff" : "rgba(238,236,234,0.85)",
                  letterSpacing: "0.01em",
                  lineHeight: 1.6,
                }}>
                  {m.text}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div style={{ display: "flex", alignItems: "flex-end", gap: "8px" }}>
                <div style={{
                  width: "28px", height: "28px", flexShrink: 0,
                  background: "linear-gradient(135deg, #6366F1, #60A5FA)",
                  borderRadius: "8px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Bot size={13} strokeWidth={2} style={{ color: "#fff" }} />
                </div>
                <div style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "4px 16px 16px 16px",
                  padding: "12px 16px",
                  display: "flex", gap: "5px", alignItems: "center",
                }}>
                  {[0, 1, 2].map(i => (
                    <span key={i} style={{
                      width: "5px", height: "5px",
                      background: "rgba(238,236,234,0.3)",
                      borderRadius: "50%",
                      display: "inline-block",
                      animation: `dotBounce 1.2s ease-in-out ${i * 0.2}s infinite`,
                    }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{
            padding: "12px 16px",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            display: "flex", gap: "10px", alignItems: "center",
            flexShrink: 0,
            background: "rgba(255,255,255,0.01)",
          }}>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={onKey}
              placeholder="Ask anything..."
              style={{
                flex: 1,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "10px",
                color: TEXT_PRIMARY,
                fontFamily: "Inter, system-ui, sans-serif",
                fontSize: "13px",
                padding: "10px 14px",
                outline: "none",
                transition: "border-color 0.15s, box-shadow 0.15s",
              }}
              onFocus={e => {
                e.target.style.borderColor = "rgba(99,102,241,0.6)";
                e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.12)";
              }}
              onBlur={e => {
                e.target.style.borderColor = "rgba(255,255,255,0.08)";
                e.target.style.boxShadow = "none";
              }}
            />
            <button
              onClick={send}
              disabled={!input.trim() || loading}
              style={{
                width: "38px", height: "38px",
                background: input.trim() && !loading
                  ? "linear-gradient(135deg, #6366F1, #60A5FA)"
                  : "rgba(255,255,255,0.05)",
                border: "none",
                borderRadius: "10px",
                color: input.trim() && !loading ? "#fff" : "rgba(238,236,234,0.2)",
                cursor: input.trim() && !loading ? "pointer" : "not-allowed",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
                transition: "all 0.15s",
              }}
            >
              <Send size={14} strokeWidth={2} />
            </button>
          </div>
        </div>
      )}

      {/* FAB — gradient blue with icon + label */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          position: "fixed",
          bottom: "24px", right: "24px",
          height: "48px",
          padding: "0 18px",
          background: open
            ? "rgba(99,102,241,0.15)"
            : "linear-gradient(135deg, #6366F1, #60A5FA)",
          border: open ? "1px solid #6366F1" : "none",
          borderRadius: "24px",
          cursor: "pointer",
          display: "flex", alignItems: "center", gap: "8px",
          zIndex: 100,
          transition: "all 0.2s",
          boxShadow: open ? "none" : "0 4px 24px rgba(99,102,241,0.45)",
        }}
        onMouseEnter={e => { if (!open) e.currentTarget.style.boxShadow = "0 4px 32px rgba(99,102,241,0.65)"; }}
        onMouseLeave={e => { if (!open) e.currentTarget.style.boxShadow = "0 4px 24px rgba(99,102,241,0.45)"; }}
      >
        {open
          ? <X size={16} strokeWidth={2} style={{ color: "#6366F1" }} />
          : <>
              <Bot size={16} strokeWidth={2} style={{ color: "#fff" }} />
              <span style={{
                fontFamily: "Inter, system-ui, sans-serif",
                fontSize: "13px",
                fontWeight: 600,
                color: "#fff",
                letterSpacing: "0.01em",
                whiteSpace: "nowrap",
              }}>
                ToolBase AI
              </span>
            </>
        }
      </button>
    </>
  );
}