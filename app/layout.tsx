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
    // Identity & Variations
    "Mothilal",
    "Mothilal M",
    "Mothilal Software Engineer",
    "Mothilal Python Developer",
    "Mothilal Developer",
    "Mothilal Portfolio",
    "Mothilal 10xscale",
    "mothilal.dev",

    // Core Technical Roles
    "Software Engineer",
    "Backend Developer",
    "Python Developer",
    "FastAPI Developer",
    "Cloud Engineer",
    "Platform Engineer",
    "API Architect",
    "Full Stack Python Developer",

    // Core Tech Stack & Infrastructure
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

    // Location & Hiring Keywords
    "Software Engineer India",
    "Software Engineer Hyderabad",
    "Python Developer Tamil Nadu",
    "Backend Developer India",
    "Hire Python Developer",
    "Hire FastAPI Developer",
    "Remote Backend Engineer India",
    "Top Python Developers India",
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
