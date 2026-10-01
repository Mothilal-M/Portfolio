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
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
