import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import devtoolBreakpoints from "astro-devtool-breakpoints";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), devtoolBreakpoints()]
});