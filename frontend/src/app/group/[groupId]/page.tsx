"use client";
import AuthCheck from "@/components/AuthCheck";
import Event from "@/components/Event";
import { Filter, InitFilter, filters } from "@/helper/Filter";
import { GroupContext, UserContext } from "@/lib/context";
import { getEvents } from "@/lib/events";
import { EventModel } from "@/models/Event";
import { useContext, useEffect, useState } from "react";

export default function Group({ params }: { params: { groupId: string } }) {
  const user = useContext(UserContext);
  const group = useContext(GroupContext);
  const [events, setEvents] = useState<EventModel[]>([]);

  const [filter, setFilter] = useState<Filter>(InitFilter);

  useEffect(() => {
    // TODO Ian
    // check user.groups is this groupId in this array?
    // if no addUserGroups()
    // if yes, do nothing

    // TODO Tag sorting
    getEvents(params.groupId).then((events) => setEvents(events));
  }, [user]);

  return (
    <AuthCheck>
      <div className="p-8">
        <h1 className="text-4xl font-semibold pb-6">Events</h1>
        <div className="flex items-center justify-between">
          <p>Sort by:</p>
          <div className="flex items-center justify-between gap-3">
            {filters.map((f, i) => (
              <button
                key={i}
                className={filter.name === f.name ? "font-bold" : ""}
                onClick={() => {
                  setEvents(f.sort(events));
                  setFilter(f);
                }}
              >
                {f.name}
              </button>
            ))}
          </div>
          {filter.name === "Tag" &&
            group &&
            group.tags &&
            group.tags.map((tag, i) => (
              <button key={i} onClick={() => {}}>
                {tag.name}
              </button>
            ))}
        </div>
      </div>
      {events.map((event, i) => (
        <div>
          <hr className="mx-8 my-4 h-[1px] border-t-0 bg-neutral-300" />
          <Event key={i} event={event} groupId={params.groupId} />
        </div>
      ))}
      <hr className="mx-8 my-4 h-[1px] border-t-0 bg-neutral-300" />
      <h1 className="mt-96">
        Ian - SOW-419: TODO Add this group to list if it is the users first time
        going onto this group
      </h1>
      <h1>SOW-416: TODO Group settings</h1>
    </AuthCheck>
  );
}
