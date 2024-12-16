import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/chzzou92.github.io/", // Set this to the repository name for GitHub Pages
});
