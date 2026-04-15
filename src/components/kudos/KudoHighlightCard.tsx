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

function formatCount(n: number): string {
  return n.toLocaleString("vi-VN");
}

interface PersonBlockProps {
  sunner: Kudos["sender"];
}

function PersonBlock({ sunner }: PersonBlockProps) {
  return (
    <Link
      href={`${ROUTES.profile}/${sunner.id}`}
      className="flex flex-col items-center gap-1 shrink-0"
      aria-label={`Xem hồ sơ ${sunner.name}`}
    >
      <div
        className="relative overflow-hidden rounded-full"
        style={{
          width: 40,
          height: 40,
          border: "1px solid #FFEA9E",
          flexShrink: 0,
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
            style={{ color: "#00101A", background: "#FFEA9E" }}
            aria-hidden="true"
          >
            {sunner.name.charAt(0)}
          </span>
        )}
      </div>
      <span
        className="text-[13px] font-semibold text-center hover:underline line-clamp-1 max-w-[80px]"
        style={{ color: "#00101A" }}
      >
        {sunner.name}
      </span>
      {sunner.department && (
        <span
          className="text-[10px] text-center line-clamp-1 max-w-[80px]"
          style={{ color: "rgba(80, 60, 30, 0.7)" }}
        >
          {sunner.department}
        </span>
      )}
      {sunner.jobTitle && (
        <span
          className="text-[10px] font-medium px-2 py-0.5 rounded-full"
          style={{
            background: "rgba(0,16,26,0.12)",
            color: "#3A2A10",
          }}
        >
          {sunner.jobTitle}
        </span>
      )}
    </Link>
  );
}

export function KudoHighlightCard({ kudos, isActive = false }: KudoHighlightCardProps) {
  const { sender, receiver, message, hashtags, heartCount, createdAt, category } = kudos;

  return (
    <article
      className="flex flex-col gap-3 shrink-0"
      style={{
        width: "340px",
        padding: "20px",
        background: "#FFF3C6",
        border: isActive
          ? "4px solid #FFEA9E"
          : "1px solid #998C5F",
        borderRadius: "16px",
        transition: "border 300ms ease-in-out",
      }}
    >
      {/* Sender → Receiver info row */}
      <div className="flex items-start justify-between gap-2">
        <PersonBlock sunner={sender} />

        {/* Arrow icon */}
        <div className="flex items-center pt-3 shrink-0" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/kudos/icons/arrow-sent.svg"
            alt=""
            width={20}
            height={20}
            style={{ filter: "brightness(0) saturate(100%)" }}
          />
        </div>

        <PersonBlock sunner={receiver} />
      </div>

      {/* Timestamp */}
      <p className="text-[12px]" style={{ color: "rgba(80, 60, 30, 0.7)" }}>
        {formatTimestamp(createdAt)}
      </p>

      {/* Category label — centered */}
      {category && (
        <p
          className="text-[13px] font-semibold text-center"
          style={{ color: "#3A2A10" }}
        >
          {category}
        </p>
      )}

      {/* Message content — 3 line max */}
      <div
        className="text-[14px] leading-relaxed"
        style={{
          color: "#1A1209",
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

      {/* Bottom row: heart count + copy link + xem chi tiết */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-1">
          <span style={{ color: "#D4271D", fontSize: 16 }} aria-hidden="true">❤</span>
          <span className="text-[14px] font-medium" style={{ color: "#1A1209" }}>
            {formatCount(heartCount)}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[12px]" style={{ color: "rgba(80,60,30,0.7)" }}>
            Copy Link
          </span>
          <Link
            href={`${ROUTES.profile}/${kudos.id}`}
            className="text-[12px] hover:underline"
            style={{ color: "rgba(80,60,30,0.7)" }}
          >
            Xem chi tiết ↗
          </Link>
        </div>
      </div>
    </article>
  );
}
