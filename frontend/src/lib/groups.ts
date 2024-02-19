import { doc, getDoc } from "firebase/firestore";
import { convertToJavascript, firestore } from "@/lib/firebase";
import { GroupModel } from "@/models/Group";

export async function getGroups(groupIds?: string[]) {
  const groups: GroupModel[] = [];
  if (!groupIds) {
    return [];
  }
  for (const groupId of groupIds) {
    let groupDoc = await getDoc(doc(firestore, "groups", groupId));
    if (groupDoc.exists()) {
      groups.push((await convertToJavascript(groupDoc)) as GroupModel);
    }
  }
  return groups;
}

export async function getGroup(groupId: string) {
  let groupDoc = await getDoc(doc(firestore, "groups", groupId));
  return (await convertToJavascript(groupDoc)) as GroupModel;
}
