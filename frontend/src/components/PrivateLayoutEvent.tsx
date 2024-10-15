"use client";
import {
  EventContext,
  GroupContext,
  MembersContext,
  UserContext,
} from "@/lib/context";
import { useEventData, useGroupData } from "@/lib/hooks";
import { GroupId, InitGroup } from "@/models/Group";
import React, { useContext, useEffect, useState } from "react";
import Topbar from "./Topbar";
import { EventId } from "@/models/Event";
import EditEvent from "./event/EditEvent";
import { TagModel } from "@/models/Tag";
import { deleteEvent, updateEvent } from "@/lib/events";
import { useRouter } from "next/navigation";
import { Path } from "@/helper/Path";
import { getMembers } from "@/lib/members";
import { MemberModel } from "@/models/Member";

export default function PrivateLayoutEvent({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { groupId: GroupId; eventId: EventId };
}) {
  const [user] = useContext(UserContext);
  const router = useRouter();

  const [members, setMembers] = useState<MemberModel[]>([]);

  const groupData = useGroupData(user, params.groupId);

  useEffect(() => {
    if (groupData[0]) {
      getMembers(groupData[0].id).then((members) => setMembers(members));
    }
  }, [groupData[0]]);
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

  async function deleteEventIn() {
    setUpdatingDelete(true);
    if (groupData[0] && eventData[0]) {
      await deleteEvent(groupData[0].id, eventData[0].id);
      router.push(Path.Group + "/" + groupData[0].id);
    }
    setUpdatingDelete(false);
    closeModal();
  }

  const [updatingDelete, setUpdatingDelete] = useState(false);
  const [deleteConfirmationIsOpen, setDeleteConfirmationIsOpen] =
    useState(false);

  function closeDeleteConfirmationModal() {
    setDeleteConfirmationIsOpen(false);
  }

  function openDeleteConfirmationModal() {
    setDeleteConfirmationIsOpen(true);
  }
  console.log("hey");

  return (
    <GroupContext.Provider value={groupData}>
      <MembersContext.Provider value={[members, setMembers]}>
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
              deleteConfirmationIsOpen={deleteConfirmationIsOpen}
              openDeleteConfirmationModal={openDeleteConfirmationModal}
              closeDeleteConfirmationModal={closeDeleteConfirmationModal}
              submitEventForm={eventData[0]}
              setSubmitEventForm={eventData[1]}
              createEvent={editEvent}
              deleteEvent={deleteEventIn}
              updatingDelete={updatingDelete}
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
