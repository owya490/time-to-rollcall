import { addDoc, collection, doc, getDoc } from "firebase/firestore";
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
    groups.push(await getGroup(groupId));
  }
  return groups;
}

export async function getGroup(groupId: string) {
  let groupDoc = await getDoc(doc(firestore, "groups", groupId));
  let tags = await getTags(groupId);
  return { ...(await convertToJavascript(groupDoc)), tags } as GroupModel;
}

// create group function
// it should return created group
// make a button that triggers this function
// with hardcoded values
// addDoc groups collection, object, { name }
// loop through tagNames, call addDoc on the group -> tags collection {name: tagName}
export async function createGroup(
  name: string,
  tagNames: string[],
  id: UserId
) {
  const addedDoc = await addDoc(collection(firestore, "groups"), {
    name,
  });
  await addGroupToUserGroups(id, addedDoc.id);
  tagNames.map(
    async (t) =>
      await addDoc(collection(firestore, "groups", addedDoc.id, "tags"), {
        name: t,
      })
  );

  return getGroup(addedDoc.id);
}
