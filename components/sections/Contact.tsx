import { person } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
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
        <SectionHeading index="05" eyebrow="Contact" title="Let's build something." />
        <p className="mt-6 max-w-xl leading-relaxed text-muted">
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
