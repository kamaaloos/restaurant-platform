"use client";

import { Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "next/navigation";
import { cashierApi } from "@/lib/api";
import { PickupTicketView } from "@/components/pickup-ticket-view";

function TicketPageInner() {
  const params = useParams<{ orderId: string }>();
  const search = useSearchParams();
  const orderId = params.orderId;
  const branchName = search.get("branchName");
  const autoPrint = search.get("print") !== "0";

  const orderQuery = useQuery({
    queryKey: ["cashier-order", orderId],
    queryFn: () => cashierApi.getOrder(orderId),
    enabled: !!orderId,
  });

  if (orderQuery.isLoading) {
    return <p className="text-[var(--muted)]">Loading ticket…</p>;
  }

  if (orderQuery.isError || !orderQuery.data) {
    return (
      <div className="space-y-3">
        <h1 className="font-[family-name:var(--font-display)] text-2xl">
          Ticket unavailable
        </h1>
        <p className="text-[var(--danger)]">
          {(orderQuery.error as Error | null)?.message ?? "Order not found"}
        </p>
      </div>
    );
  }

  return (
    <PickupTicketView
      order={orderQuery.data}
      branchName={branchName}
      autoPrint={autoPrint}
    />
  );
}

export default function TicketPage() {
  return (
    <Suspense fallback={<p className="text-[var(--muted)]">Loading ticket…</p>}>
      <TicketPageInner />
    </Suspense>
  );
}
