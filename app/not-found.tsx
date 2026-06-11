import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">404</p>
      <h1 className="mt-4 font-display text-h2 leading-tight tracking-tight text-text">
        This page drifted off into the particle field.
      </h1>
      <p className="mt-4 max-w-md text-muted">
        The URL you followed doesn&apos;t exist here. Everything worth seeing is on the home page.
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 font-mono text-sm uppercase tracking-wider text-accent-ink transition-colors hover:bg-text"
      >
        Back home
      </Link>
    </main>
  );
}
