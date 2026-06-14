"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  TrendingUp,
  BarChart2,
  Bookmark,
  StickyNote,
  Calendar,
  Settings,
  FlaskConical,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/dashboard",              icon: LayoutDashboard, label: "Overview" },
  { href: "/dashboard/progress",     icon: TrendingUp,      label: "My Progress" },
  { href: "/dashboard/analytics",    icon: BarChart2,       label: "Analytics" },
  { href: "/dashboard/bookmarks",    icon: Bookmark,        label: "Bookmarks" },
  { href: "/dashboard/notes",        icon: StickyNote,      label: "Notes" },
  { href: "/study-planner",          icon: Calendar,        label: "Study Planner" },
  { href: "/dashboard/settings",     icon: Settings,        label: "Settings" },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex w-52 shrink-0 flex-col border-r border-border/60 bg-card/30 px-3 py-6 gap-1">
      <div className="flex items-center gap-2 px-3 mb-4">
        <FlaskConical className="h-5 w-5 text-primary" />
        <span className="font-semibold text-sm">Dashboard</span>
      </div>

      {NAV_ITEMS.map((item) => {
        const isActive =
          item.href === "/dashboard"
            ? pathname === "/dashboard"
            : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-all",
              isActive
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-accent hover:text-foreground"
            )}
          >
            <item.icon className="h-4 w-4 shrink-0" />
            {item.label}
          </Link>
        );
      })}
    </aside>
  );
}
