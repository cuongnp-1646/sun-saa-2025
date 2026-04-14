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

import { AwardsPage } from '@/components/awards/AwardsPage'

describe('AwardsPage', () => {
  it('renders exactly 6 award articles', () => {
    render(<AwardsPage />)
    const articles = screen.getAllByRole('article')
    expect(articles).toHaveLength(6)
  })

  it('renders "Hệ thống giải thưởng SAA 2025" heading', () => {
    render(<AwardsPage />)
    expect(screen.getByRole('heading', { name: /Hệ thống giải thưởng SAA 2025/i })).toBeInTheDocument()
  })

  it('renders "Top Talent" award section', () => {
    render(<AwardsPage />)
    // Award name appears in sidebar nav + card heading
    const matches = screen.getAllByText('Top Talent')
    expect(matches.length).toBeGreaterThanOrEqual(1)
  })

  it('renders prize value "7.000.000 VNĐ" (Top Talent + Top Project Leader share this value)', () => {
    render(<AwardsPage />)
    const matches = screen.getAllByText('7.000.000 VNĐ')
    expect(matches.length).toBeGreaterThanOrEqual(1)
  })

  it('renders all 6 award names', () => {
    render(<AwardsPage />)
    expect(screen.getAllByText('Top Talent').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Top Project').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Top Project Leader').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Best Manager').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Signature 2025 — Creator').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('MVP').length).toBeGreaterThanOrEqual(1)
  })

  it('renders "Số lượng giải thưởng:" label', () => {
    render(<AwardsPage />)
    const labels = screen.getAllByText('Số lượng giải thưởng:')
    expect(labels.length).toBe(6)
  })

  it('renders "Giá trị giải thưởng:" label', () => {
    render(<AwardsPage />)
    const labels = screen.getAllByText('Giá trị giải thưởng:')
    // Signature Creator has 2 value blocks (individual + team), so total is 7
    expect(labels.length).toBeGreaterThanOrEqual(6)
  })

  it('renders Sun* Annual Awards 2025 sub-label', () => {
    render(<AwardsPage />)
    expect(screen.getByText('Sun* Annual Awards 2025')).toBeInTheDocument()
  })

  it('renders KudosSection with Sun* Kudos heading', () => {
    render(<AwardsPage />)
    expect(screen.getByText('Sun* Kudos')).toBeInTheDocument()
  })

  it('each award article has its anchor id', () => {
    const { container } = render(<AwardsPage />)
    const anchors = [
      'award-top-talent', 'award-top-project', 'award-top-project-leader',
      'award-best-manager', 'award-signature-2025-creator', 'award-mvp',
    ]
    for (const id of anchors) {
      expect(container.querySelector(`#${id}`)).not.toBeNull()
    }
  })
})
