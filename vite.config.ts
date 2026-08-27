/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: { environment: 'jsdom', passWithNoTests: true, exclude: ['**/e2e/**', '**/node_modules/**', '**/dist/**'] },
  preview: { port: 4173 },
})
