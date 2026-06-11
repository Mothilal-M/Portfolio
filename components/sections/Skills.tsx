import { skillCategories } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Skills() {
  return (
    <section id="skills" className="py-section">
      <div className="mx-auto w-full max-w-[90rem] px-6 md:px-12">
        <SectionHeading index="02" eyebrow="Skills" title="The stack I reach for." />

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((cat, i) => (
            <article
              key={cat.key}
              data-animate="skill-card"
              className="rounded-card border border-border bg-surface p-7 transition-colors duration-500 hover:border-accent/40"
            >
              <p className="font-mono text-[0.6875rem] uppercase tracking-[0.25em] text-accent">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 font-display text-h3 leading-tight tracking-tight text-text">
                {cat.label}
              </h3>
              <p className="mt-2 text-sm text-muted">{cat.blurb}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full border border-border px-3 py-1 font-mono text-[0.6875rem] uppercase tracking-wider text-muted"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
