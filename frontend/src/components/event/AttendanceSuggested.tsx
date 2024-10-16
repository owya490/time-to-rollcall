import { MemberModel } from "@/models/Member";
import { MemberSignIn } from "./MemberSignInCard";

interface AttendanceSuggested {
  disabled: boolean;
  suggested: MemberModel[];
  action: (member: MemberModel) => void;
  end: (member: MemberModel) => void;
  edit: (member: MemberModel) => void;
  loadAnimation: boolean;
}

export default function AttendanceSuggested({
  disabled,
  suggested,
  action,
  end,
  edit,
  loadAnimation,
}: AttendanceSuggested) {
  return (
    <div className="z-20 bg-white">
      {suggested.length > 0 && (
        <div className="flex items-center h-fit mx-6 mb-2 mt-8">
          <p className="text-gray-500 text-[10px] font-light align-middle">
            SEARCH RESULTS
          </p>
        </div>
      )}
      {suggested.map((member) => {
        return (
          <MemberSignIn
            disabled={disabled}
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
