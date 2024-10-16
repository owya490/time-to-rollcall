import PrivateLayoutGroup from "@/components/PrivateLayoutGroup";

export default function GroupLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { groupId: string };
}) {
  return <PrivateLayoutGroup params={params}>{children}</PrivateLayoutGroup>;
}
