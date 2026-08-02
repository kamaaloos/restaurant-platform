import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  timeout: 60_000,
  fullyParallel: false,
  use: {
    ...devices["Desktop Chrome"],
    baseURL: process.env.KITCHEN_BASE_URL ?? "http://localhost:3002",
  },
});
