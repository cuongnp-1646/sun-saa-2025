'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ROUTES } from '@/config/navigation'
import { WriteKudoModal } from '@/components/kudos/WriteKudoModal'

/**
 * Floating Action Widget — Client Component.
 * Fixed bottom-right; two distinct visual states:
 *
 * State 1 (collapsed) — Figma _hphd32jN2:
 *   106×64px pill, bg #FFEA9E, radius 100px, glow shadow.
 *   Icons: pen + "/" + SAA logo. Click → expands.
 *
 * State 2 (expanded) — Figma Sv7DFwBw1h:
 *   Flex-col, align-end, gap 20px:
 *     A. "Thể lệ"   — 149×64px, yellow, radius 4px → /the-le
 *     B. "Viết KUDOS" — 214×64px, yellow, radius 4px → WriteKudoModal
 *     C. Close      — 56×56px, red #D4271D, radius 100px → collapses
 */
export function FloatingWidget() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isKudoModalOpen, setIsKudoModalOpen] = useState(false)

  return (
    <>
      {/* Fixed container — bottom-right anchor */}
      <div
        className="fixed z-50"
        style={{ bottom: 32, right: 24 }}
      >
        {isMenuOpen ? (
          /* ── Expanded state (Sv7DFwBw1h) ─────────────────────────────── */
          <div
            className="flex flex-col items-end"
            style={{ gap: 20 }}
            role="menu"
            aria-label="Hành động nhanh"
          >
            {/* A. Thể lệ — 149×64px, radius 4px */}
            <Link
              href={ROUTES.theLeRules}
              role="menuitem"
              className="flex items-center hover:brightness-95 transition-[filter,box-shadow] hover:shadow-md"
              style={{
                width: 149,
                height: 64,
                gap: 8,
                padding: '16px',
                background: '#FFEA9E',
                borderRadius: 4,
                textDecoration: 'none',
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              <Image
                src="/assets/home/icons/kudos-logo.svg"
                alt=""
                width={24}
                height={24}
                aria-hidden
              />
              <span
                className="font-bold"
                style={{
                  fontSize: 24,
                  lineHeight: '32px',
                  color: '#00101A',
                  fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)',
                }}
              >
                Thể lệ
              </span>
            </Link>

            {/* B. Viết KUDOS — 214×64px, radius 4px */}
            <button
              type="button"
              role="menuitem"
              className="flex items-center hover:brightness-95 transition-[filter,box-shadow] hover:shadow-md"
              style={{
                width: 214,
                height: 64,
                gap: 8,
                padding: '16px',
                background: '#FFEA9E',
                borderRadius: 4,
                border: 'none',
                cursor: 'pointer',
              }}
              onClick={() => {
                setIsMenuOpen(false)
                setIsKudoModalOpen(true)
              }}
            >
              <Image
                src="/assets/home/icons/pen.svg"
                alt=""
                width={24}
                height={24}
                aria-hidden
              />
              <span
                className="font-bold"
                style={{
                  fontSize: 24,
                  lineHeight: '32px',
                  color: '#00101A',
                  fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)',
                }}
              >
                Viết KUDOS
              </span>
            </button>

            {/* C. Close — 56×56px, red #D4271D, radius 100px */}
            <button
              type="button"
              aria-label="Đóng menu hành động nhanh"
              className="flex items-center justify-center transition-[filter] hover:brightness-90"
              style={{
                width: 56,
                height: 56,
                background: '#D4271D',
                borderRadius: '100px',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 4px rgba(0,0,0,0.25)',
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M18 6L6 18M6 6l12 12"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        ) : (
          /* ── Collapsed state (_hphd32jN2) ────────────────────────────── */
          <button
            type="button"
            aria-label="Mở menu hành động nhanh"
            aria-haspopup="menu"
            aria-expanded={false}
            className="flex flex-row items-center transition-[box-shadow,transform] hover:scale-105 active:scale-95"
            style={{
              width: 106,
              height: 64,
              gap: 8,
              padding: '16px',
              background: '#FFEA9E',
              borderRadius: '100px',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 4px 0 rgba(0,0,0,0.25), 0 0 6px 0 #FAE287',
            }}
            onClick={() => setIsMenuOpen(true)}
          >
            <Image
              src="/assets/home/icons/pen.svg"
              alt=""
              width={24}
              height={24}
              aria-hidden
            />
            <span
              className="font-bold"
              style={{
                fontSize: 24,
                lineHeight: '32px',
                color: '#00101A',
                fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)',
              }}
              aria-hidden
            >
              /
            </span>
            <Image
              src="/assets/home/icons/kudos-logo.svg"
              alt=""
              width={24}
              height={24}
              aria-hidden
            />
          </button>
        )}
      </div>

      {/* WriteKudoModal — mounted here so it works from any page that uses FloatingWidget */}
      <WriteKudoModal
        isOpen={isKudoModalOpen}
        onClose={() => setIsKudoModalOpen(false)}
        onSuccess={() => setIsKudoModalOpen(false)}
      />
    </>
  )
}
