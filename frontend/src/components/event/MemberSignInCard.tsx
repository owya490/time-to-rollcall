"use client";
import { getYearString, MemberModel } from "@/models/Member";
import { useGSAP } from "@gsap/react";
import {
  ArrowRightIcon,
  ArrowUturnLeftIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import gsap from "gsap";
import Draggable from "gsap/dist/Draggable";
import Image from "next/image";
import { FC, memo, useContext, useEffect, useRef } from "react";
import WOMAN_FACE_SVG from "../../../public/face-woman-profile.svg";
import MAN_SVG from "../../../public/man-profile.svg";
import GroupBadge from "./GroupBadge";
import { MetadataContext } from "@/lib/context";
import { MetadataSelectModel } from "@/models/Metadata";
import useMediaQuery from "@/helper/useMediaQuery";

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
  const role = metadata?.find(
    (m) => m.key === "Role" && m.type === "select"
  ) as MetadataSelectModel | undefined;
  const year = metadata?.find(
    (m) => m.key === "Year" && m.type === "select"
  ) as MetadataSelectModel | undefined;
  const campus = metadata?.find(
    (m) => m.key === "Campus" && m.type === "select"
  ) as MetadataSelectModel | undefined;
  const gender = metadata?.find(
    (m) => m.key === "Gender" && m.type === "select"
  ) as MetadataSelectModel | undefined;
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
  const mobile = !useMediaQuery("(min-width: 768px)");

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
          window.innerWidth / (mobile ? 2 : 4) ||
        velocity > 1.2
      ) {
        remove();
      } else if (
        e.pageX - positionX.current + (editRef.current ? 104 : 20) >
          window.innerWidth / (mobile ? 2 : 4) ||
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
        <div className={"flex h-20 w-[calc(100%+84px)]"}>
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
            className={`flex w-[calc(200%)] pl-4 items-center justify-between ${
              dragConfig?.dragType === "DELETE" ? " bg-blue-100" : ""
            } ${!mobile ? "cursor-pointer" : ""}`}
            onClick={() => {
              if (!mobile) {
                edit();
                return;
              }
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
            <div className="flex justify-between items-center">
              <Image
                src={
                  gender && member.metadata?.[gender.id]
                    ? gender.values[member.metadata?.[gender.id]] === "Male"
                      ? MAN_SVG
                      : WOMAN_FACE_SVG
                    : WOMAN_FACE_SVG
                }
                // height={0}
                // width={0}
                alt="face"
                className="h-7 w-7 mr-4"
              />
              <div>
                <h3 className="font-light mb-2">{member.name}</h3>
                <p className="text-xs text-gray-500 font-extralight">
                  {year && member.metadata?.[year.id]
                    ? getYearString(year.values[member.metadata?.[year.id]]) ??
                      getYearString(member.metadata?.[year.id])
                    : ""}
                  {role && member.metadata?.[role.id]
                    ? role.values[member.metadata?.[role.id]] ??
                      member.metadata?.[role.id]
                    : "Member"}
                </p>
              </div>
            </div>
            <div className="flex justify-end items-center h-full">
              <GroupBadge
                campus={
                  campus &&
                  member.metadata?.[campus.id] &&
                  campus.values[member.metadata?.[campus.id]]
                }
                className="w-14 text-sm mr-4"
              />
              {!mobile && (
                <div
                  className={`flex items-center h-full w-20 justify-center p-2 cursor-pointer ${
                    disabled
                      ? "bg-gray-400"
                      : dragConfig?.dragType === "ADD"
                      ? "bg-blue-600"
                      : "bg-red-600"
                  }`}
                  onClick={(event) => {
                    event.stopPropagation();
                    if (!disabled) remove();
                  }}
                >
                  {dragConfig?.dragType === "ADD" ? (
                    <ArrowRightIcon className="h-5 w-5 text-white" />
                  ) : (
                    <ArrowUturnLeftIcon className="h-5 w-5 text-white" />
                  )}
                </div>
              )}
            </div>
          </div>
          <div
            className="w-[84px] top-0"
            onClick={() => {
              if (selectedRef.current && !disabled) remove();
            }}
          >
            {dragEnabled && (
              <>
                {dragConfig.dragType === "ADD" && (
                  <div className="bg-blue-600 h-20 flex w-screen justify-start items-center">
                    {mobile && (
                      <ArrowRightIcon className="h-5 w-5 ml-8 text-white" />
                    )}
                  </div>
                )}
                {dragConfig.dragType === "DELETE" && (
                  <div className="bg-red-600 h-20 flex w-screen justify-start items-center">
                    {mobile && (
                      <ArrowUturnLeftIcon className="h-5 w-5 ml-8 text-white" />
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
