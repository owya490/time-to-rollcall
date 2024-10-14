import { GroupId } from "./Group";

export type UserId = string;

export interface User {
  id: UserId;
  email: string;
  displayName: string | null;
  role?: string;
  groups?: GroupId[];
}
