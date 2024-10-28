"use client";
import Tag from "@/components/event/Tag";
import Topbar from "@/components/Topbar";
import { EventsContext, TagsContext } from "@/lib/context";
import { GroupId } from "@/models/Group";
import { TagId, TagModel } from "@/models/Tag";
import { useContext, useEffect, useState } from "react";
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Metrics({
  params,
}: {
  params: { groupId: GroupId; year: string };
}) {
  const events = useContext(EventsContext);
  const tags = useContext(TagsContext);
  const [metricByTag, setMetricByTag] = useState<{ [tagId: TagId]: any[] }>({});

  useEffect(() => {
    if (tags && events) {
      let eventsByTag: { [tagId: TagId]: any[] } = {};
      for (const tag of tags) {
        eventsByTag[tag.id] = [];
      }
      for (const event of events.reverse()) {
        const eventTags = event.tags.map((t) => t.id);

        for (const tagId of eventTags) {
          if (eventsByTag[tagId]) {
            eventsByTag[tagId].push({
              name: event.name,
              Attendance: event.members?.length ?? 0,
            });
          }
        }
      }
      setMetricByTag(eventsByTag);
    }
  }, [tags, events]);

  return (
    <>
      <Topbar year={params.year} />
      <div className="mx-4">
        {Object.entries(metricByTag).map(([tId, m], i) => {
          const tag = tags?.find((t) => t.id === tId) as TagModel;
          return (
            <div style={{ width: "100%", height: "100%" }} key={i}>
              <Tag tag={tag} disabled />
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={m}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="Attendance"
                    stroke={tag.colour}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          );
        })}
      </div>
    </>
  );
}
