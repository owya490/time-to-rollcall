import { EventModel } from "@/models/Event";
import { inBetween } from "./Time";

export interface Filter {
  name: string;
  sort: (events: EventModel[]) => EventModel[];
}

const liveFilter = {
  name: "Live",
  sort: (events: EventModel[]) =>
    events.filter((e) => inBetween(e.dateStart, new Date(), e.dateEnd)),
};

export const newestFilter = {
  name: "Newest",
  sort: (events: EventModel[]) =>
    events.sort(
      (a, b) =>
        (b.dateEnd ? b.dateEnd : b.dateStart).valueOf() -
        (a.dateEnd ? a.dateEnd : a.dateStart).valueOf()
    ),
};

const oldestFilter = {
  name: "Oldest",
  sort: (events: EventModel[]) =>
    events.sort(
      (a, b) =>
        (a.dateEnd ? a.dateEnd : a.dateStart).valueOf() -
        (b.dateEnd ? b.dateEnd : b.dateStart).valueOf()
    ),
};

const tagsFilter = {
  name: "Tags",
  sort: (events: EventModel[]) =>
    events.sort(
      (a, b) =>
        (b.dateEnd ? b.dateEnd : b.dateStart).valueOf() -
        (a.dateEnd ? a.dateEnd : a.dateStart).valueOf()
    ),
};

export const filters = [newestFilter, oldestFilter, liveFilter, tagsFilter];

export const InitFilter = newestFilter;
