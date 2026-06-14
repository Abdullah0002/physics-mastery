"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { CheckCircle2, XCircle, Lightbulb, ArrowRight, Trophy, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { SAMPLE_QUESTIONS } from "@/config/sample-questions";
import { KatexRenderer } from "@/components/practice/KatexRenderer";
import type { Question } from "@/types";

const DIFFICULTY_STYLES = {
  EASY:     { label: "Easy",     cls: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
  MEDIUM:   { label: "Medium",   cls: "bg-amber-500/10 text-amber-600 dark:text-amber-400" },
  HARD:     { label: "Hard",     cls: "bg-rose-500/10 text-rose-600 dark:text-rose-400" },
  ADVANCED: { label: "Advanced", cls: "bg-purple-500/10 text-purple-600 dark:text-purple-400" },
};

function getDailyQuestion(offset = 0): Question {
  const today = new Date();
  const seed =
    today.getFullYear() * 10000 +
    (today.getMonth() + 1) * 100 +
    today.getDate() +
    offset;
  // Only use MCQ_SINGLE questions so options are always present
  const pool = SAMPLE_QUESTIONS.filter((q) => q.type === "MCQ_SINGLE");
  const idx = seed % pool.length;
  return pool[idx]!;
}

export function ProblemOfDaySection() {
  const [offset, setOffset] = useState(0);
  const question = useMemo(() => getDailyQuestion(offset), [offset]);

  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const correct = question.correctAnswer as string;
  const diff = DIFFICULTY_STYLES[question.difficulty] ?? DIFFICULTY_STYLES.MEDIUM;

  const handleSelect = (id: string) => {
    if (revealed) return;
    setSelected(id);
  };

  const handleReveal = () => {
    setRevealed(true);
  };

  const handleNext = () => {
    setOffset((o) => o + 1);
    setSelected(null);
    setRevealed(false);
    setShowHint(false);
  };

  const optionStyle = (id: string) => {
    if (!revealed) {
      return selected === id
        ? "border-primary bg-primary/10 text-foreground"
        : "border-border hover:border-primary/50 hover:bg-muted/50 cursor-pointer";
    }
    if (id === correct)    return "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300";
    if (id === selected)   return "border-rose-500 bg-rose-500/10 text-rose-700 dark:text-rose-300";
    return "border-border opacity-50";
  };

  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <div className="mx-auto max-w-3xl">
          {/* Header */}
          <div className="mb-10 text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-600 dark:text-amber-400">
              <Trophy className="h-3.5 w-3.5" />
              Problem of the Day
            </div>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Daily Practice
            </h2>
            <p className="mt-2 text-muted-foreground">
              Sharpen your problem-solving with a fresh question every day.
            </p>
          </div>

          {/* Card */}
          <div className="rounded-2xl border bg-card/80 p-6 md:p-8 shadow-sm">
            {/* Meta row */}
            <div className="mb-5 flex flex-wrap items-center gap-2 text-sm">
              <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-semibold", diff.cls)}>
                {diff.label}
              </span>
              <span className="rounded-full border px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                {question.chapter?.title ?? question.chapterId}
              </span>
              <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                {question.type === "MCQ_SINGLE" ? "MCQ" : question.type}
              </span>
              {question.timeToSolve && (
                <span className="ml-auto text-xs text-muted-foreground">
                  ⏱ {question.timeToSolve}s
                </span>
              )}
            </div>

            {/* Question */}
            <p className="mb-6 text-base font-medium leading-relaxed md:text-lg">
              <KatexRenderer content={question.content} />
            </p>

            {/* Options */}
            {question.options && (
              <div className="mb-6 grid gap-2.5">
                {question.options.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleSelect(opt.id)}
                    className={cn(
                      "flex items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all",
                      optionStyle(opt.id)
                    )}
                  >
                    <span className="mt-px flex-shrink-0 font-semibold">({opt.id})</span>
                    <span className="flex-1"><KatexRenderer content={opt.content} /></span>
                    {revealed && opt.id === correct && (
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" />
                    )}
                    {revealed && opt.id === selected && opt.id !== correct && (
                      <XCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-rose-500" />
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Hint */}
            {showHint && question.hint && (
              <div className="mb-4 flex gap-2.5 rounded-xl border border-amber-500/30 bg-amber-500/5 px-4 py-3 text-sm text-amber-700 dark:text-amber-300">
                <Lightbulb className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <KatexRenderer content={question.hint ?? ""} />
              </div>
            )}

            {/* Solution (after reveal) */}
            {revealed && question.solution && (
              <div className="mb-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-300">
                <p className="mb-1 font-semibold">Solution</p>
                <p className="leading-relaxed"><KatexRenderer content={question.solution} /></p>
              </div>
            )}

            {/* Action row */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              {!revealed && (
                <>
                  {!showHint && question.hint && (
                    <button
                      onClick={() => setShowHint(true)}
                      className="flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium text-muted-foreground hover:border-amber-500/50 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                    >
                      <Lightbulb className="h-3.5 w-3.5" />
                      Hint
                    </button>
                  )}
                  <button
                    onClick={handleReveal}
                    disabled={!selected}
                    className={cn(
                      "rounded-lg px-4 py-2 text-xs font-semibold transition-all",
                      selected
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "bg-muted text-muted-foreground cursor-not-allowed"
                    )}
                  >
                    Check Answer
                  </button>
                </>
              )}

              {revealed && (
                <button
                  onClick={handleNext}
                  className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  Next Problem
                </button>
              )}

              <Link
                href={`/chapters/${question.chapter?.slug ?? question.chapterId}/practice`}
                className="ml-auto flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
              >
                More from this chapter
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Footer nudge */}
          <p className="mt-4 text-center text-xs text-muted-foreground">
            New problem every day &nbsp;·&nbsp;
            <Link href="/chapters" className="text-primary hover:underline">
              Browse all chapters
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
