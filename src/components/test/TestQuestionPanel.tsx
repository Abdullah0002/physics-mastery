"use client";

import { Flag, FlagOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { KatexRenderer } from "@/components/practice/KatexRenderer";
import type { Question } from "@/types";

interface TestQuestionPanelProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  sectionName: string;
  currentAnswer: string | string[] | number | undefined;
  isFlagged: boolean;
  onAnswer: (answer: string | string[] | number | null) => void;
  onToggleFlag: () => void;
}

const OPTION_IDS = ["A", "B", "C", "D"] as const;

export function TestQuestionPanel({
  question,
  questionNumber,
  totalQuestions,
  sectionName,
  currentAnswer,
  isFlagged,
  onAnswer,
  onToggleFlag,
}: TestQuestionPanelProps) {
  const isMultiple = question.type === "MCQ_MULTIPLE";
  const isInteger =
    question.type === "INTEGER" || question.type === "NUMERICAL";

  function handleOptionClick(optId: string) {
    if (isMultiple) {
      const current = Array.isArray(currentAnswer) ? (currentAnswer as string[]) : [];
      const next = current.includes(optId)
        ? current.filter((x) => x !== optId)
        : [...current, optId];
      onAnswer(next.length > 0 ? next : null);
    } else {
      // single correct — clicking same option deselects
      onAnswer(currentAnswer === optId ? null : optId);
    }
  }

  function handleIntegerChange(val: string) {
    if (val.trim() === "") {
      onAnswer(null);
    } else {
      onAnswer(Number(val));
    }
  }

  function clearResponse() {
    onAnswer(null);
  }

  const integerVal =
    currentAnswer !== undefined && !Array.isArray(currentAnswer)
      ? String(currentAnswer)
      : "";

  const difficultyColors: Record<string, string> = {
    EASY: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    MEDIUM: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    HARD: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
    ADVANCED: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Meta row */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-semibold text-muted-foreground">
            Q{questionNumber} / {totalQuestions}
          </span>
          <Badge variant="outline" className="text-xs">{sectionName}</Badge>
          <Badge
            variant="outline"
            className={cn("text-xs border", difficultyColors[question.difficulty] ?? "")}
          >
            {question.difficulty}
          </Badge>
          {question.chapter && (
            <Badge variant="secondary" className="text-xs">
              {question.chapter.title}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
            +{question.marks}
          </span>
          {question.negativeMarks > 0 && (
            <span className="text-xs text-red-500 font-medium">
              −{question.negativeMarks}
            </span>
          )}
        </div>
      </div>

      {/* Question content */}
      <div className="rounded-xl border bg-card/60 p-5 text-base leading-relaxed">
        <KatexRenderer content={question.content} />
      </div>

      {/* Multi-correct hint */}
      {isMultiple && (
        <p className="text-xs text-amber-600 dark:text-amber-400 font-medium">
          One or more options may be correct.
        </p>
      )}

      {/* MCQ Options */}
      {question.options && question.options.length > 0 && (
        <div className="grid grid-cols-1 gap-2.5">
          {question.options.map((opt) => {
            const isSelected = Array.isArray(currentAnswer)
              ? (currentAnswer as string[]).includes(opt.id)
              : currentAnswer === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => handleOptionClick(opt.id)}
                className={cn(
                  "w-full text-left rounded-xl border px-4 py-3.5 text-sm transition-all duration-100",
                  "flex items-start gap-3",
                  isSelected
                    ? "border-primary bg-primary/10"
                    : "border-border bg-card/40 hover:border-primary/60 hover:bg-primary/5"
                )}
              >
                <span
                  className={cn(
                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-bold",
                    isSelected
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-muted-foreground/40 text-muted-foreground"
                  )}
                >
                  {opt.id}
                </span>
                <span className="leading-relaxed mt-0.5">
                  <KatexRenderer content={opt.content} />
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Integer input */}
      {isInteger && (
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-muted-foreground">
            Enter numerical answer:
          </label>
          <input
            type="number"
            value={integerVal}
            onChange={(e) => handleIntegerChange(e.target.value)}
            placeholder="Type your answer…"
            className={cn(
              "flex h-11 w-full max-w-xs rounded-xl border bg-card px-4 text-base",
              "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary",
              "transition-colors"
            )}
          />
        </div>
      )}

      {/* Bottom action row */}
      <div className="flex items-center justify-between pt-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onToggleFlag}
          className={cn(
            isFlagged
              ? "border-amber-500/60 text-amber-600 dark:text-amber-400 bg-amber-500/10 hover:bg-amber-500/20"
              : ""
          )}
        >
          {isFlagged ? (
            <>
              <FlagOff className="h-3.5 w-3.5 mr-1.5" /> Unmark
            </>
          ) : (
            <>
              <Flag className="h-3.5 w-3.5 mr-1.5" /> Mark for Review
            </>
          )}
        </Button>

        {currentAnswer !== undefined && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearResponse}
            className="text-muted-foreground hover:text-foreground"
          >
            Clear Response
          </Button>
        )}
      </div>
    </div>
  );
}
