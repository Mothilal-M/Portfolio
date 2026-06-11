import { projects } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BentoCard } from "@/components/ui/BentoCard";

const SIZE_CLASSES: Record<string, string> = {
  lg: "md:col-span-2",
  tall: "md:row-span-2",
  wide: "md:col-span-2",
};

export function Projects() {
  return (
    <section id="work" className="py-section">
      <div className="mx-auto w-full max-w-[90rem] px-6 md:px-12">
        <SectionHeading index="04" eyebrow="Selected work" title="Built to ship, built to last." />

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {projects.map((project) => (
            <BentoCard
              key={project.slug}
              project={project}
              className={SIZE_CLASSES[project.size]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
