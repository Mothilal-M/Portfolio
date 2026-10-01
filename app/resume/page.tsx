import type { Metadata } from "next";
import Link from "next/link";
import { person, site, timeline, skillCategories, projects } from "@/lib/content";

export const metadata: Metadata = {
  title: `Resume — ${person.name} | ${person.role} & Python Developer`,
  description: `Official resume of ${person.name}, ${person.role} at ${person.company}. Specializing in Python, FastAPI, GCP cloud infrastructure, and scalable microservices.`,
  alternates: {
    canonical: "/resume",
  },
  openGraph: {
    title: `Resume — ${person.name}`,
    description: `Official resume and career history of ${person.name}, Software Engineer.`,
    url: `${site.url}/resume`,
    type: "profile",
  },
};

export default function ResumePage() {
  const resumeSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: `${person.name} Resume`,
    url: `${site.url}/resume`,
    mainEntity: {
      "@type": "Person",
      name: person.name,
      jobTitle: person.role,
      worksFor: { "@type": "Organization", name: person.company },
      email: person.email,
      telephone: person.phone,
      url: site.url,
      sameAs: [person.links.linkedin, person.links.github],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(resumeSchema) }}
      />

      <main className="min-h-screen bg-base px-6 py-12 text-text md:px-16 md:py-20 print:bg-white print:p-0 print:text-black">
        <div className="mx-auto max-w-4xl">
          {/* Top navigation actions (hidden in print) */}
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6 print:hidden">
            <Link
              href="/"
              className="font-mono text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:text-accent"
            >
              ← Back to portfolio
            </Link>

            <div className="flex items-center gap-3">
              <Link
                href={person.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-border px-4 py-2 font-mono text-xs uppercase tracking-wider text-text transition-colors hover:border-accent hover:text-accent"
              >
                LinkedIn Profile ↗
              </Link>
            </div>
          </div>

          {/* Resume Header */}
          <header className="border-b border-border pb-8 print:border-black/20">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-baseline">
              <div>
                <h1 className="font-display text-4xl font-bold tracking-tight text-text print:text-black md:text-5xl">
                  {person.name}
                </h1>
                <p className="mt-2 font-mono text-sm tracking-wide text-accent print:text-black">
                  {person.role} · {person.company}
                </p>
              </div>
              <p className="font-mono text-xs text-muted print:text-black/70">
                {person.base}
              </p>
            </div>

            {/* Contact links */}
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-muted print:text-black">
              <a
                href={`mailto:${person.email}`}
                className="transition-colors hover:text-accent"
              >
                {person.email}
              </a>
              <span>·</span>
              <a
                href={`tel:${person.phoneHref}`}
                className="transition-colors hover:text-accent"
              >
                {person.phone}
              </a>
              <span>·</span>
              <a
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-accent"
              >
                mothilal.dev
              </a>
              <span>·</span>
              <a
                href={person.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-accent"
              >
                linkedin.com/in/mothilal-m
              </a>
              <span>·</span>
              <a
                href={person.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-accent"
              >
                github.com/Mothilal-M
              </a>
            </div>
          </header>

          {/* Professional Summary */}
          <section className="border-b border-border py-8 print:border-black/20">
            <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-accent print:text-black">
              [01] Professional Summary
            </h2>
            <p className="mt-4 leading-relaxed text-muted print:text-black">
              Software Engineer and Python Developer specializing in backend systems,
              FastAPI microservices, Docker containerization, and cloud infrastructure on Google
              Cloud Platform (GCP). Experienced in building resilient, high-speed APIs, database
              scaling, and zero-drift deployments for fast-moving product teams.
            </p>
          </section>

          {/* Work Experience */}
          <section className="border-b border-border py-8 print:border-black/20">
            <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-accent print:text-black">
              [02] Experience
            </h2>
            <div className="mt-6 space-y-8">
              {timeline
                .filter((item) => item.kind === "work")
                .map((job) => (
                  <div key={job.org}>
                    <div className="flex flex-col justify-between sm:flex-row sm:items-baseline">
                      <h3 className="font-display text-xl font-bold text-text print:text-black">
                        {job.title}
                      </h3>
                      <span className="font-mono text-xs text-accent print:text-black">
                        {job.start} — {job.end}
                      </span>
                    </div>
                    <p className="mt-1 font-mono text-xs text-muted print:text-black/80">
                      {job.org} · {job.location}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-muted print:text-black">
                      {job.description}
                    </p>
                  </div>
                ))}
            </div>
          </section>

          {/* Education */}
          <section className="border-b border-border py-8 print:border-black/20">
            <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-accent print:text-black">
              [03] Education
            </h2>
            <div className="mt-6 space-y-6">
              {timeline
                .filter((item) => item.kind === "education")
                .map((edu) => (
                  <div key={edu.org}>
                    <div className="flex flex-col justify-between sm:flex-row sm:items-baseline">
                      <h3 className="font-display text-xl font-bold text-text print:text-black">
                        {edu.title}
                      </h3>
                      <span className="font-mono text-xs text-accent print:text-black">
                        {edu.start} — {edu.end}
                      </span>
                    </div>
                    <p className="mt-1 font-mono text-xs text-muted print:text-black/80">
                      {edu.org} · {edu.location}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-muted print:text-black">
                      {edu.description}
                    </p>
                  </div>
                ))}
            </div>
          </section>

          {/* Technical Skills */}
          <section className="border-b border-border py-8 print:border-black/20">
            <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-accent print:text-black">
              [04] Technical Skills
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {skillCategories.map((cat) => (
                <div key={cat.key}>
                  <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-text print:text-black">
                    {cat.label}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted print:text-black">
                    {cat.skills.join(" · ")}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Featured Projects */}
          <section className="py-8">
            <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-accent print:text-black">
              [05] Selected Projects
            </h2>
            <div className="mt-6 space-y-6">
              {projects.map((p) => (
                <div key={p.slug} className="rounded-lg border border-border p-5 print:border-black/20">
                  <div className="flex flex-col justify-between sm:flex-row sm:items-baseline">
                    <h3 className="font-display text-lg font-bold text-text print:text-black">
                      {p.title}
                    </h3>
                    <div className="flex gap-4 font-mono text-xs text-accent print:text-black">
                      {p.links.live && (
                        <a
                          href={p.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          Live App ↗
                        </a>
                      )}
                      {p.links.repo && (
                        <a
                          href={p.links.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          Source Code ↗
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-muted print:text-black">
                    {p.problem} {p.outcome}
                  </p>
                  <p className="mt-3 font-mono text-[0.6875rem] text-muted print:text-black/60">
                    Stack: {p.tags.join(", ")}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Footer note */}
          <footer className="border-t border-border pt-8 font-mono text-xs text-muted print:hidden">
            <p>
              Available for full-time backend and platform engineering roles. Reach out at{" "}
              <a href={`mailto:${person.email}`} className="text-accent underline">
                {person.email}
              </a>
              .
            </p>
          </footer>
        </div>
      </main>
    </>
  );
}
