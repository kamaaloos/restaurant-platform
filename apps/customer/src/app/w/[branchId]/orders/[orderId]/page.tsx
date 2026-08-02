import { WalkInOrderTracking } from "@/components/walk-in-order-tracking";

export default async function WalkInOrderPage({
  params,
}: {
  params: Promise<{ branchId: string; orderId: string }>;
}) {
  const { branchId, orderId } = await params;
  return <WalkInOrderTracking branchId={branchId} orderId={orderId} />;
}
