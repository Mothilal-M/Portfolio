"use client";

import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { fireIntro } from "@/lib/intro";
import { getLenis } from "@/lib/scroll";

/**
 * Full-screen load gate. Visible from first paint via the `.js` html
 * class (set by an inline script before hydration), so the unanimated
 * hero never flashes. Plays once per session; counts while fonts load,
 * then wipes upward and fires the hero intro.
 */
export function Preloader() {
  const ref = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(false);

  useGSAP(() => {
    const root = document.documentElement;
    if (root.classList.contains("skip-preloader")) {
      setDone(true);
      fireIntro();
      return;
    }
    try {
      sessionStorage.setItem("preloader-shown", "1");
    } catch {}

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.body.style.overflow = "hidden";
    getLenis()?.stop();

    const finish = () => {
      gsap.to(ref.current, {
        ...(reduced
          ? { autoAlpha: 0, duration: 0.25 }
          : { clipPath: "inset(0 0 100% 0)", duration: 0.9, ease: "power4.inOut" }),
        onComplete: () => {
          document.body.style.overflow = "";
          getLenis()?.start();
          setDone(true);
          fireIntro();
          ScrollTrigger.refresh();
        },
      });
    };

    const state = { v: 0 };
    const counter = gsap.to(state, {
      v: 100,
      duration: 1.3,
      ease: "power2.inOut",
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = String(Math.round(state.v)).padStart(3, "0");
        }
      },
    });

    // Wait for fonts (so SplitText measures correctly) with a hard cap
    let finished = false;
    const go = () => {
      if (finished) return;
      finished = true;
      counter.progress(1);
      finish();
    };
    Promise.all([
      document.fonts.ready,
      new Promise((r) => setTimeout(r, 1400)),
    ]).then(go);
    setTimeout(go, 2600);
  }, []);

  if (done) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className="preloader fixed inset-0 z-[99] hidden items-end justify-between bg-base p-6 md:p-12"
    >
      <p className="font-display text-3xl font-bold tracking-tight text-text">
        M<span className="text-accent">.</span>
      </p>
      <span
        ref={counterRef}
        className="font-mono text-6xl text-muted tabular-nums md:text-8xl"
      >
        000
      </span>
    </div>
  );
}
