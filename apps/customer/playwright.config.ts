import { defineConfig, devices } from "@playwright/test";

/**
 * Thin walk-in smoke.
 *
 * Prerequisites:
 * - Backend API on :3000 with seeded walk-in branch + menu
 * - Customer app: `npm run customer:dev` (port 3001)
 *
 * Run from repo root:
 *   npm exec playwright test --workspace=customer
 * or:
 *   npm run test:e2e --workspace=customer
 *
 * Optional: CUSTOMER_BASE_URL (default http://localhost:3001)
 * Skip when API/seed unavailable — test skips if no walk-in link appears.
 */
export default defineConfig({
  testDir: "./e2e",
  timeout: 90_000,
  fullyParallel: false,
  retries: 0,
  use: {
    ...devices["Desktop Chrome"],
    baseURL: process.env.CUSTOMER_BASE_URL ?? "http://localhost:3001",
    trace: "on-first-retry",
  },
});
