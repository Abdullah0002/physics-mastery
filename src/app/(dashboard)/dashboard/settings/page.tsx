"use client";

import { siteConfig } from "@/config/site";
import { useUIStore } from "@/store/uiStore";
import { cn } from "@/lib/utils";

// metadata cannot be exported from a client component — handled via layout title

type ExamMode = "JEE_MAIN" | "JEE_ADVANCED" | "NEET" | "ALL";
type FontSize = "sm" | "md" | "lg";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-base font-semibold mb-3 mt-6 first:mt-0">{children}</h2>;
}

function Row({ label, description, children }: { label: string; description?: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3 border-b border-border/50 last:border-0">
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-medium">{label}</span>
        {description && <span className="text-xs text-muted-foreground">{description}</span>}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        checked ? "bg-primary" : "bg-muted"
      )}
    >
      <span
        className={cn(
          "inline-block h-4 w-4 rounded-full bg-white shadow transition-transform",
          checked ? "translate-x-6" : "translate-x-1"
        )}
      />
    </button>
  );
}

function ChipGroup<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: { label: string; value: T }[];
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          className={cn(
            "rounded-full px-3 py-1 text-xs font-medium transition-colors",
            value === o.value
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-accent hover:text-foreground"
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

const EXAM_OPTIONS: { label: string; value: ExamMode }[] = [
  { label: "All Exams", value: "ALL" },
  { label: "JEE Main", value: "JEE_MAIN" },
  { label: "JEE Advanced", value: "JEE_ADVANCED" },
  { label: "NEET", value: "NEET" },
];

const FONT_OPTIONS: { label: string; value: FontSize }[] = [
  { label: "Small", value: "sm" },
  { label: "Medium", value: "md" },
  { label: "Large", value: "lg" },
];

export default function SettingsPage() {
  const {
    examMode, setExamMode,
    fontSize, setFontSize,
    showHintsDefault, setShowHintsDefault,
    showSolutionAfterAttempt, setShowSolutionAfterAttempt,
  } = useUIStore();

  return (
    <div className="container mx-auto max-w-2xl px-4 sm:px-6 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Settings</h1>
        <p className="text-muted-foreground text-sm">
          Preferences are saved locally in your browser.
        </p>
      </div>

      {/* Study preferences */}
      <div className="rounded-xl border bg-card/60 p-4">
        <SectionTitle>Study Preferences</SectionTitle>

        <Row
          label="Target Exam"
          description="Filters questions and content to your target exam."
        >
          <ChipGroup<ExamMode>
            value={examMode}
            options={EXAM_OPTIONS}
            onChange={setExamMode}
          />
        </Row>

        <Row
          label="Show hints by default"
          description="Automatically expand the hint section when a question loads."
        >
          <Toggle checked={showHintsDefault} onChange={setShowHintsDefault} />
        </Row>

        <Row
          label="Show solution after attempt"
          description="Reveal the full solution once you submit an answer."
        >
          <Toggle checked={showSolutionAfterAttempt} onChange={setShowSolutionAfterAttempt} />
        </Row>
      </div>

      {/* Display */}
      <div className="rounded-xl border bg-card/60 p-4 mt-4">
        <SectionTitle>Display</SectionTitle>

        <Row
          label="Font size"
          description="Applies to question and content text."
        >
          <ChipGroup<FontSize>
            value={fontSize}
            options={FONT_OPTIONS}
            onChange={setFontSize}
          />
        </Row>
      </div>

      {/* Account */}
      <div className="rounded-xl border bg-card/60 p-4 mt-4">
        <SectionTitle>Account</SectionTitle>

        <Row label="Email" description="Your registered email address.">
          <span className="text-sm text-muted-foreground">abd161199@gmail.com</span>
        </Row>

        <Row label="Platform version" description={`${siteConfig.name}`}>
          <span className="text-xs font-mono bg-muted px-2 py-0.5 rounded">v0.8.0</span>
        </Row>
      </div>
    </div>
  );
}
