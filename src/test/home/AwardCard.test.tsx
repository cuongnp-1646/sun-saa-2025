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

import { AwardCard } from '@/components/home/AwardCard'
import type { Award } from '@/types/home'

const mockAward: Award = {
  id: 'top-talent',
  slug: 'top-talent',
  name: 'Top Talent',
  description: 'Vinh danh top cá nhân xuất sắc',
  bgSrc: '/assets/home/images/award-bg.png',
  nameSrc: '/assets/home/images/award-name-top-talent.png',
  href: '/awards#top-talent',
}

describe('AwardCard', () => {
  it('renders the award name image with alt text', () => {
    render(<AwardCard award={mockAward} />)
    const img = screen.getByAltText('Top Talent')
    expect(img).toBeInTheDocument()
  })

  it('renders the award title text', () => {
    render(<AwardCard award={mockAward} />)
    expect(screen.getByText('Top Talent')).toBeInTheDocument()
  })

  it('renders the award description', () => {
    render(<AwardCard award={mockAward} />)
    expect(screen.getByText('Vinh danh top cá nhân xuất sắc')).toBeInTheDocument()
  })

  it('renders "Chi tiết" link to correct /awards#{slug} href', () => {
    render(<AwardCard award={mockAward} />)
    const link = screen.getByRole('link', { name: /Chi tiết về Top Talent/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/awards#top-talent')
  })

  it('renders as an article element', () => {
    render(<AwardCard award={mockAward} />)
    const article = screen.getByRole('article')
    expect(article).toBeInTheDocument()
  })
})
