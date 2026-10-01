import { faqs } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function FAQ() {
  return (
    <section id="faq" className="py-section">
      <div className="mx-auto w-full max-w-[90rem] px-6 md:px-12">
        <SectionHeading
          index="06"
          eyebrow="FAQ"
          title="Frequently asked questions."
        />

        <div className="mt-14 max-w-4xl space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group rounded-card border border-border bg-surface/40 p-6 transition-all duration-300 hover:border-accent/40 open:border-accent/50 open:bg-surface/80 md:p-8"
              {...(index === 0 ? { open: true } : {})}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-semibold tracking-tight text-text transition-colors group-hover:text-accent md:text-xl">
                <span>{faq.question}</span>
                <span
                  aria-hidden
                  className="font-mono text-sm text-accent transition-transform duration-300 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
