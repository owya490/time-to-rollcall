import { signInWithPopup } from "firebase/auth";
import { auth, googleAuthProvider } from "@/lib/firebase";

export default function SignInButton() {
  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleAuthProvider);
  };

  return <button onClick={signInWithGoogle}>Sign in with Google</button>;
}
