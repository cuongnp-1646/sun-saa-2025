import { describe, it, expect, vi, beforeEach } from 'vitest'
import { NextRequest, NextResponse } from 'next/server'

// Mock the supabase middleware helper before any imports
vi.mock('@/libs/supabase/middleware', () => ({
  createClient: vi.fn(),
}))

function makeRequest(url: string): NextRequest {
  return new NextRequest(new URL(url, 'http://localhost:3000'))
}

describe('middleware', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
  })

  it('allows unauthenticated access to /awards (public route)', async () => {
    const { middleware } = await import('@/middleware')
    const response = await middleware(makeRequest('http://localhost:3000/awards'))

    expect(response.status).toBe(200)
  })

  it('redirects unauthenticated user from protected route to /login', async () => {
    const { createClient } = await import('@/libs/supabase/middleware')
    const supabaseResponse = NextResponse.next()
    ;(createClient as ReturnType<typeof vi.fn>).mockReturnValue({
      supabase: { auth: { getUser: vi.fn().mockResolvedValue({ data: { user: null }, error: null }) } },
      supabaseResponse,
    })

    const { middleware } = await import('@/middleware')
    // / is now a public route — use a protected route instead
    const response = await middleware(makeRequest('http://localhost:3000/profile'))

    expect(response.status).toBe(307)
    expect(response.headers.get('location')).toContain('/login')
  })

  it('redirects authenticated user away from /login to /', async () => {
    const { createClient } = await import('@/libs/supabase/middleware')
    const supabaseResponse = NextResponse.next()
    ;(createClient as ReturnType<typeof vi.fn>).mockReturnValue({
      supabase: {
        auth: {
          getUser: vi.fn().mockResolvedValue({
            data: { user: { id: 'u1', email: 'a@sun-asterisk.com' } },
            error: null,
          }),
        },
      },
      supabaseResponse,
    })

    const { middleware } = await import('@/middleware')
    const response = await middleware(makeRequest('http://localhost:3000/login'))

    expect(response.status).toBe(307)
    const location = response.headers.get('location') ?? ''
    expect(location).not.toContain('/login')
    expect(location.endsWith('/')).toBe(true)
  })
})
