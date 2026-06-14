"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export function useBookmarks() {
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);

  // Load bookmarks on mount
  useEffect(() => {
    fetch("/api/bookmarks")
      .then((r) => r.json())
      .then((json) => {
        if (json.success) {
          setBookmarkedIds(new Set(json.data.map((b: { questionId: string }) => b.questionId)));
        }
      })
      .catch(() => {});
  }, []);

  const toggle = useCallback(async (questionId: string) => {
    const isBookmarked = bookmarkedIds.has(questionId);
    setIsLoading(true);

    // Optimistic update
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      isBookmarked ? next.delete(questionId) : next.add(questionId);
      return next;
    });

    try {
      const res = await fetch("/api/bookmarks", {
        method: isBookmarked ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questionId }),
      });

      const json = await res.json();
      if (!json.success) throw new Error(json.error);

      toast.success(isBookmarked ? "Bookmark removed" : "Question bookmarked");
    } catch {
      // Revert on failure
      setBookmarkedIds((prev) => {
        const next = new Set(prev);
        isBookmarked ? next.add(questionId) : next.delete(questionId);
        return next;
      });
      toast.error("Failed to update bookmark");
    } finally {
      setIsLoading(false);
    }
  }, [bookmarkedIds]);

  return {
    bookmarkedIds,
    isBookmarked: (id: string) => bookmarkedIds.has(id),
    toggle,
    isLoading,
  };
}
