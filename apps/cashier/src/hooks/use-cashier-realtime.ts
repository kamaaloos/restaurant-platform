"use client";

import { useRealtimeSocket } from "@org/realtime";
import { getAccessToken } from "@/lib/session";

export function useCashierRealtime(branchId: string | null) {
  const token = typeof window !== "undefined" ? getAccessToken() : null;

  return useRealtimeSocket({
    enabled: !!token && !!branchId,
    auth: token ? { token } : {},
    join: branchId ? { room: "cashier", branchId } : undefined,
    events: [
      "v1.order.created",
      "v1.order.status.changed",
      "v1.order.cancelled",
      "v1.payment.updated",
      "v1.service-request.created",
      "v1.service-request.updated",
    ],
    invalidateKeys: branchId
      ? [
          ["cashier-orders", branchId],
          ["cashier-today-paid", branchId],
        ]
      : [],
  });
}
