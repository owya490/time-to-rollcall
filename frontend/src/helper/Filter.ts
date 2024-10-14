import { EventModel } from "@/models/Event";
import { inBetween } from "./Time";
import { TagId } from "@/models/Tag";

export interface Filter {
  name: string;
  sort: (events: EventModel[], tagIds: TagId[]) => EventModel[];
}

const filterTags = (events: EventModel[], tagIds: TagId[]) =>
  events.filter((e) =>
    tagIds.every((tagId) => e.tags.map((t) => t.id).includes(tagId))
  );

const liveFilter: Filter = {
  name: "Live",
  sort: (events: EventModel[], tagIds: TagId[]) =>
    filterTags(events, tagIds).filter((e) =>
      inBetween(e.dateStart, new Date(), e.dateEnd)
    ),
};

export const newestFilter: Filter = {
  name: "Newest",
  sort: (events: EventModel[], tagIds: TagId[]) =>
    filterTags(events, tagIds).sort(
      (a, b) =>
        (b.dateEnd ? b.dateEnd : b.dateStart).valueOf() -
        (a.dateEnd ? a.dateEnd : a.dateStart).valueOf()
    ),
};

const oldestFilter: Filter = {
  name: "Oldest",
  sort: (events: EventModel[], tagIds: TagId[]) =>
    filterTags(events, tagIds).sort(
      (a, b) =>
        (a.dateEnd ? a.dateEnd : a.dateStart).valueOf() -
        (b.dateEnd ? b.dateEnd : b.dateStart).valueOf()
    ),
};

export const filters = [newestFilter, oldestFilter, liveFilter];

export const InitFilter = newestFilter;
