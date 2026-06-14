import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { DEMO_STATS, DEMO_CHAPTER_PROGRESS } from "@/config/demo-progress";
import { ChapterProgressList } from "@/components/dashboard/ChapterProgressList";
import { Progress } from "@/components/ui/progress";

export const metadata: Metadata = {
  title: `My Progress — ${siteConfig.name}`,
};

export default function ProgressPage() {
  const xi = DEMO_CHAPTER_PROGRESS.filter((c) => c.class === "XI");
  const xii = DEMO_CHAPTER_PROGRESS.filter((c) => c.class === "XII");
  const xiAvg = Math.round(xi.reduce((s, c) => s + c.percent, 0) / xi.length);
  const xiiAvg = Math.round(xii.reduce((s, c) => s + c.percent, 0) / xii.length);
  const overall = Math.round((xiAvg + xiiAvg) / 2);

  return (
    <div className="container mx-auto max-w-4xl px-4 sm:px-6 py-8 flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold mb-1">My Progress</h1>
        <p className="text-muted-foreground text-sm">
          Chapter-level completion, question accuracy, and time invested.
        </p>
      </div>

      {/* Overview bars */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { label: "Class 11 Physics", value: xiAvg, count: xi.length, color: "bg-primary" },
          { label: "Class 12 Physics", value: xiiAvg, count: xii.length, color: "bg-emerald-500" },
          { label: "Overall", value: overall, count: DEMO_STATS.totalChapters, color: "bg-amber-500" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border bg-card/60 p-4 flex flex-col gap-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">{s.label}</span>
              <span className="font-bold">{s.value}%</span>
            </div>
            <Progress value={s.value} className="h-2" />
            <span className="text-xs text-muted-foreground">{s.count} chapters</span>
          </div>
        ))}
      </div>

      {/* Class 11 */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Class 11 — {xiAvg}% complete</h2>
        <ChapterProgressList classFilter="XI" />
      </section>

      {/* Class 12 */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Class 12 — {xiiAvg}% complete</h2>
        <ChapterProgressList classFilter="XII" />
      </section>
    </div>
  );
}
