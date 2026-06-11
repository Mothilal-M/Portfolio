"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * Accent dot + trailing ring. Mounted only for fine pointers without
 * reduced motion; the native cursor is hidden via body[data-custom-cursor].
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setActive(fine && !reduced);
  }, []);

  useEffect(() => {
    if (!active) return;
    document.body.dataset.customCursor = "true";
    return () => {
      delete document.body.dataset.customCursor;
    };
  }, [active]);

  useGSAP(
    () => {
      if (!active) return;
      const dot = dotRef.current;
      const ring = ringRef.current;
      if (!dot || !ring) return;

      gsap.set([dot, ring], { xPercent: -50, yPercent: -50, autoAlpha: 0 });
      const dotX = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power2" });
      const dotY = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power2" });
      const ringX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3" });
      const ringY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3" });

      const onMove = (e: PointerEvent) => {
        gsap.to([dot, ring], { autoAlpha: 1, duration: 0.2, overwrite: "auto" });
        dotX(e.clientX);
        dotY(e.clientY);
        ringX(e.clientX);
        ringY(e.clientY);
      };
      const onLeave = () => gsap.to([dot, ring], { autoAlpha: 0, duration: 0.2 });

      const isHoverTarget = (el: EventTarget | null) =>
        el instanceof Element && !!el.closest('a, button, [data-cursor="hover"]');
      const onOver = (e: PointerEvent) => {
        if (isHoverTarget(e.target)) {
          gsap.to(ring, { scale: 2.1, duration: 0.3, ease: "power3.out" });
          ring.classList.add("mix-blend-difference");
        }
      };
      const onOut = (e: PointerEvent) => {
        if (isHoverTarget(e.target)) {
          gsap.to(ring, { scale: 1, duration: 0.3, ease: "power3.out" });
          ring.classList.remove("mix-blend-difference");
        }
      };

      window.addEventListener("pointermove", onMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
      document.addEventListener("pointerover", onOver);
      document.addEventListener("pointerout", onOut);
      return () => {
        window.removeEventListener("pointermove", onMove);
        document.documentElement.removeEventListener("pointerleave", onLeave);
        document.removeEventListener("pointerover", onOver);
        document.removeEventListener("pointerout", onOut);
      };
    },
    { dependencies: [active] },
  );

  if (!active) return null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[95] h-2 w-2 rounded-full bg-accent"
      />
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[94] h-9 w-9 rounded-full border border-accent/60 bg-accent/5"
      />
    </>
  );
}
