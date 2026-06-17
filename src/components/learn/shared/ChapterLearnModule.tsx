"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Moon,
  Sun,
  Lightbulb,
  AlertTriangle,
  Info,
  Sparkles,
  GraduationCap,
  ScrollText,
  ChevronDown,
  Sigma,
  List,
  X,
} from "lucide-react";
import type {
  ChapterLearnModule as ModuleData,
  Topic,
  Callout,
  WorkedExample,
  Formula,
} from "./types";
import { RichText, Figure } from "./RichText";

const CALLOUT_STYLES: Record<
  Callout["kind"],
  { wrap: string; title: string; icon: typeof Lightbulb; label: string }
> = {
  intuition: {
    wrap: "border-sky-300 bg-sky-50 dark:border-sky-500/40 dark:bg-sky-500/10",
    title: "text-sky-700 dark:text-sky-300",
    icon: Lightbulb,
    label: "Intuition",
  },
  warning: {
    wrap: "border-rose-300 bg-rose-50 dark:border-rose-500/40 dark:bg-rose-500/10",
    title: "text-rose-700 dark:text-rose-300",
    icon: AlertTriangle,
    label: "Watch out",
  },
  note: {
    wrap: "border-slate-300 bg-slate-50 dark:border-slate-600 dark:bg-slate-800/50",
    title: "text-slate-700 dark:text-slate-200",
    icon: Info,
    label: "Note",
  },
  tip: {
    wrap: "border-emerald-300 bg-emerald-50 dark:border-emerald-500/40 dark:bg-emerald-500/10",
    title: "text-emerald-700 dark:text-emerald-300",
    icon: Sparkles,
    label: "Tip",
  },
  jee: {
    wrap: "border-violet-300 bg-violet-50 dark:border-violet-500/40 dark:bg-violet-500/10",
    title: "text-violet-700 dark:text-violet-300",
    icon: GraduationCap,
    label: "JEE Insight",
  },
  history: {
    wrap: "border-amber-300 bg-amber-50 dark:border-amber-500/40 dark:bg-amber-500/10",
    title: "text-amber-700 dark:text-amber-300",
    icon: ScrollText,
    label: "History",
  },
};

function CalloutBox({ callout }: { callout: Callout }) {
  const s = CALLOUT_STYLES[callout.kind];
  const Icon = s.icon;
  return (
    <div className={`my-3 rounded-xl border p-4 ${s.wrap}`}>
      <p className={`mb-1 flex items-center gap-2 text-sm font-bold ${s.title}`}>
        <Icon className="h-4 w-4" /> {callout.title ?? s.label}
      </p>
      <RichText text={callout.body} className="text-[14px]" />
    </div>
  );
}

function FormulaList({ formulas }: { formulas: Formula[] }) {
  return (
    <div className="my-3 space-y-2">
      {formulas.map((f, i) => (
        <div
          key={i}
          className="rounded-xl border border-blue-200 bg-blue-50/60 p-3 dark:border-blue-500/30 dark:bg-blue-500/10"
        >
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="text-xs font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
              {f.label}
            </span>
            <code className="font-mono text-[15px] font-medium text-slate-900 dark:text-slate-100">
              {f.expr}
            </code>
          </div>
          {f.note && (
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{f.note}</p>
          )}
        </div>
      ))}
    </div>
  );
}

