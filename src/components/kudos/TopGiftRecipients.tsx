// Figma node: 2940:13510 (PC) / 6885:9255 (SP)
// D.3 Top 10 Gift Recipients — server component
// Shows list of 10 most recently rewarded sunners with gift description

import Link from "next/link";
import { SunnerRow } from "./SunnerRow";
import type { GiftRecipient } from "@/types/kudos";
import { ROUTES } from "@/config/navigation";

interface TopGiftRecipientsProps {
  recipients: GiftRecipient[];
}

export function TopGiftRecipients({ recipients }: TopGiftRecipientsProps) {
  return (
    <div
      className="flex flex-col gap-3"
      style={{
        padding: "24px",
        background: "var(--color-bg-card, #00070C)",
        border: "1px solid var(--color-border, #998C5F)",
        borderRadius: "16px",
      }}
    >
      <h3
        className="text-[14px] font-bold uppercase"
        style={{ color: "var(--color-primary, #FFEA9E)" }}
      >
        10 Sunner nhận quà mới nhất
      </h3>

      {recipients.length === 0 ? (
        <p className="text-[14px]" style={{ color: "rgba(219,209,193,1)" }}>
          Chưa có dữ liệu.
        </p>
      ) : (
        <ol className="flex flex-col gap-3 list-none p-0 m-0">
          {recipients.slice(0, 10).map((r, i) => (
            <li key={i}>
              <Link
                href={`${ROUTES.profile}/${r.sunner.id}`}
                className="flex flex-col gap-0.5 group"
                aria-label={`Xem hồ sơ ${r.sunner.name}`}
              >
                <SunnerRow
                  avatarUrl={r.sunner.avatarUrl}
                  name={r.sunner.name}
                  size={32}
                  className="group-hover:opacity-80 transition-opacity"
                />
                {r.giftDescription && (
                  <p
                    className="truncate pl-10 text-[12px]"
                    style={{ color: "rgba(219,209,193,1)" }}
                  >
                    {r.giftDescription}
                  </p>
                )}
              </Link>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
