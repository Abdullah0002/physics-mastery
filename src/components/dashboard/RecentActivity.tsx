import { CheckCircle2, BookOpen, ClipboardList, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { DEMO_RECENT_ACTIVITY } from "@/config/demo-progress";

const ICONS = {
  question_attempt: Zap,
  topic_completed: CheckCircle2,
  test_submitted: ClipboardList,
  achievement: BookOpen,
} as const;

export function RecentActivity() {
  return (
    <div className="rounded-xl border bg-card/60 p-4 flex flex-col gap-1">
      <div className="text-sm font-semibold mb-2">Recent Activity</div>
      <div className="flex flex-col gap-0">
        {DEMO_RECENT_ACTIVITY.map((item, i) => {
          const Icon = ICONS[item.type];
          return (
            <div
              key={i}
              className="flex items-start gap-3 py-2.5 border-b border-border/40 last:border-0"
            >
              <div
                className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full mt-0.5",
                  item.positive
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                )}
              >
                <Icon className="h-3.5 w-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium leading-snug">{item.title}</div>
                <div className="text-xs text-muted-foreground">{item.subtitle}</div>
              </div>
              <div className="text-xs text-muted-foreground shrink-0">{item.time}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
