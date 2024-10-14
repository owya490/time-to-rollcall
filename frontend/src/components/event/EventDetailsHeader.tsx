import { EventModel } from "@/models/Event";
import LiveBadge from "./LiveBadge";
import { hoursAndMinutes, inBetween, sameDay, toddMMYYYY } from "@/helper/Time";

export default function EventDetailsHeader({ event }: { event: EventModel }) {
  const now = new Date();
  const happeningNow = inBetween(event.dateStart, now, event.dateEnd);
  return (
    <>
      <div className="flex items-center w-full h-min">
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
      <div className="flex flex-wrap justify-start">
        {event.tags?.map((t, i) => (
          <button
            type="button"
            key={i}
            disabled
            className="rounded-3xl border-transparent border-2 bg-blue-100 px-2 py-1 mr-2 my-1 text-xs font-medium text-blue-900"
          >
            {t.name}
          </button>
        ))}
      </div>
    </>
  );
}
