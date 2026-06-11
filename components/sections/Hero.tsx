import { person } from "@/lib/content";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { HeroSceneLoader } from "@/components/three/HeroSceneLoader";

export function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden">
      {/* 3D scene layer — full-bleed behind text on mobile, right-weighted on desktop */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-50 md:left-[35%] md:opacity-100"
      >
        <HeroSceneLoader />
      </div>

      <div
        data-animate="hero-text"
        className="relative z-10 mx-auto w-full max-w-[90rem] px-6 pt-28 pb-20 md:px-12"
      >
        <p
          data-animate="hero-badge"
          className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-border bg-surface/80 px-4 py-2 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-muted backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          {person.availability}
        </p>

        <h1
          aria-label={person.name}
          data-animate="hero-name"
          className="font-display text-display font-bold uppercase leading-[0.92] tracking-tight text-text"
        >
          <span aria-hidden className="block">
            Mothilal
          </span>
          <span aria-hidden className="block">
            M<span className="text-accent">.</span>
          </span>
        </h1>

        <p
          data-animate="hero-role"
          className="mt-6 font-mono text-sm uppercase tracking-[0.3em] text-accent"
        >
          {person.role} @ {person.company}
        </p>

        <p
          data-animate="hero-bio"
          className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg"
        >
          {person.heroBio}
        </p>

        <div data-animate="hero-cta" className="mt-10 flex flex-wrap items-center gap-3">
          <MagneticButton href="#work">View work ↓</MagneticButton>
          <MagneticButton href="#contact" variant="outline">
            Get in touch
          </MagneticButton>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        data-animate="hero-hint"
        className="absolute bottom-8 left-6 hidden items-center gap-3 md:left-12 md:flex"
      >
        <span className="font-mono text-[0.6875rem] uppercase tracking-[0.3em] text-muted">
          Scroll
        </span>
        <span className="block h-px w-12 bg-border" />
      </div>
      <div className="absolute bottom-8 right-6 hidden md:right-12 md:block">
        <span className="font-mono text-[0.6875rem] uppercase tracking-[0.3em] text-muted">
          {person.base.split(",")[1]?.trim()} · worldwide
        </span>
      </div>
    </section>
  );
}
