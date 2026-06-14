"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Users, BookOpen, FileText, ClipboardList, FlaskConical, Trophy } from "lucide-react";
import { siteConfig } from "@/config/site";

const STATS = [
  {
    icon: <Users className="h-6 w-6" />,
    value: siteConfig.stats.students,
    label: "Active Students",
    color: "text-brand-500",
    bg: "bg-brand-50 dark:bg-brand-950/50",
  },
  {
    icon: <BookOpen className="h-6 w-6" />,
    value: siteConfig.stats.chapters,
    label: "Physics Chapters",
    color: "text-violet-500",
    bg: "bg-violet-50 dark:bg-violet-950/30",
  },
  {
    icon: <FlaskConical className="h-6 w-6" />,
    value: siteConfig.stats.questions,
    label: "Practice Questions",
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-950/30",
  },
  {
    icon: <FileText className="h-6 w-6" />,
    value: siteConfig.stats.pyqs,
    label: "Previous Year Qs",
    color: "text-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
  },
  {
    icon: <ClipboardList className="h-6 w-6" />,
    value: siteConfig.stats.mockTests,
    label: "Mock Tests",
    color: "text-orange-500",
    bg: "bg-orange-50 dark:bg-orange-950/30",
  },
  {
    icon: <Trophy className="h-6 w-6" />,
    value: siteConfig.stats.successStories,
    label: "Success Stories",
    color: "text-yellow-500",
    bg: "bg-yellow-50 dark:bg-yellow-950/30",
  },
];

export function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="border-y bg-muted/30 py-16">
      <div className="container" ref={ref}>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {STATS.map(({ icon, value, label, color, bg }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
              className="flex flex-col items-center gap-2 rounded-xl p-4 text-center"
            >
              <div className={`rounded-xl p-3 ${bg}`}>
                <span className={color}>{icon}</span>
              </div>
              <span className="text-2xl font-bold tracking-tight">{value}</span>
              <span className="text-xs text-muted-foreground">{label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
