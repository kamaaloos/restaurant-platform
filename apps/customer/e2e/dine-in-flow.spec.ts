import { expect, test, type APIRequestContext, type Page } from "@playwright/test";

/**
 * Cross-app dine-in path:
 * table QR place → kitchen Accept/Start/Ready → waiter serve → cashier pay → COMPLETED
 * + fire-next path (APPETIZER held MAIN) via API place + waiter "Fire next course".
 *
 * Prerequisites:
 * - Seeded API (:3000)
 * - customer:dev (:3001), kitchen:dev (:3002), waiter:dev (:3003), cashier:dev (:3005)
 *
 *   npm run customer:e2e
 */
const API_BASE = (
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000/api"
).replace(/\/$/, "");
const KITCHEN_BASE =
  process.env.KITCHEN_BASE_URL ?? "http://localhost:3002";
const WAITER_BASE =
  process.env.WAITER_BASE_URL ?? "http://localhost:3003";
const CASHIER_BASE =
  process.env.CASHIER_BASE_URL ?? "http://localhost:3005";
const KITCHEN_TOKEN =
  process.env.KITCHEN_E2E_TOKEN?.trim() ||
  "e2e00000-0001-4000-8000-000000000001";
const WAITER_TOKEN =
  process.env.WAITER_E2E_TOKEN?.trim() ||
  "e2e00000-0002-4000-8000-000000000001";
const TABLE_TOKEN =
  process.env.TABLE_E2E_TOKEN?.trim() ||
  "c295c2df-cc43-49bd-8bd5-5f7484fa9061";
const CASHIER_EMAIL =
  process.env.CASHIER_E2E_EMAIL ?? "cashier@restaurant.local";
const CASHIER_PASSWORD =
  process.env.CASHIER_E2E_PASSWORD ?? "cashier123";

function ticketForGuest(page: Page, guestName: string) {
  return page.locator("article").filter({
    has: page.getByText(guestName, { exact: false }),
  });
}

