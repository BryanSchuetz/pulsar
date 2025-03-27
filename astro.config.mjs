import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import rehypeMermaid from 'rehype-mermaid';

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://distresssignal.org',
  integrations: [tailwind(), mdx()],
  markdown: {
    syntaxHighlight: {
      type: 'shiki',
      excludeLangs: ['mermaid', 'math']
    },
    rehypePlugins: [
      [rehypeMermaid,{
      mermaidConfig: {
        startOnLoad: false
      }
    }]]
  },
  vite: {
      ssr: {
        noExternal: ['mermaid']
      },
      build: {
        rollupOptions: {
          external: ['mermaid-isomorphic']
        }
      }
    }
  });
