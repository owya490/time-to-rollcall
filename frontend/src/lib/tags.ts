import { GroupId } from "@/models/Group";
import { TagModel, TagId } from "@/models/Tag";
import { doc, getDoc } from "firebase/firestore";
import { convertToJavascript, firestore } from "./firebase";

export async function getTag(groupId: GroupId, tagId: TagId) {
  const tag = await getDoc(doc(firestore, "groups", groupId, "tags", tagId));
  return (await convertToJavascript(tag)) as TagModel;
}

export function convertTagIdToReference(groupId: GroupId, tagId: TagId) {
  return doc(firestore, "groups", groupId, "tags", tagId);
}
