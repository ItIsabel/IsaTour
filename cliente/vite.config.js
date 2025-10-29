
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3000,
    open: true,
    headers: {
      'Content-Security-Policy': "script-src 'self' 'unsafe-eval';"
    }
  },
  build: {
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
});
