import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import markdoc from "@astrojs/markdoc";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind(), markdoc(), mdx()],
  output: "server",
  adapter: vercel({
    webAnalytics: {
      enabled: true
    }
  })
});