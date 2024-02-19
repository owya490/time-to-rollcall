"use client";
import SignInButton from "@/components/SignInButton";
import { useUserData } from "@/lib/hooks";
import { redirect } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function Redirect() {
  const searchParams = useSearchParams();

  const from = searchParams.get("from");

  return redirect(from);
}

export default function LogIn() {
  const userData = useUserData();
  return (
    <main>
      {!userData ? (
        <>
          <h1>Dominic - SOW-413: TODO Log in</h1>
          <p>
            Sign in: <SignInButton />
          </p>
        </>
      ) : (
        <Suspense fallback={<></>}>{<Redirect />}</Suspense>
      )}
    </main>
  );
}
