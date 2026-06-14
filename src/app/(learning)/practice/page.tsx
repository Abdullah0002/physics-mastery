import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { PracticeInterface } from "@/components/practice/PracticeInterface";

export const metadata: Metadata = {
  title: `Practice — ${siteConfig.name}`,
  description:
    "Topic-wise Physics practice questions with hints and detailed solutions for JEE & NEET.",
  alternates: { canonical: "/practice" },
};

export default function PracticePage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight lg:text-4xl mb-2">
          Practice Questions
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          Filter by chapter, difficulty, or question type. Each question gives instant
          feedback with hints and full solution — no login required.
        </p>
      </div>

      <PracticeInterface />
    </div>
  );
}
