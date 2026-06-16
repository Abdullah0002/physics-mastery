import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { LEARN_CHAPTER_LIST } from "@/components/learn/data";

export const metadata: Metadata = {
  title: "Learn — Comprehensive Physics Theory | JEE & NEET",
  description:
    "Deep, self-study physics theory modules with derivations, intuition, professional diagrams, worked examples and common mistakes — built from first principles to JEE Advanced level.",
  alternates: { canonical: "/learn" },
};

export default function LearnIndexPage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold tracking-tight lg:text-4xl">Learn — Theory Modules</h1>
        <p className="max-w-2xl text-muted-foreground">
          Comprehensive, self-study chapters with rigorous derivations, intuition, professional
          diagrams, worked examples and error analysis — first principles to JEE Advanced.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {LEARN_CHAPTER_LIST.map((chapter) => (
          <Link
            key={chapter.slug}
            href={`/learn/${chapter.slug}`}
            className="group flex flex-col rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 to-indigo-50 p-5 transition-colors hover:border-violet-400 dark:border-violet-500/30 dark:from-violet-500/10 dark:to-indigo-500/10 dark:hover:border-violet-500/60"
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-violet-600 text-white">
                <BookOpen className="h-5 w-5" />
              </span>
              <ArrowRight className="h-4 w-4 text-violet-600 transition-transform group-hover:translate-x-1 dark:text-violet-400" />
            </div>
            <h3 className="font-semibold">{chapter.chapter}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{chapter.summary}</p>
            <span className="mt-3 text-xs font-medium text-violet-600 dark:text-violet-400">
              {chapter.sections.length} sections · {chapter.exams}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
