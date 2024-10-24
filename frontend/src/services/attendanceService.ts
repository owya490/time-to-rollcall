import { MemberInformation } from "@/models/Event";
import { MemberModel } from "@/models/Member";

export function searchForMemberByName(
  members: MemberModel[],
  searchInput: string
) {
  return members.reduce(
    function (
      {
        suggested,
        notSuggested,
      }: { suggested: MemberModel[]; notSuggested: MemberModel[] },
      member
    ) {
      if (
        member.name
          .toLocaleLowerCase()
          .includes(searchInput.toLocaleLowerCase())
      ) {
        suggested.push(member);
      } else {
        notSuggested.push(member);
      }
      return { suggested, notSuggested };
    },
    { suggested: [], notSuggested: [] }
  );
}

export function searchForMemberInformationByName(
  members: MemberInformation[],
  searchInput: string
) {
  return members.reduce(
    function (
      {
        suggested,
        notSuggested,
      }: { suggested: MemberInformation[]; notSuggested: MemberInformation[] },
      memberInfo
    ) {
      if (
        memberInfo.member.name
          .toLocaleLowerCase()
          .includes(searchInput.toLocaleLowerCase())
      ) {
        suggested.push(memberInfo);
      } else {
        notSuggested.push(memberInfo);
      }
      return { suggested, notSuggested };
    },
    { suggested: [], notSuggested: [] }
  );
}
