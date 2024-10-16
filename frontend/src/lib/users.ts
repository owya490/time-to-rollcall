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

export async function addGroupToUserGroups(groupId: GroupId, id?: UserId) {
  id &&
    (await updateDoc(doc(firestore, "users", id), {
      groups: arrayUnion(groupId),
    }));
}

export async function removeGroupFromUserGroups(groupId: GroupId, id?: UserId) {
  id &&
    (await updateDoc(doc(firestore, "users", id), {
      groups: arrayRemove(groupId),
    }));
}
