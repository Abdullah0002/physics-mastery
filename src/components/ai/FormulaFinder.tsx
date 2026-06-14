"use client";

import { useState, useMemo } from "react";
import { Search, Copy, Check } from "lucide-react";
import { FORMULAS, FORMULA_CHAPTERS, searchFormulas } from "@/config/formula-data";
import { KatexRenderer } from "@/components/practice/KatexRenderer";
import { cn } from "@/lib/utils";

export function FormulaFinder() {
  const [query, setQuery] = useState("");
  const [activeChapter, setActiveChapter] = useState("all");
  const [copied, setCopied] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let results = query.trim() ? searchFormulas(query) : FORMULAS;
    if (activeChapter !== "all") {
      results = results.filter((f) => f.chapterSlug === activeChapter);
    }
    return results;
  }, [query, activeChapter]);

  const handleCopy = (latex: string, id: string) => {
    void navigator.clipboard.writeText(`$${latex}$`);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search formulas…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-xl border bg-card/60 pl-9 pr-4 py-2.5 text-sm outline-none focus:border-primary/60 transition-colors"
        />
      </div>

      {/* Chapter filter chips */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveChapter("all")}
          className={cn(
            "rounded-full px-3 py-1 text-xs font-medium transition-colors",
            activeChapter === "all"
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-accent hover:text-foreground"
          )}
        >
          All
        </button>
        {FORMULA_CHAPTERS.map((ch) => (
          <button
            key={ch.slug}
            type="button"
            onClick={() => setActiveChapter(ch.slug)}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-medium transition-colors",
              activeChapter === ch.slug
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-accent hover:text-foreground"
            )}
          >
            {ch.title}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-xs text-muted-foreground">
        {filtered.length} formula{filtered.length !== 1 ? "s" : ""}
      </p>

      {/* Formula grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground text-sm">
          No formulas match &ldquo;{query}&rdquo;
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {filtered.map((formula) => (
            <div
              key={formula.id}
              className="group rounded-xl border bg-card/60 p-4 flex flex-col gap-3 hover:border-primary/40 transition-colors"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold">{formula.title}</p>
                  <p className="text-xs text-muted-foreground">{formula.chapterTitle}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(formula.latex, formula.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 p-1.5 rounded-lg hover:bg-muted"
                  title="Copy LaTeX"
                >
                  {copied === formula.id ? (
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                  ) : (
                    <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                  )}
                </button>
              </div>

              {/* Formula */}
              <div className="rounded-lg bg-muted/60 px-4 py-3 text-center overflow-x-auto">
                <KatexRenderer content={`$$${formula.latex}$$`} />
              </div>

              {/* Description */}
              <p className="text-xs text-muted-foreground">{formula.description}</p>

              {/* Variables */}
              {formula.variables.length > 0 && (
                <div className="flex flex-col gap-1">
                  {formula.variables.map((v) => (
                    <div key={v.symbol} className="flex items-baseline gap-2 text-xs">
                      <span className="font-mono text-primary min-w-[3rem] shrink-0">
                        <KatexRenderer content={`$${v.symbol}$`} />
                      </span>
                      <span className="text-muted-foreground">{v.meaning}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
