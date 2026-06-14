"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, BookOpen, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/config/site";

const FLOATERS = [
  { text: "F = ma", top: "15%", left: "5%", opacity: 0.07, size: "text-2xl" },
  { text: "E = mc²", top: "30%", right: "6%", opacity: 0.08, size: "text-3xl" },
  { text: "∇·E = ρ/ε₀", top: "60%", left: "3%", opacity: 0.06, size: "text-xl" },
  { text: "v² = u² + 2as", top: "70%", right: "4%", opacity: 0.07, size: "text-lg" },
  { text: "ΔS ≥ 0", top: "45%", left: "50%", opacity: 0.05, size: "text-2xl" },
  { text: "λ = h/mv", top: "20%", left: "40%", opacity: 0.05, size: "text-xl" },
  { text: "PV = nRT", top: "80%", left: "30%", opacity: 0.06, size: "text-lg" },
  { text: "∮B·dl = μ₀I", top: "50%", right: "25%", opacity: 0.05, size: "text-xl" },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background: dot grid + gradient */}
      <div className="absolute inset-0 dot-grid" />
      <div className="absolute inset-0 bg-gradient-to-b from-brand-50/60 via-transparent to-transparent dark:from-brand-950/20" />

      {/* Floating physics formulae */}
      {FLOATERS.map((f, i) => (
        <motion.span
          key={i}
          className={`absolute select-none font-mono font-semibold text-foreground ${f.size}`}
          style={{
            top: f.top,
            left: "left" in f ? f.left : undefined,
            right: "right" in f ? f.right : undefined,
            opacity: f.opacity,
          }}
          animate={{ y: [0, -6, 0] }}
          transition={{
            duration: 4 + i * 0.7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.4,
          }}
        >
          {f.text}
        </motion.span>
      ))}

      {/* Hero content */}
      <div className="container relative z-10 flex flex-col items-center py-24 text-center md:py-32 lg:py-40">
        {/* Pill badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="outline" className="mb-6 gap-1.5 rounded-full border-brand-300 bg-brand-50 px-4 py-1.5 text-sm font-medium text-brand-700 dark:border-brand-700 dark:bg-brand-950 dark:text-brand-300">
            <Sparkles className="h-3.5 w-3.5" />
            {siteConfig.stats.students} students already learning
          </Badge>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="max-w-4xl text-balance text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Master Physics.{" "}
          <span className="gradient-text">Crack JEE &amp; NEET.</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          className="mt-6 max-w-2xl text-balance text-lg text-muted-foreground md:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Expert-crafted notes, {siteConfig.stats.questions} practice questions,{" "}
          {siteConfig.stats.pyqs} PYQs, full-length mock tests, and an AI tutor — all in one platform.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="mt-8 flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Button size="lg" asChild className="gap-2 rounded-full px-8 shadow-glow-sm">
            <Link href="/register">
              Start Learning Free
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild className="gap-2 rounded-full px-8">
            <Link href="/chapters">
              <BookOpen className="h-4 w-4" />
              Browse Chapters
            </Link>
          </Button>
        </motion.div>

        {/* Social proof row */}
        <motion.div
          className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {[
            { icon: <BookOpen className="h-4 w-4" />, text: `${siteConfig.stats.chapters} Chapters` },
            { icon: <Zap className="h-4 w-4" />, text: `${siteConfig.stats.mockTests} Mock Tests` },
            { icon: <Sparkles className="h-4 w-4" />, text: "AI-Powered Tutoring" },
          ].map(({ icon, text }) => (
            <div key={text} className="flex items-center gap-1.5">
              <span className="text-brand-500">{icon}</span>
              {text}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
