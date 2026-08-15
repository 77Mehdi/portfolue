import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ["Orbitron", "ui-sans-serif", "system-ui"],
        inter: ["Inter", "ui-sans-serif", "system-ui"],
      },
      colors: {
        void: "#05040a",
        neon: {
          blue: "#38bdf8",
          cyan: "#22d3ee",
          violet: "#a855f7",
          magenta: "#e879f9",
        },
      },
      boxShadow: {
        glow: "0 0 30px rgba(34, 211, 238, 0.35)",
        violet: "0 0 36px rgba(168, 85, 247, 0.3)",
      },
      backgroundImage: {
        "radial-grid":
          "radial-gradient(circle at 20% 10%, rgba(56,189,248,.24), transparent 28%), radial-gradient(circle at 82% 18%, rgba(168,85,247,.24), transparent 28%), radial-gradient(circle at 50% 90%, rgba(232,121,249,.16), transparent 34%)",
      },
    },
  },
  plugins: [],
} satisfies Config;
