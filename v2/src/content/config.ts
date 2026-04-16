import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    role: z.string(),
    year: z.string(),
    stack: z.array(z.string()),
    method: z.enum(['GET', 'POST', 'PUT', 'PATCH', 'DELETE']).default('GET'),
    status: z.enum(['200 OK', '201 Shipped', '202 In Progress', '204 Archived']).default('200 OK'),
    problem: z.string(),
    approach: z.string(),
    outcome: z.string(),
    featured: z.boolean().default(false),
    order: z.number().default(100),
    links: z
      .array(
        z.object({
          label: z.string(),
          href: z.string().url(),
          kind: z.enum(['live', 'source', 'case-study', 'other']).default('other'),
        })
      )
      .default([]),
    cover: z.string().optional(),
  }),
});

const quotes = defineCollection({
  type: 'data',
  schema: z.object({
    slot: z.enum([
      'hero',
      'pre-about',
      'pre-skills',
      'pre-experience',
      'pre-work',
      'closing',
    ]),
    text: z.string(),
    attribution: z.string().optional(),
    order: z.number().default(0),
  }),
});

const experience = defineCollection({
  type: 'data',
  schema: z.object({
    role: z.string(),
    company: z.string(),
    location: z.string().optional(),
    startDate: z.string(),
    endDate: z.string().optional(),
    summary: z.string(),
    bullets: z.array(z.string()).default([]),
    receipt: z
      .object({
        metric: z.string(),
        detail: z.string(),
      })
      .optional(),
    order: z.number().default(0),
  }),
});

export const collections = { projects, quotes, experience };
