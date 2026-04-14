// US5 — Heart toggle hook with optimistic UI
"use client";

import { useState, useCallback } from "react";

interface UseHeartToggleOptions {
  kudosId: string;
  initialHearted: boolean;
  initialCount: number;
}

export function useHeartToggle({
  kudosId,
  initialHearted,
  initialCount,
}: UseHeartToggleOptions) {
  const [hearted, setHearted] = useState(initialHearted);
  const [count, setCount] = useState(initialCount);
  const [pending, setPending] = useState(false);

  const toggle = useCallback(async () => {
    if (pending) return;

    // Optimistic update
    const nextHearted = !hearted;
    const nextCount = nextHearted ? count + 1 : count - 1;
    setHearted(nextHearted);
    setCount(nextCount);
    setPending(true);

    try {
      const res = await fetch(`/api/kudos/${kudosId}/heart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        // Revert on error
        setHearted(hearted);
        setCount(count);
      } else {
        const data = (await res.json()) as { hearted: boolean; heartCount: number };
        setHearted(data.hearted);
        setCount(data.heartCount);
      }
    } catch {
      // Revert on network error
      setHearted(hearted);
      setCount(count);
    } finally {
      setPending(false);
    }
  }, [kudosId, hearted, count, pending]);

  return { hearted, count, pending, toggle };
}
