import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { personSchema } from "@/lib/seo/structured-data";
import { FacultyHero } from "@/components/faculty/FacultyHero";
import { TeachingApproach } from "@/components/faculty/TeachingApproach";
import { QualificationTimeline } from "@/components/faculty/QualificationTimeline";
import { AchievementCards } from "@/components/faculty/AchievementCards";
import { StudentTestimonials } from "@/components/faculty/StudentTestimonials";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: `Faculty — ${siteConfig.author.name} | ${siteConfig.name}`,
  description: `Meet ${siteConfig.author.name}, ${siteConfig.author.designation} with 8+ years of experience and 12,000+ students. Founder of ${siteConfig.name}.`,
  alternates: { canonical: "/faculty" },
  openGraph: {
    title: `${siteConfig.author.name} — ${siteConfig.author.designation}`,
    description: `Expert JEE & NEET Physics teacher. 200+ AIR < 1000 selections. Founder of AbdOfPhysics.`,
    url: `${siteConfig.url}/faculty`,
  },
};

export default function FacultyPage() {
  const schema = personSchema();

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <FacultyHero />
      <TeachingApproach />
      <AchievementCards />
      <QualificationTimeline />
      <StudentTestimonials />

      {/* CTA footer */}
      <section className="border-t border-border/40">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6 py-16 text-center flex flex-col items-center gap-6">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Ready to master Physics?
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-md">
            Join 12,000+ students who have transformed their understanding of Physics — one concept at a time.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/chapters"
              className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors shadow-md"
            >
              Explore Curriculum
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/mock-tests"
              className="flex items-center gap-2 rounded-xl border px-6 py-3 text-sm font-semibold hover:bg-accent transition-colors"
            >
              Take a Free Mock Test
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
