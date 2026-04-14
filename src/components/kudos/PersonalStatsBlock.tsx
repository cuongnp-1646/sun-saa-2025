// Figma node: 2940:13489 (PC) / 6885:9223 (SP)
// D.1 Personal Statistics Block — shows kudos sent/received, hearts, secret boxes
// Server-compatible (pure display)

import type { PersonalStats } from "@/types/kudos";

interface PersonalStatsBlockProps {
  stats: PersonalStats;
  heartsX2Active?: boolean;
}

function StatRow({
  label,
  value,
  badge,
}: {
  label: string;
  value: number;
  badge?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[14px]" style={{ color: "rgba(219,209,193,1)" }}>
        {label}
      </span>
      <div className="flex items-center gap-2">
        {badge}
        <span className="text-[14px] font-bold" style={{ color: "var(--color-primary, #FFEA9E)" }}>
          {value}
        </span>
      </div>
    </div>
  );
}

export function PersonalStatsBlock({ stats, heartsX2Active = false }: PersonalStatsBlockProps) {
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
      <StatRow label="Số Kudos bạn nhận được" value={stats.received} />
      <StatRow label="Số Kudos bạn đã gửi" value={stats.sent} />
      <StatRow
        label="Số Tim bạn nhận được"
        value={stats.heartsReceived}
        badge={
          heartsX2Active ? (
            <span
              className="inline-flex items-center gap-1 rounded-xl px-2 py-0.5 text-[12px] font-bold"
              style={{
                background: "rgba(255,243,198,1)",
                color: "#00101A",
              }}
            >
              🔥 x2
            </span>
          ) : undefined
        }
      />

      {/* Divider */}
      <div style={{ width: "100%", height: 1, background: "#2E3940" }} />

      <StatRow label="Box chưa mở" value={stats.secretBoxCount} />
    </div>
  );
}
