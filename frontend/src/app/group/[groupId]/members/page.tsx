"use client";
import AuthCheck from "@/components/AuthCheck";
import AttendanceSearchBar from "@/components/event/AttendanceSearchBar";
import Members from "@/components/members/Members";
import Loader from "@/components/Loader";
import { GroupContext, MembersContext } from "@/lib/context";
import { InitMember, MemberModel } from "@/models/Member";
import { useContext, useEffect, useState } from "react";
import { searchForMemberByName } from "services/attendanceService";
import EditMember from "@/components/members/EditMember";
import { University } from "@/models/University";
import { createMember, updateMember } from "@/lib/members";
import { GroupId } from "@/models/Group";

export default function GroupMember({
  params,
}: {
  params: { groupId: GroupId };
}) {
  const [searchActive, setSearchActive] = useState(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const [members, setMembers] = useContext(MembersContext);
  const [group] = useContext(GroupContext);
  const [selectedMember, setSelectedMember] = useState<MemberModel>(
    InitMember("Jane Doe", University.UTS)
  );
  const [membersShown, setMembersShown] = useState<MemberModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setLoading(false);
    setMembersShown(members);
  }, [members]);

  useEffect(() => {
    let prevSearchActive = searchActive;
    setSearchActive(searchInput.length > 0);
    if (searchInput.length > 0) {
      const { suggested } = searchForMemberByName(members, searchInput);
      setMembersShown(suggested);
    } else if (prevSearchActive && searchInput.length === 0) {
      setMembersShown(members);
    }
    // eslint-disable-next-line
  }, [searchInput]);

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

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <Loader show />
      </div>
    );
  }
  return (
    <AuthCheck>
      <EditMember
        isOpen={isOpen}
        closeModal={closeModal}
        member={selectedMember}
        setMember={setSelectedMember}
        submit={editMember}
        updating={updating}
      />
      <h1 className="mx-6 text-2xl mb-3">Members</h1>
      <div className="flex justify-center w-full mb-4">
        <button
          type="button"
          className="text-[10px] py-1.5 px-1.5 rounded-lg bg-blue-100 font-light"
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
      <div className="relative">
        <div className="mx-6">
          <div className="mb-6">
            <AttendanceSearchBar
              searchInput={searchInput}
              setSearchInput={setSearchInput}
            />
          </div>
        </div>
        <div className="absolute z-40 w-full">
          <Members
            members={membersShown}
            action={(member: MemberModel) => {
              setSelectedMember(member);
              openModal();
            }}
          />
        </div>
      </div>
    </AuthCheck>
  );
}
