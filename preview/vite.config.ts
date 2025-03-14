import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tailwindcss from 'tailwindcss'

// Import your project's Tailwind config
// @ts-ignore
import tailwindConfig from '../tailwind.config.mjs'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
  },
  server: {
    port: 3000,
    open: true, // Automatically open browser
    hmr: {
      overlay: true, // Show errors as overlay
    },
  },
  css: {
    postcss: {
      plugins: [
        // Use your project's tailwind config
        // @ts-ignore
        tailwindcss({
          ...tailwindConfig,
          // Extend content paths to include preview files
          content: [
            './preview/**/*.{js,ts,jsx,tsx}',
            '../src/**/*.{js,ts,jsx,tsx,mdx}',
          ],
        }),
      ],
    },
  },
})
