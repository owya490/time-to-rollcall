import AttendanceSearchBar from "@/components/event/AttendanceSearchBar";
import EventDetailsHeader from "@/components/event/EventDetailsHeader";
import MemberSignInCard from "@/components/event/MemberSignInCard";
import SignInDetailsBar from "@/components/event/SignInDetailsBar";
import { EventId } from "@/models/Event";
import { GroupId } from "@/models/Group";

export default function Event({
  params,
}: {
  params: { groupId: GroupId; eventId: EventId };
}) {
  return (
    // <AuthCheck>
    <div>
      <div className="mb-3">
        <EventDetailsHeader />
      </div>

      <h1 className="text-2xl mb-16">Weekly Meeting 12</h1>
      <div className="mb-8">
        <AttendanceSearchBar />
      </div>
      <div className="mb-8">
        <SignInDetailsBar />
      </div>
      <MemberSignInCard />
      <MemberSignInCard />
      <MemberSignInCard />
      <MemberSignInCard />
      <MemberSignInCard />
    </div>
    // </AuthCheck>
  );
}
