import PrivateLayout from "../../components/PrivateLayout";

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PrivateLayout>{children}</PrivateLayout>;
}
