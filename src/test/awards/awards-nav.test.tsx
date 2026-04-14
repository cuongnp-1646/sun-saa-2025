import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import type { Award } from '@/types/home'

const MOCK_AWARDS: Award[] = [
  { id: 'top-talent', slug: 'top-talent', name: 'Top Talent', description: 'desc', bgSrc: '/bg.png', nameSrc: '/img.png', href: '/awards#top-talent' },
  { id: 'top-project', slug: 'top-project', name: 'Top Project', description: 'desc', bgSrc: '/bg.png', nameSrc: '/img.png', href: '/awards#top-project' },
  { id: 'best-manager', slug: 'best-manager', name: 'Best Manager', description: 'desc', bgSrc: '/bg.png', nameSrc: '/img.png', href: '/awards#best-manager' },
  { id: 'mvp', slug: 'mvp', name: 'MVP', description: 'desc', bgSrc: '/bg.png', nameSrc: '/img.png', href: '/awards#mvp' },
]

import { AwardsSidebarNav } from '@/components/awards/AwardsSidebarNav'
import { AwardsDropdown } from '@/components/awards/AwardsDropdown'

describe('AwardsSidebarNav', () => {
  it('renders all award names as links', () => {
    render(<AwardsSidebarNav awards={MOCK_AWARDS} activeSlug="top-talent" />)
    expect(screen.getByText('Top Talent')).toBeInTheDocument()
    expect(screen.getByText('Top Project')).toBeInTheDocument()
    expect(screen.getByText('Best Manager')).toBeInTheDocument()
    expect(screen.getByText('MVP')).toBeInTheDocument()
  })

  it('applies active state to "Top Talent" item when activeSlug="top-talent"', () => {
    render(<AwardsSidebarNav awards={MOCK_AWARDS} activeSlug="top-talent" />)
    const activeLink = screen.getByText('Top Talent').closest('a')
    expect(activeLink).toHaveAttribute('aria-current', 'true')
    expect(activeLink).toHaveStyle({ color: '#FFEA9E' })
  })

  it('does not apply active state to inactive items', () => {
    render(<AwardsSidebarNav awards={MOCK_AWARDS} activeSlug="top-talent" />)
    const inactiveLink = screen.getByText('MVP').closest('a')
    expect(inactiveLink).not.toHaveAttribute('aria-current', 'true')
  })

  it('calls onSelect with slug when item is clicked', () => {
    const onSelect = vi.fn()
    render(<AwardsSidebarNav awards={MOCK_AWARDS} activeSlug="top-talent" onSelect={onSelect} />)
    fireEvent.click(screen.getByText('MVP'))
    expect(onSelect).toHaveBeenCalledWith('mvp')
  })

  it('has aria-label "Award categories" on nav', () => {
    render(<AwardsSidebarNav awards={MOCK_AWARDS} />)
    expect(screen.getByRole('navigation', { name: /award categories/i })).toBeInTheDocument()
  })
})

describe('AwardsDropdown', () => {
  it('renders closed by default with trigger button', () => {
    render(<AwardsDropdown awards={MOCK_AWARDS} />)
    expect(screen.getByRole('combobox')).toBeInTheDocument()
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('shows the first award name in trigger when closed', () => {
    render(<AwardsDropdown awards={MOCK_AWARDS} />)
    expect(screen.getByRole('combobox')).toHaveTextContent('Top Talent')
  })

  it('opens dropdown and shows all items on trigger click', () => {
    render(<AwardsDropdown awards={MOCK_AWARDS} />)
    fireEvent.click(screen.getByRole('combobox'))
    expect(screen.getByRole('listbox')).toBeInTheDocument()
    expect(screen.getAllByRole('option')).toHaveLength(4)
  })

  it('closes on Escape key', () => {
    render(<AwardsDropdown awards={MOCK_AWARDS} />)
    fireEvent.click(screen.getByRole('combobox'))
    expect(screen.getByRole('listbox')).toBeInTheDocument()
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('calls onSelect and closes when item is selected', () => {
    const onSelect = vi.fn()
    render(<AwardsDropdown awards={MOCK_AWARDS} onSelect={onSelect} />)
    fireEvent.click(screen.getByRole('combobox'))
    fireEvent.click(screen.getByRole('option', { name: 'Best Manager' }))
    expect(onSelect).toHaveBeenCalledWith('best-manager')
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('updates trigger label after selection', () => {
    render(<AwardsDropdown awards={MOCK_AWARDS} />)
    fireEvent.click(screen.getByRole('combobox'))
    fireEvent.click(screen.getByRole('option', { name: 'MVP' }))
    expect(screen.getByRole('combobox')).toHaveTextContent('MVP')
  })
})
