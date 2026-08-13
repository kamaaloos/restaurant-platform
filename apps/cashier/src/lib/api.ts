import { ApiError, createHttpClient } from "@org/shared";
import { clearSession, getAccessToken } from "./session";
import type {
  AuthUser,
  Branch,
  Order,
  Payment,
  PaymentProviderConfig,
} from "./types";

export { ApiError };

const request = createHttpClient({
  getAccessToken,
  onUnauthorized: () => {
    clearSession();
    if (
      typeof window !== "undefined" &&
      !window.location.pathname.startsWith("/login")
    ) {
      window.location.href = "/login";
    }
  },
});

export const cashierApi = {
  login: (email: string, password: string) =>
    request<{ access_token: string; user: AuthUser }>("/auth/login", {
      method: "POST",
      auth: false,
      body: JSON.stringify({ email, password }),
    }),

  profile: () => request<AuthUser>("/profile"),

  listBranches: () => request<Branch[]>("/branches"),

  listOrders: (branchId?: string) =>
    request<Order[]>(
      branchId
        ? `/orders/open-bills?branchId=${branchId}`
        : "/orders/open-bills",
    ),

  listTodayPaid: (branchId: string, from: string, to: string) =>
    request<Order[]>(
      `/orders/today-paid?branchId=${encodeURIComponent(branchId)}&from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`,
    ),

  getOrder: (orderId: string) => request<Order>(`/orders/${orderId}`),

  listMenuItems: (restaurantId?: string) =>
    request<
      Array<{
        id: string;
        name: string;
        price: number | string;
        imageUrl?: string | null;
        active: boolean;
        available?: boolean;
        categoryId: string;
        category?: {
          id: string;
          name: string;
          displayOrder?: number;
        } | null;
      }>
    >(
      restaurantId
        ? `/menu/items?restaurantId=${encodeURIComponent(restaurantId)}`
        : "/menu/items",
    ),

  setItemAvailability: (id: string, available: boolean) =>
    request<{ id: string; available: boolean }>(
      `/menu/items/${id}/availability`,
      {
        method: "PATCH",
        body: JSON.stringify({ available }),
      },
    ),

  createWalkInOrder: (body: {
    branchId?: string;
    customerName?: string;
    items: Array<{ menuItemId: string; quantity: number; notes?: string }>;
  }) =>
    request<Order>("/orders", {
      method: "POST",
      body: JSON.stringify({
        mode: "WALK_IN",
        branchId: body.branchId,
        customerName: body.customerName,
        items: body.items,
      }),
    }),

  paymentConfig: () =>
    request<PaymentProviderConfig>("/payments/config"),

  terminalConnectionToken: () =>
    request<{ secret: string }>("/payments/terminal/connection-token", {
      method: "POST",
    }),

  listTerminalReaders: () =>
    request<
      Array<{
        id: string;
        label: string | null;
        status: string;
        deviceType: string | null;
        serialNumber: string | null;
      }>
    >("/payments/terminal/readers"),

  registerTerminalReader: (body: {
    registrationCode: string;
    label: string;
  }) =>
    request<{ id: string; label: string | null; status: string }>(
      "/payments/terminal/readers/register",
      { method: "POST", body: JSON.stringify(body) },
    ),

  createPayment: (body: {
    orderId: string;
    method: "CASH" | "CARD" | "CARD_MANUAL" | "ONLINE";
    tipAmount?: number;
    amount?: number;
    orderItemIds?: string[];
    seatNumbers?: number[];
  }) =>
    request<Payment>("/payments", {
      method: "POST",
      body: JSON.stringify(body),
    }),

  createPendingCash: (body: {
    orderId: string;
    tipAmount?: number;
    amount?: number;
    orderItemIds?: string[];
    seatNumbers?: number[];
  }) =>
    request<Payment>("/payments/pending-cash", {
      method: "POST",
      body: JSON.stringify(body),
    }),

  getPaymentsByOrder: (orderId: string) =>
    request<{
      currency: string;
      balanceDue: number;
      payments: Payment[];
      payment: Payment | null;
    }>(`/payments/order/${orderId}`),

  markPaid: (id: string) =>
    request<Payment>(`/payments/${id}/paid`, { method: "PATCH" }),

  /** Stripe-verified reconcile; production settles via webhook. */
  confirmTerminal: (id: string) =>
    request<Payment>(`/payments/${id}/confirm-terminal`, { method: "POST" }),

  /**
   * Wait until backend marks the payment PAID (Stripe webhook),
   * then fall back to Stripe-verified reconcile for local/dev.
   */
  waitForTerminalPaid: async (
    orderId: string,
    paymentId: string,
    opts?: { timeoutMs?: number; intervalMs?: number },
  ) => {
    const timeoutMs = opts?.timeoutMs ?? 45_000;
    const intervalMs = opts?.intervalMs ?? 1_000;
    const started = Date.now();

    while (Date.now() - started < timeoutMs) {
      const { payments } = await cashierApi.getPaymentsByOrder(orderId);
      const current = payments.find((p) => p.id === paymentId);
      if (current?.status === "PAID") return current;
      if (current?.status === "FAILED") {
        throw new Error("Card payment failed");
      }
      await new Promise((r) => setTimeout(r, intervalMs));
    }

    return cashierApi.confirmTerminal(paymentId);
  },

  refundPayment: (id: string, body?: { amount?: number; reason?: string }) =>
    request<Payment>(`/payments/${id}/refund`, {
      method: "POST",
      body: JSON.stringify(body ?? {}),
    }),
};
