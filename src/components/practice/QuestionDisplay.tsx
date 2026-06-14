"use client";

import { useState } from "react";
import { CheckCircle, XCircle, Lightbulb, BookOpen, Clock, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { KatexRenderer } from "./KatexRenderer";
import type { Question } from "@/types";

interface QuestionDisplayProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  elapsedSeconds: number;
  onAnswer: (answer: string | string[] | number) => void;
  submittedAnswer?: string | string[] | number | null;
}

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function isAnswerCorrect(
  submitted: string | string[] | number,
  correct: string | string[] | number | { min: number; max: number }
): boolean {
  if (typeof correct === "object" && correct !== null && !Array.isArray(correct)) {
    // Numerical range
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

export function QuestionDisplay({
  question,
  questionNumber,
  totalQuestions,
  elapsedSeconds,
  onAnswer,
  submittedAnswer,
}: QuestionDisplayProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [integerInput, setIntegerInput] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [checked, setChecked] = useState(false);

  const isMultiple = question.type === "MCQ_MULTIPLE";
  const isInteger = question.type === "INTEGER" || question.type === "NUMERICAL";
  const hasBeenAnswered = submittedAnswer !== undefined && submittedAnswer !== null;

  const correct = hasBeenAnswered
    ? isAnswerCorrect(submittedAnswer as string | string[] | number, question.correctAnswer)
    : null;

  function handleOptionClick(optId: string) {
    if (hasBeenAnswered || checked) return;
    if (isMultiple) {
      setSelectedOptions((prev) =>
        prev.includes(optId) ? prev.filter((o) => o !== optId) : [...prev, optId]
      );
    } else {
      setSelectedOptions([optId]);
    }
  }

  function handleSubmit() {
    if (isInteger) {
      if (!integerInput.trim()) return;
      onAnswer(Number(integerInput));
    } else {
      if (selectedOptions.length === 0) return;
      if (isMultiple) {
        onAnswer(selectedOptions);
      } else {
        onAnswer(selectedOptions[0]!);
      }
    }
    setChecked(true);
  }

  function getOptionState(optId: string) {
    if (!checked && !hasBeenAnswered) return "default";
    const correctArr = Array.isArray(question.correctAnswer)
      ? question.correctAnswer
      : [String(question.correctAnswer)];
    const isCorrectOption = correctArr.includes(optId);
    const isSelected = hasBeenAnswered
      ? Array.isArray(submittedAnswer)
        ? (submittedAnswer as string[]).includes(optId)
        : String(submittedAnswer) === optId
      : selectedOptions.includes(optId);

    if (isCorrectOption) return "correct";
    if (isSelected && !isCorrectOption) return "wrong";
    return "default";
  }

  const difficultyColors: Record<string, string> = {
    EASY: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    MEDIUM: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    HARD: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
    ADVANCED: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
  };

  const typeLabel: Record<string, string> = {
    MCQ_SINGLE: "MCQ",
    MCQ_MULTIPLE: "Multi-Correct",
    INTEGER: "Integer",
    NUMERICAL: "Numerical",
    SUBJECTIVE: "Subjective",
    MATCH_COLUMN: "Match Column",
    ASSERTION_REASON: "Assertion-Reason",
    COMPREHENSION: "Comprehension",
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-semibold text-muted-foreground">
            Q{questionNumber} / {totalQuestions}
          </span>
          <Badge
            className={cn(
              "text-xs border",
              difficultyColors[question.difficulty] ?? ""
            )}
            variant="outline"
          >
            {question.difficulty}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {typeLabel[question.type] ?? question.type}
          </Badge>
          {question.chapter && (
            <Badge variant="secondary" className="text-xs">
              {question.chapter.title}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          <span className="font-mono">{formatTime(elapsedSeconds)}</span>
        </div>
      </div>

      {/* Marks info */}
      <div className="flex gap-3 text-xs text-muted-foreground">
        <span className="text-emerald-600 dark:text-emerald-400 font-medium">
          +{question.marks} marks
        </span>
        {question.negativeMarks > 0 && (
          <span className="text-red-500 font-medium">
            -{question.negativeMarks} negative
          </span>
        )}
        {question.type === "MCQ_MULTIPLE" && (
          <span className="text-amber-600 dark:text-amber-400">
            Select all correct options
          </span>
        )}
      </div>

      {/* Question content */}
      <div className="rounded-xl border bg-card/60 backdrop-blur-sm p-5 text-base leading-relaxed">
        <KatexRenderer content={question.content} />
      </div>

      {/* MCQ Options */}
      {question.options && question.options.length > 0 && (
        <div className="grid grid-cols-1 gap-2.5">
          {question.options.map((opt) => {
            const state = getOptionState(opt.id);
            return (
              <button
                key={opt.id}
                onClick={() => handleOptionClick(opt.id)}
                disabled={checked || hasBeenAnswered}
                className={cn(
                  "w-full text-left rounded-xl border px-4 py-3.5 text-sm transition-all duration-150",
                  "flex items-start gap-3",
                  !checked && !hasBeenAnswered && "hover:border-primary/60 hover:bg-primary/5 cursor-pointer",
                  selectedOptions.includes(opt.id) && !checked && !hasBeenAnswered &&
                    "border-primary bg-primary/10",
                  state === "correct" && "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
                  state === "wrong" && "border-red-500 bg-red-500/10 text-red-700 dark:text-red-300",
                  state === "default" && "border-border bg-card/40",
                  (checked || hasBeenAnswered) && "cursor-not-allowed opacity-90"
                )}
              >
                <span
                  className={cn(
                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-bold",
                    state === "correct" && "border-emerald-500 bg-emerald-500 text-white",
                    state === "wrong" && "border-red-500 bg-red-500 text-white",
                    state === "default" && selectedOptions.includes(opt.id)
                      ? "border-primary bg-primary text-primary-foreground"
                      : state === "default" ? "border-muted-foreground/40 text-muted-foreground" : ""
                  )}
                >
                  {opt.id}
                </span>
                <span className="leading-relaxed mt-0.5">
                  <KatexRenderer content={opt.content} />
                </span>
                {state === "correct" && (
                  <CheckCircle className="h-4 w-4 shrink-0 ml-auto mt-1 text-emerald-500" />
                )}
                {state === "wrong" && (
                  <XCircle className="h-4 w-4 shrink-0 ml-auto mt-1 text-red-500" />
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Integer Input */}
      {isInteger && (
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-muted-foreground">
            Enter your answer (integer or decimal):
          </label>
          <div className="flex gap-3">
            <input
              type="number"
              value={integerInput}
              onChange={(e) => setIntegerInput(e.target.value)}
              disabled={checked || hasBeenAnswered}
              placeholder="Enter numerical answer…"
              className={cn(
                "flex h-11 w-full max-w-xs rounded-xl border bg-card px-4 text-base",
                "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary",
                "disabled:cursor-not-allowed disabled:opacity-60",
                "transition-colors"
              )}
            />
            {(checked || hasBeenAnswered) && (
              <div className="flex items-center gap-2 text-sm font-medium">
                {correct ? (
                  <>
                    <CheckCircle className="h-5 w-5 text-emerald-500" />
                    <span className="text-emerald-600 dark:text-emerald-400">Correct!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-5 w-5 text-red-500" />
                    <span className="text-red-600 dark:text-red-400">
                      Answer: {String(question.correctAnswer)}
                    </span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Result banner for MCQ */}
      {(checked || hasBeenAnswered) && question.options && question.options.length > 0 && correct !== null && (
        <div
          className={cn(
            "flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium",
            correct
              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
              : "border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-300"
          )}
        >
          {correct ? (
            <>
              <CheckCircle className="h-4 w-4" /> Correct!
              {question.marks > 0 && (
                <span className="ml-auto text-xs">+{question.marks} marks</span>
              )}
            </>
          ) : (
            <>
              <XCircle className="h-4 w-4" />
              Incorrect
              {question.negativeMarks > 0 && (
                <span className="ml-auto text-xs">−{question.negativeMarks} marks</span>
              )}
            </>
          )}
        </div>
      )}

      {/* Submit Button */}
      {!checked && !hasBeenAnswered && (
        <Button
          onClick={handleSubmit}
          disabled={
            isInteger
              ? integerInput.trim() === ""
              : selectedOptions.length === 0
          }
          className="w-full sm:w-auto"
          size="lg"
        >
          Check Answer
        </Button>
      )}

      {/* Hint & Solution Toggles */}
      {(checked || hasBeenAnswered) && (
        <div className="flex flex-col gap-3 mt-1">
          {question.hint && (
            <div>
              <button
                onClick={() => setShowHint((v) => !v)}
                className="flex items-center gap-2 text-sm font-medium text-amber-600 dark:text-amber-400 hover:underline"
              >
                <Lightbulb className="h-4 w-4" />
                {showHint ? "Hide Hint" : "Show Hint"}
                <ChevronDown
                  className={cn("h-3.5 w-3.5 transition-transform", showHint && "rotate-180")}
                />
              </button>
              {showHint && (
                <div className="mt-2 rounded-xl border border-amber-500/30 bg-amber-500/5 px-4 py-3 text-sm">
                  <KatexRenderer content={question.hint} />
                </div>
              )}
            </div>
          )}

          <div>
            <button
              onClick={() => setShowSolution((v) => !v)}
              className="flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              <BookOpen className="h-4 w-4" />
              {showSolution ? "Hide Solution" : "View Full Solution"}
              <ChevronDown
                className={cn("h-3.5 w-3.5 transition-transform", showSolution && "rotate-180")}
              />
            </button>
            {showSolution && (
              <div className="mt-2 rounded-xl border border-primary/20 bg-primary/5 px-4 py-4 text-sm leading-relaxed space-y-2">
                <div className="font-semibold text-foreground mb-2">Solution</div>
                <KatexRenderer content={question.solution} />
                {question.explanation && (
                  <>
                    <div className="border-t border-border/60 pt-2 mt-2" />
                    <div className="font-semibold text-foreground text-xs uppercase tracking-wide text-muted-foreground">
                      Key Insight
                    </div>
                    <KatexRenderer content={question.explanation} />
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
