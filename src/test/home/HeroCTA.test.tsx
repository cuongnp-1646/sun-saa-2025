import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

import { HeroCTA } from '@/components/home/HeroCTA'

describe('HeroCTA', () => {
  it('renders ABOUT AWARDS button linking to /awards', () => {
    render(<HeroCTA />)
    const btn = screen.getByRole('link', { name: /ABOUT AWARDS/i })
    expect(btn).toBeInTheDocument()
    expect(btn).toHaveAttribute('href', '/awards')
  })

  it('renders ABOUT KUDOS button linking to /kudos', () => {
    render(<HeroCTA />)
    const btn = screen.getByRole('link', { name: /ABOUT KUDOS/i })
    expect(btn).toBeInTheDocument()
    expect(btn).toHaveAttribute('href', '/kudos')
  })

  it('ABOUT AWARDS has primary gold background style', () => {
    render(<HeroCTA />)
    const btn = screen.getByRole('link', { name: /ABOUT AWARDS/i })
    // Primary button has text-[var(--color-btn-primary-text)] class applied
    expect(btn.className).toMatch(/btn-primary|text-\[var\(--color-btn-primary/i)
  })

  it('renders both buttons in a row container', () => {
    const { container } = render(<HeroCTA />)
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper).toBeTruthy()
    const links = wrapper.querySelectorAll('a')
    expect(links.length).toBe(2)
  })
})
