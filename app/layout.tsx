import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { site, person } from "@/lib/content";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Preloader } from "@/components/ui/Preloader";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import "./globals.css";

// Runs before paint: gates the preloader behind JS availability and
// skips it on repeat visits within the session.
const bootScript = `document.documentElement.classList.add('js');try{if(sessionStorage.getItem('preloader-shown'))document.documentElement.classList.add('skip-preloader')}catch(e){}`;

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const instrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
      "x-default": "/",
    },
  },
  authors: [{ name: person.name, url: site.url }],
  creator: person.name,
  publisher: person.name,
  category: "technology",
  classification: "Portfolio",
  keywords: [
    // Primary Identity & Name Variations
    "Mothilal",
    "Mothilal M",
    "Mothilal Software Engineer",
    "Mothilal Python Developer",
    "Mothilal Developer",
    "Mothilal Backend Engineer",
    "Mothilal Cloud Engineer",
    "Mothilal Portfolio",
    "Mothilal Official Website",
    "Mothilal Full Stack",
    "mothilal.dev",
    "mothilal dev",
    "Engineer Mothilal",
    "Developer Mothilal",

    // 10xscale Employee & Company Keywords
    "10xscale employee",
    "10xscale software engineer",
    "10xscale developer",
    "10xscale python developer",
    "10xscale Mothilal",
    "Mothilal 10xscale",
    "Mothilal 10xscale.ai",
    "10xscale.ai software engineer",
    "10xscale backend engineer",
    "10xscale team",
    "10xscale engineering",

    // Prestige & Authority Keywords ("Best / Top / Expert")
    "best software engineer",
    "best software engineer India",
    "best python developer",
    "best backend developer",
    "top software engineer",
    "top backend developer India",
    "top python developer India",
    "expert python developer",
    "fastapi expert",
    "gcp backend expert",
    "senior backend engineer",
    "high performance backend developer",
    "top tech talent India",

    // Core Engineering Roles
    "Software Engineer",
    "Backend Developer",
    "Python Developer",
    "FastAPI Developer",
    "Cloud Engineer",
    "Platform Engineer",
    "API Architect",
    "Microservices Engineer",
    "Full Stack Python Developer",

    // Tech Stack & Infrastructure
    "Python",
    "FastAPI",
    "Google Cloud Platform",
    "GCP Cloud Run",
    "Cloud SQL",
    "Docker",
    "PostgreSQL",
    "MySQL",
    "Redis",
    "Microservices Architecture",
    "REST API Development",
    "CI/CD Pipelines",
    "Distributed Systems",
    "System Design",
    "TypeScript",
    "Next.js",

    // Hiring & Freelance Keywords
    "Hire Software Engineer",
    "Hire Backend Developer",
    "Hire Python Developer",
    "Hire FastAPI Developer",
    "Software Engineer for Hire",
    "Freelance Python Developer",
    "Backend Engineering Consultant",
    "Remote Backend Engineer India",
    "Contract Backend Developer",

    // Geographic Keywords
    "Software Engineer India",
    "Software Engineer Hyderabad",
    "Software Engineer Tamil Nadu",
    "Software Engineer Dharmapuri",
    "Backend Developer Hyderabad",
    "Python Developer Hyderabad",
    "Python Developer Tamil Nadu",
    "Indian Software Engineer",
  ],
  openGraph: {
    type: "profile",
    url: site.url,
    siteName: "Mothilal - Software Engineer",
    title: site.title,
    description: site.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@mothilal",
    title: site.title,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    other: {
      "msvalidate.01": "9F2259B03F5318EEEC2602EE64499BAF",
    },
  },
  other: {
    "geo.region": "IN-TN",
    "geo.placename": "Dharmapuri, Tamil Nadu, India",
    "geo.position": "12.1277;78.1579",
    "ICBM": "12.1277, 78.1579",
    "DC.title": site.title,
    "DC.creator": person.name,
    "DC.description": site.description,
    "DC.subject":
      "Software Engineering, Python Developer, FastAPI, Cloud Infrastructure, Backend Architecture",
    "DC.language": "en",
    "DC.coverage": "India, Worldwide",
    "rating": "General",
    "revisit-after": "7 days",
  },
};

export const viewport: Viewport = {
  themeColor: "#0F0E0C",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bricolage.variable} ${instrument.variable} ${jetbrains.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-5 focus:py-2.5 focus:font-mono focus:text-xs focus:text-accent-ink"
        >
          Skip to content
        </a>
        <Preloader />
        <SmoothScroll />
        {children}
        <CustomCursor />
        <GrainOverlay />
        <ScrollProgress />
        <GoogleAnalytics gaId={site.gaId} />
      </body>
    </html>
  );
}
