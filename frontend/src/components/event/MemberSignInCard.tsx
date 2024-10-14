"use client";
import { MemberModel } from "@/models/Member";
import { useGSAP } from "@gsap/react";
import { ArrowRightIcon, TrashIcon } from "@heroicons/react/24/outline";
import gsap from "gsap";
import Draggable from "gsap/dist/Draggable";
import Image from "next/image";
import { FC, memo, useEffect, useRef } from "react";
import WOMAN_FACE_PNG from "../../../public/face-woman-profile.png";
import GroupBadge from "./GroupBadge";

export const MemberSignIn: FC<MemberSignInCardProps> = memo(
  ({ ...props }) => {
    return <MemberSignInCard {...props} />;
  },
  (prevProps, nextProps) => {
    return prevProps.member.id === nextProps.member.id;
  }
);
MemberSignIn.displayName = "MemberSignIn";

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

function MemberSignInCard({
  member,
  dragConfig,
  refreshDependency,
  triggerAddAnimation,
}: MemberSignInCardProps) {
  const selectedRef = useRef(false);
  const id = member.id;
  const frontId = id + "Front";
  const remove = () => {
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
    selectedRef.current = false;
  };

  const frontRef = useRef(null);
  const positionX = useRef<number>(0);
  const timeStamp = useRef<number>(0);
  const dragEnabled = dragConfig !== undefined && dragConfig.draggable === true;

  useEffect(() => {
    if (triggerAddAnimation) {
      gsap.from(frontRef.current, { height: 0, duration: 0.3 });
    }
  }, [triggerAddAnimation]);

  useGSAP(() => {
    const handleDragEnd = (e) => {
      if (e.pageX === 0 && e.pageY === 0) {
        return;
      }
      const velocity =
        (positionX.current - e.pageX) / (e.timeStamp - timeStamp.current);
      if (
        positionX.current - e.pageX + (selectedRef.current ? 104 : 20) >
          screen.width / 2 ||
        velocity > 1.2
      ) {
        remove();
      } else if (!selectedRef.current && positionX.current - e.pageX > 47) {
        selectedRef.current = true;
        gsap.to(frontRef.current, {
          x: -84,
          y: 0,
          duration: 0.3,
        });
      } else {
        selectedRef.current = false;
        gsap.to(frontRef.current, {
          x: 0,
          y: 0,
          duration: 0.3,
        });
      }
    };

    Draggable.create(`#${frontId}`, {
      type: "x",
      bounds: { maxX: 0 },
      onDragStart: function (e) {
        positionX.current = e.pageX;
        timeStamp.current = e.timeStamp;
      },
      onDragEnd: function (e) {
        handleDragEnd(e);
      },
    });
  }, [refreshDependency]);

  return (
    <div className="relative overflow-hidden" id={id} key={id}>
      <div className="relative z-30" id={frontId} ref={frontRef}>
        <div className={"flex h-20 w-[calc(100vw+84px)]"}>
          <div
            className="flex w-screen px-6 bg-white items-center"
            onClick={() => {
              if (!selectedRef.current) {
                selectedRef.current = true;
                gsap.to(frontRef.current, {
                  x: -84,
                  y: 0,
                  duration: 0.2,
                });
              } else {
                selectedRef.current = false;
                gsap.to(frontRef.current, {
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
            className="w-[84px] top-0 z-10"
            onClick={() => {
              if (selectedRef.current) remove();
            }}
          >
            {dragEnabled ? (
              dragConfig.dragType == "ADD" ? (
                <div className="bg-blue-600 h-20 w-full flex justify-center items-center">
                  <ArrowRightIcon className="h-5 ml-auto mr-8 text-white" />
                </div>
              ) : (
                <div className="bg-red-600  h-20 w-full flex justify-center items-center">
                  <TrashIcon className="h-5 ml-auto mr-8 text-white" />
                </div>
              )
            ) : null}
          </div>
        </div>
      </div>
      <div>
        {dragEnabled ? (
          dragConfig.dragType == "ADD" ? (
            <div className="bg-red-600 h-20 top-0 w-full absolute flex justify-center items-center">
              <ArrowRightIcon className="h-5 ml-auto mr-8 text-white" />
            </div>
          ) : (
            <div className="bg-red-600 h-20 top-0 w-full absolute flex justify-center items-center">
              <TrashIcon className="h-5 ml-auto mr-8 text-white" />
            </div>
          )
        ) : null}
      </div>
      {dragEnabled ? (
        dragConfig.dragType == "ADD" ? (
          <div className="z-10">
            <div className="bg-blue-600 h-20 top-0 w-full absolute z-10 flex justify-center items-center"></div>
          </div>
        ) : (
          <div className="bg-red-600 h-20 top-0 w-full absolute z-10 flex justify-center items-center"></div>
        )
      ) : (
        <></>
      )}
    </div>
  );
}
