import { Tag } from "./Tag";

export type EventId = string;

export interface EventModel {
  id: EventId;
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
