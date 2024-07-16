import { Member } from "app/group/[groupId]/event/[eventId]/page";
import MemberSignInCard from "./MemberSignInCard";

interface AttendanceSignedInProps {
  signedIn: Member[];
  onDelete: (member: Member) => void;
}

export default function AttendanceSignedIn({
  signedIn,
  onDelete,
}: AttendanceSignedInProps) {
  return (
    <>
      <div className="flex items-center h-fit mx-6 mb-2">
        <p className="text-gray-500 text-[10px] font-light align-middle">
          SIGNED-IN
        </p>
      </div>
      {signedIn.map((member, index) => {
        return (
          <MemberSignInCard
            key={index}
            member={member}
            dragConfig={{
              draggable: true,
              dragType: "DELETE",
              onAction: onDelete,
            }}
            refreshDependency={signedIn}
          />
        );
      })}
    </>
  );
}
