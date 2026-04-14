'use client'

import { useEffect, useState } from 'react'
import type { CountdownState } from '@/types/countdown'

function computeCountdown(targetMs: number): CountdownState {
  const delta = Math.max(0, targetMs - Date.now())
  const totalSeconds = Math.floor(delta / 1000)
  const days = Math.floor(totalSeconds / (24 * 60 * 60))
  const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60))
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60)
  return { days, hours, minutes }
}

/**
 * Computes a live countdown state from a target ISO date string.
 * Returns null before client hydration (SSR safe).
 * Redirect-on-zero is the caller's responsibility.
 */
export function useCountdown(targetIso: string | undefined): CountdownState | null {
  const [state, setState] = useState<CountdownState | null>(null)

  useEffect(() => {
    const targetMs = targetIso ? Date.parse(targetIso) : NaN

    if (!targetIso || isNaN(targetMs)) {
      setState({ days: 0, hours: 0, minutes: 0 })
      return
    }

    setState(computeCountdown(targetMs))

    const id = setInterval(() => {
      setState(computeCountdown(targetMs))
    }, 1000)

    return () => clearInterval(id)
  }, [targetIso])

  return state
}
