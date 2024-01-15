import Loader from "@/components/Loader";
import Link from "next/link";
import { Path } from "helper/Path";

export default function LandingPage() {
  return (
    <main>
      <Link href={Path.Dashboard}>Dashboard</Link>
      <Loader show />
    </main>
  );
}
