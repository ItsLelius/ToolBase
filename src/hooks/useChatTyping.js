import { useEffect, useRef } from "react";

const QUESTIONS = [
  "What tools do I need to build a SaaS?",
  "Best free design tools for beginners?",
  "How do I deploy a React app for free?",
  "What's a good alternative to Notion?",
  "Tools for building a REST API fast?",
  "Best AI tools for developers in 2025?",
  "Free database options for side projects?",
];

// Drives a typing + erasing loop on an <input> placeholder.
// Pass a ref to the input element.
export function useChatTyping(ref, { startDelay = 1200 } = {}) {
  const timer = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const inp = ref.current;
    let qi = 0, ci = 0, deleting = false;

    function loop() {
      const q = QUESTIONS[qi];
      if (!deleting) {
        inp.placeholder = q.slice(0, ci) + (ci < q.length ? "|" : "");
        if (ci < q.length) {
          ci++;
          timer.current = setTimeout(loop, 52);
        } else {
          timer.current = setTimeout(() => { deleting = true; loop(); }, 1600);
        }
      } else {
        if (ci > 0) {
          ci--;
          inp.placeholder = q.slice(0, ci) + (ci > 0 ? "|" : "");
          timer.current = setTimeout(loop, 28);
        } else {
          deleting = false;
          qi = (qi + 1) % QUESTIONS.length;
          inp.placeholder = "";
          timer.current = setTimeout(loop, 420);
        }
      }
    }

    timer.current = setTimeout(loop, startDelay);
    return () => clearTimeout(timer.current);
  }, []);
}