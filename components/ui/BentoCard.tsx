"use client";

import { useRef } from "react";
import clsx from "clsx";
import type { Project } from "@/lib/content";

const FIELD_LABELS = ["Problem", "Role", "Outcome"] as const;

export function BentoCard({ project, className }: { project: Project; className?: string }) {
  const ref = useRef<HTMLElement>(null);

  const onPointerMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - r.left}px`);
    el.style.setProperty("--y", `${e.clientY - r.top}px`);
  };

  const fields = [project.problem, project.role, project.outcome];

  return (
    <article
      ref={ref}
      onPointerMove={onPointerMove}
      data-cursor="hover"
      data-animate="card"
      className={clsx(
        "group relative flex flex-col overflow-hidden rounded-card border border-border bg-surface p-7 md:p-9",
        "transition-colors duration-500 hover:border-accent/40",
        className,
      )}
    >
      {/* Cursor-following inner glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(280px circle at var(--x, 50%) var(--y, 50%), var(--color-accent-soft), transparent 70%)",
        }}
      />

      <div className="relative flex flex-1 flex-col">
        <div className="mb-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border px-3 py-1 font-mono text-[0.6875rem] uppercase tracking-wider text-muted"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="mb-6 font-display text-h3 leading-tight tracking-tight text-text">
          {project.title}
        </h3>

        <dl className="mb-8 space-y-4">
          {fields.map((value, i) => (
            <div key={FIELD_LABELS[i]}>
              <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.25em] text-accent">
                {FIELD_LABELS[i]}
              </dt>
              <dd className="mt-1 text-sm leading-relaxed text-muted">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-auto flex gap-6">
          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-text transition-colors hover:text-accent"
            >
              Live site
              <span className="transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5">
                ↗
              </span>
            </a>
          )}
          {project.links.repo && (
            <a
              href={project.links.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-text transition-colors hover:text-accent"
            >
              GitHub
              <span className="transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5">
                ↗
              </span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
