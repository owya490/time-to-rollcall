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
import { createMember, updateMember } from "@/lib/members";
import { GroupId } from "@/models/Group";
import Topbar from "@/components/Topbar";

export default function GroupMember({
  params,
}: {
  params: { groupId: GroupId };
}) {
  const [searchActive, setSearchActive] = useState(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const members = useContext(MembersContext);
  const group = useContext(GroupContext);
  const [selectedMember, setSelectedMember] = useState<MemberModel>(
    InitMember("Jane Doe")
  );
  const [membersShown, setMembersShown] = useState<MemberModel[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setLoading(false);
    setMembersShown(members ?? []);
  }, [members]);

  useEffect(() => {
    let prevSearchActive = searchActive;
    setSearchActive(searchInput.length > 0);
    if (searchInput.length > 0) {
      const { suggested } = searchForMemberByName(members ?? [], searchInput);
      setMembersShown(suggested);
    } else if (prevSearchActive && searchInput.length === 0) {
      setMembersShown(members ?? []);
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
      await createMember(params.groupId, selectedMember);
    } else {
      await updateMember(params.groupId, selectedMember);
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
      <Topbar />
      <EditMember
        isOpen={isOpen}
        closeModal={closeModal}
        member={selectedMember}
        setMember={setSelectedMember}
        submit={editMember}
        updating={updating}
      />
      <h1 className="mx-6 text-2xl mb-6">Members</h1>
      <div className="relative">
        <div className="mx-6">
          <div className="mb-6">
            <AttendanceSearchBar
              disabled={false}
              searchInput={searchInput}
              setSearchInput={setSearchInput}
            />
          </div>
        </div>
        <div className="absolute z-20 w-full">
          <Members
            members={membersShown ?? []}
            action={(member: MemberModel) => {
              setSelectedMember(member);
              openModal();
            }}
          />
        </div>
      </div>
      <div className="fixed z-40 flex justify-center bottom-0 text-center w-full text-gray-700">
        <button
          type="button"
          className="text-sm py-4 px-1.5 w-full rounded-lg bg-green-100 font-light"
          onClick={() => {
            setSelectedMember(InitMember(searchInput));
            openModal();
          }}
        >
          Create New Member
        </button>
      </div>
    </AuthCheck>
  );
}
