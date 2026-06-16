"use client";

import { useState } from "react";
import {
  Bookmark,
  CheckCircle2,
  ChevronDown,
  Lightbulb,
  AlertTriangle,
  Target,
  Eye,
  EyeOff,
  Hash,
} from "lucide-react";
import type { PYQQuestion, Difficulty } from "./types";
import { SvgFigure } from "./SvgFigure";

const DIFFICULTY_STYLES: Record<Difficulty, string> = {
  Easy: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400",
  Medium: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400",
  Hard: "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-400",
};

const isSvg = (s: string) => s.trimStart().startsWith("<svg");
const OPTION_LABELS = ["1", "2", "3", "4", "5"];

export function PYQQuestionCard({
  question,
  index,
  bookmarked,
  onToggleBookmark,
}: {
  question: PYQQuestion;
  index: number;
  bookmarked: boolean;
  onToggleBookmark: (id: string) => void;
}) {
  const [showSolution, setShowSolution] = useState(false);
  const isNumeric = question.options.length === 0 || question.answerIndex < 0;

  return (
    <article className="rounded-2xl border border-slate-200 bg-white shadow-sm transition-colors dark:border-slate-700 dark:bg-slate-900">
      {/* Header */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 p-4 dark:border-slate-800 sm:p-5">
        <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-lg bg-blue-600 px-2 text-sm font-semibold text-white">
          Q{index + 1}
        </span>
        <span
          className={`rounded-md px-2 py-0.5 text-xs font-semibold ${DIFFICULTY_STYLES[question.difficulty]}`}
        >
          {question.difficulty}
        </span>
        <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          {question.year}
        </span>
        {isNumeric && (
          <span className="inline-flex items-center gap-1 rounded-md bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-400">
            <Hash className="h-3 w-3" /> Numeric
          </span>
        )}
        <span className="hidden text-xs text-slate-500 dark:text-slate-400 sm:inline">
          {question.session}
        </span>

        <button
          type="button"
          onClick={() => onToggleBookmark(question.id)}
          aria-pressed={bookmarked}
          aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
          title={bookmarked ? "Bookmarked" : "Bookmark this question"}
          className="ml-auto inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <Bookmark className={`h-4 w-4 ${bookmarked ? "fill-amber-400 text-amber-500" : ""}`} />
          <span className="hidden sm:inline">{bookmarked ? "Saved" : "Save"}</span>
        </button>
      </div>

      {/* Body */}
      <div className="space-y-4 p-4 sm:p-5">
        {/* Concept tag */}
        <div className="flex items-start gap-2 rounded-lg bg-blue-50 p-3 text-sm text-blue-900 dark:bg-blue-500/10 dark:text-blue-200">
          <Target className="mt-0.5 h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400" />
          <span>
            <span className="font-semibold">Concept: </span>
            {question.concept}
          </span>
        </div>

        {/* Question text */}
        <p className="whitespace-pre-line leading-relaxed text-slate-800 dark:text-slate-100">
          {question.question}
        </p>

        {/* Diagram */}
        {question.diagram && (
          <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4 dark:border-slate-800 dark:bg-slate-800/30">
            <SvgFigure svg={question.diagram} label={`Diagram for question ${index + 1}`} />
          </div>
        )}

        {/* Options (MCQ only) */}
        {!isNumeric && (
          <ol className="grid gap-2 sm:grid-cols-2">
            {question.options.map((opt, i) => {
              const correct = showSolution && i === question.answerIndex;
              return (
                <li
                  key={i}
                  className={`flex items-center gap-3 rounded-xl border p-3 text-sm transition-colors ${
                    correct
                      ? "border-emerald-400 bg-emerald-50 dark:border-emerald-500/50 dark:bg-emerald-500/10"
                      : "border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900"
                  }`}
                >
                  <span
                    className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                      correct
                        ? "bg-emerald-500 text-white"
                        : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                    }`}
                  >
                    {OPTION_LABELS[i]}
                  </span>
                  {isSvg(opt) ? (
                    <SvgFigure svg={opt} className="max-w-[180px]" />
                  ) : (
                    <span className="text-slate-700 dark:text-slate-200">{opt}</span>
                  )}
                  {correct && <CheckCircle2 className="ml-auto h-5 w-5 shrink-0 text-emerald-500" />}
                </li>
              );
            })}
          </ol>
        )}

        {/* Show / Hide solution */}
        <button
          type="button"
          onClick={() => setShowSolution((s) => !s)}
          aria-expanded={showSolution}
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
        >
          {showSolution ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          {showSolution ? "Hide Solution" : "Show Solution"}
          <ChevronDown className={`h-4 w-4 transition-transform ${showSolution ? "rotate-180" : ""}`} />
        </button>

        {/* Solution panel */}
        {showSolution && (
          <div className="space-y-4 rounded-xl border border-slate-200 bg-slate-50/70 p-4 dark:border-slate-700 dark:bg-slate-800/40">
            <div>
              <p className="mb-1 flex items-center gap-2 text-sm font-bold text-emerald-700 dark:text-emerald-400">
                <CheckCircle2 className="h-4 w-4" /> Correct Answer
              </p>
              <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{question.answer}</p>
            </div>

            <div>
              <p className="mb-1 text-sm font-bold text-slate-700 dark:text-slate-200">
                Step-by-step Solution
              </p>
              <p className="whitespace-pre-line font-mono text-[13px] leading-relaxed text-slate-700 dark:text-slate-300">
                {question.solution}
              </p>
            </div>

            <div className="rounded-lg bg-amber-50 p-3 dark:bg-amber-500/10">
              <p className="mb-1 flex items-center gap-2 text-sm font-bold text-amber-700 dark:text-amber-400">
                <Lightbulb className="h-4 w-4" /> JEE Shortcut
              </p>
              <p className="text-sm leading-relaxed text-amber-900 dark:text-amber-200">
                {question.shortcut}
              </p>
            </div>

            <div className="rounded-lg bg-rose-50 p-3 dark:bg-rose-500/10">
              <p className="mb-1 flex items-center gap-2 text-sm font-bold text-rose-700 dark:text-rose-400">
                <AlertTriangle className="h-4 w-4" /> Common Mistakes
              </p>
              <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed text-rose-900 dark:text-rose-200">
                {question.commonMistakes.map((m, i) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
