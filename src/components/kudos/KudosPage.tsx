// T032/T033 — KudosPage client shell
// Accepts all initial data as props from the server page, composes the full kudos page layout
// 'use client' — manages send-kudos dialog open state

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { KudosHero } from "./KudosHero";
import { SendKudosInput } from "./SendKudosInput";
import { SunnerProfileSearch } from "./SunnerProfileSearch";
import { WriteKudoModal } from "./WriteKudoModal";
import { HighlightSection } from "./HighlightSection";
import { AllKudosSection } from "./AllKudosSection";
import { KudosFeed } from "./KudosFeed";
import { KudosSidebar } from "./KudosSidebar";
import type {
  Kudos,
  Hashtag,
  Department,
  GiftRecipient,
  SpotlightNode,
  PersonalStats,
} from "@/types/kudos";

interface KudosPageProps {
  highlightKudos: Kudos[];
  initialKudos: Kudos[];
  totalKudosCount: number;
  hashtags: Hashtag[];
  departments: Department[];
  topGiftRecipients: GiftRecipient[];
  spotlightNodes: SpotlightNode[];
  personalStats: PersonalStats | null;
  isAuthenticated: boolean;
}

export function KudosPage({
  highlightKudos,
  initialKudos,
  totalKudosCount,
  hashtags,
  departments,
  topGiftRecipients,
  spotlightNodes,
  personalStats,
  isAuthenticated,
}: KudosPageProps) {
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);

  function openDialog() {
    if (!isAuthenticated) {
      // Redirect to login
      window.location.href = "/login";
      return;
    }
    setDialogOpen(true);
  }

  return (
    <>
      {/* A. KV Hero */}
      <div className="relative">
        <KudosHero />

        {/* A.1 + A.2: Two pill inputs side-by-side at hero bottom (Figma: 2940:13449 + I2940:13450)
            Left (~flex-1): Send Kudos trigger
            Right (fixed ~280px): Sunner profile search */}
        <div
          className="absolute bottom-8 left-0 right-0 flex justify-center px-8 z-20"
        >
          <div
            className="flex items-center gap-4 w-full"
            style={{ maxWidth: "1152px" }}
          >
            <div className="flex-1 min-w-0">
              <SendKudosInput onClick={openDialog} />
            </div>
            <div className="shrink-0" style={{ width: "280px" }}>
              <SunnerProfileSearch />
            </div>
          </div>
        </div>
      </div>

      {/* Gap between hero and highlight section */}
      <div style={{ height: 80 }} />

      {/* B. Highlight Section (header, carousel, spotlight board) */}
      <HighlightSection
        highlights={highlightKudos}
        hashtags={hashtags}
        departments={departments}
        spotlightNodes={spotlightNodes}
        totalKudosCount={totalKudosCount}
      />

      {/* Gap between sections */}
      <div style={{ height: 80 }} />

      {/* C+D. All Kudos + Sidebar */}
      <AllKudosSection
        feed={
          <KudosFeed
            initialKudos={initialKudos}
            isAuthenticated={isAuthenticated}
            onAuthRequired={openDialog}
          />
        }
        sidebar={
          <KudosSidebar
            personalStats={personalStats}
            topGiftRecipients={topGiftRecipients}
          />
        }
      />

      {/* Gap before footer */}
      <div style={{ height: 80 }} />

      {/* Viết KUDO Modal — onSuccess closes dialog; Realtime subscription in
          useKudosFeed handles prepending the new card automatically */}
      <WriteKudoModal
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSuccess={() => {
          setDialogOpen(false);
          router.refresh();
        }}
      />
    </>
  );
}
