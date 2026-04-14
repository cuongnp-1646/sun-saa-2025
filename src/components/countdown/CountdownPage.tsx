import Image from 'next/image'
import { CountdownPageTimer } from './CountdownPageTimer'

/**
 * Full-screen pre-launch countdown page layout.
 *
 * Layer stack (matches design-style.md):
 *   z-0  — Background image (full-bleed photo)
 *   z-[1] — Gradient overlay (dark-to-transparent, 18deg angle)
 *   z-10  — Content area (title + countdown timer), top: 218px
 */
export function CountdownPage() {
  return (
    <main className="relative w-full min-h-screen bg-[var(--color-bg-page)] overflow-hidden flex items-center justify-center">
      {/* LAYER 0 — Full-bleed background image */}
      <div className="absolute inset-0 z-0" aria-hidden>
        <Image
          src="/assets/countdown/images/bg-countdown.png"
          alt=""
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* LAYER 1 — Gradient overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{ background: 'var(--gradient-countdown-overlay)' }}
        aria-hidden
      />

      {/* LAYER 2 — Content area (title + countdown)
           Desktop (lg+): absolute top-[218px] matching Figma "Bìa" container (y=218px, title at y=314px).
           Mobile/tablet (<lg): stays in normal flow, centered via parent's flex. */}
      <div className="relative z-10 w-full flex flex-col items-center gap-6 px-4 sm:px-9 lg:absolute lg:top-[314px] lg:px-[144px]">
        {/* Title */}
        <h1
          className="w-full text-center text-white font-bold text-[22px] sm:text-[28px] lg:text-[36px] leading-tight lg:leading-[48px]"
          style={{ fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)' }}
        >
          Sự kiện sẽ bắt đầu sau
        </h1>

        {/* Countdown timer */}
        <CountdownPageTimer />
      </div>

      {/* No-JS fallback */}
      <noscript>
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <p className="text-white text-2xl font-bold" style={{ fontFamily: 'var(--font-montserrat)' }}>
            Coming Soon
          </p>
        </div>
      </noscript>
    </main>
  )
}
