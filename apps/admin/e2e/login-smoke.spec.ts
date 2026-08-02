import { expect, test } from "@playwright/test";

/**
 * Requires seeded platform admin (backend/scripts/seed.ts).
 * Local: API on :3000, admin on :3004, then `npm run admin:e2e`.
 */
const EMAIL = process.env.ADMIN_E2E_EMAIL ?? "admin@restaurant.local";
const PASSWORD = process.env.ADMIN_E2E_PASSWORD ?? "admin123";

test("admin signs in and sees overview", async ({ page }) => {
  await page.goto("/login");
  await page.getByLabel("Email").fill(EMAIL);
  await page.getByLabel("Password").fill(PASSWORD);
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page).toHaveURL(/\/$/, { timeout: 30_000 });
  await expect(page.getByRole("heading", { name: "Overview" })).toBeVisible({
    timeout: 30_000,
  });
});
