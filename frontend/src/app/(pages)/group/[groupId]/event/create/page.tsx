import AuthCheck from "@/components/AuthCheck";

export default function EventCreate({
  params,
}: {
  params: { groupId: string };
}) {
  return (
    <AuthCheck>
      <p>This is the event creation page</p>
      Group id: {params.groupId}
      <h1>[] - SOW-406: TODO Create event page</h1>
    </AuthCheck>
  );
}
