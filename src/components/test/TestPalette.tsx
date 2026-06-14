"use client";

import { cn } from "@/lib/utils";
import { Flag } from "lucide-react";
import type { FlatQuestion } from "@/config/mock-tests";

// NTA-style palette status
export type QuestionStatus =
  | "not-visited"   // gray
  | "not-answered"  // red — visited but no answer
  | "answered"      // green
  | "flagged"       // orange — flagged, may or may not be answered

interface TestPaletteProps {
  questions: FlatQuestion[];
  currentIdx: number;
  answers: Map<string, string | string[] | number>;
  flagged: Set<string>;
  visited: Set<string>;
  onSelect: (idx: number) => void;
}

function getStatus(
  qid: string,
  answers: Map<string, string | string[] | number>,
  flagged: Set<string>,
  visited: Set<string>
): QuestionStatus {
  if (flagged.has(qid)) return "flagged";
  if (answers.has(qid)) return "answered";
  if (visited.has(qid)) return "not-answered";
  return "not-visited";
}

const STATUS_STYLES: Record<QuestionStatus, string> = {
  "not-visited":  "border-border bg-card/60 text-muted-foreground",
  "not-answered": "border-red-500 bg-red-500/15 text-red-700 dark:text-red-300",
  "answered":     "border-emerald-500 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
  "flagged":      "border-amber-500 bg-amber-500/15 text-amber-700 dark:text-amber-300",
};

export function TestPalette({
  questions,
  currentIdx,
  answers,
  flagged,
  visited,
  onSelect,
}: TestPaletteProps) {
  const answered = Array.from(answers.keys()).length;
  const notVisited = questions.filter(
    ({ question }) => !visited.has(question.id) && !answers.has(question.id)
  ).length;
  const flaggedCount = flagged.size;

  // Group by section
  const sections: { name: string; start: number; end: number }[] = [];
  let prev = "";
  questions.forEach(({ sectionName }, i) => {
    if (sectionName !== prev) {
      sections.push({ name: sectionName, start: i, end: i });
      prev = sectionName;
    } else {
      sections[sections.length - 1]!.end = i;
    }
  });

  return (
    <div className="flex flex-col gap-4">
      {/* Summary */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        {[
          { label: "Answered", count: answered, color: "text-emerald-600 dark:text-emerald-400" },
          { label: "Not Answered", count: questions.length - answered - notVisited, color: "text-red-600 dark:text-red-400" },
          { label: "Not Visited", count: notVisited, color: "text-muted-foreground" },
          { label: "Flagged", count: flaggedCount, color: "text-amber-600 dark:text-amber-400" },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-lg border bg-card/60 px-2 py-1.5 flex flex-col"
          >
            <span className={`font-bold text-base leading-tight ${s.color}`}>{s.count}</span>
            <span className="text-muted-foreground">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Palette grid per section */}
      {sections.map((sec) => (
        <div key={sec.name}>
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
            {sec.name}
          </div>
          <div className="grid grid-cols-5 gap-1.5">
            {questions.slice(sec.start, sec.end + 1).map(({ question }, offset) => {
              const globalIdx = sec.start + offset;
              const status = getStatus(question.id, answers, flagged, visited);
              const isCurrent = globalIdx === currentIdx;
              return (
                <button
                  key={question.id}
                  onClick={() => onSelect(globalIdx)}
                  className={cn(
                    "relative h-8 rounded-lg border text-xs font-bold transition-all",
                    STATUS_STYLES[status],
                    isCurrent && "ring-2 ring-primary ring-offset-1"
                  )}
                >
                  {globalIdx + 1}
                  {flagged.has(question.id) && (
                    <Flag className="absolute -top-1 -right-1 h-2.5 w-2.5 text-amber-500 fill-amber-500" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {/* Legend */}
      <div className="flex flex-col gap-1 text-xs text-muted-foreground border-t pt-3">
        {[
          { color: "bg-emerald-500", label: "Answered" },
          { color: "bg-red-500", label: "Visited, not answered" },
          { color: "bg-card border border-border", label: "Not visited" },
          { color: "bg-amber-500", label: "Flagged for review" },
        ].map((l) => (
          <div key={l.label} className="flex items-center gap-2">
            <span className={cn("h-3 w-3 rounded-sm border", l.color)} />
            {l.label}
          </div>
        ))}
      </div>
    </div>
  );
}
