"use client";

import { useRealtimeSocket } from "@org/realtime";

export function useCustomerRealtime(token: string) {
  useRealtimeSocket({
    enabled: !!token,
    auth: { tableToken: token },
    events: [
      "v1.customer.order",
      "v1.order.status.changed",
      "v1.order.cancelled",
      "v1.service-request.updated",
      "v1.service-request.created",
    ],
    invalidateKeys: [
      ["orders", token],
      ["order", token],
      ["service-requests", token],
    ],
  });
}
