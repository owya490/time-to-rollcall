"use client";
import AuthCheck from "@/components/AuthCheck";
import Botbar from "@/components/Botbar";
import EventComponent from "@/components/event/Event";
import EditEvent from "@/components/event/EditEvent";
import { Filter, InitFilter } from "@/helper/Filter";
import { GroupContext, TagsContext, UserContext } from "@/lib/context";
import { submitEvent, updateEvent } from "@/lib/events";
import { EventModel, InitEvent } from "@/models/Event";
import { useContext, useEffect, useState } from "react";
import { GroupId } from "@/models/Group";
import { TagId } from "@/models/Tag";
import Loader from "@/components/Loader";
import { useRouter } from "next/navigation";
import { GroupPath, Path } from "@/helper/Path";
import Topbar from "@/components/Topbar";
import { useEventsListener } from "@/lib/hooks";

export default function Group({ params }: { params: { groupId: GroupId } }) {
  const user = useContext(UserContext);
  const group = useContext(GroupContext);
  const tags = useContext(TagsContext);
  const events = useEventsListener(user, params.groupId);
  const [showedEvents, setShowedEvents] = useState<EventModel[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [filter, setFilter] = useState<Filter>(InitFilter);
  const [filteredTags, setFilteredTags] = useState<TagId[]>([]);
  const [tagsOpen, setTagsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [submitEventForm, setSubmitEventForm] = useState<EventModel>(InitEvent);

  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  const router = useRouter();

  async function editEvent() {
    setUpdating(true);
    if (submitEventForm.id === "placeholder") {
      const submittedEvent = await submitEvent(params.groupId, submitEventForm);
      router.push(
        Path.Group +
          "/" +
          params.groupId +
          GroupPath.Event +
          "/" +
          submittedEvent.id
      );
    } else {
      await updateEvent(params.groupId, submitEventForm);
      setSelectedIndex(0);
      setSubmitEventForm(InitEvent);
      setUpdating(false);
      closeModal();
    }
  }

  useEffect(() => {
    if (group && events) {
      setShowedEvents(events);
      setLoading(false);
    }
  }, [group, events, params.groupId]);

  return (
    <AuthCheck>
      <Topbar />
      {loading ? (
        <div className="flex justify-center items-center">
          <Loader show />
        </div>
      ) : (
        <>
          {group && tags !== null && (
            <EditEvent
              groupId={group.id}
              tags={tags}
              isOpen={isOpen}
              closeModal={closeModal}
              submitEventForm={submitEventForm}
              setSubmitEventForm={setSubmitEventForm}
              submitEvent={editEvent}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
              updating={updating}
            />
          )}
          <h1 className="mx-6 text-2xl mb-16">Events</h1>
          {showedEvents.map((event, i) => (
            <div key={i}>
              <hr className="h-[1px] border-t-0 bg-neutral-300" />
              <div
                className="px-6 py-6"
                onClick={() => {
                  setSubmitEventForm(event);
                  openModal();
                }}
              >
                <EventComponent
                  event={event}
                  groupId={params.groupId}
                  showButton
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
              setSubmitEventForm(InitEvent);
              openModal();
            }}
            tags={tags ?? []}
            tagsOpen={tagsOpen}
            setTagsOpen={setTagsOpen}
          />
        </>
      )}
    </AuthCheck>
  );
}
