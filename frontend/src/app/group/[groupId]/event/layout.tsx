import PrivateLayout from "@/components/PrivateLayout";
import PrivateLayoutGroup from "@/components/PrivateLayoutGroup";

export default function EventsPagesLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { groupId: string; page: "Events" };
}) {
  // gsap.registerPlugin(Draggable);

  return (
    <PrivateLayout>
      <PrivateLayoutGroup params={params}>{children}</PrivateLayoutGroup>
    </PrivateLayout>
  );
}
