import Image from "next/image";
import { about, person } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function About() {
  return (
    <section id="about" className="py-section">
      <div className="mx-auto grid w-full max-w-[90rem] gap-12 px-6 md:grid-cols-[2fr_3fr] md:gap-20 md:px-12">
        <div data-animate="about-portrait" className="relative max-w-md">
          <div className="overflow-hidden rounded-card border border-border">
            <Image
              src={person.portrait}
              alt={`Portrait of ${person.name}`}
              width={640}
              height={640}
              className="aspect-square w-full object-cover"
              sizes="(max-width: 768px) 90vw, 36rem"
            />
          </div>
          {/* Accent offset frame */}
          <div
            aria-hidden
            className="absolute -bottom-3 -right-3 -z-10 h-full w-full rounded-card border border-accent/30"
          />
        </div>

        <div>
          <SectionHeading index="01" eyebrow="About" title="Systems that stay reliable as they grow." />
          <div className="mt-8 space-y-5">
            {about.paragraphs.map((p, i) => (
              <p key={i} data-animate="about-para" className="max-w-2xl leading-relaxed text-muted">
                {p}
              </p>
            ))}
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-border pt-6">
            {about.stats.map((stat) => (
              <li key={stat} className="font-mono text-xs uppercase tracking-[0.2em] text-text">
                {stat}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
