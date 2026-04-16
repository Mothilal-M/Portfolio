import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: 'rgb(var(--ink) / <alpha-value>)',
        paper: 'rgb(var(--paper) / <alpha-value>)',
        signal: 'rgb(var(--signal) / <alpha-value>)',
        cyan: 'rgb(var(--cyan) / <alpha-value>)',
        mute: 'rgb(var(--mute) / <alpha-value>)',
        void: 'rgb(var(--void) / <alpha-value>)',
        bg: 'rgb(var(--bg) / <alpha-value>)',
        fg: 'rgb(var(--fg) / <alpha-value>)',
        rule: 'rgb(var(--rule) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['"Inter Variable"', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Fraunces', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono Variable"', '"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        display: ['clamp(3rem, 9vw, 8rem)', { lineHeight: '0.95', letterSpacing: '-0.02em' }],
        'section-title': ['clamp(2rem, 5vw, 3.75rem)', { lineHeight: '1.05', letterSpacing: '-0.015em' }],
        quote: ['clamp(1.5rem, 4vw, 3rem)', { lineHeight: '1.25', letterSpacing: '-0.01em' }],
      },
      maxWidth: {
        prose: '68ch',
        shell: '80rem',
      },
      spacing: {
        section: 'clamp(5rem, 12vw, 10rem)',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
} satisfies Config;
