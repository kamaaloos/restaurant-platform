import { expect, test } from "@playwright/test";

/**
 * CI-friendly smoke: portfolio route renders without API/seed.
 * Run: npm run test:e2e:smoke --workspace=customer
 */
test("portfolio page renders Hasan Kamal", async ({ page }) => {
  await page.goto("/portfolio");
  await expect(page.getByText(/Hasan Kamal/i).first()).toBeVisible({
    timeout: 30_000,
  });
  await expect(
    page.getByRole("heading", {
      name: /Building Reliable Software/i,
    }),
  ).toBeVisible();
});
