"use client";

import * as React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { waiterApi } from "@/lib/api";
import {
  clearStoredDeviceToken,
  getStoredDeviceToken,
} from "@/lib/device-token";
import {
  ORDER_COLUMNS,
  type ServiceRequest,
  type WaiterOrder,
} from "@/lib/types";
import { cn, elapsedLabel, formatWalkInQueueCode } from "@/lib/utils";
import { useWaiterRealtime } from "@/hooks/use-waiter-realtime";
import { Button } from "@/components/ui/button";

export function WaiterBoard() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [token, setToken] = React.useState<string | null>(null);
  const [now, setNow] = React.useState(() => Date.now());
  const [actionError, setActionError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const stored = getStoredDeviceToken();
    if (!stored) {
      router.replace("/");
      return;
    }
    setToken(stored);
  }, [router]);

  React.useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 30_000);
    return () => window.clearInterval(id);
  }, []);

  const { connected } = useWaiterRealtime(token);

  const deviceQuery = useQuery({
    queryKey: ["waiter-device", token],
    queryFn: () => waiterApi.me(token!),
    enabled: !!token,
    refetchInterval: 60_000,
  });

  const ordersQuery = useQuery({
    queryKey: ["waiter-orders", token],
    queryFn: () => waiterApi.orders(token!),
    enabled: !!token,
    refetchInterval: 20_000,
  });

  const requestsQuery = useQuery({
    queryKey: ["waiter-service-requests", token],
    queryFn: () => waiterApi.serviceRequests(token!),
    enabled: !!token,
    refetchInterval: 15_000,
  });

  const advance = useMutation({
    mutationFn: ({
      orderId,
      status,
    }: {
      orderId: string;
      status: "SERVED" | "COMPLETED";
    }) => waiterApi.updateStatus(token!, orderId, status),
    onSuccess: () => {
      setActionError(null);
      void queryClient.invalidateQueries({
        queryKey: ["waiter-orders", token],
      });
    },
    onError: (err: Error) => setActionError(err.message),
  });

  const fireNext = useMutation({
    mutationFn: (orderId: string) => waiterApi.fireNext(token!, orderId),
    onSuccess: () => {
      setActionError(null);
      void queryClient.invalidateQueries({
        queryKey: ["waiter-orders", token],
      });
    },
    onError: (err: Error) => setActionError(err.message),
  });

  const acknowledge = useMutation({
    mutationFn: (id: string) => waiterApi.acknowledgeRequest(token!, id),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ["waiter-service-requests", token],
      });
    },
  });

  const completeRequest = useMutation({
    mutationFn: (id: string) => waiterApi.completeRequest(token!, id),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ["waiter-service-requests", token],
      });
    },
  });

  function unpair() {
    clearStoredDeviceToken();
    router.replace("/");
  }

  if (!token) {
    return (
      <div className="grid min-h-screen place-items-center text-[var(--muted)]">
        Loading display…
      </div>
    );
  }

  if (deviceQuery.isError) {
    return (
      <div className="grid min-h-screen place-items-center px-6">
        <div className="max-w-md space-y-4 text-center">
          <h1 className="font-[family-name:var(--font-display)] text-3xl">
            Device offline
          </h1>
          <p className="text-[var(--muted)]">
            {deviceQuery.error instanceof Error
              ? deviceQuery.error.message
              : "Could not reach the waiter API"}
          </p>
          <Button onClick={unpair}>Re-pair device</Button>
        </div>
      </div>
    );
  }

  const orders = ordersQuery.data ?? [];
  const requests = requestsQuery.data ?? [];
  const device = deviceQuery.data;
  const readyCount = orders.filter((o) => o.status === "READY").length;

  return (
    <div className="relative z-10 flex min-h-screen flex-col">
      <header className="flex items-center justify-between gap-4 border-b border-[var(--line)] bg-[var(--surface)]/85 px-6 py-4 backdrop-blur-md">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
            Waiter Display
          </p>
          <h1 className="font-[family-name:var(--font-display)] text-3xl tracking-tight text-[var(--ink)]">
            {device?.name ?? "Waiter"}
          </h1>
          <p className="text-sm text-[var(--muted)]">
            {device?.branchName ?? "…"} · {readyCount} ready · {requests.length}{" "}
            calls
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium",
              connected
                ? "bg-[var(--ok-soft)] text-[var(--ok)]"
                : "bg-[var(--danger-soft)] text-[var(--danger)]",
            )}
          >
            <span
              className={cn(
                "h-2.5 w-2.5 rounded-full",
                connected
                  ? "animate-pulse bg-[var(--ok)]"
                  : "bg-[var(--danger)]",
              )}
            />
            {connected ? "Live" : "Reconnecting"}
          </span>
          <Button variant="outline" size="sm" onClick={unpair}>
            Unpair
          </Button>
        </div>
      </header>

      {actionError ? (
        <p className="border-b border-[var(--line)] bg-[var(--danger-soft)] px-6 py-3 text-sm text-[var(--danger)]">
          {actionError}
        </p>
      ) : null}

      {requests.length > 0 ? (
        <section className="border-b border-[var(--line)] bg-[var(--signal-soft)]/85 px-4 py-4 backdrop-blur-sm">
          <div className="mb-3 flex items-end justify-between">
            <h2 className="font-[family-name:var(--font-display)] text-2xl tracking-wide">
              Table calls
            </h2>
            <span className="text-sm font-semibold text-[var(--signal)]">
              {requests.length} open
            </span>
          </div>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {requests.map((request) => (
              <ServiceRequestCard
                key={request.id}
                request={request}
                now={now}
                acknowledging={
                  acknowledge.isPending && acknowledge.variables === request.id
                }
                completing={
                  completeRequest.isPending &&
                  completeRequest.variables === request.id
                }
                onAcknowledge={() => acknowledge.mutate(request.id)}
                onComplete={() => completeRequest.mutate(request.id)}
              />
            ))}
          </div>
        </section>
      ) : null}

      <main className="flex flex-1 items-center justify-center px-4 py-6">
        <div className="grid w-full max-w-[1400px] grid-cols-1 gap-4 lg:grid-cols-3">
        {ORDER_COLUMNS.map((column) => {
          const columnOrders = orders.filter((order) =>
            column.statuses.includes(order.status as never),
          );

          return (
            <section
              key={column.key}
              className="flex h-[48vh] max-h-[520px] min-h-[280px] flex-col rounded-2xl border border-[var(--line)] bg-[var(--surface)]/88 backdrop-blur-sm"
            >
              <div className="flex items-end justify-between border-b border-[var(--line)] px-4 py-3">
                <div>
                  <h2 className="font-[family-name:var(--font-display)] text-2xl">
                    {column.title}
                  </h2>
                  <p className="text-xs uppercase tracking-[0.16em] text-[var(--muted)]">
                    {column.hint}
                  </p>
                </div>
                <span className="rounded-md bg-[var(--surface-2)] px-2.5 py-1 text-sm font-semibold tabular-nums">
                  {columnOrders.length}
                </span>
              </div>

              <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-3">
                {columnOrders.length === 0 ? (
                  <p className="m-auto px-2 py-6 text-center text-sm text-[var(--muted)]">
                    Nothing here
                  </p>
                ) : (
                  columnOrders.map((order) => (
                    <OrderCard
                      key={order.id}
                      order={order}
                      now={now}
                      busy={
                        (advance.isPending &&
                          advance.variables?.orderId === order.id) ||
                        (fireNext.isPending &&
                          fireNext.variables === order.id)
                      }
                      onAdvance={(status) =>
                        advance.mutate({ orderId: order.id, status })
                      }
                      onFireNext={
                        order.items.some((item) => !item.firedAt)
                          ? () => fireNext.mutate(order.id)
                          : undefined
                      }
                    />
                  ))
                )}
              </div>
            </section>
          );
        })}
        </div>
      </main>
    </div>
  );
}

