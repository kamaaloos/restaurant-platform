import { MenuExperience } from "@/components/menu-experience";

export default async function WalkInMenuPage({
  params,
}: {
  params: Promise<{ branchId: string }>;
}) {
  const { branchId } = await params;
  return <MenuExperience branchId={branchId} />;
}
