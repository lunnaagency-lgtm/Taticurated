/** @type {import('tailwindcss').Config} */
// Palette mirrors PALETTE in src/config/brand.ts. Keep the two in sync.
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        wine: '#6E2433',
        'wine-deep': '#511824',
        blush: '#F5E4E7',
        'blush-deep': '#E9C6CD',
        cream: '#FBF7F2',
        ink: '#241C1E',
        gold: '#C9A227',
      },
      fontFamily: {
        // Editorial serif for display (echoes her badge) + clean sans for body.
        display: ['"Playfair Display Variable"', 'Georgia', 'serif'],
        sans: ['"Open Sauce Sans"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
