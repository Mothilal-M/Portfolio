import { NextResponse } from "next/server";
import { person, site, skillCategories, timeline, projects } from "@/lib/content";

export async function GET() {
  const profile = {
    name: person.name,
    role: person.role,
    company: person.company,
    base: person.base,
    availability: person.availability,
    contact: {
      email: person.email,
      phone: person.phone,
      website: site.url,
      linkedin: person.links.linkedin,
      github: person.links.github,
    },
    skills: skillCategories.map((c) => ({
      category: c.label,
      items: c.skills,
    })),
    experience: timeline.filter((t) => t.kind === "work").map((w) => ({
      role: w.title,
      company: w.org,
      location: w.location,
      period: `${w.start} — ${w.end}`,
      description: w.description,
    })),
    projects: projects.map((p) => ({
      name: p.title,
      tags: p.tags,
      description: `${p.problem} ${p.outcome}`,
      links: p.links,
    })),
  };

  return NextResponse.json(profile, {
    status: 200,
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
