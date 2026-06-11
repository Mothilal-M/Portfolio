import { person, site } from "./content";

/**
 * Structured-data builders recreating the legacy site's JSON-LD graph
 * (Person, WebSite, ProfilePage, BreadcrumbList, Organization,
 * ProfessionalService) fed from lib/content.ts.
 */

const PERSON_ID = `${site.url}/#person`;
const WEBSITE_ID = `${site.url}/#website`;
const WEBPAGE_ID = `${site.url}/#webpage`;
const IMAGE_URL = `${site.url}${person.portrait}`;

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: person.name,
    givenName: "Mothilal",
    familyName: "M",
    alternateName: ["Mothilal", "Mothilal Developer", "Mothilal Software Engineer"],
    jobTitle: person.role,
    description:
      "Mothilal M is a Software Engineer specializing in Python, FastAPI, backend development, and cloud infrastructure. Currently working at 10xscale.ai building scalable systems.",
    url: `${site.url}/`,
    image: { "@type": "ImageObject", url: IMAGE_URL, width: 800, height: 772 },
    email: `mailto:${person.email}`,
    telephone: "+91-9787962328",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dharmapuri",
      addressRegion: "Tamil Nadu",
      addressCountry: "India",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Government Arts College, Coimbatore",
      sameAs: "https://gacbe.ac.in/",
    },
    worksFor: { "@type": "Organization", name: person.company, url: person.companyUrl },
    knowsAbout: [
      "Python", "FastAPI", "Software Engineering", "Backend Development",
      "Google Cloud Platform", "Docker", "PostgreSQL", "MySQL", "Redis",
      "API Development", "Microservices", "Cloud Infrastructure", "TypeScript", "JavaScript",
    ],
    hasOccupation: {
      "@type": "Occupation",
      name: person.role,
      occupationLocation: { "@type": "City", name: person.companyLocation },
      skills: "Python, FastAPI, GCP, Docker, PostgreSQL, Backend Development",
    },
    sameAs: [person.links.linkedin, `${site.url}/`, person.links.github],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: `${site.url}/`,
    name: "Mothilal - Software Engineer Portfolio",
    description: "Official portfolio website of Mothilal M, Software Engineer and Python Developer",
    publisher: { "@id": PERSON_ID },
    inLanguage: "en-US",
  };
}

export function profilePageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": WEBPAGE_ID,
    url: `${site.url}/`,
    name: site.title,
    description:
      "Portfolio of Mothilal M - Software Engineer specializing in Python, FastAPI, and backend development",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": PERSON_ID },
    mainEntity: { "@id": PERSON_ID },
    inLanguage: "en-US",
    datePublished: "2024-01-01",
    dateModified: "2026-06-12",
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Mothilal",
    url: `${site.url}/`,
    logo: IMAGE_URL,
  };
}

export function breadcrumbSchema() {
  const crumbs = [
    ["Home", `${site.url}/`],
    ["About Mothilal", `${site.url}/#about`],
    ["Skills", `${site.url}/#skills`],
    ["Projects", `${site.url}/#work`],
    ["Contact", `${site.url}/#contact`],
  ];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map(([name, item], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item,
    })),
  };
}

export function professionalServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Mothilal - Software Development Services",
    description:
      "Professional software engineering services including Python development, FastAPI backend systems, cloud infrastructure, and microservices architecture",
    url: `${site.url}/`,
    telephone: "+91-9787962328",
    email: person.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dharmapuri",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    },
    priceRange: "$$",
    areaServed: "Worldwide",
    serviceType: [
      "Backend Development", "Python Development", "FastAPI Development",
      "Cloud Infrastructure", "API Development",
    ],
  };
}

export function allSchemas() {
  return [
    personSchema(),
    websiteSchema(),
    profilePageSchema(),
    organizationSchema(),
    breadcrumbSchema(),
    professionalServiceSchema(),
  ];
}
