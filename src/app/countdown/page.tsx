import type { Metadata } from 'next'
import { CountdownPage } from '@/components/countdown/CountdownPage'

export const metadata: Metadata = {
  title: 'Coming Soon | Sun Annual Awards 2025',
  description: 'The Sun Annual Awards 2025 is launching soon. Stay tuned!',
}

export default function CountdownPageRoute() {
  return <CountdownPage />
}
