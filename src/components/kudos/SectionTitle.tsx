// Figma nodes: 2940:13452 (Highlight header) / 2940:14221 (All Kudos header)
// Server Component — no interactivity needed

interface SectionTitleProps {
  subtitle?: string;
  title: string;
  className?: string;
}

export function SectionTitle({ subtitle, title, className = "" }: SectionTitleProps) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {subtitle && (
        <p
          className="text-[14px] font-medium uppercase tracking-widest"
          style={{ color: "var(--color-text-muted)" }}
        >
          {subtitle}
        </p>
      )}
      <h2
        className="text-[36px] font-bold uppercase leading-none"
        style={{ color: "var(--color-primary, #FFEA9E)" }}
      >
        {title}
      </h2>
    </div>
  );
}
