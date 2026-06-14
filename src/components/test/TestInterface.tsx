"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, AlertCircle, Clock, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useCountdownTimer } from "@/hooks/useTimer";
import { TestPalette } from "./TestPalette";
import { TestQuestionPanel } from "./TestQuestionPanel";
import { TestResults } from "./TestResults";
import type { MockTestConfig, FlatQuestion } from "@/config/mock-tests";
import { getTestQuestions, getTotalMarks } from "@/config/mock-tests";

type Phase = "briefing" | "active" | "submitted";

interface TestInterfaceProps {
  testConfig: MockTestConfig;
}

export function TestInterface({ testConfig }: TestInterfaceProps) {
  const [phase, setPhase] = useState<Phase>("briefing");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Map<string, string | string[] | number>>(new Map());
  const [flagged, setFlagged] = useState<Set<string>>(new Set());
  const [visited, setVisited] = useState<Set<string>>(new Set());
  const [showConfirm, setShowConfirm] = useState(false);
  const [showPalette, setShowPalette] = useState(false);
  const [testStart, setTestStart] = useState(0);
  const [elapsedOnSubmit, setElapsedOnSubmit] = useState(0);

  const questions: FlatQuestion[] = getTestQuestions(testConfig.id);
  const currentFQ = questions[currentIdx];

  const durationSeconds = testConfig.durationMinutes * 60;
  const { formatted, remaining, isCritical, isWarning, start, pause } =
    useCountdownTimer({
      initialSeconds: durationSeconds,
      autoStart: false,
      onExpire: () => handleSubmit(true),
    });

  // Mark question as visited when navigating to it
  useEffect(() => {
    if (phase !== "active" || !currentFQ) return;
    setVisited((prev) => {
      const next = new Set(Array.from(prev));
      next.add(currentFQ.question.id);
      return next;
    });
  }, [currentIdx, phase, currentFQ]);

  function startTest() {
    setPhase("active");
    setTestStart(Date.now());
    start();
  }

  const handleSubmit = useCallback(
    (autoSubmit = false) => {
      if (!autoSubmit) setShowConfirm(false);
      const elapsed = Math.round((Date.now() - testStart) / 1000);
      setElapsedOnSubmit(elapsed);
      pause();
      setPhase("submitted");
    },
    [testStart, pause]
  );

  function handleAnswer(answer: string | string[] | number | null) {
    if (!currentFQ) return;
    const qid = currentFQ.question.id;
    setAnswers((prev) => {
      const next = new Map(prev);
      if (answer === null) next.delete(qid);
      else next.set(qid, answer);
      return next;
    });
  }

  function toggleFlag() {
    if (!currentFQ) return;
    const qid = currentFQ.question.id;
    setFlagged((prev) => {
      const next = new Set(Array.from(prev));
      if (next.has(qid)) next.delete(qid);
      else next.add(qid);
      return next;
    });
  }

  function goTo(idx: number) {
    if (idx < 0 || idx >= questions.length) return;
    setCurrentIdx(idx);
    setShowPalette(false);
  }

  function retake() {
    setPhase("briefing");
    setCurrentIdx(0);
    setAnswers(new Map());
    setFlagged(new Set());
    setVisited(new Set());
  }

  const answeredCount = answers.size;
  const progress = questions.length > 0
    ? Math.round((answeredCount / questions.length) * 100)
    : 0;

  // ── Briefing ─────────────────────────────────────────────────────────────
  if (phase === "briefing") {
    const totalMarks = getTotalMarks(testConfig);
    const examColors: Record<string, string> = {
      JEE_MAIN: "from-blue-500/10",
      JEE_ADVANCED: "from-purple-500/10",
      NEET: "from-emerald-500/10",
    };

    return (
      <div
        className={cn(
          "rounded-2xl border bg-gradient-to-br via-card to-card p-8",
          examColors[testConfig.exam] ?? "from-primary/10"
        )}
      >
        <div className="max-w-2xl mx-auto flex flex-col gap-6">
          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
              {testConfig.exam.replace("_", " ")} · {testConfig.difficulty}
            </div>
            <h1 className="text-2xl font-bold">{testConfig.title}</h1>
            <p className="text-muted-foreground mt-2 text-sm">{testConfig.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 text-sm">
            {[
              { label: "Questions", value: questions.length },
              { label: "Duration", value: `${testConfig.durationMinutes} min` },
              { label: "Max Marks", value: totalMarks },
              {
                label: "Sections",
                value: testConfig.sections.length,
              },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-xl border bg-card/60 p-3 flex flex-col gap-0.5"
              >
                <span className="text-xl font-bold">{s.value}</span>
                <span className="text-xs text-muted-foreground">{s.label}</span>
              </div>
            ))}
          </div>

          {/* Marking scheme */}
          <div className="rounded-xl border bg-card/60 p-4 flex flex-col gap-2 text-sm">
            <div className="font-semibold text-sm">Marking Scheme</div>
            {testConfig.sections.map((sec) => (
              <div key={sec.name} className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{sec.name}</span>
                <div className="flex gap-3">
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                    +{sec.marksPerCorrect} correct
                  </span>
                  {sec.negativeMarks > 0 && (
                    <span className="text-red-500 font-medium">
                      −{sec.negativeMarks} wrong
                    </span>
                  )}
                  {sec.negativeMarks === 0 && (
                    <span className="text-muted-foreground">no negative</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 px-4 py-3 text-xs text-amber-700 dark:text-amber-300 flex items-start gap-2">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>
              Once started, the timer cannot be paused. Complete the test in one sitting.
              Auto-submit when time expires.
            </span>
          </div>

          <Button size="lg" onClick={startTest} className="w-full">
            Start Test
          </Button>
        </div>
      </div>
    );
  }

  // ── Results ───────────────────────────────────────────────────────────────
  if (phase === "submitted") {
    return (
      <TestResults
        testConfig={testConfig}
        questions={questions}
        answers={answers}
        durationSeconds={elapsedOnSubmit}
        onRetake={retake}
      />
    );
  }

  // ── Active Test ───────────────────────────────────────────────────────────
  if (!currentFQ) return null;

  return (
    <div className="flex flex-col gap-0 -mx-4 sm:-mx-6 lg:-mx-8">
      {/* Sticky header */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border/60 px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold truncate">{testConfig.title}</div>
          <div className="flex items-center gap-2 mt-0.5">
            <Progress value={progress} className="w-24 h-1.5" />
            <span className="text-xs text-muted-foreground">
              {answeredCount}/{questions.length} answered
            </span>
          </div>
        </div>

        {/* Timer */}
        <div
          className={cn(
            "flex items-center gap-1.5 font-mono text-lg font-bold tabular-nums px-3 py-1 rounded-lg border",
            isCritical
              ? "border-red-500/60 bg-red-500/10 text-red-600 dark:text-red-400"
              : isWarning
              ? "border-amber-500/60 bg-amber-500/10 text-amber-600 dark:text-amber-400"
              : "border-border bg-card/60"
          )}
        >
          <Clock className="h-4 w-4" />
          {formatted}
        </div>

        {/* Palette toggle (mobile) */}
        <button
          onClick={() => setShowPalette((v) => !v)}
          className="lg:hidden rounded-lg border border-border p-2"
        >
          {showPalette ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>

        <Button
          size="sm"
          onClick={() => setShowConfirm(true)}
          className="hidden sm:flex"
        >
          Submit Test
        </Button>
      </div>

      {/* Mobile palette overlay */}
      {showPalette && (
        <div className="lg:hidden fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
          <div className="absolute right-0 top-0 bottom-0 w-72 bg-background border-l border-border p-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <span className="font-semibold">Question Palette</span>
              <button onClick={() => setShowPalette(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <TestPalette
              questions={questions}
              currentIdx={currentIdx}
              answers={answers}
              flagged={flagged}
              visited={visited}
              onSelect={goTo}
            />
            <Button
              size="sm"
              className="w-full mt-4"
              onClick={() => setShowConfirm(true)}
            >
              Submit Test
            </Button>
          </div>
        </div>
      )}

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-0 min-h-[calc(100vh-8rem)]">
        {/* Question area */}
        <div className="px-4 sm:px-6 lg:px-8 py-6 border-r border-border/40">
          <TestQuestionPanel
            key={currentFQ.question.id}
            question={currentFQ.question}
            questionNumber={currentIdx + 1}
            totalQuestions={questions.length}
            sectionName={currentFQ.sectionName}
            currentAnswer={answers.get(currentFQ.question.id)}
            isFlagged={flagged.has(currentFQ.question.id)}
            onAnswer={handleAnswer}
            onToggleFlag={toggleFlag}
          />

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-4 border-t border-border/60">
            <Button
              variant="outline"
              disabled={currentIdx === 0}
              onClick={() => goTo(currentIdx - 1)}
            >
              <ChevronLeft className="h-4 w-4 mr-1" /> Previous
            </Button>
            <span className="text-xs text-muted-foreground">
              {currentIdx + 1} / {questions.length}
            </span>
            {currentIdx < questions.length - 1 ? (
              <Button onClick={() => goTo(currentIdx + 1)}>
                Save & Next <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            ) : (
              <Button onClick={() => setShowConfirm(true)}>
                Submit Test
              </Button>
            )}
          </div>
        </div>

        {/* Sidebar palette (desktop) */}
        <div className="hidden lg:block px-4 py-6 border-l border-border/40 overflow-y-auto max-h-[calc(100vh-6rem)] sticky top-20">
          <TestPalette
            questions={questions}
            currentIdx={currentIdx}
            answers={answers}
            flagged={flagged}
            visited={visited}
            onSelect={goTo}
          />
          <Button
            className="w-full mt-4"
            onClick={() => setShowConfirm(true)}
          >
            Submit Test
          </Button>
        </div>
      </div>

      {/* Submit confirmation overlay */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm px-4">
          <div className="w-full max-w-sm rounded-2xl border bg-background shadow-2xl p-6 flex flex-col gap-4">
            <h3 className="text-lg font-semibold">Submit Test?</h3>
            <div className="text-sm text-muted-foreground flex flex-col gap-1">
              <span>
                Answered: <strong>{answeredCount}</strong> / {questions.length}
              </span>
              <span>
                Unanswered: <strong>{questions.length - answeredCount}</strong>
              </span>
              <span>
                Time remaining:{" "}
                <strong
                  className={isCritical ? "text-red-500" : isWarning ? "text-amber-500" : ""}
                >
                  {formatted}
                </strong>
              </span>
            </div>
            {questions.length - answeredCount > 0 && (
              <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/5 px-3 py-2 text-xs text-amber-700 dark:text-amber-300">
                <AlertCircle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                You have {questions.length - answeredCount} unanswered question
                {questions.length - answeredCount !== 1 ? "s" : ""}. They will be marked as skipped.
              </div>
            )}
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowConfirm(false)}
              >
                Continue
              </Button>
              <Button className="flex-1" onClick={() => handleSubmit(false)}>
                Submit
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
