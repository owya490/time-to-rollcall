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
        suggested.length < 3 &&
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
