"use client";

import { useEffect, useRef, useState } from "react";

interface UseTimerOptions {
  initialSeconds: number;
  onExpire?: () => void;
  autoStart?: boolean;
}

export function useCountdownTimer({
  initialSeconds,
  onExpire,
  autoStart = false,
}: UseTimerOptions) {
  const [remaining, setRemaining] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(autoStart);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          setIsRunning(false);
          onExpire?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current!);
  }, [isRunning, onExpire]);

  const start = () => setIsRunning(true);
  const pause = () => setIsRunning(false);
  const reset = (seconds?: number) => {
    setIsRunning(false);
    setRemaining(seconds ?? initialSeconds);
  };

  const hours = Math.floor(remaining / 3600);
  const minutes = Math.floor((remaining % 3600) / 60);
  const seconds = remaining % 60;

  const formatted = hours > 0
    ? `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
    : `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  const isExpired = remaining === 0;
  const isWarning = remaining > 0 && remaining <= 300; // last 5 minutes
  const isCritical = remaining > 0 && remaining <= 60; // last 1 minute

  return {
    remaining,
    formatted,
    hours,
    minutes,
    seconds,
    isRunning,
    isExpired,
    isWarning,
    isCritical,
    start,
    pause,
    reset,
  };
}

// Stopwatch (counts up)
export function useStopwatch(autoStart = false) {
  const [elapsed, setElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(autoStart);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!isRunning) return;
    intervalRef.current = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(intervalRef.current!);
  }, [isRunning]);

  return {
    elapsed,
    isRunning,
    start: () => setIsRunning(true),
    pause: () => setIsRunning(false),
    reset: () => { setIsRunning(false); setElapsed(0); },
  };
}
