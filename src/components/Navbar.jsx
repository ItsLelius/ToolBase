import { Github, ArrowRight } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        {/* Logo — replace logo-mark div with <img src="/logo.png" className="logo-img" /> */}
        <a href="/" className="nav-logo">
          <div className="logo-mark">
            <svg width="13" height="13" viewBox="0 0 20 20" fill="none">
              <rect x="2" y="2" width="7" height="7" rx="1.5" fill="#e2e2e6" />
              <rect x="11" y="2" width="7" height="7" rx="1.5" fill="rgba(226,226,230,0.28)" />
              <rect x="2" y="11" width="7" height="7" rx="1.5" fill="rgba(226,226,230,0.28)" />
              <rect x="11" y="11" width="7" height="7" rx="1.5" fill="#e2e2e6" />
            </svg>
          </div>
          <span className="logo-text">ToolBase</span>
        </a>

        <div className="nav-actions">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="btn-ghost">
            <Github size={13} /> GitHub
          </a>
          <a href="/tools" className="btn-cta">
            Browse tools
            <ArrowRight size={12} />
          </a>
        </div>
      </div>
    </nav>
  );
}