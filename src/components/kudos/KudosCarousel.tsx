// Figma node: 2940:13461
// B.2 Kudos Highlight Carousel — center-snapping with gradient fade edges
// Active card: 4px gold border. Uses ResizeObserver to center by container width.

"use client";

import { useState, useRef, useEffect } from "react";
import { KudoHighlightCard } from "./KudoHighlightCard";
import { SlideIndicator } from "./SlideIndicator";
import type { Kudos } from "@/types/kudos";

interface KudosCarouselProps {
  kudos: Kudos[];
}

const CARD_WIDTH = 340;
const CARD_GAP = 24;

export function KudosCarousel({ kudos }: KudosCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Measure container width so we can compute the exact centering offset.
  // translateX(%) is relative to the element itself, not the parent — we need
  // the actual container pixel width to center the active card correctly.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new ResizeObserver(([entry]) => {
      setContainerWidth(entry.contentRect.width);
    });
    obs.observe(el);
    setContainerWidth(el.offsetWidth);
    return () => obs.disconnect();
  }, []);

  if (kudos.length === 0) {
    return (
      <div
        className="flex items-center justify-center py-16"
        style={{ color: "rgba(219,209,193,1)" }}
      >
        <p className="text-[14px]">Chưa có highlight kudos nào.</p>
      </div>
    );
  }

  const total = kudos.length;

  function onPrev() {
    setActiveIndex((i) => Math.max(0, i - 1));
  }
  function onNext() {
    setActiveIndex((i) => Math.min(total - 1, i + 1));
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowLeft") { e.preventDefault(); onPrev(); }
    if (e.key === "ArrowRight") { e.preventDefault(); onNext(); }
  }

  // Center the active card:
  // Track starts at x=0. Card i has its left edge at i*(CARD_WIDTH+CARD_GAP).
  // We want the center of card i to align with the container center:
  //   containerWidth/2 == i*(CARD_WIDTH+CARD_GAP) + CARD_WIDTH/2 + translateX
  //   translateX = containerWidth/2 - i*(CARD_WIDTH+CARD_GAP) - CARD_WIDTH/2
  const offset = containerWidth
    ? Math.round(
        containerWidth / 2 -
          activeIndex * (CARD_WIDTH + CARD_GAP) -
          CARD_WIDTH / 2
      )
    : 0;

  return (
    <div
      className="flex flex-col items-center gap-6 outline-none"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      role="group"
      aria-label="Highlight kudos carousel — use arrow keys to navigate"
    >
      {/* Overflow-hidden wrapper — measured by ResizeObserver */}
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden"
        style={{ padding: "8px 0" }}
      >
        {/* Left gradient fade */}
        <div
          className="pointer-events-none absolute left-0 top-0 bottom-0 z-10"
          style={{
            width: "120px",
            background: "linear-gradient(to right, #00101A 0%, transparent 100%)",
          }}
          aria-hidden="true"
        />
        {/* Right gradient fade */}
        <div
          className="pointer-events-none absolute right-0 top-0 bottom-0 z-10"
          style={{
            width: "120px",
            background: "linear-gradient(to left, #00101A 0%, transparent 100%)",
          }}
          aria-hidden="true"
        />

        {/* Card track */}
        <div
          className="flex"
          style={{
            gap: CARD_GAP,
            transform: `translateX(${offset}px)`,
            transition: "transform 300ms ease-in-out",
            willChange: "transform",
          }}
          role="list"
          aria-label="Highlight kudos carousel"
        >
          {kudos.map((k, i) => (
            <div
              key={k.id}
              role="listitem"
              aria-hidden={i !== activeIndex}
              style={{
                opacity: i === activeIndex ? 1 : 0.5,
                transition: "opacity 300ms ease-in-out",
                flexShrink: 0,
              }}
            >
              <KudoHighlightCard kudos={k} isActive={i === activeIndex} />
            </div>
          ))}
        </div>
      </div>

      {/* Slide indicator */}
      <SlideIndicator
        activeIndex={activeIndex}
        total={total}
        onPrev={onPrev}
        onNext={onNext}
      />
    </div>
  );
}
