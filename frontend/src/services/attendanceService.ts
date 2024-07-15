import { Member } from "app/group/[groupId]/event/[eventId]/page";

const USERBASE: Member[] = [
  {
    name: "Owen Yang",
  },
  {
    name: "Octopus Yang",
  },
  {
    name: "Oliver Yang",
  },
  {
    name: "Daniel Kim",
  },
  {
    name: "Daniel Lee",
  },
  {
    name: "Dom Tjong",
  },
  {
    name: "Ian Kim",
  },
];

export function searchForMemberByName(searchInput: string) {
  return USERBASE.reduce(function (filtered: Member[], user) {
    if (
      user.name.toLocaleLowerCase().startsWith(searchInput.toLocaleLowerCase())
    ) {
      filtered.push(user);
    }
    return filtered;
  }, []);
}
