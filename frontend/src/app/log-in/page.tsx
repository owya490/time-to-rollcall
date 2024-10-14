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
  return (
    <main>
      {!user ? (
        <h2 className="m-6">
          Sign in: <SignInButton />
        </h2>
      ) : (
        <Suspense fallback={<></>}>{<Redirect />}</Suspense>
      )}
    </main>
  );
}
