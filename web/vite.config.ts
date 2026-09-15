import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Base is set to "./" so the built site works both on a custom host
// and under a GitHub Pages subpath.
export default defineConfig({
  plugins: [react()],
  base: "./",
});
