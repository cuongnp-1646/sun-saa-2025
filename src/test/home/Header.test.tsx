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

// Header is a server component — import after mocks
import { Header } from '@/components/shared/Header'

describe('Header', () => {
  it('renders the SAA logo with accessible label', () => {
    render(<Header activeRoute="home" />)
    const logoLink = screen.getByRole('link', { name: /Sun\* Annual Awards 2025/i })
    expect(logoLink).toBeInTheDocument()
    expect(logoLink).toHaveAttribute('href', '/')
  })

  it('renders all 3 nav links', () => {
    render(<Header activeRoute="home" />)
    expect(screen.getByRole('link', { name: 'About SAA 2025' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Awards Information' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Sun* Kudos' })).toBeInTheDocument()
  })

  it('marks "About SAA 2025" as active when activeRoute is "home"', () => {
    render(<Header activeRoute="home" />)
    const activeLink = screen.getByRole('link', { name: 'About SAA 2025' })
    expect(activeLink).toHaveAttribute('aria-current', 'page')
  })

  it('does not mark "Awards Information" as active on home page', () => {
    render(<Header activeRoute="home" />)
    const awardsLink = screen.getByRole('link', { name: 'Awards Information' })
    expect(awardsLink).not.toHaveAttribute('aria-current', 'page')
  })

  it('renders nav with aria-label="Main navigation"', () => {
    render(<Header activeRoute="home" />)
    const nav = screen.getByRole('navigation', { name: 'Main navigation' })
    expect(nav).toBeInTheDocument()
  })

  it('renders the header element', () => {
    render(<Header activeRoute="home" />)
    const header = screen.getByRole('banner')
    expect(header).toBeInTheDocument()
  })
})
