import { MemberModel } from "@/models/Member";
import { MemberSignIn } from "./MemberSignInCard";

interface AttendanceSignedInProps {
  signedIn?: MemberModel[];
  action: (member: MemberModel) => void;
  end: (member: MemberModel) => void;
  edit: (member: MemberModel) => void;
}

export default function AttendanceSignedIn({
  signedIn,
  action,
  end,
  edit,
}: AttendanceSignedInProps) {
  return (
    <div className="z-20 pt-8 bg-white pb-28">
      <div className="flex items-center h-fit mx-6 mb-2">
        <p className="text-gray-500 text-[10px] font-light align-middle">
          SIGNED IN
        </p>
        <div className="ml-auto py-1.5 px-1.5 rounded-lg bg-gray-200">
          <p className="text-[10px] font-light">
            ATTENDANCE: {signedIn?.length ?? 0}
          </p>
        </div>
      </div>
      {signedIn?.map((member) => {
        return (
          <MemberSignIn
            key={member.id}
            member={member}
            dragConfig={{
              draggable: true,
              dragType: "DELETE",
              action,
              end,
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
