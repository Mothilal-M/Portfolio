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
    ];
  },
};

export default nextConfig;
