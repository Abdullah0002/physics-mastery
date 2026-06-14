"use client";

import { useState, useMemo } from "react";
import { BookOpen, Search, Repeat2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { QuestionDisplay } from "@/components/practice/QuestionDisplay";
import { useStopwatch } from "@/hooks/useTimer";
import { getPYQsByChapter } from "@/config/pyq-data";
import type { ExamType, Question, QuestionOption } from "@/types";
import type { PYQEntry } from "@/config/pyq-data";

function pyqToQuestion(p: PYQEntry): Question {
  return {
    id: p.id,
    content: p.content,
    options: p.options as QuestionOption[] | null,
    correctAnswer: p.correctAnswer,
    solution: p.solution,
    hint: p.hint,
    explanation: p.explanation,
    type: p.type,
    difficulty: p.difficulty,
    chapterId: p.chapterSlug,
    topicId: null,
    tags: p.tags,
    marks: p.marks,
    negativeMarks: p.negativeMarks,
    timeToSolve: null,
    isVerified: true,
    isStarred: false,
    chapter: { id: p.chapterSlug, title: p.chapterTitle, slug: p.chapterSlug },
  };
}

const EXAM_LABELS: Record<ExamType, string> = {
  JEE_MAIN: "JEE Main",
  JEE_ADVANCED: "JEE Advanced",
  NEET: "NEET",
  BITSAT: "BITSAT",
  INTERNAL: "Internal",
};

const EXAM_COLORS: Record<string, string> = {
  JEE_MAIN: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30",
  JEE_ADVANCED: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30",
  NEET: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
};

function Chip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1 text-xs font-medium transition-all",
        active
          ? "border-primary bg-primary text-primary-foreground shadow-sm"
          : "border-border bg-card/60 text-muted-foreground hover:border-primary/60 hover:text-foreground"
      )}
    >
      {label}
    </button>
  );
}

interface ChapterPYQBrowserProps {
  chapterSlug: string;
  chapterTitle: string;
}

