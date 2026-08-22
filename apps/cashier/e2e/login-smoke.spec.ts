import { expect, test } from "@playwright/test";

/**
 * Requires seeded cashier user (backend/scripts/seed.ts).
 * Local: API on :3000, then `npm run cashier:e2e`.
 */
const EMAIL = process.env.CASHIER_E2E_EMAIL ?? "cashier@restaurant.local";
const PASSWORD = process.env.CASHIER_E2E_PASSWORD ?? "cashier123";

test("cashier signs in and sees payments board", async ({ page }) => {
  await page.goto("/login");
  await page.getByLabel(/email|sähköposti|البريد|iimayl/i).fill(EMAIL);
  await page.getByLabel(/password|salasana|كلمة|furaha/i).fill(PASSWORD);
  await page.getByRole("button", { name: /sign in|kirjaudu|تسجيل|soo gal/i }).click();
  await expect(page).toHaveURL(/\/$/, { timeout: 30_000 });
  await expect(
    page.getByRole("heading", { name: /payments|maksut|المدفوعات|lacagaha/i }),
  ).toBeVisible({
    timeout: 30_000,
  });
});
