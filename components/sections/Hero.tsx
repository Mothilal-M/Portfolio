import { marquee, person } from "@/lib/content";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Marquee } from "@/components/ui/Marquee";
import { HeroSceneLoader } from "@/components/three/HeroSceneLoader";

/**
 * Sticky full-viewport hero: the rest of the page slides over it like
 * a sheet (curtain stack, see page.tsx). Full-bleed 3D scene with the
 * MOTHILAL / ENGINEER lockup composed over it.
 */
export function Hero() {
  return (
    <section id="home" className="sticky top-0 flex h-screen flex-col overflow-hidden">
      {/* Full-bleed 3D scene */}
      <div aria-hidden className="absolute inset-0">
        <HeroSceneLoader />
      </div>

      <div
        data-animate="hero-text"
        className="relative z-10 mx-auto flex w-full max-w-[100rem] flex-1 flex-col justify-between px-5 pt-28 pb-0 md:px-10"
      >
        <p
          data-animate="hero-badge"
          className="inline-flex w-fit items-center gap-2.5 rounded-full border border-border bg-surface/80 px-4 py-2 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-muted backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          {person.availability}
        </p>

        {/* Lockup: MOTHILAL solid / ENGINEER outlined — both 8 chars wide */}
        <div className="my-auto">
          <h1
            aria-label={`${person.name} — ${person.role}`}
            data-animate="hero-name"
            className="font-display text-display font-bold uppercase leading-[0.86] tracking-tight text-text"
          >
            <span aria-hidden className="block">
              Mothilal
            </span>
            <span aria-hidden className="flex items-baseline gap-[0.06em]">
              <span className="text-outline">Engineer</span>
              <span className="text-accent">.</span>
            </span>
          </h1>
          <p
            data-animate="hero-role"
            className="mt-5 font-mono text-xs uppercase tracking-[0.35em] text-accent md:text-sm"
          >
            {`// software engineer @ ${person.company}`}
          </p>
        </div>

        <div className="flex flex-col gap-8 pb-10 md:flex-row md:items-end md:justify-between">
          <p
            data-animate="hero-bio"
            className="max-w-md text-sm leading-relaxed text-muted md:text-base"
          >
            {person.heroBio}
          </p>
          <div data-animate="hero-cta" className="flex shrink-0 flex-wrap items-center gap-3">
            <MagneticButton href="#work">View work ↓</MagneticButton>
            <MagneticButton href="#contact" variant="outline">
              Get in touch
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* Skill ticker pinned to the hero's bottom edge */}
      <div data-animate="hero-hint" className="relative z-10 border-t border-border bg-base/60 backdrop-blur-sm">
        <Marquee
          items={marquee.hero}
          className="py-3.5 font-mono text-xs uppercase tracking-[0.25em] text-muted"
        />
      </div>
    </section>
  );
}
