// Figma node: 2940:13497
// D.1.8 Open Gift Button — posts to /api/secret-boxes/open, shows reward dialog
// 'use client' — triggers API call and dialog

"use client";

import { useState } from "react";

interface OpenGiftButtonProps {
  unopenedCount: number;
  onOpened?: (giftDescription: string) => void;
}

export function OpenGiftButton({ unopenedCount, onOpened }: OpenGiftButtonProps) {
  const [pending, setPending] = useState(false);
  const [rewardText, setRewardText] = useState<string | null>(null);
  const disabled = unopenedCount === 0 || pending;

  async function handleOpen() {
    if (disabled) return;
    setPending(true);

    try {
      const res = await fetch("/api/secret-boxes/open", { method: "POST" });
      if (res.ok) {
        const data: { giftDescription: string } = await res.json();
        setRewardText(data.giftDescription);
        onOpened?.(data.giftDescription);
      }
    } catch {
      // ignore
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        disabled={disabled}
        className="flex w-full items-center justify-center gap-2 rounded-full text-[16px] font-bold transition-colors"
        style={{
          height: 48,
          background: disabled
            ? "rgba(255,234,158,0.3)"
            : "var(--color-primary, #FFEA9E)",
          color: "#00101A",
          border: "none",
          cursor: disabled ? "not-allowed" : "pointer",
          borderRadius: 48,
        }}
        aria-disabled={disabled}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/kudos/icons/gift-box.svg"
          alt=""
          width={20}
          height={20}
          aria-hidden="true"
        />
        <span>
          {pending ? "Đang mở..." : `Mở quà${unopenedCount > 0 ? ` (${unopenedCount})` : ""}`}
        </span>
      </button>

      {/* Reward dialog */}
      {rewardText && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.7)" }}
          onClick={() => setRewardText(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Quà của bạn"
        >
          <div
            className="flex flex-col gap-4 rounded-2xl text-center"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "var(--color-bg-card, #00070C)",
              border: "1px solid var(--color-border, #998C5F)",
              padding: "40px 32px",
              maxWidth: 420,
            }}
          >
            <p className="text-[32px]" aria-hidden="true">🎁</p>
            <h3 className="text-[20px] font-bold" style={{ color: "var(--color-primary, #FFEA9E)" }}>
              Chúc mừng!
            </h3>
            <p className="text-[16px]" style={{ color: "#FFF" }}>
              {rewardText}
            </p>
            <button
              type="button"
              onClick={() => setRewardText(null)}
              className="rounded-full text-[14px] font-bold transition-colors hover:opacity-80"
              style={{
                height: 44,
                background: "var(--color-primary, #FFEA9E)",
                color: "#00101A",
                border: "none",
                cursor: "pointer",
              }}
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </>
  );
}
