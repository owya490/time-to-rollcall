import PrivateLayout from "@/components/PrivateLayout";
import PrivateLayoutEvent from "@/components/PrivateLayoutEvent";

export default function EventsPagesLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { groupId: string; eventId: string };
}) {
  return (
    <PrivateLayout>
      <PrivateLayoutEvent params={params}>{children}</PrivateLayoutEvent>
    </PrivateLayout>
  );
}
