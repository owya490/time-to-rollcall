import { Path } from "@/helper/Path";
import { EventModel } from "@/models/Event";
import { inBetween, sameDay, toddMMYYYY } from "helper/Time";
import Link from "next/link";

function EventHappeningNow({
  event,
  groupId,
}: {
  event: EventModel;
  groupId: string;
}) {
  return (
    <div className="mx-6">
      <div className="flex items-start justify-between">
        <p className="text-gray-500 text-xs font-medium pb-2">
          {toddMMYYYY(event.dateStart)}
          {!sameDay(event.dateStart, event.dateEnd)
            ? " - " + toddMMYYYY(event.dateEnd)
            : ""}
        </p>
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4"
          >
            <circle cx="12" cy="12" r="6"></circle>
          </svg>
          <p className="text-xs font-medium">LIVE</p>
        </div>
      </div>
      <h1 className="text-2xl font-semibold pb-32">{event.name}</h1>
      <div className="flex items-center justify-between">
        <button
          type="button"
          disabled
          className="text-gray-900 bg-[#e8e8e8] rounded-md font-medium text-xs p-1.5"
        >
          ATTENDANCE: 20
        </button>
        <Link
          type="button"
          href={`${Path.Group}/${groupId}/event/${event.id}`}
          className="text-black bg-transparent border border-black rounded-3xl hover:bg-gray-100 text-sm p-1 px-3"
        >
          Check-in
        </Link>
      </div>
    </div>
  );
}

function EventOther({
  event,
  groupId,
}: {
  event: EventModel;
  groupId: string;
}) {
  const now = new Date();
  return (
    <div className="mx-6">
      <div className="flex items-start justify-between">
        <p className="text-gray-500 text-xs font-medium pb-2">
          {toddMMYYYY(event.dateStart)}
          {!sameDay(event.dateStart, event.dateEnd)
            ? " - " + toddMMYYYY(event.dateEnd)
            : ""}
        </p>
        <p className="text-xs font-medium text-gray-500">
          {now < event.dateStart ? "NOT YET" : "ENDED"}
        </p>
      </div>
      <h1 className="text-lg font-semibold pb-8">{event.name}</h1>
      <div className="flex items-center justify-between">
        <p className="text-gray-900 font-medium text-xs">ATTENDANCE: 20</p>
        <Link
          type="button"
          href={`${Path.Group}/${groupId}/event/${event.id}`}
          className="text-black bg-transparent border border-black rounded-3xl hover:bg-gray-100 text-sm p-1 px-3"
        >
          Edit
        </Link>
      </div>
    </div>
  );
}

export default function Event({
  event,
  groupId,
}: {
  event: EventModel;
  groupId: string;
}) {
  const now = new Date();
  const happeningNow = inBetween(event.dateStart, now, event.dateEnd);
  if (happeningNow) {
    return <EventHappeningNow event={event} groupId={groupId} />;
  } else {
    return <EventOther event={event} groupId={groupId} />;
  }
}
