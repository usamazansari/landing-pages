import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import netlify from '@astrojs/netlify';
import markdoc from '@astrojs/markdoc';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind(), markdoc(), mdx()],
  output: 'server',
  adapter: netlify(),
});
