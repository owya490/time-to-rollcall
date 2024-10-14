"use client";
import AuthCheck from "@/components/AuthCheck";
import Botbar from "@/components/Botbar";
import EventComponent from "@/components/Event";
import CreateEvent from "@/components/CreateEvent";
import { Filter, InitFilter } from "@/helper/Filter";
import { GroupContext } from "@/lib/context";
import { getEvents, submitEvent } from "@/lib/events";
import { EventModel, InitSubmitEvent, SubmitEventModel } from "@/models/Event";
import { useContext, useEffect, useState } from "react";
import { GroupId } from "@/models/Group";
import { TagId, TagModel } from "@/models/Tag";
import Loader from "@/components/Loader";

export default function Group({ params }: { params: { groupId: GroupId } }) {
  const [group, setGroup] = useContext(GroupContext);
  const [events, setEvents] = useState<EventModel[]>([]);
  const [showedEvents, setShowedEvents] = useState<EventModel[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [filter, setFilter] = useState<Filter>(InitFilter);
  const [filteredTags, setFilteredTags] = useState<TagId[]>([]);
  const [tagsOpen, setTagsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [submitEventForm, setSubmitEventForm] =
    useState<SubmitEventModel>(InitSubmitEvent);

  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function createEvent() {
    if (group) {
      submitEvent(group.id, submitEventForm).then((submittedEvent) => {
        let newEvents = [submittedEvent].concat(events);
        setEvents(newEvents);
        setShowedEvents(filter.sort(newEvents, filteredTags));
        setSelectedIndex(0);
      });
      setSubmitEventForm(InitSubmitEvent);
    }
    closeModal();
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

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <Loader show />
      </div>
    );
  }
  return (
    <AuthCheck>
      {group && (
        <CreateEvent
          groupId={group.id}
          tags={group.tags}
          setTags={(tags: TagModel[]) => setGroup({ ...group, tags })}
          isOpen={isOpen}
          closeModal={closeModal}
          submitEventForm={submitEventForm}
          setSubmitEventForm={setSubmitEventForm}
          createEvent={createEvent}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
      )}
      <h1 className="mx-6 text-2xl mb-16">Events</h1>
      {showedEvents.map((event, i) => (
        <div key={i}>
          <hr className="my-4 h-[1px] border-t-0 bg-neutral-300" />
          <div className="mx-6 my-4">
            <EventComponent event={event} groupId={params.groupId} showButton />
          </div>
        </div>
      ))}
      {showedEvents.length > 0 && (
        <hr className="my-4 h-[1px] border-t-0 bg-neutral-300" />
      )}
      {showedEvents.length > 0 && (
        <div className="mx-6">
          <p>TODO: Scroll load</p>
        </div>
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
        tags={group?.tags ?? []}
        tagsOpen={tagsOpen}
        setTagsOpen={setTagsOpen}
      />
    </AuthCheck>
  );
}
