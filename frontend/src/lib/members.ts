import { firestore } from "@/lib/firebase";
import { GroupId } from "@/models/Group";
import { MemberId, MemberModel } from "@/models/Member";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

export async function createMember(groupId: GroupId, member: MemberModel) {
  const ref = await addDoc(
    collection(firestore, "groups", groupId, "members"),
    convertMemberToDocument(member)
  );
  return { ...member, id: ref.id } as MemberModel;
}

export async function updateMember(groupId: GroupId, member: MemberModel) {
  await setDoc(
    doc(firestore, "groups", groupId, "members", member.id),
    convertMemberToDocument(member)
  );
}

function convertMemberToDocument(member: MemberModel) {
  const { id, ...memberWithoutId } = member;
  return memberWithoutId;
}

export function convertMemberIdToReference(
  groupId: GroupId,
  memberId: MemberId
) {
  return doc(firestore, "groups", groupId, "members", memberId);
}
