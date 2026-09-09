import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        carbon: '#0B0B0B',
        darkSurface: '#111111',
        warmWhite: '#F9F8F6',
        alabaster: '#F9F8F6',
        limestone: '#F2EFE9',
        parchment: '#EAE5DC',
        charcoal: '#181614',
        ink: '#181614',
        graphite: '#47423B',
        stoneMuted: '#736B61',
        stoneCaption: '#8C8478',
        muted: '#736B61',
        bronze: '#9E7D47',
        bronzeHover: '#B38E54',
        bronzeAntique: '#8B6938',
        champagne: '#C5A880',
        borderMuted: '#E2DDD5',
        borderLight: '#E2DDD5',
        borderHover: 'rgba(158, 125, 71, 0.4)',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Cormorant Garamond', 'DM Serif Display', 'serif'],
        sans: ['var(--font-sans)', 'Inter', 'Manrope', 'sans-serif'],
      },
      letterSpacing: {
        architectural: '0.22em',
        widestEditorial: '0.3em',
      },
    },
  },
  plugins: [],
};

export default config;
