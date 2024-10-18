import { GroupId } from "@/models/Group";
import { TagModel, TagId } from "@/models/Tag";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import {
  convertCollectionToJavascript,
  convertToJavascript,
  firestore,
} from "./firebase";

export async function addTag(groupId: GroupId, tag: TagModel) {
  const addedDoc = await addDoc(
    collection(firestore, "groups", groupId, "tags"),
    convertTagToDocument(tag)
  );
  return { ...tag, id: addedDoc.id };
}

export async function updateTag(groupId: GroupId, tag: TagModel) {
  await updateDoc(
    doc(firestore, "groups", groupId, "tags", tag.id),
    convertTagToDocument(tag)
  );
}

export async function deleteTag(groupId: GroupId, tagId: TagId) {
  await deleteDoc(doc(firestore, "groups", groupId, "tags", tagId));
}

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

function convertTagToDocument(tag: TagModel) {
  const { id, ...tagWithoutId } = tag;
  return tagWithoutId;
}
