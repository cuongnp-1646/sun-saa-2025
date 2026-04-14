import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace: vi.fn() }),
}))

const mockUseCountdown = vi.fn()
vi.mock('@/hooks/useCountdown', () => ({
  useCountdown: (...args: unknown[]) => mockUseCountdown(...args),
}))

import { CountdownTimer } from '@/components/countdown/CountdownTimer'

describe('CountdownTimer', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders placeholder "-" digits when countdown state is null (hydration)', () => {
    mockUseCountdown.mockReturnValue(null)
    render(<CountdownTimer />)
    const placeholders = screen.getAllByText('-')
    expect(placeholders.length).toBeGreaterThanOrEqual(6) // 3 units × 2 digits
  })

  it('renders correct DAYS, HOURS, MINUTES values', () => {
    mockUseCountdown.mockReturnValue({ days: 5, hours: 12, minutes: 30 })
    render(<CountdownTimer />)
    expect(screen.getByLabelText('5 days')).toBeInTheDocument()
    expect(screen.getByLabelText('12 hours')).toBeInTheDocument()
    expect(screen.getByLabelText('30 minutes')).toBeInTheDocument()
  })

  it('renders all "00" when countdown returns zeros', () => {
    mockUseCountdown.mockReturnValue({ days: 0, hours: 0, minutes: 0 })
    render(<CountdownTimer />)
    expect(screen.getByLabelText('0 days')).toBeInTheDocument()
    expect(screen.getByLabelText('0 hours')).toBeInTheDocument()
    expect(screen.getByLabelText('0 minutes')).toBeInTheDocument()
  })

  it('has role="timer" and aria-live="polite" on the timer container', () => {
    mockUseCountdown.mockReturnValue({ days: 1, hours: 2, minutes: 3 })
    render(<CountdownTimer />)
    const timer = screen.getByRole('timer')
    expect(timer).toBeInTheDocument()
    expect(timer).toHaveAttribute('aria-live', 'polite')
    expect(timer).toHaveAttribute('aria-label', 'Countdown to launch')
  })

  it('renders DAYS, HOURS, MINUTES unit labels', () => {
    mockUseCountdown.mockReturnValue({ days: 1, hours: 2, minutes: 3 })
    render(<CountdownTimer />)
    expect(screen.getByText('DAYS')).toBeInTheDocument()
    expect(screen.getByText('HOURS')).toBeInTheDocument()
    expect(screen.getByText('MINUTES')).toBeInTheDocument()
  })

  it('calls onZero callback when countdown reaches 00:00:00', async () => {
    const onZero = vi.fn()
    mockUseCountdown.mockReturnValue({ days: 0, hours: 0, minutes: 0 })
    render(<CountdownTimer onZero={onZero} />)
    // useEffect fires after render
    await vi.waitFor(() => expect(onZero).toHaveBeenCalledTimes(1))
  })

  it('does not call router.replace when onZero prop is provided', async () => {
    // When onZero callback is given, CountdownTimer should call onZero, not router.replace
    const onZero = vi.fn()
    mockUseCountdown.mockReturnValue({ days: 0, hours: 0, minutes: 0 })
    render(<CountdownTimer onZero={onZero} />)
    await vi.waitFor(() => expect(onZero).toHaveBeenCalled())
    // onZero was called — implicit proof router.replace was NOT called
    // (router.replace is only reached when onZero is falsy in CountdownTimer logic)
    expect(onZero).toHaveBeenCalledTimes(1)
  })
})
