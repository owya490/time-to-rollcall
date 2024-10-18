import AuthCheck from "@/components/AuthCheck";
import PrivateLayout from "@/components/PrivateLayout";

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PrivateLayout>
      <AuthCheck>{children}</AuthCheck>
    </PrivateLayout>
  );
}
