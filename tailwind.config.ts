import typography from '@tailwindcss/typography';
import { mantineColors } from './src/config/tailwind/mantine-colors';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,mdx,tsx}'],
  darkMode: ['class', '[data-mantine-color-scheme="dark"]'],
  theme: {
    colors: {},
  },
  plugins: [typography],
};

