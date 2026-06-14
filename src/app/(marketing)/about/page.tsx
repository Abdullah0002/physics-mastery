import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Target,
  BookOpen,
  Brain,
  Users,
  Zap,
  Award,
  ArrowRight,
  GraduationCap,
  Rocket,
  Heart,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { FACULTY_STATS } from "@/config/faculty-data";

export const metadata: Metadata = {
  title: `About — ${siteConfig.name}`,
  description: `Learn about ${siteConfig.name} and our mission to help students excel in JEE and NEET Physics.`,
  alternates: { canonical: "/about" },
};

const MISSION_PILLARS = [
  {
    icon: Target,
    title: "Exam-Focused",
    description:
      "Every concept, question, and resource is built around what JEE Main, JEE Advanced, and NEET actually test — not generic textbook content.",
  },
  {
    icon: Brain,
    title: "First Principles",
    description:
      "We teach Physics the way it should be learned: by understanding why, not just memorising what. Derivations, diagrams, and deep intuition first.",
  },
  {
    icon: Zap,
    title: "Accessible Anywhere",
    description:
      "A student in a small town deserves the same quality preparation as one at a premier coaching institute. That's why AbdOfPhysics is online and free to start.",
  },
  {
    icon: Heart,
    title: "Student First",
    description:
      "AI doubt solving at 2 AM, weak-topic analytics, structured notes — every feature is designed around what students actually struggle with.",
  },
];

const PLATFORM_FEATURES = [
  { icon: BookOpen, label: "35+ Chapters", sub: "Class 11 & 12 complete" },
  { icon: Users, label: "12,000+ Students", sub: "Across India" },
  { icon: Award, label: "10,000+ Questions", sub: "JEE & NEET pattern" },
  { icon: GraduationCap, label: "5,000+ PYQs", sub: "Last 20 years" },
  { icon: Rocket, label: "AI Tutor", sub: "24/7 doubt solving" },
  { icon: Zap, label: "200+ Mock Tests", sub: "Full-length & chapter-wise" },
];

