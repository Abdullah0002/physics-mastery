"use client";

import { useState } from "react";
import { Download, FileText, ClipboardList, BookOpen, Network, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  type Resource,
  type ResourceType,
  RESOURCE_TYPE_LABELS,
  RESOURCE_EXAM_LABELS,
  formatFileSize,
  formatDownloadCount,
} from "@/config/resources-data";

const TYPE_STYLES: Record<
  ResourceType,
  { icon: typeof FileText; color: string; bg: string }
> = {
  NOTES: {
    icon: BookOpen,
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-500/10",
  },
  DPP: {
    icon: ClipboardList,
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-500/10",
  },
  FORMULA_SHEET: {
    icon: FileText,
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  MIND_MAP: {
    icon: Network,
    color: "text-purple-600 dark:text-purple-400",
    bg: "bg-purple-500/10",
  },
};

const EXAM_CHIP_COLORS: Record<string, string> = {
  JEE_MAIN: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  JEE_ADVANCED: "bg-primary/10 text-primary",
  NEET: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
};

interface ResourceCardProps {
  resource: Resource;
}

export function ResourceCard({ resource: r }: ResourceCardProps) {
  const [downloaded, setDownloaded] = useState(false);
  const [count, setCount] = useState(r.downloadCount);
  const style = TYPE_STYLES[r.type];
  const Icon = style.icon;

  const handleDownload = () => {
    if (downloaded) return;
    setDownloaded(true);
    setCount((c) => c + 1);
    toast.success(`Downloading "${r.title}"`, {
      description: `${formatFileSize(r.fileSizeKB)} · ${r.pages} page${r.pages !== 1 ? "s" : ""}`,
    });
    const a = document.createElement("a");
    a.href = r.fileUrl;
    a.download = "";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="group flex flex-col rounded-2xl border bg-card/60 p-5 gap-4 hover:border-primary/40 hover:bg-card/90 transition-all">
      {/* Header */}
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-xl",
            style.bg
          )}
        >
          <Icon className={cn("h-5 w-5", style.color)} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap mb-0.5">
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-xs font-medium",
                style.bg,
                style.color
              )}
            >
              {RESOURCE_TYPE_LABELS[r.type]}
            </span>
            {r.isNew && (
              <span className="rounded-full bg-rose-500/10 px-2 py-0.5 text-xs font-semibold text-rose-500">
                New
              </span>
            )}
          </div>
          <h3 className="text-sm font-semibold leading-snug group-hover:text-primary transition-colors line-clamp-2">
            {r.title}
          </h3>
        </div>
      </div>

      {/* Description */}
      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
        {r.description}
      </p>

      {/* Exam tags */}
      <div className="flex flex-wrap gap-1.5">
        {r.exams.map((exam) => (
          <span
            key={exam}
            className={cn(
              "rounded-full px-2 py-0.5 text-xs font-medium",
              EXAM_CHIP_COLORS[exam] ?? "bg-muted text-muted-foreground"
            )}
          >
            {RESOURCE_EXAM_LABELS[exam]}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-auto pt-1 border-t border-border/40">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span>{r.pages}p</span>
          <span>{formatFileSize(r.fileSizeKB)}</span>
          <span className="flex items-center gap-1">
            <Download className="h-3 w-3" />
            {formatDownloadCount(count)}
          </span>
        </div>
        <button
          type="button"
          onClick={handleDownload}
          className={cn(
            "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all",
            downloaded
              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 cursor-default"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          )}
        >
          {downloaded ? (
            <>
              <CheckCircle2 className="h-3.5 w-3.5" />
              Downloaded
            </>
          ) : (
            <>
              <Download className="h-3.5 w-3.5" />
              Download
            </>
          )}
        </button>
      </div>
    </div>
  );
}