export function ChapterPYQBrowser({ chapterSlug, chapterTitle }: ChapterPYQBrowserProps) {
  const pyqs = useMemo(() => getPYQsByChapter(chapterSlug), [chapterSlug]);

  const availableYears = useMemo(
    () => [...new Set(pyqs.map((p) => p.year))].sort((a, b) => b - a),
    [pyqs]
  );

  const availableExams = useMemo(
    () => [...new Set(pyqs.map((p) => p.exam))] as ExamType[],
    [pyqs]
  );

  const [examFilter, setExamFilter] = useState<ExamType | "ALL">("ALL");
  const [yearFilter, setYearFilter] = useState<number | "ALL">("ALL");
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Map<string, string | string[] | number>>(new Map());
  const { elapsed, start, reset } = useStopwatch(false);

  const filtered = useMemo(
    () =>
      pyqs.filter((p) => {
        if (examFilter !== "ALL" && p.exam !== examFilter) return false;
        if (yearFilter !== "ALL" && p.year !== yearFilter) return false;
        return true;
      }),
    [pyqs, examFilter, yearFilter]
  );

  function openQuestion(idx: number) {
    setSelectedIdx(idx);
    if (!answers.has(filtered[idx]!.id)) {
      reset();
      start();
    }
  }

  function handleAnswer(answer: string | string[] | number) {
    const pyq = filtered[selectedIdx!];
    if (!pyq) return;
    setAnswers((prev) => new Map(prev).set(pyq.id, answer));
  }

  if (pyqs.length === 0) {
    return (
      <div className="rounded-2xl border bg-card/60 p-12 text-center">
        <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground/30" />
        <h3 className="font-semibold mb-1">No PYQs Yet</h3>
        <p className="text-sm text-muted-foreground max-w-sm mx-auto">
          Previous year questions for <strong>{chapterTitle}</strong> will be added when the
          database is seeded with the full question bank.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Filters */}
      <div className="rounded-xl border bg-card/60 p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Filters
          </span>
          <span className="text-xs text-muted-foreground">{filtered.length} questions</span>
        </div>

        {availableExams.length > 1 && (
          <div className="flex flex-col gap-1.5">
            <span className="text-xs text-muted-foreground">Exam</span>
            <div className="flex flex-wrap gap-1.5">
              <Chip label="All Exams" active={examFilter === "ALL"} onClick={() => setExamFilter("ALL")} />
              {availableExams.map((e) => (
                <Chip
                  key={e}
                  label={EXAM_LABELS[e]}
                  active={examFilter === e}
                  onClick={() => setExamFilter(e)}
                />
              ))}
            </div>
          </div>
        )}

        {availableYears.length > 1 && (
          <div className="flex flex-col gap-1.5">
            <span className="text-xs text-muted-foreground">Year</span>
            <div className="flex flex-wrap gap-1.5">
              <Chip label="All Years" active={yearFilter === "ALL"} onClick={() => setYearFilter("ALL")} />
              {availableYears.map((y) => (
                <Chip
                  key={y}
                  label={String(y)}
                  active={yearFilter === y}
                  onClick={() => setYearFilter(y)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4 items-start">
        {/* Question list */}
        <div className="flex flex-col gap-2 lg:sticky lg:top-20">
          {filtered.length === 0 ? (
            <div className="rounded-xl border bg-card/60 p-8 text-center text-sm text-muted-foreground">
              <Search className="h-6 w-6 mx-auto mb-2 opacity-30" />
              No questions match the filters.
            </div>
          ) : (
            filtered.map((pyq, i) => {
              const answered = answers.has(pyq.id);
              return (
                <button
                  key={pyq.id}
                  onClick={() => openQuestion(i)}
                  className={cn(
                    "w-full text-left rounded-xl border p-3 transition-all text-sm",
                    selectedIdx === i
                      ? "border-primary bg-primary/5"
                      : "border-border bg-card/60 hover:border-primary/60"
                  )}
                >
                  <div className="flex items-center gap-1.5 flex-wrap mb-1.5">
                    <Badge
                      variant="outline"
                      className={cn("text-xs border", EXAM_COLORS[pyq.exam] ?? "")}
                    >
                      {EXAM_LABELS[pyq.exam]}
                    </Badge>
                    <Badge variant="outline" className="text-xs">{pyq.year}</Badge>
                    {pyq.isRepeat && (
                      <span
                        className="flex items-center gap-0.5 text-xs text-amber-600 dark:text-amber-400"
                        title={`Also appeared in ${pyq.repeatYears.join(", ")}`}
                      >
                        <Repeat2 className="h-3 w-3" /> Repeat
                      </span>
                    )}
                    {answered && (
                      <Badge
                        variant="outline"
                        className="text-xs border-emerald-500/30 text-emerald-600 dark:text-emerald-400 ml-auto"
                      >
                        Solved
                      </Badge>
                    )}
                  </div>
                  <div className="text-xs line-clamp-2 leading-relaxed text-muted-foreground">
                    {pyq.content.replace(/\$[^$]+\$/g, "[math]")}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Question panel */}
        <div>
          {selectedIdx === null ? (
            <div className="rounded-2xl border bg-card/60 p-12 text-center">
              <BookOpen className="h-10 w-10 mx-auto mb-3 text-muted-foreground/30" />
              <p className="text-sm text-muted-foreground">
                Select a question from the list to practise.
              </p>
            </div>
          ) : (
            <div className="rounded-2xl border bg-card/80 p-5 sm:p-6">
              {/* PYQ metadata bar */}
              <div className="flex items-center gap-2 flex-wrap mb-4 pb-4 border-b border-border/60">
                <Badge
                  variant="outline"
                  className={cn("border", EXAM_COLORS[filtered[selectedIdx]!.exam] ?? "")}
                >
                  {EXAM_LABELS[filtered[selectedIdx]!.exam]}
                </Badge>
                <Badge variant="outline">{filtered[selectedIdx]!.year}</Badge>
                {filtered[selectedIdx]!.session && (
                  <span className="text-xs text-muted-foreground">
                    {filtered[selectedIdx]!.session}
                  </span>
                )}
                {filtered[selectedIdx]!.isRepeat && (
                  <Badge
                    variant="outline"
                    className="border-amber-500/30 text-amber-600 dark:text-amber-400"
                  >
                    <Repeat2 className="h-3 w-3 mr-1" />
                    Repeat — {filtered[selectedIdx]!.repeatYears.join(", ")}
                  </Badge>
                )}
              </div>

              <QuestionDisplay
                key={filtered[selectedIdx]!.id}
                question={pyqToQuestion(filtered[selectedIdx]!)}
                questionNumber={selectedIdx + 1}
                totalQuestions={filtered.length}
                elapsedSeconds={elapsed}
                onAnswer={handleAnswer}
                submittedAnswer={answers.get(filtered[selectedIdx]!.id) ?? null}
              />

              <div className="flex items-center justify-between mt-6 pt-4 border-t border-border/60">
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={selectedIdx === 0}
                  onClick={() => openQuestion(selectedIdx - 1)}
                >
                  ← Previous
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={selectedIdx === filtered.length - 1}
                  onClick={() => openQuestion(selectedIdx + 1)}
                >
                  Next →
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
