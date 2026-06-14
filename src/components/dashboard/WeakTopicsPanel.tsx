import Link from "next/link";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DEMO_WEAK_TOPICS } from "@/config/demo-progress";
import { cn } from "@/lib/utils";

export function WeakTopicsPanel() {
  return (
    <div className="rounded-xl border bg-card/60 p-4 flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <AlertTriangle className="h-4 w-4 text-amber-500" />
        <span className="text-sm font-semibold">Weak Topics</span>
        <span className="ml-auto text-xs text-muted-foreground">Needs attention</span>
      </div>

      <div className="flex flex-col gap-2.5">
        {DEMO_WEAK_TOPICS.map((t) => (
          <div key={t.topicTitle} className="flex flex-col gap-1">
            <div className="flex items-center justify-between text-xs">
              <div>
                <span className="font-medium">{t.topicTitle}</span>
                <span className="text-muted-foreground ml-1.5">{t.chapterTitle}</span>
              </div>
              <span
                className={cn(
                  "font-bold",
                  t.accuracy < 55 ? "text-red-500" : "text-amber-500"
                )}
              >
                {t.accuracy}%
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-muted overflow-hidden">
              <div
                className={cn(
                  "h-full rounded-full transition-all duration-700",
                  t.accuracy < 55 ? "bg-red-500" : "bg-amber-500"
                )}
                style={{ width: `${t.accuracy}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <Link href="/practice" className="mt-1">
        <Button variant="outline" size="sm" className="w-full">
          Practice Weak Topics <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
        </Button>
      </Link>
    </div>
  );
}
