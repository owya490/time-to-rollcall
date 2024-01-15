import { EventModel } from "@/models/Event";

export interface Filter {
  name: string;
  sort: (events: EventModel[]) => EventModel[];
}

export const filters = [
  {
    name: "Newest",
    sort: (events) =>
      events.sort(
        (a, b) =>
          (b.dateEnd ? b.dateEnd : b.dateStart).valueOf() -
          (a.dateEnd ? a.dateEnd : a.dateStart).valueOf()
      ),
  },
  {
    name: "Oldest",
    sort: (events) =>
      events.sort(
        (a, b) =>
          (a.dateEnd ? a.dateEnd : a.dateStart).valueOf() -
          (b.dateEnd ? b.dateEnd : b.dateStart).valueOf()
      ),
  },
  {
    name: "Tag",
    sort: (events) =>
      events.sort(
        (a, b) =>
          (b.dateEnd ? b.dateEnd : b.dateStart).valueOf() -
          (a.dateEnd ? a.dateEnd : a.dateStart).valueOf()
      ),
  },
];

export const InitFilter = {
  name: "Newest",
  sort: (events) =>
    events.sort(
      (a, b) =>
        (b.dateEnd ? b.dateEnd : b.dateStart).valueOf() -
        (a.dateEnd ? a.dateEnd : a.dateStart).valueOf()
    ),
};
