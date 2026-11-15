import { defineConfig } from "vitest/config";
import codspeed from "@codspeed/vitest-plugin";
import path from "node:path";

export default defineConfig({
  plugins: [codspeed()],
  test: { environment: "node", include: ["src/**/*.test.ts"] },
  resolve: { alias: { "@": path.resolve(import.meta.dirname, "src") } }
});
