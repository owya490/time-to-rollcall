import PrivateLayout from "@/components/PrivateLayout";

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PrivateLayout>
      <div className="my-24">{children}</div>
    </PrivateLayout>
  );
}
