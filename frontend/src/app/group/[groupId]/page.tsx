"use client";
import AuthCheck from "@/components/AuthCheck";
import Botbar from "@/components/Botbar";
import Event from "@/components/Event";
import CreateEvent from "@/components/CreateEvent";
import { Filter, InitFilter } from "@/helper/Filter";
import { GroupContext, UserContext } from "@/lib/context";
import { getEvents } from "@/lib/events";
import { EventModel, InitSubmitEvent, SubmitEventModel } from "@/models/Event";
import { useContext, useEffect, useState } from "react";
import { GroupId } from "@/models/Group";
import { addUserGroups as addGroupToUserGroups } from "@/lib/user";

export default function Group({ params }: { params: { groupId: GroupId } }) {
  const user = useContext(UserContext);
  const group = useContext(GroupContext);
  const [events, setEvents] = useState<EventModel[]>([]);
  const [showedEvents, setShowedEvents] = useState<EventModel[]>([]);

  const [filter, setFilter] = useState<Filter>(InitFilter);

  const [step, setStep] = useState<number>(1);
  const [submitEvent, setSubmitEvent] =
    useState<SubmitEventModel>(InitSubmitEvent);

  function incrementStep() {
    setStep(step + 1);
  }

  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setStep(1);
    setIsOpen(true);
  }

  useEffect(() => {
    if (!user.groups.includes(params.groupId)) {
      addGroupToUserGroups(user.id, params.groupId);
    }
    getEvents(params.groupId).then((events) => {
      setEvents(events);
      setShowedEvents(events);
    });
  }, [user, params.groupId]);

  return (
    <AuthCheck>
      <CreateEvent
        tags={group?.tags}
        isOpen={isOpen}
        closeModal={closeModal}
        step={step}
        incrementStep={incrementStep}
        submitEvent={submitEvent}
        setSubmitEvent={setSubmitEvent}
      />
      <div className="p-12"></div>
      {showedEvents.map((event, i) => (
        <div key={i}>
          <hr className="mx-8 my-4 h-[1px] border-t-0 bg-neutral-300" />
          <Event event={event} groupId={params.groupId} />
        </div>
      ))}
      <hr className="mx-8 my-4 h-[1px] border-t-0 bg-neutral-300" />
      <h1 className="mt-96">SOW-416: TODO Group settings</h1>
      <h1>TODO: Sort by tags</h1>
      <div className="p-8">
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
