"use client";
import SignInButton from "@/components/SignInButton";
import { redirect } from "next/navigation";
import { Path } from "helper/Path";
import { useUserAuth } from "@/lib/hooks";

export default function LogIn() {
  const user = useUserAuth();
  return (
    <main>
      {!user ? (
        <>
          <h1>Dominic - SOW-413: TODO Log in</h1>
          <p>
            Sign in: <SignInButton />
          </p>
        </>
      ) : (
        redirect(`${Path.Group}/1`)
      )}
    </main>
  );
}
