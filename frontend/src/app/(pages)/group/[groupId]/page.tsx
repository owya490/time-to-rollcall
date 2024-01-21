"use client";
import AuthCheck from "@/components/AuthCheck";
import Event from "@/components/Event";
import { Filter, InitFilter, filters } from "@/helper/Filter";
import { UserContext } from "@/lib/context";
import { getEvents } from "@/lib/events";
import { EventModel } from "@/models/Event";
import { useContext, useEffect, useState } from "react";

export default function Group({ params }: { params: { groupId: string } }) {
  const user = useContext(UserContext);
  const [events, setEvents] = useState<EventModel[]>([]);

  const [filter, setFilter] = useState<Filter>(InitFilter);

  useEffect(() => {
    // TODO Ian
    console.log(user.groups);
    // check user.groups is this groupId in this array?
    // if no addUserGroups()
    // if yes, do nothing
    getEvents(params.groupId).then((events) => setEvents(events));
  }, []);

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
        </div>
      </div>
      {events.map((event, i) => (
        <Event key={i} event={event} groupId={params.groupId} />
      ))}
      <h1>Group id: {params.groupId}</h1>
      <h1>Daniel L - SOW-402: TODO Metrics</h1>
      <h1>
        Ian - SOW-419: TODO Add this group to list if it is the users first time
        going onto this group
      </h1>
      <h1>Dominic - SOW-416: TODO Group settings</h1>
    </AuthCheck>
  );
}
