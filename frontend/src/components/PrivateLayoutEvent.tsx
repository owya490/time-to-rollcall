"use client";
import { EventContext, UserContext } from "@/lib/context";
import { EventId } from "@/models/Event";
import { GroupId } from "@/models/Group";
import React, { useContext } from "react";
import NotFoundPage from "./NotFoundPage";
import { useEventListener } from "@/lib/hooks";

export default function PrivateLayoutEvent({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { groupId: GroupId; year: string; eventId: EventId };
}) {
  const user = useContext(UserContext);
  const event = useEventListener(user, params.groupId, params.eventId);

  if (event)
    return (
      <EventContext.Provider value={event}>{children}</EventContext.Provider>
    );
  if (event !== null) {
    return <NotFoundPage />;
  }
}
