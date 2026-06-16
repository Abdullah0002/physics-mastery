import type { Metadata } from "next";
import { PYQModule } from "@/components/pyq/shared/PYQModule";
import { PYQ_CHAPTERS } from "@/components/pyq/data";

export const metadata: Metadata = {
  title: "Kinematics PYQs — JEE Main 2026",
  description:
    "JEE Main 2026 (January) Kinematics previous-year questions — Motion in One & Two Dimensions, with detailed step-by-step solutions, JEE shortcuts, common mistakes and publication-quality diagrams.",
  alternates: { canonical: "/pyqs/kinematics" },
};

export default function KinematicsPyqPage() {
  return <PYQModule data={PYQ_CHAPTERS.kinematics} showThemeToggle={false} />;
}
