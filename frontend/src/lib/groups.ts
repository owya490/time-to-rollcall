import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { convertToJavascript, firestore } from "@/lib/firebase";
import { GroupModel } from "@/models/Group";
import { getTags } from "./tags";
import { addGroupToUserGroups } from "./users";
import { UserId } from "@/models/User";

export async function getGroups(groupIds?: string[]) {
  const groups: GroupModel[] = [];
  if (!groupIds) {
    return [];
  }
  for (const groupId of groupIds) {
    groups.push(await getGroup(groupId));
  }
  return groups;
}

export async function getGroup(groupId: string) {
  let groupDoc = await getDoc(doc(firestore, "groups", groupId));
  let tags = await getTags(groupId);
  return { ...(await convertToJavascript(groupDoc)), tags } as GroupModel;
}

export async function createGroup(
  groupName: string,
  tagNames: string[],
  userId: UserId
) {
  const addedDoc = await addDoc(collection(firestore, "groups"), {
    name: groupName,
  });
  await addGroupToUserGroups(userId, addedDoc.id);
  for (const tagName of tagNames) {
    await addDoc(collection(firestore, "groups", addedDoc.id, "tags"), {
      name: tagName,
    });
  }

  return getGroup(addedDoc.id);
}
