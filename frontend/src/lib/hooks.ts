import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

// Custom hook to read auth record and user profile doc
export function getUserAuth() {
  const [user] = useAuthState(auth);
  return user;
}

export function logOut() {
  signOut(auth);
}
