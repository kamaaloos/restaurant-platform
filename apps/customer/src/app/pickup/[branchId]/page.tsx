import { Suspense } from "react";
import { PickupBoardExperience } from "@/components/pickup-board";
import { PickupFireBackdrop } from "@/components/pickup-fire-backdrop";

export default async function PickupBoardPage({
  params,
}: {
  params: Promise<{ branchId: string }>;
}) {
  const { branchId } = await params;
  return (
    <div className="relative min-h-screen">
      <PickupFireBackdrop />
      <div className="relative z-10">
        <Suspense
          fallback={
            <div className="p-8 text-[var(--muted)]">Loading…</div>
          }
        >
          <PickupBoardExperience branchId={branchId} />
        </Suspense>
      </div>
    </div>
  );
}
