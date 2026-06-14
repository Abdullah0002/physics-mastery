"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CONCEPT_CARDS, PHYSICS_AREAS, type PhysicsArea } from "@/config/concept-cards";
import { KatexRenderer } from "@/components/practice/KatexRenderer";
import { cn } from "@/lib/utils";

const AREA_COLORS: Record<PhysicsArea, string> = {
  Mechanics: "text-blue-600 dark:text-blue-400 bg-blue-500/10",
  Electromagnetism: "text-amber-600 dark:text-amber-400 bg-amber-500/10",
  "Waves & Optics": "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10",
  "Modern Physics": "text-purple-600 dark:text-purple-400 bg-purple-500/10",
};

interface ConceptCardDisplayProps {
  card: (typeof CONCEPT_CARDS)[number];
  onAskAI?: (q: string) => void;
}

function ConceptCardDisplay({ card, onAskAI }: ConceptCardDisplayProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-xl border bg-card/60 p-4 flex flex-col gap-3 hover:border-primary/30 transition-colors">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <span
            className={cn(
              "inline-block rounded-full px-2 py-0.5 text-xs font-medium mb-1",
              AREA_COLORS[card.area]
            )}
          >
            {card.area}
          </span>
          <h3 className="text-sm font-semibold">{card.title}</h3>
          <p className="text-xs text-muted-foreground mt-0.5">{card.tagline}</p>
        </div>
      </div>

      {/* Formula preview */}
      {card.formula && (
        <div className="rounded-lg bg-muted/60 px-4 py-2.5 text-center overflow-x-auto">
          <KatexRenderer content={`$$${card.formula}$$`} />
        </div>
      )}

      {/* Collapsible detail */}
      <button
        type="button"
        onClick={() => setExpanded((e) => !e)}
        className="text-xs text-primary hover:underline text-left"
      >
        {expanded ? "Hide details" : "Show intuition & example"}
      </button>

      {expanded && (
        <div className="flex flex-col gap-2 text-xs text-muted-foreground">
          <p className="leading-relaxed">{card.intuition}</p>
          <div className="rounded-lg border-l-2 border-primary/40 bg-primary/5 px-3 py-2">
            <span className="font-medium text-foreground">Example: </span>
            <KatexRenderer content={card.example} />
          </div>
        </div>
      )}

      {/* Footer links */}
      <div className="flex items-center justify-between pt-1">
        <Link
          href={`/chapters/${card.chapterSlug}`}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
        >
          {card.chapterTitle}
          <ArrowRight className="h-3 w-3" />
        </Link>
        {onAskAI && (
          <button
            type="button"
            onClick={() => onAskAI(`Explain ${card.title} in detail with JEE examples`)}
            className="text-xs font-medium text-primary hover:underline"
          >
            Ask AI
          </button>
        )}
      </div>
    </div>
  );
}

interface ConceptExplainerProps {
  onAskAI?: (q: string) => void;
}

export function ConceptExplainer({ onAskAI }: ConceptExplainerProps) {
  const [activeArea, setActiveArea] = useState<PhysicsArea>("Mechanics");

  const cards = CONCEPT_CARDS.filter((c) => c.area === activeArea);

  return (
    <div className="flex flex-col gap-4">
      {/* Area tabs */}
      <div className="flex flex-wrap gap-2">
        {PHYSICS_AREAS.map((area) => (
          <button
            key={area}
            type="button"
            onClick={() => setActiveArea(area)}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-medium transition-colors",
              activeArea === area
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-accent hover:text-foreground"
            )}
          >
            {area}
          </button>
        ))}
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {cards.map((card) => (
          <ConceptCardDisplay key={card.id} card={card} onAskAI={onAskAI} />
        ))}
      </div>
    </div>
  );
}
