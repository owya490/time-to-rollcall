"use client";
import { signInWithPopup } from "firebase/auth";
import { auth, googleAuthProvider } from "../../lib/firebase";
import { useContext } from "react";
import { UserContext } from "../../lib/context";

export default function LogIn() {
  const user = useContext(UserContext);
  return <main>{!user ? <SignInButton /> : null}</main>;
}

export function SignInButton() {
  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleAuthProvider);
  };

  return <button onClick={signInWithGoogle}>Sign in with Google</button>;
}
