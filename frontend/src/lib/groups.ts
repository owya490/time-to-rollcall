import { doc, getDoc } from "firebase/firestore";
import { convertToJavascript, firestore } from "@/lib/firebase";
import { GroupModel } from "@/models/Group";
import { getTags } from "./tags";

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
