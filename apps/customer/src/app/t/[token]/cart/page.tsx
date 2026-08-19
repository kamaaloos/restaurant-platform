import { CartExperience } from "@/components/cart-experience";
import { TablePinGate } from "@/components/table-pin-gate";

export default async function CartPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  return (
    <TablePinGate token={token}>
      <CartExperience token={token} />
    </TablePinGate>
  );
}