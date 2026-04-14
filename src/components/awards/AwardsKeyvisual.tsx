import Image from 'next/image'

/**
 * 3_Keyvisual — Full-bleed hero banner — Server Component.
 * Reuses bg-keyvisual.png with gradient overlay.
 * No interactive content — purely decorative banner.
 * Height: ~627px (Figma), responsive min-h.
 */
export function AwardsKeyvisual() {
  return (
    <section
      className="relative w-full min-h-[400px] lg:min-h-[627px] overflow-hidden bg-[#00101A]"
      aria-label="Hệ thống giải thưởng SAA 2025 — Keyvisual"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0" aria-hidden>
        <Image
          src="/assets/home/images/bg-keyvisual.png"
          alt=""
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Gradient overlay — darkens bottom so title area is readable */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            'linear-gradient(180deg, rgba(0,16,26,0) 40%, rgba(0,16,26,0.85) 100%)',
        }}
        aria-hidden
      />
    </section>
  )
}
