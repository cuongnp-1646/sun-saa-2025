import Image from 'next/image'
import { LoginHeader } from './LoginHeader'
import { HeroSection } from './HeroSection'
import { LoginFooter } from './LoginFooter'

interface LoginPageProps {
  error?: string
}

export function LoginPage({ error }: LoginPageProps) {
  return (
    <main className="relative w-full min-h-screen bg-[#00101A] overflow-hidden">
      {/* LAYER 0 — C_Keyvisual: full-bleed background artwork photo */}
      <div className="absolute inset-0 w-full h-full z-0" aria-hidden={true}>
        <Image
          src="/assets/login/images/bg-keyvisual.png"
          alt=""
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* LAYER 1 — Rectangle 57: left-to-right dark gradient overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{ background: 'linear-gradient(90deg, #00101A 0%, #00101A 25.41%, rgba(0,16,26,0) 100%)' }}
        aria-hidden={true}
      />

      {/* LAYER 2 — A_Header */}
      <LoginHeader />

      {/* LAYER 3 — B_Bìa: hero section */}
      <HeroSection error={error} />

      {/* LAYER 4 — Cover: bottom-to-top gradient overlay */}
      <div
        className="absolute inset-0 z-[2]"
        style={{ background: 'linear-gradient(0deg, #00101A 22.48%, rgba(0,19,32,0) 51.74%)' }}
        aria-hidden={true}
      />

      {/* LAYER 5 — D_Footer: above Cover gradient */}
      <div className="absolute bottom-0 w-full z-[3]">
        <LoginFooter />
      </div>
    </main>
  )
}
