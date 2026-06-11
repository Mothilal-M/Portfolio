import { footer, person } from "@/lib/content";
import { LocalClock } from "@/components/ui/LocalClock";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto w-full max-w-[90rem] px-6 py-12 md:px-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-md">
            <p className="font-display text-2xl font-bold tracking-tight text-text">
              M<span className="text-accent">.</span>
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted">{footer.blurb}</p>
          </div>

          <div className="flex flex-col gap-3 md:items-end">
            <div className="flex gap-6">
              <a
                href={person.links.github}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                className="font-mono text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:text-accent"
              >
                GitHub
              </a>
              <a
                href={person.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                className="font-mono text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:text-accent"
              >
                LinkedIn
              </a>
              <a
                href={`mailto:${person.email}`}
                data-cursor="hover"
                className="font-mono text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:text-accent"
              >
                Email
              </a>
            </div>
            <p className="font-mono text-xs tracking-wider text-muted">{footer.location}</p>
            <LocalClock />
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[0.6875rem] tracking-wider text-muted">
            © 2024–2026 mothilal.xyz · {person.role} based in Tamil Nadu, India
          </p>
          <a
            href="#home"
            data-cursor="hover"
            className="font-mono text-[0.6875rem] uppercase tracking-[0.25em] text-muted transition-colors hover:text-accent"
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
