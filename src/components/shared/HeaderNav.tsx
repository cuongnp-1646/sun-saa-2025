import Link from 'next/link'
import { NAV_LINKS } from '@/config/navigation'

interface HeaderNavProps {
  activeRoute: string
}

/**
 * Server component — renders the 3 main nav links with active state.
 * Active link: gold text (#FFEA9E), underline, aria-current="page".
 * Hover state handled via Tailwind group/hover utilities.
 */
export function HeaderNav({ activeRoute }: HeaderNavProps) {
  return (
    <nav aria-label="Main navigation">
      <ul className="flex flex-row items-center gap-[var(--spacing-nav-gap,24px)] list-none m-0 p-0">
        {NAV_LINKS.map((link) => {
          const isActive = activeRoute === 'home'
            ? link.href === '/'
            : link.href === `/${activeRoute}`
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive ? 'page' : undefined}
                className={[
                  'text-[14px] font-bold leading-[20px] px-3 py-1 rounded-[var(--radius-nav-btn,4px)] transition-colors duration-150',
                  'font-[family-name:var(--font-montserrat,Montserrat,sans-serif)]',
                  isActive
                    ? 'text-[var(--color-text-primary-gold,#FFEA9E)] underline underline-offset-4'
                    : 'text-white hover:bg-white/8',
                ].join(' ')}
              >
                {link.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
