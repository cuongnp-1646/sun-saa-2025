import { AWARDS } from '@/config/awards'
import { AwardCard } from './AwardCard'

/**
 * C1 + C2 — Awards section.
 * Design tokens (design-style.md):
 *   C1 header: caption 24px 700, divider 1px #2E3940, title 57px 700 ls:-0.25px
 *   C2 grid: 3-col desktop (gap 80px), 2-col tablet, 1-col mobile
 */
export function AwardsSection() {
  return (
    <section
      className="w-full px-4 sm:px-9 lg:px-[144px] py-20 lg:py-[120px]"
      aria-label="Awards system"
    >
      {/* C1 — Section header */}
      <div className="flex flex-col gap-4 mb-[var(--spacing-awards-section-gap,80px)]">
        <p
          className="text-white text-[24px] font-bold leading-[32px]"
          style={{ fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)' }}
        >
          Sun* annual awards 2025
        </p>
        <hr className="border-t border-[var(--color-divider,#2E3940)] w-full" />
        <h2
          className="text-white text-[32px] sm:text-[40px] lg:text-[57px] font-bold lg:leading-[64px] lg:tracking-[-0.25px]"
          style={{ fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)' }}
        >
          Hệ thống giải thưởng
        </h2>
      </div>

      {/* C2 — Award cards grid: 1-col mobile, 2-col tablet, 3-col desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[var(--spacing-section-gap,80px)] justify-items-center">
        {AWARDS.map((award) => (
          <AwardCard key={award.id} award={award} />
        ))}
      </div>
    </section>
  )
}
