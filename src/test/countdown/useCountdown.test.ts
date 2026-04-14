import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useCountdown } from '@/hooks/useCountdown'

describe('useCountdown', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns countdown state after mount (happy-dom effects are synchronous)', () => {
    // Note: the null/hydration state only exists on the server-side render pass.
    // In happy-dom, useEffect fires synchronously, so the hook returns a value immediately.
    // SSR hydration safety (null initial state) is verified at the component level via E2E.
    const futureDate = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString()
    const { result } = renderHook(() => useCountdown(futureDate))
    act(() => { vi.advanceTimersByTime(100) })
    expect(result.current).not.toBeNull()
    expect(typeof result.current?.days).toBe('number')
  })

  it('returns correct { days, hours, minutes } for a future date after mount', () => {
    const delta = (2 * 24 * 60 * 60 + 5 * 60 * 60 + 30 * 60) * 1000
    const futureDate = new Date(Date.now() + delta).toISOString()

    const { result } = renderHook(() => useCountdown(futureDate))

    act(() => { vi.advanceTimersByTime(100) })

    expect(result.current?.days).toBe(2)
    expect(result.current?.hours).toBe(5)
    expect(result.current?.minutes).toBe(30)
  })

  it('returns all zeros when date is in the past', () => {
    const pastDate = new Date(Date.now() - 1000).toISOString()
    const { result } = renderHook(() => useCountdown(pastDate))

    act(() => { vi.advanceTimersByTime(100) })

    expect(result.current).toEqual({ days: 0, hours: 0, minutes: 0 })
  })

  it('returns all zeros when targetIso is undefined', () => {
    const { result } = renderHook(() => useCountdown(undefined))

    act(() => { vi.advanceTimersByTime(100) })

    expect(result.current).toEqual({ days: 0, hours: 0, minutes: 0 })
  })

  it('returns all zeros when targetIso is an invalid date string', () => {
    const { result } = renderHook(() => useCountdown('not-a-date'))

    act(() => { vi.advanceTimersByTime(100) })

    expect(result.current).toEqual({ days: 0, hours: 0, minutes: 0 })
  })

  it('decrements minutes counter after 60 seconds', () => {
    const delta = 3 * 60 * 1000 // 3 minutes
    const futureDate = new Date(Date.now() + delta).toISOString()

    const { result } = renderHook(() => useCountdown(futureDate))

    act(() => { vi.advanceTimersByTime(100) })
    expect(result.current?.minutes).toBe(3)

    act(() => { vi.advanceTimersByTime(60 * 1000) })
    expect(result.current?.minutes).toBe(2)
  })

  it('cleans up interval on unmount (no memory leak)', () => {
    const clearIntervalSpy = vi.spyOn(globalThis, 'clearInterval')
    const futureDate = new Date(Date.now() + 60 * 60 * 1000).toISOString()

    const { unmount } = renderHook(() => useCountdown(futureDate))

    act(() => { vi.advanceTimersByTime(100) })
    unmount()

    expect(clearIntervalSpy).toHaveBeenCalled()
  })
})
