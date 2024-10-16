"use client";
import AuthCheck from "@/components/AuthCheck";
import Botbar from "@/components/Botbar";
import EventComponent from "@/components/event/Event";
import EditEvent from "@/components/event/EditEvent";
import { Filter, InitFilter } from "@/helper/Filter";
import { GroupContext, TagsContext } from "@/lib/context";
import { getEvents, submitEvent } from "@/lib/events";
import { EventModel, InitEvent } from "@/models/Event";
import { useContext, useEffect, useState } from "react";
import { GroupId } from "@/models/Group";
import { TagId } from "@/models/Tag";
import Loader from "@/components/Loader";
import { useRouter } from "next/navigation";
import { GroupPath, Path } from "@/helper/Path";

export default function Group({ params }: { params: { groupId: GroupId } }) {
  const group = useContext(GroupContext);
  const tags = useContext(TagsContext);
  const [events, setEvents] = useState<EventModel[]>([]);
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

  async function createEvent() {
    setUpdating(true);
    if (group) {
      const submittedEvent = await submitEvent(group.id, submitEventForm);
      let newEvents = [submittedEvent].concat(events);
      setEvents(newEvents);
      setShowedEvents(filter.sort(newEvents, filteredTags));
      setSelectedIndex(0);
      setSubmitEventForm(InitEvent);
      closeModal();
      router.push(
        Path.Group +
          "/" +
          params.groupId +
          GroupPath.Event +
          "/" +
          submittedEvent.id
      );
    }
  }

  useEffect(() => {
    if (group) {
      getEvents(params.groupId).then((events: EventModel[]) => {
        setEvents(events);
        setShowedEvents(events);
        setLoading(false);
      });
    }
  }, [group, params.groupId]);

  return (
    <AuthCheck>
      {loading ? (
        <div className="flex justify-center items-center">
          <Loader show />
        </div>
      ) : (
        <>
          {group && tags !== null && tags !== undefined && (
            <EditEvent
              groupId={group.id}
              tags={tags}
              isOpen={isOpen}
              closeModal={closeModal}
              submitEventForm={submitEventForm}
              setSubmitEventForm={setSubmitEventForm}
              createEvent={createEvent}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
              updating={updating}
            />
          )}
          <h1 className="mx-6 text-2xl mb-16">Events</h1>
          {showedEvents.map((event, i) => (
            <div key={i}>
              <hr className="my-4 h-[1px] border-t-0 bg-neutral-300" />
              <div className="mx-6 my-4">
                <EventComponent
                  event={event}
                  groupId={params.groupId}
                  showButton
                />
              </div>
            </div>
          ))}
          {showedEvents.length > 0 && (
            <hr className="my-4 h-[1px] border-t-0 bg-neutral-300" />
          )}
          <Botbar
            filter={filter}
            filterEvents={(f) => {
              setShowedEvents(f.sort(events, filteredTags));
              setFilter(f);
            }}
            filteredTags={filteredTags}
            filterEventsByTags={(tagIds: TagId[]) => {
              setShowedEvents(
                tagIds.length > 0
                  ? events.filter((e) =>
                      tagIds.every((tagId) =>
                        e.tags.map((t) => t.id).includes(tagId)
                      )
                    )
                  : events
              );
              setFilteredTags(tagIds);
            }}
            openModal={openModal}
            tags={tags ?? []}
            tagsOpen={tagsOpen}
            setTagsOpen={setTagsOpen}
          />
        </>
      )}
    </AuthCheck>
  );
}
