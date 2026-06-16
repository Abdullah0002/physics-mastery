import type { Metadata } from "next";
import { PYQModule } from "@/components/pyq/shared/PYQModule";
import { PYQ_CHAPTERS } from "@/components/pyq/data";

export const metadata: Metadata = {
  title: "Alternating Current PYQs — JEE Main 2026",
  description:
    "JEE Main 2026 (January) Alternating Current previous-year questions with detailed step-by-step solutions, JEE shortcuts, common mistakes and publication-quality circuit diagrams.",
  alternates: { canonical: "/pyqs/alternating-current" },
};

export default function AlternatingCurrentPyqPage() {
  return <PYQModule data={PYQ_CHAPTERS["alternating-current"]} showThemeToggle={false} />;
}
