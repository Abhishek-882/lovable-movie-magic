import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:10000',
        changeOrigin: true,
      },
      '/health': {
        target: 'http://localhost:10000',
        changeOrigin: true,
      }
    }
  },
  build: {
    outDir: './dist/client'  // Explicit output path
    emptyOutDir: true,
    sourcemap: process.env.NODE_ENV !== 'production',
  }
});
