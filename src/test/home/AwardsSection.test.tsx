import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

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

import { AwardsSection } from '@/components/home/AwardsSection'

describe('AwardsSection', () => {
  it('renders exactly 6 award cards', () => {
    render(<AwardsSection />)
    const cards = screen.getAllByRole('article')
    expect(cards).toHaveLength(6)
  })

  it('renders the section title "Hệ thống giải thưởng"', () => {
    render(<AwardsSection />)
    expect(screen.getByText('Hệ thống giải thưởng')).toBeInTheDocument()
  })

  it('renders the section caption', () => {
    render(<AwardsSection />)
    expect(screen.getByText(/Sun\* annual awards 2025/i)).toBeInTheDocument()
  })

  it('renders all 6 award names', () => {
    render(<AwardsSection />)
    expect(screen.getByText('Top Talent')).toBeInTheDocument()
    expect(screen.getByText('Top Project')).toBeInTheDocument()
    expect(screen.getByText('Top Project Leader')).toBeInTheDocument()
    expect(screen.getByText('Best Manager')).toBeInTheDocument()
    expect(screen.getByText('Signature 2025 — Creator')).toBeInTheDocument()
    expect(screen.getByText('MVP')).toBeInTheDocument()
  })
})
