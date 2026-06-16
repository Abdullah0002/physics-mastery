"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Persisted bookmark set backed by localStorage, scoped per chapter via `storageKey`.
 * Safe for SSR: reads localStorage only after mount.
 */
export function useBookmarks(storageKey: string) {
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());
  const [hydrated, setHydrated] = useState(false);

  // Load once on mount (and whenever the key changes).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      setBookmarks(raw ? new Set(JSON.parse(raw) as string[]) : new Set());
    } catch {
      setBookmarks(new Set());
    }
    setHydrated(true);
  }, [storageKey]);

  // Persist whenever the set changes (after hydration).
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify([...bookmarks]));
    } catch {
      /* storage may be unavailable (private mode) */
    }
  }, [bookmarks, hydrated, storageKey]);

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
