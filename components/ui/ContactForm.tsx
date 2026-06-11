"use client";

import { useState } from "react";
import { site } from "@/lib/content";
import { MagneticButton } from "./MagneticButton";

type Status = "idle" | "pending" | "success" | "error";

const inputStyles =
  "w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-text " +
  "placeholder:text-muted/60 transition-colors focus:border-accent focus:outline-none";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    if (data._honey) return; // bot filled the honeypot
    setStatus("pending");
    try {
      const res = await fetch(site.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: data.message,
          _subject: `Portfolio inquiry from ${data.name}`,
          _captcha: "false",
        }),
      });
      if (!res.ok) throw new Error(`FormSubmit responded ${res.status}`);
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" aria-label="Contact form">
      {/* Honeypot — hidden from real users */}
      <input
        type="text"
        name="_honey"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="mb-2 block font-mono text-xs uppercase tracking-[0.2em] text-muted">
            Name
          </label>
          <input id="cf-name" name="name" type="text" required placeholder="Your name" className={inputStyles} />
        </div>
        <div>
          <label htmlFor="cf-email" className="mb-2 block font-mono text-xs uppercase tracking-[0.2em] text-muted">
            Email
          </label>
          <input id="cf-email" name="email" type="email" required placeholder="you@example.com" className={inputStyles} />
        </div>
      </div>

      <div>
        <label htmlFor="cf-message" className="mb-2 block font-mono text-xs uppercase tracking-[0.2em] text-muted">
          Message
        </label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={5}
          placeholder="What are we building?"
          className={inputStyles}
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <MagneticButton type="submit" disabled={status === "pending"}>
          {status === "pending" ? "Sending…" : "Send message"}
        </MagneticButton>
        <p role="status" aria-live="polite" className="font-mono text-xs tracking-wide">
          {status === "success" && <span className="text-accent">Message sent — I&apos;ll reply soon.</span>}
          {status === "error" && (
            <span className="text-red-400">
              Something broke. Email me directly instead — the link is on the left.
            </span>
          )}
        </p>
      </div>
    </form>
  );
}
