import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { siteConfig } from "@/config/site";
import { PYQStats } from "@/components/pyq/PYQStats";
import { PYQExplorer } from "@/components/practice/PYQExplorer";

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

      {/* Featured chapter module */}
      <Link
        href="/pyqs/kinematics"
        className="group mb-10 flex items-center gap-4 rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-5 transition-colors hover:border-blue-400 dark:border-blue-500/30 dark:from-blue-500/10 dark:to-indigo-500/10 dark:hover:border-blue-500/60"
      >
        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
          <Sparkles className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            New · JEE Main 2026 (January)
          </p>
          <h2 className="font-semibold">Kinematics PYQ Bank</h2>
          <p className="text-sm text-muted-foreground">
            8 solved questions — step-by-step solutions, JEE shortcuts, common mistakes &amp; diagrams.
          </p>
        </div>
        <ArrowRight className="ml-auto h-5 w-5 shrink-0 text-blue-600 transition-transform group-hover:translate-x-1 dark:text-blue-400" />
      </Link>

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
