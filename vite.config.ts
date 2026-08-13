import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Static site built with vite-react-ssg: every route is pre-rendered to HTML at
// build time (SEO-complete), then hydrated for client interactions. Output is a
// plain static `dist/` — no Node server to run (or to get compromised).
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  ssgOptions: {
    // Emit /services/index.html (clean URLs on any static host).
    dirStyle: "nested",
    script: "async",
    entry: "src/main.tsx",
  },
});
