"use client";

import { useMemo } from "react";
import { RefreshCw, BookOpen, Award, Repeat2 } from "lucide-react";
import { PYQ_ENTRIES, ALL_PYQ_YEARS, REPEAT_PYQ_COUNT } from "@/config/pyq-data";
import type { ExamType } from "@/types";

const EXAM_CONFIG: Array<{
  key: ExamType;
  label: string;
  shortLabel: string;
  color: string;
  bg: string;
}> = [
  {
    key: "JEE_MAIN",
    label: "JEE Main",
    shortLabel: "JM",
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-500",
  },
  {
    key: "JEE_ADVANCED",
    label: "JEE Advanced",
    shortLabel: "JA",
    color: "text-purple-600 dark:text-purple-400",
    bg: "bg-purple-500",
  },
  {
    key: "NEET",
    label: "NEET",
    shortLabel: "NEET",
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-500",
  },
];

interface PYQStatsProps {
  chapterSlug?: string;
}

export function PYQStats({ chapterSlug }: PYQStatsProps) {
  const data = useMemo(
    () =>
      chapterSlug
        ? PYQ_ENTRIES.filter((p) => p.chapterSlug === chapterSlug)
        : PYQ_ENTRIES,
    [chapterSlug]
  );

  const total = data.length;
  const maxExamCount = Math.max(
    ...EXAM_CONFIG.map((e) => data.filter((p) => p.exam === e.key).length)
  );

  // Year × Exam grid
  const yearGrid = useMemo(
    () =>
      ALL_PYQ_YEARS.map((year) => ({
        year,
        counts: EXAM_CONFIG.map((e) => ({
          exam: e,
          count: data.filter((p) => p.year === year && p.exam === e.key).length,
        })),
      })),
    [data]
  );

  return (
    <div className="flex flex-col gap-4">
      {/* Top stat cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl border bg-card/60 p-4 flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <BookOpen className="h-4 w-4" />
            <span className="text-xs">Total PYQs</span>
          </div>
          <div className="text-2xl font-bold">{total}</div>
        </div>

        {EXAM_CONFIG.map((e) => {
          const count = data.filter((p) => p.exam === e.key).length;
          const pct = total > 0 ? Math.round((count / total) * 100) : 0;
          return (
            <div key={e.key} className="rounded-xl border bg-card/60 p-4 flex flex-col gap-1">
              <div className={`flex items-center gap-1.5 ${e.color}`}>
                <Award className="h-4 w-4" />
                <span className="text-xs font-medium">{e.label}</span>
              </div>
              <div className="text-2xl font-bold">{count}</div>
              <div className="text-xs text-muted-foreground">{pct}% of total</div>
            </div>
          );
        })}
      </div>

      {/* Repeat questions note */}
      {REPEAT_PYQ_COUNT > 0 && (
        <div className="flex items-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/5 px-4 py-2.5 text-sm">
          <Repeat2 className="h-4 w-4 text-amber-500 shrink-0" />
          <span className="text-amber-700 dark:text-amber-300">
            <strong>{REPEAT_PYQ_COUNT}</strong> questions appeared in multiple years — high repeat probability.
          </span>
        </div>
      )}

      {/* Exam breakdown bars */}
      <div className="rounded-xl border bg-card/60 p-4 flex flex-col gap-3">
        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          Exam Distribution
        </div>
        {EXAM_CONFIG.map((e) => {
          const count = data.filter((p) => p.exam === e.key).length;
          const pct = maxExamCount > 0 ? (count / maxExamCount) * 100 : 0;
          return (
            <div key={e.key} className="flex items-center gap-3">
              <span className={`w-24 text-xs font-medium ${e.color}`}>{e.label}</span>
              <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className={`h-full rounded-full ${e.bg} transition-all duration-700`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="w-6 text-right text-xs font-bold text-foreground">{count}</span>
            </div>
          );
        })}
      </div>

      {/* Year × Exam grid */}
      <div className="rounded-xl border bg-card/60 p-4 overflow-x-auto">
        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
          Year-wise Distribution
        </div>
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr>
              <th className="text-left py-1.5 pr-4 text-muted-foreground font-medium">Year</th>
              {EXAM_CONFIG.map((e) => (
                <th key={e.key} className={`py-1.5 px-3 font-medium ${e.color}`}>
                  {e.shortLabel}
                </th>
              ))}
              <th className="py-1.5 px-3 text-muted-foreground font-medium">Total</th>
            </tr>
          </thead>
          <tbody>
            {yearGrid.map(({ year, counts }) => {
              const rowTotal = counts.reduce((s, c) => s + c.count, 0);
              if (rowTotal === 0) return null;
              return (
                <tr key={year} className="border-t border-border/40">
                  <td className="py-1.5 pr-4 font-semibold">{year}</td>
                  {counts.map(({ exam, count }) => (
                    <td key={exam.key} className="py-1.5 px-3 text-center">
                      {count > 0 ? (
                        <span
                          className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-white text-xs font-bold ${exam.bg}`}
                        >
                          {count}
                        </span>
                      ) : (
                        <span className="text-muted-foreground/40">—</span>
                      )}
                    </td>
                  ))}
                  <td className="py-1.5 px-3 text-center font-bold">{rowTotal}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
