import { expect, test } from "@playwright/test";

/**
 * Happy path: home → walk-in menu → cart → place order → pay screen.
 * Requires seeded backend + `npm run customer:dev`.
 *
 * From repo root:
 *   npm run customer:e2e
 */
test("walk-in order reaches pay screen", async ({ page }) => {
  test.skip(
    process.env.SKIP_CUSTOMER_E2E === "1",
    "SKIP_CUSTOMER_E2E=1 — no seed / apps not running",
  );

  await page.goto("/");

  const walkIn = page.getByRole("link", { name: /Walk-in/i }).first();
  const hasWalkIn = await walkIn
    .waitFor({ state: "visible", timeout: 30_000 })
    .then(() => true)
    .catch(() => false);
  test.skip(!hasWalkIn, "No walk-in branch from API — seed the DB first");

  const href = await walkIn.getAttribute("href");
  expect(href).toMatch(/^\/w\/[^/]+$/);
  await page.goto(href!);
  await expect(page).toHaveURL(/\/w\/[^/]+$/, { timeout: 15_000 });

  const card = page.locator("main section ul li").first();
  await expect(card).toBeVisible({ timeout: 30_000 });
  await card.click();

  await page.getByRole("button", { name: /^Add\b/i }).click();

  await page.getByRole("link", { name: /View order/i }).click();
  await expect(page).toHaveURL(/\/cart$/, { timeout: 15_000 });
  await expect(page.getByRole("button", { name: /Place order/i })).toBeVisible();

  await page.getByRole("button", { name: /Place order/i }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();

  const orderResponse = page.waitForResponse(
    (res) =>
      res.url().includes("/customer/walk-in/") &&
      res.url().includes("/orders") &&
      res.request().method() === "POST",
    { timeout: 30_000 },
  );

  await dialog.getByRole("button", { name: /Place order/i }).click();
  const response = await orderResponse;
  expect(
    response.ok(),
    `Place order failed: ${response.status()} ${await response.text()}`,
  ).toBeTruthy();

  await expect(page).toHaveURL(/\/orders\/[^/]+$/, { timeout: 30_000 });
  await expect(page.getByRole("button", { name: /Pay with card/i })).toBeVisible({
    timeout: 30_000,
  });
  await expect(
    page.getByText(/kitchen starts cooking after you pay/i),
  ).toBeVisible();
});

