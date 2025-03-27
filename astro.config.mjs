import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import rehypeMermaid from 'rehype-mermaid';

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: 'https://distresssignal.org',
  output: 'static',
  integrations: [tailwind(), mdx()],
  markdown: {
    syntaxHighlight: {
      type: 'shiki',
      excludeLangs: ['mermaid', 'math']
    },
    rehypePlugins: [rehypeMermaid]
  },
  vite: {
      optimizeDeps: {
        include: ['mermaid']
      },
      ssr: {
        noExternal: ['mermaid-isomorphic']
      }
    }
  });
