import Link from "next/link";
import { Clock, FlaskConical, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { ChapterMeta } from "@/config/curriculum";

const DIFFICULTY_VARIANT: Record<string, "easy" | "medium" | "hard" | "advanced"> = {
  EASY: "easy",
  MEDIUM: "medium",
  HARD: "hard",
  ADVANCED: "advanced",
};

export function ChapterCard({ chapter }: { chapter: ChapterMeta }) {
  return (
    <Link href={`/chapters/${chapter.slug}`} className="group block h-full">
      <Card className="h-full transition-all duration-200 hover:border-primary/40 hover:shadow-md">
        <CardContent className="flex h-full flex-col gap-4 p-5">
          {/* Top row */}
          <div className="flex items-start justify-between gap-2">
            <Badge variant={DIFFICULTY_VARIANT[chapter.difficulty]} className="shrink-0">
              {chapter.difficulty.charAt(0) + chapter.difficulty.slice(1).toLowerCase()}
            </Badge>
            <span className="text-xs text-muted-foreground">Class {chapter.class}</span>
          </div>

          {/* Title */}
          <div>
            <h3 className="font-semibold leading-snug group-hover:text-primary transition-colors">
              {chapter.title}
            </h3>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {chapter.keyTopics.slice(0, 3).map((t) => (
                <span
                  key={t}
                  className="rounded-md bg-muted px-1.5 py-0.5 text-xs text-muted-foreground"
                >
                  {t}
                </span>
              ))}
              {chapter.keyTopics.length > 3 && (
                <span className="text-xs text-muted-foreground">
                  +{chapter.keyTopics.length - 3} more
                </span>
              )}
            </div>
          </div>

          {/* Weightage row */}
          <div className="flex gap-2 text-xs">
            <span className="rounded-md bg-jee-main/10 px-2 py-0.5 font-medium text-jee-main">
              JEE M {chapter.weightage.jeeMain}%
            </span>
            <span className="rounded-md bg-jee-advanced/10 px-2 py-0.5 font-medium text-jee-advanced">
              JEE A {chapter.weightage.jeeAdvanced}%
            </span>
            <span className="rounded-md bg-neet/10 px-2 py-0.5 font-medium text-neet">
              NEET {chapter.weightage.neet}%
            </span>
          </div>

          {/* Footer stats */}
          <div className="mt-auto flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <BookOpen className="h-3.5 w-3.5" />
              {chapter.formulaCount} formulas
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {chapter.estimatedHours}h
            </span>
            <span className="flex items-center gap-1">
              <FlaskConical className="h-3.5 w-3.5" />
              {chapter.order}/{chapter.class === "XI" ? 17 : 15}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
