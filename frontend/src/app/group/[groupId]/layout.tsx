import PrivateLayout from "@/components/PrivateLayout";
import PrivateLayoutGroup from "@/components/PrivateLayoutGroup";

export default function GroupLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { groupId: string };
}) {
  return (
    <PrivateLayout>
      <PrivateLayoutGroup params={params}>
        <div className="my-24">{children}</div>
      </PrivateLayoutGroup>
    </PrivateLayout>
  );
}
