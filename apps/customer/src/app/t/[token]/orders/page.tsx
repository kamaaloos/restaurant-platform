import { OrdersExperience } from "@/components/order-tracking";

export default async function OrdersPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  return <OrdersExperience token={token} />;
}
