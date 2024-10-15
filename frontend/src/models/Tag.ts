export type TagId = string;

export interface TagModel {
  id: TagId;
  name: string;
  colour?: string;
}

export const InitTag = {
  id: "placeholder",
  name: "",
};
