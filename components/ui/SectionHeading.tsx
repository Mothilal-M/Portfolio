interface SectionHeadingProps {
  index: string;
  eyebrow: string;
  title: string;
  className?: string;
}

export function SectionHeading({ index, eyebrow, title, className }: SectionHeadingProps) {
  return (
    <div className={className}>
      <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-accent">
        {index} — {eyebrow}
      </p>
      <h2
        data-animate="heading"
        className="font-display text-h2 leading-[1.05] tracking-tight text-text"
      >
        {title}
      </h2>
    </div>
  );
}
