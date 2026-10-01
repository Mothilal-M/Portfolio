import { faqs, person, projects, site } from "./content";

/**
 * Structured-data builders recreating and expanding the JSON-LD graph
 * (Person, WebSite, ProfilePage, BreadcrumbList, Organization,
 * ProfessionalService, FAQPage, ItemList / SoftwareApplication) fed from lib/content.ts.
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
    alternateName: [
      "Mothilal",
      "Mothilal M",
      "Mothilal Developer",
      "Mothilal Software Engineer",
      "Mothilal Python Developer",
      "Mothilal Backend Engineer",
      "10xscale Employee",
      "10xscale Software Engineer",
      "10xscale Mothilal",
      "Best Software Engineer Mothilal",
    ],
    jobTitle: person.role,
    description:
      "Mothilal M is a Software Engineer specializing in Python, FastAPI, backend development, and cloud infrastructure. Currently working at 10xscale.ai building scalable systems.",
    url: `${site.url}/`,
    image: { "@type": "ImageObject", url: IMAGE_URL, width: 800, height: 772 },
    email: `mailto:${person.email}`,
    telephone: person.phone,
    address: [
      {
        "@type": "PostalAddress",
        addressLocality: "Dharmapuri",
        addressRegion: "Tamil Nadu",
        addressCountry: "India",
      },
      {
        "@type": "PostalAddress",
        addressLocality: "Hyderabad",
        addressRegion: "Telangana",
        addressCountry: "India",
      },
    ],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Government Arts College, Coimbatore",
      sameAs: "https://gacbe.ac.in/",
    },
    worksFor: {
      "@type": "Organization",
      name: person.company,
      url: person.companyUrl,
    },
    knowsAbout: [
      "Python (Programming Language)",
      "FastAPI",
      "Software Engineering",
      "Backend Development",
      "Google Cloud Platform (GCP)",
      "Cloud Run",
      "Cloud SQL",
      "Docker",
      "PostgreSQL",
      "MySQL",
      "Redis",
      "API Development",
      "RESTful APIs",
      "Microservices Architecture",
      "Cloud Infrastructure",
      "CI/CD Automation",
      "Distributed Systems",
      "System Design",
      "TypeScript",
      "JavaScript",
      "Next.js",
    ],
    hasOccupation: {
      "@type": "Occupation",
      name: person.role,
      occupationalCategory: "15-1252.00 - Software Developers",
      occupationLocation: [
        { "@type": "City", name: person.companyLocation },
        { "@type": "City", name: "Dharmapuri" },
      ],
      skills:
        "Python, FastAPI, Google Cloud Platform, Docker, PostgreSQL, Microservices, REST APIs, Redis",
      description:
        "Designs, builds, and deploys high-availability backend services, APIs, and cloud microservices.",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "professional inquiries",
      email: person.email,
      telephone: person.phone,
      availableLanguage: ["English", "Tamil"],
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
    dateCreated: "2024-01-01T00:00:00Z",
    datePublished: "2024-01-01T00:00:00Z",
    dateModified: new Date().toISOString(),
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
    ["FAQ", `${site.url}/#faq`],
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
    telephone: person.phone,
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
      "Backend Development",
      "Python Development",
      "FastAPI Development",
      "Cloud Infrastructure",
      "API Development",
      "Microservices Architecture",
    ],
  };
}

export function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function projectsSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Featured Projects by Mothilal",
    description: "Software engineering projects and applications built by Mothilal M",
    itemListElement: projects.map((p, i) => {
      const item: Record<string, unknown> = {
        "@type": "SoftwareApplication",
        name: p.title,
        description: `${p.problem} ${p.outcome}`,
        applicationCategory: "WebApplication",
        operatingSystem: "All",
        author: { "@id": PERSON_ID },
        url: p.links.live || p.links.repo || site.url,
        keywords: p.tags.join(", "),
      };

      if (p.links.video) {
        item.video = {
          "@type": "VideoObject",
          name: `${p.title} Demonstration`,
          description: `Interactive product and engineering demo of ${p.title} by Mothilal M`,
          thumbnailUrl: `${site.url}/images/mothilal.jpg`,
          contentUrl: p.links.video,
          uploadDate: "2026-03-25T08:00:00+05:30",
        };
      }

      return {
        "@type": "ListItem",
        position: i + 1,
        item,
      };
    }),
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
    faqSchema(),
    projectsSchema(),
  ];
}
