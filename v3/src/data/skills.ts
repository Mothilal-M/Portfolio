export type SkillDomain = 'Backend' | 'Cloud' | 'Data' | 'Frontend' | 'AI' | 'Craft';
export type SkillBand = 'Daily' | 'Often' | 'Exploring';

export interface Skill {
  name: string;
  domain: SkillDomain;
  band: SkillBand;
  note?: string;
}

export const SKILL_DOMAINS: SkillDomain[] = ['Backend', 'Cloud', 'Data', 'Frontend', 'AI', 'Craft'];
export const SKILL_BANDS: SkillBand[] = ['Daily', 'Often', 'Exploring'];

export const skills: Skill[] = [
  { name: 'Python', domain: 'Backend', band: 'Daily', note: 'Primary language — FastAPI services, data pipelines, tooling.' },
  { name: 'FastAPI', domain: 'Backend', band: 'Daily', note: 'API layer for production services at 10xScale.' },
  { name: 'API Design', domain: 'Backend', band: 'Daily', note: 'Clean contracts, typed schemas, predictable errors.' },
  { name: 'MySQL', domain: 'Backend', band: 'Daily', note: 'Schema design and query tuning for production workloads.' },
  { name: 'PostgreSQL', domain: 'Backend', band: 'Often', note: 'Newer services on Cloud SQL for Postgres.' },
  { name: 'PHP', domain: 'Backend', band: 'Exploring', note: 'Legacy support — earlier admission-system project.' },

  { name: 'GCP', domain: 'Cloud', band: 'Daily', note: 'Primary cloud — Cloud Run, Cloud SQL, Artifact Registry.' },
  { name: 'Cloud Run', domain: 'Cloud', band: 'Daily', note: 'Container hosting for stateless FastAPI services.' },
  { name: 'Docker', domain: 'Cloud', band: 'Daily', note: 'Production image builds with layered caching.' },
  { name: 'CI/CD', domain: 'Cloud', band: 'Often', note: 'GitHub Actions pipelines for build, test, deploy.' },
  { name: 'Cloud SQL', domain: 'Cloud', band: 'Often', note: 'Managed MySQL / Postgres with private connectivity.' },
  { name: 'Nginx', domain: 'Cloud', band: 'Exploring', note: 'Reverse proxy and static hosting patterns.' },

  { name: 'Redis', domain: 'Data', band: 'Often', note: 'Caching layer and rate-limit primitives.' },
  { name: 'ETL Pipelines', domain: 'Data', band: 'Often', note: 'Batch ingestion + transformation for product data.' },
  { name: 'Data Integration', domain: 'Data', band: 'Often', note: 'Stitching third-party sources into internal schemas.' },
  { name: 'Database Scaling', domain: 'Data', band: 'Exploring', note: 'Indexing, read replicas, partitioning strategies.' },

  { name: 'TypeScript', domain: 'Frontend', band: 'Often', note: 'Typed UI code — this portfolio runs on it.' },
  { name: 'JavaScript', domain: 'Frontend', band: 'Often', note: 'Everyday interactivity and small tools.' },
  { name: 'HTML5', domain: 'Frontend', band: 'Often', note: 'Semantic structure, a11y-first markup.' },
  { name: 'CSS / Tailwind', domain: 'Frontend', band: 'Often', note: 'Design-system-driven styling.' },
  { name: 'Responsive UI', domain: 'Frontend', band: 'Often', note: 'Mobile-first breakpoints, fluid type.' },
  { name: 'jQuery', domain: 'Frontend', band: 'Exploring', note: 'Kept for legacy codebases.' },

  { name: 'GitHub Copilot', domain: 'AI', band: 'Daily', note: 'Everyday coding partner.' },
  { name: 'AI-assisted Coding', domain: 'AI', band: 'Daily', note: 'Claude / Copilot in the loop for reviews and scaffolds.' },
  { name: 'LLM Tooling', domain: 'AI', band: 'Often', note: 'Prompting, function-calling, evals.' },
  { name: 'LangGraph', domain: 'AI', band: 'Exploring', note: 'Agent-graph orchestration for LLM workflows.' },

  { name: 'Problem Solving', domain: 'Craft', band: 'Daily' },
  { name: 'Clear Communication', domain: 'Craft', band: 'Daily', note: 'Written + async — PRs, design notes, incident writeups.' },
  { name: 'Team Collaboration', domain: 'Craft', band: 'Daily' },
  { name: 'Ownership', domain: 'Craft', band: 'Daily', note: 'From design to deploy to on-call follow-through.' },
  { name: 'Project Management', domain: 'Craft', band: 'Often' },
  { name: 'Pair Programming', domain: 'Craft', band: 'Often' },
];
