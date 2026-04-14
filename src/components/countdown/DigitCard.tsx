interface DigitCardProps {
  digit: string
}

/**
 * Single glass LED-style digit card.
 *
 * The background layer (opacity 0.5, backdrop-blur, gold border) is separated
 * from the digit text layer (full opacity) to prevent opacity inheritance from
 * making the digit semi-transparent (per design-style.md note).
 */
export function DigitCard({ digit }: DigitCardProps) {
  return (
    <div className="relative w-[54px] h-[86px] sm:w-[65px] sm:h-[104px] lg:w-[77px] lg:h-[123px]">
      {/* Background layer — glass morphism, semi-transparent */}
      <div
        className="absolute inset-0 rounded-[var(--radius-digit-card)] border border-[var(--color-digit-border)] opacity-50"
        style={{
          background: 'linear-gradient(180deg, #fff 0%, rgba(255,255,255,0.10) 100%)',
          backdropFilter: 'var(--blur-digit-card)',
          WebkitBackdropFilter: 'var(--blur-digit-card)',
        }}
        aria-hidden
      />
      {/* Digit text — full opacity, above the background layer.
          Font sizes are fixed per breakpoint, proportional to card widths
          (Figma ratio: 73.73px / 77px ≈ 0.957 — applied to sm=65px→62px, base=54px→52px). */}
      <span
        className="absolute inset-0 z-10 flex items-center justify-center text-white font-normal leading-none text-[52px] sm:text-[62px] lg:text-[73.73px]"
        style={{
          fontFamily: "'Digital Numbers', 'Courier New', monospace",
        }}
      >
        {digit}
      </span>
    </div>
  )
}
