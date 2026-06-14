import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { RevisionClient } from "@/components/revision/RevisionClient";

export const metadata: Metadata = {
  title: `Revision Center — ${siteConfig.name}`,
  description:
    "Quick-revision notes, formula flashcards, and last-minute exam tips for JEE & NEET Physics — all in one place.",
  alternates: { canonical: "/revision" },
};

export default function RevisionPage() {
  return <RevisionClient />;
}
