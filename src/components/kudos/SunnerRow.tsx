// Figma node: D.3.2 — 32px avatar circle + name + sub-text layout
// Server Component

import Image from "next/image";

interface SunnerRowProps {
  avatarUrl: string | null;
  name: string;
  subText?: string | null;
  /** Avatar size in px (default 32) */
  size?: number;
  className?: string;
}

export function SunnerRow({
  avatarUrl,
  name,
  subText,
  size = 32,
  className = "",
}: SunnerRowProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div
        className="relative shrink-0 overflow-hidden rounded-full bg-[var(--color-divider,#2E3940)]"
        style={{ width: size, height: size }}
      >
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={name}
            fill
            sizes={`${size}px`}
            className="object-cover"
          />
        ) : (
          <span
            className="flex h-full w-full items-center justify-center text-[10px] font-bold uppercase"
            style={{ color: "var(--color-primary, #FFEA9E)" }}
            aria-hidden="true"
          >
            {name.charAt(0)}
          </span>
        )}
      </div>

      <div className="flex min-w-0 flex-col">
        <span
          className="truncate text-[14px] font-semibold leading-tight"
          style={{ color: "var(--color-text-secondary, #FFFFFF)" }}
        >
          {name}
        </span>
        {subText && (
          <span
            className="truncate text-[12px] font-normal leading-tight"
            style={{ color: "var(--color-text-muted)" }}
          >
            {subText}
          </span>
        )}
      </div>
    </div>
  );
}
