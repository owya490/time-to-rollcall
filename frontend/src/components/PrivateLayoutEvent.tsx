"use client";
import {
  EventContext,
  GroupContext,
  MembersContext,
  UserContext,
} from "@/lib/context";
import { useEventData, useGroupData, useMembersData } from "@/lib/hooks";
import { GroupId, InitGroup } from "@/models/Group";
import React, { useContext, useState } from "react";
import Topbar from "./Topbar";
import { EventId } from "@/models/Event";
import EditEvent from "./event/EditEvent";
import { TagModel } from "@/models/Tag";
import { updateEvent } from "@/lib/events";

export default function PrivateLayoutEvent({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { groupId: GroupId; eventId: EventId };
}) {
  const [user] = useContext(UserContext);

  const groupData = useGroupData(user, params.groupId);
  const membersData = useMembersData(user, params.groupId);
  const eventData = useEventData(user, params.groupId, params.eventId);
  const [updating, setUpdating] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  async function editEvent() {
    setUpdating(true);
    if (groupData[0] && eventData[0]) {
      await updateEvent(groupData[0].id, eventData[0]);
      eventData[1](eventData[0]);
    }
    setUpdating(false);
    closeModal();
  }

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <GroupContext.Provider value={groupData}>
      <MembersContext.Provider value={membersData}>
        <EventContext.Provider value={eventData}>
          {eventData[0] && groupData[0] && (
            <EditEvent
              groupId={groupData[0].id}
              tags={groupData[0].tags}
              setTags={(tags: TagModel[]) =>
                groupData[1]({ ...(groupData[0] ?? InitGroup), tags })
              }
              isOpen={isOpen}
              closeModal={closeModal}
              submitEventForm={eventData[0]}
              setSubmitEventForm={eventData[1]}
              createEvent={editEvent}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
              updating={updating}
            />
          )}
          <Topbar openModal={openModal} />
          <div>{children}</div>
        </EventContext.Provider>
      </MembersContext.Provider>
    </GroupContext.Provider>
  );
}
