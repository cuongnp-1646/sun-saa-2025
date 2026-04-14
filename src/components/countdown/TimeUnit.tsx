import { DigitCard } from './DigitCard'

interface TimeUnitProps {
  /** Numeric value (0–99 for days, 0–23 for hours, 0–59 for minutes). Null during hydration. */
  value: number | null
  /** Display label shown below the digit pair, e.g. "DAYS" */
  label: string
  /** Accessible label for the unit container, e.g. "5 days" */
  ariaLabel: string
}

/**
 * Renders a two-digit display unit (tens + units digit cards) with a label below.
 * Shows placeholder "-" digits while value is null (SSR hydration state).
 */
export function TimeUnit({ value, label, ariaLabel }: TimeUnitProps) {
  const placeholder = '-'
  const tens = value !== null ? String(Math.floor(value / 10) % 10) : placeholder
  const units = value !== null ? String(value % 10) : placeholder

  return (
    <div
      className="flex flex-col gap-[21px] items-start"
      aria-label={ariaLabel}
    >
      {/* Digit pair row */}
      <div className="flex flex-row gap-[var(--spacing-digits-gap,21px)] items-center">
        <DigitCard digit={tens} />
        <DigitCard digit={units} />
      </div>

      {/* Unit label */}
      <span
        className="text-white font-bold uppercase text-[20px] sm:text-[26px] lg:text-[36px] leading-tight"
        style={{ fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)' }}
      >
        {label}
      </span>
    </div>
  )
}
