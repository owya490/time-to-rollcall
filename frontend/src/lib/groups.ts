import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { firestore } from "@/lib/firebase";
import { GroupModel } from "@/models/Group";
import { addTag, deleteTag, updateTag } from "./tags";
import { TagModel } from "@/models/Tag";

export async function createGroup(group: GroupModel) {
  return (
    await addDoc(collection(firestore, "groups"), {
      name: group.name,
    })
  ).id;
}

export async function updateGroup(
  group: GroupModel,
  tags: TagModel[] | null | undefined,
  deleteTags: TagModel[]
) {
  const { id, ...groupWithoutId } = group;
  await updateDoc(doc(firestore, "groups", group.id), groupWithoutId);
  for (const tag of deleteTags) {
    await deleteTag(group.id, tag.id);
  }
  for (const tag of tags ?? []) {
    if (tag.id === "placeholder") {
      await addTag(group.id, tag);
    } else {
      await updateTag(group.id, tag);
    }
  }
}
