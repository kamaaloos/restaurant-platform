import { CartExperience } from "@/components/cart-experience";

export default async function WalkInCartPage({
  params,
}: {
  params: Promise<{ branchId: string }>;
}) {
  const { branchId } = await params;
  return <CartExperience branchId={branchId} />;
}
