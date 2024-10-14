import { EventModel } from "@/models/Event";
import LiveBadge from "./LiveBadge";
import { hoursAndMinutes, inBetween, sameDay, toddMMYYYY } from "@/helper/Time";
import Tag from "./Tag";

export default function EventDetailsHeader({ event }: { event: EventModel }) {
  const now = new Date();
  const happeningNow = inBetween(event.dateStart, now, event.dateEnd);
  return (
    <>
      <div className="flex items-center w-full h-min mb-3">
        <p className="text-gray-500 text-xs font-medium">
          {toddMMYYYY(event.dateStart)}
          {sameDay(event.dateStart, event.dateEnd)
            ? " - " + hoursAndMinutes(event.dateEnd)
            : " - " + toddMMYYYY(event.dateEnd)}
        </p>
        <div className="flex ml-auto">
          {happeningNow ? (
            <LiveBadge />
          ) : (
            <p className="text-xs font-medium text-gray-500">
              {now < event.dateStart ? "NOT YET" : "ENDED"}
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-wrap justify-start pt-4">
        {event.tags?.map((t, i) => (
          <Tag key={i} tag={t} disabled />
        ))}
      </div>
      <h1
        className={
          happeningNow ? "text-2xl font-semibold" : "text-lg font-semibold"
        }
      >
        {event.name}
      </h1>
    </>
  );
}
