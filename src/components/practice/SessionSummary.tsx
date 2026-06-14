"use client";

import { CheckCircle, XCircle, Clock, Target, TrendingUp, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import type { Question } from "@/types";

export interface QuestionResult {
  question: Question;
  submitted: string | string[] | number | null;
  isCorrect: boolean | null;
  timeSpent: number;
}

interface SessionSummaryProps {
  results: QuestionResult[];
  totalSeconds: number;
  onRestart: () => void;
}

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  if (m === 0) return `${s}s`;
  return `${m}m ${s}s`;
}

export function SessionSummary({ results, totalSeconds, onRestart }: SessionSummaryProps) {
  const attempted = results.filter((r) => r.submitted !== null).length;
  const correct = results.filter((r) => r.isCorrect === true).length;
  const incorrect = results.filter((r) => r.isCorrect === false).length;
  const skipped = results.filter((r) => r.submitted === null).length;
  const accuracy = attempted > 0 ? Math.round((correct / attempted) * 100) : 0;

  // Calculate score (4 marks for correct, -1 for wrong typically)
  const totalScore = results.reduce((acc, r) => {
    if (r.isCorrect === true) return acc + r.question.marks;
    if (r.isCorrect === false) return acc - r.question.negativeMarks;
    return acc;
  }, 0);

  const maxScore = results.reduce((acc, r) => acc + r.question.marks, 0);

  // Chapter-wise breakdown
  const chapterMap = new Map<string, { title: string; correct: number; total: number }>();
  results.forEach((r) => {
    const key = r.question.chapterId;
    const title = r.question.chapter?.title ?? key;
    const entry = chapterMap.get(key) ?? { title, correct: 0, total: 0 };
    entry.total += 1;
    if (r.isCorrect === true) entry.correct += 1;
    chapterMap.set(key, entry);
  });

  return (
    <div className="flex flex-col gap-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
      {/* Hero score */}
      <div className="rounded-2xl border bg-gradient-to-br from-primary/10 via-card to-card p-6 text-center">
        <div className="text-5xl font-bold gradient-text mb-2">
          {totalScore}/{maxScore}
        </div>
        <div className="text-muted-foreground text-sm">Total Score</div>
        <div className="mt-4 flex justify-center">
          <div
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-semibold",
              accuracy >= 80
                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                : accuracy >= 50
                ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                : "bg-red-500/10 text-red-600 dark:text-red-400"
            )}
          >
            <Target className="h-4 w-4" />
            {accuracy}% accuracy
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Attempted", value: attempted, icon: TrendingUp, color: "text-primary" },
          { label: "Correct", value: correct, icon: CheckCircle, color: "text-emerald-500" },
          { label: "Incorrect", value: incorrect, icon: XCircle, color: "text-red-500" },
          { label: "Time", value: formatTime(totalSeconds), icon: Clock, color: "text-amber-500" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border bg-card/60 p-4 flex flex-col items-center gap-1"
          >
            <stat.icon className={cn("h-5 w-5", stat.color)} />
            <div className="text-xl font-bold">{stat.value}</div>
            <div className="text-xs text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Chapter breakdown */}
      {chapterMap.size > 1 && (
        <div className="flex flex-col gap-3">
          <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Chapter Breakdown
          </div>
          {Array.from(chapterMap.entries()).map(([key, data]) => {
            const pct = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;
            return (
              <div key={key} className="flex items-center gap-3">
                <div className="w-32 truncate text-sm">{data.title}</div>
                <Progress value={pct} className="flex-1 h-2" />
                <div className="text-xs text-muted-foreground w-16 text-right">
                  {data.correct}/{data.total} ({pct}%)
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Question-level review */}
      <div className="flex flex-col gap-2">
        <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          Question Review
        </div>
        <div className="grid grid-cols-1 gap-2">
          {results.map((r, i) => (
            <div
              key={r.question.id}
              className={cn(
                "flex items-start gap-3 rounded-xl border px-3 py-3 text-sm",
                r.isCorrect === true
                  ? "border-emerald-500/20 bg-emerald-500/5"
                  : r.isCorrect === false
                  ? "border-red-500/20 bg-red-500/5"
                  : "border-border bg-card/40"
              )}
            >
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-card border text-xs font-bold">
                {i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="truncate text-xs text-muted-foreground mb-0.5">
                  {r.question.chapter?.title} · {r.question.difficulty}
                </div>
                <div className="text-xs line-clamp-2 leading-relaxed">
                  {r.question.content.replace(/\$[^$]+\$/g, "[math]")}
                </div>
              </div>
              <div className="shrink-0">
                {r.isCorrect === true && <CheckCircle className="h-4 w-4 text-emerald-500" />}
                {r.isCorrect === false && <XCircle className="h-4 w-4 text-red-500" />}
                {r.isCorrect === null && (
                  <Badge variant="outline" className="text-xs">Skipped</Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button onClick={onRestart} className="flex-1" size="lg">
          <RotateCcw className="h-4 w-4 mr-2" />
          Practice Again
        </Button>
      </div>
    </div>
  );
}
