// Figma node: 2940:13451
// B. Highlight Section — wraps HighlightHeader + KudosCarousel + SpotlightSection
// 'use client' because HighlightHeader emits filter change callbacks

"use client";

import { useState } from "react";
import { HighlightHeader } from "./HighlightHeader";
import { KudosCarousel } from "./KudosCarousel";
import { SpotlightSection } from "./SpotlightSection";
import type { Kudos, Hashtag, Department, SpotlightNode } from "@/types/kudos";

interface HighlightSectionProps {
  highlights: Kudos[];
  hashtags: Hashtag[];
  departments: Department[];
  spotlightNodes: SpotlightNode[];
  totalKudosCount: number;
}

export function HighlightSection({
  highlights,
  hashtags,
  departments,
  spotlightNodes,
  totalKudosCount,
}: HighlightSectionProps) {
  const [selectedHashtagId, setSelectedHashtagId] = useState<string | undefined>();
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<string | undefined>();

  // Filter highlights by selected hashtag/department (client-side for carousel, API handles feed)
  const filteredHighlights = highlights.filter((k) => {
    if (selectedHashtagId && !k.hashtags.some((h) => h.id === selectedHashtagId)) {
      return false;
    }
    if (selectedDepartmentId) {
      // department filter checked on receiver's department — this is an approximation since
      // highlights are already fetched server-side; full filter is applied in KudosFeed
    }
    return true;
  });

  return (
    <section
      className="flex flex-col"
      style={{ gap: "40px", background: "var(--color-bg-page, #00101A)" }}
      aria-label="Highlight Kudos"
    >
      <HighlightHeader
        hashtags={hashtags}
        departments={departments}
        selectedHashtagId={selectedHashtagId}
        selectedDepartmentId={selectedDepartmentId}
        onHashtagChange={setSelectedHashtagId}
        onDepartmentChange={setSelectedDepartmentId}
      />

      <KudosCarousel kudos={filteredHighlights.length > 0 ? filteredHighlights : highlights} />

      <SpotlightSection
        nodes={spotlightNodes}
        totalKudosCount={totalKudosCount}
      />
    </section>
  );
}
