"use client";
import AttendanceSearchBar from "@/components/event/AttendanceSearchBar";
import AttendanceSearchResults from "@/components/event/AttendanceSearchResults";
import AttendanceSignedIn from "@/components/event/AttendanceSignedIn";
import AttendanceSuggested from "@/components/event/AttendanceSuggested";
import EventDetailsHeader from "@/components/event/EventDetailsHeader";
import { EventId } from "@/models/Event";
import { GroupId } from "@/models/Group";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Draggable from "gsap/dist/Draggable";
import { useEffect, useState } from "react";
import { searchForMemberByName } from "services/attendanceService";
// import InertiaPlugin from "gsap/InertiaPlugin";

gsap.registerPlugin(Draggable, useGSAP);

export interface Member {
  name: string;
}

export default function Event({
  params,
}: {
  params: { groupId: GroupId; eventId: EventId };
}) {
  const [searchActive, setSearchActive] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Member[]>([]);
  const [memberSignedInList, setMemberSignedInList] = useState<Member[]>([
    { name: "Shrog Frog" },
    { name: "Fark Shark" },
  ]);
  const [memberSuggestedList, setMemberSuggestedList] = useState<Member[]>([
    { name: "Owen Yang" },
    { name: "Bob Bill" },
  ]);

  useEffect(() => {
    setSearchActive(searchInput.length !== 0);
    setSearchResults(searchForMemberByName(searchInput));
  }, [searchInput]);

  return (
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
        {searchActive ? (
          <AttendanceSearchResults searchResults={searchResults} />
        ) : (
          <AttendanceSuggested
            suggested={memberSuggestedList}
            onAdd={(member: Member) => {
              console.log("owen");
              console.log([...memberSignedInList, member]);

              // setMemberSignedInList([...memberSignedInList, member]);
              // console.log([
              //   ...memberSuggestedList.slice(
              //     0,
              //     memberSuggestedList.indexOf(member)
              //   ),
              //   ...memberSuggestedList.slice(
              //     memberSuggestedList.indexOf(member) + 1,
              //     undefined
              //   ),
              // ]);

              // setMemberSignedInList((prevItems) => {
              //   return [...prevItems, member];
              // });
              // setMemberSuggestedList([
              //   ...memberSuggestedList.slice(
              //     0,
              //     memberSuggestedList.indexOf(member)
              //   ),
              //   ...memberSuggestedList.slice(
              //     memberSuggestedList.indexOf(member) + 1,
              //     undefined
              //   ),
              // ]);
              // const tmp = memberSuggestedList;
              // setMemberSuggestedList([]);
              // console.log("what");
              console.log(memberSuggestedList);
              // setMemberSuggestedList(
              //   memberSuggestedList.filter((item) => item !== member)
              // );
              setMemberSuggestedList((prevItems) => {
                const updatedItems = prevItems.filter((item, index) => {
                  console.log(item.name !== member.name);
                  return item.name !== member.name;
                });
                console.log(member);
                console.log(updatedItems);
                return [...updatedItems];
              });
            }}
          />
        )}
      </div>
      <AttendanceSignedIn
        signedIn={memberSignedInList}
        onDelete={(member: Member) => {
          setMemberSignedInList([
            ...memberSignedInList.slice(0, memberSignedInList.indexOf(member)),
            ...memberSignedInList.slice(
              memberSignedInList.indexOf(member) + 1,
              undefined
            ),
          ]);
        }}
      />
    </div>
  );
  // </AuthCheck>
}
