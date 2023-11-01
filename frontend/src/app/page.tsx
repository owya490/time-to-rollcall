"use client";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import { SignInButton } from "./log-in/page";
import { useContext } from "react";
import { UserContext } from "../lib/context";
import Link from "next/link";
import { Path } from "../components/Path";

export default function LandingPage() {
  const user = useContext(UserContext);
  return (
    <main>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <Loader show />
      <button onClick={() => toast.success("hello toast")}>
        Display Toast
      </button>
      <p>hi</p>
      {!user && <SignInButton />}
      {user && <Link href={Path.Dashboard}>Go to dashboard</Link>}
    </main>
  );
}
