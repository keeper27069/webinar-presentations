import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  // jsxImportSource: every JSX text child goes through src/emoji/jsx-runtime (emoji → Twemoji SVG)
  plugins: [react({ jsxImportSource: '@emoji' })],
  resolve: {
    alias: {
      '@emoji': fileURLToPath(new URL('./src/emoji', import.meta.url)),
      '@engine': fileURLToPath(new URL('./src/engine', import.meta.url)),
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    chunkSizeWarningLimit: 1200,
  },
});
