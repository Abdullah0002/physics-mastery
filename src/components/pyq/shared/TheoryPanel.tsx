"use client";

import { useState } from "react";
import { BookOpen, ChevronDown } from "lucide-react";
import type { ChapterTheory } from "./types";

/**
 * Collapsible "Theory & Revision Notes" panel rendered above the question list.
 * Default collapsed to keep focus on the PYQs; expands to a two-column notes grid.
 */
export function TheoryPanel({ theory }: { theory: ChapterTheory }) {
  const [open, setOpen] = useState(false);

  return (
    <section className="mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center gap-3 p-4 text-left transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/60 sm:p-5"
      >
        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white">
          <BookOpen className="h-5 w-5" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-semibold">Theory &amp; Revision Notes</span>
          <span className="block truncate text-sm text-slate-500 dark:text-slate-400">
            {theory.summary}
          </span>
        </span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="border-t border-slate-100 p-4 dark:border-slate-800 sm:p-5">
          <div className="grid gap-4 sm:grid-cols-2">
            {theory.sections.map((section) => (
              <div
                key={section.heading}
                className="rounded-xl border border-slate-100 bg-slate-50/60 p-4 dark:border-slate-800 dark:bg-slate-800/30"
              >
                <h3 className="mb-2 text-sm font-bold text-indigo-700 dark:text-indigo-400">
                  {section.heading}
                </h3>
                <ul className="space-y-1.5">
                  {section.points.map((point, i) => (
                    <li
                      key={i}
                      className="flex gap-2 text-[13px] leading-relaxed text-slate-700 dark:text-slate-300"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-indigo-400" />
                      <span className="whitespace-pre-line">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
