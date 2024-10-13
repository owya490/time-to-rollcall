import { EventModel } from "@/models/Event";
import LiveBadge from "./LiveBadge";
import { inBetween, sameDay, toddMMYYYY } from "@/helper/Time";

export default function EventDetailsHeader({ event }: { event: EventModel }) {
  const now = new Date();
  const happeningNow = inBetween(event.dateStart, now, event.dateEnd);
  return (
    <div className="flex items-center w-full h-min">
      <p className="text-gray-500 font-light text-sm">
        {toddMMYYYY(event.dateStart)}
        {!sameDay(event.dateStart, event.dateEnd)
          ? " - " + toddMMYYYY(event.dateEnd)
          : ""}
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
  );
}
