"use client";
import {
  EventContext,
  GroupContext,
  MembersContext,
  UserContext,
} from "@/lib/context";
import {
  useEventData,
  useGroupData,
  useMembersData,
  useTagsData,
} from "@/lib/hooks";
import { GroupId } from "@/models/Group";
import React, { useContext, useEffect, useState } from "react";
import Topbar from "./Topbar";
import { EventId, InitEvent } from "@/models/Event";
import EditEvent from "./event/EditEvent";
import { deleteEvent, updateEvent } from "@/lib/events";
import { useRouter } from "next/navigation";
import { Path } from "@/helper/Path";

export default function PrivateLayoutEvent({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { groupId: GroupId; eventId: EventId };
}) {
  const router = useRouter();
  const user = useContext(UserContext);

  const group = useGroupData(user, params.groupId);
  const tags = useTagsData(user, params.groupId);
  const members = useMembersData(user, group?.id);
  const event = useEventData(user, params.groupId, params.eventId);
  const [submitEventForm, setSubmitEventForm] = useState(InitEvent);
  const [updating, setUpdating] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  async function editEvent() {
    setUpdating(true);
    if (group && event) {
      await updateEvent(group.id, submitEventForm);
    }
    setUpdating(false);
    closeModal();
  }

  function closeModal() {
    setIsOpen(false);
    if (event) setSubmitEventForm(event);
  }

  function openModal() {
    setIsOpen(true);
  }

  async function deleteEventIn() {
    setUpdatingDelete(true);
    if (group && event) {
      await deleteEvent(group.id, event.id);
      router.push(Path.Group + "/" + group.id);
    }
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

  useEffect(() => {
    if (event) setSubmitEventForm(event);
    // eslint-disable-next-line
  }, [event]);

  return (
    <GroupContext.Provider value={group}>
      <MembersContext.Provider value={members}>
        <EventContext.Provider value={event}>
          {event && group && tags !== null && (
            <EditEvent
              groupId={group.id}
              tags={tags}
              isOpen={isOpen}
              closeModal={closeModal}
              deleteConfirmationIsOpen={deleteConfirmationIsOpen}
              openDeleteConfirmationModal={openDeleteConfirmationModal}
              closeDeleteConfirmationModal={closeDeleteConfirmationModal}
              submitEventForm={submitEventForm}
              setSubmitEventForm={setSubmitEventForm}
              createEvent={editEvent}
              deleteEvent={deleteEventIn}
              updatingDelete={updatingDelete}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
              updating={updating}
            />
          )}
          <Topbar openModal={openModal} />
          {children}
        </EventContext.Provider>
      </MembersContext.Provider>
    </GroupContext.Provider>
  );
}
