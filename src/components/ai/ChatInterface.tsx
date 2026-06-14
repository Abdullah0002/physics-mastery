"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Trash2 } from "lucide-react";
import { ChatMessage, type Message } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { cn } from "@/lib/utils";

let msgCounter = 0;
function nextId() {
  return `msg-${++msgCounter}`;
}

interface ChatInterfaceProps {
  initialQuestion?: string;
}

export function ChatInterface({ initialQuestion }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState(initialQuestion ?? "");
  const [isStreaming, setIsStreaming] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = useCallback(async () => {
    const text = input.trim();
    if (!text || isStreaming) return;

    const userMsg: Message = { id: nextId(), role: "user", content: text };
    const assistantId = nextId();
    const assistantMsg: Message = { id: assistantId, role: "assistant", content: "" };

    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setInput("");
    setIsStreaming(true);

    const history = messages.map((m) => ({ role: m.role, content: m.content }));

    abortRef.current = new AbortController();

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history }),
        signal: abortRef.current.signal,
      });

      if (!res.ok || !res.body) {
        throw new Error("Failed to connect to AI service");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const parts = buffer.split("\n\n");
        buffer = parts.pop() ?? "";

        for (const part of parts) {
          if (!part.startsWith("data: ")) continue;
          const data = part.slice(6).trim();
          if (data === "[DONE]") break;
          try {
            const { text: chunk } = JSON.parse(data) as { text: string };
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantId ? { ...m, content: m.content + chunk } : m
              )
            );
          } catch {
            // skip malformed chunk
          }
        }
      }
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? {
                  ...m,
                  content: "Sorry, I couldn't connect to the AI service. Please try again.",
                }
              : m
          )
        );
      }
    } finally {
      setIsStreaming(false);
      abortRef.current = null;
    }
  }, [input, isStreaming, messages]);

  const handleClear = () => {
    abortRef.current?.abort();
    setMessages([]);
    setInput("");
    setIsStreaming(false);
  };

  const isEmpty = messages.length === 0;

  return (
    <div className="flex flex-col h-full min-h-[60vh]">
      {/* Messages area */}
      <div
        className={cn(
          "flex-1 overflow-y-auto px-2 py-4",
          isEmpty && "flex flex-col items-center justify-center"
        )}
      >
        {isEmpty ? (
          <div className="text-center flex flex-col items-center gap-3 mb-6">
            <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-2xl">⚛️</span>
            </div>
            <div>
              <h2 className="text-lg font-semibold">Physics AI Tutor</h2>
              <p className="text-sm text-muted-foreground mt-1 max-w-sm">
                Ask any JEE / NEET Physics doubt — get step-by-step solutions with full LaTeX math.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4 max-w-3xl mx-auto">
            {messages.map((msg, i) => (
              <ChatMessage
                key={msg.id}
                message={msg}
                isStreaming={isStreaming && i === messages.length - 1 && msg.role === "assistant"}
              />
            ))}
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      {/* Input bar */}
      <div className="border-t border-border/60 bg-background/80 backdrop-blur-sm px-4 py-4">
        <div className="max-w-3xl mx-auto">
          {!isEmpty && (
            <div className="flex justify-end mb-2">
              <button
                type="button"
                onClick={handleClear}
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-destructive transition-colors"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Clear chat
              </button>
            </div>
          )}
          <ChatInput
            value={input}
            onChange={setInput}
            onSend={handleSend}
            disabled={isStreaming}
            showSuggestions={isEmpty}
          />
        </div>
      </div>
    </div>
  );
}
