'use client'

import Image from 'next/image'
import { useState, useCallback, useRef, useEffect } from 'react'

export function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const toggle = useCallback(() => setIsOpen((prev) => !prev), [])

  const close = useCallback(() => {
    setIsOpen(false)
    buttonRef.current?.focus()
  }, [])

  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen, close])

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={toggle}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            toggle()
          }
        }}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Select language"
        className="flex flex-row items-center gap-2 p-4 rounded cursor-pointer hover:bg-white/10 transition-colors focus:outline focus:outline-2 focus:outline-[rgba(255,255,255,0.6)] focus:outline-offset-2"
      >
        <Image
          src="/assets/login/icons/flag-vn.svg"
          alt="Vietnam flag"
          width={24}
          height={24}
          aria-hidden={true}
        />
        <span className="font-montserrat text-white font-bold text-base leading-6 tracking-[0.15px]">
          VN
        </span>
        <Image
          src="/assets/login/icons/chevron-down.svg"
          alt=""
          width={24}
          height={24}
          aria-hidden={true}
          className={`transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div
          role="listbox"
          aria-label="Language options"
          className="absolute right-0 top-full mt-1 bg-[#0B0F12] border border-[#2E3940] rounded p-2 min-w-[120px] z-50"
        >
          <p className="text-white text-sm px-2 py-1">Dropdown coming soon</p>
        </div>
      )}
    </div>
  )
}
