"use client";
import SignInButton from "@/components/SignInButton";
import { redirect } from "next/navigation";
import { Path } from "helper/Path";
import { useUserData } from "@/lib/hooks";

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
        redirect(`${Path.Group}/1`) // TODO: Redirect to your first group
      )}
    </main>
  );
}
