import { createHttpClient } from "@org/shared";
import type {
  CustomerMenu,
  CustomerOrder,
  CustomerServiceRequest,
  CustomerTenant,
  MenuItem,
  PickupBoard,
  WalkInBranch,
} from "./types";

const request = createHttpClient();

export const customerApi = {
  listWalkInBranches: () =>
    request<WalkInBranch[]>("/customer/walk-in/branches", { auth: false }),

  getTenant: (slug: string) =>
    request<CustomerTenant>(`/customer/tenants/${encodeURIComponent(slug)}`, {
      auth: false,
    }),

  getWalkInMenu: (walkInToken: string) =>
    request<CustomerMenu>(`/customer/walk-in/${walkInToken}/menu`, {
      auth: false,
    }),

  placeWalkInOrder: (
    walkInToken: string,
    body: {
      customerName?: string;
      isRush?: boolean;
      isVip?: boolean;
      items: Array<{
        menuItemId: string;
        quantity: number;
        notes?: string;
        modifierOptionIds?: string[];
        seatNumber?: number;
        course?: string;
      }>;
    },
  ) =>
    request<CustomerOrder>(`/customer/walk-in/${walkInToken}/orders`, {
      method: "POST",
      auth: false,
      body: JSON.stringify(body),
    }),

  getWalkInOrder: (walkInToken: string, orderId: string) =>
    request<CustomerOrder>(
      `/customer/walk-in/${walkInToken}/orders/${orderId}`,
      { auth: false },
    ),

  cancelWalkInOrder: (walkInToken: string, orderId: string) =>
    request<CustomerOrder>(
      `/customer/walk-in/${walkInToken}/orders/${orderId}/cancel`,
      { method: "POST", auth: false },
    ),

  paymentConfig: () =>
    request<{
      provider: "none" | "mock" | "stripe";
      onlineEnabled: boolean;
    }>("/customer/payments/config", { auth: false }),

  payWalkInOrder: (
    walkInToken: string,
    orderId: string,
    method: "CARD" | "CARD_MANUAL" | "CASH" | "ONLINE",
  ) =>
    request<{
      payment: {
        id: string;
        status: string;
        method: string;
        amount: string;
        checkoutUrl?: string;
      };
      order: { id: string; status: string; queueNumber: number | null };
    }>(`/customer/walk-in/${walkInToken}/orders/${orderId}/pay`, {
      method: "POST",
      auth: false,
      body: JSON.stringify({ method }),
    }),

  getPickupBoard: (walkInToken: string, deviceToken: string) =>
    request<PickupBoard>(`/customer/walk-in/${walkInToken}/pickup-board`, {
      auth: false,
      headers: { "x-device-token": deviceToken },
    }),

  getMenu: (token: string) =>
    request<CustomerMenu>(`/customer/${token}/menu`, { auth: false }),

  getMenuItem: (token: string, itemId: string) =>
    request<{ currency: string; item: MenuItem }>(
      `/customer/${token}/menu/items/${itemId}`,
      { auth: false },
    ),

  placeOrder: (
    token: string,
    body: {
      customerName?: string;
      isRush?: boolean;
      isVip?: boolean;
      items: Array<{
        menuItemId: string;
        quantity: number;
        notes?: string;
        modifierOptionIds?: string[];
        seatNumber?: number;
        course?: string;
      }>;
    },
  ) =>
    request<CustomerOrder>(`/customer/${token}/orders`, {
      method: "POST",
      auth: false,
      body: JSON.stringify(body),
    }),

  listOrders: (token: string) =>
    request<CustomerOrder[]>(`/customer/${token}/orders`, { auth: false }),

  getOrder: (token: string, orderId: string) =>
    request<CustomerOrder>(`/customer/${token}/orders/${orderId}`, {
      auth: false,
    }),

  cancelOrder: (token: string, orderId: string) =>
    request<CustomerOrder>(`/customer/${token}/orders/${orderId}/cancel`, {
      method: "POST",
      auth: false,
    }),

  listServiceRequests: (token: string) =>
    request<CustomerServiceRequest[]>(`/customer/${token}/service-requests`, {
      auth: false,
    }),

  createServiceRequest: (
    token: string,
    body: {
      type: "CALL_WAITER" | "REQUEST_BILL";
      orderId?: string;
      note?: string;
    },
  ) =>
    request<CustomerServiceRequest>(`/customer/${token}/service-requests`, {
      method: "POST",
      auth: false,
      body: JSON.stringify(body),
    }),
};
