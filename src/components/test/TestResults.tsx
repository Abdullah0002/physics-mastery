"use client";

import { useMemo } from "react";
import {
  CheckCircle,
  XCircle,
  Clock,
  Target,
  TrendingUp,
  RotateCcw,
  ChevronDown,
  Minus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { KatexRenderer } from "@/components/practice/KatexRenderer";
import type { FlatQuestion } from "@/config/mock-tests";
import type { MockTestConfig } from "@/config/mock-tests";
import { useState } from "react";

interface TestResultsProps {
  testConfig: MockTestConfig;
  questions: FlatQuestion[];
  answers: Map<string, string | string[] | number>;
  durationSeconds: number;
  onRetake: () => void;
}

function isCorrect(
  submitted: string | string[] | number,
  correct: string | string[] | number | { min: number; max: number }
): boolean {
  if (typeof correct === "object" && !Array.isArray(correct)) {
    const n = Number(submitted);
    return n >= correct.min && n <= correct.max;
  }
  if (Array.isArray(correct) && Array.isArray(submitted)) {
    return (
      submitted.length === correct.length &&
      [...submitted].sort().join(",") === [...correct].sort().join(",")
    );
  }
  return String(submitted) === String(correct);
}

function formatTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}m ${sec}s`;
}

// Approximate JEE Main Physics rank prediction
function predictPercentile(score: number, maxScore: number): string {
  const pct = (score / maxScore) * 100;
  if (pct >= 90) return "≥ 99.0 (Top 1%)";
  if (pct >= 80) return "≥ 97.0";
  if (pct >= 65) return "≥ 90.0";
  if (pct >= 50) return "≥ 75.0";
  if (pct >= 35) return "≥ 55.0";
  return "< 55.0";
}

export function TestResults({
  testConfig,
  questions,
  answers,
  durationSeconds,
  onRetake,
}: TestResultsProps) {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  const results = useMemo(
    () =>
      questions.map(({ question, marksPerCorrect, negativeMarks, sectionName }) => {
        const submitted = answers.get(question.id) ?? null;
        const correct =
          submitted !== null ? isCorrect(submitted, question.correctAnswer) : null;
        const score =
          correct === true
            ? marksPerCorrect
            : correct === false
            ? -negativeMarks
            : 0;
        return { question, submitted, correct, score, sectionName };
      }),
    [questions, answers]
  );

  const totalScore = results.reduce((s, r) => s + r.score, 0);
  const maxScore = questions.reduce((s, q) => s + q.marksPerCorrect, 0);
  const attempted = results.filter((r) => r.submitted !== null).length;
  const correct = results.filter((r) => r.correct === true).length;
  const incorrect = results.filter((r) => r.correct === false).length;
  const accuracy = attempted > 0 ? Math.round((correct / attempted) * 100) : 0;

  // Chapter-wise
  const chapterMap = new Map<string, { title: string; correct: number; total: number; score: number }>();
  results.forEach(({ question, correct: c, score }) => {
    const key = question.chapterId;
    const title = question.chapter?.title ?? key;
    const entry = chapterMap.get(key) ?? { title, correct: 0, total: 0, score: 0 };
    entry.total += 1;
    if (c === true) entry.correct += 1;
    entry.score += score;
    chapterMap.set(key, entry);
  });

  const scoreColor =
    totalScore >= maxScore * 0.7
      ? "text-emerald-500"
      : totalScore >= maxScore * 0.4
      ? "text-amber-500"
      : "text-red-500";

  return (
    <div className="flex flex-col gap-6">
      {/* Hero card */}
      <div className="rounded-2xl border bg-gradient-to-br from-primary/10 via-card to-card p-6 text-center">
        <div className={cn("text-6xl font-bold mb-1", scoreColor)}>
          {totalScore}
        </div>
        <div className="text-muted-foreground text-sm mb-1">out of {maxScore} marks</div>
        <div className="text-xs text-muted-foreground">{testConfig.title}</div>

        <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs">
          <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-emerald-600 dark:text-emerald-400 font-medium">
            {accuracy}% accuracy
          </span>
          {testConfig.exam === "JEE_MAIN" && (
            <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-blue-600 dark:text-blue-400 font-medium">
              Estimated percentile: {predictPercentile(totalScore, maxScore)}
            </span>
          )}
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { icon: TrendingUp, label: "Attempted", value: `${attempted}/${questions.length}`, color: "text-primary" },
          { icon: CheckCircle, label: "Correct", value: correct, color: "text-emerald-500" },
          { icon: XCircle, label: "Incorrect", value: incorrect, color: "text-red-500" },
          { icon: Clock, label: "Time taken", value: formatTime(durationSeconds), color: "text-amber-500" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border bg-card/60 p-4 flex flex-col items-center gap-1">
            <s.icon className={cn("h-5 w-5", s.color)} />
            <div className="text-xl font-bold">{s.value}</div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Chapter breakdown */}
      {chapterMap.size > 1 && (
        <div className="rounded-xl border bg-card/60 p-4 flex flex-col gap-3">
          <div className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Chapter Analysis
          </div>
          {Array.from(chapterMap.entries()).map(([, data]) => {
            const pct = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;
            return (
              <div key={data.title} className="flex items-center gap-3">
                <div className="w-28 shrink-0 text-xs truncate">{data.title}</div>
                <Progress value={pct} className="flex-1 h-2" />
                <div className="text-xs text-muted-foreground w-20 text-right shrink-0">
                  {data.correct}/{data.total} ({pct}%)
                </div>
                <div
                  className={cn(
                    "text-xs font-bold w-10 text-right shrink-0",
                    data.score > 0 ? "text-emerald-500" : data.score < 0 ? "text-red-500" : "text-muted-foreground"
                  )}
                >
                  {data.score > 0 ? `+${data.score}` : data.score}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Per-question review */}
      <div className="flex flex-col gap-2">
        <div className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Question Review
        </div>
        {results.map((r, i) => (
          <div
            key={r.question.id}
            className={cn(
              "rounded-xl border overflow-hidden",
              r.correct === true
                ? "border-emerald-500/20"
                : r.correct === false
                ? "border-red-500/20"
                : "border-border"
            )}
          >
            <button
              onClick={() => setExpandedIdx(expandedIdx === i ? null : i)}
              className={cn(
                "w-full flex items-start gap-3 px-4 py-3 text-sm text-left transition-colors",
                r.correct === true
                  ? "bg-emerald-500/5 hover:bg-emerald-500/10"
                  : r.correct === false
                  ? "bg-red-500/5 hover:bg-red-500/10"
                  : "bg-card/40 hover:bg-card/80"
              )}
            >
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-card border text-xs font-bold mt-0.5">
                {i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs text-muted-foreground mb-0.5">{r.sectionName}</div>
                <div className="text-xs line-clamp-1">
                  {r.question.content.replace(/\$[^$]+\$/g, "[math]")}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span
                  className={cn(
                    "text-xs font-bold",
                    r.score > 0 ? "text-emerald-500" : r.score < 0 ? "text-red-500" : "text-muted-foreground"
                  )}
                >
                  {r.score > 0 ? `+${r.score}` : r.score === 0 ? "0" : r.score}
                </span>
                {r.correct === true && <CheckCircle className="h-4 w-4 text-emerald-500" />}
                {r.correct === false && <XCircle className="h-4 w-4 text-red-500" />}
                {r.correct === null && <Minus className="h-4 w-4 text-muted-foreground" />}
                <ChevronDown
                  className={cn(
                    "h-3.5 w-3.5 text-muted-foreground transition-transform",
                    expandedIdx === i && "rotate-180"
                  )}
                />
              </div>
            </button>

            {expandedIdx === i && (
              <div className="px-4 pb-4 pt-2 border-t border-border/60 flex flex-col gap-3 text-sm">
                {/* Question */}
                <div className="text-sm leading-relaxed">
                  <KatexRenderer content={r.question.content} />
                </div>

                {/* Options with correct/wrong highlight */}
                {r.question.options && (
                  <div className="grid gap-1.5">
                    {r.question.options.map((opt) => {
                      const correctArr = Array.isArray(r.question.correctAnswer)
                        ? (r.question.correctAnswer as string[])
                        : [String(r.question.correctAnswer)];
                      const isCorrectOpt = correctArr.includes(opt.id);
                      const isUserSelected = Array.isArray(r.submitted)
                        ? (r.submitted as string[]).includes(opt.id)
                        : String(r.submitted) === opt.id;
                      return (
                        <div
                          key={opt.id}
                          className={cn(
                            "flex items-start gap-2 rounded-lg border px-3 py-2 text-xs",
                            isCorrectOpt
                              ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                              : isUserSelected && !isCorrectOpt
                              ? "border-red-500/40 bg-red-500/10 text-red-700 dark:text-red-300"
                              : "border-border/40"
                          )}
                        >
                          <span className="font-bold shrink-0">{opt.id}.</span>
                          <KatexRenderer content={opt.content} />
                          {isCorrectOpt && (
                            <CheckCircle className="h-3.5 w-3.5 shrink-0 ml-auto text-emerald-500" />
                          )}
                          {isUserSelected && !isCorrectOpt && (
                            <XCircle className="h-3.5 w-3.5 shrink-0 ml-auto text-red-500" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Integer answer */}
                {(r.question.type === "INTEGER" || r.question.type === "NUMERICAL") && (
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-muted-foreground">Your answer:</span>
                    <Badge variant={r.correct === true ? "default" : "destructive"} className="text-xs">
                      {r.submitted !== null ? String(r.submitted) : "Not answered"}
                    </Badge>
                    {r.correct !== true && (
                      <>
                        <span className="text-muted-foreground">Correct:</span>
                        <Badge variant="outline" className="text-xs border-emerald-500/40 text-emerald-600 dark:text-emerald-400">
                          {String(r.question.correctAnswer)}
                        </Badge>
                      </>
                    )}
                  </div>
                )}

                {/* Solution */}
                <div className="rounded-lg border border-primary/20 bg-primary/5 px-3 py-2.5">
                  <div className="text-xs font-semibold mb-1">Solution</div>
                  <div className="text-xs leading-relaxed">
                    <KatexRenderer content={r.question.solution} />
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button onClick={onRetake} className="flex-1" size="lg">
          <RotateCcw className="h-4 w-4 mr-2" />
          Retake Test
        </Button>
      </div>
    </div>
  );
}
