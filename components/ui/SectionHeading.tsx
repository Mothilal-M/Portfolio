interface SectionHeadingProps {
  index: string;
  eyebrow: string;
  title: string;
  className?: string;
}

export function SectionHeading({ index, eyebrow, title, className }: SectionHeadingProps) {
  return (
    <div className={`relative ${className ?? ""}`}>
      {/* Giant outlined index watermark */}
      <span
        aria-hidden
        className="text-outline-faint pointer-events-none absolute -top-[0.55em] right-0 -z-10 select-none font-display text-[clamp(6rem,18vw,16rem)] font-bold leading-none opacity-60"
      >
        {index}
      </span>
      <p
        data-scramble
        className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-accent"
      >
        {`[${index}] — ${eyebrow}`}
      </p>
      <h2
        data-animate="heading"
        className="font-display text-h2 leading-[1.02] tracking-tight text-text"
      >
        {title}
      </h2>
    </div>
  );
}
