"use client";
import { useContext } from "react";
import { UserContext } from "@/lib/context";
import SignInButton from "@/components/SignInButton";
import { redirect } from "next/navigation";
import { Path } from "@/components/Path";

export default function LogIn() {
  const user = useContext(UserContext);
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
        redirect(Path.Dashboard)
      )}
    </main>
  );
}
