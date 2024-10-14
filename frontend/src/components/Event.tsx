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
    <div className="mx-6 my-4">
      <EventDetailsHeader event={event} />
      <div className="flex items-center justify-between">
        <button
          type="button"
          disabled
          className="text-gray-900 bg-gray-200 rounded-md font-medium text-xs p-1.5"
        >
          ATTENDANCE: {event.members?.length ?? 0}
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
    <div className="mx-6 my-4">
      <div className="mb-3">
        <EventDetailsHeader event={event} />
      </div>
      <div className="flex items-center justify-between">
        <p className="text-gray-900 font-medium text-xs">
          ATTENDANCE: {event.members?.length ?? 0}
        </p>
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
