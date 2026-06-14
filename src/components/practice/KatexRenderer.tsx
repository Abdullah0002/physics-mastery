"use client";

import { useMemo } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

interface KatexRendererProps {
  content: string;
  className?: string;
}

function renderMath(text: string): string {
  // Replace display math $$...$$
  let result = text.replace(/\$\$([\s\S]+?)\$\$/g, (_, math) => {
    try {
      return katex.renderToString(math.trim(), {
        displayMode: true,
        throwOnError: false,
        trust: false,
      });
    } catch {
      return `<span class="text-destructive">$$${math}$$</span>`;
    }
  });

  // Replace inline math $...$
  result = result.replace(/\$([^$\n]+?)\$/g, (_, math) => {
    try {
      return katex.renderToString(math.trim(), {
        displayMode: false,
        throwOnError: false,
        trust: false,
      });
    } catch {
      return `<span class="text-destructive">$${math}$</span>`;
    }
  });

  // Convert **bold** to <strong>
  result = result.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

  // Convert newlines to <br>
  result = result.replace(/\n/g, "<br>");

  return result;
}

export function KatexRenderer({ content, className }: KatexRendererProps) {
  const html = useMemo(() => renderMath(content), [content]);
  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
