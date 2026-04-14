import Image from 'next/image'
import Link from 'next/link'
import { ROUTES } from '@/config/navigation'

const FOOTER_LINKS = [
  { label: 'About SAA 2025', href: ROUTES.home },
  { label: 'Awards Information', href: ROUTES.awards },
  { label: 'Sun* Kudos', href: ROUTES.kudos },
  { label: 'Tiêu chuẩn chung', href: ROUTES.communityStandards },
]

/**
 * Footer — Server Component.
 * Design tokens (design-style.md §Footer):
 *   Layout: flex-row justify-between items-center
 *   padding: py-10 px-[90px] | border-top: 1px solid #2E3940
 *   Left: Logo 69×64px | Center: Nav links 14px 700 | Right: Copyright 14px 400 white/70
 */
export function Footer() {
  return (
    <footer
      className="w-full flex flex-row items-center justify-between gap-6 px-4 sm:px-9 lg:px-[90px] py-10"
      style={{ borderTop: '1px solid #2E3940' }}
    >
      {/* Left: Logo */}
      <Link href={ROUTES.home} aria-label="Sun* Annual Awards 2025 — Go to homepage" className="shrink-0">
        <Image
          src="/assets/shared/logos/saa-logo-footer.png"
          alt="Sun* Annual Awards 2025"
          width={69}
          height={64}
        />
      </Link>

      {/* Center: Nav links */}
      <nav aria-label="Footer navigation">
        <ul className="flex flex-wrap justify-center gap-x-8 gap-y-3 list-none m-0 p-0">
          {FOOTER_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-white text-[14px] font-bold leading-[20px] hover:text-[#FFEA9E] transition-colors"
                style={{ fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)' }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Right: Copyright */}
      <p
        className="text-white/70 text-[14px] font-normal shrink-0"
        style={{ fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)' }}
      >
        Bản quyền thuộc về Sun* © 2025
      </p>
    </footer>
  )
}
