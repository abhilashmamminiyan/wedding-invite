import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: "#F8F3EA",
        champagne: {
          DEFAULT: "#EDE0CA",
          soft: "#F2E8D8",
        },
        espresso: {
          DEFAULT: "#49372D",
          soft: "#6A5546",
        },
        gold: {
          DEFAULT: "#B99A60",
          ink: "#85683A",
        },
        olive: {
          DEFAULT: "#777B55",
          ink: "#5F6241",
        },
        sage: "#A5A88A",
        terracotta: "#A84F37",
        cream: "#FFFCF7",
        borderTone: "#D9C9B2",
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        body: ["var(--font-lato)", "Helvetica Neue", "Arial", "sans-serif"],
      },
      boxShadow: {
        card: "0 18px 40px -24px rgba(73, 55, 45, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
