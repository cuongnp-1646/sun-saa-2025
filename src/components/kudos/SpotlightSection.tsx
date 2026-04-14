// Figma node: 2940:14174 (PC section wrapper)
// B.6/B.7 Spotlight Section — SectionTitle + SpotlightBoard
// SpotlightBoard lazy-loaded via next/dynamic ssr:false

import dynamic from "next/dynamic";
import { SectionTitle } from "./SectionTitle";
import type { SpotlightNode } from "@/types/kudos";

const SpotlightBoard = dynamic(
  () => import("./SpotlightBoard").then((m) => ({ default: m.SpotlightBoard })),
  { ssr: false, loading: () => <div style={{ height: 548 }} /> }
);

interface SpotlightSectionProps {
  nodes: SpotlightNode[];
  totalKudosCount: number;
}

export function SpotlightSection({ nodes, totalKudosCount }: SpotlightSectionProps) {
  return (
    <section
      className="flex flex-col gap-6"
      style={{
        padding: "0 var(--page-padding-x, 144px)",
      }}
      aria-label="Spotlight Board"
    >
      <SectionTitle subtitle="Sun* Annual Awards 2025" title="SPOTLIGHT BOARD" />
      <SpotlightBoard nodes={nodes} totalKudosCount={totalKudosCount} />
    </section>
  );
}
