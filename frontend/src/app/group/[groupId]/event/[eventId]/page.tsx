"use client";
import AttendanceSearchBar from "@/components/event/AttendanceSearchBar";
import EventDetailsHeader from "@/components/event/EventDetailsHeader";
import MemberSignInCard from "@/components/event/MemberSignInCard";
import SignInDetailsBar from "@/components/event/SignInDetailsBar";
import { EventId } from "@/models/Event";
import { GroupId } from "@/models/Group";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Draggable from "gsap/dist/Draggable";
// import InertiaPlugin from "gsap/InertiaPlugin";

gsap.registerPlugin(Draggable, useGSAP);

export default function Event({
  params,
}: {
  params: { groupId: GroupId; eventId: EventId };
}) {
  useGSAP(() => {
    Draggable.create("#memberSignInCard", {
      type: "x",
      bounds: {},
      onDragEnd: function () {
        gsap.to("#memberSignInCard", {
          x: 0,
          y: 0,
          duration: 0.5,
        });
      },
    });
  });
  // useLayoutEffect(() => {
  //   // gsap.registerPlugin(Draggable);
  //   gsap.registerPlugin(Draggable);
  // });

  // Draggable.create(".memberSignInCard");

  return (
    // <AuthCheck>
    <div>
      <div className="mx-6">
        <div className="mb-3">
          <EventDetailsHeader />
        </div>

        <h1 className="text-2xl mb-16">Weekly Meeting 12</h1>
        <div className="mb-8">
          <AttendanceSearchBar />
        </div>
        <div className="mb-8">
          <SignInDetailsBar />
        </div>
      </div>
      <MemberSignInCard />
      <MemberSignInCard />
      <MemberSignInCard />
      <MemberSignInCard />
      <MemberSignInCard />
    </div>
    // </AuthCheck>
  );
}
