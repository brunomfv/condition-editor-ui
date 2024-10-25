/// <reference types="vitest" />
/// <reference types="vitest/globals" />

import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/**',
        'src/test/**',
      ],
    },
    include: ['src/**/*.{test,spec}.{js,jsx,ts,tsx}'],
    css: true
  },
})