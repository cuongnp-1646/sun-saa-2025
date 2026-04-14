import Image from 'next/image'

export function KeyVisual() {
  return (
    <div
      className="w-[451px] h-[200px] md:w-[360px] md:h-auto sm:w-full sm:max-w-[280px] sm:h-auto flex-shrink-0"
      aria-hidden={true}
    >
      <Image
        src="/assets/login/images/key-visual.png"
        alt=""
        width={451}
        height={200}
        className="w-full h-full object-contain"
        priority
      />
    </div>
  )
}
