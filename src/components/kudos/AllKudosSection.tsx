// T030 — US1: All Kudos Section — 2-column layout (feed + sidebar) on desktop
// Feed takes ~65% width, sidebar ~35%, gap 80px per design

import { SectionTitle } from "./SectionTitle";

interface AllKudosSectionProps {
  feed: React.ReactNode;
  sidebar: React.ReactNode;
}

export function AllKudosSection({ feed, sidebar }: AllKudosSectionProps) {
  return (
    <section
      className="flex flex-col gap-8"
      style={{
        padding: "0 var(--page-padding-x, 144px)",
      }}
      aria-label="All Kudos"
    >
      <SectionTitle subtitle="Sun* Annual Awards 2025" title="ALL KUDOS" />

      {/* 2-column layout: feed | sidebar */}
      <div
        className="flex flex-col lg:flex-row"
        style={{ gap: "80px", alignItems: "flex-start" }}
      >
        {/* Kudos feed — takes remaining width */}
        <div className="flex-1 min-w-0">{feed}</div>

        {/* Sidebar — fixed width on desktop */}
        <div className="w-full lg:w-auto">{sidebar}</div>
      </div>
    </section>
  );
}
