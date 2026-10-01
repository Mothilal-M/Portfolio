import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { person, site } from "@/lib/content";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: `${post.title} — ${person.name}`,
    description: post.excerpt,
    alternates: {
      canonical: `/writing/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${site.url}/writing/${post.slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [person.name],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      creator: "@mothilal",
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: post.title,
    description: post.excerpt,
    url: `${site.url}/writing/${post.slug}`,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      "@type": "Person",
      name: person.name,
      jobTitle: person.role,
      url: site.url,
      sameAs: [person.links.linkedin, person.links.github],
    },
    publisher: {
      "@type": "Organization",
      name: person.name,
      url: site.url,
      logo: `${site.url}/icon.svg`,
    },
    keywords: post.tags.join(", "),
    proficiencyLevel: "Expert",
    inLanguage: "en-US",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article className="min-h-screen bg-base px-6 py-12 text-text md:px-16 md:py-20">
        <div className="mx-auto max-w-3xl">
          {/* Breadcrumbs / Back link */}
          <div className="mb-10 flex items-center justify-between border-b border-border pb-6">
            <Link
              href="/writing"
              className="font-mono text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:text-accent"
            >
              ← Back to articles
            </Link>

            <span className="font-mono text-xs text-accent">
              {post.category}
            </span>
          </div>

          {/* Article Header */}
          <header className="mb-12">
            <div className="flex items-center gap-3 font-mono text-xs text-muted">
              <time dateTime={post.publishedAt}>{post.publishedAt}</time>
              <span>·</span>
              <span>{post.readTime}</span>
              <span>·</span>
              <span>By {person.name}</span>
            </div>

            <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-text md:text-5xl md:leading-[1.1]">
              {post.title}
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-muted">
              {post.excerpt}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border px-3 py-1 font-mono text-xs uppercase tracking-wider text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>

          {/* Article Content Sections */}
          <div className="space-y-10 border-t border-border pt-10">
            {post.content.map((sec, i) => (
              <section key={i} className="space-y-4">
                <h2 className="font-display text-2xl font-bold tracking-tight text-text">
                  {sec.sectionTitle}
                </h2>

                {sec.body.map((p, j) => (
                  <p key={j} className="leading-relaxed text-muted/90">
                    {p}
                  </p>
                ))}

                {sec.codeBlock && (
                  <div className="mt-4 overflow-hidden rounded-lg border border-border bg-surface">
                    {sec.codeBlock.filename && (
                      <div className="border-b border-border bg-surface-2 px-4 py-2 font-mono text-[0.6875rem] text-muted">
                        {sec.codeBlock.filename}
                      </div>
                    )}
                    <pre className="overflow-x-auto p-4 font-mono text-xs text-text">
                      <code>{sec.codeBlock.code}</code>
                    </pre>
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Author footer card */}
          <div className="mt-16 rounded-card border border-border bg-surface p-6 md:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
              Written by {person.name}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {person.name} is a {person.role} at {person.company} specializing in Python,
              FastAPI, Google Cloud Platform, and scalable microservices.
            </p>
            <div className="mt-4 flex gap-4 font-mono text-xs">
              <Link
                href="/"
                className="text-text transition-colors hover:text-accent"
              >
                Portfolio
              </Link>
              <span className="text-muted">·</span>
              <Link
                href="/resume"
                className="text-text transition-colors hover:text-accent"
              >
                Resume
              </Link>
              <span className="text-muted">·</span>
              <a
                href={person.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text transition-colors hover:text-accent"
              >
                LinkedIn ↗
              </a>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
