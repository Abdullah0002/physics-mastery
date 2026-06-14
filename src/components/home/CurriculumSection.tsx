import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SlideUp, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { CLASS_11_CHAPTERS, CLASS_12_CHAPTERS } from "@/config/curriculum";

// Show 6 high-weightage chapters from each class
const HIGHLIGHT_CHAPTERS = [
  ...CLASS_11_CHAPTERS.filter((c) => c.weightage.jeeMain >= 7).slice(0, 3),
  ...CLASS_12_CHAPTERS.filter((c) => c.weightage.jeeMain >= 8).slice(0, 3),
  ...CLASS_11_CHAPTERS.filter((c) => c.weightage.jeeMain >= 5 && c.weightage.jeeMain < 7).slice(0, 2),
  ...CLASS_12_CHAPTERS.filter((c) => c.weightage.jeeMain >= 6 && c.weightage.jeeMain < 8).slice(0, 2),
].slice(0, 8);

const DIFFICULTY_VARIANT: Record<string, "easy" | "medium" | "hard" | "advanced"> = {
  EASY: "easy",
  MEDIUM: "medium",
  HARD: "hard",
  ADVANCED: "advanced",
};

export function CurriculumSection() {
  return (
    <section className="bg-muted/20 py-20 md:py-28">
      <div className="container">
        <SlideUp className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-500">
            Curriculum
          </p>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            High-weightage chapters, covered deeply
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Every chapter includes theory notes, derivations, formula sheets, practice questions,
            and previous year questions — with JEE &amp; NEET weightage clearly marked.
          </p>
        </SlideUp>

        <StaggerContainer className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {HIGHLIGHT_CHAPTERS.map((chapter) => (
            <StaggerItem key={chapter.slug}>
              <Link href={`/chapters/${chapter.slug}`} className="group block">
                <div className="rounded-xl border bg-background p-5 transition-all duration-200 hover:border-primary/40 hover:shadow-md">
                  <div className="mb-3 flex items-center justify-between">
                    <Badge variant={DIFFICULTY_VARIANT[chapter.difficulty]}>
                      {chapter.difficulty.charAt(0) + chapter.difficulty.slice(1).toLowerCase()}
                    </Badge>
                    <span className="text-xs text-muted-foreground">Class {chapter.class}</span>
                  </div>
                  <h3 className="mb-2 font-semibold leading-snug group-hover:text-primary">
                    {chapter.title}
                  </h3>
                  <div className="mb-3 flex gap-2 text-xs">
                    <span className="rounded-md bg-jee-main/10 px-2 py-0.5 text-jee-main">
                      JEE {chapter.weightage.jeeMain}%
                    </span>
                    <span className="rounded-md bg-neet/10 px-2 py-0.5 text-neet">
                      NEET {chapter.weightage.neet}%
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {chapter.formulaCount} formulas · {chapter.estimatedHours}h study time
                  </p>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="mt-10 text-center">
          <Button variant="outline" size="lg" asChild className="rounded-full gap-2">
            <Link href="/chapters">
              View all {CLASS_11_CHAPTERS.length + CLASS_12_CHAPTERS.length} chapters
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
