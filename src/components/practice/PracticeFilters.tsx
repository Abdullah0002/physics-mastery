"use client";

import { cn } from "@/lib/utils";
import type { Difficulty, QuestionType } from "@/types";

export interface PracticeFilterState {
  difficulty: Difficulty | "ALL";
  type: QuestionType | "ALL";
  chapterSlug: string | "ALL";
}

interface PracticeFiltersProps {
  filters: PracticeFilterState;
  onChange: (next: PracticeFilterState) => void;
  availableChapters: { slug: string; title: string }[];
  questionCount: number;
}

const DIFFICULTIES: Array<{ label: string; value: Difficulty | "ALL" }> = [
  { label: "All", value: "ALL" },
  { label: "Easy", value: "EASY" },
  { label: "Medium", value: "MEDIUM" },
  { label: "Hard", value: "HARD" },
  { label: "Advanced", value: "ADVANCED" },
];

const TYPES: Array<{ label: string; value: QuestionType | "ALL" }> = [
  { label: "All Types", value: "ALL" },
  { label: "MCQ", value: "MCQ_SINGLE" },
  { label: "Multi-Correct", value: "MCQ_MULTIPLE" },
  { label: "Integer", value: "INTEGER" },
  { label: "Numerical", value: "NUMERICAL" },
];

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

export function PracticeFilters({
  filters,
  onChange,
  availableChapters,
  questionCount,
}: PracticeFiltersProps) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border bg-card/60 backdrop-blur-sm p-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Filters
        </span>
        <span className="text-xs text-muted-foreground">
          {questionCount} question{questionCount !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Difficulty */}
      <div className="flex flex-col gap-1.5">
        <span className="text-xs text-muted-foreground">Difficulty</span>
        <div className="flex flex-wrap gap-1.5">
          {DIFFICULTIES.map((d) => (
            <Chip
              key={d.value}
              label={d.label}
              active={filters.difficulty === d.value}
              onClick={() => onChange({ ...filters, difficulty: d.value })}
            />
          ))}
        </div>
      </div>

      {/* Type */}
      <div className="flex flex-col gap-1.5">
        <span className="text-xs text-muted-foreground">Question Type</span>
        <div className="flex flex-wrap gap-1.5">
          {TYPES.map((t) => (
            <Chip
              key={t.value}
              label={t.label}
              active={filters.type === t.value}
              onClick={() => onChange({ ...filters, type: t.value })}
            />
          ))}
        </div>
      </div>

      {/* Chapter */}
      <div className="flex flex-col gap-1.5">
        <span className="text-xs text-muted-foreground">Chapter</span>
        <div className="flex flex-wrap gap-1.5">
          <Chip
            label="All Chapters"
            active={filters.chapterSlug === "ALL"}
            onClick={() => onChange({ ...filters, chapterSlug: "ALL" })}
          />
          {availableChapters.map((ch) => (
            <Chip
              key={ch.slug}
              label={ch.title}
              active={filters.chapterSlug === ch.slug}
              onClick={() => onChange({ ...filters, chapterSlug: ch.slug })}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
