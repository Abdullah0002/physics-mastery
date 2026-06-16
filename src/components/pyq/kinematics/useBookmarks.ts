"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "kinematics-pyq-bookmarks";

/**
 * Persisted bookmark set backed by localStorage.
 * Safe for SSR: reads localStorage only after mount.
 */
export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());
  const [hydrated, setHydrated] = useState(false);

  // Load once on mount.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setBookmarks(new Set(JSON.parse(raw) as string[]));
    } catch {
      /* ignore malformed storage */
    }
    setHydrated(true);
  }, []);

  // Persist whenever the set changes (after hydration).
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...bookmarks]));
    } catch {
      /* storage may be unavailable (private mode) */
    }
  }, [bookmarks, hydrated]);

  const toggleBookmark = useCallback((id: string) => {
    setBookmarks((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const isBookmarked = useCallback((id: string) => bookmarks.has(id), [bookmarks]);

  return { bookmarks, isBookmarked, toggleBookmark, hydrated };
}
