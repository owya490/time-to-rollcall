import { GroupId } from "@/models/Group";
import { TagModel, TagId } from "@/models/Tag";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import {
  convertCollectionToJavascript,
  convertToJavascript,
  firestore,
} from "./firebase";

export async function getTags(groupId: GroupId) {
  const tags = await getDocs(collection(firestore, "groups", groupId, "tags"));
  return (await convertCollectionToJavascript(tags.docs)) as TagModel[];
}

export async function getTag(groupId: GroupId, tagId: TagId) {
  const tag = await getDoc(doc(firestore, "groups", groupId, "tags", tagId));
  return (await convertToJavascript(tag)) as TagModel;
}

export function convertTagIdToReference(groupId: GroupId, tagId: TagId) {
  return doc(firestore, "groups", groupId, "tags", tagId);
}
