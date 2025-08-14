import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: "@", replacement: resolve(__dirname, "./src") }],
  },
  test: {
    browser: {
      enabled: true,
      instances: [{ browser: "chromium" }],
      provider: "playwright",
    },
    coverage: {
      provider: "istanbul",
      reporter: ["text", "json", "html"],
    },
    environment: "jsdom",
    globals: true,
    setupFiles: resolve(__dirname, "./src/tests/setup.ts"),
  },
});
