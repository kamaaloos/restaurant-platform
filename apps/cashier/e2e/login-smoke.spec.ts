import { expect, test } from "@playwright/test";

/**
 * Requires seeded cashier user (backend/scripts/seed.ts).
 * Local: API on :3000, cashier on :3005, then `npm run cashier:e2e`.
 */
const EMAIL = process.env.CASHIER_E2E_EMAIL ?? "cashier@restaurant.local";
const PASSWORD = process.env.CASHIER_E2E_PASSWORD ?? "cashier123";

test("cashier signs in and sees payments board", async ({ page }) => {
  await page.goto("/login");
  await page.getByLabel("Email").fill(EMAIL);
  await page.getByLabel("Password").fill(PASSWORD);
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page).toHaveURL(/\/$/, { timeout: 30_000 });
  await expect(page.getByRole("heading", { name: "Payments" })).toBeVisible({
    timeout: 30_000,
  });
});
