import { MemberModel } from "@/models/Member";
import { MemberSignIn } from "./MemberSignInCard";

interface AttendanceSignedInProps {
  disabled: boolean;
  signedIn?: MemberModel[];
  totalAttendance: number;

  action: (member: MemberModel) => void;
  edit: (member: MemberModel) => void;
}

export default function AttendanceSignedIn({
  disabled,
  signedIn,
  totalAttendance,
  action,
  edit,
}: AttendanceSignedInProps) {
  return (
    <div className="mt-2 bg-white mb-28">
      <div className="flex items-center mx-4 mb-2">
        <p className="text-gray-500 text-[10px] font-light align-middle">
          SIGNED IN
        </p>
        <div className="ml-auto py-1.5 px-1.5 rounded-lg bg-gray-200">
          <p className="text-[10px] font-light">
            ATTENDANCE: {totalAttendance}
          </p>
        </div>
      </div>
      {signedIn?.map((member) => {
        return (
          <MemberSignIn
            disabled={disabled}
            key={member.id}
            member={member}
            dragConfig={{
              draggable: true,
              dragType: "DELETE",
              action,
              edit,
            }}
            refreshDependency={signedIn}
            triggerAddAnimation
          />
        );
      })}
    </div>
  );
}
