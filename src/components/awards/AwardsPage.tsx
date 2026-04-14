import { AWARDS } from '@/config/awards'
import { KudosSection } from '@/components/shared/KudosSection'
import { AwardsKeyvisual } from './AwardsKeyvisual'
import { AwardsSectionTitle } from './AwardsSectionTitle'
import { AwardsDetailCard } from './AwardsDetailCard'
import { AwardsSidebarNav } from './AwardsSidebarNav'
import { AwardsDropdown } from './AwardsDropdown'

/**
 * AwardsPage — Server Component assembling the full /awards page content.
 * Layout (PC): Keyvisual → Section Title → Content (sidebar left + cards right) → Kudos
 * Layout (SP): Keyvisual → Section Title → Dropdown → Cards stacked → Kudos
 */
export function AwardsPage() {
  return (
    <main
      className="min-h-screen bg-[#00101A]"
      style={{ fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)' }}
    >
      {/* Hero keyvisual */}
      <AwardsKeyvisual />

      {/* Section title */}
      <div className="px-4 sm:px-9 lg:px-[144px] pt-16 pb-10">
        <AwardsSectionTitle />
      </div>

      {/* SP: Dropdown selector (hidden on lg+) */}
      <div className="block lg:hidden px-4 sm:px-9 pb-8">
        <AwardsDropdown awards={AWARDS} />
      </div>

      {/* Content area: sidebar (PC only) + award cards */}
      <div className="px-4 sm:px-9 lg:px-[144px] pb-20">
        <div className="flex flex-row gap-[80px] items-start">
          {/* PC sidebar nav (sticky) — hidden below lg */}
          <div className="hidden lg:block w-[178px] flex-shrink-0 sticky top-24">
            <AwardsSidebarNav awards={AWARDS} />
          </div>

          {/* Award cards list */}
          <div className="flex flex-col gap-[80px] flex-1">
            {AWARDS.map((award, index) => (
              <div key={award.id} id={`award-${award.slug}`}>
                <AwardsDetailCard award={award} index={index} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sun* Kudos promo block (T017: US3) */}
      <KudosSection />
    </main>
  )
}
