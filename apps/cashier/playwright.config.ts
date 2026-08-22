import { defineConfig, devices } from "@playwright/test";

const baseURL = process.env.CASHIER_BASE_URL ?? "http://127.0.0.1:3005";

/**
 * Cashier login smoke against a running API + seeded cashier user.
 */
export default defineConfig({
  testDir: "./e2e",
  testMatch: "**/login-smoke.spec.ts",
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: process.env.CI ? "github" : "list",
  use: {
    ...devices["Desktop Chrome"],
    baseURL,
    trace: "on-first-retry",
  },
  timeout: 60_000,
  webServer: {
    command: "npx next start --port 3005",
    url: "http://127.0.0.1:3005",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
