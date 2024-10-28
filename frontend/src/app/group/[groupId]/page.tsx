import { Path } from "@/helper/Path";
import { currentYearStr } from "@/helper/Time";
import { redirect } from "next/navigation";

export default function GroupRedirect({
  params,
}: {
  params: { groupId: string; year: string };
}) {
  redirect(Path.Group + "/" + params.groupId + "/" + currentYearStr);
}
