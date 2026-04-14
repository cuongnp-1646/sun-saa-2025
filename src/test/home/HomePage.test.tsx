import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, within } from '@testing-library/react'

vi.mock('next/image', () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  ),
}))

vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace: vi.fn() }),
}))

const mockUseCountdown = vi.fn()
vi.mock('@/hooks/useCountdown', () => ({
  useCountdown: (...args: unknown[]) => mockUseCountdown(...args),
}))

import { HomePage } from '@/components/home/HomePage'

describe('HomePage', () => {
  beforeEach(() => {
    mockUseCountdown.mockReturnValue({ days: 5, hours: 12, minutes: 30 })
  })

  it('renders the header', () => {
    render(<HomePage />)
    expect(screen.getByRole('banner')).toBeInTheDocument()
  })

  it('renders main navigation with "About SAA 2025" as active', () => {
    render(<HomePage />)
    // Scope to "Main navigation" to distinguish from footer links
    const mainNav = screen.getByRole('navigation', { name: 'Main navigation' })
    const activeLink = within(mainNav).getByRole('link', { name: 'About SAA 2025' })
    expect(activeLink).toHaveAttribute('aria-current', 'page')
  })

  it('renders the hero section with countdown', () => {
    render(<HomePage />)
    expect(screen.getByRole('timer')).toBeInTheDocument()
  })

  it('renders 6 award cards', () => {
    render(<HomePage />)
    const cards = screen.getAllByRole('article')
    expect(cards).toHaveLength(6)
  })

  it('renders the Sun* Kudos section', () => {
    render(<HomePage />)
    expect(screen.getByRole('region', { name: /Sun\* Kudos/i })).toBeInTheDocument()
  })

  it('renders the footer', () => {
    render(<HomePage />)
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('renders the floating widget button', () => {
    render(<HomePage />)
    expect(screen.getByRole('button', { name: /Quick actions/i })).toBeInTheDocument()
  })

  it('renders ABOUT AWARDS and ABOUT KUDOS CTA buttons', () => {
    render(<HomePage />)
    expect(screen.getByRole('link', { name: /ABOUT AWARDS/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /ABOUT KUDOS/i })).toBeInTheDocument()
  })
})
