// T067 — US7: Kudos Sidebar — composes PersonalStatsBlock + OpenGiftButton + TopGiftRecipients
// Server shell — PersonalStatsBlock and TopGiftRecipients are display-only; OpenGiftButton is client

import { PersonalStatsBlock } from "./PersonalStatsBlock";
import { OpenGiftButton } from "./OpenGiftButton";
import { TopGiftRecipients } from "./TopGiftRecipients";
import type { PersonalStats, GiftRecipient } from "@/types/kudos";

interface KudosSidebarProps {
  personalStats: PersonalStats | null;
  topGiftRecipients: GiftRecipient[];
}

export function KudosSidebar({ personalStats, topGiftRecipients }: KudosSidebarProps) {
  return (
    <aside
      className="flex flex-col gap-4 w-full lg:min-w-[300px] lg:max-w-[360px] shrink-0"
      aria-label="Thống kê cá nhân và bảng xếp hạng"
    >
      {personalStats ? (
        <>
          <PersonalStatsBlock stats={personalStats} />
          <OpenGiftButton unopenedCount={personalStats.secretBoxCount} />
        </>
      ) : (
        <div
          className="rounded-2xl px-6 py-8 text-center text-[14px]"
          style={{
            background: "var(--color-bg-card, #00070C)",
            border: "1px solid var(--color-border, #998C5F)",
            color: "rgba(219,209,193,1)",
          }}
        >
          Đăng nhập để xem thống kê cá nhân của bạn.
        </div>
      )}

      <TopGiftRecipients recipients={topGiftRecipients} />
    </aside>
  );
}
