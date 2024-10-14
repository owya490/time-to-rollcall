"use client";
import AuthCheck from "@/components/AuthCheck";
import EventComponent from "@/components/Event";
import AttendanceSearchBar from "@/components/event/AttendanceSearchBar";
import AttendanceSignedIn from "@/components/event/AttendanceSignedIn";
import AttendanceSuggested from "@/components/event/AttendanceSuggested";
import { MembersContext } from "@/lib/context";
import {
  addMemberToEvent,
  getEvent,
  removeMemberFromEvent,
} from "@/lib/events";
import { EventId, EventModel, InitEvent } from "@/models/Event";
import { GroupId } from "@/models/Group";
import { MemberModel } from "@/models/Member";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Draggable from "gsap/dist/Draggable";
import { useContext, useEffect, useState } from "react";
import { searchForMemberByName } from "services/attendanceService";

gsap.registerPlugin(Draggable, useGSAP);

export default function Event({
  params,
}: {
  params: { groupId: GroupId; eventId: EventId };
}) {
  const { groupId, eventId } = params;
  const [searchActive, setSearchActive] = useState(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const [event, setEvent] = useState<EventModel>(InitEvent);
  const [members] = useContext(MembersContext);
  const [loading, setLoading] = useState(true);
  const [membersNotSignedIn, setMembersNotSignedIn] = useState<MemberModel[]>(
    []
  );
  const [index, setIndex] = useState<number>(5);
  const [loadAnimation, setLoadAnimation] = useState<boolean>(false);

  useEffect(() => {
    getEvent(groupId, eventId).then((event) => {
      setEvent(event);
      setMembersNotSignedIn(
        members.filter(
          (m) => !event.members?.some((signedIn) => signedIn.id === m.id)
        )
      );
      setLoading(false);
    });
  }, [members]);

  useEffect(() => {
    let prevSearchActive = searchActive;
    setSearchActive(searchInput.length > 0);
    if (searchInput.length > 0) {
      setLoadAnimation(false);
      console.log(searchInput);
      const { suggested, notSuggested } = searchForMemberByName(
        membersNotSignedIn,
        searchInput
      );
      setMembersNotSignedIn(suggested.concat(notSuggested));
      setIndex(suggested.length);
    } else if (prevSearchActive && searchInput.length === 0) {
      setIndex(5);
    }
  }, [searchInput]);

  useEffect(() => {
    if (searchInput.length === 0) {
      setLoadAnimation(true);
    }
  }, [membersNotSignedIn]);
  if (loading) {
    return <p>loading</p>;
  }
  return (
    event && (
      <AuthCheck>
        <div className="relative">
          <div className="mx-6">
            <div className="mb-3">
              <EventComponent event={event} groupId={groupId} />
            </div>
            <div className="mb-8">
              <AttendanceSearchBar
                searchInput={searchInput}
                setSearchInput={setSearchInput}
              />
            </div>
          </div>
          <div className="absolute w-full">
            <AttendanceSuggested
              suggested={membersNotSignedIn.slice(0, index)}
              loadAnimation={loadAnimation}
              action={(member: MemberModel) => {
                setEvent((prevEvent) => ({
                  ...prevEvent,
                  members: (prevEvent?.members ?? []).concat(member),
                }));
                addMemberToEvent(groupId, eventId, member.id);
              }}
              end={(member: MemberModel) => {
                setMembersNotSignedIn((prevMembers) =>
                  prevMembers.filter((m) => m.id !== member.id)
                );
                if (searchInput.length > 0) {
                  setIndex((prevIndex) => prevIndex - 1);
                }
              }}
              searchInput={searchInput}
            />
          </div>
          <div className="absolute mt-[275px] z-40 w-full">
            <AttendanceSignedIn
              signedIn={event.members}
              action={(member: MemberModel) => {
                setMembersNotSignedIn((prevMembers) =>
                  prevMembers.concat(member)
                );
              }}
              end={(member: MemberModel) => {
                setEvent((prevEvent) => ({
                  ...prevEvent,
                  members:
                    prevEvent.members?.filter((m) => m.id !== member.id) ?? [],
                }));
                removeMemberFromEvent(groupId, eventId, member.id);
              }}
            />
          </div>
        </div>
      </AuthCheck>
    )
  );
}
