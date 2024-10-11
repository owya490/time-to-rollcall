import { GroupModel } from "@/models/Group";
import { User } from "@/models/User";
import { Dispatch, SetStateAction, createContext } from "react";

export const UserContext = createContext<User>(null);

export const GroupContext = createContext<
  [GroupModel, Dispatch<SetStateAction<GroupModel>>]
>([null, null]);
