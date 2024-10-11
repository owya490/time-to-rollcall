"use client";
import AuthCheck from "@/components/AuthCheck";
import AttendanceSearchBar from "@/components/event/AttendanceSearchBar";
import AttendanceSearchResults from "@/components/event/AttendanceSearchResults";
import AttendanceSignedIn from "@/components/event/AttendanceSignedIn";
import AttendanceSuggested from "@/components/event/AttendanceSuggested";
import EventDetailsHeader from "@/components/event/EventDetailsHeader";
import { MembersContext } from "@/lib/context";
import {
  addMemberToEvent,
  getEvent,
  removeMemberFromEvent,
} from "@/lib/events";
import { EventId, EventModel } from "@/models/Event";
import { GroupId } from "@/models/Group";
import { MemberModel } from "@/models/Member";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Draggable from "gsap/dist/Draggable";
import { useContext, useEffect, useState } from "react";
import { searchForMemberByName } from "services/attendanceService";
// import InertiaPlugin from "gsap/InertiaPlugin";

gsap.registerPlugin(Draggable, useGSAP);

export default function Event({
  params,
}: {
  params: { groupId: GroupId; eventId: EventId };
}) {
  const { groupId, eventId } = params;
  const [searchActive, setSearchActive] = useState(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const [event, setEvent] = useState<EventModel>();
  const [members, _] = useContext(MembersContext);
  const [notSuggestedMembers, setNotSuggestedMembers] = useState<MemberModel[]>(
    []
  );
  const [suggestedMembers, setSuggestedMembers] = useState<MemberModel[]>([]);

  useEffect(() => {
    getEvent(groupId, eventId).then((event) => {
      setEvent(event);
      const membersNotSignedIn = members.filter(
        (m) => !event.members?.some((signedIn) => signedIn.id === m.id)
      );
      setSuggestedMembers(membersNotSignedIn.slice(0, 3));
      setNotSuggestedMembers(membersNotSignedIn.slice(3));
    });
  }, [members]);

  useEffect(() => {
    let prevSearchActive = searchActive;
    setSearchActive(searchInput.length > 0);
    if (prevSearchActive || searchInput.length > 0) {
      const { suggested, notSuggested } = searchForMemberByName(
        suggestedMembers.concat(notSuggestedMembers),
        searchInput
      );
      setSuggestedMembers(suggested);
      setNotSuggestedMembers(notSuggested);
    }
  }, [searchInput]);

  return (
    event && (
      <AuthCheck>
        <div>
          <div className="mx-6">
            <div className="mb-3">
              <EventDetailsHeader />
            </div>
            <h1 className="text-2xl mb-16">Weekly Meeting 12</h1>
            <div className="mb-8">
              <AttendanceSearchBar
                searchInput={searchInput}
                setSearchInput={setSearchInput}
              />
            </div>
          </div>
          <div className="mb-8">
            <AttendanceSuggested
              attendance={event.members?.length ?? 0}
              suggested={suggestedMembers}
              action={(member: MemberModel) => {
                setEvent((prevEvent) => ({
                  ...prevEvent,
                  members: [...(prevEvent.members ?? []), member],
                }));
                setNotSuggestedMembers((prevNotSuggestedMembers) => {
                  const addSuggestedMember = prevNotSuggestedMembers.slice(
                    0,
                    1
                  );
                  if (addSuggestedMember.length === 1) {
                    setSuggestedMembers((prevMembers) => [
                      ...prevMembers,
                      addSuggestedMember[0],
                    ]);
                  }
                  return prevNotSuggestedMembers;
                });
                addMemberToEvent(groupId, eventId, member.id);
              }}
              end={(member: MemberModel) => {
                setSuggestedMembers((prevMembers) =>
                  prevMembers.filter((m) => m.id !== member.id)
                );
                setNotSuggestedMembers((prevNotSuggestedMembers) =>
                  prevNotSuggestedMembers.slice(1)
                );
              }}
            />
          </div>
          <AttendanceSignedIn
            signedIn={event.members}
            action={(member: MemberModel) => {
              setSuggestedMembers((prevMembers) => {
                if (prevMembers.length < 3) {
                  return [...prevMembers, member];
                } else {
                  setNotSuggestedMembers((prevNotSuggestedMembers) => [
                    ...prevNotSuggestedMembers,
                    member,
                  ]);
                  return prevMembers;
                }
              });
            }}
            end={(member: MemberModel) => {
              setEvent((prevEvent) => ({
                ...prevEvent,
                members: prevEvent.members.filter((m) => m.id !== member.id),
              }));
              removeMemberFromEvent(groupId, eventId, member.id);
            }}
          />
        </div>
      </AuthCheck>
    )
  );
}
