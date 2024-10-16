"use client";
import {
  EventContext,
  GroupContext,
  MembersContext,
  TagsContext,
  UserContext,
} from "@/lib/context";
import {
  useEventData,
  useGroupData,
  useMembersData,
  useTagsData,
} from "@/lib/hooks";
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
  const group = useGroupData(user, params.groupId);
  const members = useMembersData(user, group?.id);
  const tags = useTagsData(user, group?.id);
  const event = useEventData(user, params.groupId, params.eventId);

  return (
    <GroupContext.Provider value={group}>
      <MembersContext.Provider value={members}>
        <TagsContext.Provider value={tags}>
          <EventContext.Provider value={event}>
            {children}
          </EventContext.Provider>
        </TagsContext.Provider>
      </MembersContext.Provider>
    </GroupContext.Provider>
  );
}
