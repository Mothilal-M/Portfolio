import { person } from "@/lib/content";
import { ContactForm } from "@/components/ui/ContactForm";

const channels = [
  { label: "Email", value: person.email, href: `mailto:${person.email}` },
  { label: "Phone", value: person.phone, href: `tel:${person.phoneHref}` },
  { label: "LinkedIn", value: "mothilal-m", href: person.links.linkedin },
  { label: "GitHub", value: "Mothilal-M", href: person.links.github },
];

export function Contact() {
  return (
    <section id="contact" className="py-section">
      <div className="mx-auto w-full max-w-[90rem] px-6 md:px-12">
        <p data-scramble className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-accent">
          [05] — Contact
        </p>

        {/* The page's closing statement: outline floods lime on hover */}
        <a
          href={`mailto:${person.email}`}
          data-cursor="hover"
          data-animate="heading"
          className="cta-flood block font-display text-mega font-bold uppercase leading-[0.9] tracking-tight"
        >
          Let&apos;s talk
          <span aria-hidden className="align-top text-[0.5em]"> ↗</span>
        </a>

        <p className="mt-8 max-w-xl leading-relaxed text-muted">
          Open to backend and platform engineering roles, freelance projects, and interesting
          product ideas. The fastest way to reach me is email — I reply within a day.
        </p>

        <div className="mt-14 grid gap-14 md:grid-cols-2 md:gap-20">
          <ul>
            {channels.map((channel) => (
              <li key={channel.label}>
                <a
                  href={channel.href}
                  data-cursor="hover"
                  {...(channel.href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="group flex items-baseline justify-between gap-4 border-b border-border py-5 transition-colors hover:border-accent/50"
                >
                  <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted transition-colors group-hover:text-accent">
                    {channel.label}
                  </span>
                  <span className="text-right text-sm text-text transition-colors group-hover:text-accent md:text-base">
                    {channel.value}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}
