import { describe, it, expect, vi, beforeEach } from 'vitest'
import { NextRequest, NextResponse } from 'next/server'

vi.mock('@/libs/supabase/middleware', () => ({
  createClient: vi.fn(),
}))

function makeRequest(url: string): NextRequest {
  return new NextRequest(new URL(url, 'http://localhost:3000'))
}

function setCountdownActive(active: boolean) {
  Object.assign(process.env, {
    NEXT_PUBLIC_COUNTDOWN_ACTIVE: active ? 'true' : 'false',
  })
}

describe('middleware — countdown gate', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
  })

  it('redirects to /countdown when COUNTDOWN_ACTIVE=true and route is /', async () => {
    setCountdownActive(true)
    const { middleware } = await import('@/middleware')
    const response = await middleware(makeRequest('http://localhost:3000/'))
    expect(response.status).toBe(307)
    expect(response.headers.get('location')).toContain('/countdown')
  })

  it('does NOT redirect /countdown when COUNTDOWN_ACTIVE=true (no redirect loop)', async () => {
    setCountdownActive(true)
    // /countdown itself must pass through (no infinite redirect)
    const { createClient } = await import('@/libs/supabase/middleware')
    const supabaseResponse = NextResponse.next()
    ;(createClient as ReturnType<typeof vi.fn>).mockReturnValue({
      supabase: { auth: { getUser: vi.fn().mockResolvedValue({ data: { user: null }, error: null }) } },
      supabaseResponse,
    })
    const { middleware } = await import('@/middleware')
    const response = await middleware(makeRequest('http://localhost:3000/countdown'))
    // Should NOT be a redirect to /countdown (status should not be 307 pointing to /countdown)
    if (response.status === 307) {
      expect(response.headers.get('location')).not.toContain('/countdown')
    }
  })

  it('does NOT redirect /login when COUNTDOWN_ACTIVE=true', async () => {
    setCountdownActive(true)
    const { middleware } = await import('@/middleware')
    const response = await middleware(makeRequest('http://localhost:3000/login'))
    if (response.status === 307) {
      expect(response.headers.get('location')).not.toContain('/countdown')
    }
  })

  it('falls through when COUNTDOWN_ACTIVE=false (/ is public, no auth redirect)', async () => {
    setCountdownActive(false)
    const { middleware } = await import('@/middleware')
    const response = await middleware(makeRequest('http://localhost:3000/'))
    // / is a public route — should pass through (200), not redirect
    expect(response.status).toBe(200)
  })

  it('redirects /dashboard to /countdown when COUNTDOWN_ACTIVE=true', async () => {
    setCountdownActive(true)
    const { middleware } = await import('@/middleware')
    const response = await middleware(makeRequest('http://localhost:3000/dashboard'))
    expect(response.status).toBe(307)
    expect(response.headers.get('location')).toContain('/countdown')
  })
})
