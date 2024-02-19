import AuthCheck from "@/components/AuthCheck";
import { EventId } from "@/models/Event";
import { GroupId } from "@/models/Group";

export default function Event({
  params,
}: {
  params: { groupId: GroupId; eventId: EventId };
}) {
  return (
    <AuthCheck>
      <p>This is the Attendance page</p>
      <p>If the event is finished, then we need to not allow users to edit</p>
      Group id: {params.groupId}
      Event id: {params.eventId}
      <h1>Owen - SOW-407: TODO Rollcall page</h1>
    </AuthCheck>
  );
}
