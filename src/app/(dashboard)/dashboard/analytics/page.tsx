import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import {
  DEMO_EXAM_ACCURACY,
  DEMO_WEEKLY_STUDY,
  DEMO_CHAPTER_PROGRESS,
  DEMO_STATS,
} from "@/config/demo-progress";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: `Analytics — ${siteConfig.name}`,
};

export default function AnalyticsPage() {
  const maxMinutes = Math.max(...DEMO_WEEKLY_STUDY.map((w) => w.minutes));
  const attempted = DEMO_CHAPTER_PROGRESS.filter((c) => c.questionsAttempted > 0);
  const sorted = [...attempted].sort((a, b) => a.accuracy - b.accuracy);
  const weakest = sorted.slice(0, 5);
  const strongest = sorted.slice(-5).reverse();

  return (
    <div className="container mx-auto max-w-5xl px-4 sm:px-6 py-8 flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold mb-1">Analytics</h1>
        <p className="text-muted-foreground text-sm">
          Exam-wise performance, weekly study trends, and topic-level strengths.
        </p>
      </div>

      {/* Exam accuracy */}
      <section>
        <h2 className="text-base font-semibold mb-3">Exam-wise Accuracy</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {DEMO_EXAM_ACCURACY.map((e) => (
            <div key={e.exam} className="rounded-xl border bg-card/60 p-4 flex flex-col gap-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{e.exam}</span>
                <span className="font-bold">{e.accuracy}%</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className={cn("h-full rounded-full", e.color)}
                  style={{ width: `${e.accuracy}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground">{e.attempted} questions attempted</span>
            </div>
          ))}
        </div>
      </section>

      {/* Weekly study bar chart */}
      <section>
        <h2 className="text-base font-semibold mb-3">Weekly Study Time (last 8 weeks)</h2>
        <div className="rounded-xl border bg-card/60 p-4">
          <div className="flex gap-2 items-end h-32">
            {DEMO_WEEKLY_STUDY.map((w) => (
              <div key={w.week} className="flex-1 flex flex-col gap-1 h-full">
                <div className="flex-1 flex flex-col justify-end">
                  <div
                    className="rounded-t-sm bg-primary/70 hover:bg-primary transition-colors w-full"
                    style={{ height: `${(w.minutes / maxMinutes) * 100}%` }}
                    title={`${w.minutes} min / ${w.questions} Qs`}
                  />
                </div>
                <span className="text-xs text-muted-foreground text-center leading-tight">
                  {w.week}
                </span>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>
              Total: {DEMO_WEEKLY_STUDY.reduce((s, w) => s + w.minutes, 0)} min
            </span>
            <span>
              Avg:{" "}
              {Math.round(
                DEMO_WEEKLY_STUDY.reduce((s, w) => s + w.minutes, 0) / DEMO_WEEKLY_STUDY.length
              )}{" "}
              min/week
            </span>
          </div>
        </div>
      </section>

      {/* Strongest / weakest chapters */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <section>
          <h2 className="text-base font-semibold mb-3 text-emerald-600 dark:text-emerald-400">
            Strongest Chapters
          </h2>
          <div className="flex flex-col gap-2">
            {strongest.map((ch) => (
              <div key={ch.slug} className="flex items-center gap-3">
                <span className="text-sm flex-1 truncate">{ch.title}</span>
                <div className="w-24 h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-emerald-500"
                    style={{ width: `${ch.accuracy}%` }}
                  />
                </div>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 w-8 text-right">
                  {ch.accuracy}%
                </span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-base font-semibold mb-3 text-red-500">Weakest Chapters</h2>
          <div className="flex flex-col gap-2">
            {weakest.map((ch) => (
              <div key={ch.slug} className="flex items-center gap-3">
                <span className="text-sm flex-1 truncate">{ch.title}</span>
                <div className="w-24 h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className={cn(
                      "h-full rounded-full",
                      ch.accuracy < 55 ? "bg-red-500" : "bg-amber-500"
                    )}
                    style={{ width: `${ch.accuracy}%` }}
                  />
                </div>
                <span
                  className={cn(
                    "text-xs font-bold w-8 text-right",
                    ch.accuracy < 55 ? "text-red-500" : "text-amber-500"
                  )}
                >
                  {ch.accuracy}%
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Summary strip */}
      <section className="rounded-xl border bg-card/60 p-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Total questions", value: String(DEMO_STATS.totalQuestionsAttempted) },
          { label: "Overall accuracy", value: `${DEMO_STATS.overallAccuracy}%` },
          { label: "Study hours", value: `${Math.round(DEMO_STATS.totalStudyMinutes / 60)}h` },
          { label: "Current streak", value: `${DEMO_STATS.currentStreak}d` },
        ].map((s) => (
          <div key={s.label} className="flex flex-col">
            <span className="text-2xl font-bold">{s.value}</span>
            <span className="text-xs text-muted-foreground">{s.label}</span>
          </div>
        ))}
      </section>
    </div>
  );
}
