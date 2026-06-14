import { DEMO_DAILY_GOAL } from "@/config/demo-progress";
import { cn } from "@/lib/utils";

function Ring({
  value,
  total,
  label,
  unit,
  color,
}: {
  value: number;
  total: number;
  label: string;
  unit: string;
  color: string;
}) {
  const pct = Math.min(value / total, 1);
  const r = 32;
  const circ = 2 * Math.PI * r;
  const dash = pct * circ;
  const done = value >= total;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative">
        <svg width="80" height="80" className="-rotate-90">
          <circle
            cx="40" cy="40" r={r}
            strokeWidth="7"
            stroke="currentColor"
            className="text-muted/25"
            fill="none"
          />
          <circle
            cx="40" cy="40" r={r}
            strokeWidth="7"
            stroke={color}
            fill="none"
            strokeDasharray={`${dash} ${circ}`}
            strokeLinecap="round"
            className="transition-all duration-700"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center rotate-90">
          <span className="text-base font-bold leading-none">{value}</span>
          <span className="text-xs text-muted-foreground">{unit}</span>
        </div>
      </div>
      <span className="text-xs text-muted-foreground text-center">
        {label}
        <br />
        <span className={cn("font-medium", done ? "text-emerald-500" : "text-foreground")}>
          {value}/{total}
        </span>
      </span>
    </div>
  );
}

export function DailyGoalWidget() {
  const g = DEMO_DAILY_GOAL;
  const overallPct = Math.round(
    ((g.questionsToday / g.questionsTarget + g.minutesToday / g.minutesTarget) / 2) * 100
  );

  return (
    <div className="rounded-xl border bg-card/60 p-4 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold">Today&apos;s Goal</span>
        <span
          className={cn(
            "text-xs font-bold rounded-full px-2 py-0.5",
            overallPct >= 100
              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
              : "bg-primary/10 text-primary"
          )}
        >
          {overallPct}% complete
        </span>
      </div>
      <div className="flex justify-around">
        <Ring
          value={g.questionsToday}
          total={g.questionsTarget}
          label="Questions"
          unit="Q"
          color="var(--primary)"
        />
        <Ring
          value={g.minutesToday}
          total={g.minutesTarget}
          label="Study Time"
          unit="min"
          color="#10b981"
        />
      </div>
    </div>
  );
}
