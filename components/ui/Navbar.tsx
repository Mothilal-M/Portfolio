"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { nav } from "@/lib/content";
import { MagneticButton } from "./MagneticButton";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled && !open
          ? "border-b border-border bg-base/80 backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex w-full max-w-[90rem] items-center justify-between px-6 py-4 md:px-12"
      >
        <a
          href="#home"
          className="font-display text-2xl font-bold tracking-tight text-text"
          data-cursor="hover"
          aria-label="Mothilal M — home"
          onClick={() => setOpen(false)}
        >
          M<span className="text-accent">.</span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                data-cursor="hover"
                className="font-mono text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:text-accent"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <MagneticButton href="#contact" variant="outline" className="px-5 py-2.5 text-xs">
            Get in touch
          </MagneticButton>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={clsx(
              "h-px w-6 bg-text transition-transform duration-300",
              open && "translate-y-[3.5px] rotate-45",
            )}
          />
          <span
            className={clsx(
              "h-px w-6 bg-text transition-transform duration-300",
              open && "-translate-y-[3.5px] -rotate-45",
            )}
          />
        </button>
      </nav>

      {/* Mobile overlay menu */}
      <div
        className={clsx(
          "fixed inset-0 top-[69px] z-40 bg-base transition-opacity duration-300 md:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <ul className="flex flex-col gap-2 px-6 pt-10">
          {nav.map((item, i) => (
            <li
              key={item.href}
              className={clsx(
                "translate-y-4 opacity-0 transition-all duration-500",
                open && "translate-y-0 opacity-100",
              )}
              style={{ transitionDelay: open ? `${i * 60 + 100}ms` : "0ms" }}
            >
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className="block border-b border-border py-4 font-display text-4xl tracking-tight text-text"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
