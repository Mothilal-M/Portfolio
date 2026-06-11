import { allSchemas } from "@/lib/jsonld";
import { Navbar } from "@/components/ui/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { Choreography } from "@/components/fx/Choreography";
import { AccentBand } from "@/components/ui/AccentBand";

export default function Home() {
  return (
    <>
      {allSchemas().map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <Navbar />
      <main id="main" className="flex-1">
        <Hero />
        {/* Curtain stack: slides over the sticky hero */}
        <div className="relative z-10 rounded-t-[2rem] border-t border-border bg-base shadow-[0_-24px_80px_rgb(0_0_0/0.7)] md:rounded-t-[3rem]">
          <About />
          <Skills />
          <AccentBand />
          <Experience />
          <Projects />
          <Contact />
          <Footer />
        </div>
      </main>
      <Choreography />
    </>
  );
}
