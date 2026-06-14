"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UIState {
  sidebarOpen: boolean;
  mobileNavOpen: boolean;
  commandPaletteOpen: boolean;
  fontSize: "sm" | "md" | "lg";
  mathRenderer: "katex" | "mathjax";
  showHintsDefault: boolean;
  showSolutionAfterAttempt: boolean;
  examMode: "JEE_MAIN" | "JEE_ADVANCED" | "NEET" | "ALL";

  // Actions
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleMobileNav: () => void;
  setCommandPaletteOpen: (open: boolean) => void;
  setFontSize: (size: "sm" | "md" | "lg") => void;
  setExamMode: (mode: UIState["examMode"]) => void;
  setShowHintsDefault: (show: boolean) => void;
  setShowSolutionAfterAttempt: (show: boolean) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarOpen: true,
      mobileNavOpen: false,
      commandPaletteOpen: false,
      fontSize: "md",
      mathRenderer: "katex",
      showHintsDefault: false,
      showSolutionAfterAttempt: true,
      examMode: "ALL",

      toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      toggleMobileNav: () => set((s) => ({ mobileNavOpen: !s.mobileNavOpen })),
      setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),
      setFontSize: (size) => set({ fontSize: size }),
      setExamMode: (mode) => set({ examMode: mode }),
      setShowHintsDefault: (show) => set({ showHintsDefault: show }),
      setShowSolutionAfterAttempt: (show) => set({ showSolutionAfterAttempt: show }),
    }),
    {
      name: "physics-mastery-ui",
      partialize: (state) => ({
        fontSize: state.fontSize,
        examMode: state.examMode,
        showHintsDefault: state.showHintsDefault,
        showSolutionAfterAttempt: state.showSolutionAfterAttempt,
        sidebarOpen: state.sidebarOpen,
      }),
    }
  )
);
