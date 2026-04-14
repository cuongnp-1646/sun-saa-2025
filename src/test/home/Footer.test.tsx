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

import { Footer } from '@/components/shared/Footer'

describe('Footer', () => {
  it('renders the footer element', () => {
    render(<Footer />)
    const footer = screen.getByRole('contentinfo')
    expect(footer).toBeInTheDocument()
  })

  it('renders footer nav with aria-label="Footer navigation"', () => {
    render(<Footer />)
    const nav = screen.getByRole('navigation', { name: 'Footer navigation' })
    expect(nav).toBeInTheDocument()
  })

  it('renders About SAA 2025 footer link', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: 'About SAA 2025' })).toBeInTheDocument()
  })

  it('renders Awards Information footer link', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: 'Awards Information' })).toBeInTheDocument()
  })

  it('renders Sun* Kudos footer link', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: 'Sun* Kudos' })).toBeInTheDocument()
  })

  it('renders Tiêu chuẩn chung footer link', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: 'Tiêu chuẩn chung' })).toBeInTheDocument()
  })

  it('renders copyright text', () => {
    render(<Footer />)
    expect(screen.getByText(/Bản quyền thuộc về Sun\* © 2025/i)).toBeInTheDocument()
  })
})
