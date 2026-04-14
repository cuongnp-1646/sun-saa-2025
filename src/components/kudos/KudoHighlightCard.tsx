// Figma node: 2940:13465 (PC) / 6885:9091 (SP)
// B.3 KUDO Highlight Card — displayed inside the carousel
// Server-compatible (no client hooks), interactions wired externally

import Image from "next/image";
import Link from "next/link";
import type { Kudos } from "@/types/kudos";
import { ROUTES } from "@/config/navigation";

interface KudoHighlightCardProps {
  kudos: Kudos;
  /** When true the card is the active slide — shows thick gold border */
  isActive?: boolean;
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

export function KudoHighlightCard({ kudos, isActive = false }: KudoHighlightCardProps) {
  const { sender, receiver, message, hashtags, heartCount, createdAt, category } = kudos;

  return (
    <article
      className="flex flex-col gap-4 shrink-0"
      style={{
        width: "340px",
        padding: "24px",
        background: "var(--color-bg-card, #00070C)",
        // Active slide: thick gold border (--border-primary-thick: 4px solid #FFEA9E)
        // Inactive slides: dim border to recede visually
        border: isActive
          ? "4px solid var(--color-primary, #FFEA9E)"
          : "1px solid rgba(153, 153, 153, 0.3)",
        borderRadius: "16px",
        transition: "border 300ms ease-in-out",
      }}
    >
      {/* Category label */}
      {category && (
        <div className="flex justify-center">
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

      {/* Sender → Receiver info */}
      <div className="flex items-start gap-3">
        {/* Sender */}
        <Link
          href={`${ROUTES.profile}/${sender.id}`}
          className="flex flex-col items-center gap-1 shrink-0"
          aria-label={`Xem hồ sơ ${sender.name}`}
        >
          <div
            className="relative overflow-hidden rounded-full"
            style={{
              width: 40,
              height: 40,
              border: "1px solid var(--color-primary, #FFEA9E)",
              flexShrink: 0,
            }}
          >
            {sender.avatarUrl ? (
              <Image
                src={sender.avatarUrl}
                alt={sender.name}
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
                {sender.name.charAt(0)}
              </span>
            )}
          </div>
          <span
            className="text-[14px] font-medium text-center hover:underline line-clamp-1 max-w-[72px]"
            style={{ color: "var(--color-primary, #FFEA9E)" }}
          >
            {sender.name}
          </span>
          {sender.jobTitle && (
            <span
              className="text-[11px] text-center line-clamp-1 max-w-[72px]"
              style={{ color: "rgba(219,209,193,1)" }}
            >
              {sender.jobTitle}
            </span>
          )}
        </Link>

        {/* Arrow sent icon */}
        <div className="flex items-center pt-3 shrink-0" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/kudos/icons/arrow-sent.svg"
            alt=""
            width={24}
            height={24}
            style={{ filter: "brightness(0) saturate(100%) invert(93%) sepia(21%) saturate(454%) hue-rotate(339deg) brightness(107%) contrast(104%)" }}
          />
        </div>

        {/* Receiver */}
        <Link
          href={`${ROUTES.profile}/${receiver.id}`}
          className="flex flex-col items-center gap-1 shrink-0"
          aria-label={`Xem hồ sơ ${receiver.name}`}
        >
          <div
            className="relative overflow-hidden rounded-full"
            style={{
              width: 40,
              height: 40,
              border: "1px solid var(--color-primary, #FFEA9E)",
              flexShrink: 0,
            }}
          >
            {receiver.avatarUrl ? (
              <Image
                src={receiver.avatarUrl}
                alt={receiver.name}
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
                {receiver.name.charAt(0)}
              </span>
            )}
          </div>
          <span
            className="text-[14px] font-medium text-center hover:underline line-clamp-1 max-w-[72px]"
            style={{ color: "var(--color-primary, #FFEA9E)" }}
          >
            {receiver.name}
          </span>
          {receiver.jobTitle && (
            <span
              className="text-[11px] text-center line-clamp-1 max-w-[72px]"
              style={{ color: "rgba(219,209,193,1)" }}
            >
              {receiver.jobTitle}
            </span>
          )}
        </Link>
      </div>

      {/* Timestamp */}
      <p className="text-[12px]" style={{ color: "rgba(219,209,193,1)" }}>
        {formatTimestamp(createdAt)}
      </p>

      {/* Message content — 3 line max */}
      <div
        className="text-[14px] leading-relaxed"
        style={{
          color: "#FFF",
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
        dangerouslySetInnerHTML={{ __html: message }}
      />

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

      {/* Heart count */}
      <div className="flex items-center gap-1">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/kudos/icons/heart.svg"
          alt=""
          width={16}
          height={16}
          style={{ opacity: heartCount > 0 ? 1 : 0.5 }}
          aria-hidden="true"
        />
        <span className="text-[14px]" style={{ color: "rgba(153,153,153,1)" }}>
          {heartCount}
        </span>
      </div>
    </article>
  );
}
