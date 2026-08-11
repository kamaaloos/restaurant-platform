import { defineConfig, devices } from "@playwright/test";

/**
 * Customer Playwright suite:
 * - walk-in-smoke: place order → pay screen
 * - walk-in-flow: pay → kitchen → READY on pickup TV → waiter Picked up → COMPLETED
 * - dine-in-flow: QR → kitchen → waiter → cashier → COMPLETED (+ fire-next)
 *
 * Prerequisites:
 * - Backend API on :3000 with seed (`cd backend && npm run seed`)
 * - customer:dev (:3001), kitchen:dev (:3002), waiter:dev (:3003), cashier:dev (:3005)
 *
 * Run from repo root:
 *   npm run customer:e2e
 *
 * Env: CUSTOMER_BASE_URL, KITCHEN_BASE_URL, WAITER_BASE_URL, CASHIER_BASE_URL,
 *      KITCHEN_E2E_TOKEN, WAITER_E2E_TOKEN, PICKUP_E2E_TOKEN, WALK_IN_E2E_TOKEN,
 *      TABLE_E2E_TOKEN, SKIP_CUSTOMER_E2E=1
 */
export default defineConfig({
  testDir: "./e2e",
  timeout: 120_000,
  fullyParallel: false,
  retries: 0,
  workers: 1,
  use: {
    ...devices["Desktop Chrome"],
    baseURL: process.env.CUSTOMER_BASE_URL ?? "http://localhost:3001",
    trace: "on-first-retry",
  },
});
