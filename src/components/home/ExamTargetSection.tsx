import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SlideUp, StaggerContainer, StaggerItem } from "@/components/ui/motion";

const EXAMS = [
  {
    label: "JEE Main",
    variant: "jee-main" as const,
    description: "90 questions · 3 hours · 300 marks",
    features: [
      "Chapter-wise weightage analysis",
      "5,000+ JEE Main PYQs",
      "50+ full-length mock tests",
      "NTA-style interface simulation",
    ],
    href: "/mock-tests?exam=JEE_MAIN",
    highlight: "Most popular",
    borderColor: "border-jee-main/30 hover:border-jee-main/60",
    bgColor: "bg-jee-main/5",
  },
  {
    label: "JEE Advanced",
    variant: "jee-advanced" as const,
    description: "Paper 1 + Paper 2 · 3h each · 360 marks",
    features: [
      "Concept-depth focus",
      "2,000+ JEE Advanced PYQs",
      "Integer & multi-correct practice",
      "Paragraph & matching questions",
    ],
    href: "/mock-tests?exam=JEE_ADVANCED",
    highlight: "Most challenging",
    borderColor: "border-jee-advanced/30 hover:border-jee-advanced/60",
    bgColor: "bg-jee-advanced/5",
  },
  {
    label: "NEET",
    variant: "neet" as const,
    description: "180 questions · 3h 20m · 720 marks",
    features: [
      "NCERT-aligned chapter notes",
      "2,000+ NEET Physics PYQs",
      "Topic-wise assertion-reason Qs",
      "Chapter weightage heatmap",
    ],
    href: "/mock-tests?exam=NEET",
    highlight: "Biology-aware coverage",
    borderColor: "border-neet/30 hover:border-neet/60",
    bgColor: "bg-neet/5",
  },
];

export function ExamTargetSection() {
  return (
    <section className="bg-muted/20 py-20 md:py-28">
      <div className="container">
        <SlideUp className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-500">
            Exam-specific prep
          </p>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Tailored for your target exam
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Whether you&apos;re aiming for IIT, NIT, or MBBS — every resource is
            mapped to the exact exam pattern and syllabus.
          </p>
        </SlideUp>

        <StaggerContainer className="grid gap-6 md:grid-cols-3">
          {EXAMS.map(({ label, variant, description, features, href, highlight, borderColor, bgColor }) => (
            <StaggerItem key={label}>
              <Link href={href} className="group block h-full">
                <div
                  className={`h-full rounded-2xl border-2 p-6 transition-all duration-200 ${borderColor} ${bgColor}`}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <Badge variant={variant} className="text-sm px-3 py-1">
                      {label}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{highlight}</span>
                  </div>
                  <p className="mb-4 text-sm text-muted-foreground">{description}</p>
                  <ul className="mb-6 space-y-2">
                    {features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-60" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center gap-1 text-sm font-medium text-foreground transition-gap duration-150 group-hover:gap-2">
                    Start preparing <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
