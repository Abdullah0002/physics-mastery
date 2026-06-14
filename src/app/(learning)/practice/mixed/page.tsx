import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { PracticeInterface } from "@/components/practice/PracticeInterface";

export const metadata: Metadata = {
  title: `Mixed Practice — ${siteConfig.name}`,
  description:
    "Practice questions from all Physics chapters mixed together — ideal for full-syllabus revision for JEE & NEET.",
  alternates: { canonical: "/practice/mixed" },
};

export default function MixedPracticePage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight lg:text-4xl mb-2">
          Mixed Practice
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          Questions from all chapters combined — perfect for full-syllabus revision.
          Filter by difficulty or type, or go completely random.
        </p>
      </div>

      <PracticeInterface />
    </div>
  );
}
