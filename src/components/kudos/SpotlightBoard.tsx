// Figma node: 2940:14174 (PC) / 6885:9101 (SP)
// B.7 Spotlight Board — CSS word cloud MVP (D3 upgrade deferred)
// lazy-loaded via next/dynamic ssr:false in parent

"use client";

import { useState, useMemo } from "react";
import type { SpotlightNode } from "@/types/kudos";

interface SpotlightBoardProps {
  nodes: SpotlightNode[];
  totalKudosCount: number;
}

// Deterministic pseudo-random position from a seed string
function hashPosition(str: string, seed: number): number {
  let h = seed;
  for (let i = 0; i < str.length; i++) {
    h = (h * 31 + str.charCodeAt(i)) & 0xffffffff;
  }
  return ((h >>> 0) / 0xffffffff);
}

export function SpotlightBoard({ nodes, totalKudosCount }: SpotlightBoardProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const maxCount = useMemo(
    () => Math.max(1, ...nodes.map((n) => n.kudosCount)),
    [nodes]
  );

  // Filter to visible nodes
  const visibleNodes = useMemo(() => {
    if (!searchQuery.trim()) return nodes;
    const q = searchQuery.toLowerCase();
    return nodes.filter((n) => n.name.toLowerCase().includes(q));
  }, [nodes, searchQuery]);

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        height: 548,
        background: "var(--color-bg-card, #00070C)",
        border: "1px solid var(--color-border, #998C5F)",
        borderRadius: 16,
      }}
    >
      {/* Total kudos watermark */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden="true"
      >
        <span
          className="font-bold select-none"
          style={{
            fontSize: "clamp(80px, 12vw, 140px)",
            color: "rgba(255,234,158,0.07)",
            fontFamily: "var(--font-montserrat, Montserrat, sans-serif)",
            lineHeight: 1,
          }}
        >
          {totalKudosCount}
        </span>
      </div>

      {/* Controls bar */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
        {/* Search input */}
        <div
          className="flex items-center gap-2 px-3"
          style={{
            height: 40,
            borderRadius: 100,
            border: "1px solid var(--color-border, #998C5F)",
            background: "rgba(0,7,12,0.8)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/kudos/icons/copy-link.svg"
            alt=""
            width={16}
            height={16}
            style={{ opacity: 0.5 }}
            aria-hidden="true"
          />
          <input
            type="search"
            placeholder="Tìm kiếm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-[14px] outline-none"
            style={{
              color: "var(--color-primary, #FFEA9E)",
              width: 140,
            }}
            aria-label="Tìm kiếm sunner trong Spotlight Board"
          />
        </div>
      </div>

      {/* Word cloud nodes */}
      <div className="absolute inset-0" aria-label="Spotlight Board — lưới sunner">
        {visibleNodes.map((node) => {
          const fontSize = 12 + (node.kudosCount / maxCount) * 36;
          const x = hashPosition(node.id, 1) * 80 + 5; // 5% - 85%
          const y = hashPosition(node.id, 2) * 70 + 10; // 10% - 80%
          const isHighlighted =
            searchQuery.trim() &&
            node.name.toLowerCase().includes(searchQuery.toLowerCase());

          return (
            <span
              key={node.id}
              className="absolute transition-all duration-200 cursor-default font-medium"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                fontSize: `${fontSize}px`,
                color: isHighlighted
                  ? "var(--color-primary, #FFEA9E)"
                  : "rgba(255,234,158,0.55)",
                textShadow: isHighlighted
                  ? "0 0 8px rgba(255,234,158,0.6)"
                  : "none",
                border: isHighlighted
                  ? "1px solid var(--color-primary, #FFEA9E)"
                  : "none",
                borderRadius: isHighlighted ? "4px" : "0",
                padding: isHighlighted ? "0 4px" : "0",
                transform: "translate(-50%, -50%)",
                whiteSpace: "nowrap",
                fontFamily: "var(--font-montserrat, Montserrat, sans-serif)",
                userSelect: "none",
              }}
              title={`${node.name} — ${node.kudosCount} kudos`}
            >
              {node.name}
            </span>
          );
        })}
      </div>
    </div>
  );
}
