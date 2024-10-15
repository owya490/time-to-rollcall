import { Path } from "@/helper/Path";
import { redirect } from "next/navigation";

export default function LandingPage() {
  redirect(Path.Group);
}
