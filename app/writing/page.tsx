import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { person, site } from "@/lib/content";

export const metadata: Metadata = {
  title: `Technical Writing & Architecture Case Studies — ${person.name}`,
  description: `In-depth technical articles and system design case studies by ${person.name}. Covering Python, FastAPI microservices, Google Cloud Platform, Docker, and creative web engineering.`,
  alternates: {
    canonical: "/writing",
  },
  openGraph: {
    title: `Technical Writing — ${person.name}`,
    description: `Engineering articles on FastAPI, GCP, and modern web architecture by ${person.name}.`,
    url: `${site.url}/writing`,
    type: "website",
  },
};

export default function WritingIndexPage() {
  const posts = getAllPosts();

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Technical Writing & Case Studies by ${person.name}`,
    url: `${site.url}/writing`,
    description: `Technical articles and architectural write-ups on backend engineering, Python, and cloud infrastructure.`,
    author: {
      "@type": "Person",
      name: person.name,
      url: site.url,
    },
    hasPart: posts.map((p) => ({
      "@type": "TechArticle",
      headline: p.title,
      description: p.excerpt,
      url: `${site.url}/writing/${p.slug}`,
      datePublished: p.publishedAt,
      author: {
        "@type": "Person",
        name: person.name,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      <main className="min-h-screen bg-base px-6 py-12 text-text md:px-16 md:py-20">
        <div className="mx-auto max-w-4xl">
          {/* Top navigation */}
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
            <Link
              href="/"
              className="font-mono text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:text-accent"
            >
              ← Back to portfolio
            </Link>

            <div className="flex items-center gap-4">
              <Link
                href="/resume"
                className="font-mono text-xs uppercase tracking-wider text-muted transition-colors hover:text-accent"
              >
                Resume
              </Link>
              <Link
                href="/feed.xml"
                target="_blank"
                className="rounded-full border border-border px-3 py-1 font-mono text-xs uppercase tracking-wider text-accent transition-colors hover:bg-accent hover:text-accent-ink"
              >
                RSS Feed ↗
              </Link>
            </div>
          </div>

          {/* Page header */}
          <header className="mb-14">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
              [Archive] — Engineering Case Studies
            </p>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-text md:text-5xl">
              Technical Writing & System Architecture
            </h1>
            <p className="mt-4 max-w-2xl leading-relaxed text-muted">
              Deep dives into production backend engineering, high-throughput APIs, cloud
              infrastructure on GCP, and creative web performance.
            </p>
          </header>

          {/* Articles list */}
          <div className="space-y-8">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="group relative rounded-card border border-border bg-surface/50 p-6 transition-all duration-300 hover:border-accent/50 hover:bg-surface/80 md:p-8"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-muted">
                  <span className="text-accent">{post.category}</span>
                  <div className="flex items-center gap-3">
                    <time dateTime={post.publishedAt}>{post.publishedAt}</time>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-text transition-colors group-hover:text-accent md:text-3xl">
                  <Link href={`/writing/${post.slug}`} className="focus:outline-none">
                    <span className="absolute inset-0" aria-hidden="true" />
                    {post.title}
                  </Link>
                </h2>

                <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">
                  {post.excerpt}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border/80 px-2.5 py-0.5 font-mono text-[0.6875rem] uppercase tracking-wider text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-accent">
                  Read article <span>→</span>
                </div>
              </article>
            ))}
          </div>

          {/* Footer note */}
          <footer className="mt-16 border-t border-border pt-8 font-mono text-xs text-muted">
            <p>
              Looking for architecture consulting or backend engineering help? Reach out at{" "}
              <a href={`mailto:${person.email}`} className="text-accent underline">
                {person.email}
              </a>
              .
            </p>
          </footer>
        </div>
      </main>
    </>
  );
}
