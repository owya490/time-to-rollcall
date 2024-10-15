"use client";
import { getYearString, MemberModel } from "@/models/Member";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { FC, memo } from "react";
import WOMAN_FACE_PNG from "../../../public/face-woman-profile.png";
import GroupBadge from "../event/GroupBadge";

export const MemberCardMemo: FC<MemberCardProps> = memo(
  ({ ...props }) => {
    return <MemberCard {...props} />;
  },
  (prevProps, nextProps) => {
    return prevProps.member === nextProps.member;
  }
);
MemberCardMemo.displayName = "MemberCardMemo";

export interface MemberCardProps {
  member: MemberModel;
  action: () => void;
}

function MemberCard({ member, action }: MemberCardProps) {
  return (
    <div className="relative overflow-hidden cursor-pointer">
      <div className="relative z-30">
        <div className={"flex h-20 w-full"}>
          <div
            className="flex w-screen px-6 bg-white items-center"
            onClick={action}
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
                {getYearString(member.year)} • {member.role}
              </p>
            </div>
            <div className="ml-auto">
              <GroupBadge campus={member.campus} className="w-14 text-sm" />
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="bg-red-600 h-20 top-0 w-full absolute flex justify-center items-center">
          <ArrowRightIcon className="h-5 ml-auto mr-8 text-white" />
        </div>
      </div>
    </div>
  );
}
