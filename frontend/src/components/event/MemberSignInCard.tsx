import { TrashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import WOMAN_FACE_PNG from "../../../public/face-woman-profile.png";
import GroupBadge from "./GroupBadge";

export default function MemberSignInCard() {
  return (
    <div className="relative">
      <div
        className="flex h-24 items-center z-20 relative bg-white px-6"
        id="memberSignInCard"
      >
        <Image
          src={WOMAN_FACE_PNG}
          height={0}
          width={0}
          alt="woman-face"
          className="h-7 w-7 mr-4"
        />
        <div>
          <h3 className="font-light mb-2">Jane Doe</h3>
          <p className="text-xs text-gray-500 font-thin">
            2nd Year • Student Leader
          </p>
        </div>
        <div className="ml-auto">
          <GroupBadge />
        </div>
      </div>
      <div className="bg-red-600 h-20 top-1 w-full absolute z-10 flex justify-center items-center">
        <TrashIcon className="h-5 ml-auto mr-8 text-white" />
      </div>
    </div>
  );
}
