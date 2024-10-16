import { EventModel } from "@/models/Event";
import { GroupModel } from "@/models/Group";
import { MemberModel } from "@/models/Member";
import { MetadataModel } from "@/models/Metadata";
import { TagModel } from "@/models/Tag";
import { User } from "@/models/User";
import { createContext } from "react";

export const UserContext = createContext<User | null | undefined>(null);

export const GroupContext = createContext<GroupModel | null | undefined>(null);

export const TagsContext = createContext<TagModel[] | null | undefined>(null);

export const MembersContext = createContext<MemberModel[] | null | undefined>(
  null
);

export const MetadataContext = createContext<
  MetadataModel[] | null | undefined
>(null);

// null = loading
// undefined = not found
export const EventContext = createContext<EventModel | null | undefined>(null);
