import { doc, getDoc } from "firebase/firestore";
import { firestore } from "./firebase";
import { User } from "@/models/User";

export async function getUser(id: string) {
  const userDoc = await getDoc(doc(firestore, "users", id));
  return userDoc.data() as User;
}
