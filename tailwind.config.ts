import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
        xl: "4rem",
      },
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        virgo: {
          teal: {
            DEFAULT: "#1D646D",
            50: "#E6F4F6",
            100: "#ACEDF8",
            300: "#90D1DB",
            500: "#1D646D",
            700: "#004B53",
            900: "#001F23",
          },
          lime: {
            DEFAULT: "#86BC25",
            100: "#BAF55B",
            300: "#9FD840",
            500: "#86BC25",
            700: "#466800",
            900: "#122A00",
          },
          accent: {
            DEFAULT: "#D4E700",
            300: "#DBEE14",
            500: "#D4E700",
            700: "#586000",
          },
        },
        surface: {
          DEFAULT: "#F8FAFA",
          bright: "#FFFFFF",
          soft: "#F2F4F4",
          muted: "#ECEEEE",
          raised: "#E6E8E9",
          tint: "#E1E3E3",
        },
        ink: {
          DEFAULT: "#191C1D",
          muted: "#3F484A",
          soft: "#6F797A",
          faint: "#BFC8CA",
        },
        success: {
          DEFAULT: "#466800",
          soft: "#BAF55B",
        },
        warning: {
          DEFAULT: "#8A6A00",
          soft: "#FFE8A0",
        },
        danger: {
          DEFAULT: "#BA1A1A",
          soft: "#FFDAD6",
        },
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "ui-sans-serif", "system-ui"],
        display: ["var(--font-jakarta)", "ui-sans-serif", "system-ui"],
      },
      fontSize: {
        "display-xl": ["clamp(2.5rem, 5vw, 3.5rem)", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" }],
        "display-lg": ["clamp(2rem, 4vw, 3rem)", { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "700" }],
        "headline-xl": ["3rem", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "700" }],
        "headline-lg": ["2rem", { lineHeight: "1.3", letterSpacing: "-0.01em", fontWeight: "600" }],
        "headline-md": ["1.5rem", { lineHeight: "1.4", fontWeight: "600" }],
        "body-lg": ["1.125rem", { lineHeight: "1.6" }],
        "body-md": ["1rem", { lineHeight: "1.6" }],
        "label-sm": ["0.875rem", { lineHeight: "1", letterSpacing: "0.05em", fontWeight: "600" }],
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        sm: "0.25rem",
        md: "0.75rem",
        lg: "1rem",
        xl: "1.5rem",
      },
      boxShadow: {
        soft: "0 8px 24px -12px rgba(0, 75, 83, 0.12)",
        card: "0 1px 2px rgba(25,28,29,0.04), 0 8px 24px -12px rgba(0, 75, 83, 0.08)",
        lift: "0 20px 40px -20px rgba(0, 75, 83, 0.25)",
      },
      spacing: {
        section: "5rem",
        "section-lg": "7.5rem",
      },
      maxWidth: {
        prose: "65ch",
      },
    },
  },
  plugins: [],
};

export default config;
