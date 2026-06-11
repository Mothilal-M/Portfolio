"use client";

import { useRef } from "react";
import clsx from "clsx";
import { skillCategories } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

/**
 * Desktop: pinned deck-of-cards — the section locks while the six
 * category cards stack on scroll and the giant label swaps.
 * Mobile / reduced motion: plain vertical list with batch reveals
 * (handled by Choreography's [data-animate="card"] batch).
 */
export function Skills() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          const cards = gsap.utils.toArray<HTMLElement>("[data-skill-card]");
          const labels = gsap.utils.toArray<HTMLElement>("[data-skill-label]");
          if (cards.length < 2) return;

          gsap.set(cards.slice(1), { yPercent: 125, rotate: 2.5 });
          gsap.set(labels.slice(1), { autoAlpha: 0, y: 24 });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: "[data-skill-pin]",
              start: "top top+=110",
              end: `+=${(cards.length - 1) * 55}%`,
              pin: true,
              scrub: 1,
            },
          });

          cards.slice(1).forEach((card, i) => {
            tl.to(cards[i], { scale: 0.93, autoAlpha: 0.35, duration: 1 }, i)
              .to(card, { yPercent: 0, rotate: 0, duration: 1 }, i)
              .to(labels[i], { autoAlpha: 0, y: -24, duration: 0.5 }, i + 0.25)
              .to(labels[i + 1], { autoAlpha: 1, y: 0, duration: 0.5 }, i + 0.5);
          });
        },
      );

      // Mobile: simple staggered rise (the desktop deck owns these cards there)
      mm.add(
        "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
        () => {
          ScrollTrigger.batch("[data-skill-card]", {
            start: "top 88%",
            once: true,
            onEnter: (els) =>
              gsap.from(els, { autoAlpha: 0, y: 36, duration: 0.7, ease: "power3.out", stagger: 0.1 }),
          });
        },
      );
    },
    { scope },
  );

  return (
    <section id="skills" ref={scope} className="py-section">
      <div className="mx-auto w-full max-w-[90rem] px-6 md:px-12">
        <SectionHeading index="02" eyebrow="Skills" title="The stack I reach for." />

        <div data-skill-pin className="mt-14 md:grid md:grid-cols-[1fr_1.3fr] md:items-center md:gap-16">
          {/* Giant swapping label (desktop only) */}
          <div className="relative hidden h-48 md:block" aria-hidden>
            {skillCategories.map((cat, i) => (
              <p
                key={cat.key}
                data-skill-label
                className="absolute inset-0 flex flex-col justify-center"
              >
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
                  {String(i + 1).padStart(2, "0")} / {String(skillCategories.length).padStart(2, "0")}
                </span>
                <span className="mt-3 font-display text-h2 leading-none tracking-tight text-text">
                  {cat.label}
                </span>
              </p>
            ))}
          </div>

          {/* Card deck (desktop) / vertical list (mobile) */}
          <div className="relative flex flex-col gap-4 md:block md:h-[26rem]">
            {skillCategories.map((cat, i) => (
              <article
                key={cat.key}
                data-skill-card
                className={clsx(
                  "rounded-card border border-border bg-surface p-7 md:absolute md:inset-0 md:flex md:flex-col md:justify-center md:p-10",
                  "will-change-transform",
                )}
                style={{ zIndex: i + 1 }}
              >
                <p className="font-mono text-[0.6875rem] uppercase tracking-[0.25em] text-accent md:hidden">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-display text-h3 leading-tight tracking-tight text-text md:mt-0">
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
      </div>
    </section>
  );
}
