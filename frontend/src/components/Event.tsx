import { Path } from "@/helper/Path";
import { EventModel } from "@/models/Event";
import { inBetween, toddMonYYYY } from "helper/Time";
import Link from "next/link";

export default function Event({
  event,
  groupId,
}: {
  event: EventModel;
  groupId: string;
}) {
  const now = new Date();
  const happeningNow = inBetween(event.dateStart, now, event.dateEnd);
  return (
    <div className={happeningNow ? "py-6 px-8 bg-[#303030]" : "pt-6 px-8"}>
      <div className="flex flex-wrap items-start justify-between mx-auto">
        {happeningNow ? (
          <p className="text-green-500 text-xs font-medium pb-4">
            ●&nbsp;&nbsp;Happening Now
          </p>
        ) : (
          <p className="text-[#acacac] text-xs font-medium pb-4">Finished</p>
        )}
        <p
          className={
            happeningNow
              ? "text-[#acacac] text-xs font-medium"
              : "text-black text-xs font-medium"
          }
        >
          Tag: TODO
        </p>
      </div>
      <p
        className={
          happeningNow
            ? "text-[#acacac] text-sm font-medium pb-1"
            : "text-[#666666] text-sm font-medium pb-1"
        }
      >
        {toddMonYYYY(event.dateStart)}{" "}
        {event.dateEnd && "- " + toddMonYYYY(event.dateEnd)}
      </p>
      <h2
        className={
          happeningNow
            ? "text-lg font-semibold pb-4 text-white"
            : "text-lg font-semibold pb-4 text-black"
        }
      >
        {event.name}
      </h2>
      <div className="flex flex-wrap items-center justify-between mx-auto">
        <button
          type="button"
          disabled
          className="text-gray-900 bg-[#e8e8e8] rounded font-medium text-xs p-2"
        >
          Attendance: 20
        </button>
        <Link
          type="button"
          href={`${Path.Group}/${groupId}/event/${event.id}`}
          className={
            happeningNow
              ? "text-white bg-transparent border border-white hover:bg-gray-700 text-sm p-2"
              : "text-black bg-transparent border border-black hover:bg-gray-100 text-sm p-2"
          }
        >
          {happeningNow ? "Check-in ➝" : "Edit ➝"}
        </Link>
      </div>
      {!happeningNow && (
        <hr className="mt-6 h-[1px] border-t-0 bg-neutral-300" />
      )}
    </div>
  );
}
