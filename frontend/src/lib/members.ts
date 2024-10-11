import { convertCollectionToJavascript, firestore } from "@/lib/firebase";
import { GroupId } from "@/models/Group";
import { MemberModel } from "@/models/Member";
import { collection, getDocs } from "firebase/firestore";

export async function getMembers(groupId: GroupId) {
  const members = await getDocs(
    collection(firestore, "groups", groupId, "members")
  );
  return (await convertCollectionToJavascript(members.docs)) as MemberModel[];
}
