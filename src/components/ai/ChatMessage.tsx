"use client";

import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { KatexRenderer } from "@/components/practice/KatexRenderer";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface ChatMessageProps {
  message: Message;
  isStreaming?: boolean;
}

export function ChatMessage({ message, isStreaming = false }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div className={cn("flex gap-3 items-start", isUser && "flex-row-reverse")}>
      {/* Avatar */}
      <div
        className={cn(
          "flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full",
          isUser ? "bg-primary text-primary-foreground" : "bg-muted border border-border"
        )}
      >
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>

      {/* Bubble */}
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
          isUser
            ? "bg-primary text-primary-foreground rounded-tr-sm"
            : "bg-card border border-border rounded-tl-sm"
        )}
      >
        {isUser ? (
          <span className="whitespace-pre-wrap">{message.content}</span>
        ) : (
          <KatexRenderer content={message.content} className="leading-relaxed" />
        )}
        {isStreaming && !isUser && (
          <span className="inline-block w-1.5 h-4 ml-0.5 bg-current animate-pulse rounded-full align-text-bottom" />
        )}
      </div>
    </div>
  );
}
