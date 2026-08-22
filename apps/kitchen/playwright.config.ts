import { defineConfig, devices } from "@playwright/test";

/**
 * Kitchen pairing smoke against a running API + seeded device token.
 * CI starts Next via webServer; locally reuse an existing `npm run start` if present.
 */
export default defineConfig({
  testDir: "./e2e",
  testMatch: "**/pairing-smoke.spec.ts",
  timeout: 60_000,
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: process.env.CI ? "github" : "list",
  use: {
    ...devices["Desktop Chrome"],
    baseURL: process.env.KITCHEN_BASE_URL ?? "http://127.0.0.1:3002",
    trace: "on-first-retry",
  },
  webServer: {
    command: "npx next start --port 3002",
    url: "http://127.0.0.1:3002",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
