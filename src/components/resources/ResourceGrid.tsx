"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import {
  RESOURCES,
  RESOURCE_TYPE_LABELS,
  RESOURCE_EXAM_LABELS,
  type ResourceType,
  type ResourceExam,
} from "@/config/resources-data";
import { ResourceCard } from "./ResourceCard";
import { cn } from "@/lib/utils";

const TYPE_FILTERS: { label: string; value: ResourceType | "ALL" }[] = [
  { label: "All Types", value: "ALL" },
  { label: "Notes PDF", value: "NOTES" },
  { label: "DPP", value: "DPP" },
  { label: "Formula Sheet", value: "FORMULA_SHEET" },
  { label: "Mind Map", value: "MIND_MAP" },
];

const EXAM_FILTERS: { label: string; value: ResourceExam | "ALL" }[] = [
  { label: "All Exams", value: "ALL" },
  { label: "JEE Main", value: "JEE_MAIN" },
  { label: "JEE Advanced", value: "JEE_ADVANCED" },
  { label: "NEET", value: "NEET" },
];

export function ResourceGrid() {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<ResourceType | "ALL">("ALL");
  const [examFilter, setExamFilter] = useState<ResourceExam | "ALL">("ALL");
  const [showNew, setShowNew] = useState(false);

  const filtered = useMemo(() => {
    let result = RESOURCES;
    const q = query.trim().toLowerCase();
    if (q) {
      result = result.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.chapterTitle.toLowerCase().includes(q)
      );
    }
    if (typeFilter !== "ALL") result = result.filter((r) => r.type === typeFilter);
    if (examFilter !== "ALL") result = result.filter((r) => r.exams.includes(examFilter));
    if (showNew) result = result.filter((r) => r.isNew);
    return result;
  }, [query, typeFilter, examFilter, showNew]);

  return (
    <div className="flex flex-col gap-5">
      {/* Search + New toggle */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search resources…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-xl border bg-card/60 pl-9 pr-4 py-2.5 text-sm outline-none focus:border-primary/60 transition-colors"
          />
        </div>
        <button
          type="button"
          onClick={() => setShowNew((v) => !v)}
          className={cn(
            "rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors whitespace-nowrap",
            showNew
              ? "bg-rose-500/10 border-rose-500/30 text-rose-500"
              : "hover:bg-accent text-muted-foreground"
          )}
        >
          New only
        </button>
      </div>

      {/* Type filter */}
      <div className="flex flex-wrap gap-2">
        {TYPE_FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => setTypeFilter(f.value)}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-medium transition-colors",
              typeFilter === f.value
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-accent hover:text-foreground"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Exam filter */}
      <div className="flex flex-wrap gap-2">
        {EXAM_FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => setExamFilter(f.value)}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-medium transition-colors",
              examFilter === f.value
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-accent hover:text-foreground"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Count */}
      <p className="text-xs text-muted-foreground">
        {filtered.length} resource{filtered.length !== 1 ? "s" : ""}
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground text-sm">
          No resources match your filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((r) => (
            <ResourceCard key={r.id} resource={r} />
          ))}
        </div>
      )}
    </div>
  );
}
