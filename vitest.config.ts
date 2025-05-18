import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": "/Users/icycandle/IdeaProjects/Literary-Kitchen/src",
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    include: ["tests/unit/**/*.test.ts"],
    coverage: {
      reporter: ["text", "json", "html"],
    },
  },
});
