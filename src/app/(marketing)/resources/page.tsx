import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { ResourceHero } from "@/components/resources/ResourceHero";
import { FeaturedResources } from "@/components/resources/FeaturedResources";
import { ResourceGrid } from "@/components/resources/ResourceGrid";

export const metadata: Metadata = {
  title: `Resources — ${siteConfig.name}`,
  description:
    "Download free Physics PDFs, Daily Practice Problems, formula sheets, and mind maps for JEE Main, JEE Advanced & NEET.",
  alternates: { canonical: "/resources" },
  openGraph: {
    title: `Free Physics Resources — ${siteConfig.name}`,
    description:
      "Notes, DPPs, formula sheets, and mind maps for JEE & NEET Physics — all free to download.",
    url: `${siteConfig.url}/resources`,
  },
};

export default function ResourcesPage() {
  return (
    <>
      <ResourceHero />
      <FeaturedResources />

      {/* Divider */}
      <div className="border-t border-border/40" />

      {/* All resources with filters */}
      <section className="container mx-auto max-w-5xl px-4 sm:px-6 py-10">
        <h2 className="text-base font-semibold mb-5">All Resources</h2>
        <ResourceGrid />
      </section>
    </>
  );
}
