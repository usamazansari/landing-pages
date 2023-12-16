import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import markdoc from '@astrojs/markdoc';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), react(), tailwind(), markdoc()],
});
