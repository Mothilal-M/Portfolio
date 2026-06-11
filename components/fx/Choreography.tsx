"use client";

import { useEffect, useState } from "react";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "@/lib/gsap";
import { onIntro } from "@/lib/intro";

/**
 * Page-wide motion choreography. Targets server-rendered sections via
 * data-animate attributes so the sections themselves stay server
 * components. Everything lives inside gsap.matchMedia — under
 * prefers-reduced-motion none of this runs and content is simply visible.
 */
export function Choreography() {
  // SplitText must measure with the real fonts, so gate setup on fonts.ready
  const [fontsReady, setFontsReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    document.fonts.ready.then(() => {
      if (!cancelled) setFontsReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useGSAP(
    () => {
      if (!fontsReady) return;
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // ---- Hero intro (played when the preloader exits) ----
        const nameSplit = SplitText.create('[data-animate="hero-name"] span[aria-hidden]', {
          type: "chars",
          mask: "chars",
        });
        const intro = gsap
          .timeline({ paused: true })
          .from(nameSplit.chars, {
            yPercent: 110,
            duration: 0.9,
            ease: "power4.out",
            stagger: 0.03,
          })
          .from('[data-animate="hero-badge"]', { autoAlpha: 0, y: 14, duration: 0.5 }, "-=0.55")
          .from('[data-animate="hero-role"]', { autoAlpha: 0, y: 14, duration: 0.5 }, "-=0.35")
          .from('[data-animate="hero-bio"]', { autoAlpha: 0, y: 18, duration: 0.55 }, "-=0.35")
          .from('[data-animate="hero-cta"]', { autoAlpha: 0, y: 18, duration: 0.55 }, "-=0.4")
          .from('[data-animate="hero-hint"]', { autoAlpha: 0, duration: 0.6 }, "-=0.3");
        const offIntro = onIntro(() => intro.play());

        // ---- Hero exit parallax ----
        gsap.to('[data-animate="hero-text"]', {
          yPercent: -14,
          autoAlpha: 0.2,
          ease: "none",
          scrollTrigger: {
            trigger: "#home",
            start: "top top",
            end: "bottom 25%",
            scrub: true,
          },
        });

        // ---- Section headings: masked line reveals ----
        gsap.utils.toArray<HTMLElement>('[data-animate="heading"]').forEach((el) => {
          const split = SplitText.create(el, { type: "lines", mask: "lines" });
          gsap.from(split.lines, {
            yPercent: 110,
            duration: 0.9,
            ease: "power4.out",
            stagger: 0.09,
            scrollTrigger: { trigger: el, start: "top 82%", once: true },
          });
        });

        // ---- About: portrait clip reveal + inner parallax, paragraphs rise ----
        const portrait = document.querySelector('[data-animate="about-portrait"]');
        if (portrait) {
          gsap.from(portrait, {
            clipPath: "inset(0 0 100% 0)",
            duration: 1.1,
            ease: "power4.inOut",
            scrollTrigger: { trigger: portrait, start: "top 80%", once: true },
          });
          gsap.fromTo(
            portrait.querySelector("img"),
            { yPercent: -6, scale: 1.12 },
            {
              yPercent: 6,
              scale: 1.12,
              ease: "none",
              scrollTrigger: { trigger: portrait, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        }
        ScrollTrigger.batch('[data-animate="about-para"]', {
          start: "top 85%",
          once: true,
          onEnter: (els) =>
            gsap.from(els, { autoAlpha: 0, y: 28, duration: 0.8, ease: "power3.out", stagger: 0.12 }),
        });

        // ---- Experience: accent rail scrub, entries rise, nodes light up ----
        gsap.fromTo(
          '[data-animate="timeline-rail"]',
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: "#experience",
              start: "top 60%",
              end: "bottom 60%",
              scrub: 0.5,
            },
          },
        );
        ScrollTrigger.batch('[data-animate="timeline-entry"]', {
          start: "top 80%",
          once: true,
          onEnter: (els) =>
            gsap.from(els, { autoAlpha: 0, y: 40, duration: 0.9, ease: "power3.out", stagger: 0.15 }),
        });
        gsap.utils.toArray<HTMLElement>('[data-animate="timeline-node"]').forEach((node) => {
          ScrollTrigger.create({
            trigger: node,
            start: "top 65%",
            toggleClass: { targets: node, className: "node-active" },
          });
        });

        // ---- Projects + mobile skill cards: staggered rise ----
        ScrollTrigger.batch('[data-animate="card"]', {
          start: "top 85%",
          once: true,
          onEnter: (els) =>
            gsap.from(els, { autoAlpha: 0, y: 56, duration: 0.9, ease: "power3.out", stagger: 0.12 }),
        });

        return () => {
          offIntro();
          nameSplit.revert();
        };
      });

      // Reduced motion: fire nothing — content is visible by default.
    },
    { dependencies: [fontsReady] },
  );

  return null;
}
