import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "./firebase";
import { User, UserId } from "@/models/User";
import { GroupId } from "@/models/Group";

export async function getUser(id: UserId) {
  const userDoc = await getDoc(doc(firestore, "users", id));
  return { ...userDoc.data(), id: id } as User;
}

export async function addGroupToUserGroups(id: UserId, groupId: GroupId) {
  await updateDoc(doc(firestore, "users", id), {
    groups: arrayUnion(groupId),
  });
}

export async function removeGroupFromUserGroups(id: UserId, groupId: GroupId) {
  await updateDoc(doc(firestore, "users", id), {
    groups: arrayRemove(groupId),
  });
}
