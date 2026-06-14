"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { DEMO_HEATMAP } from "@/config/demo-progress";

const INTENSITY_COLORS = [
  "bg-muted/40",           // 0 — no activity
  "bg-primary/20",         // 1 — light
  "bg-primary/40",         // 2 — moderate
  "bg-primary/65",         // 3 — active
  "bg-primary",            // 4 — intense
];

const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export function StreakCalendar() {
  const { weeks, monthLabels } = useMemo(() => {
    const anchor = new Date(2026, 5, 6); // 2026-06-06
    // Build a 26-week grid ending on anchor
    const days: { date: string; value: number }[] = [];

    for (let i = 181; i >= 0; i--) {
      const d = new Date(anchor);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split("T")[0]!;
      days.push({ date: key, value: DEMO_HEATMAP[key] ?? 0 });
    }

    // Pad start to Sunday
    const firstDow = new Date(days[0]!.date).getDay(); // 0=Sun
    const padded = Array.from({ length: firstDow }, () => ({ date: "", value: -1 })).concat(days);

    // Slice into weeks (columns of 7)
    const weeksArr: typeof days[] = [];
    for (let i = 0; i < padded.length; i += 7) {
      weeksArr.push(padded.slice(i, i + 7) as typeof days);
    }

    // Month labels: for each week, which month does Sunday land in?
    const labels: { col: number; label: string }[] = [];
    let lastMonth = -1;
    weeksArr.forEach((week, col) => {
      const firstReal = week.find((d) => d.date !== "");
      if (!firstReal) return;
      const m = new Date(firstReal.date).getMonth();
      if (m !== lastMonth) {
        labels.push({ col, label: MONTHS[m] ?? "" });
        lastMonth = m;
      }
    });

    return { weeks: weeksArr, monthLabels: labels };
  }, []);

  return (
    <div className="flex flex-col gap-2">
      {/* Month labels */}
      <div className="flex" style={{ marginLeft: 28 }}>
        {weeks.map((_, i) => {
          const ml = monthLabels.find((m) => m.col === i);
          return (
            <div key={i} className="w-3.5 shrink-0 text-xs text-muted-foreground">
              {ml?.label ?? ""}
            </div>
          );
        })}
      </div>

      <div className="flex gap-0.5">
        {/* Day-of-week labels */}
        <div className="flex flex-col gap-0.5 w-7 shrink-0">
          {DAY_LABELS.map((d, i) => (
            <div key={i} className="h-3 text-xs text-muted-foreground leading-3">{d}</div>
          ))}
        </div>

        {/* Grid */}
        <div className="flex gap-0.5 overflow-x-auto">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-0.5">
              {week.map((day, di) => (
                <div
                  key={di}
                  title={day.date ? `${day.date}: ${day.value > 0 ? `${day.value * 25}+ min` : "No study"}` : ""}
                  className={cn(
                    "h-3 w-3 shrink-0 rounded-sm transition-opacity",
                    day.value < 0 ? "opacity-0" : INTENSITY_COLORS[day.value] ?? INTENSITY_COLORS[0]
                  )}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
        <span>Less</span>
        {INTENSITY_COLORS.map((c, i) => (
          <div key={i} className={cn("h-3 w-3 rounded-sm", c)} />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}