function ServiceRequestCard({
  request,
  now,
  acknowledging,
  completing,
  onAcknowledge,
  onComplete,
}: {
  request: ServiceRequest;
  now: number;
  acknowledging: boolean;
  completing: boolean;
  onAcknowledge: () => void;
  onComplete: () => void;
}) {
  const label =
    request.type === "REQUEST_BILL" ? "Request bill" : "Call waiter";

  return (
    <article className="animate-ticket-in rounded-xl border border-[var(--signal)] bg-[var(--surface)] p-4">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <p className="font-[family-name:var(--font-display)] text-3xl leading-none">
            T{request.table.number}
          </p>
          <p className="mt-1 text-sm font-semibold text-[var(--signal)]">
            {label}
          </p>
        </div>
        <time className="rounded-md bg-[var(--signal-soft)] px-2 py-1 text-sm font-semibold text-[var(--signal)]">
          {elapsedLabel(request.createdAt, now)}
        </time>
      </div>
      {request.note ? (
        <p className="mb-3 text-sm text-[var(--muted)]">{request.note}</p>
      ) : null}
      <div className="flex gap-2">
        {request.status === "PENDING" ? (
          <Button
            className="flex-1"
            disabled={acknowledging}
            onClick={onAcknowledge}
          >
            {acknowledging ? "…" : "On my way"}
          </Button>
        ) : (
          <Button
            className="flex-1"
            disabled={completing}
            onClick={onComplete}
          >
            {completing ? "…" : "Done"}
          </Button>
        )}
      </div>
    </article>
  );
}

