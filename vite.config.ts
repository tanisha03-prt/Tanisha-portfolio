import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "three-vendor": ["three", "three-stdlib"],
          "gsap-vendor": ["gsap", "@gsap/react", "gsap-trial"],
          "r3f-vendor": [
            "@react-three/fiber",
            "@react-three/drei",
            "@react-three/postprocessing",
          ],
          "rapier-vendor": ["@react-three/rapier"],
        },
      },
    },
    chunkSizeWarningLimit: 1200,
  },
});
