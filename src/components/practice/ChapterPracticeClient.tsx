"use client";

import { useState, useMemo } from "react";
import {
  ChevronDown,
  ChevronUp,
  PlayCircle,
  BookOpen,
  CheckCircle,
  RotateCcw,
  Lightbulb,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { KatexRenderer } from "./KatexRenderer";
import { PracticeInterface } from "./PracticeInterface";
import { QUESTIONS_BY_CHAPTER } from "@/config/sample-questions";
import type { Question } from "@/types";

function KR({ content }: { content: string | null | undefined }) {
  return <KatexRenderer content={content ?? ""} />;
}

const DIFF_STYLES: Record<string, string> = {
  EASY: "border-easy/40 bg-easy/10 text-easy",
  MEDIUM: "border-medium/40 bg-medium/10 text-[#b45309] dark:text-medium",
  HARD: "border-hard/40 bg-hard/10 text-hard",
  ADVANCED: "border-advanced/40 bg-advanced/10 text-advanced",
};

const TYPE_LABEL: Record<string, string> = {
  MCQ_SINGLE: "MCQ",
  MCQ_MULTIPLE: "Multi",
  INTEGER: "Integer",
};

function DiffBadge({ d }: { d: string }) {
  return (
    <span className={cn("rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide", DIFF_STYLES[d] ?? "border-border bg-muted")}>
      {d}
    </span>
  );
}

function QuestionCard({ q, index }: { q: Question; index: number }) {
  const [open, setOpen] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  return (
    <div className={cn("rounded-xl border bg-card/70 transition-all", open && "shadow-md")}>
      <button
        className="w-full flex items-start gap-3 p-4 text-left"
        onClick={() => { setOpen((p) => !p); if (!open) setShowSolution(false); }}
      >
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-muted text-xs font-bold text-muted-foreground">
          {index + 1}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
            <DiffBadge d={q.difficulty} />
            <span className="rounded-full border px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
              {TYPE_LABEL[q.type] ?? q.type}
            </span>
            {q.isStarred && <span className="text-amber-500 text-xs">★ starred</span>}
          </div>
          <div className="text-sm leading-snug line-clamp-2 text-foreground/90">
            <KR content={q.content.replace(/\*\*/g, "")} />
          </div>
        </div>
        <span className="shrink-0 text-muted-foreground mt-0.5">
          {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </span>
      </button>

      {open && (
        <div className="border-t border-border/50 px-4 pb-4 pt-3 space-y-4">
          <div className="text-sm leading-relaxed">
            <KR content={q.content} />
          </div>

          {q.options && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {q.options.map((opt) => (
                <div key={opt.id} className="flex items-start gap-2 rounded-lg border bg-muted/40 px-3 py-2 text-sm">
                  <span className="font-semibold text-muted-foreground shrink-0">{opt.id}.</span>
                  <KR content={opt.content} />
                </div>
              ))}
            </div>
          )}

          <div className="flex items-start gap-2 rounded-lg border border-amber-400/30 bg-amber-400/5 px-3 py-2 text-xs text-amber-700 dark:text-amber-300">
            <Lightbulb className="h-3.5 w-3.5 shrink-0 mt-0.5" />
            <KR content={q.hint} />
          </div>

          <div>
            <button
              onClick={() => setShowSolution((p) => !p)}
              className="flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
            >
              {showSolution ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
              {showSolution ? "Hide solution" : "Show solution & answer"}
            </button>

            {showSolution && (
              <div className="mt-2 rounded-lg border border-primary/20 bg-primary/5 px-3 py-3 space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-primary">
                  <CheckCircle className="h-3.5 w-3.5" />
                  Answer:{" "}
                  {Array.isArray(q.correctAnswer)
                    ? (q.correctAnswer as string[]).join(", ")
                    : String(q.correctAnswer)}
                </div>
                <div className="text-xs leading-relaxed text-foreground/80">
                  <KR content={q.solution} />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

type Props = { chapterSlug: string; chapterTitle: string };

export function ChapterPracticeClient({ chapterSlug, chapterTitle }: Props) {
  const allQuestions = QUESTIONS_BY_CHAPTER[chapterSlug] ?? [];
  const [mode, setMode] = useState<"browse" | "session">("browse");
  const [diffFilter, setDiffFilter] = useState<"ALL" | "EASY" | "MEDIUM" | "HARD" | "ADVANCED">("ALL");

  const filtered = useMemo(
    () => allQuestions.filter((q) => diffFilter === "ALL" || q.difficulty === diffFilter),
    [allQuestions, diffFilter]
  );

  const stats = useMemo(() => ({
    total: allQuestions.length,
    easy: allQuestions.filter((q) => q.difficulty === "EASY").length,
    medium: allQuestions.filter((q) => q.difficulty === "MEDIUM").length,
    hard: allQuestions.filter((q) => q.difficulty === "HARD").length,
    advanced: allQuestions.filter((q) => q.difficulty === "ADVANCED").length,
  }), [allQuestions]);

  if (allQuestions.length === 0) {
    return (
      <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 text-center rounded-2xl border border-dashed py-16 px-6">
        <div className="rounded-2xl bg-brand-50 p-4 dark:bg-brand-950/50">
          <BookOpen className="h-8 w-8 text-brand-500" />
        </div>
        <div>
          <p className="font-semibold text-lg">{chapterTitle} — Practice</p>
          <p className="mt-1 text-muted-foreground text-sm max-w-sm">
            Practice questions for this chapter are being added. Check back soon.
          </p>
        </div>
      </div>
    );
  }

  if (mode === "session") {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-semibold">Practice Session — {chapterTitle}</h2>
          <button
            onClick={() => setMode("browse")}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="h-3.5 w-3.5 mr-1" /> Exit session
          </button>
        </div>
        <PracticeInterface initialChapterSlug={chapterSlug} />
      </div>
    );
  }

  const DIFFS = ["ALL", "EASY", "MEDIUM", "HARD", "ADVANCED"] as const;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total", value: stats.total, color: "text-foreground" },
          { label: "Easy", value: stats.easy, color: "text-easy" },
          { label: "Medium", value: stats.medium, color: "text-[#b45309] dark:text-medium" },
          { label: "Hard / Adv", value: stats.hard + stats.advanced, color: "text-hard" },
        ].map(({ label, value, color }) => (
          <div key={label} className="rounded-xl border bg-card/60 p-3 text-center">
            <p className={cn("text-2xl font-bold", color)}>{value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          {DIFFS.map((d) => (
            <button
              key={d}
              onClick={() => setDiffFilter(d)}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium border transition-colors",
                diffFilter === d
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card/60 text-muted-foreground border-border hover:border-primary/50"
              )}
            >
              {d === "ALL" ? `All (${stats.total})` : d}
            </button>
          ))}
        </div>

        <Button size="sm" onClick={() => setMode("session")} className="gap-2 shrink-0">
          <PlayCircle className="h-4 w-4" />
          Start Practice Session
        </Button>
      </div>

      <div className="space-y-2">
        {filtered.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground py-10">No questions for this filter.</p>
        ) : (
          filtered.map((q, i) => <QuestionCard key={q.id} q={q} index={i} />)
        )}
      </div>
    </div>
  );
}
