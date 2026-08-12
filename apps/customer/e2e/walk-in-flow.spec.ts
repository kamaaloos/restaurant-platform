import { expect, test, type Page } from "@playwright/test";
<<<<<<< HEAD
import { formatWalkInQueueCode } from "@org/shared";
=======
>>>>>>> Update restaurant platform apps and backend

/**
 * Cross-app walk-in path:
 * customer place + pay → kitchen Accept/Start/Ready → pickup TV READY →
 * waiter Picked up → COMPLETED.
 *
 * Prerequisites (same as other FE smokes):
 * - Seeded API (:3000)
 * - customer:dev (:3001), kitchen:dev (:3002), waiter:dev (:3003)
 *
 *   npm run customer:e2e
 */
const KITCHEN_BASE =
  process.env.KITCHEN_BASE_URL ?? "http://localhost:3002";
const WAITER_BASE =
  process.env.WAITER_BASE_URL ?? "http://localhost:3003";
const CUSTOMER_BASE =
  process.env.CUSTOMER_BASE_URL ?? "http://localhost:3001";
const KITCHEN_TOKEN =
  process.env.KITCHEN_E2E_TOKEN?.trim() ||
  "e2e00000-0001-4000-8000-000000000001";
const WAITER_TOKEN =
  process.env.WAITER_E2E_TOKEN?.trim() ||
  "e2e00000-0002-4000-8000-000000000001";
const PICKUP_TOKEN =
  process.env.PICKUP_E2E_TOKEN?.trim() ||
  "e2e00000-0003-4000-8000-000000000001";
const WALK_IN_TOKEN =
  process.env.WALK_IN_E2E_TOKEN?.trim() ||
  "e2e00000-0004-4000-8000-000000000001";

<<<<<<< HEAD
function queueCode(queueNumber: number) {
  return formatWalkInQueueCode(queueNumber) ?? String(queueNumber);
}

function ticketForQueue(page: Page, queueNumber: number) {
  const code = queueCode(queueNumber);
  return page.locator("article").filter({
    has: page.locator("p", { hasText: new RegExp(`^${code}$`) }),
=======
function ticketForQueue(page: Page, queueNumber: number) {
  return page.locator("article").filter({
    has: page.locator("p", { hasText: new RegExp(`^#${queueNumber}$`) }),
>>>>>>> Update restaurant platform apps and backend
  });
}

async function placeWalkInOrder(page: Page) {
  await page.goto(`/w/${WALK_IN_TOKEN}`);
  await expect(page).toHaveURL(new RegExp(`/w/${WALK_IN_TOKEN}`), {
    timeout: 20_000,
  });

  const card = page.locator("main section ul li").first();
  await expect(card).toBeVisible({ timeout: 30_000 });
  await card.click();
  await page.getByRole("button", { name: /^Add\b/i }).click();
  await page.getByRole("link", { name: /View order/i }).click();
  await expect(page).toHaveURL(/\/cart$/, { timeout: 15_000 });

  await page.getByRole("button", { name: /Place order/i }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();

  const orderResponse = page.waitForResponse(
    (res) =>
      res.url().includes("/customer/walk-in/") &&
      res.url().includes("/orders") &&
      res.request().method() === "POST" &&
      !res.url().includes("/pay"),
    { timeout: 30_000 },
  );

  await dialog.getByRole("button", { name: /Place order/i }).click();
  const response = await orderResponse;
  expect(
    response.ok(),
    `Place order failed: ${response.status()} ${await response.text()}`,
  ).toBeTruthy();

  const body = (await response.json()) as {
    id: string;
    queueNumber: number;
  };
  await expect(page).toHaveURL(/\/orders\/[^/]+$/, { timeout: 30_000 });
  return body;
}

test("walk-in flow: pay → kitchen → ready → waiter pickup → completed", async ({
  page,
  context,
}) => {
  test.setTimeout(180_000);
  test.skip(
    process.env.SKIP_CUSTOMER_E2E === "1",
    "SKIP_CUSTOMER_E2E=1 — apps/API not available",
  );

  const order = await placeWalkInOrder(page);
  expect(order.queueNumber).toBeGreaterThan(0);

  await expect(
    page.getByRole("button", { name: /Pay now \(Cash\)/i }),
  ).toBeVisible({ timeout: 30_000 });

  const payResponse = page.waitForResponse(
    (res) =>
      res.url().includes("/orders/") &&
      res.url().includes("/pay") &&
      res.request().method() === "POST",
    { timeout: 30_000 },
  );
  await page.getByRole("button", { name: /Pay now \(Cash\)/i }).click();
  const paid = await payResponse;
  expect(paid.ok(), `Pay failed: ${paid.status()}`).toBeTruthy();

  await expect(
    page.getByRole("button", { name: /Pay now \(Cash\)/i }),
  ).toBeHidden({ timeout: 30_000 });

  const kitchen = await context.newPage();
  await kitchen.goto(
    `${KITCHEN_BASE}/?token=${encodeURIComponent(KITCHEN_TOKEN)}`,
  );
  await expect(kitchen).toHaveURL(/\/display/, { timeout: 30_000 });

  await expect(ticketForQueue(kitchen, order.queueNumber)).toHaveCount(1, {
    timeout: 45_000,
  });

  for (const label of ["Accept", "Start", "Ready"] as const) {
    const ticket = ticketForQueue(kitchen, order.queueNumber).first();
    await expect(ticket).toBeVisible({ timeout: 20_000 });
    await ticket.getByRole("button", { name: new RegExp(`^${label}$`, "i") }).click();
  }

  // Stay READY for pickup — number remains on TV until staff confirms collection.
  await expect(page.getByText(/ready for pickup/i).first()).toBeVisible({
    timeout: 45_000,
  });

  const pickup = await context.newPage();
  await pickup.goto(
    `${CUSTOMER_BASE}/pickup/${WALK_IN_TOKEN}?token=${encodeURIComponent(PICKUP_TOKEN)}`,
  );
  await expect(
    pickup.getByText(/pickup|preparing|ready|live/i).first(),
  ).toBeVisible({ timeout: 30_000 });
  await expect(
<<<<<<< HEAD
    pickup.getByText(queueCode(order.queueNumber), { exact: true }).first(),
=======
    pickup.getByText(String(order.queueNumber), { exact: true }).first(),
>>>>>>> Update restaurant platform apps and backend
  ).toBeVisible({ timeout: 45_000 });

  const waiter = await context.newPage();
  await waiter.goto(
    `${WAITER_BASE}/?token=${encodeURIComponent(WAITER_TOKEN)}`,
  );
  await expect(waiter).toHaveURL(/\/display/, { timeout: 30_000 });
  const waiterTicket = ticketForQueue(waiter, order.queueNumber).first();
  await expect(waiterTicket).toBeVisible({ timeout: 45_000 });
  await waiterTicket.getByRole("button", { name: /^Picked up$/i }).click();

  await page.reload();
  await expect(page.getByText(/completed/i).first()).toBeVisible({
    timeout: 45_000,
  });

  await pickup.reload();
  await expect(
<<<<<<< HEAD
    pickup.getByText(queueCode(order.queueNumber), { exact: true }),
=======
    pickup.getByText(String(order.queueNumber), { exact: true }),
>>>>>>> Update restaurant platform apps and backend
  ).toHaveCount(0, { timeout: 45_000 });
});
