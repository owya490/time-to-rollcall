import Loader from "../components/Loader";
import Link from "next/link";
import { Path } from "../components/Path";

export default function LandingPage() {
  return (
    <main>
      <h1>This is the landing page</h1>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <Loader show />
      <p>hi</p>
      <Link href={Path.Dashboard}>Dashboard</Link>
    </main>
  );
}
