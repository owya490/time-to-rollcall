import { Path } from "@/helper/Path";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main>
      <Link className="text-3xl m-12" href={Path.Group}>
        Go to Dashboard
      </Link>
    </main>
  );
}
