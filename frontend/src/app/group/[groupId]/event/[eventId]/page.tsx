"use client";
import AuthCheck from "@/components/AuthCheck";
import EventComponent from "@/components/event/Event";
import AttendanceSearchBar from "@/components/event/AttendanceSearchBar";
import AttendanceSignedIn from "@/components/event/AttendanceSignedIn";
import AttendanceSuggested from "@/components/event/AttendanceSuggested";
import Loader from "@/components/Loader";
import EditMember from "@/components/members/EditMember";
import { EventContext, GroupContext, MembersContext } from "@/lib/context";
import { addMemberToEvent, removeMemberFromEvent } from "@/lib/events";
import { createMember, updateMember } from "@/lib/members";
import { EventId, InitEvent } from "@/models/Event";
import { GroupId } from "@/models/Group";
import { InitMember, MemberModel } from "@/models/Member";
import { University } from "@/models/University";
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
  const [event, setEvent] = useContext(EventContext);
  const [group] = useContext(GroupContext);
  const [members, setMembers] = useContext(MembersContext);
  const [loading, setLoading] = useState(true);
  const [membersNotSignedIn, setMembersNotSignedIn] = useState<MemberModel[]>(
    []
  );
  const [index, setIndex] = useState<number>(5);
  const [loadAnimation, setLoadAnimation] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [selectedMember, setSelectedMember] = useState<MemberModel>(
    InitMember("Jane Doe", University.UTS)
  );

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  async function editMember() {
    setUpdating(true);
    if (selectedMember.id === "placeholder") {
      let newMember = await createMember(params.groupId, selectedMember);
      setMembers((prevMembers) => prevMembers.concat(newMember));
    } else {
      await updateMember(params.groupId, selectedMember);
      members.findIndex((m) => m.id === selectedMember.id);
      setMembers((prevMembers) => {
        let index = prevMembers.findIndex((m) => m.id === selectedMember.id);
        return [
          ...prevMembers.slice(0, index),
          selectedMember,
          ...prevMembers.slice(index + 1),
        ];
      });
    }
    setUpdating(false);
    closeModal();
    setSearchInput("");
  }

  useEffect(() => {
    if (event) {
      setMembersNotSignedIn(
        members.filter(
          (m) => !event?.members?.some((signedIn) => signedIn.id === m.id)
        )
      );
      setLoading(false);
    }
  }, [members, event]);

  useEffect(() => {
    let prevSearchActive = searchActive;
    setSearchActive(searchInput.length > 0);
    if (searchInput.length > 0) {
      setLoadAnimation(false);
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
    return (
      <div className="flex justify-center items-center">
        <Loader show />
      </div>
    );
  }
  return (
    event && (
      <AuthCheck>
        <EditMember
          isOpen={isOpen}
          closeModal={closeModal}
          member={selectedMember}
          setMember={setSelectedMember}
          submit={editMember}
          updating={updating}
        />
        <div className="relative">
          <div className="mx-4">
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
          <div className="flex justify-center w-full mb-4">
            <button
              type="button"
              className="text-[10px] py-1.5 px-1.5 rounded-lg bg-gray-200 font-light"
              onClick={() => {
                setSelectedMember(
                  InitMember(
                    searchInput,
                    (group?.name as University) ?? University.UTS
                  )
                );
                openModal();
              }}
            >
              Create New Member
            </button>
          </div>
          <div className="absolute w-full z-40">
            <AttendanceSuggested
              suggested={membersNotSignedIn.slice(0, index)}
              loadAnimation={loadAnimation}
              action={(member: MemberModel) => {
                setEvent((prevEvent) => ({
                  ...(prevEvent ?? InitEvent),
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
              edit={(member: MemberModel) => {
                setSelectedMember(member);
                openModal();
              }}
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
                  ...(prevEvent ?? InitEvent),
                  members:
                    prevEvent?.members?.filter((m) => m.id !== member.id) ?? [],
                }));
                removeMemberFromEvent(groupId, eventId, member.id);
              }}
              edit={(member: MemberModel) => {
                setSelectedMember(member);
                openModal();
              }}
            />
          </div>
        </div>
      </AuthCheck>
    )
  );
}
