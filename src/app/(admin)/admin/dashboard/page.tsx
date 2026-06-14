import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Admin Dashboard — ${siteConfig.name}`,
};

export default function AdminDashboardPage() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center gap-4 text-center px-4">
      <h1 className="gradient-text text-4xl font-bold tracking-tight lg:text-6xl">Admin Dashboard</h1>
      <p className="max-w-2xl text-lg text-muted-foreground">
        Platform overview — users, content, questions, and revenue metrics.
      </p>
      <p className="text-sm text-muted-foreground">Admin panel arriving in Phase 12</p>
    </div>
  );
}
