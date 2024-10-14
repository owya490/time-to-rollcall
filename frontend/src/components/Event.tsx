import { Path } from "@/helper/Path";
import { EventModel } from "@/models/Event";
import { inBetween } from "helper/Time";
import Link from "next/link";
import EventDetailsHeader from "./event/EventDetailsHeader";

function EventHappeningNow({
  event,
  groupId,
}: {
  event: EventModel;
  groupId: string;
}) {
  return (
    <div className="mx-6">
      <EventDetailsHeader event={event} />
      <h1 className="text-2xl font-semibold pb-28 mt-4">{event.name}</h1>
      <div className="flex items-center justify-between">
        <button
          type="button"
          disabled
          className="text-gray-900 bg-[#e8e8e8] rounded-md font-medium text-xs p-1.5"
        >
          ATTENDANCE: {event.members?.length}
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
  return (
    <div className="mx-6">
      <div className="mb-3">
        <EventDetailsHeader event={event} />
      </div>
      <h1 className="text-lg font-semibold pb-8">{event.name}</h1>
      <div className="flex items-center justify-between">
        <button
          type="button"
          disabled
          className="text-gray-900 bg-[#e8e8e8] rounded-md font-medium text-xs p-1.5"
        >
          ATTENDANCE: {event.members?.length}
        </button>
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
