import type { Metadata } from "next";
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
