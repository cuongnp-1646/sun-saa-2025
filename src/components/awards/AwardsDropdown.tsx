'use client'

import { useEffect, useRef, useState } from 'react'
import type { Award } from '@/types/home'

interface AwardsDropdownProps {
  awards: Award[]
  /** Controlled active slug (for testing / SSR pass-through) */
  activeSlug?: string
  onSelect?: (slug: string) => void
}

/**
 * AwardsDropdown — Client Component (SP-only award selector).
 * Design: Section C
 *   Width: calc(100% - 32px) | border: 1px solid #2E3940 | bg: rgba(255,255,255,0.05)
 *   Panel: bg:#0B0F12 | border: 1px solid #998C5F | border-radius: 8px
 *   Font: Montserrat 16px 700 #FFEA9E
 *   Chevron rotates 180° when open
 *   Closes on outside click + Escape
 */
export function AwardsDropdown({ awards, activeSlug: controlledSlug, onSelect }: AwardsDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSlug, setActiveSlug] = useState(controlledSlug ?? awards[0]?.slug ?? '')
  const containerRef = useRef<HTMLDivElement>(null)

  const activeAward = awards.find((a) => a.slug === activeSlug) ?? awards[0]

  // Sync controlled prop
  useEffect(() => {
    if (controlledSlug !== undefined) setActiveSlug(controlledSlug)
  }, [controlledSlug])

  // Close on outside click
  useEffect(() => {
    function handleMouseDown(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleMouseDown)
    return () => document.removeEventListener('mousedown', handleMouseDown)
  }, [])

  // Close on Escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  function handleSelect(slug: string) {
    setActiveSlug(slug)
    setIsOpen(false)
    onSelect?.(slug)
    // Smooth scroll to anchor
    const el = document.getElementById(`award-${slug}`)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)' }}
    >
      {/* Trigger */}
      <button
        type="button"
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Select award category"
        className="w-full flex items-center justify-between px-4 py-3 rounded-[4px] text-[#FFEA9E] text-[16px] font-bold leading-[24px]"
        style={{
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid #2E3940',
        }}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>{activeAward?.name ?? ''}</span>
        {/* Chevron */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden
          className="transition-transform duration-150"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          <path
            d="M4 6l4 4 4-4"
            stroke="#FFEA9E"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Dropdown panel */}
      {isOpen && (
        <ul
          role="listbox"
          aria-label="Award categories"
          className="absolute left-0 right-0 mt-1 z-50 rounded-[8px] overflow-hidden"
          style={{
            background: '#0B0F12',
            border: '1px solid #998C5F',
          }}
        >
          {awards.map((award) => {
            const isActive = award.slug === activeSlug
            return (
              <li
                key={award.slug}
                role="option"
                aria-selected={isActive}
                className="px-4 py-3 cursor-pointer text-[16px] font-bold leading-[24px] text-white transition-colors duration-100"
                style={isActive ? { background: '#3A3A28' } : undefined}
                onClick={() => handleSelect(award.slug)}
                onMouseEnter={(e) => {
                  if (!isActive) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'
                }}
                onMouseLeave={(e) => {
                  if (!isActive) (e.currentTarget as HTMLElement).style.background = ''
                }}
              >
                {award.name}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
