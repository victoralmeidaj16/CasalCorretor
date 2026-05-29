import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#050505",
        secondary: "#111111",
        accent: "#C9974D",
        "gold-soft": "#E7D6B7",
        "warm-highlight": "#A96B38",
        "text-primary": "#F4F1EC",
        muted: "#B7B0A6",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-montserrat)", "sans-serif"],
      },
      keyframes: {
        "gold-glow": {
          "0%, 100%": { boxShadow: "0 0 8px 0 rgba(201,151,77,0.15)" },
          "50%": { boxShadow: "0 0 20px 4px rgba(201,151,77,0.35)" },
        },
      },
      animation: {
        "gold-glow": "gold-glow 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
