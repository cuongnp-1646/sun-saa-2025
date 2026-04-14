import Image from 'next/image'
import Link from 'next/link'
import { ROUTES } from '@/config/navigation'

/**
 * Sun* Kudos promotional block — shared Server Component.
 * Used by: Homepage (src/components/home/HomePage.tsx) and Awards page (src/components/awards/AwardsPage.tsx).
 * Design tokens (design-style.md §SunKudosSection):
 *   Container: 1120×500px rounded-lg, bg: bg-kudos.png
 *   Left: D2 Content (457×408px flex-col gap-32px) — label, title, description, Chi tiết
 *   Right: MM_MEDIA_Logo/Kudos (kudos-brand-logo.svg 364×74px) — Figma node I3390:10349;329:2948
 */
export function KudosSection() {
  return (
    <section
      className="w-full px-4 sm:px-9 lg:px-[144px] py-16 lg:py-[120px]"
      aria-label="Sun* Kudos"
    >
      <div className="relative w-full rounded-lg overflow-hidden min-h-[400px] lg:min-h-[500px]">
        {/* Background illustration */}
        <div className="absolute inset-0 z-0" aria-hidden>
          <Image
            src="/assets/home/images/bg-kudos.png"
            alt=""
            fill
            className="object-cover object-right"
          />
        </div>
        {/* Dark overlay for text readability */}
        <div
          className="absolute inset-0 z-[1]"
          style={{ background: 'linear-gradient(90deg, rgba(0,16,26,0.95) 0%, rgba(0,16,26,0.7) 60%, rgba(0,16,26,0) 100%)' }}
          aria-hidden
        />

        {/* Inner layout: content left, Kudos brand logo right */}
        <div className="relative z-10 flex flex-row items-center justify-between w-full h-full min-h-[400px] lg:min-h-[500px]">
          {/* Left: Text content */}
          <div
            className="flex flex-col gap-8 p-8 lg:p-16 max-w-[500px]"
            style={{ fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)' }}
          >
            {/* Label */}
            <p className="text-white text-[24px] font-bold leading-[32px]">
              Phong trào ghi nhận
            </p>

            {/* Title */}
            <h2 className="text-white text-[32px] sm:text-[40px] lg:text-[57px] font-bold lg:leading-[64px] lg:tracking-[-0.25px]">
              Sun* Kudos
            </h2>

            {/* ĐIỂM MỚI CỦA SAA 2025 label + description — Figma node I3390:10349;313:8423 */}
            <div className="flex flex-col gap-2">
              <p className="text-[var(--color-text-primary-gold,#FFEA9E)] text-[14px] font-bold leading-[20px] uppercase tracking-[0.5px]">
                Điểm mới của SAA 2025
              </p>
              <p className="text-white text-[16px] font-bold leading-[24px]">
                Hoạt động ghi nhận và cảm ơn đồng nghiệp - lần đầu tiên được diễn ra dành cho tất cả
                Sunner. Hoạt động sẽ được triển khai vào tháng 11/2025, khuyến khích người Sun* chia sẻ
                những lời ghi nhận, cảm ơn đồng nghiệp trên hệ thống do BTC công bố. Đây sẽ là chất
                liệu để Hội đồng Heads tham khảo trong quá trình lựa chọn người đạt giải.
              </p>
            </div>

            {/* Chi tiết link */}
            <Link
              href={ROUTES.kudos}
              aria-label="Chi tiết về Sun* Kudos"
              className="inline-flex items-center gap-1 text-[var(--color-text-primary-gold,#FFEA9E)] text-[16px] font-medium leading-[24px] hover:gap-2 transition-all duration-150"
            >
              Chi tiết
              <span aria-hidden className="text-sm">↗</span>
            </Link>
          </div>

          {/* Right: Kudos brand logo — MM_MEDIA_Logo/Kudos (Figma node I3390:10349;329:2948) */}
          <div className="hidden lg:flex items-center justify-center pr-16 shrink-0" aria-hidden>
            <Image
              src="/assets/home/icons/kudos-brand-logo.svg"
              alt=""
              width={364}
              height={74}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
