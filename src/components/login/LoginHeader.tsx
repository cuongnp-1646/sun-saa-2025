import Image from 'next/image'
import { LanguageSelector } from './LanguageSelector'

export function LoginHeader() {
  return (
    <header className="absolute top-0 left-0 w-full h-20 flex flex-row justify-between items-center bg-[#0B0F12]/80 z-10 py-3 px-36 md:px-12 sm:px-4">
      <Image
        src="/assets/login/logos/logo.png"
        alt="Sun Annual Awards 2025"
        width={52}
        height={56}
        priority
      />
      <LanguageSelector />
    </header>
  )
}
