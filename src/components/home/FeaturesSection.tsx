import Link from "next/link";
import {
  BookOpen, Zap, ClipboardList, Brain, TrendingUp, Calculator,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SlideUp, StaggerContainer, StaggerItem } from "@/components/ui/motion";

const FEATURES = [
  {
    icon: <BookOpen className="h-6 w-6" />,
    title: "Chapter-wise Theory",
    description:
      "35+ chapters with expert-written notes, step-by-step derivations, and LaTeX-rendered formulas. Covers all JEE & NEET topics from first principles.",
    href: "/chapters",
    badge: null,
    color: "text-brand-500",
    bg: "bg-brand-50 dark:bg-brand-950/50",
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Practice Questions",
    description:
      "10,000+ questions with difficulty filters (Easy → Advanced), topic tags, hints, and fully worked solutions. Track your accuracy per topic.",
    href: "/practice",
    badge: null,
    color: "text-violet-500",
    bg: "bg-violet-50 dark:bg-violet-950/30",
  },
  {
    icon: <ClipboardList className="h-6 w-6" />,
    title: "Mock Tests",
    description:
      "200+ full-length tests with real JEE Main, JEE Advanced, and NEET patterns. Timed interface, question palette, and detailed post-test analysis.",
    href: "/mock-tests",
    badge: null,
    color: "text-orange-500",
    bg: "bg-orange-50 dark:bg-orange-950/30",
  },
  {
    icon: <Brain className="h-6 w-6" />,
    title: "AI Physics Tutor",
    description:
      "Ask any doubt and get instant, step-by-step explanations with LaTeX math. The AI understands JEE context and adapts to your level.",
    href: "/ai-tutor",
    badge: "New",
    color: "text-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
  },
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: "Progress Analytics",
    description:
      "Chapter completion heatmap, topic-wise accuracy, study streak, and weak-topic detection. Know exactly where to focus next.",
    href: "/dashboard",
    badge: null,
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-950/30",
  },
  {
    icon: <Calculator className="h-6 w-6" />,
    title: "Formula Hub",
    description:
      "Every Physics formula organised by chapter — with derivations, usage tips, and a quick-search. Print-ready formula sheets included.",
    href: "/formula-hub",
    badge: null,
    color: "text-pink-500",
    bg: "bg-pink-50 dark:bg-pink-950/30",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <SlideUp className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-500">
            Everything in one place
          </p>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            A complete Physics preparation system
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            From concept building to exam simulation — every tool you need to go from
            confused to confident.
          </p>
        </SlideUp>

        <StaggerContainer className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon, title, description, href, badge, color, bg }) => (
            <StaggerItem key={title}>
              <Link href={href} className="group block h-full">
                <Card className="h-full transition-all duration-200 hover:border-primary/40 hover:shadow-md">
                  <CardContent className="flex h-full flex-col gap-4 p-6">
                    <div className="flex items-start justify-between">
                      <div className={`rounded-xl p-3 ${bg}`}>
                        <span className={color}>{icon}</span>
                      </div>
                      {badge && <Badge variant="new">{badge}</Badge>}
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-1.5 font-semibold">{title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {description}
                      </p>
                    </div>
                    <div className={`flex items-center gap-1 text-sm font-medium ${color} transition-gap duration-150 group-hover:gap-2`}>
                      Learn more <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
