import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SlideUp } from "@/components/ui/motion";
import { siteConfig } from "@/config/site";

export function CtaSection() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-600 via-brand-700 to-violet-800" />
      <div className="absolute inset-0 dot-grid opacity-10" />

      {/* Glow orbs */}
      <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-violet-500/30 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-brand-400/30 blur-3xl" />

      <div className="container relative z-10 text-center text-white">
        <SlideUp>
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-white/70">
            Start today — it&apos;s free
          </p>
          <h2 className="mx-auto max-w-3xl text-balance text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            Join {siteConfig.stats.students} students on their path to
            <span className="text-yellow-300"> JEE &amp; NEET</span> success
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-balance text-lg text-white/80">
            No credit card required. Full access to chapter notes, PYQs, and practice
            questions — free forever.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              asChild
              className="rounded-full bg-white px-8 text-brand-700 hover:bg-white/90 shadow-xl gap-2"
            >
              <Link href="/register">
                Create free account
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="rounded-full border-white/40 bg-white/10 px-8 text-white hover:bg-white/20 backdrop-blur-sm"
            >
              <Link href="/chapters">Browse chapters</Link>
            </Button>
          </div>

          <p className="mt-8 text-sm text-white/50">
            {siteConfig.stats.successStories} students have already achieved their dream rank
          </p>
        </SlideUp>
      </div>
    </section>
  );
}
