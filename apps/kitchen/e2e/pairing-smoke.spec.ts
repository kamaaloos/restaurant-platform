import { expect, test } from "@playwright/test";

/**
 * Kitchen pairing smoke — uses seeded E2E kitchen device token by default.
 * Override with KITCHEN_E2E_TOKEN if needed.
 *
 * Requires API + seed (see CI `e2e-staff` job or local `backend` seed).
 */
const SEED_KITCHEN_TOKEN = "e2e00000-0001-4000-8000-000000000001";

test("pairs with device token and opens display", async ({ page }) => {
  const token =
    process.env.KITCHEN_E2E_TOKEN?.trim() || SEED_KITCHEN_TOKEN;

  await page.goto(`/?token=${encodeURIComponent(token)}`);
  await expect(page).toHaveURL(/\/display/, { timeout: 30_000 });
  await expect(
    page.getByText(/kitchen display|keittiönäyttö|شاشة المطبخ|shaashadda jikada/i).first(),
  ).toBeVisible({
    timeout: 30_000,
  });
});
