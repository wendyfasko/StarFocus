import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        cosmic: {
          900: "var(--cosmic-900)",
          800: "var(--cosmic-800)",
          700: "var(--cosmic-700)",
          600: "var(--cosmic-600)",
          500: "var(--cosmic-500)",
          400: "var(--cosmic-400)",
          300: "var(--cosmic-300)",
          200: "var(--cosmic-200)",
          100: "var(--cosmic-100)",
          50: "var(--cosmic-50)",
        },
        neon: {
          blue: "var(--neon-blue)",
          gold: "var(--neon-gold)",
          green: "var(--neon-green)",
          purple: "var(--neon-purple)",
          pink: "var(--neon-pink)",
        },
      },
      fontFamily: {
        dyslexic: ["var(--font-dyslexic)"],
        inter: ["var(--font-inter)"],
        sans: ["var(--font-inter)"],
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        twinkle: "twinkle 3s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite alternate",
        drift: "drift 20s linear infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "1" },
        },
        glow: {
          from: { boxShadow: "0 0 20px rgba(0, 217, 255, 0.5)" },
          to: { boxShadow: "0 0 40px rgba(0, 217, 255, 0.8)" },
        },
        drift: {
          "0%": { transform: "translateX(-100vw)" },
          "100%": { transform: "translateX(100vw)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
