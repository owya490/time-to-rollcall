import { MemberModel } from "./Member";
import { TagModel } from "./Tag";

export type EventId = string;

export interface EventModel {
  id: EventId;
  name: string;
  tags: TagModel[];
  dateStart: Date;
  dateEnd: Date;
  members?: MemberModel[];
}

export const InitEvent: EventModel = {
  id: "1",
  name: "",
  tags: [],
  dateStart: new Date(),
  dateEnd: new Date(new Date().getTime() + 7200000),
};
