import { TagModel, TagId } from "./Tag";

export type EventId = string;

export interface EventModel {
  id: EventId;
  name: string;
  tags: TagModel[];
  dateStart: Date;
  dateEnd: Date;
}

export interface SubmitEventModel {
  name: string;
  tagIds: TagId[];
  dateStart: Date;
  dateEnd: Date;
}

export const InitSubmitEvent = {
  name: "",
  tagIds: [],
  dateStart: new Date(),
  dateEnd: new Date(),
};
