'use client'

import Image from 'next/image'
import { useState, useCallback, useRef, useEffect } from 'react'

type Locale = 'vn' | 'en'

interface LangOption {
  code: Locale
  label: string
  flag: string
  flagAlt: string
}

const LANGUAGES: LangOption[] = [
  { code: 'vn', label: 'VN', flag: '/assets/login/icons/flag-vn.svg', flagAlt: 'Vietnam' },
  { code: 'en', label: 'EN', flag: '/assets/shared/icons/flag-en.svg', flagAlt: 'English' },
]

/**
 * Language switcher dropdown — matches Figma frame 721:4942.
 *
 * Design:
 *   Trigger: flag (20px) + code (14px bold white Montserrat) + chevron
 *   Panel:   rounded-xl, border #998C5F, bg #0B0F12
 *   Selected item: bg #3A3A28, top-rounded
 *   Other item:    bg transparent (#0B0F12), bottom-rounded
 *   Item size: px-6 py-4, flag 24px + gap-3 + code text
 */
export function LanguageDropdown() {
  const [locale, setLocale] = useState<Locale>('vn')
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const current = LANGUAGES.find((l) => l.code === locale) ?? LANGUAGES[0]

  const toggle = useCallback(() => setIsOpen((v) => !v), [])
  const close = useCallback(() => setIsOpen(false), [])

  const select = useCallback(
    (code: Locale) => {
      setLocale(code)
      close()
    },
    [close],
  )

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        close()
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [isOpen, close])

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen, close])

  return (
    <div ref={containerRef} className="relative">
      {/* Trigger button */}
      <button
        type="button"
        onClick={toggle}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`Language: ${current.label}. Click to change`}
        className="flex flex-row items-center gap-1.5 px-2 py-1 rounded border border-white/20 hover:bg-white/8 transition-colors focus:outline-none focus:ring-2 focus:ring-white/40"
        style={{ fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)' }}
      >
        <Image
          src={current.flag}
          alt={current.flagAlt}
          width={20}
          height={20}
          className="rounded-[2px] object-cover"
          aria-hidden
        />
        <span className="text-white text-[14px] font-bold leading-[20px]">{current.label}</span>
        <Image
          src="/assets/login/icons/chevron-down.svg"
          alt=""
          width={16}
          height={16}
          aria-hidden
          className={`transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown panel — Figma 721:4942 */}
      {isOpen && (
        <ul
          role="listbox"
          aria-label="Select language"
          className="absolute right-0 top-[calc(100%+6px)] z-50 min-w-[120px] rounded-xl overflow-hidden"
          style={{ border: '1px solid #998C5F', background: '#0B0F12' }}
        >
          {LANGUAGES.map((lang, idx) => {
            const isSelected = lang.code === locale
            const isFirst = idx === 0
            const isLast = idx === LANGUAGES.length - 1
            return (
              <li
                key={lang.code}
                role="option"
                aria-selected={isSelected}
              >
                <button
                  type="button"
                  onClick={() => select(lang.code)}
                  className={[
                    'flex w-full flex-row items-center gap-3 px-6 py-4 cursor-pointer transition-colors',
                    'text-white text-[14px] font-bold leading-[20px]',
                    isSelected ? 'bg-[#3A3A28]' : 'bg-transparent hover:bg-white/5',
                    isFirst ? 'rounded-t-[11px]' : '',
                    isLast ? 'rounded-b-[11px]' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  style={{ fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)' }}
                >
                  <Image
                    src={lang.flag}
                    alt={lang.flagAlt}
                    width={24}
                    height={24}
                    className="rounded-[2px] object-cover flex-shrink-0"
                    aria-hidden
                  />
                  {lang.label}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
