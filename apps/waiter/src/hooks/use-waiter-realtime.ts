"use client";

import { useRealtimeSocket } from "@org/realtime";
import { waiterApi } from "@/lib/api";

export function useWaiterRealtime(token: string | null) {
  return useRealtimeSocket({
    enabled: !!token,
    auth: token ? { deviceToken: token } : {},
    events: [
      "v1.order.created",
      "v1.order.status.changed",
      "v1.order.cancelled",
      "v1.service-request.created",
      "v1.service-request.updated",
      "v1.payment.updated",
    ],
    invalidateKeys: token
      ? [
          ["waiter-orders", token],
          ["waiter-service-requests", token],
        ]
      : [],
    onTick: token
      ? () => {
          void waiterApi.heartbeat(token).catch(() => undefined);
        }
      : undefined,
  });
}
