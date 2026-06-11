import { allSchemas } from "@/lib/jsonld";
import { person } from "@/lib/content";

export default function Home() {
  return (
    <main id="main" className="flex-1">
      {allSchemas().map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <section className="flex min-h-screen items-center justify-center">
        <h1 className="font-display text-display leading-none tracking-tight">
          {person.name}
        </h1>
      </section>
    </main>
  );
}
