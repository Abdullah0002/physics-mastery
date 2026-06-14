import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { NotesClient } from "@/components/notes/NotesClient";

export const metadata: Metadata = {
  title: `My Notes — ${siteConfig.name}`,
  description: "Personal notes attached to chapters, questions, and formulas.",
};

export default function NotesPage() {
  return <NotesClient />;
}
