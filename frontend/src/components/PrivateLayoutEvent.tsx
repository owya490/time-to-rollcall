"use client";
import { EventContext, EventsContext } from "@/lib/context";
import { EventId } from "@/models/Event";
import { GroupId } from "@/models/Group";
import React, { useContext } from "react";
import NotFoundPage from "./NotFoundPage";

export default function PrivateLayoutEvent({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { groupId: GroupId; year: string; eventId: EventId };
}) {
  const events = useContext(EventsContext);
  const event =
    events !== null ? events?.find((e) => e.id === params.eventId) : null;

  if (event)
    return (
      <EventContext.Provider value={event}>{children}</EventContext.Provider>
    );
  if (event !== null) {
    return <NotFoundPage />;
  }
}
