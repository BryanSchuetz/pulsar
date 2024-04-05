import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import devtoolBreakpoints from "astro-devtool-breakpoints";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: 'https://distresssignal.org',
  integrations: [tailwind(), devtoolBreakpoints(), mdx()]
});