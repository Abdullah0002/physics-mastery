import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { CLASS_11_CHAPTERS, CLASS_12_CHAPTERS } from "@/config/curriculum";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: `Formula Hub — ${siteConfig.name}`,
  description:
    "Every Physics formula for JEE & NEET organised by chapter. Quick-search, derivations, and print-ready formula sheets.",
  alternates: { canonical: "/formula-hub" },
};

const DIFFICULTY_VARIANT: Record<string, "easy" | "medium" | "hard" | "advanced"> = {
  EASY: "easy", MEDIUM: "medium", HARD: "hard", ADVANCED: "advanced",
};

export default function FormulaHubPage() {
  const allChapters = [...CLASS_11_CHAPTERS, ...CLASS_12_CHAPTERS];
  const totalFormulas = allChapters.reduce((s, c) => s + c.formulaCount, 0);

  return (
    <div className="py-10">
      <div className="container">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Formula Hub</h1>
          <p className="mt-2 text-muted-foreground">
            {totalFormulas}+ formulas across {allChapters.length} chapters — with derivations
            and exam tips
          </p>
        </div>

        {/* Class 11 */}
        <section className="mb-12">
          <h2 className="mb-4 text-xl font-semibold">
            Class 11 Physics
            <span className="ml-2 text-sm font-normal text-muted-foreground">
              ({CLASS_11_CHAPTERS.reduce((s, c) => s + c.formulaCount, 0)} formulas)
            </span>
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {CLASS_11_CHAPTERS.map((chapter) => (
              <Link
                key={chapter.slug}
                href={`/chapters/${chapter.slug}/formulas`}
                className="group flex items-center justify-between rounded-xl border bg-background p-4 transition-all hover:border-primary/40 hover:shadow-sm"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium truncate group-hover:text-primary transition-colors">
                      {chapter.title}
                    </p>
                    <Badge variant={DIFFICULTY_VARIANT[chapter.difficulty]} className="shrink-0 text-2xs">
                      {chapter.difficulty.charAt(0) + chapter.difficulty.slice(1).toLowerCase()}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {chapter.formulaCount} formulas · {chapter.estimatedHours}h study
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </section>

        {/* Class 12 */}
        <section>
          <h2 className="mb-4 text-xl font-semibold">
            Class 12 Physics
            <span className="ml-2 text-sm font-normal text-muted-foreground">
              ({CLASS_12_CHAPTERS.reduce((s, c) => s + c.formulaCount, 0)} formulas)
            </span>
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {CLASS_12_CHAPTERS.map((chapter) => (
              <Link
                key={chapter.slug}
                href={`/chapters/${chapter.slug}/formulas`}
                className="group flex items-center justify-between rounded-xl border bg-background p-4 transition-all hover:border-primary/40 hover:shadow-sm"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium truncate group-hover:text-primary transition-colors">
                      {chapter.title}
                    </p>
                    <Badge variant={DIFFICULTY_VARIANT[chapter.difficulty]} className="shrink-0 text-2xs">
                      {chapter.difficulty.charAt(0) + chapter.difficulty.slice(1).toLowerCase()}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {chapter.formulaCount} formulas · {chapter.estimatedHours}h study
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
