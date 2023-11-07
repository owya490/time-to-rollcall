export default function Group({ params }: { params: { groupId: string } }) {
  return (
    <main>
      <p>This is the group page</p>
      Group id: {params.groupId}
      <h1>Daniel L - SOW-402: TODO Metrics</h1>
      <h1>
        Ian - SOW-419: TODO Add this group to list if it is the user's first
        time going onto this group
      </h1>
      <h1>Dominic - SOW-416: TODO Group settings</h1>
    </main>
  );
}
