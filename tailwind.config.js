/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cava: {
          // Official CAVA Brand Colors
          'liquid-gold': '#f9d000',
          'mid-yellow': '#f4de60',
          'cream': '#fff8e8',
          'light-yellow': '#ffeab6',
          'olive': '#959502',
          'black': '#00020d',
          'terracotta': '#CD5C5C',

          // Yellow scale (based on official primary colors)
          yellow: {
            50: '#fffef5',
            100: '#fffce8',
            200: '#fff8e8',  // CAVA Cream
            300: '#ffeab6',  // CAVA Light Yellow
            400: '#f4de60',  // CAVA Mid Yellow
            500: '#f9d000',  // CAVA Liquid Gold
            600: '#d4b000',
            700: '#a88f00',
            800: '#7d6a00',
            900: '#524500',
          },

          // Olive scale (based on official CAVA Olive)
          olive: {
            50: '#fafaf2',
            100: '#f5f5e0',
            200: '#ebebc2',
            300: '#d9d998',
            400: '#c5c56e',
            500: '#959502',  // CAVA Olive
            600: '#7a7a02',
            700: '#5f5f01',
            800: '#444401',
            900: '#2a2a01',
          },
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
}
