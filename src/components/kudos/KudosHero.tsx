// Figma node: 2940:13437 (PC) / 6885:9066 (SP)
// A. KV Hero Section — 1440x512px with gradient overlay
// Server Component; SendKudosInput is rendered as an overlay by KudosPage

export function KudosHero() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: "512px" }}
      aria-label="Kudos hero banner"
    >
      {/* KV background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/assets/kudos/images/bg-kv.png')",
          backgroundColor: "var(--color-bg-page, #00101A)",
        }}
      />

      {/* Gradient overlay — bottom-up fade to page bg */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(25deg, #00101A 14.74%, rgba(0,16,26,0.6) 35%, transparent 47.8%)",
        }}
      />

      {/* Content — centered title + SAA Kudos logo */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center gap-6 px-8 pb-24 pt-16">
        {/* Hero title */}
        <h1
          className="text-center font-bold leading-tight"
          style={{
            fontFamily: "'SVN-Gotham', 'Montserrat', sans-serif",
            fontSize: "clamp(32px, 4vw, 57px)",
            color: "var(--color-primary, #FFEA9E)",
            maxWidth: "800px",
          }}
        >
          Hệ thống ghi nhận lời cảm ơn
        </h1>

        {/* SAA Kudos logo */}
        <div className="flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/kudos/logos/saa-kudos.svg"
            alt="SAA 2025 Kudos"
            width={240}
            height={60}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        </div>
      </div>
    </section>
  );
}
