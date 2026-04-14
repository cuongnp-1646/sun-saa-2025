import Image from 'next/image'
import Link from 'next/link'
import type { Award } from '@/types/home'

interface AwardCardProps {
  award: Award
}

/**
 * Individual award card — Server Component.
 * Design tokens (design-style.md):
 *   Card: 336px wide, bg rgba(26,33,38,1), border-radius 8px, flex-col gap 24px
 *   Image: 336×336px, border 0.955px solid #FFEA9E, border-radius 8px, object-cover
 *   Title: Montserrat 24px 400, white
 *   Description: Montserrat 16px 400, white, line-clamp-2
 *   Chi tiết button: Montserrat 16px 500, color #FFEA9E, hover translate-up
 */
export function AwardCard({ award }: AwardCardProps) {
  return (
    <article
      className="flex flex-col gap-[var(--spacing-card-gap,24px)] bg-[var(--color-award-card-bg)] rounded-lg w-full max-w-[336px] transition-all duration-200 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)] group"
      aria-label={award.name}
    >
      {/* Card image: shared BG + name overlay */}
      <div
        className="relative w-full aspect-square rounded-lg overflow-hidden"
        style={{ border: 'var(--border-award-card, 0.955px solid #FFEA9E)' }}
      >
        <Image
          src={award.bgSrc}
          alt=""
          fill
          className="object-cover object-center"
          aria-hidden
        />
        {/* Award name overlay (centered) */}
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <Image
            src={award.nameSrc}
            alt={award.name}
            width={229}
            height={104}
            className="object-contain max-w-full"
          />
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-col gap-3 px-4 pb-4">
        <h3
          className="text-white text-[24px] font-normal leading-[32px]"
          style={{ fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)' }}
        >
          {award.name}
        </h3>
        <p
          className="text-white/70 text-[16px] font-normal leading-[24px] line-clamp-2"
          style={{ fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)' }}
        >
          {award.description}
        </p>

        {/* Chi tiết link */}
        <Link
          href={award.href}
          aria-label={`Chi tiết về ${award.name}`}
          className="inline-flex items-center gap-1 text-[var(--color-text-primary-gold,#FFEA9E)] text-[16px] font-medium leading-[24px] hover:gap-2 transition-all duration-150 mt-1"
          style={{ fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)' }}
        >
          Chi tiết
          <span aria-hidden className="text-sm">↗</span>
        </Link>
      </div>
    </article>
  )
}
