import { Tag } from "./Group";

export interface EventModel {
  id: string;
  name: string;
  tags: Tag[];
  dateStart: Date;
  dateEnd?: Date;
}

export interface SubmitEventModel {
  name: string;
  tagIds: string[];
  dateStart: Date;
  dateEnd?: Date;
}

export const InitSubmitEvent = {
  name: "",
  tagIds: [],
  dateStart: new Date(),
};
