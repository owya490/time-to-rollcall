import { GroupId } from "@/models/Group";
import { MetadataModel, MetadataId } from "@/models/Metadata";
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
  convertToFirestore,
  convertToJavascript,
  firestore,
} from "./firebase";

export async function editMetadatas(
  groupId: GroupId,
  metadatas: MetadataModel[],
  deleteMetadatas: MetadataModel[]
) {
  for (const md of metadatas) {
    if (md.id === "placeholder") {
      await addMetadata(groupId, md);
    } else {
      await updateMetadata(groupId, md);
    }
  }
  for (const md of deleteMetadatas) {
    await deleteMetadata(groupId, md.id);
  }
}

export async function addMetadata(groupId: GroupId, tag: MetadataModel) {
  const addedDoc = await addDoc(
    collection(firestore, "groups", groupId, "metadata"),
    convertToFirestore(tag)
  );
  return { ...tag, id: addedDoc.id };
}

export async function updateMetadata(groupId: GroupId, tag: MetadataModel) {
  await updateDoc(
    doc(firestore, "groups", groupId, "metadata", tag.id),
    convertToFirestore(tag)
  );
}

export async function deleteMetadata(groupId: GroupId, tagId: MetadataId) {
  await deleteDoc(doc(firestore, "groups", groupId, "metadata", tagId));
}

export async function getMetadatas(groupId: GroupId) {
  const metadata = await getDocs(
    collection(firestore, "groups", groupId, "metadata")
  );
  return (await convertCollectionToJavascript(
    metadata.docs
  )) as MetadataModel[];
}

export async function getMetadata(groupId: GroupId, tagId: MetadataId) {
  const tag = await getDoc(
    doc(firestore, "groups", groupId, "metadata", tagId)
  );
  return (await convertToJavascript(tag)) as MetadataModel;
}

export function convertMetadataIdToReference(
  groupId: GroupId,
  tagId: MetadataId
) {
  return doc(firestore, "groups", groupId, "metadata", tagId);
}
