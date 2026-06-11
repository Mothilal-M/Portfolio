import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // Old GitHub Pages URLs that are still indexed by search engines
    return [
      {
        source: "/animated-portfolio.html",
        destination: "/",
        permanent: true,
      },
      {
        source: "/index.html",
        destination: "/",
        permanent: true,
      },
      // Old OG/profile image URL still referenced by social caches
      {
        source: "/mothilal.png",
        destination: "/images/mothilal.jpg",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
