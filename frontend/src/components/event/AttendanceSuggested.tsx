import { MemberModel } from "@/models/Member";
import { MemberSignIn } from "./MemberSignInCard";

interface AttendanceSuggested {
  suggested: MemberModel[];
  action: (member: MemberModel) => void;
  end: (member: MemberModel) => void;
  edit: (member: MemberModel) => void;
  loadAnimation: boolean;
}

export default function AttendanceSuggested({
  suggested,
  action,
  end,
  edit,
  loadAnimation,
}: AttendanceSuggested) {
  return (
    <div className="z-20 pt-8 bg-white">
      <div className="flex items-center h-fit mx-6 mb-2">
        <p className="text-gray-500 text-[10px] font-light align-middle">
          NOT SIGNED IN
        </p>
      </div>
      {suggested.map((member) => {
        return (
          <MemberSignIn
            key={member.id}
            member={member}
            dragConfig={{
              draggable: true,
              dragType: "ADD",
              action,
              end,
              edit,
            }}
            refreshDependency={suggested}
            triggerAddAnimation={loadAnimation}
          />
        );
      })}
    </div>
  );
}
