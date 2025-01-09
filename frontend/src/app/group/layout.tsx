import AuthCheck from "@/components/AuthCheck";
import PrivateLayout from "@/components/PrivateLayout";
import { Toaster } from "react-hot-toast";

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PrivateLayout>
      <Toaster />
      <AuthCheck>{children}</AuthCheck>
    </PrivateLayout>
  );
}
