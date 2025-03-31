import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "0.0.0.0", // Changed from "::" to work better with Render
    port: process.env.PORT ? parseInt(process.env.PORT) : 10000, // Use Render's PORT or default to 10000
    strictPort: true, // Exit if port is unavailable
  },
  preview: {
    port: process.env.PORT ? parseInt(process.env.PORT) : 10000, // For production preview
    host: "0.0.0.0",
  },
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
