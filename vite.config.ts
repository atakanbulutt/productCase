import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // React ve temel kütüphaneler
          "react-vendor": ["react", "react-dom"],

          // Routing
          router: ["react-router-dom"],

          // State management
          state: ["@reduxjs/toolkit", "react-redux"],

          // UI Libraries
          "ui-components": [
            "@radix-ui/react-dialog",
            "@radix-ui/react-alert-dialog",
            "@radix-ui/react-slot",
            "@radix-ui/react-toast",
          ],

          // Icons
          icons: ["lucide-react"],

          // Utilities
          utils: ["clsx", "class-variance-authority", "tailwind-merge"],
        },
      },
    },
    // Chunk size uyarı limitini artır
    chunkSizeWarningLimit: 1000,
  },

  // Dependency optimizasyonu
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "@reduxjs/toolkit",
      "react-redux",
    ],
  },
});
