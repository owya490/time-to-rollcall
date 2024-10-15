import { TagModel } from "./Tag";

export type GroupId = string;

export interface GroupModel {
  id: GroupId;
  name: string;
  tags: TagModel[];
}

export const InitGroup = {
  id: "placeholder",
  name: "",
  tags: [],
};
