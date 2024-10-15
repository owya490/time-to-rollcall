import { signInWithPopup } from "firebase/auth";
import { auth, googleAuthProvider } from "@/lib/firebase";

export default function SignInButtonGoogle() {
  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleAuthProvider);
  };

  return (
    <button
      type="button"
      className="text-gray-900 bg-transparent border hover:bg-gray-200 border-black font-semibold text-xs px-3 py-1.5"
      onClick={signInWithGoogle}
    >
      Sign in with Google
    </button>
  );
}
