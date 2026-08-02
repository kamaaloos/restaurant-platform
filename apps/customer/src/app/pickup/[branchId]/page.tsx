import { Suspense } from "react";
import { PickupBoardExperience } from "@/components/pickup-board";

export default async function PickupBoardPage({
  params,
}: {
  params: Promise<{ branchId: string }>;
}) {
  const { branchId } = await params;
  return (
    <Suspense fallback={<div className="p-8 text-[var(--muted)]">Loading…</div>}>
      <PickupBoardExperience branchId={branchId} />
    </Suspense>
  );
}
