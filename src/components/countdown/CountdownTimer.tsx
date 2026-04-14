'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useCountdown } from '@/hooks/useCountdown'
import { TimeUnit } from './TimeUnit'

interface CountdownTimerProps {
  /**
   * Called when the countdown reaches 00:00:00.
   * - Prelaunch page: pass `() => router.replace('/')` to redirect.
   * - Homepage: omit (or pass undefined) to freeze at 00:00:00 with no redirect.
   */
  onZero?: () => void
}

/**
 * Client component that drives the countdown timer.
 * Reads NEXT_PUBLIC_LAUNCH_DATE from env and delegates to useCountdown hook.
 * Renders three TimeUnit blocks: DAYS, HOURS, MINUTES.
 * When the countdown reaches zero, calls onZero() if provided.
 */
export function CountdownTimer({ onZero }: CountdownTimerProps = {}) {
  const router = useRouter()
  const countdown = useCountdown(process.env.NEXT_PUBLIC_LAUNCH_DATE)

  useEffect(() => {
    if (
      countdown !== null &&
      countdown.days === 0 &&
      countdown.hours === 0 &&
      countdown.minutes === 0
    ) {
      if (onZero) {
        onZero()
      }
      // When onZero is not provided, freeze at 00:00:00 (no redirect).
    }
  }, [countdown, onZero, router])

  return (
    <div
      role="timer"
      aria-live="polite"
      aria-label="Countdown to launch"
      className="flex flex-col gap-8 items-center sm:flex-row sm:gap-10 lg:gap-[60px]"
    >
      <TimeUnit
        value={countdown?.days ?? null}
        label="DAYS"
        ariaLabel={countdown ? `${countdown.days} days` : 'days loading'}
      />
      <TimeUnit
        value={countdown?.hours ?? null}
        label="HOURS"
        ariaLabel={countdown ? `${countdown.hours} hours` : 'hours loading'}
      />
      <TimeUnit
        value={countdown?.minutes ?? null}
        label="MINUTES"
        ariaLabel={countdown ? `${countdown.minutes} minutes` : 'minutes loading'}
      />
    </div>
  )
}