function ExampleBox({ example, index }: { example: WorkedExample; index: number }) {
  const [open, setOpen] = useState(false);
  const levelColor =
    example.level === "JEE Advanced"
      ? "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-400"
      : example.level === "NEET"
        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400"
        : "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400";
  return (
    <div className="my-3 rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
      <div className="flex items-center gap-2 border-b border-slate-100 p-3 dark:border-slate-800">
        <span className="rounded-md bg-slate-800 px-2 py-0.5 text-xs font-semibold text-white dark:bg-slate-200 dark:text-slate-900">
          Example {index + 1}
        </span>
        <span className={`rounded-md px-2 py-0.5 text-xs font-semibold ${levelColor}`}>
          {example.level}
        </span>
      </div>
      <div className="p-3">
        <RichText text={example.problem} />
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700"
        >
          {open ? "Hide" : "Show"} Solution
          <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
        {open && (
          <div className="mt-3 rounded-lg bg-slate-50 p-3 dark:bg-slate-800/40">
            <RichText text={example.solution} className="font-mono text-[13px]" />
            {example.answer && (
              <p className="mt-2 inline-block rounded-md border border-emerald-400 bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-300">
                Answer: {example.answer}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function TopicBlock({ topic }: { topic: Topic }) {
  return (
    <div id={topic.id} className="scroll-mt-24">
      <h3 className="mb-2 mt-6 text-lg font-bold text-slate-900 dark:text-slate-100">{topic.title}</h3>

      {topic.theory && <RichText text={topic.theory} />}

      {topic.intuition && <CalloutBox callout={{ kind: "intuition", body: topic.intuition }} />}

      {topic.derivation && (
        <div className="my-3">
          <p className="mb-1 text-sm font-bold text-slate-700 dark:text-slate-200">Derivation</p>
          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 dark:border-slate-700 dark:bg-slate-800/40">
            <RichText text={topic.derivation} className="font-mono text-[13px]" />
          </div>
        </div>
      )}

      {topic.formulas && topic.formulas.length > 0 && <FormulaList formulas={topic.formulas} />}

      {topic.figures?.map((fig, i) => <Figure key={i} svg={fig.svg} caption={fig.caption} />)}

      {topic.callouts?.map((c, i) => <CalloutBox key={i} callout={c} />)}

      {topic.examples?.map((ex, i) => <ExampleBox key={i} example={ex} index={i} />)}

      {topic.mistakes && topic.mistakes.length > 0 && (
        <div className="my-3 rounded-xl border border-rose-300 bg-rose-50 p-4 dark:border-rose-500/40 dark:bg-rose-500/10">
          <p className="mb-1 flex items-center gap-2 text-sm font-bold text-rose-700 dark:text-rose-300">
            <AlertTriangle className="h-4 w-4" /> Common Mistakes
          </p>
          <ul className="list-disc space-y-1 pl-5 text-[14px] text-rose-900 dark:text-rose-200">
            {topic.mistakes.map((m, i) => (
              <li key={i}>{m}</li>
            ))}
          </ul>
        </div>
      )}

      {topic.jeeNotes && topic.jeeNotes.length > 0 && (
        <div className="my-3 rounded-xl border border-violet-300 bg-violet-50 p-4 dark:border-violet-500/40 dark:bg-violet-500/10">
          <p className="mb-1 flex items-center gap-2 text-sm font-bold text-violet-700 dark:text-violet-300">
            <GraduationCap className="h-4 w-4" /> JEE Notes
          </p>
          <ul className="list-disc space-y-1 pl-5 text-[14px] text-violet-900 dark:text-violet-200">
            {topic.jeeNotes.map((n, i) => (
              <li key={i}>{n}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export function ChapterLearnModule({
  data,
  showThemeToggle = false,
  embedded = false,
}: {
  data: ModuleData;
  showThemeToggle?: boolean;
  /** When true, drop the full-page chrome (background + big title) to nest inside another layout. */
  embedded?: boolean;
}) {
  const [isDark, setIsDark] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [active, setActive] = useState(data.sections[0]?.id ?? "");

  useEffect(() => {
    if (showThemeToggle) setIsDark(document.documentElement.classList.contains("dark"));
  }, [showThemeToggle]);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
  };

  // Scroll-spy for the active section.
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 }
    );
    data.sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [data.sections]);

  const nav = useMemo(
    () => data.sections.map((s) => ({ id: s.id, title: s.title })),
    [data.sections]
  );

  return (
    <div className={embedded ? "" : "min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100"}>
      <div className={`mx-auto flex max-w-6xl gap-6 ${embedded ? "py-2" : "px-4 py-8 sm:px-6"}`}>
        {/* Sidebar nav (desktop) */}
        <aside className="hidden w-60 shrink-0 lg:block">
          <nav className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-3 text-sm shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <p className="px-2 pb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
              Contents
            </p>
            {nav.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className={`block rounded-lg px-2 py-1.5 transition-colors ${
                  active === n.id
                    ? "bg-blue-600 text-white"
                    : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                }`}
              >
                {n.title}
              </a>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="min-w-0 flex-1">
          <header className="mb-6 flex flex-wrap items-start justify-between gap-3">
            {embedded ? (
              <p className="max-w-2xl text-sm text-slate-500 dark:text-slate-400">{data.summary}</p>
            ) : (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  {data.exams}
                </p>
                <h1 className="text-2xl font-bold sm:text-3xl">{data.chapter}</h1>
                <p className="mt-1 max-w-2xl text-sm text-slate-500 dark:text-slate-400">
                  {data.summary}
                </p>
              </div>
            )}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setNavOpen((o) => !o)}
                className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-600 lg:hidden dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
              >
                <List className="h-4 w-4" /> Contents
              </button>
              {showThemeToggle && (
                <button
                  type="button"
                  onClick={toggleTheme}
                  aria-label="Toggle dark mode"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 bg-white text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                >
                  {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>
              )}
            </div>
          </header>

          {/* Mobile nav drawer */}
          {navOpen && (
            <div className="mb-4 rounded-2xl border border-slate-200 bg-white p-3 text-sm shadow-sm lg:hidden dark:border-slate-700 dark:bg-slate-900">
              <div className="mb-1 flex items-center justify-between px-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Contents
                </span>
                <button type="button" onClick={() => setNavOpen(false)} aria-label="Close">
                  <X className="h-4 w-4 text-slate-400" />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2">
                {nav.map((n) => (
                  <a
                    key={n.id}
                    href={`#${n.id}`}
                    onClick={() => setNavOpen(false)}
                    className="rounded-lg px-2 py-1.5 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                  >
                    {n.title}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Sections */}
          {data.sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="mb-8 scroll-mt-20 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-6"
            >
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">{section.title}</h2>
              {section.intro && <RichText text={section.intro} className="mt-2" />}
              {section.topics.map((topic) => (
                <TopicBlock key={topic.id} topic={topic} />
              ))}
            </section>
          ))}

          {/* Top mistakes */}
          {data.topMistakes && data.topMistakes.length > 0 && (
            <section
              id="top-mistakes"
              className="mb-8 scroll-mt-20 rounded-2xl border border-rose-200 bg-rose-50/50 p-5 dark:border-rose-500/30 dark:bg-rose-500/5 sm:p-6"
            >
              <h2 className="flex items-center gap-2 text-xl font-bold text-rose-700 dark:text-rose-300">
                <AlertTriangle className="h-5 w-5" /> Error Analysis — Frequent Mistakes
              </h2>
              <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-[14px] text-rose-900 dark:text-rose-200">
                {data.topMistakes.map((m, i) => (
                  <li key={i}>{m}</li>
                ))}
              </ol>
            </section>
          )}

          {/* Revision */}
          <section
            id="revision"
            className="mb-8 scroll-mt-20 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-6"
          >
            <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-slate-100">
              <Sigma className="h-5 w-5 text-blue-600 dark:text-blue-400" /> Final Revision &amp; Formula Sheet
            </h2>

            <h3 className="mb-2 mt-4 text-lg font-bold">Formula Sheet</h3>
            <FormulaList formulas={data.revision.formulaSheet} />

            {data.revision.conceptMap && (
              <>
                <h3 className="mb-2 mt-4 text-lg font-bold">Concept Map</h3>
                <RichText text={data.revision.conceptMap} />
              </>
            )}

            {data.revision.pyqInsights && data.revision.pyqInsights.length > 0 && (
              <>
                <h3 className="mb-2 mt-4 text-lg font-bold">PYQ Trends</h3>
                <ul className="list-disc space-y-1 pl-5 text-[14px] text-slate-700 dark:text-slate-300">
                  {data.revision.pyqInsights.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </>
            )}

            <h3 className="mb-2 mt-4 text-lg font-bold">Last-Minute Tips</h3>
            <ul className="list-disc space-y-1 pl-5 text-[14px] text-slate-700 dark:text-slate-300">
              {data.revision.lastMinuteTips.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
}

export default ChapterLearnModule;
