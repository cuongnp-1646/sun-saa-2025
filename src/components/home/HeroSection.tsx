import Image from 'next/image'
import { HeroContent } from './HeroContent'

/**
 * Hero / Keyvisual section — full bleed background image + gradient overlay + content.
 * Design tokens (design-style.md):
 *   Height: 1392px (desktop Figma canvas) → min-h-[860px] responsive
 *   BG: bg-keyvisual.png (full cover)
 *   Gradient overlay: linear-gradient(12deg, #00101A 23.7%, ...)
 *   Content: left-aligned, px:144px
 */
export function HeroSection() {
  return (
    <section
      className="relative w-full min-h-[700px] lg:min-h-[1312px] overflow-hidden bg-[var(--color-bg-page,#00101A)]"
      aria-label="Hero section"
    >
      {/* BG Image */}
      <div className="absolute inset-0 z-0" aria-hidden>
        <Image
          src="/assets/home/images/bg-keyvisual.png"
          alt=""
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{ background: 'var(--gradient-hero-overlay)' }}
        aria-hidden
      />

      {/* Content — starts at y=104px from hero top (Figma: y=184 - header 80px) */}
      <div className="relative z-10 w-full flex items-start px-4 sm:px-9 lg:px-[144px] pt-[60px] lg:pt-[104px]">
        <HeroContent />
      </div>
    </section>
  )
}
