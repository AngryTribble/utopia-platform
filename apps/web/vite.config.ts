import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  base: "/utopia-platform/",
  resolve: {
    alias: {
      "@utopia/card-engine": path.resolve(
        __dirname,
        "../../packages/card-engine/index.ts"
      ),
      "@utopia/sample-cards": path.resolve(
        __dirname,
        "../../data/sample-cards.ts"
      ),
    },
  },
});
