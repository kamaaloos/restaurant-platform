import type { ServiceRequest, WaiterDevice, WaiterOrder } from "./types";
import { createDeviceHttpClient } from "@org/shared";

const client = createDeviceHttpClient({
  appVersion: "waiter-display/0.1.0",
});

export const waiterApi = {
  me: (token: string) => client.request<WaiterDevice>("/waiter/me", token),

  orders: (token: string) =>
    client.request<WaiterOrder[]>("/waiter/orders", token),

  updateStatus: (token: string, orderId: string, status: string) =>
    client.request<WaiterOrder>(`/waiter/orders/${orderId}/status`, token, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),

  fireNext: (token: string, orderId: string) =>
    client.request<WaiterOrder>(`/waiter/orders/${orderId}/fire-next`, token, {
      method: "POST",
    }),

  serviceRequests: (token: string) =>
    client.request<ServiceRequest[]>("/waiter/service-requests", token),

  acknowledgeRequest: (token: string, id: string) =>
    client.request<ServiceRequest>(
      `/waiter/service-requests/${id}/acknowledge`,
      token,
      { method: "PATCH" },
    ),

  completeRequest: (token: string, id: string) =>
    client.request<ServiceRequest>(
      `/waiter/service-requests/${id}/complete`,
      token,
      { method: "PATCH" },
    ),

  heartbeat: (token: string) => client.heartbeat(token),
};
