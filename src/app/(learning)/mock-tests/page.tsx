import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { TestCatalog } from "@/components/test/TestCatalog";

export const metadata: Metadata = {
  title: `Mock Tests — ${siteConfig.name}`,
  description:
    "Full-length JEE Main, JEE Advanced & NEET Physics mock tests with countdown timer, question palette, auto-submit, and detailed performance analysis.",
  alternates: { canonical: "/mock-tests" },
};

export default function MockTestsPage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight lg:text-4xl mb-2">
          Mock Tests
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          Exam-accurate timed tests with question palette, auto-submit, negative marking,
          and detailed post-test analysis. Filter by exam type to target your preparation.
        </p>
      </div>

      <TestCatalog />
    </div>
  );
}
