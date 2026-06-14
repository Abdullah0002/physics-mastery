"use client";

import { useState, useCallback, useMemo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  BookCheck,
  CheckCircle,
  XCircle,
  Circle,
  PlayCircle,
  Timer,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { QuestionDisplay } from "./QuestionDisplay";
import { PracticeFilters, type PracticeFilterState } from "./PracticeFilters";
import { SessionSummary, type QuestionResult } from "./SessionSummary";
import { useStopwatch } from "@/hooks/useTimer";
import { SAMPLE_QUESTIONS } from "@/config/sample-questions";
import type { Question } from "@/types";

function isAnswerCorrect(
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

// Map from SAMPLE_CHAPTER_SLUGS to readable titles
const CHAPTER_META = [
  ...new Set(SAMPLE_QUESTIONS.map((q) => q.chapterId)),
].map((slug) => ({
  slug,
  title:
    SAMPLE_QUESTIONS.find((q) => q.chapterId === slug)?.chapter?.title ?? slug,
}));

type SessionState = "idle" | "active" | "finished";

export function PracticeInterface({ initialChapterSlug }: { initialChapterSlug?: string } = {}) {
  const [sessionState, setSessionState] = useState<SessionState>("idle");
  const [filters, setFilters] = useState<PracticeFilterState>({
    difficulty: "ALL",
    type: "ALL",
    chapterSlug: initialChapterSlug ?? "ALL",
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<
    Map<string, string | string[] | number>
  >(new Map());
  const [questionTimings, setQuestionTimings] = useState<Map<string, number>>(
    new Map()
  );
  const [questionStartTime, setQuestionStartTime] = useState(0);

  const { elapsed, start: startTimer, pause: pauseTimer, reset: resetTimer } = useStopwatch(false);

  // Filtered question list
  const questions: Question[] = useMemo(() => {
    return SAMPLE_QUESTIONS.filter((q) => {
      if (filters.difficulty !== "ALL" && q.difficulty !== filters.difficulty)
        return false;
      if (filters.type !== "ALL" && q.type !== filters.type) return false;
      if (
        filters.chapterSlug !== "ALL" &&
        q.chapterId !== filters.chapterSlug
      )
        return false;
      return true;
    });
  }, [filters]);

  const currentQuestion = questions[currentIndex];

  function startSession() {
    setCurrentIndex(0);
    setAnswers(new Map());
    setQuestionTimings(new Map());
    setQuestionStartTime(elapsed);
    resetTimer();
    startTimer();
    setSessionState("active");
  }

  function handleAnswer(answer: string | string[] | number) {
    if (!currentQuestion) return;
    const timeSpent = elapsed - questionStartTime;
    setAnswers((prev) => new Map(prev).set(currentQuestion.id, answer));
    setQuestionTimings((prev) =>
      new Map(prev).set(currentQuestion.id, timeSpent)
    );
  }

  const goToQuestion = useCallback(
    (index: number) => {
      if (!currentQuestion) return;
      // Save timing for current question if not already answered
      if (!answers.has(currentQuestion.id)) {
        const timeSpent = elapsed - questionStartTime;
        setQuestionTimings((prev) =>
          new Map(prev).set(currentQuestion.id, timeSpent)
        );
      }
      setQuestionStartTime(elapsed);
      setCurrentIndex(index);
    },
    [currentQuestion, answers, elapsed, questionStartTime]
  );

  function handleFinish() {
    pauseTimer();
    setSessionState("finished");
  }

  function handleRestart() {
    resetTimer();
    setAnswers(new Map());
    setQuestionTimings(new Map());
    setCurrentIndex(0);
    setSessionState("idle");
  }

  const results: QuestionResult[] = useMemo(
    () =>
      questions.map((q) => {
        const submitted = answers.get(q.id) ?? null;
        const isCorrect =
          submitted !== null
            ? isAnswerCorrect(submitted, q.correctAnswer)
            : null;
        return {
          question: q,
          submitted,
          isCorrect,
          timeSpent: questionTimings.get(q.id) ?? 0,
        };
      }),
    [questions, answers, questionTimings]
  );

  const answered = answers.size;
  const progress =
    questions.length > 0 ? Math.round((answered / questions.length) * 100) : 0;

  // ── Idle state ──────────────────────────────────────────────────────────────
  if (sessionState === "idle") {
    return (
      <div className="flex flex-col gap-6">
        <PracticeFilters
          filters={filters}
          onChange={setFilters}
          availableChapters={CHAPTER_META}
          questionCount={questions.length}
        />

        <div className="rounded-2xl border bg-gradient-to-br from-primary/5 via-card to-card p-8 text-center">
          <div className="mb-6 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10">
              <PlayCircle className="h-10 w-10 text-primary" />
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-2">
            Ready to Practice?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            {questions.length > 0
              ? `${questions.length} question${questions.length !== 1 ? "s" : ""} selected based on your filters. Each answer is checked immediately with full solution.`
              : "No questions match your current filters. Try adjusting them."}
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {filters.difficulty !== "ALL" && (
              <Badge variant="secondary">{filters.difficulty}</Badge>
            )}
            {filters.type !== "ALL" && (
              <Badge variant="secondary">{filters.type.replace("_", " ")}</Badge>
            )}
            {filters.chapterSlug !== "ALL" && (
              <Badge variant="secondary">
                {CHAPTER_META.find((c) => c.slug === filters.chapterSlug)?.title ??
                  filters.chapterSlug}
              </Badge>
            )}
          </div>
          <Button
            size="lg"
            onClick={startSession}
            disabled={questions.length === 0}
            className="px-10"
          >
            <PlayCircle className="mr-2 h-5 w-5" />
            Start Session
          </Button>
        </div>
      </div>
    );
  }

  // ── Finished state ──────────────────────────────────────────────────────────
  if (sessionState === "finished") {
    return <SessionSummary results={results} totalSeconds={elapsed} onRestart={handleRestart} />;
  }

  // ── Active session ──────────────────────────────────────────────────────────
  if (!currentQuestion) {
    return (
      <div className="text-center text-muted-foreground py-12">
        No questions available with current filters.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Session progress bar */}
      <div className="flex items-center gap-3">
        <Progress value={progress} className="flex-1 h-2" />
        <span className="text-xs text-muted-foreground whitespace-nowrap">
          {answered}/{questions.length} answered
        </span>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Timer className="h-3.5 w-3.5" />
          <span className="font-mono">{Math.floor(elapsed / 60)}:{String(elapsed % 60).padStart(2, "0")}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-4 items-start">
        {/* Question palette sidebar */}
        <div className="lg:sticky lg:top-20 flex flex-col gap-3">
          {/* Status legend */}
          <div className="rounded-xl border bg-card/60 p-3 flex flex-col gap-2">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
              Questions
            </div>
            <div className="grid grid-cols-6 gap-1.5">
              {questions.map((q, i) => {
                const ans = answers.get(q.id);
                const isCurrentQ = i === currentIndex;
                return (
                  <button
                    key={q.id}
                    onClick={() => goToQuestion(i)}
                    className={cn(
                      "h-8 w-full rounded-lg border text-xs font-bold transition-all",
                      isCurrentQ && "ring-2 ring-primary ring-offset-1",
                      ans !== undefined
                        ? isAnswerCorrect(ans, q.correctAnswer)
                          ? "border-emerald-500 bg-emerald-500/20 text-emerald-700 dark:text-emerald-300"
                          : "border-red-500 bg-red-500/20 text-red-700 dark:text-red-300"
                        : "border-border bg-card/40 text-muted-foreground hover:border-primary/60"
                    )}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>
            {/* Legend */}
            <div className="flex flex-wrap gap-2 mt-1">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <CheckCircle className="h-3 w-3 text-emerald-500" /> Correct
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <XCircle className="h-3 w-3 text-red-500" /> Wrong
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Circle className="h-3 w-3 text-muted-foreground" /> Unanswered
              </div>
            </div>
          </div>

          {/* Finish button */}
          <Button
            variant="outline"
            className="w-full"
            onClick={handleFinish}
          >
            <BookCheck className="h-4 w-4 mr-2" />
            Finish & Review
          </Button>
        </div>

        {/* Main question area */}
        <div className="rounded-2xl border bg-card/80 backdrop-blur-sm p-5 sm:p-6">
          <QuestionDisplay
            key={currentQuestion.id}
            question={currentQuestion}
            questionNumber={currentIndex + 1}
            totalQuestions={questions.length}
            elapsedSeconds={elapsed - questionStartTime}
            onAnswer={handleAnswer}
            submittedAnswer={answers.get(currentQuestion.id) ?? null}
          />

          {/* Prev / Next navigation */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-border/60">
            <Button
              variant="ghost"
              size="sm"
              disabled={currentIndex === 0}
              onClick={() => goToQuestion(currentIndex - 1)}
            >
              <ChevronLeft className="h-4 w-4 mr-1" /> Previous
            </Button>

            {currentIndex < questions.length - 1 ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => goToQuestion(currentIndex + 1)}
              >
                Next <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            ) : (
              <Button size="sm" onClick={handleFinish}>
                <BookCheck className="h-4 w-4 mr-1" /> Finish
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
