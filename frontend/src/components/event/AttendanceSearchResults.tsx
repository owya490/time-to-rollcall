"use client";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import MemberSignInCard from "./MemberSignInCard";
import { MemberModel } from "@/models/Member";

interface AttendanceSearchResultsProps {
  searchResults: MemberModel[];
}

export default function AttendanceSearchResults({
  searchResults,
}: AttendanceSearchResultsProps) {
  const [selectedMembers, setSelectedMembers] = useState([]);

  function handleMemberSelection(member: MemberModel) {
    // if already in list, remove them
    if (selectedMembers.includes(member)) {
      setSelectedMembers([
        ...selectedMembers.slice(0, selectedMembers.indexOf(member)),
        ...selectedMembers.slice(
          selectedMembers.indexOf(member) + 1,
          undefined
        ),
      ]);
      return;
    }

    // otherwise add them to selection
    setSelectedMembers([...selectedMembers, member]);
  }

  return (
    <>
      <div className="flex items-center h-fit mx-6 mb-2">
        <p className="text-gray-500 text-[10px] font-light align-middle">
          0 SELECTED
        </p>
        <div className="ml-auto flex py-1.5">
          <p className="text-[10px] font-light mr-2">SELECT ALL</p>
          <input type="checkbox" />
        </div>
      </div>
      {searchResults.map((member, i) => {
        return (
          <MemberSignInCard
            key={i}
            member={member}
            selected={selectedMembers.includes(member)}
            onSelection={handleMemberSelection}
          />
        );
      })}
      <div className="z-40">
        <div
          className="w-full absolute bottom-0 bg-gray-600 h-16 opacity-60 flex items-center px-6"
          style={{ zIndex: 100000 }}
        >
          <p className="text-white font-light">Add to event attendance</p>
          <ChevronRightIcon className="w-6 h-6 text-white ml-auto" />
        </div>
      </div>
    </>
  );
}
