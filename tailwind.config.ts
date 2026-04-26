import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        base: "#050505",
        panel: "rgba(15, 15, 20, 0.58)",
        neon: {
          cyan: "#2ff3ff",
          purple: "#9b5cff"
        }
      },
      boxShadow: {
        glowCyan: "0 0 32px rgba(47, 243, 255, 0.18)",
        glowPurple: "0 0 32px rgba(155, 92, 255, 0.18)"
      },
      backgroundImage: {
        "grid-faint": "linear-gradient(rgba(47,243,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(155,92,255,0.05) 1px, transparent 1px)"
      },
      backdropBlur: {
        xs: "2px"
      },
      keyframes: {
        rise: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      },
      animation: {
        rise: "rise .45s ease-out"
      }
    }
  },
  plugins: [forms]
};

export default config;
