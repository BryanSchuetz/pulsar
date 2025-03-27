import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";


import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://distresssignal.org',
  integrations: [tailwind(), mdx()],
  markdown: {
    syntaxHighlight: {
      type: 'shiki',
    }
  },
  vite: {
    }
  });
