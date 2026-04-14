import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

vi.mock('@/libs/supabase/client', () => ({
  createClient: vi.fn(),
}))

const mockSignInWithOAuth = vi.fn()

async function renderButton(props: { initialError?: string } = {}) {
  const { createClient } = await import('@/libs/supabase/client')
  ;(createClient as ReturnType<typeof vi.fn>).mockReturnValue({
    auth: { signInWithOAuth: mockSignInWithOAuth },
  })
  const { LoginButton } = await import('@/components/login/LoginButton')
  return render(<LoginButton {...props} />)
}

describe('LoginButton', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
    mockSignInWithOAuth.mockResolvedValue({ data: {}, error: null })
    // Set NEXT_PUBLIC_SITE_URL
    Object.assign(process.env, { NEXT_PUBLIC_SITE_URL: 'http://localhost:3000' })
  })

  it('renders button with aria-label="Sign in with Google" and is enabled', async () => {
    await renderButton()
    const btn = screen.getByRole('button', { name: /sign in with google/i })
    expect(btn).toBeInTheDocument()
    expect(btn).not.toBeDisabled()
    expect(btn).toHaveAttribute('aria-busy', 'false')
  })

  it('renders Google icon image', async () => {
    await renderButton()
    const icon = screen.getByAltText(/google/i)
    expect(icon).toBeInTheDocument()
  })

  it('disables button and sets aria-busy on click', async () => {
    mockSignInWithOAuth.mockImplementation(() => new Promise(() => {})) // never resolves
    await renderButton()
    const btn = screen.getByRole('button', { name: /sign in with google/i })
    fireEvent.click(btn)
    await waitFor(() => {
      expect(btn).toBeDisabled()
      expect(btn).toHaveAttribute('aria-busy', 'true')
    })
  })

  it('calls signInWithOAuth exactly once even when clicked twice quickly', async () => {
    mockSignInWithOAuth.mockImplementation(() => new Promise(() => {}))
    await renderButton()
    const btn = screen.getByRole('button', { name: /sign in with google/i })
    fireEvent.click(btn)
    fireEvent.click(btn)
    await waitFor(() => {
      expect(mockSignInWithOAuth).toHaveBeenCalledTimes(1)
    })
  })

  it('shows inline error text when initialError prop is set', async () => {
    await renderButton({ initialError: 'auth_failed' })
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('shows error text when OAuth returns an error', async () => {
    mockSignInWithOAuth.mockResolvedValue({ data: {}, error: { message: 'OAuth error' } })
    await renderButton()
    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: /sign in with google/i }))
    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument()
    })
  })
})
