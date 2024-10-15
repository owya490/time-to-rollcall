import { EventModel } from "@/models/Event";
import { GroupModel } from "@/models/Group";
import { MemberModel } from "@/models/Member";
import { User } from "@/models/User";
import { Dispatch, SetStateAction, createContext } from "react";

export const UserContext = createContext<
  [User | null | undefined, Dispatch<SetStateAction<User | null | undefined>>]
>([null, () => {}]);

export const GroupContext = createContext<
  [GroupModel | null, Dispatch<SetStateAction<GroupModel | null>>]
>([null, () => {}]);

export const MembersContext = createContext<
  [MemberModel[] | null, Dispatch<SetStateAction<MemberModel[] | null>>]
>([null, () => {}]);

export const EventContext = createContext<
  [EventModel | null, Dispatch<SetStateAction<EventModel | null>>]
>([null, () => {}]);
