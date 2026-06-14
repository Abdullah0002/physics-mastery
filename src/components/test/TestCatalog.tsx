"use client";

import { useState } from "react";
import Link from "next/link";
import { Clock, BookOpen, ChevronRight, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MOCK_TESTS, getTotalMarks } from "@/config/mock-tests";
import type { ExamType } from "@/types";

const EXAM_CONFIG: Record<
  string,
  { label: string; color: string; bg: string; border: string }
> = {
  JEE_MAIN: {
    label: "JEE Main",
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
  },
  JEE_ADVANCED: {
    label: "JEE Advanced",
    color: "text-purple-600 dark:text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/30",
  },
  NEET: {
    label: "NEET",
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
  },
};

const DIFFICULTY_COLORS: Record<string, string> = {
  Beginner: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  Moderate: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  Advanced: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
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
        "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all",
        active
          ? "border-primary bg-primary text-primary-foreground shadow-sm"
          : "border-border bg-card/60 text-muted-foreground hover:border-primary/60 hover:text-foreground"
      )}
    >
      {label}
    </button>
  );
}

export function TestCatalog() {
  const [examFilter, setExamFilter] = useState<ExamType | "ALL">("ALL");

  const filtered = MOCK_TESTS.filter(
    (t) => examFilter === "ALL" || t.exam === examFilter
  );

  const totalQuestions = (testId: string) => {
    const test = MOCK_TESTS.find((t) => t.id === testId);
    return test
      ? test.sections.reduce((s, sec) => s + sec.questionIds.length, 0)
      : 0;
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Exam filter */}
      <div className="flex flex-wrap gap-2">
        <Chip label="All Exams" active={examFilter === "ALL"} onClick={() => setExamFilter("ALL")} />
        {(["JEE_MAIN", "JEE_ADVANCED", "NEET"] as ExamType[]).map((e) => (
          <Chip
            key={e}
            label={EXAM_CONFIG[e]?.label ?? e}
            active={examFilter === e}
            onClick={() => setExamFilter(e)}
          />
        ))}
      </div>

      {/* Test cards grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {filtered.map((test) => {
          const ec = EXAM_CONFIG[test.exam];
          const qCount = totalQuestions(test.id);
          const maxMarks = getTotalMarks(test);
          return (
            <div
              key={test.id}
              className={cn(
                "group relative rounded-2xl border bg-card/60 p-6 transition-all duration-200",
                "hover:shadow-md hover:border-primary/40"
              )}
            >
              {/* Exam badge + difficulty */}
              <div className="flex items-center justify-between mb-4">
                <span
                  className={cn(
                    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold",
                    ec?.bg,
                    ec?.border,
                    ec?.color
                  )}
                >
                  {ec?.label}
                </span>
                <Badge
                  variant="outline"
                  className={cn("text-xs border", DIFFICULTY_COLORS[test.difficulty] ?? "")}
                >
                  {test.difficulty}
                </Badge>
              </div>

              <h3 className="font-semibold text-base mb-2 leading-snug">{test.title}</h3>
              <p className="text-sm text-muted-foreground mb-5 line-clamp-2">
                {test.description}
              </p>

              {/* Stats row */}
              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-5">
                <span className="flex items-center gap-1">
                  <BookOpen className="h-3.5 w-3.5" />
                  {qCount} questions
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {test.durationMinutes} min
                </span>
                <span className="font-semibold text-foreground">{maxMarks} marks</span>
              </div>

              {/* Sections */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {test.sections.map((sec) => (
                  <span
                    key={sec.name}
                    className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                  >
                    {sec.name}
                  </span>
                ))}
              </div>

              {/* CTA */}
              {test.isFree ? (
                <Link href={`/mock-tests/${test.id}`} className="block">
                  <Button className="w-full group-hover:bg-primary/90">
                    Start Test <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              ) : (
                <Button variant="outline" className="w-full" disabled>
                  <Lock className="h-4 w-4 mr-2" /> Unlock with Pro
                </Button>
              )}
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-2xl border bg-card/60 p-12 text-center text-muted-foreground">
          No tests available for the selected exam.
        </div>
      )}
    </div>
  );
}
