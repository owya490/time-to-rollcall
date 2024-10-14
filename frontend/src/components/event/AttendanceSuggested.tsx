import { MemberModel } from "@/models/Member";
import { MemberSignIn } from "./MemberSignInCard";

interface AttendanceSuggested {
  suggested: MemberModel[];
  action: (member: MemberModel) => void;
  end: (member: MemberModel) => void;
  loadAnimation: boolean;
}

export default function AttendanceSuggested({
  suggested,
  action,
  end,
  loadAnimation,
}: AttendanceSuggested) {
  return (
    <>
      <div className="flex items-center h-fit mx-6 mb-2">
        <p className="text-gray-500 text-[10px] font-light align-middle">
          SUGGESTED
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
            }}
            refreshDependency={suggested}
            triggerAddAnimation={loadAnimation}
          />
        );
      })}
    </>
  );
}
