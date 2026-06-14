import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  sub?: string;
  trend?: "up" | "down" | "neutral";
  iconColor?: string;
  iconBg?: string;
}

export function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  trend,
  iconColor = "text-primary",
  iconBg = "bg-primary/10",
}: StatCardProps) {
  return (
    <div className="rounded-xl border bg-card/60 p-4 flex items-start gap-4 hover:border-primary/30 transition-colors">
      <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl", iconBg)}>
        <Icon className={cn("h-5 w-5", iconColor)} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs text-muted-foreground mb-0.5">{label}</div>
        <div className="text-2xl font-bold leading-none">{value}</div>
        {sub && (
          <div
            className={cn(
              "text-xs mt-1",
              trend === "up" ? "text-emerald-500" : trend === "down" ? "text-red-500" : "text-muted-foreground"
            )}
          >
            {sub}
          </div>
        )}
      </div>
    </div>
  );
}
