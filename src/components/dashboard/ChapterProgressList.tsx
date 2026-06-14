import Link from "next/link";
import { cn } from "@/lib/utils";
import { CheckCircle2, Circle, Clock } from "lucide-react";
import { DEMO_CHAPTER_PROGRESS } from "@/config/demo-progress";

interface ChapterProgressListProps {
  classFilter?: "XI" | "XII";
}

export function ChapterProgressList({ classFilter }: ChapterProgressListProps) {
  const chapters = classFilter
    ? DEMO_CHAPTER_PROGRESS.filter((c) => c.class === classFilter)
    : DEMO_CHAPTER_PROGRESS;

  const completed = chapters.filter((c) => c.status === "COMPLETED").length;
  const inProgress = chapters.filter((c) => c.status === "IN_PROGRESS").length;

  return (
    <div className="flex flex-col gap-4">
      {/* Summary */}
      <div className="flex gap-4 text-sm">
        <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 className="h-4 w-4" />
          <span className="font-semibold">{completed}</span> completed
        </div>
        <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
          <Clock className="h-4 w-4" />
          <span className="font-semibold">{inProgress}</span> in progress
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Circle className="h-4 w-4" />
          <span className="font-semibold">{chapters.length - completed - inProgress}</span> not started
        </div>
      </div>

      {/* List */}
      <div className="flex flex-col gap-2">
        {chapters.map((ch) => (
          <Link
            key={ch.slug}
            href={`/chapters/${ch.slug}`}
            className="group rounded-xl border bg-card/60 px-4 py-3 hover:border-primary/40 hover:bg-card/90 transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium group-hover:text-primary transition-colors">
                  {ch.title}
                </span>
                {ch.status === "COMPLETED" && (
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                )}
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                {ch.questionsAttempted > 0 && (
                  <>
                    <span>{ch.questionsAttempted} Q</span>
                    <span
                      className={cn(
                        "font-semibold",
                        ch.accuracy >= 75
                          ? "text-emerald-600 dark:text-emerald-400"
                          : ch.accuracy >= 55
                          ? "text-amber-600 dark:text-amber-400"
                          : "text-red-500"
                      )}
                    >
                      {ch.accuracy}%
                    </span>
                  </>
                )}
                <span className="font-bold text-foreground">{ch.percent}%</span>
              </div>
            </div>
            <div className="h-1.5 rounded-full bg-muted overflow-hidden">
              <div
                className={cn(
                  "h-full rounded-full transition-all duration-700",
                  ch.status === "COMPLETED"
                    ? "bg-emerald-500"
                    : ch.percent > 0
                    ? "bg-primary"
                    : "bg-muted"
                )}
                style={{ width: `${ch.percent}%` }}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
