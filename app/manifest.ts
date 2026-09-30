import type { MetadataRoute } from "next";
import { person, site } from "@/lib/content";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${person.name} — Software Engineer & Python Developer`,
    short_name: `${person.firstName} M`,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0F0E0C",
    theme_color: "#0F0E0C",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
