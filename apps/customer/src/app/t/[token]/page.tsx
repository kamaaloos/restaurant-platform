import { MenuExperience } from "@/components/menu-experience";

export default async function TableMenuPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  return <MenuExperience token={token} />;
}
