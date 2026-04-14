import Image from 'next/image'
import type { Award } from '@/types/home'

interface AwardsDetailCardProps {
  award: Award
  /** 0-based index — odd cards flip image to the right (alternating layout per Figma) */
  index?: number
}

/** MM_MEDIA_License icon (Figma) — used before "Giá trị giải thưởng" label */
function LicenseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="4" width="18" height="16" rx="2" stroke="#FFEA9E" strokeWidth="2" />
      <path d="M7 8h10M7 12h7" stroke="#FFEA9E" strokeWidth="2" strokeLinecap="round" />
      <circle cx="17" cy="15" r="2" stroke="#FFEA9E" strokeWidth="1.5" />
      <path d="M17 17v2" stroke="#FFEA9E" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

/** Renders a single "Giá trị giải thưởng" row */
function ValueBlock({ value, suffix }: { value: string; suffix?: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <LicenseIcon />
        <p className="text-[#FFEA9E] text-[24px] font-bold leading-[32px]">
          Giá trị giải thưởng:
        </p>
      </div>
      <div className="flex items-baseline gap-2 flex-wrap pl-9">
        <span className="text-white text-[36px] font-bold leading-[44px]">{value}</span>
        {suffix && (
          <span className="text-white text-[14px] font-bold leading-[20px]">{suffix}</span>
        )}
      </div>
    </div>
  )
}

/**
 * D.1–D.6 Award Detail Card — Server Component.
 * Design: Node 313:8467 — Figma node tree confirmed:
 *   - No id on <article> (id lives on wrapper div in AwardsPage — T023)
 *   - 1px #2E3940 divider between description↔count (Rectangle 8 — T024)
 *   - 1px #2E3940 divider between count↔value (Rectangle 10 — T024)
 *   - MM_MEDIA_License icon before value label (T028)
 *   - Signature Creator has second value block with "Hoặc" separator (T025)
 */
export function AwardsDetailCard({ award, index = 0 }: AwardsDetailCardProps) {
  const isReversed = index % 2 === 1

  return (
    <article
      className={`flex flex-col gap-10 lg:gap-[80px] ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}
      style={{ fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)' }}
      aria-label={`${award.name} award`}
    >
      {/* Award image: bgSrc (podium background) + nameSrc (name overlay) */}
      <div className="flex-shrink-0 flex items-start justify-center lg:justify-start">
        <div
          className="relative w-full max-w-[336px] lg:w-[336px] lg:h-[336px] aspect-square overflow-hidden"
          style={{ boxShadow: '0 4px 4px 0 rgba(0,0,0,0.25), 0 0 6px 0 #FAE287' }}
        >
          <Image
            src={award.bgSrc}
            alt=""
            fill
            className="object-cover object-center"
            aria-hidden
            sizes="(max-width: 1024px) 100vw, 336px"
          />
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <Image
              src={award.nameSrc}
              alt={`${award.name} award image`}
              width={229}
              height={104}
              className="object-contain max-w-full"
              style={{ mixBlendMode: 'screen' }}
            />
          </div>
        </div>
      </div>

      {/* Content block */}
      <div
        className="flex flex-col rounded-2xl flex-1"
        style={{ backdropFilter: 'blur(32px)', WebkitBackdropFilter: 'blur(32px)' }}
      >
        {/* 1. Target icon + Award name */}
        <div className="flex items-center gap-4 pb-8">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
            <circle cx="12" cy="12" r="10" stroke="#FFEA9E" strokeWidth="2" />
            <circle cx="12" cy="12" r="6" stroke="#FFEA9E" strokeWidth="2" />
            <circle cx="12" cy="12" r="2" fill="#FFEA9E" />
          </svg>
          <h2 className="text-[#FFEA9E] text-[24px] font-bold leading-[32px]">
            {award.name}
          </h2>
        </div>

        {/* 2. Description */}
        <p className="text-white text-[16px] font-bold leading-[24px] tracking-[0.5px] text-justify lg:max-w-[480px]">
          {award.description}
        </p>

        {/* Divider: description → count (Figma Rectangle 8) */}
        {award.count && <div className="w-full h-px bg-[#2E3940] my-8" aria-hidden />}

        {/* 3. Count meta block */}
        {award.count && (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M12 2L22 12L12 22L2 12L12 2Z" stroke="#FFEA9E" strokeWidth="2" strokeLinejoin="round" />
              </svg>
              <p className="text-[#FFEA9E] text-[24px] font-bold leading-[32px]">
                Số lượng giải thưởng:
              </p>
            </div>
            <div className="flex items-baseline gap-2 pl-9">
              <span className="text-white text-[36px] font-bold leading-[44px]">
                {award.count}
              </span>
              {award.countUnit && (
                <span className="text-white text-[14px] font-bold leading-[20px]">
                  {award.countUnit}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Divider: count → value (Figma Rectangle 10) */}
        {award.value && <div className="w-full h-px bg-[#2E3940] my-8" aria-hidden />}

        {/* 4. Value meta block — primary */}
        {award.value && <ValueBlock value={award.value} suffix={award.valueSuffix} />}

        {/* 5. Second value block for Signature Creator (Figma 313:8498–8501 "Hoặc" separator) */}
        {award.value2 && (
          <>
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-[#2E3940]" aria-hidden />
              <span className="text-white text-[14px] font-bold leading-[20px] px-3">Hoặc</span>
              <div className="flex-1 h-px bg-[#2E3940]" aria-hidden />
            </div>
            <ValueBlock value={award.value2} suffix={award.valueSuffix2} />
          </>
        )}
      </div>
    </article>
  )
}
