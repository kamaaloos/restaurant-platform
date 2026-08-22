"use client";

import * as React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { kitchenApi } from "@/lib/api";
import {
  clearStoredDeviceToken,
  getStoredDeviceToken,
} from "@/lib/device-token";
import {
  BOARD_COLUMNS,
  NEXT_ACTIONS,
  type KitchenStatus,
  type KitchenTicket,
} from "@/lib/types";
import { cn, ageMinutesLabel, formatWalkInQueueCode } from "@/lib/utils";
import { useKitchenRealtime } from "@/hooks/use-kitchen-realtime";
import { Button } from "@/components/ui/button";
import {
  LanguageSwitcher,
  useLocale,
} from "@/lib/i18n/locale-provider";
import type { MessageKey } from "@/lib/i18n/messages";

const COURSE_KEYS: Record<string, MessageKey> = {
  APPETIZER: "courseAppetizer",
  DRINK: "courseDrink",
  MAIN: "courseMain",
  DESSERT: "courseDessert",
  OTHER: "courseOther",
};

export function KitchenBoard() {
  const { t } = useLocale();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [token, setToken] = React.useState<string | null>(null);

  React.useEffect(() => {
    const stored = getStoredDeviceToken();
    if (!stored) {
      router.replace("/");
      return;
    }
    setToken(stored);
  }, [router]);

  const { connected } = useKitchenRealtime(token);

  const deviceQuery = useQuery({
    queryKey: ["kitchen-device", token],
    queryFn: () => kitchenApi.me(token!),
    enabled: !!token,
    refetchInterval: 60_000,
  });

  const ticketsQuery = useQuery({
    queryKey: ["kitchen-tickets", token],
    queryFn: () => kitchenApi.tickets(token!),
    enabled: !!token,
    refetchInterval: 20_000,
  });

  const dashboardQuery = useQuery({
    queryKey: ["kitchen-dashboard", token],
    queryFn: () => kitchenApi.dashboard(token!),
    enabled: !!token,
    refetchInterval: 20_000,
  });

  const advance = useMutation({
    mutationFn: ({
      orderId,
      status,
    }: {
      orderId: string;
      status: KitchenStatus;
    }) => kitchenApi.updateStatus(token!, orderId, status),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ["kitchen-tickets", token],
      });
      void queryClient.invalidateQueries({
        queryKey: ["kitchen-dashboard", token],
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
        {t("loadingDisplay")}
      </div>
    );
  }

  if (deviceQuery.isError) {
    return (
      <div className="grid min-h-screen place-items-center px-6">
        <div className="max-w-md space-y-4 text-center">
          <h1 className="font-[family-name:var(--font-display)] text-3xl">
            {t("deviceOffline")}
          </h1>
          <p className="text-[var(--muted)]">
            {deviceQuery.error instanceof Error
              ? deviceQuery.error.message
              : t("apiUnreachable")}
          </p>
          <Button onClick={unpair}>{t("repairDevice")}</Button>
        </div>
      </div>
    );
  }

  const tickets = ticketsQuery.data ?? [];
  const device = deviceQuery.data;
  const dash = dashboardQuery.data;

  return (
    <div className="relative z-10 flex min-h-screen flex-col">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--line)] bg-[var(--surface)]/85 px-6 py-4 backdrop-blur-md">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
            {t("kitchenDisplay")}
          </p>
          <h1 className="font-[family-name:var(--font-display)] text-3xl tracking-tight text-[var(--ink)]">
            {device?.name ?? t("kitchenFallback")}
          </h1>
          <p className="text-sm text-[var(--muted)]">
            {device?.branchName ?? "…"} ·{" "}
            {t("openCount", { count: dash?.open ?? tickets.length })}
          </p>
        </div>

        {dash ? (
          <div className="flex flex-wrap gap-2 text-sm">
            <DashPill label={t("dashNew")} value={dash.new} />
            <DashPill label={t("dashPrep")} value={dash.preparing} />
            <DashPill label={t("dashReady")} value={dash.ready} />
            <DashPill
              label={t("dashAvgWait")}
              value={`${dash.averageWaitMinutes}m`}
            />
            <DashPill
              label={t("dashOldest")}
              value={`${dash.longestWaitingMinutes}m`}
              hot={dash.longestWaitingMinutes >= 12}
            />
          </div>
        ) : null}

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
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
                connected ? "bg-[var(--ok)] animate-pulse" : "bg-[var(--danger)]",
              )}
            />
            {connected ? t("live") : t("reconnecting")}
          </span>
          <Button variant="outline" size="sm" onClick={unpair}>
            {t("unpair")}
          </Button>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-6">
        <div className="grid w-full max-w-[1600px] grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {BOARD_COLUMNS.map((column) => {
            const columnTickets = tickets.filter(
              (ticket) => ticket.status === column.status,
            );

            return (
              <section
                key={column.status}
                className="flex h-[48vh] max-h-[520px] min-h-[280px] flex-col rounded-2xl border border-white/25 bg-[var(--surface)]/55 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] backdrop-blur-md"
              >
                <div className="flex items-end justify-between border-b border-[var(--line)] px-4 py-3">
                  <div>
                    <h2 className="font-[family-name:var(--font-display)] text-2xl">
                      {t(column.titleKey)}
                    </h2>
                    <p className="text-xs uppercase tracking-[0.16em] text-[var(--muted)]">
                      {t(column.hintKey)}
                    </p>
                  </div>
                  <span className="rounded-md bg-[var(--surface-2)] px-2.5 py-1 text-sm font-semibold tabular-nums">
                    {columnTickets.length}
                  </span>
                </div>

                <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-3">
                  {columnTickets.length === 0 ? (
                    <p className="m-auto px-2 py-6 text-center text-sm text-[var(--muted)]">
                      {t("noTickets")}
                    </p>
                  ) : (
                    columnTickets.map((ticket) => (
                      <TicketCard
                        key={ticket.id}
                        ticket={ticket}
                        busy={
                          advance.isPending &&
                          advance.variables?.orderId === ticket.id
                        }
                        onAdvance={(status) =>
                          advance.mutate({ orderId: ticket.id, status })
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

      {ticketsQuery.isError ? (
        <div className="border-t border-[var(--line)] bg-[var(--danger-soft)] px-6 py-3 text-[var(--danger)]">
          {ticketsQuery.error instanceof Error
            ? ticketsQuery.error.message
            : t("loadTicketsFailed")}
        </div>
      ) : null}
    </div>
  );
}

function DashPill({
  label,
  value,
  hot = false,
}: {
  label: string;
  value: string | number;
  hot?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border px-3 py-2",
        hot
          ? "border-[var(--heat)] bg-[var(--heat-soft)] text-[var(--heat)]"
          : "border-[var(--line)] bg-[var(--surface-2)] text-[var(--ink)]",
      )}
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
        {label}
      </p>
      <p className="font-semibold tabular-nums">{value}</p>
    </div>
  );
}

const COURSE_ORDER = ["APPETIZER", "DRINK", "MAIN", "DESSERT", "OTHER"];

function groupByCourse(items: KitchenTicket["items"]) {
  const map = new Map<string, KitchenTicket["items"]>();
  for (const item of items) {
    const course = item.course || "MAIN";
    const list = map.get(course) ?? [];
    list.push(item);
    map.set(course, list);
  }
  return [...map.entries()]
    .sort(
      (a, b) =>
        COURSE_ORDER.indexOf(a[0]) - COURSE_ORDER.indexOf(b[0]),
    )
    .map(([course, groupItems]) => ({ course, items: groupItems }));
}

function TicketCard({
  ticket,
  busy,
  onAdvance,
}: {
  ticket: KitchenTicket;
  busy: boolean;
  onAdvance: (status: KitchenStatus) => void;
}) {
  const { t } = useLocale();
  const next = NEXT_ACTIONS[ticket.status as KitchenStatus];
  const ageMins = ticket.ageMinutes;
  const urgent = ageMins >= 12;

  return (
    <article
      className={cn(
        "animate-ticket-in rounded-xl border bg-[var(--surface)] p-4 shadow-[0_10px_30px_rgba(18,24,28,0.06)]",
        urgent
          ? "border-[var(--heat)] ring-1 ring-[var(--heat)]"
          : "border-[var(--line)]",
      )}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <p className="font-[family-name:var(--font-display)] text-3xl leading-none tracking-tight">
            {ticket.mode === "WALK_IN" || ticket.queueNumber != null
              ? (formatWalkInQueueCode(ticket.queueNumber) ?? "—")
              : ticket.table?.number
                ? `T${ticket.table.number}`
                : t("walkIn")}
          </p>
          <p className="mt-1 text-sm text-[var(--muted)]">
            {ticket.mode === "WALK_IN" ? `${t("walkIn")} · ` : ""}
            {ticket.customerName ?? t("guest")}
            {ticket.isRush ? (
              <span className="ml-2 rounded bg-[var(--heat-soft)] px-1.5 py-0.5 text-xs font-semibold text-[var(--heat)]">
                {t("rush")}
              </span>
            ) : null}
            {ticket.isVip ? (
              <span className="ml-2 rounded bg-[var(--surface-2)] px-1.5 py-0.5 text-xs font-semibold text-[var(--ink)]">
                {t("vip")}
              </span>
            ) : null}
          </p>
        </div>
        <time
          className={cn(
            "rounded-md px-2 py-1 text-sm font-semibold tabular-nums",
            urgent
              ? "bg-[var(--heat-soft)] text-[var(--heat)]"
              : "bg-[var(--surface-2)] text-[var(--muted)]",
          )}
        >
          {ageMinutesLabel(ageMins)}
        </time>
      </div>

      <ul className="mb-4 space-y-3">
        {groupByCourse(ticket.items).map((group) => (
          <li key={group.course}>
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
              {t(COURSE_KEYS[group.course] ?? "courseOther")}
            </p>
            <ul className="space-y-2">
              {group.items.map((item) => (
                <li key={item.id} className="text-[var(--ink)]">
                  <div className="flex gap-2 text-lg font-semibold leading-tight">
                    <span className="tabular-nums text-[var(--heat)]">
                      {item.quantity}×
                    </span>
                    <span>
                      {item.menuItem.name}
                      {item.seatNumber != null ? (
                        <span className="ml-1 text-sm font-normal text-[var(--muted)]">
                          · S{item.seatNumber}
                        </span>
                      ) : null}
                    </span>
                  </div>
                  {item.modifiers?.length ? (
                    <p className="ml-7 text-sm text-[var(--muted)]">
                      {item.modifiers.map((m) => m.optionName).join(", ")}
                    </p>
                  ) : null}
                  {item.notes ? (
                    <p className="ml-7 text-sm font-medium text-[var(--heat)]">
                      {t("note")} {item.notes}
                    </p>
                  ) : null}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      {next ? (
        <Button
          size="lg"
          className="w-full"
          disabled={busy}
          onClick={() => onAdvance(next.status)}
        >
          {busy ? t("updating") : t(next.labelKey)}
        </Button>
      ) : (
        <p className="rounded-lg bg-[var(--ok-soft)] px-3 py-2 text-center text-sm font-semibold text-[var(--ok)]">
          {t("waitingPickup")}
        </p>
      )}
    </article>
  );
}
