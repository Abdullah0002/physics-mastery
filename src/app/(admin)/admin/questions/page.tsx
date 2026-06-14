import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Questions — Admin | ${siteConfig.name}`,
};

export default function AdminQuestionsPage() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center gap-4 text-center px-4">
      <h1 className="gradient-text text-4xl font-bold tracking-tight lg:text-6xl">Questions</h1>
      <p className="max-w-2xl text-lg text-muted-foreground">
        Add, edit, and manage the question bank across all chapters and exams.
      </p>
      <p className="text-sm text-muted-foreground">Question management arriving in Phase 12</p>
    </div>
  );
}
