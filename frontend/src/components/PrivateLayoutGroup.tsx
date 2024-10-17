"use client";
import {
  EventsContext,
  GroupContext,
  MembersContext,
  MetadataContext,
  TagsContext,
  UserContext,
} from "@/lib/context";
import {
  useEventsListener,
  useGroupListener,
  useMembersListener,
  useMetadataListener,
  useTagsListener,
} from "@/lib/hooks";
import { GroupId } from "@/models/Group";
import React, { useContext } from "react";

export default function PrivateLayoutGroup({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { groupId: GroupId };
}) {
  const user = useContext(UserContext);
  const group = useGroupListener(user, params.groupId);
  const members = useMembersListener(user, group?.id);
  const metadata = useMetadataListener(user, group?.id);
  const events = useEventsListener(user, group?.id);
  const tags = useTagsListener(user, group?.id);
  return (
    <GroupContext.Provider value={group}>
      <MembersContext.Provider value={members}>
        <MetadataContext.Provider value={metadata}>
          <EventsContext.Provider value={events}>
            <TagsContext.Provider value={tags}>{children}</TagsContext.Provider>
          </EventsContext.Provider>
        </MetadataContext.Provider>
      </MembersContext.Provider>
    </GroupContext.Provider>
  );
}
