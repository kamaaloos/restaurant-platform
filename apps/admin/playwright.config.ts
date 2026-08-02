import { defineConfig, devices } from "@playwright/test";

const baseURL = process.env.ADMIN_BASE_URL ?? "http://127.0.0.1:3004";

export default defineConfig({
  testDir: "./e2e",
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
});
