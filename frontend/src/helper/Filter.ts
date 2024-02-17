import { EventModel } from "@/models/Event";
import { inBetween } from "./Time";

export interface Filter {
  name: string;
  sort: (events: EventModel[]) => EventModel[];
}

export const filters = [
  {
    name: "Live",
    sort: (events: EventModel[]) =>
      events.filter((e) => inBetween(e.dateStart, new Date(), e.dateEnd)),
  },
  {
    name: "Newest",
    sort: (events: EventModel[]) =>
      events.sort(
        (a, b) =>
          (b.dateEnd ? b.dateEnd : b.dateStart).valueOf() -
          (a.dateEnd ? a.dateEnd : a.dateStart).valueOf()
      ),
  },
  {
    name: "Oldest",
    sort: (events: EventModel[]) =>
      events.sort(
        (a, b) =>
          (a.dateEnd ? a.dateEnd : a.dateStart).valueOf() -
          (b.dateEnd ? b.dateEnd : b.dateStart).valueOf()
      ),
  },
  {
    name: "Tags",
    sort: (events: EventModel[]) =>
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
