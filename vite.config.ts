import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

// Convert import.meta.url to __dirname equivalent
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  
  // Base path for production (adjust if using subpath)
  base: mode === 'production' ? '/' : '/',
  
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // Add other aliases if needed
    },
  },

  server: {
    port: 5173, // Vite default dev port
    host: true, // Accessible on network
    proxy: {
      // Proxy API requests to Express server in development
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
    outDir: path.resolve(__dirname, "../dist/client"), // Build into shared dist folder
    emptyOutDir: true, // Clear directory before build
    sourcemap: mode !== 'production', // Enable sourcemaps in dev
    rollupOptions: {
      output: {
        // Better chunking for production
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    }
  },

  preview: {
    port: 5173, // Different from Express port
    host: true
  }
}));
