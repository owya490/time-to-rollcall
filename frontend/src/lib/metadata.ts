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

export async function addMetadata(groupId: GroupId, md: MetadataModel) {
  const addedDoc = await addDoc(
    collection(firestore, "groups", groupId, "metadata"),
    convertToFirestore(md)
  );
  return { ...md, id: addedDoc.id };
}

export async function updateMetadata(groupId: GroupId, md: MetadataModel) {
  await updateDoc(
    doc(firestore, "groups", groupId, "metadata", md.id),
    convertToFirestore(md)
  );
}

export async function deleteMetadata(groupId: GroupId, mdId: MetadataId) {
  await deleteDoc(doc(firestore, "groups", groupId, "metadata", mdId));
}

export async function getMetadatas(groupId: GroupId) {
  const metadata = await getDocs(
    collection(firestore, "groups", groupId, "metadata")
  );
  return (await convertCollectionToJavascript(
    metadata.docs
  )) as MetadataModel[];
}

export async function getMetadata(groupId: GroupId, mdId: MetadataId) {
  const md = await getDoc(doc(firestore, "groups", groupId, "metadata", mdId));
  return (await convertToJavascript(md)) as MetadataModel;
}

export function convertMetadataIdToReference(
  groupId: GroupId,
  mdId: MetadataId
) {
  return doc(firestore, "groups", groupId, "metadata", mdId);
}
