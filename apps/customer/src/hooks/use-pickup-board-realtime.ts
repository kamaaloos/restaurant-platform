"use client";

import { useRealtimeSocket } from "@org/realtime";

export function usePickupBoardRealtime(
  branchId: string,
  deviceToken: string | null,
) {
  return useRealtimeSocket({
    enabled: !!branchId && !!deviceToken,
    auth: { deviceToken: deviceToken ?? undefined },
    events: ["v1.pickup.board", "v1.order.status.changed", "v1.order.cancelled"],
    invalidateKeys: [["pickup-board", branchId]],
  });
}
