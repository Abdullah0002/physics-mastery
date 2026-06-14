"use client";

import { useEffect, useRef } from "react";

// Runs KaTeX auto-render on the article element after mount.
// Targets <code class="math-inline"> and <code class="math-display"> elements
// produced by remark-math (without rehype-katex).
export function KatexRenderer() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const container = ref.current?.closest("article");
    if (!container) return;

    let cancelled = false;
    import("katex").then(({ default: katex }) => {
      if (cancelled) return;

      const renderAll = (selector: string, displayMode: boolean) => {
        container.querySelectorAll<HTMLElement>(selector).forEach((el) => {
          // Idempotency guard: never re-process an element. Without this, a
          // second effect run (e.g. React Strict Mode) would read the already-
          // rendered KaTeX output as its source — the MathML annotation leaks
          // the raw LaTeX and the symbol is duplicated ("M" → "MMM").
          if (el.dataset.katexDone === "true") return;
          const latex = el.textContent ?? "";
          el.dataset.katexDone = "true";
          try {
            katex.render(latex, el, { throwOnError: false, displayMode });
          } catch {}
        });
      };

      // Inline math: $...$  →  <code class="language-math math-inline">
      renderAll("code.math-inline", false);
      // Display math: $$...$$ (multiline)  →  <pre><code class="language-math math-display">
      renderAll("code.math-display", true);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return <span ref={ref} style={{ display: "none" }} aria-hidden="true" />;
}
