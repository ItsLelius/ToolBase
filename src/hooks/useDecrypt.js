import { useEffect, useRef } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$#@&";

export function useDecrypt(ref, target, { delay = 700, loopDelay = 5200 } = {}) {
  const raf = useRef(null);
  const timer = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    function run() {
      const el = ref.current;
      if (!el) return;
      el.innerHTML = "";

      const METAL_STYLE =
        "display:inline-block;background:linear-gradient(160deg,#fff 0%,#d0d0d8 18%,#a0a0aa 34%,#e8e8f0 50%,#888892 66%,#c8c8d4 80%,#f0f0f8 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text";

      const spans = target.split("").map(() => {
        const s = document.createElement("span");
        s.style.cssText = METAL_STYLE;
        s.textContent = CHARS[Math.floor(Math.random() * CHARS.length)];
        el.appendChild(s);
        return s;
      });

      const revealed = new Array(target.length).fill(false);
      let frame = 0;
      const total = target.length * 8;

      function tick() {
        frame++;
        const p = frame / total;
        spans.forEach((s, i) => {
          if (p > i / target.length + 0.1 && !revealed[i]) {
            s.textContent = target[i];
            revealed[i] = true;
          } else if (!revealed[i]) {
            s.textContent = CHARS[Math.floor(Math.random() * CHARS.length)];
            s.style.opacity = String(0.2 + p * 0.6);
          }
        });
        if (!revealed.every(Boolean)) {
          raf.current = requestAnimationFrame(tick);
        } else {
          timer.current = setTimeout(run, loopDelay);
        }
      }
      raf.current = requestAnimationFrame(tick);
    }

    timer.current = setTimeout(run, delay);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      if (timer.current) clearTimeout(timer.current);
    };
  }, [target, delay, loopDelay]);
}