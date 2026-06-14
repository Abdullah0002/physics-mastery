"use client";

import { useRef, useEffect, KeyboardEvent } from "react";
import { Send, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const SUGGESTIONS = [
  "Explain Newton's Third Law with examples",
  "Derive the kinematic equations from first principles",
  "How does Gauss's Law simplify finding E-fields?",
  "What is the work-energy theorem?",
  "Explain SHM and its applications in JEE",
];

interface ChatInputProps {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
  disabled?: boolean;
  showSuggestions?: boolean;
}

export function ChatInput({
  value,
  onChange,
  onSend,
  disabled = false,
  showSuggestions = false,
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  }, [value]);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!disabled && value.trim()) onSend();
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Suggestion chips — shown only when chat is empty */}
      {showSuggestions && (
        <div className="flex flex-wrap gap-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => onChange(s)}
              className="flex items-center gap-1.5 rounded-full border bg-card/60 px-3 py-1.5 text-xs text-muted-foreground hover:border-primary/40 hover:text-foreground transition-colors"
            >
              <Sparkles className="h-3 w-3" />
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input bar */}
      <div
        className={cn(
          "flex items-end gap-2 rounded-2xl border bg-card/80 px-4 py-3 transition-colors",
          !disabled && "focus-within:border-primary/60"
        )}
      >
        <textarea
          ref={textareaRef}
          rows={1}
          placeholder="Ask any Physics doubt…"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className="flex-1 resize-none bg-transparent text-sm outline-none placeholder:text-muted-foreground disabled:opacity-50 min-h-[24px] max-h-[160px]"
        />
        <button
          type="button"
          onClick={onSend}
          disabled={disabled || !value.trim()}
          className={cn(
            "flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full transition-all",
            disabled || !value.trim()
              ? "bg-muted text-muted-foreground cursor-not-allowed"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          )}
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
      <p className="text-center text-xs text-muted-foreground">
        Press Enter to send · Shift+Enter for new line
      </p>
    </div>
  );
}
