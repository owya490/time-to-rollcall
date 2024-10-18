"use client";
import AuthCheck from "@/components/AuthCheck";
import EventComponent from "@/components/event/Event";
import AttendanceSearchBar from "@/components/event/AttendanceSearchBar";
import AttendanceSignedIn from "@/components/event/AttendanceSignedIn";
import AttendanceSuggested from "@/components/event/AttendanceSuggested";
import Loader from "@/components/Loader";
import EditMember from "@/components/members/EditMember";
import { EventContext, MembersContext } from "@/lib/context";
import { addMemberToEvent, removeMemberFromEvent } from "@/lib/events";
import { createMember, deleteMember, updateMember } from "@/lib/members";
import { EventId } from "@/models/Event";
import { GroupId } from "@/models/Group";
import { InitMember, MemberModel } from "@/models/Member";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Draggable from "gsap/dist/Draggable";
import { useContext, useEffect, useState } from "react";
import { searchForMemberByName } from "services/attendanceService";
import Topbar from "@/components/Topbar";
import { promiseToast } from "@/helper/Toast";

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
  const members = useContext(MembersContext);
  const [loading, setLoading] = useState(true);
  const [membersNotSignedIn, setMembersNotSignedIn] = useState<MemberModel[]>(
    []
  );
  const [membersSignedIn, setMembersSignedIn] = useState<MemberModel[]>([]);
  const [index, setIndex] = useState<number>(0);
  const [loadAnimation, setLoadAnimation] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [selectedMember, setSelectedMember] = useState<MemberModel>(
    InitMember("Jane Doe")
  );
  const [toggleEdit, setToggleEdit] = useState(true);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // Update the time every minute
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  async function editMember() {
    setUpdating(true);
    if (selectedMember.id === "placeholder") {
      const newMember = await createMember(params.groupId, selectedMember);
      await promiseToast<void>(
        addMemberToEvent(params.groupId, params.eventId, newMember.id),
        "Creating and Adding Member...",
        "Member Created and Added!",
        "Could not create and added member."
      );
    } else {
      await promiseToast<void>(
        updateMember(params.groupId, selectedMember),
        "Updating Member...",
        "Member Updated!",
        "Could not update member."
      );
    }
    setUpdating(false);
    closeModal();
  }

  useEffect(() => {
    if (event && members !== null) {
      let membersNotSignedIn =
        members?.filter(
          (m) => !event?.members?.some((signedIn) => signedIn.id === m.id)
        ) ?? [];
      if (searchInput.length > 0) {
        setLoadAnimation(true);
        const { suggested, notSuggested } = searchForMemberByName(
          membersNotSignedIn,
          searchInput
        );
        setMembersNotSignedIn(suggested.concat(notSuggested));
        setIndex(suggested.length);
      } else {
        setMembersNotSignedIn(membersNotSignedIn);
      }
      let membersSignedIn =
        event.members
          ?.map((m) => members?.find((member) => member.id === m.id))
          .filter((m): m is MemberModel => m !== undefined) ?? [];
      setMembersSignedIn(membersSignedIn ?? []);

      if (loading) {
        setLoading(false);
        setToggleEdit(time < event.dateEnd);
      }
    }
    // eslint-disable-next-line
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

  async function deleteMemberIn() {
    setUpdatingDelete(true);
    if (params.groupId && selectedMember) {
      await promiseToast<void>(
        deleteMember(params.groupId, selectedMember.id),
        "Deleting Member...",
        "Member Deleted!",
        "Could not delete member."
      );
    }
    setIsOpen(false);
    setDeleteConfirmationIsOpen(false);
  }

  const [updatingDelete, setUpdatingDelete] = useState(false);
  const [deleteConfirmationIsOpen, setDeleteConfirmationIsOpen] =
    useState(false);
  function closeDeleteConfirmationModal() {
    setUpdating(false);
    openModal();
    setDeleteConfirmationIsOpen(false);
  }

  function openDeleteConfirmationModal() {
    setUpdatingDelete(false);
    closeModal();
    setDeleteConfirmationIsOpen(true);
  }

  return (
    <AuthCheck>
      {!toggleEdit && (
        <div className="fixed top-0 bottom-0 right-0 left-0 opacity-10 bg-gray-400 z-40" />
      )}
      <Topbar
        setToggleEdit={
          event && time > event.dateEnd ? setToggleEdit : undefined
        }
        toggleEdit={toggleEdit}
      />
      {loading ? (
        <div className="flex justify-center items-center my-24">
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
            deleteConfirmationIsOpen={deleteConfirmationIsOpen}
            openDeleteConfirmationModal={openDeleteConfirmationModal}
            closeDeleteConfirmationModal={closeDeleteConfirmationModal}
            deleteMember={deleteMemberIn}
            updatingDelete={updatingDelete}
          />
          <div className="mx-4">
            <div className="mb-3">
              <EventComponent event={event} />
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
                    setSelectedMember(InitMember(searchInput));
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
              edit={(member: MemberModel) => {
                setSelectedMember(member);
                openModal();
              }}
            />
          </div>
          <div className="z-30 w-full">
            <AttendanceSignedIn
              disabled={!toggleEdit}
              signedIn={membersSignedIn}
              action={(member: MemberModel) => {
                removeMemberFromEvent(groupId, eventId, member.id);
              }}
              edit={(member: MemberModel) => {
                setSelectedMember(member);
                openModal();
              }}
            />
          </div>
          <div className="fixed z-40 flex justify-center bottom-0 text-center w-full text-gray-700">
            <button
              type="button"
              className={
                "text-sm py-4 px-1.5 w-full rounded-lg font-light " +
                (toggleEdit ? "bg-green-200" : "bg-gray-300")
              }
              onClick={() => {
                if (toggleEdit) {
                  setSelectedMember(InitMember(searchInput));
                  openModal();
                } else {
                  setToggleEdit(true);
                }
              }}
            >
              {toggleEdit ? "Create and Add New Member" : "Enable Editing"}
            </button>
          </div>
        </>
      ) : (
        <></>
      )}
    </AuthCheck>
  );
}
