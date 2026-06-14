"use client";

import { useState, useMemo } from "react";
import { BookOpen, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { QuestionDisplay } from "./QuestionDisplay";
import { useStopwatch } from "@/hooks/useTimer";
import {
  PYQ_ENTRIES,
  ALL_PYQ_YEARS,
  ALL_PYQ_CHAPTERS,
} from "@/config/pyq-data";
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

export function PYQExplorer() {
  const [examFilter, setExamFilter] = useState<ExamType | "ALL">("ALL");
  const [yearFilter, setYearFilter] = useState<number | "ALL">("ALL");
  const [chapterFilter, setChapterFilter] = useState<string | "ALL">("ALL");
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Map<string, string | string[] | number>>(new Map());
  const { elapsed, start, reset } = useStopwatch(false);

  const filtered = useMemo(
    () =>
      PYQ_ENTRIES.filter((p) => {
        if (examFilter !== "ALL" && p.exam !== examFilter) return false;
        if (yearFilter !== "ALL" && p.year !== yearFilter) return false;
        if (chapterFilter !== "ALL" && p.chapterSlug !== chapterFilter) return false;
        return true;
      }),
    [examFilter, yearFilter, chapterFilter]
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

  return (
    <div className="flex flex-col gap-6">
      {/* Filters */}
      <div className="rounded-xl border bg-card/60 p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between text-sm font-semibold text-muted-foreground">
          <span>Filters</span>
          <span className="font-normal text-xs">{filtered.length} questions</span>
        </div>

        <div className="flex flex-col gap-2">
          <div className="text-xs text-muted-foreground">Exam</div>
          <div className="flex flex-wrap gap-1.5">
            <Chip label="All Exams" active={examFilter === "ALL"} onClick={() => setExamFilter("ALL")} />
            {(["JEE_MAIN", "JEE_ADVANCED", "NEET"] as ExamType[]).map((e) => (
              <Chip
                key={e}
                label={EXAM_LABELS[e]}
                active={examFilter === e}
                onClick={() => setExamFilter(e)}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="text-xs text-muted-foreground">Year</div>
          <div className="flex flex-wrap gap-1.5">
            <Chip label="All Years" active={yearFilter === "ALL"} onClick={() => setYearFilter("ALL")} />
            {ALL_PYQ_YEARS.map((y) => (
              <Chip
                key={y}
                label={String(y)}
                active={yearFilter === y}
                onClick={() => setYearFilter(y)}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="text-xs text-muted-foreground">Chapter</div>
          <div className="flex flex-wrap gap-1.5">
            <Chip
              label="All Chapters"
              active={chapterFilter === "ALL"}
              onClick={() => setChapterFilter("ALL")}
            />
            {ALL_PYQ_CHAPTERS.map((ch) => (
              <Chip
                key={ch.slug}
                label={ch.title}
                active={chapterFilter === ch.slug}
                onClick={() => setChapterFilter(ch.slug)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-4 items-start">
        {/* Question list */}
        <div className="flex flex-col gap-2 lg:max-h-[70vh] lg:overflow-y-auto lg:pr-1">
          {filtered.length === 0 ? (
            <div className="rounded-xl border bg-card/60 p-8 text-center text-sm text-muted-foreground">
              <Search className="h-8 w-8 mx-auto mb-3 opacity-40" />
              No questions match the selected filters.
            </div>
          ) : (
            filtered.map((pyq, i) => {
              const answered = answers.has(pyq.id);
              return (
                <button
                  key={pyq.id}
                  onClick={() => openQuestion(i)}
                  className={cn(
                    "w-full text-left rounded-xl border p-3.5 transition-all text-sm",
                    selectedIdx === i
                      ? "border-primary bg-primary/5"
                      : "border-border bg-card/60 hover:border-primary/60"
                  )}
                >
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <Badge
                      variant="outline"
                      className={cn("text-xs border", EXAM_COLORS[pyq.exam] ?? "")}
                    >
                      {EXAM_LABELS[pyq.exam]}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {pyq.year}
                    </Badge>
                    {answered && (
                      <Badge
                        variant="outline"
                        className="text-xs border-emerald-500/30 text-emerald-600 dark:text-emerald-400 ml-auto"
                      >
                        Solved
                      </Badge>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground mb-1">{pyq.chapterTitle}</div>
                  <div className="text-xs line-clamp-2 leading-relaxed">
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
              <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground/40" />
              <div className="text-muted-foreground">
                Select a question from the list to start practising.
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border bg-card/80 p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-4 pb-4 border-b border-border/60 flex-wrap">
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
                <span className="text-xs text-muted-foreground ml-auto">
                  {filtered[selectedIdx]!.chapterTitle}
                </span>
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
