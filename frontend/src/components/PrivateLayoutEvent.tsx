"use client";
import { EventContext, UserContext } from "@/lib/context";
import { useEventListener } from "@/lib/hooks";
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
  const user = useContext(UserContext);
  const event = useEventListener(user, params.groupId, params.eventId);

  return (
    <EventContext.Provider value={event}>{children}</EventContext.Provider>
  );
}
