import type { Metadata } from "next";
import { KinematicsPYQModule } from "@/components/pyq/kinematics/KinematicsPYQModule";

export const metadata: Metadata = {
  title: "Kinematics PYQs — JEE Main 2026",
  description:
    "JEE Main 2026 (January) Kinematics previous-year questions — Motion in One & Two Dimensions, with detailed step-by-step solutions, JEE shortcuts, common mistakes and publication-quality diagrams.",
  alternates: { canonical: "/pyqs/kinematics" },
};

export default function KinematicsPyqPage() {
  // The host layout already manages the global `dark` class, so hide the
  // module's standalone toggle here. Set to true when used outside the app.
  return <KinematicsPYQModule showThemeToggle={false} />;
}