function uniqueGuest(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}`;
}

async function placeDineInViaUi(page: Page, guestName: string) {
  const menuPromise = page.waitForResponse(
    (res) =>
      res.url().includes(`/customer/${TABLE_TOKEN}/menu`) &&
      res.request().method() === "GET" &&
      res.ok(),
    { timeout: 30_000 },
  );
  await page.goto(`/t/${TABLE_TOKEN}`);
  await expect(page).toHaveURL(new RegExp(`/t/${TABLE_TOKEN}`), {
    timeout: 20_000,
  });
  const menuBody = (await (await menuPromise).json()) as {
    table: { number: string };
  };
  const tableNumber = menuBody.table.number;

  const card = page.locator("main section ul li").first();
  await expect(card).toBeVisible({ timeout: 30_000 });
  await card.click();
  await page.getByRole("button", { name: /^Add\b/i }).click();
  await page.getByRole("link", { name: /View order/i }).click();
  await expect(page).toHaveURL(/\/cart$/, { timeout: 15_000 });

  // Avoid /name/i — it matches the Language switcher label.
  await page.locator("#guest").fill(guestName);
  await page.getByRole("button", { name: /Place order/i }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();

  const orderResponse = page.waitForResponse(
    (res) =>
      res.url().includes(`/customer/${TABLE_TOKEN}/orders`) &&
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
    status: string;
  };
  expect(body.status).toBe("NEW");
  await expect(page).toHaveURL(/\/orders\/[^/]+$/, { timeout: 30_000 });
  await expect(
    page.getByRole("button", { name: /Pay now/i }),
  ).toHaveCount(0);
  return { ...body, tableNumber };
}

async function placeMultiCourseViaApi(
  request: APIRequestContext,
  guestName: string,
) {
  const menuRes = await request.get(
    `${API_BASE}/customer/${TABLE_TOKEN}/menu`,
  );
  expect(menuRes.ok(), `Menu failed: ${menuRes.status()}`).toBeTruthy();
  const menu = (await menuRes.json()) as {
    table: { number: string };
    categories: { menuItems?: { id: string }[] }[];
  };
  const itemId = menu.categories
    .flatMap((c) => c.menuItems ?? [])
    .map((i) => i.id)[0];
  expect(itemId, "seeded menu should have an item").toBeTruthy();

  const orderRes = await request.post(
    `${API_BASE}/customer/${TABLE_TOKEN}/orders`,
    {
      data: {
        customerName: guestName,
        items: [
          { menuItemId: itemId, quantity: 1, course: "APPETIZER" },
          { menuItemId: itemId, quantity: 1, course: "MAIN" },
        ],
      },
    },
  );
  expect(
    orderRes.ok(),
    `Multi-course place failed: ${orderRes.status()} ${await orderRes.text()}`,
  ).toBeTruthy();
  const body = (await orderRes.json()) as { id: string; status: string };
  return { ...body, tableNumber: menu.table.number };
}

async function kitchenAdvanceTo(
  page: Page,
  guestName: string,
  labels: readonly string[],
) {
  for (const label of labels) {
    const ticket = ticketForGuest(page, guestName).first();
    await expect(ticket).toBeVisible({ timeout: 45_000 });
    await ticket
      .getByRole("button", { name: new RegExp(`^${label}$`, "i") })
      .click();
  }
}

async function cashierPayCash(
  page: Page,
  guestName: string,
  tableNumber: string,
) {
  await page.goto(`${CASHIER_BASE}/login`);
  await page.getByLabel("Email").fill(CASHIER_EMAIL);
  await page.getByLabel("Password").fill(CASHIER_PASSWORD);
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page.getByRole("heading", { name: "Payments" })).toBeVisible({
    timeout: 30_000,
  });

  const tableLabel = new RegExp(`Table ${tableNumber}\\b`, "i");
  const card = ticketForGuest(page, guestName).filter({
    has: page.getByText(tableLabel),
  });
  await expect(card.first()).toBeVisible({ timeout: 45_000 });

  const payResponse = page.waitForResponse(
    (res) =>
      res.url().includes("/payments") &&
      res.request().method() === "POST",
    { timeout: 30_000 },
  );
  await card.first().getByRole("button", { name: /^Pay cash$/i }).click();
  const paid = await payResponse;
  expect(paid.ok(), `Cashier pay failed: ${paid.status()}`).toBeTruthy();
}

test("dine-in flow: QR → kitchen → waiter → cashier → completed", async ({
  page,
  context,
}) => {
  test.setTimeout(180_000);
  test.skip(
    process.env.SKIP_CUSTOMER_E2E === "1",
    "SKIP_CUSTOMER_E2E=1 — apps/API not available",
  );

  const guestName = uniqueGuest("E2E-Dine");
  const order = await placeDineInViaUi(page, guestName);

  const kitchen = await context.newPage();
  await kitchen.goto(
    `${KITCHEN_BASE}/?token=${encodeURIComponent(KITCHEN_TOKEN)}`,
  );
  await expect(kitchen).toHaveURL(/\/display/, { timeout: 30_000 });
  await expect(ticketForGuest(kitchen, guestName)).toHaveCount(1, {
    timeout: 45_000,
  });
  await kitchenAdvanceTo(kitchen, guestName, ["Accept", "Start", "Ready"]);

  const waiter = await context.newPage();
  await waiter.goto(
    `${WAITER_BASE}/?token=${encodeURIComponent(WAITER_TOKEN)}`,
  );
  await expect(waiter).toHaveURL(/\/display/, { timeout: 30_000 });
  const waiterTicket = ticketForGuest(waiter, guestName).first();
  await expect(waiterTicket).toBeVisible({ timeout: 45_000 });
  await waiterTicket.getByRole("button", { name: /^Picked up$/i }).click();
  await expect(
    waiterTicket.getByRole("button", { name: /^Complete$/i }),
  ).toBeVisible({ timeout: 30_000 });

  const cashier = await context.newPage();
  await cashierPayCash(cashier, guestName, order.tableNumber);

  await page.goto(`/t/${TABLE_TOKEN}/orders/${order.id}`);
  await expect(page.getByText(/completed/i).first()).toBeVisible({
    timeout: 45_000,
  });
});

test("dine-in fire-next: multi-course → fire next → serve → pay", async ({
  page,
  context,
  request,
}) => {
  test.setTimeout(180_000);
  test.skip(
    process.env.SKIP_CUSTOMER_E2E === "1",
    "SKIP_CUSTOMER_E2E=1 — apps/API not available",
  );

  const guestName = uniqueGuest("E2E-Fire");
  const order = await placeMultiCourseViaApi(request, guestName);
  expect(order.status).toBe("NEW");

  const kitchen = await context.newPage();
  await kitchen.goto(
    `${KITCHEN_BASE}/?token=${encodeURIComponent(KITCHEN_TOKEN)}`,
  );
  await expect(kitchen).toHaveURL(/\/display/, { timeout: 30_000 });
  await kitchenAdvanceTo(kitchen, guestName, ["Accept", "Start"]);

  const waiter = await context.newPage();
  await waiter.goto(
    `${WAITER_BASE}/?token=${encodeURIComponent(WAITER_TOKEN)}`,
  );
  await expect(waiter).toHaveURL(/\/display/, { timeout: 30_000 });
  const waiterTicket = ticketForGuest(waiter, guestName).first();
  await expect(waiterTicket).toBeVisible({ timeout: 45_000 });
  await waiterTicket
    .getByRole("button", { name: /Fire next course/i })
    .click();
  await expect(
    waiterTicket.getByRole("button", { name: /Fire next course/i }),
  ).toHaveCount(0, { timeout: 30_000 });

  await kitchenAdvanceTo(kitchen, guestName, ["Ready"]);
  await expect(
    ticketForGuest(waiter, guestName)
      .first()
      .getByRole("button", { name: /^Picked up$/i }),
  ).toBeVisible({ timeout: 45_000 });
  await ticketForGuest(waiter, guestName)
    .first()
    .getByRole("button", { name: /^Picked up$/i })
    .click();

  const cashier = await context.newPage();
  await cashierPayCash(cashier, guestName, order.tableNumber);

  await page.goto(`/t/${TABLE_TOKEN}/orders/${order.id}`);
  await expect(page.getByText(/completed/i).first()).toBeVisible({
    timeout: 45_000,
  });
});
