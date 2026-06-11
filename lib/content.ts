/**
 * Single source of truth for all site content.
 * Design lives in components; data lives here. Edit copy in this file only.
 */

export const site = {
  url: "https://mothilal.xyz",
  title: "Mothilal | Software Engineer & Python Developer | Backend Expert",
  description:
    "Mothilal M is a Software Engineer and Python Developer at 10xscale.ai specializing in backend development (Python, FastAPI), cloud infrastructure (GCP), Docker, and scalable microservices.",
  gaId: "G-Y3T1PYW4SY",
  formEndpoint: "https://formsubmit.co/ajax/mothilal044@gmail.com",
  // Legacy reCAPTCHA Enterprise site key (unused — old site posted to a
  // /verify-recaptcha endpoint that never existed): 6LfA1zYsAAAAAPr4g_m9ZyooOTETf5pXKWz1gW5R
} as const;

export const person = {
  name: "Mothilal M",
  firstName: "Mothilal",
  role: "Software Engineer",
  company: "10xscale.ai",
  companyUrl: "https://10xscale.ai/",
  companyLocation: "Hyderabad",
  base: "Dharmapuri, Tamil Nadu, India",
  email: "mothilal044@gmail.com",
  phone: "+91 9787962328",
  phoneHref: "+919787962328",
  availability: "Open to backend and platform engineering roles",
  heroBio:
    "I build reliable backend systems with Python, FastAPI, and GCP at 10xscale.ai — production-ready APIs, performance improvements, and scalable cloud workflows for fast-moving product teams.",
  links: {
    linkedin: "https://www.linkedin.com/in/mothilal-m-04803a227",
    github: "https://github.com/Mothilal-M",
    site: "https://mothilal.xyz",
  },
  portrait: "/images/mothilal.jpg",
} as const;

/** Ticker strips */
export const marquee = {
  hero: ["PYTHON", "FASTAPI", "GCP", "DOCKER", "POSTGRESQL", "REDIS", "CI/CD", "MICROSERVICES"],
  band: ["RELIABLE APIS", "CLEAN DEPLOYS", "SYSTEMS THAT SCALE", "OPEN TO WORK"],
} as const;

export const about = {
  statement:
    "APIs that don't flake. Deploys that don't drift. Systems that scale without drama.",
  paragraphs: [
    "Currently working as a Software Engineer at 10xscale.ai in Hyderabad, delivering backend features and cloud integrations used in real product workflows. I focus on reducing operational friction, improving API reliability, and building systems that stay maintainable as usage grows.",
    "I specialize in backend development with Python and FastAPI, cloud infrastructure on GCP, and scalable microservices. I prioritize measurable outcomes: faster response times, cleaner deployments, and dependable systems.",
    "Outside work, I enjoy chess, reading about technology, and exploring new product ideas. Continuous learning helps me bring clearer decisions, better trade-offs, and stronger collaboration into engineering work.",
  ],
  stats: ["Python · FastAPI · GCP", "10xscale.ai — since Aug 2024", "Hyderabad / Remote"],
} as const;

export interface SkillCategory {
  key: string;
  label: string;
  blurb: string;
  skills: string[];
}

/** Order is the on-page narrative: backend-first positioning. */
export const skillCategories: SkillCategory[] = [
  {
    key: "backend",
    label: "Backend",
    blurb: "APIs and services that hold up in production.",
    skills: ["Python", "FastAPI", "PHP", "MySQL", "PostgreSQL", "Database Design", "API Development"],
  },
  {
    key: "cloud",
    label: "Cloud & DevOps",
    blurb: "Shipping and running systems on GCP.",
    skills: ["Google Cloud Platform", "Cloud Run", "Cloud SQL", "Docker", "CI/CD", "Server Deployment"],
  },
  {
    key: "data",
    label: "Data & Caching",
    blurb: "Moving and serving data fast.",
    skills: ["Redis", "ETL Pipelines", "Data Integration", "Database Scaling"],
  },
  {
    key: "ai",
    label: "AI & Modern Tools",
    blurb: "AI-assisted engineering workflows.",
    skills: ["GitHub Copilot", "AI-assisted Coding", "LLM Tooling", "Pair Programming", "LangGraph"],
  },
  {
    key: "frontend",
    label: "Frontend",
    blurb: "Interfaces that respect the user.",
    skills: ["JavaScript", "TypeScript", "HTML5", "CSS3", "jQuery", "Responsive Design", "UI/UX"],
  },
  {
    key: "professional",
    label: "Professional",
    blurb: "The skills that make teams faster.",
    skills: ["Problem Solving", "Multi-tasking", "Adaptability", "Communication", "Team Collaboration", "Project Management"],
  },
];

