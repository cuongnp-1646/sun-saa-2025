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
      className="flex flex-col items-center gap-1 group shrink-0"
      style={{ maxWidth: 140 }}
      aria-label={`Xem hồ sơ ${sunner.name}`}
    >
      {/* Avatar — 64px */}
      <div
        className="relative overflow-hidden rounded-full shrink-0"
        style={{
          width: 64,
          height: 64,
          border: "2px solid #FFEA9E",
        }}
      >
        {sunner.avatarUrl ? (
          <Image
            src={sunner.avatarUrl}
            alt={sunner.name}
            fill
            sizes="64px"
            className="object-cover"
          />
        ) : (
          <span
            className="flex h-full w-full items-center justify-center text-[18px] font-bold uppercase"
            style={{ color: "#3A2A10", background: "#FFEA9E" }}
            aria-hidden="true"
          >
            {sunner.name.charAt(0)}
          </span>
        )}
      </div>

      {/* Name */}
      <span
        className="text-[14px] font-bold text-center leading-tight group-hover:underline line-clamp-2"
        style={{ color: "#1A1209" }}
      >
        {sunner.name}
      </span>

      {/* Department + badge row */}
      {(sunner.department || sunner.jobTitle) && (
        <div className="flex items-center gap-1 flex-wrap justify-center">
          {sunner.department && (
            <span
              className="text-[11px]"
              style={{ color: "rgba(80, 60, 30, 0.7)" }}
            >
              {sunner.department}
            </span>
          )}
          {sunner.department && sunner.jobTitle && (
            <span style={{ color: "rgba(80,60,30,0.4)", fontSize: 10 }}>•</span>
          )}
          {sunner.jobTitle && (
            <span
              className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
              style={{
                background: "#1A1209",
                color: "#FFEA9E",
              }}
            >
              {sunner.jobTitle}
            </span>
          )}
        </div>
      )}
    </Link>
  );
}

export function KudoPostCard({ kudos, actionBar }: KudoPostCardProps) {
  const { sender, receiver, message, hashtags, imageUrls, createdAt, category } = kudos;

  return (
    <article
      className="flex flex-col gap-0 transition-colors"
      style={{
        background: "#FFF3C6",
        border: "1px solid #998C5F",
        borderRadius: "16px",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "#FFEA9E";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "#998C5F";
      }}
    >
      {/* === Sender → Receiver row === */}
      <div
        className="flex items-start justify-between"
        style={{ padding: "20px 24px 16px" }}
      >
        <SenderReceiverInfo sunner={sender} />

        {/* Arrow */}
        <div className="flex items-center pt-3 shrink-0 px-2" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/kudos/icons/arrow-sent.svg"
            alt=""
            width={24}
            height={24}
            style={{
              filter:
                "brightness(0) saturate(100%) invert(15%) sepia(20%) saturate(800%) hue-rotate(10deg) brightness(50%)",
            }}
          />
        </div>

        <SenderReceiverInfo sunner={receiver} />
      </div>

      {/* Divider */}
      <hr style={{ border: "none", borderTop: "1px solid rgba(80,60,30,0.18)", margin: "0 24px" }} />

      {/* === Content area === */}
      <div className="flex flex-col gap-3" style={{ padding: "16px 24px 20px" }}>
        {/* Timestamp */}
        <p className="text-[12px]" style={{ color: "rgba(80, 60, 30, 0.7)" }}>
          {formatTimestamp(createdAt)}
        </p>

        {/* Category label */}
        {category && (
          <div className="flex items-center justify-center gap-2">
            <p
              className="text-[13px] font-bold text-center tracking-wide"
              style={{ color: "#3A2A10" }}
            >
              {category.toUpperCase()}
            </p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/kudos/icons/pencil.svg"
              alt=""
              width={14}
              height={14}
              aria-hidden="true"
              style={{
                filter:
                  "brightness(0) saturate(100%) invert(15%) sepia(20%) saturate(800%) hue-rotate(10deg) brightness(60%)",
                opacity: 0.5,
              }}
            />
          </div>
        )}

        {/* Message content — in golden box, 5 line max */}
        <div
          className="text-[14px] leading-relaxed kudos-message"
          style={{
            color: "#1A1209",
            background: "rgba(255, 234, 158, 0.3)",
            borderRadius: "8px",
            padding: "12px 14px",
            display: "-webkit-box",
            WebkitLineClamp: 5,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            fontWeight: 500,
          }}
          dangerouslySetInnerHTML={{ __html: message }}
        />

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
                className="text-[12px] font-medium"
                style={{ color: "#CC4422" }}
              >
                #{tag.name}
              </span>
            ))}
            {hashtags.length > 5 && (
              <span className="text-[12px]" style={{ color: "rgba(80,60,30,0.6)" }}>
                ...
              </span>
            )}
          </div>
        )}

        {/* Divider above action bar */}
        <hr style={{ border: "none", borderTop: "1px solid rgba(80,60,30,0.18)", margin: "4px 0 0" }} />

        {/* Action bar — HeartButton on left, CopyLinkButton on right */}
        <div className="flex items-center justify-between">
          {actionBar}
        </div>
      </div>
    </article>
  );
}
