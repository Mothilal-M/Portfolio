"use client";

import { useRef } from "react";
import clsx from "clsx";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

interface MarqueeProps {
  items: readonly string[];
  separator?: string;
  className?: string;
  /** Reverse base direction */
  reverse?: boolean;
  /** Seconds for one loop at rest */
  speed?: number;
}

/**
 * Infinite ticker that reacts to scroll velocity — speeds up, skews,
 * and flips direction with fast scrolling. Static strip under
 * reduced motion.
 */
export function Marquee({ items, separator = "·", className, reverse, speed = 22 }: MarqueeProps) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const track = scope.current?.querySelector("[data-marquee-track]");
        if (!track) return;

        const tween = gsap.to(track, {
          xPercent: reverse ? 50 : -50,
          duration: speed,
          ease: "none",
          repeat: -1,
        });

        // Scroll velocity drives playback rate and a slight skew
        const skewTo = gsap.quickTo(track, "skewX", { duration: 0.4, ease: "power2.out" });
        let rate = 1;
        const st = ScrollTrigger.create({
          onUpdate: (self) => {
            const v = self.getVelocity();
            rate = gsap.utils.clamp(-4, 4, 1 + v / 600);
            skewTo(gsap.utils.clamp(-8, 8, v / 250));
          },
        });
        const tick = () => {
          // Ease the timeScale back toward resting speed
          tween.timeScale(gsap.utils.interpolate(tween.timeScale(), rate, 0.08));
          rate = gsap.utils.interpolate(rate, 1, 0.04);
        };
        gsap.ticker.add(tick);

        return () => {
          gsap.ticker.remove(tick);
          st.kill();
          tween.kill();
        };
      });
    },
    { scope, dependencies: [reverse, speed] },
  );

  // Track is two identical halves; -50% xPercent loops seamlessly
  const half = (
    <span aria-hidden className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <span key={i} className="flex shrink-0 items-center">
          <span className="px-5">{item}</span>
          <span className="text-current/50">{separator}</span>
        </span>
      ))}
    </span>
  );

  return (
    <div ref={scope} className={clsx("overflow-hidden whitespace-nowrap", className)}>
      <div data-marquee-track className="flex w-max will-change-transform">
        {half}
        {half}
      </div>
      <span className="sr-only">{items.join(", ")}</span>
    </div>
  );
}
