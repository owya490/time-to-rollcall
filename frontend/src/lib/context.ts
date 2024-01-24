import { GroupModel } from "@/models/Group";
import { User } from "@/models/User";
import { createContext } from "react";

export const UserContext = createContext<User>(null);

export const GroupContext = createContext<GroupModel>(null);
