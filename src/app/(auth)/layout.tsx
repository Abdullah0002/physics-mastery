import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left — brand panel */}
      <div className="relative hidden flex-col items-start justify-between bg-brand-950 p-10 text-white lg:flex">
        {/* Dot grid overlay */}
        <div className="absolute inset-0 dot-grid opacity-20" />

        {/* Floating physics formulas (decorative) */}
        <div className="absolute inset-0 overflow-hidden">
          {[
            { text: "F = ma", top: "20%", left: "10%", opacity: 0.15 },
            { text: "E = mc²", top: "35%", left: "60%", opacity: 0.12 },
            { text: "∇·E = ρ/ε₀", top: "60%", left: "15%", opacity: 0.1 },
            { text: "v² = u² + 2as", top: "75%", left: "55%", opacity: 0.12 },
            { text: "ΔS ≥ 0", top: "50%", left: "40%", opacity: 0.1 },
          ].map((f, i) => (
            <span
              key={i}
              className="absolute font-mono text-lg font-semibold select-none"
              style={{ top: f.top, left: f.left, opacity: f.opacity }}
            >
              {f.text}
            </span>
          ))}
        </div>

        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight">{siteConfig.name}</span>
          </Link>
        </div>

        <div className="relative z-10 space-y-4">
          <blockquote className="text-2xl font-semibold leading-snug">
            &ldquo;Physics is not a religion. If it were, we&apos;d have a much easier time raising money.&rdquo;
          </blockquote>
          <p className="text-sm text-white/60">— Leon Lederman</p>
        </div>

        <div className="relative z-10 text-sm text-white/50">
          {siteConfig.stats.students} students already learning
        </div>
      </div>

      {/* Right — auth form */}
      <div className="flex items-center justify-center p-6 lg:p-10">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="mb-8 flex justify-center lg:hidden">
            <Link href="/" className="text-xl font-bold tracking-tight">
              {siteConfig.name}
            </Link>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
