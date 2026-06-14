import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BookOpen, Sigma, FlaskConical, FileText, ArrowRight, CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/config/site";
import { CLASS_11_CHAPTERS, CLASS_12_CHAPTERS } from "@/config/curriculum";

const ALL_CHAPTERS = [...CLASS_11_CHAPTERS, ...CLASS_12_CHAPTERS];

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const chapter = ALL_CHAPTERS.find((c) => c.slug === slug);
  if (!chapter) return {};
  return {
    title: `${chapter.title} — ${siteConfig.name}`,
    description: `Study ${chapter.title} with expert notes, ${chapter.formulaCount} formulas, derivations, practice questions and PYQs for JEE & NEET.`,
  };
}

export async function generateStaticParams() {
  return ALL_CHAPTERS.map((c) => ({ slug: c.slug }));
}

const QUICK_LINKS = [
  {
    icon: <BookOpen className="h-5 w-5" />,
    label: "Theory & Notes",
    desc: "Concept explanations and derivations",
    suffix: "/theory",
    color: "text-brand-500",
    bg: "bg-brand-50 dark:bg-brand-950/50",
  },
  {
    icon: <Sigma className="h-5 w-5" />,
    label: "Formula Sheet",
    desc: "All key formulas with usage notes",
    suffix: "/formulas",
    color: "text-violet-500",
    bg: "bg-violet-50 dark:bg-violet-950/30",
  },
  {
    icon: <FlaskConical className="h-5 w-5" />,
    label: "Practice Questions",
    desc: "Topic-wise questions with hints",
    suffix: "/practice",
    color: "text-orange-500",
    bg: "bg-orange-50 dark:bg-orange-950/30",
  },
  {
    icon: <FileText className="h-5 w-5" />,
    label: "Previous Year Qs",
    desc: "Filtered JEE & NEET PYQs",
    suffix: "/pyqs",
    color: "text-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
  },
];

export default async function ChapterOverviewPage({ params }: Props) {
  const { slug } = await params;
  const chapter = ALL_CHAPTERS.find((c) => c.slug === slug);
  if (!chapter) notFound();

  const baseHref = `/chapters/${slug}`;

  // Find adjacent chapters for navigation
  const allSorted = ALL_CHAPTERS.slice().sort((a, b) =>
    a.class === b.class ? a.order - b.order : a.class === "XI" ? -1 : 1
  );
  const idx = allSorted.findIndex((c) => c.slug === slug);
  const prev = idx > 0 ? allSorted[idx - 1] : null;
  const next = idx < allSorted.length - 1 ? allSorted[idx + 1] : null;

  return (
    <div className="container py-8">
      <div className="mx-auto max-w-4xl">
        {/* Quick-access cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2">
          {QUICK_LINKS.map(({ icon, label, desc, suffix, color, bg }) => (
            <Link key={suffix} href={`${baseHref}${suffix}`} className="group block">
              <Card className="h-full transition-all duration-200 hover:border-primary/40 hover:shadow-md">
                <CardContent className="flex items-center gap-4 p-5">
                  <div className={`rounded-xl p-3 ${bg}`}>
                    <span className={color}>{icon}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold group-hover:text-primary transition-colors">
                      {label}
                    </p>
                    <p className="text-sm text-muted-foreground">{desc}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Key topics */}
        <section className="mb-8">
          <h2 className="mb-4 text-lg font-semibold">Key Topics</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {chapter.keyTopics.map((topic) => (
              <div key={topic} className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                {topic}
              </div>
            ))}
          </div>
        </section>

        {/* Exam importance */}
        <section className="mb-8">
          <h2 className="mb-4 text-lg font-semibold">Exam Importance</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: "JEE Main", value: chapter.weightage.jeeMain, color: "bg-jee-main", textColor: "text-jee-main" },
              { label: "JEE Advanced", value: chapter.weightage.jeeAdvanced, color: "bg-jee-advanced", textColor: "text-jee-advanced" },
              { label: "NEET", value: chapter.weightage.neet, color: "bg-neet", textColor: "text-neet" },
            ].map(({ label, value, color, textColor }) => (
              <div key={label} className="rounded-xl border p-4">
                <p className={`text-2xl font-bold ${textColor}`}>{value}%</p>
                <p className="text-sm text-muted-foreground">{label} weightage</p>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                  <div
                    className={`h-full rounded-full ${color}`}
                    style={{ width: `${Math.min(value * 5, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Chapter navigation */}
        <div className="flex items-center justify-between gap-4 border-t pt-6">
          {prev ? (
            <Button variant="outline" asChild className="gap-2">
              <Link href={`/chapters/${prev.slug}`}>
                ← {prev.title}
              </Link>
            </Button>
          ) : <div />}
          {next && (
            <Button variant="outline" asChild className="gap-2">
              <Link href={`/chapters/${next.slug}`}>
                {next.title} →
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
