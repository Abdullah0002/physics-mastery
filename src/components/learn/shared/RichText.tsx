"use client";

import { Fragment, type ReactNode } from "react";

/** Parse **bold** segments within a line into React nodes. */
function inline(text: string, keyBase: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) => {
    if (p.startsWith("**") && p.endsWith("**")) {
      return (
        <strong key={`${keyBase}-${i}`} className="font-semibold text-slate-900 dark:text-slate-100">
          {p.slice(2, -2)}
        </strong>
      );
    }
    return <Fragment key={`${keyBase}-${i}`}>{p}</Fragment>;
  });
}

/**
 * Minimal, dependency-free prose renderer.
 * - Blank line separates paragraphs / blocks.
 * - A block whose lines all start with "- " renders as a bullet list.
 * - "**bold**" is supported inline.
 * - Other newlines inside a paragraph are preserved.
 */
export function RichText({ text, className = "" }: { text: string; className?: string }) {
  if (!text) return null;
  const blocks = text.trim().split(/\n\s*\n/);

  return (
    <div className={`space-y-3 text-[15px] leading-relaxed text-slate-700 dark:text-slate-300 ${className}`}>
      {blocks.map((block, bi) => {
        const lines = block.split("\n");
        const isList = lines.every((l) => l.trim().startsWith("- "));
        if (isList) {
          return (
            <ul key={bi} className="space-y-1.5 pl-1">
              {lines.map((l, li) => (
                <li key={li} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                  <span>{inline(l.trim().slice(2), `${bi}-${li}`)}</span>
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={bi} className="whitespace-pre-line">
            {inline(block, `${bi}`)}
          </p>
        );
      })}
    </div>
  );
}

export function Figure({ svg, caption }: { svg: string; caption?: string }) {
  if (!svg) return null;
  return (
    <figure className="my-4 rounded-xl border border-slate-200 bg-slate-50/60 p-4 dark:border-slate-700 dark:bg-slate-800/30">
      <div
        className="mx-auto w-full max-w-lg text-slate-700 dark:text-slate-200 [&_svg]:h-auto [&_svg]:w-full"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
      {caption && (
        <figcaption className="mt-2 text-center text-xs text-slate-500 dark:text-slate-400">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
