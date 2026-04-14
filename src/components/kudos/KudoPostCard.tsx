// Figma node: 3127:21871 (PC) / 6885:9263 (SP)
// C.3 KUDO Post Card — used in the All Kudos feed
// Accepts HeartButton and CopyLinkButton as children (action bar)

import Image from "next/image";
import Link from "next/link";
import type { Kudos } from "@/types/kudos";
import { ROUTES } from "@/config/navigation";

interface KudoPostCardProps {
  kudos: Kudos;
  /** Action bar slot — HeartButton + CopyLinkButton */
  actionBar?: React.ReactNode;
}

function formatTimestamp(iso: string): string {
  const d = new Date(iso);
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const year = d.getFullYear();
  return `${hh}:${mm} - ${month}/${day}/${year}`;
}

function SenderReceiverInfo({
  sunner,
}: {
  sunner: Kudos["sender"];
}) {
  return (
    <Link
      href={`${ROUTES.profile}/${sunner.id}`}
      className="flex items-center gap-2 group"
      aria-label={`Xem hồ sơ ${sunner.name}`}
    >
      <div
        className="relative overflow-hidden rounded-full shrink-0"
        style={{
          width: 40,
          height: 40,
          border: "1px solid var(--color-primary, #FFEA9E)",
        }}
      >
        {sunner.avatarUrl ? (
          <Image
            src={sunner.avatarUrl}
            alt={sunner.name}
            fill
            sizes="40px"
            className="object-cover"
          />
        ) : (
          <span
            className="flex h-full w-full items-center justify-center text-[11px] font-bold uppercase"
            style={{ color: "var(--color-primary, #FFEA9E)" }}
            aria-hidden="true"
          >
            {sunner.name.charAt(0)}
          </span>
        )}
      </div>
      <div className="flex flex-col min-w-0">
        <span
          className="text-[16px] font-medium leading-tight truncate group-hover:underline"
          style={{ color: "var(--color-primary, #FFEA9E)" }}
        >
          {sunner.name}
        </span>
        {sunner.jobTitle && (
          <span className="text-[12px] truncate" style={{ color: "rgba(219,209,193,1)" }}>
            {sunner.jobTitle}
          </span>
        )}
      </div>
    </Link>
  );
}

export function KudoPostCard({ kudos, actionBar }: KudoPostCardProps) {
  const { sender, receiver, message, hashtags, imageUrls, createdAt, category } = kudos;

  return (
    <article
      className="flex flex-col gap-3 transition-colors"
      style={{
        padding: "24px",
        background: "var(--color-bg-card, #00070C)",
        border: "1px solid var(--color-border, #998C5F)",
        borderRadius: "16px",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor =
          "rgba(255,234,158,0.4)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor =
          "var(--color-border, #998C5F)";
      }}
    >
      {/* Category label */}
      {category && (
        <div>
          <span
            className="text-[11px] font-bold uppercase tracking-widest px-3 py-1"
            style={{
              color: "var(--color-primary, #FFEA9E)",
              border: "1px solid var(--color-primary, #FFEA9E)",
              borderRadius: "48px",
            }}
          >
            {category}
          </span>
        </div>
      )}

      {/* Sender → Receiver row */}
      <div className="flex items-center gap-3 flex-wrap">
        <SenderReceiverInfo sunner={sender} />
        <span
          className="text-[14px] shrink-0"
          style={{ color: "var(--color-primary, #FFEA9E)" }}
          aria-hidden="true"
        >
          →
        </span>
        <SenderReceiverInfo sunner={receiver} />
      </div>

      {/* Timestamp */}
      <p className="text-[12px]" style={{ color: "rgba(219,209,193,1)" }}>
        {formatTimestamp(createdAt)}
      </p>

      {/* Message content — 5 line max */}
      <p
        className="text-[14px] leading-relaxed"
        style={{
          color: "#FFF",
          display: "-webkit-box",
          WebkitLineClamp: 5,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {message}
      </p>

      {/* Image gallery — up to 5 thumbnails */}
      {imageUrls.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {imageUrls.slice(0, 5).map((url, i) => (
            <div
              key={i}
              className="relative shrink-0 overflow-hidden"
              style={{ width: 80, height: 80, borderRadius: 8 }}
            >
              <Image
                src={url}
                alt={`Ảnh ${i + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {/* Hashtags — max 5 */}
      {hashtags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {hashtags.slice(0, 5).map((tag, i) => (
            <span
              key={`${tag.id}-${i}`}
              className="text-[12px]"
              style={{ color: "var(--color-primary, #FFEA9E)" }}
            >
              #{tag.name}
            </span>
          ))}
          {hashtags.length > 5 && (
            <span className="text-[12px]" style={{ color: "rgba(219,209,193,1)" }}>
              ...
            </span>
          )}
        </div>
      )}

      {/* Action bar — HeartButton + CopyLinkButton + Xem chi tiết */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-3">
          {actionBar}
        </div>
        <Link
          href={`${ROUTES.profile}/${kudos.id}`}
          className="text-[13px] hover:underline"
          style={{ color: "rgba(219,209,193,1)" }}
        >
          Xem chi tiết →
        </Link>
      </div>
    </article>
  );
}
