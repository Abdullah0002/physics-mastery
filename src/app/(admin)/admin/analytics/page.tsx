import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Analytics — Admin | ${siteConfig.name}`,
};

export default function AdminAnalyticsPage() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center gap-4 text-center px-4">
      <h1 className="gradient-text text-4xl font-bold tracking-tight lg:text-6xl">Platform Analytics</h1>
      <p className="max-w-2xl text-lg text-muted-foreground">
        Platform-wide usage metrics, engagement trends, and content performance.
      </p>
      <p className="text-sm text-muted-foreground">Admin analytics arriving in Phase 12</p>
    </div>
  );
}
