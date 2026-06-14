import type { Metadata } from "next";
import Link from "next/link";
import {
  Flame,
  Target,
  Clock,
  Zap,
  BookOpen,
  TrendingUp,
  ChevronRight,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import {
  DEMO_STATS,
  CLASS_11_AVG_PROGRESS,
  CLASS_12_AVG_PROGRESS,
} from "@/config/demo-progress";
import { StatCard } from "@/components/dashboard/StatCard";
import { StreakCalendar } from "@/components/dashboard/StreakCalendar";
import { DailyGoalWidget } from "@/components/dashboard/DailyGoalWidget";
import { WeakTopicsPanel } from "@/components/dashboard/WeakTopicsPanel";
import { RecentActivity } from "@/components/dashboard/RecentActivity";

export const metadata: Metadata = {
  title: `Dashboard — ${siteConfig.name}`,
};

function ProgressRing({
  value,
  label,
  sublabel,
  color,
}: {
  value: number;
  label: string;
  sublabel: string;
  color: string;
}) {
  const r = 38;
  const circ = 2 * Math.PI * r;
  const dash = (value / 100) * circ;
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative">
        <svg width="92" height="92" className="-rotate-90">
          <circle cx="46" cy="46" r={r} strokeWidth="8" stroke="currentColor"
            className="text-muted/25" fill="none" />
          <circle cx="46" cy="46" r={r} strokeWidth="8" stroke={color}
            fill="none" strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
            className="transition-all duration-700" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center rotate-90">
          <span className="text-xl font-bold leading-none">{value}%</span>
        </div>
      </div>
      <div className="text-center">
        <div className="text-sm font-medium">{label}</div>
        <div className="text-xs text-muted-foreground">{sublabel}</div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const s = DEMO_STATS;
  const studyHours = Math.round(s.totalStudyMinutes / 60);

  return (
    <div className="container mx-auto max-w-6xl px-4 sm:px-6 py-8 flex flex-col gap-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold mb-1">Welcome back 👋</h1>
        <p className="text-muted-foreground text-sm">
          Keep up your {s.currentStreak}-day streak — you&apos;re on a roll!
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard
          icon={Flame}
          label="Current Streak"
          value={`${s.currentStreak} days`}
          sub={`Best: ${s.longestStreak} days`}
          iconColor="text-orange-500"
          iconBg="bg-orange-500/10"
        />
        <StatCard
          icon={Zap}
          label="Questions Solved"
          value={s.totalQuestionsAttempted}
          sub={`${s.overallAccuracy}% accuracy`}
          trend="up"
          iconColor="text-blue-500"
          iconBg="bg-blue-500/10"
        />
        <StatCard
          icon={Clock}
          label="Study Time"
          value={`${studyHours}h`}
          sub="total this month"
          iconColor="text-emerald-500"
          iconBg="bg-emerald-500/10"
        />
        <StatCard
          icon={BookOpen}
          label="Chapters Done"
          value={`${s.completedChapters}/${s.totalChapters}`}
          sub={`${Math.round((s.completedChapters / s.totalChapters) * 100)}% complete`}
          iconColor="text-purple-500"
          iconBg="bg-purple-500/10"
        />
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Left column */}
        <div className="flex flex-col gap-5">
          {/* Daily goal */}
          <DailyGoalWidget />

          {/* Streak calendar */}
          <div className="rounded-xl border bg-card/60 p-4 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Flame className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-semibold">Study Streak</span>
              <span className="ml-auto text-xs text-muted-foreground">Last 6 months</span>
            </div>
            <StreakCalendar />
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-5">
          {/* Chapter progress rings */}
          <div className="rounded-xl border bg-card/60 p-4 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold">Overall Progress</span>
              </div>
              <Link
                href="/dashboard/progress"
                className="flex items-center text-xs text-primary hover:underline"
              >
                View all <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="flex justify-around py-2">
              <ProgressRing
                value={CLASS_11_AVG_PROGRESS}
                label="Class 11"
                sublabel="17 chapters"
                color="#6366f1"
              />
              <ProgressRing
                value={CLASS_12_AVG_PROGRESS}
                label="Class 12"
                sublabel="15 chapters"
                color="#10b981"
              />
              <ProgressRing
                value={Math.round((CLASS_11_AVG_PROGRESS + CLASS_12_AVG_PROGRESS) / 2)}
                label="Overall"
                sublabel="32 chapters"
                color="#f59e0b"
              />
            </div>
          </div>

          {/* Weak topics */}
          <WeakTopicsPanel />
        </div>
      </div>

      {/* Recent activity */}
      <RecentActivity />
    </div>
  );
}
