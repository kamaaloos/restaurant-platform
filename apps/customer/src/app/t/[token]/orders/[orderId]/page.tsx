import { OrderTracking } from "@/components/order-detail";

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ token: string; orderId: string }>;
}) {
  const { token, orderId } = await params;
  return <OrderTracking token={token} orderId={orderId} />;
}
