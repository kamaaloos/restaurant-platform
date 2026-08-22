import { defineConfig, devices } from "@playwright/test";

/**
 * Lightweight smoke suite for CI — no API/seed required.
 * Starts the built Next server automatically when CI=true.
 */
export default defineConfig({
  testDir: "./e2e",
  testMatch: "**/portfolio-smoke.spec.ts",
  timeout: 60_000,
  fullyParallel: false,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  use: {
    ...devices["Desktop Chrome"],
    baseURL: process.env.CUSTOMER_BASE_URL ?? "http://127.0.0.1:3001",
    trace: "on-first-retry",
  },
  webServer: {
    command: "npx next start --port 3001",
    url: "http://127.0.0.1:3001",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
