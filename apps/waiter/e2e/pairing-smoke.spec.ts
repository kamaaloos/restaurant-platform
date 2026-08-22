import { expect, test } from "@playwright/test";

/**
 * Requires a seeded waiter device token (backend/scripts/seed.ts E2E_FIXTURES).
 * Local: API on :3000, then `npm run waiter:e2e`.
 */
const WAITER_TOKEN =
  process.env.WAITER_E2E_TOKEN ?? "e2e00000-0002-4000-8000-000000000001";

test("pairs waiter device from token and shows display board", async ({
  page,
}) => {
  await page.goto(`/?token=${encodeURIComponent(WAITER_TOKEN)}`);
  await expect(page).toHaveURL(/\/display/, { timeout: 30_000 });
  await expect(
    page
      .getByText(/waiter display|tarjoilijanäyttö|شاشة النادل|shaashadda adeegaha/i)
      .first(),
  ).toBeVisible({
    timeout: 30_000,
  });
});
