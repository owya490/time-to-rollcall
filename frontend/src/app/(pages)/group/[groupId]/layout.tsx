import Botbar from "@/components/Botbar";
import PrivateLayout from "@/components/PrivateLayout";

export default function PagesLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { groupId: string };
}) {
  return (
    <PrivateLayout>
      {children}
      <Botbar groupId={params.groupId} />
    </PrivateLayout>
  );
}
