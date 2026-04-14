import { KeyVisual } from './KeyVisual'
import { LoginButton } from './LoginButton'

interface HeroSectionProps {
  error?: string
}

export function HeroSection({ error }: HeroSectionProps) {
  return (
    <section className="absolute top-[88px] left-0 w-full flex flex-col items-start py-24 px-36 gap-[120px] md:py-16 md:px-12 md:gap-[80px] sm:py-12 sm:px-4 sm:gap-[60px] z-10">
      <KeyVisual />

      {/* Frame 550: hero text + login button */}
      <div className="flex flex-col pl-4 gap-6 w-[496px] md:max-w-full md:w-full sm:pl-0 sm:gap-4">
        <p className="font-montserrat text-white font-bold text-xl leading-10 tracking-[0.5px] w-[480px] md:max-w-full md:w-full">
          Bắt đầu hành trình của bạn cùng SAA 2025.
          <br />
          Đăng nhập để khám phá!
        </p>
        <LoginButton initialError={error} />
      </div>
    </section>
  )
}
