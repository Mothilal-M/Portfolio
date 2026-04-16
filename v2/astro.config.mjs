import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://mothilal.xyz',
  integrations: [
    tailwind({ applyBaseStyles: false }),
    mdx(),
    react(),
    sitemap(),
  ],
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    ssr: {
      noExternal: ['gsap'],
    },
  },
});
