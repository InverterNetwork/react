// @ts-check

/** @type {import("tailwindcss").Config} */
export default {
  prefix: 'in--',
  darkMode: ['class'],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--in--radius)',
        md: 'calc(var(--in--radius) - 2px)',
        sm: 'calc(var(--in--radius) - 4px)',
      },
      colors: {
        background: 'hsl(var(--in--background))',
        foreground: 'hsl(var(--in--foreground))',
        card: {
          DEFAULT: 'hsl(var(--in--card))',
          foreground: 'hsl(var(--in--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--in--popover))',
          foreground: 'hsl(var(--in--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--in--primary))',
          foreground: 'hsl(var(--in--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--in--secondary))',
          foreground: 'hsl(var(--in--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--in--muted))',
          foreground: 'hsl(var(--in--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--in--accent))',
          foreground: 'hsl(var(--in--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--in--destructive))',
          foreground: 'hsl(var(--in--destructive-foreground))',
        },
        border: 'hsl(var(--in--border))',
        input: 'hsl(var(--in--input))',
        ring: 'hsl(var(--in--ring))',
        chart: {
          1: 'hsl(var(--in--chart-1))',
          2: 'hsl(var(--in--chart-2))',
          3: 'hsl(var(--in--chart-3))',
          4: 'hsl(var(--in--chart-4))',
          5: 'hsl(var(--in--chart-5))',
        },
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        pop: {
          '0%': {
            transform: 'scale(.90)',
          },
          '40%': {
            transform: 'scale(1.02)',
          },
          '100%': {
            transform: 'scale(1)',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        pop: 'pop 0.25s ease-in-out',
      },
    },
  },
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  plugins: [require('@tailwindcss/typography'), require('tailwindcss-animate')],
}