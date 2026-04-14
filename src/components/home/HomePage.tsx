import { Header } from '@/components/shared/Header'
import { Footer } from '@/components/shared/Footer'
import { HeroSection } from './HeroSection'
import { RootFurtherSection } from './RootFurtherSection'
import { AwardsSection } from './AwardsSection'
import { KudosSection } from '@/components/shared/KudosSection'
import { FloatingWidget } from './FloatingWidget'

/**
 * Homepage SAA — Server Component page shell.
 * Composes all 7 sections in order:
 *   1. Header (sticky)
 *   2. Hero / Keyvisual (B1+B2+B3)
 *   3. Root Further block (B4)
 *   4. Awards section (C1+C2)
 *   5. Sun* Kudos promo (D1)
 *   6. Footer
 *   7. Floating Widget (fixed, client island)
 */
export function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-page,#00101A)]">
      {/* Sticky header — "About SAA 2025" is active on homepage */}
      <Header activeRoute="home" />

      <main>
        {/* Hero section with countdown, event info, CTAs */}
        <HeroSection />

        {/* Root Further campaign content */}
        <RootFurtherSection />

        {/* Awards grid */}
        <AwardsSection />

        {/* Sun* Kudos promo */}
        <KudosSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating action widget — client island */}
      <FloatingWidget />
    </div>
  )
}
