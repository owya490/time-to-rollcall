import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
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
    let group = await getGroup(groupId);
    if (group) {
      groups.push(group);
    }
  }
  return groups;
}

export async function getGroup(groupId: string) {
  let groupDoc = await getDoc(doc(firestore, "groups", groupId));
  let tags = await getTags(groupId);
  let data = await convertToJavascript(groupDoc);
  if (data) {
    return { ...(await convertToJavascript(groupDoc)), tags } as GroupModel;
  } else {
    return undefined;
  }
}

export async function createGroup(
  name: string,
  tagNames: string[],
  userId: UserId
) {
  const addedDoc = await addDoc(collection(firestore, "groups"), {
    name,
  });
  await addGroupToUserGroups(userId, addedDoc.id);
  for (const tagName of tagNames) {
    await addDoc(collection(firestore, "groups", addedDoc.id, "tags"), {
      name: tagName,
    });
  }

  return getGroup(addedDoc.id);
}

export async function updateGroup(group: GroupModel) {
  await updateDoc(
    doc(firestore, "groups", group.id),
    convertGroupToDocument(group)
  );
}

function convertGroupToDocument(group: GroupModel) {
  const { id, tags, ...groupWithoutId } = group;
  return groupWithoutId;
}
