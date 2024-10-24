"use client";
import { EventContext, EventsContext } from "@/lib/context";
import { EventId } from "@/models/Event";
import { GroupId } from "@/models/Group";
import React, { useContext } from "react";

export default function PrivateLayoutEvent({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { groupId: GroupId; eventId: EventId };
}) {
  const event = useContext(EventsContext)?.find((e) => e.id === params.eventId);

  return (
    <EventContext.Provider value={event}>{children}</EventContext.Provider>
  );
}
