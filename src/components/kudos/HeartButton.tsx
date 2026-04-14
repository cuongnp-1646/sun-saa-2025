// Figma node: I3127:21871;256:5175
// C.4.1 Heart Button — optimistic UI heart toggle
// 'use client' — manages local heart state

"use client";

import { useHeartToggle } from "@/hooks/useHeartToggle";

interface HeartButtonProps {
  kudosId: string;
  initialHearted: boolean;
  initialCount: number;
  requiresAuth?: boolean;
  onAuthRequired?: () => void;
}

export function HeartButton({
  kudosId,
  initialHearted,
  initialCount,
  requiresAuth = false,
  onAuthRequired,
}: HeartButtonProps) {
  const { hearted, count, pending, toggle } = useHeartToggle({
    kudosId,
    initialHearted,
    initialCount,
  });

  function handleClick() {
    if (requiresAuth) {
      onAuthRequired?.();
      return;
    }
    toggle();
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={pending}
      className="flex items-center gap-1 transition-opacity"
      style={{
        opacity: pending ? 0.6 : 1,
        cursor: pending ? "not-allowed" : "pointer",
        background: "none",
        border: "none",
        padding: 0,
      }}
      aria-label={hearted ? "Bỏ thích kudos này" : "Thích kudos này"}
      aria-pressed={hearted}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/kudos/icons/heart.svg"
        alt=""
        width={20}
        height={20}
        style={{
          filter: hearted
            ? "brightness(0) saturate(100%) invert(22%) sepia(74%) saturate(2185%) hue-rotate(342deg) brightness(97%) contrast(91%)"
            : "brightness(0) saturate(100%) invert(60%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(90%) contrast(90%)",
          transition: "filter 0.15s ease",
        }}
        aria-hidden="true"
      />
      <span
        className="text-[14px]"
        style={{
          color: hearted ? "rgba(212,39,29,1)" : "rgba(153,153,153,1)",
          transition: "color 0.15s ease",
        }}
      >
        {count}
      </span>
    </button>
  );
}
