export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readTime: string;
  category: string;
  tags: string[];
  content: {
    sectionTitle: string;
    body: string[];
    codeBlock?: {
      language: string;
      code: string;
      filename?: string;
    };
  }[];
}

export const posts: Post[] = [
  {
    slug: "architecting-scalable-fastapi-microservices-gcp",
    title: "Architecting Scalable FastAPI Microservices on Google Cloud Run",
    excerpt:
      "A production-grade architectural guide to building, containerizing with Docker, and scaling resilient Python FastAPI microservices on Google Cloud Run with connection pooling and Redis caching.",
    publishedAt: "2026-03-20",
    readTime: "7 min read",
    category: "Backend & Cloud",
    tags: ["Python", "FastAPI", "GCP", "Docker", "Microservices", "Cloud Run", "PostgreSQL", "Redis"],
    content: [
      {
        sectionTitle: "1. Why FastAPI for Production Microservices?",
        body: [
          "When designing microservices that handle thousands of concurrent requests, Python developers often face a trade-off between developer productivity and raw execution speed. FastAPI bridges this gap by combining Starlette's asynchronous I/O foundation with Pydantic's data validation and automatic OpenAPI generation.",
          "At 10xscale.ai, we focus on services that remain maintainable as user demand grows. FastAPI's native async/await syntax enables non-blocking database queries and external HTTP calls, minimizing thread contention under heavy I/O workloads.",
        ],
      },
      {
        sectionTitle: "2. Database Connection Pooling with Asyncpg & SQLAlchemy",
        body: [
          "In serverless container environments like GCP Cloud Run, containers can scale horizontally from zero to tens of instances in seconds. If each instance opens too many database connections, you quickly exhaust Cloud SQL connection limits.",
          "The solution is pairing SQLAlchemy 2.0 async engine with asyncpg and an appropriate pool size, complemented by PgBouncer or Cloud SQL Auth Proxy.",
        ],
        codeBlock: {
          language: "python",
          filename: "core/database.py",
          code: `from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from core.config import settings

engine = create_async_engine(
    settings.DATABASE_URL,
    pool_size=5,
    max_overflow=10,
    pool_timeout=30,
    pool_recycle=1800,
    pool_pre_ping=True,
    echo=False,
)

AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
)`,
        },
      },
      {
        sectionTitle: "3. Lean Multi-Stage Docker Builds",
        body: [
          "Container startup latency directly determines cold-start duration on Cloud Run. Standard Python images can easily swell to 1GB+, delaying scale-up events.",
          "Using a multi-stage Docker build with python:3.12-slim reduces image size to less than 150MB, stripping out compiler tools and build dependencies from the final production runner.",
        ],
        codeBlock: {
          language: "dockerfile",
          filename: "Dockerfile",
          code: `FROM python:3.12-slim AS builder
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends gcc libpq-dev
COPY requirements.txt .
RUN pip install --no-cache-dir --user -r requirements.txt

FROM python:3.12-slim AS runner
WORKDIR /app
COPY --from=builder /root/.local /root/.local
COPY . /app
ENV PATH=/root/.local/bin:$PATH
ENV PYTHONUNBUFFERED=1
EXPOSE 8080

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080", "--workers", "2"]`,
        },
      },
      {
        sectionTitle: "4. Deployment & Traffic Splitting on Cloud Run",
        body: [
          "Deploying via Google Cloud SDK allows automated continuous delivery with zero downtime. Canary deployments and instant rollback can be achieved with traffic splitting.",
        ],
        codeBlock: {
          language: "bash",
          filename: "deploy.sh",
          code: `gcloud run deploy user-service \\
  --image gcr.io/\$PROJECT_ID/user-service:v2.0 \\
  --platform managed \\
  --region asia-south1 \\
  --memory 512Mi \\
  --cpu 1 \\
  --min-instances 1 \\
  --max-instances 50 \\
  --concurrency 80 \\
  --allow-unauthenticated`,
        },
      },
      {
        sectionTitle: "5. High-Speed Caching with Redis",
        body: [
          "To shield primary database replicas from repetitive query loads, frequently accessed domain objects are cached in Memorystore (Redis) with exponential backoff and cache-aside patterns. This ensures median response times remain below 30ms.",
        ],
      },
      {
        sectionTitle: "Conclusion",
        body: [
          "Building production microservices requires balancing code clarity, container optimization, and infrastructure resilience. By combining FastAPI's async foundations with Cloud Run's autoscaling and Redis caching, teams can deliver enterprise-grade performance with minimal operational complexity.",
        ],
      },
    ],
  },
  {
    slug: "building-interactive-3d-portfolio-nextjs-r3f-gsap",
    title: "Building an Interactive 3D Portfolio with Next.js 16, React Three Fiber, and GSAP",
    excerpt:
      "A deep dive into creative web engineering: combining React Three Fiber WebGL shaders, GSAP scroll choreography, and Next.js Turbopack without compromising Core Web Vitals or SEO.",
    publishedAt: "2026-03-28",
    readTime: "6 min read",
    category: "Frontend & Architecture",
    tags: ["Next.js", "React Three Fiber", "GSAP", "Tailwind CSS", "Web Performance", "Three.js"],
    content: [
      {
        sectionTitle: "1. The Creative Engineering Dilemma",
        body: [
          "Modern engineering portfolios often face a strict trade-off: flashy 3D interactions that drag down Lighthouse performance, or static pages that lack memorable impact.",
          "When rebuilding mothilal.dev, the objective was uncompromising: maintain 100/100 SEO and 95+ Core Web Vitals while rendering an interactive 3D WebGL particle field and custom GSAP scroll choreography.",
        ],
      },
      {
        sectionTitle: "2. Lazy-Loading Three.js via Client Boundaries",
        body: [
          "Three.js and React Three Fiber are heavy libraries (~600KB+ uncompressed). If included in the main bundle, First Contentful Paint (FCP) and Largest Contentful Paint (LCP) suffer severely.",
          "By dynamic-importing the 3D scene canvas with ssr: false, the initial server-rendered HTML streams immediately with pure HTML/CSS. The WebGL context only mounts after the critical rendering path is clear.",
        ],
        codeBlock: {
          language: "tsx",
          filename: "components/three/HeroSceneLoader.tsx",
          code: `import dynamic from "next/dynamic";
import { SceneFallback } from "./SceneFallback";

export const HeroSceneLoader = dynamic(
  () => import("./HeroScene").then((m) => m.HeroScene),
  {
    ssr: false,
    loading: () => <SceneFallback />,
  }
);`,
        },
      },
      {
        sectionTitle: "3. Synchronizing Lenis Smooth Scroll with GSAP Ticker",
        body: [
          "One of the biggest causes of visual stutter in animated websites is conflicting scroll physics between smooth-scroll libraries and GSAP ScrollTrigger.",
          "Driving Lenis directly inside the GSAP global ticker eliminates synchronization lag, ensuring pinned sections and card-deck stacks scrub at a rock-solid 60/120 FPS.",
        ],
        codeBlock: {
          language: "tsx",
          filename: "components/providers/SmoothScroll.tsx",
          code: `useEffect(() => {
  const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
  lenis.on("scroll", ScrollTrigger.update);

  const update = (time: number) => {
    lenis.raf(time * 1000);
  };
  gsap.ticker.add(update);
  gsap.ticker.lagSmoothing(0);

  return () => {
    gsap.ticker.remove(update);
    lenis.destroy();
  };
}, []);`,
        },
      },
      {
        sectionTitle: "4. Respecting Reduced Motion Preferences",
        body: [
          "Accessibility is paramount. All motion, cursor-following repulsion, and text-reveal splitters are wrapped in gsap.matchMedia with (prefers-reduced-motion: no-preference). Users with vestibular disorders receive clean, instantly readable static layouts with native scrolling.",
        ],
      },
      {
        sectionTitle: "5. Search Engine Optimization & Generative AI Indexing",
        body: [
          "Beyond visual flair, the site includes comprehensive JSON-LD graphs (Person, FAQPage, ItemList), Dublin Core metadata, geographic tags, and an llms.txt endpoint. This ensures search engines like Google and Bing as well as AI answer engines like Perplexity can parse and cite the portfolio accurately.",
        ],
      },
    ],
  },
];

export function getAllPosts(): Post[] {
  return posts;
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
