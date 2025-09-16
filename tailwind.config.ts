import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        "background-secondary": "hsl(var(--background-secondary))",
        "background-muted": "hsl(var(--background-muted))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          glow: "hsl(var(--primary-glow))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
          hover: "hsl(var(--card-hover))",
        },
        // Scheme colors
        schemes: {
          newyear: {
            primary: "hsl(var(--newyear-primary))",
            secondary: "hsl(var(--newyear-secondary))",
          },
          wedding: {
            primary: "hsl(var(--wedding-primary))",
            secondary: "hsl(var(--wedding-secondary))",
          },
          baby: {
            primary: "hsl(var(--baby-primary))",
            secondary: "hsl(var(--baby-secondary))",
          },
          birthday: {
            primary: "hsl(var(--birthday-primary))",
            secondary: "hsl(var(--birthday-secondary))",
          },
          graduation: {
            primary: "hsl(var(--graduation-primary))",
            secondary: "hsl(var(--graduation-secondary))",
          },
          travel: {
            primary: "hsl(var(--travel-primary))",
            secondary: "hsl(var(--travel-secondary))",
          },
          christmas: {
            primary: "hsl(var(--christmas-primary))",
            secondary: "hsl(var(--christmas-secondary))",
          },
          valentine: {
            primary: "hsl(var(--valentine-primary))",
            secondary: "hsl(var(--valentine-secondary))",
          },
          retirement: {
            primary: "hsl(var(--retirement-primary))",
            secondary: "hsl(var(--retirement-secondary))",
          },
          work: {
            primary: "hsl(var(--work-primary))",
            secondary: "hsl(var(--work-secondary))",
          },
        },
      },
      backgroundImage: {
        'gradient-primary': 'var(--gradient-primary)',
        'gradient-secondary': 'var(--gradient-secondary)',
        'gradient-glass': 'var(--gradient-glass)',
        'gradient-countdown': 'var(--gradient-countdown)',
      },
      boxShadow: {
        'elegant': 'var(--shadow-elegant)',
        'glass': 'var(--shadow-glass)',
        'glow': 'var(--shadow-glow)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
