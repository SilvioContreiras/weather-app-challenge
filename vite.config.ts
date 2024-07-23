import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { configDefaults } from 'vitest/config';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    setupFiles: ['setupTests.ts'], // Make sure this path is correct
    globals: true,
    environment: 'jsdom',
    exclude: [...configDefaults.exclude],
  },
});