export interface TimelineEntry {
  kind: "work" | "education";
  title: string;
  org: string;
  orgUrl?: string;
  location: string;
  start: string;
  end: string;
  year: string;
  description: string;
}

export const timeline: TimelineEntry[] = [
  {
    kind: "work",
    title: "Software Engineer",
    org: "10XScale.ai",
    orgUrl: "https://10xscale.ai/",
    location: "Hyderabad",
    start: "Aug 2024",
    end: "Present",
    year: "2024",
    description:
      "Designing and shipping backend services with Python, FastAPI, Docker, and Google Cloud Platform. Key focus areas include API reliability, deployment consistency, and improving engineering velocity through practical automation.",
  },
  {
    kind: "education",
    title: "B.Sc. Computer Science",
    org: "Government Arts College, Coimbatore",
    orgUrl: "https://gacbe.ac.in/",
    location: "Coimbatore",
    start: "2021",
    end: "2024",
    year: "2021",
    description:
      "Foundation in algorithms, data structures, and system design now supports day-to-day work on API design, debugging production issues, and performance-oriented delivery.",
  },
];

export interface Project {
  slug: string;
  title: string;
  problem: string;
  role: string;
  outcome: string;
  tags: string[];
  links: { live?: string; repo?: string };
  /** Bento sizing: lg = featured 2-col, tall = 1-col tall, wide = full-width */
  size: "lg" | "tall" | "wide";
}

export const projects: Project[] = [
  {
    slug: "10xmindplay",
    title: "10xMindPlay",
    problem: "Users needed engaging, measurable cognitive practice online.",
    role: "Contributed to product engineering and interaction-focused frontend workflows.",
    outcome: "Launched a live interactive platform with structured cognitive challenges.",
    tags: ["AI", "TypeScript", "Web App", "Modern UI"],
    links: { live: "https://10xmindplay.mothilal.xyz/" },
    size: "lg",
  },
  {
    slug: "seat-matrix",
    title: "College Admission Seat Matrix",
    problem: "Manual seat allocation caused delays and inconsistencies.",
    role: "Built the end-to-end admission workflow and reporting modules.",
    outcome: "Improved seat publishing speed and reduced manual coordination overhead.",
    tags: ["PHP", "MySQL", "JavaScript", "Admin Workflows"],
    links: { repo: "https://github.com/Mothilal-M" },
    size: "tall",
  },
  {
    slug: "portfolio",
    title: "This Portfolio",
    problem: "Needed a single place to communicate skills and work quality.",
    role: "Designed and built the full UX, content, and implementation — you're looking at it.",
    outcome: "An animated 3D portfolio built with Next.js, React Three Fiber, and GSAP.",
    tags: ["Next.js", "React Three Fiber", "GSAP", "Tailwind"],
    links: { live: "https://mothilal.xyz", repo: "https://github.com/Mothilal-M/Portfolio" },
    size: "wide",
  },
];

export const nav = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
] as const;

export const footer = {
  blurb:
    "Specializing in Backend Development, FastAPI, Google Cloud Platform, Docker, and Microservices Architecture. Available for freelance projects and full-time opportunities.",
  location: "Dharmapuri, TN — Hyderabad",
} as const;
