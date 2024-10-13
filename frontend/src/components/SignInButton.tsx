import { signInWithPopup } from "firebase/auth";
import { auth, microsoftProvider } from "@/lib/firebase";

export default function SignInButton() {
  const signInWithMicrosoft = async () => {
    await signInWithPopup(auth, microsoftProvider);
  };

  return (
    <button
      type="button"
      className="text-gray-900 bg-transparent border hover:bg-gray-200 border-black font-semibold text-xs px-3 py-1.5"
      onClick={signInWithMicrosoft}
    >
      Sign in with your SOW account
    </button>
  );
}
