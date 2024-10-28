import NotFoundPage from "@/components/NotFoundPage";
import PrivateLayoutGroup from "@/components/PrivateLayoutGroup";
import { allowedYears } from "@/helper/Time";

export default function GroupLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { groupId: string; year: string };
}) {
  if (allowedYears().includes(Number(params.year)))
    return <PrivateLayoutGroup params={params}>{children}</PrivateLayoutGroup>;
  return <NotFoundPage />;
}
