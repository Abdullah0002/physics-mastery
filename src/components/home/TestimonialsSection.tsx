import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { SlideUp, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { siteConfig } from "@/config/site";

const TESTIMONIALS = [
  {
    name: "Arjun Sharma",
    result: "JEE Advanced AIR 847",
    initials: "AS",
    exam: "JEE Advanced",
    quote:
      "The derivation-first approach here finally made Rotational Mechanics click for me. I used to dread it — now it's my strongest chapter. The PYQ filter by topic saved so much revision time.",
  },
  {
    name: "Priya Nair",
    result: "NEET 695/720",
    initials: "PN",
    exam: "NEET",
    quote:
      "I went through three different platforms before this one. The formula hub alone is worth it — every formula organised exactly the way the NEET syllabus needs. The AI tutor cleared my Optics doubts at midnight before my exam.",
  },
  {
    name: "Rahul Gupta",
    result: "JEE Main 99.4 percentile",
    initials: "RG",
    exam: "JEE Main",
    quote:
      "The mock tests are scary accurate to the real exam pattern. My score jumped from 180 to 278 in two months just by grinding the chapter tests and reviewing the analytics dashboard.",
  },
  {
    name: "Sneha Patel",
    result: "JEE Advanced AIR 1203",
    initials: "SP",
    exam: "JEE Advanced",
    quote:
      "Electrostatics and EMI used to cost me marks every mock. After doing every PYQ here with the solution reveal, I was confident walking into the exam. Highly recommend for dropper students.",
  },
  {
    name: "Karan Mehta",
    result: "NEET 680/720",
    initials: "KM",
    exam: "NEET",
    quote:
      "The study planner kept me accountable for 6 months straight. I never missed a chapter because the weak-topic alerts would nudge me back. Physics went from my weakest to my strongest subject.",
  },
  {
    name: "Divya Reddy",
    result: "JEE Main 98.7 percentile",
    initials: "DR",
    exam: "JEE Main",
    quote:
      "The step-by-step derivations with LaTeX rendering are gorgeous. It's like having a textbook that actually explains WHY, not just HOW. I referred back to the Thermodynamics notes three times during revision.",
  },
];

const EXAM_VARIANT: Record<string, "jee-main" | "jee-advanced" | "neet"> = {
  "JEE Main": "jee-main",
  "JEE Advanced": "jee-advanced",
  NEET: "neet",
};

export function TestimonialsSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <SlideUp className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-500">
            Student stories
          </p>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Real results from real students
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            {siteConfig.stats.successStories} students have used AbdOfPhysics to achieve their dream ranks.
            Here&apos;s what a few of them have to say.
          </p>
        </SlideUp>

        <StaggerContainer className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map(({ name, result, initials, exam, quote }) => (
            <StaggerItem key={name}>
              <Card className="h-full">
                <CardContent className="flex h-full flex-col gap-4 p-6">
                  {/* Stars */}
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                    &ldquo;{quote}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3 border-t pt-4">
                    <Avatar className="h-9 w-9 bg-brand-100 text-brand-700 dark:bg-brand-900">
                      <AvatarFallback className="bg-brand-100 text-brand-700 dark:bg-brand-900 dark:text-brand-300 text-xs font-semibold">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate">{name}</p>
                      <p className="text-xs text-muted-foreground truncate">{result}</p>
                    </div>
                    <Badge variant={EXAM_VARIANT[exam]} className="shrink-0 text-2xs">
                      {exam}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

