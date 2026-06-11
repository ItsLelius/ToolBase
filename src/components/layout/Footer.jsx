import { BORDER } from "../../utils/theme";

export default function Footer() {
  return (
    <footer style={{
      position: "relative", zIndex: 10, textAlign: "center",
      padding: "14px clamp(20px,4vw,48px)",
      borderTop: "1px solid " + BORDER,
      flexShrink: 0,
    }}>
      <p style={{
        fontFamily: "'Press Start 2P', monospace",
        fontSize: "6px",
        color: "rgba(238,236,234,0.25)",
        letterSpacing: "0.06em",
      }}>
        DESIGNED &amp; DEVELOPED BY{" "}
        <a
          href="https://lelius.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "rgba(238,236,234,0.5)", textDecoration: "none" }}
        >
          LELIUS LAWAS
        </a>
      </p>
    </footer>
  );
}