function OrderCard({
  order,
  now,
  busy,
  onAdvance,
  onFireNext,
}: {
  order: WaiterOrder;
  now: number;
  busy: boolean;
  onAdvance: (status: "SERVED" | "COMPLETED") => void;
  onFireNext?: () => void;
}) {
  const urgent = order.status === "READY";

  return (
    <article
      className={cn(
        "animate-ticket-in rounded-xl border bg-[var(--surface)] p-4 shadow-[0_10px_30px_rgba(18,24,28,0.06)]",
        urgent
          ? "border-[var(--signal)] ring-1 ring-[var(--signal)]"
          : "border-[var(--line)]",
      )}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <p className="font-[family-name:var(--font-display)] text-3xl leading-none tracking-tight">
            {order.mode === "WALK_IN" || order.queueNumber != null
              ? (formatWalkInQueueCode(order.queueNumber) ?? "—")
              : order.table?.number
                ? `T${order.table.number}`
                : "Walk-in"}
          </p>
          <p className="mt-1 text-sm text-[var(--muted)]">
            {order.mode === "WALK_IN" ? "Walk-in · " : ""}
            {order.customerName ?? "Guest"} · {order.status}
            {order.isRush ? (
              <span className="ml-2 rounded bg-[var(--signal-soft)] px-1.5 py-0.5 text-xs font-semibold text-[var(--signal)]">
                RUSH
              </span>
            ) : null}
            {order.isVip ? (
              <span className="ml-2 rounded bg-[var(--surface-2)] px-1.5 py-0.5 text-xs font-semibold">
                VIP
              </span>
            ) : null}
          </p>
        </div>
        <time
          className={cn(
            "rounded-md px-2 py-1 text-sm font-semibold tabular-nums",
            urgent
              ? "bg-[var(--signal-soft)] text-[var(--signal)]"
              : "bg-[var(--surface-2)] text-[var(--muted)]",
          )}
        >
          {elapsedLabel(order.createdAt, now)}
        </time>
      </div>

      <ul className="mb-4 space-y-1.5">
        {order.items.map((item) => (
          <li key={item.id} className="flex gap-2 text-base font-semibold">
            <span className="tabular-nums text-[var(--signal)]">
              {item.quantity}×
            </span>
            <span>
              {item.menuItem.name}
              {item.seatNumber != null ? (
                <span className="ml-1 text-sm font-normal text-[var(--muted)]">
                  · seat {item.seatNumber}
                </span>
              ) : null}
              {item.course ? (
                <span className="ml-1 text-sm font-normal text-[var(--muted)]">
                  · {item.course.toLowerCase()}
                  {!item.firedAt ? " (held)" : ""}
                </span>
              ) : null}
            </span>
          </li>
        ))}
      </ul>

      <div className="space-y-2">
        {onFireNext ? (
          <Button
            size="lg"
            variant="outline"
            className="w-full"
            disabled={busy}
            onClick={onFireNext}
          >
            {busy ? "Updating…" : "Fire next course"}
          </Button>
        ) : null}

        {order.status === "READY" ? (
          <Button
            size="lg"
            className="w-full"
            disabled={busy}
            onClick={() =>
              onAdvance(order.mode === "WALK_IN" ? "COMPLETED" : "SERVED")
            }
          >
            {busy
              ? "Updating…"
              : order.mode === "WALK_IN"
                ? "Picked up"
                : "Mark served"}
          </Button>
        ) : null}

        {order.status === "SERVED" ? (
          <Button
            size="lg"
            variant="secondary"
            className="w-full"
            disabled={busy}
            onClick={() => onAdvance("COMPLETED")}
            title="Requires full payment at cashier first"
          >
            {busy ? "Updating…" : "Close check"}
          </Button>
        ) : null}
      </div>
    </article>
  );
}
