"use client";

import { useState } from "react";
import { Bot, FlaskConical, Lightbulb } from "lucide-react";
import { ChatInterface } from "@/components/ai/ChatInterface";
import { FormulaFinder } from "@/components/ai/FormulaFinder";
import { ConceptExplainer } from "@/components/ai/ConceptExplainer";
import { cn } from "@/lib/utils";

type Tab = "chat" | "formulas" | "concepts";

const TABS: { id: Tab; label: string; icon: typeof Bot }[] = [
  { id: "chat", label: "AI Chat", icon: Bot },
  { id: "formulas", label: "Formula Finder", icon: FlaskConical },
  { id: "concepts", label: "Concept Explainer", icon: Lightbulb },
];

export default function AiTutorPage() {
  const [tab, setTab] = useState<Tab>("chat");
  const [pendingQuestion, setPendingQuestion] = useState("");

  const handleAskAI = (q: string) => {
    setPendingQuestion(q);
    setTab("chat");
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      {/* Tab bar */}
      <div className="border-b border-border/60 bg-card/30 px-4">
        <div className="max-w-5xl mx-auto flex gap-1">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={cn(
                "flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors",
                tab === id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-hidden">
        {tab === "chat" && (
          <ChatInterface
            key={pendingQuestion}
            initialQuestion={pendingQuestion}
          />
        )}
        {tab === "formulas" && (
          <div className="h-full overflow-y-auto">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
              <div className="mb-5">
                <h1 className="text-xl font-bold mb-1">Formula Finder</h1>
                <p className="text-sm text-muted-foreground">
                  Search and browse physics formulas with LaTeX rendering. Click the copy icon to get
                  the LaTeX source.
                </p>
              </div>
              <FormulaFinder />
            </div>
          </div>
        )}
        {tab === "concepts" && (
          <div className="h-full overflow-y-auto">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
              <div className="mb-5">
                <h1 className="text-xl font-bold mb-1">Concept Explainer</h1>
                <p className="text-sm text-muted-foreground">
                  Key Physics concepts with intuition, formulas, and examples. Click &ldquo;Ask
                  AI&rdquo; to dive deeper.
                </p>
              </div>
              <ConceptExplainer onAskAI={handleAskAI} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
