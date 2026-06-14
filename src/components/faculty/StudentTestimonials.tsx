import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/config/faculty-data";
import { cn } from "@/lib/utils";

const EXAM_COLORS: Record<string, string> = {
  "JEE Advanced": "text-primary bg-primary/10",
  "JEE Main": "text-blue-600 dark:text-blue-400 bg-blue-500/10",
  NEET: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10",
};

function Stars({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "h-3.5 w-3.5",
            i < count ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"
          )}
        />
      ))}
    </div>
  );
}

export function StudentTestimonials() {
  return (
    <section className="border-t border-border/40 bg-muted/20">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 py-14">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Student Success Stories</h2>
          <p className="mt-2 text-muted-foreground text-sm max-w-lg mx-auto">
            Real results from students who trusted the process.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="group rounded-2xl border bg-card/60 p-5 flex flex-col gap-3 hover:border-primary/40 hover:bg-card/90 transition-all"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.year}</p>
                </div>
                <Stars count={t.rating} />
              </div>

              {/* Exam + result badges */}
              <div className="flex flex-wrap gap-1.5">
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-xs font-medium",
                    EXAM_COLORS[t.exam] ?? "bg-muted text-muted-foreground"
                  )}
                >
                  {t.exam}
                </span>
                <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  {t.result}
                </span>
              </div>

              {/* Review */}
              <p className="text-xs text-muted-foreground leading-relaxed flex-1">&ldquo;{t.review}&rdquo;</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
