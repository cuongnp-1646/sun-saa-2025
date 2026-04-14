'use client'

import Image from 'next/image'
import { useState } from 'react'
import Link from 'next/link'
import { ROUTES } from '@/config/navigation'
import { LanguageDropdown } from './LanguageDropdown'

/**
 * Client component — manages interactive header controls:
 * bell icon (notification badge), language dropdown (VN/EN), avatar/profile menu.
 */
export function HeaderControls() {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)

  return (
    <div className="flex flex-row items-center gap-3">
      {/* Bell / Notification */}
      <button
        type="button"
        aria-label="Notifications"
        aria-haspopup="true"
        aria-expanded={isNotificationOpen}
        onClick={() => setIsNotificationOpen((v) => !v)}
        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/8 transition-colors"
      >
        <Image
          src="/assets/home/icons/bell.svg"
          alt=""
          width={24}
          height={24}
          aria-hidden
        />
      </button>

      {/* Language Dropdown — Figma 721:4942 */}
      <LanguageDropdown />

      {/* Avatar / Profile */}
      <button
        type="button"
        aria-label="User menu"
        aria-haspopup="true"
        aria-expanded={isProfileMenuOpen}
        onClick={() => setIsProfileMenuOpen((v) => !v)}
        className="w-10 h-10 rounded-full border border-[var(--color-border,#998C5F)] overflow-hidden flex items-center justify-center bg-[var(--color-award-card-bg)] hover:opacity-80 transition-opacity"
      >
        <Link href={ROUTES.profile} className="w-full h-full flex items-center justify-center">
          <span className="text-white text-xs font-bold">U</span>
        </Link>
      </button>
    </div>
  )
}
