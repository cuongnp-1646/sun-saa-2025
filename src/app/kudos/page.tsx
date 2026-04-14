// Sun* Kudos Live Board — /kudos page
// force-dynamic: page fetches live data on every request (Supabase Realtime + public feed)

export const dynamic = "force-dynamic";

import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { KudosPage } from "@/components/kudos/KudosPage";
import {
  fetchHighlightKudos,
  fetchAllKudos,
  fetchHashtags,
  fetchDepartments,
  fetchTopGiftRecipients,
  fetchSpotlightData,
  fetchPersonalStats,
} from "@/services/kudos";
import { createClient } from "@/libs/supabase/server";
import {
  MOCK_HIGHLIGHTS,
  MOCK_KUDOS,
  MOCK_HASHTAGS,
  MOCK_DEPARTMENTS,
  MOCK_TOP_GIFTS,
  MOCK_SPOTLIGHT_NODES,
  MOCK_PERSONAL_STATS,
  MOCK_TOTAL_KUDOS,
} from "@/lib/mock-data";

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true";

export default async function KudosRoute() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [
    highlightKudosLive,
    { data: allKudosLive, total: totalKudosLive },
    hashtagsLive,
    departmentsLive,
    topGiftRecipientsLive,
    spotlightNodesLive,
    personalStatsLive,
  ] = await Promise.all([
    fetchHighlightKudos(),
    fetchAllKudos({ page: 1, limit: 20 }),
    fetchHashtags(),
    fetchDepartments(),
    fetchTopGiftRecipients(),
    fetchSpotlightData(),
    user ? fetchPersonalStats(user.id) : Promise.resolve(null),
  ]);

  // Only use mock data when NEXT_PUBLIC_USE_MOCK_DATA=true is explicitly set.
  // Do NOT auto-fallback when live data is empty — that masks real DB/RLS issues.
  const highlightKudos = USE_MOCK ? MOCK_HIGHLIGHTS : highlightKudosLive;
  const allKudos = USE_MOCK ? MOCK_KUDOS : allKudosLive;
  const totalKudos = USE_MOCK ? MOCK_TOTAL_KUDOS : totalKudosLive;
  const hashtags = USE_MOCK ? MOCK_HASHTAGS : hashtagsLive;
  const departments = USE_MOCK ? MOCK_DEPARTMENTS : departmentsLive;
  const topGiftRecipients = USE_MOCK ? MOCK_TOP_GIFTS : topGiftRecipientsLive;
  const spotlightNodes = USE_MOCK ? MOCK_SPOTLIGHT_NODES : spotlightNodesLive;
  const personalStats = USE_MOCK ? MOCK_PERSONAL_STATS : personalStatsLive;

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "var(--color-bg-page, #00101A)" }}
    >
      <Header activeRoute="kudos" />
      <main className="flex-1">
        <KudosPage
          highlightKudos={highlightKudos}
          initialKudos={allKudos}
          totalKudosCount={totalKudos}
          hashtags={hashtags}
          departments={departments}
          topGiftRecipients={topGiftRecipients}
          spotlightNodes={spotlightNodes}
          personalStats={personalStats}
          isAuthenticated={!!user}
        />
      </main>
      <Footer />
    </div>
  );
}
