"use client";
import Botbar from "@/components/Botbar";
import Loader from "@/components/Loader";
import Topbar from "@/components/Topbar";
import EditEvent from "@/components/event/EditEvent";
import EventComponent from "@/components/event/EventComponent";
import Export from "@/components/group/Export";
import { Filter, InitFilter } from "@/helper/Filter";
import { GroupPath, Path } from "@/helper/Path";
import { inBetween } from "@/helper/Time";
import { promiseToast } from "@/helper/Toast";
import { EventsContext, GroupContext, TagsContext } from "@/lib/context";
import { deleteEvent, submitEvent, updateEvent } from "@/lib/events";
import { EventModel, InitEvent } from "@/models/Event";
import { GroupId } from "@/models/Group";
import { TagId } from "@/models/Tag";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function Group({ params }: { params: { groupId: GroupId } }) {
  const group = useContext(GroupContext);
  const tags = useContext(TagsContext);
  const events = useContext(EventsContext);
  const [showedEvents, setShowedEvents] = useState<EventModel[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [filter, setFilter] = useState<Filter>(InitFilter);
  const [filteredTags, setFilteredTags] = useState<TagId[]>([]);
  const [tagsOpen, setTagsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [submitEventForm, setSubmitEventForm] = useState<EventModel>(InitEvent);

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenExport, setIsOpenExport] = useState(false);

  function openExportModal() {
    setIsOpenExport(true);
  }

  function closeExportModal() {
    setIsOpenExport(false);
  }

  function openModal() {
    setSelectedIndex(0);
    setUpdating(false);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  async function deleteEventIn() {
    setUpdatingDelete(true);
    if (group && submitEventForm) {
      await promiseToast<void>(
        deleteEvent(group.id, submitEventForm.id),
        "Deleting Event...",
        "Event Deleted!",
        "Could not delete event."
      );
    }
    setIsOpen(false);
    setDeleteConfirmationIsOpen(false);
  }

  const [updatingDelete, setUpdatingDelete] = useState(false);
  const [deleteConfirmationIsOpen, setDeleteConfirmationIsOpen] =
    useState(false);

  function closeDeleteConfirmationModal() {
    setDeleteConfirmationIsOpen(false);
    openModal();
  }

  function openDeleteConfirmationModal() {
    closeModal();
    setUpdatingDelete(false);
    setDeleteConfirmationIsOpen(true);
  }

  const router = useRouter();

  async function editEvent() {
    setUpdating(true);
    if (submitEventForm.id === "placeholder") {
      const submittedEvent = await promiseToast<EventModel>(
        submitEvent(params.groupId, submitEventForm),
        "Creating event...",
        "Event Created!",
        "Could not create event."
      );
      const happeningNow = submitEventForm
        ? inBetween(
            submitEventForm.dateStart,
            new Date(),
            submitEventForm.dateEnd
          )
        : false;
      if (happeningNow) {
        router.push(
          Path.Group +
            "/" +
            params.groupId +
            GroupPath.Event +
            "/" +
            submittedEvent.id
        );
      } else {
        closeModal();
      }
    } else {
      await promiseToast<void>(
        updateEvent(params.groupId, submitEventForm),
        "Updating event...",
        "Event Updated!",
        "Could not update event."
      );
      closeModal();
    }
  }

  useEffect(() => {
    if (group && events) {
      setSubmitEventForm(InitEvent(group?.name));
      setShowedEvents(events);
      setLoading(false);
    }
  }, [group, events, params.groupId]);

  return (
    <>
      <Topbar />
      {loading ? (
        <div className="flex justify-center items-center my-24">
          <Loader show />
        </div>
      ) : (
        <>
          {group && tags !== null && (
            <Export
              groupId={params.groupId}
              isOpen={isOpenExport}
              closeModal={closeExportModal}
              tags={tags}
            />
          )}
          {group && tags !== null && (
            <EditEvent
              groupId={group.id}
              tags={tags}
              isOpen={isOpen}
              closeModal={closeModal}
              submitEventForm={submitEventForm}
              setSubmitEventForm={setSubmitEventForm}
              deleteConfirmationIsOpen={deleteConfirmationIsOpen}
              openDeleteConfirmationModal={openDeleteConfirmationModal}
              closeDeleteConfirmationModal={closeDeleteConfirmationModal}
              deleteEvent={deleteEventIn}
              updatingDelete={updatingDelete}
              submitEvent={editEvent}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
              updating={updating}
            />
          )}
          <div className="flex justify-between mx-4 mt-3 mb-16">
            <h1 className="text-2xl">Events</h1>
            <button
              type="button"
              className="text-center text-gray-700 text-sm rounded-lg py-2 px-2 bg-gray-200"
              onClick={openExportModal}
            >
              EXPORT
            </button>
          </div>
          {group &&
            showedEvents.map((event, i) => (
              <div key={i}>
                <hr className="h-[1px] border-t-0 bg-neutral-300" />
                <div
                  className="cursor-pointer px-4 py-6 hover:bg-gray-100"
                  onClick={() =>
                    router.push(`${Path.Group}/${group.id}/event/${event.id}`)
                  }
                >
                  <EventComponent
                    event={event}
                    showButton
                    openModal={() => {
                      setSubmitEventForm(event);
                      openModal();
                    }}
                  />
                </div>
              </div>
            ))}
          {showedEvents.length > 0 && (
            <hr className="h-[1px] border-t-0 bg-neutral-300" />
          )}
          <div className="py-16" />
          <Botbar
            filter={filter}
            filterEvents={(f) => {
              setShowedEvents(f.sort(events ?? [], filteredTags));
              setFilter(f);
            }}
            filteredTags={filteredTags}
            filterEventsByTags={(tagIds: TagId[]) => {
              setShowedEvents(
                tagIds.length > 0
                  ? events?.filter((e) =>
                      tagIds.every((tagId) =>
                        e.tags.map((t) => t.id).includes(tagId)
                      )
                    ) ?? []
                  : events ?? []
              );
              setFilteredTags(tagIds);
            }}
            openModal={() => {
              setSubmitEventForm(InitEvent(group?.name));
              openModal();
            }}
            tags={tags ?? []}
            tagsOpen={tagsOpen}
            setTagsOpen={setTagsOpen}
          />
        </>
      )}
    </>
  );
}
