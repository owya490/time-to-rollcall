import Loader from "@/components/Loader";
import { Path } from "@/helper/Path";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main>
      <Link href={Path.Group}>Groups</Link>
      <Loader show />
    </main>
  );
}
