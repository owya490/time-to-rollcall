import { GroupId } from "./Group";

export type UserId = string;

export interface User {
  id: UserId;
  email: string;
  groups: GroupId[];
  displayName: string | null;
}
