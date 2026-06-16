import type { Metadata } from "next";
import { PYQModule } from "@/components/pyq/shared/PYQModule";
import { PYQ_CHAPTERS } from "@/components/pyq/data";

export const metadata: Metadata = {
  title: "Capacitance PYQs — JEE Main 2026",
  description:
    "JEE Main 2026 (January) Capacitance previous-year questions with detailed step-by-step solutions, JEE shortcuts, common mistakes and publication-quality circuit & dielectric diagrams.",
  alternates: { canonical: "/pyqs/capacitance" },
};

export default function CapacitancePyqPage() {
  return <PYQModule data={PYQ_CHAPTERS.capacitance} showThemeToggle={false} />;
}
