// T029 — US1: Live kudos feed client component
// Uses useKudosFeed to get real-time updates prepended to initial data

"use client";

import { useKudosFeed } from "@/hooks/useKudosFeed";
import { KudoPostCard } from "./KudoPostCard";
import { HeartButton } from "./HeartButton";
import { CopyLinkButton } from "./CopyLinkButton";
import type { Kudos } from "@/types/kudos";

interface KudosFeedProps {
  initialKudos: Kudos[];
  isAuthenticated: boolean;
  onAuthRequired?: () => void;
}

export function KudosFeed({ initialKudos, isAuthenticated, onAuthRequired }: KudosFeedProps) {
  const kudos = useKudosFeed(initialKudos);

  if (kudos.length === 0) {
    return (
      <div
        className="flex items-center justify-center py-20 text-center"
        style={{ color: "rgba(219,209,193,1)" }}
      >
        <p className="text-[16px]">
          No kudos yet — be the first to send one!
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {kudos.map((k) => (
        <KudoPostCard
          key={k.id}
          kudos={k}
          actionBar={
            // flex justify-between so HeartButton is left, CopyLinkButton is right
            <div className="flex items-center justify-between w-full">
              <HeartButton
                kudosId={k.id}
                initialHearted={k.hasHearted}
                initialCount={k.heartCount}
                requiresAuth={!isAuthenticated}
                onAuthRequired={onAuthRequired}
              />
              <CopyLinkButton kudosId={k.id} />
            </div>
          }
        />
      ))}
    </div>
  );
}
