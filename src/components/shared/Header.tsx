import Image from 'next/image'
import Link from 'next/link'
import { HeaderNav } from './HeaderNav'
import { HeaderControls } from './HeaderControls'
import { ROUTES } from '@/config/navigation'

interface HeaderProps {
  /** The current page route key, e.g. "home" | "awards" | "kudos" */
  activeRoute: string
}

/**
 * Sticky top navigation header — Server Component shell.
 * Client interactivity (bell, language, avatar dropdowns) is in HeaderControls island.
 *
 * Design tokens (design-style.md):
 *   Height: 80px | Padding: 12px 144px | bg: rgba(16,20,23,0.8) + backdrop-blur
 *   Logo: 52×48px | Nav gap: 24px | Controls gap right
 */
export function Header({ activeRoute }: HeaderProps) {
  return (
    <header
      className="sticky top-0 z-50 w-full flex flex-row items-center justify-between px-4 sm:px-9 lg:px-[144px] py-[12px] h-[80px]"
      style={{
        background: 'var(--color-header-bg, rgba(16,20,23,0.8))',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      {/* Left group: Logo + Nav */}
      <div className="flex flex-row items-center gap-[var(--spacing-header-group-gap,64px)]">
        <Link
          href={ROUTES.home}
          aria-label="Sun* Annual Awards 2025 — Go to homepage"
          className="flex-shrink-0"
        >
          <Image
            src="/assets/shared/logos/saa-logo.png"
            alt="Sun* Annual Awards 2025"
            width={52}
            height={48}
            priority
          />
        </Link>

        {/* Nav hidden on mobile — shown at lg */}
        <div className="hidden lg:block">
          <HeaderNav activeRoute={activeRoute} />
        </div>
      </div>

      {/* Right group: Controls */}
      <HeaderControls />
    </header>
  )
}
