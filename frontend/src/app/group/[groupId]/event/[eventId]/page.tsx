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
import { EventId } from "@/models/Event";
import { GroupId } from "@/models/Group";
import { InitMember, MemberModel } from "@/models/Member";
import { University } from "@/models/University";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Draggable from "gsap/dist/Draggable";
import { useContext, useEffect, useState } from "react";
import { searchForMemberByName } from "services/attendanceService";
import Topbar from "@/components/Topbar";
import { inBetween } from "@/helper/Time";

gsap.registerPlugin(Draggable, useGSAP);

export default function Event({
  params,
}: {
  params: { groupId: GroupId; eventId: EventId };
}) {
  const { groupId, eventId } = params;
  const [searchActive, setSearchActive] = useState(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const event = useContext(EventContext);
  const group = useContext(GroupContext);
  const members = useContext(MembersContext);
  const [loading, setLoading] = useState(true);
  const [membersNotSignedIn, setMembersNotSignedIn] = useState<MemberModel[]>(
    []
  );
  const [index, setIndex] = useState<number>(0);
  const [loadAnimation, setLoadAnimation] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [selectedMember, setSelectedMember] = useState<MemberModel>(
    InitMember("Jane Doe", University.UTS)
  );
  const [toggleEdit, setToggleEdit] = useState(true);
  const now = new Date();
  const happeningNow = event
    ? inBetween(event.dateStart, now, event.dateEnd)
    : false;

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
      await addMemberToEvent(params.groupId, params.eventId, newMember.id);
    } else {
      await updateMember(params.groupId, selectedMember);
    }
    setUpdating(false);
    closeModal();
    setSearchInput("");
  }

  useEffect(() => {
    if (event && members !== null && loading) {
      let membersNotSignedIn = members?.filter(
        (m) => !event?.members?.some((signedIn) => signedIn.id === m.id)
      );
      setMembersNotSignedIn(membersNotSignedIn ?? []);
      setToggleEdit(happeningNow);
      setLoading(false);
    }
    // eslint-disable-next-line
  }, [event, members]);

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
      setIndex(0);
    }
    // eslint-disable-next-line
  }, [searchInput]);

  useEffect(() => {
    if (searchInput.length === 0) {
      setLoadAnimation(true);
    }
    // eslint-disable-next-line
  }, [membersNotSignedIn]);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      if (window.visualViewport) {
        setViewportHeight(window.visualViewport.height);
      }
    };

    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", handleResize);

      // Initial height setting
      setViewportHeight(window.visualViewport.height);
    }

    // Cleanup the event listener on component unmount
    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", handleResize);
      }
    };
  }, []);
  return (
    <AuthCheck>
      <Topbar
        setToggleEdit={!happeningNow ? setToggleEdit : undefined}
        toggleEdit={toggleEdit}
      />
      {loading ? (
        <div className="flex justify-center items-center">
          <Loader show />
        </div>
      ) : event ? (
        <>
          <EditMember
            isOpen={isOpen}
            closeModal={closeModal}
            member={selectedMember}
            setMember={setSelectedMember}
            submit={editMember}
            updating={updating}
          />
          <div className="mx-4">
            <div className="mb-3">
              <EventComponent event={event} groupId={groupId} />
            </div>
            <AttendanceSearchBar
              disabled={!toggleEdit}
              searchInput={searchInput}
              setSearchInput={setSearchInput}
            />
          </div>
          {searchInput.length > 0 && index === 0 && (
            <>
              <div className="flex items-center h-fit mx-6 mb-2 mt-8">
                <p className="text-gray-500 text-[10px] font-light align-middle">
                  SEARCH RESULTS
                </p>
              </div>
              <div className="flex flex-col items-center gap-2 text-center w-full my-4 text-gray-700">
                <p>That member doesn&apos;t exist</p>
                <button
                  type="button"
                  className="text-sm py-1.5 px-1.5 rounded-lg bg-green-100 font-light"
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
            </>
          )}
          {searchInput.length === 0 &&
            (!event || !event.members || event.members.length === 0) && (
              <div className="text-center mt-8 text-gray-500">
                Start searching members to add them!
              </div>
            )}
          <div className="w-full z-30">
            <AttendanceSuggested
              disabled={!toggleEdit}
              suggested={membersNotSignedIn.slice(0, index)}
              loadAnimation={loadAnimation}
              action={(member: MemberModel) => {
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
          <div className="z-30 w-full">
            <AttendanceSignedIn
              disabled={!toggleEdit}
              signedIn={event.members}
              action={(member: MemberModel) => {
                setMembersNotSignedIn((prevMembers) =>
                  prevMembers.concat(member)
                );
              }}
              end={(member: MemberModel) => {
                removeMemberFromEvent(groupId, eventId, member.id);
              }}
              edit={(member: MemberModel) => {
                setSelectedMember(member);
                openModal();
              }}
            />
          </div>
          <div
            className="fixed z-40 flex justify-center bottom-0 text-center w-full text-gray-700"
            style={{
              transform: `translateY(${
                window.visualViewport?.height ?? 0 < window.innerHeight
                  ? "-100%"
                  : "0"
              })`,
            }}
          >
            <button
              type="button"
              className="text-sm py-4 px-1.5 w-full rounded-lg bg-green-100 font-light"
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
              Create and Add New Member
            </button>
          </div>
        </>
      ) : (
        <></>
      )}
    </AuthCheck>
  );
}
