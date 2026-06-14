import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { organizationSchema } from "@/lib/seo/structured-data";
import { HeroSection } from "@/components/home/HeroSection";
import { StatsSection } from "@/components/home/StatsSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { CurriculumSection } from "@/components/home/CurriculumSection";
import { ExamTargetSection } from "@/components/home/ExamTargetSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CtaSection } from "@/components/home/CtaSection";
import { ProblemOfDaySection } from "@/components/home/ProblemOfDaySection";

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
      />
      <HeroSection />
      <ProblemOfDaySection />
      <StatsSection />
      <FeaturesSection />
      <CurriculumSection />
      <ExamTargetSection />
      <TestimonialsSection />
      <CtaSection />
    </>
  );
}
