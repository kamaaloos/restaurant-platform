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
      branchId ? `/orders/waiter?branchId=${branchId}` : "/orders/waiter",
    ),

  paymentConfig: () =>
    request<PaymentProviderConfig>("/payments/config"),

  createPayment: (body: {
    orderId: string;
    method: "CASH" | "CARD" | "ONLINE";
    tipAmount?: number;
    amount?: number;
    orderItemIds?: string[];
    seatNumbers?: number[];
    status?: "PENDING" | "PAID";
  }) =>
    request<Payment>("/payments", {
      method: "POST",
      body: JSON.stringify(body),
    }),

  markPaid: (id: string) =>
    request<Payment>(`/payments/${id}/paid`, { method: "PATCH" }),

  refundPayment: (id: string, body?: { amount?: number; reason?: string }) =>
    request<Payment>(`/payments/${id}/refund`, {
      method: "POST",
      body: JSON.stringify(body ?? {}),
    }),
};
