import Link from 'next/link'
import { ROUTES } from '@/config/navigation'

/**
 * B3 section — Two CTA buttons: ABOUT AWARDS (primary gold) and ABOUT KUDOS (bordered).
 * Design tokens (design-style.md):
 *   ABOUT AWARDS: 276×60px, bg #FFEA9E, text #00101A, radius 8px
 *   ABOUT KUDOS: 258×60px, border 1px solid #998C5F, text white, radius 8px
 *   Gap between buttons: 40px
 */
export function HeroCTA() {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-[var(--spacing-cta-gap,40px)]">
      <Link
        href={ROUTES.awards}
        className="inline-flex items-center justify-center w-full sm:w-[276px] h-[60px] rounded-[var(--radius-cta-btn,8px)] bg-[var(--color-btn-primary-bg,#FFEA9E)] text-[var(--color-btn-primary-text,#00101A)] text-[22px] font-bold leading-[28px] hover:shadow-[var(--shadow-btn-hover)] transition-shadow duration-150"
        style={{ fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)' }}
      >
        ABOUT AWARDS
      </Link>
      <Link
        href={ROUTES.kudos}
        className="inline-flex items-center justify-center w-full sm:w-[258px] h-[60px] rounded-[var(--radius-cta-btn,8px)] border border-[var(--color-border,#998C5F)] text-white text-[22px] font-bold leading-[28px] hover:bg-white/5 transition-colors duration-150"
        style={{ fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)' }}
      >
        ABOUT KUDOS
      </Link>
    </div>
  )
}
