import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    allowedHosts: ["app.snehasboutique.online"],
    port: 4182,
    strictPort: true,
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true
      }
    }
  },
  preview: {
    host: true,
    port: 4182,
    strictPort: true,
    allowedHosts: ["app.snehasboutique.online"]
  }
});