const STORY_MILESTONES = [
  {
    year: "2019",
    heading: "The JEE Journey",
    body: "Abdullah cracked JEE after two years of preparation in Kota — India's coaching hub. Living through the grind gave him firsthand understanding of exactly what students struggle with.",
  },
  {
    year: "2019–23",
    heading: "NIT Allahabad",
    body: "B.Tech in Electronics & Communication Engineering at NIT Allahabad sharpened the engineering and mathematical foundations that make Physics click.",
  },
  {
    year: "2021",
    heading: "Started Teaching",
    body: "While still in college, Abdullah began coaching JEE and NEET aspirants. The peer-level insight — fresh from the exam himself — resonated instantly with students.",
  },
  {
    year: "2024",
    heading: "AbdOfPhysics Launched",
    body: "The platform was born: a single destination combining structured theory, a 10,000+ question bank, PYQs, mock tests, and an AI tutor — for every student in India.",
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-border/40 bg-gradient-to-b from-primary/5 via-background to-background">
        <div className="pointer-events-none absolute inset-0 dot-grid opacity-20" />
        <div className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-primary/8 blur-3xl" />

        <div className="relative container mx-auto max-w-5xl px-4 sm:px-6 py-20 sm:py-28 text-center">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary mb-6 tracking-wider uppercase">
            Our Story
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            Built by a student who{" "}
            <span className="gradient-text">cracked JEE</span>
            <br />
            for every student who will
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground leading-relaxed">
            AbdOfPhysics is a one-person mission turned platform — combining 5+ years of teaching
            experience, a 10,000-question bank, and AI-powered doubt solving to give every aspirant
            the best possible shot at JEE and NEET.
          </p>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="border-b border-border/40 bg-card/50">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {PLATFORM_FEATURES.map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex flex-col items-center text-center gap-1.5 p-3">
                <Icon className="h-5 w-5 text-primary mb-0.5" />
                <p className="text-sm font-bold">{label}</p>
                <p className="text-xs text-muted-foreground">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Founder section ── */}
      <section className="container mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-24">
        <div className="flex flex-col sm:flex-row gap-10 sm:gap-16 items-center sm:items-start">
          {/* Photo */}
          <div className="flex-shrink-0">
            <div className="h-40 w-40 sm:h-52 sm:w-52 rounded-2xl overflow-hidden shadow-xl ring-4 ring-primary/10">
              <Image
                src="/images/instructor/profile.jpg"
                alt={siteConfig.author.name}
                width={208}
                height={208}
                className="h-full w-full object-cover object-top"
              />
            </div>
          </div>

          {/* Text */}
          <div className="flex flex-col gap-4 text-center sm:text-left">
            <div>
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                Founder & Lead Instructor
              </span>
              <h2 className="mt-1 text-3xl sm:text-4xl font-extrabold tracking-tight">
                {siteConfig.author.name}
              </h2>
              <p className="mt-1 text-muted-foreground text-sm">
                JEE Qualified · B.Tech ECE, NIT Allahabad (2023) · Physics Educator
              </p>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              I cracked JEE from Kota in 2019 and went on to study Electronics & Communication
              Engineering at NIT Allahabad. While still in college, I started teaching Physics to
              JEE and NEET aspirants — and quickly realized that most students don't lack effort,
              they lack the right approach.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              AbdOfPhysics was built to fix that. Every chapter, every question, and every feature
              on this platform comes from real teaching experience — from watching thousands of
              students struggle with the same concepts and finding the explanations that actually
              make things click.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
              {FACULTY_STATS.map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border bg-card p-3 text-center"
                >
                  <p className="text-xl font-extrabold text-primary">{s.value}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Our Story timeline ── */}
      <section className="border-y border-border/40 bg-card/30">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 py-16 sm:py-20">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-center mb-12">
            How we got here
          </h2>
          <div className="relative flex flex-col gap-0">
            {/* vertical line */}
            <div className="absolute left-[28px] sm:left-1/2 top-0 bottom-0 w-px bg-border/60 -translate-x-1/2" />

            {STORY_MILESTONES.map((m, i) => {
              const isRight = i % 2 === 0;
              return (
                <div
                  key={m.year}
                  className={`relative flex items-start gap-6 pb-10 ${
                    isRight ? "sm:flex-row" : "sm:flex-row-reverse"
                  } flex-row`}
                >
                  {/* dot */}
                  <div className="relative z-10 flex-shrink-0 flex items-center justify-center h-14 w-14 rounded-full bg-primary/10 border-2 border-primary/30 text-xs font-bold text-primary">
                    {m.year}
                  </div>

                  {/* card */}
                  <div
                    className={`flex-1 rounded-2xl border bg-card p-5 shadow-sm mt-3 ${
                      isRight ? "sm:mr-[calc(50%+28px)]" : "sm:ml-[calc(50%+28px)]"
                    }`}
                  >
                    <h3 className="font-semibold text-base mb-1">{m.heading}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{m.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Mission pillars ── */}
      <section className="container mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-24">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Our mission in practice</h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Four principles guide every decision we make on this platform.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          {MISSION_PILLARS.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="flex gap-4 rounded-2xl border bg-card/60 p-6 hover:border-primary/30 transition-colors"
            >
              <div className="flex-shrink-0 flex items-center justify-center h-11 w-11 rounded-xl bg-primary/10">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="border-t border-border/40 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto max-w-2xl px-4 sm:px-6 py-16 sm:py-20 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
            Ready to master Physics?
          </h2>
          <p className="text-muted-foreground mb-8">
            Join {siteConfig.stats.students} students already on the platform.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/register"
              className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors shadow-md"
            >
              Get Started Free
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/faculty"
              className="flex items-center gap-2 rounded-xl border px-6 py-3 text-sm font-semibold hover:bg-accent transition-colors"
            >
              Meet the Instructor
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
