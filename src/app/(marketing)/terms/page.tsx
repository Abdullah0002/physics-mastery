import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Terms of Service — ${siteConfig.name}`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center gap-4 text-center px-4">
      <h1 className="gradient-text text-4xl font-bold tracking-tight lg:text-6xl">Terms of Service</h1>
      <p className="max-w-2xl text-lg text-muted-foreground">
        By using {siteConfig.name}, you agree to our terms. Full terms arriving soon.
      </p>
      <p className="text-sm text-muted-foreground">
        For questions, contact{" "}
        <a href={`mailto:${siteConfig.contact.supportEmail}`} className="underline underline-offset-4">
          {siteConfig.contact.supportEmail}
        </a>
      </p>
    </div>
  );
}
