import { signInWithPopup } from "firebase/auth";
import { auth, microsoftProvider } from "@/lib/firebase";

export default function SignInButton() {
  const signInWithMicrosoft = async () => {
    await signInWithPopup(auth, microsoftProvider);
  };

  return (
    <button
      type="button"
      className="rounded-full text-gray-600 bg-transparent border hover:bg-gray-200 border-gray-600 font-medium text-xs px-3 py-2"
      onClick={signInWithMicrosoft}
    >
      Sign-in
    </button>
  );
}
