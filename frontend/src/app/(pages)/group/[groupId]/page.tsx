"use client";
import AuthCheck from "@/components/AuthCheck";
import Event from "@/components/Event";

export default function Group({ params }: { params: { groupId: string } }) {
  return (
    <AuthCheck>
      <div className="p-8">
        <h1 className="text-4xl font-semibold pb-6">Events</h1>
        <p>Sort by: Newest Oldest Tag Campus</p>
      </div>
      <Event event={{ dateStart: new Date() }} />
      <Event
        event={{
          dateStart: new Date("2021/10/10"),
          dateEnd: new Date("2021/11/10"),
        }}
      />
      <Event
        event={{
          dateStart: new Date("2021/10/10"),
          dateEnd: new Date("2021/11/10"),
        }}
      />
      <h1>Group id: {params.groupId}</h1>
      <h1>Daniel L - SOW-402: TODO Metrics</h1>
      <h1>
        Ian - SOW-419: TODO Add this group to list if it is the users first time
        going onto this group
      </h1>
      <h1>Dominic - SOW-416: TODO Group settings</h1>
    </AuthCheck>
  );
}
