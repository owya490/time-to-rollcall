"use client";
import SignInButton from "@/components/SignInButton";
import { useUserData } from "@/lib/hooks";
import { redirect } from "next/navigation";
import { useSearchParams } from "next/navigation";

export default function LogIn() {
  const userData = useUserData();
  const searchParams = useSearchParams();

  const from = searchParams.get("from");
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
        redirect(from)
      )}
    </main>
  );
}
