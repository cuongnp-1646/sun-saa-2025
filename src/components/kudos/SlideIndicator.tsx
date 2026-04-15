// Figma node: 2940:13471 (PC) / 6885:9098 (SP)
// B.5 Slide Indicator — prev/next controls + X/total text
// 'use client' — receives activeIndex + total, calls onPrev/onNext

"use client";

interface SlideIndicatorProps {
  activeIndex: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
}

export function SlideIndicator({
  activeIndex,
  total,
  onPrev,
  onNext,
}: SlideIndicatorProps) {
  const isFirst = activeIndex === 0;
  const isLast = activeIndex === total - 1;

  const btnStyle = (disabled: boolean) => ({
    width: 24,
    height: 24,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "none",
    border: "none",
    padding: 0,
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.4 : 1,
  });

  return (
    <div
      className="inline-flex items-center gap-3"
      style={{
        height: 40,
        borderRadius: 48,
        border: "0.5px solid var(--color-primary, #FFEA9E)",
        padding: "8px 16px",
      }}
      role="group"
      aria-label="Điều hướng carousel"
    >
      <button
        type="button"
        onClick={onPrev}
        disabled={isFirst}
        style={btnStyle(isFirst)}
        aria-label="Slide trước"
      >
        {/* chevron-right.svg file actually contains a LEFT-pointing chevron (<) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/kudos/icons/chevron-right.svg"
          alt=""
          width={20}
          height={20}
          aria-hidden="true"
        />
      </button>

      <span
        className="text-[16px] select-none"
        style={{ color: "var(--color-primary, #FFEA9E)", minWidth: 36, textAlign: "center" }}
        aria-live="polite"
        aria-atomic="true"
      >
        {activeIndex + 1}/{total}
      </span>

      <button
        type="button"
        onClick={onNext}
        disabled={isLast}
        style={btnStyle(isLast)}
        aria-label="Slide tiếp theo"
      >
        {/* chevron-left.svg file actually contains a RIGHT-pointing chevron (>) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/kudos/icons/chevron-left.svg"
          alt=""
          width={20}
          height={20}
          aria-hidden="true"
        />
      </button>
    </div>
  );
}
