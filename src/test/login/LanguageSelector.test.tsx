import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LanguageSelector } from '@/components/login/LanguageSelector'

describe('LanguageSelector', () => {
  it('renders with aria-expanded=false by default', () => {
    render(<LanguageSelector />)
    const btn = screen.getByRole('button', { name: /select language/i })
    expect(btn).toHaveAttribute('aria-expanded', 'false')
    expect(btn).toHaveAttribute('aria-haspopup', 'listbox')
  })

  it('toggles aria-expanded to true on click', async () => {
    const user = userEvent.setup()
    render(<LanguageSelector />)
    const btn = screen.getByRole('button', { name: /select language/i })
    await user.click(btn)
    expect(btn).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('listbox')).toBeInTheDocument()
  })

  it('closes dropdown on second click (toggle)', async () => {
    const user = userEvent.setup()
    render(<LanguageSelector />)
    const btn = screen.getByRole('button', { name: /select language/i })
    await user.click(btn)
    await user.click(btn)
    expect(btn).toHaveAttribute('aria-expanded', 'false')
  })

  it('closes dropdown on Escape key', async () => {
    const user = userEvent.setup()
    render(<LanguageSelector />)
    const btn = screen.getByRole('button', { name: /select language/i })
    await user.click(btn)
    expect(btn).toHaveAttribute('aria-expanded', 'true')
    await user.keyboard('{Escape}')
    expect(btn).toHaveAttribute('aria-expanded', 'false')
  })

  it('toggles on Enter key', async () => {
    render(<LanguageSelector />)
    const btn = screen.getByRole('button', { name: /select language/i })
    btn.focus()
    fireEvent.keyDown(btn, { key: 'Enter' })
    expect(btn).toHaveAttribute('aria-expanded', 'true')
  })
})
