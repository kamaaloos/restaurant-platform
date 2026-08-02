"use client";

import * as React from "react";
import { io, type Socket } from "socket.io-client";
import { useQueryClient } from "@tanstack/react-query";
import { getWsBaseUrl } from "@org/shared";

export type UseRealtimeSocketOptions = {
  /** When false/nullish, the socket is not opened. */
  enabled?: boolean;
  auth: Record<string, string>;
  events: string[];
  /** Query keys to invalidate on any subscribed event. */
  invalidateKeys?: unknown[][];
  onEvent?: () => void;
  wsUrl?: string;
  /** Optional periodic side effect (e.g. device heartbeat). */
  onTick?: () => void;
  tickMs?: number;
  /** Staff clients: join a role room after connect. */
  join?: { room: string; branchId?: string };
};

export function useRealtimeSocket(options: UseRealtimeSocketOptions) {
  const queryClient = useQueryClient();
  const [connected, setConnected] = React.useState(false);

  const onEventRef = React.useRef(options.onEvent);
  const onTickRef = React.useRef(options.onTick);
  onEventRef.current = options.onEvent;
  onTickRef.current = options.onTick;

  const authKey = JSON.stringify(options.auth);
  const eventsKey = options.events.join("|");
  const invalidateKey = JSON.stringify(options.invalidateKeys ?? []);
  const joinKey = JSON.stringify(options.join ?? null);
  const enabled = options.enabled ?? true;
  const wsUrl = options.wsUrl;
  const tickMs = options.tickMs ?? 30_000;
  const hasTick = !!options.onTick;

  React.useEffect(() => {
    if (!enabled) return;

    const socket: Socket = io(`${wsUrl ?? getWsBaseUrl()}/realtime`, {
      transports: ["websocket"],
      auth: JSON.parse(authKey) as Record<string, string>,
    });

    const handle = () => {
      const keys = JSON.parse(invalidateKey) as unknown[][];
      for (const key of keys) {
        void queryClient.invalidateQueries({ queryKey: key });
      }
      onEventRef.current?.();
    };

    socket.on("connect", () => {
      setConnected(true);
      const join = JSON.parse(joinKey) as {
        room: string;
        branchId?: string;
      } | null;
      if (join?.room) {
        socket.emit("join", join);
      }
    });
    socket.on("disconnect", () => setConnected(false));

    for (const event of eventsKey.split("|").filter(Boolean)) {
      socket.on(event, handle);
    }

    let interval: number | undefined;
    if (hasTick) {
      void Promise.resolve().then(() => onTickRef.current?.());
      interval = window.setInterval(() => onTickRef.current?.(), tickMs);
    }

    return () => {
      if (interval) window.clearInterval(interval);
      socket.disconnect();
      setConnected(false);
    };
  }, [
    enabled,
    authKey,
    eventsKey,
    invalidateKey,
    joinKey,
    queryClient,
    wsUrl,
    tickMs,
    hasTick,
  ]);

  return { connected };
}
