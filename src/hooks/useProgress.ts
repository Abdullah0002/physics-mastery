"use client";

import { useEffect, useState } from "react";
import type { ProgressSummary } from "@/types";

interface UseProgressReturn {
  summary: ProgressSummary | null;
  weakTopics: { topicId: string; topicTitle: string; chapterTitle: string; accuracy: number }[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useProgress(): UseProgressReturn {
  const [summary, setSummary] = useState<ProgressSummary | null>(null);
  const [weakTopics, setWeakTopics] = useState<UseProgressReturn["weakTopics"]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);

    fetch("/api/progress")
      .then((r) => r.json())
      .then((json) => {
        if (cancelled) return;
        if (json.success) {
          setSummary(json.data.summary);
          setWeakTopics(json.data.weakTopics);
        } else {
          setError(json.error ?? "Failed to load progress");
        }
      })
      .catch(() => {
        if (!cancelled) setError("Network error");
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => { cancelled = true; };
  }, [tick]);

  return { summary, weakTopics, isLoading, error, refetch: () => setTick((t) => t + 1) };
}
