import { describe, it, expect, vi, beforeEach } from 'vitest'
import { NextRequest } from 'next/server'

vi.mock('@/libs/supabase/server', () => ({
  createClient: vi.fn(),
}))

vi.mock('next/navigation', () => ({
  redirect: vi.fn((url: string) => {
    throw new Error(`REDIRECT:${url}`)
  }),
}))

function makeRequest(url: string): NextRequest {
  return new NextRequest(new URL(url, 'http://localhost:3000'))
}

describe('/auth/callback route', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
  })

  it('exchanges valid code for session and redirects to /', async () => {
    const { createClient } = await import('@/libs/supabase/server')
    ;(createClient as ReturnType<typeof vi.fn>).mockResolvedValue({
      auth: {
        exchangeCodeForSession: vi.fn().mockResolvedValue({ data: { session: {} }, error: null }),
      },
    })

    const { GET } = await import('@/app/auth/callback/route')
    const request = makeRequest('http://localhost:3000/auth/callback?code=valid-code-123')

    await expect(GET(request)).rejects.toThrow('REDIRECT:/')
  })

  it('redirects to /login?error=auth_failed when code is invalid', async () => {
    const { createClient } = await import('@/libs/supabase/server')
    ;(createClient as ReturnType<typeof vi.fn>).mockResolvedValue({
      auth: {
        exchangeCodeForSession: vi.fn().mockResolvedValue({
          data: { session: null },
          error: { message: 'Invalid code' },
        }),
      },
    })

    const { GET } = await import('@/app/auth/callback/route')
    const request = makeRequest('http://localhost:3000/auth/callback?code=bad-code')

    await expect(GET(request)).rejects.toThrow('REDIRECT:/login?error=auth_failed')
  })

  it('redirects to /login?error=auth_failed when code param is missing', async () => {
    const { createClient } = await import('@/libs/supabase/server')
    ;(createClient as ReturnType<typeof vi.fn>).mockResolvedValue({
      auth: {
        exchangeCodeForSession: vi.fn().mockResolvedValue({
          data: { session: null },
          error: { message: 'No code' },
        }),
      },
    })

    const { GET } = await import('@/app/auth/callback/route')
    const request = makeRequest('http://localhost:3000/auth/callback')

    await expect(GET(request)).rejects.toThrow('REDIRECT:/login?error=auth_failed')
  })
})
