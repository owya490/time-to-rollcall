import { GroupModel } from "@/models/Group";
import { MemberModel } from "@/models/Member";
import { User } from "@/models/User";
import { Dispatch, SetStateAction, createContext } from "react";

export const UserContext = createContext<
  [User | null, Dispatch<SetStateAction<User>>]
>([null, () => {}]);

export const GroupContext = createContext<
  [GroupModel | null, Dispatch<SetStateAction<GroupModel>>]
>([null, () => {}]);

export const MembersContext = createContext<
  [MemberModel[], Dispatch<SetStateAction<MemberModel[]>>]
>([[], () => {}]);
