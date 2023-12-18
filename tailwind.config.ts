import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,mdx,tsx}'],
  darkMode: ['class', '[data-mantine-color-scheme="dark"]'],
  theme: {
    colors: {},
    screens: {
      xs: '36em',
      sm: '48em',
      md: '62em',
      lg: '75em',
      xl: '88em',
    },
    extend: {
      spacing: {
        xs: 'calc(0.75rem * var(--mantine-scale))',
        sm: 'calc(0.875rem * var(--mantine-scale))',
        md: 'calc(1rem * var(--mantine-scale))',
        lg: 'calc(1.125rem * var(--mantine-scale))',
        xl: 'calc(1.25rem * var(--mantine-scale))',
      },
    },
  },
  plugins: [typography],
};
