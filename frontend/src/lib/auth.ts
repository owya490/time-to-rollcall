import { signOut } from "firebase/auth";
import { auth } from "./firebase";

export function logOut() {
  return signOut(auth);
}
