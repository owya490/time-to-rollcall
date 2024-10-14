"use client";
import AuthCheck from "@/components/AuthCheck";
import Botbar from "@/components/Botbar";
import Event from "@/components/Event";
import CreateEvent from "@/components/CreateEvent";
import { Filter, InitFilter } from "@/helper/Filter";
import { GroupContext, UserContext } from "@/lib/context";
import { getEvents, submitEvent } from "@/lib/events";
import { EventModel, InitSubmitEvent, SubmitEventModel } from "@/models/Event";
import { useContext, useEffect, useState } from "react";
import { GroupId } from "@/models/Group";
import { addGroupToUserGroups } from "@/lib/users";
import { TagModel } from "@/models/Tag";
import { getGroup } from "@/lib/groups";

export default function Group({ params }: { params: { groupId: GroupId } }) {
  const [user, setUser] = useContext(UserContext);
  const [group, setGroup] = useContext(GroupContext);
  const [events, setEvents] = useState<EventModel[]>([]);
  const [showedEvents, setShowedEvents] = useState<EventModel[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [filter, setFilter] = useState<Filter>(InitFilter);

  const [submitEventForm, setSubmitEventForm] =
    useState<SubmitEventModel>(InitSubmitEvent);

  let [isOpen, setIsOpen] = useState(false);

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
        setShowedEvents(filter.sort(newEvents));
        setSelectedIndex(0);
      });
      setSubmitEventForm(InitSubmitEvent);
    }
    closeModal();
  }

  useEffect(() => {
    if (user?.id && (!user.groups || !user.groups.includes(params.groupId))) {
      addGroupToUserGroups(user.id, params.groupId).then(() =>
        getGroup(params.groupId).then((group) => {
          setGroup(group);
          setUser({ ...user, groups: [...user.groups, params.groupId] });
        })
      );
    }
    getEvents(params.groupId).then((events) => {
      setEvents(events);
      setShowedEvents(events);
    });
  }, [user, params.groupId]);

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
          <Event event={event} groupId={params.groupId} />
        </div>
      ))}
      <hr className="my-4 h-[1px] border-t-0 bg-neutral-300" />
      <div className="p-2">
        <div className="flex items-center justify-between">
          {filter.name === "Tag" &&
            group &&
            group.tags &&
            group.tags.map((tag, i) => (
              <button key={i} onClick={() => {}}>
                {tag.name}
              </button>
            ))}
        </div>
      </div>
      <p>TODO: Sort by tags</p>
      <p>TODO: Scroll load</p>
      <Botbar
        filter={filter}
        filterEvents={(f) => {
          setShowedEvents(f.sort(events));
          setFilter(f);
        }}
        openModal={openModal}
      />
    </AuthCheck>
  );
}
