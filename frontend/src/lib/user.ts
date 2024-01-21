import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { firestore } from "./firebase";
import { User } from "@/models/User";

export async function getUser(id: string) {
  const userDoc = await getDoc(doc(firestore, "users", id));
  return userDoc.data() as User;
}

export async function addUserGroups(id: string, groupId: string) {
  await updateDoc(doc(firestore, "users", id), {
    groups: arrayUnion(groupId),
  });
}
