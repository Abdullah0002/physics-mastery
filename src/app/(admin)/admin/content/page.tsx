import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Content — Admin | ${siteConfig.name}`,
};

export default function AdminContentPage() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center gap-4 text-center px-4">
      <h1 className="gradient-text text-4xl font-bold tracking-tight lg:text-6xl">Content</h1>
      <p className="max-w-2xl text-lg text-muted-foreground">
        Manage chapters, theory, formulas, and resources.
      </p>
      <p className="text-sm text-muted-foreground">Content CMS arriving in Phase 12</p>
    </div>
  );
}
