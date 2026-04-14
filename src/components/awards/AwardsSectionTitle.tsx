/**
 * A_Title — Section title block — Server Component.
 * Design: Node 313:8453
 *   Sub-label: 24px 700 white
 *   Divider: 1px #2E3940
 *   Heading: 57px 700 #FFEA9E ls:-0.25px
 *   Responsive: 32px (mobile) → 40px (sm) → 57px (lg)
 */
export function AwardsSectionTitle() {
  return (
    <div
      className="flex flex-col gap-4 w-full"
      style={{ fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)' }}
    >
      {/* Sub-label */}
      <p className="text-white text-[24px] font-bold leading-[32px]">
        Sun* Annual Awards 2025
      </p>

      {/* Divider */}
      <div className="w-full h-px bg-[#2E3940]" aria-hidden />

      {/* Main heading */}
      <h1 className="text-[#FFEA9E] text-[32px] sm:text-[40px] lg:text-[57px] font-bold leading-tight lg:leading-[64px] lg:tracking-[-0.25px]">
        Hệ thống giải thưởng SAA 2025
      </h1>
    </div>
  )
}
