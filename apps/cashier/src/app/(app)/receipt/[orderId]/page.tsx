"use client";

import * as React from "react";
import { Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "next/navigation";
import { cashierApi } from "@/lib/api";
import { getStoredUser } from "@/lib/session";
import { ReceiptView } from "@/components/receipt-view";

function ReceiptPageInner() {
  const params = useParams<{ orderId: string }>();
  const search = useSearchParams();
  const orderId = params.orderId;
  const branchName = search.get("branchName");
  const receivedByParam = search.get("receivedBy");
  const autoPrint = search.get("print") !== "0";
  const sessionUser = getStoredUser();
  const receivedByFallback =
    receivedByParam?.trim() ||
    sessionUser?.email ||
    null;

  const orderQuery = useQuery({
    queryKey: ["cashier-order", orderId],
    queryFn: () => cashierApi.getOrder(orderId),
    enabled: !!orderId,
  });

  if (orderQuery.isLoading) {
    return <p className="text-[var(--muted)]">Loading receipt…</p>;
  }

  if (orderQuery.isError || !orderQuery.data) {
    return (
      <div className="space-y-3">
        <h1 className="font-[family-name:var(--font-display)] text-2xl">
          Receipt unavailable
        </h1>
        <p className="text-[var(--danger)]">
          {(orderQuery.error as Error | null)?.message ?? "Order not found"}
        </p>
      </div>
    );
  }

  return (
    <ReceiptView
      order={orderQuery.data}
      branchName={branchName}
      receivedByFallback={receivedByFallback}
      autoPrint={autoPrint}
    />
  );
}

export default function ReceiptPage() {
  return (
    <Suspense fallback={<p className="text-[var(--muted)]">Loading receipt…</p>}>
      <ReceiptPageInner />
    </Suspense>
  );
}
