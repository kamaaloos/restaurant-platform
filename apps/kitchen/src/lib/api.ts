import type {
  KitchenDashboard,
  KitchenDevice,
  KitchenTicket,
} from "./types";
import { createDeviceHttpClient } from "@org/shared";

const client = createDeviceHttpClient({
  appVersion: "kitchen-display/0.1.0",
});

export const kitchenApi = {
  me: (token: string) => client.request<KitchenDevice>("/kitchen/me", token),

  /** Heartbeat every ~20s so idle tablets stay ONLINE. */
  ping: (token: string) =>
    client.request<{
      id: string;
      status: string;
      lastSeen: string | null;
      branchId: string;
    }>("/kitchen/ping", token, {
      method: "POST",
      body: "{}",
    }),

  tickets: (token: string) =>
    client.request<KitchenTicket[]>("/kitchen/tickets", token),

  dashboard: (token: string) =>
    client.request<KitchenDashboard>("/kitchen/dashboard", token),

  updateStatus: (token: string, orderId: string, status: string) =>
    client.request<KitchenTicket>(`/kitchen/orders/${orderId}/status`, token, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),
};
