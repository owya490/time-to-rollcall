import Image from "next/image";
import WOMAN_FACE_PNG from "../../../public/face-woman-profile.png";
import GroupBadge from "./GroupBadge";

export default function MemberSignInCard() {
  return (
    <div className="flex h-24 items-center">
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
  );
}
