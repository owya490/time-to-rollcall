import { currentYearStr } from "@/helper/Time";
import { firestore } from "@/lib/firebase";
import { GroupId } from "@/models/Group";
import { MemberId, MemberModel } from "@/models/Member";
import { addDoc, collection, deleteDoc, doc, setDoc } from "firebase/firestore";

export async function createMember(groupId: GroupId, member: MemberModel) {
  const ref = await addDoc(
    collection(
      firestore,
      "groups",
      groupId,
      "members",
      currentYearStr,
      "members"
    ),
    convertMemberToDocument(member)
  );
  return { ...member, id: ref.id } as MemberModel;
}

export async function updateMember(groupId: GroupId, member: MemberModel) {
  await setDoc(
    doc(
      firestore,
      "groups",
      groupId,
      "members",
      currentYearStr,
      "members",
      member.id
    ),
    convertMemberToDocument(member)
  );
}

export async function deleteMember(groupId: GroupId, memberId: MemberId) {
  await deleteDoc(
    doc(
      firestore,
      "groups",
      groupId,
      "members",
      currentYearStr,
      "members",
      memberId
    )
  );
}

function convertMemberToDocument(member: MemberModel) {
  const { id, metadata, ...memberWithoutId } = member;
  if (metadata) {
    return { ...memberWithoutId, metadata };
  }
  return memberWithoutId;
}

export function convertMemberIdToReference(
  groupId: GroupId,
  memberId: MemberId
) {
  return doc(
    firestore,
    "groups",
    groupId,
    "members",
    currentYearStr,
    "members",
    memberId
  );
}
