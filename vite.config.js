import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/react/",
  build: {
    outDir: "react-dist",
    emptyOutDir: true,
    rollupOptions: { input: "react.html" }
  }
});
