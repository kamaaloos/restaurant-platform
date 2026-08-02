"use client";

import * as React from "react";
import { useRealtimeSocket } from "@org/realtime";
import { kitchenApi } from "@/lib/api";

const KITCHEN_PING_MS = 20_000;

/**
 * Realtime socket keeps the device ONLINE via gateway presence timers.
 * REST /kitchen/ping is only a fallback when the socket is down.
 */
export function useKitchenRealtime(token: string | null) {
  const { connected } = useRealtimeSocket({
    enabled: !!token,
    auth: token ? { deviceToken: token } : {},
    events: [
      "v1.order.created",
      "v1.kitchen.ticket",
      "v1.order.status.changed",
      "v1.order.cancelled",
    ],
    invalidateKeys: token
      ? [
          ["kitchen-tickets", token],
          ["kitchen-dashboard", token],
        ]
      : [],
  });

  React.useEffect(() => {
    if (!token || connected) return;

    const ping = () => {
      void kitchenApi.ping(token).catch(() => undefined);
    };

    ping();
    const id = window.setInterval(ping, KITCHEN_PING_MS);
    return () => window.clearInterval(id);
  }, [token, connected]);

  return { connected };
}
