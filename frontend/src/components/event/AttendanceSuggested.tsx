import { MemberModel } from "@/models/Member";
import MemberSignInCard from "./MemberSignInCard";

interface AttendanceSuggested {
  suggested: MemberModel[];
  action: (member: MemberModel) => void;
  end: (member: MemberModel) => void;
  attendance: number;
}

export default function AttendanceSuggested({
  suggested,
  action,
  end,
  attendance,
}: AttendanceSuggested) {
  return (
    <>
      <div className="flex items-center h-fit mx-6 mb-2">
        <p className="text-gray-500 text-[10px] font-light align-middle">
          SUGGESTED
        </p>
        <div className="ml-auto py-1.5 px-1.5 rounded-lg bg-gray-100">
          <p className="text-[10px] font-light">ATTENDANCE: {attendance}</p>
        </div>
      </div>
      {suggested.map((member, index) => {
        return (
          <MemberSignInCard
            key={index}
            member={member}
            dragConfig={{
              draggable: true,
              dragType: "ADD",
              action,
              end,
            }}
            refreshDependency={suggested}
            triggerAddAnimation
          />
        );
      })}
    </>
  );
}
