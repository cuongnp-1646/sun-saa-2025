import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'

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

import { FloatingWidget } from '@/components/home/FloatingWidget'

describe('FloatingWidget', () => {
  it('renders the quick actions button', () => {
    render(<FloatingWidget />)
    const btn = screen.getByRole('button', { name: /Quick actions/i })
    expect(btn).toBeInTheDocument()
  })

  it('has aria-haspopup="true" on the trigger button', () => {
    render(<FloatingWidget />)
    const btn = screen.getByRole('button', { name: /Quick actions/i })
    expect(btn).toHaveAttribute('aria-haspopup', 'true')
  })

  it('action menu is not visible by default', () => {
    render(<FloatingWidget />)
    const menu = screen.queryByRole('menu')
    expect(menu).not.toBeInTheDocument()
  })

  it('opens action menu when button is clicked', () => {
    render(<FloatingWidget />)
    const btn = screen.getByRole('button', { name: /Quick actions/i })
    fireEvent.click(btn)
    const menu = screen.getByRole('menu')
    expect(menu).toBeInTheDocument()
  })

  it('action menu contains a "Viết Kudo" option', () => {
    render(<FloatingWidget />)
    const btn = screen.getByRole('button', { name: /Quick actions/i })
    fireEvent.click(btn)
    expect(screen.getByText(/Viết Kudo/i)).toBeInTheDocument()
  })
})
