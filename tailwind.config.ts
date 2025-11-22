import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "var(--void)",
        bone: "var(--bone)",
        concrete: "var(--concrete)",
      },
      fontFamily: {
        voice: ["var(--font-voice)", "serif"],
        data: ["var(--font-data)", "sans-serif"],
      },
      // Fixes the "Arbitrary value" warnings by defining them standardly
      zIndex: {
        '100': '100',
        '1000': '1000',
        '9999': '9999',
        '10000': '10000',
      },
      transitionTimingFunction: {
        'heavy': 'cubic-bezier(0.25, 1, 0.5, 1)',
      }
    },
  },
  plugins: [],
};
export default config;