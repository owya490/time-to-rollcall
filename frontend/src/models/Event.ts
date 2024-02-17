export interface EventModel {
  id: string;
  name: string;
  tags: string[];
  dateStart: Date;
  dateEnd?: Date;
}

export interface SubmitEventModel {
  name: string;
  tags: string[];
  dateStart: Date;
  dateEnd?: Date;
}

export const InitSubmitEvent = {
  name: "",
  tags: [],
  dateStart: new Date(),
};
