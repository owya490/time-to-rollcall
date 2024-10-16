"use client";
import { getYearString, MemberModel } from "@/models/Member";
import { useGSAP } from "@gsap/react";
import {
  ArrowRightIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import gsap from "gsap";
import Draggable from "gsap/dist/Draggable";
import Image from "next/image";
import { FC, memo, useContext, useEffect, useRef } from "react";
import WOMAN_FACE_PNG from "../../../public/face-woman-profile.png";
import GroupBadge from "./GroupBadge";
import { MetadataContext } from "@/lib/context";

export const MemberSignIn: FC<MemberSignInCardProps> = memo(
  ({ ...props }) => {
    return <MemberSignInCard {...props} />;
  },
  (prevProps, nextProps) => {
    return (
      prevProps.disabled === nextProps.disabled &&
      prevProps.member.id === nextProps.member.id &&
      prevProps.member.name === nextProps.member.name &&
      prevProps.member.metadata === nextProps.member.metadata
    );
  }
);
MemberSignIn.displayName = "MemberSignIn";

export type DragType = "DELETE" | "ADD";

export interface DragConfig {
  draggable: boolean;
  dragType: DragType;
  action: (member: MemberModel) => void;
  edit: (member: MemberModel) => void;
}

export interface MemberSignInCardProps {
  disabled: boolean;
  member: MemberModel;
  dragConfig?: DragConfig;
  refreshDependency?: MemberModel[];
  triggerAddAnimation?: boolean;
}

function MemberSignInCard({
  disabled,
  member,
  dragConfig,
  refreshDependency,
  triggerAddAnimation,
}: MemberSignInCardProps) {
  const metadata = useContext(MetadataContext);
  const role = metadata?.find((m) => m.key === "role");
  const year = metadata?.find((m) => m.key === "year");
  const campus = metadata?.find((m) => m.key === "campus");
  const selectedRef = useRef(false);
  const editRef = useRef(false);
  const id = member.id;
  const frontId = "front-" + id;
  const remove = () => {
    const timeline = gsap.timeline({
      onComplete: () => {
        dragConfig?.action(member);
      },
    });
    timeline.to(
      frontRef.current,
      {
        x: -window.innerWidth,
        y: 0,
        height: 0,
        duration: 0.3,
      },
      "start"
    );
    editRef.current = false;
    selectedRef.current = false;
  };
  const edit = () => {
    const timeline = gsap.timeline({
      onStart: () => {
        dragConfig?.edit(member);
      },
    });
    timeline.to(
      frontRef.current,
      {
        x: 0,
        y: 0,
        duration: 0.3,
      },
      "start"
    );
    editRef.current = false;
    selectedRef.current = false;
  };

  const frontRef = useRef(null);
  const draggableRef = useRef<Draggable[] | null>(null);
  const positionX = useRef<number>(0);
  const timeStamp = useRef<number>(0);
  const dragEnabled = dragConfig !== undefined && dragConfig.draggable === true;

  useEffect(() => {
    if (triggerAddAnimation) {
      gsap.from(frontRef.current, { height: 0, duration: 0.3 });
    }
  }, [triggerAddAnimation]);

  useGSAP(() => {
    const handleDragEnd = (e: any) => {
      if (e.pageX === 0 && e.pageY === 0) {
        editRef.current = false;
        selectedRef.current = false;
        gsap.to(frontRef.current, {
          x: 0,
          y: 0,
          duration: 0.3,
        });
        return;
      }
      const velocity =
        (positionX.current - e.pageX) / (e.timeStamp - timeStamp.current);
      if (
        positionX.current - e.pageX + (selectedRef.current ? 104 : 20) >
          window.innerWidth / 2 ||
        velocity > 1.2
      ) {
        remove();
      } else if (
        e.pageX - positionX.current + (editRef.current ? 104 : 20) >
          window.innerWidth / 2 ||
        velocity < -1.2
      ) {
        edit();
        selectedRef.current = false;
        editRef.current = false;
      } else if (!selectedRef.current && positionX.current - e.pageX > 47) {
        selectedRef.current = true;
        gsap.to(frontRef.current, {
          x: -84,
          y: 0,
          duration: 0.3,
        });
      } else if (!editRef.current && e.pageX - positionX.current > 47) {
        editRef.current = true;
        gsap.to(frontRef.current, {
          x: 84,
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

    if (!disabled) {
      // Create the draggable instance and store it in the ref
      draggableRef.current = Draggable.create(frontRef.current, {
        type: "x",
        onDragStart: function (e) {
          positionX.current = e.pageX;
          timeStamp.current = e.timeStamp;
        },
        onDragEnd: function (e) {
          handleDragEnd(e);
        },
      });
    }

    // Clean up function to kill draggable on unmount or when disabled
    return () => {
      if (draggableRef.current) {
        draggableRef.current.forEach((instance) => instance.kill());
        draggableRef.current = null; // Clear the reference
      }
    };
  }, [refreshDependency, disabled]);

  return (
    <div className="overflow-hidden" id={id} key={id}>
      <div className="z-10" id={frontId} ref={frontRef}>
        <div className={"flex h-20 w-[calc(100vw+84px)]"}>
          <div
            className="absolute top-0 -left-[calc(200vw)]"
            onClick={() => {
              if (editRef.current && !disabled) edit();
            }}
          >
            <div className="bg-gray-600 h-20 flex w-[calc(200vw)] justify-end items-center">
              <PencilIcon className="h-5 w-5 mr-8 text-white" />
            </div>
          </div>
          <div
            className={
              "flex w-[calc(200vw)] px-6 items-center" +
              (dragConfig?.dragType === "DELETE" ? " bg-gray-100" : "")
            }
            onClick={(e) => {
              if (disabled) return;
              if (selectedRef.current || editRef.current) {
                selectedRef.current = false;
                editRef.current = false;
                gsap.to(frontRef.current, {
                  x: 0,
                  y: 0,
                  duration: 0.2,
                });
              } else {
                selectedRef.current = true;
                gsap.to(frontRef.current, {
                  x: -84,
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
              <p className="text-xs text-gray-500 font-extralight">
                {year &&
                  member.metadata?.[year.id] &&
                  getYearString(year.values[member.metadata?.[year.id]])}{" "}
                •{" "}
                {role &&
                  member.metadata?.[role.id] &&
                  role.values[member.metadata?.[role.id]]}
              </p>
            </div>
            <div className="ml-auto">
              <GroupBadge
                campus={
                  campus &&
                  member.metadata?.[campus.id] &&
                  campus.values[member.metadata?.[campus.id]]
                }
                className="w-14 text-sm"
              />
            </div>
          </div>
          <div
            className="w-[84px] top-0"
            onClick={() => {
              if (selectedRef.current && !disabled) remove();
            }}
          >
            {dragEnabled ? (
              dragConfig.dragType == "ADD" ? (
                <div className="bg-blue-600 h-20 flex w-screen justify-start items-center">
                  <ArrowRightIcon className="h-5 w-5 ml-8 text-white" />
                </div>
              ) : (
                <div className="bg-red-600 h-20 flex w-screen justify-start items-center">
                  <TrashIcon className="h-5 w-5 ml-8 text-white" />
                </div>
              )
            ) : null}
          </div>
        </div>
      </div>
      {dragEnabled ? (
        dragConfig.dragType == "ADD" ? (
          <div className="-z-10">
            <div className="bg-blue-600 h-20 top-0 w-full absolute flex justify-center items-center"></div>
          </div>
        ) : (
          <div className="bg-red-600 h-20 top-0 w-full absolute flex justify-center items-center"></div>
        )
      ) : (
        <></>
      )}
    </div>
  );
}
