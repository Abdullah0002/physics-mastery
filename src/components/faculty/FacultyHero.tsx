import Image from "next/image";
import Link from "next/link";
import { Mail, BookOpen } from "lucide-react";
import { siteConfig } from "@/config/site";
import { FACULTY_BIO, FACULTY_TAGLINE, FACULTY_STATS } from "@/config/faculty-data";

export function FacultyHero() {
  return (
    <section className="relative overflow-hidden border-b border-border/40 bg-gradient-to-b from-primary/5 via-background to-background">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 dot-grid opacity-30" />
      <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-violet-500/5 blur-3xl" />

      <div className="relative container mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-24">
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start sm:gap-12">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="relative">
              <div className="h-36 w-36 sm:h-44 sm:w-44 rounded-full overflow-hidden shadow-2xl ring-4 ring-primary/20">
                <Image
                  src="/images/instructor/profile.jpg"
                  alt={siteConfig.author.name}
                  width={176}
                  height={176}
                  priority
                  className="h-full w-full object-cover object-top"
                />
              </div>
              {/* Online badge */}
              <div className="absolute bottom-2 right-2 flex items-center gap-1.5 rounded-full bg-card border border-border px-2.5 py-1 shadow-md text-xs font-medium">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Available
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col gap-4 text-center sm:text-left">
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                <span className="rounded-full bg-primary/10 px-3 py-0.5 text-xs font-semibold text-primary">
                  Senior Faculty
                </span>
                <span className="rounded-full bg-emerald-500/10 px-3 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  5 Years Experience
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                {siteConfig.author.name}
              </h1>
              <p className="mt-2 text-muted-foreground text-sm sm:text-base">{FACULTY_TAGLINE}</p>
            </div>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl">
              {FACULTY_BIO}
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap justify-center sm:justify-start gap-3">
              <Link
                href="/chapters"
                className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors shadow-md"
              >
                <BookOpen className="h-4 w-4" />
                Start Learning
              </Link>
              <Link
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-semibold hover:bg-accent transition-colors"
              >
                <Mail className="h-4 w-4" />
                Contact
              </Link>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {FACULTY_STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border bg-card/60 p-4 text-center hover:border-primary/40 transition-colors"
            >
              <p className="text-2xl sm:text-3xl font-extrabold text-primary">{stat.value}</p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
