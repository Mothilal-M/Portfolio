import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Writing() {
  const posts = getAllPosts();

  return (
    <section id="writing" className="py-section">
      <div className="mx-auto w-full max-w-[90rem] px-6 md:px-12">
        <SectionHeading
          index="05"
          eyebrow="Writing & Architecture"
          title="Engineering case studies & technical thoughts."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col justify-between rounded-card border border-border bg-surface/30 p-6 transition-all duration-300 hover:border-accent/40 hover:bg-surface/70 md:p-8"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-4 font-mono text-xs text-muted">
                  <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-accent">
                    {post.category}
                  </span>
                  <span>{post.readTime}</span>
                </div>

                <h3 className="mt-5 font-display text-2xl font-bold tracking-tight text-text transition-colors group-hover:text-accent">
                  <Link href={`/writing/${post.slug}`} className="focus:outline-none">
                    {post.title}
                  </Link>
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-muted line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {post.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="rounded border border-border/80 bg-base/60 px-2 py-0.5 font-mono text-[0.6875rem] text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                  {post.tags.length > 4 && (
                    <span className="font-mono text-[0.6875rem] text-muted/60 self-center">
                      +{post.tags.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-border/60 pt-4">
                <time
                  dateTime={post.publishedAt}
                  className="font-mono text-xs text-muted/80"
                >
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>

                <Link
                  href={`/writing/${post.slug}`}
                  data-cursor="hover"
                  className="font-mono text-xs uppercase tracking-wider text-accent transition-transform duration-200 group-hover:translate-x-1"
                >
                  Read Case Study →
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Explore all & RSS footer banner */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-card border border-border/60 bg-surface/20 p-6 sm:flex-row md:px-8">
          <div>
            <p className="font-display font-medium text-text">
              Want more deep dives on backend architecture & cloud systems?
            </p>
            <p className="text-xs text-muted">
              Subscribe to the syndicated RSS feed or check out the full archive.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/feed.xml"
              target="_blank"
              data-cursor="hover"
              className="rounded-full border border-border px-4 py-2 font-mono text-xs uppercase tracking-wider text-muted transition-colors hover:border-accent hover:text-accent"
            >
              RSS Feed ↗
            </Link>
            <Link
              href="/writing"
              data-cursor="hover"
              className="rounded-full bg-accent px-5 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-accent-ink transition-transform hover:scale-105"
            >
              All Articles →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
