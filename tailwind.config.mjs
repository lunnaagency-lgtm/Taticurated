/** @type {import('tailwindcss').Config} */
// Palette mirrors PALETTE in src/config/brand.ts. Keep the two in sync.
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F8F4EC',
        ivory: '#FCFAF7',
        'soft-white': '#FFFDFC',
        paper: '#EEE5D8',
        parchment: '#E5DACB',
        ink: '#2F2A28',
        brown: '#574A45',
        taupe: '#8B817B',
        blush: '#EFD9DE',
        rose: '#D8B8BF',
        blue: '#DCE6EF',
      },
      fontFamily: {
        display: ['"Fraunces Variable"', 'Georgia', 'serif'],
        sans: ['"Open Sauce Sans"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '0.75rem',
        panel: '1rem',
      },
      boxShadow: {
        card: '0 10px 28px rgba(47, 42, 40, 0.06)',
        'card-hover': '0 18px 42px rgba(47, 42, 40, 0.11)',
        panel: '0 20px 54px rgba(47, 42, 40, 0.08)',
        overlay: '0 24px 80px rgba(47, 42, 40, 0.24)',
      },
    },
  },
  plugins: [],
};
