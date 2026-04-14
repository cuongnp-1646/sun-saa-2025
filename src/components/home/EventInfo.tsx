/**
 * B2 section — Static event info block.
 * Displays time, venue, and streaming note for SAA 2025.
 * Design tokens: --text-body-bold (16px 700), --text-body (16px 400), --color-text-secondary
 */
export function EventInfo() {
  return (
    <div
      className="flex flex-col gap-[var(--spacing-event-info-gap,8px)]"
      style={{ fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)' }}
    >
      {/* Time row */}
      <div className="flex flex-row items-center gap-2">
        <span className="text-[var(--color-text-secondary)] text-[16px] font-normal leading-[24px]">
          Thời gian:
        </span>
        <span className="text-white text-[16px] font-bold leading-[24px]">18h30</span>
      </div>

      {/* Venue row */}
      <div className="flex flex-row items-start gap-2">
        <span className="text-[var(--color-text-secondary)] text-[16px] font-normal leading-[24px] shrink-0">
          Địa điểm:
        </span>
        <span className="text-white text-[16px] font-bold leading-[24px]">
          Nhà hát nghệ thuật quân đội
        </span>
      </div>

      {/* Streaming note */}
      <p className="text-[var(--color-text-secondary)] text-[16px] font-normal leading-[24px] max-w-[480px]">
        Tường thuật trực tiếp tại Group Facebook Sun* Family
      </p>
    </div>
  )
}
