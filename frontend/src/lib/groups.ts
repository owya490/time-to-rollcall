import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { convertToJavascript, firestore } from "@/lib/firebase";
import { GroupModel } from "@/models/Group";
import { addTag, getTags, updateTag } from "./tags";
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
  for (const tag of group.tags) {
    if (tag.id === "placeholder") {
      await addTag(group.id, tag);
    } else {
      await updateTag(group.id, tag);
    }
  }
  return getGroup(group.id);
}

function convertGroupToDocument(group: GroupModel) {
  const { id, tags, ...groupWithoutId } = group;
  return groupWithoutId;
}
