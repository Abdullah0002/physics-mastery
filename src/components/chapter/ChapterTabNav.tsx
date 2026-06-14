"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Sigma, FlaskConical, FileText, PenLine } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = [
  { label: "Overview",  suffix: "",           icon: <BookOpen className="h-4 w-4" /> },
  { label: "Theory",    suffix: "/theory",    icon: <BookOpen className="h-4 w-4" /> },
  { label: "Formulas",  suffix: "/formulas",  icon: <Sigma className="h-4 w-4" /> },
  { label: "Problems",  suffix: "/problems",  icon: <PenLine className="h-4 w-4" /> },
  { label: "Practice",  suffix: "/practice",  icon: <FlaskConical className="h-4 w-4" /> },
  { label: "PYQs",      suffix: "/pyqs",      icon: <FileText className="h-4 w-4" /> },
];

export function ChapterTabNav({ baseHref }: { baseHref: string }) {
  const pathname = usePathname();

  return (
    <div className="border-b bg-background">
      <div className="container">
        <nav className="no-scrollbar -mb-px flex gap-0 overflow-x-auto">
          {TABS.map(({ label, suffix, icon }) => {
            const href = `${baseHref}${suffix}`;
            const isActive = suffix === ""
              ? pathname === baseHref
              : pathname.startsWith(`${baseHref}${suffix}`);

            return (
              <Link
                key={label}
                href={href}
                className={cn(
                  "flex shrink-0 items-center gap-1.5 border-b-2 px-4 py-3 text-sm font-medium transition-colors",
                  isActive
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                {icon}
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
