"use client";
import { useGSAP } from "@gsap/react";
import { ArrowRightIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Member } from "app/group/[groupId]/event/[eventId]/page";
import gsap from "gsap";
import Draggable from "gsap/dist/Draggable";
import Image from "next/image";
import { useEffect, useRef } from "react";
import WOMAN_FACE_PNG from "../../../public/face-woman-profile.png";
import GroupBadge from "./GroupBadge";

export type DragType = "DELETE" | "ADD";

export interface DragConfig {
  draggable: boolean;
  dragType: DragType;
  onAction: (member: Member) => void;
}

interface MemberSignInCard {
  member: Member;
  selected?: boolean;
  onSelection?: (member: Member) => void;
  dragConfig?: DragConfig;
  suggested: Member[];
}

export default function MemberSignInCard({
  member,
  selected,
  onSelection,
  dragConfig,
  suggested,
}: MemberSignInCard) {
  const id = member.name.replace(" ", ""); // TODO MAKE IT UUID
  const frontId = id + "Front";
  const backId = id + "Back";

  console.log(id);

  const frontRef = useRef();
  const backRef = useRef();
  // const windowWidth = window.innerWidth;
  const dragEnabled = dragConfig !== undefined && dragConfig.draggable === true;

  useEffect(() => {
    console.log("oh no " + id);
  }, [suggested]);
  if (dragEnabled) {
    switch (dragConfig.dragType) {
      case "ADD":
      // useGSAP(() => {
      //   Draggable.create("#memberSignInCard", {
      //     type: "x",
      //     bounds: {},
      //     onDragEnd: function () {
      //       gsap.to("#memberSignInCard", {
      //         x: 0,
      //         y: 0,
      //         duration: 0.5,
      //       });
      //     },
      //   });
      // });
      // break;
      case "DELETE":
        useGSAP(() => {
          console.log("MY MOM " + id);
          // Draggable.create(`#${id}`);
          // gsapRef.current = Draggable.create(`#${frontId}`, {
          Draggable.create(frontRef.current, {
            type: "x",
            bounds: {},
            onDragEnd: function (e) {
              console.log(e);
              if (e.pageX < 150) {
                const timeline = gsap.timeline({
                  onComplete: () => {
                    dragConfig.onAction(member);
                  },
                });
                timeline
                  // .add("start")
                  .to(
                    frontRef.current,
                    {
                      x: -500,
                      y: 0,
                      duration: 0.5,
                    },
                    "start"
                  )
                  .to(
                    backRef.current,
                    {
                      height: 0,
                      duration: 0.5,
                      // clearProps: "x,height", // reset css styles
                    },
                    "height"
                  );
                // .add("height")

                // .to(`#${backId}`, {
                //   height: 0,
                //   duration: 0.5,
                // });
                // .then(async () => {
                //   // // document.getElementById(id).classList.add("hidden");
                //   // gsap.to(`#${id}`, {
                //   //   height: "5rem",
                //   //   duration: 0.1,
                //   // });
                //   // gsap.to(`#${id}`, {
                //   //   x: 0,
                //   //   y: 0,
                //   //   duration: 0.1,
                //   // });
                //   await new Promise((r) => setTimeout(r, 1000));
                //   dragConfig.onAction(member);
                // });
              } else {
                gsap.to(`#${frontId}`, {
                  x: 0,
                  y: 0,
                  duration: 0.5,
                });
              }
            },
          });
        }, [suggested]);
        break;
    }
  }

  return (
    <div className="relative overflow-hidden" id={id} key={id} ref={backRef}>
      <div
        className={`flex h-20 items-center relative z-30 px-6 ${
          selected ? "bg-gray-100" : "bg-white"
        }`}
        id={frontId}
        ref={frontRef}
        onClick={() => {
          onSelection(member);
        }}
      >
        <Image
          src={WOMAN_FACE_PNG}
          height={0}
          width={0}
          alt="woman-face"
          className="h-7 w-7 mr-4"
        />
        <div>
          <h3 className="font-light mb-2">{member.name}</h3>
          <p className="text-xs text-gray-500 font-thin">
            2nd Year • Student Leader
          </p>
        </div>
        <div className="ml-auto">
          <GroupBadge />
        </div>
      </div>
      {dragEnabled ? (
        dragConfig.dragType == "ADD" ? (
          <div className="z-10" id={backId}>
            <div className="bg-blue-600 h-20 top-0 w-full absolute z-10 flex justify-center items-center">
              <ArrowRightIcon className="h-5 ml-auto mr-8 text-white" />
            </div>
          </div>
        ) : (
          <div className="bg-red-600 h-20 top-0 w-full absolute z-10 flex justify-center items-center">
            <TrashIcon className="h-5 ml-auto mr-8 text-white" />
          </div>
        )
      ) : (
        <></>
      )}
    </div>
  );
}
