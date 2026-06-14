import { GraduationCap, Briefcase, Trophy } from "lucide-react";
import { TIMELINE, type TimelineType } from "@/config/faculty-data";
import { cn } from "@/lib/utils";

const TYPE_STYLES: Record<TimelineType, { label: string; icon: typeof GraduationCap; color: string; dot: string }> = {
  education: {
    label: "Education",
    icon: GraduationCap,
    color: "text-blue-600 dark:text-blue-400 bg-blue-500/10 border-blue-500/20",
    dot: "bg-blue-500",
  },
  career: {
    label: "Career",
    icon: Briefcase,
    color: "text-primary bg-primary/10 border-primary/20",
    dot: "bg-primary",
  },
  milestone: {
    label: "Milestone",
    icon: Trophy,
    color: "text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20",
    dot: "bg-amber-500",
  },
};

export function QualificationTimeline() {
  return (
    <section className="border-t border-border/40 bg-muted/20">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 py-14">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Education & Experience</h2>
          <p className="mt-2 text-muted-foreground text-sm max-w-lg mx-auto">
            A decade-long journey from student to mentor.
          </p>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />

          <div className="flex flex-col gap-8">
            {TIMELINE.map((item, i) => {
              const style = TYPE_STYLES[item.type];
              const Icon = style.icon;
              const isRight = i % 2 === 0;

              return (
                <div
                  key={`${item.year}-${item.title}`}
                  className={cn(
                    "relative flex gap-6 sm:gap-0",
                    "sm:w-1/2",
                    isRight ? "sm:pr-10 sm:self-start sm:text-right" : "sm:pl-10 sm:self-end sm:ml-auto"
                  )}
                >
                  {/* Dot */}
                  <div
                    className={cn(
                      "absolute z-10 h-3 w-3 rounded-full ring-2 ring-background",
                      style.dot,
                      "top-4",
                      "left-[13px] sm:left-auto",
                      isRight ? "sm:-right-[7px]" : "sm:-left-[7px]"
                    )}
                  />

                  {/* Card — on mobile, left-padded to clear the line */}
                  <div className="ml-9 sm:ml-0 rounded-2xl border bg-card/70 p-4 hover:border-primary/30 transition-colors flex flex-col gap-2 flex-1">
                    <div className={cn("flex items-center gap-2", isRight ? "sm:flex-row-reverse" : "")}>
                      <span
                        className={cn(
                          "flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
                          style.color
                        )}
                      >
                        <Icon className="h-3 w-3" />
                        {item.year}
                      </span>
                    </div>
                    <h3 className="font-semibold text-sm">{item.title}</h3>
                    <p className="text-xs font-medium text-primary">{item.subtitle}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
