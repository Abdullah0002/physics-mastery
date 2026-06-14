import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { BookmarksClient } from "@/components/bookmarks/BookmarksClient";

export const metadata: Metadata = {
  title: `Bookmarks — ${siteConfig.name}`,
  description: "Questions, chapters, and resources you've saved for later revision.",
};

export default function BookmarksPage() {
  return <BookmarksClient />;
}
