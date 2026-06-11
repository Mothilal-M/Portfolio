"use client";

import { useRef } from "react";
import clsx from "clsx";
import { gsap, useGSAP } from "@/lib/gsap";

interface MagneticButtonProps {
  href?: string;
  variant?: "solid" | "outline";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  children: React.ReactNode;
}

/**
 * CTA that leans toward the cursor (fine pointers, motion-safe only)
 * and snaps back elastically on leave.
 */
export function MagneticButton({
  href,
  variant = "solid",
  className,
  type = "button",
  disabled,
  children,
}: MagneticButtonProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add("(pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
        const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3" });
        const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3" });
        const onMove = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          xTo((e.clientX - (r.left + r.width / 2)) * 0.35);
          yTo((e.clientY - (r.top + r.height / 2)) * 0.45);
        };
        const onLeave = () => {
          gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" });
        };
        const parent = el.parentElement ?? el;
        parent.addEventListener("pointermove", onMove);
        parent.addEventListener("pointerleave", onLeave);
        return () => {
          parent.removeEventListener("pointermove", onMove);
          parent.removeEventListener("pointerleave", onLeave);
        };
      });
    },
    { scope: ref },
  );

  const styles = clsx(
    "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5",
    "font-mono text-sm uppercase tracking-wider transition-colors duration-300",
    variant === "solid" &&
      "bg-accent text-accent-ink hover:bg-text",
    variant === "outline" &&
      "border border-border text-text hover:border-accent hover:text-accent",
    disabled && "pointer-events-none opacity-50",
    className,
  );

  const inner = (
    <span ref={ref} className={styles} data-cursor="hover">
      {children}
    </span>
  );

  if (href) {
    const external = href.startsWith("http");
    return (
      <a
        href={href}
        className="inline-block p-1"
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {inner}
      </a>
    );
  }

  return (
    <button type={type} disabled={disabled} className="inline-block p-1">
      {inner}
    </button>
  );
}
