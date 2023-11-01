"use client";
import { signInWithPopup } from "firebase/auth";
import { auth, googleAuthProvider } from "../../lib/firebase";

export default function LogIn() {
  const user = null;
  return <main>{!user ? <SignInButton /> : null}</main>;
}

function SignInButton() {
  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleAuthProvider);
  };

  return <button onClick={signInWithGoogle}>Sign in with Google</button>;
}
