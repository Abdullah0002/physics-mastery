import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Difficulty, ExamType, QuestionType } from "@/types";

// Tailwind class merger
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Slugify a string for URLs
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Format numbers with commas
export function formatNumber(n: number): string {
  return new Intl.NumberFormat("en-IN").format(n);
}

// Format file size
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// Format duration in minutes to human-readable
export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes}m`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

// Format seconds to MM:SS
export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

// Calculate percentage
export function percentage(value: number, total: number, decimals = 1): number {
  if (total === 0) return 0;
  return parseFloat(((value / total) * 100).toFixed(decimals));
}

// Difficulty label/color map
export const DIFFICULTY_CONFIG: Record<
  Difficulty,
  { label: string; color: string; bg: string; border: string }
> = {
  EASY: {
    label: "Easy",
    color: "text-easy",
    bg: "bg-easy/10",
    border: "border-easy/30",
  },
  MEDIUM: {
    label: "Medium",
    color: "text-medium",
    bg: "bg-medium/10",
    border: "border-medium/30",
  },
  HARD: {
    label: "Hard",
    color: "text-hard",
    bg: "bg-hard/10",
    border: "border-hard/30",
  },
  ADVANCED: {
    label: "Advanced",
    color: "text-advanced",
    bg: "bg-advanced/10",
    border: "border-advanced/30",
  },
};

// Exam label/color map
export const EXAM_CONFIG: Record<
  ExamType,
  { label: string; shortLabel: string; color: string; bg: string }
> = {
  JEE_MAIN: {
    label: "JEE Main",
    shortLabel: "JEE M",
    color: "text-jee-main",
    bg: "bg-jee-main/10",
  },
  JEE_ADVANCED: {
    label: "JEE Advanced",
    shortLabel: "JEE Adv",
    color: "text-jee-advanced",
    bg: "bg-jee-advanced/10",
  },
  NEET: {
    label: "NEET",
    shortLabel: "NEET",
    color: "text-neet",
    bg: "bg-neet/10",
  },
  BITSAT: {
    label: "BITSAT",
    shortLabel: "BITS",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  INTERNAL: {
    label: "Internal",
    shortLabel: "Int",
    color: "text-gray-500",
    bg: "bg-gray-500/10",
  },
};

// Question type labels
export const QUESTION_TYPE_LABELS: Record<QuestionType, string> = {
  MCQ_SINGLE: "Single Correct",
  MCQ_MULTIPLE: "Multiple Correct",
  INTEGER: "Integer Type",
  NUMERICAL: "Numerical Value",
  SUBJECTIVE: "Subjective",
  MATCH_COLUMN: "Match the Column",
  ASSERTION_REASON: "Assertion-Reason",
  COMPREHENSION: "Comprehension",
};

// Truncate string
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 3) + "...";
}

// Generate a random ID (for client-side temp IDs)
export function generateId(): string {
  return Math.random().toString(36).slice(2, 11);
}

// Debounce function
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  ms: number,
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}

// Clamp number between min and max
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

// Check if date is today
export function isToday(date: Date): boolean {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

// Days between two dates
export function daysBetween(a: Date, b: Date): number {
  const ms = Math.abs(b.getTime() - a.getTime());
  return Math.floor(ms / (1000 * 60 * 60 * 24));
}

// Format relative time (e.g., "2 days ago")
export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}
