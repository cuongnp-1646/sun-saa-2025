'use client'

import { useRouter } from 'next/navigation'
import { CountdownTimer } from './CountdownTimer'

/**
 * Client island for the pre-launch page.
 * Wraps CountdownTimer and redirects to '/' when the countdown reaches zero.
 */
export function CountdownPageTimer() {
  const router = useRouter()
  return <CountdownTimer onZero={() => router.replace('/')} />
}
