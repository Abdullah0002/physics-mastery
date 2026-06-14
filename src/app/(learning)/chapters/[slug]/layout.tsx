import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Clock, BookOpen, FlaskConical } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ChapterTabNav } from "@/components/chapter/ChapterTabNav";
import { CLASS_11_CHAPTERS, CLASS_12_CHAPTERS } from "@/config/curriculum";

const ALL_CHAPTERS = [...CLASS_11_CHAPTERS, ...CLASS_12_CHAPTERS];

const DIFFICULTY_VARIANT: Record<string, "easy" | "medium" | "hard" | "advanced"> = {
  EASY: "easy", MEDIUM: "medium", HARD: "hard", ADVANCED: "advanced",
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
};

export default async function ChapterSlugLayout({ children, params }: Props) {
  const { slug } = await params;
  const chapter = ALL_CHAPTERS.find((c) => c.slug === slug);
  if (!chapter) notFound();

  const baseHref = `/chapters/${slug}`;

  return (
    <div className="min-h-screen">
      {/* Chapter header */}
      <div className="border-b bg-muted/30">
        <div className="container py-6">
          {/* Breadcrumb */}
          <nav className="mb-3 flex items-center gap-1 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/chapters" className="hover:text-foreground">Chapters</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground">{chapter.title}</span>
          </nav>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <Badge variant={DIFFICULTY_VARIANT[chapter.difficulty]}>
                  {chapter.difficulty.charAt(0) + chapter.difficulty.slice(1).toLowerCase()}
                </Badge>
                <Badge variant="outline">Class {chapter.class}</Badge>
                <Badge variant="jee-main">JEE M {chapter.weightage.jeeMain}%</Badge>
                <Badge variant="jee-advanced">JEE A {chapter.weightage.jeeAdvanced}%</Badge>
                <Badge variant="neet">NEET {chapter.weightage.neet}%</Badge>
              </div>
              <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                {chapter.title}
              </h1>
            </div>

            <div className="flex shrink-0 gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <BookOpen className="h-4 w-4" />
                {chapter.formulaCount} formulas
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {chapter.estimatedHours}h study
              </span>
              <span className="flex items-center gap-1.5">
                <FlaskConical className="h-4 w-4" />
                {chapter.keyTopics.length} topics
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tab navigation */}
      <ChapterTabNav baseHref={baseHref} />

      {/* Page content */}
      <div>{children}</div>
    </div>
  );
}
