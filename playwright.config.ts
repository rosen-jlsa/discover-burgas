import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 30_000,
  expect: { timeout: 8_000 },
  use: { baseURL: "http://localhost:3000", trace: "retain-on-failure" },
  webServer: { command: "npm run start", url: "http://localhost:3000/bg", reuseExistingServer: false },
  projects: [
    { name: "mobile-375", use: { ...devices["iPhone 13 Mini"], browserName: "chromium", viewport: { width: 375, height: 812 }, extraHTTPHeaders: { "x-forwarded-for": "198.51.100.31" } } },
    { name: "mobile", use: { ...devices["Pixel 7"], browserName: "chromium", viewport: { width: 390, height: 844 }, extraHTTPHeaders: { "x-forwarded-for": "198.51.100.32" } } },
    { name: "tablet-768", use: { ...devices["Desktop Chrome"], viewport: { width: 768, height: 1024 }, extraHTTPHeaders: { "x-forwarded-for": "198.51.100.33" } } },
    { name: "desktop-1024", use: { ...devices["Desktop Chrome"], viewport: { width: 1024, height: 900 }, extraHTTPHeaders: { "x-forwarded-for": "198.51.100.34" } } },
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 1000 }, extraHTTPHeaders: { "x-forwarded-for": "198.51.100.35" } } }
  ]
});
