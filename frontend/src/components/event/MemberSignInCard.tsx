"use client";
import { MemberModel } from "@/models/Member";
import { useGSAP } from "@gsap/react";
import { ArrowRightIcon, TrashIcon } from "@heroicons/react/24/outline";
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
  action: (member: MemberModel) => void;
  end: (member: MemberModel) => void;
}

export interface MemberSignInCardProps {
  member: MemberModel;
  dragConfig?: DragConfig;
  refreshDependency?: MemberModel[];
  triggerAddAnimation?: boolean;
}

export default function MemberSignInCard({
  member,
  dragConfig,
  refreshDependency,
  triggerAddAnimation,
}: MemberSignInCardProps) {
  const selectedRef = useRef(false);
  const id = member.id;
  const frontId = id + "Front";
  const backId = id + "Back";

  const frontRef = useRef();
  const backRef = useRef();
  const positionX = useRef<number>();
  const dragEnabled = dragConfig !== undefined && dragConfig.draggable === true;

  useEffect(() => {
    if (triggerAddAnimation) {
      gsap.from(frontRef.current, { height: 0, duration: 0.3 });
    }
  }, []);
  useGSAP(() => {
    Draggable.create(frontRef.current, {
      type: "x",
      bounds: {},
      onDragStart: function (e) {
        positionX.current = e.pageX;
      },
      onDragEnd: function (e) {
        if (positionX.current - e.pageX > screen.width / 2) {
          const timeline = gsap.timeline({
            onStart: () => {
              dragConfig?.action(member);
            },
            onComplete: () => {
              dragConfig?.end(member);
            },
          });
          timeline.to(
            frontRef.current,
            {
              x: -screen.width,
              y: 0,
              height: 0,
              duration: 0.3,
            },
            "start"
          );
        } else if (positionX.current - e.pageX > 100) {
          selectedRef.current = true;
          gsap.to(`#${frontId}`, {
            x: -100,
            y: 0,
            duration: 0.3,
          });
        } else {
          selectedRef.current = false;
          gsap.to(`#${frontId}`, {
            x: 0,
            y: 0,
            duration: 0.3,
          });
        }
      },
    });
  }, [refreshDependency]);

  return (
    <div className="relative overflow-hidden" id={id} key={id} ref={backRef}>
      <div
        className={"flex h-20 items-center relative z-30 px-6 bg-white"}
        id={frontId}
        ref={frontRef}
        onClick={() => {
          if (!selectedRef.current) {
            selectedRef.current = true;
            gsap.to(`#${frontId}`, {
              x: -100,
              y: 0,
              duration: 0.2,
            });
          } else {
            selectedRef.current = false;
            gsap.to(`#${frontId}`, {
              x: 0,
              y: 0,
              duration: 0.2,
            });
          }
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
      <div
        onClick={() => {
          const timeline = gsap.timeline({
            onStart: () => {
              dragConfig?.action(member);
            },
            onComplete: () => {
              dragConfig?.end(member);
            },
          });
          timeline.to(
            frontRef.current,
            {
              x: -screen.width,
              y: 0,
              height: 0,
              duration: 0.3,
            },
            "start"
          );
        }}
      >
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
    </div>
  );
}
