import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { PYQStats } from "@/components/pyq/PYQStats";
import { PYQExplorer } from "@/components/practice/PYQExplorer";
import { PYQ_CHAPTER_LIST } from "@/components/pyq/data";

export const metadata: Metadata = {
  title: `Previous Year Questions — ${siteConfig.name}`,
  description:
    "Authentic JEE Main, JEE Advanced & NEET physics PYQs with year-wise analysis, repeat questions flagged, and instant feedback.",
  alternates: { canonical: "/pyqs" },
};

export default function PyqsPage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight lg:text-4xl mb-2">
          Previous Year Questions
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          Authentic JEE Main, JEE Advanced, and NEET questions with year-wise distribution,
          repeat-question flags, and instant solution feedback.
        </p>
      </div>

      {/* Chapter-wise PYQ banks (JEE Main 2026 January) */}
      <section className="mb-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Chapter-wise PYQ Banks</h2>
          <span className="text-xs font-medium text-muted-foreground">JEE Main 2026 (January)</span>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PYQ_CHAPTER_LIST.map((chapter) => (
            <Link
              key={chapter.slug}
              href={`/pyqs/${chapter.slug}`}
              className="group flex flex-col rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-5 transition-colors hover:border-blue-400 dark:border-blue-500/30 dark:from-blue-500/10 dark:to-indigo-500/10 dark:hover:border-blue-500/60"
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="rounded-md bg-blue-600 px-2 py-0.5 text-xs font-semibold text-white">
                  {chapter.questions.length} Qs
                </span>
                <ArrowRight className="h-4 w-4 text-blue-600 transition-transform group-hover:translate-x-1 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold">{chapter.chapter}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Step-by-step solutions, JEE shortcuts, common mistakes &amp; diagrams.
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Stats overview */}
      <section className="mb-10">
        <PYQStats />
      </section>

      {/* Interactive explorer */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Explore & Solve</h2>
        </div>
        <PYQExplorer />
      </section>
    </div>
  );
}
