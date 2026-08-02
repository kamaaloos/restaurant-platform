import { CartExperience } from "@/components/cart-experience";

export default async function CartPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  return <CartExperience token={token} />;
}
