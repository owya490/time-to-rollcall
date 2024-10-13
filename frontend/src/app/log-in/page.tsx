"use client";
import SignInButton from "@/components/SignInButton";
import { useUserData } from "@/lib/hooks";
import { redirect } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function Redirect() {
  const searchParams = useSearchParams();

  const from = searchParams.get("from");

  return redirect(from ?? "/group");
}

export default function LogIn() {
  const [user] = useUserData();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (user !== undefined) {
      setLoading(false);
    }
  }, [user]);
  return (
    <main>
      {loading ? (
        <p>Loading</p>
      ) : !user ? (
        <h2>
          Sign in: <SignInButton />
        </h2>
      ) : (
        <Suspense fallback={<></>}>{<Redirect />}</Suspense>
      )}
    </main>
  );
}
