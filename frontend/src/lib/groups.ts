import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { firestore } from "@/lib/firebase";
import { GroupModel } from "@/models/Group";
import { addTag, updateTag } from "./tags";
import { addGroupToUserGroups } from "./users";
import { User } from "@/models/User";
import { TagModel } from "@/models/Tag";

export async function createGroup(
  user: User,
  group: GroupModel,
  tags: TagModel[]
) {
  const addedDoc = await addDoc(collection(firestore, "groups"), {
    name: group.name,
  });
  await addGroupToUserGroups(user.id, addedDoc.id);
  for (const tag of tags) {
    await addDoc(collection(firestore, "groups", addedDoc.id, "tags"), {
      name: tag.name,
    });
  }
}

export async function updateGroup(group: GroupModel, tags: TagModel[]) {
  const { id, ...groupWithoutId } = group;
  await updateDoc(doc(firestore, "groups", group.id), groupWithoutId);
  for (const tag of tags) {
    if (tag.id === "placeholder") {
      await addTag(group.id, tag);
    } else {
      await updateTag(group.id, tag);
    }
  }
}
