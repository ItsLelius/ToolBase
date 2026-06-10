import { useState, useEffect, useRef } from "react";
import { SCRAMBLE, DECRYPT_MS } from "../utils/theme";

export default function useDecrypt(target, seed) {
  const [display, setDisplay] = useState(() => target.replace(/\S/g, SCRAMBLE[0]));
  const raf     = useRef(null);
  const seedRef = useRef(seed);

  useEffect(() => {
    seedRef.current = seed;
    const thisSeed = seed;
    const start    = performance.now();
    const run = (now) => {
      if (seedRef.current !== thisSeed) return;
      const p      = Math.min((now - start) / DECRYPT_MS, 1);
      const locked = Math.floor(p * target.length);
      setDisplay(
        target.split("").map((ch, i) =>
          ch === " " ? "\u00A0"
          : i < locked ? ch
          : SCRAMBLE[Math.floor(Math.random() * SCRAMBLE.length)]
        ).join("")
      );
      if (p < 1) raf.current = requestAnimationFrame(run);
      else setDisplay(target.replace(/ /g, "\u00A0"));
    };
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(run);
    return () => cancelAnimationFrame(raf.current);
  }, [target, seed]);

  return display;
}