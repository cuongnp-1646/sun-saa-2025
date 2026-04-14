'use client'

import { useEffect, useRef, useState } from 'react'
import type { Award } from '@/types/home'

interface AwardsSidebarNavProps {
  awards: Award[]
  /** Controlled active slug (for testing / SSR pass-through) */
  activeSlug?: string
  onSelect?: (slug: string) => void
}

/**
 * AwardsSidebarNav — Client Component (scroll-spy sidebar).
 * Design: Node 313:8459
 *   Width: 178px | flex-col gap-16px | sticky top-[96px]
 *   Inactive: white 16px 700, ls:0.15px
 *   Active: #FFEA9E + border-b border-[#FFEA9E] + text-shadow glow
 */
export function AwardsSidebarNav({ awards, activeSlug: controlledSlug, onSelect }: AwardsSidebarNavProps) {
  const [activeSlug, setActiveSlug] = useState(controlledSlug ?? awards[0]?.slug ?? '')

  // Scroll-spy: observe each award section via IntersectionObserver
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    if (controlledSlug !== undefined) {
      setActiveSlug(controlledSlug)
      return
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Find the topmost intersecting entry
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

        if (visible.length > 0) {
          const id = visible[0].target.id.replace('award-', '')
          setActiveSlug(id)
        }
      },
      { threshold: 0.3, rootMargin: '-80px 0px -40% 0px' }
    )

    for (const award of awards) {
      const el = document.getElementById(`award-${award.slug}`)
      if (el) observerRef.current.observe(el)
    }

    return () => {
      observerRef.current?.disconnect()
    }
  }, [awards, controlledSlug])

  function handleClick(slug: string) {
    setActiveSlug(slug)
    onSelect?.(slug)
  }

  return (
    <nav
      className="flex flex-col gap-4 w-[178px] sticky top-24"
      aria-label="Award categories"
      style={{ fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)' }}
    >
      {awards.map((award) => {
        const isActive = award.slug === activeSlug
        return (
          <a
            key={award.slug}
            href={`#award-${award.slug}`}
            onClick={() => handleClick(award.slug)}
            aria-current={isActive ? 'true' : undefined}
            className="flex items-center gap-3 px-4 py-4 text-[16px] font-bold leading-[24px] tracking-[0.15px] rounded-[4px] transition-colors duration-150"
            style={
              isActive
                ? {
                    color: '#FFEA9E',
                    borderBottom: '1px solid #FFEA9E',
                    textShadow: '0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287',
                  }
                : { color: '#FFFFFF' }
            }
            onMouseEnter={(e) => {
              if (!isActive) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'
            }}
            onMouseLeave={(e) => {
              if (!isActive) (e.currentTarget as HTMLElement).style.background = ''
            }}
          >
            {/* MM_MEDIA_Target icon — concentric circles bullseye */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden style={{ flexShrink: 0 }}>
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="2" />
              <circle cx="12" cy="12" r="2" fill="currentColor" />
            </svg>
            {award.name}
          </a>
        )
      })}
    </nav>
  )
}
