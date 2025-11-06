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
          // Mediterranean-inspired warm tones
          olive: {
            50: '#f6f7f1',
            100: '#eceee0',
            200: '#d8dcc1',
            300: '#bec49a',
            400: '#a5ad75',
            500: '#8a9559',
            600: '#6d7846',
            700: '#565d39',
            800: '#474d31',
            900: '#3d412b',
          },
          terracotta: {
            50: '#fdf5f3',
            100: '#fbe9e4',
            200: '#f7d4ca',
            300: '#f1b5a4',
            400: '#e88c6f',
            500: '#dc6842',
            600: '#c94f2e',
            700: '#a83f25',
            800: '#8b3623',
            900: '#743122',
          },
          warm: {
            50: '#fdfbf9',
            100: '#faf6f1',
            200: '#f5ede1',
            300: '#eddcc8',
            400: '#e3c7a5',
            500: '#d5a876',
            600: '#c88d54',
            700: '#b87541',
            800: '#965f37',
            900: '#7a4f30',
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
