import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { convertToJavascript, firestore } from "@/lib/firebase";
import { GroupModel } from "@/models/Group";
import { getTags } from "./tags";
import { addGroupToUserGroups } from "./users";
import { User } from "@/models/User";

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
  let data = await convertToJavascript(groupDoc);
  if (data) {
    let tags = await getTags(groupId);
    return { ...(await convertToJavascript(groupDoc)), tags } as GroupModel;
  } else {
    return undefined;
  }
}

export async function createGroup(user: User, group: GroupModel) {
  const addedDoc = await addDoc(collection(firestore, "groups"), {
    name: group.name,
  });
  await addGroupToUserGroups(user.id, addedDoc.id);
  for (const tag of group.tags) {
    await addDoc(collection(firestore, "groups", addedDoc.id, "tags"), {
      name: tag.name,
    });
  }

  return await getGroup(addedDoc.id);
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
