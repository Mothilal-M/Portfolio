import { timeline } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Experience() {
  return (
    <section id="experience" className="py-section">
      <div className="mx-auto w-full max-w-[90rem] px-6 md:px-12">
        <SectionHeading index="03" eyebrow="Experience" title="Where I've been." />

        <div className="relative mt-14 ml-2 md:ml-4">
          {/* Static rail; an accent rail is scrubbed over it in the motion pass */}
          <div aria-hidden className="absolute top-0 bottom-0 left-0 w-px bg-border" />
          <div
            aria-hidden
            data-animate="timeline-rail"
            className="absolute top-0 bottom-0 left-0 w-px origin-top bg-accent"
          />

          <ol className="space-y-16">
            {timeline.map((entry) => (
              <li key={entry.org} data-animate="timeline-entry" className="relative pl-10 md:pl-16">
                {/* Node */}
                <span
                  aria-hidden
                  className="absolute top-2 -left-[5px] h-[11px] w-[11px] rounded-full border-2 border-border bg-base"
                  data-animate="timeline-node"
                />
                {/* Year watermark */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-8 right-0 -z-10 hidden select-none font-display text-[7rem] font-bold leading-none text-surface-2 lg:block"
                >
                  {entry.year}
                </span>

                <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
                  {entry.start} — {entry.end}
                </p>
                <h3 className="mt-3 font-display text-h3 leading-tight tracking-tight text-text">
                  {entry.title}
                </h3>
                <p className="mt-1 font-mono text-sm text-muted">
                  {entry.orgUrl ? (
                    <a
                      href={entry.orgUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-accent"
                      data-cursor="hover"
                    >
                      {entry.org}
                    </a>
                  ) : (
                    entry.org
                  )}
                  {" · "}
                  {entry.location}
                </p>
                <p className="mt-4 max-w-2xl leading-relaxed text-muted">{entry.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
