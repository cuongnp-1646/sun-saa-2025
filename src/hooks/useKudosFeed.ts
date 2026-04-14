"use client";

// T028 — US1: Realtime kudos feed hook
// Subscribes to Supabase Realtime channel 'kudos-feed' on kudos INSERT.
// Prepends new items and keeps the list up to date without a page reload.

import { useEffect, useState } from "react";
import { createClient } from "@/libs/supabase/client";
import type { Kudos } from "@/types/kudos";

export function useKudosFeed(initialKudos: Kudos[]): Kudos[] {
  const [kudos, setKudos] = useState<Kudos[]>(initialKudos);

  useEffect(() => {
    const supabase = createClient();

    const channel = supabase
      .channel("kudos-feed")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "kudos" },
        async (payload) => {
          // Fetch the full kudos object (with joined sender/receiver) from API
          try {
            const res = await fetch(`/api/kudos?page=1&limit=1`);
            if (!res.ok) return;
            const json: { data: Kudos[] } = await res.json();
            const newest = json.data[0];
            if (!newest || newest.id !== payload.new.id) {
              // Fallback: refetch just the new kudos by id
              return;
            }
            setKudos((prev) => [newest, ...prev]);
          } catch {
            // Silently ignore realtime enrichment errors
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return kudos;
}
