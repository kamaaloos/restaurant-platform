import { MenuExperience } from "@/components/menu-experience";
import { TablePinGate } from "@/components/table-pin-gate";

export default async function TableMenuPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  return (
    <TablePinGate token={token}>
      <MenuExperience token={token} />
    </TablePinGate>
  );
}