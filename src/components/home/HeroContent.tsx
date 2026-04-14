import Image from 'next/image'
import { CountdownTimer } from '@/components/countdown/CountdownTimer'
import { EventInfo } from './EventInfo'
import { HeroCTA } from './HeroCTA'

/**
 * Hero content column — matches Frame 487 (1224×596px, gap:40px, flex-col, items-start).
 *
 * Layout (Figma nodes):
 *   Frame 482 → ROOT FURTHER logo image (451×200px)          gap:40px
 *   Frame 523 → [B1 countdown + B2 event info]  gap:16px     gap:40px
 *   B3        → CTA buttons
 */
export function HeroContent() {
  return (
    <div
      className="flex flex-col gap-[40px] w-full max-w-[1224px] items-start"
      style={{ fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)' }}
    >
      {/* Frame 482 — ROOT FURTHER logo (451×200px) */}
      <div aria-hidden>
        <Image
          src="/assets/home/images/root-further-logo.png"
          alt="ROOT FURTHER"
          width={451}
          height={200}
          priority
          className="object-contain w-[280px] h-auto sm:w-[360px] lg:w-[451px]"
        />
      </div>

      {/* Frame 523 — B1 (countdown) + B2 (event info), gap:16px */}
      <div className="flex flex-col gap-4 items-start w-full">
        {/* B1 — Countdown block */}
        <div className="flex flex-col gap-[var(--spacing-hero-section-gap,16px)] items-start">
          <p className="text-white text-[24px] font-bold leading-[32px]">
            Coming soon
          </p>
          {/* No onZero prop → countdown freezes at 00:00:00, no redirect */}
          <CountdownTimer />
        </div>

        {/* B2 — Event info */}
        <EventInfo />
      </div>

      {/* B3 — CTA buttons */}
      <HeroCTA />
    </div>
  )
}
